import { allGlossary, interviewQuestions, lessons } from './content.js?v=3'
import { calculateScore, readProgress, saveProgress, updateLessonProgress } from './learning.js?v=3'
import { getDashboardState, normalizeAppHref, parseRoute, quizFeedback } from './ui.js?v=3'
import { captureAuthCallback, isSyncConfigured, readSession, requestMagicLink, signOut, syncAllProgress } from './sync.js?v=3'

const main = document.querySelector('#main')
const toast = document.querySelector('#toast')
const BASE_PATH = new URL('.', import.meta.url).pathname
let progress = readProgress()
let quizAnswers = {}
let interviewTimer = null
let blockObserver = null
let syncDelay = null

restoreRedirectedRoute()
captureAuthCallback()
registerServiceWorker()
syncOnLoad()

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link]')
  if (link && link.origin === location.origin) {
    event.preventDefault()
    navigate(link.pathname)
  }
})
window.addEventListener('popstate', render)
render()

function navigate(path) {
  const appPath = toAppPath(path)
  history.pushState({}, '', `${BASE_PATH}${appPath.replace(/^\//, '')}`)
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  render()
}

function render() {
  blockObserver?.disconnect()
  const route = parseRoute(toAppPath(location.pathname))
  document.querySelectorAll('[data-nav]').forEach((item) => item.classList.toggle('active', item.dataset.nav === route.name))
  if (route.name === 'sprint') main.innerHTML = renderSprint()
  else if (route.name === 'lesson') main.innerHTML = renderLesson(route.slug)
  else if (route.name === 'review') main.innerHTML = renderReview()
  else if (route.name === 'interview') main.innerHTML = renderInterview()
  else if (route.name === 'login') main.innerHTML = renderLogin()
  else main.innerHTML = renderDashboard()
  bindPageEvents(route)
  normalizeLinks()
  main.focus({ preventScroll: true })
  updateSyncLabel()
}

function toAppPath(pathname) {
  const normalizedBase = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`
  if (pathname.startsWith(normalizedBase)) return `/${pathname.slice(normalizedBase.length)}`.replace(/\/$/, '') || '/'
  return pathname || '/'
}

function normalizeLinks() {
  document.querySelectorAll('a[data-link]').forEach((link) => {
    const route = link.getAttribute('href')
    link.setAttribute('href', normalizeAppHref(route, BASE_PATH))
  })
}

function restoreRedirectedRoute() {
  const url = new URL(location.href)
  const redirected = url.searchParams.get('route')
  if (!redirected) return
  url.searchParams.delete('route')
  history.replaceState({}, '', `${BASE_PATH}${redirected.replace(/^\//, '')}${url.hash}`)
}

function renderDashboard() {
  const state = getDashboardState(lessons, progress)
  const hasStarted = Object.keys(progress).length > 0
  return `
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">2-3 giorni · colloquio tecnico</p>
        <h1>Preparati a guidare<br><em>la trasformazione.</em></h1>
        <p class="lead">Dalla linea produttiva all’AI, con il linguaggio tecnico inglese che ti serve per ragionare ad alta voce.</p>
        <a class="button primary" href="/sprint" data-link>${hasStarted ? 'Continua lo sprint' : 'Inizia lo sprint'} <span>→</span></a>
      </div>
      <div class="signal-map" aria-label="Flusso dalla fabbrica alla decisione">
        <span class="signal-label">SIGNAL PATH</span>
        <div class="signal-node live"><b>01</b><span>Shop floor</span></div>
        <div class="signal-line"></div>
        <div class="signal-node"><b>02</b><span>Data context</span></div>
        <div class="signal-line"></div>
        <div class="signal-node"><b>03</b><span>AI insight</span></div>
        <div class="signal-line"></div>
        <div class="signal-node"><b>04</b><span>Human action</span></div>
      </div>
    </section>
    <section class="shell focus-grid">
      <article class="focus-card next-card">
        <p class="eyebrow">PROSSIMA MOSSA</p>
        <div class="module-number">${String(state.nextLesson.order).padStart(2, '0')}</div>
        <h2>${state.nextLesson.title}</h2>
        <p>${state.nextLesson.englishTitle}</p>
        <div class="meta-row"><span>${state.nextLesson.durationMinutes} min</span><span>IT + EN</span></div>
        <a class="text-link" href="/lesson/${state.nextLesson.slug}" data-link>Apri la lezione →</a>
      </article>
      <article class="focus-card progress-card">
        <p class="eyebrow">SPRINT READINESS</p>
        <div class="progress-orbit" style="--progress:${state.percent * 3.6}deg"><span><b>${state.percent}%</b>pronto</span></div>
        <p>${state.completedCount} di 6 moduli completati</p>
      </article>
      <article class="focus-card review-card">
        <p class="eyebrow">ACTIVE RECALL</p>
        <strong>${state.reviewCount}</strong>
        <p>domande da ripassare</p>
        <a class="text-link" href="/review" data-link>Ripassa ora →</a>
      </article>
    </section>`
}

function renderSprint() {
  const state = getDashboardState(lessons, progress)
  return `<section class="shell page-head"><p class="eyebrow">INTERVIEW SPRINT</p><h1>Sei moduli. Un filo logico.</h1><p class="lead">Segui l’ordine una volta, poi torna solo sui punti deboli. Obiettivo: spiegare, non memorizzare.</p>
    <div class="overall-progress"><span style="width:${state.percent}%"></span></div><small>${state.percent}% completato</small></section>
    <section class="shell module-list">${lessons.map((lesson) => {
      const item = progress[lesson.id]
      const completed = item?.status === 'completed'
      const active = state.nextLesson.id === lesson.id
      return `<article class="module-row ${completed ? 'completed' : ''} ${active ? 'current' : ''}">
        <div class="module-index">${completed ? '✓' : String(lesson.order).padStart(2, '0')}</div>
        <div class="module-copy"><div class="module-topline"><span>${lesson.durationMinutes} MIN</span><span>${completed ? `${item.bestScore}% BEST` : active ? 'NEXT' : 'QUEUED'}</span></div><h2>${lesson.title}</h2><p>${lesson.englishTitle}</p>
          <div class="competency-tags">${lesson.competencies.slice(0, 2).map((tag) => `<span>${tag.replaceAll('-', ' ')}</span>`).join('')}</div></div>
        <a class="button ${active ? 'primary' : 'secondary'}" href="/lesson/${lesson.slug}" data-link aria-label="Apri la lezione ${lesson.title}">Apri la lezione <span>→</span></a>
      </article>`
    }).join('')}</section>`
}

function renderLesson(slug) {
  const lesson = lessons.find((item) => item.slug === slug)
  if (!lesson) return renderNotFound()
  progress = updateLessonProgress(progress, lesson.id, { status: progress[lesson.id]?.status || 'in_progress', cursor: progress[lesson.id]?.cursor || 0 })
  saveProgress(progress)
  return `<article class="lesson shell">
    <header class="lesson-head"><a href="/sprint" data-link class="back-link">← Tutti i moduli</a><div class="lesson-kicker"><span>MODULE ${String(lesson.order).padStart(2, '0')}</span><span>${lesson.durationMinutes} MIN</span></div><h1>${lesson.title}</h1><p class="english-title">${lesson.englishTitle}</p>
      <div class="objective-strip"><b>Al termine saprai</b>${lesson.objectives.map((item) => `<span>✓ ${item}</span>`).join('')}</div></header>
    <div class="lesson-layout"><aside class="lesson-rail" aria-label="Indice della lezione">${lesson.blocks.map((block, index) => `<a href="#${block.id}"><i>${index + 1}</i>${block.title}</a>`).join('')}<a href="#quiz"><i>Q</i>Checkpoint</a></aside>
      <div class="lesson-content">${lesson.blocks.map(renderBlock).join('')}${renderLessonGlossary(lesson)}${renderQuiz(lesson)}${renderInterviewAnswer(lesson)}</div></div>
  </article>`
}

function renderBlock(block) {
  return `<section class="content-block" id="${block.id}"><p class="eyebrow">${block.eyebrow}</p><h2>${block.title}</h2>${block.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
    ${block.formula ? `<div class="formula">${block.formula}</div>` : ''}${block.diagram ? renderDiagram(block.diagram) : ''}
    <ul class="key-points">${block.keyPoints.map((point) => `<li>${point}</li>`).join('')}</ul>
    ${block.activity ? `<div class="activity"><span class="activity-label">THINK ON THE FLOOR</span><h3>${block.activity.prompt}</h3><details><summary>Mostra un indizio</summary><p>${block.activity.hint}</p></details></div>` : ''}</section>`
}

function renderDiagram(nodes) {
  return `<div class="process-diagram" role="img" aria-label="${nodes.join(' fino a ')}">${nodes.map((node, index) => `<div class="process-node"><b>${String(index + 1).padStart(2, '0')}</b><span>${node}</span></div>${index < nodes.length - 1 ? '<i>→</i>' : ''}`).join('')}</div>`
}

function renderLessonGlossary(lesson) {
  return `<section class="lesson-glossary"><p class="eyebrow">LANGUAGE LAYER</p><h2>Termini da possedere</h2><div class="term-grid">${lesson.glossary.map((item) => `<article><code>${item.english}</code><b>${item.italian}</b><p>${item.definition}</p></article>`).join('')}</div></section>`
}

function renderQuiz(lesson) {
  return `<section class="quiz-section" id="quiz"><p class="eyebrow">KNOWLEDGE CHECK</p><h2>Verifica subito</h2><p>Rispondi senza tornare al testo. Ogni errore entra nel ripasso.</p>
    <div class="quiz-list">${lesson.quiz.map((question, questionIndex) => `<fieldset class="quiz-card" data-question="${question.id}"><legend><span>Q${questionIndex + 1}</span>${question.prompt}</legend><div class="quiz-options">${question.options.map((option, optionIndex) => `<button type="button" data-quiz-option="${optionIndex}" data-lesson="${lesson.id}" data-question-id="${question.id}">${option}</button>`).join('')}</div><div class="feedback" data-feedback aria-live="polite"></div></fieldset>`).join('')}</div>
    <div class="quiz-summary" data-quiz-summary><span>Completa le ${lesson.quiz.length} domande per vedere il risultato.</span></div></section>`
}

function renderInterviewAnswer(lesson) {
  return `<section class="answer-lab"><p class="eyebrow">SAY IT IN ENGLISH</p><h2>${lesson.interview.prompt}</h2><div class="answer-actions"><button class="button secondary" type="button" data-reveal="short">Reveal 30-sec answer</button><button class="button secondary" type="button" data-reveal="long">Reveal 2-min answer</button></div><div class="model-answer" data-answer="short" hidden><span>30 SECONDS</span><p>${lesson.interview.short}</p></div><div class="model-answer" data-answer="long" hidden><span>2 MINUTES</span><p>${lesson.interview.long}</p></div></section>`
}

function renderReview() {
  const reviewIds = new Set(Object.values(progress).flatMap((item) => item.reviewQuestionIds || []))
  const reviewQuestions = lessons.flatMap((lesson) => lesson.quiz.map((question) => ({ ...question, lesson }))).filter((item) => reviewIds.has(item.id))
  return `<section class="shell page-head"><p class="eyebrow">ACTIVE RECALL</p><h1>Ripassa ciò che conta.</h1><p class="lead">Gli errori non sono una penalità. Sono la lista esatta di ciò che devi rendere più solido.</p></section>
    <section class="shell review-layout"><div><div class="section-label"><span>DOMANDE DA RIVEDERE</span><b>${reviewQuestions.length}</b></div>${reviewQuestions.length ? reviewQuestions.map((item) => `<article class="review-question"><small>${item.lesson.englishTitle}</small><h2>${item.prompt}</h2><details><summary>Mostra risposta e spiegazione</summary><p><b>${item.options[item.correctOption]}</b></p><p>${item.explanation}</p></details></article>`).join('') : '<div class="empty-state"><b>La coda è vuota.</b><p>Completa i quiz oppure ripeti i termini inglesi qui accanto.</p><a href="/sprint" data-link class="text-link">Vai allo sprint →</a></div>'}</div>
      <div class="glossary-panel"><label for="term-search">GLOSSARY · IT / EN</label><input id="term-search" type="search" placeholder="Cerca PLC, drift, MVP..." autocomplete="off"><div data-term-list>${renderTerms(allGlossary)}</div></div></section>`
}

function renderTerms(terms) {
  return terms.map((item) => `<article class="term-row"><code>${item.english}</code><b>${item.italian}</b><p>${item.definition}</p></article>`).join('') || '<p class="empty-inline">Nessun termine trovato.</p>'
}

function renderInterview() {
  return `<section class="interview-hero"><div class="shell"><p class="eyebrow">20-MINUTE REHEARSAL</p><h1>Think clearly.<br><em>Speak simply.</em></h1><p>Avvia il timer, rispondi ad alta voce e rivela il modello soltanto dopo.</p><div class="timer"><span data-timer>20:00</span><button class="button primary" data-timer-toggle>Avvia simulazione</button></div></div></section>
    <section class="shell interview-list">${interviewQuestions.map((item, index) => `<article class="interview-card"><div class="question-number">${String(index + 1).padStart(2, '0')}</div><div><small>${item.topic}</small><h2>${item.prompt}</h2><div class="interview-actions"><button type="button" data-model-toggle="${index}-short">30 sec</button><button type="button" data-model-toggle="${index}-long">2 min</button></div><div class="model-answer" data-model="${index}-short" hidden><p>${item.short}</p></div><div class="model-answer" data-model="${index}-long" hidden><p>${item.long}</p></div></div></article>`).join('')}</section>`
}

function renderLogin() {
  const session = readSession()
  const configured = isSyncConfigured()
  return `<section class="auth-page shell"><div class="auth-copy"><p class="eyebrow">CROSS-DEVICE PROGRESS</p><h1>Riprendi esattamente<br>dove eri rimasto.</h1><p>Il progresso locale funziona già. Collega Gmail per sincronizzare automaticamente telefono e PC.</p><ul><li>Magic link, nessuna password</li><li>Dati isolati con Row Level Security</li><li>Il punteggio migliore non regredisce</li></ul></div><div class="auth-card">${session ? `<span class="auth-status">● SINCRONIZZAZIONE ATTIVA</span><h2>Dispositivo collegato</h2><p>Il tuo progresso verrà unito al cloud quando sei online.</p><button class="button secondary" data-signout>Disconnetti</button>` : `<span class="auth-status ${configured ? '' : 'muted'}">${configured ? '● READY' : '○ SETUP NECESSARIO'}</span><h2>Accedi con Gmail</h2><form data-login-form><label for="email">Indirizzo email</label><input id="email" name="email" type="email" placeholder="nome@gmail.com" required ${configured ? '' : 'disabled'}><button class="button primary" type="submit" ${configured ? '' : 'disabled'}>Invia magic link</button></form>${configured ? '<p class="fine-print">Apri il link ricevuto sul dispositivo che vuoi collegare.</p>' : '<div class="setup-note"><b>L’app resta utilizzabile.</b><p>Inserisci URL e anon key di Supabase in <code>public/config.js</code> per attivare il sync.</p></div>'}`}</div></section>`
}

function renderNotFound() {
  return '<section class="shell empty-page"><p class="eyebrow">404</p><h1>Questa lezione non esiste.</h1><a href="/sprint" data-link class="button primary">Torna allo sprint</a></section>'
}

function bindPageEvents(route) {
  if (route.name === 'lesson') bindLessonEvents(route.slug)
  if (route.name === 'review') document.querySelector('#term-search')?.addEventListener('input', filterTerms)
  if (route.name === 'interview') bindInterviewEvents()
  if (route.name === 'login') bindLoginEvents()
}

function bindLessonEvents(slug) {
  const lesson = lessons.find((item) => item.slug === slug)
  document.querySelectorAll('[data-quiz-option]').forEach((button) => button.addEventListener('click', () => answerQuestion(lesson, button)))
  document.querySelectorAll('[data-reveal]').forEach((button) => button.addEventListener('click', () => {
    const answer = document.querySelector(`[data-answer="${button.dataset.reveal}"]`)
    answer.hidden = !answer.hidden
    button.setAttribute('aria-expanded', String(!answer.hidden))
  }))
  const saved = progress[lesson.id]
  if (saved?.status === 'in_progress' && saved.cursor > 0 && saved.cursor < lesson.blocks.length) {
    requestAnimationFrame(() => document.querySelector(`#${lesson.blocks[saved.cursor].id}`)?.scrollIntoView())
  }
  if ('IntersectionObserver' in window) {
    blockObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const cursor = lesson.blocks.findIndex((block) => block.id === visible.target.id)
      if (cursor < 0 || progress[lesson.id]?.cursor === cursor) return
      progress = updateLessonProgress(progress, lesson.id, { status: progress[lesson.id]?.status === 'completed' ? 'completed' : 'in_progress', cursor })
      saveProgress(progress)
      scheduleProgressSync()
    }, { rootMargin: '-18% 0px -55% 0px', threshold: [0.2, 0.6] })
    lesson.blocks.forEach((block) => document.querySelector(`#${block.id}`) && blockObserver.observe(document.querySelector(`#${block.id}`)))
  }
}

function answerQuestion(lesson, button) {
  const question = lesson.quiz.find((item) => item.id === button.dataset.questionId)
  const selected = Number(button.dataset.quizOption)
  quizAnswers[lesson.id] ||= {}
  quizAnswers[lesson.id][question.id] = selected
  const card = button.closest('[data-question]')
  card.querySelectorAll('button').forEach((option, index) => {
    option.disabled = true
    option.classList.toggle('selected-correct', index === question.correctOption)
    option.classList.toggle('selected-wrong', index === selected && selected !== question.correctOption)
  })
  const feedback = quizFeedback(question, selected)
  const feedbackBox = card.querySelector('[data-feedback]')
  feedbackBox.className = `feedback visible ${feedback.correct ? 'correct' : 'wrong'}`
  feedbackBox.innerHTML = `<b>${feedback.label}</b><p>${feedback.explanation}</p>`
  updateQuizSummary(lesson)
}

function updateQuizSummary(lesson) {
  const answers = quizAnswers[lesson.id] || {}
  const answeredQuestions = lesson.quiz.filter((question) => answers[question.id] !== undefined)
  if (answeredQuestions.length < lesson.quiz.length) return
  const results = lesson.quiz.map((question) => answers[question.id] === question.correctOption)
  const score = calculateScore(results)
  const missed = lesson.quiz.filter((question) => answers[question.id] !== question.correctOption).map((question) => question.id)
  const passed = score.percent >= lesson.masteryThreshold
  progress = updateLessonProgress(progress, lesson.id, { status: passed ? 'completed' : 'in_progress', cursor: lesson.blocks.length, bestScore: score.percent, reviewQuestionIds: missed, replaceReviewQuestionIds: true })
  saveProgress(progress)
  document.querySelector('[data-quiz-summary]').innerHTML = `<div><b>${score.percent}%</b><span>${passed ? 'Competenza acquisita' : 'Ripassa e riprova'}</span></div><p>${score.correct}/${score.total} risposte corrette · soglia ${lesson.masteryThreshold}%</p>${passed ? `<a class="button primary" href="${nextLessonPath(lesson)}" data-link>Continua <span>→</span></a>` : '<a class="button secondary" href="/review" data-link>Apri il ripasso</a>'}`
  syncProgressQuietly()
}

function nextLessonPath(lesson) {
  const next = lessons.find((item) => item.order === lesson.order + 1)
  return next ? `/lesson/${next.slug}` : '/interview'
}

function filterTerms(event) {
  const query = event.target.value.trim().toLocaleLowerCase('it')
  const filtered = allGlossary.filter((item) => `${item.english} ${item.italian} ${item.definition}`.toLocaleLowerCase('it').includes(query))
  document.querySelector('[data-term-list]').innerHTML = renderTerms(filtered)
}

function bindInterviewEvents() {
  document.querySelectorAll('[data-model-toggle]').forEach((button) => button.addEventListener('click', () => {
    const model = document.querySelector(`[data-model="${button.dataset.modelToggle}"]`)
    model.hidden = !model.hidden
    button.classList.toggle('active', !model.hidden)
  }))
  document.querySelector('[data-timer-toggle]')?.addEventListener('click', toggleTimer)
}

function toggleTimer(event) {
  const display = document.querySelector('[data-timer]')
  if (interviewTimer) {
    clearInterval(interviewTimer)
    interviewTimer = null
    event.target.textContent = 'Riprendi simulazione'
    return
  }
  let remaining = display.dataset.remaining ? Number(display.dataset.remaining) : 1200
  event.target.textContent = 'Pausa'
  interviewTimer = setInterval(() => {
    remaining -= 1
    display.dataset.remaining = remaining
    display.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
    if (remaining <= 0) { clearInterval(interviewTimer); interviewTimer = null; event.target.textContent = 'Ricomincia'; showToast('Tempo concluso. Valuta struttura, termini, metriche e rischi.') }
  }, 1000)
}

function bindLoginEvents() {
  document.querySelector('[data-login-form]')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const button = event.target.querySelector('button')
    button.disabled = true
    button.textContent = 'Invio in corso...'
    try { await requestMagicLink(new FormData(event.target).get('email')); showToast('Magic link inviato. Controlla Gmail.'); button.textContent = 'Email inviata' }
    catch (error) { showToast(error.message); button.disabled = false; button.textContent = 'Invia magic link' }
  })
  document.querySelector('[data-signout]')?.addEventListener('click', () => { signOut(); render(); showToast('Dispositivo disconnesso.') })
}

async function syncOnLoad() {
  try { progress = await syncAllProgress(progress); saveProgress(progress); render() }
  catch { updateSyncLabel('Sync non disponibile') }
}

async function syncProgressQuietly() {
  try { progress = await syncAllProgress(progress); saveProgress(progress); updateSyncLabel('Sincronizzato') }
  catch { updateSyncLabel('Salvato sul dispositivo') }
}

function scheduleProgressSync() {
  clearTimeout(syncDelay)
  syncDelay = setTimeout(syncProgressQuietly, 1200)
}

function updateSyncLabel(forced) {
  const label = document.querySelector('[data-sync-label]')
  if (label) label.textContent = forced || (readSession() ? 'Sync attivo' : 'Solo dispositivo')
}

function showToast(message) {
  toast.textContent = message
  toast.classList.add('visible')
  setTimeout(() => toast.classList.remove('visible'), 4000)
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {})
}

import { allGlossary, curriculum, interviewQuestions, lessons } from './content.js?v=8'
import { calculateScore, readProgress, saveProgress, updateLessonProgress } from './learning.js?v=8'
import {
  getDashboardState, getUnitState, isUnitComplete, normalizeAppHref, parseRoute,
  quizFeedback, readLocale, selectLocale, splitAppPath, unitPath, writeLocale
} from './ui.js?v=8'
import { applyShellLocale, localizedFinalQuiz, renderLessonInterviewAnswers, renderLocaleSwitch, renderUnitView, shellCopy } from './render.js?v=8'
import { captureAuthCallback, isSyncConfigured, readSession, requestMagicLink, signOut, syncAllProgress } from './sync.js?v=8'

const main = document.querySelector('#main')
const toast = document.querySelector('#toast')
const BASE_PATH = new URL('.', import.meta.url).pathname
let progress = readProgress()
let quizAnswers = {}
let locale = readLocale()
let unitInteractions = {}
let interviewTimer = null
let syncDelay = null

restoreRedirectedRoute()
captureAuthCallback()
registerServiceWorker()
syncOnLoad()

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link]')
  if (link && link.origin === location.origin) {
    event.preventDefault()
    navigate(link.pathname + link.search)
  }
})
window.addEventListener('popstate', render)
render()

function navigate(path) {
  const { pathname, search } = splitAppPath(path)
  const appPath = toAppPath(pathname)
  history.pushState({}, '', `${BASE_PATH}${appPath.replace(/^\//, '')}${search}`)
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  render()
}

function render() {
  const route = parseRoute(toAppPath(location.pathname), location.search)
  document.documentElement.lang = locale
  document.querySelectorAll('[data-nav]').forEach((item) => item.classList.toggle('active', item.dataset.nav === route.name))
  renderLocaleControl()
  applyShellLocale(document, locale)
  if (route.name === 'sprint') main.innerHTML = renderSprint()
  else if (route.name === 'lesson') main.innerHTML = renderLesson(route.slug, route.unitId)
  else if (route.name === 'review') main.innerHTML = renderReview()
  else if (route.name === 'interview') main.innerHTML = renderInterview()
  else if (route.name === 'login') main.innerHTML = renderLogin()
  else main.innerHTML = renderDashboard()
  bindPageEvents(route)
  normalizeLinks()
  bindLocaleControl()
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
  const copy = shellCopy(locale)
  const lessonTitle = selectLocale(curriculum.find((item) => item.id === state.nextLesson.id)?.title, locale)
  return `
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">${copy.heroEyebrow}</p>
        <h1>${copy.heroTitle}</h1>
        <p class="lead">${copy.heroLead}</p>
        <a class="button primary" href="/sprint" data-link>${hasStarted ? copy.heroCtaContinue : copy.heroCtaStart} <span>→</span></a>
      </div>
      <div class="signal-map" aria-label="${copy.signalPathLabel}">
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
        <p class="eyebrow">${copy.nextMove}</p>
        <div class="module-number">${String(state.nextLesson.order).padStart(2, '0')}</div>
        <h2>${lessonTitle}</h2>
        <p>${state.nextLesson.englishTitle}</p>
        <div class="meta-row"><span>${state.nextLesson.durationMinutes} min</span><span>IT + EN</span></div>
        <a class="text-link" href="/lesson/${state.nextLesson.slug}" data-link>${copy.openLesson} →</a>
      </article>
      <article class="focus-card progress-card">
        <p class="eyebrow">${copy.readiness}</p>
        <div class="progress-orbit" style="--progress:${state.percent * 3.6}deg"><span><b>${state.percent}%</b>${copy.ready}</span></div>
        <p>${copy.modulesDone(state.completedCount, lessons.length)}</p>
      </article>
      <article class="focus-card review-card">
        <p class="eyebrow">${copy.activeRecall}</p>
        <strong>${state.reviewCount}</strong>
        <p>${copy.questionsToReview}</p>
        <a class="text-link" href="/review" data-link>${copy.reviewNow} →</a>
      </article>
    </section>`
}

function renderSprint() {
  const state = getDashboardState(lessons, progress)
  const copy = shellCopy(locale)
  return `<section class="shell page-head"><p class="eyebrow">${copy.sprintEyebrow}</p><h1>${copy.sprintTitle}</h1><p class="lead">${copy.sprintLead}</p>
    <div class="overall-progress"><span style="width:${state.percent}%"></span></div><small>${state.percent}% ${copy.completed}</small></section>
    <section class="shell module-list">${lessons.map((lesson) => {
      const item = progress[lesson.id]
      const completed = item?.status === 'completed'
      const active = state.nextLesson.id === lesson.id
      const source = curriculum.find((entry) => entry.id === lesson.id)
      const title = selectLocale(source?.title, locale)
      const subtitle = locale === 'en' ? selectLocale(source?.title, 'it') : lesson.englishTitle
      const status = completed ? `${item.bestScore}% ${copy.statusBest}` : active ? copy.statusNext : copy.statusOpen
      return `<article class="module-row ${completed ? 'completed' : ''} ${active ? 'current' : ''}">
        <div class="module-index">${completed ? '✓' : String(lesson.order).padStart(2, '0')}</div>
        <div class="module-copy"><div class="module-topline"><span>${lesson.durationMinutes} MIN</span><span>${status}</span></div><h2>${title}</h2><p>${subtitle}</p></div>
        <a class="button ${active ? 'primary' : 'secondary'}" href="/lesson/${lesson.slug}" data-link aria-label="${copy.openLesson}: ${title}">${copy.openLesson} <span>→</span></a>
      </article>`
    }).join('')}</section>`
}

function renderLesson(slug, unitId) {
  const lesson = curriculum.find((item) => item.slug === slug)
  if (!lesson) return renderNotFound()
  const stored = progress[lesson.id]
  progress = updateLessonProgress(progress, lesson.id, {
    status: stored?.status || 'in_progress',
    cursor: stored?.cursor || 0
  })
  saveProgress(progress)

  const state = getUnitState(lesson, unitId, progress[lesson.id])
  const interaction = readInteraction(lesson.id, state.unit.id)
  return renderUnitView({
    lesson,
    state,
    locale,
    revealed: interaction.revealed,
    checkpointChoice: interaction.checkpointChoice,
    activityMarked: interaction.activityMarked
  }) + renderFinalCheckpoint(lesson, state)
}

function interactionKey(lessonId, unitId) {
  return `${lessonId}:${unitId}`
}

function readInteraction(lessonId, unitId) {
  const key = interactionKey(lessonId, unitId)
  unitInteractions[key] ||= { revealed: {}, checkpointChoice: null, activityMarked: false }
  return unitInteractions[key]
}

function renderFinalCheckpoint(lesson, state) {
  if (!state.isLast) return ''
  const quiz = localizedFinalQuiz(lesson, locale)
  const heading = locale === 'en' ? 'Final checkpoint' : 'Checkpoint finale'
  const helper = locale === 'en'
    ? 'Answer without returning to the text. Every miss enters your review queue.'
    : 'Rispondi senza tornare al testo. Ogni errore entra nella coda di ripasso.'
  return `<section class="quiz-section shell" id="final-checkpoint"><p class="eyebrow">${heading}</p><h2>${selectLocale(lesson.title, locale)}</h2><p>${helper}</p>
    <div class="quiz-list">${quiz.map((question, questionIndex) => `<fieldset class="quiz-card" data-question="${question.id}"><legend><span>Q${questionIndex + 1}</span>${question.prompt}</legend><div class="quiz-options">${question.options.map((option, optionIndex) => `<button type="button" data-quiz-option="${optionIndex}" data-lesson="${lesson.id}" data-question-id="${question.id}">${option}</button>`).join('')}</div><div class="feedback" data-feedback aria-live="polite"></div></fieldset>`).join('')}</div>
    <div class="quiz-summary" data-quiz-summary><span>${locale === 'en' ? `Answer all ${quiz.length} questions to see your score.` : `Completa le ${quiz.length} domande per vedere il risultato.`}</span></div>
    ${renderLessonInterviewAnswers(lesson, locale)}</section>`
}

function renderLocaleControl() {
  const host = document.querySelector('[data-locale-switch]')
  if (host) host.innerHTML = renderLocaleSwitch(locale)
}

function bindLocaleControl() {
  document.querySelectorAll('[data-locale]').forEach((button) => button.addEventListener('click', () => {
    const requested = button.dataset.locale
    if (requested === locale) return
    locale = writeLocale(requested)
    render()
  }))
}

function renderReview() {
  const copy = shellCopy(locale)
  const reviewIds = new Set(Object.values(progress).flatMap((item) => item.reviewQuestionIds || []))
  const reviewQuestions = curriculum
    .flatMap((lesson) => localizedFinalQuiz(lesson, locale).map((question) => ({ ...question, lessonTitle: selectLocale(lesson.title, locale) })))
    .filter((item) => reviewIds.has(item.id))
  return `<section class="shell page-head"><p class="eyebrow">${copy.activeRecall}</p><h1>${copy.reviewTitle}</h1><p class="lead">${copy.reviewLead}</p></section>
    <section class="shell review-layout"><div><div class="section-label"><span>${copy.questionsLabel}</span><b>${reviewQuestions.length}</b></div>${reviewQuestions.length ? reviewQuestions.map((item) => `<article class="review-question"><small>${item.lessonTitle}</small><h2>${item.prompt}</h2><details><summary>${copy.showAnswer}</summary><p><b>${item.options[item.correctOption]}</b></p><p>${item.explanation}</p></details></article>`).join('') : `<div class="empty-state"><b>${copy.emptyQueue}</b><p>${copy.emptyQueueHint}</p><a href="/sprint" data-link class="text-link">${copy.goToSprint} →</a></div>`}</div>
      <div class="glossary-panel"><label for="term-search">${copy.glossaryLabel}</label><input id="term-search" type="search" placeholder="${copy.glossaryPlaceholder}" autocomplete="off"><div data-term-list>${renderTerms(allGlossary)}</div></div></section>`
}

function renderTerms(terms) {
  return terms.map((item) => `<article class="term-row"><code>${item.english}</code><b>${item.italian}</b><p>${item.definition}</p></article>`).join('') || `<p class="empty-inline">${shellCopy(locale).noTerms}</p>`
}

function renderInterview() {
  const copy = shellCopy(locale)
  return `<section class="interview-hero"><div class="shell"><p class="eyebrow">${copy.interviewEyebrow}</p><h1>${copy.interviewTitle}</h1><p>${copy.interviewLead}</p><div class="timer"><span data-timer>20:00</span><button class="button primary" data-timer-toggle>${copy.startSimulation}</button></div></div></section>
    <section class="shell interview-list">${interviewQuestions.map((item, index) => `<article class="interview-card"><div class="question-number">${String(index + 1).padStart(2, '0')}</div><div><small>${item.topic}</small><h2>${item.prompt}</h2><div class="interview-actions"><button type="button" data-model-toggle="${index}-short">${copy.thirtySec}</button><button type="button" data-model-toggle="${index}-long">${copy.twoMin}</button></div><div class="model-answer" data-model="${index}-short" hidden><p>${item.short}</p></div><div class="model-answer" data-model="${index}-long" hidden><p>${item.long}</p></div></div></article>`).join('')}</section>`
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
  if (route.name === 'lesson') bindLessonEvents(route.slug, route.unitId)
  if (route.name === 'review') document.querySelector('#term-search')?.addEventListener('input', filterTerms)
  if (route.name === 'interview') bindInterviewEvents()
  if (route.name === 'login') bindLoginEvents()
}

function bindLessonEvents(slug, unitId) {
  const lesson = curriculum.find((item) => item.slug === slug)
  if (!lesson) return
  const projected = lessons.find((item) => item.id === lesson.id)
  const state = getUnitState(lesson, unitId, progress[lesson.id])
  const interaction = readInteraction(lesson.id, state.unit.id)

  if (state.requestedUnitFound === false && state.unit) {
    history.replaceState({}, '', normalizeAppHref(unitPath(lesson.slug, state.unit.id), BASE_PATH))
  }

  document.querySelectorAll('[data-reveal-toggle]').forEach((button) => button.addEventListener('click', () => {
    const panel = button.dataset.revealToggle
    interaction.revealed = { ...interaction.revealed, [panel]: !interaction.revealed[panel] }
    render()
  }))

  document.querySelector('[data-activity-mark]')?.addEventListener('click', () => {
    interaction.activityMarked = !interaction.activityMarked
    commitUnitCompletion(lesson, state, interaction)
    render()
  })

  document.querySelectorAll('[data-checkpoint-option]').forEach((button) => button.addEventListener('click', () => {
    interaction.checkpointChoice = Number(button.dataset.checkpointOption)
    commitUnitCompletion(lesson, state, interaction)
    render()
  }))

  document.querySelectorAll('[data-answer-toggle]').forEach((button) => button.addEventListener('click', () => {
    const panel = document.querySelector(`[data-answer="${button.dataset.answerToggle}"]`)
    if (!panel) return
    panel.hidden = !panel.hidden
    button.setAttribute('aria-pressed', String(!panel.hidden))
  }))

  document.querySelectorAll('[data-quiz-option]').forEach((button) => button.addEventListener('click', () => answerQuestion(lesson, projected, button)))
}

function commitUnitCompletion(lesson, state, interaction) {
  const complete = isUnitComplete({
    checkpointAnswered: Number.isInteger(interaction.checkpointChoice),
    activityMarked: interaction.activityMarked,
    hasActivity: (state.unit.activities || []).length > 0
  })
  if (!complete) return
  const currentCursor = progress[lesson.id]?.cursor || 0
  const cursor = Math.max(currentCursor, Math.min(state.index + 1, lesson.units.length))
  if (cursor === currentCursor) return
  progress = updateLessonProgress(progress, lesson.id, {
    status: progress[lesson.id]?.status === 'completed' ? 'completed' : 'in_progress',
    cursor
  })
  saveProgress(progress)
  scheduleProgressSync()
}

function answerQuestion(lesson, projected, button) {
  const quiz = localizedFinalQuiz(lesson, locale)
  const question = quiz.find((item) => item.id === button.dataset.questionId)
  const selected = Number(button.dataset.quizOption)
  quizAnswers[lesson.id] ||= {}
  quizAnswers[lesson.id][question.id] = selected
  const card = button.closest('[data-question]')
  card.querySelectorAll('button').forEach((option, index) => {
    option.disabled = true
    option.classList.toggle('selected-correct', index === question.correctOption)
    option.classList.toggle('selected-wrong', index === selected && selected !== question.correctOption)
  })
  const feedback = quizFeedback(question, selected, locale)
  const feedbackBox = card.querySelector('[data-feedback]')
  feedbackBox.className = `feedback visible ${feedback.correct ? 'correct' : 'wrong'}`
  feedbackBox.innerHTML = `<b>${feedback.label}</b><p>${feedback.explanation}</p>`
  updateQuizSummary(lesson, projected, quiz)
}

function updateQuizSummary(lesson, projected, quiz) {
  const answers = quizAnswers[lesson.id] || {}
  const answeredQuestions = quiz.filter((question) => answers[question.id] !== undefined)
  if (answeredQuestions.length < quiz.length) return
  const results = quiz.map((question) => answers[question.id] === question.correctOption)
  const score = calculateScore(results)
  const missed = quiz.filter((question) => answers[question.id] !== question.correctOption).map((question) => question.id)
  const passed = score.percent >= projected.masteryThreshold
  progress = updateLessonProgress(progress, lesson.id, { status: passed ? 'completed' : 'in_progress', cursor: Math.max(progress[lesson.id]?.cursor || 0, lesson.units.length), bestScore: score.percent, reviewQuestionIds: missed, replaceReviewQuestionIds: true })
  saveProgress(progress)
  document.querySelector('[data-quiz-summary]').innerHTML = `<div><b>${score.percent}%</b><span>${passed ? (locale === 'en' ? 'Competence achieved' : 'Competenza acquisita') : (locale === 'en' ? 'Review and try again' : 'Ripassa e riprova')}</span></div><p>${score.correct}/${score.total} ${locale === 'en' ? 'correct answers · threshold' : 'risposte corrette · soglia'} ${projected.masteryThreshold}%</p>${passed ? `<a class="button primary" href="${nextLessonPath(projected)}" data-link>${locale === 'en' ? 'Continue' : 'Continua'} <span>→</span></a>` : `<a class="button secondary" href="/review" data-link>${locale === 'en' ? 'Open the review' : 'Apri il ripasso'}</a>`}`
  syncProgressQuietly()
}

function nextLessonPath(lesson) {
  const next = lessons.find((item) => item.order === lesson.order + 1)
  return next ? unitPath(next.slug) : '/interview'
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
    event.target.textContent = shellCopy(locale).resumeSimulation
    return
  }
  let remaining = display.dataset.remaining ? Number(display.dataset.remaining) : 1200
  event.target.textContent = shellCopy(locale).pauseSimulation
  interviewTimer = setInterval(() => {
    remaining -= 1
    display.dataset.remaining = remaining
    display.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
    if (remaining <= 0) { clearInterval(interviewTimer); interviewTimer = null; event.target.textContent = shellCopy(locale).restartSimulation; showToast(shellCopy(locale).timeOver) }
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

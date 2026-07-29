import {
  confusedPairs, curriculum, glossary, interviewAnswers, questionById, stages
} from './content.js?v=10'
import {
  MASTERY_THRESHOLD, readAnswers, readProgress, saveAnswers, saveProgress, scoreLesson, updateLessonProgress
} from './learning.js?v=10'
import {
  countAnswered, getDashboardState, getUnitState, isUnitComplete, normalizeAppHref, parseRoute,
  readLocale, selectLocale, splitAppPath, unitPath, writeLocale
} from './ui.js?v=10'
import {
  applyShellLocale, renderConfusedPairs, renderGlossaryEntries, renderInterviewAnswers,
  renderLocaleSwitch, renderUnitView, shellCopy
} from './render.js?v=10'
import { captureAuthCallback, isSyncConfigured, readSession, requestMagicLink, signOut, syncAllProgress } from './sync.js?v=10'

const main = document.querySelector('#main')
const toast = document.querySelector('#toast')
const BASE_PATH = new URL('.', import.meta.url).pathname
let progress = readProgress()
let answers = readAnswers()
let locale = readLocale()
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
  if (route.name === 'course') main.innerHTML = renderCourse()
  else if (route.name === 'lesson') main.innerHTML = renderLesson(route.slug, route.unitId)
  else if (route.name === 'review') main.innerHTML = renderReview()
  else if (route.name === 'glossary') main.innerHTML = renderGlossary()
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
  const state = getDashboardState(curriculum, progress)
  const hasStarted = Object.keys(progress).length > 0
  const copy = shellCopy(locale)
  const nextLesson = state.nextLesson
  return `
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">${copy.heroEyebrow}</p>
        <h1>${copy.heroTitle}</h1>
        <p class="lead">${copy.heroLead}</p>
        <a class="button primary" href="/corso" data-link>${hasStarted ? copy.heroCtaContinue : copy.heroCtaStart} <span>→</span></a>
      </div>
      <ol class="stage-map" aria-label="${copy.stagesLabel}">
        ${stages.map((stage) => `<li><b>${stage.number}</b><span>${escapeHtml(stage[locale] || stage.it)}</span></li>`).join('')}
      </ol>
    </section>
    <section class="shell focus-grid">
      <article class="focus-card next-card">
        <p class="eyebrow">${copy.nextMove}</p>
        <div class="module-number">${String(nextLesson.moduleNumber).padStart(2, '0')}</div>
        <h2>${escapeHtml(selectLocale(nextLesson.title, locale))}</h2>
        <p>${escapeHtml(selectLocale(nextLesson.summary, locale))}</p>
        <div class="meta-row"><span>${nextLesson.durationMinutes} min</span><span>${nextLesson.units.length} ${copy.unitsLabel}</span></div>
        <a class="text-link" href="${unitPath(nextLesson.slug)}" data-link>${copy.openLesson} →</a>
      </article>
      <article class="focus-card progress-card">
        <p class="eyebrow">${copy.readiness}</p>
        <div class="progress-orbit" style="--progress:${state.percent * 3.6}deg"><span><b>${state.percent}%</b>${copy.ready}</span></div>
        <p>${copy.modulesDone(state.completedCount, curriculum.length)}</p>
      </article>
      <article class="focus-card review-card">
        <p class="eyebrow">${copy.activeRecall}</p>
        <strong>${state.reviewCount}</strong>
        <p>${copy.questionsToReview}</p>
        <a class="text-link" href="/review" data-link>${copy.reviewNow} →</a>
      </article>
    </section>`
}

function renderCourse() {
  const state = getDashboardState(curriculum, progress)
  const copy = shellCopy(locale)
  return `<section class="shell page-head"><p class="eyebrow">${copy.courseEyebrow}</p><h1>${copy.courseTitle}</h1><p class="lead">${copy.courseLead}</p>
    <div class="overall-progress"><span style="width:${state.percent}%"></span></div><small>${state.percent}% ${copy.completed}</small></section>
    <section class="shell module-list">${curriculum.map((lesson) => {
      const item = progress[lesson.id]
      const completed = item?.status === 'completed'
      const active = state.nextLesson.id === lesson.id
      const title = escapeHtml(selectLocale(lesson.title, locale))
      const status = completed ? `${item.bestScore}% ${copy.statusBest}` : active ? copy.statusNext : copy.statusOpen
      return `<article class="module-row ${completed ? 'completed' : ''} ${active ? 'current' : ''}" data-module="${lesson.id}">
        <div class="module-index">${completed ? '✓' : String(lesson.moduleNumber).padStart(2, '0')}</div>
        <div class="module-copy"><div class="module-topline"><span>${lesson.durationMinutes} MIN · ${lesson.units.length} ${copy.unitsLabel.toUpperCase()}</span><span>${status}</span></div><h2>${title}</h2><p>${escapeHtml(selectLocale(lesson.summary, locale))}</p></div>
        <a class="button ${active ? 'primary' : 'secondary'}" href="${unitPath(lesson.slug)}" data-link aria-label="${copy.openLesson}: ${title}">${copy.openLesson} <span>→</span></a>
      </article>`
    }).join('')}</section>`
}

function renderLesson(slug, unitId) {
  const lesson = curriculum.find((item) => item.slug === slug)
  if (!lesson) return renderNotFound()
  const stored = progress[lesson.id]
  progress = updateLessonProgress(progress, lesson.id, {
    status: stored?.status === 'completed' ? 'completed' : 'in_progress',
    cursor: stored?.cursor || 0
  })
  saveProgress(progress)

  const state = getUnitState(lesson, unitId, progress[lesson.id])
  const answered = countAnswered(state.unit, answers)
  return renderUnitView({
    lesson,
    state,
    locale,
    answers,
    unitComplete: isUnitComplete({ answeredQuestions: answered, totalQuestions: state.unit.quiz.length })
  })
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
  const reviewIds = [...new Set(Object.values(progress).flatMap((item) => item.reviewQuestionIds || []))]
  const reviewQuestions = reviewIds.map(questionById).filter(Boolean)
  return `<section class="shell page-head"><p class="eyebrow">${copy.activeRecall}</p><h1>${copy.reviewTitle}</h1><p class="lead">${copy.reviewLead}</p></section>
    <section class="shell review-layout"><div>
      <div class="section-label"><span>${copy.questionsLabel}</span><b>${reviewQuestions.length}</b></div>
      ${reviewQuestions.length
        ? reviewQuestions.map((item) => {
          const lesson = curriculum.find((entry) => entry.id === item.lessonId)
          return `<article class="review-question" data-review-question="${escapeHtml(item.id)}">
            <small>${escapeHtml(selectLocale(lesson?.title, locale))}</small>
            <h2>${escapeHtml(item.prompt)}</h2>
            <details><summary>${copy.showAnswer}</summary><p><b>${escapeHtml(item.options[item.correctOption])}</b></p><p>${escapeHtml(item.explanation)}</p>
            <a class="text-link" href="${unitPath(lesson?.slug, item.unitId)}" data-link>${copy.openLesson} →</a></details>
          </article>`
        }).join('')
        : `<div class="empty-state"><b>${copy.emptyQueue}</b><p>${copy.emptyQueueHint}</p><a href="/corso" data-link class="text-link">${copy.goToCourse} →</a></div>`}
    </div>
    <aside class="glossary-panel">
      <div class="section-label"><span>${copy.confusedTitle}</span></div>
      ${renderConfusedPairs(confusedPairs, locale)}
    </aside></section>`
}

function renderGlossary() {
  const copy = shellCopy(locale)
  return `<section class="shell page-head"><p class="eyebrow">${copy.glossaryEyebrow}</p><h1>${copy.glossaryTitle}</h1><p class="lead">${copy.glossaryLead}</p></section>
    <section class="shell glossary-page">
      <label for="term-search">${copy.glossaryLabel}</label>
      <input id="term-search" type="search" placeholder="${copy.glossaryPlaceholder}" autocomplete="off">
      <p class="terms-count" data-terms-count>${escapeHtml(copy.termsCount(glossary.length))}</p>
      <div data-term-list>${renderGlossaryEntries(glossary, locale)}</div>
    </section>`
}

function renderInterview() {
  const copy = shellCopy(locale)
  return `<section class="interview-hero"><div class="shell"><p class="eyebrow">${copy.interviewEyebrow}</p><h1>${copy.interviewTitle}</h1><p>${copy.interviewLead}</p></div></section>
    ${renderInterviewAnswers(interviewAnswers, locale)}`
}

function renderLogin() {
  const session = readSession()
  const configured = isSyncConfigured()
  return `<section class="auth-page shell"><div class="auth-copy"><p class="eyebrow">PROGRESSO SU PIÙ DISPOSITIVI</p><h1>Riprendi esattamente<br>dove eri rimasto.</h1><p>Il progresso locale funziona già. Collega Gmail per sincronizzare automaticamente telefono e PC.</p><ul><li>Magic link, nessuna password</li><li>Dati isolati con Row Level Security</li><li>Il punteggio migliore non regredisce</li></ul></div><div class="auth-card">${session ? `<span class="auth-status">● SINCRONIZZAZIONE ATTIVA</span><h2>Dispositivo collegato</h2><p>Il tuo progresso verrà unito al cloud quando sei online.</p><button class="button secondary" data-signout>Disconnetti</button>` : `<span class="auth-status ${configured ? '' : 'muted'}">${configured ? '● PRONTO' : '○ SETUP NECESSARIO'}</span><h2>Accedi con Gmail</h2><form data-login-form><label for="email">Indirizzo email</label><input id="email" name="email" type="email" placeholder="nome@gmail.com" required ${configured ? '' : 'disabled'}><button class="button primary" type="submit" ${configured ? '' : 'disabled'}>Invia magic link</button></form>${configured ? '<p class="fine-print">Apri il link ricevuto sul dispositivo che vuoi collegare.</p>' : '<div class="setup-note"><b>L’app resta utilizzabile.</b><p>Inserisci URL e publishable key di Supabase in <code>public/config.js</code> per attivare la sincronizzazione.</p></div>'}`}</div></section>`
}

function renderNotFound() {
  return '<section class="shell empty-page"><p class="eyebrow">404</p><h1>Questo modulo non esiste.</h1><a href="/corso" data-link class="button primary">Torna al corso</a></section>'
}

function bindPageEvents(route) {
  if (route.name === 'lesson') bindLessonEvents(route.slug, route.unitId)
  if (route.name === 'glossary') document.querySelector('#term-search')?.addEventListener('input', filterTerms)
  if (route.name === 'login') bindLoginEvents()
}

function bindLessonEvents(slug, unitId) {
  const lesson = curriculum.find((item) => item.slug === slug)
  if (!lesson) return
  const state = getUnitState(lesson, unitId, progress[lesson.id])

  if (state.requestedUnitFound === false && state.unit) {
    history.replaceState({}, '', normalizeAppHref(unitPath(lesson.slug, state.unit.id), BASE_PATH))
  }

  document.querySelectorAll('[data-quiz-option]').forEach((button) => button.addEventListener('click', () => {
    answerQuestion(lesson, state, button.dataset.questionId, Number(button.dataset.quizOption))
  }))
}

function answerQuestion(lesson, state, questionId, selected) {
  if (Number.isInteger(answers[questionId])) return
  answers = { ...answers, [questionId]: selected }
  saveAnswers(answers)
  commitLessonProgress(lesson, state)
  render()
}

/**
 * Progress moves on two levels: the cursor advances when a unit is fully
 * answered, and the module is completed when every question of every unit has an
 * answer and the score clears the mastery threshold.
 */
function commitLessonProgress(lesson, state) {
  const unitComplete = isUnitComplete({
    answeredQuestions: countAnswered(state.unit, answers),
    totalQuestions: state.unit.quiz.length
  })
  const score = scoreLesson(lesson, answers)
  const storedCursor = progress[lesson.id]?.cursor || 0
  const cursor = unitComplete ? Math.max(storedCursor, state.index + 1) : storedCursor
  const passed = score.complete && score.percent >= MASTERY_THRESHOLD

  progress = updateLessonProgress(progress, lesson.id, {
    status: passed ? 'completed' : 'in_progress',
    cursor,
    bestScore: score.complete ? score.percent : (progress[lesson.id]?.bestScore || 0),
    reviewQuestionIds: score.missed,
    replaceReviewQuestionIds: true
  })
  saveProgress(progress)
  if (score.complete) {
    showToast(locale === 'en'
      ? `Module score: ${score.percent}% (${score.correct}/${score.total})`
      : `Punteggio del modulo: ${score.percent}% (${score.correct}/${score.total})`)
  }
  scheduleProgressSync()
}

function filterTerms(event) {
  const query = event.target.value.trim().toLocaleLowerCase('it')
  const filtered = glossary.filter((entry) => (
    `${entry.term} ${entry.italian} ${selectLocale(entry.definition, locale)}`.toLocaleLowerCase('it').includes(query)
  ))
  document.querySelector('[data-term-list]').innerHTML = renderGlossaryEntries(filtered, locale)
  const count = document.querySelector('[data-terms-count]')
  if (count) count.textContent = shellCopy(locale).termsCount(filtered.length)
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
  catch { updateSyncLabel('Sincronizzazione non disponibile') }
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
  if (label) label.textContent = forced || (readSession() ? 'Sincronizzazione attiva' : 'Solo dispositivo')
}

function showToast(message) {
  toast.textContent = message
  toast.classList.add('visible')
  setTimeout(() => toast.classList.remove('visible'), 4000)
}

function escapeHtml(value) {
  const escapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return String(value ?? '').replace(/[&<>"']/gu, (character) => escapes[character])
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {})
}

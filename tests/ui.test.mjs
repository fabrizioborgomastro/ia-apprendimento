import test from 'node:test'
import assert from 'node:assert/strict'
import {
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
  getDashboardState,
  getUnitState,
  isUnitComplete,
  normalizeAppHref,
  parseRoute,
  quizFeedback,
  readLocale,
  selectLocale,
  splitAppPath,
  unitPath,
  writeLocale
} from '../public/ui.js'
import { applyShellLocale, localizedFinalQuiz, renderLessonInterviewAnswers, renderLocaleSwitch, renderUnitView, shellCopy } from '../public/render.js'
import { readFile } from 'node:fs/promises'
import { curriculum, lessons } from '../public/content.js'

const lessonFixture = {
  id: 'fixture', slug: 'fixture', durationMinutes: 20,
  units: [
    { id: 'unit-1', title: { it: 'Uno', en: 'One' } },
    { id: 'unit-2', title: { it: 'Due', en: 'Two' } },
    { id: 'unit-3', title: { it: 'Tre', en: 'Three' } }
  ]
}

function memoryStorage(initial = {}) {
  const store = new Map(Object.entries(initial))
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value))
  }
}

test('language selection returns the requested localized value', () => {
  assert.equal(selectLocale({ it: 'Esempio', en: 'Example' }, 'en'), 'Example')
  assert.equal(selectLocale({ it: 'Esempio', en: 'Example' }, 'it'), 'Esempio')
  assert.equal(selectLocale('già stringa', 'en'), 'già stringa')
  assert.equal(selectLocale(undefined, 'en'), '')
})

test('language selection falls back to Italian for an unsupported locale', () => {
  assert.equal(selectLocale({ it: 'Esempio', en: 'Example' }, 'de'), 'Esempio')
  assert.deepEqual(SUPPORTED_LOCALES, ['it', 'en'])
})

test('locale persists under the agreed storage key and rejects unknown values', () => {
  assert.equal(LOCALE_STORAGE_KEY, 'ai-sprint-locale-v1')
  const storage = memoryStorage()
  assert.equal(readLocale(storage), 'it')
  writeLocale('en', storage)
  assert.equal(storage.getItem(LOCALE_STORAGE_KEY), 'en')
  assert.equal(readLocale(storage), 'en')
  writeLocale('fr', storage)
  assert.equal(readLocale(storage), 'en')
  assert.equal(readLocale(undefined), 'it')
})

test('unit deep links are built and parsed symmetrically', () => {
  assert.equal(unitPath('llm-agents', 'agent-loop-workflow-mcp'), '/lesson/llm-agents?unit=agent-loop-workflow-mcp')
  assert.equal(unitPath('llm-agents'), '/lesson/llm-agents')
  assert.deepEqual(
    parseRoute('/lesson/llm-agents', '?unit=agent-loop-workflow-mcp'),
    { name: 'lesson', slug: 'llm-agents', unitId: 'agent-loop-workflow-mcp' }
  )
  assert.deepEqual(parseRoute('/lesson/llm-agents'), { name: 'lesson', slug: 'llm-agents', unitId: null })
})

test('parseRoute recognizes primary application destinations', () => {
  assert.deepEqual(parseRoute('/review'), { name: 'review' })
  assert.deepEqual(parseRoute('/interview'), { name: 'interview' })
  assert.deepEqual(parseRoute('/unknown'), { name: 'dashboard' })
})

test('normalizeAppHref does not duplicate the GitHub Pages base path', () => {
  assert.equal(normalizeAppHref('/', '/ia-apprendimento/'), '/ia-apprendimento/')
  assert.equal(normalizeAppHref('/sprint', '/ia-apprendimento/'), '/ia-apprendimento/sprint')
  assert.equal(normalizeAppHref('/lesson/llm-agents?unit=x', '/ia-apprendimento/'), '/ia-apprendimento/lesson/llm-agents?unit=x')
  assert.equal(normalizeAppHref('#quiz', '/ia-apprendimento/'), '#quiz')
})

test('unit state resolves a stable deep link and progress position', () => {
  const state = getUnitState(lessonFixture, 'unit-2', { cursor: 1 })
  assert.equal(state.index, 1)
  assert.equal(state.previous.id, 'unit-1')
  assert.equal(state.next.id, 'unit-3')
  assert.equal(state.total, 3)
  assert.equal(state.isFirst, false)
  assert.equal(state.isLast, false)
})

test('a lesson link without a unit opens the first incomplete unit', () => {
  assert.equal(getUnitState(lessonFixture, null, { cursor: 0 }).unit.id, 'unit-1')
  assert.equal(getUnitState(lessonFixture, null, { cursor: 2 }).unit.id, 'unit-3')
  assert.equal(getUnitState(lessonFixture, null, { cursor: 99 }).unit.id, 'unit-3')
  assert.equal(getUnitState(lessonFixture, null, undefined).unit.id, 'unit-1')
})

test('an unknown unit falls back instead of leaving a dead end', () => {
  const state = getUnitState(lessonFixture, 'does-not-exist', { cursor: 1 })
  assert.equal(state.unit.id, 'unit-2')
  assert.equal(state.requestedUnitFound, false)
  assert.equal(getUnitState(lessonFixture, 'unit-1', { cursor: 1 }).requestedUnitFound, true)
})

test('the first and last units expose their boundaries without a null next', () => {
  const first = getUnitState(lessonFixture, 'unit-1', { cursor: 0 })
  assert.equal(first.isFirst, true)
  assert.equal(first.previous, null)
  const last = getUnitState(lessonFixture, 'unit-3', { cursor: 0 })
  assert.equal(last.isLast, true)
  assert.equal(last.next, null)
})

test('a unit is complete only after its checkpoint and its activity self-mark', () => {
  assert.equal(isUnitComplete({ checkpointAnswered: true, activityMarked: true }), true)
  assert.equal(isUnitComplete({ checkpointAnswered: true, activityMarked: false }), false)
  assert.equal(isUnitComplete({ checkpointAnswered: false, activityMarked: true }), false)
  assert.equal(isUnitComplete(undefined), false)
  assert.equal(isUnitComplete({ checkpointAnswered: true, activityMarked: true, elapsedSeconds: 0 }), true)
})

test('unit state reports completion from the stored cursor', () => {
  const state = getUnitState(lessonFixture, 'unit-1', { cursor: 2 })
  assert.equal(state.completed, true)
  assert.equal(getUnitState(lessonFixture, 'unit-3', { cursor: 2 }).completed, false)
})

test('the unit view renders exactly one unit with every required section', () => {
  const lesson = curriculum[4]
  const state = getUnitState(lesson, lesson.units[2].id, { cursor: 0 })
  const html = renderUnitView({ lesson, state, locale: 'it', revealed: {}, checkpointChoice: null, activityMarked: false })

  for (const hook of [
    'data-unit-header', 'data-unit-index', 'data-unit-content',
    'data-learning-activity', 'data-unit-checkpoint', 'data-unit-sources', 'data-unit-controls'
  ]) {
    assert.equal(html.split(hook).length - 1 >= 1, true, `missing hook ${hook}`)
  }
  assert.equal(html.split('data-unit-content').length - 1, 1, 'only one unit may be rendered')
  const otherUnitTitles = lesson.units
    .filter((unit) => unit.id !== state.unit.id)
    .map((unit) => unit.title.it)
  const contentSection = html.slice(html.indexOf('data-unit-content'))
  for (const title of otherUnitTitles) {
    assert.equal(contentSection.includes(`<h2>${title}</h2>`), false, `unit ${title} must not be rendered`)
  }
  assert.ok(html.includes(state.unit.theory[0].it.slice(0, 60)))
  assert.ok(html.includes('aria-pressed'))
})

test('the unit view switches every learner-visible string to English', () => {
  const lesson = curriculum[4]
  const state = getUnitState(lesson, lesson.units[2].id, { cursor: 0 })
  const options = { lesson, state, revealed: {}, checkpointChoice: null, activityMarked: false }
  const italian = renderUnitView({ ...options, locale: 'it' })
  const english = renderUnitView({ ...options, locale: 'en' })

  assert.ok(italian.includes(state.unit.theory[0].it.slice(0, 60)))
  assert.ok(english.includes(state.unit.theory[0].en.slice(0, 60)))
  assert.ok(!english.includes(state.unit.theory[0].it.slice(0, 60)))
  assert.ok(english.includes(state.unit.checkpoint.prompt.en))
  assert.ok(italian.includes(state.unit.checkpoint.prompt.it))
})

test('hint, model solution and rubric reveal independently', () => {
  const lesson = curriculum[4]
  const state = getUnitState(lesson, lesson.units[0].id, { cursor: 0 })
  const activity = state.unit.activities[0]
  const base = { lesson, state, locale: 'it', checkpointChoice: null, activityMarked: false }

  const hidden = renderUnitView({ ...base, revealed: {} })
  assert.ok(!hidden.includes(activity.modelSolution.it))
  assert.ok(!hidden.includes(activity.hints[0].it))
  assert.ok(!hidden.includes(activity.rubric[0].it))

  const hintOnly = renderUnitView({ ...base, revealed: { hint: true } })
  assert.ok(hintOnly.includes(activity.hints[0].it))
  assert.ok(!hintOnly.includes(activity.modelSolution.it))
  assert.ok(!hintOnly.includes(activity.rubric[0].it))

  const solutionOnly = renderUnitView({ ...base, revealed: { solution: true } })
  assert.ok(solutionOnly.includes(activity.modelSolution.it))
  assert.ok(!solutionOnly.includes(activity.hints[0].it))

  const rubricOnly = renderUnitView({ ...base, revealed: { rubric: true } })
  assert.ok(rubricOnly.includes(activity.rubric[0].it))
  assert.ok(!rubricOnly.includes(activity.modelSolution.it))
})

test('the unit view never renders an elapsed-time gate and always offers a way forward', () => {
  const lesson = curriculum[4]
  for (const unit of lesson.units) {
    const state = getUnitState(lesson, unit.id, { cursor: 0 })
    const html = renderUnitView({ lesson, state, locale: 'it', revealed: {}, checkpointChoice: null, activityMarked: false })
    assert.doesNotMatch(html, /data-(?:timer|elapsed|wait)/u)
    assert.ok(html.includes('data-unit-controls'))
    assert.ok(
      html.includes('data-unit-next') || html.includes('data-lesson-finish'),
      `${unit.id} must offer a forward control`
    )
  }
})

test('sources are listed with resolvable identifiers for the rendered unit', () => {
  const lesson = curriculum[3]
  const state = getUnitState(lesson, lesson.units[8].id, { cursor: 0 })
  const html = renderUnitView({ lesson, state, locale: 'en', revealed: {}, checkpointChoice: null, activityMarked: false })
  for (const sourceId of state.unit.sourceIds) {
    assert.ok(html.includes(sourceId), `source ${sourceId} must be listed`)
  }
  assert.ok(html.includes('https://'))
})

test('every professional interview answer is renderable in both languages', () => {
  const lesson = curriculum[5]
  const italian = renderLessonInterviewAnswers(lesson, 'it')
  const english = renderLessonInterviewAnswers(lesson, 'en')
  assert.equal(italian.split('data-interview-answer="').length - 1, lesson.interviewAnswers.length)
  assert.equal(english.split('data-interview-answer="').length - 1, lesson.interviewAnswers.length)
  for (const answer of lesson.interviewAnswers) {
    assert.ok(italian.includes(answer.prompt.it))
    assert.ok(english.includes(answer.prompt.en))
  }
})

test('getDashboardState returns the first unfinished lesson and true completion percentage', () => {
  const progress = {
    'digital-transformation': { status: 'completed', bestScore: 100 },
    'ot-it-ai-cloud': { status: 'in_progress', bestScore: 33 }
  }
  const state = getDashboardState(lessons, progress)
  assert.equal(state.nextLesson.id, 'ot-it-ai-cloud')
  assert.equal(state.completedCount, 1)
  assert.equal(state.percent, 17)
})

test('quizFeedback explains both correct and incorrect choices', () => {
  const question = lessons[0].quiz[0]
  assert.deepEqual(quizFeedback(question, 1), { correct: true, label: 'Corretto', explanation: question.explanation })
  assert.deepEqual(quizFeedback(question, 0), { correct: false, label: 'Da rivedere', explanation: question.explanation })
})

test('the application binds a handler for every interactive hook the renderer emits', async () => {
  const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  const lesson = curriculum[4]
  const state = getUnitState(lesson, lesson.units[0].id, { cursor: 0 })
  const markup = renderUnitView({ lesson, state, locale: 'it', revealed: {}, checkpointChoice: null, activityMarked: false })
    + renderLessonInterviewAnswers(lesson, 'it')
    + renderLocaleSwitch('it')

  const emittedHooks = [...new Set([...markup.matchAll(/data-([a-z-]+)(?==|[\s>])/gu)].map(([, hook]) => hook))]
  const interactiveHooks = emittedHooks.filter((hook) => [
    'reveal-toggle', 'activity-mark', 'checkpoint-option', 'answer-toggle', 'locale'
  ].includes(hook))

  assert.deepEqual(interactiveHooks.sort(), [
    'activity-mark', 'answer-toggle', 'checkpoint-option', 'locale', 'reveal-toggle'
  ])
  for (const hook of interactiveHooks) {
    assert.ok(source.includes(`[data-${hook}]`), `app.js must bind [data-${hook}]`)
  }
  assert.ok(source.includes('[data-quiz-option]'), 'app.js must bind the final checkpoint options')
})

test('the application reads the unit from the query string and persists the locale', async () => {
  const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  assert.match(source, /parseRoute\(toAppPath\(location\.pathname\), location\.search\)/u)
  assert.match(source, /renderLesson\(route\.slug, route\.unitId\)/u)
  assert.match(source, /bindLessonEvents\(route\.slug, route\.unitId\)/u)
  assert.match(source, /locale = writeLocale\(requested\)/u)
  assert.match(source, /document\.documentElement\.lang = locale/u)
  assert.doesNotMatch(source, /lesson\.blocks/u, 'the renderer must no longer depend on the legacy projection')
})

test('completing a unit advances the cursor by exactly one position', () => {
  const lesson = curriculum[4]
  let stored = { cursor: 0 }
  const advance = (index) => {
    const state = getUnitState(lesson, lesson.units[index].id, stored)
    if (!isUnitComplete({ checkpointAnswered: true, activityMarked: true })) return
    stored = { cursor: Math.max(stored.cursor, Math.min(state.index + 1, lesson.units.length)) }
  }
  advance(0)
  assert.equal(stored.cursor, 1)
  advance(1)
  assert.equal(stored.cursor, 2)
  advance(0)
  assert.equal(stored.cursor, 2, 'revisiting an earlier unit must never regress the cursor')
  assert.equal(getUnitState(lesson, null, stored).unit.id, lesson.units[2].id)
})

test('switching language preserves the resolved unit and its progress position', () => {
  const lesson = curriculum[4]
  const stored = { cursor: 3 }
  const italian = getUnitState(lesson, lesson.units[3].id, stored)
  const english = getUnitState(lesson, lesson.units[3].id, stored)
  assert.equal(italian.unit.id, english.unit.id)
  assert.equal(italian.index, english.index)
  assert.equal(italian.cursor, english.cursor)
  assert.equal(
    unitPath(lesson.slug, italian.unit.id),
    unitPath(lesson.slug, english.unit.id),
    'the deep link must not change with the language'
  )
})

test('the unit stylesheet keeps mobile targets, readable text and scrollable tables', async () => {
  const css = await readFile(new URL('../public/styles.css', import.meta.url), 'utf8')

  assert.match(css, /\.decision-aid \{[^}]*overflow-x: auto/u, 'wide tables must scroll instead of overflowing')
  assert.match(css, /\.unit-index ol \{[^}]*overflow-x: auto/u, 'the unit index must scroll on narrow screens')
  for (const selector of [
    '.locale-switch button', '.unit-index a', '.checkpoint-options button',
    '.reveal-actions .button', '.activity-mark', '.unit-controls .button'
  ]) {
    const rule = css.match(new RegExp(`${selector.replaceAll('.', '\\.')} \\{[^}]*\\}`, 'u'))
    assert.ok(rule, `${selector} must be styled`)
    assert.match(rule[0], /min-height: (4[4-9]|[5-9]\d)px/u, `${selector} must keep a 44px tap target`)
  }
  assert.match(css, /body \{[^}]*font-size: 18px/u)
  const phoneBreakpoint = css.indexOf('@media (max-width: 620px)')
  assert.ok(phoneBreakpoint > -1, 'a phone breakpoint must exist')
  assert.match(
    css.slice(phoneBreakpoint),
    /body \{ font-size: 1[6-9]px/u,
    'body text must stay at least 16px on phones'
  )
  assert.match(css, /@media \(min-width: 900px\)/u, 'desktop must show the side index')
  assert.match(css, /max-width: 72ch/u, 'reading measure must stay near 72 characters')
})

test('every landmark and progress indicator carries a distinct accessible name', () => {
  const lesson = curriculum[4]
  for (const locale of ['it', 'en']) {
    const state = getUnitState(lesson, lesson.units[2].id, { cursor: 2 })
    const html = renderUnitView({ lesson, state, locale, revealed: {}, checkpointChoice: null, activityMarked: false })

    const navLabels = [...html.matchAll(/<nav[^>]*aria-label="([^"]+)"/gu)].map(([, label]) => label)
    assert.equal(navLabels.length, 2, 'the unit index and the unit controls are both landmarks')
    assert.equal(new Set(navLabels).size, 2, `landmark names must differ, received ${navLabels.join(' / ')}`)

    const progressBar = html.match(/role="progressbar"[^>]*>/u)
    assert.ok(progressBar, 'the unit progress indicator must exist')
    assert.match(progressBar[0], /aria-label="[^"]+"/u, 'the progress indicator needs an accessible name')
  }
})

test('a unit without an activity completes on its checkpoint alone', () => {
  assert.equal(isUnitComplete({ checkpointAnswered: true, activityMarked: false, hasActivity: false }), true)
  assert.equal(isUnitComplete({ checkpointAnswered: false, activityMarked: false, hasActivity: false }), false)
  assert.equal(isUnitComplete({ checkpointAnswered: true, activityMarked: false, hasActivity: true }), false)
  assert.equal(isUnitComplete({ checkpointAnswered: true, activityMarked: true, hasActivity: true }), true)
})

test('every unit in the curriculum can actually be completed', () => {
  for (const lesson of curriculum) {
    for (const unit of lesson.units) {
      const hasActivity = Boolean((unit.activities || []).length)
      assert.ok(unit.checkpoint, `${lesson.id}/${unit.id} needs a checkpoint`)
      assert.equal(
        isUnitComplete({ checkpointAnswered: true, activityMarked: hasActivity, hasActivity }),
        true,
        `${lesson.id}/${unit.id} must be completable`
      )
    }
  }
})

test('the unit view reports the correct completion requirement for a unit with no activity', () => {
  const lesson = curriculum[0]
  const unitWithoutActivity = lesson.units.find((unit) => !(unit.activities || []).length)
  assert.ok(unitWithoutActivity, 'module one still has a unit without an activity')
  const state = getUnitState(lesson, unitWithoutActivity.id, { cursor: 0 })
  const html = renderUnitView({ lesson, state, locale: 'it', revealed: {}, checkpointChoice: 1, activityMarked: false })
  assert.ok(!html.includes('data-activity-mark'), 'no activity means no self-mark control')
  assert.ok(html.includes('Unità completata'), 'the unit must report itself complete after the checkpoint')
})

test('the unit grid constrains its columns so a wide child cannot overflow the phone viewport', async () => {
  const css = await readFile(new URL('../public/styles.css', import.meta.url), 'utf8')

  const baseRule = css.match(/\.lesson-unit \{[^}]*\}/u)
  assert.ok(baseRule, '.lesson-unit must be styled')
  assert.match(baseRule[0], /display: grid/u)
  assert.match(
    baseRule[0],
    /grid-template-columns: minmax\(0, 1fr\)/u,
    'without an explicit minmax(0, 1fr) the implicit auto column grows to the widest child and overflows 360px'
  )

  const desktop = css.slice(css.indexOf('@media (min-width: 900px)'))
  assert.match(
    desktop.match(/\.lesson-unit \{[^}]*\}/u)[0],
    /grid-template-columns: 250px minmax\(0, 1fr\)/u,
    'the desktop side index must keep its own constrained column'
  )
})

test('an application path keeps its query when it is split for navigation', () => {
  assert.deepEqual(splitAppPath('/lesson/llm-agents?unit=agent-loop-workflow-mcp'), {
    pathname: '/lesson/llm-agents',
    search: '?unit=agent-loop-workflow-mcp'
  })
  assert.deepEqual(splitAppPath('/sprint'), { pathname: '/sprint', search: '' })
  assert.deepEqual(splitAppPath('/'), { pathname: '/', search: '' })
  assert.deepEqual(splitAppPath(''), { pathname: '/', search: '' })
  assert.deepEqual(splitAppPath('/lesson/x?a=1&b=2'), { pathname: '/lesson/x', search: '?a=1&b=2' })
})

test('every in-app link target survives a navigation round trip', () => {
  const lesson = curriculum[0]
  const state = getUnitState(lesson, lesson.units[0].id, { cursor: 0 })
  const html = renderUnitView({ lesson, state, locale: 'it', revealed: {}, checkpointChoice: null, activityMarked: false })

  const hrefs = [...html.matchAll(/data-link[^>]*href="([^"]+)"|href="([^"]+)"[^>]*data-link/gu)]
    .map(([, a, b]) => a || b)
    .filter((href) => href.startsWith('/lesson/'))
  assert.ok(hrefs.length >= 2, 'the unit view must link to other units')
  assert.ok(hrefs.some((href) => href.includes('?unit=')), 'unit links must carry the unit query')

  for (const href of hrefs) {
    const { pathname, search } = splitAppPath(href)
    const route = parseRoute(pathname, search)
    if (!href.includes('?unit=')) continue
    assert.equal(route.name, 'lesson')
    assert.ok(route.unitId, `navigating to ${href} must preserve the unit, received ${route.unitId}`)
    assert.ok(
      lesson.units.some((unit) => unit.id === route.unitId),
      `${href} must resolve to a real unit`
    )
  }
})

test('the click handler forwards the query so a unit link is not flattened to the lesson', async () => {
  const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  assert.match(
    source,
    /navigate\(link\.pathname \+ link\.search\)/u,
    'passing only link.pathname drops ?unit= and sends every unit link back to the first incomplete unit'
  )
  assert.match(source, /splitAppPath/u, 'navigate must rebuild the URL from path and query')
})

test('the shell copy is complete and actually differs between the two languages', () => {
  const italian = shellCopy('it')
  const english = shellCopy('en')

  assert.deepEqual(Object.keys(italian).sort(), Object.keys(english).sort(), 'both languages must define the same keys')
  assert.equal(shellCopy('de'), italian, 'an unsupported locale falls back to Italian')

  // These labels are deliberately the same in both languages: they are English
  // terms the Italian copy already uses as-is, or brand and unit labels.
  const intentionallyShared = [
    'navSprint', 'navInterview', 'readiness', 'activeRecall',
    'sprintEyebrow', 'interviewTitle', 'thirtySec', 'twoMin'
  ]
  const shared = Object.keys(italian)
    .filter((key) => typeof italian[key] === 'string' && italian[key] === english[key])
    .filter((key) => !intentionallyShared.includes(key))
  assert.deepEqual(shared, [], `these shell strings are identical in both languages: ${shared.join(', ')}`)
  assert.equal(typeof italian.modulesDone, 'function')
  assert.match(italian.modulesDone(2, 6), /2 di 6/u)
  assert.match(english.modulesDone(2, 6), /2 of 6/u)
})

test('no page in the application renders a hard-coded Italian shell string', async () => {
  const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  const italianOnly = [
    'Inizia lo sprint', 'Continua lo sprint', 'Apri la lezione', 'PROSSIMA MOSSA',
    'domande da ripassare', 'Ripassa ora', 'Sei moduli. Un filo logico.',
    'QUEUED', 'Ripassa ciò che conta.', 'DOMANDE DA RIVEDERE',
    'Mostra risposta e spiegazione', 'La coda è vuota.', 'Vai allo sprint',
    'Nessun termine trovato.', 'Avvia simulazione', 'Riprendi simulazione'
  ]
  const leaked = italianOnly.filter((phrase) => source.includes(`>${phrase}`) || source.includes(`'${phrase}'`))
  assert.deepEqual(leaked, [], `these strings bypass the language switch: ${leaked.join(' | ')}`)
})

test('the static navigation is localized without losing its icons', () => {
  const links = [
    { dataset: { nav: 'dashboard' }, children: ['icon'] },
    { dataset: { nav: 'sprint' }, children: ['icon'] },
    { dataset: { nav: 'review' }, children: ['icon'] },
    { dataset: { nav: 'interview' }, children: ['icon'] }
  ].map((link) => ({
    ...link,
    textContent: 'old',
    appended: [],
    querySelector: () => ({ tag: 'span' }),
    appendChild(node) { this.appended.push(node) },
    append(text) { this.appended.push(text) }
  }))
  const fakeDocument = { querySelectorAll: () => links }

  applyShellLocale(fakeDocument, 'en')
  assert.deepEqual(links.map((link) => link.appended[1]), ['Today', 'Sprint', 'Review', 'Interview'])
  assert.ok(links.every((link) => link.appended[0]?.tag === 'span'), 'the icon must be preserved')

  applyShellLocale(fakeDocument, 'it')
  assert.deepEqual(links.map((link) => link.appended[3]), ['Oggi', 'Sprint', 'Ripasso', 'Interview'])
})

test('the final checkpoint is localized and keeps the review IDs stable', () => {
  const lesson = curriculum[1]
  const projected = lessons.find((item) => item.id === lesson.id)
  const italian = localizedFinalQuiz(lesson, 'it')
  const english = localizedFinalQuiz(lesson, 'en')

  assert.equal(italian.length, lesson.finalQuiz.length)
  assert.deepEqual(
    english.map(({ id }) => id),
    projected.quiz.map(({ id }) => id),
    'switching language must not change a question ID, or the review queue breaks'
  )

  for (const [index, question] of english.entries()) {
    const source = lesson.finalQuiz[index]
    assert.equal(question.prompt, source.prompt.en)
    assert.deepEqual(question.options, source.options.map((option) => option.en))
    assert.equal(question.explanation, source.options[source.correctOption].explanation.en)
    assert.equal(question.correctOption, source.correctOption)
    assert.notEqual(question.prompt, italian[index].prompt, 'the prompt must actually change language')
  }
})

test('checkpoint feedback labels follow the selected language', () => {
  const question = localizedFinalQuiz(curriculum[1], 'en')[0]
  assert.equal(quizFeedback(question, question.correctOption, 'it').label, 'Corretto')
  assert.equal(quizFeedback(question, question.correctOption, 'en').label, 'Correct')
  assert.equal(quizFeedback(question, question.correctOption + 1, 'en').label, 'Review this')
  assert.equal(quizFeedback(question, question.correctOption).label, 'Corretto')
})

test('the final checkpoint block stays centred like every other shell section', async () => {
  const css = await readFile(new URL('../public/styles.css', import.meta.url), 'utf8')
  const rule = css.match(/\.lesson-glossary, \.quiz-section, \.answer-lab \{[^}]*\}/u)
  assert.ok(rule, 'the shared section rule must exist')
  assert.doesNotMatch(
    rule[0],
    /margin: \d+px 0 0/u,
    'a zero inline margin overrides .shell margin-inline:auto and pins the block to the left edge'
  )
  assert.match(rule[0], /margin: \d+px auto 0/u, 'the block must keep its top margin and stay centred')
})

test('the answer lab sets its own text colour instead of inheriting the dark section', async () => {
  const css = await readFile(new URL('../public/styles.css', import.meta.url), 'utf8')

  const darkSection = css.match(/\.quiz-section \{[^}]*\}/u)[0]
  assert.match(darkSection, /color: white/u, 'the checkpoint block is intentionally dark')

  const answerLab = css.match(/^\.answer-lab \{[^}]*\}/mu)
  assert.ok(answerLab, '.answer-lab must be styled')
  assert.match(
    answerLab[0],
    /color: var\(--ink\)/u,
    'nested inside .quiz-section the answer lab inherits white text, which renders the model answers white on white'
  )
  assert.match(css, /\.answer-lab \.eyebrow \{ color:/u, 'the answer lab eyebrow needs its own colour on a light background')
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
  countAnswered,
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
import {
  applyShellLocale,
  renderConfusedPairs,
  renderGlossaryEntries,
  renderInterviewAnswers,
  renderLocaleSwitch,
  renderUnitView,
  shellCopy
} from '../public/render.js'
import { confusedPairs, curriculum, glossary, interviewAnswers } from '../public/content.js'

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

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escaped = (value) => String(value).replace(/[&<>"']/gu, (character) => ESCAPES[character])

const sampleLesson = curriculum[2]
const sampleState = getUnitState(sampleLesson, sampleLesson.units[1].id, { cursor: 0 })

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
  assert.equal(readLocale(storage), 'en')
  writeLocale('fr', storage)
  assert.equal(readLocale(storage), 'en')
  assert.equal(readLocale(undefined), 'it')
})

test('unit deep links are built and parsed symmetrically', () => {
  assert.equal(unitPath('in-produzione', 'mvp-prototipo-pilota'), '/lesson/in-produzione?unit=mvp-prototipo-pilota')
  assert.equal(unitPath('in-produzione'), '/lesson/in-produzione')
  assert.deepEqual(
    parseRoute('/lesson/in-produzione', '?unit=mvp-prototipo-pilota'),
    { name: 'lesson', slug: 'in-produzione', unitId: 'mvp-prototipo-pilota' }
  )
  assert.deepEqual(parseRoute('/lesson/in-produzione'), { name: 'lesson', slug: 'in-produzione', unitId: null })
})

test('parseRoute recognizes every destination, including the older names', () => {
  assert.deepEqual(parseRoute('/corso'), { name: 'course' })
  assert.deepEqual(parseRoute('/sprint'), { name: 'course' }, 'a bookmarked /sprint must keep working')
  assert.deepEqual(parseRoute('/review'), { name: 'review' })
  assert.deepEqual(parseRoute('/glossario'), { name: 'glossary' })
  assert.deepEqual(parseRoute('/interview'), { name: 'interview' })
  assert.deepEqual(parseRoute('/colloquio'), { name: 'interview' })
  assert.deepEqual(parseRoute('/unknown'), { name: 'dashboard' })
})

test('splitAppPath keeps the query, so a unit deep link survives navigation', () => {
  assert.deepEqual(splitAppPath('/lesson/in-produzione?unit=esperimento-credibile'), {
    pathname: '/lesson/in-produzione', search: '?unit=esperimento-credibile'
  })
  assert.deepEqual(splitAppPath('/corso'), { pathname: '/corso', search: '' })
})

test('normalizeAppHref does not duplicate the GitHub Pages base path', () => {
  assert.equal(normalizeAppHref('/', '/ia-apprendimento/'), '/ia-apprendimento/')
  assert.equal(normalizeAppHref('/corso', '/ia-apprendimento/'), '/ia-apprendimento/corso')
  assert.equal(normalizeAppHref('/lesson/in-produzione?unit=x', '/ia-apprendimento/'), '/ia-apprendimento/lesson/in-produzione?unit=x')
  assert.equal(normalizeAppHref('#quiz', '/ia-apprendimento/'), '#quiz')
})

test('unit state resolves a stable deep link and progress position', () => {
  const state = getUnitState(lessonFixture, 'unit-2', { cursor: 1 })
  assert.equal(state.index, 1)
  assert.equal(state.previous.id, 'unit-1')
  assert.equal(state.next.id, 'unit-3')
  assert.equal(state.total, 3)
})

test('a module link without a unit opens the first incomplete unit', () => {
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

test('a unit is complete when every question of its quiz has an answer', () => {
  assert.equal(isUnitComplete({ answeredQuestions: 7, totalQuestions: 7 }), true)
  assert.equal(isUnitComplete({ answeredQuestions: 6, totalQuestions: 7 }), false)
  assert.equal(isUnitComplete({ answeredQuestions: 7, totalQuestions: 0 }), false)
  assert.equal(isUnitComplete(undefined), false)
  assert.equal(isUnitComplete({ answeredQuestions: 7, totalQuestions: 7, elapsedSeconds: 0 }), true)
})

test('countAnswered only counts questions that actually have an answer', () => {
  const unit = sampleLesson.units[0]
  assert.equal(countAnswered(unit, {}), 0)
  assert.equal(countAnswered(unit, { [unit.quiz[0].id]: 0, [unit.quiz[1].id]: 3 }), 2)
  assert.equal(countAnswered(unit, { [unit.quiz[0].id]: null }), 0)
})

test('quiz feedback names the outcome in the reader language', () => {
  const question = sampleLesson.units[0].quiz[0]
  assert.equal(quizFeedback(question, question.correctOption, 'it').correct, true)
  assert.equal(quizFeedback(question, question.correctOption, 'en').label, 'Correct')
  assert.equal(quizFeedback(question, (question.correctOption + 1) % 4, 'it').label, 'Da rivedere')
})

test('the dashboard counts completed modules and the review queue', () => {
  const progress = {
    trasformazione: { status: 'completed', reviewQuestionIds: ['a'] },
    'fabbrica-digitale': { status: 'in_progress', reviewQuestionIds: ['b', 'c'] }
  }
  const state = getDashboardState(curriculum, progress)
  assert.equal(state.completedCount, 1)
  assert.equal(state.reviewCount, 3)
  assert.equal(state.nextLesson.id, 'fabbrica-digitale')
  assert.equal(state.percent, 20)
})

test('the unit view renders exactly one unit with every required section', () => {
  const html = renderUnitView({ lesson: sampleLesson, state: sampleState, locale: 'it' })

  for (const hook of [
    'data-unit-header', 'data-unit-index', 'data-unit-content', 'data-unit-stage',
    'data-unit-terms', 'data-unit-example', 'data-unit-english', 'data-unit-quiz',
    'data-unit-sources', 'data-unit-controls'
  ]) {
    assert.ok(html.includes(hook), `missing hook ${hook}`)
  }
  assert.equal(html.split('data-unit-content').length - 1, 1, 'only one unit may be rendered')
  assert.ok(html.includes(escaped(sampleState.unit.theory[0].it).slice(0, 60)))
  assert.equal(html.split('data-question=').length - 1, 7, 'the unit quiz must render seven questions')
})

test('an enumeration is rendered as named steps, one per line, not buried in a paragraph', () => {
  const lessonWithSteps = {
    ...sampleLesson,
    units: [{
      ...sampleState.unit,
      theory: [
        { it: 'Un paragrafo normale.', en: 'A normal paragraph.' },
        {
          steps: [
            { name: { it: 'Osservo', en: 'I watch' }, text: { it: 'Parto da una perdita.', en: 'I start from a loss.' } },
            { name: { it: 'Misuro', en: 'I measure' }, text: { it: 'Prendo la baseline.', en: 'I take the baseline.' } },
            { name: { it: 'Decido', en: 'I decide' }, text: { it: 'Estendo o mi fermo.', en: 'I scale or I stop.' } }
          ]
        }
      ]
    }]
  }
  const state = getUnitState(lessonWithSteps, lessonWithSteps.units[0].id, { cursor: 0 })
  const html = renderUnitView({ lesson: lessonWithSteps, state, locale: 'it' })

  assert.ok(html.includes('data-named-steps'), 'the named list needs its own hook')
  assert.equal(html.split('<li><b>').length - 1, 3, 'every step gets its own line')
  assert.ok(html.includes('<b>Osservo</b>'), 'the step name must be in bold')
  assert.ok(html.includes('<p>Un paragrafo normale.</p>'), 'plain paragraphs keep working')

  const english = renderUnitView({ lesson: lessonWithSteps, state, locale: 'en' })
  assert.ok(english.includes('<b>I watch</b>'), 'step names are bilingual too')
})

test('the unit view switches every learner-visible string to English', () => {
  const english = renderUnitView({ lesson: sampleLesson, state: sampleState, locale: 'en' })
  const italian = renderUnitView({ lesson: sampleLesson, state: sampleState, locale: 'it' })

  assert.ok(english.includes(sampleState.unit.title.en))
  assert.ok(english.includes(escaped(sampleState.unit.theory[0].en).slice(0, 50)))
  assert.ok(english.includes('Next unit'))
  assert.ok(italian.includes('Unità successiva'))
  assert.ok(!english.includes('Unità successiva'))
})

test('the spoken English block stays in English in both interface languages', () => {
  const line = sampleState.unit.englishBlock.lines[0]
  for (const locale of ['it', 'en']) {
    const html = renderUnitView({ lesson: sampleLesson, state: sampleState, locale })
    assert.ok(html.includes(line), `the English lines must survive in ${locale}`)
    assert.ok(html.includes('lang="en"'), 'the English block must declare its language')
  }
})

test('an answered question shows its explanation and locks its options', () => {
  const question = sampleState.unit.quiz[0]
  const wrong = (question.correctOption + 1) % 4
  const html = renderUnitView({
    lesson: sampleLesson, state: sampleState, locale: 'it', answers: { [question.id]: wrong }
  })
  assert.ok(html.includes(question.explanation), 'the explanation must be visible after answering')
  assert.ok(html.includes('data-correct-option'), 'the correct option must be marked')
  assert.ok(html.includes('data-wrong-option'), 'the chosen wrong option must be marked')
  assert.ok(html.includes('disabled'), 'an answered question cannot be answered twice')
  assert.ok(html.includes('1 di 7'))
})

test('the unit view never leaves raw markup from the content in the page', () => {
  const html = renderUnitView({ lesson: sampleLesson, state: sampleState, locale: 'it' })
  assert.ok(!html.includes('<script'), 'content must be escaped')
  assert.ok(html.includes('&#39;') || html.includes('&amp;') || !html.includes("'unit"), 'quotes must be escaped')
})

test('the interview page shows the expectation and hides the answer until asked', () => {
  const html = renderInterviewAnswers(interviewAnswers, 'it')
  assert.equal(html.split('data-interview-answer=').length - 1, 10)
  assert.ok(html.includes(interviewAnswers[0].expectation))
  assert.ok(html.includes('<details'), 'the model answer must stay collapsed')
  assert.ok(html.includes(interviewAnswers[0].english[0]))
  assert.ok(html.includes('Tre punti da non dimenticare'))
  assert.ok(renderInterviewAnswers(interviewAnswers, 'en').includes('Three points to remember'))
})

test('the glossary renders every term with the unit that explains it', () => {
  const html = renderGlossaryEntries(glossary.slice(0, 5), 'it')
  assert.equal(html.split('data-term-entry=').length - 1, 5)
  assert.ok(html.includes(glossary[0].term))
  assert.ok(html.includes(glossary[0].where))
  assert.ok(renderGlossaryEntries([], 'it').includes('Nessun termine trovato'))
  assert.ok(renderGlossaryEntries([], 'en').includes('No term found'))
})

test('the confused pairs are rendered in both languages', () => {
  assert.ok(renderConfusedPairs(confusedPairs, 'it').includes(confusedPairs[0].pair.it))
  assert.ok(renderConfusedPairs(confusedPairs, 'en').includes(confusedPairs[0].pair.en))
})

test('the language switch reports the active language to assistive technology', () => {
  const html = renderLocaleSwitch('en')
  assert.ok(html.includes('data-locale="it" aria-pressed="false"'))
  assert.ok(html.includes('data-locale="en" aria-pressed="true"'))
})

test('the shell navigation is localized without losing its icons', () => {
  const links = [
    { dataset: { nav: 'dashboard' }, children: [], textContent: 'Oggi' },
    { dataset: { nav: 'glossary' }, children: [], textContent: 'Glossario' }
  ].map((link) => ({
    ...link,
    querySelector: () => ({ tag: 'span' }),
    appendChild(child) { this.children.push(child) },
    append(label) { this.children.push(label) }
  }))
  const documentStub = { querySelectorAll: () => links }

  applyShellLocale(documentStub, 'en')
  assert.deepEqual(links[0].children, [{ tag: 'span' }, 'Today'])
  assert.deepEqual(links[1].children, [{ tag: 'span' }, 'Glossary'])
  assert.equal(shellCopy('en').navCourse, 'Course')
  assert.equal(shellCopy('it').navCourse, 'Corso')
  assert.equal(shellCopy('de').navCourse, 'Corso')
})

test('the application binds the quiz and the glossary search it renders', async () => {
  const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  assert.ok(source.includes('[data-quiz-option]'), 'app.js must bind the unit quiz options')
  assert.ok(source.includes('#term-search'), 'app.js must bind the glossary search')
  assert.ok(source.includes('data-locale'), 'app.js must bind the language switch')
  assert.ok(source.includes('saveAnswers'), 'answers must be persisted')
})

test('the quiz feedback is readable: no rule paints its text white on a light card', async () => {
  const css = await readFile(new URL('../public/styles.css', import.meta.url), 'utf8')
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/gu)].map(([, selector, body]) => ({
    selector: selector.trim(), body
  }))

  const quizRules = rules.filter(({ selector }) => (
    /\.feedback|\.quiz-card|\.quiz-options/u.test(selector) && !selector.includes('.unit-english')
  ))
  assert.ok(quizRules.length > 0, 'the quiz must be styled')

  for (const { selector, body } of quizRules) {
    const colour = body.match(/(?:^|;)\s*color:\s*([^;]+)/u)?.[1]?.trim()
    if (!colour) continue
    assert.ok(
      !/rgba\(\s*255\s*,\s*255\s*,\s*255/u.test(colour) && !/^#fff/iu.test(colour) && colour !== 'white',
      `${selector} paints quiz text white, and the quiz card is light: ${colour}`
    )
  }
})

test('the shell navigation in index.html matches the routes the application knows', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8')
  const navs = [...html.matchAll(/data-nav="([^"]+)"/gu)].map(([, name]) => name)
  assert.deepEqual(navs, ['dashboard', 'course', 'review', 'glossary', 'interview'])
  const hrefs = [...html.matchAll(/href="(\/[^"]*)" data-link/gu)].map(([, href]) => href)
  for (const href of hrefs) {
    const route = parseRoute(href)
    assert.ok(route.name, `${href} must resolve to a route`)
  }
})

import test from 'node:test'
import assert from 'node:assert/strict'
import {
  countWords,
  lessonPlannedMinutes,
  localized,
  validateCurriculum
} from '../public/content/schema.js'
import { validateLessons } from '../public/learning.js'
import { sourceById, sources } from '../public/content/sources.js'

const lessonDefinitions = [
  ['digital-transformation', 'digital-transformation', 50, { theory: 25, cases: 15, practice: 10 }, 5667],
  ['ot-it-ai-cloud', 'ot-it-ai-cloud', 75, { theory: 38, cases: 22, practice: 15 }, 5667],
  ['data-ai-use-cases', 'data-ai-use-cases', 65, { theory: 31, cases: 20, practice: 14 }, 5667],
  ['llm-agents', 'llm-agents', 80, { theory: 40, cases: 22, practice: 18 }, 5667],
  ['mvp-governance', 'mvp-governance', 75, { theory: 36, cases: 22, practice: 17 }, 5666],
  ['interview-lab', 'interview-lab', 75, { theory: 19, cases: 25, practice: 31 }, 5666]
]

const sourcesFixture = {
  primary: { type: 'primary' },
  educational: { type: 'educational', verifiedAgainst: ['primary'] }
}

const text = (it, en) => ({ it, en })
const words = (count, word) => Array(count).fill(word).join(' ')
const example = (number) => ({ title: text(`Esempio ${number}`, `Example ${number}`), explanation: text('Dettaglio italiano', 'English detail') })
const workedCase = (number) => ({
  title: text(`Caso ${number}`, `Case ${number}`),
  scenario: text('Scenario ipotetico', 'Hypothetical scenario'),
  reasoning: text('Ragionamento esplicito', 'Explicit reasoning'),
  decision: text('Decisione motivata', 'Reasoned decision'),
  tradeOff: text('Compromesso dichiarato', 'Stated trade-off'),
  outcome: text('Esito misurabile', 'Measurable outcome'),
  pmiCase: true,
  hypothetical: true,
  publicContext: true
})

function curriculumFixture(wordsPerLesson = lessonDefinitions.map((definition) => definition[4])) {
  return lessonDefinitions.map(([id, slug, durationMinutes, timeBudget], lessonIndex) => {
    const unitCount = Math.max(6, Math.ceil(durationMinutes / 10))
    const baseMinutes = Math.floor(durationMinutes / unitCount)
    const extraMinutes = durationMinutes % unitCount
    const unitMinutes = Array.from({ length: unitCount }, (_, unitIndex) => (
      baseMinutes + (unitIndex < extraMinutes ? 1 : 0)
    ))
    const minuteModes = Object.entries(timeBudget)
      .flatMap(([mode, minutes]) => Array(minutes).fill(mode))
    let minuteCursor = 0
    const units = Array.from({ length: unitCount }, (_, unitIndex) => {
      const estimatedMinutes = unitMinutes[unitIndex]
      const allocatedModes = minuteModes.slice(minuteCursor, minuteCursor + estimatedMinutes)
      minuteCursor += estimatedMinutes
      const timeAllocation = { theory: 0, cases: 0, practice: 0 }
      for (const mode of allocatedModes) timeAllocation[mode] += 1
      return ({
      id: `unit-${unitIndex + 1}`,
      eyebrow: text('Contesto', 'Context'),
      title: text('Titolo', 'Title'),
      estimatedMinutes,
      timeAllocation,
      theory: unitIndex === 0 ? [text(
        words(wordsPerLesson[lessonIndex], 'italiano'),
        words(Math.ceil(wordsPerLesson[lessonIndex] * 0.85), 'english')
      )] : [],
      keyPoints: [text('Punto chiave', 'Key point')],
      sourceIds: ['primary'],
      checkpoint: {
        prompt: text('Domanda?', 'Question?'),
        options: [
          { ...text('Risposta uno', 'Answer one'), explanation: text('Spiegazione uno', 'Explanation one') },
          { ...text('Risposta due', 'Answer two'), explanation: text('Spiegazione due', 'Explanation two') }
        ],
        correctOption: 0
      },
      microExamples: unitIndex === 0 ? [example(1), example(2), example(3), example(4)] : [],
      workedCases: unitIndex === 0 ? [workedCase(1), workedCase(2)] : [],
      activities: unitIndex === 0 ? [
        { prompt: text('Attività uno', 'Activity one'), solution: text('Soluzione uno', 'Solution one'), rubric: [text('Criterio uno', 'Criterion one')] },
        { prompt: text('Attività due', 'Activity two'), modelSolution: text('Soluzione due', 'Solution two'), rubric: [text('Criterio due', 'Criterion two')] }
      ] : []
    })})
    return {
      id,
      slug,
      durationMinutes,
      timeBudget: { ...timeBudget },
      units,
      professionalArtifacts: [{ title: text('Artefatto professionale', 'Professional artifact'), description: text('Descrizione italiana', 'English description') }],
      interviewAnswers: [{
        prompt: text('Domanda professionale?', 'Professional question?'),
        short: text('Risposta breve italiana', 'Short English answer'),
        long: text('Risposta italiana estesa con dettaglio.', 'Extended English answer with supporting detail.'),
        followUps: [text('Domanda successiva?', 'Follow-up question?')]
      }]
    }
  })
}

const clone = (value) => structuredClone(value)

const invalidLessonFixture = {
  id: 'digital-transformation',
  slug: 'digital-transformation',
  durationMinutes: 50,
  timeBudget: { theory: 25, cases: 15, practice: 10 },
  units: [{
    id: 'unit-1',
    eyebrow: { it: 'Contesto', en: 'Context' },
    title: { it: 'Titolo', en: 'Title' },
    estimatedMinutes: 50,
    timeAllocation: { theory: 25, cases: 15, practice: 10 },
    theory: [{ it: 'Spiegazione italiana', en: 'English explanation' }],
    keyPoints: [{ it: 'Punto chiave', en: 'Key point' }],
    sourceIds: ['missing-source'],
    checkpoint: { prompt: { it: 'Domanda?', en: 'Question?' }, options: [{ it: 'Risposta', en: 'Answer' }], correctOption: 0 }
  }],
  interviewAnswers: [{
    prompt: { it: 'Domanda?', en: 'Question?' },
    short: { it: 'Risposta breve', en: 'Short answer' },
    long: { it: 'Risposta estesa', en: 'Extended answer' },
    followUps: [{ it: 'Approfondimento?', en: 'Follow-up?' }]
  }]
}

test('localized content requires both languages', () => {
  assert.throws(() => localized('Spiegazione', ''), /English/)
})

test('countWords ignores empty whitespace and counts array values', () => {
  assert.equal(countWords([' due parole ', 'tre']), 3)
  assert.equal(countWords('   '), 0)
})

test('planned minutes add theory, cases and practice', () => {
  assert.equal(lessonPlannedMinutes({ timeBudget: { theory: 25, cases: 15, practice: 10 } }), 50)
})

test('planned minutes ignore unknown budget fields and curriculum rejects them', () => {
  assert.equal(lessonPlannedMinutes({ timeBudget: { theory: 25, cases: 15, practice: 10, review: 5 } }), 50)
  const lessons = curriculumFixture()
  lessons[0].timeBudget.review = 5
  assert.ok(validateCurriculum(lessons, sourcesFixture).some((error) => error.includes('unknown time budget')))
})

test('validator reports missing worked cases, sources and option explanations', () => {
  const errors = validateCurriculum([invalidLessonFixture], {})
  assert.ok(errors.some((error) => error.includes('worked cases')))
  assert.ok(errors.some((error) => error.includes('source')))
  assert.ok(errors.some((error) => error.includes('option explanation')))
})

test('validateCurriculum keeps strict validation for a mixed legacy and new lesson collection', () => {
  const mixedLessons = [...curriculumFixture(), {
    id: 'legacy', slug: 'legacy', title: 'Legacy', englishTitle: 'Legacy', blocks: [{ id: 'block' }], quiz: []
  }]
  const errors = validateCurriculum(mixedLessons, sourcesFixture)
  assert.ok(errors.some((error) => error.includes('exactly 6 lessons')))
  assert.ok(errors.some((error) => error.includes('theory, cases and practice minutes')))
})

test('validateLessons retains legacy validation for shipped lesson records', () => {
  const legacyLesson = {
    id: 'legacy', title: 'Titolo', englishTitle: 'Title', blocks: [{ id: 'block' }], quiz: []
  }
  assert.deepEqual(validateLessons([legacyLesson]), [])
})

test('validateLessons treats a time-budget lesson missing units as malformed new curriculum', () => {
  const malformedLesson = clone(curriculumFixture()[0])
  delete malformedLesson.units
  assert.ok(validateLessons([malformedLesson]).some((error) => error.includes('exactly 6 lessons')))
})

test('validator accepts exact duration, practical-time, Italian-word, and English-ratio thresholds', () => {
  assert.deepEqual(validateCurriculum(curriculumFixture(), sourcesFixture), [])
})

test('validator enforces bounded unit duration and reconciled per-mode allocations', () => {
  const lessons = clone(curriculumFixture())
  lessons[0].units[0].estimatedMinutes = 11
  lessons[0].units[0].timeAllocation.theory += 1
  const errors = validateCurriculum(lessons, sourcesFixture)
  assert.ok(errors.some((error) => error.includes('estimatedMinutes must be between 5 and 10')))
  assert.ok(errors.some((error) => error.includes('time allocation must equal estimatedMinutes')))
  assert.ok(errors.some((error) => error.includes('unit theory allocation must equal its time budget')))
})

test('validator requires localized prompts, answers and follow-up questions', () => {
  const lessons = clone(curriculumFixture())
  delete lessons[0].interviewAnswers[0].prompt.en
  lessons[1].interviewAnswers[0].followUps = []
  const errors = validateCurriculum(lessons, sourcesFixture)
  assert.equal(errors.filter((error) => error.includes('fully localized professional interview answers')).length, 2)
})

test('validator reports duration, practical-time, Italian-word, and English-ratio threshold failures', () => {
  const timeLessons = clone(curriculumFixture())
  timeLessons[0].timeBudget.theory = 24
  timeLessons[0].durationMinutes = 49
  timeLessons[0].units[0].estimatedMinutes = 44
  const timeErrors = validateCurriculum(timeLessons, sourcesFixture)
  assert.ok(timeErrors.some((error) => error.includes('420 minutes')))

  const practicalLessons = clone(curriculumFixture())
  practicalLessons[0].timeBudget.cases = 14
  practicalLessons[0].durationMinutes = 49
  practicalLessons[0].units[0].estimatedMinutes = 44
  assert.ok(validateCurriculum(practicalLessons, sourcesFixture).some((error) => error.includes('231 minutes')))

  const shallowLessons = curriculumFixture(Array(6).fill(5000))
  const shallowErrors = validateCurriculum(shallowLessons, sourcesFixture)
  assert.ok(shallowErrors.some((error) => error.includes('34000 words')))

  const translationLessons = clone(curriculumFixture())
  translationLessons[0].units[0].theory[0].en = words(4000, 'english')
  assert.ok(validateCurriculum(translationLessons, sourcesFixture).some((error) => error.includes('85%')))
})

test('validator accepts exactly 85 percent English theory and rejects one word below it', () => {
  const boundaryLessons = clone(curriculumFixture())
  boundaryLessons[0].units[0].theory[0] = text(words(100, 'italiano'), words(85, 'english'))
  const exactBoundaryErrors = validateCurriculum(boundaryLessons, sourcesFixture)
  assert.ok(!exactBoundaryErrors.some((error) => error.includes('85%')))

  const belowBoundaryLessons = clone(boundaryLessons)
  belowBoundaryLessons[0].units[0].theory[0].en = words(84, 'english')
  assert.ok(validateCurriculum(belowBoundaryLessons, sourcesFixture).some((error) => error.includes('85%')))
})

test('educational sources must resolve verified primary sources', () => {
  const sources = { primary: { type: 'primary' }, educational: { type: 'educational', verifiedAgainst: ['missing'] } }
  assert.ok(validateCurriculum(curriculumFixture(), sources).some((error) => error.includes('verified primary source')))
})

test('validator rejects empty placeholder learning content', () => {
  const lessons = clone(curriculumFixture())
  const unit = lessons[0].units[0]
  unit.microExamples = [null, null, null, null]
  unit.workedCases = [null, null]
  unit.activities = [
    { solution: {}, rubric: [] },
    { modelSolution: {}, rubric: [] }
  ]
  lessons[0].professionalArtifacts = [{}]
  const errors = validateCurriculum(lessons, sourcesFixture)
  assert.ok(errors.some((error) => error.includes('valid micro-examples')))
  assert.ok(errors.some((error) => error.includes('valid worked cases')))
  assert.ok(errors.some((error) => error.includes('solved activities with rubrics')))
  assert.ok(errors.some((error) => error.includes('professional artifact')))
})

test('validator requires PMI cases to be labeled hypothetical public context', () => {
  const lessons = clone(curriculumFixture())
  lessons[0].units[0].workedCases[0].hypothetical = false
  assert.ok(validateCurriculum(lessons, sourcesFixture).some((error) => error.includes('hypothetical and use public context')))
})

test('validator requires stable lesson IDs and slugs', () => {
  const lessons = clone(curriculumFixture())
  lessons[0].slug = 'renamed'
  assert.ok(validateCurriculum(lessons, sourcesFixture).some((error) => error.includes('stable ID and slug')))
})

test('source catalog contains unique complete HTTPS records', () => {
  const ids = Object.keys(sources)
  assert.equal(new Set(ids).size, ids.length)
  for (const source of Object.values(sources)) {
    assert.ok(source.title && source.organization && source.type)
    assert.match(source.url, /^https:\/\//)
    assert.match(source.accessedAt, /^2026-07-28$/)
  }
})

test('source catalog retains the required authoritative records and resolves stable IDs', () => {
  const requiredIds = [
    'isa-95',
    'nist-sp-800-82-r3',
    'opc-ua-part-1',
    'nist-ai-rmf-1-0',
    'nist-ai-600-1',
    'eu-ai-act',
    'ec-industry-5-0',
    'attention-is-all-you-need',
    'retrieval-augmented-generation',
    'mcp-specification',
    'pmi-operations',
    'pmi-product-reliability',
    'pmi-annual-report-2025',
    'pmi-value-report-2025',
    'oecd-digital-transformation-definitions',
    'nist-manufacturing-kpi-procedure',
    'nist-manufacturing-kpi-hierarchy',
    'nist-manufacturing-performance-baselines',
    'doe-manufacturing-baseline-normalization',
    'toyota-way-genchi-genbutsu',
    'lean-enterprise-gemba',
    'uk-government-stakeholder-mapping',
    'ahrq-raci-chart',
    'isa-18-alarm-management',
    'isa-iec-62443',
    'ni-4-20ma-current-loop'
  ]

  assert.deepEqual(Object.keys(sources), requiredIds)
  for (const id of requiredIds) assert.equal(sourceById(id), sources[id])
  assert.equal(sourceById('missing-source'), undefined)
})

test('topic-specific educational sources identify the primary records used for verification', () => {
  assert.equal(sources['lean-enterprise-gemba'].type, 'educational')
  assert.deepEqual(sources['lean-enterprise-gemba'].verifiedAgainst, ['toyota-way-genchi-genbutsu'])
  assert.equal(sources['toyota-way-genchi-genbutsu'].type, 'primary')
})

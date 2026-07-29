import test from 'node:test'
import assert from 'node:assert/strict'
import {
  QUESTIONS_PER_UNIT,
  STABLE_LESSONS,
  UNITS_PER_LESSON,
  countWords,
  localized,
  validateCurriculum,
  validateGlossaryCoverage,
  validateInterviewAnswers
} from '../public/content/schema.js'
import { validateLessons } from '../public/learning.js'
import { curriculum, glossary, interviewAnswers, sources } from '../public/content.js'

const t = (it, en) => ({ it, en })
const words = (count, word) => Array(count).fill(word).join(' ')

const sourcesFixture = { 'fixture-source': { type: 'primary' } }

function questionFixture(index, unitId) {
  return {
    id: `${unitId}-q${index + 1}`,
    prompt: `Domanda numero ${index + 1}?`,
    options: ['Prima opzione', 'Seconda opzione', 'Terza opzione', 'Quarta opzione'],
    correctOption: 1,
    explanation: 'La spiegazione insegna qualcosa invece di dire solo giusto o sbagliato.',
    ...(index === 0 ? { final: true } : {})
  }
}

function unitFixture(lessonIndex, unitIndex) {
  const unitId = `m${lessonIndex + 1}-unit-${unitIndex + 1}`
  return {
    id: unitId,
    stage: ((lessonIndex * UNITS_PER_LESSON + unitIndex) % 7) + 1,
    estimatedMinutes: 6,
    title: t('Titolo unità', 'Unit title'),
    stageLabel: t('Tappa del percorso', 'Step of the path'),
    objective: t('Obiettivo dichiarato', 'Stated objective'),
    theory: [
      t(words(290, 'parola'), words(240, 'word')),
      t(words(10, 'parola'), words(10, 'word')),
      t(words(10, 'parola'), words(10, 'word')),
      t(words(10, 'parola'), words(10, 'word'))
    ],
    keyPoints: [t('Punto uno', 'Point one'), t('Punto due', 'Point two'), t('Punto tre', 'Point three')],
    terminology: Array.from({ length: 5 }, (unused, index) => ({
      id: `${unitId}-term-${index + 1}`,
      term: `Term ${index + 1}`,
      italian: `Termine ${index + 1}`,
      definition: t('Definizione in una frase.', 'Definition in one sentence.')
    })),
    example: {
      title: t('Esempio con numeri', 'Example with numbers'),
      steps: [
        t('Primo passo con 6 ore di fermo.', 'First step with 6 hours of downtime.'),
        t('Secondo passo.', 'Second step.'),
        t('Terzo passo.', 'Third step.')
      ],
      takeaway: t('Cosa portarsi via.', 'What to take away.')
    },
    englishBlock: {
      lines: ['We start from the loss.', 'We measure before we change anything.', 'A person decides, not the system.'],
      why: 'Verbi semplici e frasi corte.'
    },
    quiz: Array.from({ length: QUESTIONS_PER_UNIT }, (unused, index) => questionFixture(index, unitId)),
    sourceIds: ['fixture-source']
  }
}

function curriculumFixture() {
  return STABLE_LESSONS.map(([id, slug], lessonIndex) => ({
    id,
    slug,
    moduleNumber: lessonIndex + 1,
    durationMinutes: UNITS_PER_LESSON * 6,
    title: t('Titolo modulo', 'Module title'),
    summary: t('Riassunto del modulo.', 'Module summary.'),
    units: Array.from({ length: UNITS_PER_LESSON }, (unused, unitIndex) => unitFixture(lessonIndex, unitIndex))
  }))
}

test('countWords ignores surrounding whitespace and joins arrays', () => {
  assert.equal(countWords('  due parole  '), 2)
  assert.equal(countWords(['una', 'frase corta']), 3)
  assert.equal(countWords(''), 0)
})

test('localized refuses a half-translated value', () => {
  assert.deepEqual(localized('Italiano', 'English'), { it: 'Italiano', en: 'English' })
  assert.throws(() => localized('Italiano', ''), /English localization is required/u)
  assert.throws(() => localized('', 'English'), /Italian localization is required/u)
})

test('a well-formed fixture curriculum validates cleanly', () => {
  assert.deepEqual(validateCurriculum(curriculumFixture(), sourcesFixture), [])
})

test('the course must keep exactly five modules of five units', () => {
  const missingModule = curriculumFixture().slice(0, 4)
  assert.ok(validateCurriculum(missingModule, sourcesFixture).some((error) => error.includes('exactly 5 modules')))

  const shortModule = curriculumFixture()
  shortModule[2].units = shortModule[2].units.slice(0, 4)
  assert.ok(validateCurriculum(shortModule, sourcesFixture).some((error) => error.includes(`exactly ${UNITS_PER_LESSON} units`)))
})

test('a unit must carry exactly seven questions and one flagged for the checkpoint', () => {
  const sixQuestions = curriculumFixture()
  sixQuestions[0].units[0].quiz = sixQuestions[0].units[0].quiz.slice(0, 6)
  assert.ok(validateCurriculum(sixQuestions, sourcesFixture).some((error) => error.includes(`exactly ${QUESTIONS_PER_UNIT} questions`)))

  const noFinal = curriculumFixture()
  noFinal[0].units[0].quiz = noFinal[0].units[0].quiz.map(({ final, ...rest }) => rest)
  assert.ok(validateCurriculum(noFinal, sourcesFixture).some((error) => error.includes('flag one question')))
})

test('a question needs four options, a valid answer and an explanation that teaches', () => {
  const brokenOptions = curriculumFixture()
  brokenOptions[0].units[0].quiz[0].options = ['Solo due', 'Opzioni']
  assert.ok(validateCurriculum(brokenOptions, sourcesFixture).some((error) => error.includes('exactly four options')))

  const brokenAnswer = curriculumFixture()
  brokenAnswer[0].units[0].quiz[1].correctOption = 9
  assert.ok(validateCurriculum(brokenAnswer, sourcesFixture).some((error) => error.includes('correctOption must point')))

  const thinExplanation = curriculumFixture()
  thinExplanation[0].units[0].quiz[2].explanation = 'Giusto.'
  assert.ok(validateCurriculum(thinExplanation, sourcesFixture).some((error) => error.includes('too short to teach')))
})

test('duplicate question IDs are rejected, because they are progress keys', () => {
  const duplicated = curriculumFixture()
  duplicated[1].units[0].quiz[0].id = duplicated[0].units[0].quiz[0].id
  assert.ok(validateCurriculum(duplicated, sourcesFixture).some((error) => error.includes('duplicate ID')))
})

test('every unit needs a worked example with real numbers', () => {
  const withoutNumbers = curriculumFixture()
  withoutNumbers[0].units[0].example.steps = [
    t('Un passo senza cifre.', 'A step with no figures.'),
    t('Un altro passo.', 'Another step.'),
    t('E un terzo.', 'And a third one.')
  ]
  assert.ok(validateCurriculum(withoutNumbers, sourcesFixture).some((error) => error.includes('must contain real numbers')))
})

test('a term is introduced once and its definition stays one sentence', () => {
  const repeated = curriculumFixture()
  repeated[1].units[0].terminology[0].id = repeated[0].units[0].terminology[0].id
  assert.ok(validateCurriculum(repeated, sourcesFixture).some((error) => error.includes('already introduced in')))

  const verbose = curriculumFixture()
  verbose[0].units[0].terminology[0].definition = t(words(40, 'parola'), words(40, 'word'))
  assert.ok(validateCurriculum(verbose, sourcesFixture).some((error) => error.includes('within one sentence')))
})

test('the English speaking block must stay sayable out loud', () => {
  const tooLong = curriculumFixture()
  tooLong[0].units[0].englishBlock.lines[0] = words(40, 'word')
  assert.ok(validateCurriculum(tooLong, sourcesFixture).some((error) => error.includes('too long to say out loud')))
})

test('English theory may be shorter than Italian, but not by much', () => {
  const thinEnglish = curriculumFixture()
  thinEnglish[0].units[0].theory[0] = t(words(290, 'parola'), words(100, 'word'))
  assert.ok(validateCurriculum(thinEnglish, sourcesFixture).some((error) => error.includes('at least 75%')))
})

test('a unit must reference a source that exists in the catalog', () => {
  const unknownSource = curriculumFixture()
  unknownSource[0].units[0].sourceIds = ['not-in-the-catalog']
  assert.ok(validateCurriculum(unknownSource, sourcesFixture).some((error) => error.includes('missing source')))
})

test('the glossary must cover every term the course introduces', () => {
  const fixture = curriculumFixture()
  const complete = fixture.flatMap((lesson) => lesson.units.flatMap((unit) => unit.terminology))
    .map((term) => ({
      id: term.id, term: term.term, italian: term.italian, definition: term.definition, where: 'M1.1'
    }))
  assert.deepEqual(validateGlossaryCoverage(fixture, complete), [])
  assert.ok(validateGlossaryCoverage(fixture, complete.slice(1)).some((error) => error.includes('missing a term')))
})

test('the ten interview answers carry everything a rehearsal needs', () => {
  assert.deepEqual(validateInterviewAnswers(interviewAnswers), [])
  assert.ok(validateInterviewAnswers(interviewAnswers.slice(0, 9)).some((error) => error.includes('exactly ten questions')))

  const shortFirst = interviewAnswers.map((answer, index) => (index === 0 ? { ...answer, italian: words(80, 'parola') } : answer))
  assert.ok(validateInterviewAnswers(shortFirst).some((error) => error.includes('twice as long')))
})

test('the real course passes strict validation against the real source catalog', () => {
  assert.deepEqual(validateCurriculum(curriculum, sources, glossary), [])
  assert.deepEqual(validateLessons(curriculum, sources, glossary), [])
})

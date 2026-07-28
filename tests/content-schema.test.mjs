import test from 'node:test'
import assert from 'node:assert/strict'
import {
  countWords,
  lessonPlannedMinutes,
  localized,
  validateCurriculum
} from '../public/content/schema.js'

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
    theory: [{ it: 'Spiegazione italiana', en: 'English explanation' }],
    keyPoints: [{ it: 'Punto chiave', en: 'Key point' }],
    sourceIds: ['missing-source'],
    checkpoint: { prompt: { it: 'Domanda?', en: 'Question?' }, options: [{ it: 'Risposta', en: 'Answer' }], correctOption: 0 }
  }],
  interviewAnswers: [{ short: 'Short English answer', long: 'Extended English answer with supporting detail.' }]
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

test('validator reports missing worked cases, sources and option explanations', () => {
  const errors = validateCurriculum([invalidLessonFixture], {})
  assert.ok(errors.some((error) => error.includes('worked cases')))
  assert.ok(errors.some((error) => error.includes('source')))
  assert.ok(errors.some((error) => error.includes('option explanation')))
})

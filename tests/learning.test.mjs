import test from 'node:test'
import assert from 'node:assert/strict'
import {
  MASTERY_THRESHOLD,
  calculateScore,
  mergeProgress,
  migrateLessonProgress,
  readAnswers,
  saveAnswers,
  scoreLesson,
  updateLessonProgress,
  validateLessons
} from '../public/learning.js'
import { CONTENT_VERSION } from '../public/content/schema.js'
import { curriculum, finalQuiz, glossary, questionById, sources } from '../public/content.js'

const STABLE_LESSON_IDS = ['trasformazione', 'fabbrica-digitale', 'scegliere-strumento', 'in-produzione', 'governare-scalare']

function memoryStorage(initial = {}) {
  const store = new Map(Object.entries(initial))
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value))
  }
}

test('calculateScore counts correct answers and rounds the percentage', () => {
  assert.deepEqual(calculateScore([true, true, false]), { correct: 2, total: 3, percent: 67 })
  assert.deepEqual(calculateScore([]), { correct: 0, total: 0, percent: 0 })
})

test('mergeProgress never regresses completion or best score', () => {
  const local = {
    lessonId: 'fabbrica-digitale', status: 'completed', cursor: 4, bestScore: 90,
    reviewQuestionIds: ['q1'], updatedAt: '2026-07-29T08:00:00.000Z'
  }
  const remote = {
    lessonId: 'fabbrica-digitale', status: 'in_progress', cursor: 2, bestScore: 60,
    reviewQuestionIds: ['q2'], updatedAt: '2026-07-29T09:00:00.000Z'
  }
  assert.deepEqual(mergeProgress(local, remote), {
    lessonId: 'fabbrica-digitale', status: 'completed', cursor: 2, bestScore: 90,
    reviewQuestionIds: ['q1', 'q2'], updatedAt: '2026-07-29T09:00:00.000Z',
    contentVersion: CONTENT_VERSION
  })
})

test('mergeProgress uses the cursor from the most recently updated device', () => {
  const older = {
    lessonId: 'in-produzione', status: 'in_progress', cursor: 2, bestScore: 40,
    reviewQuestionIds: [], updatedAt: '2026-07-29T08:00:00.000Z'
  }
  const newer = { ...older, cursor: 4, updatedAt: '2026-07-29T10:00:00.000Z' }
  assert.equal(mergeProgress(older, newer).cursor, 4)
})

test('a successful retry removes resolved questions from the review queue', () => {
  const current = {
    trasformazione: {
      lessonId: 'trasformazione', status: 'in_progress', cursor: 4, bestScore: 67,
      reviewQuestionIds: ['m1u1-q1', 'm1u2-q3'], updatedAt: '2026-07-29T08:00:00.000Z'
    }
  }
  const updated = updateLessonProgress(current, 'trasformazione', {
    status: 'completed', bestScore: 100, reviewQuestionIds: [], replaceReviewQuestionIds: true,
    updatedAt: '2026-07-29T09:00:00.000Z'
  })
  assert.deepEqual(updated.trasformazione.reviewQuestionIds, [])
  assert.equal(updated.trasformazione.bestScore, 100)
})

test('progress written by an older content version is clamped instead of discarded', () => {
  const stale = {
    lessonId: 'trasformazione', status: 'in_progress', cursor: 8, bestScore: 70,
    reviewQuestionIds: ['old-question'], updatedAt: '2026-07-28T08:00:00.000Z', contentVersion: 2
  }
  const migrated = migrateLessonProgress(stale, curriculum[0])
  assert.equal(migrated.cursor, curriculum[0].units.length)
  assert.equal(migrated.bestScore, 70)
  assert.equal(migrated.contentVersion, CONTENT_VERSION)
})

test('answers survive a reload because they are stored beside progress', () => {
  const storage = memoryStorage()
  saveAnswers({ 'm1u1-q1': 1 }, storage)
  assert.deepEqual(readAnswers(storage), { 'm1u1-q1': 1 })
  assert.deepEqual(readAnswers(memoryStorage({ 'ai-sprint-answers-v2': 'not json' })), {})
})

test('a module is scored on every question of every unit', () => {
  const lesson = curriculum[0]
  const questions = lesson.units.flatMap((unit) => unit.quiz)
  const partial = Object.fromEntries(questions.slice(0, 10).map((question) => [question.id, question.correctOption]))
  const partialScore = scoreLesson(lesson, partial)
  assert.equal(partialScore.answeredCount, 10)
  assert.equal(partialScore.questionCount, questions.length)
  assert.equal(partialScore.complete, false)

  const allCorrect = Object.fromEntries(questions.map((question) => [question.id, question.correctOption]))
  const perfect = scoreLesson(lesson, allCorrect)
  assert.equal(perfect.percent, 100)
  assert.equal(perfect.complete, true)
  assert.deepEqual(perfect.missed, [])
  assert.ok(perfect.percent >= MASTERY_THRESHOLD)
})

test('a wrong answer lands in the review queue with its question ID', () => {
  const lesson = curriculum[1]
  const questions = lesson.units.flatMap((unit) => unit.quiz)
  const answers = Object.fromEntries(questions.map((question, index) => [
    question.id,
    index === 3 ? (question.correctOption + 1) % 4 : question.correctOption
  ]))
  const score = scoreLesson(lesson, answers)
  assert.deepEqual(score.missed, [questions[3].id])
  assert.equal(score.correct, questions.length - 1)
  assert.ok(questionById(questions[3].id), 'the review queue must be able to resolve the question')
})

test('the module checkpoint reuses one flagged question per unit', () => {
  for (const lesson of curriculum) {
    const checkpoint = finalQuiz(lesson)
    assert.equal(checkpoint.length, lesson.units.length)
    assert.ok(checkpoint.every((question) => question.final))
    assert.ok(checkpoint.every((question) => question.lessonId === lesson.id))
  }
})

test('the assembled course keeps stable module IDs and passes validation', () => {
  assert.deepEqual(curriculum.map(({ id }) => id), STABLE_LESSON_IDS)
  assert.deepEqual(curriculum.map(({ slug }) => slug), STABLE_LESSON_IDS)
  assert.equal(CONTENT_VERSION, 3)
  assert.deepEqual(validateLessons(curriculum, sources, glossary), [])
})

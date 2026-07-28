import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateScore, mergeProgress, updateLessonProgress, validateLessons } from '../public/learning.js'
import { lessons } from '../public/content.js'

test('calculateScore counts correct answers and rounds the percentage', () => {
  assert.deepEqual(calculateScore([true, true, false]), { correct: 2, total: 3, percent: 67 })
})

test('calculateScore safely handles an unanswered quiz', () => {
  assert.deepEqual(calculateScore([]), { correct: 0, total: 0, percent: 0 })
})

test('mergeProgress never regresses completion or best score', () => {
  const local = {
    lessonId: 'ot-it-ai-cloud', status: 'completed', cursor: 4, bestScore: 90,
    reviewQuestionIds: ['q1'], updatedAt: '2026-07-28T08:00:00.000Z'
  }
  const remote = {
    lessonId: 'ot-it-ai-cloud', status: 'in_progress', cursor: 2, bestScore: 60,
    reviewQuestionIds: ['q2'], updatedAt: '2026-07-28T09:00:00.000Z'
  }

  assert.deepEqual(mergeProgress(local, remote), {
    lessonId: 'ot-it-ai-cloud', status: 'completed', cursor: 2, bestScore: 90,
    reviewQuestionIds: ['q1', 'q2'], updatedAt: '2026-07-28T09:00:00.000Z'
  })
})

test('mergeProgress uses the cursor from the most recently updated device', () => {
  const older = {
    lessonId: 'llm-agents', status: 'in_progress', cursor: 5, bestScore: 40,
    reviewQuestionIds: [], updatedAt: '2026-07-28T08:00:00.000Z'
  }
  const newer = { ...older, cursor: 8, updatedAt: '2026-07-28T10:00:00.000Z' }
  assert.equal(mergeProgress(older, newer).cursor, 8)
})

test('a successful retry removes resolved questions from local review', () => {
  const current = {
    'digital-transformation': {
      lessonId: 'digital-transformation', status: 'in_progress', cursor: 4, bestScore: 67,
      reviewQuestionIds: ['dt-q1', 'dt-q2'], updatedAt: '2026-07-28T08:00:00.000Z'
    }
  }
  const updated = updateLessonProgress(current, 'digital-transformation', {
    status: 'completed', bestScore: 100, reviewQuestionIds: [], replaceReviewQuestionIds: true,
    updatedAt: '2026-07-28T09:00:00.000Z'
  })
  assert.deepEqual(updated['digital-transformation'].reviewQuestionIds, [])
})

test('the urgent sprint contains six valid lessons with explanatory quiz feedback', () => {
  assert.equal(lessons.length, 6)
  assert.deepEqual(validateLessons(lessons), [])
  assert.ok(lessons.every((lesson) => lesson.quiz.length >= 3))
  assert.ok(lessons.every((lesson) => lesson.masteryThreshold === 80))
})

test('every lesson teaches bilingual vocabulary and interview answers', () => {
  assert.equal(lessons.length, 6)
  assert.ok(lessons.every((lesson) => lesson.glossary.length >= 4))
  assert.ok(lessons.every((lesson) => lesson.interview.short.length > 40))
  assert.ok(lessons.every((lesson) => lesson.interview.long.length > lesson.interview.short.length))
})

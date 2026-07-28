import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateScore, mergeProgress, updateLessonProgress, validateLessons } from '../public/learning.js'
import { validateCurriculum } from '../public/content/schema.js'
import {
  CONTENT_VERSION,
  allGlossary,
  curriculum,
  interviewQuestions,
  lessons,
  sources,
  withLegacyProjection
} from '../public/content.js'

const STABLE_LESSON_IDS = [
  'digital-transformation', 'ot-it-ai-cloud', 'data-ai-use-cases',
  'llm-agents', 'mvp-governance', 'interview-lab'
]

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

test('assembled curriculum preserves stable lesson IDs and exact order', () => {
  assert.deepEqual(curriculum.map(({ id }) => id), STABLE_LESSON_IDS)
  assert.deepEqual(curriculum.map(({ slug }) => slug), STABLE_LESSON_IDS)
  assert.deepEqual(lessons.map(({ id }) => id), STABLE_LESSON_IDS)
  assert.equal(curriculum.reduce((sum, lesson) => sum + lesson.durationMinutes, 0), 420)
  assert.equal(CONTENT_VERSION, 2)
})

test('the assembled curriculum passes strict validation against the real source catalog', () => {
  assert.deepEqual(validateCurriculum(curriculum, sources), [])
  assert.deepEqual(validateLessons(curriculum), validateCurriculum(curriculum, {}))
})

test('the legacy projection keeps the current renderer contract intact', () => {
  assert.equal(lessons.length, 6)
  for (const lesson of lessons) {
    assert.equal(typeof lesson.title, 'string')
    assert.equal(typeof lesson.englishTitle, 'string')
    assert.ok(lesson.order >= 1 && lesson.order <= 6)
    assert.equal(lesson.masteryThreshold, 80)
    assert.ok(lesson.objectives.length >= 4, `${lesson.id} must project learner objectives`)
    assert.ok(lesson.objectives.every((objective) => typeof objective === 'string' && objective))
    assert.ok(Array.isArray(lesson.competencies))
    assert.equal(lesson.blocks.length, lesson.units.length)
    assert.ok(lesson.blocks.every((block) => (
      typeof block.id === 'string' &&
      typeof block.title === 'string' &&
      Array.isArray(block.body) && block.body.length > 0 &&
      Array.isArray(block.keyPoints)
    )))
    assert.equal(
      lesson.blocks.reduce((sum, block) => sum + block.minutes, 0),
      lesson.durationMinutes
    )
    assert.ok(lesson.quiz.length >= 3)
    assert.ok(lesson.quiz.every((question) => (
      typeof question.prompt === 'string' && question.prompt &&
      question.options.length >= 2 &&
      question.options.every((option) => typeof option === 'string' && option) &&
      typeof question.explanation === 'string' && question.explanation &&
      question.correctOption >= 0 && question.correctOption < question.options.length
    )))
    assert.ok(lesson.interview.short.length > 40)
    assert.ok(lesson.interview.long.length > lesson.interview.short.length)
  }
  assert.equal(new Set(lessons.flatMap((lesson) => lesson.quiz.map(({ id }) => id))).size, 18)
})

test('the legacy projection is a pure adapter and never mutates its lesson', () => {
  const before = JSON.stringify(curriculum[3])
  const projected = withLegacyProjection(curriculum[3])
  assert.equal(JSON.stringify(curriculum[3]), before)
  assert.notEqual(projected, curriculum[3])
  assert.equal(projected.units, curriculum[3].units)
})

test('the assembled exports expose bilingual interview answers and glossary entries', () => {
  assert.equal(interviewQuestions.length, curriculum.reduce((sum, lesson) => sum + lesson.interviewAnswers.length, 0))
  assert.ok(interviewQuestions.every((question) => (
    STABLE_LESSON_IDS.includes(question.lessonId) &&
    question.prompt && question.short && question.long &&
    question.followUps.length >= 2
  )))
  assert.ok(allGlossary.length >= 40)
  assert.ok(allGlossary.every((entry) => entry.english && entry.italian && entry.definition && entry.lessonId))
})

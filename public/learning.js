import { CONTENT_VERSION, UNITS_PER_LESSON, validateCurriculum } from './content/schema.js'

export const MASTERY_THRESHOLD = 80

export function calculateScore(results) {
  const total = results.length
  const correct = results.filter(Boolean).length
  return { correct, total, percent: total === 0 ? 0 : Math.round((correct / total) * 100) }
}

/**
 * Version 2 is a different course, so a stored cursor from an older version can
 * point past the end of a module. Progress is never thrown away: the cursor is
 * clamped to the units that exist now and the record is stamped with the current
 * content version.
 */
export function migrateLessonProgress(progress, lesson) {
  const unitCount = Array.isArray(lesson?.units) ? lesson.units.length : UNITS_PER_LESSON
  const cursor = Math.max(0, Number(progress?.cursor) || 0)
  return {
    ...progress,
    cursor: Math.min(unitCount, cursor),
    contentVersion: CONTENT_VERSION
  }
}

function currentContentProgress(progress, lesson) {
  if (!progress || progress.contentVersion === CONTENT_VERSION) return progress
  return migrateLessonProgress(progress, lesson)
}

export function mergeProgress(local, remote, lesson) {
  const currentLocal = currentContentProgress(local, lesson)
  const currentRemote = currentContentProgress(remote, lesson)
  if (!currentLocal) return currentRemote
  if (!currentRemote) return currentLocal
  const localIsNewer = Date.parse(currentLocal.updatedAt) >= Date.parse(currentRemote.updatedAt)
  const latest = localIsNewer ? currentLocal : currentRemote
  return {
    lessonId: latest.lessonId,
    status: currentLocal.status === 'completed' || currentRemote.status === 'completed' ? 'completed' : latest.status,
    cursor: latest.cursor,
    bestScore: Math.max(currentLocal.bestScore || 0, currentRemote.bestScore || 0),
    reviewQuestionIds: [...new Set([...(currentLocal.reviewQuestionIds || []), ...(currentRemote.reviewQuestionIds || [])])],
    updatedAt: latest.updatedAt,
    ...(latest.contentVersion === undefined ? {} : { contentVersion: latest.contentVersion })
  }
}

export function validateLessons(lessons, sources = {}, glossary = []) {
  return validateCurriculum(lessons, sources, glossary)
}

const STORAGE_KEY = 'ai-sprint-progress-v1'

export function readProgress(storage = globalThis.localStorage) {
  if (!storage) return {}
  try { return JSON.parse(storage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

export function saveProgress(progress, storage = globalThis.localStorage) {
  storage?.setItem(STORAGE_KEY, JSON.stringify(progress))
  return progress
}

export function updateLessonProgress(allProgress, lessonId, change) {
  const current = allProgress[lessonId] || {
    lessonId, status: 'not_started', cursor: 0, bestScore: 0, reviewQuestionIds: [],
    updatedAt: new Date(0).toISOString(), contentVersion: CONTENT_VERSION
  }
  const candidate = {
    ...current,
    ...change,
    lessonId,
    contentVersion: change.contentVersion ?? current.contentVersion ?? CONTENT_VERSION,
    bestScore: Math.max(current.bestScore || 0, change.bestScore || 0),
    reviewQuestionIds: [...new Set([...(current.reviewQuestionIds || []), ...(change.reviewQuestionIds || [])])],
    updatedAt: change.updatedAt || new Date().toISOString()
  }
  const merged = mergeProgress(current, candidate)
  if (change.replaceReviewQuestionIds) merged.reviewQuestionIds = [...new Set(change.reviewQuestionIds || [])]
  return { ...allProgress, [lessonId]: merged }
}

/**
 * Answers live next to progress so a reload does not wipe a quiz half way. They
 * are keyed by question ID, which is stable for the life of the content.
 */
const ANSWERS_KEY = 'ai-sprint-answers-v2'

export function readAnswers(storage = globalThis.localStorage) {
  if (!storage) return {}
  try { return JSON.parse(storage.getItem(ANSWERS_KEY) || '{}') }
  catch { return {} }
}

export function saveAnswers(answers, storage = globalThis.localStorage) {
  storage?.setItem(ANSWERS_KEY, JSON.stringify(answers))
  return answers
}

/** Score of a module: every question of every unit, right or wrong. */
export function scoreLesson(lesson, answers = {}) {
  const questions = lesson.units.flatMap((unit) => unit.quiz)
  const answered = questions.filter((question) => Number.isInteger(answers[question.id]))
  const results = answered.map((question) => answers[question.id] === question.correctOption)
  const missed = answered
    .filter((question) => answers[question.id] !== question.correctOption)
    .map((question) => question.id)
  return {
    ...calculateScore(results),
    answeredCount: answered.length,
    questionCount: questions.length,
    complete: answered.length === questions.length,
    missed
  }
}

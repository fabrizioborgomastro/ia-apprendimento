import { CONTENT_VERSION, validateCurriculum } from './content/schema.js'

export const LEGACY_BLOCK_COUNTS = {
  'digital-transformation': 4,
  'ot-it-ai-cloud': 4,
  'data-ai-use-cases': 4,
  'llm-agents': 5,
  'mvp-governance': 5,
  'interview-lab': 5
}

function validateLegacyLessons(lessons) {
  const errors = []
  const ids = new Set()
  for (const lesson of lessons) {
    if (ids.has(lesson.id)) errors.push(`ID lezione duplicato: ${lesson.id}`)
    ids.add(lesson.id)
    if (!lesson.title || !lesson.englishTitle) errors.push(`Titolo bilingue mancante: ${lesson.id}`)
    if (!lesson.blocks?.length) errors.push(`Contenuto mancante: ${lesson.id}`)
    for (const question of lesson.quiz || []) {
      if (!question.explanation?.trim()) errors.push(`Spiegazione mancante: ${lesson.id}/${question.id}`)
      if (!Array.isArray(question.options) || question.options.length < 2) errors.push(`Opzioni mancanti: ${lesson.id}/${question.id}`)
      if (question.correctOption < 0 || question.correctOption >= question.options.length) errors.push(`Risposta non valida: ${lesson.id}/${question.id}`)
    }
  }
  return errors
}

export function calculateScore(results) {
  const total = results.length
  const correct = results.filter(Boolean).length
  return { correct, total, percent: total === 0 ? 0 : Math.round((correct / total) * 100) }
}

export function migrateLessonProgress(progress, lesson, legacyBlockCount) {
  const newUnitCount = Array.isArray(lesson?.units) ? lesson.units.length : 0
  const maximumCursor = Math.max(0, newUnitCount - 1)
  const legacyCursor = Math.max(0, Number(progress?.cursor) || 0)
  const legacyMaximumCursor = Math.max(1, legacyBlockCount - 1)
  const cursor = legacyBlockCount > 0 && newUnitCount > 0
    ? Math.round((legacyCursor / legacyMaximumCursor) * maximumCursor)
    : legacyCursor

  return {
    ...progress,
    cursor: Math.min(maximumCursor, Math.max(0, cursor)),
    contentVersion: CONTENT_VERSION
  }
}

function currentContentProgress(progress, lesson) {
  if (!progress || !Array.isArray(lesson?.units) || progress.contentVersion === CONTENT_VERSION) return progress
  return migrateLessonProgress(progress, lesson, LEGACY_BLOCK_COUNTS[progress.lessonId])
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

export function validateLessons(lessons) {
  return lessons.some((lesson) => Array.isArray(lesson.units) || 'timeBudget' in lesson)
    ? validateCurriculum(lessons, {})
    : validateLegacyLessons(lessons)
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

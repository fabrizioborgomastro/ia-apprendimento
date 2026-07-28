import { validateCurriculum } from './content/schema.js'

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

export function mergeProgress(local, remote) {
  if (!local) return remote
  if (!remote) return local
  const localIsNewer = Date.parse(local.updatedAt) >= Date.parse(remote.updatedAt)
  const latest = localIsNewer ? local : remote
  return {
    lessonId: latest.lessonId,
    status: local.status === 'completed' || remote.status === 'completed' ? 'completed' : latest.status,
    cursor: latest.cursor,
    bestScore: Math.max(local.bestScore || 0, remote.bestScore || 0),
    reviewQuestionIds: [...new Set([...(local.reviewQuestionIds || []), ...(remote.reviewQuestionIds || [])])],
    updatedAt: latest.updatedAt
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
    lessonId, status: 'not_started', cursor: 0, bestScore: 0, reviewQuestionIds: [], updatedAt: new Date(0).toISOString()
  }
  const candidate = {
    ...current,
    ...change,
    lessonId,
    bestScore: Math.max(current.bestScore || 0, change.bestScore || 0),
    reviewQuestionIds: [...new Set([...(current.reviewQuestionIds || []), ...(change.reviewQuestionIds || [])])],
    updatedAt: change.updatedAt || new Date().toISOString()
  }
  const merged = mergeProgress(current, candidate)
  if (change.replaceReviewQuestionIds) merged.reviewQuestionIds = [...new Set(change.reviewQuestionIds || [])]
  return { ...allProgress, [lessonId]: merged }
}

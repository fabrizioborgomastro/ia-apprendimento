export const LOCALE_STORAGE_KEY = 'ai-sprint-locale-v1'
export const SUPPORTED_LOCALES = ['it', 'en']
const DEFAULT_LOCALE = 'it'

/**
 * Returns the requested language of a localized value. Plain strings pass
 * through unchanged so the helper can be applied to mixed legacy content.
 */
export function selectLocale(value, locale = DEFAULT_LOCALE) {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  const requested = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  return value[requested] || value[DEFAULT_LOCALE] || value.en || ''
}

export function readLocale(storage = globalThis.localStorage) {
  const stored = storage?.getItem?.(LOCALE_STORAGE_KEY)
  return SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE
}

export function writeLocale(locale, storage = globalThis.localStorage) {
  if (!SUPPORTED_LOCALES.includes(locale)) return readLocale(storage)
  storage?.setItem?.(LOCALE_STORAGE_KEY, locale)
  return locale
}

export function unitPath(slug, unitId) {
  return unitId ? `/lesson/${slug}?unit=${encodeURIComponent(unitId)}` : `/lesson/${slug}`
}

export function parseRoute(pathname, search = '') {
  const path = pathname.replace(/\/+$/, '') || '/'
  const lessonMatch = path.match(/^\/lesson\/([^/]+)$/)
  if (lessonMatch) {
    const query = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    return { name: 'lesson', slug: decodeURIComponent(lessonMatch[1]), unitId: query.get('unit') || null }
  }
  if (path === '/sprint') return { name: 'sprint' }
  if (path === '/review') return { name: 'review' }
  if (path === '/interview') return { name: 'interview' }
  if (path === '/login') return { name: 'login' }
  return { name: 'dashboard' }
}

export function normalizeAppHref(href, basePath) {
  if (!href?.startsWith('/')) return href
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  if (normalizedBase === '/' || href === normalizedBase.slice(0, -1) || href.startsWith(normalizedBase)) return href
  return `${normalizedBase}${href.slice(1)}`
}

/**
 * A unit is complete when its checkpoint has been answered and, where the unit
 * actually has an activity, that activity has been self-marked. Units that ship
 * no activity would otherwise be impossible to complete. Elapsed time is never a
 * condition. `hasActivity` defaults to true so an omitted flag stays strict.
 */
export function isUnitComplete(unitState) {
  if (!unitState?.checkpointAnswered) return false
  const hasActivity = unitState.hasActivity ?? true
  return hasActivity ? Boolean(unitState.activityMarked) : true
}

/**
 * Resolves which single unit to display. An absent or unknown unit falls back to
 * the first incomplete unit recorded by the stored cursor, so both an old
 * `/lesson/:slug` link and a stale deep link stay usable.
 */
export function getUnitState(lesson, unitId, progress) {
  const units = lesson?.units || []
  const total = units.length
  const cursor = Math.max(0, Number(progress?.cursor) || 0)
  const fallbackIndex = Math.min(cursor, Math.max(0, total - 1))
  const requestedIndex = unitId ? units.findIndex((unit) => unit.id === unitId) : -1
  const index = requestedIndex === -1 ? fallbackIndex : requestedIndex

  return {
    unit: units[index] || null,
    index,
    total,
    previous: index > 0 ? units[index - 1] : null,
    next: index < total - 1 ? units[index + 1] : null,
    isFirst: index === 0,
    isLast: index === total - 1,
    completed: index < cursor,
    requestedUnitFound: requestedIndex !== -1,
    cursor
  }
}

export function getDashboardState(lessons, progress) {
  const completedCount = lessons.filter((lesson) => progress[lesson.id]?.status === 'completed').length
  const nextLesson = lessons.find((lesson) => progress[lesson.id]?.status !== 'completed') || lessons.at(-1)
  const reviewCount = Object.values(progress).reduce((count, item) => count + (item.reviewQuestionIds?.length || 0), 0)
  return {
    completedCount,
    nextLesson,
    reviewCount,
    percent: lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0
  }
}

export function quizFeedback(question, selectedOption) {
  const correct = selectedOption === question.correctOption
  return { correct, label: correct ? 'Corretto' : 'Da rivedere', explanation: question.explanation }
}

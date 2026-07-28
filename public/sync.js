import { mergeProgress } from './learning.js'

const config = globalThis.AI_SPRINT_CONFIG || {}
const sessionKey = 'ai-sprint-session-v1'

export function isSyncConfigured() {
  return Boolean(config.supabaseUrl && config.supabaseAnonKey)
}

export function readSession() {
  try { return JSON.parse(localStorage.getItem(sessionKey) || 'null') }
  catch { return null }
}

export function captureAuthCallback() {
  const hash = new URLSearchParams(location.hash.slice(1))
  const accessToken = hash.get('access_token')
  if (!accessToken) return readSession()
  const session = {
    accessToken,
    refreshToken: hash.get('refresh_token'),
    expiresAt: Date.now() + Number(hash.get('expires_in') || 3600) * 1000
  }
  localStorage.setItem(sessionKey, JSON.stringify(session))
  history.replaceState({}, '', new URL('.', import.meta.url).pathname)
  return session
}

export async function requestMagicLink(email) {
  if (!isSyncConfigured()) throw new Error('La sincronizzazione non è ancora configurata.')
  const redirectTo = new URL('.', import.meta.url).href
  const response = await fetch(`${config.supabaseUrl}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'POST',
    headers: { apikey: config.supabaseAnonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, create_user: true })
  })
  if (!response.ok) throw new Error('Non è stato possibile inviare il magic link. Controlla email e configurazione.')
}

async function authRequest(path, options = {}) {
  const session = await validSession()
  if (!session?.accessToken) throw new Error('Sessione non disponibile')
  const response = await fetch(`${config.supabaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })
  if (!response.ok) throw new Error(`Sincronizzazione non riuscita (${response.status})`)
  return response.status === 204 ? null : response.json()
}

async function validSession() {
  const session = readSession()
  if (!session?.accessToken || !session.refreshToken) return session
  if (session.expiresAt > Date.now() + 60_000) return session
  const response = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { apikey: config.supabaseAnonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: session.refreshToken })
  })
  if (!response.ok) {
    signOut()
    throw new Error('Sessione scaduta. Richiedi un nuovo magic link.')
  }
  const refreshed = await response.json()
  const next = {
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token,
    expiresAt: Date.now() + Number(refreshed.expires_in || 3600) * 1000
  }
  localStorage.setItem(sessionKey, JSON.stringify(next))
  return next
}

export async function syncAllProgress(localProgress) {
  if (!isSyncConfigured() || !readSession()) return localProgress
  const remoteRows = await authRequest('/rest/v1/lesson_progress?select=*')
  const merged = { ...localProgress }
  for (const row of remoteRows) {
    const remote = {
      lessonId: row.lesson_id, status: row.status, cursor: row.cursor,
      bestScore: row.best_score, reviewQuestionIds: row.review_question_ids || [], updatedAt: row.updated_at
    }
    merged[row.lesson_id] = mergeProgress(merged[row.lesson_id], remote)
  }
  const rows = Object.values(merged).map((item) => ({
    lesson_id: item.lessonId, status: item.status, cursor: item.cursor,
    best_score: item.bestScore, review_question_ids: item.reviewQuestionIds, updated_at: item.updatedAt
  }))
  if (rows.length) await authRequest('/rest/v1/lesson_progress?on_conflict=user_id,lesson_id', {
    method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows)
  })
  return merged
}

export function signOut() {
  localStorage.removeItem(sessionKey)
}

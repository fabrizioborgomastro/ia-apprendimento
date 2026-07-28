import test from 'node:test'
import assert from 'node:assert/strict'
import { CONTENT_VERSION } from '../public/content/schema.js'
import { mergeProgress, migrateLessonProgress } from '../public/learning.js'
import { deserializeProgress, serializeProgress } from '../public/sync.js'

const legacy = {
  lessonId: 'llm-agents',
  status: 'in_progress',
  cursor: 2,
  bestScore: 40,
  reviewQuestionIds: [],
  updatedAt: '2026-07-28T10:00:00.000Z'
}

test('legacy incomplete cursor maps proportionally to new units', () => {
  const migrated = migrateLessonProgress(legacy, { units: Array(9).fill({}) }, 5)

  assert.equal(migrated.cursor, 4)
  assert.equal(migrated.contentVersion, CONTENT_VERSION)
})

test('completed legacy progress stays completed with its best score', () => {
  const migrated = migrateLessonProgress(
    { ...legacy, status: 'completed', bestScore: 90 },
    { units: Array(9).fill({}) },
    5
  )

  assert.equal(migrated.status, 'completed')
  assert.equal(migrated.bestScore, 90)
})

test('version-aware merge migrates a legacy cursor before selecting the newest progress', () => {
  const localLegacy = { ...legacy, cursor: 2, updatedAt: '2026-07-28T11:00:00.000Z' }
  const remoteCurrent = {
    ...legacy,
    cursor: 3,
    contentVersion: CONTENT_VERSION,
    updatedAt: '2026-07-28T10:00:00.000Z'
  }

  const merged = mergeProgress(localLegacy, remoteCurrent, { units: Array(9).fill({}) })

  assert.equal(merged.cursor, 4)
  assert.equal(merged.contentVersion, CONTENT_VERSION)
})

test('Supabase progress rows preserve the content version in both directions', () => {
  const progress = {
    lessonId: 'llm-agents', status: 'in_progress', cursor: 4, bestScore: 80,
    reviewQuestionIds: ['llm-q1'], updatedAt: '2026-07-28T10:00:00.000Z', contentVersion: 2
  }

  const row = serializeProgress(progress)

  assert.equal(row.content_version, 2)
  assert.deepEqual(deserializeProgress(row), progress)
})

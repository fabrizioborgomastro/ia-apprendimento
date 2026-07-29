import test from 'node:test'
import assert from 'node:assert/strict'
import { CONTENT_VERSION } from '../public/content/schema.js'
import { mergeProgress, migrateLessonProgress } from '../public/learning.js'
import { deserializeProgress, serializeProgress } from '../public/sync.js'
import { curriculum } from '../public/content.js'

const lesson = curriculum[0]
const unitCount = lesson.units.length

const legacy = {
  lessonId: 'trasformazione',
  status: 'in_progress',
  cursor: 2,
  bestScore: 40,
  reviewQuestionIds: [],
  updatedAt: '2026-07-28T10:00:00.000Z'
}

test('a cursor that still fits the new course is kept as it is', () => {
  const migrated = migrateLessonProgress(legacy, lesson)

  assert.equal(migrated.cursor, 2)
  assert.equal(migrated.contentVersion, CONTENT_VERSION)
})

test('completed progress stays completed with its best score', () => {
  const migrated = migrateLessonProgress({ ...legacy, status: 'completed', bestScore: 90 }, lesson)

  assert.equal(migrated.status, 'completed')
  assert.equal(migrated.bestScore, 90)
})

test('a negative cursor clamps to the first unit', () => {
  assert.equal(migrateLessonProgress({ ...legacy, cursor: -3 }, lesson).cursor, 0)
})

test('a cursor from a longer module clamps to the end of the new one', () => {
  const migrated = migrateLessonProgress({ ...legacy, cursor: 99, status: 'completed', bestScore: 90 }, lesson)

  assert.equal(migrated.cursor, unitCount)
  assert.equal(migrated.status, 'completed')
  assert.equal(migrated.bestScore, 90)
})

test('version-aware merge migrates before selecting the newest progress', () => {
  const localLegacy = { ...legacy, cursor: 12, updatedAt: '2026-07-28T11:00:00.000Z' }
  const remoteCurrent = {
    ...legacy,
    cursor: 3,
    contentVersion: CONTENT_VERSION,
    updatedAt: '2026-07-28T10:00:00.000Z'
  }

  const merged = mergeProgress(localLegacy, remoteCurrent, lesson)

  assert.equal(merged.cursor, unitCount, 'the stale cursor must be clamped, not trusted')
  assert.equal(merged.contentVersion, CONTENT_VERSION)
})

test('Supabase progress rows preserve the content version in both directions', () => {
  const progress = {
    lessonId: 'trasformazione', status: 'in_progress', cursor: 4, bestScore: 80,
    reviewQuestionIds: ['m1u1-q1'], updatedAt: '2026-07-28T10:00:00.000Z', contentVersion: CONTENT_VERSION
  }

  const row = serializeProgress(progress)

  assert.equal(row.content_version, CONTENT_VERSION)
  assert.deepEqual(deserializeProgress(row), progress)
})

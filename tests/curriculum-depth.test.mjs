import test from 'node:test'
import assert from 'node:assert/strict'
import { countWords } from '../public/content/schema.js'
import { digitalTransformationLesson } from '../public/content/module-1-transformation.js'

export function theoryWords(lesson, locale) {
  return lesson.units
    .flatMap((unit) => unit.theory || [])
    .reduce((total, paragraph) => total + countWords(paragraph[locale]), 0)
}

export function countWorkedCases(lesson) {
  return [
    ...(lesson.workedCases || []),
    ...lesson.units.flatMap((unit) => unit.workedCases || [])
  ].length
}

test('Module 1 has the approved time, depth and practical portfolio', () => {
  assert.equal(digitalTransformationLesson.durationMinutes, 50)
  assert.deepEqual(digitalTransformationLesson.timeBudget, { theory: 25, cases: 15, practice: 10 })
  assert.equal(digitalTransformationLesson.units.length, 6)
  assert.ok(theoryWords(digitalTransformationLesson, 'it') >= 4500)
  assert.ok(theoryWords(digitalTransformationLesson, 'en') >= 3825)
  assert.ok(countWorkedCases(digitalTransformationLesson) >= 2)
})

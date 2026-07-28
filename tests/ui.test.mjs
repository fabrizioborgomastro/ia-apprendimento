import test from 'node:test'
import assert from 'node:assert/strict'
import { getDashboardState, normalizeAppHref, parseRoute, quizFeedback } from '../public/ui.js'
import { lessons } from '../public/content.js'

test('parseRoute identifies a lesson deep link', () => {
  assert.deepEqual(parseRoute('/lesson/llm-agents'), { name: 'lesson', slug: 'llm-agents' })
})

test('parseRoute recognizes primary application destinations', () => {
  assert.deepEqual(parseRoute('/review'), { name: 'review' })
  assert.deepEqual(parseRoute('/interview'), { name: 'interview' })
  assert.deepEqual(parseRoute('/unknown'), { name: 'dashboard' })
})

test('normalizeAppHref does not duplicate the GitHub Pages base path', () => {
  assert.equal(normalizeAppHref('/', '/ia-apprendimento/'), '/ia-apprendimento/')
  assert.equal(normalizeAppHref('/sprint', '/ia-apprendimento/'), '/ia-apprendimento/sprint')
  assert.equal(normalizeAppHref('/ia-apprendimento/sprint', '/ia-apprendimento/'), '/ia-apprendimento/sprint')
  assert.equal(normalizeAppHref('#quiz', '/ia-apprendimento/'), '#quiz')
})

test('getDashboardState returns the first unfinished lesson and true completion percentage', () => {
  const progress = {
    'digital-transformation': { status: 'completed', bestScore: 100 },
    'ot-it-ai-cloud': { status: 'in_progress', bestScore: 33 }
  }
  const state = getDashboardState(lessons, progress)
  assert.equal(state.nextLesson.id, 'ot-it-ai-cloud')
  assert.equal(state.completedCount, 1)
  assert.equal(state.percent, 17)
})

test('quizFeedback explains both correct and incorrect choices', () => {
  const question = lessons[0].quiz[0]
  assert.deepEqual(quizFeedback(question, 1), { correct: true, label: 'Corretto', explanation: question.explanation })
  assert.deepEqual(quizFeedback(question, 0), { correct: false, label: 'Da rivedere', explanation: question.explanation })
})

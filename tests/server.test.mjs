import test from 'node:test'
import assert from 'node:assert/strict'
import { createAppServer } from '../tools/server.mjs'

test('a direct lesson URL redirects through the application route recovery', async (context) => {
  const server = createAppServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  context.after(() => new Promise((resolve) => server.close(resolve)))
  const { port } = server.address()

  const response = await fetch(`http://127.0.0.1:${port}/lesson/llm-agents`, { redirect: 'manual' })

  assert.equal(response.status, 302)
  assert.equal(response.headers.get('location'), '/?route=%2Flesson%2Fllm-agents')
})

test('a unit deep link keeps its query through the route recovery redirect', async (context) => {
  const server = createAppServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  context.after(() => new Promise((resolve) => server.close(resolve)))
  const { port } = server.address()

  const response = await fetch(
    `http://127.0.0.1:${port}/lesson/mvp-governance?unit=integration-shadow-mode-ownership`,
    { redirect: 'manual' }
  )

  assert.equal(response.status, 302)
  const route = new URL(response.headers.get('location'), 'http://127.0.0.1').searchParams.get('route')
  assert.equal(
    route,
    '/lesson/mvp-governance?unit=integration-shadow-mode-ownership',
    'the requested unit must survive the redirect'
  )
})

test('versioned assets are served despite their cache-busting query', async (context) => {
  const server = createAppServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  context.after(() => new Promise((resolve) => server.close(resolve)))
  const { port } = server.address()

  for (const asset of ['/app.js?v=5', '/content.js?v=5', '/render.js?v=5', '/content/index.js']) {
    const response = await fetch(`http://127.0.0.1:${port}${asset}`)
    assert.equal(response.status, 200, `${asset} must be served`)
    assert.match(response.headers.get('content-type'), /javascript/u)
  }
})

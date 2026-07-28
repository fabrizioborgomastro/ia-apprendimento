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

import test from 'node:test'
import assert from 'node:assert/strict'
import { getSupabaseApiKey } from '../public/sync.js'

test('publishable key is preferred while the legacy anon key remains supported', () => {
  assert.equal(getSupabaseApiKey({ supabasePublishableKey: 'publishable', supabaseAnonKey: 'legacy' }), 'publishable')
  assert.equal(getSupabaseApiKey({ supabaseAnonKey: 'legacy' }), 'legacy')
})

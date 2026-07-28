import assert from 'node:assert/strict'
import { chromium } from 'file:///C:/Users/Vipera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
import { createAppServer } from '../tools/server.mjs'

const server = createAppServer()
await new Promise((resolve) => server.listen(4174, '127.0.0.1', resolve))
let browser

try {
  browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true })
  await page.goto('http://127.0.0.1:4174/')
  await page.getByRole('heading', { name: /preparati a guidare/i }).waitFor({ timeout: 3000 })
  await page.getByRole('link', { name: /inizia lo sprint/i }).click()
  await page.getByRole('heading', { name: /digital transformation/i }).waitFor()
  await page.getByRole('link', { name: /apri la lezione/i }).first().click()
  await page.getByRole('heading', { name: /non partire dalla tecnologia/i }).waitFor()
  await page.getByRole('button', { name: /ridurre il downtime/i }).click()
  assert.match(await page.locator('[data-question="dt-q1"] [data-feedback]').innerText(), /corretto/i)
  assert.equal((await page.locator('body').evaluate((body) => body.scrollWidth <= innerWidth)), true)
  console.log('E2E mobile: dashboard, sprint, lesson and quiz passed')
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}

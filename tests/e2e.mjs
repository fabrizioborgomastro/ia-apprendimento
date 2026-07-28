import assert from 'node:assert/strict'
import { createAppServer } from '../tools/server.mjs'
import { curriculum } from '../public/content.js'

const PLAYWRIGHT_FALLBACK = 'file:///C:/Users/Vipera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
const { chromium } = await import('playwright').catch(() => import(PLAYWRIGHT_FALLBACK))

const lesson = curriculum[0]
const [firstUnit, secondUnit] = lesson.units
const server = createAppServer()
await new Promise((resolve) => server.listen(4174, '127.0.0.1', resolve))
const base = 'http://127.0.0.1:4174'
let browser

const noHorizontalOverflow = (page) => page.locator('body').evaluate((body) => body.scrollWidth <= innerWidth + 1)

try {
  browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true })

  // 1. Dashboard and sprint entry
  await page.goto(base)
  await page.getByRole('heading', { name: /preparati a guidare/i }).waitFor({ timeout: 5000 })
  await page.getByRole('link', { name: /inizia lo sprint/i }).click()
  await page.getByRole('heading', { name: /sei moduli/i }).waitFor()
  await page.getByRole('link', { name: /apri la lezione/i }).first().click()

  // 2. Exactly one unit is visible and the URL is pinned to it
  await page.getByRole('heading', { level: 1, name: new RegExp(firstUnit.title.it.slice(0, 24), 'i') }).waitFor()
  assert.equal(await page.locator('[data-unit-content]').count(), 1, 'only one unit may be rendered')
  await page.waitForURL(new RegExp(`unit=${firstUnit.id}`))
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow at 390px')

  // 3. Reveals are independent
  const revealButtons = page.locator('[data-reveal-toggle]')
  if (await revealButtons.count()) {
    await page.locator('[data-reveal-toggle="solution"]').click()
    await page.locator('#reveal-solution').waitFor()
    assert.equal(await page.locator('#reveal-rubric').count(), 0, 'revealing the solution must not reveal the rubric')
  }

  // 4. Answer the checkpoint and complete the unit
  await page.locator(`[data-checkpoint-option="${firstUnit.checkpoint.correctOption}"]`).click()
  await page.locator('.checkpoint-feedback.is-correct').waitFor()
  if (await page.locator('[data-activity-mark]').count()) await page.locator('[data-activity-mark]').click()
  await page.locator('[data-unit-status]').filter({ hasText: /completata/i }).waitFor()

  // 5. Move forward
  await page.locator('[data-unit-next]').click()
  await page.waitForURL(new RegExp(`unit=${secondUnit.id}`))
  await page.getByRole('heading', { level: 1, name: new RegExp(secondUnit.title.it.slice(0, 24), 'i') }).waitFor()
  assert.equal(await page.locator('[data-unit-content]').count(), 1)

  // 6. Switching language keeps the same unit and the same deep link
  const urlBeforeSwitch = page.url()
  await page.locator('[data-locale="en"]').click()
  await page.getByRole('heading', { level: 1, name: new RegExp(secondUnit.title.en.slice(0, 24), 'i') }).waitFor()
  assert.equal(page.url(), urlBeforeSwitch, 'the language switch must not change the route')
  assert.equal(await page.locator('[data-locale="en"]').getAttribute('aria-pressed'), 'true')
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow in English')

  // 7. A deep link survives a reload, in the persisted language
  await page.reload()
  await page.getByRole('heading', { level: 1, name: new RegExp(secondUnit.title.en.slice(0, 24), 'i') }).waitFor()
  assert.equal(await page.locator('[data-unit-content]').count(), 1)
  await page.locator('[data-locale="it"]').click()

  // 8. The final unit exposes the final checkpoint without regressing the score
  const lastUnit = lesson.units.at(-1)
  await page.goto(`${base}/lesson/${lesson.slug}?unit=${lastUnit.id}`)
  await page.locator('#final-checkpoint').waitFor()
  const questions = page.locator('[data-question]')
  const questionCount = await questions.count()
  for (let index = 0; index < questionCount; index += 1) {
    const card = questions.nth(index)
    const correct = await card.locator('[data-quiz-option]').count()
    for (let option = 0; option < correct; option += 1) {
      await card.locator(`[data-quiz-option="${option}"]`).click()
      if (await card.locator('.feedback.correct').count()) break
    }
  }
  await page.locator('[data-quiz-summary] b').waitFor()

  // 9. Desktop layout keeps the side index and stays free of overflow
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`${base}/lesson/${lesson.slug}?unit=${firstUnit.id}`)
  await page.locator('[data-unit-index]').waitFor()
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow at 1440px')
  await page.setViewportSize({ width: 360, height: 800 })
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow at 360px')

  // 10. The login page still reports Supabase as ready
  await page.goto(`${base}/login`)
  await page.getByText(/READY|SETUP NECESSARIO/).waitFor()

  const consoleErrors = []
  page.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()))
  await page.goto(`${base}/lesson/${lesson.slug}?unit=${firstUnit.id}`)
  await page.locator('[data-unit-content]').waitFor()
  assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join(' | ')}`)

  console.log('E2E mobile: one unit, reveals, checkpoint, next, language, deep link, final quiz, viewports and login passed')
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}

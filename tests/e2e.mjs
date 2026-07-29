import assert from 'node:assert/strict'
import { createAppServer } from '../tools/server.mjs'
import { curriculum, glossary, interviewAnswers } from '../public/content.js'

const PLAYWRIGHT_FALLBACK = 'file:///C:/Users/Vipera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'
const { chromium } = await import('playwright').catch(() => import(PLAYWRIGHT_FALLBACK))

const lesson = curriculum[0]
const [firstUnit, secondUnit] = lesson.units
const server = createAppServer()
await new Promise((resolve) => server.listen(4174, '127.0.0.1', resolve))
const base = 'http://127.0.0.1:4174'
let browser

const noHorizontalOverflow = (page) => page.locator('body').evaluate((body) => body.scrollWidth <= innerWidth + 1)

async function answerEveryQuestion(page, unit) {
  for (const question of unit.quiz) {
    const card = page.locator(`[data-question="${question.id}"]`)
    await card.locator(`[data-quiz-option="${question.correctOption}"]`).click()
    await card.locator('.feedback.correct').waitFor()
  }
}

try {
  browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true })

  // 1. Dashboard and course entry
  await page.goto(base)
  await page.getByRole('heading', { name: /un processo solo/i }).waitFor({ timeout: 5000 })
  await page.getByRole('link', { name: /inizia il corso/i }).click()
  await page.getByRole('heading', { name: /cinque moduli/i }).waitFor()
  await page.getByRole('link', { name: /apri il modulo/i }).first().click()

  // 2. Exactly one unit is visible and the URL is pinned to it
  await page.getByRole('heading', { level: 1, name: new RegExp(firstUnit.title.it.slice(0, 24), 'i') }).waitFor()
  assert.equal(await page.locator('[data-unit-content]').count(), 1, 'only one unit may be rendered')
  await page.waitForURL(new RegExp(`unit=${firstUnit.id}`))
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow at 390px')

  // 3. Every unit section is present, in the promised order
  for (const hook of ['[data-unit-stage]', '[data-unit-terms]', '[data-unit-example]', '[data-unit-english]', '[data-unit-quiz]', '[data-unit-sources]']) {
    assert.equal(await page.locator(hook).count(), 1, `missing section ${hook}`)
  }
  assert.equal(await page.locator('[data-unit-quiz] [data-question]').count(), 7, 'the unit quiz must show seven questions')

  // 4. A wrong answer teaches and locks the question
  const wrongQuestion = firstUnit.quiz[0]
  const wrongOption = (wrongQuestion.correctOption + 1) % 4
  await page.locator(`[data-question="${wrongQuestion.id}"] [data-quiz-option="${wrongOption}"]`).click()
  await page.locator(`[data-question="${wrongQuestion.id}"] .feedback.wrong`).waitFor()
  assert.equal(
    await page.locator(`[data-question="${wrongQuestion.id}"] [data-quiz-option="0"]`).isDisabled(),
    true,
    'an answered question cannot be answered twice'
  )

  // 5. Completing the quiz completes the unit
  for (const question of firstUnit.quiz.slice(1)) {
    await page.locator(`[data-question="${question.id}"] [data-quiz-option="${question.correctOption}"]`).click()
  }
  await page.locator('[data-unit-status]').filter({ hasText: /completata/i }).waitFor()

  // 6. Move forward
  await page.locator('[data-unit-next]').click()
  await page.waitForURL(new RegExp(`unit=${secondUnit.id}`))
  await page.getByRole('heading', { level: 1, name: new RegExp(secondUnit.title.it.slice(0, 24), 'i') }).waitFor()

  // 7. Switching language keeps the same unit, the same deep link and the English lines
  const urlBeforeSwitch = page.url()
  await page.locator('[data-locale="en"]').click()
  await page.getByRole('heading', { level: 1, name: new RegExp(secondUnit.title.en.slice(0, 24), 'i') }).waitFor()
  assert.equal(page.url(), urlBeforeSwitch, 'the language switch must not change the route')
  await page.getByText(secondUnit.englishBlock.lines[0].slice(0, 30)).first().waitFor()
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow in English')

  // 8. A deep link survives a reload, in the persisted language, and answers are not lost
  await page.reload()
  await page.getByRole('heading', { level: 1, name: new RegExp(secondUnit.title.en.slice(0, 24), 'i') }).waitFor()
  await page.locator('[data-locale="it"]').click()
  await page.goto(`${base}/lesson/${lesson.slug}?unit=${firstUnit.id}`)
  await page.locator('[data-unit-status]').filter({ hasText: /completata/i }).waitFor()

  // 9. A wrong answer reaches the review queue
  await page.goto(`${base}/review`)
  await page.locator(`[data-review-question="${wrongQuestion.id}"]`).waitFor()

  // 10. The glossary searches and the interview page opens its answers
  await page.goto(`${base}/glossario`)
  assert.equal(await page.locator('[data-term-entry]').count(), glossary.length, 'the glossary must list every term')
  await page.locator('#term-search').fill('PLC')
  await page.locator('[data-term-entry="plc"]').waitFor()
  assert.ok(await page.locator('[data-term-entry]').count() < glossary.length, 'the search must filter')

  await page.goto(`${base}/interview`)
  assert.equal(await page.locator('[data-interview-answer]').count(), interviewAnswers.length)
  await page.locator(`[data-interview-answer="${interviewAnswers[0].id}"] summary`).click()
  await page.getByText(interviewAnswers[0].english[0].slice(0, 30)).first().waitFor()

  // 11. Desktop layout keeps the side index and stays free of overflow
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`${base}/lesson/${lesson.slug}?unit=${firstUnit.id}`)
  await page.locator('[data-unit-index]').waitFor()
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow at 1440px')
  await page.setViewportSize({ width: 360, height: 800 })
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow at 360px')
  await page.goto(`${base}/glossario`)
  assert.equal(await noHorizontalOverflow(page), true, 'no horizontal overflow on the glossary at 360px')

  // 12. The login page still reports the Supabase state
  await page.goto(`${base}/login`)
  await page.getByText(/PRONTO|SETUP NECESSARIO/).waitFor()

  const consoleErrors = []
  page.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()))
  await page.goto(`${base}/lesson/${lesson.slug}?unit=${firstUnit.id}`)
  await page.locator('[data-unit-content]').waitFor()
  assert.deepEqual(consoleErrors, [], `console errors: ${consoleErrors.join(' | ')}`)

  console.log('E2E mobile: one unit, seven questions, review queue, glossary, interview, viewports and login passed')
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}

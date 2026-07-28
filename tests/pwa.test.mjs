import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'

const publicUrl = (file) => new URL(`../public/${file}`, import.meta.url)
const read = (file) => readFile(publicUrl(file), 'utf8')

const RELEASE_VERSION = 5

test('the service worker declares the current release cache and cleans older ones', async () => {
  const sw = await read('sw.js')
  const cache = sw.match(/const CACHE = '([^']+)'/u)
  assert.ok(cache, 'the cache name must be declared')
  const version = Number(cache[1].replace('ai-sprint-v', ''))
  assert.equal(cache[1], `ai-sprint-v${RELEASE_VERSION}`)
  assert.ok(version >= 5, 'the release cache must be v5 or a later unused version')
  assert.match(sw, /caches\.keys\(\)[\s\S]*key !== CACHE[\s\S]*caches\.delete\(key\)/u, 'old caches must be removed on activate')
  assert.match(sw, /event\.respondWith\(fetch\(event\.request\)/u, 'the worker must stay network-first')
  assert.match(sw, /\.catch\(\(\) => caches\.match\(event\.request\)/u, 'the cache is the offline fallback')
})

test('the service worker precaches every module the application graph loads', async () => {
  const sw = await read('sw.js')
  const assets = sw.slice(sw.indexOf('const ASSETS'), sw.indexOf(']', sw.indexOf('const ASSETS')))

  const contentFiles = (await readdir(publicUrl('content'))).filter((file) => file.endsWith('.js'))
  assert.ok(contentFiles.length >= 9, 'the curriculum must ship its modules')
  for (const file of contentFiles) {
    assert.ok(assets.includes(`./content/${file}`), `sw.js must precache content/${file}`)
  }
  for (const entry of ['app.js', 'learning.js', 'ui.js', 'render.js', 'sync.js', 'content.js', 'config.js', 'styles.css']) {
    assert.ok(assets.includes(`./${entry}?v=${RELEASE_VERSION}`), `sw.js must precache ${entry} at the release version`)
  }
  for (const entry of ['./', './index.html', './manifest.webmanifest', './icon.svg']) {
    assert.ok(assets.includes(entry), `sw.js must precache ${entry}`)
  }
})

test('every versioned entry URL agrees with the release version', async () => {
  const [html, app, render] = await Promise.all([read('index.html'), read('app.js'), read('render.js')])

  const versionsIn = (source) => [...new Set([...source.matchAll(/\?v=(\d+)/gu)].map(([, version]) => Number(version)))]
  for (const [name, source] of [['index.html', html], ['app.js', app], ['render.js', render]]) {
    const versions = versionsIn(source)
    assert.ok(versions.length > 0, `${name} must version its entries`)
    assert.deepEqual(versions, [RELEASE_VERSION], `${name} mixes asset versions: ${versions.join(', ')}`)
  }
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=5"><\/script>/u)
})

test('the application shell exposes the language switch and a focusable main region', async () => {
  const html = await read('index.html')
  assert.match(html, /data-locale-switch/u, 'the header must host the language switch')
  assert.match(html, /<main id="main" tabindex="-1">/u)
  assert.match(html, /class="skip-link"/u)
  assert.match(html, /<html lang="it">/u)
})

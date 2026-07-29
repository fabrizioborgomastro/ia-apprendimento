import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { parseRoute } from '../public/ui.js'

const publicUrl = (file) => new URL(`../public/${file}`, import.meta.url)
const read = (file) => readFile(publicUrl(file), 'utf8')

const RELEASE_VERSION = 10

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

  // Any public module may version its imports, but none may disagree with the release.
  const publicFiles = (await readdir(new URL('../public/', import.meta.url)))
    .filter((file) => file.endsWith('.js'))
  for (const file of publicFiles) {
    const versions = versionsIn(await read(file))
    assert.ok(
      versions.length === 0 || versions.every((version) => version === RELEASE_VERSION),
      `${file} mixes asset versions: ${versions.join(', ')}`
    )
  }
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=10"><\/script>/u)
})

test('the application shell exposes the language switch and a focusable main region', async () => {
  const html = await read('index.html')
  assert.match(html, /data-locale-switch/u, 'the header must host the language switch')
  assert.match(html, /<main id="main" tabindex="-1">/u)
  assert.match(html, /class="skip-link"/u)
  assert.match(html, /<html lang="it">/u)
})

test('the GitHub Pages fallback preserves a unit deep link through the redirect', async () => {
  const html = await read('404.html')
  const script = html.slice(html.indexOf('<script>') + 8, html.indexOf('</script>'))
  assert.ok(script.includes('location.replace'), 'the fallback must redirect')

  const runFallback = (pathname, search = '', hash = '') => {
    let replaced = null
    const location = {
      origin: 'https://fabrizioborgomastro.github.io',
      hostname: 'fabrizioborgomastro.github.io',
      pathname,
      search,
      hash,
      replace: (target) => { replaced = target }
    }
    new Function('location', script)(location)
    return replaced
  }

  const deepLink = '/ia-apprendimento/lesson/in-produzione'
  const query = '?unit=mvp-prototipo-pilota'
  const target = runFallback(deepLink, query)
  assert.ok(target, 'the fallback must produce a redirect target')

  const restored = new URL(target).searchParams.get('route')
  assert.equal(restored, '/lesson/in-produzione?unit=mvp-prototipo-pilota',
    'path and query must survive the GitHub Pages fallback')

  const [routePath, routeSearch] = restored.split('?')
  const route = parseRoute(routePath, `?${routeSearch}`)
  assert.deepEqual(route, {
    name: 'lesson',
    slug: 'in-produzione',
    unitId: 'mvp-prototipo-pilota'
  })

  const plain = new URL(runFallback('/ia-apprendimento/corso')).searchParams.get('route')
  assert.equal(plain, '/corso')
  assert.deepEqual(parseRoute(plain), { name: 'course' })
})

test('the application restores the redirected route before rendering', async () => {
  const app = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
  const restoreIndex = app.indexOf('restoreRedirectedRoute()')
  const renderIndex = app.indexOf('\nrender()')
  assert.ok(restoreIndex > -1 && renderIndex > -1)
  assert.ok(restoreIndex < renderIndex, 'the redirected route must be restored before the first render')
  assert.match(app, /searchParams\.get\('route'\)/u)
  assert.match(app, /history\.replaceState\(\{\}, '', `\$\{BASE_PATH\}\$\{redirected\.replace/u)
})

async function resolveModuleGraph() {
  const html = await read('index.html')
  const entries = [...html.matchAll(/src="\.\/([^"]+)"/gu)].map(([, src]) => src)
  const requests = new Map()
  const queue = entries.slice()

  while (queue.length) {
    const request = queue.shift()
    const [file] = request.split('?')
    if (requests.has(request)) continue
    requests.set(request, file)
    if (!file.endsWith('.js')) continue

    const source = await read(file)
    const directory = file.includes('/') ? `${file.slice(0, file.lastIndexOf('/'))}/` : ''
    for (const [, specifier] of source.matchAll(/(?:from|import)\s*'(\.\/[^']+)'/gu)) {
      const [target, query] = specifier.slice(2).split('?')
      const resolved = new URL(`${directory}${target}`, 'file:///').pathname.slice(1)
      queue.push(query ? `${resolved}?${query}` : resolved)
    }
  }
  return requests
}

test('no module is ever requested under two different URLs', async () => {
  const requests = await resolveModuleGraph()
  const byFile = new Map()
  for (const [request, file] of requests) {
    byFile.set(file, [...(byFile.get(file) || []), request])
  }
  const duplicated = [...byFile.entries()].filter(([, urls]) => urls.length > 1)
  assert.deepEqual(
    duplicated,
    [],
    `these files would be downloaded and evaluated twice: ${duplicated.map(([file, urls]) => `${file} as ${urls.join(' and ')}`).join('; ')}`
  )
})

test('every module the browser actually requests is precached', async () => {
  const [sw, requests] = await Promise.all([read('sw.js'), resolveModuleGraph()])
  const assets = sw.slice(sw.indexOf('const ASSETS'), sw.indexOf(']', sw.indexOf('const ASSETS')))
  const missing = [...requests.keys()].filter((request) => !assets.includes(`./${request}`))
  assert.deepEqual(missing, [], `sw.js does not precache: ${missing.join(', ')}`)
})

test('every precached asset exists, so the service worker install cannot fail', async () => {
  const sw = await read('sw.js')
  const assets = sw.slice(sw.indexOf('const ASSETS'), sw.indexOf(']', sw.indexOf('const ASSETS')))
  const entries = [...assets.matchAll(/'\.\/([^']*)'/gu)].map(([, entry]) => entry)
  assert.ok(entries.length >= 20, 'the release must precache the whole application graph')

  const missing = []
  for (const entry of entries) {
    const [file] = entry.split('?')
    if (!file) continue
    try {
      await readFile(publicUrl(file))
    } catch {
      missing.push(entry)
    }
  }
  assert.deepEqual(missing, [], `cache.addAll would reject on: ${missing.join(', ')}`)
  assert.ok(entries.includes(''), 'the navigation root must be precached')
})

test('the manifest points at icons that exist and stays installable', async () => {
  const manifest = JSON.parse(await read('manifest.webmanifest'))
  assert.equal(manifest.display, 'standalone')
  assert.ok(manifest.icons.length >= 2)
  for (const icon of manifest.icons) {
    const src = icon.src.replace(/^\.\//u, '')
    await readFile(publicUrl(src))
    assert.ok(icon.sizes, `${src} must declare its sizes`)
  }
  assert.ok(manifest.start_url, 'the manifest needs a start URL')
})

test('a new release takes control instead of leaving the previous cache active', async () => {
  const sw = await read('sw.js')
  assert.match(
    sw,
    /self\.skipWaiting\(\)/u,
    'without skipWaiting the new worker stays in waiting and the old cache keeps serving offline'
  )
  assert.match(
    sw,
    /self\.clients\.claim\(\)/u,
    'without clients.claim the open tabs stay on the previous worker'
  )
  const activate = sw.match(/addEventListener\('activate'[\s\S]*?\)\)\n/u)
  assert.ok(activate, 'the activate handler must exist')
  assert.match(activate[0], /caches\.delete\(key\)/u, 'activation must still delete superseded caches')
})

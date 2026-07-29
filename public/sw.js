const CACHE = 'ai-sprint-v10'
const ASSETS = [
  './', './index.html', './styles.css?v=10', './manifest.webmanifest', './icon.svg', './icon-maskable.svg',
  './config.js?v=10', './app.js?v=10', './learning.js?v=10', './ui.js?v=10', './render.js?v=10',
  './sync.js?v=10', './types.js', './content.js?v=10',
  './content/index.js', './content/schema.js', './content/sources.js',
  './content/glossary.js', './content/interview.js',
  './content/modulo-1-trasformazione.js', './content/modulo-2-fabbrica-digitale.js',
  './content/modulo-3-scegliere-strumento.js', './content/modulo-4-in-produzione.js',
  './content/modulo-5-governare-scalare.js'
]

self.addEventListener('install', (event) => event.waitUntil(
  caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
))
self.addEventListener('activate', (event) => event.waitUntil(
  caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim())
))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone()
    caches.open(CACHE).then((cache) => cache.put(event.request, copy))
    return response
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html'))))
})

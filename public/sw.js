const CACHE = 'ai-sprint-v8'
const ASSETS = [
  './', './index.html', './styles.css?v=8', './manifest.webmanifest', './icon.svg', './icon-maskable.svg',
  './config.js?v=8', './app.js?v=8', './learning.js?v=8', './ui.js?v=8', './render.js?v=8',
  './sync.js?v=8', './types.js', './content.js?v=8',
  './content/index.js', './content/schema.js', './content/sources.js',
  './content/module-1-transformation.js', './content/module-2-architecture.js',
  './content/module-3-data-ai.js', './content/module-4-llm-agents.js',
  './content/module-5-mvp-governance.js', './content/module-6-interview-lab.js'
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

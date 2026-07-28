const CACHE = 'ai-sprint-v5'
const ASSETS = [
  './', './index.html', './styles.css?v=5', './manifest.webmanifest', './icon.svg', './icon-maskable.svg',
  './config.js?v=5', './app.js?v=5', './learning.js?v=5', './ui.js?v=5', './render.js?v=5',
  './sync.js?v=5', './types.js', './content.js?v=5',
  './content/index.js', './content/schema.js', './content/sources.js',
  './content/module-1-transformation.js', './content/module-2-architecture.js',
  './content/module-3-data-ai.js', './content/module-4-llm-agents.js',
  './content/module-5-mvp-governance.js', './content/module-6-interview-lab.js'
]

self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))))
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone()
    caches.open(CACHE).then((cache) => cache.put(event.request, copy))
    return response
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html'))))
})

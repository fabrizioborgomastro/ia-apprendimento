import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../public/', import.meta.url))
const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' }

export function createAppServer() {
  return createServer((request, response) => {
    const requestUrl = new URL(request.url, 'http://localhost')
    const requested = decodeURIComponent(requestUrl.pathname)
    let filePath = normalize(join(root, requested === '/' ? 'index.html' : requested))
    if (!filePath.startsWith(root)) {
      response.writeHead(404).end('Application not built')
      return
    }
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      if (!extname(requested)) {
        // Mirrors public/404.html: the query carries the requested unit and must survive.
        response.writeHead(302, {
          Location: `/?route=${encodeURIComponent(`${requested}${requestUrl.search}`)}`
        }).end()
        return
      }
      response.writeHead(404).end('Asset not found')
      return
    }
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    createReadStream(filePath).pipe(response)
  })
}

if (typeof process !== 'undefined' && process.argv?.[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env?.PORT || 4173)
  createAppServer().listen(port, '127.0.0.1', () => console.log(`AI Sprint: http://127.0.0.1:${port}`))
}

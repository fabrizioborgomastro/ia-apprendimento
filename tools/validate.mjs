import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { lessons } from '../public/content.js'
import { validateLessons } from '../public/learning.js'

const requiredFiles = ['index.html', 'app.js', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg']
for (const file of requiredFiles) assert.ok(existsSync(new URL(`../public/${file}`, import.meta.url)), `File PWA mancante: ${file}`)
assert.deepEqual(validateLessons(lessons), [])
assert.equal(lessons.length, 6)
assert.equal(new Set(lessons.map((lesson) => lesson.slug)).size, lessons.length)
const manifest = JSON.parse(readFileSync(new URL('../public/manifest.webmanifest', import.meta.url), 'utf8'))
assert.equal(manifest.display, 'standalone')
assert.ok(manifest.icons.length >= 2)
console.log(`Build validata: ${lessons.length} moduli, ${lessons.reduce((sum, lesson) => sum + lesson.quiz.length, 0)} quiz, PWA installabile`)

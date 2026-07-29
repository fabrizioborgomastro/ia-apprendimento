import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { QUESTIONS_PER_UNIT, TOTAL_QUESTIONS, TOTAL_UNITS, UNITS_PER_LESSON, validateCurriculum, validateInterviewAnswers } from '../public/content/schema.js'
import { CONTENT_VERSION, curriculum, glossary, interviewAnswers, sources } from '../public/content.js'

const requiredFiles = ['index.html', 'app.js', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg']
for (const file of requiredFiles) {
  assert.ok(existsSync(new URL(`../public/${file}`, import.meta.url)), `File PWA mancante: ${file}`)
}

const errors = validateCurriculum(curriculum, sources, glossary)
assert.deepEqual(errors, [], `Curriculum non valido:\n${errors.join('\n')}`)

const interviewErrors = validateInterviewAnswers(interviewAnswers)
assert.deepEqual(interviewErrors, [], `Domande di colloquio non valide:\n${interviewErrors.join('\n')}`)

assert.equal(curriculum.length, 5)
assert.equal(new Set(curriculum.map((lesson) => lesson.slug)).size, curriculum.length)

const units = curriculum.flatMap((lesson) => lesson.units)
assert.equal(units.length, TOTAL_UNITS)
assert.ok(curriculum.every((lesson) => lesson.units.length === UNITS_PER_LESSON))
assert.ok(units.every((unit) => unit.quiz.length === QUESTIONS_PER_UNIT))
assert.equal(units.reduce((total, unit) => total + unit.quiz.length, 0), TOTAL_QUESTIONS)

const manifest = JSON.parse(readFileSync(new URL('../public/manifest.webmanifest', import.meta.url), 'utf8'))
assert.equal(manifest.display, 'standalone')
assert.ok(manifest.icons.length >= 2)

const serviceWorker = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8')
for (const asset of ['./content/index.js', './content/glossary.js', './content/interview.js']) {
  assert.ok(serviceWorker.includes(asset), `Il service worker non mette in cache ${asset}`)
}

const totalMinutes = curriculum.reduce((total, lesson) => total + lesson.durationMinutes, 0)
assert.ok(totalMinutes >= 120 && totalMinutes <= 180, `Durata del corso fuori intervallo: ${totalMinutes}`)

console.log(`Contenuto valido: versione ${CONTENT_VERSION}, ${curriculum.length} moduli, ${units.length} unità, ${TOTAL_QUESTIONS} domande, ${glossary.length} termini, ${totalMinutes} minuti.`)

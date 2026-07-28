import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { countWords, validateCurriculum } from '../public/content/schema.js'
import { CONTENT_VERSION, curriculum, lessons, sources } from '../public/content.js'

const requiredFiles = ['index.html', 'app.js', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg']
for (const file of requiredFiles) {
  assert.ok(existsSync(new URL(`../public/${file}`, import.meta.url)), `File PWA mancante: ${file}`)
}

const errors = validateCurriculum(curriculum, sources)
assert.deepEqual(errors, [], `Curriculum non valido:\n${errors.join('\n')}`)

assert.equal(curriculum.length, 6)
assert.equal(new Set(curriculum.map((lesson) => lesson.slug)).size, curriculum.length)
assert.deepEqual(curriculum.map((lesson) => lesson.id), lessons.map((lesson) => lesson.id))

const manifest = JSON.parse(readFileSync(new URL('../public/manifest.webmanifest', import.meta.url), 'utf8'))
assert.equal(manifest.display, 'standalone')
assert.ok(manifest.icons.length >= 2)

const theoryWords = (locale) => curriculum
  .flatMap((lesson) => lesson.units.flatMap((unit) => unit.theory || []))
  .reduce((total, paragraph) => total + countWords(paragraph[locale]), 0)

const totalMinutes = curriculum.reduce((total, lesson) => total + lesson.durationMinutes, 0)
const practicalMinutes = curriculum.reduce(
  (total, lesson) => total + lesson.timeBudget.cases + lesson.timeBudget.practice,
  0
)
const italianWords = theoryWords('it')
const englishWords = theoryWords('en')
const referencedSources = new Set(curriculum.flatMap((lesson) => lesson.units.flatMap((unit) => unit.sourceIds)))

assert.equal(totalMinutes, 420)
assert.equal(practicalMinutes, 231)
assert.ok(italianWords >= 34020, `Parole italiane insufficienti: ${italianWords}`)
assert.ok(englishWords >= italianWords * 0.85, `Rapporto inglese insufficiente: ${englishWords}/${italianWords}`)
for (const sourceId of referencedSources) {
  assert.ok(sources[sourceId], `Fonte citata ma assente dal catalogo: ${sourceId}`)
}

const practicalShare = Math.round((practicalMinutes / totalMinutes) * 100)

console.log([
  `Build validata: ${curriculum.length} moduli, contenuto versione ${CONTENT_VERSION}, PWA installabile`,
  `Minuti totali: ${totalMinutes} (teoria ${totalMinutes - practicalMinutes}, casi e pratica ${practicalMinutes}, quota pratica ${practicalShare}%)`,
  `Parole di teoria: ${italianWords} italiane, ${englishWords} inglesi (${Math.round((englishWords / italianWords) * 100)}% dell'italiano)`,
  `Fonti: ${referencedSources.size} citate su ${Object.keys(sources).length} nel catalogo, tutte risolte`,
  `Localizzazione: completa in italiano e inglese su ogni campo visibile`
].join('\n'))

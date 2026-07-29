import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { countWords, QUESTIONS_PER_UNIT, TOTAL_QUESTIONS, TOTAL_UNITS, UNITS_PER_LESSON } from '../public/content/schema.js'
import { curriculum, glossary, interviewAnswers, stages } from '../public/content.js'

const units = curriculum.flatMap((lesson) => lesson.units)
const questions = units.flatMap((unit) => unit.quiz)

const missingItalianElision = /(?:^|[\s"'([{])(?:[Ll]|[Aa]ll|[Dd]all|[DdNn]ell|[Ss]ull)\s+(?=[AEHIOUÀÈÉÌÒÓÙaehiouàèéìòóù])/u

test('the course keeps the shape it promises: five modules, twenty-five units, one hundred seventy-five questions', () => {
  assert.equal(curriculum.length, 5)
  assert.equal(units.length, TOTAL_UNITS)
  assert.equal(questions.length, TOTAL_QUESTIONS)
  assert.ok(curriculum.every((lesson) => lesson.units.length === UNITS_PER_LESSON))
  assert.ok(units.every((unit) => unit.quiz.length === QUESTIONS_PER_UNIT))
})

test('module IDs, slugs and order are stable, because they are progress keys', () => {
  const expected = ['trasformazione', 'fabbrica-digitale', 'scegliere-strumento', 'in-produzione', 'governare-scalare']
  assert.deepEqual(curriculum.map((lesson) => lesson.id), expected)
  assert.deepEqual(curriculum.map((lesson) => lesson.slug), expected)
  assert.deepEqual(curriculum.map((lesson) => lesson.moduleNumber), [1, 2, 3, 4, 5])
})

test('the course fits the promised two and a half hours', () => {
  const total = curriculum.reduce((sum, lesson) => sum + lesson.durationMinutes, 0)
  assert.ok(total >= 120 && total <= 180, `durata fuori intervallo: ${total}`)
  for (const lesson of curriculum) {
    const unitMinutes = lesson.units.reduce((sum, unit) => sum + unit.estimatedMinutes, 0)
    assert.equal(unitMinutes, lesson.durationMinutes, `${lesson.id}: i minuti delle unità non tornano`)
  }
})

test('every one of the seven steps is covered by at least one unit', () => {
  const covered = new Set(units.map((unit) => unit.stage))
  for (const stage of stages) {
    assert.ok(covered.has(stage.number), `nessuna unità copre la tappa ${stage.number}`)
  }
})

test('every unit carries its own example with numbers and its own English block', () => {
  for (const unit of units) {
    const exampleText = [
      ...unit.example.steps.map((step) => step.it),
      ...(unit.example.table?.rows || []).flatMap((row) => row.map((cell) => cell.it)),
      unit.example.takeaway.it
    ].join(' ')
    assert.match(exampleText, /\d/u, `${unit.id}: l'esempio non contiene numeri`)
    assert.ok(unit.englishBlock.lines.length >= 3, `${unit.id}: servono almeno tre frasi inglesi`)
    assert.ok(unit.englishBlock.why.trim().length > 20, `${unit.id}: manca la nota sul perché di quelle parole`)
  }
})

test('theory stays substantial in Italian and close to it in English', () => {
  for (const unit of units) {
    const italian = unit.theory.reduce((sum, paragraph) => sum + countWords(paragraph.it), 0)
    const english = unit.theory.reduce((sum, paragraph) => sum + countWords(paragraph.en), 0)
    assert.ok(italian >= 180, `${unit.id}: teoria italiana troppo corta (${italian} parole)`)
    assert.ok(english >= italian * 0.75, `${unit.id}: teoria inglese troppo corta (${english} contro ${italian})`)
  }
})

test('the English lines can be said out loud without stumbling', () => {
  const spoken = [
    ...units.flatMap((unit) => unit.englishBlock.lines),
    ...interviewAnswers.flatMap((answer) => answer.english)
  ]
  for (const line of spoken) {
    assert.ok(countWords(line) <= 40, `frase inglese troppo lunga: ${line}`)
    assert.ok(/^[A-Z"']/u.test(line.trim()), `frase inglese senza maiuscola iniziale: ${line}`)
  }
})

test('every question teaches through its explanation and has a single correct option', () => {
  const ids = new Set()
  for (const question of questions) {
    assert.ok(!ids.has(question.id), `ID domanda duplicato: ${question.id}`)
    ids.add(question.id)
    assert.equal(question.options.length, 4, `${question.id}: servono quattro opzioni`)
    assert.equal(new Set(question.options).size, 4, `${question.id}: opzioni ripetute`)
    assert.ok(question.correctOption >= 0 && question.correctOption < 4)
    assert.ok(countWords(question.explanation) >= 6, `${question.id}: spiegazione troppo corta`)
  }
})

test('the correct answer is not always in the same position', () => {
  const positions = new Map()
  for (const question of questions) {
    positions.set(question.correctOption, (positions.get(question.correctOption) || 0) + 1)
  }
  assert.ok(positions.size >= 2, 'la risposta corretta è sempre nella stessa posizione')
})

test('each module flags exactly one checkpoint question per unit', () => {
  for (const lesson of curriculum) {
    const flagged = lesson.units.map((unit) => unit.quiz.filter((question) => question.final).length)
    assert.deepEqual(flagged, [1, 1, 1, 1, 1], `${lesson.id}: checkpoint mal distribuiti`)
  }
})

test('the glossary holds every term worth looking up, and nothing else', () => {
  const glossaryIds = new Set(glossary.map((entry) => entry.id))
  for (const unit of units) {
    assert.ok(unit.terminology.length >= 5, `${unit.id}: meno di cinque termini`)
    for (const term of unit.terminology) {
      if (term.plain) {
        assert.ok(!glossaryIds.has(term.id), `${term.id} è una parola comune e non deve stare nel glossario`)
        continue
      }
      assert.ok(glossaryIds.has(term.id), `il glossario non contiene ${term.id}`)
    }
  }
  assert.ok(glossary.length >= 110, `il glossario è troppo corto: ${glossary.length} voci`)
  assert.ok(glossary.every((entry) => entry.where), 'ogni voce deve dire dove viene spiegata')
})

test('the words the reader already knows stay out of the glossary', () => {
  const glossaryIds = new Set(glossary.map((entry) => entry.id))
  const ordinaryWords = ['allarme', 'contesto', 'regola', 'modello', 'demo', 'abitudine', 'inerzia', 'attrito', 'ipotesi', 'assunzione']
  for (const id of ordinaryWords) {
    assert.ok(!glossaryIds.has(id), `${id} è una parola comune: nel glossario fa perdere di vista i termini veri`)
  }
  const acronyms = ['oee', 'plc', 'scada', 'mes', 'erp', 'kpi', 'mtbf', 'mttr', 'mvp', 'rag', 'llm', 'acl', 'sop', 'isa-95']
  for (const id of acronyms) {
    assert.ok(glossaryIds.has(id), `il glossario deve contenere la sigla ${id}`)
  }
})

test('the two complete stories and the two minute answer are where the course says they are', () => {
  const byId = new Map(units.map((unit) => [unit.id, unit]))
  assert.ok(byId.has('storia-manutenzione'), 'manca la storia della manutenzione predittiva')
  assert.ok(byId.has('storia-qualita'), 'manca la storia della qualità')
  assert.ok(byId.has('estendere-o-fermarsi'), 'manca il racconto di due minuti')
  assert.equal(byId.get('storia-qualita').stage, 7, 'la storia della qualità arriva fino alla decisione')
  assert.match(
    byId.get('estendere-o-fermarsi').theory.map((paragraph) => paragraph.it).join(' '),
    /[Ss]ette (tappe|passaggi)/u,
    'il racconto finale deve richiamare le sette tappe del corso'
  )
})

test('the ten interview questions cover the whole course and point back to a unit', () => {
  assert.equal(interviewAnswers.length, 10)
  const unitIds = new Set(units.map((unit) => unit.id))
  const lessonIds = new Set(curriculum.map((lesson) => lesson.id))
  for (const answer of interviewAnswers) {
    assert.ok(lessonIds.has(answer.relatedUnit.lessonId), `${answer.id}: modulo collegato inesistente`)
    assert.ok(unitIds.has(answer.relatedUnit.unitId), `${answer.id}: unità collegata inesistente`)
    assert.equal(answer.keyPoints.length, 3)
  }
  const covered = new Set(interviewAnswers.map((answer) => answer.relatedUnit.lessonId))
  assert.equal(covered.size, 5, 'le dieci domande devono toccare tutti e cinque i moduli')
})

test('the Italian never drops an elision and never uses an em dash', async () => {
  const italianText = [
    ...units.flatMap((unit) => [
      unit.title.it, unit.objective.it, unit.stageLabel.it,
      ...unit.theory.map((paragraph) => paragraph.it),
      ...unit.keyPoints.map((point) => point.it),
      ...unit.example.steps.map((step) => step.it),
      unit.example.takeaway.it,
      ...unit.quiz.flatMap((question) => [question.prompt, question.explanation, ...question.options])
    ]),
    ...interviewAnswers.flatMap((answer) => [answer.italian, answer.expectation, answer.mistake, ...answer.keyPoints])
  ]
  for (const passage of italianText) {
    assert.ok(!passage.includes('—'), `em dash trovato in: ${passage.slice(0, 60)}`)
    assert.ok(!missingItalianElision.test(passage), `elisione mancante in: ${passage.slice(0, 60)}`)
  }

  const markdown = await readFile(new URL('../docs/corso-v2/glossario.md', import.meta.url), 'utf8')
  assert.ok(!markdown.includes('—'), 'il glossario in markdown contiene un em dash')
})

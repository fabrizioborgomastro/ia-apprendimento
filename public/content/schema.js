/**
 * Content contract for course version 2.
 *
 * Version 2 is a different course from version 1, not a revision of it: five
 * modules of five units, one quiz of seven questions per unit, every technical
 * term explained the first time it appears, and one worked example with real
 * numbers in every unit. The validation below encodes exactly those promises,
 * so a regression in the content fails the test suite instead of reaching a
 * reader.
 */

export const CONTENT_VERSION = 3

/** Lesson IDs and slugs are progress keys. They must never change. */
export const STABLE_LESSONS = [
  ['trasformazione', 'trasformazione'],
  ['fabbrica-digitale', 'fabbrica-digitale'],
  ['scegliere-strumento', 'scegliere-strumento'],
  ['in-produzione', 'in-produzione'],
  ['governare-scalare', 'governare-scalare']
]

export const UNITS_PER_LESSON = 5
export const QUESTIONS_PER_UNIT = 7
export const TOTAL_UNITS = STABLE_LESSONS.length * UNITS_PER_LESSON
export const TOTAL_QUESTIONS = TOTAL_UNITS * QUESTIONS_PER_UNIT

const STABLE_SLUG_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const asArray = (value) => (Array.isArray(value) ? value : [])
const isText = (value) => typeof value === 'string' && Boolean(value.trim())

export function localized(it, en) {
  if (!it?.trim()) throw new Error('Italian localization is required')
  if (!en?.trim()) throw new Error('English localization is required')
  return { it, en }
}

export function isLocalized(value) {
  return isObject(value) && isText(value.it) && isText(value.en)
}

export function countWords(value) {
  const text = Array.isArray(value) ? value.join(' ') : String(value || '')
  return text.trim() ? text.trim().split(/\s+/u).length : 0
}

/**
 * A theory entry is either a paragraph, `{ it, en }`, or a named list,
 * `{ steps: [{ name, text }] }`. The named list exists because an enumeration
 * buried in a paragraph is unreadable and impossible to memorise: each step gets
 * its own line and its own name, the technical one when it exists.
 */
export function isNamedList(entry) {
  return isObject(entry) && Array.isArray(entry.steps)
}

export function theoryEntryWords(entry, locale) {
  if (isNamedList(entry)) {
    return asArray(entry.steps).reduce(
      (total, step) => total + countWords(step?.name?.[locale]) + countWords(step?.text?.[locale]),
      0
    )
  }
  return countWords(entry?.[locale])
}

export function theoryWords(lesson, locale) {
  return asArray(lesson.units)
    .flatMap((unit) => asArray(unit.theory))
    .reduce((total, entry) => total + theoryEntryWords(entry, locale), 0)
}

export function lessonUnits(lessons) {
  return asArray(lessons).flatMap((lesson) => asArray(lesson.units))
}

export function allQuestions(lessons) {
  return lessonUnits(lessons).flatMap((unit) => asArray(unit.quiz))
}

/** Every term declared by a unit, in the order the course introduces it. */
export function allTerms(lessons) {
  return lessonUnits(lessons).flatMap((unit) => asArray(unit.terminology))
}

function validateExample(example, path, errors) {
  if (!isObject(example)) {
    errors.push(`${path} needs a worked example`)
    return
  }
  if (!isLocalized(example.title)) errors.push(`${path} example needs a localized title`)
  const steps = asArray(example.steps)
  if (steps.length < 3) errors.push(`${path} example needs at least three steps`)
  for (const [index, step] of steps.entries()) {
    if (!isLocalized(step)) errors.push(`${path} example step ${index + 1} is not bilingual`)
  }
  if (!isLocalized(example.takeaway)) errors.push(`${path} example needs a localized takeaway`)

  const tableText = asArray(example.table?.rows)
    .flatMap((row) => asArray(row).map((cell) => cell?.it || ''))
    .join(' ')
  const exampleText = [...steps.map((step) => step?.it || ''), tableText, example.takeaway?.it || ''].join(' ')
  if (!exampleText.match(/\d/u)) errors.push(`${path} example must contain real numbers`)

  if ('table' in example) {
    const table = example.table
    const columns = asArray(table?.columns)
    const rows = asArray(table?.rows)
    if (columns.length < 2) errors.push(`${path} example table needs at least two columns`)
    if (!rows.length) errors.push(`${path} example table needs at least one row`)
    for (const [index, column] of columns.entries()) {
      if (!isLocalized(column)) errors.push(`${path} example table column ${index + 1} is not bilingual`)
    }
    for (const [index, row] of rows.entries()) {
      const cells = asArray(row)
      if (cells.length !== columns.length) {
        errors.push(`${path} example table row ${index + 1} must have one cell per column`)
      }
      for (const cell of cells) {
        if (!isLocalized(cell)) errors.push(`${path} example table row ${index + 1} has a cell that is not bilingual`)
      }
    }
  }
}

function validateEnglishBlock(block, path, errors) {
  if (!isObject(block)) {
    errors.push(`${path} needs an English speaking block`)
    return
  }
  const lines = asArray(block.lines)
  if (lines.length < 3) errors.push(`${path} English block needs at least three spoken lines`)
  for (const [index, line] of lines.entries()) {
    if (!isText(line)) {
      errors.push(`${path} English line ${index + 1} is empty`)
      continue
    }
    if (countWords(line) > 32) errors.push(`${path} English line ${index + 1} is too long to say out loud`)
  }
  if (!isText(block.why)) errors.push(`${path} English block must explain why those words were chosen`)
}

function validateTerminology(terminology, path, errors, seen) {
  if (terminology.length < 5) errors.push(`${path} needs at least five terms`)
  for (const [index, term] of terminology.entries()) {
    const termPath = `${path} term ${index + 1}`
    if (!isObject(term)) {
      errors.push(`${termPath} must be an object`)
      continue
    }
    if (!STABLE_SLUG_ID.test(term.id || '')) errors.push(`${termPath} needs a stable slug ID`)
    if (!isText(term.term)) errors.push(`${termPath} needs the term as it is spoken`)
    if (!isText(term.italian)) errors.push(`${termPath} needs the Italian equivalent`)
    if (!isLocalized(term.definition)) errors.push(`${termPath} needs a bilingual one-sentence definition`)
    if (isLocalized(term.definition) && countWords(term.definition.it) > 32) {
      errors.push(`${termPath} definition must stay within one sentence`)
    }
    if (term.id && seen.has(term.id) && seen.get(term.id) !== path) {
      errors.push(`${termPath} repeats ${term.id}, already introduced in ${seen.get(term.id)}`)
    } else if (term.id) {
      seen.set(term.id, path)
    }
  }
}

function validateQuiz(quiz, path, errors, questionIds) {
  if (quiz.length !== QUESTIONS_PER_UNIT) {
    errors.push(`${path} must contain exactly ${QUESTIONS_PER_UNIT} questions; received ${quiz.length}`)
  }
  for (const [index, question] of quiz.entries()) {
    const questionPath = `${path} question ${index + 1}`
    if (!isObject(question)) {
      errors.push(`${questionPath} must be an object`)
      continue
    }
    if (!STABLE_SLUG_ID.test(question.id || '')) {
      errors.push(`${questionPath} needs a stable slug ID`)
    } else if (questionIds.has(question.id)) {
      errors.push(`${questionPath} has a duplicate ID: ${question.id}`)
    } else {
      questionIds.add(question.id)
    }
    if (!isText(question.prompt)) errors.push(`${questionPath} needs a prompt`)
    const options = asArray(question.options)
    if (options.length !== 4) errors.push(`${questionPath} needs exactly four options`)
    if (options.some((option) => !isText(option))) errors.push(`${questionPath} has an empty option`)
    if (!Number.isInteger(question.correctOption) || question.correctOption < 0 || question.correctOption >= options.length) {
      errors.push(`${questionPath} correctOption must point at one of its options`)
    }
    if (!isText(question.explanation)) {
      errors.push(`${questionPath} needs an explanation that teaches, not just a verdict`)
    } else if (countWords(question.explanation) < 6) {
      errors.push(`${questionPath} explanation is too short to teach anything`)
    }
  }
  if (!quiz.some((question) => question?.final)) {
    errors.push(`${path} must flag one question for the module checkpoint`)
  }
}

function validateSource(sourceId, sources, path, errors) {
  if (!sourceId || !sources?.[sourceId]) errors.push(`${path} references a missing source: ${sourceId || '(none)'}`)
}

/**
 * Validates the whole course. Returns human-readable errors; an empty list means
 * the content honours every promise made to the reader.
 */
export function validateCurriculum(lessons, sources, glossary = []) {
  if (!Array.isArray(lessons)) return ['Curriculum lessons must be an array']

  const errors = []
  const lessonIds = new Set()
  const questionIds = new Set()
  const termsById = new Map()
  const stagesSeen = new Set()
  let totalMinutes = 0
  let italianWords = 0

  if (lessons.length !== STABLE_LESSONS.length) {
    errors.push(`Curriculum requires exactly ${STABLE_LESSONS.length} modules; received ${lessons.length}`)
  }

  for (const [index, lesson] of lessons.entries()) {
    const path = `Module ${lesson?.id || index + 1}`
    const expected = STABLE_LESSONS[index]
    if (expected && (lesson?.id !== expected[0] || lesson?.slug !== expected[1])) {
      errors.push(`${path} must keep stable ID and slug ${expected[0]}/${expected[1]}`)
    }
    if (lessonIds.has(lesson?.id)) errors.push(`${path} has a duplicate module ID`)
    lessonIds.add(lesson?.id)

    if (!isLocalized(lesson?.title)) errors.push(`${path} needs a bilingual title`)
    if (!isLocalized(lesson?.summary)) errors.push(`${path} needs a bilingual summary`)
    if (!Number.isInteger(lesson?.moduleNumber) || lesson.moduleNumber !== index + 1) {
      errors.push(`${path} moduleNumber must match its position in the curriculum`)
    }

    const units = asArray(lesson?.units)
    if (units.length !== UNITS_PER_LESSON) {
      errors.push(`${path} must contain exactly ${UNITS_PER_LESSON} units; received ${units.length}`)
    }

    const unitMinutes = units.reduce((sum, unit) => sum + (Number.isFinite(unit?.estimatedMinutes) ? unit.estimatedMinutes : 0), 0)
    if (Number.isFinite(lesson?.durationMinutes) && unitMinutes !== lesson.durationMinutes) {
      errors.push(`${path} durationMinutes must equal the sum of its unit minutes`)
    }
    totalMinutes += unitMinutes
    italianWords += theoryWords(lesson, 'it')

    const unitIds = new Set()
    for (const [unitIndex, unit] of units.entries()) {
      const unitPath = `${path} unit ${unit?.id || unitIndex + 1}`
      if (!isObject(unit)) {
        errors.push(`${unitPath} must be an object`)
        continue
      }
      if (!STABLE_SLUG_ID.test(unit.id || '')) errors.push(`${unitPath} needs a stable slug ID`)
      if (unitIds.has(unit.id)) errors.push(`${unitPath} has a duplicate unit ID`)
      unitIds.add(unit.id)

      if (!isLocalized(unit.title)) errors.push(`${unitPath} needs a bilingual title`)
      if (!isLocalized(unit.objective)) errors.push(`${unitPath} needs a bilingual objective`)
      if (!isLocalized(unit.stageLabel)) errors.push(`${unitPath} must say where the reader is in the seven steps`)
      if (!Number.isInteger(unit.stage) || unit.stage < 1 || unit.stage > 7) {
        errors.push(`${unitPath} stage must be one of the seven steps`)
      } else {
        stagesSeen.add(unit.stage)
      }
      if (!Number.isFinite(unit.estimatedMinutes) || unit.estimatedMinutes < 4 || unit.estimatedMinutes > 10) {
        errors.push(`${unitPath} estimatedMinutes must be between 4 and 10`)
      }

      const theory = asArray(unit.theory)
      if (theory.length < 4) errors.push(`${unitPath} needs at least four theory blocks`)
      for (const [entryIndex, entry] of theory.entries()) {
        const entryPath = `${unitPath} theory block ${entryIndex + 1}`
        if (isNamedList(entry)) {
          const steps = asArray(entry.steps)
          if (steps.length < 3) errors.push(`${entryPath} is a named list, so it needs at least three steps`)
          for (const [stepIndex, step] of steps.entries()) {
            if (!isLocalized(step?.name)) errors.push(`${entryPath} step ${stepIndex + 1} needs a bilingual name`)
            if (!isLocalized(step?.text)) errors.push(`${entryPath} step ${stepIndex + 1} needs bilingual text`)
            if (isLocalized(step?.name) && countWords(step.name.it) > 6) {
              errors.push(`${entryPath} step ${stepIndex + 1} name must stay short enough to remember`)
            }
          }
          continue
        }
        if (!isLocalized(entry)) errors.push(`${entryPath} is not bilingual`)
      }
      const italian = theory.reduce((sum, entry) => sum + theoryEntryWords(entry, 'it'), 0)
      const english = theory.reduce((sum, entry) => sum + theoryEntryWords(entry, 'en'), 0)
      if (italian < 180) errors.push(`${unitPath} Italian theory is too thin: ${italian} words`)
      if (english < italian * 0.75) {
        errors.push(`${unitPath} English theory must contain at least 75% of its Italian word count`)
      }

      const keyPoints = asArray(unit.keyPoints)
      if (keyPoints.length < 3) errors.push(`${unitPath} needs at least three key points`)
      for (const [pointIndex, point] of keyPoints.entries()) {
        if (!isLocalized(point)) errors.push(`${unitPath} key point ${pointIndex + 1} is not bilingual`)
      }

      validateTerminology(asArray(unit.terminology), unitPath, errors, termsById)
      validateExample(unit.example, unitPath, errors)
      validateEnglishBlock(unit.englishBlock, unitPath, errors)
      validateQuiz(asArray(unit.quiz), unitPath, errors, questionIds)

      const sourceIds = asArray(unit.sourceIds)
      if (!sourceIds.length) errors.push(`${unitPath} needs at least one source`)
      sourceIds.forEach((sourceId) => validateSource(sourceId, sources, unitPath, errors))
    }
  }

  if (lessons.length === STABLE_LESSONS.length) {
    for (const stage of [1, 2, 3, 4, 5, 6, 7]) {
      if (!stagesSeen.has(stage)) errors.push(`No unit covers step ${stage} of the seven-step thread`)
    }
    if (totalMinutes < 120 || totalMinutes > 180) {
      errors.push(`Curriculum must last between 120 and 180 minutes; received ${totalMinutes}`)
    }
    // Version 2 is deliberately compact: about two and a half hours of reading.
    // Depth is guarded per unit (at least 180 Italian words of theory each); this
    // floor only catches a module being gutted.
    if (italianWords < 7000) {
      errors.push(`Curriculum Italian theory must contain at least 7000 words; received ${italianWords}`)
    }
  }

  errors.push(...validateGlossaryCoverage(lessons, glossary))
  return errors
}

/**
 * Every term worth looking up must live in the glossary. Terms flagged `plain`
 * are ordinary words a unit explains in passing: they stay in their unit, and
 * keeping them out is what makes the glossary usable.
 */
export function validateGlossaryCoverage(lessons, glossary) {
  if (!Array.isArray(glossary) || !glossary.length) return []
  const errors = []
  const glossaryIds = new Set(glossary.map((entry) => entry?.id))
  for (const term of allTerms(lessons)) {
    if (term?.plain) {
      if (glossaryIds.has(term.id)) errors.push(`Glossary contains a plain word that belongs to its unit only: ${term.id}`)
      continue
    }
    if (term?.id && !glossaryIds.has(term.id)) {
      errors.push(`Glossary is missing a term introduced by the course: ${term.id}`)
    }
  }
  const entryIds = new Set()
  for (const [index, entry] of glossary.entries()) {
    const path = `Glossary entry ${entry?.id || index + 1}`
    if (!STABLE_SLUG_ID.test(entry?.id || '')) errors.push(`${path} needs a stable slug ID`)
    if (entryIds.has(entry?.id)) errors.push(`${path} is duplicated`)
    entryIds.add(entry?.id)
    if (!isText(entry?.term)) errors.push(`${path} needs the term`)
    if (!isText(entry?.italian)) errors.push(`${path} needs the Italian equivalent`)
    if (!isLocalized(entry?.definition)) errors.push(`${path} needs a bilingual definition`)
    if (!isText(entry?.where)) errors.push(`${path} must say where the course explains it`)
  }
  return errors
}

/** The ten interview answers are a deliverable of their own, so they validate separately. */
export function validateInterviewAnswers(answers) {
  const errors = []
  if (!Array.isArray(answers) || answers.length !== 10) {
    errors.push(`The interview page needs exactly ten questions; received ${answers?.length ?? 0}`)
    return errors
  }
  const ids = new Set()
  for (const [index, answer] of answers.entries()) {
    const path = `Interview question ${index + 1}`
    if (!STABLE_SLUG_ID.test(answer?.id || '')) errors.push(`${path} needs a stable slug ID`)
    if (ids.has(answer?.id)) errors.push(`${path} is duplicated`)
    ids.add(answer?.id)
    if (!isLocalized(answer?.prompt)) errors.push(`${path} needs a bilingual prompt`)
    if (!isText(answer?.expectation)) errors.push(`${path} must say what the interviewer wants to hear`)
    if (!isText(answer?.italian)) errors.push(`${path} needs the Italian answer`)
    if (countWords(answer?.italian) < 70) errors.push(`${path} Italian answer is too short to fix the idea`)
    const spoken = asArray(answer?.english)
    if (spoken.length < 3) errors.push(`${path} needs at least three spoken English lines`)
    for (const [lineIndex, line] of spoken.entries()) {
      if (countWords(line) > 40) errors.push(`${path} English line ${lineIndex + 1} is too long to say out loud`)
    }
    if (asArray(answer?.keyPoints).length !== 3) errors.push(`${path} needs exactly three key points`)
    if (!isText(answer?.mistake)) errors.push(`${path} must name the mistake to avoid`)
  }
  if (countWords(answers[0]?.italian) < countWords(answers[1]?.italian) * 1.8) {
    errors.push('The first interview answer must be about twice as long as the others')
  }
  return errors
}

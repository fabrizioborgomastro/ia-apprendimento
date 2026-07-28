export const CONTENT_VERSION = 2

const STABLE_LESSONS = [
  ['digital-transformation', 'digital-transformation'],
  ['ot-it-ai-cloud', 'ot-it-ai-cloud'],
  ['data-ai-use-cases', 'data-ai-use-cases'],
  ['llm-agents', 'llm-agents'],
  ['mvp-governance', 'mvp-governance'],
  ['interview-lab', 'interview-lab']
]

const TIME_BUDGET_KEYS = ['theory', 'cases', 'practice']
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const asArray = (value) => Array.isArray(value) ? value : []

export function localized(it, en) {
  if (!it?.trim()) throw new Error('Italian localization is required')
  if (!en?.trim()) throw new Error('English localization is required')
  return { it, en }
}

export function countWords(value) {
  const text = Array.isArray(value) ? value.join(' ') : String(value || '')
  return text.trim() ? text.trim().split(/\s+/u).length : 0
}

export function lessonPlannedMinutes(lesson) {
  return TIME_BUDGET_KEYS.reduce((sum, key) => sum + (lesson.timeBudget[key] || 0), 0)
}

function collectLocalizedErrors(value, path, errors) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectLocalizedErrors(entry, `${path}[${index}]`, errors))
    return
  }
  if (!isObject(value)) return

  if ('it' in value || 'en' in value) {
    if (typeof value.it !== 'string' || !value.it.trim()) errors.push(`${path} is missing Italian localization`)
    if (typeof value.en !== 'string' || !value.en.trim()) errors.push(`${path} is missing English localization`)
    return
  }

  for (const [key, entry] of Object.entries(value)) collectLocalizedErrors(entry, `${path}.${key}`, errors)
}

function lessonItems(lesson, field) {
  return [
    ...asArray(lesson[field]),
    ...asArray(lesson.units).flatMap((unit) => asArray(unit?.[field]))
  ]
}

function lessonArtifacts(lesson) {
  return [
    ...(lesson.artifact ? [lesson.artifact] : []),
    ...asArray(lesson.professionalArtifacts),
    ...asArray(lesson.units).flatMap((unit) => [
      ...(unit?.artifact ? [unit.artifact] : []),
      ...asArray(unit?.professionalArtifacts)
    ])
  ]
}

function theoryWords(lesson, locale) {
  return asArray(lesson.units).flatMap((unit) => asArray(unit.theory))
    .reduce((total, paragraph) => total + countWords(paragraph?.[locale]), 0)
}

function validateSource(sourceId, sources, path, errors) {
  if (!sourceId || !sources?.[sourceId]) errors.push(`${path} references a missing source: ${sourceId || '(none)'}`)
}

function isLocalized(value) {
  return isObject(value) && typeof value.it === 'string' && value.it.trim() && typeof value.en === 'string' && value.en.trim()
}

function hasLocalizedFields(value, fields) {
  return isObject(value) && fields.every((field) => isLocalized(value[field]))
}

function isMicroExample(value) {
  return hasLocalizedFields(value, ['title', 'explanation'])
}

function isWorkedCase(value) {
  return hasLocalizedFields(value, ['title', 'scenario', 'reasoning', 'decision', 'tradeOff', 'outcome'])
}

function isSolvedActivity(value) {
  const solution = value?.solution || value?.modelSolution
  return isObject(value) && isLocalized(value.prompt) && isLocalized(solution) && asArray(value.rubric).length > 0 && value.rubric.every(isLocalized)
}

function isProfessionalArtifact(value) {
  return hasLocalizedFields(value, ['title', 'description'])
}

function validateCheckpoint(checkpoint, path, errors) {
  if (!checkpoint) {
    errors.push(`${path} is missing a checkpoint`)
    return
  }

  const options = asArray(checkpoint.options)
  if (options.length < 2) errors.push(`${path} needs at least two checkpoint options`)
  for (const [optionIndex, option] of options.entries()) {
    if (!option?.explanation) errors.push(`${path} option explanation missing: ${optionIndex + 1}`)
  }
  if (!Number.isInteger(checkpoint.correctOption) || checkpoint.correctOption < 0 || checkpoint.correctOption >= options.length) {
    errors.push(`${path} has an invalid checkpoint correct option`)
  }
}

export function validateCurriculum(lessons, sources) {
  if (!Array.isArray(lessons)) return ['Curriculum lessons must be an array']

  const errors = []
  const ids = new Set()
  let totalMinutes = 0
  let practicalMinutes = 0
  let italianWords = 0

  if (lessons.length !== STABLE_LESSONS.length) {
    errors.push(`Curriculum requires exactly ${STABLE_LESSONS.length} lessons; received ${lessons.length}`)
  }

  for (const [index, lesson] of lessons.entries()) {
    const path = `Lesson ${lesson.id || index + 1}`
    const expected = STABLE_LESSONS[index]
    if (expected && (lesson.id !== expected[0] || lesson.slug !== expected[1])) {
      errors.push(`${path} must keep stable ID and slug ${expected[0]}/${expected[1]}`)
    }
    if (ids.has(lesson.id)) errors.push(`${path} has a duplicate lesson ID`)
    ids.add(lesson.id)

    const timeBudget = lesson.timeBudget
    if (!isObject(timeBudget) || TIME_BUDGET_KEYS.some((key) => !Number.isFinite(timeBudget[key]) || timeBudget[key] < 0)) {
      errors.push(`${path} must define non-negative theory, cases and practice minutes`)
    } else {
      const unknownTimeBudgetKeys = Object.keys(timeBudget).filter((key) => !TIME_BUDGET_KEYS.includes(key))
      if (unknownTimeBudgetKeys.length) errors.push(`${path} has unknown time budget fields: ${unknownTimeBudgetKeys.join(', ')}`)
      const plannedMinutes = lessonPlannedMinutes(lesson)
      totalMinutes += plannedMinutes
      practicalMinutes += timeBudget.cases + timeBudget.practice
      if (lesson.durationMinutes !== plannedMinutes) {
        errors.push(`${path} durationMinutes must equal its planned minutes`)
      }
    }

    const units = asArray(lesson.units)
    if (units.length < 6 || units.length > 9) errors.push(`${path} must contain six to nine learning units`)
    const unitMinutes = units.reduce((sum, unit) => sum + (Number.isFinite(unit.estimatedMinutes) ? unit.estimatedMinutes : 0), 0)
    if (units.length && Number.isFinite(lesson.durationMinutes) && unitMinutes !== lesson.durationMinutes) {
      errors.push(`${path} unit minutes must equal durationMinutes`)
    }

    collectLocalizedErrors(lesson, path, errors)
    const italianLessonWords = theoryWords(lesson, 'it')
    const englishLessonWords = theoryWords(lesson, 'en')
    italianWords += italianLessonWords
    if (englishLessonWords < italianLessonWords * 0.85) {
      errors.push(`${path} English theory must contain at least 85% of its Italian word count`)
    }

    const workedCases = lessonItems(lesson, 'workedCases').filter(isWorkedCase)
    if (workedCases.length < 2) errors.push(`${path} needs at least two valid worked cases`)
    for (const [caseIndex, workedCase] of workedCases.entries()) {
      if (workedCase?.pmiCase && (!workedCase.hypothetical || !workedCase.publicContext)) {
        errors.push(`${path} worked case ${caseIndex + 1} must be hypothetical and use public context`)
      }
    }

    const microExamples = lessonItems(lesson, 'microExamples').filter(isMicroExample)
    if (microExamples.length < 4) errors.push(`${path} needs at least four valid micro-examples`)
    if (lessonItems(lesson, 'activities').filter(isSolvedActivity).length < 2) {
      errors.push(`${path} needs at least two solved activities with rubrics`)
    }
    if (!lessonArtifacts(lesson).some(isProfessionalArtifact)) errors.push(`${path} needs one valid professional artifact`)

    const answers = asArray(lesson.interviewAnswers).length ? lesson.interviewAnswers : [lesson.interview]
    if (!answers.some((answer) => typeof answer?.short === 'string' && answer.short.trim() && typeof answer?.long === 'string' && answer.long.trim())) {
      errors.push(`${path} needs short and extended English interview answers`)
    }

    for (const [unitIndex, unit] of units.entries()) {
      const unitPath = `${path} unit ${unit.id || unitIndex + 1}`
      validateCheckpoint(unit.checkpoint, unitPath, errors)
      const sourceIds = asArray(unit.sourceIds)
      if (!sourceIds.length) errors.push(`${unitPath} needs at least one source`)
      sourceIds.forEach((sourceId) => validateSource(sourceId, sources, unitPath, errors))
    }
  }

  if (totalMinutes !== 420) errors.push(`Curriculum planned duration must equal 420 minutes; received ${totalMinutes}`)
  if (practicalMinutes !== 231) errors.push(`Curriculum cases and practice must equal 231 minutes; received ${practicalMinutes}`)
  if (italianWords < 34000) errors.push(`Curriculum Italian theory must contain at least 34000 words; received ${italianWords}`)

  for (const [sourceId, source] of Object.entries(sources || {})) {
    if (source?.type === 'educational') {
      const verifiedAgainst = asArray(source.verifiedAgainst)
      if (!verifiedAgainst.length) {
        errors.push(`Educational source ${sourceId} must identify verified primary sources`)
      }
      for (const primarySourceId of verifiedAgainst) {
        if (sources[primarySourceId]?.type !== 'primary') {
          errors.push(`Educational source ${sourceId} must reference a verified primary source: ${primarySourceId}`)
        }
      }
    }
  }

  return errors
}

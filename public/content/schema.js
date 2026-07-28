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

function isProfessionalAnswer(value) {
  return isObject(value) &&
    isLocalized(value.prompt) &&
    isLocalized(value.short) &&
    isLocalized(value.long) &&
    Array.isArray(value.followUps) &&
    value.followUps.length > 0 &&
    value.followUps.every(isLocalized)
}

function isProfessionalArtifact(value) {
  return hasLocalizedFields(value, ['title', 'description'])
}

const hasNonEmptyString = (value) => typeof value === 'string' && Boolean(value.trim())
const isPositiveInteger = (value) => Number.isSafeInteger(value) && value > 0
const isPositiveNumber = (value) => Number.isFinite(value) && value > 0

function validateSensorToDecisionArtifact(artifact, path, errors) {
  if (!isObject(artifact)) {
    errors.push(`${path} must be an object`)
    return
  }
  if (!hasLocalizedFields(artifact, ['title', 'description'])) {
    errors.push(`${path} needs localized title and description`)
  }

  const edges = asArray(artifact.edges)
  if (!edges.length) errors.push(`${path} needs at least one edge`)
  const edgeIds = new Set()
  let latencyTotal = 0
  const localizedFields = [
    'source',
    'destination',
    'interface',
    'cadence',
    'securityBoundaryCrossing',
    'dataOwner',
    'fallback',
    'humanAction'
  ]
  for (const [index, edge] of edges.entries()) {
    const edgePath = `${path} edge ${index + 1}`
    if (!isObject(edge)) {
      errors.push(`${edgePath} must be an object`)
      continue
    }
    if (!hasNonEmptyString(edge.id) || edgeIds.has(edge.id)) {
      errors.push(`${edgePath} needs a unique non-empty ID`)
    } else {
      edgeIds.add(edge.id)
    }
    if (edge.order !== index + 1) errors.push(`${edgePath} order must be contiguous from 1`)
    for (const field of localizedFields) {
      if (!isLocalized(edge[field])) errors.push(`${edgePath} needs localized ${field}`)
    }
    if (!isPositiveInteger(edge.latencyBudgetMs)) {
      errors.push(`${edgePath} latencyBudgetMs must be a positive safe integer`)
    } else {
      latencyTotal += edge.latencyBudgetMs
    }
  }
  if (!isPositiveInteger(artifact.totalLatencyBudgetMs)) {
    errors.push(`${path} totalLatencyBudgetMs must be a positive safe integer`)
  } else if (artifact.totalLatencyBudgetMs !== latencyTotal) {
    errors.push(`${path} totalLatencyBudgetMs must equal the sum of edge latency budgets`)
  }
}

function validateConduitSolution(solution, path, errors) {
  const conduits = asArray(solution.conduits)
  if (conduits.length < 3) errors.push(`${path} needs at least three rows`)
  const conduitIds = new Set()
  const localizedFields = [
    'source',
    'destination',
    'interface',
    'dataOwner',
    'securityBoundaryCrossing',
    'monitoring',
    'degradedBehavior',
    'fallback',
    'humanAction'
  ]
  for (const [index, conduit] of conduits.entries()) {
    const conduitPath = `${path} row ${index + 1}`
    if (!isObject(conduit)) {
      errors.push(`${conduitPath} must be an object`)
      continue
    }
    if (!hasNonEmptyString(conduit.id) || conduitIds.has(conduit.id)) {
      errors.push(`${conduitPath} needs a unique non-empty ID`)
    } else {
      conduitIds.add(conduit.id)
    }
    for (const field of localizedFields) {
      if (!isLocalized(conduit[field])) errors.push(`${conduitPath} needs localized ${field}`)
    }
    if (!isPositiveInteger(conduit.latencyBudgetMs)) {
      errors.push(`${conduitPath} latencyBudgetMs must be a positive safe integer`)
    }
  }

  const capacity = solution.capacityCalculation
  const capacityPath = `${path} capacity calculation`
  if (!isObject(capacity)) {
    errors.push(`${capacityPath} is required`)
    return
  }
  for (const field of ['tagCount', 'bytesPerSample', 'samplesPerSecond', 'bufferSeconds']) {
    if (!isPositiveNumber(capacity[field])) errors.push(`${capacityPath} ${field} must be positive`)
  }
  for (const field of ['requiredBytes', 'requiredGigabytes', 'provisionedGigabytes']) {
    if (!isPositiveNumber(capacity[field])) errors.push(`${capacityPath} ${field} must be positive`)
  }
  if (!Number.isFinite(capacity.marginFactor) || capacity.marginFactor < 1) {
    errors.push(`${capacityPath} marginFactor must be at least 1`)
  }
  if (!isLocalized(capacity.formula)) errors.push(`${capacityPath} needs a localized formula`)

  const computedBytes = capacity.tagCount * capacity.bytesPerSample * capacity.samplesPerSecond * capacity.bufferSeconds
  if (Number.isFinite(computedBytes) && capacity.requiredBytes !== computedBytes) {
    errors.push(`${capacityPath} requiredBytes must match the declared inputs`)
  }
  const computedGigabytes = capacity.requiredBytes / 1_000_000_000
  if (Number.isFinite(computedGigabytes) && Math.abs(capacity.requiredGigabytes - computedGigabytes) > 1e-9) {
    errors.push(`${capacityPath} requiredGigabytes must use decimal gigabytes`)
  }
  const minimumProvisioned = capacity.requiredGigabytes * capacity.marginFactor
  if (Number.isFinite(minimumProvisioned) && capacity.provisionedGigabytes < minimumProvisioned) {
    errors.push(`${capacityPath} provisionedGigabytes must cover required capacity and margin`)
  }
}

function isGenealogyArtifact(value) {
  return isObject(value) && [
    'inputLots',
    'outputLots',
    'reconstructionSteps',
    'failureHandling',
    'scopeCalculation',
    'eventExceptions'
  ].some((field) => field in value)
}

function validateGenealogyArtifact(artifact, workedCase, path, errors) {
  if (!isObject(artifact)) {
    errors.push(`${path} must be an object`)
    return
  }

  const validateLots = (lots, role) => {
    if (!lots.length) errors.push(`${path} needs at least one ${role} lot node`)
    const ids = new Set()
    for (const [index, lot] of lots.entries()) {
      const lotPath = `${path} ${role} lot ${index + 1}`
      if (!isObject(lot) || !hasNonEmptyString(lot.id) || ids.has(lot.id)) {
        errors.push(`${lotPath} needs a unique non-empty ID`)
      } else {
        ids.add(lot.id)
      }
      if (!isPositiveNumber(lot?.units)) errors.push(`${lotPath} units must be positive`)
      if (!isLocalized(lot?.evidence)) errors.push(`${lotPath} needs localized evidence`)
    }
  }
  validateLots(asArray(artifact.inputLots), 'input')
  validateLots(asArray(artifact.outputLots), 'output')

  const edges = asArray(artifact.edges)
  if (!edges.length) errors.push(`${path} needs at least one edge`)
  const edgeIds = new Set()
  for (const [index, edge] of edges.entries()) {
    const edgePath = `${path} edge ${index + 1}`
    if (!isObject(edge)) {
      errors.push(`${edgePath} must be an object`)
      continue
    }
    if (!hasNonEmptyString(edge.id) || edgeIds.has(edge.id)) {
      errors.push(`${edgePath} needs a unique non-empty ID`)
    } else {
      edgeIds.add(edge.id)
    }
    if (!hasNonEmptyString(edge.from) || !hasNonEmptyString(edge.to) || edge.from === edge.to) {
      errors.push(`${edgePath} needs distinct non-empty from and to nodes`)
    }
    if (!isPositiveNumber(edge.units)) errors.push(`${edgePath} units must be positive`)
    if (!isLocalized(edge.operation)) errors.push(`${edgePath} needs a localized operation`)
    if (!isLocalized(edge.evidence)) errors.push(`${edgePath} needs localized evidence`)
  }

  for (const [field, label] of [
    ['reconstructionSteps', 'reconstruction steps'],
    ['evidence', 'evidence records'],
    ['failureHandling', 'failure-handling rules']
  ]) {
    const values = asArray(artifact[field])
    if (!values.length || !values.every(isLocalized)) errors.push(`${path} needs localized ${label}`)
  }
  const followUps = asArray(workedCase.followUps)
  if (!followUps.length || !followUps.every(isLocalized)) errors.push(`${path} needs localized follow-up questions`)

  for (const [index, exception] of asArray(artifact.eventExceptions).entries()) {
    const exceptionPath = `${path} event exception ${index + 1}`
    if (!hasNonEmptyString(exception?.id) || !hasNonEmptyString(exception?.status)) {
      errors.push(`${exceptionPath} needs an ID and status`)
    }
    if (!isLocalized(exception?.handling) || !isLocalized(exception?.evidence)) {
      errors.push(`${exceptionPath} needs localized handling and evidence`)
    }
  }

  const scope = artifact.scopeCalculation
  if (!isObject(scope)) {
    errors.push(`${path} needs a scope calculation`)
    return
  }
  for (const field of ['affectedInputUnits', 'affectedOutputUnits', 'scrapAndLossUnits', 'initialHoldUnits']) {
    if (!isPositiveNumber(scope[field])) errors.push(`${path} scope ${field} must be positive`)
  }
  for (const field of ['outputYieldPercent', 'scopeReductionPercent']) {
    if (!Number.isFinite(scope[field]) || scope[field] < 0 || scope[field] > 100) {
      errors.push(`${path} scope ${field} must be between 0 and 100`)
    }
  }
  if (!isLocalized(scope.formula)) errors.push(`${path} scope needs a localized formula`)
  if (scope.affectedOutputUnits + scope.scrapAndLossUnits !== scope.affectedInputUnits) {
    errors.push(`${path} scope output and loss must reconcile to affected input`)
  }
  const expectedYield = Math.round((scope.affectedOutputUnits / scope.affectedInputUnits) * 10_000) / 100
  if (Number.isFinite(expectedYield) && scope.outputYieldPercent !== expectedYield) {
    errors.push(`${path} scope outputYieldPercent must match affected units`)
  }
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

    const allocatedMinutes = { theory: 0, cases: 0, practice: 0 }
    for (const [unitIndex, unit] of units.entries()) {
      const unitPath = `${path} unit ${unit.id || unitIndex + 1}`
      if (!Number.isFinite(unit.estimatedMinutes) || unit.estimatedMinutes < 5 || unit.estimatedMinutes > 10) {
        errors.push(`${unitPath} estimatedMinutes must be between 5 and 10`)
      }
      const allocation = unit.timeAllocation
      if (!isObject(allocation) || TIME_BUDGET_KEYS.some((key) => !Number.isFinite(allocation[key]) || allocation[key] < 0)) {
        errors.push(`${unitPath} must allocate non-negative theory, cases and practice minutes`)
        continue
      }
      const unknownKeys = Object.keys(allocation).filter((key) => !TIME_BUDGET_KEYS.includes(key))
      if (unknownKeys.length) errors.push(`${unitPath} has unknown time allocation fields: ${unknownKeys.join(', ')}`)
      const allocationTotal = TIME_BUDGET_KEYS.reduce((sum, key) => sum + allocation[key], 0)
      if (allocationTotal !== unit.estimatedMinutes) {
        errors.push(`${unitPath} time allocation must equal estimatedMinutes`)
      }
      for (const key of TIME_BUDGET_KEYS) allocatedMinutes[key] += allocation[key]
    }
    if (isObject(timeBudget)) {
      for (const key of TIME_BUDGET_KEYS) {
        if (allocatedMinutes[key] !== timeBudget[key]) {
          errors.push(`${path} unit ${key} allocation must equal its time budget`)
        }
      }
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
    if (!answers.length || !answers.every(isProfessionalAnswer)) {
      errors.push(`${path} needs fully localized professional interview answers`)
    }

    if ('sensorToDecisionArtifact' in lesson) {
      validateSensorToDecisionArtifact(
        lesson.sensorToDecisionArtifact,
        `${path} sensor-to-decision artifact`,
        errors
      )
    }

    for (const [unitIndex, unit] of units.entries()) {
      const unitPath = `${path} unit ${unit.id || unitIndex + 1}`
      for (const [activityIndex, activity] of asArray(unit.activities).entries()) {
        const solution = activity?.solutionArtifact
        if (isObject(solution) && ('conduits' in solution || 'capacityCalculation' in solution)) {
          validateConduitSolution(solution, `${unitPath} activity ${activityIndex + 1} conduit solution`, errors)
        }
      }
      for (const [caseIndex, workedCase] of asArray(unit.workedCases).entries()) {
        if (isObject(workedCase) && isGenealogyArtifact(workedCase.caseArtifact)) {
          validateGenealogyArtifact(
            workedCase.caseArtifact,
            workedCase,
            `${unitPath} worked case ${caseIndex + 1} genealogy artifact`,
            errors
          )
        }
      }
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

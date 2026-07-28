import test from 'node:test'
import assert from 'node:assert/strict'
import { countWords, validateCurriculum } from '../public/content/schema.js'
import { digitalTransformationLesson } from '../public/content/module-1-transformation.js'
import { architectureLesson } from '../public/content/module-2-architecture.js'
import { sources } from '../public/content/sources.js'

export function theoryWords(lesson, locale) {
  return lesson.units
    .flatMap((unit) => unit.theory || [])
    .reduce((total, paragraph) => total + countWords(paragraph[locale]), 0)
}

export function countWorkedCases(lesson) {
  return [
    ...(lesson.workedCases || []),
    ...lesson.units.flatMap((unit) => unit.workedCases || [])
  ].length
}

const ignoredPartialCurriculumErrors = [
  'Curriculum requires exactly 6 lessons',
  'Curriculum planned duration must equal 420 minutes',
  'Curriculum cases and practice must equal 231 minutes',
  'Curriculum Italian theory must contain at least 34000 words'
]

function lessonLocalErrors(lessons) {
  return validateCurriculum(lessons, sources)
    .filter((error) => !ignoredPartialCurriculumErrors.some((prefix) => error.startsWith(prefix)))
}

const missingItalianElision = /(?:^|[\s"'([{])(?:[Ll]|[Aa]ll|[Dd]all|[DdNn]ell|[Ss]ull)\s+(?=[AEHIOUÀÈÉÌÒÓÙaehiouàèéìòóù])/u

test('Module 1 has the approved time, depth and practical portfolio', () => {
  assert.equal(digitalTransformationLesson.durationMinutes, 50)
  assert.deepEqual(digitalTransformationLesson.timeBudget, { theory: 25, cases: 15, practice: 10 })
  assert.equal(digitalTransformationLesson.units.length, 6)
  assert.ok(theoryWords(digitalTransformationLesson, 'it') >= 4500)
  assert.ok(theoryWords(digitalTransformationLesson, 'en') >= 3825)
  assert.ok(countWorkedCases(digitalTransformationLesson) >= 2)
})

test('Module 1 keeps the six approved unit boundaries and exact minute allocation', () => {
  assert.deepEqual(
    digitalTransformationLesson.units.map(({ title, estimatedMinutes }) => ({
      title: title.en,
      estimatedMinutes
    })),
    [
      { title: 'Digitization, digitalization, and transformation', estimatedMinutes: 8 },
      { title: 'Industry 4.0 and Industry 5.0 in a regulated manufacturer', estimatedMinutes: 8 },
      { title: 'From operational loss to KPI tree, baseline, target, and guardrail', estimatedMinutes: 8 },
      { title: 'Gemba-based process discovery and stakeholder mapping', estimatedMinutes: 8 },
      { title: 'Automation opportunity scoring and portfolio prioritization', estimatedMinutes: 9 },
      { title: 'Worked PMI-style case: selecting a downtime-reduction opportunity', estimatedMinutes: 9 }
    ]
  )
  assert.equal(
    digitalTransformationLesson.units.reduce((total, unit) => total + unit.estimatedMinutes, 0),
    50
  )
})

test('Module 1 passes every lesson-local schema rule against the real source catalog', () => {
  assert.deepEqual(lessonLocalErrors([digitalTransformationLesson]), [])
})

test('Module 1 resolves topic-specific sources for terminology, measurement, gemba and stakeholders', () => {
  const referencedIds = new Set(digitalTransformationLesson.units.flatMap((unit) => unit.sourceIds))
  const topicSources = [
    'oecd-digital-transformation-definitions',
    'nist-manufacturing-kpi-procedure',
    'nist-manufacturing-kpi-hierarchy',
    'nist-manufacturing-performance-baselines',
    'doe-manufacturing-baseline-normalization',
    'toyota-way-genchi-genbutsu',
    'lean-enterprise-gemba',
    'uk-government-stakeholder-mapping',
    'ahrq-raci-chart'
  ]

  for (const sourceId of topicSources) {
    assert.ok(referencedIds.has(sourceId), `Module 1 must cite ${sourceId}`)
    assert.ok(sources[sourceId], `Source catalog must resolve ${sourceId}`)
  }
})

test('Module 1 automation matrix is reproducible and derives ranking after hard gates', () => {
  const matrix = digitalTransformationLesson.units[4].decisionMatrix
  const expectedCriteria = [
    ['businessValue', 15],
    ['frequencyEffort', 10],
    ['processStability', 10],
    ['dataReadiness', 10],
    ['integrationFeasibility', 10],
    ['riskReversibility', 15],
    ['regulatoryQuality', 10],
    ['humanJudgment', 10],
    ['adoption', 5],
    ['timeToValue', 5]
  ]
  const expectedCandidates = [
    ['maintenance-work-order', 85],
    ['quality-deviation-triage', 61],
    ['production-reporting', 84],
    ['controlled-sop-search', 69],
    ['autonomous-product-release', 46]
  ]
  const confidenceLevels = new Set(['low', 'medium', 'high'])

  assert.deepEqual(matrix.criteria.map(({ id, weight }) => [id, weight]), expectedCriteria)
  assert.deepEqual(matrix.candidates.map(({ id, weightedScore }) => [id, weightedScore]), expectedCandidates)
  assert.deepEqual(matrix.hardGates.map(({ id }) => id), [
    'no-autonomous-product-disposition',
    'meaningful-qualified-human-judgment'
  ])

  for (const candidate of matrix.candidates) {
    assert.deepEqual(Object.keys(candidate.assessments), expectedCriteria.map(([criterionId]) => criterionId))
    for (const [criterionId] of expectedCriteria) {
      const assessment = candidate.assessments[criterionId]
      assert.ok(Number.isInteger(assessment.score) && assessment.score >= 1 && assessment.score <= 5)
      assert.ok(confidenceLevels.has(assessment.confidence))
      assert.ok(assessment.evidence.it && assessment.evidence.en)
      assert.ok(assessment.rationale.it && assessment.rationale.en)
    }

    const recomputed = expectedCriteria.reduce(
      (total, [criterionId, weight]) => total + weight * candidate.assessments[criterionId].score,
      0
    ) / 5
    assert.equal(candidate.weightedScore, recomputed)
    assert.deepEqual(
      candidate.hardGateChecks.map(({ gateId }) => gateId),
      matrix.hardGates.map(({ id }) => id)
    )
    for (const gateCheck of candidate.hardGateChecks) {
      assert.ok(gateCheck.evidence.it && gateCheck.evidence.en)
      assert.ok(gateCheck.rationale.it && gateCheck.rationale.en)
    }
  }

  const eligibleCandidates = matrix.candidates.filter(({ portfolioDecision }) => portfolioDecision !== 'rejected')
  const highestEligibleScore = Math.max(...eligibleCandidates.map(({ weightedScore }) => weightedScore))
  const selectedCandidate = matrix.candidates.find(({ portfolioDecision }) => portfolioDecision === 'selected')
  const autonomousRelease = matrix.candidates.find(({ id }) => id === 'autonomous-product-release')

  assert.equal(matrix.recommendedCandidateId, 'maintenance-work-order')
  assert.equal(selectedCandidate.id, matrix.recommendedCandidateId)
  assert.equal(selectedCandidate.weightedScore, highestEligibleScore)
  assert.equal(autonomousRelease.portfolioDecision, 'rejected')
  assert.ok(autonomousRelease.hardGateChecks.every(({ passed }) => passed === false))
  assert.match(autonomousRelease.recommendation.en, /reject.*human judgment/i)
})

test('Module 1 solved activities contain assessable solutions and the gemba solution satisfies its rubric', () => {
  const activities = digitalTransformationLesson.units.flatMap((unit) => unit.activities || [])
  assert.ok(activities.length >= 2)
  for (const activity of activities) {
    assert.ok(activity.prompt.it && activity.prompt.en)
    assert.ok(activity.modelSolution.it && activity.modelSolution.en)
    assert.ok(activity.rubric.length > 0)
    assert.ok(activity.rubric.every((criterion) => criterion.it && criterion.en))
  }

  const gembaActivity = digitalTransformationLesson.units[3].activities[0]
  assert.ok(gembaActivity.solutionArtifact.exceptions.length >= 2)
  assert.ok(gembaActivity.solutionArtifact.exceptions.every((exception) => (
    exception.condition.it && exception.condition.en &&
    exception.response.it && exception.response.en &&
    exception.owner.it && exception.owner.en
  )))
  assert.ok(gembaActivity.solutionArtifact.decisions.length >= 3)
  assert.ok(gembaActivity.solutionArtifact.decisions.every((decision) => (
    decision.inputs.length >= 2 &&
    decision.inputs.every((input) => input.it && input.en) &&
    decision.owner.it && decision.owner.en
  )))
  assert.deepEqual(
    gembaActivity.solutionArtifact.stakeholders.map(({ role, outcome, risk }) => [
      role.en,
      outcome.en,
      risk.en
    ]),
    [
      ['Operations', 'Stable continuity', 'Late or unusable alerts'],
      ['Maintenance', 'Complete and timely diagnosis', 'Backlog or incorrect priority'],
      ['Quality', 'Traceability and product control', 'Improper classification'],
      ['OT', 'Availability and safe boundaries', 'Uncontrolled access'],
      ['IT', 'Maintainable integration', 'Divergent records']
    ]
  )
})

test('Module 1 contains all required interview prompts with short and extended answers', () => {
  assert.deepEqual(digitalTransformationLesson.interviewAnswers.map(({ prompt }) => prompt.en), [
    'How do you decide which processes to automate?',
    'Can you give me an example of applying digital transformation in manufacturing?',
    'How do you distinguish a technology project from transformation?'
  ])
  for (const answer of digitalTransformationLesson.interviewAnswers) {
    for (const field of ['prompt', 'short', 'long']) {
      assert.ok(answer[field].it && answer[field].en)
    }
    assert.ok(countWords(answer.short.it) >= 50)
    assert.ok(countWords(answer.short.en) >= 50)
    assert.ok(countWords(answer.long.it) >= 180)
    assert.ok(countWords(answer.long.en) >= 180)
    assert.ok(answer.followUps.length >= 1)
    assert.ok(answer.followUps.every((followUp) => followUp.it && followUp.en))
  }
})

test('Module 2 has the approved time, depth and practical portfolio', () => {
  assert.ok(architectureLesson, 'Module 2 content must exist')
  assert.equal(architectureLesson.id, 'ot-it-ai-cloud')
  assert.equal(architectureLesson.durationMinutes, 75)
  assert.deepEqual(architectureLesson.timeBudget, { theory: 38, cases: 22, practice: 15 })
  assert.equal(architectureLesson.units.length, 8)
  assert.ok(theoryWords(architectureLesson, 'it') >= 6840)
  assert.ok(theoryWords(architectureLesson, 'en') >= 5814)
  assert.equal(countWorkedCases(architectureLesson), 2)
  assert.equal(architectureLesson.units.flatMap((unit) => unit.activities || []).length, 2)

  const referencedIds = new Set(architectureLesson.units.flatMap((unit) => unit.sourceIds))
  assert.ok(referencedIds.has('isa-95'))
  assert.ok(referencedIds.has('opc-ua-part-1'))
  assert.ok(referencedIds.has('nist-sp-800-82-r3'))
})

test('Module 2 keeps the eight approved unit boundaries and reconciles every minute by learning mode', () => {
  assert.ok(architectureLesson, 'Module 2 content must exist')
  assert.deepEqual(
    architectureLesson.units.map(({ title, estimatedMinutes }) => ({
      title: title.en,
      estimatedMinutes
    })),
    [
      { title: 'Physical process, sensors, actuators, signals, and sampling', estimatedMinutes: 9 },
      { title: 'PLC, DCS, HMI, SCADA, alarms, and control-loop constraints', estimatedMinutes: 9 },
      { title: 'Historian, timestamps, event context, and time-series quality', estimatedMinutes: 9 },
      { title: 'MES/MOM responsibilities and production genealogy', estimatedMinutes: 9 },
      { title: 'ERP, planning, logistics, and the MES/ERP boundary', estimatedMinutes: 9 },
      { title: 'ISA-95, Purdue, zones, conduits, and the industrial DMZ', estimatedMinutes: 10 },
      { title: 'Edge, cloud, data platforms, APIs, event streaming, and AI serving', estimatedMinutes: 10 },
      { title: 'Worked case: sensor-to-human-decision architecture and failure modes', estimatedMinutes: 10 }
    ]
  )
  const totals = { theory: 0, cases: 0, practice: 0 }
  for (const unit of architectureLesson.units) {
    assert.ok(unit.estimatedMinutes >= 5 && unit.estimatedMinutes <= 10)
    assert.deepEqual(Object.keys(unit.timeAllocation), ['theory', 'cases', 'practice'])
    assert.equal(Object.values(unit.timeAllocation).reduce((sum, minutes) => sum + minutes, 0), unit.estimatedMinutes)
    for (const mode of Object.keys(totals)) totals[mode] += unit.timeAllocation[mode]
  }
  assert.deepEqual(totals, architectureLesson.timeBudget)
  assert.equal(architectureLesson.units.reduce((total, unit) => total + unit.estimatedMinutes, 0), 75)
})

test('Module 2 artifact defines nine ordered source-to-destination edges with recomputable latency', () => {
  assert.ok(architectureLesson, 'Module 2 content must exist')
  const artifact = architectureLesson.sensorToDecisionArtifact
  assert.ok(artifact)
  assert.deepEqual(artifact.edges.map(({ id, order }) => [id, order]), [
    ['sensor-to-acquisition', 1],
    ['acquisition-to-edge-feature', 2],
    ['edge-feature-to-opcua', 3],
    ['opcua-to-historian', 4],
    ['historian-to-dmz', 5],
    ['dmz-to-event-broker', 6],
    ['event-broker-to-ai-serving', 7],
    ['ai-serving-to-decision-workflow', 8],
    ['decision-workflow-to-reliability-engineer', 9]
  ])

  for (const edge of artifact.edges) {
    for (const field of [
      'source',
      'destination',
      'interface',
      'cadence',
      'dataOwner',
      'securityBoundaryCrossing',
      'fallback',
      'humanAction'
    ]) {
      assert.ok(edge[field]?.it && edge[field]?.en, `${edge.id} must localize ${field}`)
    }
    assert.ok(Number.isInteger(edge.latencyBudgetMs) && edge.latencyBudgetMs > 0)
  }
  assert.equal(artifact.totalLatencyBudgetMs, 57000)
  assert.equal(
    artifact.edges.reduce((total, edge) => total + edge.latencyBudgetMs, 0),
    artifact.totalLatencyBudgetMs
  )
})

test('Module 2 trains the four architecture interview distinctions with natural timed answers', () => {
  assert.ok(architectureLesson, 'Module 2 content must exist')
  assert.deepEqual(architectureLesson.interviewAnswers.map(({ prompt }) => prompt.en), [
    'How do OT and IT differ?',
    'How do MES and SCADA differ?',
    'When would you choose edge rather than cloud?',
    'Why must an AI model not directly close a safety-critical control loop?'
  ])
  for (const answer of architectureLesson.interviewAnswers) {
    for (const field of ['prompt', 'short', 'long']) {
      assert.ok(answer[field].it && answer[field].en)
    }
    assert.ok(countWords(answer.short.it) >= 50)
    assert.ok(countWords(answer.short.en) >= 50)
    assert.ok(countWords(answer.short.en) <= 90)
    assert.ok(countWords(answer.long.it) >= 180)
    assert.ok(countWords(answer.long.en) >= 180)
    assert.ok(countWords(answer.long.en) <= 340)
    assert.ok(answer.followUps.length >= 1)
    assert.ok(answer.followUps.every((followUp) => followUp.it && followUp.en))
  }
})

test('Module 2 and its Module 1 dependency pass real lesson-local schema validation together', () => {
  assert.deepEqual(lessonLocalErrors([digitalTransformationLesson, architectureLesson]), [])
})

test('validator rejects a declared sensor-to-decision artifact with no edges', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.sensorToDecisionArtifact.edges = []
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('sensor-to-decision artifact needs at least one edge'))
  )
})

test('validator rejects a disconnected sensor-to-decision path', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.sensorToDecisionArtifact.edges[1].sourceId = 'unrelated-acquisition'
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('sourceId must equal the previous edge destinationId'))
  )
})

test('validator rejects an unstable sensor edge ID', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.sensorToDecisionArtifact.edges[0].id = 'Sensor Edge 1'
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('needs a stable unique ID'))
  )
})

test('validator rejects duplicate sensor edge IDs', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.sensorToDecisionArtifact.edges[1].id = lesson.sensorToDecisionArtifact.edges[0].id
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('needs a stable unique ID'))
  )
})

test('validator rejects a sensor edge missing a required interface', () => {
  const lesson = structuredClone(architectureLesson)
  delete lesson.sensorToDecisionArtifact.edges[0].interface
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('needs localized interface'))
  )
})

test('validator rejects a declared conduit solution with no conduit rows', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.units[5].activities[0].solutionArtifact.conduits = []
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('conduit solution needs at least three rows'))
  )
})

test('validator rejects a conduit row missing degraded behavior', () => {
  const lesson = structuredClone(architectureLesson)
  delete lesson.units[5].activities[0].solutionArtifact.conduits[0].degradedBehavior
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('needs localized degradedBehavior'))
  )
})

test('validator rejects a declared genealogy artifact with no graph edges', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.units[3].workedCases[0].caseArtifact.edges = []
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('genealogy artifact needs at least one edge'))
  )
})

test('validator rejects a genealogy edge that references an undeclared node', () => {
  const lesson = structuredClone(architectureLesson)
  lesson.units[3].workedCases[0].caseArtifact.edges[0].from = 'UNKNOWN'
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('references undeclared from node UNKNOWN'))
  )
})

test('validator rejects genealogy inputs and outputs disconnected from each other', () => {
  const lesson = structuredClone(architectureLesson)
  const artifact = lesson.units[3].workedCases[0].caseArtifact
  artifact.nodes = [...(artifact.nodes || []), { id: 'ORPHAN-LOT', kind: 'intermediate-lot' }]
  artifact.edges[0].from = 'ORPHAN-LOT'
  const errors = lessonLocalErrors([digitalTransformationLesson, lesson])
  assert.ok(errors.some((error) => error.includes('input lot COMP-A17 must connect to an output lot')))
  assert.ok(errors.some((error) => error.includes('output lot FG-701 must be reachable from an input lot')))
})

test('validator rejects a genealogy edge missing required evidence', () => {
  const lesson = structuredClone(architectureLesson)
  delete lesson.units[3].workedCases[0].caseArtifact.edges[0].evidence
  assert.ok(
    lessonLocalErrors([digitalTransformationLesson, lesson])
      .some((error) => error.includes('needs localized evidence'))
  )
})

test('Module 2 conduit solution answers every requested field with capacity and degraded operation', () => {
  const activity = architectureLesson.units[5].activities[0]
  const solution = activity.solutionArtifact
  assert.deepEqual(solution.conduits.map(({ id }) => id), [
    'plc-to-scada',
    'historian-to-dmz',
    'dmz-to-enterprise-broker'
  ])
  for (const conduit of solution.conduits) {
    for (const field of [
      'source',
      'destination',
      'interface',
      'dataOwner',
      'securityBoundaryCrossing',
      'monitoring',
      'degradedBehavior',
      'fallback',
      'humanAction'
    ]) assert.ok(conduit[field].it && conduit[field].en)
    assert.ok(Number.isInteger(conduit.latencyBudgetMs) && conduit.latencyBudgetMs > 0)
  }
  const capacity = solution.capacityCalculation
  assert.equal(capacity.requiredBytes, capacity.tagCount * capacity.bytesPerSample * capacity.samplesPerSecond * capacity.bufferSeconds)
  assert.equal(capacity.requiredBytes, 51840000000)
  assert.equal(capacity.requiredGigabytes, 51.84)
  assert.equal(capacity.provisionedGigabytes, 68)
  assert.ok(activity.rubric.length >= 4)
})

test('Module 2 genealogy case reconstructs concrete split and rework scope despite late and duplicate events', () => {
  const workedCase = architectureLesson.units[3].workedCases[0]
  const artifact = workedCase.caseArtifact
  assert.deepEqual(artifact.inputLots.map(({ id, units }) => [id, units]), [['COMP-A17', 10000]])
  assert.deepEqual(artifact.outputLots.map(({ id, units }) => [id, units]), [
    ['FG-701', 3900],
    ['FG-702', 1850]
  ])
  assert.deepEqual(artifact.edges.map(({ id, from, to, units }) => [id, from, to, units]), [
    ['consume-a17', 'COMP-A17', 'SFG-401', 6000],
    ['split-a', 'SFG-401', 'SFG-401-A', 4000],
    ['split-b', 'SFG-401', 'SFG-401-B', 2000],
    ['pack-701', 'SFG-401-A', 'FG-701', 3900],
    ['rework-b', 'SFG-401-B', 'RW-401-B', 1900],
    ['pack-702', 'RW-401-B', 'FG-702', 1850]
  ])
  assert.deepEqual(artifact.eventExceptions.map(({ id, status }) => [id, status]), [
    ['EV-101-RETRY', 'duplicate-ignored'],
    ['EV-105', 'late-reconciled']
  ])
  assert.equal(artifact.scopeCalculation.affectedInputUnits, 6000)
  assert.equal(artifact.scopeCalculation.affectedOutputUnits, 5750)
  assert.equal(artifact.scopeCalculation.scrapAndLossUnits, 250)
  assert.equal(artifact.scopeCalculation.outputYieldPercent, 95.83)
  assert.ok(artifact.reconstructionSteps.length >= 5)
  assert.ok(artifact.failureHandling.length >= 3)
  assert.ok(workedCase.followUps.length >= 2)
})

test('Module 2 cites primary references for alarms, zones and conduits, and the 4-20 mA loop', () => {
  const expectedByUnit = [
    [0, 'ni-4-20ma-current-loop'],
    [1, 'isa-18-alarm-management'],
    [5, 'isa-iec-62443']
  ]
  for (const [unitIndex, sourceId] of expectedByUnit) {
    assert.ok(architectureLesson.units[unitIndex].sourceIds.includes(sourceId))
    assert.equal(sources[sourceId].type, 'primary')
  }
})

test('Italian elision regression recognizes missing apostrophes without a noun allowlist', () => {
  for (const malformed of ['all originale', 'L operatore', 'dall ambiente', 'nell impianto', 'sull HMI']) {
    assert.match(malformed, missingItalianElision)
  }
  assert.doesNotMatch('Perché ogni AI è vietata?', missingItalianElision)
})

test('Module 2 Italian copy elides articles and articulated prepositions before vowels', () => {
  assert.doesNotMatch(
    JSON.stringify(architectureLesson, (key, value) => key === 'en' ? undefined : value),
    missingItalianElision
  )
})

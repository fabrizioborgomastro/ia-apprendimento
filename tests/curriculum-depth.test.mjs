import test from 'node:test'
import assert from 'node:assert/strict'
import { countWords, validateCurriculum } from '../public/content/schema.js'
import { digitalTransformationLesson } from '../public/content/module-1-transformation.js'
import { architectureLesson } from '../public/content/module-2-architecture.js'
import { sources } from '../public/content/sources.js'

const { dataAiLesson = null } = await import('../public/content/module-3-data-ai.js')
  .catch(() => ({}))

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

test('Module 3 has the approved identity, depth and practical portfolio', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  assert.equal(dataAiLesson.id, 'data-ai-use-cases')
  assert.equal(dataAiLesson.slug, 'data-ai-use-cases')
  assert.equal(dataAiLesson.durationMinutes, 65)
  assert.deepEqual(dataAiLesson.timeBudget, { theory: 31, cases: 20, practice: 14 })
  assert.equal(dataAiLesson.units.length, 7)
  assert.ok(theoryWords(dataAiLesson, 'it') >= 5580)
  assert.ok(theoryWords(dataAiLesson, 'en') >= 4743)
  assert.equal(countWorkedCases(dataAiLesson), 2)
  assert.equal(dataAiLesson.units.flatMap((unit) => unit.activities || []).length, 7)
  for (const unit of dataAiLesson.units) {
    const activities = unit.activities || []
    assert.ok(activities.length >= 1, `${unit.id} must contain active practice`)
    assert.equal(
      activities.reduce((sum, activity) => sum + activity.durationMinutes, 0),
      unit.timeAllocation.practice,
      `${unit.id} activities must reconcile to practice minutes`
    )
    assert.ok(activities.every((activity) => (
      activity.prompt.it && activity.prompt.en &&
      activity.modelSolution.it && activity.modelSolution.en &&
      activity.rubric.length > 0 &&
      activity.rubric.every((criterion) => criterion.it && criterion.en)
    )))
  }
})

test('Module 3 keeps seven decision-oriented units and reconciles every minute by learning mode', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  assert.deepEqual(
    dataAiLesson.units.map(({ id, estimatedMinutes, timeAllocation }) => ({
      id,
      estimatedMinutes,
      timeAllocation
    })),
    [
      {
        id: 'decision-ladder-simplest-adequate-method',
        estimatedMinutes: 9,
        timeAllocation: { theory: 5, cases: 2, practice: 2 }
      },
      {
        id: 'data-meaning-quality-lineage-labels',
        estimatedMinutes: 9,
        timeAllocation: { theory: 5, cases: 2, practice: 2 }
      },
      {
        id: 'metrics-errors-drift-operational-kpis',
        estimatedMinutes: 9,
        timeAllocation: { theory: 5, cases: 2, practice: 2 }
      },
      {
        id: 'predictive-maintenance-decision-case',
        estimatedMinutes: 10,
        timeAllocation: { theory: 4, cases: 4, practice: 2 }
      },
      {
        id: 'computer-vision-quality-human-review',
        estimatedMinutes: 10,
        timeAllocation: { theory: 4, cases: 4, practice: 2 }
      },
      {
        id: 'forecast-uncertainty-supply-scenarios',
        estimatedMinutes: 9,
        timeAllocation: { theory: 4, cases: 3, practice: 2 }
      },
      {
        id: 'data-readiness-use-case-portfolio',
        estimatedMinutes: 9,
        timeAllocation: { theory: 4, cases: 3, practice: 2 }
      }
    ]
  )

  const totals = dataAiLesson.units.reduce(
    (sum, unit) => ({
      theory: sum.theory + unit.timeAllocation.theory,
      cases: sum.cases + unit.timeAllocation.cases,
      practice: sum.practice + unit.timeAllocation.practice
    }),
    { theory: 0, cases: 0, practice: 0 }
  )
  assert.deepEqual(totals, { theory: 31, cases: 20, practice: 14 })
  assert.equal(
    dataAiLesson.units.reduce((sum, unit) => sum + unit.estimatedMinutes, 0),
    65
  )
  assert.ok(dataAiLesson.units.every(({ estimatedMinutes }) => (
    estimatedMinutes >= 5 && estimatedMinutes <= 10
  )))
})

test('Module 3 case and practice minutes are explicit, learner-visible, and auditable', () => {
  let caseMinutes = 0
  let practiceMinutes = 0

  for (const unit of dataAiLesson.units) {
    const caseItems = [
      ...(unit.microExamples || []),
      ...(unit.caseSegments || []),
      ...(unit.workedCases || [])
    ]
    assert.ok(caseItems.length > 0, `${unit.id} needs learner-visible case content`)
    assert.ok(caseItems.every(({ durationMinutes }) => (
      Number.isInteger(durationMinutes) && durationMinutes > 0
    )), `${unit.id} case items need explicit positive durationMinutes`)
    assert.ok(caseItems.every((item) => (
      (item.explanation?.it && item.explanation?.en) ||
      (item.scenario?.it && item.scenario?.en)
    )), `${unit.id} case items must be genuine localized learner content`)
    assert.equal(
      caseItems.reduce((sum, item) => sum + item.durationMinutes, 0),
      unit.timeAllocation.cases,
      `${unit.id} case items must reconcile to its case allocation`
    )

    const activities = unit.activities || []
    for (const activity of activities) {
      assert.equal(activity.durationMinutes, 2)
      assert.equal(activity.quickTask.outputCount, 1)
      assert.ok(activity.quickTask.decisionCount + activity.quickTask.calculationCount <= 1)
      assert.ok(activity.quickTask.providedContext.it && activity.quickTask.providedContext.en)
      assert.ok(activity.quickTask.responseFormat.it && activity.quickTask.responseFormat.en)
      assert.ok(activity.modelSolution.it.split(/\s+/u).length <= 55)
      assert.ok(activity.modelSolution.en.split(/\s+/u).length <= 55)
    }

    caseMinutes += caseItems.reduce((sum, item) => sum + item.durationMinutes, 0)
    practiceMinutes += activities.reduce((sum, activity) => sum + activity.durationMinutes, 0)
  }

  assert.equal(caseMinutes, 20)
  assert.equal(practiceMinutes, 14)
})

test('Module 3 calculations remain independently reproducible and decision-relevant', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  const examples = dataAiLesson.workedExamples

  const downtime = examples.downtimeCost
  const expectedBaselineCost = downtime.events * downtime.minutesPerEvent *
    downtime.costPerDowntimeHour / 60
  const expectedAvoidableCost = expectedBaselineCost * downtime.avoidableShare
  assert.equal(downtime.baselineCost, expectedBaselineCost)
  assert.equal(downtime.avoidableCost, expectedAvoidableCost)
  assert.ok(downtime.formula.it && downtime.formula.en)
  assert.ok(downtime.assumptions.it && downtime.assumptions.en)

  const matrix = examples.confusionMatrix
  assert.equal(matrix.total, matrix.truePositive + matrix.falsePositive +
    matrix.falseNegative + matrix.trueNegative)
  assert.equal(matrix.precision, matrix.truePositive /
    (matrix.truePositive + matrix.falsePositive))
  assert.equal(matrix.recall, matrix.truePositive /
    (matrix.truePositive + matrix.falseNegative))
  assert.ok(matrix.interpretation.it && matrix.interpretation.en)

  const thresholdOptions = examples.asymmetricErrorCost.thresholdOptions
  for (const option of thresholdOptions) {
    assert.equal(
      option.total,
      option.truePositive + option.falsePositive + option.falseNegative + option.trueNegative
    )
    assert.equal(option.referrals, option.truePositive + option.falsePositive)
    assert.equal(option.referralsPerHour, option.referrals / option.evaluationHours)
    const expectedCost = option.falsePositive * examples.asymmetricErrorCost.falsePositiveCost +
      option.falseNegative * examples.asymmetricErrorCost.falseNegativeCost
    assert.equal(option.expectedCost, expectedCost)
  }
  const cheapest = thresholdOptions.reduce((best, option) => (
    option.expectedCost < best.expectedCost ? option : best
  ))
  assert.equal(examples.asymmetricErrorCost.recommendedThresholdId, cheapest.id)
  const thresholdActivity = dataAiLesson.units[2].activities[0].solutionArtifact
  assert.equal(thresholdActivity.recommendedThresholdId, cheapest.id)
  assert.equal(thresholdActivity.expectedReferralsPerHour, cheapest.referralsPerHour)

  const forecast = examples.forecastUncertainty
  assert.equal(forecast.baseForecast, 1000)
  assert.deepEqual(
    forecast.scenarios.map(({ id, demandMultiplier, units }) => [id, demandMultiplier, units]),
    [
      ['downside-disruption', 0.8, 800],
      ['central', 1, 1000],
      ['upside-recovery', 1.15, 1150]
    ]
  )
  assert.ok(forecast.predictionInterval.lower < forecast.baseForecast)
  assert.ok(forecast.predictionInterval.upper > forecast.baseForecast)
  assert.ok(forecast.actions.every((action) => action.trigger.it && action.trigger.en &&
    action.response.it && action.response.en))
})

test('Module 3 complete cases connect model evidence to controlled maintenance and quality decisions', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  const cases = dataAiLesson.units.flatMap((unit) => unit.workedCases || [])
  assert.deepEqual(cases.map(({ id }) => id), [
    'bearing-degradation-maintenance-window',
    'seal-inspection-human-review'
  ])

  for (const workedCase of cases) {
    for (const field of ['title', 'scenario', 'reasoning', 'decision', 'tradeOff', 'outcome']) {
      assert.ok(workedCase[field].it && workedCase[field].en, `${workedCase.id} needs ${field}`)
    }
    assert.ok(workedCase.assumptions.length >= 3)
    assert.ok(workedCase.assumptions.every((item) => item.it && item.en))
    assert.ok(workedCase.analysisSteps.length >= 4)
    assert.ok(workedCase.analysisSteps.every((item) => item.it && item.en))
    assert.ok(workedCase.followUps.length >= 2)
    assert.ok(workedCase.followUps.every((item) => item.it && item.en))
  }

  const maintenance = cases[0].caseArtifact
  assert.deepEqual(maintenance.decisionGates.map(({ id, status }) => [id, status]), [
    ['failure-mode-and-action', 'passed'],
    ['data-and-label-readiness', 'failed'],
    ['prospective-performance', 'not-evaluated'],
    ['economic-and-capacity-value', 'not-evaluated'],
    ['controlled-deployment', 'not-evaluated']
  ])
  assert.ok(maintenance.decisionGates.every((gate) => (
    gate.evidence.it && gate.evidence.en &&
    gate.criteria.it && gate.criteria.en &&
    gate.owner.it && gate.owner.en
  )))
  assert.ok(maintenance.decisionGates
    .filter(({ status }) => status !== 'passed')
    .every(({ evidence }) => /not yet|non ancora|insufficient|insufficiente/i.test(
      `${evidence.it} ${evidence.en}`
    )))
  assert.equal(maintenance.action.windowHours, 36)
  assert.equal(maintenance.action.mode, 'advisory-with-human-authorization')
  assert.ok(maintenance.fallback.it && maintenance.fallback.en)

  const quality = cases[1].caseArtifact
  assert.equal(quality.humanReview.queueCapacityPerHour, 60)
  assert.equal(quality.humanReview.expectedReferrals, 120)
  assert.equal(quality.humanReview.evaluationHours, 2.5)
  assert.equal(quality.humanReview.expectedReferralsPerHour, 48)
  assert.equal(
    quality.humanReview.expectedReferralsPerHour,
    quality.humanReview.expectedReferrals / quality.humanReview.evaluationHours
  )
  assert.ok(quality.humanReview.expectedReferralsPerHour <
    quality.humanReview.queueCapacityPerHour)
  assert.deepEqual(quality.humanReview.outcomes, [
    'accept',
    'reject',
    'escalate'
  ])
  assert.equal(quality.releaseAuthority, 'qualified-human-only')
  assert.ok(quality.fallback.it && quality.fallback.en)
})

test('Module 3 scorecard uses evidence, confidence and hard gates before ranking use cases', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  const artifact = dataAiLesson.dataReadinessUseCaseArtifact
  const expectedCriteria = [
    ['business-decision-value', 20],
    ['data-semantic-readiness', 25],
    ['label-and-ground-truth-readiness', 20],
    ['workflow-and-integration-readiness', 20],
    ['risk-oversight-and-adoption', 15]
  ]
  assert.deepEqual(artifact.criteria.map(({ id, weight }) => [id, weight]), expectedCriteria)
  assert.equal(artifact.criteria.reduce((sum, criterion) => sum + criterion.weight, 0), 100)
  assert.equal(artifact.attainableScoreRange.minimum, 20)
  assert.equal(artifact.attainableScoreRange.maximum, 100)
  for (const criterion of artifact.criteria) {
    assert.deepEqual(Object.keys(criterion.anchors), ['1', '3', '5'])
    assert.ok(Object.values(criterion.anchors).every(({ it, en }) => it && en))
    assert.ok(criterion.intermediateScorePolicy.it && criterion.intermediateScorePolicy.en)
  }
  assert.match(artifact.scale.it, /20.+100/u)
  assert.match(artifact.scale.en, /20.+100/u)
  assert.match(artifact.formula.it, /20.+100/u)
  assert.match(artifact.formula.en, /20.+100/u)
  assert.doesNotMatch(
    dataAiLesson.units.flatMap(({ theory }) => theory.map(({ it, en }) => `${it} ${en}`)).join(' '),
    /(?:^|[^0-9])(?:0-100|0 to 100)/u
  )
  assert.ok(artifact.audit.rubricVersion)
  assert.match(artifact.audit.assessmentDate, /^\d{4}-\d{2}-\d{2}$/u)
  assert.ok(artifact.audit.participants.length >= 2)
  assert.ok(artifact.audit.participants.every(({ role }) => role.it && role.en))
  for (const field of ['decisionOwner', 'budgetBoundary']) {
    assert.ok(artifact.audit[field].it && artifact.audit[field].en)
  }
  assert.ok(artifact.audit.dependencies.length > 0)
  assert.ok(artifact.audit.dependencies.every(({ it, en }) => it && en))
  assert.deepEqual(artifact.hardGates.map(({ id }) => id), [
    'defined-action-and-owner',
    'representative-trustworthy-data',
    'authorized-decision-boundary'
  ])

  const confidenceLevels = new Set(['low', 'medium', 'high'])
  for (const candidate of artifact.candidates) {
    assert.deepEqual(Object.keys(candidate.assessments), expectedCriteria.map(([id]) => id))
    for (const [criterionId] of expectedCriteria) {
      const assessment = candidate.assessments[criterionId]
      assert.ok(Number.isInteger(assessment.score) &&
        assessment.score >= 1 && assessment.score <= 5)
      assert.ok(confidenceLevels.has(assessment.confidence))
      assert.ok(assessment.evidence.it && assessment.evidence.en)
      assert.ok(assessment.rationale.it && assessment.rationale.en)
      assert.ok(assessment.assumptions.length > 0)
      assert.ok(assessment.assumptions.every(({ it, en }) => it && en))
      assert.ok(assessment.evidenceReferences.length > 0)
      assert.ok(assessment.evidenceReferences.every((reference) => (
        reference.id && reference.sourceId && reference.documentId &&
        /^\d{4}-\d{2}-\d{2}$/u.test(reference.observationDate) &&
        /^\d{4}-\d{2}-\d{2}$/u.test(reference.reviewDate) &&
        reference.observationDate <= reference.reviewDate &&
        reference.description.it && reference.description.en
      )))
    }
    const recomputedScore = expectedCriteria.reduce(
      (sum, [criterionId, weight]) => (
        sum + candidate.assessments[criterionId].score * weight
      ),
      0
    ) / 5
    assert.equal(candidate.weightedScore, recomputedScore)
    assert.deepEqual(
      candidate.hardGateChecks.map(({ gateId }) => gateId),
      artifact.hardGates.map(({ id }) => id)
    )
    assert.ok(candidate.hardGateChecks.every((gate) => (
      typeof gate.passed === 'boolean' &&
      gate.evidence.it && gate.evidence.en &&
      gate.rationale.it && gate.rationale.en
    )))
    assert.ok(candidate.decisionRecord.dissent.it && candidate.decisionRecord.dissent.en)
    assert.ok(candidate.decisionRecord.approval.status)
    assert.ok(candidate.decisionRecord.approval.owner.it && candidate.decisionRecord.approval.owner.en)
    assert.ok(candidate.decisionRecord.guardrails.length > 0)
    assert.ok(candidate.decisionRecord.stopCriteria.length > 0)
    assert.ok(candidate.decisionRecord.target.it && candidate.decisionRecord.target.en)
    assert.ok(candidate.decisionRecord.budgetBoundary.it && candidate.decisionRecord.budgetBoundary.en)
    assert.ok(candidate.decisionRecord.dependencies.length > 0)
    assert.ok(candidate.decisionRecord.dependencies.every(({ it, en }) => it && en))
    assert.match(candidate.decisionRecord.reviewDate, /^\d{4}-\d{2}-\d{2}$/u)
    assert.ok(candidate.decisionRecord.guardrails.every(({ it, en }) => it && en))
    assert.ok(candidate.decisionRecord.stopCriteria.every(({ it, en }) => it && en))
  }

  const selected = artifact.candidates.find(({ portfolioDecision }) => (
    portfolioDecision === 'selected'
  ))
  const deferred = artifact.candidates.find(({ id }) => (
    id === 'predictive-maintenance-bearing'
  ))
  const rejected = artifact.candidates.find(({ id }) => (
    id === 'genai-line-threshold-decisions'
  ))
  assert.equal(selected.id, artifact.recommendedCandidateId)
  assert.equal(selected.id, 'vision-seal-review')
  assert.equal(deferred.portfolioDecision, 'deferred')
  assert.ok(deferred.hardGateChecks.some(({ passed }) => !passed))
  assert.equal(rejected.portfolioDecision, 'rejected')
  assert.match(rejected.recommendation.en, /reject.*rule/i)
})

test('Module 3 scorecard validator rejects incomplete and internally inconsistent mutations', () => {
  const errorsFor = (mutate) => {
    const lesson = structuredClone(dataAiLesson)
    mutate(lesson.dataReadinessUseCaseArtifact)
    return lessonLocalErrors([digitalTransformationLesson, architectureLesson, lesson])
  }

  assert.ok(errorsFor((artifact) => {
    const { title, description } = artifact
    for (const key of Object.keys(artifact)) delete artifact[key]
    Object.assign(artifact, { title, description })
  }).some((error) => /scorecard.*criteria/i.test(error)))

  assert.ok(errorsFor((artifact) => { artifact.criteria = [] })
    .some((error) => /scorecard.*criteria/i.test(error)))
  assert.doesNotThrow(() => errorsFor((artifact) => { artifact.criteria[0] = null }))
  assert.ok(errorsFor((artifact) => { artifact.criteria[0] = null })
    .some((error) => /criterion 1/i.test(error)))
  assert.ok(errorsFor((artifact) => { delete artifact.criteria[0].anchors['3'] })
    .some((error) => /anchor 3/i.test(error)))
  assert.ok(errorsFor((artifact) => { delete artifact.audit.rubricVersion })
    .some((error) => /rubricVersion/i.test(error)))
  assert.ok(errorsFor((artifact) => { delete artifact.audit.budgetBoundary })
    .some((error) => /budgetBoundary/i.test(error)))
  assert.ok(errorsFor((artifact) => { artifact.audit.assessmentDate = '2026-02-31' })
    .some((error) => /assessmentDate.*ISO date/i.test(error)))
  assert.ok(errorsFor((artifact) => {
    delete artifact.candidates[0].assessments['business-decision-value'].evidence
  }).some((error) => /evidence and rationale/i.test(error)))
  assert.ok(errorsFor((artifact) => {
    artifact.candidates[0].assessments['business-decision-value'].evidenceReferences = []
  }).some((error) => /evidence reference/i.test(error)))
  assert.ok(errorsFor((artifact) => { artifact.candidates[0].weightedScore += 1 })
    .some((error) => /weightedScore.*recomputed/i.test(error)))
  assert.ok(errorsFor((artifact) => { artifact.candidates[0].hardGateChecks.pop() })
    .some((error) => /hard gate coverage/i.test(error)))
  assert.ok(errorsFor((artifact) => {
    artifact.candidates.find(({ id }) => id === 'predictive-maintenance-bearing').portfolioDecision = 'selected'
  }).some((error) => /selected or pilot.*hard gates/i.test(error)))
  assert.ok(errorsFor((artifact) => {
    artifact.candidates.find(({ id }) => id === 'predictive-maintenance-bearing').portfolioDecision = 'pilot'
  }).some((error) => /selected or pilot.*hard gates/i.test(error)))
  assert.ok(errorsFor((artifact) => { artifact.candidates[0].portfolioDecision = 'unknown' })
    .some((error) => /portfolioDecision/i.test(error)))
  assert.ok(errorsFor((artifact) => { delete artifact.candidates[0].recommendation })
    .some((error) => /localized recommendation/i.test(error)))
  assert.ok(errorsFor((artifact) => { delete artifact.candidates[0].decisionRecord.target })
    .some((error) => /decision record.*target/i.test(error)))
})

test('Module 3 explicit timing validation reports malformed allocation without throwing', () => {
  const lesson = structuredClone(dataAiLesson)
  delete lesson.units[0].timeAllocation
  assert.doesNotThrow(() => lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    lesson
  ]))
  assert.ok(lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    lesson
  ]).some((error) => /allocate non-negative theory, cases and practice/i.test(error)))
})

test('Module 3 engaged-time runtime contract rejects deletion and timing mutations', () => {
  const errorsFor = (mutate) => {
    const lesson = structuredClone(dataAiLesson)
    mutate(lesson)
    return lessonLocalErrors([digitalTransformationLesson, architectureLesson, lesson])
  }

  assert.ok(errorsFor((lesson) => {
    for (const unit of lesson.units) {
      for (const item of [
        ...(unit.microExamples || []),
        ...(unit.caseSegments || []),
        ...(unit.workedCases || [])
      ]) delete item.durationMinutes
    }
  }).some((error) => /engaged case items.*durationMinutes/i.test(error)))

  assert.ok(errorsFor((lesson) => {
    for (const activity of lesson.units.flatMap(({ activities }) => activities || [])) {
      delete activity.quickTask
    }
  }).some((error) => /activity 1.*quickTask/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.units[0].activities = [] })
    .some((error) => /must retain at least one engaged-time activity/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.units[0].activities[0].durationMinutes = 0 })
    .some((error) => /activity 1.*positive integer durationMinutes/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.units[0].microExamples[0].durationMinutes = 2 })
    .some((error) => /engaged case durations.*allocated case minutes/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.units[0].activities[0].durationMinutes = 3 })
    .some((error) => /engaged activity durations.*allocated practice minutes/i.test(error)))

  assert.ok(errorsFor((lesson) => {
    lesson.units[0].timeAllocation.theory = 4
    lesson.units[0].timeAllocation.cases = 3
    lesson.units[0].caseSegments[0].durationMinutes = 2
  }).some((error) => /engaged case minutes must total 20/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    lesson.units[0].timeAllocation.theory = 4
    lesson.units[0].timeAllocation.cases = 3
    lesson.units[0].caseSegments[0].durationMinutes = 2
  }).some((error) => /unit allocations must remain 31 theory, 20 cases and 14 practice/i.test(error)))

  assert.ok(errorsFor((lesson) => {
    lesson.units[0].timeAllocation.theory = 4
    lesson.units[0].timeAllocation.practice = 3
    lesson.units[0].activities[0].durationMinutes = 3
  }).some((error) => /engaged practice minutes must total 14/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.durationMinutes = 66 })
    .some((error) => /durationMinutes must remain 65/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.timeBudget.theory = 30 })
    .some((error) => /time budget must remain 31 theory, 20 cases and 14 practice/i.test(error)))
})

test('engaged-time runtime contract remains opt-in to the Module 3 scorecard marker', () => {
  const lesson = structuredClone(dataAiLesson)
  delete lesson.dataReadinessUseCaseArtifact
  for (const unit of lesson.units) {
    for (const item of [
      ...(unit.microExamples || []),
      ...(unit.caseSegments || []),
      ...(unit.workedCases || [])
    ]) delete item.durationMinutes
    for (const activity of unit.activities || []) delete activity.quickTask
  }

  assert.ok(lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    lesson
  ]).every((error) => !/engaged-time|engaged case|engaged practice/i.test(error)))
})

test('Module 3 teaches the simplest adequate method and readiness before AI promises', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  const ladder = dataAiLesson.methodSelectionLadder
  assert.deepEqual(ladder.levels.map(({ id }) => id), [
    'deterministic-rule',
    'descriptive-diagnostic-analytics',
    'predictive-machine-learning',
    'optimization',
    'generative-ai'
  ])
  assert.deepEqual(
    ladder.examples.map(({ id, selectedLevelId, disposition }) => [
      id,
      selectedLevelId,
      disposition
    ]),
    [
      ['temperature-limit-alert', 'deterministic-rule', 'select'],
      ['weekly-loss-pareto', 'descriptive-diagnostic-analytics', 'select'],
      ['bearing-failure-risk', 'predictive-machine-learning', 'defer-until-ready'],
      ['production-allocation', 'optimization', 'select'],
      ['controlled-manual-summary', 'generative-ai', 'pilot-with-controls'],
      ['line-threshold-decision', 'deterministic-rule', 'reject-genai']
    ]
  )
  assert.ok(ladder.examples.every((example) => (
    example.rationale.it && example.rationale.en &&
    example.requiredEvidence.it && example.requiredEvidence.en
  )))

  const prompts = dataAiLesson.interviewAnswers.map(({ prompt }) => prompt.en)
  assert.deepEqual(prompts, [
    'How do you choose the simplest adequate analytical method?',
    'When would you reject generative AI in favor of rules or classical analytics?',
    'What must be ready before you promise predictive maintenance?'
  ])
  for (const answer of dataAiLesson.interviewAnswers) {
    for (const field of ['prompt', 'short', 'long']) {
      assert.ok(answer[field].it && answer[field].en)
    }
    assert.ok(countWords(answer.short.it) >= 50)
    assert.ok(countWords(answer.short.en) >= 50)
    assert.ok(countWords(answer.long.it) >= 180)
    assert.ok(countWords(answer.long.en) >= 180)
    assert.ok(answer.followUps.length >= 2)
    assert.ok(answer.followUps.every((item) => item.it && item.en))
  }
})

test('Module 3 passes lesson-local validation and resolves aligned primary sources', () => {
  assert.ok(dataAiLesson, 'Module 3 content must exist')
  assert.deepEqual(
    lessonLocalErrors([digitalTransformationLesson, architectureLesson, dataAiLesson]),
    []
  )

  const sourceIds = new Set(dataAiLesson.units.flatMap((unit) => unit.sourceIds))
  for (const sourceId of [
    'nist-ai-rmf-1-0',
    'nist-sp-500-341',
    'nist-condition-monitoring-maintenance',
    'nist-prediction-uncertainty',
    'isa-95',
    'pmi-operations'
  ]) {
    assert.ok(sourceIds.has(sourceId), `Module 3 must cite ${sourceId}`)
    assert.equal(sources[sourceId]?.type, 'primary')
  }

  assert.deepEqual(dataAiLesson.units.map(({ sourceIds }) => sourceIds), [
    ['nist-ai-rmf-1-0', 'nist-ai-600-1', 'nist-manufacturing-kpi-procedure'],
    ['isa-95', 'nist-ai-rmf-1-0', 'opc-ua-part-1'],
    ['nist-sp-500-341', 'nist-ai-rmf-1-0', 'nist-manufacturing-kpi-hierarchy'],
    ['nist-condition-monitoring-maintenance', 'nist-ai-rmf-1-0', 'pmi-operations'],
    ['nist-ai-rmf-1-0', 'nist-sp-500-341', 'eu-ai-act', 'pmi-product-reliability'],
    ['nist-prediction-uncertainty', 'nist-ai-rmf-1-0', 'isa-95', 'pmi-annual-report-2025'],
    ['nist-ai-rmf-1-0', 'nist-condition-monitoring-maintenance', 'nist-manufacturing-kpi-procedure', 'pmi-operations']
  ])
})

test('Module 3 Italian copy elides articles before vowels', () => {
  const missingElision = /(?:^|[\s"'([{])(?:[Uu]na|[Ll]a|[Aa]lla|[Dd]alla|[Dd]ella|[Nn]ella|[Ss]ulla)\s+(?=[AEHIOUÀÈÉÌÒÓÙaehiouàèéìòóù])/u
  assert.doesNotMatch(
    JSON.stringify(dataAiLesson, (key, value) => key === 'en' ? undefined : value),
    missingElision
  )
})

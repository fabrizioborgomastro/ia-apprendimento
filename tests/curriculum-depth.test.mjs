import test from 'node:test'
import assert from 'node:assert/strict'
import { countWords, validateCurriculum } from '../public/content/schema.js'
import { digitalTransformationLesson } from '../public/content/module-1-transformation.js'
import { architectureLesson } from '../public/content/module-2-architecture.js'
import { sources } from '../public/content/sources.js'

const { dataAiLesson = null } = await import('../public/content/module-3-data-ai.js')
  .catch(() => ({}))
const { llmAgentsLesson = null } = await import('../public/content/module-4-llm-agents.js')
  .catch(() => ({}))
const { mvpGovernanceLesson = null } = await import('../public/content/module-5-mvp-governance.js')
  .catch(() => ({}))
const { interviewLabLesson = null } = await import('../public/content/module-6-interview-lab.js')
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

test('Module 4 has the approved identity, depth, sources, and practical portfolio', () => {
  assert.ok(llmAgentsLesson, 'Module 4 content must exist')
  assert.equal(llmAgentsLesson.id, 'llm-agents')
  assert.equal(llmAgentsLesson.slug, 'llm-agents')
  assert.equal(llmAgentsLesson.durationMinutes, 80)
  assert.deepEqual(llmAgentsLesson.timeBudget, { theory: 40, cases: 22, practice: 18 })
  assert.equal(llmAgentsLesson.units.length, 9)
  assert.ok(theoryWords(llmAgentsLesson, 'it') >= 7200)
  assert.ok(theoryWords(llmAgentsLesson, 'en') >= 6120)
  assert.equal(countWorkedCases(llmAgentsLesson), 2)

  const sourceIds = new Set(llmAgentsLesson.units.flatMap(({ sourceIds }) => sourceIds))
  for (const sourceId of [
    'attention-is-all-you-need',
    'retrieval-augmented-generation',
    'nist-ai-600-1',
    'mcp-specification'
  ]) {
    assert.ok(sourceIds.has(sourceId), `Module 4 must cite ${sourceId}`)
    assert.equal(sources[sourceId]?.type, 'primary')
  }
})

test('Module 4 keeps nine approved boundaries and reconciles every engaged minute', () => {
  assert.ok(llmAgentsLesson, 'Module 4 content must exist')
  assert.deepEqual(
    llmAgentsLesson.units.map(({ id, estimatedMinutes, timeAllocation }) => ({
      id,
      estimatedMinutes,
      timeAllocation
    })),
    [
      { id: 'tokens-context-probability', estimatedMinutes: 8, timeAllocation: { theory: 4, cases: 2, practice: 2 } },
      { id: 'transformer-attention-representation', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
      { id: 'training-inference-tradeoffs', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
      { id: 'limitations-task-specific-evaluation', estimatedMinutes: 9, timeAllocation: { theory: 4, cases: 3, practice: 2 } },
      { id: 'retrieval-embeddings-access', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
      { id: 'controlled-sop-rag-case', estimatedMinutes: 10, timeAllocation: { theory: 4, cases: 4, practice: 2 } },
      { id: 'safe-maintenance-tool-call', estimatedMinutes: 10, timeAllocation: { theory: 4, cases: 4, practice: 2 } },
      { id: 'agent-loop-workflow-mcp', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
      { id: 'multi-model-routing-handoffs', estimatedMinutes: 7, timeAllocation: { theory: 4, cases: 1, practice: 2 } }
    ]
  )

  const totals = { theory: 0, cases: 0, practice: 0 }
  let caseMinutes = 0
  let practiceMinutes = 0
  for (const unit of llmAgentsLesson.units) {
    assert.ok(unit.estimatedMinutes >= 5 && unit.estimatedMinutes <= 10)
    for (const mode of Object.keys(totals)) totals[mode] += unit.timeAllocation[mode]

    const caseItems = [
      ...(unit.microExamples || []),
      ...(unit.caseSegments || []),
      ...(unit.workedCases || [])
    ]
    assert.ok(caseItems.length > 0, `${unit.id} needs learner-visible case content`)
    assert.equal(
      caseItems.reduce((sum, item) => sum + item.durationMinutes, 0),
      unit.timeAllocation.cases
    )
    caseMinutes += caseItems.reduce((sum, item) => sum + item.durationMinutes, 0)

    const activities = unit.activities || []
    assert.equal(activities.length, 1, `${unit.id} needs one bounded activity`)
    assert.equal(activities[0].durationMinutes, 2)
    assert.equal(activities[0].quickTask.outputCount, 1)
    assert.ok(activities[0].quickTask.decisionCount + activities[0].quickTask.calculationCount <= 1)
    practiceMinutes += activities[0].durationMinutes
  }

  assert.deepEqual(totals, { theory: 40, cases: 22, practice: 18 })
  assert.equal(caseMinutes, 22)
  assert.equal(practiceMinutes, 18)
})

test('Module 4 timed case segments require substantive localized work proportional to duration', () => {
  const timedSegments = llmAgentsLesson.units.flatMap((unit) => [
    ...(unit.microExamples || []),
    ...(unit.caseSegments || [])
  ])
  assert.equal(timedSegments.length, 7)
  assert.equal(timedSegments.reduce((sum, segment) => sum + segment.durationMinutes, 0), 14)

  for (const segment of timedSegments) {
    assert.ok(segment.learnerAction?.it && segment.learnerAction?.en)
    assert.ok(segment.expectedOutput?.it && segment.expectedOutput?.en)
    assert.ok(segment.modelReasoning?.it && segment.modelReasoning?.en)
    assert.ok(segment.responseFormat?.it && segment.responseFormat?.en)
    assert.ok(segment.decisionAid?.columns?.length >= 2)
    assert.ok(segment.decisionAid?.rows?.length >= 2)
    assert.ok(segment.decisionAid.rows.every((row) => (
      row.id && row.cells.length === segment.decisionAid.columns.length &&
      row.cells.every((cell) => cell.it && cell.en)
    )))
    assert.equal(segment.scope.outputCount, 1)
    assert.equal(
      segment.scope.decisionCount + segment.scope.comparisonCount + segment.scope.interpretationCount,
      segment.durationMinutes,
      `${segment.id} workload must justify its declared duration`
    )
  }
})

test('Module 4 central artifacts make RAG, tool, MCP, and orchestration boundaries auditable', () => {
  assert.ok(llmAgentsLesson, 'Module 4 content must exist')

  const rag = llmAgentsLesson.ragControlArtifact
  assert.deepEqual(rag.pipeline.map(({ id }) => id), [
    'authorize-query',
    'resolve-effective-version',
    'retrieve-filtered-passages',
    'rerank-and-threshold',
    'generate-with-citations',
    'verify-claims-or-refuse'
  ])
  assert.ok(rag.pipeline.every((step) => step.owner.it && step.owner.en &&
    step.evidence.it && step.evidence.en && step.failureAction.it && step.failureAction.en))

  const tool = llmAgentsLesson.maintenanceToolContract
  assert.deepEqual(tool.requiredInputs, [
    'assetId', 'siteId', 'symptomCode', 'description', 'priority',
    'requestedWindowStart', 'requestedWindowEnd', 'requesterId', 'authorizationContext',
    'sourceEvidenceIds', 'idempotencyKey'
  ])
  assert.ok(tool.validationRules.length >= 5)
  assert.ok(tool.auditFields.includes('idempotencyKey'))
  assert.ok(tool.failureModes.every((failure) => failure.detect.it && failure.detect.en &&
    failure.response.it && failure.response.en))

  assert.deepEqual(llmAgentsLesson.mcpBoundary.participants.map(({ id }) => id), [
    'host', 'client', 'server'
  ])
  assert.deepEqual(llmAgentsLesson.mcpBoundary.serverPrimitives.map(({ id }) => id), [
    'resources', 'tools', 'prompts'
  ])
  assert.equal(llmAgentsLesson.mcpBoundary.protocolRevision, '2026-07-28')

  const decisions = llmAgentsLesson.multiModelDecisionExercise.scenarios
  assert.deepEqual(decisions.map(({ id, recommendedPattern }) => [id, recommendedPattern]), [
    ['single-controlled-summary', 'one-model'],
    ['mixed-volume-classification', 'model-routing'],
    ['maintenance-order-transaction', 'deterministic-orchestration'],
    ['ambiguous-cross-domain-investigation', 'multiple-agents']
  ])
  assert.match(decisions[0].modelSolution.en, /reject.*multi-agent/i)
  assert.match(decisions[2].modelSolution.en, /reject.*multi-agent/i)
  assert.ok(decisions.every((scenario) => scenario.handoff.it && scenario.handoff.en &&
    scenario.stopCondition.it && scenario.stopCondition.en &&
    scenario.measurableBenefit.it && scenario.measurableBenefit.en))
})

test('Module 4 identity-anchored validator rejects mutations to central safety contracts', () => {
  const errorsFor = (mutate) => {
    const lesson = structuredClone(llmAgentsLesson)
    mutate(lesson)
    return lessonLocalErrors([
      digitalTransformationLesson,
      architectureLesson,
      dataAiLesson,
      lesson
    ])
  }

  assert.ok(errorsFor((lesson) => { lesson.ragControlArtifact.pipeline.shift() })
    .some((error) => /RAG control.*six ordered steps/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    lesson.maintenanceToolContract.requiredInputs = lesson.maintenanceToolContract.requiredInputs
      .filter((field) => field !== 'idempotencyKey')
  }).some((error) => /tool contract.*idempotencyKey/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.mcpBoundary.participants.pop() })
    .some((error) => /MCP boundary.*host, client and server/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.multiModelDecisionExercise.scenarios.pop() })
    .some((error) => /multi-model exercise.*four patterns/i.test(error)))

  assert.ok(errorsFor((lesson) => { delete lesson.ragControlArtifact })
    .some((error) => /RAG control.*required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.maintenanceToolContract })
    .some((error) => /tool contract.*required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.mcpBoundary })
    .some((error) => /MCP boundary.*required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.multiModelDecisionExercise })
    .some((error) => /multi-model exercise.*required/i.test(error)))

  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].learnerAction })
    .some((error) => /timed case item 1.*learnerAction/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].expectedOutput })
    .some((error) => /timed case item 1.*expectedOutput/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].modelReasoning })
    .some((error) => /timed case item 1.*modelReasoning/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[0].microExamples[0].scope.comparisonCount = 0 })
    .some((error) => /timed case item 1.*workload.*durationMinutes/i.test(error)))
})

test('Module 4 safety-contract validation is anchored to stable lesson identity', () => {
  const lesson = structuredClone(llmAgentsLesson)
  delete lesson.ragControlArtifact

  assert.ok(lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    dataAiLesson,
    lesson
  ]).some((error) => /Module 4 safety contract.*RAG control.*required/i.test(error)))
})

test('Module 4 routing and multi-agent claims cite local original research', () => {
  const sourceIds = new Set(llmAgentsLesson.units[8].sourceIds)
  for (const sourceId of ['routellm', 'autogen-multi-agent', 'agentbench']) {
    assert.ok(sourceIds.has(sourceId), `Module 4 orchestration unit must cite ${sourceId}`)
    assert.equal(sources[sourceId]?.type, 'primary')
    assert.match(sources[sourceId]?.url || '', /^https:\/\/arxiv\.org\/abs\//u)
  }
})

const MODULE_5_BOUNDARIES = [
  { id: 'discovery-baseline-riskiest-assumption', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
  { id: 'mvp-prototype-pilot-scope', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
  { id: 'integration-shadow-mode-ownership', estimatedMinutes: 10, timeAllocation: { theory: 4, cases: 4, practice: 2 } },
  { id: 'ot-security-segmentation-safety', estimatedMinutes: 10, timeAllocation: { theory: 5, cases: 3, practice: 2 } },
  { id: 'genai-threats-and-excessive-agency', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
  { id: 'governance-nist-and-eu-obligations', estimatedMinutes: 9, timeAllocation: { theory: 4, cases: 3, practice: 2 } },
  { id: 'monitoring-drift-incident-oversight', estimatedMinutes: 9, timeAllocation: { theory: 5, cases: 2, practice: 2 } },
  { id: 'scaling-gates-platform-and-adoption', estimatedMinutes: 10, timeAllocation: { theory: 3, cases: 4, practice: 3 } }
]

test('Module 5 has the approved identity, depth, sources, and practical portfolio', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  assert.equal(mvpGovernanceLesson.id, 'mvp-governance')
  assert.equal(mvpGovernanceLesson.slug, 'mvp-governance')
  assert.equal(mvpGovernanceLesson.moduleNumber, 5)
  assert.equal(mvpGovernanceLesson.durationMinutes, 75)
  assert.deepEqual(mvpGovernanceLesson.timeBudget, { theory: 36, cases: 22, practice: 17 })
  assert.equal(mvpGovernanceLesson.units.length, 8)
  assert.ok(theoryWords(mvpGovernanceLesson, 'it') >= 6480)
  assert.ok(theoryWords(mvpGovernanceLesson, 'en') >= 5508)
  assert.equal(countWorkedCases(mvpGovernanceLesson), 2)

  const sourceIds = new Set(mvpGovernanceLesson.units.flatMap(({ sourceIds }) => sourceIds))
  for (const sourceId of [
    'nist-sp-800-82-r3',
    'nist-ai-rmf-1-0',
    'nist-ai-600-1',
    'eu-ai-act',
    'isa-iec-62443',
    'ahrq-raci-chart',
    'nist-sp-800-61-r3'
  ]) {
    assert.ok(sourceIds.has(sourceId), `Module 5 must cite ${sourceId}`)
    assert.equal(sources[sourceId]?.type, 'primary')
    assert.match(sources[sourceId]?.url || '', /^https:\/\//u)
  }
})

test('Module 5 keeps eight approved boundaries and reconciles every engaged minute', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  assert.deepEqual(
    mvpGovernanceLesson.units.map(({ id, estimatedMinutes, timeAllocation }) => ({
      id,
      estimatedMinutes,
      timeAllocation
    })),
    MODULE_5_BOUNDARIES
  )

  const sum = (key) => MODULE_5_BOUNDARIES.reduce((total, unit) => total + unit.timeAllocation[key], 0)
  assert.equal(sum('theory'), 36)
  assert.equal(sum('cases'), 22)
  assert.equal(sum('practice'), 17)
  assert.equal(
    MODULE_5_BOUNDARIES.reduce((total, unit) => total + unit.estimatedMinutes, 0),
    75
  )

  let caseMinutes = 0
  let practiceMinutes = 0
  for (const unit of mvpGovernanceLesson.units) {
    const caseItems = [
      ...(unit.microExamples || []),
      ...(unit.caseSegments || []),
      ...(unit.workedCases || [])
    ]
    const unitCaseMinutes = caseItems.reduce((total, item) => total + item.durationMinutes, 0)
    assert.equal(unitCaseMinutes, unit.timeAllocation.cases, `${unit.id} case minutes must be explicit`)
    const unitPracticeMinutes = (unit.activities || []).reduce((total, item) => total + item.durationMinutes, 0)
    assert.equal(unitPracticeMinutes, unit.timeAllocation.practice, `${unit.id} practice minutes must be explicit`)
    caseMinutes += unitCaseMinutes
    practiceMinutes += unitPracticeMinutes
  }
  assert.equal(caseMinutes, 22)
  assert.equal(practiceMinutes, 17)
})

test('Module 5 timed case items require substantive localized work proportional to duration', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  const timedItems = mvpGovernanceLesson.units.flatMap((unit) => [
    ...(unit.microExamples || []),
    ...(unit.caseSegments || [])
  ])
  assert.equal(timedItems.length, 6)
  assert.equal(timedItems.reduce((total, item) => total + item.durationMinutes, 0), 14)

  for (const item of timedItems) {
    assert.ok(item.learnerAction?.it && item.learnerAction?.en, `${item.id} needs a learner action`)
    assert.ok(item.expectedOutput?.it && item.expectedOutput?.en, `${item.id} needs an expected output`)
    assert.ok(item.modelReasoning?.it && item.modelReasoning?.en, `${item.id} needs model reasoning`)
    assert.ok(item.responseFormat?.it && item.responseFormat?.en, `${item.id} needs a response format`)
    assert.ok(item.decisionAid?.columns?.length >= 2, `${item.id} needs decision-aid columns`)
    assert.ok(item.decisionAid?.rows?.length >= 2, `${item.id} needs decision-aid rows`)
    assert.ok(item.decisionAid.rows.every((row) => (
      row.id && row.cells.length === item.decisionAid.columns.length &&
      row.cells.every((cell) => cell.it && cell.en)
    )), `${item.id} decision aid must be complete and localized`)
    assert.equal(item.scope.outputCount, 1)
    assert.equal(
      item.scope.decisionCount + item.scope.comparisonCount + item.scope.interpretationCount,
      item.durationMinutes,
      `${item.id} workload must justify its declared duration`
    )
  }
})

test('Module 5 artifacts make experiment, risk, accountability and scaling recomputable', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  const { mvpExperimentCanvas, riskRegister, raciMatrix, scalingGateChecklist } = mvpGovernanceLesson

  assert.ok(mvpExperimentCanvas.title.it && mvpExperimentCanvas.title.en)
  for (const field of ['problem', 'decisionSupported', 'riskiestAssumption', 'hypothesis']) {
    assert.ok(mvpExperimentCanvas[field]?.it && mvpExperimentCanvas[field]?.en, `canvas needs ${field}`)
  }
  assert.ok(mvpExperimentCanvas.successCriteria.length >= 3)
  assert.ok(mvpExperimentCanvas.successCriteria.some((criterion) => criterion.hardGate === true))
  for (const criterion of mvpExperimentCanvas.successCriteria) {
    assert.ok(['increase', 'decrease'].includes(criterion.direction))
    assert.ok(Number.isFinite(criterion.baselineValue) && Number.isFinite(criterion.targetValue))
    assert.notEqual(criterion.baselineValue, criterion.targetValue)
    assert.equal(
      criterion.direction,
      criterion.targetValue > criterion.baselineValue ? 'increase' : 'decrease',
      `${criterion.id} direction must match its target`
    )
  }
  assert.ok(mvpExperimentCanvas.stopCriteria.length >= 2)
  assert.ok(mvpExperimentCanvas.owner && mvpExperimentCanvas.approver)
  assert.ok(mvpExperimentCanvas.dissent?.it && mvpExperimentCanvas.dissent?.en)
  assert.match(mvpExperimentCanvas.reviewDate, /^\d{4}-\d{2}-\d{2}$/u)

  assert.ok(riskRegister.rows.length >= 6)
  assert.equal(new Set(riskRegister.rows.map(({ id }) => id)).size, riskRegister.rows.length)
  for (const row of riskRegister.rows) {
    assert.equal(row.inherentScore, row.likelihood * row.impact, `${row.id} inherent score must be derived`)
    assert.equal(row.residualScore, row.residualLikelihood * row.residualImpact, `${row.id} residual score must be derived`)
    assert.ok(row.residualScore <= row.inherentScore, `${row.id} controls must not increase risk`)
    assert.ok(row.controls.length >= 1)
    assert.ok(row.owner && row.evidenceRef)
    assert.match(row.dueDate, /^\d{4}-\d{2}-\d{2}$/u)
  }
  assert.ok(Number.isInteger(riskRegister.tolerance))
  assert.equal(
    riskRegister.blockingRiskIds.slice().sort().join(','),
    riskRegister.rows.filter((row) => row.residualScore > riskRegister.tolerance)
      .map(({ id }) => id).sort().join(','),
    'blocking risks must be exactly the rows above tolerance'
  )

  assert.ok(raciMatrix.roles.length >= 4)
  assert.ok(raciMatrix.activities.length >= 5)
  for (const activity of raciMatrix.activities) {
    const codes = raciMatrix.roles.map((role) => activity.assignments[role.id])
    assert.equal(codes.filter((code) => code === 'A').length, 1, `${activity.id} needs exactly one accountable role`)
    assert.ok(codes.filter((code) => code === 'R').length >= 1, `${activity.id} needs a responsible role`)
    assert.ok(codes.every((code) => ['R', 'A', 'C', 'I', '-'].includes(code)))
  }

  assert.ok(scalingGateChecklist.gates.length >= 6)
  assert.ok(scalingGateChecklist.gates.some((gate) => gate.blocking === true))
  for (const gate of scalingGateChecklist.gates) {
    assert.ok(['pass', 'fail', 'pending'].includes(gate.status))
    assert.ok(gate.evidenceRequired?.it && gate.evidenceRequired?.en)
    assert.ok(gate.threshold?.it && gate.threshold?.en)
  }
  const blockedGates = scalingGateChecklist.gates.filter((gate) => gate.blocking && gate.status !== 'pass')
  assert.ok(['scale', 'hold', 'stop'].includes(scalingGateChecklist.decision))
  if (blockedGates.length) assert.notEqual(scalingGateChecklist.decision, 'scale')
  assert.equal(
    scalingGateChecklist.blockedGateIds.slice().sort().join(','),
    blockedGates.map(({ id }) => id).sort().join(',')
  )
})

test('Module 5 identity-anchored validator rejects mutations to central governance contracts', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  const errorsFor = (mutate) => {
    const lesson = structuredClone(mvpGovernanceLesson)
    mutate(lesson)
    return lessonLocalErrors([
      digitalTransformationLesson,
      architectureLesson,
      dataAiLesson,
      llmAgentsLesson,
      lesson
    ])
  }

  assert.ok(errorsFor((lesson) => { delete lesson.mvpExperimentCanvas })
    .some((error) => /MVP experiment canvas is required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.riskRegister })
    .some((error) => /risk register is required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.raciMatrix })
    .some((error) => /RACI matrix is required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.scalingGateChecklist })
    .some((error) => /scaling gate checklist is required/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.riskRegister.rows[0].residualScore += 1 })
    .some((error) => /residual score must equal/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.riskRegister.rows[0].inherentScore += 1 })
    .some((error) => /inherent score must equal/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.riskRegister.rows = [] })
    .some((error) => /risk register needs at least six/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.riskRegister.rows[1].id = lesson.riskRegister.rows[0].id })
    .some((error) => /duplicate risk ID/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.riskRegister.blockingRiskIds = [] })
    .some((error) => /blocking risks must list every residual score above tolerance/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.riskRegister.rows[0].controls })
    .some((error) => /needs at least one control/i.test(error)))

  assert.ok(errorsFor((lesson) => {
    const activity = lesson.raciMatrix.activities[0]
    const roleId = lesson.raciMatrix.roles.find((role) => activity.assignments[role.id] === 'A').id
    activity.assignments[roleId] = 'C'
  }).some((error) => /exactly one accountable role/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.raciMatrix.activities = [] })
    .some((error) => /RACI matrix needs at least five activities/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.scalingGateChecklist.decision = 'scale' })
    .some((error) => /cannot recommend scale while a blocking gate/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    lesson.scalingGateChecklist.gates.find((gate) => gate.blocking && gate.status === 'pass').status = 'fail'
  }).some((error) => /blocked gates must list every unmet blocking gate/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.scalingGateChecklist.gates.splice(5) })
    .some((error) => /scaling gate checklist needs at least six gates/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.mvpExperimentCanvas.successCriteria = [] })
    .some((error) => /needs at least three success criteria/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    for (const criterion of lesson.mvpExperimentCanvas.successCriteria) criterion.hardGate = false
  }).some((error) => /needs at least one hard gate/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.mvpExperimentCanvas.successCriteria[0].targetValue = lesson.mvpExperimentCanvas.successCriteria[0].baselineValue })
    .some((error) => /target must differ from baseline/i.test(error)))

  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].learnerAction })
    .some((error) => /timed case item 1.*learnerAction/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[0].microExamples[0].scope.comparisonCount += 1 })
    .some((error) => /timed case item 1.*workload.*durationMinutes/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.timeBudget.theory = 35 })
    .some((error) => /timing must remain eight units and 36 theory, 22 cases, 17 practice minutes/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[7].activities.pop() })
    .some((error) => /must retain nine one-output activities totaling 17 practice minutes/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[2].workedCases[0].durationMinutes = 3 })
    .some((error) => /learner-visible case minutes must total 22/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.units[2].workedCases[0].caseArtifact.confusion })
    .some((error) => /shadow case needs a confusion matrix/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[7].workedCases[0].caseArtifact.plants[1].readinessScore += 1 })
    .some((error) => /readiness score must equal its weighted criteria total/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[7].workedCases[0].caseArtifact.plants[3].eligible = true })
    .some((error) => /eligibility must follow the threshold and the hard gates/i.test(error)))

  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].expectedOutput })
    .some((error) => /timed case item 1.*expectedOutput/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].modelReasoning })
    .some((error) => /timed case item 1.*modelReasoning/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].decisionAid })
    .some((error) => /timed case item 1 needs a localized decision aid/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[0].microExamples[0].decisionAid.rows = [] })
    .some((error) => /timed case item 1 needs a localized decision aid/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    const row = lesson.riskRegister.rows[2]
    row.residualLikelihood = 5
    row.residualImpact = 5
    row.residualScore = 25
  }).some((error) => /controls must not increase the score/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    lesson.raciMatrix.activities[0].assignments['unknown-role'] = 'R'
  }).some((error) => /assigns unknown roles/i.test(error)))

  assert.ok(errorsFor((lesson) => {
    lesson.units[2].workedCases[0].caseArtifact.canvas = {
      ...lesson.mvpExperimentCanvas,
      id: 'divergent-canvas'
    }
  }).some((error) => /shadow case must reference the lesson MVP experiment canvas/i.test(error)))
  assert.ok(errorsFor((lesson) => {
    lesson.units[7].workedCases[0].caseArtifact.checklist = {
      ...lesson.scalingGateChecklist,
      id: 'divergent-checklist'
    }
  }).some((error) => /rollout case must reference the lesson scaling gate checklist/i.test(error)))
})

test('Module 5 governance validation is anchored to stable lesson identity', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  const lesson = structuredClone(mvpGovernanceLesson)
  delete lesson.riskRegister

  assert.ok(lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    dataAiLesson,
    llmAgentsLesson,
    lesson
  ]).some((error) => /Module 5 governance contract.*risk register is required/i.test(error)))
})

test('Module 5 cases connect shadow-mode evidence and rollout economics to a defensible decision', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  const workedCases = mvpGovernanceLesson.units.flatMap((unit) => unit.workedCases || [])
  assert.equal(workedCases.length, 2)

  const shadow = workedCases.find(({ id }) => id === 'shadow-mode-quality-assistant')
  assert.ok(shadow, 'shadow-mode quality assistant case must exist')
  assert.equal(shadow.hypothetical, true)
  assert.equal(shadow.publicContext, true)
  const evidence = shadow.caseArtifact.confusion
  const { truePositives, falsePositives, falseNegatives, trueNegatives } = evidence
  assert.equal(
    truePositives + falsePositives + falseNegatives + trueNegatives,
    shadow.caseArtifact.sampleSize
  )
  const precision = truePositives / (truePositives + falsePositives)
  const recall = truePositives / (truePositives + falseNegatives)
  assert.ok(Math.abs(shadow.caseArtifact.precision - precision) < 0.005)
  assert.ok(Math.abs(shadow.caseArtifact.recall - recall) < 0.005)
  assert.ok(shadow.caseArtifact.reviewQueuePerShift <= shadow.caseArtifact.reviewCapacityPerShift)
  assert.ok(shadow.decision.it && shadow.decision.en)
  assert.ok(shadow.tradeOff.it && shadow.tradeOff.en)

  const rollout = workedCases.find(({ id }) => id === 'plant-to-multi-plant-rollout')
  assert.ok(rollout, 'multi-plant rollout case must exist')
  const plants = rollout.caseArtifact.plants
  assert.ok(plants.length >= 3)
  for (const plant of plants) {
    assert.equal(
      plant.readinessScore,
      plant.criteria.reduce((total, criterion) => total + criterion.weight * criterion.score, 0)
    )
    assert.equal(
      plant.eligible,
      plant.readinessScore >= rollout.caseArtifact.readinessThreshold && plant.hardGatesPassed === true
    )
  }
  assert.deepEqual(
    rollout.caseArtifact.selectedPlantIds,
    plants.filter((plant) => plant.eligible).map(({ id }) => id)
  )
  assert.ok(plants.some((plant) => plant.hardGatesPassed === false && plant.eligible === false))
})

test('Module 5 trains controlled MVP, OT and AI security, oversight and refusal to scale', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  const answers = mvpGovernanceLesson.interviewAnswers
  assert.equal(answers.length, 4)
  for (const answer of answers) {
    assert.ok(answer.prompt.it && answer.prompt.en)
    assert.ok(countWords(answer.short.en) >= 60 && countWords(answer.short.en) <= 130)
    assert.ok(countWords(answer.long.en) >= 200)
    assert.ok(answer.followUps.length >= 2)
    assert.ok(answer.followUps.every((followUp) => followUp.it && followUp.en))
  }
  const englishPrompts = answers.map(({ prompt }) => prompt.en.toLowerCase())
  assert.ok(englishPrompts.some((prompt) => prompt.includes('mvp')))
  assert.ok(englishPrompts.some((prompt) => prompt.includes('secure')))
  assert.ok(englishPrompts.some((prompt) => prompt.includes('oversight')))
  assert.ok(englishPrompts.some((prompt) => prompt.includes('not to scale')))
})

test('Module 5 passes lesson-local validation with modules one to four', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  assert.deepEqual(lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    dataAiLesson,
    llmAgentsLesson,
    mvpGovernanceLesson
  ]), [])
})

test('Module 5 Italian copy elides articles before vowels', () => {
  assert.ok(mvpGovernanceLesson, 'Module 5 content must exist')
  assert.doesNotMatch(
    JSON.stringify(mvpGovernanceLesson, (key, value) => key === 'en' ? undefined : value),
    missingItalianElision
  )
})

const MODULE_6_BOUNDARIES = [
  { id: 'layered-answer-architecture', estimatedMinutes: 9, timeAllocation: { theory: 4, cases: 2, practice: 3 } },
  { id: 'automation-prioritization-defence', estimatedMinutes: 9, timeAllocation: { theory: 2, cases: 5, practice: 2 } },
  { id: 'whiteboard-sensor-to-decision', estimatedMinutes: 9, timeAllocation: { theory: 2, cases: 5, practice: 2 } },
  { id: 'stakeholder-objection-handling', estimatedMinutes: 10, timeAllocation: { theory: 3, cases: 4, practice: 3 } },
  { id: 'english-answer-bank-core-distinctions', estimatedMinutes: 9, timeAllocation: { theory: 3, cases: 2, practice: 4 } },
  { id: 'english-delivery-followups-and-recovery', estimatedMinutes: 9, timeAllocation: { theory: 3, cases: 2, practice: 4 } },
  { id: 'twenty-minute-mock-first-half', estimatedMinutes: 10, timeAllocation: { theory: 1, cases: 3, practice: 6 } },
  { id: 'scoring-readiness-and-rapid-review', estimatedMinutes: 10, timeAllocation: { theory: 1, cases: 2, practice: 7 } }
]

const MODULE_6_TOPICS = [
  'ot-vs-it', 'mes-vs-scada', 'rag', 'agent', 'mcp', 'automation-selection',
  'mvp', 'kpi', 'risk', 'human-oversight', 'scaling'
]

const MODULE_6_RUBRIC_CRITERIA = [
  'structure', 'technical-accuracy', 'business-relevance',
  'concrete-example', 'trade-offs', 'english-clarity'
]

test('Module 6 has the approved identity, depth and practical portfolio', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  assert.equal(interviewLabLesson.id, 'interview-lab')
  assert.equal(interviewLabLesson.slug, 'interview-lab')
  assert.equal(interviewLabLesson.moduleNumber, 6)
  assert.equal(interviewLabLesson.durationMinutes, 75)
  assert.deepEqual(interviewLabLesson.timeBudget, { theory: 19, cases: 25, practice: 31 })
  assert.equal(interviewLabLesson.units.length, 8)
  assert.ok(theoryWords(interviewLabLesson, 'it') >= 3420)
  assert.ok(theoryWords(interviewLabLesson, 'en') >= 2907)
  assert.equal(countWorkedCases(interviewLabLesson), 2)
})

test('Module 6 keeps eight approved boundaries and reconciles every engaged minute', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  assert.deepEqual(
    interviewLabLesson.units.map(({ id, estimatedMinutes, timeAllocation }) => ({
      id,
      estimatedMinutes,
      timeAllocation
    })),
    MODULE_6_BOUNDARIES
  )

  let caseMinutes = 0
  let practiceMinutes = 0
  for (const unit of interviewLabLesson.units) {
    const caseItems = [
      ...(unit.microExamples || []),
      ...(unit.caseSegments || []),
      ...(unit.workedCases || [])
    ]
    const unitCaseMinutes = caseItems.reduce((total, item) => total + item.durationMinutes, 0)
    assert.equal(unitCaseMinutes, unit.timeAllocation.cases, `${unit.id} case minutes must be explicit`)
    const unitPracticeMinutes = (unit.activities || []).reduce((total, item) => total + item.durationMinutes, 0)
    assert.equal(unitPracticeMinutes, unit.timeAllocation.practice, `${unit.id} practice minutes must be explicit`)
    caseMinutes += unitCaseMinutes
    practiceMinutes += unitPracticeMinutes
  }
  assert.equal(caseMinutes, 25)
  assert.equal(practiceMinutes, 31)

  const timedItems = interviewLabLesson.units.flatMap((unit) => [
    ...(unit.microExamples || []),
    ...(unit.caseSegments || [])
  ])
  assert.equal(timedItems.length, 6)
  assert.equal(timedItems.reduce((total, item) => total + item.durationMinutes, 0), 15)
  for (const item of timedItems) {
    assert.ok(item.learnerAction?.it && item.learnerAction?.en, `${item.id} needs a learner action`)
    assert.ok(item.expectedOutput?.it && item.expectedOutput?.en, `${item.id} needs an expected output`)
    assert.ok(item.modelReasoning?.it && item.modelReasoning?.en, `${item.id} needs model reasoning`)
    assert.ok(item.responseFormat?.it && item.responseFormat?.en, `${item.id} needs a response format`)
    assert.ok(item.decisionAid?.columns?.length >= 2 && item.decisionAid?.rows?.length >= 2)
    assert.equal(item.scope.outputCount, 1)
    assert.equal(
      item.scope.decisionCount + item.scope.comparisonCount + item.scope.interpretationCount,
      item.durationMinutes,
      `${item.id} workload must justify its declared duration`
    )
  }
})

test('Module 6 rubric scores six criteria from zero to two with behavioral anchors', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const rubric = interviewLabLesson.answerRubric
  assert.deepEqual(rubric.criteria.map(({ id }) => id), MODULE_6_RUBRIC_CRITERIA)
  assert.equal(rubric.maxScore, 12)
  assert.equal(rubric.readinessThreshold, 10)
  assert.equal(
    rubric.maxScore,
    rubric.criteria.length * 2,
    'maximum score must be derived from the criteria count'
  )
  for (const criterion of rubric.criteria) {
    assert.ok(criterion.name?.it && criterion.name?.en)
    assert.deepEqual(criterion.anchors.map(({ score }) => score), [0, 1, 2])
    for (const anchor of criterion.anchors) {
      assert.ok(anchor.description?.it && anchor.description?.en, `${criterion.id} anchor ${anchor.score} needs a description`)
    }
  }
})

test('Module 6 twenty-minute simulation is complete, timed and reconstructable', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const mock = interviewLabLesson.mockInterviewSimulation
  assert.equal(mock.totalMinutes, 20)
  assert.equal(mock.segments.reduce((total, segment) => total + segment.durationMinutes, 0), 20)
  assert.equal(new Set(mock.segments.map(({ id }) => id)).size, mock.segments.length)
  assert.equal(mock.withoutNotes, true)
  for (const segment of mock.segments) {
    assert.ok(segment.question?.it && segment.question?.en, `${segment.id} needs a localized question`)
    assert.ok(segment.expectedPoints.length >= 2)
    assert.ok(segment.expectedPoints.every((point) => point.it && point.en))
    assert.ok(['unit-7', 'unit-8'].includes(segment.unitRef))
  }
  const perUnit = (unitRef) => mock.segments
    .filter((segment) => segment.unitRef === unitRef)
    .reduce((total, segment) => total + segment.durationMinutes, 0)
  assert.equal(perUnit('unit-7'), interviewLabLesson.units[6].estimatedMinutes)
  assert.equal(perUnit('unit-8'), interviewLabLesson.units[7].estimatedMinutes)
  assert.deepEqual(
    [...new Set(mock.segments.flatMap(({ topicIds }) => topicIds))].sort(),
    [...MODULE_6_TOPICS].sort()
  )
})

test('Module 6 readiness is derived from rubric scores and the unaided mock', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const tracker = interviewLabLesson.readinessTracker
  assert.equal(tracker.threshold, 10)
  assert.deepEqual(tracker.entries.map(({ topicId }) => topicId).sort(), [...MODULE_6_TOPICS].sort())
  for (const entry of tracker.entries) {
    assert.deepEqual(Object.keys(entry.scores).sort(), [...MODULE_6_RUBRIC_CRITERIA].sort())
    assert.ok(Object.values(entry.scores).every((score) => [0, 1, 2].includes(score)))
    assert.equal(
      entry.total,
      Object.values(entry.scores).reduce((sum, score) => sum + score, 0),
      `${entry.topicId} total must equal the sum of its criteria`
    )
    assert.equal(
      entry.ready,
      entry.total >= tracker.threshold && tracker.mockCompletedWithoutNotes === true,
      `${entry.topicId} readiness must be derived`
    )
    assert.ok(entry.gapAction?.it && entry.gapAction?.en)
  }
  assert.ok(tracker.entries.some((entry) => entry.ready === false), 'the tracker must model an unmet topic')
  assert.deepEqual(
    tracker.notReadyTopicIds.slice().sort(),
    tracker.entries.filter((entry) => !entry.ready).map(({ topicId }) => topicId).sort()
  )
})

test('Module 6 rapid review sheet covers every priority topic in both languages', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const sheet = interviewLabLesson.rapidReviewSheet
  assert.deepEqual(sheet.entries.map(({ topicId }) => topicId).sort(), [...MODULE_6_TOPICS].sort())
  for (const entry of sheet.entries) {
    assert.ok(entry.headline?.it && entry.headline?.en)
    assert.ok(entry.trap?.it && entry.trap?.en, `${entry.topicId} needs the common trap`)
    assert.ok(countWords(entry.headline.en) <= 40)
  }
})

test('Module 6 answer bank trains every priority topic with short and extended forms', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const answers = interviewLabLesson.interviewAnswers
  assert.equal(answers.length, MODULE_6_TOPICS.length)
  assert.deepEqual(answers.map(({ topicId }) => topicId).sort(), [...MODULE_6_TOPICS].sort())
  for (const answer of answers) {
    assert.ok(answer.prompt.it && answer.prompt.en)
    assert.ok(countWords(answer.short.en) >= 55 && countWords(answer.short.en) <= 130, `${answer.topicId} short answer must fit thirty seconds`)
    assert.ok(countWords(answer.long.en) >= 150, `${answer.topicId} extended answer must fit two minutes`)
    assert.ok(answer.followUps.length >= 2)
    assert.ok(answer.followUps.every((followUp) => followUp.it && followUp.en))
  }
})

test('Module 6 identity-anchored validator rejects mutations to the lab contracts', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const errorsFor = (mutate) => {
    const lesson = structuredClone(interviewLabLesson)
    mutate(lesson)
    return lessonLocalErrors([
      digitalTransformationLesson,
      architectureLesson,
      dataAiLesson,
      llmAgentsLesson,
      mvpGovernanceLesson,
      lesson
    ])
  }

  assert.ok(errorsFor((lesson) => { delete lesson.answerRubric })
    .some((error) => /answer rubric is required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.mockInterviewSimulation })
    .some((error) => /mock interview simulation is required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.readinessTracker })
    .some((error) => /readiness tracker is required/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.rapidReviewSheet })
    .some((error) => /rapid review sheet is required/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.answerRubric.criteria.pop() })
    .some((error) => /rubric must retain the six approved criteria/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.answerRubric.maxScore = 10 })
    .some((error) => /maximum score must equal twice the criteria count/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.answerRubric.criteria[0].anchors.shift() })
    .some((error) => /needs anchors for scores 0, 1 and 2/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.mockInterviewSimulation.segments[0].durationMinutes += 1 })
    .some((error) => /simulation segments must total 20 minutes/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.mockInterviewSimulation.segments.pop() })
    .some((error) => /simulation must cover every priority topic/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.mockInterviewSimulation.withoutNotes = false })
    .some((error) => /simulation must be completed without notes/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.readinessTracker.entries[0].total += 1 })
    .some((error) => /total must equal the sum of its rubric scores/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.readinessTracker.entries[0].ready = !lesson.readinessTracker.entries[0].ready })
    .some((error) => /readiness must be derived from the threshold and the unaided mock/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.readinessTracker.notReadyTopicIds = [] })
    .some((error) => /not-ready topics must list every entry below the threshold/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.readinessTracker.entries.pop() })
    .some((error) => /readiness tracker must cover every priority topic/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.rapidReviewSheet.entries.pop() })
    .some((error) => /rapid review sheet must cover every priority topic/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.rapidReviewSheet.entries[0].trap })
    .some((error) => /needs a localized common trap/i.test(error)))

  assert.ok(errorsFor((lesson) => { lesson.timeBudget.practice = 30 })
    .some((error) => /timing must remain eight units and 19 theory, 25 cases, 31 practice minutes/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.units[0].activities.pop() })
    .some((error) => /must retain thirteen one-output activities totaling 31 practice minutes/i.test(error)))
  assert.ok(errorsFor((lesson) => { delete lesson.units[0].microExamples[0].learnerAction })
    .some((error) => /timed case item 1.*learnerAction/i.test(error)))
  assert.ok(errorsFor((lesson) => { lesson.interviewAnswers.pop() })
    .some((error) => /answer bank must cover every priority topic/i.test(error)))
})

test('Module 6 lab validation is anchored to stable lesson identity', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  const lesson = structuredClone(interviewLabLesson)
  delete lesson.answerRubric

  assert.ok(lessonLocalErrors([
    digitalTransformationLesson,
    architectureLesson,
    dataAiLesson,
    llmAgentsLesson,
    mvpGovernanceLesson,
    lesson
  ]).some((error) => /Module 6 interview lab contract.*answer rubric is required/i.test(error)))
})

test('Module 6 Italian copy elides articles before vowels', () => {
  assert.ok(interviewLabLesson, 'Module 6 content must exist')
  assert.doesNotMatch(
    JSON.stringify(interviewLabLesson, (key, value) => key === 'en' ? undefined : value),
    missingItalianElision
  )
})

test('the assembled six-module curriculum reaches exactly 420 minutes and the depth floor', () => {
  const lessons = [
    digitalTransformationLesson,
    architectureLesson,
    dataAiLesson,
    llmAgentsLesson,
    mvpGovernanceLesson,
    interviewLabLesson
  ]
  assert.ok(lessons.every(Boolean), 'every module must exist')
  assert.deepEqual(lessons.map(({ id }) => id), [
    'digital-transformation', 'ot-it-ai-cloud', 'data-ai-use-cases',
    'llm-agents', 'mvp-governance', 'interview-lab'
  ])
  assert.equal(lessons.reduce((total, lesson) => total + lesson.durationMinutes, 0), 420)
  assert.equal(
    lessons.reduce((total, lesson) => total + lesson.timeBudget.cases + lesson.timeBudget.practice, 0),
    231
  )
  const italianWords = lessons.reduce((total, lesson) => total + theoryWords(lesson, 'it'), 0)
  const englishWords = lessons.reduce((total, lesson) => total + theoryWords(lesson, 'en'), 0)
  assert.ok(italianWords >= 34020, `Italian theory words must reach 34020, received ${italianWords}`)
  assert.ok(englishWords >= italianWords * 0.85)
  assert.deepEqual(validateCurriculum(lessons, sources), [])
})

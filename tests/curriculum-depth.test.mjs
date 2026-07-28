import test from 'node:test'
import assert from 'node:assert/strict'
import { countWords, validateCurriculum } from '../public/content/schema.js'
import { digitalTransformationLesson } from '../public/content/module-1-transformation.js'
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
  const wholeCurriculumErrors = [
    'Curriculum requires exactly 6 lessons',
    'Curriculum planned duration must equal 420 minutes',
    'Curriculum cases and practice must equal 231 minutes',
    'Curriculum Italian theory must contain at least 34000 words'
  ]
  const lessonLocalErrors = validateCurriculum([digitalTransformationLesson], sources)
    .filter((error) => !wholeCurriculumErrors.some((prefix) => error.startsWith(prefix)))

  assert.deepEqual(lessonLocalErrors, [])
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
})

test('Module 1 contains all required interview prompts with short and extended answers', () => {
  assert.deepEqual(digitalTransformationLesson.interviewAnswers.map(({ prompt }) => prompt), [
    'How do you decide which processes to automate?',
    'Can you give me an example of applying digital transformation in manufacturing?',
    'How do you distinguish a technology project from transformation?'
  ])
  for (const answer of digitalTransformationLesson.interviewAnswers) {
    assert.ok(countWords(answer.short) >= 50)
    assert.ok(countWords(answer.long) >= 180)
  }
})

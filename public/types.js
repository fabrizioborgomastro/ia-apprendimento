/**
 * @typedef {'not_started'|'in_progress'|'completed'} LessonStatus
 * @typedef {{english:string, italian:string, definition:string}} GlossaryTerm
 * @typedef {{prompt:string, hint:string}} Activity
 * @typedef {{id:string, eyebrow:string, title:string, minutes:number, body:string[], keyPoints:string[], formula?:string, diagram?:string[], activity?:Activity}} ContentBlock
 * @typedef {{id:string, type:'single', prompt:string, options:string[], correctOption:number, explanation:string}} Quiz
 * @typedef {{prompt:string, short:string, long:string}} InterviewAnswer
 * @typedef {{id:string, slug:string, order:number, title:string, englishTitle:string, durationMinutes:number, prerequisites:string[], masteryThreshold:number, objectives:string[], competencies:string[], blocks:ContentBlock[], glossary:GlossaryTerm[], quiz:Quiz[], interview:InterviewAnswer}} Lesson
 * @typedef {{lessonId:string, status:LessonStatus, cursor:number, bestScore:number, reviewQuestionIds:string[], updatedAt:string}} LearningProgress
 * @typedef {{it:string, en:string}} LocalizedText
 * @typedef {{title:string, organization:string, type:'primary'|'educational', url:string, accessedAt:string, publicationDate?:string, verifiedAgainst?:string[]}} CurriculumSource
 * @typedef {{it:string, en:string, explanation:LocalizedText}} CheckpointOption
 * @typedef {{prompt:LocalizedText, options:CheckpointOption[], correctOption:number}} Checkpoint
 * @typedef {{decision:LocalizedText, inputs:LocalizedText[], owner:LocalizedText}} GembaDecision
 * @typedef {{condition:LocalizedText, response:LocalizedText, owner:LocalizedText}} GembaException
 * @typedef {{role:LocalizedText, outcome:LocalizedText, risk:LocalizedText}} GembaStakeholder
 * @typedef {{decisions:GembaDecision[], exceptions:GembaException[], stakeholders:GembaStakeholder[]}} GembaSolutionArtifact
 * @typedef {{theory:number, cases:number, practice:number}} UnitTimeAllocation
 * @typedef {{prompt:LocalizedText, short:LocalizedText, long:LocalizedText, followUps:LocalizedText[]}} ProfessionalAnswer
 * @typedef {{id:string, source:LocalizedText, destination:LocalizedText, interface:LocalizedText, dataOwner:LocalizedText, latencyBudgetMs:number, securityBoundaryCrossing:LocalizedText, monitoring:LocalizedText, degradedBehavior:LocalizedText, fallback:LocalizedText, humanAction:LocalizedText}} ConduitSolutionRow
 * @typedef {{tagCount:number, bytesPerSample:number, samplesPerSecond:number, bufferSeconds:number, requiredBytes:number, requiredGigabytes:number, marginFactor:number, provisionedGigabytes:number, formula:LocalizedText}} CapacityCalculation
 * @typedef {{conduits:ConduitSolutionRow[], capacityCalculation:CapacityCalculation}} ConduitSolutionArtifact
 * @typedef {{outputCount:number, decisionCount:number, calculationCount:number, providedContext:LocalizedText, responseFormat:LocalizedText}} QuickTaskScope
 * @typedef {{prompt:LocalizedText, hints?:LocalizedText[], durationMinutes?:number, quickTask?:QuickTaskScope, solution?:LocalizedText, modelSolution?:LocalizedText, solutionArtifact?:GembaSolutionArtifact|ConduitSolutionArtifact, rubric:LocalizedText[]}} LearningActivity
 * @typedef {{title:LocalizedText, explanation:LocalizedText, durationMinutes?:number}} MicroExample
 * @typedef {{id:string, title:LocalizedText, scenario:LocalizedText, durationMinutes:number}} CaseSegment
 * @typedef {{title:LocalizedText, scenario:LocalizedText, durationMinutes?:number, assumptions?:LocalizedText, reasoning:LocalizedText, decision:LocalizedText, tradeOff:LocalizedText, outcome:LocalizedText, followUps?:LocalizedText[], caseArtifact?:object, pmiCase?:boolean, hypothetical?:boolean, publicContext?:boolean}} WorkedCase
 * @typedef {{title:LocalizedText, description:LocalizedText}} ProfessionalArtifact
 * @typedef {{1:LocalizedText, 3:LocalizedText, 5:LocalizedText}} ScoreAnchors
 * @typedef {{id:string, weight:number, label:LocalizedText, anchors:ScoreAnchors, intermediateScorePolicy:LocalizedText}} ReadinessCriterion
 * @typedef {{id:string, sourceId:string, documentId:string, observationDate:string, reviewDate:string, description:LocalizedText}} EvidenceReference
 * @typedef {{score:number, confidence:EvidenceConfidence, evidence:LocalizedText, rationale:LocalizedText, assumptions:LocalizedText[], evidenceReferences:EvidenceReference[]}} ReadinessAssessment
 * @typedef {{id:string, label:LocalizedText}} ReadinessHardGate
 * @typedef {{gateId:string, passed:boolean, evidence:LocalizedText, rationale:LocalizedText}} ReadinessHardGateCheck
 * @typedef {{status:string, owner:LocalizedText}} DecisionApproval
 * @typedef {{dissent:LocalizedText, approval:DecisionApproval, target:LocalizedText, budgetBoundary:LocalizedText, dependencies:LocalizedText[], guardrails:LocalizedText[], stopCriteria:LocalizedText[], reviewDate:string}} DecisionRecord
 * @typedef {{rubricVersion:string, assessmentDate:string, participants:{role:LocalizedText}[], decisionOwner:LocalizedText, budgetBoundary:LocalizedText, dependencies:LocalizedText[]}} ScorecardAudit
 * @typedef {{id:string, assessments:Record<string, ReadinessAssessment>, weightedScore:number, hardGateChecks:ReadinessHardGateCheck[], portfolioDecision:'selected'|'pilot'|'deferred'|'rejected', decisionRecord:DecisionRecord, recommendation:LocalizedText}} ReadinessCandidate
 * @typedef {{title:LocalizedText, description:LocalizedText, scale:LocalizedText, formula:LocalizedText, attainableScoreRange:{minimum:number, maximum:number}, audit:ScorecardAudit, criteria:ReadinessCriterion[], hardGates:ReadinessHardGate[], candidates:ReadinessCandidate[], recommendedCandidateId:string}} DataReadinessUseCaseArtifact
 * @typedef {'low'|'medium'|'high'} EvidenceConfidence
 * @typedef {{id:string, weight:number, label:LocalizedText, favorableAnchor:LocalizedText}} AutomationCriterion
 * @typedef {{score:number, confidence:EvidenceConfidence, evidence:LocalizedText, rationale:LocalizedText}} AutomationAssessment
 * @typedef {{id:string, title:LocalizedText, rule:LocalizedText, blocking:boolean}} AutomationHardGate
 * @typedef {{gateId:string, passed:boolean, evidence:LocalizedText, rationale:LocalizedText}} AutomationHardGateCheck
 * @typedef {'selected'|'deferred'|'rejected'} PortfolioDecision
 * @typedef {{id:string, candidate:LocalizedText, evidenceBasis:LocalizedText, assessments:Record<string, AutomationAssessment>, hardGateChecks:AutomationHardGateCheck[], weightedScore:number, failedHardGateIds:string[], recommendation:LocalizedText, portfolioDecision:PortfolioDecision}} AutomationCandidate
 * @typedef {{scale:LocalizedText, formula:LocalizedText, evidencePolicy:LocalizedText, criteria:AutomationCriterion[], hardGates:AutomationHardGate[], recommendedCandidateId:string, candidates:AutomationCandidate[]}} AutomationDecisionMatrix
 * @typedef {{id:string, order:number, sourceId:string, destinationId:string, source:LocalizedText, destination:LocalizedText, interface:LocalizedText, latencyBudgetMs:number, cadence:LocalizedText, securityBoundaryCrossing:LocalizedText, dataOwner:LocalizedText, fallback:LocalizedText, humanAction:LocalizedText}} ArchitectureEdge
 * @typedef {{title:LocalizedText, description:LocalizedText, totalLatencyBudgetMs:number, edges:ArchitectureEdge[]}} SensorToDecisionArtifact
 * @typedef {{id:string, eyebrow:LocalizedText, title:LocalizedText, estimatedMinutes:number, timeAllocation:UnitTimeAllocation, theory:LocalizedText[], keyPoints:LocalizedText[], microExamples?:MicroExample[], caseSegments?:CaseSegment[], workedCases?:WorkedCase[], activities?:LearningActivity[], artifact?:ProfessionalArtifact, professionalArtifacts?:ProfessionalArtifact[], decisionMatrix?:AutomationDecisionMatrix, checkpoint:Checkpoint, sourceIds:string[]}} LearningUnit
 * @typedef {{id:string, slug:string, durationMinutes:number, timeBudget:{theory:number, cases:number, practice:number}, units:LearningUnit[], interviewAnswers:ProfessionalAnswer[], microExamples?:MicroExample[], workedCases?:WorkedCase[], activities?:LearningActivity[], artifact?:ProfessionalArtifact, professionalArtifacts?:ProfessionalArtifact[], sensorToDecisionArtifact?:SensorToDecisionArtifact, dataReadinessUseCaseArtifact?:DataReadinessUseCaseArtifact}} BilingualLesson
 * @typedef {{lessonId:string, status:LessonStatus, cursor:number, bestScore:number, reviewQuestionIds:string[], updatedAt:string, contentVersion:number}} VersionedLearningProgress
 */

export {}

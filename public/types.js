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
 * @typedef {{title:string, organization:string, type:'primary'|'educational', url:string, accessedAt:string, verifiedAgainst?:string[]}} CurriculumSource
 * @typedef {{it:string, en:string, explanation:LocalizedText}} CheckpointOption
 * @typedef {{prompt:LocalizedText, options:CheckpointOption[], correctOption:number}} Checkpoint
 * @typedef {{decision:LocalizedText, inputs:LocalizedText[], owner:LocalizedText}} GembaDecision
 * @typedef {{condition:LocalizedText, response:LocalizedText, owner:LocalizedText}} GembaException
 * @typedef {{role:LocalizedText, outcome:LocalizedText, risk:LocalizedText}} GembaStakeholder
 * @typedef {{decisions:GembaDecision[], exceptions:GembaException[], stakeholders:GembaStakeholder[]}} GembaSolutionArtifact
 * @typedef {{prompt:LocalizedText, hints:LocalizedText[], solution?:LocalizedText, modelSolution?:LocalizedText, solutionArtifact?:GembaSolutionArtifact, rubric:LocalizedText[]}} LearningActivity
 * @typedef {{title:LocalizedText, explanation:LocalizedText}} MicroExample
 * @typedef {{title:LocalizedText, scenario:LocalizedText, reasoning:LocalizedText, decision:LocalizedText, tradeOff:LocalizedText, outcome:LocalizedText, pmiCase?:boolean, hypothetical?:boolean, publicContext?:boolean}} WorkedCase
 * @typedef {{title:LocalizedText, description:LocalizedText}} ProfessionalArtifact
 * @typedef {'low'|'medium'|'high'} EvidenceConfidence
 * @typedef {{id:string, weight:number, label:LocalizedText, favorableAnchor:LocalizedText}} AutomationCriterion
 * @typedef {{score:number, confidence:EvidenceConfidence, evidence:LocalizedText, rationale:LocalizedText}} AutomationAssessment
 * @typedef {{id:string, title:LocalizedText, rule:LocalizedText, blocking:boolean}} AutomationHardGate
 * @typedef {{gateId:string, passed:boolean, evidence:LocalizedText, rationale:LocalizedText}} AutomationHardGateCheck
 * @typedef {'selected'|'deferred'|'rejected'} PortfolioDecision
 * @typedef {{id:string, candidate:LocalizedText, evidenceBasis:LocalizedText, assessments:Record<string, AutomationAssessment>, hardGateChecks:AutomationHardGateCheck[], weightedScore:number, failedHardGateIds:string[], recommendation:LocalizedText, portfolioDecision:PortfolioDecision}} AutomationCandidate
 * @typedef {{scale:LocalizedText, formula:LocalizedText, evidencePolicy:LocalizedText, criteria:AutomationCriterion[], hardGates:AutomationHardGate[], recommendedCandidateId:string, candidates:AutomationCandidate[]}} AutomationDecisionMatrix
 * @typedef {{id:string, eyebrow:LocalizedText, title:LocalizedText, estimatedMinutes:number, theory:LocalizedText[], keyPoints:LocalizedText[], microExamples?:MicroExample[], workedCases?:WorkedCase[], activities?:LearningActivity[], artifact?:ProfessionalArtifact, professionalArtifacts?:ProfessionalArtifact[], decisionMatrix?:AutomationDecisionMatrix, checkpoint:Checkpoint, sourceIds:string[]}} LearningUnit
 * @typedef {{id:string, slug:string, durationMinutes:number, timeBudget:{theory:number, cases:number, practice:number}, units:LearningUnit[], interviewAnswers:{prompt:string, short:string, long:string}[], microExamples?:MicroExample[], workedCases?:WorkedCase[], activities?:LearningActivity[], artifact?:ProfessionalArtifact, professionalArtifacts?:ProfessionalArtifact[]}} BilingualLesson
 * @typedef {{lessonId:string, status:LessonStatus, cursor:number, bestScore:number, reviewQuestionIds:string[], updatedAt:string, contentVersion:number}} VersionedLearningProgress
 */

export {}

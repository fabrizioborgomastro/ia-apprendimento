import { CONTENT_VERSION } from './schema.js'
import { sources, sourceById } from './sources.js'
import { digitalTransformationLesson } from './module-1-transformation.js'
import { architectureLesson } from './module-2-architecture.js'
import { dataAiLesson } from './module-3-data-ai.js'
import { llmAgentsLesson } from './module-4-llm-agents.js'
import { mvpGovernanceLesson } from './module-5-mvp-governance.js'
import { interviewLabLesson } from './module-6-interview-lab.js'

export { CONTENT_VERSION, sources, sourceById }

/**
 * The authoritative curriculum order. Lesson IDs and slugs are stable and must
 * never change, because they are the progress keys stored locally and in Supabase.
 * @type {import('../types.js').Lesson[]}
 */
export const curriculum = [
  digitalTransformationLesson,
  architectureLesson,
  dataAiLesson,
  llmAgentsLesson,
  mvpGovernanceLesson,
  interviewLabLesson
]

const LEGACY_MASTERY_THRESHOLD = 80

const italian = (value) => (typeof value === 'string' ? value : value?.it || '')
const english = (value) => (typeof value === 'string' ? value : value?.en || '')

function legacyGlossaryEntry(term) {
  const englishText = english(term)
  const italianText = italian(term)
  const separator = englishText.indexOf(':')
  return {
    english: separator === -1 ? englishText : englishText.slice(0, separator).trim(),
    italian: italianText.slice(0, italianText.indexOf(':') === -1 ? undefined : italianText.indexOf(':')).trim(),
    definition: italianText.indexOf(':') === -1 ? italianText : italianText.slice(italianText.indexOf(':') + 1).trim()
  }
}

function legacyQuizQuestion(checkpoint, lessonId, index) {
  const options = (checkpoint?.options || [])
  return {
    id: `${lessonId}-check-${index + 1}`,
    type: 'single',
    prompt: italian(checkpoint?.prompt),
    options: options.map((option) => italian(option)),
    correctOption: checkpoint?.correctOption ?? 0,
    explanation: italian(options[checkpoint?.correctOption ?? 0]?.explanation)
  }
}

/**
 * Projects a bilingual lesson into the Italian block shape the current renderer
 * still expects. This adapter is temporary: Task 11 renders `units` directly and
 * the projection is removed once its end-to-end checks pass.
 */
export function withLegacyProjection(lesson) {
  const units = lesson.units || []
  return {
    ...lesson,
    order: lesson.order ?? lesson.moduleNumber,
    title: italian(lesson.title),
    englishTitle: english(lesson.title),
    prerequisites: lesson.prerequisites || [],
    competencies: lesson.competencies || [],
    masteryThreshold: lesson.masteryThreshold ?? LEGACY_MASTERY_THRESHOLD,
    objectives: (lesson.outcomes?.length
      ? lesson.outcomes
      : units.map((unit) => unit.objective).filter(Boolean)
    ).map(italian),
    blocks: units.map((unit) => ({
      id: unit.id,
      eyebrow: italian(unit.eyebrow),
      title: italian(unit.title),
      minutes: unit.estimatedMinutes,
      body: (unit.theory || []).map(italian),
      keyPoints: (unit.keyPoints || []).map(italian),
      ...(unit.diagram?.nodes ? { diagram: unit.diagram.nodes.map((node) => italian(node.label)) } : {}),
      ...(unit.activities?.[0] ? {
        activity: {
          prompt: italian(unit.activities[0].prompt),
          hint: italian(unit.activities[0].hints?.[0])
        }
      } : {})
    })),
    glossary: units
      .flatMap((unit) => unit.terminology || [])
      .map(legacyGlossaryEntry)
      .filter((entry) => entry.english && entry.definition),
    quiz: (lesson.finalQuiz || []).map((checkpoint, index) => legacyQuizQuestion(checkpoint, lesson.id, index)),
    interview: {
      prompt: english(lesson.interviewAnswers?.[0]?.prompt),
      short: english(lesson.interviewAnswers?.[0]?.short),
      long: english(lesson.interviewAnswers?.[0]?.long)
    }
  }
}

/** @type {import('../types.js').Lesson[]} */
export const lessons = curriculum.map(withLegacyProjection)

export const interviewQuestions = lessons.flatMap((lesson) => (
  (lesson.interviewAnswers || []).map((answer, index) => ({
    lessonId: lesson.id,
    answerId: answer.topicId || `${lesson.id}-answer-${index + 1}`,
    topic: lesson.englishTitle,
    prompt: english(answer.prompt),
    short: english(answer.short),
    long: english(answer.long),
    followUps: (answer.followUps || []).map(english)
  }))
))

export const allGlossary = lessons.flatMap((lesson) => (
  lesson.glossary.map((entry) => ({ ...entry, lessonId: lesson.id }))
))

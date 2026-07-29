import { CONTENT_VERSION, QUESTIONS_PER_UNIT, TOTAL_QUESTIONS, TOTAL_UNITS, UNITS_PER_LESSON } from './schema.js'
import { sources, sourceById } from './sources.js'
import { buildGlossary, confusedPairs } from './glossary.js'
import { interviewAnswers } from './interview.js'
import { trasformazioneLesson } from './modulo-1-trasformazione.js'
import { fabbricaDigitaleLesson } from './modulo-2-fabbrica-digitale.js'
import { scegliereStrumentoLesson } from './modulo-3-scegliere-strumento.js'
import { inProduzioneLesson } from './modulo-4-in-produzione.js'
import { governareScalareLesson } from './modulo-5-governare-scalare.js'

export {
  CONTENT_VERSION, QUESTIONS_PER_UNIT, TOTAL_QUESTIONS, TOTAL_UNITS, UNITS_PER_LESSON,
  sources, sourceById, confusedPairs, interviewAnswers
}

/**
 * The authoritative course order. Lesson IDs and slugs are stable and must never
 * change, because they are the progress keys stored locally and in Supabase.
 * @type {import('../types.js').Lesson[]}
 */
export const curriculum = [
  trasformazioneLesson,
  fabbricaDigitaleLesson,
  scegliereStrumentoLesson,
  inProduzioneLesson,
  governareScalareLesson
]

export const lessons = curriculum

/** Every quiz question of the course, in reading order. */
export const allQuestions = curriculum.flatMap((lesson) => (
  lesson.units.flatMap((unit) => unit.quiz.map((question) => ({
    ...question,
    lessonId: lesson.id,
    unitId: unit.id
  })))
))

const questionsById = new Map(allQuestions.map((question) => [question.id, question]))

export function questionById(id) {
  return questionsById.get(id)
}

/**
 * The module checkpoint is not a second set of questions: it is the one question
 * per unit the author flagged as the one worth remembering. Reusing them keeps
 * the review queue pointing at content the reader has already seen.
 */
export function finalQuiz(lesson) {
  return lesson.units
    .map((unit) => unit.quiz.find((question) => question.final))
    .filter(Boolean)
    .map((question) => ({ ...question, lessonId: lesson.id }))
}

export const glossary = buildGlossary(curriculum)

/** The seven steps, the thread that runs through every unit. */
export const stages = [
  { number: 1, it: 'Osservo una perdita concreta in produzione', en: 'I watch a real loss in production' },
  { number: 2, it: 'Misuro il punto di partenza', en: 'I measure the starting point' },
  { number: 3, it: 'Capisco dove nascono i dati e chi decide oggi', en: 'I understand where the data is born and who decides today' },
  { number: 4, it: 'Scelgo lo strumento più semplice che risolve', en: 'I pick the simplest tool that solves it' },
  { number: 5, it: 'Provo in piccolo, senza rischi', en: 'I try it small, with no risk' },
  { number: 6, it: 'Metto in produzione con rete di sicurezza', en: 'I go live with a safety net' },
  { number: 7, it: 'Decido se estendere o fermarmi', en: 'I decide whether to scale or to stop' }
]

export function lessonBySlug(slug) {
  return curriculum.find((lesson) => lesson.slug === slug)
}

export function unitById(lesson, unitId) {
  return lesson?.units?.find((unit) => unit.id === unitId)
}

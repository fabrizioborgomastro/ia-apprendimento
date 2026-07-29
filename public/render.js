import { isUnitComplete, selectLocale, unitPath } from './ui.js?v=9'
import { sources } from './content/index.js'

const COPY = {
  it: {
    unitOf: (index, total) => `Unità ${index} di ${total}`,
    index: 'Unità della lezione',
    unitsInModule: 'Unità di questo modulo',
    unitCounter: (position, total) => `${position} di ${total}`,
    controls: 'Spostamento tra le unità',
    progress: 'Avanzamento nella lezione',
    objective: 'Obiettivo',
    keyPoints: 'Punti chiave',
    terminology: 'Terminologia',
    examples: 'Esempi e casi',
    scenario: 'Scenario',
    yourTask: 'Il tuo compito',
    expectedOutput: 'Output atteso',
    responseFormat: 'Formato della risposta',
    decisionAid: 'Dati per decidere',
    showReasoning: 'Mostra il ragionamento',
    reasoning: 'Ragionamento del modello',
    assumptions: 'Assunzioni',
    analysis: 'Analisi',
    decision: 'Decisione',
    tradeOff: 'Trade-off',
    outcome: 'Esito',
    followUps: 'Domande di approfondimento',
    artifact: 'Artefatto professionale',
    activity: 'Attività',
    activityOf: (minutes) => `${minutes} min`,
    providedContext: 'Contesto fornito',
    showHint: 'Mostra un indizio',
    showSolution: 'Mostra la soluzione',
    showRubric: 'Mostra la rubric',
    hint: 'Indizio',
    solution: 'Soluzione modello',
    rubric: 'Rubric',
    markDone: 'Ho svolto questa attività',
    marked: 'Attività svolta',
    checkpoint: 'Checkpoint',
    correct: 'Corretto',
    review: 'Da rivedere',
    sources: 'Fonti di questa unità',
    previous: 'Unità precedente',
    next: 'Unità successiva',
    finish: 'Vai al checkpoint finale',
    completeFirst: 'Rispondi al checkpoint e segna l’attività per completare l’unità.',
    unitDone: 'Unità completata',
    interview: 'Risposte da colloquio',
    shortAnswer: 'Risposta da 30 secondi',
    longAnswer: 'Risposta da 2 minuti'
  },
  en: {
    unitOf: (index, total) => `Unit ${index} of ${total}`,
    index: 'Lesson units',
    unitsInModule: 'Units in this module',
    unitCounter: (position, total) => `${position} of ${total}`,
    controls: 'Move between units',
    progress: 'Lesson progress',
    objective: 'Objective',
    keyPoints: 'Key points',
    terminology: 'Terminology',
    examples: 'Examples and cases',
    scenario: 'Scenario',
    yourTask: 'Your task',
    expectedOutput: 'Expected output',
    responseFormat: 'Response format',
    decisionAid: 'Decision data',
    showReasoning: 'Show the reasoning',
    reasoning: 'Model reasoning',
    assumptions: 'Assumptions',
    analysis: 'Analysis',
    decision: 'Decision',
    tradeOff: 'Trade-off',
    outcome: 'Outcome',
    followUps: 'Follow-up questions',
    artifact: 'Professional artifact',
    activity: 'Activity',
    activityOf: (minutes) => `${minutes} min`,
    providedContext: 'Provided context',
    showHint: 'Show a hint',
    showSolution: 'Show the model solution',
    showRubric: 'Show the rubric',
    hint: 'Hint',
    solution: 'Model solution',
    rubric: 'Rubric',
    markDone: 'I completed this activity',
    marked: 'Activity completed',
    checkpoint: 'Checkpoint',
    correct: 'Correct',
    review: 'Review this',
    sources: 'Sources for this unit',
    previous: 'Previous unit',
    next: 'Next unit',
    finish: 'Go to the final checkpoint',
    completeFirst: 'Answer the checkpoint and mark the activity to complete this unit.',
    unitDone: 'Unit completed',
    interview: 'Interview answers',
    shortAnswer: '30-second answer',
    longAnswer: '2-minute answer'
  }
}

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const copyFor = (locale) => COPY[locale] || COPY.it
const text = (value, locale) => escapeHtml(selectLocale(value, locale))

function renderList(items, locale, className) {
  if (!items?.length) return ''
  return `<ul class="${className}">${items.map((item) => `<li>${text(item, locale)}</li>`).join('')}</ul>`
}

function renderDecisionAid(decisionAid, locale, label) {
  if (!decisionAid?.columns?.length || !decisionAid?.rows?.length) return ''
  return `<div class="decision-aid"><table><caption>${label}</caption><thead><tr>${
    decisionAid.columns.map((column) => `<th scope="col">${text(column, locale)}</th>`).join('')
  }</tr></thead><tbody>${
    decisionAid.rows.map((row) => `<tr>${
      row.cells.map((cell, cellIndex) => (cellIndex === 0
        ? `<th scope="row">${text(cell, locale)}</th>`
        : `<td>${text(cell, locale)}</td>`)).join('')
    }</tr>`).join('')
  }</tbody></table></div>`
}

function renderTimedItem(item, locale) {
  const copy = copyFor(locale)
  const heading = item.title ? `<h3>${text(item.title, locale)}</h3>` : ''
  const intro = item.explanation || item.scenario
  return `<article class="timed-item" data-case-item="${escapeHtml(item.id)}">
    ${heading}<p class="item-duration">${escapeHtml(copy.activityOf(item.durationMinutes))}</p>
    ${intro ? `<p>${text(intro, locale)}</p>` : ''}
    ${item.learnerAction ? `<p class="learner-action"><b>${copy.yourTask}:</b> ${text(item.learnerAction, locale)}</p>` : ''}
    ${item.expectedOutput ? `<p><b>${copy.expectedOutput}:</b> ${text(item.expectedOutput, locale)}</p>` : ''}
    ${item.responseFormat ? `<p class="response-format"><b>${copy.responseFormat}:</b> ${text(item.responseFormat, locale)}</p>` : ''}
    ${renderDecisionAid(item.decisionAid, locale, copy.decisionAid)}
    ${item.modelReasoning ? `<details class="reveal"><summary>${copy.showReasoning}</summary><p><b>${copy.reasoning}:</b> ${text(item.modelReasoning, locale)}</p></details>` : ''}
  </article>`
}

function renderWorkedCase(workedCase, locale) {
  const copy = copyFor(locale)
  return `<article class="worked-case" data-worked-case="${escapeHtml(workedCase.id)}">
    <h3>${text(workedCase.title, locale)}</h3>
    <p class="item-duration">${escapeHtml(copy.activityOf(workedCase.durationMinutes))}</p>
    <p><b>${copy.scenario}:</b> ${text(workedCase.scenario, locale)}</p>
    ${workedCase.assumptions ? `<h4>${copy.assumptions}</h4>${renderList(workedCase.assumptions, locale, 'case-list')}` : ''}
    ${workedCase.analysisSteps ? `<h4>${copy.analysis}</h4>${renderList(workedCase.analysisSteps, locale, 'case-list')}` : ''}
    ${workedCase.reasoning ? `<p><b>${copy.reasoning}:</b> ${text(workedCase.reasoning, locale)}</p>` : ''}
    <p><b>${copy.decision}:</b> ${text(workedCase.decision, locale)}</p>
    <p><b>${copy.tradeOff}:</b> ${text(workedCase.tradeOff, locale)}</p>
    <p><b>${copy.outcome}:</b> ${text(workedCase.outcome, locale)}</p>
    ${workedCase.followUps ? `<h4>${copy.followUps}</h4>${renderList(workedCase.followUps, locale, 'case-list')}` : ''}
  </article>`
}

function renderArtifact(artifact, locale) {
  if (!artifact?.title || !artifact?.description) return ''
  const copy = copyFor(locale)
  return `<section class="unit-artifact" data-unit-artifact="${escapeHtml(artifact.id || '')}">
    <p class="eyebrow">${copy.artifact}</p>
    <h3>${text(artifact.title, locale)}</h3>
    <p>${text(artifact.description, locale)}</p>
  </section>`
}

function renderActivity(activity, locale, revealed, activityMarked) {
  const copy = copyFor(locale)
  const hint = activity.hints?.[0]
  const solution = activity.modelSolution || activity.solution
  const rubric = activity.rubric?.[0]
  return `<section class="learning-activity" data-learning-activity="${escapeHtml(activity.id)}">
    <p class="eyebrow">${copy.activity} · ${escapeHtml(copy.activityOf(activity.durationMinutes))}</p>
    <h3>${text(activity.prompt, locale)}</h3>
    ${activity.expectedArtifact ? `<p><b>${copy.expectedOutput}:</b> ${text(activity.expectedArtifact, locale)}</p>` : ''}
    ${activity.quickTask?.providedContext ? `<p><b>${copy.providedContext}:</b> ${text(activity.quickTask.providedContext, locale)}</p>` : ''}
    ${activity.quickTask?.responseFormat ? `<p class="response-format"><b>${copy.responseFormat}:</b> ${text(activity.quickTask.responseFormat, locale)}</p>` : ''}
    <div class="reveal-actions">
      ${hint ? `<button type="button" class="button secondary" data-reveal-toggle="hint" aria-pressed="${revealed.hint ? 'true' : 'false'}" aria-controls="reveal-hint">${copy.showHint}</button>` : ''}
      ${solution ? `<button type="button" class="button secondary" data-reveal-toggle="solution" aria-pressed="${revealed.solution ? 'true' : 'false'}" aria-controls="reveal-solution">${copy.showSolution}</button>` : ''}
      ${rubric ? `<button type="button" class="button secondary" data-reveal-toggle="rubric" aria-pressed="${revealed.rubric ? 'true' : 'false'}" aria-controls="reveal-rubric">${copy.showRubric}</button>` : ''}
    </div>
    ${hint && revealed.hint ? `<div class="reveal-panel" id="reveal-hint"><span>${copy.hint}</span><p>${text(hint, locale)}</p></div>` : ''}
    ${solution && revealed.solution ? `<div class="reveal-panel" id="reveal-solution"><span>${copy.solution}</span><p>${text(solution, locale)}</p></div>` : ''}
    ${rubric && revealed.rubric ? `<div class="reveal-panel" id="reveal-rubric"><span>${copy.rubric}</span><p>${text(rubric, locale)}</p></div>` : ''}
    <button type="button" class="button ${activityMarked ? 'primary' : 'secondary'} activity-mark" data-activity-mark aria-pressed="${activityMarked ? 'true' : 'false'}">${activityMarked ? copy.marked : copy.markDone}</button>
  </section>`
}

function renderCheckpoint(checkpoint, locale, checkpointChoice) {
  const copy = copyFor(locale)
  const answered = Number.isInteger(checkpointChoice)
  const correct = answered && checkpointChoice === checkpoint.correctOption
  return `<section class="unit-checkpoint" data-unit-checkpoint>
    <p class="eyebrow">${copy.checkpoint}</p>
    <h3>${text(checkpoint.prompt, locale)}</h3>
    <div class="checkpoint-options" role="group" aria-label="${copy.checkpoint}">
      ${checkpoint.options.map((option, index) => `<button type="button" data-checkpoint-option="${index}" aria-pressed="${checkpointChoice === index ? 'true' : 'false'}"${answered && index === checkpoint.correctOption ? ' data-correct-option' : ''}>${text(option, locale)}</button>`).join('')}
    </div>
    ${answered ? `<div class="checkpoint-feedback ${correct ? 'is-correct' : 'is-review'}" role="status" aria-live="polite"><b>${correct ? copy.correct : copy.review}</b><p>${text(checkpoint.options[checkpointChoice]?.explanation, locale)}</p></div>` : ''}
  </section>`
}

function renderSources(sourceIds, locale) {
  const copy = copyFor(locale)
  return `<footer class="unit-sources" data-unit-sources>
    <p class="eyebrow">${copy.sources}</p>
    <ul>${(sourceIds || []).map((sourceId) => {
      const source = sources[sourceId]
      if (!source) return `<li data-source="${escapeHtml(sourceId)}">${escapeHtml(sourceId)}</li>`
      return `<li data-source="${escapeHtml(sourceId)}"><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(source.title)}</a><small>${escapeHtml(source.organization)} · ${escapeHtml(sourceId)}</small></li>`
    }).join('')}</ul>
  </footer>`
}

function renderUnitIndex(lesson, state, locale) {
  const copy = copyFor(locale)
  return `<nav class="unit-index" data-unit-index aria-label="${copy.index}">
    <p class="unit-index-title"><span>${copy.unitsInModule}</span><b>${escapeHtml(copy.unitCounter(state.index + 1, state.total))}</b></p>
    <ol>${lesson.units.map((unit, index) => {
      const current = index === state.index
      return `<li><a href="${escapeHtml(unitPath(lesson.slug, unit.id))}" data-link${current ? ' aria-current="step"' : ''} class="${index < state.cursor ? 'is-complete' : ''}"><i>${index + 1}</i><span>${text(unit.title, locale)}</span></a></li>`
    }).join('')}</ol>
  </nav>`
}

export function renderUnitView({ lesson, state, locale, revealed = {}, checkpointChoice = null, activityMarked = false }) {
  const copy = copyFor(locale)
  const unit = state.unit
  const timedItems = [...(unit.microExamples || []), ...(unit.caseSegments || [])]
  const workedCases = unit.workedCases || []
  const activities = unit.activities || []
  const unitComplete = isUnitComplete({
    checkpointAnswered: Number.isInteger(checkpointChoice),
    activityMarked,
    hasActivity: activities.length > 0
  })

  return `<article class="lesson-unit shell">
    <header class="unit-header" data-unit-header>
      <a href="/sprint" data-link class="back-link">← ${escapeHtml(locale === 'en' ? 'All modules' : 'Tutti i moduli')}</a>
      <p class="unit-kicker"><span>${text(lesson.title, locale)}</span><span>${escapeHtml(copy.unitOf(state.index + 1, state.total))}</span><span>${escapeHtml(copy.activityOf(unit.estimatedMinutes))}</span></p>
      <h1>${text(unit.title, locale)}</h1>
      ${unit.objective ? `<p class="unit-objective"><b>${copy.objective}:</b> ${text(unit.objective, locale)}</p>` : ''}
      <div class="unit-progress" role="progressbar" aria-label="${copy.progress}" aria-valuemin="1" aria-valuemax="${state.total}" aria-valuenow="${state.index + 1}" aria-valuetext="${escapeHtml(copy.unitOf(state.index + 1, state.total))}"><span style="width:${Math.round(((state.index + 1) / state.total) * 100)}%"></span></div>
    </header>

    ${renderUnitIndex(lesson, state, locale)}

    <section class="unit-content" data-unit-content>
      ${(unit.theory || []).map((paragraph) => `<p>${text(paragraph, locale)}</p>`).join('')}
      ${unit.keyPoints?.length ? `<h3>${copy.keyPoints}</h3>${renderList(unit.keyPoints, locale, 'key-points')}` : ''}
      ${unit.terminology?.length ? `<h3>${copy.terminology}</h3>${renderList(unit.terminology, locale, 'terminology-list')}` : ''}
    </section>

    ${timedItems.length || workedCases.length ? `<section class="worked-example" data-worked-example>
      <p class="eyebrow">${copy.examples}</p>
      ${timedItems.map((item) => renderTimedItem(item, locale)).join('')}
      ${workedCases.map((workedCase) => renderWorkedCase(workedCase, locale)).join('')}
      ${workedCases.map((workedCase) => renderArtifact(workedCase.caseArtifact, locale)).join('')}
    </section>` : ''}

    ${activities.map((activity) => renderActivity(activity, locale, revealed, activityMarked)).join('')}

    ${renderCheckpoint(unit.checkpoint, locale, checkpointChoice)}

    ${renderSources(unit.sourceIds, locale)}

    <nav class="unit-controls" data-unit-controls aria-label="${copy.controls}">
      ${state.previous ? `<a class="button secondary" data-link data-unit-previous href="${escapeHtml(unitPath(lesson.slug, state.previous.id))}">← ${copy.previous}</a>` : '<span></span>'}
      <p class="unit-status" data-unit-status>${unitComplete ? `✓ ${copy.unitDone}` : copy.completeFirst}</p>
      ${state.next
        ? `<a class="button primary" data-link data-unit-next href="${escapeHtml(unitPath(lesson.slug, state.next.id))}">${copy.next} →</a>`
        : `<a class="button primary" data-lesson-finish href="#final-checkpoint">${copy.finish} →</a>`}
    </nav>
  </article>`
}

export function renderLessonInterviewAnswers(lesson, locale) {
  const copy = copyFor(locale)
  return `<section class="answer-lab" data-interview-answers>
    <p class="eyebrow">${copy.interview}</p>
    ${(lesson.interviewAnswers || []).map((answer, index) => `<article class="interview-answer" data-interview-answer="${escapeHtml(answer.topicId || index)}">
      <h3>${text(answer.prompt, locale)}</h3>
      <div class="answer-actions">
        <button type="button" class="button secondary" data-answer-toggle="${index}-short" aria-pressed="false">${copy.shortAnswer}</button>
        <button type="button" class="button secondary" data-answer-toggle="${index}-long" aria-pressed="false">${copy.longAnswer}</button>
      </div>
      <div class="model-answer" data-answer="${index}-short" hidden><span>${copy.shortAnswer}</span><p>${text(answer.short, locale)}</p></div>
      <div class="model-answer" data-answer="${index}-long" hidden><span>${copy.longAnswer}</span><p>${text(answer.long, locale)}</p></div>
      ${answer.followUps?.length ? `<details class="reveal"><summary>${copy.followUps}</summary>${renderList(answer.followUps, locale, 'case-list')}</details>` : ''}
    </article>`).join('')}
  </section>`
}

export function renderLocaleSwitch(locale) {
  return `<div class="locale-switch" role="group" aria-label="${locale === 'en' ? 'Language' : 'Lingua'}">
    <button type="button" data-locale="it" aria-pressed="${locale === 'it' ? 'true' : 'false'}">Italiano</button>
    <button type="button" data-locale="en" aria-pressed="${locale === 'en' ? 'true' : 'false'}">English</button>
  </div>`
}

const SHELL = {
  it: {
    navToday: 'Oggi', navSprint: 'Sprint', navReview: 'Ripasso', navInterview: 'Interview',
    heroEyebrow: '2-3 giorni · colloquio tecnico',
    heroTitle: 'Preparati a guidare<br><em>la trasformazione.</em>',
    heroLead: 'Dalla linea produttiva all’AI, con il linguaggio tecnico inglese che ti serve per ragionare ad alta voce.',
    heroCtaStart: 'Inizia lo sprint', heroCtaContinue: 'Continua lo sprint',
    signalPathLabel: 'Flusso dalla fabbrica alla decisione',
    nextMove: 'Prossima mossa', openLesson: 'Apri la lezione',
    readiness: 'Sprint readiness', ready: 'pronto',
    modulesDone: (done, total) => `${done} di ${total} moduli completati`,
    activeRecall: 'Active recall', questionsToReview: 'domande da ripassare', reviewNow: 'Ripassa ora',
    sprintEyebrow: 'Interview sprint',
    sprintTitle: 'Sei moduli. Un filo logico.',
    sprintLead: 'Puoi aprire qualunque modulo in qualsiasi momento. L’ordine è un consiglio, non un vincolo: seguilo una volta, poi torna solo sui punti deboli.',
    completed: 'completato',
    statusNext: 'Prossimo', statusOpen: 'Da fare', statusBest: 'Miglior punteggio',
    reviewTitle: 'Ripassa ciò che conta.',
    reviewLead: 'Gli errori non sono una penalità. Sono la lista esatta di ciò che devi rendere più solido.',
    questionsLabel: 'Domande da rivedere',
    showAnswer: 'Mostra risposta e spiegazione',
    emptyQueue: 'La coda è vuota.',
    emptyQueueHint: 'Completa i checkpoint finali oppure ripassa i termini inglesi qui accanto.',
    goToSprint: 'Vai allo sprint',
    glossaryLabel: 'Glossario · IT / EN', glossaryPlaceholder: 'Cerca PLC, drift, MVP...',
    noTerms: 'Nessun termine trovato.',
    interviewEyebrow: 'Prova da 20 minuti',
    interviewTitle: 'Think clearly.<br><em>Speak simply.</em>',
    interviewLead: 'Avvia il timer, rispondi ad alta voce e rivela il modello soltanto dopo.',
    answerCorrect: 'Corretto', answerReview: 'Da rivedere',
    startSimulation: 'Avvia simulazione', pauseSimulation: 'Pausa',
    resumeSimulation: 'Riprendi simulazione', restartSimulation: 'Ricomincia',
    timeOver: 'Tempo concluso. Valuta struttura, termini, metriche e rischi.',
    thirtySec: '30 sec', twoMin: '2 min'
  },
  en: {
    navToday: 'Today', navSprint: 'Sprint', navReview: 'Review', navInterview: 'Interview',
    heroEyebrow: '2-3 days · technical interview',
    heroTitle: 'Get ready to lead<br><em>the transformation.</em>',
    heroLead: 'From the production line to AI, with the technical English you need to reason out loud.',
    heroCtaStart: 'Start the sprint', heroCtaContinue: 'Continue the sprint',
    signalPathLabel: 'Flow from the shop floor to the decision',
    nextMove: 'Next move', openLesson: 'Open the lesson',
    readiness: 'Sprint readiness', ready: 'ready',
    modulesDone: (done, total) => `${done} of ${total} modules completed`,
    activeRecall: 'Active recall', questionsToReview: 'questions to review', reviewNow: 'Review now',
    sprintEyebrow: 'Interview sprint',
    sprintTitle: 'Six modules. One line of reasoning.',
    sprintLead: 'You can open any module at any time. The order is advice, not a constraint: follow it once, then return only to the weak spots.',
    completed: 'completed',
    statusNext: 'Next', statusOpen: 'Not started', statusBest: 'Best score',
    reviewTitle: 'Review what matters.',
    reviewLead: 'Mistakes are not a penalty. They are the exact list of what you still need to make solid.',
    questionsLabel: 'Questions to review',
    showAnswer: 'Show the answer and the explanation',
    emptyQueue: 'The queue is empty.',
    emptyQueueHint: 'Complete the final checkpoints or review the English terms beside this panel.',
    goToSprint: 'Go to the sprint',
    glossaryLabel: 'Glossary · IT / EN', glossaryPlaceholder: 'Search PLC, drift, MVP...',
    noTerms: 'No term found.',
    interviewEyebrow: '20-minute rehearsal',
    interviewTitle: 'Think clearly.<br><em>Speak simply.</em>',
    interviewLead: 'Start the timer, answer out loud, and reveal the model answer only afterwards.',
    answerCorrect: 'Correct', answerReview: 'Review this',
    startSimulation: 'Start the simulation', pauseSimulation: 'Pause',
    resumeSimulation: 'Resume the simulation', restartSimulation: 'Start again',
    timeOver: 'Time is up. Score structure, terminology, metrics, and risks.',
    thirtySec: '30 sec', twoMin: '2 min'
  }
}

export function shellCopy(locale) {
  return SHELL[locale] || SHELL.it
}

/** Localizes the static navigation that lives in index.html rather than in a view. */
export function applyShellLocale(document, locale) {
  const copy = shellCopy(locale)
  const labels = {
    dashboard: copy.navToday, sprint: copy.navSprint,
    review: copy.navReview, interview: copy.navInterview
  }
  for (const link of document.querySelectorAll('[data-nav]')) {
    const icon = link.querySelector('span')
    const label = labels[link.dataset.nav]
    if (!label) continue
    link.textContent = ''
    if (icon) link.appendChild(icon)
    link.append(label)
  }
}

/**
 * Projects a lesson final checkpoint into the shape the quiz flow expects, in the
 * requested language. The generated IDs match `withLegacyProjection`, so a
 * language change never invalidates the stored review queue.
 */
export function localizedFinalQuiz(lesson, locale) {
  return (lesson.finalQuiz || []).map((checkpoint, index) => ({
    id: `${lesson.id}-check-${index + 1}`,
    type: 'single',
    prompt: selectLocale(checkpoint.prompt, locale),
    options: (checkpoint.options || []).map((option) => selectLocale(option, locale)),
    correctOption: checkpoint.correctOption,
    explanation: selectLocale(checkpoint.options?.[checkpoint.correctOption]?.explanation, locale)
  }))
}

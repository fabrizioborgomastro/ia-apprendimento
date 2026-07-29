import { selectLocale, unitPath } from './ui.js?v=10'
import { sources } from './content/index.js'

const COPY = {
  it: {
    unitOf: (index, total) => `Unità ${index} di ${total}`,
    index: 'Unità di questo modulo',
    unitsInModule: 'Unità di questo modulo',
    unitCounter: (position, total) => `${position} di ${total}`,
    controls: 'Spostamento tra le unità',
    progress: 'Avanzamento nel modulo',
    stage: 'Dove siamo nel percorso',
    objective: 'Obiettivo',
    concept: 'Il concetto',
    keyPoints: 'Punti chiave',
    terminology: 'Termini di questa unità',
    termColumn: 'Termine',
    italianColumn: 'In italiano',
    definitionColumn: 'Che cos\'è, in una frase',
    example: 'Esempio pratico',
    takeaway: 'Cosa portarsi via',
    english: 'Come lo dici in inglese',
    whyThoseWords: 'Perché queste parole',
    quiz: 'Quiz',
    quizHelper: 'Sette domande. Ogni risposta sbagliata entra nella coda di ripasso.',
    quizProgress: (answered, total) => `${answered} di ${total} domande`,
    correct: 'Corretto',
    review: 'Da rivedere',
    sources: 'Fonti di questa unità',
    previous: 'Unità precedente',
    next: 'Unità successiva',
    finish: 'Chiudi il modulo',
    completeFirst: 'Rispondi a tutte e sette le domande per completare l\'unità.',
    unitDone: 'Unità completata',
    minutes: (value) => `${value} min`
  },
  en: {
    unitOf: (index, total) => `Unit ${index} of ${total}`,
    index: 'Units in this module',
    unitsInModule: 'Units in this module',
    unitCounter: (position, total) => `${position} of ${total}`,
    controls: 'Move between units',
    progress: 'Module progress',
    stage: 'Where we are in the path',
    objective: 'Objective',
    concept: 'The idea',
    keyPoints: 'Key points',
    terminology: 'Terms in this unit',
    termColumn: 'Term',
    italianColumn: 'In Italian',
    definitionColumn: 'What it is, in one sentence',
    example: 'Worked example',
    takeaway: 'What to take away',
    english: 'How you say it in English',
    whyThoseWords: 'Why these words',
    quiz: 'Quiz',
    quizHelper: 'Seven questions. Every wrong answer joins your review queue.',
    quizProgress: (answered, total) => `${answered} of ${total} questions`,
    correct: 'Correct',
    review: 'Review this',
    sources: 'Sources for this unit',
    previous: 'Previous unit',
    next: 'Next unit',
    finish: 'Close the module',
    completeFirst: 'Answer all seven questions to complete the unit.',
    unitDone: 'Unit completed',
    minutes: (value) => `${value} min`
  }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/gu, (character) => ESCAPES[character])
}

const copyFor = (locale) => COPY[locale] || COPY.it
const text = (value, locale) => escapeHtml(selectLocale(value, locale))

function renderList(items, locale, className) {
  if (!items?.length) return ''
  return `<ul class="${className}">${items.map((item) => `<li>${text(item, locale)}</li>`).join('')}</ul>`
}

/**
 * A theory block is either a paragraph or a named list. The named list is what
 * makes an enumeration readable: one step per line, each with its own name in
 * bold, so it can be scanned and memorised instead of parsed.
 */
function renderTheoryEntry(entry, locale) {
  if (!Array.isArray(entry?.steps)) return `<p>${text(entry, locale)}</p>`
  const tag = entry.numbered === false ? 'ul' : 'ol'
  return `<${tag} class="named-steps" data-named-steps>${
    entry.steps.map((step) => `<li><b>${text(step.name, locale)}</b><span>${text(step.text, locale)}</span></li>`).join('')
  }</${tag}>`
}

function renderTerminology(terminology, locale) {
  const copy = copyFor(locale)
  if (!terminology?.length) return ''
  return `<section class="unit-terms" data-unit-terms>
    <h3>${copy.terminology}</h3>
    <table><thead><tr><th scope="col">${copy.termColumn}</th><th scope="col">${copy.italianColumn}</th><th scope="col">${copy.definitionColumn}</th></tr></thead>
    <tbody>${terminology.map((term) => `<tr data-term="${escapeHtml(term.id)}"><th scope="row"><code>${escapeHtml(term.term)}</code></th><td>${escapeHtml(term.italian)}</td><td>${text(term.definition, locale)}</td></tr>`).join('')}</tbody></table>
  </section>`
}

function renderExampleTable(table, locale) {
  if (!table?.columns?.length || !table?.rows?.length) return ''
  return `<div class="example-table"><table><thead><tr>${
    table.columns.map((column) => `<th scope="col">${text(column, locale)}</th>`).join('')
  }</tr></thead><tbody>${
    table.rows.map((row) => `<tr>${
      row.map((cell, cellIndex) => (cellIndex === 0
        ? `<th scope="row">${text(cell, locale)}</th>`
        : `<td>${text(cell, locale)}</td>`)).join('')
    }</tr>`).join('')
  }</tbody></table></div>`
}

function renderExample(example, locale) {
  const copy = copyFor(locale)
  if (!example) return ''
  return `<section class="unit-example" data-unit-example>
    <p class="eyebrow">${copy.example}</p>
    <h3>${text(example.title, locale)}</h3>
    ${renderExampleTable(example.table, locale)}
    <ol class="example-steps">${example.steps.map((step) => `<li>${text(step, locale)}</li>`).join('')}</ol>
    <p class="example-takeaway"><b>${copy.takeaway}:</b> ${text(example.takeaway, locale)}</p>
  </section>`
}

function renderEnglishBlock(block, locale) {
  const copy = copyFor(locale)
  if (!block) return ''
  return `<section class="unit-english" data-unit-english>
    <p class="eyebrow">${copy.english}</p>
    <ul class="english-lines" lang="en">${block.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
    <p class="english-why" lang="it"><b>${copy.whyThoseWords}.</b> ${escapeHtml(block.why)}</p>
  </section>`
}

function renderQuiz(unit, locale, answers) {
  const copy = copyFor(locale)
  const answered = unit.quiz.filter((question) => Number.isInteger(answers[question.id])).length
  return `<section class="unit-quiz" data-unit-quiz>
    <p class="eyebrow">${copy.quiz}</p>
    <p class="quiz-helper">${copy.quizHelper}</p>
    <p class="quiz-progress" data-quiz-progress>${escapeHtml(copy.quizProgress(answered, unit.quiz.length))}</p>
    ${unit.quiz.map((question, index) => {
      const choice = answers[question.id]
      const done = Number.isInteger(choice)
      const correct = done && choice === question.correctOption
      return `<fieldset class="quiz-card" data-question="${escapeHtml(question.id)}">
        <legend><span>${index + 1}</span>${escapeHtml(question.prompt)}</legend>
        <div class="quiz-options">${question.options.map((option, optionIndex) => `<button type="button" data-quiz-option="${optionIndex}" data-question-id="${escapeHtml(question.id)}"${done ? ' disabled' : ''}${done && optionIndex === question.correctOption ? ' data-correct-option' : ''}${done && optionIndex === choice && !correct ? ' data-wrong-option' : ''} aria-pressed="${choice === optionIndex ? 'true' : 'false'}">${escapeHtml(option)}</button>`).join('')}</div>
        ${done ? `<div class="feedback visible ${correct ? 'correct' : 'wrong'}" role="status" aria-live="polite"><b>${correct ? copy.correct : copy.review}</b><p>${escapeHtml(question.explanation)}</p></div>` : ''}
      </fieldset>`
    }).join('')}
  </section>`
}

function renderSources(sourceIds, locale) {
  const copy = copyFor(locale)
  return `<footer class="unit-sources" data-unit-sources>
    <p class="eyebrow">${copy.sources}</p>
    <ul>${(sourceIds || []).map((sourceId) => {
      const source = sources[sourceId]
      if (!source) return `<li data-source="${escapeHtml(sourceId)}">${escapeHtml(sourceId)}</li>`
      return `<li data-source="${escapeHtml(sourceId)}"><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(source.title)}</a><small>${escapeHtml(source.organization)}</small></li>`
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

export function renderUnitView({ lesson, state, locale, answers = {}, unitComplete = false }) {
  const copy = copyFor(locale)
  const unit = state.unit

  return `<article class="lesson-unit shell">
    <header class="unit-header" data-unit-header>
      <a href="/corso" data-link class="back-link">← ${escapeHtml(locale === 'en' ? 'All modules' : 'Tutti i moduli')}</a>
      <p class="unit-kicker"><span>${text(lesson.title, locale)}</span><span>${escapeHtml(copy.unitOf(state.index + 1, state.total))}</span><span>${escapeHtml(copy.minutes(unit.estimatedMinutes))}</span></p>
      <h1>${text(unit.title, locale)}</h1>
      <p class="unit-stage" data-unit-stage><b>${copy.stage}:</b> ${text(unit.stageLabel, locale)}</p>
      <p class="unit-objective"><b>${copy.objective}:</b> ${text(unit.objective, locale)}</p>
      <div class="unit-progress" role="progressbar" aria-label="${copy.progress}" aria-valuemin="1" aria-valuemax="${state.total}" aria-valuenow="${state.index + 1}" aria-valuetext="${escapeHtml(copy.unitOf(state.index + 1, state.total))}"><span style="width:${Math.round(((state.index + 1) / state.total) * 100)}%"></span></div>
    </header>

    ${renderUnitIndex(lesson, state, locale)}

    <section class="unit-content" data-unit-content>
      <h2>${copy.concept}</h2>
      ${unit.theory.map((entry) => renderTheoryEntry(entry, locale)).join('')}
      <h3>${copy.keyPoints}</h3>
      ${renderList(unit.keyPoints, locale, 'key-points')}
    </section>

    ${renderTerminology(unit.terminology, locale)}
    ${renderExample(unit.example, locale)}
    ${renderEnglishBlock(unit.englishBlock, locale)}
    ${renderQuiz(unit, locale, answers)}
    ${renderSources(unit.sourceIds, locale)}

    <nav class="unit-controls" data-unit-controls aria-label="${copy.controls}">
      ${state.previous ? `<a class="button secondary" data-link data-unit-previous href="${escapeHtml(unitPath(lesson.slug, state.previous.id))}">← ${copy.previous}</a>` : '<span></span>'}
      <p class="unit-status" data-unit-status>${unitComplete ? `✓ ${copy.unitDone}` : copy.completeFirst}</p>
      ${state.next
        ? `<a class="button primary" data-link data-unit-next href="${escapeHtml(unitPath(lesson.slug, state.next.id))}">${copy.next} →</a>`
        : `<a class="button primary" data-link data-module-finish href="/corso">${copy.finish} →</a>`}
    </nav>
  </article>`
}

/** The ten interview questions, with the spoken English kept visible. */
export function renderInterviewAnswers(answers, locale) {
  const labels = locale === 'en'
    ? { expectation: 'What they want to hear', italian: 'Answer in Italian', english: 'In English, thirty seconds', keyPoints: 'Three points to remember', mistake: 'Mistake to avoid', show: 'Show the answer' }
    : { expectation: 'Cosa vogliono sentire', italian: 'Risposta in italiano', english: 'In inglese, trenta secondi', keyPoints: 'Tre punti da non dimenticare', mistake: 'Errore da evitare', show: 'Mostra la risposta' }

  return `<section class="shell interview-list" data-interview-list>${answers.map((answer, index) => `
    <article class="interview-card" data-interview-answer="${escapeHtml(answer.id)}">
      <div class="question-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="interview-body">
        <h2>${text(answer.prompt, locale)}</h2>
        <p class="interview-expectation"><b>${labels.expectation}:</b> ${escapeHtml(answer.expectation)}</p>
        <details class="interview-reveal">
          <summary>${labels.show}</summary>
          <h3>${labels.italian}</h3>
          <p class="interview-italian" lang="it">${escapeHtml(answer.italian)}</p>
          <h3>${labels.english}</h3>
          <ul class="english-lines" lang="en">${answer.english.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
          <h3>${labels.keyPoints}</h3>
          <ol class="key-points">${answer.keyPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ol>
          <p class="interview-mistake"><b>${labels.mistake}:</b> ${escapeHtml(answer.mistake)}</p>
        </details>
      </div>
    </article>`).join('')}</section>`
}

export function renderGlossaryEntries(entries, locale) {
  if (!entries.length) {
    return `<p class="empty-inline">${locale === 'en' ? 'No term found.' : 'Nessun termine trovato.'}</p>`
  }
  return entries.map((entry) => `<article class="term-row" data-term-entry="${escapeHtml(entry.id)}">
    <code>${escapeHtml(entry.term)}</code><b>${escapeHtml(entry.italian)}</b>
    <p>${text(entry.definition, locale)}</p>
    <small>${escapeHtml(entry.where)}</small>
  </article>`).join('')
}

export function renderConfusedPairs(pairs, locale) {
  return `<div class="confused-pairs">${pairs.map((pair) => `<article class="confused-pair"><b>${text(pair.pair, locale)}</b><p>${text(pair.difference, locale)}</p></article>`).join('')}</div>`
}

export function renderLocaleSwitch(locale) {
  return `<div class="locale-switch" role="group" aria-label="${locale === 'en' ? 'Language' : 'Lingua'}">
    <button type="button" data-locale="it" aria-pressed="${locale === 'it' ? 'true' : 'false'}">Italiano</button>
    <button type="button" data-locale="en" aria-pressed="${locale === 'en' ? 'true' : 'false'}">English</button>
  </div>`
}

const SHELL = {
  it: {
    navToday: 'Oggi', navCourse: 'Corso', navReview: 'Ripasso', navGlossary: 'Glossario', navInterview: 'Colloquio',
    heroEyebrow: '5 moduli · 25 unità · circa 2 ore e mezza',
    heroTitle: 'Un processo solo,<br><em>raccontato bene.</em>',
    heroLead: 'Dalla perdita misurata in reparto alla decisione finale, con le parole inglesi che ti servono per dirlo a voce.',
    heroCtaStart: 'Inizia il corso', heroCtaContinue: 'Continua il corso',
    stagesLabel: 'Le sette tappe',
    nextMove: 'Prossima mossa', openLesson: 'Apri il modulo',
    readiness: 'Avanzamento', ready: 'pronto',
    modulesDone: (done, total) => `${done} di ${total} moduli completati`,
    activeRecall: 'Ripasso attivo', questionsToReview: 'domande da rivedere', reviewNow: 'Ripassa ora',
    courseEyebrow: 'Il corso',
    courseTitle: 'Cinque moduli. Un filo solo.',
    courseLead: 'Ogni unità ha la stessa struttura: dove sei nel percorso, il concetto, i termini, un esempio con numeri, le frasi inglesi e sette domande.',
    completed: 'completato',
    statusNext: 'Prossimo', statusOpen: 'Da fare', statusBest: 'Miglior punteggio',
    unitsLabel: 'unità',
    reviewTitle: 'Ripassa ciò che conta.',
    reviewLead: 'Gli errori non sono una penalità. Sono la lista esatta di ciò che devi rendere più solido.',
    questionsLabel: 'Domande da rivedere',
    showAnswer: 'Mostra risposta e spiegazione',
    emptyQueue: 'La coda è vuota.',
    emptyQueueHint: 'Rispondi ai quiz delle unità: ogni errore finisce qui.',
    goToCourse: 'Vai al corso',
    glossaryEyebrow: 'Glossario',
    glossaryTitle: 'Ogni termine del corso,<br><em>in una frase.</em>',
    glossaryLead: 'Italiano e inglese, con l\'unità in cui il termine viene spiegato per esteso.',
    glossaryLabel: 'Cerca un termine', glossaryPlaceholder: 'Cerca PLC, deriva, MVP...',
    confusedTitle: 'Coppie che vengono confuse',
    termsCount: (count) => `${count} termini`,
    noTerms: 'Nessun termine trovato.',
    interviewEyebrow: 'Le dieci domande',
    interviewTitle: 'Le domande che ti faranno<br><em>davvero.</em>',
    interviewLead: 'Risposta in italiano per fissare il concetto, inglese semplice da dire a voce, tre punti da non dimenticare.'
  },
  en: {
    navToday: 'Today', navCourse: 'Course', navReview: 'Review', navGlossary: 'Glossary', navInterview: 'Interview',
    heroEyebrow: '5 modules · 25 units · about two and a half hours',
    heroTitle: 'One process,<br><em>told well.</em>',
    heroLead: 'From a measured loss on the floor to the final decision, with the English words you need to say it out loud.',
    heroCtaStart: 'Start the course', heroCtaContinue: 'Continue the course',
    stagesLabel: 'The seven steps',
    nextMove: 'Next move', openLesson: 'Open the module',
    readiness: 'Progress', ready: 'ready',
    modulesDone: (done, total) => `${done} of ${total} modules completed`,
    activeRecall: 'Active recall', questionsToReview: 'questions to review', reviewNow: 'Review now',
    courseEyebrow: 'The course',
    courseTitle: 'Five modules. One single thread.',
    courseLead: 'Every unit has the same shape: where you are in the path, the idea, the terms, an example with numbers, the English lines and seven questions.',
    completed: 'completed',
    statusNext: 'Next', statusOpen: 'Not started', statusBest: 'Best score',
    unitsLabel: 'units',
    reviewTitle: 'Review what matters.',
    reviewLead: 'Mistakes are not a penalty. They are the exact list of what you still need to make solid.',
    questionsLabel: 'Questions to review',
    showAnswer: 'Show the answer and the explanation',
    emptyQueue: 'The queue is empty.',
    emptyQueueHint: 'Answer the unit quizzes: every miss lands here.',
    goToCourse: 'Go to the course',
    glossaryEyebrow: 'Glossary',
    glossaryTitle: 'Every term of the course,<br><em>in one sentence.</em>',
    glossaryLead: 'Italian and English, with the unit where the term is explained in full.',
    glossaryLabel: 'Search a term', glossaryPlaceholder: 'Search PLC, drift, MVP...',
    confusedTitle: 'Pairs that get confused',
    termsCount: (count) => `${count} terms`,
    noTerms: 'No term found.',
    interviewEyebrow: 'The ten questions',
    interviewTitle: 'The questions they will<br><em>actually ask.</em>',
    interviewLead: 'The Italian answer to fix the idea, simple English to say out loud, three points to remember.'
  }
}

export function shellCopy(locale) {
  return SHELL[locale] || SHELL.it
}

/** Localizes the static navigation that lives in index.html rather than in a view. */
export function applyShellLocale(document, locale) {
  const copy = shellCopy(locale)
  const labels = {
    dashboard: copy.navToday, course: copy.navCourse, review: copy.navReview,
    glossary: copy.navGlossary, interview: copy.navInterview
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

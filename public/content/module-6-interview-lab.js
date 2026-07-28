import { localized } from './schema.js'

const t = localized

const checkpoint = (promptIt, promptEn, options, correctOption) => ({
  prompt: t(promptIt, promptEn),
  options: options.map(([it, en, explanationIt, explanationEn]) => ({
    ...t(it, en),
    explanation: t(explanationIt, explanationEn)
  })),
  correctOption
})

const quickTask = (decisionCount, calculationCount, contextIt, contextEn, formatIt, formatEn) => ({
  outputCount: 1,
  decisionCount,
  calculationCount,
  providedContext: t(contextIt, contextEn),
  responseFormat: t(formatIt, formatEn)
})

const activity = (id, durationMinutes, promptIt, promptEn, artifactIt, artifactEn, contextIt, contextEn,
  formatIt, formatEn, solutionIt, solutionEn, rubricIt, rubricEn, decisionCount = 1,
  calculationCount = 0) => ({
  id,
  prompt: t(promptIt, promptEn),
  expectedArtifact: t(artifactIt, artifactEn),
  durationMinutes,
  quickTask: quickTask(decisionCount, calculationCount, contextIt, contextEn, formatIt, formatEn),
  hints: [t(
    'Parti dalla frase di sintesi, poi aggiungi una sola prova concreta.',
    'Start from the headline sentence, then add one concrete piece of evidence.'
  )],
  modelSolution: t(solutionIt, solutionEn),
  rubric: [t(rubricIt, rubricEn)]
})

const caseEngagement = ({
  learnerAction,
  expectedOutput,
  modelReasoning,
  responseFormat,
  columns,
  rows,
  decisionCount,
  comparisonCount,
  interpretationCount
}) => ({
  learnerAction: t(...learnerAction),
  expectedOutput: t(...expectedOutput),
  modelReasoning: t(...modelReasoning),
  responseFormat: t(...responseFormat),
  decisionAid: {
    columns: columns.map((column) => t(...column)),
    rows: rows.map(([id, ...cells]) => ({ id, cells: cells.map((cell) => t(...cell)) }))
  },
  scope: {
    outputCount: 1,
    decisionCount,
    comparisonCount,
    interpretationCount
  }
})

const microExample = (id, durationMinutes, titleIt, titleEn, explanationIt, explanationEn, engagement) => ({
  id,
  durationMinutes,
  title: t(titleIt, titleEn),
  explanation: t(explanationIt, explanationEn),
  ...caseEngagement(engagement)
})

const caseSegment = (id, durationMinutes, titleIt, titleEn, scenarioIt, scenarioEn, engagement) => ({
  id,
  durationMinutes,
  title: t(titleIt, titleEn),
  scenario: t(scenarioIt, scenarioEn),
  ...caseEngagement(engagement)
})

export const answerRubric = {
  id: 'interview-answer-rubric',
  title: t('Rubric di valutazione della risposta', 'Interview answer rubric'),
  description: t(
    'Sei criteri valutati 0, 1 o 2 con ancore comportamentali. Il massimo è 12 e la soglia di prontezza è 10, da raggiungere su ogni risposta centrale.',
    'Six criteria scored 0, 1, or 2 with behavioral anchors. The maximum is 12 and the readiness threshold is 10, to be reached on every core answer.'
  ),
  maxScore: 12,
  readinessThreshold: 10,
  criteria: [
    {
      id: 'structure',
      name: t('Struttura', 'Structure'),
      anchors: [
        { score: 0, description: t('Nessun ordine riconoscibile; la risposta divaga o parte dai dettagli.', 'No recognizable order; the answer wanders or starts from details.') },
        { score: 1, description: t('Ordine parziale: la sintesi arriva, ma dopo una premessa lunga.', 'Partial order: the headline arrives, but after a long preamble.') },
        { score: 2, description: t('Sintesi, ragionamento, esempio, trade-off e risultato nella prima frase e nelle successive.', 'Headline, reasoning, example, trade-off, and result in the first sentence and those that follow.') }
      ]
    },
    {
      id: 'technical-accuracy',
      name: t('Accuratezza tecnica', 'Technical accuracy'),
      anchors: [
        { score: 0, description: t('Confonde livelli, ruoli o strumenti, per esempio MES con SCADA o MCP con orchestrazione.', 'Confuses levels, roles, or tools, for example MES with SCADA or MCP with orchestration.') },
        { score: 1, description: t('Distinzioni corrette ma senza vincoli o conseguenze operative.', 'Correct distinctions but without constraints or operational consequences.') },
        { score: 2, description: t('Distinzioni corrette con vincoli, cadenza, proprietà del dato e conseguenza.', 'Correct distinctions with constraints, cadence, data ownership, and consequence.') }
      ]
    },
    {
      id: 'business-relevance',
      name: t('Rilevanza per il business', 'Business relevance'),
      anchors: [
        { score: 0, description: t('Descrive la tecnologia senza collegarla a una decisione o a una perdita.', 'Describes technology without connecting it to a decision or a loss.') },
        { score: 1, description: t('Nomina un beneficio generico senza metrica o baseline.', 'Names a generic benefit without a metric or baseline.') },
        { score: 2, description: t('Collega la scelta a una decisione, a una metrica dichiarata e a una baseline misurata.', 'Connects the choice to a decision, a declared metric, and a measured baseline.') }
      ]
    },
    {
      id: 'concrete-example',
      name: t('Esempio concreto', 'Concrete example'),
      anchors: [
        { score: 0, description: t('Nessun esempio, oppure un esempio generico non verificabile.', 'No example, or a generic example that cannot be verified.') },
        { score: 1, description: t('Esempio presente ma senza numeri, ruoli o esito.', 'An example is present but without numbers, roles, or outcome.') },
        { score: 2, description: t('Esempio con contesto, numeri ricostruibili, ruolo di chi decide ed esito.', 'An example with context, reconstructable numbers, the deciding role, and an outcome.') }
      ]
    },
    {
      id: 'trade-offs',
      name: t('Trade-off', 'Trade-offs'),
      anchors: [
        { score: 0, description: t('Presenta la scelta come priva di costi o rischi.', 'Presents the choice as free of cost or risk.') },
        { score: 1, description: t('Cita un rischio generico senza dire che cosa si accetta di perdere.', 'Mentions a generic risk without saying what is accepted as a loss.') },
        { score: 2, description: t('Dichiara che cosa si rinuncia, perché, e quale condizione farebbe cambiare la scelta.', 'States what is given up, why, and which condition would change the choice.') }
      ]
    },
    {
      id: 'english-clarity',
      name: t('Chiarezza in inglese', 'English clarity'),
      anchors: [
        { score: 0, description: t('Frasi lunghe e traduzioni letterali che rendono difficile seguire il senso.', 'Long sentences and literal translations that make the meaning hard to follow.') },
        { score: 1, description: t('Comprensibile, ma con esitazioni e ripetizioni che diluiscono la sintesi.', 'Understandable, but with hesitations and repetitions that dilute the headline.') },
        { score: 2, description: t('Frasi brevi, terminologia corretta, ritmo naturale e nessuna traduzione letterale.', 'Short sentences, correct terminology, natural pace, and no literal translation.') }
      ]
    }
  ]
}

export const mockInterviewSimulation = {
  id: 'twenty-minute-technical-mock',
  title: t('Simulazione tecnica da venti minuti', 'Twenty-minute technical mock interview'),
  description: t(
    'Sei segmenti cronometrati che coprono ogni argomento prioritario. La simulazione si svolge senza note, in inglese, con un cronometro visibile.',
    'Six timed segments covering every priority topic. The simulation runs without notes, in English, with a visible timer.'
  ),
  totalMinutes: 20,
  withoutNotes: true,
  language: t('Inglese, con eventuale chiarimento in italiano soltanto dopo il tempo.', 'English, with any Italian clarification only after time is up.'),
  segments: [
    {
      id: 'opening-and-automation-selection',
      unitRef: 'unit-7',
      durationMinutes: 3,
      topicIds: ['automation-selection'],
      question: t(
        'Presentati in due frasi e spiega come decidi quali processi automatizzare per primi.',
        'Introduce yourself in two sentences and explain how you decide which processes to automate first.'
      ),
      expectedPoints: [
        t('Parte dalla perdita operativa e dalla decisione, non dalla tecnologia.', 'Starts from the operational loss and the decision, not the technology.'),
        t('Usa criteri pesati, evidenza e almeno un cancello non negoziabile.', 'Uses weighted criteria, evidence, and at least one non-negotiable gate.'),
        t('Rifiuta esplicitamente un candidato ad alto valore ma non ammissibile.', 'Explicitly rejects a high-value but ineligible candidate.')
      ]
    },
    {
      id: 'ot-it-and-mes-scada',
      unitRef: 'unit-7',
      durationMinutes: 4,
      topicIds: ['ot-vs-it', 'mes-vs-scada'],
      question: t(
        'Spiega la differenza tra OT e IT e tra MES e SCADA a un dirigente non tecnico.',
        'Explain the difference between OT and IT, and between MES and SCADA, to a non-technical executive.'
      ),
      expectedPoints: [
        t('Inverte l’ordine delle priorità: in OT disponibilità e integrità vengono prima.', 'Inverts the priority order: in OT availability and integrity come first.'),
        t('SCADA supervisiona e controlla in tempo reale; MES governa ordine, genealogia e conformità.', 'SCADA supervises and controls in real time; MES governs order, genealogy, and compliance.'),
        t('Collega la distinzione a una conseguenza pratica su metodi e tempi di intervento.', 'Connects the distinction to a practical consequence for methods and intervention timing.')
      ]
    },
    {
      id: 'sensor-to-decision-and-kpi',
      unitRef: 'unit-7',
      durationMinutes: 3,
      topicIds: ['kpi'],
      question: t(
        'Disegna a voce il percorso dal sensore alla decisione umana e indica come misureresti il risultato.',
        'Describe out loud the path from sensor to human decision and state how you would measure the result.'
      ),
      expectedPoints: [
        t('Nomina gli attraversamenti di zona e la latenza dominante del percorso.', 'Names the zone crossings and the dominant latency of the path.'),
        t('Distingue metrica di modello e KPI operativo con baseline misurata.', 'Distinguishes model metrics from an operational KPI with a measured baseline.'),
        t('Dichiara chi decide alla fine del percorso e con quale evidenza.', 'States who decides at the end of the path and on which evidence.')
      ]
    },
    {
      id: 'rag-agent-and-mcp',
      unitRef: 'unit-8',
      durationMinutes: 4,
      topicIds: ['rag', 'agent', 'mcp'],
      question: t(
        'Che cosa sono RAG, un agente e MCP, e quando useresti ciascuno in un impianto regolamentato?',
        'What are RAG, an agent, and MCP, and when would you use each in a regulated plant?'
      ),
      expectedPoints: [
        t('RAG recupera evidenza autorizzata e versionata prima di generare, con citazioni verificabili.', 'RAG retrieves authorized and versioned evidence before generating, with verifiable citations.'),
        t('Un agente sceglie ripetutamente l’azione successiva e serve solo quando il percorso varia.', 'An agent repeatedly chooses the next action and is useful only when the path varies.'),
        t('MCP è un protocollo di connessione, non un orchestratore e non una garanzia di sicurezza.', 'MCP is a connection protocol, not an orchestrator and not a security guarantee.')
      ]
    },
    {
      id: 'mvp-and-risk',
      unitRef: 'unit-8',
      durationMinutes: 3,
      topicIds: ['mvp', 'risk'],
      question: t(
        'Come progetteresti un MVP controllato e come tratteresti i rischi principali?',
        'How would you design a controlled MVP and how would you handle the main risks?'
      ),
      expectedPoints: [
        t('Fetta verticale completa su dominio ristretto, in sola lettura e in modalità shadow.', 'A complete vertical slice over a narrow domain, read-only and in shadow mode.'),
        t('Registro dei rischi con punteggi derivati e una tolleranza trattata come cancello.', 'A risk register with derived scores and a tolerance treated as a gate.'),
        t('Criteri di arresto dichiarati prima di iniziare, con data di riesame.', 'Stop criteria declared before starting, with a review date.')
      ]
    },
    {
      id: 'oversight-and-scaling',
      unitRef: 'unit-8',
      durationMinutes: 3,
      topicIds: ['human-oversight', 'scaling'],
      question: t(
        'Che cosa rende effettiva la supervisione umana e quando decideresti di non scalare?',
        'What makes human oversight effective, and when would you decide not to scale?'
      ),
      expectedPoints: [
        t('Capire, verificare e dissentire senza attrito, misurato con campionamento indipendente.', 'Understand, verify, and disagree without friction, measured by independent sampling.'),
        t('Un cancello bloccante non superato ferma la raccomandazione senza compensazioni.', 'One unmet blocking gate stops the recommendation with no offsetting.'),
        t('Un no motivato dichiara condizione mancante, proprietario e data di riesame.', 'A reasoned no declares the missing condition, the owner, and a review date.')
      ]
    }
  ],
  conductRules: [
    t('Cronometro visibile e nessuna nota consultabile durante i venti minuti.', 'A visible timer and no consultable notes during the twenty minutes.'),
    t('Registrare la risposta in audio per poterla valutare con la rubric.', 'Record the answer as audio so it can be scored with the rubric.'),
    t('Non correggersi a metà: completare il segmento e annotare la correzione dopo.', 'Do not self-correct mid-answer: finish the segment and note the correction afterwards.')
  ]
}

export const readinessTracker = {
  id: 'interview-readiness-tracker',
  title: t('Tracciatore di prontezza', 'Readiness tracker'),
  description: t(
    'Per ogni argomento prioritario registra i sei punteggi della rubric. Il totale è derivato dalla somma e la prontezza richiede almeno 10 su 12 e la simulazione completata senza note.',
    'For each priority topic it records the six rubric scores. The total is derived from the sum, and readiness requires at least 10 out of 12 plus the simulation completed without notes.'
  ),
  threshold: 10,
  mockCompletedWithoutNotes: true,
  entries: [
    {
      topicId: 'ot-vs-it',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 2, 'trade-offs': 2, 'english-clarity': 2 },
      total: 12,
      ready: true,
      gapAction: t('Mantenere; ripetere una volta a settimana per conservare il ritmo.', 'Maintain; repeat once a week to keep the pace.')
    },
    {
      topicId: 'mes-vs-scada',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 2, 'trade-offs': 2, 'english-clarity': 1 },
      total: 11,
      ready: true,
      gapAction: t('Accorciare le frasi inglesi e togliere due parole di riempimento.', 'Shorten the English sentences and remove two filler words.')
    },
    {
      topicId: 'rag',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 2, 'trade-offs': 1, 'english-clarity': 2 },
      total: 11,
      ready: true,
      gapAction: t('Aggiungere il costo del rifiuto: meno risposte ma nessuna procedura errata.', 'Add the cost of refusal: fewer answers but no wrong procedure.')
    },
    {
      topicId: 'agent',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 1, 'trade-offs': 2, 'english-clarity': 1 },
      total: 10,
      ready: true,
      gapAction: t('Preparare un esempio con numeri: baseline, budget di step e stop condition.', 'Prepare an example with numbers: baseline, step budget, and stop condition.')
    },
    {
      topicId: 'mcp',
      scores: { structure: 2, 'technical-accuracy': 1, 'business-relevance': 2, 'concrete-example': 1, 'trade-offs': 1, 'english-clarity': 2 },
      total: 9,
      ready: false,
      gapAction: t('Riprendere host, client e server e preparare la frase su ciò che MCP non decide.', 'Revisit host, client, and server and prepare the sentence about what MCP does not decide.')
    },
    {
      topicId: 'automation-selection',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 2, 'trade-offs': 2, 'english-clarity': 2 },
      total: 12,
      ready: true,
      gapAction: t('Mantenere; usare questa risposta come apertura della simulazione.', 'Maintain; use this answer as the opening of the simulation.')
    },
    {
      topicId: 'mvp',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 2, 'trade-offs': 1, 'english-clarity': 2 },
      total: 11,
      ready: true,
      gapAction: t('Dichiarare che cosa si perde restando in sola lettura per sei settimane.', 'State what is lost by staying read-only for six weeks.')
    },
    {
      topicId: 'kpi',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 2, 'trade-offs': 2, 'english-clarity': 1 },
      total: 11,
      ready: true,
      gapAction: t('Esercitare a voce la differenza tra metrica di modello e KPI operativo.', 'Rehearse aloud the difference between a model metric and an operational KPI.')
    },
    {
      topicId: 'risk',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 1, 'concrete-example': 2, 'trade-offs': 1, 'english-clarity': 2 },
      total: 10,
      ready: true,
      gapAction: t('Collegare ogni rischio a una perdita operativa e a un proprietario nominato.', 'Connect every risk to an operational loss and a named owner.')
    },
    {
      topicId: 'human-oversight',
      scores: { structure: 1, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 1, 'trade-offs': 2, 'english-clarity': 1 },
      total: 9,
      ready: false,
      gapAction: t('Riscrivere l’apertura con la distinzione tra supervisione formale ed effettiva e aggiungere la misura di campionamento.', 'Rewrite the opening with the formal versus effective oversight distinction and add the sampling measure.')
    },
    {
      topicId: 'scaling',
      scores: { structure: 2, 'technical-accuracy': 2, 'business-relevance': 2, 'concrete-example': 1, 'trade-offs': 2, 'english-clarity': 2 },
      total: 11,
      ready: true,
      gapAction: t('Aggiungere i punteggi dei siti per rendere verificabile il rifiuto di scalare.', 'Add the site scores so the refusal to scale becomes verifiable.')
    }
  ],
  notReadyTopicIds: ['mcp', 'human-oversight'],
  decisionRule: t(
    'La preparazione non è conclusa finché resta un argomento sotto soglia, anche se la media complessiva è alta.',
    'Preparation is not complete while one topic stays below threshold, even when the overall average is high.'
  )
}

export const rapidReviewSheet = {
  id: 'rapid-review-sheet',
  title: t('Scheda di ripasso rapido', 'Rapid review sheet'),
  description: t(
    'Una riga per argomento: la frase di sintesi da dire per prima e la trappola più comune da evitare.',
    'One row per topic: the headline sentence to say first and the most common trap to avoid.'
  ),
  entries: [
    {
      topicId: 'ot-vs-it',
      headline: t(
        'In OT la disponibilità e l’integrità del processo vengono prima della riservatezza, quindi metodi normali in ufficio non sono accettabili in impianto.',
        'In OT, process availability and integrity come before confidentiality, so methods that are normal in an office are not acceptable in a plant.'
      ),
      trap: t('Descrivere OT come "IT con macchine" e proporre patch o scansioni automatiche.', 'Describing OT as "IT with machines" and proposing automatic patching or scanning.')
    },
    {
      topicId: 'mes-vs-scada',
      headline: t(
        'SCADA supervisiona e controlla il processo in tempo reale; MES governa ordine di produzione, genealogia, materiali e conformità.',
        'SCADA supervises and controls the process in real time; MES governs the production order, genealogy, materials, and compliance.'
      ),
      trap: t('Usare i due termini come sinonimi o attribuire al MES il controllo di anello.', 'Using the two terms interchangeably or attributing loop control to MES.')
    },
    {
      topicId: 'rag',
      headline: t(
        'RAG recupera evidenza autorizzata e nella revisione effettiva prima di generare, e ogni claim porta una citazione verificabile.',
        'RAG retrieves authorized evidence at the effective revision before generating, and every claim carries a verifiable citation.'
      ),
      trap: t('Presentare RAG come una ricerca semantica, senza permessi e senza versione.', 'Presenting RAG as semantic search, with no permissions and no version.')
    },
    {
      topicId: 'agent',
      headline: t(
        'Un agente sceglie ripetutamente l’azione successiva: serve quando il percorso varia, non quando i passi sono già enumerabili.',
        'An agent repeatedly chooses the next action: it helps when the path varies, not when the steps are already enumerable.'
      ),
      trap: t('Proporre agenti per una transazione con gate noti e effetti collaterali.', 'Proposing agents for a transaction with known gates and side effects.')
    },
    {
      topicId: 'mcp',
      headline: t(
        'MCP è un protocollo che collega host, client e server e rende scopribili risorse, tool e prompt; non decide autorizzazioni né orchestra il lavoro.',
        'MCP is a protocol connecting host, client, and server and making resources, tools, and prompts discoverable; it decides no authorization and orchestrates nothing.'
      ),
      trap: t('Presentare MCP come orchestratore o come garanzia di sicurezza.', 'Presenting MCP as an orchestrator or as a security guarantee.')
    },
    {
      topicId: 'automation-selection',
      headline: t(
        'Parto dalla perdita operativa, pondero valore, fattibilità, controllo del rischio e adozione, e applico un cancello non negoziabile prima di ordinare i candidati.',
        'I start from the operational loss, weight value, feasibility, risk control, and adoption, and apply a non-negotiable gate before ranking candidates.'
      ),
      trap: t('Ordinare per valore atteso e dimenticare di escludere i candidati non ammissibili.', 'Ranking by expected value and forgetting to exclude ineligible candidates.')
    },
    {
      topicId: 'mvp',
      headline: t(
        'Un MVP industriale è la fetta verticale completa più piccola: restringo il dominio, non i controlli, e resto in sola lettura finché non ho evidenza.',
        'An industrial MVP is the smallest complete vertical slice: I narrow the domain, not the controls, and stay read-only until I have evidence.'
      ),
      trap: t('Chiamare MVP un prototipo senza autenticazione, registro o valutazione.', 'Calling a prototype without authentication, logging, or evaluation an MVP.')
    },
    {
      topicId: 'kpi',
      headline: t(
        'Separo la metrica di modello dal KPI operativo: la precisione non è un risultato, il tempo per raggiungere la fonte corretta lo è.',
        'I separate the model metric from the operational KPI: precision is not a result, time to reach the correct source is.'
      ),
      trap: t('Presentare accuratezza o punteggio del modello come beneficio di business.', 'Presenting model accuracy or score as a business benefit.')
    },
    {
      topicId: 'risk',
      headline: t(
        'Il rischio si registra con probabilità e impatto, punteggi derivati, controlli, proprietario e scadenza, e la tolleranza è un cancello, non una media.',
        'Risk is recorded with likelihood and impact, derived scores, controls, an owner, and a deadline, and tolerance is a gate rather than an average.'
      ),
      trap: t('Elencare rischi senza punteggio derivabile, proprietario o data di rientro.', 'Listing risks with no derivable score, owner, or return date.')
    },
    {
      topicId: 'human-oversight',
      headline: t(
        'La supervisione è effettiva quando la persona può capire la proposta, aprire la fonte con un gesto e rifiutare senza attrito, e lo misuro con campionamento indipendente.',
        'Oversight is effective when the person can understand the proposal, open the source in one gesture, and refuse without friction, and I measure it with independent sampling.'
      ),
      trap: t('Dichiarare che una persona approva senza verificare se può davvero verificare.', 'Stating that a person approves without checking whether they can actually verify.')
    },
    {
      topicId: 'scaling',
      headline: t(
        'Scalare significa riprodurre un risultato in un contesto diverso: un cancello bloccante non superato ferma la raccomandazione, anche con punteggio alto.',
        'Scaling means reproducing a result in a different context: one unmet blocking gate stops the recommendation, even with a high score.'
      ),
      trap: t('Mediare i cancelli e presentare la maggioranza dei verdi come via libera.', 'Averaging gates and presenting a majority of greens as approval.')
    }
  ]
}

const theoryOne = [
  t(
    `Una risposta tecnica da colloquio non è una spiegazione: è una decisione raccontata. Chi ascolta valuta in pochi secondi se sa già dove stai andando. Per questo la struttura più efficace inizia dalla sintesi: una frase che contiene la posizione, non la premessa. Poi arriva il ragionamento, cioè il criterio con cui hai scelto. Poi un esempio concreto, con numeri e con il ruolo di chi decide. Poi il trade-off, cioè che cosa hai accettato di perdere. Infine il risultato o la condizione che ti farebbe cambiare idea. Cinque movimenti, in questo ordine, funzionano perché rispecchiano il modo in cui un responsabile valuta una proposta reale. L’errore più comune è invertire l’ordine e costruire il contesto per due minuti prima di dire qualcosa di verificabile. Chi ascolta non sta misurando quanto sai, sta misurando quanto in fretta rende utile ciò che sai. La sintesi anticipata non riduce la profondità: le dà una direzione.`,
    `A technical interview answer is not an explanation: it is a decision retold. The listener judges within seconds whether you already know where you are going. That is why the most effective structure starts with the headline: one sentence containing the position, not the preamble. Then comes the reasoning, meaning the criterion you used to choose. Then a concrete example, with numbers and the role of the person who decides. Then the trade-off, meaning what you accepted to lose. Finally the result, or the condition that would change your mind. Five movements, in that order, work because they mirror how a manager evaluates a real proposal. The most common error is reversing the order and building context for two minutes before saying anything verifiable. The listener is not measuring how much you know, they are measuring how quickly you make what you know useful. Leading with the headline does not reduce depth: it gives depth a direction.`
  ),
  t(
    `Esistono due formati che conviene preparare per ogni argomento: la versione da trenta secondi e quella da due minuti. La versione breve contiene sintesi, criterio e una conseguenza. Serve quando la domanda è di verifica, quando il tempo è poco o quando chi ascolta non è tecnico. La versione estesa aggiunge esempio con numeri, trade-off dichiarato e condizione di cambiamento. Serve quando la domanda è di approfondimento o quando l’intervistatore chiede di raccontare un caso. Preparare entrambe non significa memorizzare due testi: significa conoscere quali tre elementi restano sempre e quali tre si aggiungono. Chi prepara un solo formato lungo rischia di sembrare prolisso quando serve concisione; chi prepara un solo formato breve sembra superficiale quando serve profondità. Un buon esercizio è dire la stessa risposta due volte di seguito, prima in trenta secondi e poi in due minuti, verificando che la prima frase resti identica.`,
    `Two formats are worth preparing for every topic: the thirty-second version and the two-minute version. The short version contains the headline, the criterion, and one consequence. It fits when the question is a check, when time is short, or when the listener is not technical. The extended version adds an example with numbers, a stated trade-off, and the condition that would change the choice. It fits when the question probes for depth or when the interviewer asks you to tell a case. Preparing both does not mean memorizing two texts: it means knowing which three elements always stay and which three get added. Preparing only a long format risks sounding verbose when concision is needed; preparing only a short format sounds shallow when depth is needed. A good exercise is saying the same answer twice in a row, first in thirty seconds and then in two minutes, checking that the first sentence stays identical.`
  ),
  t(
    `La densità di una risposta si misura contando quante affermazioni verificabili contiene. Frasi come "abbiamo migliorato il processo" o "abbiamo usato intelligenza artificiale per ottimizzare" non contengono nulla di verificabile. Frasi come "il tempo mediano per raggiungere il criterio corretto era dodici minuti e l’obiettivo era sei, misurato su venti richieste per turno" contengono una metrica, una baseline, un obiettivo e un metodo. La differenza non è di stile ma di credibilità. In un colloquio tecnico ogni affermazione priva di ancoraggio invita una domanda di verifica, e quelle domande consumano il tempo che avresti usato per mostrare il ragionamento. Un modo pratico per aumentare la densità è togliere gli aggettivi e aggiungere i sostantivi che portano numeri: quanti, in quanto tempo, rispetto a quale punto di partenza, deciso da chi. Se una frase non sopravvive a questo taglio, probabilmente non stava dicendo niente.`,
    `The density of an answer is measured by counting how many verifiable statements it contains. Sentences like "we improved the process" or "we used artificial intelligence to optimize" contain nothing verifiable. Sentences like "median time to reach the correct criterion was twelve minutes and the target was six, measured over twenty requests per shift" contain a metric, a baseline, a target, and a method. The difference is not stylistic but a matter of credibility. In a technical interview every unanchored statement invites a verification question, and those questions consume the time you would have used to show your reasoning. A practical way to raise density is removing adjectives and adding the nouns that carry numbers: how many, in how long, against which starting point, decided by whom. If a sentence does not survive that cut, it was probably not saying anything.`
  ),
  t(
    `Va preparata anche la gestione della domanda a cui non sai rispondere, perché arriverà. La risposta peggiore è improvvisare una spiegazione plausibile: chi intervista se ne accorge quasi sempre e il costo sulla fiducia è alto. La risposta migliore ha tre parti: dichiara il confine di ciò che sai, indica come lo verificheresti, e offri l’adiacenza utile. Per esempio: non ho lavorato con quel protocollo specifico; verificherei sulla documentazione ufficiale quali garanzie offre su ordine e perdita dei messaggi; ho però risolto lo stesso problema con un altro trasporto, e la scelta dipendeva da cadenza e criticità del dato. Questa forma trasforma una lacuna in una dimostrazione di metodo. Molti candidati forti si distinguono proprio qui, perché la sicurezza professionale si misura più nella gestione dei limiti che nella recita delle cose note.`,
    `You should also prepare how to handle the question you cannot answer, because it will come. The worst response is improvising a plausible explanation: interviewers almost always notice, and the cost in trust is high. The best response has three parts: state the boundary of what you know, say how you would verify it, and offer the useful adjacency. For example: I have not worked with that specific protocol; I would check the official documentation for what it guarantees about message ordering and loss; I have however solved the same problem with a different transport, and the choice depended on data cadence and criticality. This form turns a gap into a demonstration of method. Many strong candidates stand out exactly here, because professional confidence shows more in how limits are handled than in reciting known material.`
  ),
  t(
    `Un ultimo elemento della architettura della risposta è la gestione del tempo. Una risposta tecnica di due minuti contiene circa duecentocinquanta parole parlate, che non sono molte: bastano per una sintesi, un criterio, un esempio con due numeri, un trade-off e una chiusura. Chi non ha provato a voce sistematicamente sfora, perché la scrittura non dà la percezione della durata. Conviene quindi cronometrare almeno una volta ogni risposta centrale e tagliare finché non entra nel tempo, perché il taglio obbliga a scegliere che cosa conta davvero. Un secondo aspetto è la chiusura: una risposta che finisce sfumando comunica insicurezza anche quando il contenuto è forte. La chiusura migliore è una frase che dichiara il risultato oppure la condizione che ti farebbe cambiare idea, perché entrambe invitano una domanda di approfondimento invece di lasciare il silenzio a chi ascolta. Infine, il silenzio breve prima di iniziare vale più di qualunque formula di apertura: due secondi di pausa comunicano controllo, mentre partire con "allora, diciamo che" comunica che stai ancora cercando la struttura mentre parli.`,
    `A final element of answer architecture is time management. A two-minute technical answer contains roughly two hundred and fifty spoken words, which is not many: enough for a headline, a criterion, an example with two numbers, a trade-off, and a closing. People who have not rehearsed aloud systematically overrun, because writing gives no sense of duration. It is therefore worth timing every core answer at least once and cutting until it fits, because cutting forces you to choose what actually matters. A second aspect is the closing: an answer that trails off communicates uncertainty even when the content is strong. The best closing is a sentence stating the result or the condition that would change your mind, because both invite a follow-up question instead of leaving silence to the listener. Finally, a short silence before starting is worth more than any opening formula: two seconds of pause communicate control, while starting with "so, let us say that" communicates that you are still looking for the structure while speaking.`
  )
]

const theoryTwo = [
  t(
    `Difendere una prioritizzazione significa mostrare il criterio prima del risultato. Un intervistatore che sente subito il nome del candidato scelto non sa se la scelta è ragionata o preferita. La sequenza che funziona è: quali criteri, con quale peso, con quale evidenza, con quale cancello, e soltanto allora quale candidato. I pesi vanno dichiarati prima di vedere i punteggi, altrimenti la matrice diventa una giustificazione costruita a posteriori. L’evidenza va distinta dalla stima: un dato osservato per quattro settimane e una stima di un fornitore non hanno lo stesso valore, e dirlo esplicitamente aumenta la credibilità invece di ridurla. Il cancello non negoziabile è la parte che quasi nessuno prepara e che quasi sempre colpisce: dichiarare che un candidato con valore atteso più alto è stato escluso perché non superava un vincolo di sicurezza o di reversibilità dimostra maturità professionale meglio di qualunque elenco di tecnologie.`,
    `Defending a prioritization means showing the criterion before the result. An interviewer who immediately hears the name of the chosen candidate cannot tell whether the choice was reasoned or preferred. The sequence that works is: which criteria, with which weights, on which evidence, behind which gate, and only then which candidate. Weights must be declared before seeing scores, otherwise the matrix becomes a justification built after the fact. Evidence must be separated from estimate: data observed for four weeks and a vendor estimate do not carry the same weight, and saying so explicitly raises credibility rather than lowering it. The non-negotiable gate is the part almost nobody prepares and that almost always lands: stating that a candidate with the highest expected value was excluded because it failed a safety or reversibility constraint demonstrates professional maturity better than any list of technologies.`
  ),
  t(
    `La difesa va anche provata contro le obiezioni prevedibili. La prima è "perché non il candidato con il valore più alto": la risposta corretta separa valore atteso e ammissibilità, e ricorda che un cancello non si compensa con un punteggio. La seconda è "come sai che i pesi sono giusti": la risposta corretta non difende i pesi come verità, ma mostra un test di sensibilità, cioè che il risultato non cambia se un peso si sposta di uno. La terza è "chi ha deciso": la risposta corretta nomina il ruolo che risponde del processo, non il team tecnico. La quarta è "quanto è costato": la risposta corretta indica il costo dell’esperimento, non del programma intero. Preparare queste quattro obiezioni copre la maggior parte delle domande di follow-up che un intervistatore esperto pone su una matrice di prioritizzazione.`,
    `The defense must also be rehearsed against predictable objections. The first is "why not the highest-value candidate": the correct answer separates expected value from eligibility, and recalls that a gate is not offset by a score. The second is "how do you know the weights are right": the correct answer does not defend the weights as truth, but shows a sensitivity test, meaning the result does not change if one weight moves by one. The third is "who decided": the correct answer names the role accountable for the process, not the technical team. The fourth is "what did it cost": the correct answer gives the cost of the experiment, not of the whole program. Preparing these four objections covers most follow-up questions an experienced interviewer asks about a prioritization matrix.`
  ),
  t(
    `Conviene infine preparare la versione della difesa che non usa numeri, perché non sempre puoi condividere i dati di un datore di lavoro precedente. In quel caso la struttura resta identica ma i valori diventano relativi: puoi dire che il candidato scelto era primo tra gli ammissibili con un margine di circa il dieci per cento sul secondo, senza rivelare cifre assolute. Questo mantiene la verificabilità del ragionamento senza esporre informazioni riservate, ed è una competenza che gli intervistatori riconoscono, perché segnala che sai distinguere ciò che puoi raccontare da ciò che non puoi. Un secondo accorgimento utile è dichiarare in anticipo che l’esempio è illustrativo quando ricostruisci uno scenario a partire da conoscenza pubblica: presentare uno scenario ipotetico come esperienza interna è un rischio reputazionale sproporzionato rispetto al vantaggio. Chi ascolta valuta positivamente la trasparenza, perché indica che nel ruolo tratteresti allo stesso modo le informazioni della loro azienda. La regola pratica è semplice: racconta il metodo con precisione e i dati con la granularità che hai il diritto di condividere.`,
    `It is finally worth preparing the version of the defense that uses no numbers, because you cannot always share a former employer data. In that case the structure stays identical but the values become relative: you can say the chosen candidate was first among eligible ones with roughly a ten percent margin over the second, without revealing absolute figures. This keeps the reasoning verifiable without exposing confidential information, and it is a skill interviewers recognize, because it signals you can separate what you may tell from what you may not. A second useful habit is stating in advance that the example is illustrative when you reconstruct a scenario from public knowledge: presenting a hypothetical scenario as internal experience is a reputational risk out of all proportion to the benefit. Listeners value that transparency, because it indicates that in the role you would treat their company information the same way. The practical rule is simple: tell the method precisely and the data at the granularity you have the right to share.`
  )
]

const theoryThree = [
  t(
    `Il caso da lavagna più frequente per questo ruolo è il percorso dal sensore alla decisione umana. Va raccontato in ordine, nominando per ogni salto la sorgente, la destinazione, l’interfaccia concreta, la cadenza e il proprietario del dato. Il valore della risposta non sta nel disegnare molti riquadri ma nel dichiarare dove passa un confine di sicurezza e che cosa succede quando un salto non è disponibile. Chi conosce davvero il dominio nomina il historian come punto di lettura naturale, distingue la cadenza di campionamento dalla latenza di trasporto e non fa parlare direttamente il modello con il livello di controllo. Un dettaglio che colpisce sempre è indicare quale salto domina la latenza complessiva, perché mostra che stai ragionando su un sistema reale e non su uno schema. Nella maggior parte dei percorsi industriali il salto dominante non è tecnico: è il tempo che intercorre prima che una persona guardi la segnalazione.`,
    `The most frequent whiteboard case for this role is the path from sensor to human decision. It must be told in order, naming for each hop the source, the destination, the concrete interface, the cadence, and the data owner. The value of the answer is not in drawing many boxes but in declaring where a security boundary is crossed and what happens when a hop is unavailable. Someone who truly knows the domain names the historian as the natural read point, distinguishes sampling cadence from transport latency, and does not let the model talk directly to the control level. A detail that always lands is stating which hop dominates end-to-end latency, because it shows you are reasoning about a real system rather than a diagram. In most industrial paths the dominant hop is not technical: it is the time before a person looks at the alert.`
  ),
  t(
    `Il secondo movimento del caso da lavagna è la chiusura sulla decisione. Un percorso che finisce con "il modello produce una previsione" non è una risposta completa. La risposta completa dice chi riceve la segnalazione, con quale evidenza, entro quale tempo, con quale alternativa se il servizio non risponde e con quale registrazione dell’esito. È qui che si distingue un profilo tecnico da un profilo di trasformazione: il primo descrive il flusso, il secondo descrive la decisione e la responsabilità. Conviene anche dichiarare in anticipo che il modello non chiude anelli con impatto su sicurezza, perché anticipa una preoccupazione che l’intervistatore quasi certamente ha. Chiudere con una metrica operativa, per esempio quante segnalazioni per turno e quale capacità di revisione esiste, dimostra che stai progettando un sistema che qualcuno dovrà sostenere ogni giorno.`,
    `The second movement of the whiteboard case is closing on the decision. A path that ends with "the model produces a prediction" is not a complete answer. The complete answer says who receives the alert, on which evidence, within which time, with which alternative when the service does not respond, and with which record of the outcome. This is where a technical profile separates from a transformation profile: the first describes the flow, the second describes the decision and the accountability. It also helps to state in advance that the model does not close safety-relevant loops, because it pre-empts a concern the interviewer almost certainly holds. Closing with an operational metric, for example how many alerts per shift and what review capacity exists, shows you are designing a system somebody will have to sustain every day.`
  ),
  t(
    `Il caso da lavagna va anche difeso contro tre domande prevedibili. La prima chiede perché non leggere direttamente dal controllore, e la risposta corretta non è che sia impossibile ma che sposterebbe carico e dipendenze dove la priorità è la continuità, mentre il historian è il sistema pensato per fornire quel dato con contesto. La seconda chiede che cosa succede se la cadenza di esportazione cambia: la risposta corretta collega la cadenza al tipo di guasto osservato, perché un degrado lento tollera minuti mentre un evento rapido richiede una architettura diversa e probabilmente un calcolo vicino alla macchina. La terza chiede quanto costa: la risposta corretta parla di costo dell’esperimento, non della piattaforma, e ricorda che il salto dominante di questo percorso è organizzativo e quindi molto meno costoso da correggere di una integrazione. Preparare queste tre risposte trasforma un disegno statico in una conversazione che dimostra come ragioni sotto pressione, che è esattamente ciò che il caso da lavagna serve a misurare.`,
    `The whiteboard case must also be defended against three predictable questions. The first asks why not read directly from the controller, and the correct answer is not that it is impossible but that it would move load and dependencies to where continuity is the priority, while the historian is the system designed to supply that data with context. The second asks what happens if the export cadence changes: the correct answer connects cadence to the observed failure type, because slow degradation tolerates minutes while a fast event needs a different architecture and probably computation close to the machine. The third asks what it costs: the correct answer speaks about the cost of the experiment rather than the platform, and recalls that the dominant hop on this path is organizational and therefore far cheaper to fix than an integration. Preparing these three answers turns a static drawing into a conversation that shows how you reason under pressure, which is exactly what the whiteboard case is meant to measure.`
  )
]

const theoryFour = [
  t(
    `Le obiezioni degli stakeholder non sono ostacoli da superare ma informazioni da usare. Ogni funzione difende un vincolo reale, e riconoscerlo prima che venga espresso cambia il tono della conversazione. Operations difende la disponibilità della linea e teme qualunque cosa aggiunga passaggi durante il turno. Quality difende la conformità e teme una proposta non tracciabile o una versione documentale sbagliata. IT difende la sostenibilità e teme un sistema che nessuno saprà mantenere fra due anni. OT Security difende il confine e teme un percorso di accesso permanente. Finance difende il ritorno e teme un impegno permanente presentato come esperimento. In un colloquio, nominare queste cinque preoccupazioni con parole loro dimostra che hai lavorato davvero in un contesto industriale, perché sono esattamente le frasi che si sentono in sala.`,
    `Stakeholder objections are not obstacles to overcome but information to use. Every function defends a real constraint, and recognizing it before it is voiced changes the tone of the conversation. Operations defends line availability and fears anything that adds steps during the shift. Quality defends compliance and fears an untraceable proposal or a wrong document revision. IT defends sustainability and fears a system nobody will be able to maintain in two years. OT Security defends the boundary and fears a permanent access path. Finance defends return and fears a permanent commitment presented as an experiment. In an interview, naming these five concerns in their own words demonstrates you have actually worked in an industrial context, because these are exactly the sentences heard in the room.`
  ),
  t(
    `La tecnica di risposta che funziona ha tre passi e va allenata a voce. Primo, riformula l’obiezione in modo che chi l’ha sollevata la riconosca, senza addolcirla. Secondo, accetta la parte vera, perché quasi tutte le obiezioni contengono una parte vera e negarla costa credibilità. Terzo, proponi il controllo specifico che risponde a quella parte, non una rassicurazione generica. Per esempio: se Operations teme passaggi aggiuntivi durante il turno, la risposta non è "sarà semplice da usare" ma "in modalità shadow non aggiunge alcun passaggio, e in fase consultiva la conferma richiede un gesto solo con la fonte già aperta". La differenza tra una rassicurazione e un controllo è che il controllo si può verificare. Un intervistatore esperto ascolta esattamente questo passaggio per capire se hai gestito resistenza reale o soltanto letto di gestione del cambiamento.`,
    `The response technique that works has three steps and must be rehearsed aloud. First, restate the objection so the person who raised it recognizes it, without softening it. Second, accept the part that is true, because almost every objection contains a true part and denying it costs credibility. Third, propose the specific control that answers that part, not a generic reassurance. For example: if Operations fears extra steps during the shift, the answer is not "it will be easy to use" but "in shadow mode it adds no step, and in advisory mode confirmation takes one gesture with the source already open". The difference between a reassurance and a control is that a control can be verified. An experienced interviewer listens for exactly this move to tell whether you have handled real resistance or only read about change management.`
  ),
  t(
    `Va preparata anche l’obiezione che non viene espressa a parole: la paura di essere valutati attraverso lo strumento. Gli operatori raramente la dicono, ma la manifestano usando il sistema in modo difensivo o non usandolo. La risposta professionale non è negarla ma affrontarla per primi, dichiarando che cosa i registri misurano e che cosa non misurano, e separando in modo verificabile le misure aggregate sul sistema dai dati individuali usati solo per ricostruire un incidente. Portare questa distinzione in un colloquio è insolito e memorabile, perché mostra che sai che l’adozione non è un problema di formazione ma di fiducia. Va anche detto che il rifiuto di una persona competente è quasi sempre un segnale tecnico: chi rifiuta con argomenti precisi è la fonte di miglioramento più preziosa di un pilota, non un ostacolo alla comunicazione.`,
    `You should also prepare the objection that is never spoken: the fear of being evaluated through the tool. Operators rarely say it, but they show it by using the system defensively or not using it. The professional answer is not to deny it but to raise it first, stating what the logs measure and what they do not, and verifiably separating aggregate measures about the system from individual records used only to reconstruct an incident. Bringing this distinction into an interview is unusual and memorable, because it shows you know adoption is not a training problem but a trust problem. It is also worth saying that refusal by a competent person is almost always a technical signal: someone who refuses with precise arguments is the most valuable source of improvement in a pilot, not an obstacle to communication.`
  )
]

const theoryFive = [
  t(
    `Le distinzioni centrali vanno sapute dire in inglese in una sola frase, senza esitazione. OT e IT si distinguono per ordine delle priorità: nei sistemi di controllo la disponibilità e l’integrità del processo vengono prima della riservatezza, ed è da lì che derivano tempi e metodi diversi. SCADA e MES si distinguono per funzione: il primo supervisiona e controlla il processo in tempo reale, il secondo governa ordine di produzione, genealogia, materiali e conformità. Edge e cloud si distinguono per vincolo: la latenza e la continuità locale contro la scala e la memoria storica. Ognuna di queste frasi deve poter essere detta in meno di quindici secondi, perché quasi sempre è una domanda di verifica e non di approfondimento. Chi risponde con due minuti a una domanda di verifica comunica che non conosce il peso relativo delle informazioni.`,
    `The central distinctions must be sayable in English in a single sentence, without hesitation. OT and IT differ by priority order: in control systems, process availability and integrity come before confidentiality, and different timings and methods follow from that. SCADA and MES differ by function: the first supervises and controls the process in real time, the second governs the production order, genealogy, materials, and compliance. Edge and cloud differ by constraint: latency and local continuity against scale and historical memory. Each of these sentences must be sayable in under fifteen seconds, because it is almost always a verification question rather than a depth question. Answering a verification question with two minutes communicates that you do not know the relative weight of information.`
  ),
  t(
    `Le distinzioni sui sistemi generativi hanno la stessa esigenza di precisione. RAG non è una ricerca semantica: è un percorso che autorizza, seleziona la revisione effettiva, recupera evidenza e genera claim con citazioni verificabili, rifiutando quando l’evidenza non basta. Un agente non è un chatbot potente: è un ciclo che sceglie ripetutamente l’azione successiva sulla base dei risultati, e conviene soltanto quando il percorso di indagine varia. MCP non è un orchestratore: è un protocollo che collega host, client e server e rende scopribili risorse, tool e prompt, senza decidere autorizzazioni. Ogni volta che una di queste tre frasi viene detta in modo approssimativo, l’intervistatore riceve un segnale forte sulla profondità reale. Vale la pena esercitarle finché non escono identiche tre volte di seguito, perché sono le domande più probabili dell’intero colloquio.`,
    `The distinctions about generative systems demand the same precision. RAG is not semantic search: it is a path that authorizes, resolves the effective revision, retrieves evidence, and generates claims with verifiable citations, refusing when evidence is insufficient. An agent is not a powerful chatbot: it is a loop that repeatedly chooses the next action from results, and it is worth using only when the investigation path varies. MCP is not an orchestrator: it is a protocol connecting host, client, and server and making resources, tools, and prompts discoverable, without deciding authorization. Every time one of these three sentences is said approximately, the interviewer receives a strong signal about real depth. They are worth rehearsing until they come out identically three times in a row, because they are the most likely questions in the entire interview.`
  ),
  t(
    `Una trappola frequente è rispondere a una domanda di distinzione con un elenco di caratteristiche. "MES fa questo, questo e questo" non è una distinzione, è un catalogo. La distinzione richiede un asse: rispetto a che cosa i due elementi sono diversi. L’asse migliore è quasi sempre la decisione che ciascuno supporta e il vincolo che ciascuno rispetta. Un secondo errore è usare la parola inglese senza tradurre il concetto, per esempio dire "genealogy" senza spiegare che significa poter risalire dal lotto finito ai materiali, ai lotti di ingresso, alle macchine e ai turni. In un colloquio internazionale la terminologia corretta è necessaria ma non sufficiente: chi ascolta valuta se sapresti spiegarla a un collega non specialista, perché è esattamente ciò che il ruolo richiede ogni giorno.`,
    `A frequent trap is answering a distinction question with a list of features. "MES does this, this, and this" is not a distinction, it is a catalog. A distinction needs an axis: with respect to what are the two elements different. The best axis is almost always the decision each one supports and the constraint each one respects. A second error is using the English word without translating the concept, for example saying "genealogy" without explaining that it means being able to trace from the finished batch back to materials, incoming lots, machines, and shifts. In an international interview correct terminology is necessary but not sufficient: the listener assesses whether you could explain it to a non-specialist colleague, because that is exactly what the role requires every day.`
  )
]

const theorySix = [
  t(
    `La consegna in inglese si allena separatamente dal contenuto, perché sono due competenze diverse. Il problema più comune per chi parla italiano non è il vocabolario ma la lunghezza delle frasi: la sintassi italiana tollera periodi lunghi che in inglese diventano difficili da seguire. La correzione pratica è imporsi una regola meccanica: un’idea per frase, verbo vicino al soggetto, e nessuna subordinata dopo la seconda virgola. Un secondo problema è la traduzione letterale delle espressioni di collegamento: "in effetti", "a livello di", "per quanto riguarda" producono in inglese formule pesanti. Sostituirle con connettivi brevi rende immediatamente il discorso più professionale. Il terzo problema è il ritmo: rallentare del venti per cento migliora la comprensione più di qualunque miglioramento lessicale, e riduce anche le esitazioni, perché il pensiero resta davanti alla frase invece che al pari.`,
    `English delivery is trained separately from content, because they are two different skills. The most common problem for Italian speakers is not vocabulary but sentence length: Italian syntax tolerates long periods that become hard to follow in English. The practical correction is imposing a mechanical rule: one idea per sentence, verb close to the subject, and no subordinate clause after the second comma. A second problem is literal translation of linking expressions: phrases meaning "in effect", "at the level of", or "with regard to" produce heavy English formulas. Replacing them with short connectors immediately makes the delivery sound more professional. The third problem is pace: slowing down by twenty percent improves comprehension more than any vocabulary gain, and also reduces hesitation, because thought stays ahead of the sentence instead of level with it.`
  ),
  t(
    `Le domande di follow-up vanno trattate come parte della risposta, non come un esame supplementare. Un intervistatore che chiede un dettaglio sta segnalando interesse, e la reazione corretta è dare il dettaglio richiesto e fermarsi, senza ricominciare la risposta dall’inizio. Tre tipi di follow-up sono quasi certi. Il primo chiede un numero: va data la cifra e il metodo con cui è stata ottenuta. Il secondo chiede un caso limite: va descritto il comportamento del sistema in quel caso, non l’intenzione. Il terzo chiede che cosa faresti diversamente: va data una risposta reale, perché dire che non cambieresti nulla è quasi sempre percepito come mancanza di riflessione. Preparare due follow-up per ogni argomento centrale copre la maggior parte delle direzioni che una conversazione tecnica può prendere.`,
    `Follow-up questions should be treated as part of the answer, not as an extra exam. An interviewer asking for a detail is signaling interest, and the correct reaction is giving the requested detail and stopping, without restarting the answer from the beginning. Three kinds of follow-up are nearly certain. The first asks for a number: give the figure and the method that produced it. The second asks for an edge case: describe the behavior of the system in that case, not the intention. The third asks what you would do differently: give a real answer, because saying you would change nothing is almost always read as lack of reflection. Preparing two follow-ups for each core topic covers most directions a technical conversation can take.`
  ),
  t(
    `Serve infine un piccolo repertorio di frasi di recupero, da usare quando perdi il filo, quando non capisci la domanda o quando ti accorgi di aver detto qualcosa di impreciso. Chiedere una riformulazione è professionale e non penalizzante, purché sia specifico: chiedere se la domanda riguarda l’architettura oppure il processo di decisione è molto meglio di un generico "puoi ripetere". Correggersi in modo esplicito e breve rafforza la credibilità, perché mostra controllo su ciò che stai dicendo. Prendere due secondi di silenzio prima di iniziare è quasi sempre percepito come sicurezza, non come esitazione. Queste frasi vanno provate a voce come tutto il resto, perché sotto pressione si usa soltanto ciò che è già automatico, e un repertorio letto ma mai pronunciato non è disponibile nel momento in cui serve davvero.`,
    `Finally you need a small repertoire of recovery phrases, for when you lose the thread, do not understand the question, or realize you said something imprecise. Asking for a rephrasing is professional and not penalized, provided it is specific: asking whether the question is about the architecture or about the decision process is far better than a generic "can you repeat". Correcting yourself explicitly and briefly strengthens credibility, because it shows control over what you are saying. Taking two seconds of silence before starting is almost always read as confidence rather than hesitation. These phrases must be rehearsed aloud like everything else, because under pressure you only use what is already automatic, and a repertoire that was read but never spoken is not available at the moment it is actually needed.`
  ),
  t(
    `Un allenamento che rende molto in poco tempo è la traduzione inversa. Prendi una tua risposta italiana, scrivila in inglese, poi rileggila e chiediti quali frasi tradiscono la struttura italiana: subordinate lunghe, soggetti impliciti, sostantivi astratti al posto dei verbi. La correzione tipica trasforma "la valutazione della prontezza dei dati è stata effettuata" in "we assessed data readiness", con un guadagno immediato di chiarezza e di credibilità. Un secondo esercizio è il taglio progressivo: dire la stessa risposta in due minuti, poi in un minuto, poi in trenta secondi, tenendo sempre la prima frase identica. Ciò che sopravvive al terzo taglio è il nucleo della risposta, e conoscerlo permette di adattarsi in tempo reale quando l’intervistatore mostra fretta. Il terzo esercizio riguarda i numeri: pronunciare ad alta voce percentuali, intervalli e unità è sorprendentemente difficile in una seconda lingua sotto pressione, e sbagliare un numero indebolisce proprio la parte più verificabile della risposta. Provare cinque numeri chiave finché escono senza esitazione costa pochi minuti e protegge la credibilità nel momento in cui conta di più.`,
    `A training exercise that pays off quickly is reverse translation. Take one of your Italian answers, write it in English, then reread it and ask which sentences betray Italian structure: long subordinate clauses, implied subjects, abstract nouns where verbs belong. The typical correction turns "an assessment of data readiness was carried out" into "we assessed data readiness", with an immediate gain in clarity and credibility. A second exercise is progressive cutting: saying the same answer in two minutes, then one minute, then thirty seconds, always keeping the first sentence identical. What survives the third cut is the core of the answer, and knowing it lets you adapt in real time when the interviewer shows impatience. The third exercise concerns numbers: saying percentages, ranges, and units aloud is surprisingly hard in a second language under pressure, and getting a number wrong weakens precisely the most verifiable part of the answer. Rehearsing five key numbers until they come out without hesitation costs a few minutes and protects credibility exactly when it matters most.`
  )
]

const theorySeven = [
  t(
    `La simulazione si esegue una sola volta per sessione, senza note, in inglese e con un cronometro visibile. Le regole contano più della perfezione: se un segmento finisce prima del tempo, il tempo residuo non si recupera altrove; se un segmento sfora, si interrompe e si passa al successivo. Questo vincolo riproduce la pressione reale, dove nessun intervistatore concede tempo extra perché la risposta stava diventando interessante. Registrare l’audio è essenziale, perché la valutazione a memoria è sistematicamente generosa. Durante la simulazione non ci si corregge a metà: si completa il segmento e si annota la correzione dopo, altrimenti si allena esattamente l’abitudine che rende una risposta confusa. La prima esecuzione produce quasi sempre punteggi bassi su struttura e chiarezza inglese, ed è un risultato utile, non un motivo per ripetere subito.`,
    `The simulation runs once per session, without notes, in English, and with a visible timer. The rules matter more than perfection: if a segment finishes early, the remaining time is not recovered elsewhere; if a segment overruns, it is cut and the next one starts. This constraint reproduces real pressure, where no interviewer grants extra time because an answer was becoming interesting. Recording the audio is essential, because scoring from memory is systematically generous. During the simulation you do not self-correct mid-answer: you finish the segment and note the correction afterwards, otherwise you train exactly the habit that makes an answer confusing. The first run almost always produces low scores on structure and English clarity, and that is a useful result rather than a reason to repeat immediately.`
  ),
  t(
    `La prima metà copre apertura, distinzioni fondamentali e architettura, cioè le domande che quasi ogni colloquio tecnico per questo ruolo pone entro i primi dieci minuti. Il segmento di apertura vale tre minuti e serve a stabilire il metodo: chi ascolta deve capire subito che parti dalla perdita operativa e non dalla tecnologia. Il segmento su OT, IT, MES e SCADA vale quattro minuti e misura precisione: due distinzioni, una frase ciascuna, senza elenchi di funzioni. Il segmento sul percorso dal sensore alla decisione vale tre minuti e misura se sai chiudere su una decisione invece che su una previsione. Conviene provare la prima metà da sola più volte prima di eseguire i venti minuti completi, perché la fatica cognitiva della seconda metà dipende da quanto la prima è automatica. Se la prima metà richiede ancora sforzo per ricordare la struttura, la seconda metà perde qualità indipendentemente da quanto bene conosci quegli argomenti.`,
    `The first half covers the opening, the fundamental distinctions, and the architecture, meaning the questions almost every technical interview for this role asks within the first ten minutes. The opening segment is worth three minutes and establishes the method: the listener must immediately understand that you start from the operational loss rather than the technology. The segment on OT, IT, MES, and SCADA is worth four minutes and measures precision: two distinctions, one sentence each, with no feature lists. The segment on the sensor-to-decision path is worth three minutes and measures whether you can close on a decision rather than a prediction. It is worth rehearsing the first half alone several times before running the full twenty minutes, because the cognitive load of the second half depends on how automatic the first has become. If the first half still requires effort to recall the structure, the second half loses quality regardless of how well you know those topics.`
  )
]

const theoryEight = [
  t(
    `La valutazione avviene dopo, riascoltando la registrazione con la rubric davanti e assegnando 0, 1 o 2 su ciascuno dei sei criteri. La regola più importante è non mediare tra argomenti: un totale medio alto non compensa un argomento sotto soglia, perché in colloquio verrà chiesto proprio quello. La prontezza richiede almeno dieci su dodici su ogni risposta centrale e la simulazione completata senza note. Ogni argomento sotto soglia riceve una azione correttiva specifica, non un generico "ripassare": riscrivere la prima frase, preparare un esempio con numeri, accorciare le frasi inglesi. La scheda di ripasso rapido serve nei minuti prima del colloquio e contiene una sola riga per argomento con la sintesi da dire per prima e la trappola da evitare. È volutamente breve, perché nell’ultima mezz’ora rileggere materiale lungo aumenta l’ansia senza aumentare la prontezza.`,
    `Scoring happens afterwards, by listening back to the recording with the rubric in front of you and assigning 0, 1, or 2 on each of the six criteria. The most important rule is not averaging across topics: a high average total does not compensate for one topic below threshold, because that is precisely the one the interview will ask about. Readiness requires at least ten out of twelve on every core answer and the simulation completed without notes. Every topic below threshold receives a specific corrective action, not a generic "review it": rewrite the first sentence, prepare an example with numbers, shorten the English sentences. The rapid review sheet is for the minutes before the interview and holds one line per topic with the headline to say first and the trap to avoid. It is deliberately short, because rereading long material in the final half hour raises anxiety without raising readiness.`
  ),
  t(
    `Vale la pena chiarire come si usa il tracciatore nel tempo, perché un solo ciclo non basta. La prima esecuzione produce una fotografia, spesso severa, e la sua utilità è indicare dove intervenire, non giudicare la preparazione complessiva. La seconda esecuzione, dopo aver applicato le azioni correttive, mostra se il problema era di struttura o di contenuto: se il punteggio su struttura sale ma quello su esempio resta fermo, mancano davvero i numeri e non la forma. La terza esecuzione serve a verificare la stabilità sotto pressione, ed è quella che conta di più, perché in colloquio non ripeterai la risposta. Un criterio pratico per fermarsi è raggiungere due esecuzioni consecutive con ogni argomento sopra soglia: una sola può essere fortuna, due indicano che la struttura è diventata automatica. Va anche accettato che uno o due argomenti resteranno più deboli degli altri, e in quel caso la preparazione utile non è ripetere la stessa risposta ma prepararne una versione più breve e più difendibile, che riduce la superficie esposta alle domande di approfondimento.`,
    `It is worth clarifying how the tracker is used over time, because one cycle is not enough. The first run produces a snapshot, often a harsh one, and its usefulness is showing where to intervene rather than judging overall preparation. The second run, after applying the corrective actions, shows whether the problem was structure or content: if the structure score rises while the example score stays flat, what is genuinely missing is numbers and not form. The third run checks stability under pressure, and it matters most, because in the interview you will not repeat the answer. A practical stopping criterion is reaching two consecutive runs with every topic above threshold: one can be luck, two indicate the structure has become automatic. It should also be accepted that one or two topics will stay weaker than the rest, and in that case the useful preparation is not repeating the same answer but preparing a shorter and more defensible version, which reduces the surface exposed to follow-up questions.`
  )
]

export const automationDefenceMatrix = {
  id: 'automation-defence-matrix',
  title: t('Matrice di prioritizzazione da difendere', 'Prioritization matrix to defend'),
  description: t(
    'Quattro candidati valutati su quattro criteri pesati, con un cancello non negoziabile applicato prima della classifica.',
    'Four candidates scored on four weighted criteria, with a non-negotiable gate applied before ranking.'
  ),
  weightScale: t('Pesi interi che sommano a 10; punteggi interi da 0 a 10.', 'Integer weights summing to 10; integer scores from 0 to 10.'),
  criteria: [
    { id: 'value', weight: 4, label: t('Valore sulla perdita operativa misurata', 'Value against the measured operational loss') },
    { id: 'feasibility', weight: 3, label: t('Fattibilità con i dati già disponibili', 'Feasibility with data already available') },
    { id: 'risk-control', weight: 2, label: t('Controllabilità del rischio e reversibilità', 'Risk control and reversibility') },
    { id: 'adoption', weight: 1, label: t('Probabilità di adozione nel turno', 'Likelihood of adoption during the shift') }
  ],
  hardGate: t(
    'Nessun candidato può essere selezionato se decide un rilascio o produce un effetto irreversibile senza approvazione umana.',
    'No candidate may be selected if it decides a release or produces an irreversible effect without human approval.'
  ),
  candidates: [
    {
      id: 'quality-doc-retrieval',
      label: t('Recupero del criterio di qualità applicabile', 'Retrieval of the applicable quality criterion'),
      scores: [
        { id: 'value', weight: 4, score: 9 },
        { id: 'feasibility', weight: 3, score: 8 },
        { id: 'risk-control', weight: 2, score: 7 },
        { id: 'adoption', weight: 1, score: 8 }
      ],
      weightedScore: 82,
      hardGatePassed: true,
      eligible: true
    },
    {
      id: 'maintenance-work-order-drafting',
      label: t('Bozza di ordine di manutenzione da una nota', 'Maintenance work-order draft from a note'),
      scores: [
        { id: 'value', weight: 4, score: 8 },
        { id: 'feasibility', weight: 3, score: 7 },
        { id: 'risk-control', weight: 2, score: 8 },
        { id: 'adoption', weight: 1, score: 7 }
      ],
      weightedScore: 76,
      hardGatePassed: true,
      eligible: true
    },
    {
      id: 'shift-report-generation',
      label: t('Generazione del rapporto di turno', 'Shift report generation'),
      scores: [
        { id: 'value', weight: 4, score: 6 },
        { id: 'feasibility', weight: 3, score: 9 },
        { id: 'risk-control', weight: 2, score: 8 },
        { id: 'adoption', weight: 1, score: 6 }
      ],
      weightedScore: 73,
      hardGatePassed: true,
      eligible: true
    },
    {
      id: 'autonomous-batch-release',
      label: t('Rilascio autonomo del lotto', 'Autonomous batch release'),
      scores: [
        { id: 'value', weight: 4, score: 10 },
        { id: 'feasibility', weight: 3, score: 6 },
        { id: 'risk-control', weight: 2, score: 2 },
        { id: 'adoption', weight: 1, score: 5 }
      ],
      weightedScore: 67,
      hardGatePassed: false,
      eligible: false
    }
  ],
  selectedCandidateId: 'quality-doc-retrieval',
  sensitivityNote: t(
    'Spostando il peso del valore da 4 a 3 e quello della fattibilità da 3 a 4, la selezione non cambia: il candidato scelto resta primo tra gli ammissibili.',
    'Moving the value weight from 4 to 3 and the feasibility weight from 3 to 4 does not change the selection: the chosen candidate stays first among eligible ones.'
  )
}

export const sensorToDecisionPath = {
  id: 'sensor-to-decision-whiteboard',
  title: t('Percorso da sensore a decisione', 'Sensor-to-decision path'),
  description: t(
    'Sei salti con interfaccia, cadenza, proprietario e latenza dichiarati, sommati fino alla decisione umana.',
    'Six hops with declared interface, cadence, owner, and latency, summed through to the human decision.'
  ),
  hops: [
    { id: 'sensor-to-plc', from: 'sensore di vibrazione', to: 'PLC', interface: '4-20 mA', latencySeconds: 1, owner: 'automation', zoneCrossing: false },
    { id: 'plc-to-historian', from: 'PLC', to: 'historian', interface: 'OPC UA', latencySeconds: 2, owner: 'automation', zoneCrossing: true },
    { id: 'historian-to-platform', from: 'historian', to: 'data platform', interface: 'batch export', latencySeconds: 60, owner: 'it-platform', zoneCrossing: true },
    { id: 'platform-to-model', from: 'data platform', to: 'model service', interface: 'internal API', latencySeconds: 5, owner: 'ai-product', zoneCrossing: false },
    { id: 'model-to-alert', from: 'model service', to: 'alert queue', interface: 'event stream', latencySeconds: 2, owner: 'ai-product', zoneCrossing: false },
    { id: 'alert-to-decision', from: 'alert queue', to: 'maintenance planner', interface: 'work list', latencySeconds: 120, owner: 'maintenance', zoneCrossing: false }
  ],
  endToEndSeconds: 190,
  dominantHopId: 'alert-to-decision',
  humanDecision: t(
    'Il pianificatore di manutenzione decide se aprire un ordine, con la serie temporale e il modo di guasto atteso visibili.',
    'The maintenance planner decides whether to open a work order, with the time series and the expected failure mode visible.'
  ),
  fallback: t(
    'Se il servizio del modello non risponde, la coda resta vuota e il turno usa la ronda programmata: nessuna segnalazione parziale.',
    'If the model service does not answer, the queue stays empty and the shift uses the scheduled round: no partial alerts.'
  ),
  safetyBoundary: t(
    'Nessun salto scrive verso il livello di controllo e il modello non partecipa alla catena di arresto.',
    'No hop writes toward the control level and the model does not participate in the stop chain.'
  )
}

const automationDefenceCase = {
  id: 'automation-prioritization-defence',
  durationMinutes: 5,
  pmiCase: true,
  hypothetical: true,
  publicContext: true,
  title: t(
    'Caso ipotetico: difendere una prioritizzazione davanti al comitato',
    'Hypothetical case: defending a prioritization to the committee'
  ),
  scenario: t(
    'Il comitato chiede perché il rilascio autonomo del lotto, che ha il valore atteso più alto, non è stato scelto, e perché la prima automazione è il recupero del criterio di qualità.',
    'The committee asks why autonomous batch release, which has the highest expected value, was not chosen, and why the first automation is quality criterion retrieval.'
  ),
  assumptions: [
    t('I pesi sono stati concordati prima di vedere i punteggi.', 'Weights were agreed before scores were seen.'),
    t('I punteggi di valore derivano da una baseline osservata per quattro settimane.', 'Value scores derive from a baseline observed over four weeks.'),
    t('Il cancello non negoziabile si applica prima della classifica.', 'The non-negotiable gate applies before ranking.')
  ],
  analysisSteps: [
    t('Dichiarare criteri e pesi prima di nominare qualunque candidato.', 'Declare criteria and weights before naming any candidate.'),
    t('Calcolare i punteggi pesati e mostrarli tutti, anche quelli scartati.', 'Compute the weighted scores and show them all, including rejected ones.'),
    t('Applicare il cancello e separare valore atteso da ammissibilità.', 'Apply the gate and separate expected value from eligibility.'),
    t('Rispondere al test di sensibilità sui pesi.', 'Answer the sensitivity test on the weights.')
  ],
  reasoning: t(
    'Con pesi 4, 3, 2 e 1 i punteggi sono 82 per il recupero del criterio di qualità, 76 per la bozza di ordine, 73 per il rapporto di turno e 67 per il rilascio autonomo. Il rilascio autonomo ha il valore più alto sul primo criterio, dieci su dieci, ma fallisce il cancello perché deciderebbe un rilascio senza approvazione umana. Un cancello non si compensa con un punteggio, quindi esce dalla classifica invece di posizionarsi in fondo.',
    'With weights 4, 3, 2, and 1 the scores are 82 for quality criterion retrieval, 76 for the work-order draft, 73 for the shift report, and 67 for autonomous release. Autonomous release has the highest value on the first criterion, ten out of ten, but fails the gate because it would decide a release without human approval. A gate is not offset by a score, so it leaves the ranking rather than sitting at the bottom.'
  ),
  decision: t(
    'Selezionare il recupero del criterio di qualità come prima automazione, con la bozza di ordine come candidato successivo nello stesso trimestre.',
    'Select quality criterion retrieval as the first automation, with the work-order draft as the next candidate in the same quarter.'
  ),
  tradeOff: t(
    'Rinunciamo nel breve al beneficio teorico più alto e accettiamo un ritorno più lento. In cambio manteniamo la reversibilità, evitiamo una decisione di conformità presa da un sistema e otteniamo evidenza utilizzabile per il candidato successivo.',
    'In the short term we give up the highest theoretical benefit and accept a slower return. In exchange we keep reversibility, avoid a compliance decision taken by a system, and obtain evidence usable for the next candidate.'
  ),
  outcome: t(
    'Il comitato approva il primo candidato. Il test di sensibilità mostra che scambiando i pesi di valore e fattibilità la selezione non cambia, quindi la scelta non dipende da una taratura fine dei pesi.',
    'The committee approves the first candidate. The sensitivity test shows that swapping the value and feasibility weights does not change the selection, so the choice does not depend on fine weight tuning.'
  ),
  followUps: [
    t('Che cosa farebbe rientrare il rilascio autonomo tra i candidati?', 'What would bring autonomous release back among the candidates?'),
    t('Come risponderesti se i pesi fossero contestati dopo aver visto i punteggi?', 'How would you answer if the weights were contested after the scores were seen?')
  ],
  caseArtifact: automationDefenceMatrix
}

const whiteboardArchitectureCase = {
  id: 'whiteboard-sensor-to-decision-case',
  durationMinutes: 5,
  pmiCase: true,
  hypothetical: true,
  publicContext: true,
  title: t(
    'Caso ipotetico: lavagna dal sensore alla decisione',
    'Hypothetical case: whiteboard from sensor to decision'
  ),
  scenario: t(
    'L’intervistatore chiede di disegnare come una vibrazione anomala su un motore diventa una decisione di manutenzione, e dove si trovano i confini.',
    'The interviewer asks you to draw how an abnormal vibration on a motor becomes a maintenance decision, and where the boundaries are.'
  ),
  assumptions: [
    t('Il historian è già in una zona intermedia e conserva le serie con contesto.', 'The historian already sits in an intermediate zone and stores series with context.'),
    t('Il servizio del modello non ha alcun percorso di scrittura verso il livello di controllo.', 'The model service has no write path toward the control level.'),
    t('La coda di segnalazioni è rivista dal pianificatore una volta per turno.', 'The alert queue is reviewed by the planner once per shift.')
  ],
  analysisSteps: [
    t('Nominare i sei salti con interfaccia, proprietario e latenza.', 'Name the six hops with interface, owner, and latency.'),
    t('Indicare i due attraversamenti di zona e che cosa li controlla.', 'Point out the two zone crossings and what controls them.'),
    t('Sommare le latenze e identificare il salto dominante.', 'Sum the latencies and identify the dominant hop.'),
    t('Chiudere sulla decisione umana, sul fallback e sul confine di sicurezza.', 'Close on the human decision, the fallback, and the safety boundary.')
  ],
  reasoning: t(
    'Le latenze dichiarate sono 1, 2, 60, 5, 2 e 120 secondi, quindi il percorso end-to-end è 190 secondi. Il salto dominante non è tecnico: sono i 120 secondi prima che una persona guardi la coda. Ottimizzare il servizio del modello da 5 a 2 secondi cambierebbe il totale di poco più dell’uno per cento, mentre spostare la revisione della coda cambierebbe il risultato in modo sostanziale.',
    'The declared latencies are 1, 2, 60, 5, 2, and 120 seconds, so the end-to-end path is 190 seconds. The dominant hop is not technical: it is the 120 seconds before a person looks at the queue. Optimizing the model service from 5 to 2 seconds would change the total by little more than one percent, while moving the queue review would change the result substantially.'
  ),
  decision: t(
    'Presentare il percorso completo e proporre come primo intervento la revisione della coda dentro il turno, non una ottimizzazione del servizio del modello.',
    'Present the complete path and propose reviewing the queue within the shift as the first intervention, rather than optimizing the model service.'
  ),
  tradeOff: t(
    'Anticipare la revisione della coda consuma tempo del pianificatore in un momento del turno già carico. In cambio riduce il ritardo dominante e rende utile la previsione, che altrimenti arriva troppo tardi per cambiare la decisione.',
    'Moving the queue review earlier consumes planner time at an already busy point in the shift. In exchange it cuts the dominant delay and makes the prediction useful, since otherwise it arrives too late to change the decision.'
  ),
  outcome: t(
    'La risposta mostra il percorso, i confini, il fallback e la priorità di intervento corretta, e chiarisce che il modello non partecipa alla catena di arresto.',
    'The answer shows the path, the boundaries, the fallback, and the correct intervention priority, and makes clear the model does not participate in the stop chain.'
  ),
  followUps: [
    t('Che cosa cambieresti se la cadenza di esportazione scendesse a cinque secondi?', 'What would change if the export cadence dropped to five seconds?'),
    t('Come giustifichi la lettura dal historian invece che dal PLC?', 'How do you justify reading from the historian instead of the PLC?')
  ],
  caseArtifact: sensorToDecisionPath
}

const units = [
  {
    id: 'layered-answer-architecture',
    eyebrow: t('Unità 1', 'Unit 1'),
    title: t('Architettura della risposta: sintesi, ragionamento, esempio, trade-off, risultato', 'Layered answer structure: headline, reasoning, example, trade-off, result'),
    estimatedMinutes: 9,
    timeAllocation: { theory: 4, cases: 2, practice: 3 },
    theory: theoryOne,
    terminology: [t('Frase di sintesi: la prima frase, che contiene la posizione e non la premessa.', 'Headline sentence: the first sentence, containing the position rather than the preamble.')],
    microExamples: [microExample(
      'headline-or-preamble', 2,
      'Sintesi oppure premessa', 'Headline or preamble',
      'Due aperture per la stessa domanda sulla scelta delle automazioni occupano lo stesso tempo ma comunicano cose diverse.',
      'Two openings for the same question about choosing automations take the same time but communicate different things.',
      {
        learnerAction: ['Confronta le due aperture e scegli quella che regge come prima frase.', 'Compare the two openings and choose the one that works as a first sentence.'],
        expectedOutput: ['Una apertura scelta con l’elemento mancante nell’altra.', 'One selected opening with the element missing from the other.'],
        modelReasoning: ['L’apertura B contiene una posizione verificabile e un criterio; l’apertura A rinvia la posizione e consuma il tempo di attenzione iniziale.', 'Opening B contains a verifiable position and a criterion; opening A postpones the position and consumes the initial attention window.'],
        responseFormat: ['Apertura scelta | elemento mancante nell’altra.', 'Selected opening | element missing in the other.'],
        columns: [['Elemento', 'Element'], ['Apertura A', 'Opening A'], ['Apertura B', 'Opening B']],
        rows: [
          ['position', ['Posizione', 'Position'], ['Rinviata alla fine', 'Postponed to the end'], ['Nella prima frase', 'In the first sentence']],
          ['criterion', ['Criterio', 'Criterion'], ['Non dichiarato', 'Not declared'], ['Perdita operativa misurata', 'Measured operational loss']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 0
      }
    )],
    activities: [activity(
      'compress-to-headline', 3,
      'Riscrivi una risposta prolissa in una sola frase di sintesi.',
      'Rewrite a verbose answer as a single headline sentence.',
      'Una frase di sintesi.', 'One headline sentence.',
      'La risposta originale spiega per quaranta secondi il contesto aziendale prima di dire quale processo è stato automatizzato.',
      'The original answer explains company context for forty seconds before saying which process was automated.',
      'Una frase con posizione e criterio.', 'One sentence with position and criterion.',
      'Ho scelto il recupero del criterio di qualità perché era la perdita operativa più densa e reversibile: dodici minuti mediani per trovare la fonte corretta, misurati su quattro settimane.',
      'I chose quality criterion retrieval because it was the densest and most reversible operational loss: a twelve-minute median to find the correct source, measured over four weeks.',
      'La frase contiene posizione, criterio e almeno un numero ancorato.',
      'The sentence contains a position, a criterion, and at least one anchored number.'
    )],
    checkpoint: checkpoint(
      'Che cosa deve contenere la prima frase di una risposta tecnica?',
      'What must the first sentence of a technical answer contain?',
      [
        ['Il contesto aziendale necessario a capire il resto.', 'The company context needed to understand the rest.', 'Il contesto rinvia la posizione e consuma l’attenzione iniziale.', 'Context postpones the position and consumes the initial attention.'],
        ['La posizione e il criterio con cui è stata scelta.', 'The position and the criterion behind it.', 'Dà una direzione al resto della risposta.', 'It gives the rest of the answer a direction.'],
        ['Un elenco delle tecnologie coinvolte.', 'A list of the technologies involved.', 'Le tecnologie non sono una decisione.', 'Technologies are not a decision.']
      ],
      1
    ),
    sourceIds: ['nist-manufacturing-kpi-procedure', 'uk-government-stakeholder-mapping']
  },
  {
    id: 'automation-prioritization-defence',
    eyebrow: t('Unità 2', 'Unit 2'),
    title: t('Difendere una prioritizzazione con criteri, pesi e cancelli', 'Defending a prioritization with criteria, weights, and gates'),
    estimatedMinutes: 9,
    timeAllocation: { theory: 2, cases: 5, practice: 2 },
    theory: theoryTwo,
    terminology: [t('Test di sensibilità: verifica che il risultato non cambi spostando un peso di una unità.', 'Sensitivity test: checking that the result does not change when one weight moves by one unit.')],
    workedCases: [automationDefenceCase],
    activities: [activity(
      'answer-highest-value-objection', 2,
      'Rispondi in una frase alla domanda: perché non hai scelto il candidato con il valore più alto?',
      'Answer in one sentence: why did you not choose the highest-value candidate?',
      'Una risposta in una frase.', 'One single-sentence answer.',
      'Il candidato ha dieci su dieci di valore ma fallisce il cancello sulla decisione di rilascio.',
      'The candidate scores ten out of ten on value but fails the release-decision gate.',
      'Frase con distinzione e conseguenza.', 'Sentence with the distinction and the consequence.',
      'Il valore atteso e l’ammissibilità sono due cose diverse: quel candidato deciderebbe un rilascio senza approvazione umana, e un cancello non si compensa con un punteggio, quindi esce dalla classifica.',
      'Expected value and eligibility are two different things: that candidate would decide a release without human approval, and a gate is not offset by a score, so it leaves the ranking.',
      'Separa valore e ammissibilità e nomina il cancello specifico.',
      'Separates value from eligibility and names the specific gate.'
    )],
    checkpoint: checkpoint(
      'Quando vanno dichiarati i pesi di una matrice di prioritizzazione?',
      'When must the weights of a prioritization matrix be declared?',
      [
        ['Dopo aver calcolato i punteggi, per tararli meglio.', 'After computing the scores, to tune them better.', 'Diventa una giustificazione costruita a posteriori.', 'It becomes a justification built after the fact.'],
        ['Prima di vedere i punteggi dei candidati.', 'Before seeing the candidate scores.', 'Rende la matrice una decisione e non una difesa.', 'It makes the matrix a decision rather than a defense.'],
        ['Non vanno dichiarati, basta il risultato finale.', 'They need not be declared, the final result is enough.', 'Senza pesi il risultato non è verificabile.', 'Without weights the result cannot be verified.']
      ],
      1
    ),
    sourceIds: ['nist-manufacturing-kpi-hierarchy', 'oecd-digital-transformation-definitions']
  },
  {
    id: 'whiteboard-sensor-to-decision',
    eyebrow: t('Unità 3', 'Unit 3'),
    title: t('Caso da lavagna: da sensore a edge, piattaforma, AI e decisione umana', 'Whiteboard case: sensor to edge, platform, AI, and human decision'),
    estimatedMinutes: 9,
    timeAllocation: { theory: 2, cases: 5, practice: 2 },
    theory: theoryThree,
    terminology: [t('Salto dominante: il passaggio che contribuisce la quota maggiore alla latenza end-to-end.', 'Dominant hop: the step contributing the largest share of end-to-end latency.')],
    workedCases: [whiteboardArchitectureCase],
    activities: [activity(
      'name-the-dominant-hop', 2,
      'Identifica il salto dominante del percorso e la conseguenza per la priorità di intervento.',
      'Identify the dominant hop of the path and the consequence for intervention priority.',
      'Un salto più una conseguenza.', 'One hop plus one consequence.',
      'Le latenze dichiarate sono 1, 2, 60, 5, 2 e 120 secondi.',
      'The declared latencies are 1, 2, 60, 5, 2, and 120 seconds.',
      'Salto | conseguenza in una frase.', 'Hop | consequence in one sentence.',
      'Il salto dominante è il tempo prima che il pianificatore guardi la coda, 120 su 190 secondi, quindi il primo intervento è la revisione della coda dentro il turno e non l’ottimizzazione del servizio del modello.',
      'The dominant hop is the time before the planner looks at the queue, 120 of 190 seconds, so the first intervention is reviewing the queue within the shift rather than optimizing the model service.',
      'Individua il contributo maggiore e ne deriva la priorità corretta.',
      'Identifies the largest contributor and derives the correct priority from it.',
      0, 1
    )],
    checkpoint: checkpoint(
      'Da quale sistema conviene leggere le serie temporali per un caso predittivo?',
      'Which system should time series be read from for a predictive case?',
      [
        ['Direttamente dal PLC, per avere il dato più fresco.', 'Directly from the PLC, to get the freshest data.', 'Mette carico e dipendenze dove la priorità è la disponibilità.', 'It places load and dependencies where availability is the priority.'],
        ['Dal historian in zona intermedia, che conserva serie con contesto.', 'From the historian in an intermediate zone, which stores series with context.', 'È il sistema pensato per fornire quel dato.', 'It is the system designed to provide that data.'],
        ['Dal sistema gestionale, che contiene tutti i dati aziendali.', 'From the business system, which holds all company data.', 'Non conserva le serie di processo con la cadenza necessaria.', 'It does not hold process series at the required cadence.']
      ],
      1
    ),
    sourceIds: ['isa-95', 'opc-ua-part-1', 'nist-sp-800-82-r3']
  },
  {
    id: 'stakeholder-objection-handling',
    eyebrow: t('Unità 4', 'Unit 4'),
    title: t('Obiezioni di Operations, Quality, IT, OT Security e Finance', 'Objections from Operations, Quality, IT, OT Security, and Finance'),
    estimatedMinutes: 10,
    timeAllocation: { theory: 3, cases: 4, practice: 3 },
    theory: theoryFour,
    terminology: [t('Controllo verificabile: risposta a una obiezione che qualcuno può misurare, a differenza di una rassicurazione.', 'Verifiable control: an answer to an objection that somebody can measure, unlike a reassurance.')],
    caseSegments: [caseSegment(
      'objection-response-review', 4,
      'Revisione di tre risposte a obiezioni', 'Review of three objection responses',
      'Tre risposte alla stessa obiezione di Operations sul carico durante il turno arrivano da tre candidati diversi.',
      'Three answers to the same Operations objection about shift workload come from three different candidates.',
      {
        learnerAction: ['Confronta le tre risposte, interpreta quale offre un controllo verificabile e scegli la migliore.', 'Compare the three answers, interpret which offers a verifiable control, and choose the best.'],
        expectedOutput: ['Una risposta scelta con la ragione per cui le altre non reggono.', 'One selected answer with the reason the others do not hold.'],
        modelReasoning: ['Solo la terza riconosce la parte vera dell’obiezione e propone un controllo misurabile; la prima nega il problema e la seconda offre una rassicurazione non verificabile.', 'Only the third acknowledges the true part of the objection and proposes a measurable control; the first denies the problem and the second offers an unverifiable reassurance.'],
        responseFormat: ['Risposta scelta | perché le altre non reggono.', 'Selected answer | why the others do not hold.'],
        columns: [['Risposta', 'Answer'], ['Riconosce la parte vera', 'Acknowledges the true part'], ['Offre un controllo verificabile', 'Offers a verifiable control']],
        rows: [
          ['deny', ['"Non aggiunge lavoro"', '"It adds no work"'], ['No', 'No'], ['No', 'No']],
          ['reassure', ['"Sarà semplice da usare"', '"It will be easy to use"'], ['Parziale', 'Partial'], ['No', 'No']],
          ['control', ['"In shadow non aggiunge passaggi; in consultivo la conferma è un gesto con la fonte già aperta"', '"In shadow mode it adds no step; in advisory mode confirmation is one gesture with the source already open"'], ['Sì', 'Yes'], ['Sì', 'Yes']]
        ],
        decisionCount: 1,
        comparisonCount: 2,
        interpretationCount: 1
      }
    )],
    activities: [activity(
      'answer-ot-security-objection', 3,
      'Rispondi alla obiezione di OT Security sulla connessione verso la zona industriale.',
      'Answer the OT Security objection about the connection into the industrial zone.',
      'Una risposta in tre passi.', 'One three-step answer.',
      'L’obiezione è che il progetto introdurrebbe un percorso di accesso permanente verso la rete di controllo.',
      'The objection is that the project would introduce a permanent access path into the control network.',
      'Riformulazione | parte vera | controllo.', 'Restatement | true part | control.',
      'Chiedete di non aprire un percorso permanente verso la zona di controllo, ed è corretto; leggiamo però dal historian in zona intermedia, in uscita e a cadenza concordata, senza alcun percorso in entrata e senza credenziali persistenti.',
      'You are asking me not to open a permanent path into the control zone, and that is right; we read from the historian in the intermediate zone instead, outbound and on an agreed cadence, with no inbound path and no persistent credentials.',
      'Riformula senza addolcire, accetta la parte vera e propone un controllo verificabile.',
      'Restates without softening, accepts the true part, and proposes a verifiable control.'
    )],
    checkpoint: checkpoint(
      'Qual è la differenza tra una rassicurazione e un controllo?',
      'What is the difference between a reassurance and a control?',
      [
        ['Il controllo è più tecnico da spiegare.', 'A control is more technical to explain.', 'La complessità non è il criterio.', 'Complexity is not the criterion.'],
        ['Il controllo si può verificare, la rassicurazione no.', 'A control can be verified, a reassurance cannot.', 'È la ragione per cui una obiezione si chiude davvero.', 'It is why an objection actually closes.'],
        ['La rassicurazione va data per prima, il controllo dopo.', 'A reassurance comes first and the control afterwards.', 'Una rassicurazione senza controllo consuma credibilità.', 'A reassurance without a control consumes credibility.']
      ],
      1
    ),
    sourceIds: ['uk-government-stakeholder-mapping', 'ahrq-raci-chart', 'isa-iec-62443']
  },
  {
    id: 'english-answer-bank-core-distinctions',
    eyebrow: t('Unità 5', 'Unit 5'),
    title: t('Banca di risposte: le distinzioni centrali in una frase', 'Answer bank: the core distinctions in one sentence'),
    estimatedMinutes: 9,
    timeAllocation: { theory: 3, cases: 2, practice: 4 },
    theory: theoryFive,
    terminology: [t('Domanda di verifica: domanda breve che misura la precisione, non la profondità.', 'Verification question: a short question measuring precision rather than depth.')],
    microExamples: [microExample(
      'distinction-or-catalog', 2,
      'Distinzione oppure catalogo', 'Distinction or catalog',
      'Due risposte alla domanda su MES e SCADA hanno la stessa lunghezza ma solo una risponde davvero.',
      'Two answers to the MES and SCADA question have the same length but only one actually answers.',
      {
        learnerAction: ['Interpreta perché una risposta non è una distinzione e scegli quella corretta.', 'Interpret why one answer is not a distinction and choose the correct one.'],
        expectedOutput: ['Una risposta scelta con l’asse della distinzione.', 'One selected answer with the axis of the distinction.'],
        modelReasoning: ['Un elenco di funzioni non dice rispetto a che cosa i due sistemi differiscono; l’asse corretto è la decisione supportata e il vincolo rispettato.', 'A list of features does not say with respect to what the two systems differ; the correct axis is the supported decision and the respected constraint.'],
        responseFormat: ['Risposta scelta | asse della distinzione.', 'Selected answer | axis of the distinction.'],
        columns: [['Risposta', 'Answer'], ['Forma', 'Form']],
        rows: [
          ['catalog', ['"MES fa genealogia, tracciabilità, schedulazione e reportistica"', '"MES does genealogy, traceability, scheduling, and reporting"'], ['Catalogo di funzioni', 'Catalog of features']],
          ['axis', ['"SCADA supervisiona il processo in tempo reale, MES governa ordine, materiali e conformità"', '"SCADA supervises the process in real time, MES governs order, materials, and compliance"'], ['Asse: decisione supportata', 'Axis: supported decision']]
        ],
        decisionCount: 1,
        comparisonCount: 0,
        interpretationCount: 1
      }
    )],
    activities: [
      activity(
        'one-sentence-ot-it', 2,
        'Scrivi la distinzione tra OT e IT in una sola frase inglese da quindici secondi.',
        'Write the OT versus IT distinction in a single fifteen-second English sentence.',
        'Una frase inglese.', 'One English sentence.',
        'La domanda arriva da un dirigente non tecnico che vuole capire perché i tempi sono diversi.',
        'The question comes from a non-technical executive who wants to understand why timings differ.',
        'Una frase con asse e conseguenza.', 'One sentence with axis and consequence.',
        'In OT the priority order flips: process availability and integrity come before confidentiality, which is why we cannot patch or scan a control network the way we do an office network.',
        'In OT the priority order flips: process availability and integrity come before confidentiality, which is why we cannot patch or scan a control network the way we do an office network.',
        'Una sola frase con asse esplicito e conseguenza operativa.',
        'A single sentence with an explicit axis and an operational consequence.'
      ),
      activity(
        'one-sentence-mcp', 2,
        'Scrivi che cosa è MCP e che cosa non decide, in una frase inglese.',
        'Write what MCP is and what it does not decide, in one English sentence.',
        'Una frase inglese.', 'One English sentence.',
        'La trappola comune è presentare MCP come orchestratore o come garanzia di sicurezza.',
        'The common trap is presenting MCP as an orchestrator or a security guarantee.',
        'Una frase con definizione e limite.', 'One sentence with definition and limitation.',
        'MCP is a protocol that connects a host, its clients, and servers and makes resources, tools, and prompts discoverable; it does not decide authorization and it does not orchestrate the work.',
        'MCP is a protocol that connects a host, its clients, and servers and makes resources, tools, and prompts discoverable; it does not decide authorization and it does not orchestrate the work.',
        'Definisce il protocollo e dichiara esplicitamente il limite.',
        'Defines the protocol and explicitly states the limitation.'
      )
    ],
    checkpoint: checkpoint(
      'Che cosa rende una risposta una distinzione invece che un catalogo?',
      'What makes an answer a distinction rather than a catalog?',
      [
        ['Il numero di funzioni elencate per ciascun sistema.', 'The number of features listed for each system.', 'Un elenco non dice rispetto a che cosa differiscono.', 'A list does not say with respect to what they differ.'],
        ['Un asse esplicito, di solito la decisione supportata e il vincolo rispettato.', 'An explicit axis, usually the supported decision and the respected constraint.', 'L’asse rende la differenza verificabile.', 'The axis makes the difference verifiable.'],
        ['L’uso della terminologia inglese corretta.', 'Using the correct English terminology.', 'La terminologia è necessaria ma non sufficiente.', 'Terminology is necessary but not sufficient.']
      ],
      1
    ),
    sourceIds: ['retrieval-augmented-generation', 'mcp-specification', 'isa-95']
  },
  {
    id: 'english-delivery-followups-and-recovery',
    eyebrow: t('Unità 6', 'Unit 6'),
    title: t('Consegna in inglese, domande di approfondimento e frasi di recupero', 'English delivery, follow-up questions, and recovery phrases'),
    estimatedMinutes: 9,
    timeAllocation: { theory: 3, cases: 2, practice: 4 },
    theory: theorySix,
    terminology: [t('Frase di recupero: formula preparata per chiedere chiarimenti o correggersi senza perdere credibilità.', 'Recovery phrase: a prepared formula for asking clarification or self-correcting without losing credibility.')],
    microExamples: [microExample(
      'sentence-length-repair', 2,
      'Riparare una frase troppo lunga', 'Repairing an over-long sentence',
      'La stessa affermazione compare in due versioni inglesi, una con quattro subordinate e una con tre frasi brevi.',
      'The same statement appears in two English versions, one with four subordinate clauses and one with three short sentences.',
      {
        learnerAction: ['Confronta le due versioni e scegli quella che regge alla lettura ad alta voce.', 'Compare the two versions and choose the one that holds up when read aloud.'],
        expectedOutput: ['Una versione scelta con la regola applicata.', 'One selected version with the rule applied.'],
        modelReasoning: ['La versione breve tiene il verbo vicino al soggetto e una idea per frase, quindi resta comprensibile anche con un accento non nativo.', 'The short version keeps the verb close to the subject and one idea per sentence, so it stays understandable even with a non-native accent.'],
        responseFormat: ['Versione scelta | regola applicata.', 'Selected version | rule applied.'],
        columns: [['Versione', 'Version'], ['Frasi', 'Sentences'], ['Subordinate', 'Subordinate clauses']],
        rows: [
          ['long', ['Versione lunga', 'Long version'], ['1', '1'], ['4', '4']],
          ['short', ['Versione breve', 'Short version'], ['3', '3'], ['0', '0']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 0
      }
    )],
    activities: [
      activity(
        'prepare-two-followups', 2,
        'Prepara due domande di approfondimento probabili per la tua risposta su RAG.',
        'Prepare two likely follow-up questions for your RAG answer.',
        'Due domande.', 'Two questions.',
        'I follow-up tipici chiedono un numero, un caso limite oppure che cosa faresti diversamente.',
        'Typical follow-ups ask for a number, an edge case, or what you would do differently.',
        'Domanda 1 | domanda 2.', 'Question 1 | question 2.',
        'How do you measure whether a citation actually supports the claim, and what does the system do when two revisions both look effective?',
        'How do you measure whether a citation actually supports the claim, and what does the system do when two revisions both look effective?',
        'Le due domande coprono un numero e un caso limite, non una ripetizione della risposta.',
        'The two questions cover a number and an edge case, not a repetition of the answer.'
      ),
      activity(
        'use-a-recovery-phrase', 2,
        'Scrivi la frase da usare quando non conosci il protocollo di cui ti chiedono.',
        'Write the phrase to use when you do not know the protocol being asked about.',
        'Una frase in tre parti.', 'One three-part phrase.',
        'La domanda riguarda un protocollo industriale con cui non hai lavorato.',
        'The question is about an industrial protocol you have not worked with.',
        'Confine | verifica | adiacenza.', 'Boundary | verification | adjacency.',
        'I have not worked with that protocol directly; I would check the official specification for what it guarantees on message ordering and loss; I have solved the same problem over a different transport, where the choice depended on cadence and criticality.',
        'I have not worked with that protocol directly; I would check the official specification for what it guarantees on message ordering and loss; I have solved the same problem over a different transport, where the choice depended on cadence and criticality.',
        'Dichiara il confine, indica la verifica e offre una adiacenza utile senza improvvisare.',
        'States the boundary, names the verification, and offers a useful adjacency without improvising.'
      )
    ],
    checkpoint: checkpoint(
      'Come si gestisce una domanda a cui non sai rispondere?',
      'How do you handle a question you cannot answer?',
      [
        ['Costruendo una spiegazione plausibile per non perdere terreno.', 'Building a plausible explanation so as not to lose ground.', 'Chi intervista se ne accorge e il costo sulla fiducia è alto.', 'Interviewers notice, and the cost in trust is high.'],
        ['Dichiarando il confine, come verificheresti e quale adiacenza utile hai.', 'Stating the boundary, how you would verify, and which useful adjacency you have.', 'Trasforma una lacuna in una dimostrazione di metodo.', 'It turns a gap into a demonstration of method.'],
        ['Cambiando argomento verso qualcosa che conosci meglio.', 'Changing the subject toward something you know better.', 'Evita la domanda invece di rispondere.', 'It avoids the question instead of answering it.']
      ],
      1
    ),
    sourceIds: ['nist-ai-600-1', 'attention-is-all-you-need']
  },
  {
    id: 'twenty-minute-mock-first-half',
    eyebrow: t('Unità 7', 'Unit 7'),
    title: t('Simulazione da venti minuti: apertura, OT e IT, architettura', 'Twenty-minute mock: opening, OT and IT, architecture'),
    estimatedMinutes: 10,
    timeAllocation: { theory: 1, cases: 3, practice: 6 },
    theory: theorySeven,
    terminology: [t('Segmento: blocco cronometrato della simulazione che non recupera il tempo residuo altrove.', 'Segment: a timed block of the simulation that does not carry unused time elsewhere.')],
    caseSegments: [caseSegment(
      'mock-first-half-briefing', 3,
      'Briefing della prima metà', 'First-half briefing',
      'Prima di iniziare, il candidato controlla le tre condizioni della simulazione e sceglie che cosa fare se un segmento sfora.',
      'Before starting, the candidate checks the three simulation conditions and decides what to do if a segment overruns.',
      {
        learnerAction: ['Interpreta le tre regole, confrontale con la tua abitudine e scegli la condotta corretta allo scadere del tempo.', 'Interpret the three rules, compare them with your habit, and choose the correct conduct when time runs out.'],
        expectedOutput: ['Una condotta scelta con la ragione.', 'One selected conduct with its reason.'],
        modelReasoning: ['Interrompere e passare al segmento successivo riproduce la pressione reale; recuperare il tempo altrove allena una abitudine che in colloquio non è disponibile.', 'Cutting and moving to the next segment reproduces real pressure; recovering time elsewhere trains a habit that is not available in an interview.'],
        responseFormat: ['Condotta | ragione in una frase.', 'Conduct | reason in one sentence.'],
        columns: [['Regola', 'Rule'], ['Condotta corretta', 'Correct conduct']],
        rows: [
          ['timer', ['Cronometro visibile', 'Visible timer'], ['Interrompere e passare oltre', 'Cut and move on']],
          ['notes', ['Nessuna nota', 'No notes'], ['Dichiarare il confine invece di improvvisare', 'State the boundary instead of improvising']],
          ['audio', ['Registrazione audio', 'Audio recording'], ['Valutare dopo, non a memoria', 'Score afterwards, not from memory']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 1
      }
    )],
    activities: [
      activity(
        'run-opening-and-automation-segment', 3,
        'Esegui il segmento di apertura sulla scelta delle automazioni, a voce e senza note.',
        'Run the opening segment on choosing automations, aloud and without notes.',
        'Una risposta parlata da tre minuti.', 'One three-minute spoken answer.',
        'Il segmento dura tre minuti e copre presentazione e criterio di selezione.',
        'The segment lasts three minutes and covers the introduction and the selection criterion.',
        'Risposta parlata registrata.', 'Recorded spoken answer.',
        'Apri con la posizione, dichiara criteri e pesi, mostra un punteggio, applica il cancello ed escludi esplicitamente il candidato non ammissibile, chiudendo con il trade-off accettato.',
        'Open with the position, declare criteria and weights, show one score, apply the gate, explicitly exclude the ineligible candidate, and close with the accepted trade-off.',
        'La registrazione contiene sintesi, criterio, numero, cancello e trade-off entro il tempo.',
        'The recording contains headline, criterion, number, gate, and trade-off within the time.'
      ),
      activity(
        'run-ot-it-and-architecture-segments', 3,
        'Esegui i segmenti su OT e IT, MES e SCADA, e sul percorso fino alla decisione.',
        'Run the segments on OT and IT, MES and SCADA, and the path to the decision.',
        'Due risposte parlate consecutive.', 'Two consecutive spoken answers.',
        'I due segmenti durano quattro e tre minuti e non recuperano tempo l’uno dall’altro.',
        'The two segments last four and three minutes and do not borrow time from each other.',
        'Registrazione con i due segmenti separati.', 'Recording with the two segments separated.',
        'Usa una frase per ciascuna distinzione, poi nomina i sei salti con proprietario e latenza, indica il salto dominante e chiudi su chi decide e sul fallback.',
        'Use one sentence per distinction, then name the six hops with owner and latency, point out the dominant hop, and close on who decides and on the fallback.',
        'Le distinzioni restano in una frase e il percorso chiude sulla decisione umana.',
        'The distinctions stay in one sentence and the path closes on the human decision.'
      )
    ],
    checkpoint: checkpoint(
      'Che cosa si fa quando un segmento della simulazione supera il tempo?',
      'What do you do when a simulation segment runs over time?',
      [
        ['Si recupera il tempo dal segmento successivo.', 'You recover the time from the next segment.', 'In colloquio nessuno concede tempo extra.', 'In an interview nobody grants extra time.'],
        ['Si interrompe e si passa al segmento successivo.', 'You cut it and move to the next segment.', 'Riproduce la pressione reale e allena la sintesi.', 'It reproduces real pressure and trains concision.'],
        ['Si ricomincia il segmento dall’inizio.', 'You restart the segment from the beginning.', 'Allena esattamente l’abitudine che confonde la risposta.', 'It trains exactly the habit that makes an answer confusing.']
      ],
      1
    ),
    sourceIds: ['nist-ai-rmf-1-0', 'isa-95', 'nist-sp-800-82-r3']
  },
  {
    id: 'scoring-readiness-and-rapid-review',
    eyebrow: t('Unità 8', 'Unit 8'),
    title: t('Seconda metà, punteggio, prontezza e scheda di ripasso rapido', 'Second half, scoring, readiness, and the rapid review sheet'),
    estimatedMinutes: 10,
    timeAllocation: { theory: 1, cases: 2, practice: 7 },
    theory: theoryEight,
    terminology: [t('Prontezza: almeno dieci su dodici su ogni risposta centrale e simulazione completata senza note.', 'Readiness: at least ten out of twelve on every core answer plus the simulation completed without notes.')],
    microExamples: [microExample(
      'average-or-threshold', 2,
      'Media oppure soglia', 'Average or threshold',
      'Due letture dello stesso tracciato di prontezza portano a due conclusioni opposte sulla preparazione.',
      'Two readings of the same readiness record lead to opposite conclusions about preparation.',
      {
        learnerAction: ['Interpreta i due criteri e scegli quello che descrive davvero la prontezza.', 'Interpret the two criteria and choose the one that actually describes readiness.'],
        expectedOutput: ['Un criterio scelto con la conseguenza pratica.', 'One selected criterion with its practical consequence.'],
        modelReasoning: ['Una media di 10,6 nasconde due argomenti a nove, e in colloquio verrà chiesto proprio uno di quelli; la soglia per argomento è il criterio corretto.', 'An average of 10.6 hides two topics at nine, and the interview will ask about exactly one of them; the per-topic threshold is the correct criterion.'],
        responseFormat: ['Criterio | conseguenza.', 'Criterion | consequence.'],
        columns: [['Criterio', 'Criterion'], ['Esito sul tracciato', 'Result on the record']],
        rows: [
          ['average', ['Media dei totali', 'Average of totals'], ['10,6 su 12, apparentemente pronto', '10.6 out of 12, apparently ready']],
          ['threshold', ['Soglia per argomento', 'Per-topic threshold'], ['Due argomenti a 9, non pronto', 'Two topics at 9, not ready']]
        ],
        decisionCount: 1,
        comparisonCount: 0,
        interpretationCount: 1
      }
    )],
    activities: [
      activity(
        'run-second-half-segments', 3,
        'Esegui i tre segmenti finali su RAG, agenti e MCP, MVP e rischio, supervisione e scaling.',
        'Run the three final segments on RAG, agents and MCP, MVP and risk, oversight and scaling.',
        'Tre risposte parlate consecutive.', 'Three consecutive spoken answers.',
        'I tre segmenti durano quattro, tre e tre minuti e completano i venti minuti.',
        'The three segments last four, three, and three minutes and complete the twenty minutes.',
        'Registrazione con i tre segmenti separati.', 'Recording with the three segments separated.',
        'Una frase precisa per RAG, agente e MCP, poi la fetta verticale con registro dei rischi, e infine supervisione misurata e regola del cancello bloccante.',
        'One precise sentence for RAG, agent, and MCP, then the vertical slice with the risk register, and finally measured oversight and the blocking gate rule.',
        'Le tre definizioni restano precise e le due risposte finali chiudono su una decisione.',
        'The three definitions stay precise and the final two answers close on a decision.'
      ),
      activity(
        'score-one-answer-with-the-rubric', 2,
        'Assegna i sei punteggi della rubric a una risposta registrata e calcola il totale.',
        'Assign the six rubric scores to one recorded answer and compute the total.',
        'Sei punteggi più un totale.', 'Six scores plus a total.',
        'La risposta ha sintesi chiara, distinzioni corrette, nessun numero e frasi inglesi lunghe.',
        'The answer has a clear headline, correct distinctions, no numbers, and long English sentences.',
        'Sei valori | totale | pronto o no.', 'Six values | total | ready or not.',
        'Struttura 2, accuratezza 2, rilevanza 1, esempio 0, trade-off 1, chiarezza 1: totale 7 su 12, sotto la soglia di 10, quindi non pronto.',
        'Structure 2, accuracy 2, relevance 1, example 0, trade-offs 1, clarity 1: total 7 out of 12, below the threshold of 10, therefore not ready.',
        'I punteggi seguono le ancore e il totale è la somma, non una impressione.',
        'The scores follow the anchors and the total is the sum rather than an impression.',
        0, 1
      ),
      activity(
        'write-one-rapid-review-line', 2,
        'Scrivi la riga di ripasso rapido per l’argomento risultato sotto soglia.',
        'Write the rapid review line for the topic that fell below threshold.',
        'Una riga con sintesi e trappola.', 'One row with headline and trap.',
        'L’argomento sotto soglia è la supervisione umana, penalizzato su struttura ed esempio.',
        'The topic below threshold is human oversight, penalized on structure and example.',
        'Sintesi | trappola.', 'Headline | trap.',
        'La supervisione è effettiva quando la persona capisce, apre la fonte con un gesto e rifiuta senza attrito, misurato con campionamento indipendente; la trappola è dire che una persona approva senza verificare se può davvero verificare.',
        'Oversight is effective when the person understands, opens the source in one gesture, and refuses without friction, measured by independent sampling; the trap is saying a person approves without checking whether they can actually verify.',
        'La riga contiene una sintesi dicibile per prima e una trappola concreta.',
        'The row contains a headline that can be said first and a concrete trap.'
      )
    ],
    checkpoint: checkpoint(
      'Un tracciato mostra media 10,6 su 12 con due argomenti a 9. La preparazione è conclusa?',
      'A record shows an average of 10.6 out of 12 with two topics at 9. Is preparation complete?',
      [
        ['Sì, la media supera la soglia di dieci.', 'Yes, the average exceeds the threshold of ten.', 'La media nasconde proprio gli argomenti che verranno chiesti.', 'The average hides exactly the topics that will be asked about.'],
        ['No, la soglia si applica a ogni argomento e due restano sotto.', 'No, the threshold applies per topic and two remain below.', 'Gli argomenti deboli vanno corretti con azioni specifiche.', 'Weak topics need specific corrective actions.'],
        ['Sì, se la simulazione è stata completata senza note.', 'Yes, provided the simulation was completed without notes.', 'Entrambe le condizioni servono, non una sola.', 'Both conditions are required, not just one.']
      ],
      1
    ),
    sourceIds: ['eu-ai-act', 'nist-ai-rmf-1-0', 'pmi-operations']
  }
]

const interviewAnswers = [
  {
    topicId: 'ot-vs-it',
    prompt: t('Qual è la differenza tra OT e IT?', 'What is the difference between OT and IT?'),
    short: t(
      'La differenza principale è l’ordine delle priorità. Nei sistemi gestionali proteggo prima la riservatezza, poi l’integrità, poi la disponibilità. Nei sistemi di controllo l’ordine si rovescia: disponibilità e integrità del processo vengono prima, perché una interruzione può fermare la produzione o creare condizioni non sicure. Da qui derivano metodi diversi: non si applicano patch automatiche, non si eseguono scansioni aggressive e ogni finestra di intervento va concordata con Operations.',
      'The main difference is the priority order. In business systems I protect confidentiality first, then integrity, then availability. In control systems the order reverses: process availability and integrity come first, because an interruption can stop production or create unsafe conditions. Different methods follow from that: no automatic patching, no aggressive scanning, and every intervention window agreed with Operations.'
    ),
    long: t(
      'Parto dalla conseguenza pratica invece che dalla definizione. In un ufficio, se un servizio si ferma per venti minuti, qualcuno lavora più tardi. In uno stabilimento, venti minuti di fermo su una linea hanno un costo diretto e possono creare condizioni non sicure, quindi disponibilità e integrità del processo vengono prima della riservatezza. Questo spiega perché pratiche normali in IT, come aggiornamenti automatici o scansioni di vulnerabilità aggressive, non sono accettabili su una rete di controllo: possono causare più danni della minaccia che cercano. Ci sono altre due differenze che uso spesso. La prima è il ciclo di vita: un sistema di controllo può restare in servizio quindici o vent’anni, mentre un sistema gestionale viene sostituito molto prima, quindi non posso assumere che esista un aggiornamento disponibile. La seconda è la proprietà: in OT il proprietario del dato è spesso Operations o Automation, non IT, e questo cambia chi approva un accesso. Quando progetto una integrazione, la conseguenza è concreta: leggo dal historian in zona intermedia invece che dal livello di controllo, resto in sola lettura, e ogni flusso dichiara zona di origine, direzione, protocollo, proprietario e comportamento in caso di indisponibilità.',
      'I start from the practical consequence rather than the definition. In an office, if a service stops for twenty minutes, somebody works later. In a plant, twenty minutes of downtime on a line has a direct cost and can create unsafe conditions, so process availability and integrity come before confidentiality. That explains why practices that are normal in IT, such as automatic updates or aggressive vulnerability scans, are not acceptable on a control network: they can cause more damage than the threat they look for. There are two further differences I use often. The first is lifecycle: a control system can stay in service for fifteen or twenty years, while a business system is replaced far sooner, so I cannot assume an update is even available. The second is ownership: in OT the data owner is often Operations or Automation rather than IT, and that changes who approves an access. When I design an integration the consequence is concrete: I read from the historian in an intermediate zone instead of the control level, I stay read-only, and every flow declares source zone, direction, protocol, owner, and behavior when unavailable.'
    ),
    followUps: [
      t('Come spiegheresti questa differenza a un responsabile IT scettico?', 'How would you explain this difference to a skeptical IT manager?'),
      t('Che cosa cambia nella gestione delle vulnerabilità?', 'What changes in vulnerability management?')
    ]
  },
  {
    topicId: 'mes-vs-scada',
    prompt: t('Qual è la differenza tra MES e SCADA?', 'What is the difference between MES and SCADA?'),
    short: t(
      'Si distinguono per la decisione che supportano. SCADA supervisiona e controlla il processo in tempo reale: legge i segnali, mostra lo stato, gestisce gli allarmi e permette all’operatore di agire adesso. Il MES governa l’esecuzione della produzione: ordine, materiali, genealogia del lotto, tracciabilità, tempi e conformità. Il primo risponde alla domanda su come sta andando la macchina in questo momento, il secondo alla domanda su che cosa abbiamo prodotto, con quali materiali e con quale documentazione.',
      'They differ by the decision each one supports. SCADA supervises and controls the process in real time: it reads signals, shows state, handles alarms, and lets the operator act now. MES governs production execution: order, materials, batch genealogy, traceability, timing, and compliance. The first answers how the machine is running right now, the second answers what we produced, with which materials, and with which documentation.'
    ),
    long: t(
      'Uso sempre un asse invece di un elenco di funzioni, perché un catalogo non spiega la differenza. L’asse è la decisione supportata e il vincolo rispettato. SCADA vive vicino al processo: cadenza di secondi o meno, priorità alla continuità, e una interfaccia pensata perché un operatore reagisca subito. Il MES vive al livello dell’esecuzione della produzione: cadenza di minuti, priorità alla correttezza del record, e una interfaccia pensata perché un ordine sia eseguito e documentato secondo la procedura approvata. Un esempio concreto che uso spesso è la genealogia. Se un cliente segnala un difetto su un lotto finito, la domanda è quali materiali sono entrati, da quali lotti di ingresso, su quale macchina, in quale turno e con quale revisione della specifica. Quella ricostruzione è compito del MES, non dello SCADA, che conserva serie di processo ma non il legame con l’ordine e i materiali. La conseguenza pratica per un progetto di intelligenza artificiale è la scelta della fonte: per un caso predittivo leggo serie dal historian, per un caso di qualità o di tracciabilità leggo contesto dal MES. Confondere i due porta a un modello addestrato su dati senza il contesto che serve a interpretarli.',
      'I always use an axis rather than a list of features, because a catalog does not explain the difference. The axis is the supported decision and the respected constraint. SCADA lives close to the process: cadence of seconds or less, priority on continuity, and an interface designed so an operator reacts immediately. MES lives at the production execution level: cadence of minutes, priority on record correctness, and an interface designed so an order is executed and documented according to the approved procedure. A concrete example I use often is genealogy. If a customer reports a defect on a finished batch, the question is which materials went in, from which incoming lots, on which machine, in which shift, and under which specification revision. That reconstruction is the job of MES, not SCADA, which holds process series but not the link to order and materials. The practical consequence for an artificial intelligence project is source selection: for a predictive case I read series from the historian, for a quality or traceability case I read context from MES. Confusing the two leads to a model trained on data without the context needed to interpret it.'
    ),
    followUps: [
      t('Dove collocheresti il historian rispetto a questi due sistemi?', 'Where would you place the historian relative to these two systems?'),
      t('Quale dei due useresti per un caso di tracciabilità?', 'Which of the two would you use for a traceability case?')
    ]
  },
  {
    topicId: 'rag',
    prompt: t('Che cos’è RAG e quando lo useresti?', 'What is RAG and when would you use it?'),
    short: t(
      'RAG significa generare una risposta soltanto dopo aver recuperato evidenza autorizzata. Non è una ricerca semantica: è un percorso che autorizza la richiesta, risolve la revisione effettiva del documento, recupera i passaggi consentiti, genera claim brevi con citazioni verificabili e rifiuta quando l’evidenza non basta. Lo uso quando la conoscenza cambia, deve restare tracciabile e appartiene a documenti controllati. Non lo uso quando una regola deterministica risponde meglio.',
      'RAG means generating an answer only after retrieving authorized evidence. It is not semantic search: it is a path that authorizes the request, resolves the effective document revision, retrieves permitted passages, generates short claims with verifiable citations, and refuses when evidence is insufficient. I use it when knowledge changes, must stay traceable, and lives in controlled documents. I do not use it when a deterministic rule answers better.'
    ),
    long: t(
      'Progetto RAG come un sistema documentale controllato, non come un chatbot con un archivio vettoriale. La sequenza è fissa. Prima autorizzo: identità verificata, ruolo, sito e scopo, prima di qualunque recupero, perché altrimenti anche un titolo può essere una fuga di informazione. Poi risolvo la versione: stato, data di efficacia e sostituzioni, per selezionare una sola revisione valida al momento della richiesta. Poi recupero, combinando ricerca lessicale e densa, perché un codice esatto e una parafrasi hanno esigenze diverse, e riordino i risultati mantenendo il lineage. Poi genero, consentendo soltanto claim sostenuti dai passaggi forniti e richiedendo un identificativo di citazione per ogni istruzione operativa. Infine verifico: un controllo deterministico conferma che il passaggio citato appartenga davvero alla revisione mostrata. Se l’accesso è negato, le fonti sono in conflitto o l’evidenza è insufficiente, il sistema rifiuta con un codice, invece di produrre una risposta plausibile. La valutazione usa un set costruito prima del sistema, con casi rispondibili, non autorizzati, con revisione superata, in conflitto e senza evidenza, in entrambe le lingue. I cancelli non negoziabili sono zero esposizioni non autorizzate e zero istruzioni operative non sostenute. Se i metadati documentali non esistono, finanzio prima quella prontezza, perché nessun modello compensa un corpus senza versione e senza ambito.',
      'I design RAG as a controlled document system rather than a chatbot with a vector store. The sequence is fixed. First I authorize: verified identity, role, site, and purpose, before any retrieval, because otherwise even a title can be an information leak. Then I resolve the version: status, effective date, and supersessions, to select one valid revision at the time of the request. Then I retrieve, combining lexical and dense search, because an exact code and a paraphrase have different needs, and I rerank while preserving lineage. Then I generate, allowing only claims supported by the supplied passages and requiring a citation identifier for every operational instruction. Finally I verify: a deterministic check confirms the cited passage really belongs to the revision shown. If access is denied, sources conflict, or evidence is insufficient, the system refuses with a code instead of producing a plausible answer. Evaluation uses a set built before the system, with answerable, unauthorized, superseded-revision, conflicting, and no-evidence cases, in both languages. The non-negotiable gates are zero unauthorized exposures and zero unsupported operational instructions. If document metadata does not exist, I fund that readiness first, because no model compensates for a corpus without version and scope.'
    ),
    followUps: [
      t('Come misuri se una citazione sostiene davvero il claim?', 'How do you measure whether a citation truly supports the claim?'),
      t('Che cosa fa il sistema se due revisioni sembrano entrambe effettive?', 'What does the system do if two revisions both look effective?')
    ]
  },
  {
    topicId: 'agent',
    prompt: t('Che cos’è un agente e quando lo useresti?', 'What is an agent and when would you use one?'),
    short: t(
      'Un agente è un ciclo in cui il modello sceglie ripetutamente l’azione successiva sulla base dei risultati ottenuti. Lo considero soltanto quando il percorso di indagine varia davvero e gli strumenti sono in gran parte di sola lettura. Se i passi e i cancelli sono già enumerabili, come nella creazione di un ordine, uso un workflow deterministico, che è più controllabile. Anche quando scelgo un agente, definisco allowlist degli strumenti, budget, numero massimo di passi, rilevamento di assenza di progresso ed escalation.',
      'An agent is a loop in which the model repeatedly chooses the next action based on the results it obtained. I consider it only when the investigation path genuinely varies and the tools are largely read-only. If the steps and gates are already enumerable, as in creating a work order, I use a deterministic workflow, which is more controllable. Even when I choose an agent, I define a tool allowlist, budgets, a maximum step count, no-progress detection, and escalation.'
    ),
    long: t(
      'La distinzione parte dal controllo di flusso. Un workflow deterministico codifica una sequenza nota: può chiamare un modello per estrarre o classificare, ma validazione, autorizzazione, approvazione, scrittura e conferma restano passi espliciti. È la scelta corretta per una transazione, perché gli effetti collaterali richiedono idempotenza, audit e una gestione prevedibile dei timeout. Un agente lascia invece al modello la scelta ripetuta dell’azione successiva. Lo considero per una indagine di sola lettura, per esempio incrociare storico manutenzione e segnali di processo quando l’ordine delle verifiche non è noto in anticipo. Anche allora il perimetro è stretto: obiettivo dichiarato, fatti con provenienza, allowlist degli strumenti, budget di token e di costo, numero massimo di passi, limite di errori e rilevamento di assenza di progresso. Gli strumenti con effetti collaterali restano fuori dal ciclo o dietro una approvazione deterministica. Valuto l’agente contro due baseline sullo stesso insieme di casi: un solo modello con tutti gli strumenti e una orchestrazione deterministica. Misuro successo adjudicato, completezza delle evidenze, claim non sostenuti, errori degli strumenti, tempo, token e tempo di revisione umana. Se il vantaggio non è stabile o il coordinamento consuma il tempo risparmiato, mantengo la baseline. La complessità non è una capacità: il pattern migliore è il minimo che soddisfa esito, rischio e modello operativo.',
      'The distinction starts with control flow. A deterministic workflow encodes a known sequence: it may call a model to extract or classify, but validation, authorization, approval, writing, and confirmation remain explicit steps. It is the right choice for a transaction, because side effects need idempotency, audit, and predictable timeout handling. An agent instead leaves the repeated choice of the next action to the model. I consider it for read-only investigation, for example cross-checking maintenance history and process signals when the order of checks is not known in advance. Even then the perimeter is narrow: a declared objective, facts with provenance, a tool allowlist, token and cost budgets, a maximum step count, an error limit, and no-progress detection. Side-effect tools stay outside the loop or behind deterministic approval. I evaluate the agent against two baselines on the same case set: one model with all tools, and deterministic orchestration. I measure adjudicated success, evidence completeness, unsupported claims, tool errors, elapsed time, tokens, and human review time. If the advantage is not stable or coordination consumes the time saved, I keep the baseline. Complexity is not a capability: the best pattern is the minimum that satisfies outcome, risk, and operating model.'
    ),
    followUps: [
      t('Quali strumenti escluderesti sempre da un ciclo agentico?', 'Which tools would you always exclude from an agent loop?'),
      t('Come dimostreresti che il parallelismo porta un beneficio reale?', 'How would you demonstrate that parallelism brings a real benefit?')
    ]
  },
  {
    topicId: 'mcp',
    prompt: t('Che cos’è MCP e che cosa non fa?', 'What is MCP and what does it not do?'),
    short: t(
      'MCP è un protocollo che collega una applicazione host, i suoi client e i server che espongono risorse, strumenti e prompt, rendendoli scopribili in modo uniforme. Risolve un problema di integrazione: invece di un adattatore diverso per ogni sistema, esiste un modo comune di dichiarare che cosa è disponibile. Non decide le autorizzazioni, non orchestra il lavoro e non garantisce la sicurezza: quelle restano responsabilità dell’applicazione, esattamente come in qualunque altra integrazione.',
      'MCP is a protocol connecting a host application, its clients, and the servers that expose resources, tools, and prompts, making them discoverable in a uniform way. It solves an integration problem: instead of a different adapter for every system, there is a common way to declare what is available. It does not decide authorization, it does not orchestrate the work, and it does not guarantee security: those stay the responsibility of the application, exactly as in any other integration.'
    ),
    long: t(
      'Descrivo prima i tre ruoli, perché è dove nascono la maggior parte delle confusioni. L’host è l’applicazione di intelligenza artificiale che coordina il lavoro e parla con l’utente. Il client è la connessione dedicata verso un singolo server. Il server è il servizio che espone risorse da leggere, strumenti da invocare e prompt riutilizzabili. Il valore pratico è la scopribilità uniforme: un host può chiedere che cosa un server offre senza un adattatore scritto a mano, il che riduce il costo di collegare sistemi diversi. Dico poi esplicitamente che cosa MCP non fa, perché è la parte che distingue una risposta preparata. Non stabilisce chi può fare che cosa: l’autorizzazione resta una decisione applicativa, presa fuori dal modello, su soggetto, azione, risorsa e contesto. Non orchestra: la sequenza dei passi, i cancelli e i criteri di arresto restano nell’applicazione. Non rende sicuro un tool: se uno strumento accetta un identificativo troppo generico o manca di chiave di idempotenza, il protocollo non lo corregge. In un impianto regolamentato lo userei per collegare un servizio documentale di sola lettura, mantenendo validazione, autorizzazione, idempotenza, audit e fallback esattamente dove sarebbero stati senza il protocollo. La domanda che pongo per verificare la comprensione è semplice: se togliessimo MCP, quali controlli sparirebbero. La risposta corretta è nessuno.',
      'I describe the three roles first, because that is where most confusion starts. The host is the artificial intelligence application that coordinates the work and talks to the user. The client is the dedicated connection to a single server. The server is the service exposing resources to read, tools to invoke, and reusable prompts. The practical value is uniform discoverability: a host can ask what a server offers without a hand-written adapter, which lowers the cost of connecting different systems. Then I say explicitly what MCP does not do, because that is the part that marks a prepared answer. It does not establish who may do what: authorization stays an application decision, taken outside the model, over subject, action, resource, and context. It does not orchestrate: step sequence, gates, and stop criteria remain in the application. It does not make a tool safe: if a tool accepts an over-generic identifier or lacks an idempotency key, the protocol does not fix that. In a regulated plant I would use it to connect a read-only document service, keeping validation, authorization, idempotency, audit, and fallback exactly where they would have been without the protocol. The question I ask to check understanding is simple: if we removed MCP, which controls would disappear. The correct answer is none.'
    ),
    followUps: [
      t('Che differenza c’è tra host e client in MCP?', 'What is the difference between host and client in MCP?'),
      t('Chi decide se una chiamata a uno strumento è autorizzata?', 'Who decides whether a tool call is authorized?')
    ]
  },
  {
    topicId: 'automation-selection',
    prompt: t('Come decidi quali processi automatizzare?', 'How do you decide which processes to automate?'),
    short: t(
      'Parto dalla perdita operativa osservata, non dalla tecnologia disponibile. Costruisco una matrice con criteri pesati, dichiarati prima di vedere i punteggi: valore sulla perdita misurata, fattibilità con i dati già disponibili, controllabilità del rischio e probabilità di adozione. Applico poi un cancello non negoziabile: nessun candidato che decida un rilascio o produca un effetto irreversibile senza approvazione umana. Il cancello si applica prima della classifica, quindi un candidato ad alto valore ma non ammissibile esce dalla selezione.',
      'I start from the observed operational loss, not from the available technology. I build a matrix with weighted criteria, declared before seeing any scores: value against the measured loss, feasibility with data already available, risk controllability, and likelihood of adoption. Then I apply a non-negotiable gate: no candidate that decides a release or produces an irreversible effect without human approval. The gate applies before ranking, so a high-value but ineligible candidate leaves the selection.'
    ),
    long: t(
      'Il metodo ha quattro passi e li racconto sempre nello stesso ordine. Primo, osservo il lavoro reale e costruisco una mappa della decisione: chi decide, con quali informazioni, con quale vincolo e con quale conseguenza se sbaglia. Secondo, misuro una baseline con definizione operativa, finestra, popolazione, metodo e proprietario, e la faccio firmare al process owner, perché chi non firma il numero di partenza contesterà quello di arrivo. Terzo, valuto i candidati su criteri pesati dichiarati in anticipo, separando evidenza osservata da stima: un dato raccolto per quattro settimane e una stima di un fornitore non hanno lo stesso peso, e dirlo aumenta la credibilità. Quarto, applico i cancelli prima della classifica. In un esempio ipotetico recente i punteggi erano 82 per il recupero del criterio di qualità, 76 per la bozza di ordine di manutenzione, 73 per il rapporto di turno e 67 per il rilascio autonomo del lotto. Il rilascio autonomo aveva il valore più alto in assoluto, dieci su dieci, ma falliva il cancello perché avrebbe deciso una conformità senza approvazione umana, quindi è uscito dalla selezione invece di posizionarsi ultimo. Verifico infine la sensibilità: se sposto un peso di una unità e la scelta non cambia, la decisione non dipende dalla taratura fine dei pesi, e questo è ciò che la rende difendibile davanti a un comitato.',
      'The method has four steps and I always tell them in the same order. First, I observe real work and build a decision map: who decides, with which information, under which constraint, and with which consequence if they are wrong. Second, I measure a baseline with an operational definition, window, population, method, and owner, and I have the process owner sign it, because whoever does not sign the starting number will dispute the ending number. Third, I score candidates on weighted criteria declared in advance, separating observed evidence from estimate: data collected over four weeks and a vendor estimate do not carry the same weight, and saying so raises credibility. Fourth, I apply the gates before ranking. In a recent hypothetical example the scores were 82 for quality criterion retrieval, 76 for the maintenance work-order draft, 73 for the shift report, and 67 for autonomous batch release. Autonomous release had the highest raw value, ten out of ten, but failed the gate because it would have decided a compliance outcome without human approval, so it left the selection rather than sitting last. Finally I check sensitivity: if I move one weight by a unit and the choice does not change, the decision does not depend on fine weight tuning, and that is what makes it defensible in front of a committee.'
    ),
    followUps: [
      t('Come rispondi se qualcuno contesta i pesi dopo aver visto i punteggi?', 'How do you answer if someone contests the weights after seeing the scores?'),
      t('Che cosa farebbe rientrare un candidato escluso da un cancello?', 'What would bring back a candidate excluded by a gate?')
    ]
  },
  {
    topicId: 'mvp',
    prompt: t('Come progetteresti un MVP in un impianto regolamentato?', 'How would you design an MVP in a regulated plant?'),
    short: t(
      'Costruisco la fetta verticale completa più piccola: un percorso intero su un dominio ristretto, non una versione ridotta di tutto. Restringo il dominio a una linea, un tipo di documento e utenti nominati, ma non tolgo i controlli, perché un pilota senza autorizzazione e senza registro non produce evidenza difendibile. Resto in sola lettura, giro prima in modalità shadow, e fisso criteri di successo separati tra soglie desiderabili e cancelli non negoziabili, con criteri di arresto e una data di riesame.',
      'I build the smallest complete vertical slice: an entire path over a narrow domain, not a reduced version of everything. I narrow the domain to one line, one document type, and named users, but I do not remove controls, because a pilot without authorization and logging produces no defensible evidence. I stay read-only, run in shadow mode first, and set success criteria separated into desirable thresholds and non-negotiable gates, with stop criteria and a review date.'
    ),
    long: t(
      'Comincio distinguendo prototipo, minimo prodotto utile e pilota, perché confonderli è la causa più frequente di progetti bloccati. Il prototipo rende discutibile una idea e può essere finto dietro le quinte. Il minimo prodotto utile è il percorso completo più piccolo che produce valore reale per un utente reale con dati reali. Il pilota è quel prodotto messo in esercizio limitato per raccogliere evidenza operativa. In un contesto regolamentato l’ordine conta, perché un prototipo promosso a produzione senza passare dai controlli crea debito di conformità che qualcun altro pagherà. Poi identifico l’assunzione più rischiosa, che quasi mai riguarda il modello: in un assistente documentale riguarda la struttura e il versionamento dei documenti. Il primo test attacca quella assunzione nel modo più economico possibile, per esempio campionando cinquanta documenti e misurando quanti hanno testo, revisione e ambito leggibili. Costruisco il set di valutazione prima del sistema, con casi rispondibili, non autorizzati, con revisione superata, in conflitto e senza evidenza sufficiente, e lo faccio adjudicare da una funzione indipendente, perché valutare il proprio lavoro con il proprio criterio è il modo più veloce per ottenere numeri inutili. Limito il periodo a sei settimane, perché una scadenza obbliga a decidere che cosa non fare, e dichiaro in anticipo che l’assenza di evidenza equivale a un no. L’esito peggiore non è fermarsi: è continuare senza che nessuno abbia deciso.',
      'I start by distinguishing prototype, minimum viable product, and pilot, because confusing them is the most frequent cause of stalled projects. A prototype makes an idea discussable and can be faked behind the scenes. A minimum viable product is the smallest complete path producing real value for a real user with real data. A pilot is that product placed into limited operation to collect operational evidence. In a regulated context the order matters, because a prototype promoted to production without passing the controls creates compliance debt somebody else will pay. Then I identify the riskiest assumption, which almost never concerns the model: in a document assistant it concerns document structure and versioning. The first test attacks that assumption as cheaply as possible, for example by sampling fifty documents and measuring how many have readable text, revision, and scope. I build the evaluation set before the system, with answerable, unauthorized, superseded-revision, conflicting, and insufficient-evidence cases, and I have an independent function adjudicate it, because judging your own work by your own criteria is the fastest route to useless numbers. I bound the period to six weeks, because a deadline forces a decision about what not to do, and I declare in advance that absence of evidence counts as a no. The worst outcome is not stopping: it is continuing without anyone having decided.'
    ),
    followUps: [
      t('Che cosa si perde restando in sola lettura per sei settimane?', 'What is lost by staying read-only for six weeks?'),
      t('Come eviti che un pilota diventi un impegno permanente?', 'How do you prevent a pilot from becoming a permanent commitment?')
    ]
  },
  {
    topicId: 'kpi',
    prompt: t('Come definisci i KPI di un progetto di intelligenza artificiale?', 'How do you define the KPIs of an artificial intelligence project?'),
    short: t(
      'Separo sempre la metrica di modello dal KPI operativo. La precisione non è un risultato di business: è un indicatore diagnostico. Il KPI è il cambiamento nella decisione o nella perdita che volevo ridurre, per esempio il tempo mediano per raggiungere il criterio corretto o i difetti sfuggiti per milione. Ogni KPI ha definizione operativa, finestra, popolazione, metodo di raccolta, proprietario del dato e una baseline misurata prima di iniziare, altrimenti il miglioramento non è dimostrabile.',
      'I always separate the model metric from the operational KPI. Precision is not a business result: it is a diagnostic indicator. The KPI is the change in the decision or in the loss I set out to reduce, for example median time to reach the correct criterion, or escaped defects per million. Every KPI has an operational definition, window, population, collection method, data owner, and a baseline measured before starting, otherwise improvement cannot be demonstrated.'
    ),
    long: t(
      'Costruisco i KPI in tre livelli e li tengo distinti perché servono a persone diverse. Il primo livello è tecnico: disponibilità, latenza, errori, costo. Serve a chi gestisce il servizio. Il secondo è di qualità del modello: precisione, richiamo, copertura delle citazioni, tasso di rifiuto. Serve a diagnosticare le variazioni del terzo livello, ma non dimostra valore da solo. Il terzo è di esito operativo, ed è l’unico che difende un investimento: tempo per raggiungere la fonte corretta, tasso di accettazione delle proposte, correzioni successive, difetti sfuggiti. La regola che applico è che ogni KPI deve avere una definizione condivisa, una finestra, una popolazione, un metodo e un proprietario del dato che firmi la baseline. Dichiaro anche la variabilità, perché una mediana di dodici minuti con intervallo tra quattro e trentacinque descrive un problema diverso da dodici minuti stabili. Normalizzo quando il mix di prodotto cambia, altrimenti confronto periodi diversi e ottengo guadagni immaginari. Infine dichiaro in anticipo la controipotesi: che cosa vedrei se lo strumento non servisse. Spesso la stessa metrica migliora per stagionalità o perché nel periodo di prova sono cambiati organico e mix, e distinguere il segnale dall’effetto del contesto è ciò che separa un esperimento da una dimostrazione commerciale.',
      'I build KPIs in three levels and keep them distinct because they serve different people. The first level is technical: availability, latency, errors, cost. It serves whoever runs the service. The second is model quality: precision, recall, citation coverage, refusal rate. It serves to diagnose variations in the third level, but it does not demonstrate value on its own. The third is operational outcome, and it is the only one that defends an investment: time to reach the correct source, proposal acceptance rate, later corrections, escaped defects. The rule I apply is that every KPI must have a shared definition, a window, a population, a method, and a data owner who signs the baseline. I also declare variability, because a twelve-minute median ranging from four to thirty-five describes a different problem than a stable twelve minutes. I normalize when product mix changes, otherwise I compare different periods and obtain imaginary gains. Finally I declare the counter-hypothesis in advance: what would I see if the tool were useless. Often the same metric improves through seasonality, or because staffing and mix changed during the trial, and separating the signal from context effects is what distinguishes an experiment from a sales demonstration.'
    ),
    followUps: [
      t('Come tratti un KPI che migliora ma con variabilità in aumento?', 'How do you handle a KPI that improves while variability increases?'),
      t('Che cosa fai se il process owner non accetta la baseline?', 'What do you do if the process owner rejects the baseline?')
    ]
  },
  {
    topicId: 'risk',
    prompt: t('Come gestisci i rischi di un progetto di intelligenza artificiale industriale?', 'How do you manage the risks of an industrial artificial intelligence project?'),
    short: t(
      'Uso un registro dei rischi con punteggi derivati, non con impressioni. Ogni riga dichiara probabilità e impatto su scala uno-cinque, il punteggio inerente come prodotto, i controlli, il punteggio residuo calcolato allo stesso modo, un proprietario, una evidenza e una scadenza. La tolleranza è un cancello, non una media: nessun rischio residuo sopra soglia può restare aperto quando il pilota passa a una fase con più esposizione. Le quattro classi che verifico sempre sono manipolazione tramite contenuto, fuga di informazione, uso improprio degli strumenti e agency eccessiva.',
      'I use a risk register with derived scores rather than impressions. Every row declares likelihood and impact on a one-to-five scale, the inherent score as their product, the controls, the residual score computed the same way, an owner, an evidence reference, and a deadline. Tolerance is a gate, not an average: no residual risk above threshold may stay open when the pilot moves to a phase with more exposure. The four classes I always check are content manipulation, information leakage, tool misuse, and excessive agency.'
    ),
    long: t(
      'Comincio dalle quattro classi specifiche dei sistemi generativi, perché non esistevano nei sistemi tradizionali. La prima è la manipolazione tramite contenuto: il modello non distingue in modo affidabile tra istruzioni del sistema e testo presente nei documenti che legge, quindi la difesa non può essere chiedere prudenza al modello, perché la richiesta viaggia sullo stesso canale dell’attacco. La difesa è architetturale: trattare il contenuto come dato, limitare i permessi effettivi e verificare i claim. La seconda è la fuga di informazione, che tengo separata in tre percorsi: verso l’utente, quando i permessi sono applicati alla ricerca ma non ai frammenti indicizzati; verso il fornitore, quando i dati escono senza una politica di conservazione verificata; e attraverso gli artefatti, cioè registri, cache e valutazioni conservati con controlli più deboli. La terza è l’uso improprio degli strumenti, che si affronta con schema rigido, validazione contro fonti autorevoli, autorizzazione fuori dal modello, chiave di idempotenza, audit e conferma per gli effetti irreversibili. La quarta è l’agency eccessiva, cioè permessi o portata superiori a quanto il compito richiede, e si riconosce guardando i permessi effettivi in esercizio invece di quelli disegnati. Tutte e quattro si valutano con un set di prova, non con una discussione, e i risultati non si mediano: una sola esposizione non autorizzata è un fallimento, perché il danno non è proporzionale alla frequenza.',
      'I start from the four classes specific to generative systems, because they did not exist in traditional systems. The first is content manipulation: the model does not reliably distinguish system instructions from text in the documents it reads, so the defense cannot be asking the model to be careful, because that request travels on the same channel as the attack. The defense is architectural: treat content as data, limit effective permissions, and verify claims. The second is information leakage, which I keep separated into three paths: to the user, when permissions are applied to search but not to indexed fragments; to the provider, when data leaves without a verified retention policy; and through artifacts, meaning logs, caches, and evaluations kept under weaker controls. The third is tool misuse, addressed with a strict schema, validation against authoritative sources, authorization outside the model, an idempotency key, audit, and confirmation for irreversible effects. The fourth is excessive agency, meaning permissions or reach beyond what the task requires, recognized by looking at effective permissions in operation rather than designed ones. All four are assessed with a test set rather than a discussion, and results are not averaged: a single unauthorized exposure is a failure, because the damage is not proportional to frequency.'
    ),
    followUps: [
      t('Come dimostreresti che un controllo funziona davvero?', 'How would you demonstrate that a control actually works?'),
      t('Che cosa fai con un rischio residuo che resta sopra tolleranza?', 'What do you do with a residual risk that stays above tolerance?')
    ]
  },
  {
    topicId: 'human-oversight',
    prompt: t('Che cosa rende effettiva la supervisione umana?', 'What makes human oversight effective?'),
    short: t(
      'La supervisione è effettiva quando la persona può capire la proposta, verificarla e non essere d’accordo senza attrito. Capire richiede una citazione specifica con la revisione usata, non un riferimento generico. Verificare richiede che la fonte si apra con un solo gesto, perché se servono tre passaggi nessuno la aprirà durante un turno. Dissentire richiede che rifiutare costi quanto accettare e che il rifiuto venga registrato come dato utile. Lo misuro con campionamento indipendente delle conferme, non con una dichiarazione di processo.',
      'Oversight is effective when the person can understand the proposal, verify it, and disagree without friction. Understanding requires a specific citation with the revision used, not a generic reference. Verifying requires the source to open in a single gesture, because if it takes three steps nobody will open it during a shift. Disagreeing requires refusal to cost the same as acceptance and to be recorded as useful data. I measure it with independent sampling of confirmations, not with a process statement.'
    ),
    long: t(
      'Distinguo la supervisione formale da quella effettiva, perché quasi tutte le organizzazioni dichiarano la prima e credono di avere la seconda. La supervisione formale esiste quando una procedura dice che una persona approva. La supervisione effettiva esiste quando quella persona ha davvero le condizioni per approvare o rifiutare in modo informato, e le condizioni sono tre. Comprensibilità: la proposta indica la fonte specifica, la revisione usata e il claim sostenuto. Verificabilità: la fonte si apre con un gesto solo, perché il costo di verifica determina se la verifica avviene. Possibilità reale di dissentire: rifiutare deve essere semplice quanto accettare e il rifiuto deve essere registrato come informazione, non come eccezione da giustificare. Poi misuro invece di chiedere. Campiono in modo indipendente le conferme su casi a rischio alto e verifico quante sono precedute dall’apertura della citazione. Guardo il tempo mediano prima della conferma: se il novanta per cento avviene in meno di due secondi su casi complessi, la supervisione è formale e lo dichiaro invece di nasconderlo. Fisso una soglia, per esempio novanta per cento di conferme a rischio alto con citazione aperta, e la tratto come cancello bloccante per lo scaling. Aggiungo formazione sui limiti dello strumento, perché l’eccesso di fiducia è un rischio da gestire come gli altri, con controlli, evidenza e una scadenza per la verifica.',
      'I distinguish formal oversight from effective oversight, because almost every organization declares the first and believes it has the second. Formal oversight exists when a procedure says a person approves. Effective oversight exists when that person actually has the conditions to approve or refuse in an informed way, and there are three conditions. Understandability: the proposal indicates the specific source, the revision used, and the supported claim. Verifiability: the source opens in a single gesture, because the cost of verification determines whether verification happens. A real ability to disagree: refusing must be as easy as accepting, and the refusal must be recorded as information rather than as an exception to justify. Then I measure instead of asking. I independently sample confirmations on high-risk cases and check how many were preceded by opening the citation. I look at median time before confirmation: if ninety percent happen in under two seconds on complex cases, oversight is formal, and I say so instead of hiding it. I set a threshold, for example ninety percent of high-risk confirmations with an opened citation, and treat it as a blocking gate for scaling. I add training on the limits of the tool, because over-reliance is a risk to manage like any other, with controls, evidence, and a deadline for verification.'
    ),
    followUps: [
      t('Che cosa cambieresti se la citazione venisse aperta nel venti per cento dei casi?', 'What would you change if the citation were opened in twenty percent of cases?'),
      t('Come eviti che il rifiuto venga percepito come un errore dell’operatore?', 'How do you prevent refusal from being perceived as an operator error?')
    ]
  },
  {
    topicId: 'scaling',
    prompt: t('Come decidi quando scalare e quando non scalare?', 'How do you decide when to scale and when not to?'),
    short: t(
      'Scalare non significa installare la stessa applicazione altrove: significa riprodurre un risultato in un contesto diverso per dati, processo, persone e vincoli. Quindi chiedo quale parte del risultato dipendeva dal contesto originale e applico cancelli espliciti. Un cancello bloccante non superato ferma la raccomandazione, indipendentemente da quanti altri sono verdi, perché i rischi non si compensano e la media dei cancelli non è una misura valida. Quando decido di non scalare, dichiaro la condizione mancante, ne assegno la proprietà con una scadenza e fisso il riesame.',
      'Scaling does not mean installing the same application elsewhere: it means reproducing a result in a context that differs in data, process, people, and constraints. So I ask which part of the result depended on the original context, and I apply explicit gates. One unmet blocking gate stops the recommendation, regardless of how many others are green, because risks do not offset each other and averaging gates is not a valid measure. When I decide not to scale, I declare the missing condition, assign its ownership with a deadline, and set the review.'
    ),
    long: t(
      'Il primo sito produce sempre un risultato che dipende in parte dal suo contesto: un archivio documentale insolitamente ordinato, un process owner molto disponibile, una linea con pochi prodotti. Nessuno di questi fattori si trasferisce da solo, quindi la domanda corretta non è se la tecnologia funziona ma quale parte del risultato era locale. Uso una checklist di cancelli con punteggi di prontezza pesati per sito. In un esempio ipotetico i punteggi erano 87, 74, 62 e 85 su una soglia di 70. Il sito con 85, il secondo più alto, è stato sospeso perché l’accesso remoto del fornitore era fuori politica, mentre il sito con 74 è stato approvato: un cancello bloccante non si compensa con un punteggio elevato. Guardo poi il modello di supporto, che decide se il secondo sito avrà la stessa esperienza del primo: tre livelli chiari, orari coerenti con i turni produttivi, escalation con tempi dichiarati e un proprietario locale nominato. Se manca, non è un piano ma una previsione ottimistica. Verifico infine che la supervisione umana sia effettiva e non soltanto formale, perché una supervisione dichiarata ma non praticata rende fragile qualunque estensione. Quando la raccomandazione è un no, la presento in un ordine preciso: risultato misurato rispetto alla baseline, condizione mancante, proposta con proprietario e scadenza, e costo del ritardo confrontato con il costo del rischio. Un no motivato protegge dal costo nascosto di una espansione prematura, che è quasi sempre superiore al costo di attendere un trimestre.',
      'The first site always produces a result that partly depends on its context: an unusually tidy document archive, a highly available process owner, a line with few products. None of those transfers by itself, so the correct question is not whether the technology works but which part of the result was local. I use a gate checklist with weighted readiness scores per site. In a hypothetical example the scores were 87, 74, 62, and 85 against a threshold of 70. The site scoring 85, the second highest, was suspended because vendor remote access was outside policy, while the site scoring 74 was approved: a blocking gate is not offset by a high score. Then I look at the support model, which decides whether the second site will have the same experience as the first: three clear levels, hours consistent with production shifts, escalation with declared response times, and a named local owner. Without it, this is not a plan but an optimistic forecast. Finally I check that human oversight is effective and not merely formal, because oversight that is declared but not practiced makes any extension fragile. When the recommendation is a no, I present it in a precise order: measured result against the baseline, missing condition, proposal with owner and deadline, and cost of delay compared with cost of risk. A reasoned no protects against the hidden cost of premature expansion, which is almost always higher than the cost of waiting a quarter.'
    ),
    followUps: [
      t('Come presenteresti un no a una direzione che ha già annunciato l’espansione?', 'How would you present a no to management that already announced the expansion?'),
      t('Quale evidenza minima ti farebbe cambiare idea entro il trimestre?', 'Which minimum evidence would change your mind within the quarter?')
    ]
  }
]

export const interviewLabLesson = {
  id: 'interview-lab',
  slug: 'interview-lab',
  moduleNumber: 6,
  title: t('Laboratorio di colloquio tecnico', 'Technical interview lab'),
  subtitle: t(
    'Dalla struttura della risposta alla simulazione da venti minuti senza note, con rubric e scheda di ripasso.',
    'From answer structure to a twenty-minute simulation without notes, with a rubric and a review sheet.'
  ),
  durationMinutes: 75,
  timeBudget: { theory: 19, cases: 25, practice: 31 },
  level: t('Technical Lead', 'Technical Lead'),
  outcomes: [
    t('Strutturare ogni risposta con sintesi, ragionamento, esempio, trade-off e risultato.', 'Structure every answer with headline, reasoning, example, trade-off, and result.'),
    t('Difendere una prioritizzazione e un percorso architetturale davanti a obiezioni reali.', 'Defend a prioritization and an architecture path against real objections.'),
    t('Rispondere in inglese su ogni argomento prioritario in trenta secondi e in due minuti.', 'Answer in English on every priority topic in thirty seconds and in two minutes.'),
    t('Completare la simulazione da venti minuti senza note e valutarla con la rubric.', 'Complete the twenty-minute simulation without notes and score it with the rubric.')
  ],
  answerRubric,
  mockInterviewSimulation,
  readinessTracker,
  rapidReviewSheet,
  automationDefenceMatrix,
  sensorToDecisionPath,
  artifact: answerRubric,
  professionalArtifacts: [mockInterviewSimulation, readinessTracker, rapidReviewSheet],
  units,
  interviewAnswers,
  finalQuiz: [
    checkpoint(
      'Che cosa contiene la prima frase di una risposta forte?',
      'What does the first sentence of a strong answer contain?',
      [
        ['La posizione e il criterio con cui è stata scelta.', 'The position and the criterion behind it.', 'Dà una direzione a tutto il resto della risposta.', 'It gives direction to everything that follows.'],
        ['Il contesto aziendale necessario a capire il resto.', 'The company context needed to understand the rest.', 'Rinvia la posizione e consuma l’attenzione iniziale.', 'It postpones the position and consumes the initial attention.'],
        ['Le tecnologie usate nel progetto.', 'The technologies used in the project.', 'Un elenco di tecnologie non è una decisione.', 'A list of technologies is not a decision.']
      ],
      0
    ),
    checkpoint(
      'Quando la preparazione può considerarsi conclusa?',
      'When can preparation be considered complete?',
      [
        ['Quando la media dei punteggi supera dieci su dodici.', 'When the average score exceeds ten out of twelve.', 'La media nasconde gli argomenti sotto soglia.', 'The average hides the topics below threshold.'],
        ['Quando ogni argomento centrale raggiunge dieci su dodici e la simulazione è completata senza note.', 'When every core topic reaches ten out of twelve and the simulation is completed without notes.', 'Entrambe le condizioni sono richieste.', 'Both conditions are required.'],
        ['Quando la scheda di ripasso rapido è stata letta.', 'When the rapid review sheet has been read.', 'Leggere non sostituisce la prova a voce.', 'Reading does not replace speaking practice.']
      ],
      1
    ),
    checkpoint(
      'Che cosa fai quando non conosci la risposta a una domanda tecnica?',
      'What do you do when you do not know the answer to a technical question?',
      [
        ['Costruisci una spiegazione plausibile.', 'You build a plausible explanation.', 'Chi intervista se ne accorge e la fiducia cala.', 'Interviewers notice and trust drops.'],
        ['Dichiari il confine, come verificheresti e quale adiacenza utile hai.', 'You state the boundary, how you would verify, and which useful adjacency you have.', 'Trasforma una lacuna in una dimostrazione di metodo.', 'It turns a gap into a demonstration of method.'],
        ['Sposti la conversazione su un argomento che conosci.', 'You move the conversation to a topic you know.', 'Evita la domanda invece di rispondere.', 'It avoids the question instead of answering it.']
      ],
      1
    )
  ]
}

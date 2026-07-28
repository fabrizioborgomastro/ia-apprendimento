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

const microExample = (titleIt, titleEn, explanationIt, explanationEn) => ({
  title: t(titleIt, titleEn),
  explanation: t(explanationIt, explanationEn),
  durationMinutes: 1
})

let evidenceReferenceSequence = 0
const assessment = (score, confidence, evidenceIt, evidenceEn, rationaleIt, rationaleEn) => ({
  score,
  confidence,
  evidence: t(evidenceIt, evidenceEn),
  rationale: t(rationaleIt, rationaleEn),
  assumptions: [t(
    'La valutazione assume che il documento osservato rappresenti il perimetro dichiarato fino alla data di riesame.',
    'The assessment assumes that the observed document represents the stated scope until the review date.'
  )],
  evidenceReferences: [{
    id: `score-evidence-${String(++evidenceReferenceSequence).padStart(2, '0')}`,
    sourceId: 'module-3-case-evidence',
    documentId: `M3-EVID-${String(evidenceReferenceSequence).padStart(2, '0')}`,
    observationDate: '2026-07-15',
    reviewDate: '2026-10-15',
    description: t(evidenceIt, evidenceEn)
  }]
})

const gateCheck = (gateId, passed, evidenceIt, evidenceEn, rationaleIt, rationaleEn) => ({
  gateId,
  passed,
  evidence: t(evidenceIt, evidenceEn),
  rationale: t(rationaleIt, rationaleEn)
})

const caseSegment = (id, durationMinutes, titleIt, titleEn, scenarioIt, scenarioEn) => ({
  id,
  durationMinutes,
  title: t(titleIt, titleEn),
  scenario: t(scenarioIt, scenarioEn)
})

const quickTask = (decisionCount, calculationCount, contextIt, contextEn, formatIt, formatEn) => ({
  outputCount: 1,
  decisionCount,
  calculationCount,
  providedContext: t(contextIt, contextEn),
  responseFormat: t(formatIt, formatEn)
})

const decisionContexts = {
  'approved-for-shadow-pilot': {
    target: t('Completare uno shadow pilot sugli SKU approvati con decision log.', 'Complete a shadow pilot on approved SKUs with a decision log.'),
    budgetBoundary: t('Massimo 45.000 euro; nessuna autorità di rilascio automatica.', 'Maximum EUR 45,000; no automated release authority.'),
    dependencies: [t('Identità prodotto verificata e reviewer qualificati disponibili.', 'Verified product identity and available qualified reviewers.')]
  },
  'approved-for-data-readiness': {
    target: t('Riconciliare 40 eventi, completare il lineage e misurare la baseline shadow.', 'Reconcile 40 events, complete lineage, and measure the shadow baseline.'),
    budgetBoundary: t('Massimo 20.000 euro per data readiness; nessun training di produzione.', 'Maximum EUR 20,000 for data readiness; no production training.'),
    dependencies: [t('Failure coding, work order e configurazione sensori riconciliati.', 'Reconciled failure coding, work orders, and sensor configuration.')]
  },
  'approved-for-limited-pilot': {
    target: t('Completare backtest rolling-origin e decision log per dodici settimane.', 'Complete rolling-origin backtesting and a decision log for twelve weeks.'),
    budgetBoundary: t('Massimo 30.000 euro; nessuna modifica automatica degli ordini.', 'Maximum EUR 30,000; no automatic order changes.'),
    dependencies: [t('Vintage forecast conservati e partecipazione di Planning e Procurement.', 'Retained forecast vintages and Planning and Procurement participation.')]
  },
  'rejected-use-rule': {
    target: t('Implementare la soglia approvata come regola deterministica auditabile.', 'Implement the approved threshold as an auditable deterministic rule.'),
    budgetBoundary: t('Massimo 8.000 euro per regola, test e audit; nessun servizio GenAI.', 'Maximum EUR 8,000 for rule, testing, and audit; no GenAI service.'),
    dependencies: [t('Limite approvato, owner PLC e procedura di escalation.', 'Approved limit, PLC owner, and escalation procedure.')]
  }
}

const decisionRecord = (status, ownerIt, ownerEn, dissentIt, dissentEn, guardrailIt, guardrailEn, stopIt, stopEn, reviewDate) => ({
  dissent: t(dissentIt, dissentEn),
  approval: {
    status,
    owner: t(ownerIt, ownerEn)
  },
  guardrails: [t(guardrailIt, guardrailEn)],
  stopCriteria: [t(stopIt, stopEn)],
  ...decisionContexts[status],
  reviewDate
})

const workedExamples = {
  downtimeCost: {
    events: 7,
    minutesPerEvent: 42,
    costPerDowntimeHour: 3600,
    avoidableShare: 0.4,
    baselineCost: 17640,
    avoidableCost: 7056,
    formula: t(
      '7 eventi × 42 minuti × 3.600 euro/ora ÷ 60 = 17.640 euro; il 40 per cento evitabile vale 7.056 euro.',
      '7 events × 42 minutes × EUR 3,600/hour ÷ 60 = EUR 17,640; the avoidable 40 percent is worth EUR 7,056.'
    ),
    assumptions: t(
      'Il costo orario include margine di contribuzione perso, lavoro improduttivo ed energia di riavvio, ma esclude qualità e danni; il 40 per cento è un’ipotesi da validare con un esperimento prospettico.',
      'Hourly cost includes lost contribution, idle labor, and restart energy but excludes quality and damage; the 40 percent share is a hypothesis to validate prospectively.'
    )
  },
  confusionMatrix: {
    truePositive: 72,
    falsePositive: 18,
    falseNegative: 8,
    trueNegative: 902,
    total: 1000,
    precision: 0.8,
    recall: 0.9,
    interpretation: t(
      'Su 90 segnalazioni, 72 sono difetti confermati: precisione 72/(72+18)=80 per cento. Su 80 difetti reali, 72 sono trovati: recall 72/(72+8)=90 per cento. Le due domande operative sono quindi diverse.',
      'Of 90 referrals, 72 are confirmed defects: precision is 72/(72+18)=80 percent. Of 80 actual defects, 72 are found: recall is 72/(72+8)=90 percent. The two operational questions are different.'
    )
  },
  asymmetricErrorCost: {
    falsePositiveCost: 55,
    falseNegativeCost: 1800,
    thresholdOptions: [
      {
        id: 'balanced-0-62',
        truePositive: 72,
        falsePositive: 18,
        falseNegative: 8,
        trueNegative: 902,
        total: 1000,
        referrals: 90,
        evaluationHours: 2.5,
        referralsPerHour: 36,
        expectedCost: 15390
      },
      {
        id: 'recall-first-0-44',
        truePositive: 77,
        falsePositive: 43,
        falseNegative: 3,
        trueNegative: 877,
        total: 1000,
        referrals: 120,
        evaluationHours: 2.5,
        referralsPerHour: 48,
        expectedCost: 7765
      }
    ],
    recommendedThresholdId: 'recall-first-0-44',
    explanation: t(
      'La soglia 0,62 costa 18×55 + 8×1.800 = 15.390 euro. La soglia 0,44 costa 43×55 + 3×1.800 = 7.765 euro. Nelle 2,5 ore osservate, 77 TP + 43 FP producono 120 referral, cioè 48 ogni ora.',
      'Threshold 0.62 costs 18×55 + 8×1,800 = EUR 15,390. Threshold 0.44 costs 43×55 + 3×1,800 = EUR 7,765. Across 2.5 observed hours, 77 TP + 43 FP produce 120 referrals, or 48 per hour.'
    )
  },
  forecastUncertainty: {
    baseForecast: 1000,
    predictionInterval: { lower: 820, upper: 1210, coverage: 0.9 },
    scenarios: [
      { id: 'downside-disruption', demandMultiplier: 0.8, units: 800 },
      { id: 'central', demandMultiplier: 1, units: 1000 },
      { id: 'upside-recovery', demandMultiplier: 1.15, units: 1150 }
    ],
    actions: [
      {
        trigger: t(
          'Conferma di ritardo fornitore oltre cinque giorni o domanda sotto 850 unità.',
          'Confirmed supplier delay beyond five days or demand below 850 units.'
        ),
        response: t(
          'Proteggere i materiali critici, ridurre il piano non vincolante e riesaminare ogni giorno.',
          'Protect constrained materials, reduce the non-firm plan, and review daily.'
        )
      },
      {
        trigger: t(
          'Ordini confermati sopra 1.100 unità con disponibilità materiale verificata.',
          'Confirmed orders above 1,100 units with verified material availability.'
        ),
        response: t(
          'Pre-autorizzare capacità flessibile senza trasformare il forecast in un ordine irrevocabile.',
          'Pre-authorize flexible capacity without turning the forecast into an irrevocable order.'
        )
      }
    ]
  }
}

const methodSelectionLadder = {
  title: t(
    'Scala della tecnica più semplice adeguata',
    'Simplest adequate method ladder'
  ),
  levels: [
    {
      id: 'deterministic-rule',
      label: t('Regola deterministica', 'Deterministic rule'),
      fit: t(
        'Relazione stabile, soglia definita e conseguenza che richiede comportamento prevedibile.',
        'Stable relationship, defined threshold, and a consequence requiring predictable behavior.'
      )
    },
    {
      id: 'descriptive-diagnostic-analytics',
      label: t('Analytics descrittivi e diagnostici', 'Descriptive and diagnostic analytics'),
      fit: t(
        'Il bisogno è vedere, confrontare, segmentare o spiegare perdite osservate.',
        'The need is to see, compare, segment, or explain observed losses.'
      )
    },
    {
      id: 'predictive-machine-learning',
      label: t('Machine learning predittivo', 'Predictive machine learning'),
      fit: t(
        'Pattern multivariati e probabilistici anticipano un esito con ground truth verificabile.',
        'Multivariate probabilistic patterns anticipate an outcome with verifiable ground truth.'
      )
    },
    {
      id: 'optimization',
      label: t('Ottimizzazione', 'Optimization'),
      fit: t(
        'Occorre scegliere una combinazione di azioni sotto vincoli e obiettivi espliciti.',
        'A combination of actions must be selected under explicit constraints and objectives.'
      )
    },
    {
      id: 'generative-ai',
      label: t('AI generativa', 'Generative AI'),
      fit: t(
        'Il valore dipende dalla comprensione o produzione controllata di contenuto non strutturato.',
        'Value depends on controlled understanding or production of unstructured content.'
      )
    }
  ],
  examples: [
    {
      id: 'temperature-limit-alert',
      selectedLevelId: 'deterministic-rule',
      disposition: 'select',
      rationale: t(
        'Il limite validato è noto e deve essere applicato in modo deterministico.',
        'The validated limit is known and must be applied deterministically.'
      ),
      requiredEvidence: t(
        'Limite approvato, qualità sensore, isteresi e owner della risposta.',
        'Approved limit, sensor quality, hysteresis, and response owner.'
      )
    },
    {
      id: 'weekly-loss-pareto',
      selectedLevelId: 'descriptive-diagnostic-analytics',
      disposition: 'select',
      rationale: t(
        'La domanda è dove si concentra la perdita, non che cosa generare o prevedere.',
        'The question is where loss concentrates, not what to generate or predict.'
      ),
      requiredEvidence: t(
        'Codici evento coerenti, denominatori di produzione e regole di aggregazione.',
        'Consistent event codes, production denominators, and aggregation rules.'
      )
    },
    {
      id: 'bearing-failure-risk',
      selectedLevelId: 'predictive-machine-learning',
      disposition: 'defer-until-ready',
      rationale: t(
        'La relazione tra segnali e degrado è probabilistica, ma oggi mancano etichette rappresentative.',
        'The relationship between signals and degradation is probabilistic, but representative labels are currently missing.'
      ),
      requiredEvidence: t(
        'Failure mode, storico sensori, work order riconciliati, lead time e confronto con baseline.',
        'Failure mode, sensor history, reconciled work orders, lead time, and baseline comparison.'
      )
    },
    {
      id: 'production-allocation',
      selectedLevelId: 'optimization',
      disposition: 'select',
      rationale: t(
        'Volumi, capacità, qualifica e scorte formano un problema di vincoli e costo.',
        'Volumes, capacity, qualification, and inventory form a constrained cost problem.'
      ),
      requiredEvidence: t(
        'Vincoli approvati, funzione obiettivo, scenari e processo per override.',
        'Approved constraints, objective function, scenarios, and override process.'
      )
    },
    {
      id: 'controlled-manual-summary',
      selectedLevelId: 'generative-ai',
      disposition: 'pilot-with-controls',
      rationale: t(
        'Il task sintetizza testo non strutturato e mantiene verifica e citazioni umane.',
        'The task summarizes unstructured text while retaining human verification and citations.'
      ),
      requiredEvidence: t(
        'Corpus autorizzato, evaluation set, citation accuracy, access control e approvazione.',
        'Authorized corpus, evaluation set, citation accuracy, access control, and approval.'
      )
    },
    {
      id: 'line-threshold-decision',
      selectedLevelId: 'deterministic-rule',
      disposition: 'reject-genai',
      rationale: t(
        'Una soglia numerica approvata non beneficia da output linguistico variabile.',
        'An approved numeric threshold does not benefit from variable language output.'
      ),
      requiredEvidence: t(
        'Specifica della soglia, gestione stato sensore, audit e procedura di escalation.',
        'Threshold specification, sensor-state handling, audit, and escalation procedure.'
      )
    }
  ]
}

const dataReadinessUseCaseArtifact = {
  title: t(
    'Scheda auditabile di data readiness e selezione del caso d’uso',
    'Auditable data-readiness and use-case selection sheet'
  ),
  description: t(
    'Una matrice che rende separati score, evidenza, confidenza, hard gate e decisione di portafoglio, così un numero alto non nasconde una precondizione mancante.',
    'A matrix that keeps score, evidence, confidence, hard gates, and portfolio decision separate so a high number cannot hide a missing prerequisite.'
  ),
  scale: t(
    'Scala ponderata ottenibile da 20 a 100, perché ogni criterio ammette score interi da 1 a 5.',
    'Attainable weighted scale from 20 to 100 because every criterion accepts integer scores from 1 to 5.'
  ),
  formula: t(
    'Somma di score per peso divisa per 5; con pesi pari a 100 il minimo è 20 e il massimo è 100.',
    'Sum of score times weight divided by 5; with weights totaling 100, the minimum is 20 and the maximum is 100.'
  ),
  attainableScoreRange: { minimum: 20, maximum: 100 },
  audit: {
    rubricVersion: 'M3-DRS-1.0',
    assessmentDate: '2026-07-15',
    participants: [
      { role: t('Responsabile Quality', 'Quality lead') },
      { role: t('Responsabile Reliability', 'Reliability lead') },
      { role: t('Data product owner', 'Data product owner') },
      { role: t('Responsabile OT e Security', 'OT and Security lead') }
    ],
    decisionOwner: t('Direttore Operations', 'Operations director'),
    budgetBoundary: t(
      'Massimo 45.000 euro per pilot, senza modifica automatica di PLC, rilascio prodotto o ordini.',
      'Maximum EUR 45,000 per pilot, with no automatic PLC, product-release, or ordering changes.'
    ),
    dependencies: [
      t('Identità prodotto e asset con validità temporale.', 'Product and asset identity with temporal validity.'),
      t('Capacità di review umana e owner operativi nominati.', 'Human-review capacity and named operational owners.')
    ]
  },
  criteria: [
    {
      id: 'business-decision-value',
      weight: 20,
      label: t('Valore della decisione', 'Business decision value'),
      anchors: {
        1: t('Nessuna decisione, baseline o conseguenza economica definita.', 'No defined decision, baseline, or economic consequence.'),
        3: t('Decisione e baseline definite, ma valore o frequenza sono ancora stimati.', 'Decision and baseline are defined, but value or frequency remains estimated.'),
        5: t('Owner, frequenza, baseline e valore netto sono osservati e riconciliati.', 'Owner, frequency, baseline, and net value are observed and reconciled.')
      },
      intermediateScorePolicy: t('Usare 2 o 4 solo quando l’evidenza cade tra i due anchor adiacenti e documentare il gap.', 'Use 2 or 4 only when evidence falls between adjacent anchors and document the gap.')
    },
    {
      id: 'data-semantic-readiness',
      weight: 25,
      label: t('Readiness semantica dei dati', 'Data semantic readiness'),
      anchors: {
        1: t('Fonti, unità, identità e significato non sono controllati.', 'Sources, units, identity, and meaning are uncontrolled.'),
        3: t('Contratto e owner esistono, ma coverage o lineage hanno lacune note.', 'Contract and owners exist, but coverage or lineage has known gaps.'),
        5: t('Contratto approvato, lineage, qualità e coverage sono misurati sul perimetro.', 'Approved contract, lineage, quality, and coverage are measured for the scope.')
      },
      intermediateScorePolicy: t('Usare 2 o 4 solo con evidenza tra anchor adiacenti e una lacuna esplicita.', 'Use 2 or 4 only with evidence between adjacent anchors and an explicit gap.')
    },
    {
      id: 'label-and-ground-truth-readiness',
      weight: 20,
      label: t('Readiness di label e ground truth', 'Label and ground-truth readiness'),
      anchors: {
        1: t('Il target non è definito o deriva da proxy non verificati.', 'The target is undefined or comes from unverified proxies.'),
        3: t('Policy e campione verificato esistono, ma agreement o coverage sono parziali.', 'Policy and a verified sample exist, but agreement or coverage is partial.'),
        5: t('Policy approvata, adjudication, agreement, casi incerti, coverage e lineage sono misurati.', 'Approved policy, adjudication, agreement, uncertain cases, coverage, and lineage are measured.')
      },
      intermediateScorePolicy: t('Usare 2 o 4 soltanto citando quale requisito dell’anchor superiore manca.', 'Use 2 or 4 only by citing which higher-anchor requirement is missing.')
    },
    {
      id: 'workflow-and-integration-readiness',
      weight: 20,
      label: t('Readiness di workflow e integrazione', 'Workflow and integration readiness'),
      anchors: {
        1: t('Output, owner, capacità, interfaccia e fallback non sono definiti.', 'Output, owner, capacity, interface, and fallback are undefined.'),
        3: t('Workflow advisory e owner sono definiti, ma capacità o degraded mode non sono provati.', 'Advisory workflow and owner are defined, but capacity or degraded mode is unproven.'),
        5: t('Workflow, capacità, integrazione, monitoraggio e fallback sono testati end-to-end.', 'Workflow, capacity, integration, monitoring, and fallback are tested end to end.')
      },
      intermediateScorePolicy: t('Usare 2 o 4 quando una prova osservabile soddisfa solo parte dell’anchor successivo.', 'Use 2 or 4 when observable evidence satisfies only part of the next anchor.')
    },
    {
      id: 'risk-oversight-and-adoption',
      weight: 15,
      label: t('Rischio, oversight e adozione', 'Risk, oversight, and adoption'),
      anchors: {
        1: t('Autorità, guardrail, soggetti coinvolti e stop criteria non sono definiti.', 'Authority, guardrails, affected parties, and stop criteria are undefined.'),
        3: t('Owner e confine di autorità sono definiti, ma controllo o adozione non sono ancora provati.', 'Owner and authority boundary are defined, but controls or adoption remain unproven.'),
        5: t('Oversight, guardrail, audit, stop criteria e adozione sono testati e approvati.', 'Oversight, guardrails, audit, stop criteria, and adoption are tested and approved.')
      },
      intermediateScorePolicy: t('Usare 2 o 4 soltanto con motivazione riferita agli anchor confinanti.', 'Use 2 or 4 only with rationale tied to the neighboring anchors.')
    }
  ],
  hardGates: [
    {
      id: 'defined-action-and-owner',
      label: t('Azione e owner definiti', 'Defined action and owner')
    },
    {
      id: 'representative-trustworthy-data',
      label: t('Dati rappresentativi e affidabili', 'Representative trustworthy data')
    },
    {
      id: 'authorized-decision-boundary',
      label: t(
        'Il confine decisionale resta autorizzato',
        'Decision authority remains controlled'
      )
    }
  ],
  candidates: [
    {
      id: 'vision-seal-review',
      assessments: {
        'business-decision-value': assessment(
          5, 'high',
          'Tre mesi di scrap e reclami riconciliati quantificano il costo del difetto.',
          'Three reconciled months of scrap and complaints quantify defect cost.',
          'La decisione protegge qualità e riduce ispezione ripetitiva senza automatizzare il rilascio.',
          'The decision protects quality and reduces repetitive inspection without automating release.'
        ),
        'data-semantic-readiness': assessment(
          4, 'high',
          'Immagini sono collegate a SKU, camera, ricetta, timestamp e stato luce.',
          'Images are linked to SKU, camera, recipe, timestamp, and lighting state.',
          'La copertura è buona, ma resta una verifica per due formati stagionali.',
          'Coverage is good, but two seasonal formats still require verification.'
        ),
        'label-and-ground-truth-readiness': assessment(
          4, 'medium',
          'Due ispettori qualificati hanno adjudicato un campione stratificato.',
          'Two qualified inspectors adjudicated a stratified sample.',
          'Le classi principali sono ripetibili; i casi borderline richiedono escalation.',
          'Main classes are repeatable; borderline cases require escalation.'
        ),
        'workflow-and-integration-readiness': assessment(
          4, 'high',
          'La stazione di review dispone di buffer, identità prodotto e percorso di hold.',
          'The review station has buffering, product identity, and a hold path.',
          'Il flusso può operare in advisory e tornare a ispezione manuale.',
          'The flow can operate in advisory mode and return to manual inspection.'
        ),
        'risk-oversight-and-adoption': assessment(
          4, 'high',
          'Quality mantiene la disposizione e 60 review/ora superano i 48 referral attesi.',
          'Quality retains disposition and 60 reviews/hour exceed the 48 expected referrals.',
          'Oversight, capacità e fallback sono definiti prima del pilot.',
          'Oversight, capacity, and fallback are defined before the pilot.'
        )
      },
      weightedScore: 84,
      hardGateChecks: [
        gateCheck(
          'defined-action-and-owner', true,
          'Quality Engineering possiede la review e la decisione.',
          'Quality Engineering owns review and decision.',
          'Ogni referral termina in accept, reject o escalate.',
          'Every referral ends in accept, reject, or escalate.'
        ),
        gateCheck(
          'representative-trustworthy-data', true,
          'Campione stratificato su SKU, turno, camera e illuminazione.',
          'Sample stratified by SKU, shift, camera, and lighting.',
          'La rappresentatività è misurata e le lacune sono registrate.',
          'Representativeness is measured and gaps are recorded.'
        ),
        gateCheck(
          'authorized-decision-boundary', true,
          'Il modello crea referral ma non rilascia o scarta prodotto.',
          'The model creates referrals but does not release or scrap product.',
          'La disposizione resta a una persona qualificata.',
          'Disposition remains with a qualified person.'
        )
      ],
      portfolioDecision: 'selected',
      decisionRecord: decisionRecord(
        'approved-for-shadow-pilot', 'Direttore Quality', 'Quality director',
        'Security chiede verifica degli accessi alle immagini prima dell’advisory.',
        'Security requests image-access verification before advisory operation.',
        'La disposizione resta a un reviewer qualificato.', 'Disposition remains with a qualified reviewer.',
        'Fermare se la coda supera 50 per due ore o manca identità prodotto.',
        'Stop if the queue exceeds 50 for two hours or product identity is missing.',
        '2026-09-15'
      ),
      recommendation: t(
        'Selezionare un pilot shadow e poi advisory con review umana e stop criteria.',
        'Select a shadow pilot followed by advisory operation with human review and stop criteria.'
      )
    },
    {
      id: 'predictive-maintenance-bearing',
      assessments: {
        'business-decision-value': assessment(
          5, 'high',
          'Gli eventi storici valgono 17.640 euro nel periodo osservato.',
          'Historical events are worth EUR 17,640 in the observed period.',
          'Il costo è materiale e legato a una decisione manutentiva concreta.',
          'The cost is material and linked to a concrete maintenance decision.'
        ),
        'data-semantic-readiness': assessment(
          3, 'medium',
          'Vibrazione e velocità sono disponibili, ma due sensori hanno cambiato posizione.',
          'Vibration and speed exist, but two sensors changed position.',
          'Il lineage è parziale e richiede segmentazione per configurazione.',
          'Lineage is partial and requires configuration segmentation.'
        ),
        'label-and-ground-truth-readiness': assessment(
          2, 'low',
          'Solo nove work order hanno causa guasto verificata e timestamp coerente.',
          'Only nine work orders have a verified failure cause and consistent timestamp.',
          'La label scarsa non sostiene ancora una promessa predittiva.',
          'Sparse labels do not yet support a predictive promise.'
        ),
        'workflow-and-integration-readiness': assessment(
          3, 'medium',
          'Il planner può prenotare una finestra, ma la capacità diagnostica non è sempre disponibile.',
          'The planner can reserve a window, but diagnostic capacity is not always available.',
          'Il workflow è plausibile ma deve essere provato in shadow mode.',
          'The workflow is plausible but must be proven in shadow mode.'
        ),
        'risk-oversight-and-adoption': assessment(
          4, 'medium',
          'Manutenzione accetta advisory con conferma tecnica e fallback a ispezione.',
          'Maintenance accepts advisory use with technical confirmation and inspection fallback.',
          'Il confine di autorità è chiaro, ma il carico alert non è ancora misurato.',
          'Authority boundaries are clear, but alert workload is not yet measured.'
        )
      },
      weightedScore: 67,
      hardGateChecks: [
        gateCheck(
          'defined-action-and-owner', true,
          'Reliability Engineering possiede diagnosi e raccomandazione.',
          'Reliability Engineering owns diagnosis and recommendation.',
          'Una finestra entro 36 ore è un’azione osservabile.',
          'A maintenance window within 36 hours is an observable action.'
        ),
        gateCheck(
          'representative-trustworthy-data', false,
          'Nove label verificate non coprono operating mode e interventi.',
          'Nine verified labels do not cover operating modes and interventions.',
          'Occorre raccogliere e riconciliare evidenza prima del training impegnativo.',
          'Evidence must be collected and reconciled before committing to training.'
        ),
        gateCheck(
          'authorized-decision-boundary', true,
          'Il servizio propone un’ispezione ma non prenota la finestra o modifica il controllo.',
          'The service proposes an inspection but does not reserve a window or change control.',
          'L’azione manutentiva richiede autorizzazione umana.',
          'Maintenance action requires human authorization.'
        )
      ],
      portfolioDecision: 'deferred',
      decisionRecord: decisionRecord(
        'approved-for-data-readiness', 'Responsabile Reliability', 'Reliability lead',
        'Maintenance ritiene utile iniziare subito; Data contesta la rappresentatività delle label.',
        'Maintenance favors starting now; Data disputes label representativeness.',
        'Nessun alert operativo prima del superamento del gate dati.', 'No operational alerts before the data gate passes.',
        'Interrompere se physical asset identity o sensor lineage non sono ricostruibili.',
        'Stop if physical asset identity or sensor lineage cannot be reconstructed.',
        '2026-10-15'
      ),
      recommendation: t(
        'Rinviare la promessa PdM; finanziare prima lineage, failure coding e shadow baseline.',
        'Defer the PdM promise; first fund lineage, failure coding, and a shadow baseline.'
      )
    },
    {
      id: 'supply-risk-scenarios',
      assessments: {
        'business-decision-value': assessment(
          4, 'high',
          'Planner e procurement hanno definito decisioni per materiali vincolati.',
          'Planning and procurement defined decisions for constrained materials.',
          'Il valore deriva da reazione anticipata, non da una previsione perfetta.',
          'Value comes from earlier response, not from a perfect forecast.'
        ),
        'data-semantic-readiness': assessment(
          4, 'medium',
          'Ordini, lead time e stock hanno owner e calendario comune.',
          'Orders, lead times, and inventory have owners and a common calendar.',
          'Restano alcune conferme fornitore ricevute via testo libero.',
          'Some supplier confirmations still arrive as free text.'
        ),
        'label-and-ground-truth-readiness': assessment(
          4, 'high',
          'Domanda effettiva, arrivi e revisioni forecast sono conservati.',
          'Actual demand, receipts, and forecast vintages are retained.',
          'Il backtest può evitare leakage usando ogni vintage disponibile allora.',
          'Backtesting can avoid leakage by using each vintage available at the time.'
        ),
        'workflow-and-integration-readiness': assessment(
          4, 'medium',
          'Esiste un S&OP settimanale con owner e limiti di override.',
          'A weekly S&OP process exists with owners and override limits.',
          'Gli scenari possono entrare come decision support senza aggiornamento automatico degli ordini.',
          'Scenarios can enter as decision support without automatically changing orders.'
        ),
        'risk-oversight-and-adoption': assessment(
          3, 'medium',
          'I planner chiedono intervalli, ma serve disciplina per non scegliere solo lo scenario centrale.',
          'Planners request intervals, but discipline is needed not to select only the central scenario.',
          'Adozione e calibration review devono essere incluse nel pilot.',
          'Adoption and calibration review must be included in the pilot.'
        )
      },
      weightedScore: 77,
      hardGateChecks: [
        gateCheck(
          'defined-action-and-owner', true,
          'Procurement possiede expediting e Planning possiede riallocazione.',
          'Procurement owns expediting and Planning owns reallocation.',
          'Trigger e decision rights sono documentati.',
          'Triggers and decision rights are documented.'
        ),
        gateCheck(
          'representative-trustworthy-data', true,
          'Ventiquattro vintage mensili consentono un backtest temporale.',
          'Twenty-four monthly vintages support temporal backtesting.',
          'La storia conserva ciò che era noto al momento.',
          'History preserves what was known at each point in time.'
        ),
        gateCheck(
          'authorized-decision-boundary', true,
          'Lo scenario non cambia automaticamente ordini, allocazioni o sostituzioni.',
          'The scenario does not automatically change orders, allocations, or substitutions.',
          'Ordini e sostituzioni restano approvati dai ruoli correnti.',
          'Orders and substitutions remain approved by current roles.'
        )
      ],
      portfolioDecision: 'pilot',
      decisionRecord: decisionRecord(
        'approved-for-limited-pilot', 'Direttore Supply Chain', 'Supply-chain director',
        'Finance chiede che i benefici siano distinti dalla normale variabilità del piano.',
        'Finance asks that benefits be separated from normal planning variation.',
        'Gli scenari non modificano automaticamente ordini o allocazioni.', 'Scenarios do not automatically change orders or allocations.',
        'Fermare se il backtest non supera la baseline stagionale o gli override non sono registrati.',
        'Stop if backtesting does not beat the seasonal baseline or overrides are not logged.',
        '2026-09-30'
      ),
      recommendation: t(
        'Avviare un pilot di scenario planning con backtest e decision log.',
        'Run a scenario-planning pilot with backtesting and a decision log.'
      )
    },
    {
      id: 'genai-line-threshold-decisions',
      assessments: {
        'business-decision-value': assessment(
          2, 'medium',
          'La decisione richiesta è già espressa da una soglia approvata.',
          'The required decision is already expressed by an approved threshold.',
          'GenAI non aggiunge valore proporzionato alla variabilità introdotta.',
          'GenAI adds no value proportional to the variability it introduces.'
        ),
        'data-semantic-readiness': assessment(
          4, 'high',
          'Tag, unità e stato sono ben definiti.',
          'Tag, unit, and state are well defined.',
          'La buona readiness abilita una regola semplice, non obbliga a usare AI.',
          'Good readiness enables a simple rule; it does not require AI.'
        ),
        'label-and-ground-truth-readiness': assessment(
          1, 'low',
          'Non esiste un target linguistico utile da apprendere.',
          'There is no useful language target to learn.',
          'Il problema non richiede training predittivo o generativo.',
          'The problem requires neither predictive nor generative training.'
        ),
        'workflow-and-integration-readiness': assessment(
          2, 'medium',
          'Il PLC applica già la soglia con audit, mentre un LLM richiederebbe un nuovo servizio.',
          'The PLC already applies the threshold with audit, while an LLM would require a new service.',
          'L’integrazione aggiuntiva peggiora semplicità e affidabilità.',
          'Additional integration reduces simplicity and reliability.'
        ),
        'risk-oversight-and-adoption': assessment(
          2, 'high',
          'Un output variabile confonderebbe un limite deterministico.',
          'Variable output would obscure a deterministic limit.',
          'Il rischio è inutile rispetto alla regola esistente.',
          'The risk is unnecessary compared with the existing rule.'
        )
      },
      weightedScore: 46,
      hardGateChecks: [
        gateCheck(
          'defined-action-and-owner', true,
          'Operations possiede la risposta alla soglia.',
          'Operations owns the threshold response.',
          'L’azione è già definita senza GenAI.',
          'The action is already defined without GenAI.'
        ),
        gateCheck(
          'representative-trustworthy-data', true,
          'Il valore sensore ha status e limite approvato.',
          'The sensor value has status and an approved limit.',
          'I dati sono sufficienti per una regola.',
          'The data are sufficient for a rule.'
        ),
        gateCheck(
          'authorized-decision-boundary', false,
          'La proposta iniziale lasciava al testo generato un’istruzione ambigua.',
          'The initial proposal allowed generated text to issue an ambiguous instruction.',
          'Il confine non è accettabile per una decisione deterministica.',
          'The boundary is unacceptable for a deterministic decision.'
        )
      ],
      portfolioDecision: 'rejected',
      decisionRecord: decisionRecord(
        'rejected-use-rule', 'Responsabile Operations', 'Operations lead',
        'Il proponente GenAI contesta il rifiuto; l’owner richiede output deterministico.',
        'The GenAI proposer disputes rejection; the owner requires deterministic output.',
        'La soglia resta implementata come regola con isteresi e audit.', 'The threshold remains a rule with hysteresis and audit.',
        'Fermare ogni prototipo che possa emettere istruzioni operative variabili.',
        'Stop any prototype able to issue variable operating instructions.',
        '2027-01-15'
      ),
      recommendation: t(
        'Rifiutare GenAI e implementare la regola deterministica approvata con audit e fallback.',
        'Reject GenAI and implement the approved deterministic rule with audit and fallback.'
      )
    }
  ],
  recommendedCandidateId: 'vision-seal-review'
}

const unitOne = {
  id: 'decision-ladder-simplest-adequate-method',
  eyebrow: t('01 · Dalla decisione alla tecnica', '01 · From decision to method'),
  title: t(
    'Scala decisionale: regole, analytics, ML, ottimizzazione e GenAI',
    'Decision ladder: rules, analytics, ML, optimization, and GenAI'
  ),
  objective: t(
    'Scegliere il metodo più semplice che soddisfa la decisione, rifiutando complessità AI quando regole o analytics sono più verificabili.',
    'Choose the simplest method that satisfies the decision, rejecting AI complexity when rules or analytics are more verifiable.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 2, practice: 2 },
  theory: [
    t(
      `Un caso d’uso serio parte da una decisione, non dalla tecnologia disponibile. La formulazione minima contiene attore, oggetto, momento, alternative, evidenza e conseguenza. "Ridurre i fermi con AI" non identifica chi farà che cosa. "Il reliability engineer decide entro il briefing delle 14 se ispezionare il cuscinetto, prenotare una finestra entro 36 ore o continuare il monitoraggio, usando segnali con timestamp e uno storico di failure mode verificati" è invece valutabile. Da qui si definiscono baseline, frequenza, lead time utile, errore tollerabile e fallback. La domanda della tecnica arriva dopo. Una regola deterministica è adeguata quando la relazione è nota, stabile e approvata: temperatura oltre un limite con sensore valido, combinazione di stati impossibile, documento scaduto. Gli analytics descrittivi mostrano che cosa è accaduto; quelli diagnostici segmentano e confrontano per sostenere un’ipotesi causale. Un Pareto delle perdite per asset e reason code può creare più valore di un modello se il problema è mancanza di visibilità. Un modello predittivo serve quando variabili multiple anticipano probabilisticamente un evento e il lead time permette un’azione. L'ottimizzazione sceglie azioni sotto vincoli: quantità, sequenza, capacità, qualifica, costo. GenAI è adatta soprattutto a contenuto non strutturato, per esempio sintetizzare manuali controllati, e richiede verifica. La scala non rappresenta maturità crescente: ogni gradino risolve una classe diversa di problema.`,
      `A serious use case starts with a decision, not an available technology. A useful formulation names the actor, object, moment, alternatives, evidence, and consequence. "Reduce downtime with AI" does not say who will do what. "At the 14:00 briefing, the reliability engineer decides whether to inspect the bearing, reserve a maintenance window within 36 hours, or continue monitoring, using timestamped signals and verified failure-mode history" can be evaluated. That definition leads to the baseline, decision frequency, useful lead time, tolerated error, and fallback. Method selection comes afterwards. A deterministic rule fits when the relationship is known, stable, and approved: a temperature beyond a limit with a valid sensor, an impossible combination of states, or an expired document. Descriptive analytics shows what happened; diagnostic analytics segments and compares observations to support a causal hypothesis. A loss Pareto by asset and reason code may create more value than a model when visibility is the problem. Predictive ML is useful when several variables probabilistically anticipate an event and the lead time enables action. Optimization selects actions under constraints such as quantities, sequence, capacity, qualification, and cost. Generative AI is mainly suited to unstructured content, such as summarizing controlled manuals, and requires verification. The ladder is not a maturity hierarchy. Each rung solves a different problem class.`
    ),
    t(
      `La selezione richiede un test di sufficienza. Si costruisce prima una baseline trasparente: procedura attuale, regola, media mobile, Pareto o previsione stagionale semplice. Il candidato più complesso deve dimostrare un miglioramento sulla stessa finestra temporale e sugli stessi casi, non soltanto un punteggio tecnico isolato. Se una soglia approvata rileva già tutti gli stati pericolosi, un LLM che interpreta il valore aggiunge variabilità, latenza, costi di gestione e superficie di rischio senza informazione nuova. Rifiutare GenAI in questo caso è una decisione tecnica positiva. Analogamente, se lo scopo è distribuire scorte minimizzando shortage e costo sotto limiti di capacità, una formulazione di ottimizzazione è più diretta di un generatore di testo. Se la domanda è spiegare le principali cause registrate di microfermo, query, tassonomia e analisi statistica vengono prima del machine learning. Il principio di parsimonia non significa sempre scegliere il componente meno costoso. Significa minimizzare assunzioni e failure mode mentre si soddisfano requisiti di accuratezza, tempo, audit, sicurezza e adozione. Un metodo semplice può essere scalabile perché è osservabile, testabile e comprensibile. Un metodo complesso è giustificato quando cattura un segnale che la baseline non può rappresentare e il guadagno decisionale supera l'onere operativo. La review documenta alternative scartate, evidenza, incertezza e condizioni che riaprirebbero la scelta.`,
      `Selection needs a sufficiency test. First establish a transparent baseline such as the current procedure, a rule, moving average, Pareto, or simple seasonal forecast. A more complex candidate must prove improvement on the same time window and cases, not merely report an isolated technical score. If an approved threshold already detects every hazardous state, an LLM interpreting the value adds variability, latency, operating cost, and attack surface without adding information. Rejecting GenAI is a positive engineering decision in that situation. Similarly, if the objective is allocating inventory while minimizing shortages and cost under capacity limits, optimization is more direct than text generation. If the question is to explain recorded causes of minor stops, a query, taxonomy, and statistical analysis precede machine learning. Parsimony does not always mean buying the cheapest component. It means minimizing assumptions and failure modes while satisfying accuracy, timeliness, audit, safety, and adoption requirements. A simple method can scale because it is observable, testable, and understandable. A complex method earns its place when it captures a signal the baseline cannot represent and the decision benefit exceeds the operating burden. The review records rejected alternatives, evidence, uncertainty, and conditions that would reopen the choice.`
    ),
    t(
      `Il confronto deve includere il costo totale dell'errore e dell'esercizio. Per ogni metodo si descrivono input, output, owner, frequenza, latenza, disponibilità, versione, comportamento con dato stale e modalità degradata. Una dashboard che richiede reason code coerenti può fallire per semantica, non per algoritmo. Un classificatore può degradare quando cambia ricetta o camera. Un ottimizzatore può produrre un piano matematicamente valido ma operativo impossibile se manca un vincolo di qualifica. Un sistema generativo può formulare una risposta plausibile ma non supportata. Questi failure mode diventano test e guardrail. Si valuta poi il valore: tempo umano risparmiato, loss evitata, migliore servizio o rischio ridotto. Nell'esempio downtime, sette eventi da 42 minuti a 3.600 euro l'ora valgono 17.640 euro. Non è corretto promettere di recuperarli tutti. Se l'ipotesi è evitare il 40 per cento, il beneficio lordo è 7.056 euro. Da questo si sottraggono ispezioni aggiuntive, fermate preventive, infrastruttura e supporto. Anche la baseline deve essere prospettica: confrontare il pilot con mesi particolarmente negativi gonfia il risultato. NIST AI RMF propone di governare, mappare, misurare e gestire rischi nel contesto. Qui significa collegare la metrica del modello alla decisione, ai soggetti coinvolti e alle conseguenze, senza usare il framework come semplice checklist.`,
      `Comparison must include the total cost of error and operation. For each method, describe inputs, output, owner, frequency, latency, availability, version, stale-data behavior, and degraded mode. A dashboard requiring consistent reason codes may fail because of semantics rather than algorithms. A classifier may degrade when recipe or camera changes. An optimizer can produce a mathematically valid but impossible schedule if a qualification constraint is missing. A generative system may produce a plausible but unsupported answer. Those failure modes become tests and guardrails. Value is then measured as labor saved, loss avoided, service improved, or risk reduced. In the downtime example, seven events lasting 42 minutes at EUR 3,600 per hour cost EUR 17,640. It is not credible to promise recovery of all that amount. If the hypothesis is to avoid 40 percent, gross benefit is EUR 7,056. Additional inspections, preventive stops, infrastructure, and support must be subtracted. The baseline must also be prospective. Comparing a pilot against unusually poor months inflates results. NIST AI RMF organizes work around governing, mapping, measuring, and managing risk in context. Here that means connecting model metrics with the decision, affected people, and consequences instead of treating the framework as a checklist.`
    ),
    t(
      `Una decision record efficace è breve ma contestabile. Riporta il problema, l'azione, il metodo minimo, alternative, dati richiesti, baseline, KPI, guardrail, owner, confidenza e prossimo gate. Per il limite di temperatura sceglie una regola nel controllo locale, non GenAI. Per il report perdite sceglie analytics descrittivi e corregge prima la tassonomia. Per il rischio cuscinetto rinvia il modello finché work order e segnali non sostengono label affidabili. Per la sintesi di manuali può proporre un pilot RAG o generativo, ma soltanto con corpus autorizzato, citazioni, controllo accessi e verifica umana. Questo modo di ragionare cambia anche il colloquio: anziché elencare tecnologie, il candidato mostra disciplina di selezione. Dichiara che un no motivato protegge tempo e fiducia organizzativa. Specifica inoltre un exit criterion. Se una regola produce troppi falsi allarmi perché la relazione è veramente multivariata, si raccoglie un set rappresentativo e si rivaluta ML. Se il testo libero impedisce un flusso ripetibile, si valuta GenAI solo sulla porzione linguistica, lasciando autorizzazione e transazione a componenti deterministici. L'architettura finale può quindi combinare gradini, ma ogni componente conserva uno scopo limitato e una responsabilità verificabile.`,
      `An effective decision record is concise but challengeable. It records the problem, action, minimum method, alternatives, required data, baseline, KPI, guardrails, owner, confidence, and next gate. A temperature limit uses a rule in local control, not GenAI. A loss report uses descriptive analytics and first repairs the taxonomy. A bearing-risk model is deferred until work orders and signals support trustworthy labels. Manual summarization may justify a retrieval or generative pilot, but only with an authorized corpus, citations, access control, and human verification. This reasoning also improves interview answers. Instead of listing technologies, the candidate demonstrates selection discipline. A justified no protects organizational time and trust. The record also sets an exit criterion. If a rule produces excessive false alarms because the relationship is genuinely multivariate, collect a representative set and reconsider ML. If free text prevents repeatable processing, evaluate GenAI only for the language portion while deterministic components retain authorization and transaction handling. The final architecture may combine several rungs, but each component keeps a limited purpose and verifiable responsibility.`
    )
  ],
  terminology: [
    t('Baseline: riferimento semplice e riproducibile contro cui valutare il candidato.', 'Baseline: a simple reproducible reference against which to evaluate a candidate.'),
    t('Sufficiency test: prova che il metodo soddisfa requisiti senza complessità non necessaria.', 'Sufficiency test: evidence that the method meets requirements without unnecessary complexity.'),
    t('Decision record: traccia contestabile di scelta, evidenza, rischio e gate.', 'Decision record: a challengeable record of choice, evidence, risk, and gate.')
  ],
  microExamples: [microExample(
    'Soglia di temperatura senza GenAI',
    'Temperature threshold without GenAI',
    'Un limite approvato, un sensore valido e una risposta nota richiedono una regola deterministica con isteresi e audit, non un’interpretazione linguistica variabile.',
    'An approved limit, valid sensor, and known response call for a deterministic rule with hysteresis and audit, not variable language interpretation.'
  )],
  caseSegments: [caseSegment(
    'temperature-method-choice', 1,
    'Decisione rapida: limite temperatura', 'Quick decision: temperature limit',
    'Dato un limite approvato e uno stato sensore valido, chi studia confronta regola e GenAI e osserva perché la regola è sufficiente.',
    'Given an approved limit and valid sensor state, the learner compares a rule with GenAI and observes why the rule is sufficient.'
  )],
  activities: [
    {
      id: 'choose-minimum-method-record',
      prompt: t(
        'Per il limite temperatura già descritto, scegli regola o GenAI e scrivi una ragione.',
        'For the supplied temperature-limit case, choose a rule or GenAI and write one reason.'
      ),
      expectedArtifact: t('Una scelta con una ragione.', 'One choice with one reason.'),
      durationMinutes: 2,
      quickTask: quickTask(1, 0, 'Limite, stato sensore e risposta sono già approvati.', 'Limit, sensor state, and response are already approved.', 'Metodo scelto più una frase.', 'Chosen method plus one sentence.'),
      hints: [t('Parti dalla forma dell’output e dalla conseguenza.', 'Start from output form and consequence.')],
      modelSolution: t(
        'Scelgo una regola deterministica: limite e risposta sono approvati, quindi GenAI aggiungerebbe variabilità senza informazione.',
        'I choose a deterministic rule: the limit and response are approved, so GenAI would add variability without information.'
      ),
      rubric: [
        t('Sceglie la regola e collega la ragione al limite approvato.', 'Chooses the rule and ties the reason to the approved limit.')
      ]
    }
  ],
  checkpoint: checkpoint(
    'Un team propone un LLM per decidere se un valore oltre un limite approvato debba generare allarme. Qual è la scelta migliore?',
    'A team proposes an LLM to decide whether a value beyond an approved limit should raise an alarm. What is the best choice?',
    [
      ['Usare il LLM perché comprende il contesto.', 'Use the LLM because it understands context.', 'La variabilità linguistica non aggiunge informazione a una soglia definita.', 'Language variability adds no information to a defined threshold.'],
      ['Applicare una regola deterministica con stato sensore, isteresi, audit e fallback.', 'Apply a deterministic rule with sensor state, hysteresis, audit, and fallback.', 'È il metodo minimo verificabile che soddisfa la decisione.', 'It is the minimum verifiable method satisfying the decision.'],
      ['Addestrare un modello predittivo senza baseline.', 'Train a predictive model without a baseline.', 'Manca una ragione per apprendere una relazione già specificata.', 'There is no reason to learn a relationship that is already specified.']
    ],
    1
  ),
  sourceIds: ['nist-ai-rmf-1-0', 'nist-ai-600-1', 'nist-manufacturing-kpi-procedure']
}

const unitTwo = {
  id: 'data-meaning-quality-lineage-labels',
  eyebrow: t('02 · Fiducia prima del volume', '02 · Trust before volume'),
  title: t(
    'Significato del dato: qualità, contesto, lineage, ownership e label',
    'Data meaning: quality, context, lineage, ownership, and labels'
  ),
  objective: t(
    'Valutare se un dataset rappresenta il fenomeno e la decisione dichiarati, assegnando significato, provenienza, owner e ground truth.',
    'Assess whether a dataset represents the stated phenomenon and decision by assigning meaning, provenance, ownership, and ground truth.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 2, practice: 2 },
  theory: [
    t(
      `Un dato industriale non è un numero isolato ma un’affermazione sul processo. "72" diventa utilizzabile soltanto se conosciamo grandezza, unità, asset, posizione, timestamp di sorgente, stato qualità, modalità operativa e trasformazioni. Per una vibrazione occorrono almeno asse, punto di montaggio, banda, sampling, filtro, sensore e condizione di velocità o carico. Per un contatore servono regola di incremento, reset, rollover e relazione con ordine e SKU. Le dimensioni classiche di qualità sono accuratezza, completezza, tempestività, coerenza, validità e unicità, ma vanno tradotte in test decisionali. Il 99,9 per cento di completezza mensile può nascondere proprio i 12 minuti prima di ogni guasto. Un valore tempestivo per un report settimanale può essere troppo vecchio per una review in linea. Due fonti coerenti possono condividere lo stesso errore di configurazione. Si definiscono quindi soglia, finestra, popolazione, severità ed owner di ogni regola. Il profilo misura, per esempio, percentuale di sample con status buono durante produzione, ritardo p95 tra source time e ingest time, quota di work order con failure mode verificato e tasso di immagini collegabili al prodotto. Un test deve distinguere missing at random da assenza sistematica durante cambi formato, rete degradata o interventi, perché la seconda altera la popolazione e può creare una falsa performance.`,
      `Industrial data is not an isolated number but a claim about the process. "72" becomes useful only with the quantity, unit, asset, location, source timestamp, quality state, operating mode, and transformations. Vibration data needs an axis, mounting point, band, sampling rate, filter, sensor, and speed or load condition. A counter needs increment, reset, rollover, and relationships with order and SKU. Familiar quality dimensions include accuracy, completeness, timeliness, consistency, validity, and uniqueness, but each must become a decision test. Monthly completeness of 99.9 percent may hide the twelve minutes before every failure. Data timely enough for a weekly report may be stale for in-line review. Two consistent sources may share the same configuration error. Define the threshold, window, population, severity, and owner for every rule. A profile might measure the share of good-status samples during production, p95 delay from source time to ingestion, share of work orders with verified failure mode, and rate of images linked to a product. Tests must distinguish randomly missing observations from systematic absence during format changes, network degradation, or interventions because systematic gaps alter the population and can create false performance.`
    ),
    t(
      `Il contesto unisce domini. La misura sensore appartiene a un asset; l'asset esegue una fase; la fase produce o trasforma un materiale; ordine, ricetta, turno e condizioni ambientali spiegano lo stato. ISA-95 offre categorie per collegare business e manufacturing operations, ma il mapping locale deve essere esplicito. Si assegna un identificatore stabile a asset, materiale, ordine e lotto e si registra validità temporale delle relazioni. Se un motore viene sostituito, non basta conservare lo stesso nome tag: occorre sapere quale physical instance ha prodotto i segnali prima e dopo. Se una ricetta cambia alle 10:03 ma il sistema analytics la riceve alle 10:12, event time e processing time non sono equivalenti. Lineage descrive origine, trasformazioni, join, filtri, versioni e destinazioni. Permette di ricostruire perché una feature aveva un certo valore e quale dashboard o modello è impattato da una correzione. Non è un’immagine decorativa del flusso. Un record di lineage utile contiene source system, schema e versione, chiave, timestamp, logica di trasformazione, release software, quality check e retention. Per le feature aggregate specifica finestra e trattamento dei missing. Senza questi elementi un team può effettuare data leakage, usando nella previsione informazioni registrate dopo la decisione, oppure confrontare serie con timestamp e timezone incompatibili.`,
      `Context joins domains. A sensor measurement belongs to an asset; the asset performs a step; the step produces or transforms material; and order, recipe, shift, and environment explain the state. ISA-95 provides categories linking business and manufacturing operations, but local mappings must be explicit. Give stable identifiers to assets, materials, orders, and lots, and record the temporal validity of relationships. If a motor is replaced, retaining the same tag name is not enough. Analysts need to know which physical instance produced signals before and after replacement. If a recipe changes at 10:03 but analytics receives it at 10:12, event time and processing time differ. Lineage describes origin, transformations, joins, filters, versions, and destinations. It allows a team to reconstruct why a feature had a value and which dashboards or models are affected by correction. It is not a decorative flow picture. A useful lineage record names source system, schema and version, key, timestamp, transformation logic, software release, quality check, and retention. Aggregated features also specify window and missing-value treatment. Without that detail, a team may leak future information into a forecast or compare series with incompatible timestamps and time zones.`
    ),
    t(
      `Ownership rende il dato governabile. Il system owner mantiene piattaforma e servizio; il data owner è accountable per definizione, accesso e uso; lo steward cura regole, issue e metadati; il producer risolve difetti alla fonte; il consumer dichiara requisiti e conseguenze. I nomi possono variare, ma non deve esistere una metrica critica senza una persona che possa decidere. Un owner non certifica ogni valore manualmente: approva semantic contract, soglie qualità, priorità e remediation. Il contratto specifica significato, unità, enum, cardinalità, freshness, status, chiavi, compatibilità e modalità di cambio. Se un reason code "other" cresce dal 4 al 38 per cento, il controllo tecnico può essere verde mentre l'utilità diagnostica crolla. L'issue deve arrivare a Operations, che conosce il processo di codifica, non restare soltanto al data engineer. L'accesso segue scopo e minimizzazione. Dati personali, segreti, record qualità e dati operativi hanno classificazioni e retention differenti. Copiare tutto in un data lake non crea ownership. Per un caso d’uso si redige invece un data product contract limitato: quali fonti sono autorevoli, quale popolazione è ammessa, quale latency si garantisce, chi approva una nuova feature e come si comunica breaking change. Questa disciplina consente riuso senza perdere accountability e rende esplicite le dipendenze prima che un pilot diventi servizio.`,
      `Ownership makes data governable. A system owner maintains platform and service; a data owner is accountable for definition, access, and use; a steward manages rules, issues, and metadata; a producer repairs defects at source; and a consumer states requirements and consequences. Names may vary, but no critical metric should exist without someone able to decide. An owner does not manually certify every value. They approve the semantic contract, quality thresholds, priorities, and remediation. The contract defines meaning, unit, enum, cardinality, freshness, status, keys, compatibility, and change process. If the reason code "other" rises from 4 to 38 percent, technical checks may remain green while diagnostic usefulness collapses. The issue belongs with Operations, which understands the coding process, not only with a data engineer. Access follows purpose and minimization. Personal data, secrets, quality records, and operating data have different classifications and retention. Copying everything into a lake does not create ownership. Instead, each use case gets a bounded data-product contract: authoritative sources, permitted population, latency commitment, feature approval, and breaking-change communication. This discipline enables reuse without losing accountability and exposes dependencies before a pilot becomes a service.`
    ),
    t(
      `Le label meritano una verifica separata perché non sono verità naturali. Un work order chiuso come "bearing" può riflettere il sintomo, il componente sostituito, la causa confermata o una scelta amministrativa. Un'immagine "difetto" può dipendere da standard, illuminazione e giudizio dell'ispettore. Prima del training si scrive una label policy: unità di osservazione, classi, finestra temporale, evidenza richiesta, trattamento dei casi incerti, competenza del valutatore e processo di adjudication. Si misura accordo tra valutatori e si conserva il disaccordo invece di cancellarlo. La label deve essere disponibile al tempo giusto: se si definisce "guasto entro sette giorni", interventi preventivi possono censurare l'esito, perché il componente non ha avuto possibilità di guastarsi. Anche i negativi richiedono evidenza. Un asset senza work order non è automaticamente sano se il sistema era offline o il guasto è registrato altrove. Il sampling deve rappresentare plant, asset, prodotto, modalità, stagione e rare events rilevanti. Split casuali possono mettere cicli quasi identici in train e test; uno split temporale o per asset simula meglio il deployment. NIST AI RMF richiede misure adatte al contesto e documentazione dei limiti. Per promettere predictive maintenance, quindi, non basta "abbiamo anni di dati": servono storia collegabile, label coerenti, failure mode azionabile e una baseline prospettica.`,
      `Labels need separate scrutiny because they are not natural truth. A work order closed as "bearing" may describe the symptom, replaced component, confirmed cause, or an administrative choice. An image labeled "defect" may depend on a standard, lighting, and inspector judgment. Before training, write a label policy covering observation unit, classes, time window, required evidence, uncertain cases, assessor competence, and adjudication. Measure agreement and retain disagreement rather than erasing it. The label must also be temporally correct. If the target is "failure within seven days," preventive intervention may censor the outcome because the component no longer had an opportunity to fail. Negative cases need evidence too. An asset without a work order is not necessarily healthy when systems were offline or events were recorded elsewhere. Sampling should represent plants, assets, products, modes, seasons, and relevant rare events. Random splits can place nearly identical cycles in training and test; time-based or asset-based splits better simulate deployment. NIST AI RMF calls for context-appropriate measures and documented limitations. Before promising predictive maintenance, "years of data" is insufficient. The team needs linkable history, coherent labels, an actionable failure mode, and a prospective baseline.`
    )
  ],
  terminology: [
    t('Semantic contract: definizione verificabile di significato, schema, qualità e cambio.', 'Semantic contract: a verifiable definition of meaning, schema, quality, and change.'),
    t('Lineage: provenienza e trasformazioni che permettono riproduzione e impact analysis.', 'Lineage: provenance and transformations enabling reproduction and impact analysis.'),
    t('Ground truth: riferimento verificato usato per giudicare una previsione o classificazione.', 'Ground truth: verified reference used to judge a prediction or classification.')
  ],
  microExamples: [microExample(
    'Tag invariato, motore sostituito',
    'Unchanged tag, replaced motor',
    'La serie conserva il nome M201_VIB ma cambia physical asset dopo una sostituzione: senza validità temporale il modello tratta due popolazioni come una sola.',
    'The series retains tag M201_VIB while the physical asset changes after replacement. Without temporal validity, the model treats two populations as one.'
  )],
  caseSegments: [caseSegment(
    'asset-identity-contract-gap', 1,
    'Gap di contratto dopo la sostituzione', 'Contract gap after replacement',
    'Una riga con tag invariato e motore sostituito mostra che manca la physical instance con validità temporale.',
    'A row with an unchanged tag and replaced motor shows that physical instance with temporal validity is missing.'
  )],
  activities: [
    {
      id: 'write-data-contract-row',
      prompt: t(
        'Nella riga fornita manca un campo: tag M201_VIB, mm/s, timestamp UTC, status good. Indica il campo mancante più critico.',
        'One field is missing from the supplied row: tag M201_VIB, mm/s, UTC timestamp, good status. Name the most critical missing field.'
      ),
      expectedArtifact: t('Un campo con una ragione.', 'One field with one reason.'),
      durationMinutes: 2,
      quickTask: quickTask(1, 0, 'Il motore è stato sostituito ma il tag logico è rimasto invariato.', 'The motor was replaced while the logical tag stayed unchanged.', 'Campo mancante più una frase.', 'Missing field plus one sentence.'),
      hints: [t('Distingui tag logico e physical instance.', 'Distinguish logical tag from physical instance.')],
      modelSolution: t(
        'Manca physical-bearing-id con validità temporale: il tag invariato altrimenti unisce il vecchio e il nuovo componente.',
        'Physical-bearing-id with temporal validity is missing; otherwise the unchanged tag merges the old and new components.'
      ),
      rubric: [
        t('Identifica physical identity con validità temporale come campo mancante.', 'Identifies physical identity with temporal validity as the missing field.')
      ]
    }
  ],
  checkpoint: checkpoint(
    'Un dataset ha completezza mensile del 99,9 per cento ma perde sempre i minuti prima di un guasto. Come va giudicato?',
    'A dataset has 99.9 percent monthly completeness but always loses the minutes before a failure. How should it be judged?',
    [
      ['Pronto, perché supera 99 per cento.', 'Ready because it exceeds 99 percent.', 'La media nasconde un’assenza sistematica nella finestra decisionale.', 'The average hides systematic absence in the decision window.'],
      ['Non pronto per il caso d’uso finché la mancanza sistematica non è compresa e corretta.', 'Not ready for the use case until the systematic gap is understood and corrected.', 'La qualità deve essere misurata sulla popolazione e finestra rilevanti.', 'Quality must be measured on the relevant population and window.'],
      ['Pronto se si imputano valori medi.', 'Ready if averages are imputed.', 'L’imputazione non ricrea il segnale che precede il guasto.', 'Imputation does not recreate the pre-failure signal.']
    ],
    1
  ),
  sourceIds: ['isa-95', 'nist-ai-rmf-1-0', 'opc-ua-part-1']
}

const unitThree = {
  id: 'metrics-errors-drift-operational-kpis',
  eyebrow: t('03 · Misurare la decisione', '03 · Measure the decision'),
  title: t(
    'Metriche: precision, recall, costi di errore, drift e KPI operativi',
    'Metrics: precision, recall, error costs, drift, and operational KPIs'
  ),
  objective: t(
    'Calcolare metriche di classificazione e tradurle in costi, capacità operativa, drift e KPI di processo.',
    'Calculate classification metrics and translate them into cost, operating capacity, drift, and process KPIs.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 2, practice: 2 },
  theory: [
    t(
      `Una confusion matrix incrocia previsione e ground truth. Il true positive è un difetto segnalato e confermato; il false positive è un prodotto conforme inviato a review; il false negative è un difetto non segnalato; il true negative è un conforme non segnalato. Le etichette positive devono essere definite dalla decisione, non dalla comodità matematica. Su 1.000 unità, ipotizziamo TP 72, FP 18, FN 8 e TN 902. Il totale si riconcilia: 72+18+8+902=1.000. Precision risponde "quando il sistema segnala, quanto spesso ha ragione?": TP/(TP+FP)=72/90=80 per cento. Recall risponde "tra i difetti reali, quanti trova?": TP/(TP+FN)=72/80=90 per cento. Specificity è TN/(TN+FP)=902/920, circa 98,04 per cento. Accuracy è 974/1.000=97,4 per cento, ma può ingannare con classi rare: classificare tutto conforme darebbe 92 per cento di accuracy e zero recall. NIST SP 500-341 definisce precision e recall come dimensioni separate e osserva che un singolo F1 può nascondere profili differenti. In operations servono entrambe, insieme a prevalenza, intervalli d'incertezza, segmenti e costo. Il denominatore e la finestra devono essere visibili in dashboard, altrimenti percentuali identiche possono descrivere volumi e rischi molto diversi.`,
      `A confusion matrix crosses prediction and ground truth. A true positive is a referred and confirmed defect; a false positive is conforming product sent to review; a false negative is a missed defect; and a true negative is conforming product not referred. The positive class must follow the decision rather than mathematical convenience. Across 1,000 units, suppose TP is 72, FP is 18, FN is 8, and TN is 902. The total reconciles: 72+18+8+902=1,000. Precision asks, "When the system refers, how often is it right?": TP/(TP+FP)=72/90=80 percent. Recall asks, "Of actual defects, how many are found?": TP/(TP+FN)=72/80=90 percent. Specificity is TN/(TN+FP)=902/920, about 98.04 percent. Accuracy is 974/1,000=97.4 percent, but it can mislead for rare classes. Classifying everything as conforming would achieve 92 percent accuracy and zero recall. NIST SP 500-341 treats precision and recall as separate dimensions and notes that a single F1 score can hide different profiles. Operations needs both, together with prevalence, uncertainty intervals, segments, and cost. Dashboards must expose denominators and windows because equal percentages can represent very different volumes and risks.`
    ),
    t(
      `La soglia converte uno score continuo in una coda di azioni. Abbassarla tende ad aumentare recall e referral, ma anche falsi positivi; alzarla tende a ridurre la coda e aumentare miss. Non esiste una soglia ottima indipendente dal contesto. Nel caso numerico, ogni false positive costa 55 euro tra fermo, review e handling; ogni false negative costa 1.800 euro tra contenimento, rilavorazione e rischio cliente, senza fingere di monetizzare ogni conseguenza. Con soglia 0,62 abbiamo 18 FP e 8 FN: 18×55 + 8×1.800 = 15.390 euro. Con soglia 0,44 abbiamo 43 FP e 3 FN: 43×55 + 3×1.800 = 7.765 euro. La seconda riduce il costo atteso di 7.625 euro nella popolazione osservata. Tuttavia richiede una verifica di capacità sui referral totali, non soltanto sui false positive. In 2,5 ore, 77 TP e 43 FP formano 120 referral, cioè 48 all'ora; il desk ne può valutare 60. Il margine nominale è 12, ma con assenze, picchi o tempo medio crescente potrebbe scomparire. Si definiscono limite di work in progress, priorità, ageing, escalation e fallback. Inoltre i costi sono distribuzioni, non costanti universali. Si esegue sensitivity analysis: se il costo FN scende o quello FP sale, la scelta può cambiare. La soglia è quindi una policy approvata, versionata e riesaminata, non un dettaglio del data scientist.`,
      `A threshold turns a continuous score into a queue of actions. Lowering it generally increases recall and referrals but also false positives; raising it generally reduces workload and increases misses. No threshold is optimal outside context. In the numerical case, each false positive costs EUR 55 through stopping, review, and handling; each false negative costs EUR 1,800 through containment, rework, and customer risk, without pretending every consequence can be monetized. At threshold 0.62, there are 18 FP and 8 FN: 18×55 + 8×1,800 = EUR 15,390. At threshold 0.44, there are 43 FP and 3 FN: 43×55 + 3×1,800 = EUR 7,765. The second reduces expected cost by EUR 7,625 for the observed population. Capacity must use total referrals, not false positives alone. Across 2.5 hours, 77 TP and 43 FP create 120 referrals, or 48 per hour; the desk can evaluate 60. Nominal margin is 12, but absence, peaks, or increasing review time can remove it. Define work-in-progress limits, priority, ageing, escalation, and fallback. Costs are distributions rather than universal constants, so perform sensitivity analysis. If FN cost falls or FP cost rises, selection may change. The threshold is an approved, versioned, reviewed policy rather than a data scientist's private setting.`
    ),
    t(
      `La validazione deve separare performance statistica, performance operativa e impatto. La prima include precision, recall, calibration, errori per segmento e intervalli. Calibration chiede se eventi con score 0,7 si verificano circa nel 70 per cento dei casi comparabili; è importante quando lo score guida priorità. La seconda misura availability del servizio, freshness degli input, latency, referral per ora, tempo di review, override, fallback e alert acknowledgement. La terza osserva defect escape, scrap, downtime, lead time, stabilità del piano e costo totale. Una metrica di modello può migliorare mentre il KPI peggiora se l'azione arriva tardi o la coda satura. Per predictive maintenance si misura anche lead time utile: un alert corretto cinque minuti prima non aiuta se il planner necessita 24 ore. Il disegno dell'esperimento confronta una baseline e protegge da leakage e seasonality. Shadow mode registra raccomandazioni senza cambiare processo; poi un pilot controllato assegna decision rights e raccoglie esiti. I numeri devono essere segmentati per asset, SKU, turno, plant, operating mode e condizioni rilevanti, con numerosità visibile. Aggregare può nascondere un gruppo che fallisce. Una review stabilisce minimum acceptable performance, stop threshold e target, distinguendo una soglia di sicurezza da un obiettivo di miglioramento. Nessuna percentuale sostituisce il giudizio sulla conseguenza.`,
      `Validation separates statistical performance, operating performance, and impact. Statistical performance covers precision, recall, calibration, segment errors, and uncertainty. Calibration asks whether events scored at 0.7 occur in about 70 percent of comparable cases. That matters when scores set priorities. Operating measures cover service availability, input freshness, latency, hourly referrals, review time, overrides, fallback, and alert acknowledgement. Impact measures defect escape, scrap, downtime, lead time, schedule stability, and total cost. Model metrics can improve while operational KPIs worsen if actions arrive late or queues saturate. Predictive maintenance also needs useful lead time. A correct alert five minutes before failure does not help when planning needs 24 hours. Experiment design compares a baseline and protects against leakage and seasonality. Shadow mode records recommendations without changing the process; a controlled pilot then assigns decision rights and captures outcomes. Segment results by asset, SKU, shift, plant, operating mode, and relevant conditions, with sample size visible. Aggregation can hide a failing subgroup. Review defines minimum acceptable performance, a stop threshold, and a target, distinguishing a safety boundary from an improvement objective. No percentage replaces judgment about consequence.`
    ),
    t(
      `Drift è una famiglia di cambiamenti. Data drift indica variazione nella distribuzione input, per esempio una nuova gamma di velocità. Concept drift indica che la relazione tra input ed esito cambia, forse dopo redesign o diversa manutenzione. Label drift cambia prevalenza; schema drift rompe tipo, unità o enum; operational drift cambia il modo in cui le persone rispondono. Non ogni differenza richiede retraining. Prima si verifica sensore, mapping, popolazione e processo. Un monitor collega segnale a diagnosi e risposta: percentuale di feature fuori range, distanza di distribuzione, calibration error, precision su label ritardate, tasso di override, coda e KPI. Stabilisce finestre, baseline, stagionalità e minimum sample. Se cambia una camera, può sospendere il modello per quella configurazione e tornare a review manuale. Se le label arrivano dopo 30 giorni, i leading indicator tecnici non provano ancora concept drift. Si documentano model version, data version, soglia e decision log per ricostruire l'esposizione. NIST AI RMF richiama monitoraggio e gestione continua del rischio; in pratica significa owner, alert severity, runbook, rollback e criteri di retirement. Un modello non deve restare attivo perché "non è crashato". Deve dimostrare che input, output, workflow e risultato restano entro i limiti approvati e che il fallback è periodicamente provato.`,
      `Drift is a family of changes. Data drift is a shift in input distributions, such as a new speed range. Concept drift means the relationship between input and outcome changes, perhaps after redesign or a different maintenance policy. Label drift changes prevalence; schema drift breaks a type, unit, or enum; operational drift changes how people respond. Not every difference calls for retraining. First check sensors, mappings, population, and process. A monitor links signal to diagnosis and response: share of features outside range, distribution distance, calibration error, precision on delayed labels, override rate, queue size, and KPI. It defines windows, baseline, seasonality, and minimum sample. If a camera changes, suspend the model for that configuration and return to manual review. If labels arrive after 30 days, technical leading indicators do not yet prove concept drift. Record model version, data version, threshold, and decision log to reconstruct exposure. NIST AI RMF calls for continuous risk monitoring and management. In practice that means owners, alert severity, runbooks, rollback, and retirement criteria. A model should not remain active merely because it has not crashed. Inputs, outputs, workflow, and results must remain within approved limits, and fallback must be exercised periodically.`
    )
  ],
  terminology: [
    t('Precision: quota delle segnalazioni positive che è realmente positiva.', 'Precision: the share of positive referrals that is truly positive.'),
    t('Recall: quota dei positivi reali trovata dal sistema.', 'Recall: the share of actual positives found by the system.'),
    t('Calibration: corrispondenza tra probabilità dichiarata e frequenza osservata.', 'Calibration: agreement between stated probability and observed frequency.')
  ],
  microExamples: [microExample(
    'Accuracy alta, recall nullo',
    'High accuracy, zero recall',
    'Con 80 difetti su 1.000, classificare tutto conforme produce 92 per cento di accuracy ma perde tutti gli 80 difetti.',
    'With 80 defects in 1,000 units, classifying everything as conforming produces 92 percent accuracy but misses all 80 defects.'
  )],
  caseSegments: [caseSegment(
    'referral-rate-capacity-check', 1,
    'Rate di referral e capacità', 'Referral rate and capacity',
    'Il caso fornisce 120 referral in 2,5 ore e chiede di confrontare il rate risultante con 60 review ogni ora.',
    'The case provides 120 referrals in 2.5 hours and asks learners to compare the resulting rate with 60 reviews per hour.'
  )],
  activities: [
    {
      id: 'threshold-cost-capacity-analysis',
      prompt: t(
        'Con 120 referral in 2,5 ore, calcola i referral ogni ora e confrontali con capacità 60.',
        'Given 120 referrals in 2.5 hours, calculate referrals per hour and compare them with capacity of 60.'
      ),
      expectedArtifact: t('Un calcolo e un esito di capacità.', 'One calculation and one capacity result.'),
      durationMinutes: 2,
      quickTask: quickTask(0, 1, 'Referral totali 120, finestra 2,5 ore, capacità 60 ogni ora.', '120 total referrals, 2.5-hour window, capacity 60 per hour.', 'Formula, risultato e sopra/sotto capacità.', 'Formula, result, and above/below capacity.'),
      hints: [
        t(
          'Non confrontare soltanto F1: applica i costi a FP e FN e confronta referral con capacità.',
          'Do not compare F1 alone. Apply costs to FP and FN and compare referrals with capacity.'
        )
      ],
      modelSolution: t(
        '120 ÷ 2,5 = 48 referral ogni ora. Il carico è sotto la capacità di 60 di 12 review ogni ora.',
        '120 ÷ 2.5 = 48 referrals per hour. Workload is 12 reviews per hour below the capacity of 60.'
      ),
      rubric: [
        t('Calcola 48 referral ogni ora e li confronta correttamente con 60.', 'Calculates 48 referrals per hour and correctly compares them with 60.')
      ],
      solutionArtifact: {
        matrixId: 'seal-inspection-1000',
        recommendedThresholdId: 'recall-first-0-44',
        expectedReferralsPerHour: 48,
        reviewCapacityPerHour: 60,
        stopQueueDepth: 50
      }
    }
  ],
  checkpoint: checkpoint(
    'Quale affermazione interpreta correttamente precision 80 per cento e recall 90 per cento?',
    'Which statement correctly interprets 80 percent precision and 90 percent recall?',
    [
      ['Il 90 per cento dei referral è corretto.', 'Ninety percent of referrals are correct.', 'Questo confonde recall con precision.', 'This confuses recall with precision.'],
      ['L’80 per cento dei referral è confermato e il sistema trova il 90 per cento dei difetti reali.', 'Eighty percent of referrals are confirmed and the system finds 90 percent of actual defects.', 'Usa correttamente i due denominatori.', 'This uses both denominators correctly.'],
      ['Il sistema ha accuracy 170 per cento.', 'The system has 170 percent accuracy.', 'Le metriche non si sommano.', 'The metrics are not additive.']
    ],
    1
  ),
  sourceIds: ['nist-sp-500-341', 'nist-ai-rmf-1-0', 'nist-manufacturing-kpi-hierarchy']
}

const unitFour = {
  id: 'predictive-maintenance-decision-case',
  eyebrow: t('04 · Dal failure mode alla finestra', '04 · From failure mode to window'),
  title: t(
    'Caso predictive maintenance: dal failure mode alla decisione',
    'Predictive-maintenance case: from failure mode to decision'
  ),
  objective: t(
    'Definire un caso PdM soltanto quando failure mode, dati, label, lead time, azione e gate di deployment sono verificabili.',
    'Define a PdM case only when failure mode, data, labels, lead time, action, and deployment gates are verifiable.'
  ),
  estimatedMinutes: 10,
  timeAllocation: { theory: 4, cases: 4, practice: 2 },
  theory: [
    t(
      `Predictive maintenance non significa prevedere genericamente che una macchina "avrà un problema". Il punto di partenza è una failure mode specifica e azionabile. Per un cuscinetto di un modulo di confezionamento, la failure mode può essere danneggiamento della pista interna, con sintomi osservabili in bande di vibrazione e temperatura e una progressione compatibile con il carico. L'analisi FMEA chiarisce causa, meccanismo, effetto locale, effetto sulla linea, metodo attuale di rilevazione e controllo esistente. Reliability e manutenzione definiscono che cosa farebbero con 36 ore di lead time: ispezione, verifica lubrificazione, ricambio, finestra o prosecuzione monitorata. Se nessuna azione è disponibile, una previsione accurata non genera valore. Anche il tempo deve essere definito come distribuzione. Remaining useful life suggerisce una stima continua, ma molte organizzazioni necessitano soltanto di una classe decisionale: rischio entro 36 ore, entro sette giorni o oltre. La classe deve rispettare tempo per conferma, disponibilità ricambio e finestra produttiva. NIST ha proposto di confrontare algoritmi condition-monitoring insieme alla maintenance policy e ai KPI di sistema, non soltanto per accuracy. Questo evita il falso confronto tra due modelli che producono lo stesso alert ma entrano in workflow diversi. Il sistema di protezione e gli interlock restano indipendenti: PdM è decision support, non un safety trip.`,
      `Predictive maintenance does not mean vaguely predicting that a machine "will have a problem." Start from a specific actionable failure mode. For a packaging-module bearing, the failure mode might be inner-race damage, with observable vibration-band and temperature symptoms progressing under load. An FMEA clarifies cause, mechanism, local effect, line effect, current detection, and existing control. Reliability and maintenance define what they would do with 36 hours of lead time: inspect, verify lubrication, prepare a spare, reserve a window, or continue monitoring. If no action is available, an accurate prediction creates no value. Time must also be defined as a distribution. Remaining useful life suggests a continuous estimate, but many organizations need only a decision class: risk within 36 hours, within seven days, or later. Classes must respect confirmation time, spare availability, and the production window. NIST work on condition-monitoring-enabled maintenance compares algorithms together with the maintenance policy and system KPI rather than accuracy alone. This avoids a false comparison between models producing the same alert but entering different workflows. Protection and interlocks remain independent. PdM is decision support, not a safety trip.`
    ),
    t(
      `Il dataset nasce dall'unione temporale di segnali, asset history, operating mode e maintenance record. Vibrazione grezza richiede sensor location, asse, mounting, sampling, spettro o feature, tachimetro, firmware e taratura. Temperatura deve distinguere ambiente, cuscinetto e carico. Velocità, ricetta, cambi formato, pulizia e fermate spiegano regimi diversi. I work order devono separare segnalazione, apertura, ispezione, diagnosi, intervento, componente rimosso e causa confermata. Usare la data di chiusura come istante guasto crea label ritardate e leakage. Un join per asset name fallisce dopo sostituzioni; servono physical instance e validità temporale. I casi sani non sono semplicemente finestre senza work order: un intervento preventivo censura l'esito, una perdita di telemetria riduce osservabilità e una macchina inattiva non accumula la stessa esposizione. La readiness review misura copertura nella finestra prima dell'evento, percentuale di label confermate, variabilità tra asset, equilibrio di operating mode e stabilità della configurazione. Nella scheda, soltanto nove failure label affidabili e due sensori ricollocati fanno fallire il hard gate. La decisione corretta è rinviare la promessa, non compensare con un algoritmo più potente. Nel frattempo si standardizzano failure code, inspection note, component identity e clock alignment e si esegue una baseline di condition monitoring basata su regole.`,
      `The dataset joins signals, asset history, operating mode, and maintenance records over time. Raw vibration requires sensor location, axis, mounting, sampling, spectrum or features, tachometer, firmware, and calibration. Temperature must distinguish environment, bearing, and load. Speed, recipe, format changes, cleaning, and stops explain regimes. Work orders should separate notification, opening, inspection, diagnosis, intervention, removed component, and confirmed cause. Using closure date as failure time creates late labels and leakage. Joining by asset name fails after replacement; physical instance and temporal validity are needed. Healthy cases are not simply windows without work orders. Preventive intervention censors outcomes, telemetry loss reduces observability, and inactive machines accumulate different exposure. Readiness review measures coverage in the pre-event window, share of confirmed labels, cross-asset variability, balance of operating modes, and configuration stability. In the scorecard, only nine trustworthy failure labels and two relocated sensors fail the hard gate. The correct decision is to defer the promise, not compensate with a more powerful algorithm. Meanwhile, standardize failure codes, inspection notes, component identity, and clock alignment, and run a rule-based condition-monitoring baseline.`
    ),
    t(
      `Quando i dati superano il gate, la valutazione imita il futuro. Lo split è temporale o per asset, non casuale tra finestre sovrapposte. Ogni feature usa soltanto valori disponibili al prediction time. Si confrontano soglia ingegneristica, trend semplice e modello candidato. Le metriche includono recall per failure mode, false alert per asset-settimana, lead-time distribution, calibration, availability e percentuale di alert azionabili. La precision da sola può essere alta se il sistema emette pochissimi alert tardivi; il recall può essere alto producendo una coda ingestibile. Il decision gate stabilisce, per esempio, almeno 80 per cento di recall sulle failure label confermate, non più di 0,25 falsi alert per asset-settimana, lead time mediano sopra 36 ore e nessun segmento critico sotto soglia. Questi numeri sono ipotesi da approvare, non standard universali. Shadow mode copre stagioni e operating mode senza influenzare manutenzione. Ogni alert conserva feature snapshot, model version, confidence, spiegazione limitata e stato input. Un engineer ne valuta plausibilità e registra outcome. Si analizzano anche eventi senza alert. Se le label sono rare, intervalli ampi e sensitivity analysis devono essere espliciti. Non si usa una singola metrica ottenuta retrospettivamente come promessa di disponibilità futura. Il gate prospettico richiede popolazione, durata, minimum sample e criterio di stop concordati prima di osservare i risultati.`,
      `Once data passes the gate, evaluation should imitate the future. Split by time or asset rather than randomly across overlapping windows. Every feature uses only information available at prediction time. Compare an engineering threshold, simple trend, and candidate model. Metrics include failure-mode recall, false alerts per asset-week, lead-time distribution, calibration, availability, and share of actionable alerts. Precision alone may look high if the system emits very few late alerts; recall can look high while creating an unmanageable queue. A decision gate might require at least 80 percent recall on confirmed failures, no more than 0.25 false alerts per asset-week, median lead time above 36 hours, and no critical segment below threshold. Those numbers are approved hypotheses, not universal standards. Shadow mode covers seasons and operating modes without changing maintenance. Each alert stores feature snapshot, model version, confidence, bounded explanation, and input state. An engineer checks plausibility and records outcome. Events without alerts are also analyzed. When labels are rare, wide intervals and sensitivity analysis must be explicit. One retrospective score is not a promise of future availability. A prospective gate defines population, duration, minimum sample, and stop criterion before results are observed.`
    ),
    t(
      `Il deployment separa osservazione, raccomandazione, autorizzazione ed esecuzione. Il servizio legge dati approvati e genera un advisory "ispezionare entro quattro ore; se il pattern è confermato, prenotare una finestra entro 36 ore". Non crea da solo il work order critico, non arresta la linea e non modifica il PLC. Reliability verifica sensor health, operating mode, trend e alternative; Maintenance autorizza priorità e attività; Planning conferma finestra; Operations coordina stato impianto. Il CMMS registra decisione, evidenza e motivo di override. Dato stale, sensor bad, model expired, drift, coda non presidiata o service outage attivano fallback a regole esistenti e ispezione. Si prova il fallback, non lo si descrive soltanto. Il valore economico usa la stessa popolazione della baseline. Sette eventi da 42 minuti costano 17.640 euro; evitare il 40 per cento vale 7.056 euro lordi. Si sottraggono finestre preventive non necessarie, diagnostica, ricambi anticipati e servizio. KPI come production quantity, qualità e backlog mostrano effetti indiretti. Il model owner controlla performance; il process owner controlla valore e capacità; risk e Quality verificano confini pertinenti. Si scala soltanto se le feature sono riproducibili su altri asset, la maintenance policy è disponibile e il beneficio resta positivo sotto sensitivity analysis. Altrimenti si mantiene la soluzione locale o la si ritira.`,
      `Deployment separates observation, recommendation, authorization, and execution. The service reads approved data and issues an advisory: "Inspect within four hours; if the pattern is confirmed, reserve a window within 36 hours." It does not independently create a critical work order, stop the line, or change a PLC. Reliability checks sensor health, operating mode, trend, and alternatives; Maintenance authorizes priority and work; Planning confirms the window; Operations coordinates equipment state. The CMMS records the decision, evidence, and override reason. Stale data, bad sensor status, expired model, drift, unstaffed queue, or service outage triggers fallback to existing rules and inspection. Fallback is exercised, not merely documented. Economic value uses the same population as the baseline. Seven events of 42 minutes cost EUR 17,640; avoiding 40 percent is worth EUR 7,056 gross. Subtract unnecessary preventive windows, diagnostics, early spares, and service cost. Production quantity, quality, and backlog show indirect effects. The model owner monitors performance; the process owner owns value and capacity; risk and Quality verify relevant boundaries. Scale only when features reproduce on other assets, the maintenance policy is available, and benefit remains positive under sensitivity analysis. Otherwise retain a local solution or retire it.`
    )
  ],
  terminology: [
    t('Failure mode: modo specifico con cui una funzione viene persa o degradata.', 'Failure mode: a specific way a function is lost or degraded.'),
    t('Lead time utile: anticipo sufficiente per eseguire un’azione migliore.', 'Useful lead time: enough advance notice to execute a better action.'),
    t('Censoring: esito non osservabile completamente, per esempio dopo intervento preventivo.', 'Censoring: an incompletely observed outcome, such as after preventive intervention.')
  ],
  microExamples: [microExample(
    'Alert corretto ma troppo tardi',
    'Correct alert, too late',
    'Un alert cinque minuti prima del fermo è un true positive statistico, ma non consente diagnosi, ricambio o finestra e quindi non è azionabile.',
    'An alert five minutes before a stop is statistically true positive but cannot support diagnosis, spares, or a window, so it is not actionable.'
  )],
  workedCases: [
    {
      id: 'bearing-degradation-maintenance-window',
      durationMinutes: 3,
      title: t(
        'Caso ipotetico: degrado cuscinetto su modulo di confezionamento',
        'Hypothetical case: bearing degradation on a packaging module'
      ),
      scenario: t(
        'Una linea ad alta velocità registra sette fermi attribuiti alla famiglia cuscinetto. Il team vuole anticipare un’ispezione e una finestra senza trasformare analytics in controllo automatico.',
        'A high-speed line records seven stops attributed to the bearing family. The team wants earlier inspection and maintenance windows without turning analytics into automatic control.'
      ),
      assumptions: [
        t('Il costo di fermo è stimato in 3.600 euro/ora e va validato da Finance.', 'Downtime cost is estimated at EUR 3,600/hour and requires Finance validation.'),
        t('La maintenance policy può usare una finestra entro 36 ore.', 'The maintenance policy can use a window within 36 hours.'),
        t('Il modello resta advisory e gli interlock sono indipendenti.', 'The model remains advisory and interlocks are independent.'),
        t('Label di failure mode derivano da ispezione del componente rimosso.', 'Failure-mode labels derive from inspection of the removed component.')
      ],
      reasoning: t(
        'Il team riconcilia segnali, physical asset, operating mode e work order; confronta regola, trend e modello con split temporale; valuta false alert, miss, lead time e impatto sulla maintenance policy.',
        'The team reconciles signals, physical asset, operating mode, and work orders; compares rule, trend, and model using temporal splits; and evaluates false alerts, misses, lead time, and maintenance-policy impact.'
      ),
      analysisSteps: [
        t('Definire la failure mode e separarla da sintomi generici.', 'Define the failure mode and separate it from generic symptoms.'),
        t('Riconciliare timestamp, component instance, segnali e cause confermate.', 'Reconcile timestamps, component instance, signals, and confirmed causes.'),
        t('Confrontare la baseline con il candidato in shadow mode prospettico.', 'Compare baseline and candidate in prospective shadow mode.'),
        t('Applicare gate statistici, operativi, economici e di controllo.', 'Apply statistical, operating, economic, and control gates.'),
        t('Autorizzare una finestra soltanto dopo verifica tecnica umana.', 'Authorize a window only after human technical verification.')
      ],
      decision: t(
        'Il caso d’uso viene rinviato finché il hard gate dati non è superato; il case artifact mostra le condizioni necessarie per un futuro pilot advisory con finestra di 36 ore.',
        'The use case is deferred until the data hard gate passes; the case artifact shows conditions for a future advisory pilot with a 36-hour window.'
      ),
      tradeOff: t(
        'Una soglia conservativa riduce miss ma aumenta ispezioni e finestre non necessarie; una soglia alta protegge capacità ma può arrivare tardi.',
        'A conservative threshold reduces misses but increases unnecessary inspections and windows; a high threshold protects capacity but may arrive late.'
      ),
      outcome: t(
        'Il primo outcome è una decisione di readiness onesta: migliorare label e lineage, misurare la baseline e non promettere PdM prima dell’evidenza.',
        'The first outcome is an honest readiness decision: improve labels and lineage, measure the baseline, and do not promise PdM before evidence.'
      ),
      followUps: [
        t('Come dimostreresti che il lead time è operativo e non soltanto statistico?', 'How would you show that lead time is operational rather than merely statistical?'),
        t('Che cosa accade quando il sensore è stale o la coda non è presidiata?', 'What happens when the sensor is stale or the queue is unstaffed?')
      ],
      pmiCase: true,
      hypothetical: true,
      publicContext: t(
        'Scenario didattico ipotetico basato sul contesto pubblico di operations manifatturiere globali; non descrive sistemi o procedure PMI riservati.',
        'Hypothetical teaching scenario based on public global manufacturing operations context; it does not describe confidential PMI systems or procedures.'
      ),
      caseArtifact: {
        decisionGates: [
          {
            id: 'failure-mode-and-action',
            status: 'passed',
            evidence: t('Failure mode e ispezione entro quattro ore sono definite.', 'Failure mode and inspection within four hours are defined.'),
            criteria: t('Causa distinguibile e azione approvata con lead time utile.', 'Distinguishable cause and approved action with useful lead time.'),
            owner: t('Reliability Engineering', 'Reliability Engineering')
          },
          {
            id: 'data-and-label-readiness',
            status: 'failed',
            evidence: t('Non ancora sufficiente: soltanto nove eventi sono confermati e due sensori hanno cambiato posizione.', 'Not yet sufficient: only nine events are confirmed and two sensors changed position.'),
            criteria: t('Almeno 40 eventi confermati, copertura pre-evento sopra 98 per cento, lineage completo e split temporale.', 'At least 40 confirmed events, pre-event coverage above 98 percent, complete lineage, and a temporal split.'),
            owner: t('Data Owner e Maintenance', 'Data Owner and Maintenance')
          },
          {
            id: 'prospective-performance',
            status: 'not-evaluated',
            evidence: t('Non ancora valutata: lo shadow test può iniziare soltanto dopo la chiusura del gate dati.', 'Not yet evaluated: shadow testing can begin only after the data gate closes.'),
            criteria: t('Recall minimo 80 per cento, massimo 0,25 falsi alert per asset-settimana, minimum sample e segmenti predefiniti.', 'At least 80 percent recall, at most 0.25 false alerts per asset-week, and predefined minimum sample and segments.'),
            owner: t('Model Owner', 'Model Owner')
          },
          {
            id: 'economic-and-capacity-value',
            status: 'not-evaluated',
            evidence: t('Non ancora valutato: 7.056 euro sono un beneficio lordo ipotetico e costo pilot, false window e capacità non sono quantificati.', 'Not yet evaluated: EUR 7,056 is a hypothetical gross benefit, while pilot cost, false windows, and capacity are not quantified.'),
            criteria: t('Beneficio netto positivo dopo costi e coda sostenibile anche in sensitivity analysis.', 'Positive net benefit after costs and a sustainable queue under sensitivity analysis.'),
            owner: t('Process Owner e Finance', 'Process Owner and Finance')
          },
          {
            id: 'controlled-deployment',
            status: 'not-evaluated',
            evidence: t('Non ancora provato: advisory, autorizzazione umana, audit, rollback e fallback restano requisiti del futuro pilot.', 'Not yet proven: advisory use, human authorization, audit, rollback, and fallback remain requirements for a future pilot.'),
            criteria: t('Prova prospettica dei controlli, senza scrittura a PLC o bypass di interlock.', 'Prospective exercise of controls, with no PLC writes or interlock bypass.'),
            owner: t('Maintenance e OT', 'Maintenance and OT')
          }
        ],
        action: {
          windowHours: 36,
          inspectionWithinHours: 4,
          mode: 'advisory-with-human-authorization'
        },
        fallback: t(
          'Con dato stale, sensor bad, drift o servizio non disponibile, tornare alla regola esistente e all’ispezione manuale.',
          'With stale data, bad sensor status, drift, or service outage, return to the existing rule and manual inspection.'
        ),
        valueCalculation: workedExamples.downtimeCost
      }
    }
  ],
  activities: [
    {
      id: 'evaluate-pdm-gates',
      prompt: t(
        'Per il solo gate dati PdM, scegli passed o failed usando le nove label e il lineage incompleto forniti.',
        'For the PdM data gate only, choose passed or failed using the supplied nine labels and incomplete lineage.'
      ),
      expectedArtifact: t('Uno status con una ragione.', 'One status with one reason.'),
      durationMinutes: 2,
      quickTask: quickTask(1, 0, 'Sono disponibili nove label verificate e due sensori hanno cambiato posizione.', 'Nine verified labels exist and two sensors changed position.', 'Passed o failed più una frase.', 'Passed or failed plus one sentence.'),
      hints: [t('Una soglia futura non è evidenza di un gate passato.', 'A future threshold is not evidence of a passed gate.')],
      modelSolution: t(
        'Failed: nove label e lineage incompleto non rappresentano operating mode, configurazioni e interventi.',
        'Failed: nine labels and incomplete lineage do not represent operating modes, configurations, and interventions.'
      ),
      rubric: [
        t('Segna failed e cita label insufficienti o lineage incompleto.', 'Marks failed and cites insufficient labels or incomplete lineage.')
      ]
    }
  ],
  checkpoint: checkpoint(
    'Quale condizione viene prima della scelta del modello predictive maintenance?',
    'Which condition comes before selecting a predictive-maintenance model?',
    [
      ['Una failure mode azionabile, label verificabili e una maintenance policy con lead time.', 'An actionable failure mode, verifiable labels, and a maintenance policy with lead time.', 'Senza questi elementi non esiste una decisione valutabile.', 'Without these elements there is no evaluable decision.'],
      ['Un vendor che promette accuracy elevata.', 'A vendor promising high accuracy.', 'La promessa non sostituisce dati, workflow e valutazione locale.', 'A promise does not replace local data, workflow, and evaluation.'],
      ['Il maggior numero possibile di feature.', 'As many features as possible.', 'Feature senza significato e disponibilità temporale aumentano leakage e fragilità.', 'Features without meaning and temporal availability increase leakage and fragility.']
    ],
    0
  ),
  sourceIds: ['nist-condition-monitoring-maintenance', 'nist-ai-rmf-1-0', 'pmi-operations']
}

const unitFive = {
  id: 'computer-vision-quality-human-review',
  eyebrow: t('05 · Errore asimmetrico e oversight', '05 · Asymmetric error and oversight'),
  title: t(
    'Caso computer vision per qualità con review umana',
    'Computer-vision quality case with human review'
  ),
  objective: t(
    'Progettare un’ispezione visiva come referral controllato, usando costi asimmetrici, capacità di review e autorità qualità.',
    'Design visual inspection as controlled referral using asymmetric costs, review capacity, and quality authority.'
  ),
  estimatedMinutes: 10,
  timeAllocation: { theory: 4, cases: 4, practice: 2 },
  theory: [
    t(
      `Un caso d’uso di computer vision comincia dalla definizione del difetto e dal sistema di imaging. "Riconoscere confezioni sbagliate" è insufficiente. Occorre specificare regione, orientamento, dimensione minima, contrasto, classi accettabile, non accettabile e incerta, standard visivo, conseguenza e unità di disposizione. Camera, lente, distanza, illuminazione, trigger, exposure, motion blur, pulizia e sincronizzazione con identità prodotto determinano ciò che il modello può vedere. Un difetto sotto la risoluzione fisica non diventa rilevabile aumentando la rete neurale. Si esegue un measurement-system analysis: ripetibilità della camera, riproducibilità tra stazioni, stabilità nel tempo e accordo tra ispettori. Il dataset è stratificato per SKU, lotto, turno, materiale, camera, luce e condizioni rare. Immagini quasi duplicate dello stesso ciclo non vanno distribuite tra train e test. La label policy collega classe a standard approvato e prevede adjudication dei borderline. Conservare la categoria incerta evita di forzare ground truth fittizia. Augmentation simula variazioni plausibili, non difetti impossibili. Un test set locked rappresenta il deployment e resta separato dalle iterazioni. Inoltre si valida il percorso prodotto-immagine: una classificazione corretta associata all’unità sbagliata è un errore di sistema, non un successo del modello.`,
      `A computer-vision use case begins with defect definition and the imaging system. "Recognize bad packages" is insufficient. Specify region, orientation, minimum size, contrast, acceptable, unacceptable, and uncertain classes, visual standard, consequence, and disposition unit. Camera, lens, distance, illumination, trigger, exposure, motion blur, cleanliness, and synchronization with product identity determine what the model can see. A defect below physical resolution does not become detectable with a larger neural network. Perform measurement-system analysis covering camera repeatability, station reproducibility, time stability, and inspector agreement. Stratify data by SKU, lot, shift, material, camera, light, and rare conditions. Near-duplicate images from one cycle must not be divided between training and test. The label policy links classes to an approved standard and adjudicates borderline cases. Keeping an uncertain class prevents invented ground truth. Augmentation simulates plausible variation rather than impossible defects. A locked test set represents deployment and remains separate from iteration. Also validate the product-image path. A correct classification linked to the wrong unit is a system error, not a model success.`
    ),
    t(
      `L'errore è asimmetrico. Un false negative lascia passare un difetto e può richiedere containment, rilavorazione, indagine o gestione cliente. Un false positive invia un conforme a review, rallenta il flusso e può generare scrap improprio. I costi non sono equivalenti e dipendono dalla classe. La confusion matrix con TP 72, FP 18, FN 8, TN 902 produce precision 80 per cento e recall 90 per cento. La soglia non si sceglie massimizzando accuracy. A 0,62 il costo ipotetico è 18×55 + 8×1.800 = 15.390 euro. A 0,44 i false positive crescono a 43 ma i miss scendono a 3: 43×55 + 3×1.800 = 7.765 euro. La seconda policy minimizza il costo atteso per quelle ipotesi. La coda include anche i 77 true positive: 77+43=120 referral in 2,5 ore, quindi 48 all'ora. Con capacità 60, il margine nominale è 12, ma serve considerare arrivi a burst, pause, escalation e tempo per casi complessi. Una queue simulation o un semplice stress scenario misura ageing e work in progress. Se la coda supera il limite, il sistema non deve silenziosamente auto-accettare: passa a una procedura degradata approvata, per esempio ispezione manuale completa o riduzione controllata della velocità.`,
      `Error is asymmetric. A false negative lets a defect escape and may trigger containment, rework, investigation, or customer response. A false positive sends conforming product to review, slows flow, and may cause improper scrap. Costs differ by class. A confusion matrix with TP 72, FP 18, FN 8, and TN 902 gives 80 percent precision and 90 percent recall. Threshold selection should not maximize accuracy. At 0.62, hypothetical cost is 18×55 + 8×1,800 = EUR 15,390. At 0.44, false positives rise to 43 while misses fall to 3: 43×55 + 3×1,800 = EUR 7,765. The second policy minimizes expected cost under those assumptions. The queue also contains 77 true positives: 77+43=120 referrals in 2.5 hours, or 48 per hour. With capacity of 60, nominal margin is 12, but bursts, breaks, escalations, and complex-case time matter. A queue simulation or simple stress scenario measures ageing and work in progress. If the queue exceeds its limit, the system must not silently auto-accept. It enters an approved degraded procedure such as full manual inspection or controlled speed reduction.`
    ),
    t(
      `Human review deve essere meaningful. La persona vede l’immagine originale, regione evidenziata come supporto e non come prova, classe proposta, confidence calibrata, standard applicabile, identità prodotto e stato della camera. Può accettare, rifiutare o escalare e deve poter contestare entro il tempo disponibile. Il sistema non manipola la visualizzazione per rendere probabile la conferma. I referral sono ordinati per conseguenza e ageing, non soltanto per score. Quality stabilisce chi è qualificato, come si gestisce disaccordo e quale decisione costituisce disposizione. Il modello non ha autorità di rilascio. Questo confine evita che "human in the loop" diventi un click rituale. Si misura automation bias tramite override, tempo di review, agreement per classe e audit campionario dei non referral. Se l'operatore conferma il 99,9 per cento in meno di un secondo, può essere un segnale di interfaccia o carico inadeguati, non di perfezione. Il feedback non entra automaticamente nel training: una decisione operativa può riflettere urgenza o informazione incompleta. Gli esempi per retraining passano label governance e adjudication. L’interfaccia utente mostra anche stato di input e degraded mode. Se luce, focus, trigger o identity sono invalidi, visualizza "non valutabile" e applica fallback, invece di produrre una confidence apparentemente precisa.`,
      `Human review must be meaningful. The person sees the original image, highlighted region as support rather than proof, proposed class, calibrated confidence, applicable standard, product identity, and camera state. They can accept, reject, or escalate and must have enough time to challenge the recommendation. The interface should not manipulate the display to encourage confirmation. Referrals are ordered by consequence and ageing, not score alone. Quality defines qualifications, disagreement handling, and which decision constitutes disposition. The model has no release authority. This boundary prevents "human in the loop" from becoming a ritual click. Measure automation bias through overrides, review time, agreement by class, and sampled audits of non-referrals. If operators confirm 99.9 percent in under a second, the interface or workload may be inadequate rather than the model perfect. Feedback does not automatically enter training because an operating decision may reflect urgency or incomplete information. Retraining examples pass label governance and adjudication. The interface also shows input state and degraded mode. Invalid lighting, focus, trigger, or identity produces "not assessable" and fallback rather than a falsely precise confidence score.`
    ),
    t(
      `Il rollout procede per gate. In offline validation si dimostrano imaging, label, segment performance e cost sensitivity. In shadow mode il sistema osserva produzione e costruisce referral virtuali, mentre la procedura esistente resta autorevole. Si misurano coda, latency, drift, difetti emergenti e disagreement. In advisory mode i referral entrano nel desk, ma Quality conserva disposizione e si applicano stop criteria: recall rolling sotto soglia con minimum sample, camera health insufficiente, product identity mancante, queue oltre capacità, segmento non validato o aumento di defect escape. Il fallback viene provato durante una finestra controllata. Soltanto dopo evidenza prospettica si valuta un’automazione limitata per classi a basso rischio, se autorizzata, senza dedurre che tutte le classi abbiano la stessa assurance. Il monitor registra modello, soglia, camera configuration, dataset, standard, operatore e decisione. Si eseguono audit dei true negative perché altrimenti i miss restano invisibili. Una modifica di illuminazione o packaging riapre validation. Il beneficio confronta review evitata, scrap e escape, ma non usa un costo medio per nascondere eventi gravi. L'esito desiderato è un quality system più informato e capace, non un modello che sostituisce accountability. Nel caso ipotetico la soglia recall-first è accettabile solo perché 120 referral in 2,5 ore equivalgono a 48/ora, sotto capacità 60, e il rilascio rimane qualificato umano.`,
      `Rollout proceeds through gates. Offline validation establishes imaging, labels, segment performance, and cost sensitivity. In shadow mode, the system observes production and builds virtual referrals while the existing procedure remains authoritative. It measures queue, latency, drift, emerging defects, and disagreement. In advisory mode, referrals enter the review desk, while Quality retains disposition and stop criteria apply: rolling recall below threshold with minimum sample, poor camera health, missing product identity, queue beyond capacity, unvalidated segment, or increased defect escape. Fallback is tested in a controlled window. Only prospective evidence can justify limited automation for low-risk classes, if authorized, without assuming every class has equal assurance. Monitoring records model, threshold, camera configuration, dataset, standard, operator, and decision. Audit true negatives so misses do not remain invisible. Lighting or packaging changes reopen validation. Benefit compares avoided review, scrap, and escapes but does not use an average cost to hide severe events. The desired outcome is a better informed, more capable quality system rather than a model replacing accountability. In the hypothetical case, the recall-first threshold is acceptable only because 120 referrals in 2.5 hours equal 48/hour, below capacity of 60, and release remains with qualified humans.`
    )
  ],
  terminology: [
    t('Defect escape: difetto non rilevato che prosegue oltre il controllo previsto.', 'Defect escape: an undetected defect moving beyond the intended control.'),
    t('Adjudication: risoluzione qualificata di label o giudizi discordanti.', 'Adjudication: qualified resolution of conflicting labels or judgments.'),
    t('Automation bias: tendenza a confermare la raccomandazione automatica senza verifica adeguata.', 'Automation bias: tendency to accept automated recommendations without adequate checking.')
  ],
  microExamples: [microExample(
    'Camera fuori fuoco',
    'Out-of-focus camera',
    'Un sistema robusto dichiara l’immagine non valutabile e attiva fallback; non trasforma uno score su input degradato in una decisione qualità.',
    'A robust system marks the image unassessable and triggers fallback. It does not turn a score on degraded input into a quality decision.'
  )],
  workedCases: [
    {
      id: 'seal-inspection-human-review',
      durationMinutes: 3,
      title: t(
        'Caso ipotetico: ispezione della sigillatura con referral umano',
        'Hypothetical case: seal inspection with human referral'
      ),
      scenario: t(
        'Una stazione vision osserva 1.000 unità e propone referral per difetti di sigillatura. Quality vuole ridurre escape senza saturare la review o delegare il rilascio.',
        'A vision station observes 1,000 units and proposes referrals for seal defects. Quality wants fewer escapes without saturating review or delegating release.'
      ),
      assumptions: [
        t('Un FP costa 55 euro e un FN 1.800 euro nello scenario didattico.', 'An FP costs EUR 55 and an FN EUR 1,800 in the teaching scenario.'),
        t('La capacità qualificata è 60 referral ogni ora.', 'Qualified capacity is 60 referrals each hour.'),
        t('Camera health e product identity sono prerequisiti hard.', 'Camera health and product identity are hard prerequisites.'),
        t('La disposizione resta a Quality e il modello non rilascia prodotto.', 'Disposition remains with Quality and the model does not release product.')
      ],
      reasoning: t(
        'Il team riconcilia la matrice, confronta due soglie con costi asimmetrici, verifica queue capacity e progetta una review che può contestare, escalare e tornare a fallback.',
        'The team reconciles the matrix, compares two thresholds with asymmetric costs, verifies queue capacity, and designs review that can challenge, escalate, and fall back.'
      ),
      analysisSteps: [
        t('Validare imaging, identity e label policy per segmento.', 'Validate imaging, identity, and label policy by segment.'),
        t('Riconciliare TP, FP, FN e TN e calcolare precision e recall.', 'Reconcile TP, FP, FN, and TN and calculate precision and recall.'),
        t('Applicare costi asimmetrici e sensitivity analysis alle soglie.', 'Apply asymmetric costs and sensitivity analysis to thresholds.'),
        t('Confrontare referral orari con capacità, ageing e burst.', 'Compare hourly referrals with capacity, ageing, and bursts.'),
        t('Definire autorità, stop criteria, audit dei non referral e fallback.', 'Define authority, stop criteria, non-referral audits, and fallback.')
      ],
      decision: t(
        'Selezionare la soglia 0,44 in advisory perché costa meno nello scenario e 120 referral in 2,5 ore equivalgono a 48/ora, sotto capacità 60; Quality mantiene accept, reject o escalate.',
        'Select threshold 0.44 in advisory because it costs less in the scenario and 120 referrals in 2.5 hours equal 48/hour, below capacity of 60; Quality retains accept, reject, or escalate.'
      ),
      tradeOff: t(
        'Il recall più alto riduce miss ma aumenta carico, possibili fermate e automation bias; soglia e staffing vanno governati insieme.',
        'Higher recall reduces misses but increases workload, possible stops, and automation bias; threshold and staffing must be governed together.'
      ),
      outcome: t(
        'Il pilot ha un criterio economico riproducibile, una capacità verificata e un confine di rilascio esplicito, con fallback a ispezione manuale.',
        'The pilot has reproducible economics, verified capacity, and an explicit release boundary, with fallback to manual inspection.'
      ),
      followUps: [
        t('Come controlleresti i difetti che il modello non invia a review?', 'How would you monitor defects the model does not send to review?'),
        t('Quale segnale dimostrerebbe automation bias?', 'Which signal would indicate automation bias?')
      ],
      pmiCase: true,
      hypothetical: true,
      publicContext: t(
        'Scenario didattico ipotetico ispirato a una linea manifatturiera regolamentata; non rappresenta specifiche o controlli PMI riservati.',
        'Hypothetical teaching scenario inspired by a regulated manufacturing line; it does not represent confidential PMI specifications or controls.'
      ),
      caseArtifact: {
        metrics: workedExamples.confusionMatrix,
        costAnalysis: workedExamples.asymmetricErrorCost,
        humanReview: {
          queueCapacityPerHour: 60,
          expectedReferrals: 120,
          evaluationHours: 2.5,
          expectedReferralsPerHour: 48,
          outcomes: ['accept', 'reject', 'escalate'],
          evidencePresented: [
            'original-image',
            'region-of-interest',
            'applicable-standard',
            'camera-health',
            'product-identity',
            'model-version'
          ]
        },
        releaseAuthority: 'qualified-human-only',
        fallback: t(
          'Con camera, identity o queue non conformi, sospendere il referral automatico e applicare la procedura di ispezione manuale approvata.',
          'When camera, identity, or queue is out of bounds, suspend automated referral and apply the approved manual-inspection procedure.'
        )
      }
    }
  ],
  activities: [
    {
      id: 'design-human-review-queue',
      prompt: t(
        'Dato il rate precomputato di 48 referral/ora e capacità 60, decidi se la coda è sostenibile.',
        'Given the precomputed rate of 48 referrals/hour and capacity of 60, decide whether the queue is sustainable.'
      ),
      expectedArtifact: t('Una decisione con margine.', 'One decision with headroom.'),
      durationMinutes: 2,
      quickTask: quickTask(1, 0, 'Il rate 48/ora è già calcolato; la capacità è 60/ora.', 'The 48/hour rate is precomputed; capacity is 60/hour.', 'Sostenibile o no più il margine.', 'Sustainable or not plus headroom.'),
      hints: [t('Referral totali uguale TP più FP, non soltanto FP.', 'Total referrals equal TP plus FP, not FP alone.')],
      modelSolution: t(
        'Sostenibile: 60 - 48 = 12 review ogni ora di margine, da verificare nel pilot.',
        'Sustainable: 60 - 48 = 12 reviews per hour of headroom, to be verified in the pilot.'
      ),
      rubric: [
        t('Confronta 48 con 60 e identifica 12 review ogni ora di margine.', 'Compares 48 with 60 and identifies 12 reviews per hour of headroom.')
      ]
    }
  ],
  checkpoint: checkpoint(
    'Perché la soglia con costo atteso minore non è automaticamente pronta al deployment?',
    'Why is the threshold with lower expected cost not automatically ready for deployment?',
    [
      ['Perché serve anche verificare capacità, segmenti, autorità, stop criteria e fallback.', 'Because capacity, segments, authority, stop criteria, and fallback also require verification.', 'Il costo è una dimensione del sistema decisionale, non l’intero assurance case.', 'Cost is one dimension of the decision system, not the full assurance case.'],
      ['Perché precision e recall non si possono calcolare.', 'Because precision and recall cannot be calculated.', 'La matrice fornisce i conteggi necessari.', 'The matrix provides the required counts.'],
      ['Perché il modello deve rilasciare prodotto automaticamente.', 'Because the model must release product automatically.', 'Il confine richiesto conserva la disposizione umana qualificata.', 'The required boundary preserves qualified human disposition.']
    ],
    0
  ),
  sourceIds: ['nist-ai-rmf-1-0', 'nist-sp-500-341', 'eu-ai-act', 'pmi-product-reliability']
}

const unitSix = {
  id: 'forecast-uncertainty-supply-scenarios',
  eyebrow: t('06 · Previsioni come distribuzioni', '06 · Forecasts as distributions'),
  title: t(
    'Rischio supply chain, incertezza previsionale e scenario planning',
    'Supply-chain risk, forecast uncertainty, and scenario planning'
  ),
  objective: t(
    'Usare forecast, intervalli e scenari per attivare decisioni reversibili senza presentare una stima puntuale come certezza.',
    'Use forecasts, intervals, and scenarios to trigger reversible decisions without presenting a point estimate as certainty.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 4, cases: 3, practice: 2 },
  theory: [
    t(
      `Un forecast è una distribuzione condizionata alle informazioni disponibili, non un ordine sul futuro. La stima puntuale di 1.000 unità riassume una parte del risultato; un prediction interval al 90 per cento tra 820 e 1.210 mostra la variabilità plausibile di un’osservazione futura secondo modello e dati. Il NIST/SEMATECH e-Handbook distingue prediction interval, che include rumore della nuova osservazione, da confidence interval sul valore medio. Confonderli produce range troppo stretti e decisioni fragili. La copertura dichiarata deve essere verificata con backtest: su molte finestre comparabili, circa il 90 per cento degli actual dovrebbe cadere nel range se l'intervallo è calibrato. Anche ampiezza conta. Un intervallo sempre enorme copre bene ma non aiuta. Si misurano bias, MAE o WAPE, coverage, interval width e performance per horizon, SKU e fase di domanda. MAPE può esplodere con valori vicini a zero; il denominatore va scelto in base alla decisione. Il forecast vintage è essenziale: il backtest usa soltanto ordini, stock, lead time e segnali noti alla data originaria. Sovrascrivere ogni previsione con l'ultima versione crea hindsight leakage e rende il modello artificialmente accurato. Un benchmark stagionale e il forecast del planner sono baseline necessarie prima di giustificare ML.`,
      `A forecast is a distribution conditional on available information, not an order imposed on the future. A point estimate of 1,000 units summarizes part of the result; a 90 percent prediction interval from 820 to 1,210 shows plausible variability for a future observation under the data and model. The NIST/SEMATECH e-Handbook distinguishes a prediction interval, which includes noise in the new observation, from a confidence interval around a mean response. Confusing them produces ranges that are too narrow and decisions that are fragile. Declared coverage needs backtesting. Across many comparable windows, about 90 percent of actuals should fall in a calibrated 90 percent interval. Width matters too. A range that is always enormous covers well but does not help. Measure bias, MAE or WAPE, coverage, interval width, and performance by horizon, SKU, and demand phase. MAPE can explode near zero, so denominator choice follows the decision. Forecast vintages are essential. Backtesting uses only orders, inventory, lead times, and signals known at the original date. Replacing all forecasts with the latest version creates hindsight leakage and artificial accuracy. Seasonal and planner baselines precede any claim that ML is justified.`
    ),
    t(
      `Scenario planning risponde a domande diverse dal prediction interval. L'intervallo rappresenta incertezza statistica sotto assunzioni; lo scenario modifica assunzioni rilevanti e chiede che cosa faremmo. Nel worked example, il piano centrale è 1.000. Lo scenario disruption applica 0,80 e produce 800 unità disponibili o richieste secondo la definizione; lo scenario recovery applica 1,15 e produce 1.150. Ogni scenario ha narrative, trigger, probabilità se stimabile, vincoli, KPI e azioni. Un ritardo fornitore oltre cinque giorni o domanda sotto 850 attiva protezione dei materiali critici, riduzione del piano non fermo e review quotidiana. Ordini confermati sopra 1.100 con materiale verificato pre-autorizzano capacità flessibile, ma non creano automaticamente un ordine irrevocabile. Le azioni sono staged: raccogliere informazione, riservare opzione, prenotare capacità, expedire, sostituire materiale se qualificato, riallocare e infine impegnare. Il costo dell'attesa viene confrontato con il costo di un’azione prematura. Questo è real options thinking in forma pratica. Lo scenario non deve diventare una storia creativa senza numeri. Quantità, lead time, stock, service target e recovery time devono riconciliarsi. Allo stesso modo un numero non sostituisce la narrativa causale: un moltiplicatore deve specificare quale shock lo genera e per quanto tempo.`,
      `Scenario planning answers a different question from a prediction interval. An interval represents statistical uncertainty under assumptions; a scenario changes important assumptions and asks what the organization would do. In the worked example, the central plan is 1,000. The disruption scenario applies 0.80 and gives 800 units available or demanded under the definition; recovery applies 1.15 and gives 1,150. Each scenario has a narrative, trigger, probability when estimable, constraints, KPIs, and actions. A supplier delay beyond five days or demand below 850 triggers protection of constrained materials, reduction of the non-firm plan, and daily review. Confirmed orders above 1,100 with verified materials pre-authorize flexible capacity but do not automatically create an irrevocable order. Actions are staged: gather information, reserve an option, book capacity, expedite, substitute qualified material, reallocate, and finally commit. Compare the cost of waiting with the cost of premature action. This is practical real-options reasoning. Scenarios must not become creative stories without numbers. Quantities, lead time, inventory, service target, and recovery time should reconcile. Equally, a number does not replace a causal narrative. A multiplier must name the shock producing it and its duration.`
    ),
    t(
      `Supply risk combina probabilità, impatto, esposizione, rilevabilità e tempo di risposta. Un alert su notizia o ritardo non è ancora una decisione. La risk event taxonomy distingue fornitore, logistica, qualità, capacità, domanda, geopolitica e sistemi; collega materiale, sito, lane, alternative, inventory cover e owner. Entity resolution è critica: nomi fornitore e materiale diversi tra ERP, portale e testo possono duplicare o perdere esposizioni. Dati esterni hanno timestamp, fonte, licenza, affidabilità e bias. Un modello può classificare segnali, ma procurement conferma il fatto e valuta alternative. Il rischio viene propagato sulla distinta e sul network con quantità e tempi, evitando di dichiarare che ogni ritardo di un componente ferma ogni prodotto. La priorità è expected loss o una matrice probabilità-impatto, integrata da hard constraint come sicurezza, qualità e qualifica. Si mostrano assunzioni e confidence. Un'alta confidence nell’estrazione di una data non equivale a alta confidence nella data promessa dal fornitore. La schermata decisionale separa observation, inference e commitment. Registra che cosa era noto, quale scenario è stato scelto, quale override è avvenuto e quale outcome è seguito. Questo decision log permette apprendimento e impedisce di giudicare il planner soltanto con il risultato: una buona decisione può avere esito negativo in presenza di incertezza.`,
      `Supply risk combines probability, impact, exposure, detectability, and response time. An alert about news or delay is not yet a decision. A risk-event taxonomy separates supplier, logistics, quality, capacity, demand, geopolitical, and system events; it links material, site, lane, alternatives, inventory cover, and owner. Entity resolution is critical. Different supplier and material names across ERP, portal, and text can duplicate or miss exposure. External data has timestamps, source, license, reliability, and bias. A model may classify signals, but procurement confirms facts and evaluates alternatives. Risk propagates through the bill of material and network using quantities and time rather than assuming every component delay stops every product. Priority may use expected loss or a probability-impact matrix plus hard constraints for safety, quality, and qualification. Assumptions and confidence remain visible. High confidence in extracting a date does not mean high confidence in a supplier promise. The decision screen separates observation, inference, and commitment. It records what was known, which scenario was selected, overrides, and outcomes. This decision log supports learning and prevents judging a planner by outcome alone. A sound decision can still have a poor result under uncertainty.`
    ),
    t(
      `Il pilot deve dimostrare decision quality, non soltanto forecast accuracy. Si selezionano famiglie con storico, volume e un processo decisionale reale. Il periodo di backtest attraversa stagionalità e discontinuità; rolling-origin evaluation simula aggiornamenti successivi. Si confrontano baseline, planner e modello per horizon. La review misura calibration degli intervalli e valore delle azioni: shortage evitato, premium freight, inventory, service level, schedule churn e numero di override. Un miglior MAE può peggiorare il business se concentra errore sui materiali più vincolati. Si applicano pesi o metriche per conseguenza senza nascondere i dettagli. In produzione, un run genera point forecast, interval, scenario, driver e freshness; il planner conferma, modifica o rifiuta con motivo. Constraint e ordini non vengono aggiornati da testo generato. Dato stale, source non confermata, coverage fuori limite o modello scaduto riportano alla baseline e a una review più frequente. Drift include domanda, lead time, portafoglio, promotion e policy. Il cadence di retraining segue evidenza, non calendario automatico. Un modello viene ritirato se non supera più la baseline o non modifica decisioni. La comunicazione professionale evita "la domanda sarà 1.000": dice "il centro è 1.000, il range calibrato è 820-1.210 e abbiamo azioni predefinite per disruption e recovery". Così l'incertezza diventa governabile senza essere nascosta.`,
      `The pilot must demonstrate decision quality, not forecast accuracy alone. Select families with history, volume, and a real decision process. Backtesting spans seasonality and discontinuity; rolling-origin evaluation simulates successive updates. Compare baseline, planner, and model by horizon. Review interval calibration and action value: shortages avoided, premium freight, inventory, service level, schedule churn, and override count. Better MAE can harm the business if errors concentrate on constrained materials. Use consequence-weighted metrics without hiding details. In production, each run provides point forecast, interval, scenario, drivers, and freshness. The planner confirms, changes, or rejects with a reason. Constraints and orders are not changed by generated text. Stale data, unconfirmed sources, poor coverage, or an expired model returns the process to baseline and more frequent review. Drift includes demand, lead time, portfolio, promotion, and policy. Retraining cadence follows evidence rather than an automatic calendar. Retire a model that no longer beats baseline or changes decisions. Professional communication avoids "demand will be 1,000." Say, "The central estimate is 1,000, the calibrated range is 820 to 1,210, and we have predefined actions for disruption and recovery." Uncertainty then becomes governable rather than hidden.`
    )
  ],
  terminology: [
    t('Prediction interval: range per una futura osservazione che include rumore e incertezza di stima.', 'Prediction interval: range for a future observation including noise and estimation uncertainty.'),
    t('Forecast vintage: versione della previsione e degli input disponibili a una data storica.', 'Forecast vintage: version of forecast and inputs available on a historical date.'),
    t('Rolling-origin evaluation: backtest che avanza ripetutamente origine e orizzonte.', 'Rolling-origin evaluation: backtest repeatedly advancing origin and horizon.')
  ],
  microExamples: [microExample(
    'Range calibrato, non promessa puntuale',
    'Calibrated range, not a point promise',
    'Il centro 1.000 con intervallo 820-1.210 orienta capacità flessibile e materiali; usare soltanto 1.000 nasconde due decisioni plausibili opposte.',
    'A center of 1,000 with interval 820-1,210 guides flexible capacity and material decisions. Using only 1,000 hides two plausible opposite decisions.'
  )],
  caseSegments: [caseSegment(
    'forecast-trigger-choice', 2,
    'Trigger di scenario e azione reversibile', 'Scenario trigger and reversible action',
    'Con forecast centrale 1.000, intervallo 820-1.210 e ritardo fornitore oltre cinque giorni, chi studia sceglie l’azione reversibile già definita.',
    'With a central forecast of 1,000, an 820-1,210 interval, and a supplier delay beyond five days, the learner chooses the predefined reversible action.'
  )],
  activities: [
    {
      id: 'forecast-scenario-decision-note',
      prompt: t(
        'Il ritardo fornitore supera cinque giorni: scegli l’azione già definita nello scenario downside.',
        'Supplier delay exceeds five days: choose the predefined downside-scenario action.'
      ),
      expectedArtifact: t('Una decisione di scenario.', 'One scenario decision.'),
      durationMinutes: 2,
      quickTask: quickTask(1, 0, 'Scenario downside: domanda 800 e ritardo fornitore oltre cinque giorni.', 'Downside scenario: demand 800 and supplier delay beyond five days.', 'Azione più una frase sul trigger.', 'Action plus one sentence about the trigger.'),
      hints: [t('Non chiamare certo il valore centrale.', 'Do not call the central value certain.')],
      modelSolution: t(
        'Proteggere i materiali critici, ridurre il piano non vincolante e riesaminare ogni giorno perché il trigger di ritardo è attivo.',
        'Protect constrained materials, reduce the non-firm plan, and review daily because the delay trigger is active.'
      ),
      rubric: [
        t('Collega il trigger di ritardo all’azione downside già definita.', 'Connects the delay trigger to the predefined downside action.')
      ]
    }
  ],
  checkpoint: checkpoint(
    'Qual è la differenza corretta tra prediction interval e scenario?',
    'What is the correct difference between a prediction interval and a scenario?',
    [
      ['Sono due nomi per lo stesso range.', 'They are two names for the same range.', 'Uno rappresenta incertezza sotto assunzioni, l’altro cambia assunzioni e azioni.', 'One represents uncertainty under assumptions; the other changes assumptions and actions.'],
      ['L’intervallo quantifica valori plausibili sotto il modello; lo scenario modifica driver e collega trigger ad azioni.', 'The interval quantifies plausible values under the model; a scenario changes drivers and connects triggers with actions.', 'La distinzione permette sia calibration sia preparedness.', 'The distinction supports both calibration and preparedness.'],
      ['Lo scenario deve essere sempre più probabile del forecast.', 'A scenario must always be more likely than the forecast.', 'Gli scenari possono essere stress plausibili senza essere lo stato centrale.', 'Scenarios can be plausible stresses without being the central state.']
    ],
    1
  ),
  sourceIds: ['nist-prediction-uncertainty', 'nist-ai-rmf-1-0', 'isa-95', 'pmi-annual-report-2025']
}

const unitSeven = {
  id: 'data-readiness-use-case-portfolio',
  eyebrow: t('07 · Dallo score al gate', '07 · From score to gate'),
  title: t(
    'Scorecard di data readiness e decisione del portafoglio',
    'Data-readiness scorecard and use-case portfolio decision'
  ),
  objective: t(
    'Produrre una selezione auditabile separando weighted score, evidenza, confidenza, hard gate e decisione di portafoglio.',
    'Produce an auditable selection by separating weighted score, evidence, confidence, hard gates, and portfolio decision.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 4, cases: 3, practice: 2 },
  theory: [
    t(
      `La scheda conserva la data di scadenza dell’evidenza, perché uno score basato su un campione obsoleto non resta affidabile e deve essere riesaminato.`,
      `The sheet records evidence expiry because a score based on an obsolete sample does not remain trustworthy and must be reviewed.`
    ),
    t(
      `Una scorecard è utile soltanto se rende una decisione più contestabile. Prima definisce il perimetro del candidato: processo, actor, decision, frequenza, baseline, popolazione, output e conseguenza. Poi assegna criteri e pesi prima di valutare i casi. La scheda usa valore decisionale 20, readiness semantica 25, label e ground truth 20, workflow e integrazione 20, rischio, oversight e adozione 15. I pesi sommano 100. Ogni criterio riceve score intero da 1 a 5, evidence localizzata, rationale e confidence low, medium o high. Lo score pesato è la somma di score×peso divisa per 5, quindi resta su scala 20-100. Per vision seal review i valori 5,4,4,4,4 producono (5×20 + 4×25 + 4×20 + 4×20 + 4×15)/5 = 84. Il calcolo è riproducibile, ma 84 non significa 84 per cento di probabilità di successo. È un indice di priorità sotto una rubric. Confidence segnala quanto è solida l'evidenza: una valutazione 5 con confidence low richiede discovery, non entusiasmo. Evidence cita un artefatto osservabile, per esempio tre mesi di scrap riconciliato o un campione adjudicato; rationale spiega perché quell'evidenza sostiene il punteggio e quali lacune restano.`,
      `A scorecard is useful only when it makes a decision more challengeable. First define each candidate's process, actor, decision, frequency, baseline, population, output, and consequence. Then set criteria and weights before scoring. This sheet uses decision value 20, semantic readiness 25, labels and ground truth 20, workflow and integration 20, and risk, oversight, and adoption 15. Weights total 100. Each criterion receives an integer score from 1 to 5, localized evidence, rationale, and low, medium, or high confidence. Weighted score is the sum of score×weight divided by 5, preserving a 20 to 100 scale. Vision seal review scores 5,4,4,4,4, producing (5×20 + 4×25 + 4×20 + 4×20 + 4×15)/5 = 84. The calculation is reproducible, but 84 does not mean an 84 percent chance of success. It is a priority index under a rubric. Confidence shows evidence strength. A score of 5 with low confidence calls for discovery rather than enthusiasm. Evidence points to an observable artifact, such as three reconciled months of scrap or an adjudicated sample; rationale explains why it supports the score and which gaps remain.`
    ),
    t(
      `Gli hard gate non vengono compensati dal punteggio. La scheda ne usa tre. Primo, azione e owner devono essere definiti: un insight senza decision rights è una demo. Secondo, dati rappresentativi e affidabili devono sostenere la popolazione: volume elevato con label scorrette non passa. Terzo, il confine di autorità deve restare controllato: un modello non ottiene decision rights perché ha score alto. Ogni candidato riporta passed boolean, evidence e rationale per ogni gate. Il caso PdM ha valore elevato ma fallisce representative trustworthy data perché soltanto nove label verificate non coprono modalità e interventi; viene rinviato a 67. Il caso GenAI per soglia viene rifiutato a 46 e fallisce il confine deterministico proposto, che lasciava a testo variabile un’istruzione operativa; soprattutto, una regola deterministica risolve meglio il problema. Il caso forecasting passa ed entra in pilot a 77. Il caso vision passa tutti i gate e viene selezionato a 84. Il ranking si applica quindi soltanto tra candidati eleggibili e non sostituisce la decisione. Un caso d’uso con score 95 può essere rifiutato se manca una precondizione non negoziabile. Viceversa uno score medio può finanziare un discovery mirato, purché il next gate sia definito. Questo evita che un totale nasconda rischio o che un gate diventi un’opinione non documentata.`,
      `Hard gates cannot be offset by score. The sheet uses three. First, action and owner must be defined because insight without decision rights is a demo. Second, representative trustworthy data must support the population; high volume with wrong labels does not pass. Third, the authority boundary must remain controlled; a model does not gain decision rights from a high score. Each candidate records a Boolean result, evidence, and rationale for every gate. The PdM candidate has high value but fails representative trustworthy data because only nine verified labels do not cover modes and interventions; it is deferred with 67. The GenAI threshold candidate is rejected with 46 and fails the proposed deterministic boundary, which left an operating instruction to variable text; more fundamentally, a deterministic rule solves the problem better. Forecasting passes and enters a pilot at 77. Vision passes all gates and is selected at 84. Ranking therefore applies only among eligible candidates and does not replace judgment. A use case scoring 95 can be rejected when a non-negotiable prerequisite is missing. Conversely, a medium score can fund targeted discovery if the next gate is defined. This keeps totals from hiding risk and gates from becoming undocumented opinion.`
    ),
    t(
      `La decisione di portafoglio usa categorie operative: selezionare finanzia un esperimento controllato; avviare un pilot autorizza perimetro, durata e KPI limitati; rinviare finanzia la chiusura dei gap e una data di riesame; rifiutare interrompe il lavoro e ne registra la ragione; ritirare termina un servizio che non crea più valore. Ogni decisione ha owner, budget boundary, dependency, target, guardrail, stop criterion e review date. Per PdM il deliverable successivo non è un modello: è la riconciliazione di almeno quaranta failure event, sensor lineage e shadow baseline. Per vision è un shadow pilot su segmenti approvati con audit dei non referral. Per forecasting è un rolling-origin backtest e decision log. Per GenAI threshold è l'implementazione della regola con status, isteresi e audit. In questo modo il portafoglio finanzia riduzione dell'incertezza, non soltanto sviluppo. Si considera anche correlazione tra candidati: due casi d’uso possono dipendere dallo stesso master data o competere per la stessa review capacity. Una capability comune, come product identity o label workflow, può avere più valore di tre pilot isolati. I rischi di concentrazione, vendor lock-in, capacità OT e change saturation entrano nella sequenza. Il risultato non è una classifica statica. È un’allocazione di opzioni con gate, in cui evidenza nuova può promuovere, rinviare o terminare.`,
      `Portfolio decisions have defined actions. Selection funds a controlled experiment; a pilot authorizes limited scope, duration, and KPIs; deferral funds gap closure and a review date; rejection stops work and records why; retirement ends a service that no longer creates value. Each decision has an owner, budget boundary, dependency, target, guardrail, stop criterion, and review date. For PdM, the next deliverable is not a model. It is reconciliation of at least forty failure events, sensor lineage, and a shadow baseline. For vision, it is a shadow pilot on approved segments with non-referral audits. Forecasting requires rolling-origin backtesting and a decision log. The GenAI threshold proposal becomes a rule with status, hysteresis, and audit. The portfolio therefore funds uncertainty reduction, not just development. Candidate dependencies also matter. Two use cases may rely on the same master data or compete for review capacity. A shared capability such as product identity or label workflow may create more value than three isolated pilots. Concentration risk, vendor lock-in, OT capacity, and change saturation affect sequencing. The result is not a static ranking. It is an allocation of options with gates, where new evidence can promote, defer, or terminate work.`
    ),
    t(
      `Auditabilità richiede snapshot e decision log. La scheda conserva versione della rubric, pesi, data, partecipanti, evidenza referenziata, assunzioni, score, confidence, gate, dissent e approvazione. Non si riscrive il punteggio passato quando arriva informazione nuova: si crea una nuova review e si spiega la variazione. Un assessor indipendente deve poter ricalcolare 84 dai cinque valori e trovare il documento dietro ogni evidence statement. Sensitivity analysis modifica pesi e score plausibili per vedere se la scelta è stabile. Se vision resta prima in molte combinazioni, la decisione è robusta; se un punto cambia ranking, serve più evidence. Si previene gaming richiedendo criteri comportamentali: score 5 per label readiness non significa "molti esempi", ma policy approvata, agreement misurato, casi incerti, coverage e lineage. Il workshop include Operations, Quality, Maintenance, Data, OT, IT, Security e Finance secondo il caso, con un decision owner finale. Il facilitatore separa fatto, assunzione e preferenza. La review conserva inoltre le ragioni del dissenso e assegna chi deve chiuderlo. La risposta da colloquio diventa concreta: "Ho selezionato vision a 84 dopo hard gate, rinviato PdM malgrado valore alto perché mancavano label e rifiutato GenAI perché una regola era più adeguata". Questa frase dimostra capacità tecnica, economica e di governance con un unico artefatto verificabile.`,
      `Auditability requires snapshots and a decision log. The sheet preserves rubric version, weights, date, participants, referenced evidence, assumptions, scores, confidence, gates, dissent, and approval. Do not rewrite old scores when new information arrives. Create a new review and explain the change. An independent assessor should recalculate 84 from five values and find the document behind each evidence statement. Sensitivity analysis changes plausible weights and scores to test decision stability. If vision remains first across many combinations, selection is robust; if one point changes ranking, more evidence is needed. Prevent gaming with behavioral anchors. A 5 for label readiness does not mean "many examples." It means an approved policy, measured agreement, uncertain-case treatment, coverage, and lineage. The workshop includes Operations, Quality, Maintenance, Data, OT, IT, Security, and Finance as relevant, with one final decision owner. The facilitator separates facts, assumptions, and preferences. The review also retains reasons for dissent and assigns an owner to close it. An interview response becomes concrete: "I selected vision at 84 after hard gates, deferred PdM despite high value because labels were missing, and rejected GenAI because a rule was more suitable." That statement demonstrates technical, economic, and governance capability through one verifiable artifact.`
    )
  ],
  terminology: [
    t('Hard gate: precondizione non compensabile da un punteggio alto.', 'Hard gate: a prerequisite that a high score cannot offset.'),
    t('Confidence: forza dell’evidenza a supporto dello score, non probabilità di successo.', 'Confidence: strength of evidence supporting a score, not probability of success.'),
    t('Portfolio decision: azione finanziata con gate, owner e criterio di riesame.', 'Portfolio decision: funded action with gate, owner, and review criterion.')
  ],
  microExamples: [microExample(
    'PdM rinviata nonostante il valore',
    'PdM deferred despite value',
    'Il candidato ha score valore 5 ma fallisce il gate dati con nove label: il portafoglio finanzia prima lineage e failure coding.',
    'The candidate has value score 5 but fails the data gate with nine labels. The portfolio first funds lineage and failure coding.'
  )],
  caseSegments: [caseSegment(
    'scorecard-gate-over-score', 2,
    'Il gate prevale sul totale', 'Gate overrides total score',
    'La scheda mostra PdM a 67 con gate dati fallito: chi studia osserva perché la decisione resta rinviata anche con valore alto.',
    'The sheet shows PdM at 67 with a failed data gate, so the learner sees why the decision remains deferred despite high value.'
  )],
  activities: [
    {
      id: 'score-and-defend-use-case-portfolio',
      prompt: t(
        'PdM ha score 67 ma fallisce il gate dati: scegli la portfolio decision.',
        'PdM scores 67 but fails the data gate: choose the portfolio decision.'
      ),
      expectedArtifact: t(
        'Una decisione con una ragione.',
        'One decision with one reason.'
      ),
      durationMinutes: 2,
      quickTask: quickTask(1, 0, 'Score 67, nove label verificate e gate dati failed.', 'Score 67, nine verified labels, and failed data gate.', 'Decisione più una frase.', 'Decision plus one sentence.'),
      hints: [
        t(
          'Ricalcola score×peso/5 e non classificare un candidato che fallisce un gate come selezionato.',
          'Recalculate score×weight/5 and do not select a candidate that fails a gate.'
        )
      ],
      modelSolution: t(
        'Rinviare: il punteggio 67 non compensa il gate dati fallito; prima servono label e lineage rappresentativi.',
        'Decision: to defer. The score of 67 cannot offset the failed data gate; representative labels and lineage are required first.'
      ),
      rubric: [
        t('Sceglie di rinviare senza compensare il gate fallito con lo score.', 'Chooses to defer without offsetting the failed gate with the score.')
      ],
      solutionArtifact: dataReadinessUseCaseArtifact
    }
  ],
  artifact: dataReadinessUseCaseArtifact,
  checkpoint: checkpoint(
    'Un candidato ha score 91 ma fallisce il gate di dati rappresentativi. Qual è la decisione corretta?',
    'A candidate scores 91 but fails the representative-data gate. What is the correct decision?',
    [
      ['Selezionarlo perché supera 90.', 'Select it because it exceeds 90.', 'Lo score non compensa una precondizione hard.', 'Score cannot offset a hard prerequisite.'],
      ['Rinviarlo o rifiutarlo e finanziare evidence specifica prima del riesame.', 'Defer or reject it and fund specific evidence before review.', 'La decisione conserva il gate e definisce come ridurre l’incertezza.', 'This preserves the gate and defines how uncertainty will be reduced.'],
      ['Aumentare il peso del valore finché passa.', 'Increase the value weight until it passes.', 'Cambiare pesi dopo i risultati è gaming.', 'Changing weights after seeing results is gaming.']
    ],
    1
  ),
  sourceIds: ['nist-ai-rmf-1-0', 'nist-condition-monitoring-maintenance', 'nist-manufacturing-kpi-procedure', 'pmi-operations']
}

const interviewAnswers = [
  {
    prompt: t(
      'Come scegli il metodo analitico più semplice adeguato?',
      'How do you choose the simplest adequate analytical method?'
    ),
    short: t(
      `Parto dalla decisione: attore, momento, alternative, evidenza, lead time e conseguenza. Costruisco una baseline trasparente e salgo dalla regola agli analytics, al ML, all’ottimizzazione o a GenAI soltanto se il gradino precedente non soddisfa i requisiti. Confronto i candidati sulla stessa popolazione usando valore, errore, latenza, audit, fallback e costo operativo. La complessità deve conquistare il proprio posto con evidenza prospettica.`,
      `I start from the decision: actor, moment, alternatives, evidence, lead time, and consequence. I establish a transparent baseline and move from rules to analytics, ML, optimization, or GenAI only when the earlier rung cannot meet the requirements. I compare candidates on the same population using value, error, latency, auditability, fallback, and operating cost. Complexity has to earn its place through prospective evidence.`
    ),
    long: t(
      `Uso una decision ladder, non una technology shortlist. Prima riscrivo il problema in termini operativi: chi decide che cosa, quando, su quale oggetto, con quali alternative e quale conseguenza. Definisco baseline, frequenza, lead time utile, errore tollerabile, decision rights e fallback. Poi verifico il gradino minimo. Una relazione stabile con limite approvato richiede una regola deterministica. Una domanda su dove si concentra la perdita richiede dati coerenti e analytics descrittivi o diagnostici. Pattern multivariati che anticipano un outcome verificabile possono giustificare ML. La scelta di un piano sotto vincoli appartiene all’ottimizzazione. GenAI è appropriata quando il valore deriva da contenuto non strutturato e posso controllare corpus, citazioni, accesso e verifica. Ogni candidato compete con una baseline sulla stessa finestra e popolazione. Misuro non soltanto accuracy, ma costi FP e FN, capacità della coda, latency, availability, impatto, adoption e failure mode. Nel caso downtime, sette eventi da 42 minuti a 3.600 euro l'ora valgono 17.640 euro; un’ipotesi onesta del 40 per cento produce 7.056 euro lordi, da cui sottraggo il costo della soluzione e delle azioni non necessarie. Registro alternative scartate, confidence ed exit criterion. Se una regola non basta perché genera troppi falsi allarmi multivariati, raccolgo label rappresentative e riapro ML. Questo approccio produce soluzioni più semplici da verificare, operare e scalare e rende un no motivato una decisione di valore.`,
      `I use a decision ladder rather than a technology shortlist. First I rewrite the problem operationally: who decides what, when, about which object, with what alternatives, and with what consequence. I define the baseline, frequency, useful lead time, tolerated error, decision rights, and fallback. Then I test the minimum rung. A stable relationship with an approved limit calls for a deterministic rule. A question about where loss concentrates calls for coherent data and descriptive or diagnostic analytics. Multivariate patterns anticipating a verifiable outcome may justify ML. Selecting a plan under constraints belongs to optimization. GenAI fits when value comes from unstructured content and I can control corpus, citations, access, and verification. Every candidate competes with a baseline on the same window and population. I measure not just accuracy but FP and FN cost, queue capacity, latency, availability, impact, adoption, and failure modes. In the downtime example, seven 42-minute events at EUR 3,600 per hour cost EUR 17,640. An honest 40 percent avoidable hypothesis gives EUR 7,056 gross, from which I subtract the solution and unnecessary-action costs. I record rejected alternatives, confidence, and exit criteria. If a rule fails because a genuinely multivariate relationship creates excessive false alarms, I gather representative labels and reopen ML. This produces solutions that are easier to verify, operate, and scale, and makes a justified no a valuable decision.`
    ),
    followUps: [
      t('Come dimostri che un modello batte la baseline?', 'How do you show that a model beats the baseline?'),
      t('Quale complessità totale includi nel confronto?', 'Which total complexity do you include in the comparison?')
    ]
  },
  {
    prompt: t(
      'Quando rifiuteresti GenAI a favore di regole o analytics classici?',
      'When would you reject generative AI in favor of rules or classical analytics?'
    ),
    short: t(
      `Rifiuto GenAI quando il requisito è una soglia deterministica, un calcolo riproducibile, un’aggregazione, una transazione con schema o una decisione che richiede output limitato e verificabile. Per un limite temperatura uso regola, status sensore, isteresi e audit; per le principali perdite uso query e Pareto. GenAI aggiungerebbe variabilità senza informazione. La considero per testo non strutturato, mantenendo citazioni, accesso, verifica e autorità deterministica.`,
      `I reject GenAI when the requirement is a deterministic threshold, reproducible calculation, aggregation, schema-bound transaction, or a decision needing bounded verifiable output. For a temperature limit I use a rule with sensor state, hysteresis, and audit; for major losses I use queries and Pareto analysis. GenAI would add variability without information. I consider it for unstructured text while retaining citations, access controls, verification, and deterministic authority.`
    ),
    long: t(
      `Rifiuterei GenAI ogni volta che il problema ha una specifica deterministica o una struttura che strumenti classici rappresentano meglio. Un limite temperatura approvato non richiede comprensione linguistica: una regola locale può validare sensor status, applicare isteresi, registrare evento e attivare fallback con comportamento prevedibile. Un report di perdita richiede reason code, denominatori e aggregazioni coerenti; SQL, controllo statistico e Pareto sono più riproducibili. Un piano con capacità e qualifica è un problema di ottimizzazione. Una transazione come creare un work order richiede schema validation, autorizzazione e idempotenza, anche se un modello può aiutare a estrarre una descrizione. In tutti questi casi un LLM aggiunge non determinismo, latency, prompt e model version, evaluation burden e rischio di risposta plausibile ma errata. La buona data readiness non obbliga a usare AI: spesso rende possibile una regola migliore. Considero GenAI quando il valore è realmente linguistico, per esempio cercare e sintetizzare manuali controllati o strutturare note libere. Anche allora separo retrieval, generazione, evidenza, approval e tool execution. Il modello non decide un limite, non rilascia prodotto e non sostituisce il system of record. Nel portafoglio didattico ho rifiutato il candidato GenAI per una soglia con score 46 e ho raccomandato una regola con audit. Registro la ragione e la condizione di riesame. Questa scelta protegge affidabilità e fiducia e dimostra che seleziono tecnologia per fit, non per moda.`,
      `I reject GenAI whenever a problem has a deterministic specification or a structure represented better by conventional tools. An approved temperature limit needs no language understanding. A local rule can validate sensor status, apply hysteresis, record the event, and trigger fallback predictably. A loss report needs reason codes, denominators, and consistent aggregation; SQL, statistical control, and Pareto analysis are more reproducible. A plan with capacity and qualification is an optimization problem. A transaction such as creating a work order requires schema validation, authorization, and idempotency, even if a model helps extract a description. In these cases an LLM adds nondeterminism, latency, prompt and model versions, evaluation burden, and risk of plausible but wrong output. Good data readiness does not require AI. It often enables a better rule. I consider GenAI when value is genuinely linguistic, such as searching and summarizing controlled manuals or structuring free text. Even then I separate retrieval, generation, evidence, approval, and tool execution. The model does not set a limit, release product, or replace the system of record. In the teaching portfolio, I rejected the GenAI threshold candidate scoring 46 and recommended an audited rule. I record the reason and reconsideration condition. That protects reliability and trust and shows that I select technology for fit rather than fashion.`
    ),
    followUps: [
      t('Quale parte di un work order potrebbe usare GenAI?', 'Which part of a work order could use GenAI?'),
      t('Come comunichi un rifiuto a uno sponsor entusiasta?', 'How do you communicate a rejection to an enthusiastic sponsor?')
    ]
  },
  {
    prompt: t(
      'Che cosa deve essere pronto prima di promettere predictive maintenance?',
      'What must be ready before you promise predictive maintenance?'
    ),
    short: t(
      `Prima di promettere PdM richiedo una failure mode specifica, una maintenance policy azionabile, lead time utile, physical asset identity, segnali contestualizzati, work order riconciliati, label confermate e una popolazione rappresentativa. Definisco baseline, split temporale, costi di false alert e miss, capacità, owner, shadow test e fallback. Se questi gate non passano, rinvio il modello e finanzio data readiness. Anni di dati non sostituiscono ground truth e workflow.`,
      `Before promising PdM, I require a specific failure mode, an actionable maintenance policy, useful lead time, physical asset identity, contextualized signals, reconciled work orders, confirmed labels, and a representative population. I define the baseline, temporal split, false-alert and miss costs, capacity, owners, shadow test, and fallback. If those gates fail, I defer the model and fund data readiness. Years of data do not replace ground truth and workflow.`
    ),
    long: t(
      `Tratto predictive maintenance come un sistema decisionale, non come un acquisto di algoritmo. Il primo gate è failure mode e azione: Reliability deve distinguere il meccanismo, sapere quale evidenza lo conferma e definire che cosa farebbe con 36 ore di anticipo. Il secondo è data readiness: physical instance, posizione sensore, sampling, unità, status, operating mode, timestamp e maintenance history devono essere collegabili. I work order separano sintomo, diagnosi, intervento e causa confermata. Label e negativi devono essere affidabili, considerando interventi preventivi e periodi offline. Il terzo gate è evaluation: split per tempo o asset, feature disponibili al prediction time, baseline di regola o trend, minimum sample, recall, false alert per asset-settimana, calibration e lead-time distribution. Il quarto è valore e capacità: costo downtime, costo di ispezioni e finestre non necessarie, ricambi, backlog e disponibilità di tecnici. Il quinto è controlled deployment: shadow mode prospettico, advisory, autorizzazione umana, audit, stop criteria, rollback e fallback alle regole esistenti. Il modello non scrive al PLC e non bypassa interlock. Nella nostra scorecard il candidato bearing vale molto ma ottiene 67 e fallisce il gate dati perché ha soltanto nove label verificate e sensori ricollocati. La decisione corretta è rinviare: raccogliere almeno quaranta eventi riconciliati, completare lineage e misurare una baseline. Prometto un processo di evidence generation e gate, non una percentuale di downtime prima di avere prova prospettica.`,
      `I treat predictive maintenance as a decision system rather than an algorithm purchase. The first gate is failure mode and action. Reliability must distinguish the mechanism, know what evidence confirms it, and define what it would do with 36 hours of notice. The second is data readiness. Physical instance, sensor location, sampling, unit, status, operating mode, timestamps, and maintenance history must link correctly. Work orders separate symptom, diagnosis, intervention, and confirmed cause. Labels and negatives must be trustworthy, accounting for preventive interventions and offline periods. The third gate is evaluation: time-based or asset-based splits, features available at prediction time, a rule or trend baseline, minimum sample, recall, false alerts per asset-week, calibration, and lead-time distribution. The fourth is value and capacity: downtime cost, unnecessary inspections and windows, spares, backlog, and technician availability. The fifth is controlled deployment: prospective shadow mode, advisory use, human authorization, audit, stop criteria, rollback, and fallback to existing rules. The model does not write to a PLC or bypass an interlock. In our scorecard, the bearing candidate has high value but scores 67 and fails the data gate because it has only nine verified labels and relocated sensors. The correct decision is to defer: collect at least forty reconciled events, complete lineage, and measure a baseline. I promise an evidence-generation and gate process, not a downtime percentage before prospective proof.`
    ),
    followUps: [
      t('Quale label policy useresti per i work order?', 'Which label policy would you use for work orders?'),
      t('Come valuteresti il lead time utile?', 'How would you evaluate useful lead time?')
    ]
  }
]

export const dataAiLesson = {
  id: 'data-ai-use-cases',
  slug: 'data-ai-use-cases',
  moduleNumber: 3,
  title: t(
    'Dati, analytics e casi d’uso AI',
    'Data, analytics, and AI use cases'
  ),
  subtitle: t(
    'Selezionare il metodo minimo, dimostrare readiness e collegare metriche a decisioni industriali controllate.',
    'Select the minimum method, demonstrate readiness, and connect metrics with controlled industrial decisions.'
  ),
  durationMinutes: 65,
  timeBudget: { theory: 31, cases: 20, practice: 14 },
  level: t('Technical Lead', 'Technical Lead'),
  outcomes: [
    t('Scegliere tra regole, analytics, ML, ottimizzazione e GenAI.', 'Choose among rules, analytics, ML, optimization, and GenAI.'),
    t('Valutare semantica, lineage, label e ownership prima del modello.', 'Assess semantics, lineage, labels, and ownership before modeling.'),
    t('Calcolare precision, recall, error cost e uncertainty.', 'Calculate precision, recall, error cost, and uncertainty.'),
    t('Governare PdM, vision e forecast come sistemi decisionali.', 'Govern PdM, vision, and forecasting as decision systems.'),
    t('Difendere un portafoglio con score, evidence, confidence e hard gate.', 'Defend a portfolio using scores, evidence, confidence, and hard gates.')
  ],
  methodSelectionLadder,
  workedExamples,
  dataReadinessUseCaseArtifact,
  artifact: dataReadinessUseCaseArtifact,
  units: [unitOne, unitTwo, unitThree, unitFour, unitFive, unitSix, unitSeven],
  interviewAnswers,
  finalQuiz: [
    checkpoint(
      'Quando è giustificato passare da una regola a un modello predittivo?',
      'When is moving from a rule to a predictive model justified?',
      [
        ['Quando un pattern multivariato verificabile supera la baseline e abilita un’azione.', 'When a verifiable multivariate pattern beats baseline and enables action.', 'Complessità, evidenza e decisione sono collegate.', 'Complexity, evidence, and decision are connected.'],
        ['Quando il vendor usa la parola AI.', 'When the vendor uses the word AI.', 'Un’etichetta commerciale non dimostra fit o valore.', 'A commercial label does not demonstrate fit or value.'],
        ['Quando ci sono molti dati senza label.', 'When there is a lot of unlabeled data.', 'Volume senza ground truth non prova readiness predittiva.', 'Volume without ground truth does not show predictive readiness.']
      ],
      0
    ),
    checkpoint(
      'Con TP 72, FP 18 e FN 8, quali sono precision e recall?',
      'With TP 72, FP 18, and FN 8, what are precision and recall?',
      [
        ['Precision 80 per cento e recall 90 per cento.', 'Precision 80 percent and recall 90 percent.', '72/90 e 72/80 usano i denominatori corretti.', '72/90 and 72/80 use the correct denominators.'],
        ['Precision 90 per cento e recall 80 per cento.', 'Precision 90 percent and recall 80 percent.', 'I denominatori sono invertiti.', 'The denominators are reversed.'],
        ['Entrambe 97,4 per cento.', 'Both are 97.4 percent.', 'Questo confonde le misure con accuracy.', 'This confuses the measures with accuracy.']
      ],
      0
    ),
    checkpoint(
      'Che cosa accade a un candidato con score alto che fallisce un hard gate?',
      'What happens to a high-scoring candidate that fails a hard gate?',
      [
        ['Viene selezionato perché la media compensa.', 'It is selected because the average offsets the failure.', 'Un hard gate è per definizione non compensabile.', 'A hard gate is non-compensable by definition.'],
        ['Viene rinviato o rifiutato finché evidence specifica non chiude il gap.', 'It is deferred or rejected until specific evidence closes the gap.', 'La decisione protegge la precondizione e finanzia apprendimento mirato.', 'The decision protects the prerequisite and funds targeted learning.'],
        ['Si nasconde il gate dal report.', 'The gate is hidden from the report.', 'Questo elimina auditabilità e governance.', 'That removes auditability and governance.']
      ],
      1
    )
  ]
}

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
    'Usa soltanto i dati forniti e dichiara il confine della decisione.',
    'Use only the supplied data and state the decision boundary.'
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

export const mvpExperimentCanvas = {
  id: 'quality-assistant-experiment-canvas',
  title: t('Canvas di esperimento MVP', 'MVP experiment canvas'),
  description: t(
    'Definisce decisione supportata, assunzione più rischiosa, baseline misurata, criteri di successo con hard gate, stop criteria, owner, approvatore, dissenso registrato e data di revisione.',
    'Defines the supported decision, riskiest assumption, measured baseline, success criteria with hard gates, stop criteria, owner, approver, recorded dissent, and review date.'
  ),
  problem: t(
    'Gli ispettori di qualità impiegano troppo tempo a trovare il criterio di accettazione corretto e la deviazione applicabile, e il tempo cresce quando la revisione della specifica cambia.',
    'Quality inspectors spend too long finding the correct acceptance criterion and the applicable deviation, and the time grows whenever the specification revision changes.'
  ),
  decisionSupported: t(
    'Aiutare un ispettore autorizzato a decidere se un lotto rientra nei criteri approvati, senza sostituire la firma di rilascio.',
    'Help an authorized inspector decide whether a batch meets approved criteria, without replacing the release signature.'
  ),
  riskiestAssumption: t(
    'Assumiamo che i criteri di accettazione siano già scritti in modo abbastanza strutturato e versionato da poter essere recuperati con precisione sufficiente; se non lo sono, nessun modello migliora la decisione.',
    'We assume acceptance criteria are already written in a structured and versioned enough way to be retrieved accurately; if they are not, no model improves the decision.'
  ),
  hypothesis: t(
    'Se un assistente recupera soltanto la revisione effettiva e cita il criterio applicabile, allora il tempo per raggiungere la fonte corretta scende sotto sei minuti senza aumentare i difetti sfuggiti.',
    'If an assistant retrieves only the effective revision and cites the applicable criterion, then time to reach the correct source drops below six minutes without increasing escaped defects.'
  ),
  baseline: {
    metric: t('Tempo mediano per raggiungere il criterio corretto', 'Median time to reach the correct criterion'),
    value: 12,
    unit: t('minuti', 'minutes'),
    window: t('Quattro settimane, due turni, linea di confezionamento', 'Four weeks, two shifts, packing line'),
    measuredAt: '2026-07-06',
    evidenceRef: 'BL-QA-2026-014'
  },
  successCriteria: [
    {
      id: 'time-to-correct-source',
      metric: t('Tempo mediano per raggiungere il criterio corretto', 'Median time to reach the correct criterion'),
      unit: t('minuti', 'minutes'),
      baselineValue: 12,
      targetValue: 6,
      direction: 'decrease',
      hardGate: false,
      measurement: t(
        'Cronometraggio osservato su venti richieste campionate per turno, senza autodichiarazione.',
        'Observed timing on twenty sampled requests per shift, with no self-reporting.'
      )
    },
    {
      id: 'escaped-defects',
      metric: t('Difetti sfuggiti per milione di unità', 'Escaped defects per million units'),
      unit: t('difetti per milione', 'defects per million'),
      baselineValue: 420,
      targetValue: 300,
      direction: 'decrease',
      hardGate: false,
      measurement: t(
        'Reclami e controlli a valle riconciliati con il lotto di origine.',
        'Complaints and downstream checks reconciled with the originating batch.'
      )
    },
    {
      id: 'unauthorized-disclosure',
      metric: t('Esposizioni di contenuto non autorizzato sul gate set', 'Unauthorized content exposures on the gate set'),
      unit: t('eventi', 'events'),
      baselineValue: 3,
      targetValue: 0,
      direction: 'decrease',
      hardGate: true,
      measurement: t(
        'Gate set con richieste autorizzate e non autorizzate, adjudicato da Document Control.',
        'Gate set with authorized and unauthorized requests, adjudicated by Document Control.'
      )
    },
    {
      id: 'safety-related-deviations',
      metric: t('Deviazioni con impatto su sicurezza attribuite al percorso assistito', 'Safety-relevant deviations attributed to the assisted path'),
      unit: t('eventi', 'events'),
      baselineValue: 2,
      targetValue: 0,
      direction: 'decrease',
      hardGate: true,
      measurement: t(
        'Revisione congiunta di Quality e HSE su tutte le deviazioni del periodo.',
        'Joint Quality and HSE review of every deviation in the period.'
      )
    },
    {
      id: 'review-coverage',
      metric: t('Copertura della revisione umana sulle segnalazioni', 'Human review coverage of flagged items'),
      unit: t('percentuale', 'percent'),
      baselineValue: 62,
      targetValue: 85,
      direction: 'increase',
      hardGate: false,
      measurement: t(
        'Rapporto tra segnalazioni riviste entro il turno e segnalazioni totali.',
        'Ratio of items reviewed within the shift to total flagged items.'
      )
    }
  ],
  inScope: [
    t('Linea di confezionamento PKG-04 del sito RM1.', 'Packing line PKG-04 at site RM1.'),
    t('Criteri di accettazione visivi e dimensionali già approvati.', 'Already approved visual and dimensional acceptance criteria.'),
    t('Sola lettura sul repository documentale controllato.', 'Read-only access to the controlled document repository.')
  ],
  outOfScope: [
    t('Rilascio automatico del lotto e firma elettronica.', 'Automatic batch release and electronic signature.'),
    t('Scrittura diretta su MES o su sistemi di controllo.', 'Direct writes to MES or control systems.'),
    t('Estensione ad altri siti prima della decisione di scaling.', 'Extension to other sites before the scaling decision.')
  ],
  durationWeeks: 6,
  sampleSize: 1200,
  owner: 'quality-process-owner',
  approver: 'plant-quality-head',
  dissent: t(
    'OT Security ha registrato un dissenso formale sulla connessione diretta al repository e ha chiesto un proxy di sola lettura in DMZ prima di qualunque estensione.',
    'OT Security recorded a formal dissent about the direct repository connection and requested a read-only DMZ proxy before any extension.'
  ),
  guardrails: [
    t('Nessuna risposta senza citazione recuperabile e revisione effettiva.', 'No answer without a retrievable citation and an effective revision.'),
    t('Nessun accesso a documenti fuori dal perimetro autorizzato dell’ispettore.', 'No access to documents outside the inspector authorized perimeter.'),
    t('Il modello propone, la persona autorizzata decide e firma.', 'The model proposes; the authorized person decides and signs.')
  ],
  stopCriteria: [
    t('Una sola esposizione non autorizzata sul gate set sospende immediatamente il test.', 'One unauthorized exposure on the gate set immediately suspends the test.'),
    t('Due deviazioni con impatto su sicurezza attribuite al percorso assistito.', 'Two safety-relevant deviations attributed to the assisted path.'),
    t('Coda di revisione oltre la capacità del turno per tre turni consecutivi.', 'Review queue above shift capacity for three consecutive shifts.')
  ],
  reviewDate: '2026-09-14'
}

export const riskRegister = {
  id: 'quality-assistant-risk-register',
  title: t('Registro dei rischi del pilota', 'Pilot risk register'),
  description: t(
    'Ogni riga dichiara probabilità e impatto su scala uno-cinque, punteggio inerente derivato, controlli, punteggio residuo derivato, owner, evidenza e scadenza. La tolleranza è un cancello, non una media.',
    'Each row declares likelihood and impact on a one-to-five scale, a derived inherent score, controls, a derived residual score, owner, evidence, and due date. Tolerance is a gate, not an average.'
  ),
  scale: t('Probabilità e impatto da 1 a 5; punteggio uguale al prodotto.', 'Likelihood and impact from 1 to 5; score equals the product.'),
  tolerance: 6,
  toleranceRule: t(
    'Nessun rischio residuo superiore a 6 può restare aperto quando il pilota passa da shadow ad advisory.',
    'No residual risk above 6 may remain open when the pilot moves from shadow to advisory.'
  ),
  rows: [
    {
      id: 'r-01-document-prompt-injection',
      category: t('Sicurezza GenAI', 'GenAI security'),
      description: t(
        'Un documento caricato contiene istruzioni nascoste che tentano di far ignorare i limiti di citazione o di far esporre altri documenti.',
        'An ingested document contains hidden instructions attempting to bypass citation limits or expose other documents.'
      ),
      likelihood: 4,
      impact: 5,
      inherentScore: 20,
      controls: [
        t('Trattare il contenuto recuperato come dato, mai come istruzione.', 'Treat retrieved content as data, never as instruction.'),
        t('Filtrare e normalizzare il testo estratto prima dell’indicizzazione.', 'Filter and normalize extracted text before indexing.'),
        t('Verificare che ogni claim sia sostenuto dai passaggi autorizzati.', 'Verify that every claim is supported by authorized passages.')
      ],
      residualLikelihood: 2,
      residualImpact: 5,
      residualScore: 10,
      owner: 'ai-product-lead',
      evidenceRef: 'GATE-INJ-2026-007',
      dueDate: '2026-08-28',
      status: 'open'
    },
    {
      id: 'r-02-cross-site-data-leakage',
      category: t('Riservatezza', 'Confidentiality'),
      description: t(
        'Un ispettore di un sito riceve criteri o deviazioni appartenenti a un altro sito o a un contratto riservato.',
        'An inspector at one site receives criteria or deviations belonging to another site or a confidential contract.'
      ),
      likelihood: 3,
      impact: 5,
      inherentScore: 15,
      controls: [
        t('Autorizzazione su identità, ruolo e sito prima del recupero.', 'Authorization on identity, role, and site before retrieval.'),
        t('Etichette di accesso propagate a ogni frammento indicizzato.', 'Access labels propagated to every indexed fragment.')
      ],
      residualLikelihood: 1,
      residualImpact: 5,
      residualScore: 5,
      owner: 'data-steward',
      evidenceRef: 'GATE-ACL-2026-002',
      dueDate: '2026-08-14',
      status: 'mitigated'
    },
    {
      id: 'r-03-tool-misuse-on-cmms',
      category: t('Integrità transazionale', 'Transaction integrity'),
      description: t(
        'Un percorso assistito crea o modifica record operativi senza autorizzazione esplicita o senza chiave di idempotenza.',
        'An assisted path creates or modifies operational records without explicit authorization or an idempotency key.'
      ),
      likelihood: 3,
      impact: 4,
      inherentScore: 12,
      controls: [
        t('Nessuno strumento con effetti collaterali nel perimetro del pilota.', 'No side-effect tool inside the pilot perimeter.'),
        t('Autorizzazione deterministica esterna al modello e chiave di idempotenza obbligatoria.', 'Deterministic authorization outside the model and a mandatory idempotency key.')
      ],
      residualLikelihood: 1,
      residualImpact: 4,
      residualScore: 4,
      owner: 'it-platform-lead',
      evidenceRef: 'ARCH-RO-2026-011',
      dueDate: '2026-08-07',
      status: 'mitigated'
    },
    {
      id: 'r-04-ot-availability-impact',
      category: t('Disponibilità OT', 'OT availability'),
      description: t(
        'Il traffico di integrazione o una raccolta dati non regolata degrada la rete di controllo o un servizio necessario alla linea.',
        'Integration traffic or unthrottled data collection degrades the control network or a service the line depends on.'
      ),
      likelihood: 2,
      impact: 5,
      inherentScore: 10,
      controls: [
        t('Lettura dal historian in zona intermedia, mai dal livello di controllo.', 'Read from the historian in an intermediate zone, never from the control level.'),
        t('Limiti di banda, backpressure e finestra di raccolta concordata con Operations.', 'Bandwidth limits, backpressure, and a collection window agreed with Operations.')
      ],
      residualLikelihood: 1,
      residualImpact: 5,
      residualScore: 5,
      owner: 'ot-security-lead',
      evidenceRef: 'NET-SEG-2026-004',
      dueDate: '2026-08-21',
      status: 'mitigated'
    },
    {
      id: 'r-05-remote-access-abuse',
      category: t('Accesso remoto', 'Remote access'),
      description: t(
        'Un accesso di fornitore resta aperto oltre la finestra approvata e diventa un percorso non sorvegliato verso la zona industriale.',
        'A vendor session stays open beyond the approved window and becomes an unmonitored path into the industrial zone.'
      ),
      likelihood: 3,
      impact: 5,
      inherentScore: 15,
      controls: [
        t('Accesso a tempo, approvato caso per caso e registrato in sessione supervisionata.', 'Time-boxed access, approved case by case, and recorded in a supervised session.'),
        t('Revoca automatica alla chiusura della finestra e revisione mensile degli account.', 'Automatic revocation at window close and monthly account review.')
      ],
      residualLikelihood: 1,
      residualImpact: 5,
      residualScore: 5,
      owner: 'ot-security-lead',
      evidenceRef: 'RA-2026-019',
      dueDate: '2026-08-21',
      status: 'mitigated'
    },
    {
      id: 'r-06-undetected-model-drift',
      category: t('Monitoraggio', 'Monitoring'),
      description: t(
        'La qualità del recupero peggiora dopo una revisione documentale massiva e nessuno se ne accorge prima di un reclamo.',
        'Retrieval quality degrades after a large document revision and nobody notices before a complaint.'
      ),
      likelihood: 4,
      impact: 3,
      inherentScore: 12,
      controls: [
        t('Gate set rieseguito a ogni cambio di corpus, prompt, indice o modello.', 'Gate set rerun on every corpus, prompt, index, or model change.'),
        t('Allarme su tasso di rifiuto, copertura delle citazioni e distribuzione delle richieste.', 'Alerting on refusal rate, citation coverage, and request distribution.')
      ],
      residualLikelihood: 2,
      residualImpact: 3,
      residualScore: 6,
      owner: 'ai-product-lead',
      evidenceRef: 'MON-2026-023',
      dueDate: '2026-09-04',
      status: 'open'
    },
    {
      id: 'r-07-operator-over-reliance',
      category: t('Supervisione umana', 'Human oversight'),
      description: t(
        'Gli ispettori accettano la proposta senza aprire la citazione, e la supervisione diventa formale invece che effettiva.',
        'Inspectors accept the proposal without opening the citation, and oversight becomes formal rather than effective.'
      ),
      likelihood: 4,
      impact: 4,
      inherentScore: 16,
      controls: [
        t('Citazione apribile obbligatoria prima della conferma su casi a rischio alto.', 'Mandatory openable citation before confirmation on high-risk cases.'),
        t('Campionamento indipendente delle conferme e formazione sui limiti dello strumento.', 'Independent sampling of confirmations and training on tool limitations.')
      ],
      residualLikelihood: 3,
      residualImpact: 3,
      residualScore: 9,
      owner: 'quality-process-owner',
      evidenceRef: 'OVS-2026-005',
      dueDate: '2026-09-11',
      status: 'open'
    },
    {
      id: 'r-08-change-without-revalidation',
      category: t('Gestione del cambiamento', 'Change control'),
      description: t(
        'Un aggiornamento di modello, prompt o indice entra in produzione senza rieseguire il gate set e senza record di approvazione.',
        'A model, prompt, or index update reaches production without rerunning the gate set and without an approval record.'
      ),
      likelihood: 3,
      impact: 4,
      inherentScore: 12,
      controls: [
        t('Versionamento congiunto di corpus, indice, prompt e modello.', 'Joint versioning of corpus, index, prompt, and model.'),
        t('Rilascio bloccato finché il gate set non riporta esito completo.', 'Release blocked until the gate set reports a complete result.')
      ],
      residualLikelihood: 1,
      residualImpact: 4,
      residualScore: 4,
      owner: 'it-platform-lead',
      evidenceRef: 'CHG-2026-031',
      dueDate: '2026-08-28',
      status: 'mitigated'
    }
  ],
  blockingRiskIds: ['r-01-document-prompt-injection', 'r-07-operator-over-reliance'],
  decisionRecord: t(
    'Il pilota resta in modalità advisory ristretta finché i due rischi residui sopra tolleranza non scendono a 6 o meno con evidenza datata.',
    'The pilot stays in narrow advisory mode until the two residual risks above tolerance fall to 6 or less with dated evidence.'
  )
}

export const raciMatrix = {
  id: 'quality-assistant-raci',
  title: t('Matrice RACI del percorso assistito', 'Assisted-path RACI matrix'),
  description: t(
    'Ogni attività ha esattamente un ruolo accountable e almeno un ruolo responsible. Il codice trattino indica un ruolo non coinvolto.',
    'Every activity has exactly one accountable role and at least one responsible role. A dash indicates a role that is not involved.'
  ),
  legend: [
    t('R: esegue il lavoro.', 'R: performs the work.'),
    t('A: risponde del risultato e approva.', 'A: answers for the outcome and approves.'),
    t('C: viene consultato prima della decisione.', 'C: is consulted before the decision.'),
    t('I: viene informato dopo la decisione.', 'I: is informed after the decision.')
  ],
  roles: [
    { id: 'quality-process-owner', label: t('Process owner di qualità', 'Quality process owner') },
    { id: 'ai-product-lead', label: t('Responsabile del prodotto AI', 'AI product lead') },
    { id: 'ot-security-lead', label: t('Responsabile sicurezza OT', 'OT security lead') },
    { id: 'it-platform-lead', label: t('Responsabile piattaforma IT', 'IT platform lead') },
    { id: 'data-steward', label: t('Data steward documentale', 'Document data steward') },
    { id: 'plant-manager', label: t('Direttore di stabilimento', 'Plant manager') }
  ],
  activities: [
    {
      id: 'a-01-define-decision-and-baseline',
      name: t('Definire la decisione supportata e misurare la baseline', 'Define the supported decision and measure the baseline'),
      assignments: {
        'quality-process-owner': 'A',
        'ai-product-lead': 'R',
        'ot-security-lead': 'I',
        'it-platform-lead': 'I',
        'data-steward': 'C',
        'plant-manager': 'C'
      }
    },
    {
      id: 'a-02-authorize-data-access',
      name: t('Autorizzare accesso e etichettatura dei documenti', 'Authorize document access and labeling'),
      assignments: {
        'quality-process-owner': 'I',
        'ai-product-lead': 'C',
        'ot-security-lead': 'C',
        'it-platform-lead': 'R',
        'data-steward': 'A',
        'plant-manager': 'I'
      }
    },
    {
      id: 'a-03-run-shadow-evaluation',
      name: t('Eseguire la valutazione in shadow mode', 'Run the shadow-mode evaluation'),
      assignments: {
        'quality-process-owner': 'C',
        'ai-product-lead': 'A',
        'ot-security-lead': 'I',
        'it-platform-lead': 'R',
        'data-steward': 'R',
        'plant-manager': 'I'
      }
    },
    {
      id: 'a-04-approve-ot-integration',
      name: t('Approvare integrazione e segmentazione verso la zona industriale', 'Approve integration and segmentation toward the industrial zone'),
      assignments: {
        'quality-process-owner': 'C',
        'ai-product-lead': 'C',
        'ot-security-lead': 'A',
        'it-platform-lead': 'R',
        'data-steward': 'I',
        'plant-manager': 'I'
      }
    },
    {
      id: 'a-05-accept-or-reject-pilot',
      name: t('Accettare o rifiutare il passaggio ad advisory', 'Accept or reject the move to advisory mode'),
      assignments: {
        'quality-process-owner': 'A',
        'ai-product-lead': 'C',
        'ot-security-lead': 'C',
        'it-platform-lead': 'I',
        'data-steward': 'I',
        'plant-manager': 'R'
      }
    },
    {
      id: 'a-06-operate-monitoring-and-response',
      name: t('Gestire monitoraggio, allarmi e risposta agli incidenti', 'Operate monitoring, alerting, and incident response'),
      assignments: {
        'quality-process-owner': 'I',
        'ai-product-lead': 'R',
        'ot-security-lead': 'R',
        'it-platform-lead': 'A',
        'data-steward': 'C',
        'plant-manager': 'I'
      }
    },
    {
      id: 'a-07-decide-multi-plant-scaling',
      name: t('Decidere il passaggio multi-stabilimento', 'Decide the multi-plant step'),
      assignments: {
        'quality-process-owner': 'R',
        'ai-product-lead': 'C',
        'ot-security-lead': 'C',
        'it-platform-lead': 'C',
        'data-steward': 'I',
        'plant-manager': 'A'
      }
    }
  ]
}

export const scalingGateChecklist = {
  id: 'multi-plant-scaling-gates',
  title: t('Checklist dei cancelli di scaling', 'Scaling gate checklist'),
  description: t(
    'Un cancello bloccante non superato impedisce la raccomandazione di scalare, indipendentemente dai risultati positivi degli altri cancelli.',
    'One unmet blocking gate prevents a recommendation to scale, regardless of positive results on other gates.'
  ),
  gates: [
    {
      id: 'g-01-safety-and-availability',
      name: t('Nessun impatto su sicurezza e disponibilità', 'No safety or availability impact'),
      question: t('Il percorso assistito ha causato deviazioni di sicurezza o fermi di linea?', 'Has the assisted path caused safety deviations or line stoppages?'),
      evidenceRequired: t('Revisione congiunta Quality e HSE su tutte le deviazioni del periodo.', 'Joint Quality and HSE review of all deviations in the period.'),
      threshold: t('Zero deviazioni con impatto su sicurezza attribuite al percorso assistito.', 'Zero safety-relevant deviations attributed to the assisted path.'),
      blocking: true,
      status: 'pass',
      evidenceRef: 'HSE-2026-041'
    },
    {
      id: 'g-02-zero-unauthorized-disclosure',
      name: t('Nessuna esposizione non autorizzata', 'No unauthorized disclosure'),
      question: t('Il gate set di accesso è stato superato senza eccezioni?', 'Was the access gate set passed with no exceptions?'),
      evidenceRequired: t('Gate set con richieste autorizzate e non autorizzate in due lingue.', 'Gate set with authorized and unauthorized requests in two languages.'),
      threshold: t('Zero esposizioni su cento richieste non autorizzate.', 'Zero exposures across one hundred unauthorized requests.'),
      blocking: true,
      status: 'pass',
      evidenceRef: 'GATE-ACL-2026-002'
    },
    {
      id: 'g-03-measured-benefit',
      name: t('Beneficio misurato contro baseline', 'Measured benefit against the baseline'),
      question: t('Il tempo per raggiungere il criterio corretto è sceso in modo stabile?', 'Did time to the correct criterion fall in a stable way?'),
      evidenceRequired: t('Confronto osservato tra baseline e periodo di pilota sulla stessa linea.', 'Observed comparison between baseline and pilot period on the same line.'),
      threshold: t('Mediana pari o inferiore a sei minuti per quattro settimane consecutive.', 'Median at or below six minutes for four consecutive weeks.'),
      blocking: true,
      status: 'pass',
      evidenceRef: 'BEN-2026-017'
    },
    {
      id: 'g-04-effective-human-oversight',
      name: t('Supervisione umana effettiva', 'Effective human oversight'),
      question: t('Gli ispettori aprono davvero la citazione prima di confermare?', 'Do inspectors actually open the citation before confirming?'),
      evidenceRequired: t('Campionamento indipendente delle conferme su casi a rischio alto.', 'Independent sampling of confirmations on high-risk cases.'),
      threshold: t('Almeno il novanta per cento delle conferme a rischio alto con citazione aperta.', 'At least ninety percent of high-risk confirmations with an opened citation.'),
      blocking: true,
      status: 'fail',
      evidenceRef: 'OVS-2026-005'
    },
    {
      id: 'g-05-support-model-and-ownership',
      name: t('Modello di supporto e ownership locale', 'Support model and local ownership'),
      question: t('Ogni sito ricevente ha un owner nominato e una seconda linea di supporto?', 'Does every receiving site have a named owner and a second support line?'),
      evidenceRequired: t('Nomine firmate, orari di copertura e percorso di escalation documentato.', 'Signed appointments, coverage hours, and a documented escalation path.'),
      threshold: t('Owner nominato e copertura su tutti i turni produttivi.', 'Named owner and coverage across all production shifts.'),
      blocking: true,
      status: 'pending',
      evidenceRef: 'SUP-2026-012'
    },
    {
      id: 'g-06-data-and-process-standardization',
      name: t('Standardizzazione di dati e processo', 'Data and process standardization'),
      question: t('I criteri di accettazione hanno la stessa struttura nei siti riceventi?', 'Do acceptance criteria share the same structure at the receiving sites?'),
      evidenceRequired: t('Confronto degli schemi documentali e delle etichette di accesso per sito.', 'Comparison of document schemas and access labels by site.'),
      threshold: t('Campi obbligatori presenti in almeno il novanta per cento dei documenti.', 'Mandatory fields present in at least ninety percent of documents.'),
      blocking: false,
      status: 'fail',
      evidenceRef: 'STD-2026-008'
    },
    {
      id: 'g-07-cost-per-accepted-outcome',
      name: t('Costo per risultato accettato', 'Cost per accepted outcome'),
      question: t('Il costo per risposta accettata resta entro il budget concordato?', 'Does cost per accepted answer stay within the agreed budget?'),
      evidenceRequired: t('Costo totale diviso per risposte accettate dopo revisione.', 'Total cost divided by answers accepted after review.'),
      threshold: t('Entro il budget approvato per il periodo di pilota.', 'Within the approved budget for the pilot period.'),
      blocking: false,
      status: 'pass',
      evidenceRef: 'FIN-2026-026'
    }
  ],
  blockedGateIds: ['g-04-effective-human-oversight', 'g-05-support-model-and-ownership'],
  decision: 'hold',
  decisionRationale: t(
    'Tre cancelli bloccanti sono superati, ma la supervisione umana non è effettiva e il modello di supporto non è ancora firmato: il pilota resta su un sito e la data di riesame è fissata.',
    'Three blocking gates pass, but human oversight is not effective and the support model is not yet signed, so the pilot stays on one site with a fixed review date.'
  ),
  reviewDate: '2026-10-05',
  owner: 'plant-manager'
}

const theoryOne = [
  t(
    `La discovery non inizia da una tecnologia disponibile ma da una perdita operativa osservabile. Un responsabile di trasformazione arriva in reparto con tre domande: quale decisione viene presa qui, chi la prende e con quali informazioni. La risposta raramente coincide con la procedura scritta. Osservare il lavoro reale mostra attese, ricerche, telefonate, fogli paralleli e correzioni che nessun sistema registra. Il metodo giapponese del genchi genbutsu, cioè andare a vedere di persona, esiste proprio perché la descrizione a distanza omette il contesto che genera il problema. In un impianto regolamentato la posta in gioco è più alta: una descrizione incompleta produce un requisito sbagliato, e un requisito sbagliato produce un sistema che nessuno usa. La discovery utile termina con una mappa della decisione, non con un elenco di desideri. Ogni riga della mappa collega un momento decisionale a un input, a un vincolo e a una conseguenza misurabile.`,
    `Discovery does not start from an available technology but from an observable operational loss. A transformation lead walks onto the floor with three questions: which decision is made here, who makes it, and with what information. The answer rarely matches the written procedure. Watching real work reveals waiting, searching, phone calls, parallel spreadsheets, and corrections that no system records. The Japanese practice of genchi genbutsu, going to see for yourself, exists precisely because a remote description omits the context that creates the problem. In a regulated plant the stakes are higher: an incomplete description produces the wrong requirement, and the wrong requirement produces a system nobody uses. Useful discovery ends with a decision map, not a wish list. Every row of that map connects a decision moment to an input, a constraint, and a measurable consequence.`
  ),
  t(
    `La baseline è la fotografia numerica dello stato attuale, presa prima di qualunque intervento. Senza baseline non esiste miglioramento dimostrabile, esistono soltanto opinioni. Una baseline seria dichiara la metrica, la definizione operativa, la finestra di osservazione, la popolazione, il metodo di raccolta e la persona che risponde del dato. Dichiara anche la variabilità: una mediana di dodici minuti con un intervallo tra quattro e trentacinque racconta un problema diverso rispetto a dodici minuti stabili. La normalizzazione conta: confrontare periodi con mix di prodotto diverso senza correggere il denominatore produce guadagni immaginari. Le procedure per costruire indicatori di produzione insistono su questo punto perché un indicatore senza definizione condivisa diventa oggetto di negoziazione invece che di misura. La baseline va concordata con chi la subirà. Se il process owner non firma il numero di partenza, contesterà il numero di arrivo.`,
    `The baseline is the numeric photograph of the current state, taken before any intervention. Without a baseline there is no demonstrable improvement, only opinion. A serious baseline declares the metric, its operational definition, the observation window, the population, the collection method, and the person who answers for the data. It also declares variability: a median of twelve minutes ranging from four to thirty-five describes a different problem than a stable twelve minutes. Normalization matters: comparing periods with different product mix without correcting the denominator produces imaginary gains. Procedures for building production indicators insist on this because an indicator without a shared definition becomes an object of negotiation rather than measurement. The baseline must be agreed with the people it will be applied to. If the process owner does not sign the starting number, they will dispute the ending number.`
  ),
  t(
    `L’assunzione più rischiosa è quella che, se falsa, rende inutile tutto il resto. Non è la più tecnica né la più discussa: è quella con il rapporto più alto tra incertezza e conseguenza. In un assistente documentale l’assunzione più rischiosa raramente riguarda il modello linguistico. Riguarda invece la struttura dei documenti: se i criteri di accettazione sono immagini scansionate senza testo, senza revisione dichiarata e senza ambito di applicazione, nessun recupero è affidabile. In manutenzione predittiva l’assunzione più rischiosa è spesso che gli interventi passati siano codificati con un modo di guasto utilizzabile. Identificarla richiede onestà, perché è la parte del progetto che nessuno vuole guardare. Il test successivo deve attaccare quella assunzione per prima e nel modo più economico possibile. Se il test è costoso quanto il progetto, non è un test: è il progetto travestito da esperimento.`,
    `The riskiest assumption is the one that, if false, makes everything else pointless. It is not the most technical or the most debated: it is the one with the highest ratio of uncertainty to consequence. In a document assistant the riskiest assumption rarely concerns the language model. It concerns document structure: if acceptance criteria are scanned images without text, without a declared revision, and without an application scope, no retrieval is reliable. In predictive maintenance the riskiest assumption is often that past interventions are coded with a usable failure mode. Identifying it takes honesty, because it is the part of the project nobody wants to look at. The next test must attack that assumption first and as cheaply as possible. If the test costs as much as the project, it is not a test: it is the project wearing an experiment costume.`
  ),
  t(
    `Una ipotesi utile è falsificabile e scritta prima dei dati. La forma è semplice: se facciamo questa cosa specifica, allora questa metrica dichiarata si muove di questa quantità entro questa finestra, e lo verificheremo così. Una ipotesi senza soglia non può fallire, e ciò che non può fallire non insegna nulla. La soglia va scelta guardando il valore operativo, non la comodità statistica: se un guadagno di due minuti non cambia il comportamento del turno, il progetto non merita il rischio. Serve anche una controipotesi esplicita: che cosa vedremmo se lo strumento non servisse. Spesso è la stessa metrica che migliora per stagionalità, per effetto Hawthorne o perché nel periodo di prova sono cambiati mix e organico. Dichiarare in anticipo come distingueremo il segnale dall’effetto del contesto è ciò che separa un esperimento da una dimostrazione commerciale.`,
    `A useful hypothesis is falsifiable and written before the data. The form is simple: if we do this specific thing, then this declared metric moves by this amount within this window, and we will verify it this way. A hypothesis without a threshold cannot fail, and what cannot fail teaches nothing. The threshold should follow operational value rather than statistical convenience: if a two-minute gain does not change shift behavior, the project is not worth the risk. An explicit counter-hypothesis is also required: what would we see if the tool were useless. Often the same metric improves through seasonality, the Hawthorne effect, or because product mix and staffing changed during the trial. Declaring in advance how we will separate the signal from context effects is what separates an experiment from a sales demonstration.`
  ),
  t(
    `La discovery si chiude con un canvas di esperimento che chiunque può leggere in due minuti. Contiene problema osservato, decisione supportata, assunzione più rischiosa, ipotesi, baseline con evidenza datata, criteri di successo separati tra soglie desiderabili e cancelli non negoziabili, perimetro incluso ed escluso, durata, dimensione del campione, owner, approvatore, dissenso registrato, guardrail, criteri di arresto e data di riesame. Il dissenso registrato è la parte che più spesso manca e più spesso serve: quando la sicurezza OT esprime una riserva formale, quella riserva diventa un requisito tracciabile invece di un attrito informale. I criteri di arresto proteggono le persone e il progetto, perché rendono legittimo fermarsi. Un canvas così scritto risponde in anticipo alla domanda più comune del colloquio: come eviti che un pilota diventi un impegno permanente senza che nessuno abbia mai deciso di prenderlo.`,
    `Discovery closes with an experiment canvas that anyone can read in two minutes. It contains the observed problem, the supported decision, the riskiest assumption, the hypothesis, the baseline with dated evidence, success criteria separated into desirable thresholds and non-negotiable gates, in-scope and out-of-scope boundaries, duration, sample size, owner, approver, recorded dissent, guardrails, stop criteria, and a review date. Recorded dissent is the part most often missing and most often needed: when OT security raises a formal reservation, that reservation becomes a traceable requirement rather than informal friction. Stop criteria protect both people and the project, because they make stopping legitimate. A canvas written this way answers the most common interview question in advance: how do you prevent a pilot from becoming a permanent commitment that nobody ever decided to make.`
  ),
  t(
    `Un errore ricorrente nella discovery è confondere il sintomo con il problema. Gli operatori descrivono ciò che sentono, cioè lentezza, confusione o troppe eccezioni, mentre il problema sta a monte, per esempio in una specifica ambigua o in un handover incompleto tra turni. Per distinguere i due livelli conviene seguire un singolo caso reale dall’inizio alla fine, annotando ogni attesa e ogni ricerca con la sua durata. Questa tecnica produce numeri credibili molto più in fretta di un questionario e mostra dove il tempo si concentra davvero. Serve anche mappare gli attori: chi subisce il problema, chi lo causa senza saperlo, chi ha il potere di cambiarlo e chi verrà misurato sul risultato. Le metodologie pubbliche di mappatura degli stakeholder aiutano a rendere questa analisi ripetibile invece che intuitiva. Il prodotto finale non è un documento lungo ma una tabella di poche righe: momento decisionale, informazione necessaria, informazione realmente disponibile, tempo perso, conseguenza dell’errore e proprietario. Una tabella così permette di scegliere il primo esperimento senza dover convincere nessuno con un argomento retorico, perché il numero più alto della colonna del tempo perso indica da solo dove iniziare, e la colonna della conseguenza indica quanto rischio è accettabile in quel punto.`,
    `A recurring discovery error is confusing the symptom with the problem. Operators describe what they feel, meaning slowness, confusion, or too many exceptions, while the problem sits upstream, for example in an ambiguous specification or an incomplete shift handover. To separate the two levels it helps to follow a single real case from start to finish, recording every wait and every search with its duration. This technique produces credible numbers far faster than a questionnaire and shows where time actually concentrates. Mapping the actors is equally necessary: who suffers the problem, who causes it without knowing, who has the power to change it, and who will be measured on the result. Public stakeholder mapping methods make this analysis repeatable rather than intuitive. The final product is not a long document but a table of a few rows: decision moment, information needed, information actually available, time lost, consequence of an error, and owner. Such a table lets you choose the first experiment without convincing anyone through rhetoric, because the largest number in the lost-time column indicates on its own where to start, and the consequence column indicates how much risk is acceptable at that point.`
  )
]

const theoryTwo = [
  t(
    `Prototipo, MVP e pilota risolvono problemi diversi e confonderli è una delle cause più frequenti di progetti bloccati. Il prototipo serve a rendere discutibile una idea: può essere finto dietro le quinte, non tocca dati reali, non ha controlli e vive giorni. Il minimo prodotto utile è invece il percorso completo più piccolo che produce valore reale per un utente reale, con dati reali e con i controlli minimi che il contesto richiede. Il pilota è un MVP messo in esercizio limitato per raccogliere evidenza operativa in condizioni vere. In un contesto regolamentato l’ordine conta: un prototipo mostrato a un dirigente e poi promosso a produzione senza passare dai controlli genera debito di conformità che qualcun altro pagherà. Dichiarare esplicitamente in quale fase ci si trova, e che cosa quella fase può e non può dimostrare, è un atto di governo, non una formalità.`,
    `Prototype, MVP, and pilot solve different problems, and confusing them is one of the most frequent causes of stalled projects. A prototype makes an idea discussable: it can be faked behind the scenes, touches no real data, has no controls, and lives for days. A minimum viable product is instead the smallest complete path that produces real value for a real user, with real data and the minimum controls the context requires. A pilot is an MVP placed into limited operation to collect operational evidence under true conditions. In a regulated context the order matters: a prototype shown to an executive and then promoted to production without passing the controls creates compliance debt that somebody else will pay. Explicitly declaring which phase you are in, and what that phase can and cannot demonstrate, is an act of governance rather than a formality.`
  ),
  t(
    `Il minimo prodotto utile industriale non è una versione ridotta di tutto: è una fetta verticale completa di poco. Se il percorso è recuperare un criterio, comprenderlo e decidere, la fetta comprende autenticazione, autorizzazione, recupero, presentazione, citazione, registrazione e ritorno alla persona. Ridurre significa restringere il dominio, non togliere i controlli. Una linea, un tipo di documento, un turno, un gruppo di utenti nominati. Ridurre i controlli produce invece un sistema che non può essere valutato: se un pilota non registra chi ha chiesto che cosa e quale versione è stata mostrata, i suoi risultati non sono difendibili davanti a un auditor né utilizzabili per una decisione di scaling. La differenza tra piccolo e incompleto è esattamente questa. Un MVP piccolo e completo produce evidenza; un MVP grande e incompleto produce discussioni.`,
    `An industrial minimum viable product is not a reduced version of everything: it is a complete vertical slice of very little. If the path is retrieve a criterion, understand it, and decide, the slice includes authentication, authorization, retrieval, presentation, citation, logging, and the return to the person. Reducing means narrowing the domain, not removing controls. One line, one document type, one shift, one named user group. Removing controls instead produces a system that cannot be evaluated: if a pilot does not record who asked what and which version was shown, its results are neither defensible to an auditor nor usable for a scaling decision. That is exactly the difference between small and incomplete. A small complete MVP produces evidence; a large incomplete MVP produces debate.`
  ),
  t(
    `La scelta del perimetro va argomentata con criteri, non con preferenze. Quattro criteri funzionano bene: densità del problema, disponibilità della evidenza, reversibilità e disponibilità del proprietario. Densità significa che il problema si ripete abbastanza da produrre dati nel periodo previsto: un caso al mese non permette conclusioni in sei settimane. Disponibilità della evidenza significa che esiste un modo indipendente di sapere se la proposta era corretta. Reversibilità significa che un errore non crea danni permanenti, il che tipicamente esclude scritture dirette e decisioni di rilascio. Disponibilità del proprietario significa che una persona con autorità reale ha tempo per rivedere i casi durante il pilota. Se manca l’ultima condizione, il pilota produrrà numeri che nessuno adjudica, e senza adjudicazione la percentuale di correttezza è una opinione con i decimali.`,
    `The choice of scope should be argued with criteria, not preferences. Four criteria work well: problem density, evidence availability, reversibility, and owner availability. Density means the problem repeats often enough to produce data within the planned period: one case per month supports no conclusion in six weeks. Evidence availability means there is an independent way to know whether the proposal was correct. Reversibility means an error causes no permanent damage, which typically rules out direct writes and release decisions. Owner availability means a person with real authority has time to review cases during the pilot. If that last condition is missing, the pilot will produce numbers nobody adjudicates, and without adjudication a correctness percentage is an opinion with decimal places.`
  ),
  t(
    `Un test minimo end-to-end si progetta al contrario, partendo dalla decisione finale. Si scrive prima come apparirà l’evidenza sufficiente per decidere, poi si costruisce soltanto quello che serve a produrla. Questo metodo elimina naturalmente funzioni affascinanti ma non decisive. Il set di valutazione va costruito prima del sistema e deve contenere casi rispondibili, casi non autorizzati, casi con versione superata, casi in conflitto e casi senza evidenza sufficiente. Deve contenere entrambe le lingue se gli utenti lavorano in due lingue. La proporzione dei casi difficili va dichiarata, perché un set fatto solo di domande facili genera fiducia ingiustificata. Chi adjudica la risposta corretta deve essere una persona qualificata e indipendente dal team che costruisce. Questa separazione costa poco e protegge dal fenomeno più comune nei piloti interni: valutare il proprio lavoro con il proprio criterio.`,
    `A minimum end-to-end test is designed backwards, starting from the final decision. You first write how sufficient evidence for deciding will look, then build only what is needed to produce it. This method naturally removes fascinating but non-decisive features. The evaluation set is built before the system and must contain answerable cases, unauthorized cases, superseded-version cases, conflicting cases, and cases with insufficient evidence. It must contain both languages if users work in two languages. The proportion of hard cases must be declared, because a set of easy questions creates unjustified confidence. Whoever adjudicates the correct answer must be qualified and independent from the building team. That separation costs little and protects against the most common failure in internal pilots: judging your own work by your own criteria.`
  ),
  t(
    `Il tempo dedicato al minimo prodotto utile va limitato in modo esplicito. Sei settimane con criteri chiari sono più utili di sei mesi con criteri mobili, perché la scadenza obbliga a decidere che cosa non fare. Alla fine del periodo esistono soltanto tre esiti legittimi: continuare con perimetro allargato, continuare con lo stesso perimetro e una correzione dichiarata, oppure fermarsi. Un quarto esito informale, cioè continuare senza decidere, è quello che consuma silenziosamente i budget di trasformazione. Per evitarlo si fissa in anticipo la data di riesame, si nomina chi presenta e chi approva, e si stabilisce che l’assenza di evidenza equivale a un no. In un colloquio questa è una delle risposte che distingue chi ha davvero portato un sistema in produzione da chi ha solo partecipato a una sperimentazione.`,
    `The time given to a minimum viable product must be explicitly bounded. Six weeks with clear criteria are more useful than six months with moving criteria, because the deadline forces a decision about what not to do. At the end of the period only three legitimate outcomes exist: continue with a wider scope, continue with the same scope and a declared correction, or stop. A fourth informal outcome, continuing without deciding, is what silently consumes transformation budgets. To prevent it you fix the review date in advance, name who presents and who approves, and establish that absence of evidence counts as a no. In an interview this is one of the answers that separates people who have actually taken a system to production from people who only joined a trial.`
  ),
  t(
    `Vale la pena chiarire anche che cosa non è un minimo prodotto utile, perché le confusioni più costose nascono qui. Non è una versione gratuita di un prodotto commerciale usata per capire se piace. Non è un progetto pilota di sei mesi che coinvolge tutti i reparti per non offendere nessuno. Non è una prova tecnica di fattibilità, che risponde a una domanda diversa e legittima ma non produce valore per un utente reale. E soprattutto non è una scusa per rinviare le decisioni difficili su accesso, proprietà del dato e responsabilità, perché quelle decisioni diventano più costose man mano che il sistema cresce. Un criterio semplice per verificare di avere davvero un MVP è chiedersi se un utente reale, in un turno reale, otterrebbe un beneficio reale se il progetto si fermasse domani. Se la risposta è no, quello che si sta costruendo è un componente, non un prodotto minimo, e va valutato come tale. Questa distinzione conta in un colloquio perché mostra che il candidato conosce la differenza tra avanzamento tecnico e valore consegnato, che è esattamente la differenza che un responsabile di trasformazione deve saper gestire ogni settimana davanti a chi finanzia il lavoro.`,
    `It is worth clarifying what a minimum viable product is not, because the costliest confusions start here. It is not a free version of a commercial product used to see whether people like it. It is not a six-month pilot involving every department so that nobody feels excluded. It is not a technical proof of feasibility, which answers a different and legitimate question but produces no value for a real user. Above all it is not an excuse to postpone hard decisions about access, data ownership, and accountability, because those decisions become more expensive as the system grows. A simple test for whether you really have an MVP is to ask whether a real user, in a real shift, would obtain a real benefit if the project stopped tomorrow. If the answer is no, what is being built is a component rather than a minimum product, and it should be assessed as such. This distinction matters in an interview because it shows the candidate knows the difference between technical progress and delivered value, which is exactly the difference a transformation lead has to manage every week in front of the people funding the work.`
  )
]

const theoryThree = [
  t(
    `Integrare significa collegare un percorso assistito ai sistemi che già governano il lavoro, rispettandone le regole. La prima domanda non è come leggere i dati ma da quale sistema è legittimo leggerli. In uno stabilimento il historian conserva serie temporali già contestualizzate, il sistema di esecuzione della produzione conserva ordini e genealogia, il repository documentale conserva revisioni approvate. Leggere dal livello di controllo per comodità è quasi sempre la scelta sbagliata, perché mette traffico e dipendenze dove la priorità è la disponibilità continua. La seconda domanda riguarda la direzione: leggere è reversibile, scrivere no. Un MVP industriale prudente resta in sola lettura finché non ha dimostrato la qualità delle proprie proposte. La terza domanda riguarda la cadenza: una raccolta ogni cinque minuti e una ogni cento millisecondi generano architetture, costi e rischi completamente diversi.`,
    `Integration means connecting an assisted path to the systems that already govern the work, while respecting their rules. The first question is not how to read the data but which system may legitimately provide it. In a plant the historian holds contextualized time series, the manufacturing execution system holds orders and genealogy, and the document repository holds approved revisions. Reading from the control level for convenience is almost always the wrong choice, because it places traffic and dependencies where continuous availability is the priority. The second question concerns direction: reading is reversible, writing is not. A prudent industrial MVP stays read-only until it has demonstrated the quality of its proposals. The third question concerns cadence: collection every five minutes and collection every hundred milliseconds produce completely different architectures, costs, and risks.`
  ),
  t(
    `La modalità shadow è il modo più economico per ottenere evidenza senza esporre nessuno. Il sistema riceve gli stessi input della persona, produce la propria proposta e la registra, ma non la mostra e non influenza la decisione. Dopo un periodo sufficiente si confrontano le proposte registrate con le decisioni realmente prese e adjudicate. Questo confronto produce le uniche metriche che contano davvero: quante volte il sistema avrebbe aiutato, quante volte avrebbe fatto perdere tempo e quante volte avrebbe indotto un errore. La modalità shadow ha un limite importante e va dichiarato: non misura come cambia il comportamento umano quando la proposta diventa visibile. Per questo il passaggio successivo non è la produzione piena ma una modalità consultiva ristretta, dove la proposta è visibile, citata e sempre rifiutabile, con campionamento indipendente delle conferme.`,
    `Shadow mode is the cheapest way to obtain evidence without exposing anyone. The system receives the same inputs as the person, produces its own proposal, and records it, but does not display it and does not influence the decision. After a sufficient period, recorded proposals are compared with the decisions actually made and adjudicated. This comparison produces the only metrics that really matter: how often the system would have helped, how often it would have wasted time, and how often it would have induced an error. Shadow mode has an important limitation that must be stated: it does not measure how human behavior changes once the proposal becomes visible. That is why the next step is not full production but a narrow advisory mode, where the proposal is visible, cited, and always refusable, with independent sampling of confirmations.`
  ),
  t(
    `Il fallback non è una funzione aggiuntiva: è la definizione del comportamento del processo quando il componente nuovo non è disponibile. Se il processo si ferma perché il servizio non risponde, allora il servizio è diventato critico senza che nessuno lo abbia deciso. Il fallback corretto per un assistente documentale è il percorso precedente, cioè la ricerca manuale nel repository, con un messaggio chiaro e senza risposte parziali. Il fallback va provato, non dichiarato: si spegne il servizio durante un turno pianificato e si osserva. Va anche misurato il tempo di ritorno alla normalità e la quantità di lavoro accumulato. Un errore frequente è costruire un fallback che nessuno sa più eseguire, perché in sei mesi la competenza manuale si è persa. La formazione periodica sul percorso di riserva fa parte del disegno, non della documentazione.`,
    `Fallback is not an extra feature: it is the definition of how the process behaves when the new component is unavailable. If the process stops because the service does not answer, then the service has become critical without anyone deciding so. The correct fallback for a document assistant is the previous path, manual search in the repository, with a clear message and no partial answers. Fallback must be exercised, not declared: the service is switched off during a planned shift and the result is observed. Time to return to normal and the accumulated backlog must also be measured. A frequent error is building a fallback nobody can perform any more, because manual competence disappears within six months. Periodic training on the reserve path is part of the design, not of the documentation.`
  ),
  t(
    `Il rollback riguarda le versioni, non soltanto le interruzioni. Un percorso assistito ha almeno cinque elementi versionabili: il corpus documentale, il parser, l’indice, il prompt e il modello. Un cambiamento in uno solo può spostare i risultati, e senza versionamento congiunto diventa impossibile ricostruire quale combinazione ha prodotto una risposta. Il rollback richiede quindi che ogni risposta registrata porti con sé le versioni attive al momento. Serve anche una regola di conservazione coerente con gli obblighi documentali del sito. La reversibilità va valutata nel disegno: tornare indietro su un indice è facile, tornare indietro su record operativi creati automaticamente è difficile e a volte impossibile. È una delle ragioni per cui gli effetti collaterali restano fuori dal perimetro di un primo minimo prodotto utile in ambiente regolamentato.`,
    `Rollback concerns versions, not only outages. An assisted path has at least five versionable elements: the document corpus, the parser, the index, the prompt, and the model. A change in any one of them can move results, and without joint versioning it becomes impossible to reconstruct which combination produced an answer. Rollback therefore requires that every recorded answer carries the versions active at the time. A retention rule consistent with the site document obligations is also needed. Reversibility must be assessed during design: rolling back an index is easy, rolling back operational records created automatically is hard and sometimes impossible. That is one of the reasons side effects stay outside the scope of a first minimum viable product in a regulated environment.`
  ),
  t(
    `La proprietà operativa decide se un sistema sopravvive al proprio progetto. Servono tre ruoli distinti e nominati: chi risponde del processo di business, chi risponde del servizio tecnico e chi risponde della qualità del dato. Una matrice di responsabilità rende esplicito chi esegue, chi risponde, chi viene consultato e chi viene informato per ogni attività rilevante. La regola più utile è che ogni attività abbia esattamente un ruolo che risponde: due responsabili equivalgono a nessuno. Bisogna inoltre dichiarare gli orari di copertura, il percorso di escalation e che cosa accade di notte o nel fine settimana. Molti piloti riusciti muoiono qui, perché nessuno ha accettato il carico di supporto permanente. Portare questa matrice a un colloquio dimostra che il candidato ha già vissuto la differenza tra consegnare un sistema e farlo vivere.`,
    `Operational ownership decides whether a system survives its own project. Three distinct and named roles are needed: who answers for the business process, who answers for the technical service, and who answers for data quality. A responsibility matrix makes explicit who performs, who answers, who is consulted, and who is informed for every relevant activity. The most useful rule is that each activity has exactly one accountable role: two accountable people mean none. Coverage hours, the escalation path, and what happens at night or at the weekend must also be declared. Many successful pilots die here, because nobody accepted the permanent support load. Bringing this matrix to an interview shows that the candidate has already lived the difference between delivering a system and keeping it alive.`
  ),
  t(
    `Esiste infine una domanda di integrazione che quasi nessuno pone in tempo: che cosa succede ai dati generati dal sistema stesso. Un percorso assistito produce registri di richieste, proposte, conferme, rifiuti e versioni attive. Questi dati sono preziosi perché permettono di misurare la sorveglianza reale e di ricostruire un evento, ma sono anche sensibili, perché contengono frammenti di documenti controllati e comportamenti individuali. Vanno quindi trattati con le stesse regole del contenuto originale: stessa classificazione, stessa conservazione, stesso controllo di accesso. Va inoltre dichiarato in modo esplicito a chi servono e a chi non servono, perché se gli operatori sospettano che i registri misurino la loro velocità, l’uso diventa difensivo e la qualità del dato crolla. La regola pratica che funziona è separare due usi: le misure aggregate servono a valutare il sistema, mentre i dati individuali servono soltanto a ricostruire un incidente specifico e sono accessibili con una procedura dichiarata. Scrivere questa separazione nel disegno, e non dopo la prima discussione sindacale o la prima domanda di un auditor, è una delle differenze più visibili tra un progetto guidato con esperienza e uno guidato con entusiasmo.`,
    `There is finally an integration question almost nobody asks in time: what happens to the data the system itself generates. An assisted path produces logs of requests, proposals, confirmations, refusals, and active versions. This data is valuable because it lets you measure real oversight and reconstruct an event, but it is also sensitive, because it contains fragments of controlled documents and individual behavior. It must therefore be treated with the same rules as the original content: same classification, same retention, same access control. It must also be explicitly stated who needs it and who does not, because if operators suspect the logs measure their speed, usage becomes defensive and data quality collapses. The practical rule that works is separating two uses: aggregate measures serve to evaluate the system, while individual records serve only to reconstruct a specific incident and are accessible through a declared procedure. Writing this separation into the design, rather than after the first works council discussion or the first auditor question, is one of the most visible differences between a project led with experience and one led with enthusiasm.`
  )
]

const theoryFour = [
  t(
    `La sicurezza in ambiente industriale parte da una gerarchia di priorità diversa da quella informatica. Nei sistemi gestionali si protegge prima la riservatezza, poi l’integrità, poi la disponibilità. Nei sistemi di controllo l’ordine si rovescia: la disponibilità e l’integrità del processo vengono prima, perché una interruzione può fermare la produzione o creare condizioni non sicure. La guida statunitense dedicata alla sicurezza delle tecnologie operative descrive esattamente questa differenza e le conseguenze pratiche che ne derivano. Una scansione di vulnerabilità aggressiva su una rete di controllo può causare più danni della minaccia che cerca. Un aggiornamento automatico può fermare una linea. Chi guida la trasformazione deve saper spiegare questa inversione con parole semplici, perché è la ragione per cui i tempi e i metodi accettabili in un ufficio non sono accettabili in uno stabilimento.`,
    `Security in an industrial environment starts from a different priority order than information technology. In business systems you protect confidentiality first, then integrity, then availability. In control systems the order reverses: process availability and integrity come first, because an interruption can stop production or create unsafe conditions. The United States guidance dedicated to operational technology security describes exactly this difference and its practical consequences. An aggressive vulnerability scan on a control network can cause more damage than the threat it looks for. An automatic update can stop a line. A transformation lead must be able to explain this inversion in plain words, because it is the reason why timings and methods that are acceptable in an office are not acceptable in a plant.`
  ),
  t(
    `La segmentazione è il controllo più efficace e più frainteso. Le zone raggruppano risorse con requisiti di sicurezza simili; i condotti descrivono i canali di comunicazione consentiti tra zone, con protocolli, direzione, controlli e comportamento in condizioni degradate. La serie di norme dedicata alla sicurezza dei sistemi industriali di automazione e controllo formalizza questo linguaggio e lo rende utilizzabile tra fornitori diversi. Il fraintendimento tipico è considerare la segmentazione come una singola parete: in realtà è un insieme di scelte su che cosa può parlare con che cosa, in quale direzione e con quale verifica. Una zona demilitarizzata industriale esiste proprio per evitare connessioni dirette tra rete aziendale e rete di controllo. Un progetto di intelligenza artificiale che chiede una eccezione a questa regola deve spiegare che cosa offre in cambio, non limitarsi a chiederla.`,
    `Segmentation is the most effective and most misunderstood control. Zones group assets with similar security requirements; conduits describe the permitted communication channels between zones, with protocols, direction, controls, and degraded behavior. The standards series dedicated to industrial automation and control systems security formalizes this language and makes it usable across vendors. The typical misunderstanding is treating segmentation as a single wall: it is actually a set of choices about what may talk to what, in which direction, and with which verification. An industrial demilitarized zone exists precisely to avoid direct connections between the corporate network and the control network. An artificial intelligence project asking for an exception to that rule must explain what it offers in return, not simply ask for it.`
  ),
  t(
    `L’accesso remoto è la porta più usata negli incidenti industriali e merita un trattamento specifico. Le regole efficaci sono poche e severe: nessuna connessione permanente, approvazione per singola finestra, autenticazione forte, sessione supervisionata e registrata, revoca automatica alla chiusura e revisione periodica degli account. Un fornitore che chiede accesso continuo per manutenzione predittiva sta chiedendo, di fatto, un canale non presidiato verso la zona industriale. L’alternativa corretta è portare i dati verso il fornitore attraverso un percorso controllato in uscita, invece di aprire un percorso in entrata. Vale anche per i servizi di intelligenza artificiale ospitati altrove: il flusso deve essere iniziato dall’interno, limitato ai campi necessari e privo di credenziali persistenti. Queste scelte si spiegano in trenta secondi e mostrano che il candidato conosce il vero perimetro di rischio.`,
    `Remote access is the most used door in industrial incidents and deserves specific treatment. Effective rules are few and strict: no permanent connection, approval per individual window, strong authentication, supervised and recorded sessions, automatic revocation at window close, and periodic account review. A vendor requesting continuous access for predictive maintenance is effectively requesting an unattended channel into the industrial zone. The correct alternative is pushing data toward the vendor through a controlled outbound path instead of opening an inbound path. The same applies to artificial intelligence services hosted elsewhere: the flow must be initiated from inside, limited to the necessary fields, and free of persistent credentials. These choices can be explained in thirty seconds and show that the candidate knows where the real risk perimeter lies.`
  ),
  t(
    `I vincoli di sicurezza funzionale non sono negoziabili e non appartengono al perimetro di un modello. I sistemi strumentati di sicurezza esistono per portare l’impianto in uno stato sicuro in modo deterministico e verificabile, indipendentemente dal software applicativo. Un modello probabilistico non entra in questa catena, non la sostituisce e non la ottimizza. Può però contribuire fuori dalla catena, per esempio segnalando in anticipo condizioni che spesso precedono un intervento, purché la segnalazione arrivi a una persona e non a un attuatore. La stessa logica vale per la gestione degli allarmi: aggiungere segnalazioni generate da un modello senza razionalizzarle peggiora il sovraccarico dell’operatore, che è già una causa nota di incidenti. Prima si riducono gli allarmi inutili, poi si valuta se un segnale predittivo aggiunge valore.`,
    `Functional safety constraints are not negotiable and do not belong to a model perimeter. Safety instrumented systems exist to bring the plant to a safe state deterministically and verifiably, independent of application software. A probabilistic model does not enter that chain, does not replace it, and does not optimize it. It can contribute outside the chain, for example by flagging in advance conditions that often precede an intervention, provided the flag reaches a person and not an actuator. The same logic applies to alarm management: adding model-generated notifications without rationalizing them worsens operator overload, which is already a known cause of incidents. First you reduce useless alarms, then you evaluate whether a predictive signal adds value.`
  ),
  t(
    `Il modo pratico di applicare tutto questo a un progetto di intelligenza artificiale è una scheda di integrazione che dichiara, per ogni flusso, la zona di origine, la zona di destinazione, la direzione, il protocollo, i dati trasferiti, il proprietario del dato, il controllo che attraversa il confine, il comportamento in caso di indisponibilità e la persona che agisce. Se questa scheda non si riesce a compilare, il progetto non è pronto per essere discusso con la sicurezza. La scheda serve anche a rendere visibile un fatto scomodo: la maggior parte del valore si ottiene leggendo dati già disponibili in zone intermedie. Molte richieste di accesso profondo nascono da comodità di sviluppo, non da necessità funzionale. Riconoscerlo per primi, prima che lo faccia la sicurezza, cambia completamente la qualità della conversazione.`,
    `The practical way to apply all this to an artificial intelligence project is an integration sheet declaring, for every flow, the source zone, the destination zone, the direction, the protocol, the transferred data, the data owner, the control crossing the boundary, the behavior when unavailable, and the person who acts. If that sheet cannot be filled in, the project is not ready to be discussed with security. The sheet also makes an uncomfortable fact visible: most of the value comes from reading data already available in intermediate zones. Many deep access requests come from development convenience rather than functional need. Recognizing this first, before security does, completely changes the quality of the conversation.`
  ),
  t(
    `Un ultimo punto riguarda il modo in cui si porta una richiesta alla funzione di sicurezza, perché il metodo cambia l’esito più del contenuto. La richiesta debole arriva alla fine, come autorizzazione da ottenere, e descrive una soluzione già costruita. La richiesta forte arriva all’inizio, come problema da risolvere insieme, e presenta almeno due opzioni con i rispettivi rischi. Nella pratica funziona presentare tre elementi: la decisione operativa che si vuole migliorare, i dati minimi indispensabili per farlo, e due percorsi tecnici alternativi con il confine di sicurezza che ciascuno attraversa. In quasi tutti i casi emerge che l’opzione più conservativa è sufficiente, perché il valore deriva da dati già disponibili in zone intermedie. Questo approccio produce anche un effetto secondario utile: la funzione di sicurezza diventa corresponsabile della scelta invece che ostacolo finale, e il tempo di approvazione si riduce nei progetti successivi. Chi guida la trasformazione dovrebbe considerare questa relazione come un investimento di lungo periodo, perché nel corso di un programma pluriennale il numero di eccezioni che si riesce a evitare pesa più di qualunque singola vittoria negoziale ottenuta forzando una deroga.`,
    `A final point concerns how a request reaches the security function, because the method changes the outcome more than the content does. A weak request arrives at the end, as an authorization to obtain, and describes an already built solution. A strong request arrives at the beginning, as a problem to solve together, and presents at least two options with their respective risks. In practice it works to present three elements: the operational decision you want to improve, the minimum data indispensable to do it, and two alternative technical paths with the security boundary each one crosses. In almost every case it turns out the more conservative option is sufficient, because the value comes from data already available in intermediate zones. This approach also produces a useful side effect: the security function becomes co-responsible for the choice rather than a final obstacle, and approval time falls in later projects. A transformation lead should treat that relationship as a long-term investment, because across a multi-year program the number of exceptions avoided weighs more than any single negotiating win obtained by forcing a waiver.`
  )
]

const theoryFive = [
  t(
    `I sistemi generativi introducono classi di rischio che non esistevano nei sistemi tradizionali, e il profilo dedicato alla intelligenza artificiale generativa pubblicato dall’istituto statunitense di standard le elenca in modo utilizzabile. La prima è la manipolazione attraverso il contenuto: il modello non distingue in modo affidabile tra istruzioni ricevute dal sistema e testo presente nei documenti che legge. Se un documento contiene una frase che chiede di ignorare i limiti, quella frase entra nel contesto insieme al resto. La difesa non è chiedere al modello di essere prudente, perché la richiesta viaggia sullo stesso canale dell’attacco. La difesa è architetturale: trattare il contenuto recuperato come dato, non come istruzione, limitare ciò che il sistema può fare a prescindere dal testo, e verificare gli effetti prima che diventino azioni.`,
    `Generative systems introduce risk classes that did not exist in traditional systems, and the generative artificial intelligence profile published by the United States standards institute lists them in a usable way. The first is manipulation through content: the model does not reliably distinguish between instructions received from the system and text present in the documents it reads. If a document contains a sentence asking to ignore the limits, that sentence enters the context along with everything else. The defense is not asking the model to be careful, because the request travels on the same channel as the attack. The defense is architectural: treat retrieved content as data rather than instruction, limit what the system can do regardless of the text, and verify effects before they become actions.`
  ),
  t(
    `La seconda classe è la fuga di informazione. Può avvenire in tre modi distinti che conviene tenere separati. Il primo è la fuga verso l’utente: il sistema mostra a una persona un contenuto che quella persona non era autorizzata a vedere, spesso perché i permessi sono stati applicati alla ricerca ma non ai frammenti indicizzati. Il secondo è la fuga verso il fornitore: dati riservati vengono inviati a un servizio esterno la cui politica di conservazione o di addestramento non è stata verificata. Il terzo è la fuga attraverso gli artefatti: registri, cache, tracce di debug e valutazioni conservano contenuti sensibili in luoghi con controlli più deboli. La difesa richiede che le etichette di accesso viaggino con ogni frammento, che i flussi verso l’esterno siano dichiarati e minimizzati, e che i registri seguano le stesse regole del contenuto originale.`,
    `The second class is information leakage. It happens in three distinct ways that are worth keeping separate. The first is leakage to the user: the system shows a person content they were not authorized to see, often because permissions were applied to search but not to indexed fragments. The second is leakage to the provider: confidential data is sent to an external service whose retention or training policy was never verified. The third is leakage through artifacts: logs, caches, debug traces, and evaluations retain sensitive content in places with weaker controls. The defense requires access labels to travel with every fragment, outbound flows to be declared and minimized, and logs to follow the same rules as the original content.`
  ),
  t(
    `La terza classe riguarda l’uso improprio degli strumenti. Quando un modello può invocare funzioni, il rischio si sposta dal testo alle conseguenze. Un modello può proporre una chiamata plausibile ma sbagliata, ripetere una chiamata già eseguita, inventare valori per campi mancanti oppure combinare strumenti in modi non previsti. Le difese sono deterministiche e note: schema di ingresso rigido, validazione dei dati anagrafici contro le fonti autorevoli, autorizzazione decisa fuori dal modello, chiave di idempotenza per ogni operazione che scrive, registro di audit con esito e identità, timeout con recupero dello stato reale e conferma esplicita per gli effetti irreversibili. Nessuna di queste difese è nuova: sono le stesse che si applicano a qualunque integrazione transazionale. La novità è che ora il chiamante è probabilistico e va trattato come non affidabile per costruzione.`,
    `The third class concerns tool misuse. When a model can invoke functions, risk moves from text to consequences. A model may propose a plausible but wrong call, repeat a call already executed, invent values for missing fields, or combine tools in unforeseen ways. The defenses are deterministic and well known: a strict input schema, validation of master data against authoritative sources, authorization decided outside the model, an idempotency key for every write operation, an audit log with outcome and identity, timeouts with recovery of the real state, and explicit confirmation for irreversible effects. None of these defenses is new: they are the same ones applied to any transactional integration. What is new is that the caller is now probabilistic and must be treated as untrusted by construction.`
  ),
  t(
    `La quarta classe è l’agency eccessiva, cioè dare al sistema più autonomia, più permessi o più portata di quanto il compito richieda. Si manifesta in modo silenzioso: un ruolo tecnico creato con permessi ampi per comodità di sviluppo, uno strumento che accetta un identificativo generico invece di uno specifico, una funzione di ricerca che non filtra per sito. La regola pratica è il privilegio minimo applicato al compito, non alla persona: lo strumento riceve i permessi del singolo compito autorizzato, per la durata di quel compito. Vale anche una regola di portata: il sistema può proporre azioni soltanto sugli oggetti già presenti nella richiesta autorizzata. Riconoscere l’agency eccessiva richiede di guardare i permessi effettivi in esercizio, non quelli disegnati, perché la distanza tra i due cresce nel tempo.`,
    `The fourth class is excessive agency, meaning giving the system more autonomy, more permissions, or more reach than the task requires. It appears silently: a technical role created with broad permissions for development convenience, a tool accepting a generic identifier instead of a specific one, a search function that does not filter by site. The practical rule is least privilege applied to the task rather than to the person: the tool receives the permissions of the single authorized task, for the duration of that task. A reach rule also applies: the system may propose actions only on objects already present in the authorized request. Recognizing excessive agency requires looking at effective permissions in operation rather than designed ones, because the distance between the two grows over time.`
  ),
  t(
    `Queste quattro classi si valutano con un set di prova, non con una discussione. Il set contiene documenti con istruzioni nascoste, richieste da utenti non autorizzati, richieste che invitano a rivelare configurazioni, richieste che chiedono azioni fuori portata e richieste ambigue dove il comportamento corretto è chiedere chiarimenti o rifiutare. Ogni caso ha un esito atteso dichiarato prima dell’esecuzione. I risultati non si mediano: una singola esposizione non autorizzata è un fallimento, perché il danno non è proporzionale alla frequenza. Il set va rieseguito a ogni cambiamento di corpus, indice, prompt o modello, e i risultati vanno conservati con le versioni attive. Portare questo set a una discussione con la sicurezza cambia il tono: non si chiede fiducia, si mostra evidenza riproducibile.`,
    `These four classes are assessed with a test set, not with a discussion. The set contains documents with hidden instructions, requests from unauthorized users, requests inviting disclosure of configuration, requests asking for out-of-reach actions, and ambiguous requests where the correct behavior is to ask for clarification or refuse. Every case has an expected outcome declared before execution. Results are not averaged: a single unauthorized exposure is a failure, because the damage is not proportional to frequency. The set is rerun on every change of corpus, index, prompt, or model, and results are stored with the active versions. Bringing this set to a security discussion changes the tone: you are not asking for trust, you are showing reproducible evidence.`
  ),
  t(
    `Conviene aggiungere una quinta considerazione che non è una classe di rischio ma il modo in cui le quattro si combinano. Gli incidenti reali raramente derivano da una sola debolezza: nascono da una catena in cui un permesso troppo ampio incontra un contenuto manipolato e un registro incompleto. Per questo la valutazione va fatta sul percorso completo e non sui singoli componenti. Un esercizio efficace è la simulazione avversaria interna: una persona che non ha costruito il sistema prova a ottenere qualcosa che non dovrebbe, usando soltanto le funzioni disponibili agli utenti reali. In poche ore questo esercizio trova più problemi di una revisione documentale, perché mette alla prova i permessi effettivi invece di quelli disegnati. I risultati vanno trattati come dati, non come colpe, altrimenti nessuno segnalerà più nulla. Va infine ricordato che la superficie di rischio cresce con le funzioni, non con il tempo: ogni nuovo strumento, ogni nuova fonte e ogni nuova integrazione riaprono la valutazione. Un sistema considerato sicuro sei mesi fa, con due strumenti aggiunti nel frattempo, non è lo stesso sistema e non merita la stessa fiducia senza una nuova prova.`,
    `A fifth consideration is worth adding, not a risk class but the way the four combine. Real incidents rarely come from a single weakness: they come from a chain in which an overly broad permission meets manipulated content and an incomplete log. That is why assessment must cover the complete path rather than individual components. An effective exercise is internal adversarial simulation: a person who did not build the system tries to obtain something they should not, using only the functions available to real users. Within a few hours this exercise finds more problems than a document review, because it tests effective permissions instead of designed ones. The results must be treated as data rather than blame, otherwise nobody will report anything again. Finally, remember that the risk surface grows with functionality rather than with time: every new tool, every new source, and every new integration reopens the assessment. A system considered safe six months ago, with two tools added since, is not the same system and does not deserve the same trust without new evidence.`
  )
]

const theorySix = [
  t(
    `Il quadro di gestione del rischio per la intelligenza artificiale pubblicato dall’istituto statunitense di standard organizza il lavoro in quattro funzioni: governare, mappare, misurare e gestire. Governare riguarda le condizioni permanenti: politiche, ruoli, competenze, cultura e responsabilità. Mappare riguarda il contesto specifico: qual è il sistema, chi sono le persone coinvolte, quali impatti sono possibili e quali assunzioni sono state fatte. Misurare riguarda la valutazione: metriche, metodi, prove e monitoraggio nel tempo. Gestire riguarda le decisioni: priorità, trattamento del rischio, risposta e recupero. La funzione di governo attraversa le altre tre e non è un passaggio iniziale da spuntare. Il valore pratico di questa struttura è che permette di rispondere in modo ordinato alla domanda del colloquio su come si governa un progetto senza trasformare la risposta in un elenco di buone intenzioni.`,
    `The risk management framework for artificial intelligence published by the United States standards institute organizes work into four functions: govern, map, measure, and manage. Govern covers the permanent conditions: policies, roles, competence, culture, and accountability. Map covers the specific context: what the system is, who is involved, which impacts are possible, and which assumptions were made. Measure covers evaluation: metrics, methods, tests, and monitoring over time. Manage covers decisions: prioritization, risk treatment, response, and recovery. The govern function runs across the other three and is not an initial step to tick off. The practical value of this structure is that it lets you answer the interview question about governing a project in an orderly way, instead of turning the answer into a list of good intentions.`
  ),
  t(
    `Tradurre le quattro funzioni in pratica significa produrre pochi artefatti concreti. Per governare servono una politica di uso ammesso, un elenco dei ruoli con responsabilità dichiarate e un registro dei sistemi in esercizio. Per mappare servono la scheda del caso d’uso con decisione supportata, popolazione interessata e impatti possibili, più la scheda di integrazione con i flussi. Per misurare servono il set di valutazione, le soglie, i cancelli non negoziabili e il piano di monitoraggio. Per gestire servono il registro dei rischi con punteggi derivati, il piano di risposta agli incidenti e il processo di gestione del cambiamento. Nessuno di questi documenti deve essere lungo. Un registro dei rischi di due pagine che viene aggiornato vale più di un documento di quaranta pagine che nessuno riapre dopo l’approvazione.`,
    `Translating the four functions into practice means producing a few concrete artifacts. Governing requires an acceptable use policy, a list of roles with declared responsibilities, and a register of systems in operation. Mapping requires the use-case sheet with supported decision, affected population, and possible impacts, plus the integration sheet with its flows. Measuring requires the evaluation set, the thresholds, the non-negotiable gates, and the monitoring plan. Managing requires the risk register with derived scores, the incident response plan, and the change management process. None of these documents needs to be long. A two-page risk register that is actually updated is worth more than a forty-page document nobody reopens after approval.`
  ),
  t(
    `Il regolamento europeo sulla intelligenza artificiale introduce un approccio proporzionato al rischio, con obblighi diversi a seconda della categoria del sistema. Alcune pratiche sono vietate, alcuni sistemi sono classificati ad alto rischio con requisiti estesi, altri hanno obblighi di trasparenza più leggeri e la maggior parte ricade fuori dalle categorie regolate in modo specifico. Per un assistente documentale interno che non decide sull’accesso al lavoro, non valuta persone e non entra in una funzione di sicurezza di un prodotto regolato, la classificazione ad alto rischio non è automatica. La conclusione corretta in un colloquio non è dichiarare una categoria con sicurezza, ma descrivere il metodo: identificare la funzione reale del sistema, verificare se rientra in un allegato applicabile, coinvolgere la funzione legale e documentare la valutazione con la data e la versione del sistema.`,
    `The European regulation on artificial intelligence introduces a risk-proportionate approach, with different obligations depending on the category of the system. Some practices are prohibited, some systems are classified as high risk with extensive requirements, others carry lighter transparency obligations, and most fall outside the specifically regulated categories. For an internal document assistant that does not decide access to work, does not assess people, and does not act as a safety component of a regulated product, high-risk classification is not automatic. The correct conclusion in an interview is not to declare a category with confidence, but to describe the method: identify the real function of the system, check whether it falls under an applicable annex, involve the legal function, and document the assessment with a date and the system version.`
  ),
  t(
    `Alcuni requisiti previsti per i sistemi ad alto rischio sono comunque buone pratiche anche quando non sono obbligatori, e adottarli in anticipo riduce il costo di una eventuale riclassificazione. Tra questi ci sono la gestione del rischio come processo continuo, la qualità e la rappresentatività dei dati, la documentazione tecnica, la registrazione automatica degli eventi, la trasparenza verso gli utilizzatori, la sorveglianza umana e i requisiti di accuratezza, robustezza e sicurezza. Applicati a un assistente documentale significano: registro dei rischi vivo, corpus con qualità dichiarata, scheda tecnica del sistema, log delle richieste e delle versioni, messaggio chiaro che indica che le risposte sono proposte da verificare, citazione apribile e un set di valutazione con soglie. La logica è semplice: costruire una volta con controlli, invece di due volte senza e poi con.`,
    `Some requirements defined for high-risk systems are good practice even when not mandatory, and adopting them early lowers the cost of a possible reclassification. They include risk management as a continuous process, data quality and representativeness, technical documentation, automatic event logging, transparency toward users, human oversight, and accuracy, robustness, and security requirements. Applied to a document assistant they mean: a living risk register, a corpus with declared quality, a technical sheet for the system, logs of requests and versions, a clear message stating that answers are proposals to verify, an openable citation, and an evaluation set with thresholds. The logic is simple: build once with controls, rather than twice without and then with.`
  ),
  t(
    `La governance fallisce quasi sempre per la stessa ragione: nessuno risponde del risultato. Un comitato che approva senza possedere le conseguenze produce documenti, non decisioni. Il correttivo è nominare per ogni sistema una persona responsabile del processo di business e una responsabile del servizio tecnico, dare a entrambe il potere di fermare e chiedere che le eccezioni siano scritte con scadenza. Una eccezione senza scadenza è una regola nuova introdotta di nascosto. Serve anche una via legittima per il dissenso: quando la sicurezza o la qualità esprimono una riserva, questa deve comparire nel record della decisione. Un candidato che descrive la governance in questi termini, con nomi di ruolo, poteri di arresto e scadenze, comunica esperienza reale molto più di uno che elenca principi condivisibili ma non azionabili.`,
    `Governance almost always fails for the same reason: nobody answers for the outcome. A committee that approves without owning the consequences produces documents, not decisions. The correction is to name, for each system, one person accountable for the business process and one for the technical service, give both the power to stop, and require exceptions to be written with an expiry date. An exception without an expiry date is a new rule introduced quietly. A legitimate route for dissent is also needed: when security or quality raise a reservation, it must appear in the decision record. A candidate who describes governance in these terms, with role names, stop authority, and deadlines, communicates real experience far more than one who lists agreeable but unactionable principles.`
  ),
  t(
    `Un aspetto pratico spesso trascurato riguarda la proporzionalità della governance. Applicare a un assistente documentale interno lo stesso apparato previsto per un sistema che incide sulla sicurezza di un prodotto produce due effetti negativi: rallenta il lavoro utile e svaluta i controlli, perché le persone imparano a considerarli burocrazia. La soluzione non è ridurre i controlli ma graduarli con criteri dichiarati. Tre domande funzionano bene: il sistema decide o propone, gli effetti sono reversibili o permanenti, e le persone interessate possono verificare e contestare il risultato. Un sistema che propone, con effetti reversibili e verifica possibile, richiede documentazione, registro e valutazione, ma non una procedura di conformità estesa. Un sistema che decide, con effetti permanenti e senza possibilità di contestazione, la richiede sempre. Rendere esplicita questa scala evita due errori simmetrici: trattare tutto come ad alto rischio, che blocca l’organizzazione, e trattare tutto come sperimentazione innocua, che produce esposizioni scoperte solo dopo. In un colloquio, saper graduare è un segnale di maturità maggiore rispetto a elencare tutti i controlli possibili.`,
    `A frequently neglected practical aspect concerns proportionality of governance. Applying to an internal document assistant the same apparatus designed for a system affecting product safety produces two negative effects: it slows useful work and devalues the controls, because people learn to see them as bureaucracy. The solution is not fewer controls but graded controls with declared criteria. Three questions work well: does the system decide or propose, are effects reversible or permanent, and can affected people verify and contest the result. A system that proposes, with reversible effects and possible verification, requires documentation, logging, and evaluation, but not an extensive conformity procedure. A system that decides, with permanent effects and no route to contest, always requires one. Making this scale explicit avoids two symmetric errors: treating everything as high risk, which stalls the organization, and treating everything as harmless experimentation, which produces exposures discovered only afterwards. In an interview, the ability to grade is a stronger sign of maturity than listing every possible control.`
  )
]

const theorySeven = [
  t(
    `Il monitoraggio di un sistema assistito ha tre livelli che vanno tenuti distinti. Il primo è tecnico: disponibilità, latenza, errori, costo e saturazione delle dipendenze. Il secondo è di qualità del modello: copertura delle citazioni, tasso di rifiuto, distribuzione delle richieste, lunghezza del contesto, quota di casi che raggiungono la soglia. Il terzo è di esito operativo: tempo per raggiungere la fonte corretta, tasso di accettazione delle proposte, correzioni successive, difetti sfuggiti. Solo il terzo livello dimostra valore, ma i primi due spiegano le variazioni del terzo. Un errore frequente è costruire soltanto il primo livello, perché è quello che gli strumenti esistenti offrono già. Un sistema con disponibilità perfetta che risponde bene sempre meno spesso appare sano su ogni cruscotto tecnico e sta comunque peggiorando.`,
    `Monitoring an assisted system has three levels that must be kept distinct. The first is technical: availability, latency, errors, cost, and dependency saturation. The second is model quality: citation coverage, refusal rate, request distribution, context length, and the share of cases reaching the threshold. The third is operational outcome: time to reach the correct source, proposal acceptance rate, later corrections, escaped defects. Only the third level demonstrates value, but the first two explain its variations. A frequent error is building only the first level, because that is what existing tools already provide. A system with perfect availability that answers well less and less often looks healthy on every technical dashboard and is nevertheless degrading.`
  ),
  t(
    `La deriva ha cause diverse e rimedi diversi. La deriva dei dati in ingresso avviene quando cambia la popolazione delle richieste, per esempio perché un nuovo prodotto entra in linea. La deriva del contenuto avviene quando il corpus cambia: una revisione massiva delle specifiche può invalidare una parte dell’indice. La deriva del comportamento avviene quando gli utenti imparano a usare lo strumento in modo diverso da quello previsto. La deriva del fornitore avviene quando un modello ospitato viene aggiornato senza preavviso significativo. Ognuna richiede un segnale specifico: distribuzione delle richieste, data dell’ultima reindicizzazione, lunghezza e forma delle domande, versione del modello registrata a ogni risposta. Attribuire ogni peggioramento al modello è il modo più veloce per non trovare la causa.`,
    `Drift has different causes and different remedies. Input drift happens when the request population changes, for example because a new product enters the line. Content drift happens when the corpus changes: a large specification revision can invalidate part of the index. Behavior drift happens when users learn to use the tool differently than intended. Provider drift happens when a hosted model is updated without meaningful notice. Each requires a specific signal: request distribution, date of the last reindexing, question length and shape, and the model version recorded with every answer. Attributing every degradation to the model is the fastest way to never find the cause.`
  ),
  t(
    `La risposta agli incidenti per un sistema assistito segue la stessa disciplina degli altri incidenti di sicurezza e operativi, e le raccomandazioni pubblicate dall’istituto statunitense di standard nella revisione più recente collegano esplicitamente la risposta agli incidenti alle funzioni di gestione del rischio, invece di trattarla come una procedura isolata. In pratica servono: una definizione di che cosa conta come incidente per questo sistema, un canale di segnalazione che gli operatori conoscono, un ruolo che coordina, criteri di gravità, azioni di contenimento predefinite, un percorso di comunicazione e una revisione successiva senza colpevolizzazione. Per un assistente documentale il contenimento più utile è quasi sempre lo stesso: disattivare la funzione e tornare al percorso manuale. Averlo scritto in anticipo trasforma una decisione difficile in una operazione di routine.`,
    `Incident response for an assisted system follows the same discipline as other security and operational incidents, and the recommendations published by the United States standards institute in the most recent revision explicitly connect incident response to risk management functions instead of treating it as an isolated procedure. In practice you need: a definition of what counts as an incident for this system, a reporting channel operators know, a coordinating role, severity criteria, predefined containment actions, a communication path, and a blameless review afterwards. For a document assistant the most useful containment is almost always the same: disable the feature and return to the manual path. Having written it in advance turns a hard decision into a routine operation.`
  ),
  t(
    `Il controllo del cambiamento è ciò che impedisce a un sistema valutato di diventare un sistema diverso senza che nessuno lo sappia. Ogni modifica a corpus, parser, indice, prompt, parametri o modello è un cambiamento e va trattata come tale. La regola minima è che nessun cambiamento raggiunge la produzione senza rieseguire il set di valutazione e senza un record che indichi chi ha approvato, quando e sulla base di quale esito. Serve anche una politica per i cambiamenti che non controlliamo, cioè gli aggiornamenti dei fornitori: fissare la versione quando possibile, monitorare gli avvisi, e trattare un aggiornamento imposto come un cambiamento che richiede rivalutazione. Molte organizzazioni scoprono questa necessità dopo il primo peggioramento inspiegabile, che con i registri corretti avrebbe richiesto dieci minuti invece di due settimane.`,
    `Change control is what prevents an evaluated system from becoming a different system without anyone knowing. Every modification to corpus, parser, index, prompt, parameters, or model is a change and must be treated as one. The minimum rule is that no change reaches production without rerunning the evaluation set and without a record naming who approved it, when, and on the basis of which result. A policy is also needed for changes we do not control, meaning provider updates: pin the version where possible, monitor notices, and treat a forced update as a change requiring reassessment. Many organizations discover this need after the first unexplained degradation, which with proper records would have taken ten minutes to diagnose instead of two weeks.`
  ),
  t(
    `La sorveglianza umana è efficace soltanto se la persona può capire, verificare e non essere d’accordo. Capire richiede che la proposta indichi la fonte specifica e non un riferimento generico. Verificare richiede che la fonte sia apribile con un solo gesto e che mostri la revisione usata. Non essere d’accordo richiede che rifiutare sia semplice quanto accettare, e che il rifiuto venga registrato come dato utile invece che come eccezione fastidiosa. Il rischio opposto è la supervisione soltanto formale, dove la persona conferma per abitudine. Si misura con campionamento indipendente delle conferme e con il tempo trascorso prima della conferma. Se il novanta per cento delle conferme avviene in meno di due secondi su casi a rischio alto, la sorveglianza esiste sulla carta e non nel processo, e questo va dichiarato invece che nascosto.`,
    `Human oversight is effective only if the person can understand, verify, and disagree. Understanding requires the proposal to indicate the specific source rather than a generic reference. Verifying requires that source to open in a single gesture and to show the revision used. Disagreeing requires refusal to be as easy as acceptance, and the refusal to be recorded as useful data rather than as an annoying exception. The opposite risk is purely formal supervision, where the person confirms out of habit. It is measured with independent sampling of confirmations and with time elapsed before confirmation. If ninety percent of confirmations happen in under two seconds on high-risk cases, oversight exists on paper and not in the process, and that must be declared rather than hidden.`
  ),
  t(
    `Il monitoraggio produce valore soltanto se qualcuno guarda i segnali e ha il potere di agire. Un cruscotto senza destinatario dichiarato è un costo senza beneficio. Per questo conviene definire pochi indicatori con una soglia e un destinatario, invece di molti indicatori senza conseguenze. Tre esempi concreti funzionano quasi sempre: il tasso di rifiuto con soglia superiore e inferiore, perché sia un aumento sia un crollo indicano un problema diverso; la copertura delle citazioni, perché misura direttamente la condizione che rende possibile la verifica umana; e la distanza tra proposte accettate e proposte poi corrette, perché rivela un eccesso di fiducia prima che diventi un incidente. Per ciascun indicatore si dichiara chi lo riceve, con quale cadenza e che cosa fa se supera la soglia. La revisione periodica deve essere breve e regolare, per esempio trenta minuti ogni due settimane con process owner e responsabile del servizio, invece di una revisione trimestrale approfondita che nessuno riesce a preparare. La regolarità, non la profondità, è ciò che intercetta le derive quando correggerle costa ancora poco.`,
    `Monitoring produces value only if somebody looks at the signals and has the power to act. A dashboard without a declared recipient is a cost without a benefit. It is therefore better to define a few indicators with a threshold and a recipient than many indicators without consequences. Three concrete examples work almost always: refusal rate with both an upper and a lower threshold, because a rise and a collapse each indicate a different problem; citation coverage, because it directly measures the condition that makes human verification possible; and the gap between accepted proposals and proposals later corrected, because it reveals over-reliance before it becomes an incident. For each indicator you declare who receives it, at which cadence, and what they do when it crosses the threshold. The periodic review must be short and regular, for example thirty minutes every two weeks with the process owner and the service owner, rather than a deep quarterly review nobody manages to prepare. Regularity, not depth, is what catches drift while correcting it is still cheap.`
  )
]

const theoryEight = [
  t(
    `Scalare non significa installare la stessa applicazione altrove. Significa riprodurre un risultato in un contesto che differisce per dati, processo, persone e vincoli. La domanda corretta non è se la tecnologia funziona, ma quale parte del risultato dipendeva dal contesto originale. In un primo sito il risultato può dipendere da un archivio documentale insolitamente ordinato, da un process owner molto disponibile o da una linea con pochi prodotti. Nessuno di questi tre fattori si trasferisce automaticamente. Per questo il passaggio da uno a molti richiede cancelli espliciti invece di una decisione di espansione presa sull’entusiasmo del primo successo. Un cancello bloccante non superato ferma la raccomandazione, indipendentemente da quanti altri cancelli sono verdi. La media dei cancelli non è una misura valida, perché i rischi non si compensano tra loro.`,
    `Scaling does not mean installing the same application elsewhere. It means reproducing a result in a context that differs in data, process, people, and constraints. The correct question is not whether the technology works, but which part of the result depended on the original context. At the first site the result may depend on an unusually tidy document archive, a highly available process owner, or a line with few products. None of those three factors transfers automatically. That is why moving from one to many requires explicit gates instead of an expansion decision taken on the enthusiasm of the first success. One unmet blocking gate stops the recommendation, regardless of how many other gates are green. Averaging gates is not a valid measure, because risks do not offset each other.`
  ),
  t(
    `La scelta tra piattaforma globale e configurazione locale è la decisione architetturale più costosa da correggere. Una piattaforma globale centralizza autenticazione, registri, valutazione, monitoraggio, gestione dei modelli e controllo del cambiamento, e lascia locali soltanto i contenuti, le etichette di accesso e i parametri di processo. Una configurazione locale per sito è più veloce all’inizio e diventa ingestibile a cinque siti, perché ogni valutazione va rifatta e ogni correzione va ripetuta. La regola pratica è centralizzare ciò che deve essere coerente per essere valutabile, e lasciare locale ciò che riflette differenze reali di processo. Il criterio non è la preferenza organizzativa ma la ripetibilità della evidenza: se non è possibile dire quale versione era attiva in quale sito quando è avvenuto un evento, la governance è già persa.`,
    `The choice between a global platform and local configuration is the most expensive architectural decision to correct. A global platform centralizes authentication, logging, evaluation, monitoring, model management, and change control, and leaves only content, access labels, and process parameters local. Per-site local configuration is faster at first and becomes unmanageable at five sites, because every evaluation must be redone and every fix repeated. The practical rule is to centralize what must be consistent in order to be assessable, and to leave local what reflects real process differences. The criterion is not organizational preference but repeatability of evidence: if you cannot say which version was active at which site when an event happened, governance is already lost.`
  ),
  t(
    `Il modello di supporto è la parte che decide se il secondo sito avrà la stessa esperienza del primo. Servono tre livelli chiari: chi risponde alle domande di uso quotidiano nel sito, chi interviene su problemi tecnici del servizio e chi decide sui cambiamenti di contenuto e di regole. Servono orari di copertura coerenti con i turni produttivi, un percorso di escalation con tempi dichiarati e un proprietario locale nominato che non sia semplicemente la persona più curiosa del reparto. Va anche pianificato il carico: la formazione iniziale, il periodo di affiancamento e il calo di domande dopo qualche settimana. Un piano di scaling senza modello di supporto scritto non è un piano, è una previsione ottimistica. Nei colloqui questa è spesso la domanda che separa una risposta teorica da una risposta vissuta.`,
    `The support model decides whether the second site will have the same experience as the first. Three clear levels are needed: who answers daily usage questions on site, who handles technical service problems, and who decides on content and rule changes. Coverage hours consistent with production shifts, an escalation path with declared response times, and a named local owner who is not simply the most curious person in the department are all required. The load must also be planned: initial training, a shadowing period, and the drop in questions after a few weeks. A scaling plan without a written support model is not a plan, it is an optimistic forecast. In interviews this is often the question that separates a theoretical answer from a lived one.`
  ),
  t(
    `L’adozione si progetta come qualunque altro cambiamento operativo. Le persone adottano uno strumento quando risolve un fastidio che riconoscono, quando possono verificarne le proposte e quando non temono di essere valutate attraverso di esso. Il terzo punto è quello più sottovalutato: se gli operatori sospettano che i registri servano a misurare la loro velocità, l’uso diventa difensivo e i dati diventano inutili. Va quindi dichiarato in modo esplicito e verificabile a che cosa servono i registri e a che cosa non servono. Va anche coinvolto presto chi ha più esperienza, perché il rifiuto delle persone competenti è quasi sempre un segnale tecnico, non un problema di comunicazione. Un adottante scettico che spiega perché la proposta è sbagliata è la fonte di miglioramento più preziosa del pilota.`,
    `Adoption is designed like any other operational change. People adopt a tool when it solves an annoyance they recognize, when they can verify its proposals, and when they do not fear being evaluated through it. The third point is the most underestimated: if operators suspect logs are used to measure their speed, usage becomes defensive and the data becomes useless. What the logs are for, and what they are not for, must therefore be stated explicitly and verifiably. Experienced people must also be involved early, because rejection by competent staff is almost always a technical signal rather than a communication problem. A skeptical adopter who explains why the proposal is wrong is the most valuable source of improvement in the pilot.`
  ),
  t(
    `Decidere di non scalare è una competenza professionale, non un fallimento. I segnali che giustificano un no sono concreti: il beneficio misurato è dentro la variabilità naturale del processo, un cancello bloccante resta non superato, la sorveglianza umana risulta formale invece che effettiva, il modello di supporto non ha un proprietario firmato, oppure la standardizzazione dei dati nei siti riceventi è troppo bassa perché la stessa soluzione funzioni. In questi casi la raccomandazione corretta è mantenere il perimetro, dichiarare la condizione mancante, assegnarne la proprietà con una scadenza e fissare una data di riesame. Questa risposta è più forte di un sì entusiasta, perché mostra che il candidato protegge l’organizzazione dal costo nascosto di una espansione prematura, che è quasi sempre superiore al costo di attendere un trimestre.`,
    `Deciding not to scale is a professional skill, not a failure. The signals that justify a no are concrete: measured benefit sits inside the natural variability of the process, a blocking gate remains unmet, human oversight turns out to be formal rather than effective, the support model has no signed owner, or data standardization at receiving sites is too low for the same solution to work. In these cases the correct recommendation is to hold the scope, declare the missing condition, assign ownership with a deadline, and fix a review date. This answer is stronger than an enthusiastic yes, because it shows the candidate protects the organization from the hidden cost of premature expansion, which is almost always higher than the cost of waiting a quarter.`
  ),
  t(
    `Vale la pena chiudere con il modo di comunicare una decisione di scaling, perché una raccomandazione corretta presentata male viene ribaltata in riunione. La struttura che funziona è breve e ordinata: prima il risultato misurato con il confronto rispetto alla baseline, poi la condizione che manca, poi la proposta con proprietario e scadenza, infine il costo del ritardo confrontato con il costo del rischio. Presentare l’ordine inverso, cioè partire dai rischi, sposta la conversazione sulla prudenza e fa apparire il progetto fragile. Presentare soltanto il risultato positivo, invece, ottiene un via libera che diventerà un problema tre mesi dopo. Serve anche un linguaggio che separi con chiarezza ciò che è misurato da ciò che è stimato, perché la credibilità del responsabile dipende dalla precisione di questa distinzione più che dalla dimensione dei numeri. Una raccomandazione formulata così permette a chi decide di scegliere consapevolmente, e nel caso di un no lascia comunque un percorso di rientro visibile, che è la ragione per cui la decisione viene accettata invece che rinegoziata alla riunione successiva.`,
    `It is worth closing with how a scaling decision is communicated, because a correct recommendation presented badly gets overturned in the meeting. The structure that works is short and ordered: first the measured result compared with the baseline, then the missing condition, then the proposal with owner and deadline, and finally the cost of delay compared with the cost of the risk. Presenting the reverse order, starting from risks, moves the conversation onto caution and makes the project look fragile. Presenting only the positive result instead earns an approval that becomes a problem three months later. Language that clearly separates what is measured from what is estimated is also required, because a lead credibility depends on the precision of that distinction more than on the size of the numbers. A recommendation framed this way lets decision makers choose knowingly, and in the case of a no it still leaves a visible return path, which is why the decision gets accepted rather than renegotiated at the next meeting.`
  )
]

const shadowModeQualityAssistantCase = {
  id: 'shadow-mode-quality-assistant',
  durationMinutes: 4,
  pmiCase: true,
  hypothetical: true,
  publicContext: true,
  title: t(
    'Caso ipotetico: assistente di qualità in modalità shadow',
    'Hypothetical case: shadow-mode quality assistant'
  ),
  scenario: t(
    'Sulla linea PKG-04 del sito RM1 un assistente documentale gira in modalità shadow per venti turni. Registra la propria proposta su ogni controllo di lotto senza mostrarla. Document Control adjudica a posteriori quali lotti richiedevano davvero un blocco.',
    'On line PKG-04 at site RM1 a document assistant runs in shadow mode for twenty shifts. It records its own proposal on every batch check without displaying it. Document Control adjudicates afterwards which batches genuinely required a hold.'
  ),
  assumptions: [
    t('Il repository documentale controllato è la fonte autorevole di criteri e revisioni.', 'The controlled document repository is the authoritative source of criteria and revisions.'),
    t('L’adjudicazione è eseguita da Document Control, indipendente dal team che costruisce.', 'Adjudication is performed by Document Control, independent from the building team.'),
    t('Il campione copre entrambi i turni e il mix di prodotto del periodo di baseline.', 'The sample covers both shifts and the product mix of the baseline period.')
  ],
  analysisSteps: [
    t('Registrare la proposta senza mostrarla, con versione di corpus, indice, prompt e modello.', 'Record the proposal without showing it, with corpus, index, prompt, and model versions.'),
    t('Confrontare le proposte con la adjudicazione indipendente e costruire la matrice di confusione.', 'Compare proposals with independent adjudication and build the confusion matrix.'),
    t('Calcolare precisione e richiamo separatamente invece di una accuratezza complessiva.', 'Compute precision and recall separately instead of an overall accuracy.'),
    t('Verificare che la coda di revisione generata resti dentro la capacità del turno.', 'Verify that the generated review queue stays within shift capacity.'),
    t('Confrontare gli esiti con i cancelli non negoziabili prima di proporre il passaggio ad advisory.', 'Compare outcomes with the non-negotiable gates before proposing the move to advisory mode.')
  ],
  reasoning: t(
    'Una accuratezza del novanta per cento non dice nulla, perché i lotti da bloccare sono rari. Con 1.200 controlli, 96 blocchi corretti, 64 falsi allarmi e 24 blocchi mancati, la precisione è 0,60 e il richiamo 0,80. Il costo dei due errori è asimmetrico: un falso allarme consuma tempo di revisione, un blocco mancato può arrivare al cliente. Le segnalazioni totali sono 160 su venti turni, cioè otto per turno contro una capacità di dodici, quindi la coda è sostenibile.',
    'Ninety percent accuracy says nothing, because batches needing a hold are rare. With 1,200 checks, 96 correct holds, 64 false alarms, and 24 missed holds, precision is 0.60 and recall is 0.80. The cost of the two errors is asymmetric: a false alarm consumes review time, while a missed hold can reach the customer. Total flags are 160 over twenty shifts, that is eight per shift against a capacity of twelve, so the queue is sustainable.'
  ),
  decision: t(
    'Passare a modalità advisory ristretta soltanto sui controlli visivi, con citazione apribile obbligatoria, perché il cancello sulle esposizioni non autorizzate e quello sulle deviazioni di sicurezza sono superati e la coda di revisione è dentro capacità.',
    'Move to a narrow advisory mode limited to visual checks, with a mandatory openable citation, because the unauthorized exposure gate and the safety deviation gate are met and the review queue is within capacity.'
  ),
  tradeOff: t(
    'Una precisione di 0,60 significa che quattro segnalazioni su dieci faranno perdere tempo. Alzare la soglia ridurrebbe i falsi allarmi ma abbasserebbe il richiamo sotto 0,80, spostando il costo su un errore molto più caro. Si preferisce quindi conservare il richiamo e finanziare la capacità di revisione.',
    'A precision of 0.60 means four flags in ten will waste time. Raising the threshold would cut false alarms but drop recall below 0.80, moving the cost onto a far more expensive error. The choice is therefore to protect recall and fund review capacity.'
  ),
  outcome: t(
    'Il passaggio ad advisory è approvato con perimetro ristretto, campionamento indipendente delle conferme e riesame a sei settimane. Lo scaling ad altri siti resta fermo perché la sorveglianza effettiva non è ancora dimostrata.',
    'The move to advisory mode is approved with a narrow scope, independent sampling of confirmations, and a six-week review. Scaling to other sites stays on hold because effective oversight is not yet demonstrated.'
  ),
  followUps: [
    t('Che cosa cambieresti se il richiamo scendesse a 0,55?', 'What would you change if recall dropped to 0.55?'),
    t('Come distingueresti un peggioramento del modello da un cambio di mix di prodotto?', 'How would you distinguish model degradation from a change in product mix?')
  ],
  caseArtifact: {
    sampleSize: 1200,
    shiftsObserved: 20,
    confusion: {
      truePositives: 96,
      falsePositives: 64,
      falseNegatives: 24,
      trueNegatives: 1016
    },
    precision: 0.6,
    recall: 0.8,
    flaggedPerShift: 8,
    reviewQueuePerShift: 8,
    reviewCapacityPerShift: 12,
    canvas: mvpExperimentCanvas,
    hardGatesChecked: [
      { id: 'unauthorized-disclosure', result: 'pass', evidenceRef: 'GATE-ACL-2026-002' },
      { id: 'safety-related-deviations', result: 'pass', evidenceRef: 'HSE-2026-041' }
    ]
  }
}

const plantToMultiPlantRolloutCase = {
  id: 'plant-to-multi-plant-rollout',
  durationMinutes: 4,
  pmiCase: true,
  hypothetical: true,
  publicContext: true,
  title: t(
    'Caso ipotetico: da un sito a più stabilimenti',
    'Hypothetical case: from one site to multiple plants'
  ),
  scenario: t(
    'Dopo sei settimane di advisory su RM1, la direzione chiede di estendere l’assistente ad altri tre stabilimenti entro il trimestre. Ogni sito viene valutato su cinque criteri pesati e sui cancelli bloccanti della checklist di scaling.',
    'After six weeks of advisory mode at RM1, management asks to extend the assistant to three more plants within the quarter. Each site is assessed on five weighted criteria and against the blocking gates of the scaling checklist.'
  ),
  assumptions: [
    t('I pesi dei criteri sono concordati prima di vedere i punteggi dei siti.', 'Criterion weights are agreed before seeing site scores.'),
    t('I punteggi provengono da evidenza documentata, non da autovalutazione dei siti.', 'Scores come from documented evidence, not from site self-assessment.'),
    t('I cancelli bloccanti valgono per ogni sito e non si compensano tra loro.', 'Blocking gates apply to every site and do not offset each other.')
  ],
  analysisSteps: [
    t('Pesare i cinque criteri di prontezza e calcolare il punteggio di ciascun sito.', 'Weight the five readiness criteria and compute each site score.'),
    t('Applicare la soglia di prontezza pari a 70 su 100.', 'Apply the readiness threshold of 70 out of 100.'),
    t('Verificare separatamente i cancelli bloccanti di sicurezza, accesso e supervisione.', 'Separately verify the blocking gates for safety, access, and oversight.'),
    t('Escludere qualunque sito con un cancello bloccante non superato, anche con punteggio alto.', 'Exclude any site with an unmet blocking gate, even with a high score.'),
    t('Registrare la decisione con owner, condizione mancante e data di riesame.', 'Record the decision with owner, missing condition, and review date.')
  ],
  reasoning: t(
    'RM1 ottiene 87 e KRK2 74, entrambi sopra la soglia di 70 e con cancelli superati. BLN3 ottiene 62 perché i criteri di accettazione non sono strutturati in modo uniforme, quindi resta sotto soglia. IZM4 ottiene 85, il punteggio più alto dopo RM1, ma non supera il cancello sull’accesso remoto del fornitore, e un cancello bloccante non si compensa con un punteggio elevato.',
    'RM1 scores 87 and KRK2 scores 74, both above the threshold of 70 and with gates met. BLN3 scores 62 because acceptance criteria are not uniformly structured, so it stays below threshold. IZM4 scores 85, the highest after RM1, but fails the vendor remote-access gate, and a blocking gate is not offset by a high score.'
  ),
  decision: t(
    'Estendere soltanto a KRK2 nel trimestre, mantenere BLN3 in preparazione dei dati e sospendere IZM4 finché l’accesso remoto del fornitore non rientra nella politica, con owner e scadenza dichiarati.',
    'Extend only to KRK2 this quarter, keep BLN3 in data preparation, and suspend IZM4 until vendor remote access complies with policy, with a declared owner and deadline.'
  ),
  tradeOff: t(
    'Estendere a due siti invece di tre riduce il beneficio dichiarabile nel trimestre e ritarda il ritorno atteso. In cambio evita di introdurre un percorso di accesso non conforme in uno stabilimento e di sostenere il costo di una correzione retroattiva su un sistema già in uso.',
    'Extending to two sites instead of three lowers the benefit claimable this quarter and delays the expected return. In exchange it avoids introducing a non-compliant access path into a plant and paying for a retroactive correction on a system already in use.'
  ),
  outcome: t(
    'La raccomandazione complessiva della checklist resta hold: tre cancelli bloccanti sono superati, ma supervisione effettiva e modello di supporto non lo sono ancora. Il riesame è fissato e le condizioni mancanti hanno un proprietario.',
    'The overall checklist recommendation stays hold: three blocking gates are met, but effective oversight and the support model are not yet. The review is scheduled and the missing conditions have an owner.'
  ),
  followUps: [
    t('Che cosa risponderesti se la direzione chiedesse comunque i tre siti?', 'What would you answer if management still asked for all three sites?'),
    t('Quale evidenza ti farebbe cambiare la decisione su IZM4?', 'Which evidence would change your decision on IZM4?')
  ],
  caseArtifact: {
    readinessThreshold: 70,
    weightScale: t('Pesi interi su 10, punteggi interi da 0 a 10.', 'Integer weights out of 10, integer scores from 0 to 10.'),
    criteriaDefinition: [
      { id: 'data-quality', weight: 3, label: t('Qualità e struttura dei documenti', 'Document quality and structure') },
      { id: 'process-standardization', weight: 3, label: t('Standardizzazione del processo di controllo', 'Standardization of the inspection process') },
      { id: 'local-ownership', weight: 2, label: t('Proprietario locale nominato', 'Named local owner') },
      { id: 'network-segmentation', weight: 1, label: t('Prontezza di segmentazione e accessi', 'Segmentation and access readiness') },
      { id: 'change-capacity', weight: 1, label: t('Capacità di assorbire il cambiamento', 'Capacity to absorb change') }
    ],
    plants: [
      {
        id: 'rm1',
        label: t('Sito RM1, pilota originale', 'Site RM1, original pilot'),
        criteria: [
          { id: 'data-quality', weight: 3, score: 9 },
          { id: 'process-standardization', weight: 3, score: 9 },
          { id: 'local-ownership', weight: 2, score: 8 },
          { id: 'network-segmentation', weight: 1, score: 8 },
          { id: 'change-capacity', weight: 1, score: 9 }
        ],
        readinessScore: 87,
        hardGatesPassed: true,
        eligible: true,
        note: t('Contesto di riferimento, già in advisory ristretto.', 'Reference context, already in narrow advisory mode.')
      },
      {
        id: 'krk2',
        label: t('Sito KRK2', 'Site KRK2'),
        criteria: [
          { id: 'data-quality', weight: 3, score: 8 },
          { id: 'process-standardization', weight: 3, score: 7 },
          { id: 'local-ownership', weight: 2, score: 7 },
          { id: 'network-segmentation', weight: 1, score: 7 },
          { id: 'change-capacity', weight: 1, score: 8 }
        ],
        readinessScore: 74,
        hardGatesPassed: true,
        eligible: true,
        note: t('Sopra soglia con margine ridotto; riesame anticipato a quattro settimane.', 'Above threshold with a small margin; review brought forward to four weeks.')
      },
      {
        id: 'bln3',
        label: t('Sito BLN3', 'Site BLN3'),
        criteria: [
          { id: 'data-quality', weight: 3, score: 7 },
          { id: 'process-standardization', weight: 3, score: 6 },
          { id: 'local-ownership', weight: 2, score: 6 },
          { id: 'network-segmentation', weight: 1, score: 5 },
          { id: 'change-capacity', weight: 1, score: 6 }
        ],
        readinessScore: 62,
        hardGatesPassed: true,
        eligible: false,
        note: t('Sotto soglia per struttura documentale non uniforme.', 'Below threshold because of non-uniform document structure.')
      },
      {
        id: 'izm4',
        label: t('Sito IZM4', 'Site IZM4'),
        criteria: [
          { id: 'data-quality', weight: 3, score: 9 },
          { id: 'process-standardization', weight: 3, score: 8 },
          { id: 'local-ownership', weight: 2, score: 8 },
          { id: 'network-segmentation', weight: 1, score: 9 },
          { id: 'change-capacity', weight: 1, score: 9 }
        ],
        readinessScore: 85,
        hardGatesPassed: false,
        eligible: false,
        note: t('Punteggio alto ma accesso remoto del fornitore fuori politica: cancello bloccante non superato.', 'High score but vendor remote access outside policy: blocking gate not met.')
      }
    ],
    selectedPlantIds: ['rm1', 'krk2'],
    checklist: scalingGateChecklist,
    decisionRecord: t(
      'Estensione approvata soltanto per KRK2; IZM4 sospeso su cancello di accesso remoto; BLN3 in preparazione dati. Owner: direttore di stabilimento. Riesame: 2026-10-05.',
      'Extension approved for KRK2 only; IZM4 suspended on the remote-access gate; BLN3 in data preparation. Owner: plant manager. Review: 2026-10-05.'
    )
  }
}

const units = [
  {
    id: 'discovery-baseline-riskiest-assumption',
    eyebrow: t('Unità 1', 'Unit 1'),
    title: t(
      'Discovery, osservazione del processo, baseline e assunzione più rischiosa',
      'Discovery, process observation, baseline, and riskiest assumption'
    ),
    estimatedMinutes: 9,
    timeAllocation: { theory: 5, cases: 2, practice: 2 },
    theory: theoryOne,
    terminology: [t(
      'Baseline: valore misurato prima dell’intervento, con definizione, finestra e proprietario dichiarati.',
      'Baseline: the value measured before the intervention, with declared definition, window, and owner.'
    )],
    microExamples: [microExample(
      'baseline-or-anecdote', 2,
      'Baseline oppure aneddoto', 'Baseline or anecdote',
      'Due descrizioni dello stesso problema sembrano equivalenti finché non si guarda che cosa sarebbe verificabile fra sei settimane.',
      'Two descriptions of the same problem look equivalent until you ask what would be verifiable in six weeks.',
      {
        learnerAction: ['Confronta le due formulazioni e scegli quella utilizzabile come baseline.', 'Compare the two statements and choose the one usable as a baseline.'],
        expectedOutput: ['Una scelta con il campo mancante nell’altra formulazione.', 'One choice plus the field missing from the other statement.'],
        modelReasoning: ['La formulazione B dichiara metrica, finestra, popolazione e proprietario, quindi è confrontabile; la formulazione A non è falsificabile.', 'Statement B declares metric, window, population, and owner, so it is comparable; statement A is not falsifiable.'],
        responseFormat: ['Formulazione scelta | campo mancante nell’altra.', 'Selected statement | field missing in the other.'],
        columns: [['Elemento', 'Element'], ['Formulazione A', 'Statement A'], ['Formulazione B', 'Statement B']],
        rows: [
          ['metric', ['Metrica', 'Metric'], ['"Si perde troppo tempo"', '"Too much time is lost"'], ['Tempo mediano al criterio corretto', 'Median time to correct criterion']],
          ['window', ['Finestra', 'Window'], ['Non dichiarata', 'Not declared'], ['Quattro settimane, due turni', 'Four weeks, two shifts']],
          ['owner', ['Proprietario del dato', 'Data owner'], ['Nessuno', 'None'], ['Process owner di qualità', 'Quality process owner']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 0
      }
    )],
    activities: [activity(
      'name-the-riskiest-assumption', 2,
      'Indica l’assunzione più rischiosa del progetto e il test più economico per attaccarla.',
      'Name the riskiest assumption of the project and the cheapest test that attacks it.',
      'Una assunzione più un test.', 'One assumption plus one test.',
      'I criteri di accettazione sono in parte scansioni senza testo, senza revisione dichiarata e senza ambito.',
      'Acceptance criteria are partly scanned images without text, declared revision, or scope.',
      'Assunzione | test in una frase.', 'Assumption | test in one sentence.',
      'Assumiamo che i criteri siano recuperabili con revisione e ambito affidabili; il test più economico è campionare cinquanta documenti e misurare quanti hanno testo, revisione e ambito leggibili, prima di costruire qualunque indice.',
      'We assume criteria are retrievable with reliable revision and scope; the cheapest test is sampling fifty documents and measuring how many have readable text, revision, and scope, before building any index.',
      'Individua un rischio abilitante e un test proporzionato al suo costo.',
      'Identifies an enabling risk and a test proportionate to its cost.'
    )],
    checkpoint: checkpoint(
      'Che cosa rende una baseline utilizzabile per decidere?',
      'What makes a baseline usable for a decision?',
      [
        ['Un valore medio riportato dal team di progetto.', 'An average value reported by the project team.', 'Senza definizione e proprietario il numero resta negoziabile.', 'Without a definition and an owner the number stays negotiable.'],
        ['Metrica definita, finestra, popolazione, metodo e proprietario del dato.', 'Defined metric, window, population, method, and data owner.', 'Sono le condizioni che rendono confrontabile il valore finale.', 'These are the conditions that make the final value comparable.'],
        ['Una stima concordata in riunione per accelerare.', 'An estimate agreed in a meeting to move faster.', 'Una stima non misurata non dimostra alcun miglioramento.', 'An unmeasured estimate demonstrates no improvement.']
      ],
      1
    ),
    sourceIds: ['toyota-way-genchi-genbutsu', 'lean-enterprise-gemba', 'nist-manufacturing-kpi-procedure']
  },
  {
    id: 'mvp-prototype-pilot-scope',
    eyebrow: t('Unità 2', 'Unit 2'),
    title: t(
      'MVP, prototipo e pilota: il test end-to-end più piccolo',
      'MVP versus prototype versus pilot and the smallest end-to-end test'
    ),
    estimatedMinutes: 9,
    timeAllocation: { theory: 5, cases: 2, practice: 2 },
    theory: theoryTwo,
    terminology: [t(
      'Fetta verticale: percorso completo su un dominio ristretto, con tutti i controlli necessari.',
      'Vertical slice: a complete path over a narrow domain, retaining every necessary control.'
    )],
    microExamples: [microExample(
      'small-versus-incomplete', 2,
      'Piccolo oppure incompleto', 'Small or incomplete',
      'Due proposte di perimetro hanno lo stesso costo dichiarato ma producono evidenza molto diversa.',
      'Two scope proposals carry the same declared cost but produce very different evidence.',
      {
        learnerAction: ['Confronta i due perimetri e scegli quello che produce evidenza difendibile.', 'Compare the two scopes and choose the one producing defensible evidence.'],
        expectedOutput: ['Un perimetro scelto con il controllo che lo rende valutabile.', 'One selected scope with the control that makes it assessable.'],
        modelReasoning: ['Il perimetro ristretto conserva autorizzazione, citazione e registro, quindi i risultati sono adjudicabili; il perimetro ampio senza registro non lo è.', 'The narrow scope keeps authorization, citation, and logging, so results can be adjudicated; the wide scope without logging cannot.'],
        responseFormat: ['Perimetro scelto | controllo decisivo.', 'Selected scope | decisive control.'],
        columns: [['Dimensione', 'Dimension'], ['Perimetro A: una linea, con controlli', 'Scope A: one line, with controls'], ['Perimetro B: tre siti, senza registro', 'Scope B: three sites, no logging']],
        rows: [
          ['coverage', ['Copertura', 'Coverage'], ['Una linea, un tipo di documento', 'One line, one document type'], ['Tre siti, tutti i documenti', 'Three sites, all documents']],
          ['controls', ['Controlli', 'Controls'], ['Autorizzazione, citazione, registro', 'Authorization, citation, logging'], ['Nessun registro delle richieste', 'No request logging']],
          ['evidence', ['Evidenza ottenibile', 'Obtainable evidence'], ['Adjudicabile per caso', 'Adjudicable case by case'], ['Non ricostruibile', 'Not reconstructable']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 0
      }
    )],
    activities: [activity(
      'classify-prototype-mvp-pilot', 2,
      'Classifica la situazione come prototipo, MVP o pilota e dichiara che cosa non può dimostrare.',
      'Classify the situation as prototype, MVP, or pilot and state what it cannot demonstrate.',
      'Una classificazione più un limite.', 'One classification plus one limitation.',
      'Una demo mostra risposte convincenti su dieci documenti copiati a mano, senza autenticazione e senza registro.',
      'A demo shows convincing answers over ten manually copied documents, without authentication or logging.',
      'Classificazione | limite dichiarato.', 'Classification | declared limitation.',
      'È un prototipo: dimostra che il formato di risposta è comprensibile, ma non può dimostrare autorizzazione, versione effettiva, comportamento su casi non autorizzati né alcun beneficio operativo.',
      'It is a prototype: it shows the answer format is understandable, but it cannot demonstrate authorization, effective version, behavior on unauthorized cases, or any operational benefit.',
      'Classifica correttamente e nomina un limite non superabile in quella fase.',
      'Classifies correctly and names a limitation that phase cannot overcome.'
    )],
    checkpoint: checkpoint(
      'Che cosa si riduce quando si riduce un MVP industriale?',
      'What gets reduced when an industrial MVP is reduced?',
      [
        ['Il dominio: una linea, un documento, un gruppo di utenti.', 'The domain: one line, one document, one user group.', 'La fetta resta completa e quindi valutabile.', 'The slice stays complete and therefore assessable.'],
        ['I controlli di accesso e di registrazione.', 'Access and logging controls.', 'Senza controlli i risultati non sono difendibili.', 'Without controls the results are not defensible.'],
        ['La qualità della evidenza raccolta.', 'The quality of the collected evidence.', 'Ridurre l’evidenza rende inutile il test.', 'Reducing evidence makes the test pointless.']
      ],
      0
    ),
    sourceIds: ['nist-ai-rmf-1-0', 'nist-manufacturing-performance-baselines']
  },
  {
    id: 'integration-shadow-mode-ownership',
    eyebrow: t('Unità 3', 'Unit 3'),
    title: t(
      'Integrazione, modalità shadow, fallback, rollback e proprietà operativa',
      'Integration, shadow mode, fallback, rollback, and operational ownership'
    ),
    estimatedMinutes: 10,
    timeAllocation: { theory: 4, cases: 4, practice: 2 },
    theory: theoryThree,
    terminology: [t(
      'Modalità shadow: il sistema produce e registra la proposta senza mostrarla e senza influenzare la decisione.',
      'Shadow mode: the system produces and records its proposal without showing it or influencing the decision.'
    )],
    workedCases: [shadowModeQualityAssistantCase],
    activities: [activity(
      'define-fallback-behaviour', 2,
      'Definisci il comportamento del processo quando il servizio assistito non risponde.',
      'Define how the process behaves when the assisted service does not answer.',
      'Un comportamento di riserva.', 'One fallback behavior.',
      'Il servizio è indisponibile per quaranta minuti durante il turno di notte; il repository documentale resta raggiungibile manualmente.',
      'The service is unavailable for forty minutes during the night shift; the document repository remains reachable manually.',
      'Comportamento | messaggio all’operatore.', 'Behavior | operator message.',
      'Il processo torna alla ricerca manuale nel repository e il sistema mostra un messaggio esplicito di indisponibilità, senza risposte parziali e senza contenuto memorizzato in cache.',
      'The process returns to manual repository search and the system shows an explicit unavailability message, with no partial answers and no cached content.',
      'Il fallback preserva la decisione e non introduce risposte non verificabili.',
      'The fallback preserves the decision and introduces no unverifiable answers.'
    )],
    checkpoint: checkpoint(
      'Che cosa dimostra la modalità shadow e che cosa non dimostra?',
      'What does shadow mode demonstrate and what does it not?',
      [
        ['Dimostra accettazione e fiducia degli utenti.', 'It demonstrates user acceptance and trust.', 'La proposta non è visibile, quindi il comportamento non cambia.', 'The proposal is not visible, so behavior does not change.'],
        ['Dimostra la qualità delle proposte, non l’effetto sul comportamento umano.', 'It demonstrates proposal quality, not the effect on human behavior.', 'Serve una fase advisory ristretta per misurare quell’effetto.', 'A narrow advisory phase is needed to measure that effect.'],
        ['Dimostra che il sistema è pronto per la produzione piena.', 'It demonstrates readiness for full production.', 'Restano da verificare sorveglianza, supporto e scaling.', 'Oversight, support, and scaling remain to be verified.']
      ],
      1
    ),
    sourceIds: ['nist-ai-rmf-1-0', 'ahrq-raci-chart']
  },
  {
    id: 'ot-security-segmentation-safety',
    eyebrow: t('Unità 4', 'Unit 4'),
    title: t(
      'Cybersecurity OT, segmentazione, accesso remoto, disponibilità e sicurezza funzionale',
      'OT cybersecurity, segmentation, remote access, availability, and safety'
    ),
    estimatedMinutes: 10,
    timeAllocation: { theory: 5, cases: 3, practice: 2 },
    theory: theoryFour,
    terminology: [t(
      'Condotto: canale di comunicazione consentito tra due zone, con protocollo, direzione e comportamento degradato dichiarati.',
      'Conduit: a permitted communication channel between two zones, with declared protocol, direction, and degraded behavior.'
    )],
    caseSegments: [caseSegment(
      'integration-path-review', 3,
      'Revisione di un percorso di integrazione', 'Integration path review',
      'Tre proposte di collegamento arrivano alla revisione di sicurezza: lettura diretta dal livello di controllo, accesso permanente del fornitore e lettura dal historian in zona intermedia.',
      'Three connection proposals reach the security review: direct read from the control level, permanent vendor access, and a read from the historian in an intermediate zone.',
      {
        learnerAction: ['Confronta le tre proposte, interpreta il rischio dominante e scegli il percorso approvabile.', 'Compare the three proposals, interpret the dominant risk, and choose the approvable path.'],
        expectedOutput: ['Un percorso scelto con il rischio dominante delle due alternative.', 'One selected path with the dominant risk of the two alternatives.'],
        modelReasoning: ['La lettura dal historian resta fuori dal livello di controllo e in una zona intermedia; la lettura diretta mette carico dove la priorità è la disponibilità; l’accesso permanente crea un percorso in entrata non presidiato.', 'Reading from the historian stays out of the control level and inside an intermediate zone; direct reading places load where availability is the priority; permanent access creates an unattended inbound path.'],
        responseFormat: ['Percorso scelto | rischio dominante scartato.', 'Selected path | dominant rejected risk.'],
        columns: [['Proposta', 'Proposal'], ['Zona di origine', 'Source zone'], ['Direzione', 'Direction'], ['Rischio dominante', 'Dominant risk']],
        rows: [
          ['control-level', ['Lettura dal livello di controllo', 'Read from control level'], ['Zona di controllo', 'Control zone'], ['In uscita continua', 'Continuous outbound'], ['Degrado della disponibilità di linea', 'Degraded line availability']],
          ['vendor-permanent', ['Accesso permanente del fornitore', 'Permanent vendor access'], ['Esterno', 'External'], ['In entrata continua', 'Continuous inbound'], ['Percorso non presidiato verso la zona industriale', 'Unattended path into the industrial zone']],
          ['historian-dmz', ['Lettura dal historian in zona intermedia', 'Read from historian in intermediate zone'], ['Zona intermedia', 'Intermediate zone'], ['In uscita, a cadenza concordata', 'Outbound, on an agreed cadence'], ['Latenza maggiore e contesto da riconciliare', 'Higher latency and context to reconcile']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 1
      }
    )],
    activities: [activity(
      'reject-safety-loop-closure', 2,
      'Rispondi alla richiesta di far chiudere a un modello un anello di controllo con impatto su sicurezza.',
      'Answer a request to let a model close a safety-relevant control loop.',
      'Una risposta con alternativa.', 'One answer with an alternative.',
      'La richiesta è usare la previsione del modello per fermare automaticamente la macchina quando la vibrazione supera una soglia appresa.',
      'The request is to use the model prediction to stop the machine automatically when vibration exceeds a learned threshold.',
      'Rifiuto motivato | alternativa proposta.', 'Reasoned refusal | proposed alternative.',
      'La funzione di arresto resta al sistema strumentato di sicurezza, deterministico e verificabile; il modello segnala in anticipo la condizione a una persona e alla manutenzione, senza agire sull’attuatore.',
      'The stop function stays with the deterministic and verifiable safety instrumented system; the model flags the condition in advance to a person and to maintenance, without acting on the actuator.',
      'Preserva la catena di sicurezza e propone un contributo utile fuori da essa.',
      'Preserves the safety chain and proposes a useful contribution outside it.'
    )],
    checkpoint: checkpoint(
      'Perché in ambiente OT la priorità cambia rispetto ai sistemi gestionali?',
      'Why does the priority order change in an OT environment compared with business systems?',
      [
        ['Perché i dati industriali sono meno riservati.', 'Because industrial data is less confidential.', 'La riservatezza resta importante, ma non è la prima priorità.', 'Confidentiality still matters, it is simply not the first priority.'],
        ['Perché disponibilità e integrità del processo vengono prima, dato che una interruzione può creare condizioni non sicure.', 'Because process availability and integrity come first, since an interruption can create unsafe conditions.', 'È la ragione per cui metodi accettabili in ufficio non lo sono in impianto.', 'This is why methods acceptable in an office are not acceptable in a plant.'],
        ['Perché le reti industriali sono già isolate per costruzione.', 'Because industrial networks are already isolated by construction.', 'L’isolamento va progettato e verificato, non presunto.', 'Isolation must be designed and verified, not assumed.']
      ],
      1
    ),
    sourceIds: ['nist-sp-800-82-r3', 'isa-iec-62443', 'isa-18-alarm-management']
  },
  {
    id: 'genai-threats-and-excessive-agency',
    eyebrow: t('Unità 5', 'Unit 5'),
    title: t(
      'Minacce GenAI: prompt injection, fuga di dati, uso improprio degli strumenti e agency eccessiva',
      'GenAI threats: prompt injection, data leakage, tool misuse, and excessive agency'
    ),
    estimatedMinutes: 9,
    timeAllocation: { theory: 5, cases: 2, practice: 2 },
    theory: theoryFive,
    terminology: [t(
      'Agency eccessiva: autonomia, permessi o portata superiori a quanto il compito autorizzato richiede.',
      'Excessive agency: autonomy, permissions, or reach beyond what the authorized task requires.'
    )],
    microExamples: [microExample(
      'injection-defence-choice', 2,
      'Difesa contro istruzioni nascoste', 'Defense against hidden instructions',
      'Un documento caricato contiene una riga che chiede di ignorare i limiti di citazione e di elencare tutti i documenti disponibili.',
      'An ingested document contains a line asking to ignore citation limits and list every available document.',
      {
        learnerAction: ['Interpreta perché una difesa fallisce e scegli quella architetturale.', 'Interpret why one defense fails and choose the architectural one.'],
        expectedOutput: ['Una difesa scelta con la ragione del fallimento dell’altra.', 'One selected defense with the reason the other fails.'],
        modelReasoning: ['Una istruzione di sistema che chiede prudenza viaggia sullo stesso canale del testo ostile; limitare i permessi effettivi e verificare i claim agisce a prescindere dal contenuto.', 'A system instruction asking for caution travels on the same channel as the hostile text; limiting effective permissions and verifying claims works regardless of content.'],
        responseFormat: ['Difesa scelta | perché l’altra fallisce.', 'Selected defense | why the other fails.'],
        columns: [['Difesa', 'Defense'], ['Dove agisce', 'Where it acts'], ['Efficacia attesa', 'Expected effectiveness']],
        rows: [
          ['prompt-plea', ['Chiedere al modello di essere prudente', 'Asking the model to be careful'], ['Nel contesto, con il testo ostile', 'In the context, with the hostile text'], ['Non affidabile: stesso canale', 'Unreliable: same channel']],
          ['permission-limit', ['Limitare i permessi effettivi e verificare i claim', 'Limiting effective permissions and verifying claims'], ['Fuori dal modello', 'Outside the model'], ['Efficace a prescindere dal testo', 'Effective regardless of the text']]
        ],
        decisionCount: 1,
        comparisonCount: 0,
        interpretationCount: 1
      }
    )],
    activities: [activity(
      'spot-excessive-agency', 2,
      'Individua il caso di agency eccessiva e proponi la correzione minima.',
      'Identify the case of excessive agency and propose the minimum correction.',
      'Una correzione.', 'One correction.',
      'Lo strumento di ricerca usa un ruolo tecnico con lettura su tutti i siti perché era più semplice in sviluppo.',
      'The search tool uses a technical role with read access to all sites because it was simpler during development.',
      'Problema | correzione minima.', 'Problem | minimum correction.',
      'Il permesso è legato al servizio invece che al compito autorizzato; la correzione minima è propagare identità, ruolo e sito della richiesta e filtrare i frammenti indicizzati con le stesse etichette di accesso.',
      'The permission is tied to the service instead of the authorized task; the minimum correction is propagating request identity, role, and site and filtering indexed fragments with the same access labels.',
      'Riconosce il privilegio non necessario e propone il minimo privilegio applicato al compito.',
      'Recognizes the unnecessary privilege and proposes least privilege applied to the task.'
    )],
    checkpoint: checkpoint(
      'Perché una istruzione di sistema non basta contro le istruzioni nascoste nei documenti?',
      'Why is a system instruction insufficient against instructions hidden in documents?',
      [
        ['Perché i modelli ignorano sempre le istruzioni di sistema.', 'Because models always ignore system instructions.', 'Le istruzioni influiscono, ma non separano i canali.', 'Instructions do influence output, but they do not separate channels.'],
        ['Perché istruzione e contenuto ostile arrivano sullo stesso canale testuale.', 'Because the instruction and the hostile content arrive on the same textual channel.', 'La difesa deve stare fuori dal modello, nei permessi e nella verifica.', 'The defense must sit outside the model, in permissions and verification.'],
        ['Perché il problema riguarda soltanto i modelli piccoli.', 'Because the problem only affects small models.', 'La classe di rischio non dipende dalla dimensione del modello.', 'The risk class does not depend on model size.']
      ],
      1
    ),
    sourceIds: ['nist-ai-600-1', 'nist-sp-800-82-r3']
  },
  {
    id: 'governance-nist-and-eu-obligations',
    eyebrow: t('Unità 6', 'Unit 6'),
    title: t(
      'Governance con Govern, Map, Measure, Manage e obblighi europei',
      'Governance with Govern, Map, Measure, Manage and EU AI Act obligations'
    ),
    estimatedMinutes: 9,
    timeAllocation: { theory: 4, cases: 3, practice: 2 },
    theory: theorySix,
    terminology: [t(
      'Eccezione con scadenza: deroga approvata che decade a una data dichiarata, con proprietario e condizione di rientro.',
      'Time-bound exception: an approved deviation that expires on a declared date, with an owner and a return condition.'
    )],
    caseSegments: [caseSegment(
      'classification-method-review', 3,
      'Metodo di classificazione del rischio regolatorio', 'Regulatory risk classification method',
      'Tre sistemi interni arrivano allo stesso comitato: un assistente documentale di sola lettura, uno strumento di selezione dei candidati e un componente che influenza una funzione di sicurezza di prodotto.',
      'Three internal systems reach the same committee: a read-only document assistant, a candidate screening tool, and a component influencing a product safety function.',
      {
        learnerAction: ['Interpreta la funzione reale di ciascun sistema, confronta i tre casi e scegli quello che richiede la valutazione più estesa.', 'Interpret the real function of each system, compare the three cases, and choose the one requiring the most extensive assessment.'],
        expectedOutput: ['Un sistema scelto con la funzione che determina la valutazione.', 'One selected system with the function that drives the assessment.'],
        modelReasoning: ['La classificazione segue la funzione reale, non la tecnologia: selezione di persone e componenti di sicurezza di prodotto attivano requisiti estesi, mentre un supporto documentale di sola lettura che non decide non li attiva automaticamente.', 'Classification follows real function rather than technology: people screening and product safety components trigger extensive requirements, while a read-only document aid that decides nothing does not trigger them automatically.'],
        responseFormat: ['Sistema scelto | funzione determinante | passo successivo.', 'Selected system | determining function | next step.'],
        columns: [['Sistema', 'System'], ['Funzione reale', 'Real function'], ['Passo successivo', 'Next step']],
        rows: [
          ['doc-assistant', ['Assistente documentale di sola lettura', 'Read-only document assistant'], ['Propone fonti, non decide', 'Proposes sources, decides nothing'], ['Valutazione documentata e trasparenza verso gli utenti', 'Documented assessment and user transparency']],
          ['candidate-screening', ['Selezione dei candidati', 'Candidate screening'], ['Incide sull’accesso al lavoro', 'Affects access to employment'], ['Valutazione estesa con la funzione legale', 'Extensive assessment with the legal function']],
          ['safety-component', ['Componente in funzione di sicurezza di prodotto', 'Component in a product safety function'], ['Incide sulla sicurezza del prodotto', 'Affects product safety'], ['Valutazione estesa e verifica di conformità', 'Extensive assessment and conformity verification']]
        ],
        decisionCount: 1,
        comparisonCount: 1,
        interpretationCount: 1
      }
    )],
    activities: [activity(
      'map-artifact-to-function', 2,
      'Assegna un artefatto concreto a ciascuna delle quattro funzioni di gestione del rischio.',
      'Assign one concrete artifact to each of the four risk management functions.',
      'Quattro coppie funzione-artefatto.', 'Four function-artifact pairs.',
      'Gli artefatti disponibili sono politica di uso ammesso, scheda del caso d’uso, set di valutazione e registro dei rischi.',
      'Available artifacts are the acceptable use policy, the use-case sheet, the evaluation set, and the risk register.',
      'Governare=... | Mappare=... | Misurare=... | Gestire=...', 'Govern=... | Map=... | Measure=... | Manage=...',
      'Governare = politica di uso ammesso; Mappare = scheda del caso d’uso; Misurare = set di valutazione con soglie; Gestire = registro dei rischi con punteggi derivati e piano di risposta.',
      'Govern = acceptable use policy; Map = use-case sheet; Measure = evaluation set with thresholds; Manage = risk register with derived scores and a response plan.',
      'Collega ogni funzione a un artefatto verificabile e non a un principio generico.',
      'Connects each function to a verifiable artifact rather than a generic principle.'
    )],
    checkpoint: checkpoint(
      'Che cosa determina il livello di obblighi regolatori di un sistema?',
      'What determines the level of regulatory obligations for a system?',
      [
        ['La tecnologia usata per costruirlo.', 'The technology used to build it.', 'La stessa tecnologia può ricadere in categorie diverse.', 'The same technology can fall into different categories.'],
        ['La funzione reale del sistema e il contesto in cui viene usato.', 'The real function of the system and the context in which it is used.', 'La valutazione va documentata con data e versione.', 'The assessment must be documented with a date and version.'],
        ['La dimensione del modello impiegato.', 'The size of the model in use.', 'La dimensione non è un criterio di classificazione.', 'Size is not a classification criterion.']
      ],
      1
    ),
    sourceIds: ['nist-ai-rmf-1-0', 'eu-ai-act', 'nist-ai-600-1']
  },
  {
    id: 'monitoring-drift-incident-oversight',
    eyebrow: t('Unità 7', 'Unit 7'),
    title: t(
      'Monitoraggio, deriva, risposta agli incidenti, controllo del cambiamento e sorveglianza umana',
      'Monitoring, drift, incident response, change control, and human oversight'
    ),
    estimatedMinutes: 9,
    timeAllocation: { theory: 5, cases: 2, practice: 2 },
    theory: theorySeven,
    terminology: [t(
      'Sorveglianza effettiva: la persona può capire la proposta, verificarne la fonte e rifiutarla senza attrito.',
      'Effective oversight: the person can understand the proposal, verify its source, and refuse it without friction.'
    )],
    microExamples: [microExample(
      'drift-cause-attribution', 2,
      'Attribuzione della causa di un peggioramento', 'Attributing the cause of a degradation',
      'Il tasso di rifiuto raddoppia in una settimana mentre disponibilità e latenza restano stabili.',
      'The refusal rate doubles within a week while availability and latency stay stable.',
      {
        learnerAction: ['Interpreta i tre segnali e scegli la causa più probabile da verificare per prima.', 'Interpret the three signals and choose the most probable cause to verify first.'],
        expectedOutput: ['Una causa con il controllo di verifica.', 'One cause with its verification check.'],
        modelReasoning: ['La versione del modello non è cambiata e la distribuzione delle richieste è stabile, mentre la reindicizzazione è avvenuta due giorni prima del salto: il corpus è la causa più probabile.', 'The model version did not change and the request distribution is stable, while reindexing happened two days before the jump: the corpus is the most probable cause.'],
        responseFormat: ['Causa | verifica in una frase.', 'Cause | verification in one sentence.'],
        columns: [['Segnale', 'Signal'], ['Andamento', 'Trend']],
        rows: [
          ['model-version', ['Versione del modello registrata', 'Recorded model version'], ['Invariata da sei settimane', 'Unchanged for six weeks']],
          ['request-mix', ['Distribuzione delle richieste', 'Request distribution'], ['Stabile rispetto al mese precedente', 'Stable versus the previous month']],
          ['reindex', ['Ultima reindicizzazione', 'Last reindexing'], ['Due giorni prima del salto', 'Two days before the jump']]
        ],
        decisionCount: 1,
        comparisonCount: 0,
        interpretationCount: 1
      }
    )],
    activities: [activity(
      'measure-effective-oversight', 2,
      'Proponi una misura che distingua la sorveglianza effettiva da quella soltanto formale.',
      'Propose one measure that distinguishes effective oversight from purely formal oversight.',
      'Una misura con soglia.', 'One measure with a threshold.',
      'Il novantasei per cento delle proposte viene confermato e il tempo mediano prima della conferma è di 1,4 secondi.',
      'Ninety-six percent of proposals are confirmed and the median time before confirmation is 1.4 seconds.',
      'Misura | soglia | conseguenza.', 'Measure | threshold | consequence.',
      'Misurare la quota di conferme a rischio alto precedute dall’apertura della citazione, con soglia al novanta per cento; sotto soglia il cancello di sorveglianza resta non superato e lo scaling non viene raccomandato.',
      'Measure the share of high-risk confirmations preceded by opening the citation, with a ninety percent threshold; below it the oversight gate stays unmet and scaling is not recommended.',
      'Propone una misura osservabile con conseguenza dichiarata, non una dichiarazione di intenti.',
      'Proposes an observable measure with a declared consequence rather than a statement of intent.'
    )],
    checkpoint: checkpoint(
      'Quale evento richiede di rieseguire il set di valutazione?',
      'Which event requires rerunning the evaluation set?',
      [
        ['Soltanto la sostituzione del modello.', 'Only replacing the model.', 'Anche corpus, indice e prompt spostano i risultati.', 'Corpus, index, and prompt also move the results.'],
        ['Qualunque cambiamento di corpus, parser, indice, prompt, parametri o modello.', 'Any change of corpus, parser, index, prompt, parameters, or model.', 'Il sistema valutato non deve cambiare senza nuova evidenza.', 'The evaluated system must not change without new evidence.'],
        ['Soltanto un incidente segnalato dagli utenti.', 'Only an incident reported by users.', 'Attendere un incidente significa scoprire il problema troppo tardi.', 'Waiting for an incident means finding the problem too late.']
      ],
      1
    ),
    sourceIds: ['nist-sp-800-61-r3', 'eu-ai-act', 'nist-ai-rmf-1-0']
  },
  {
    id: 'scaling-gates-platform-and-adoption',
    eyebrow: t('Unità 8', 'Unit 8'),
    title: t(
      'Cancelli di scaling, piattaforma globale, modello di supporto e adozione',
      'Scaling gates, global platform versus local configuration, support, and adoption'
    ),
    estimatedMinutes: 10,
    timeAllocation: { theory: 3, cases: 4, practice: 3 },
    theory: theoryEight,
    terminology: [t(
      'Cancello bloccante: condizione il cui mancato superamento impedisce la raccomandazione di scalare, senza compensazioni.',
      'Blocking gate: a condition whose failure prevents a recommendation to scale, with no offsetting.'
    )],
    workedCases: [plantToMultiPlantRolloutCase],
    activities: [
      activity(
        'apply-blocking-gate-rule', 2,
        'Applica la regola dei cancelli bloccanti al sito con punteggio più alto dopo il pilota.',
        'Apply the blocking gate rule to the site with the highest score after the pilot.',
        'Una decisione per sito.', 'One decision for the site.',
        'Il sito ottiene 85 su 100 di prontezza, sopra la soglia di 70, ma l’accesso remoto del fornitore resta fuori politica.',
        'The site scores 85 out of 100 on readiness, above the threshold of 70, but vendor remote access remains outside policy.',
        'Decisione | ragione | condizione di rientro.', 'Decision | reason | return condition.',
        'Sospendere l’estensione: un cancello bloccante non superato non si compensa con un punteggio alto; il rientro avviene quando l’accesso remoto è a tempo, approvato per finestra e registrato, con owner e scadenza dichiarati.',
        'Suspend the extension: an unmet blocking gate is not offset by a high score; the site returns when remote access is time-boxed, approved per window, and recorded, with a declared owner and deadline.',
        'Separa punteggio pesato e cancello non negoziabile e dichiara la condizione di rientro.',
        'Separates weighted score from non-negotiable gate and declares the return condition.'
      ),
      activity(
        'split-global-and-local', 1,
        'Indica un elemento da centralizzare e uno da lasciare locale.',
        'Name one element to centralize and one to keep local.',
        'Due assegnazioni.', 'Two assignments.',
        'La scelta riguarda registri, valutazione, etichette di accesso e parametri di processo.',
        'The choice covers logging, evaluation, access labels, and process parameters.',
        'Centralizzare=... | Locale=...', 'Centralize=... | Local=...',
        'Centralizzare la valutazione con i registri, perché deve essere coerente per essere confrontabile tra siti; lasciare locali le etichette di accesso e i parametri di processo, perché riflettono differenze reali.',
        'Centralize evaluation together with logging, because it must be consistent to be comparable across sites; keep access labels and process parameters local, because they reflect real differences.',
        'Applica il criterio della ripetibilità della evidenza invece di una preferenza organizzativa.',
        'Applies the repeatability-of-evidence criterion rather than an organizational preference.'
      )
    ],
    checkpoint: checkpoint(
      'Un sito supera cinque cancelli su sei ma fallisce un cancello bloccante. Che cosa si raccomanda?',
      'A site meets five gates out of six but fails a blocking gate. What is recommended?',
      [
        ['Scalare, perché la maggioranza dei cancelli è superata.', 'Scale, because most gates are met.', 'I cancelli non si mediano: i rischi non si compensano.', 'Gates are not averaged: risks do not offset each other.'],
        ['Mantenere il perimetro, dichiarare la condizione mancante, assegnarne la proprietà e fissare il riesame.', 'Hold the scope, declare the missing condition, assign ownership, and set a review.', 'Un no motivato protegge dal costo di una espansione prematura.', 'A reasoned no protects against the cost of premature expansion.'],
        ['Scalare con una eccezione senza scadenza.', 'Scale with an exception that has no expiry date.', 'Una eccezione senza scadenza è una regola nuova introdotta di nascosto.', 'An exception without an expiry date is a new rule introduced quietly.']
      ],
      1
    ),
    sourceIds: ['nist-ai-rmf-1-0', 'pmi-operations', 'nist-manufacturing-kpi-hierarchy']
  }
]

const interviewAnswers = [
  {
    prompt: t(
      'Come progetteresti un MVP controllato in uno stabilimento regolamentato?',
      'How would you design a controlled MVP in a regulated plant?'
    ),
    short: t(
      'Partirei dalla decisione che voglio migliorare e dalla baseline misurata, non dalla tecnologia. Poi isolerei l’assunzione più rischiosa e costruirei la fetta verticale più piccola che la attacca, completa di autorizzazione, citazione e registro. Restringerei il dominio a una linea e a un gruppo di utenti nominati, resterei in sola lettura e girerei prima in modalità shadow. Fisserei criteri di successo separati tra soglie desiderabili e cancelli non negoziabili, criteri di arresto e una data di riesame con owner e approvatore dichiarati.',
      'I would start from the decision I want to improve and from a measured baseline, not from the technology. Then I would isolate the riskiest assumption and build the smallest vertical slice that attacks it, complete with authorization, citation, and logging. I would narrow the domain to one line and a named user group, stay read-only, and run in shadow mode first. I would set success criteria separated into desirable thresholds and non-negotiable gates, stop criteria, and a review date with a declared owner and approver.'
    ),
    long: t(
      `Comincerei osservando il lavoro reale, perché la procedura scritta raramente descrive dove si perde tempo. Dalla osservazione ricavo una mappa della decisione: chi decide, con quali informazioni, con quale vincolo e con quale conseguenza. Poi misuro una baseline con definizione operativa, finestra, popolazione, metodo e proprietario del dato, e la faccio firmare al process owner, perché chi non firma il numero di partenza contesterà quello di arrivo. A quel punto identifico l’assunzione più rischiosa, che quasi mai riguarda il modello: in un assistente documentale riguarda la struttura e il versionamento dei documenti. Il primo test attacca quella assunzione nel modo più economico possibile, per esempio campionando cinquanta documenti e misurando quanti hanno testo, revisione e ambito leggibili. L’MVP successivo è una fetta verticale completa su un dominio ristretto: una linea, un tipo di documento, utenti nominati, sola lettura. Ridurre significa restringere il dominio, non togliere i controlli, perché un pilota senza registro non produce evidenza difendibile. Costruisco il set di valutazione prima del sistema, con casi rispondibili, non autorizzati, con versione superata, in conflitto e senza evidenza sufficiente, in entrambe le lingue, e lo faccio adjudicare da una funzione indipendente. Giro in modalità shadow per raccogliere qualità delle proposte senza esporre nessuno, poi passo a una modalità consultiva ristretta per misurare l’effetto sul comportamento. Fisso in anticipo criteri di arresto e data di riesame, perché l’esito peggiore non è un no: è continuare senza decidere.`,
      `I would start by observing real work, because the written procedure rarely describes where time is lost. From that observation I build a decision map: who decides, with which information, under which constraint, and with which consequence. Then I measure a baseline with an operational definition, window, population, method, and data owner, and I have the process owner sign it, because whoever does not sign the starting number will dispute the ending number. At that point I identify the riskiest assumption, which almost never concerns the model: in a document assistant it concerns document structure and versioning. The first test attacks that assumption as cheaply as possible, for example by sampling fifty documents and measuring how many have readable text, revision, and scope. The following MVP is a complete vertical slice over a narrow domain: one line, one document type, named users, read-only. Reducing means narrowing the domain, not removing controls, because a pilot without logging produces no defensible evidence. I build the evaluation set before the system, with answerable, unauthorized, superseded-version, conflicting, and insufficient-evidence cases, in both languages, and I have an independent function adjudicate it. I run in shadow mode to collect proposal quality without exposing anyone, then move to a narrow advisory mode to measure the effect on behavior. I fix stop criteria and a review date in advance, because the worst outcome is not a no: it is continuing without deciding.`
    ),
    followUps: [
      t('Che cosa faresti se il process owner non avesse tempo per adjudicare i casi?', 'What would you do if the process owner had no time to adjudicate cases?'),
      t('Come eviteresti che il pilota diventi un impegno permanente non deciso?', 'How would you prevent the pilot from becoming an undecided permanent commitment?')
    ]
  },
  {
    prompt: t(
      'Come metti in sicurezza una integrazione tra intelligenza artificiale e ambiente OT?',
      'How do you secure an integration between artificial intelligence and the OT environment?'
    ),
    short: t(
      'Parto dal fatto che in OT disponibilità e integrità del processo vengono prima della riservatezza, quindi metodi accettabili in ufficio non lo sono in impianto. Leggo dal historian in zona intermedia invece che dal livello di controllo, resto in sola lettura, e nego l’accesso remoto permanente in entrata a favore di un flusso iniziato dall’interno. Applico zone e condotti con protocollo, direzione, controllo e comportamento degradato dichiarati. La catena di sicurezza funzionale resta deterministica e fuori dal perimetro del modello.',
      'I start from the fact that in OT process availability and integrity come before confidentiality, so methods acceptable in an office are not acceptable in a plant. I read from the historian in an intermediate zone rather than from the control level, stay read-only, and refuse permanent inbound remote access in favor of a flow initiated from inside. I apply zones and conduits with declared protocol, direction, control, and degraded behavior. The functional safety chain stays deterministic and outside the model perimeter.'
    ),
    long: t(
      `La prima cosa che spiego è l’inversione delle priorità. Nei sistemi gestionali si protegge prima la riservatezza; nei sistemi di controllo vengono prima disponibilità e integrità del processo, perché una interruzione può fermare la produzione o creare condizioni non sicure. Questa differenza spiega perché una scansione aggressiva o un aggiornamento automatico, normali in ufficio, sono inaccettabili su una rete di controllo. Da qui derivano scelte concrete. Leggo i dati dal sistema che è pensato per fornirli: il historian per le serie temporali, il sistema di esecuzione per ordini e genealogia, il repository documentale per le revisioni approvate. Non leggo dal livello di controllo per comodità. Applico zone e condotti: ogni flusso dichiara zona di origine, zona di destinazione, direzione, protocollo, dati trasferiti, proprietario del dato, controllo che attraversa il confine, comportamento in caso di indisponibilità e persona che agisce. Se non riesco a compilare questa scheda, il progetto non è pronto per la revisione di sicurezza. Sull’accesso remoto sono severo: nessuna connessione permanente, approvazione per singola finestra, autenticazione forte, sessione supervisionata e registrata, revoca automatica alla chiusura. Se un fornitore vuole dati, li spingo verso di lui da un percorso in uscita invece di aprire un percorso in entrata. Sulla sicurezza funzionale sono categorico: i sistemi strumentati di sicurezza restano deterministici e verificabili, un modello probabilistico non entra nella catena di arresto. Può segnalare in anticipo una condizione a una persona, purché non agisca su un attuatore e purché non aggiunga allarmi non razionalizzati a un operatore già sovraccarico.`,
      `The first thing I explain is the inversion of priorities. In business systems confidentiality is protected first; in control systems process availability and integrity come first, because an interruption can stop production or create unsafe conditions. This difference explains why an aggressive scan or an automatic update, normal in an office, are unacceptable on a control network. Concrete choices follow. I read data from the system designed to provide it: the historian for time series, the execution system for orders and genealogy, the document repository for approved revisions. I do not read from the control level for convenience. I apply zones and conduits: every flow declares source zone, destination zone, direction, protocol, transferred data, data owner, the control crossing the boundary, behavior when unavailable, and the person who acts. If I cannot fill that sheet in, the project is not ready for security review. On remote access I am strict: no permanent connection, approval per individual window, strong authentication, supervised and recorded sessions, automatic revocation at close. If a vendor wants data, I push it outbound rather than opening an inbound path. On functional safety I am categorical: safety instrumented systems stay deterministic and verifiable, and a probabilistic model does not enter the stop chain. It may flag a condition in advance to a person, provided it does not act on an actuator and does not add unrationalized alarms to an already overloaded operator.`
    ),
    followUps: [
      t('Che cosa rispondi a un fornitore che chiede accesso continuo per manutenzione predittiva?', 'What do you answer a vendor asking for continuous access for predictive maintenance?'),
      t('Come verifichi che la segmentazione dichiarata corrisponda a quella reale?', 'How do you verify that the declared segmentation matches the real one?')
    ]
  },
  {
    prompt: t(
      'Che cosa significa per te una supervisione umana significativa, e come la misuri?',
      'What does meaningful human oversight mean to you, and how do you measure it?'
    ),
    short: t(
      'Significa che la persona può capire la proposta, verificarne la fonte e non essere d’accordo senza attrito. Capire richiede una citazione specifica, non un riferimento generico; verificare richiede che la fonte si apra con un gesto e mostri la revisione usata; dissentire richiede che rifiutare sia semplice quanto accettare e che il rifiuto venga registrato come dato utile. La misuro con campionamento indipendente delle conferme e con il tempo trascorso prima della conferma, non con una dichiarazione di processo.',
      'It means the person can understand the proposal, verify its source, and disagree without friction. Understanding requires a specific citation rather than a generic reference; verifying requires the source to open in one gesture and to show the revision used; disagreeing requires refusal to be as easy as acceptance and to be recorded as useful data. I measure it with independent sampling of confirmations and with time elapsed before confirmation, not with a process statement.'
    ),
    long: t(
      `Distinguo la sorveglianza formale da quella effettiva, perché sono spesso confuse. La sorveglianza formale esiste quando una procedura dichiara che una persona approva. La sorveglianza effettiva esiste quando quella persona ha davvero le condizioni per approvare o rifiutare in modo informato. Le condizioni sono tre. La prima è comprensibilità: la proposta deve indicare la fonte specifica, la revisione usata e il claim che sostiene, non un riferimento generico al documento. La seconda è verificabilità: la fonte deve aprirsi con un solo gesto, perché se richiede tre passaggi nessuno la aprirà durante un turno. La terza è la possibilità reale di dissentire: rifiutare deve costare quanto accettare, e il rifiuto deve essere registrato come informazione utile invece che come eccezione da giustificare. Poi misuro. Non chiedo se la supervisione funziona: campiono in modo indipendente le conferme su casi a rischio alto e verifico quante sono precedute dalla apertura della citazione. Guardo il tempo mediano prima della conferma: se il novanta per cento delle conferme avviene in meno di due secondi su casi complessi, la supervisione è formale e lo dichiaro. Fisso una soglia, per esempio il novanta per cento di conferme a rischio alto con citazione aperta, e la tratto come cancello bloccante per lo scaling. Aggiungo formazione sui limiti dello strumento, perché l’eccesso di fiducia è un rischio da gestire come gli altri, con controlli, evidenza e una scadenza per la verifica.`,
      `I distinguish formal oversight from effective oversight, because they are often confused. Formal oversight exists when a procedure states that a person approves. Effective oversight exists when that person actually has the conditions to approve or refuse in an informed way. There are three conditions. The first is understandability: the proposal must indicate the specific source, the revision used, and the claim it supports, not a generic reference to the document. The second is verifiability: the source must open in a single gesture, because if it takes three steps nobody will open it during a shift. The third is a real ability to disagree: refusing must cost the same as accepting, and the refusal must be recorded as useful information rather than as an exception to justify. Then I measure. I do not ask whether oversight works: I independently sample confirmations on high-risk cases and check how many were preceded by opening the citation. I look at median time before confirmation: if ninety percent of confirmations happen in under two seconds on complex cases, oversight is formal and I say so. I set a threshold, for example ninety percent of high-risk confirmations with an opened citation, and treat it as a blocking gate for scaling. I add training on the limits of the tool, because over-reliance is a risk to manage like any other, with controls, evidence, and a deadline for verification.`
    ),
    followUps: [
      t('Che cosa cambieresti se gli operatori aprissero la citazione soltanto nel venti per cento dei casi?', 'What would you change if operators opened the citation in only twenty percent of cases?'),
      t('Come eviti che il rifiuto venga percepito come un errore dell’operatore?', 'How do you prevent refusal from being perceived as an operator error?')
    ]
  },
  {
    prompt: t(
      'Come decidi quando non scalare una soluzione che ha funzionato in un sito?',
      'How do you decide when not to scale a solution that worked at one site?'
    ),
    short: t(
      'Guardo quale parte del risultato dipendeva dal contesto originale, poi applico cancelli espliciti invece di una decisione presa sull’entusiasmo. I segnali che giustificano un no sono concreti: beneficio dentro la variabilità naturale del processo, cancello bloccante non superato, sorveglianza formale invece che effettiva, modello di supporto senza proprietario firmato, standardizzazione dei dati troppo bassa nei siti riceventi. In quel caso mantengo il perimetro, dichiaro la condizione mancante, ne assegno la proprietà con una scadenza e fisso il riesame.',
      'I look at which part of the result depended on the original context, then apply explicit gates instead of a decision taken on enthusiasm. The signals justifying a no are concrete: benefit inside the natural variability of the process, an unmet blocking gate, formal rather than effective oversight, a support model without a signed owner, or data standardization too low at the receiving sites. In that case I hold the scope, declare the missing condition, assign its ownership with a deadline, and set the review.'
    ),
    long: t(
      `Il punto di partenza è che scalare non significa installare la stessa applicazione altrove: significa riprodurre un risultato in un contesto diverso per dati, processo, persone e vincoli. Quindi la prima domanda non è se la tecnologia funziona, ma quale parte del risultato dipendeva dal contesto del primo sito. Spesso dipendeva da un archivio insolitamente ordinato, da un process owner molto disponibile o da una linea con pochi prodotti, e nessuno di questi fattori si trasferisce da solo. Per questo uso una checklist di cancelli con una regola chiara: un cancello bloccante non superato ferma la raccomandazione, indipendentemente da quanti altri sono verdi, perché i rischi non si compensano tra loro e la media dei cancelli non è una misura valida. In un caso recente e ipotetico il sito con il secondo punteggio più alto, ottantacinque su cento, è stato sospeso perché l’accesso remoto del fornitore era fuori politica, mentre un sito con settantaquattro è stato approvato. Guardo poi il modello di supporto, che è la parte che decide se il secondo sito avrà la stessa esperienza del primo: tre livelli chiari, orari coerenti con i turni, escalation con tempi dichiarati e un proprietario locale nominato. Se manca, non è un piano ma una previsione ottimistica. Infine misuro la sorveglianza umana in modo indipendente, perché una supervisione soltanto formale rende fragile qualunque estensione. Quando decido di non scalare, non mi limito a dire di no: dichiaro la condizione mancante, ne assegno la proprietà con una scadenza e fisso una data di riesame. Un no motivato protegge dal costo nascosto di una espansione prematura, che è quasi sempre superiore al costo di attendere un trimestre.`,
      `The starting point is that scaling does not mean installing the same application elsewhere: it means reproducing a result in a context that differs in data, process, people, and constraints. So the first question is not whether the technology works, but which part of the result depended on the first site context. Often it depended on an unusually tidy archive, a highly available process owner, or a line with few products, and none of those transfers by itself. That is why I use a gate checklist with a clear rule: one unmet blocking gate stops the recommendation, regardless of how many others are green, because risks do not offset each other and averaging gates is not a valid measure. In a recent hypothetical case the site with the second-highest score, eighty-five out of one hundred, was suspended because vendor remote access was outside policy, while a site scoring seventy-four was approved. I then look at the support model, which decides whether the second site will have the same experience as the first: three clear levels, hours consistent with shifts, escalation with declared response times, and a named local owner. Without it, this is not a plan but an optimistic forecast. Finally I measure human oversight independently, because purely formal supervision makes any extension fragile. When I decide not to scale, I do not simply say no: I declare the missing condition, assign its ownership with a deadline, and set a review date. A reasoned no protects against the hidden cost of premature expansion, which is almost always higher than the cost of waiting a quarter.`
    ),
    followUps: [
      t('Come presenteresti questa decisione a una direzione che ha già annunciato i tre siti?', 'How would you present this decision to management that already announced the three sites?'),
      t('Quale evidenza minima ti farebbe cambiare idea entro il trimestre?', 'Which minimum evidence would change your mind within the quarter?')
    ]
  }
]

export const mvpGovernanceLesson = {
  id: 'mvp-governance',
  slug: 'mvp-governance',
  moduleNumber: 5,
  title: t('MVP, sicurezza, governance e scaling', 'MVP, security, governance, and scaling'),
  subtitle: t(
    'Dalla assunzione più rischiosa a una decisione difendibile su quando estendere e quando fermarsi.',
    'From the riskiest assumption to a defensible decision about when to extend and when to stop.'
  ),
  durationMinutes: 75,
  timeBudget: { theory: 36, cases: 22, practice: 17 },
  level: t('Technical Lead', 'Technical Lead'),
  outcomes: [
    t('Progettare un MVP industriale con baseline, cancelli e criteri di arresto.', 'Design an industrial MVP with a baseline, gates, and stop criteria.'),
    t('Applicare priorità OT, segmentazione e regole di accesso remoto.', 'Apply OT priorities, segmentation, and remote access rules.'),
    t('Riconoscere e mitigare le quattro classi di rischio GenAI.', 'Recognize and mitigate the four GenAI risk classes.'),
    t('Difendere una decisione di scaling o di non scaling con evidenza.', 'Defend a scaling or no-scaling decision with evidence.')
  ],
  mvpExperimentCanvas,
  riskRegister,
  raciMatrix,
  scalingGateChecklist,
  artifact: mvpExperimentCanvas,
  professionalArtifacts: [riskRegister, raciMatrix, scalingGateChecklist],
  units,
  interviewAnswers,
  finalQuiz: [
    checkpoint(
      'Che cosa deve contenere una baseline perché il risultato finale sia confrontabile?',
      'What must a baseline contain for the final result to be comparable?',
      [
        ['Metrica, definizione operativa, finestra, popolazione, metodo e proprietario.', 'Metric, operational definition, window, population, method, and owner.', 'Sono le condizioni che rendono il confronto difendibile.', 'These are the conditions that make the comparison defensible.'],
        ['Un valore medio dichiarato dal team di progetto.', 'An average value declared by the project team.', 'Senza definizione condivisa il numero resta negoziabile.', 'Without a shared definition the number stays negotiable.'],
        ['La stima del beneficio atteso dal fornitore.', 'The vendor estimate of expected benefit.', 'Una stima non misurata non è una baseline.', 'An unmeasured estimate is not a baseline.']
      ],
      0
    ),
    checkpoint(
      'Quale difesa funziona contro le istruzioni nascoste in un documento recuperato?',
      'Which defense works against instructions hidden in a retrieved document?',
      [
        ['Chiedere al modello di ignorare le istruzioni sospette.', 'Asking the model to ignore suspicious instructions.', 'La richiesta viaggia sullo stesso canale dell’attacco.', 'The request travels on the same channel as the attack.'],
        ['Trattare il contenuto come dato, limitare i permessi effettivi e verificare i claim.', 'Treating content as data, limiting effective permissions, and verifying claims.', 'La difesa agisce fuori dal modello e non dipende dal testo.', 'The defense acts outside the model and does not depend on the text.'],
        ['Aumentare la finestra di contesto per vedere tutto il documento.', 'Increasing the context window to see the whole document.', 'Più contesto non riduce il rischio di manipolazione.', 'More context does not reduce manipulation risk.']
      ],
      1
    ),
    checkpoint(
      'Un sito ha punteggio 85 su 100 ma fallisce il cancello sull’accesso remoto. Che cosa raccomandi?',
      'A site scores 85 out of 100 but fails the remote access gate. What do you recommend?',
      [
        ['Estendere, perché il punteggio compensa il cancello.', 'Extend, because the score offsets the gate.', 'I cancelli bloccanti non si compensano con il punteggio.', 'Blocking gates are not offset by a score.'],
        ['Sospendere e dichiarare la condizione di rientro con owner e scadenza.', 'Suspend and declare the return condition with owner and deadline.', 'Protegge dal costo di introdurre un percorso non conforme.', 'This protects against the cost of introducing a non-compliant path.'],
        ['Estendere con una eccezione permanente.', 'Extend with a permanent exception.', 'Una eccezione senza scadenza diventa una regola nascosta.', 'An exception without an expiry date becomes a hidden rule.']
      ],
      1
    )
  ]
}

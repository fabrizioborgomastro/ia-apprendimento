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
  explanation: t(explanationIt, explanationEn)
})

const unitOne = {
  id: 'physical-process-signals-sampling',
  eyebrow: t('01 · Dal fenomeno al dato', '01 · From phenomenon to data'),
  title: t(
    'Processo fisico, sensori, attuatori, segnali e campionamento',
    'Physical process, sensors, actuators, signals, and sampling'
  ),
  objective: t(
    'Spiegare come una grandezza fisica diventa un dato utilizzabile e valutare errori di misura, campionamento e attuazione prima di progettare analytics o AI.',
    'Explain how a physical quantity becomes usable data and assess measurement, sampling, and actuation errors before designing analytics or AI.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 2, practice: 2 },
  theory: [
    t(
      `Un'architettura industriale comincia dal processo fisico, non dal cloud. Temperatura, pressione, portata, coppia, vibrazione, posizione e presenza sono grandezze continue o discrete che descrivono uno stato reale. Un sensore le trasduce in un segnale elettrico o digitale; un trasmettitore può condizionare, linearizzare e convertire quel segnale; un modulo di ingresso lo acquisisce; la logica di controllo gli attribuisce un significato operativo. Ogni passaggio introduce un'incertezza. Accuratezza indica quanto la misura è vicina al valore vero, precisione quanto le ripetizioni sono tra loro vicine, risoluzione il più piccolo cambiamento distinguibile, deriva la variazione nel tempo e isteresi la dipendenza dalla direzione con cui si raggiunge un valore. Un dato con molte cifre non è necessariamente accurato. In una linea ad alta velocità, un sensore fotoelettrico che conta confezioni può perdere impulsi per sporco, riflessi, disallineamento o durata dell'impulso inferiore alla scansione. Prima di attribuire un calo di conteggio a una perdita di produzione bisogna verificare principio di misura, posizione, range, taratura, diagnostica e condizioni ambientali. Anche l'identità conta: il tag P101_PV deve avere unità, asset, versione, owner e stato di qualità, non soltanto un numero. OPC UA, secondo la specifica OPC Foundation, non è semplicemente un canale di byte: consente di esporre nodi tipizzati, attributi, relazioni e metadati in un information model. Questa semantica riduce interpretazioni locali, ma non corregge un sensore installato male. La catena di fiducia resta fisica, metrologica, logica e organizzativa.`,
      `Industrial architecture starts with the physical process, not the cloud. Temperature, pressure, flow, torque, vibration, position, and presence are continuous or discrete quantities describing real conditions. A sensor transduces them into an electrical or digital signal; a transmitter may condition, linearize, and convert that signal; an input module acquires it; and control logic gives it operating meaning. Every step introduces uncertainty. Accuracy describes proximity to the true value, precision describes repeatability, resolution is the smallest distinguishable change, drift is change over time, and hysteresis is dependence on the direction from which a value is approached. A value with many decimal places is not necessarily accurate. On a high-speed line, a photoelectric sensor counting packs may miss pulses because of dirt, reflections, misalignment, or a pulse shorter than the scan. Before treating a count reduction as lost production, the team checks the measurement principle, position, range, calibration, diagnostics, and environment. Identity also matters: tag P101_PV needs an engineering unit, asset, version, owner, and quality status, not merely a number. OPC UA, in the OPC Foundation specification, is more than a byte transport. It can expose typed nodes, attributes, relationships, and metadata through an information model. That semantic capability reduces local interpretation, but it cannot repair a poorly installed sensor. Trust remains a physical, metrological, logical, and organizational chain.`
    ),
    t(
      `I segnali industriali hanno proprietà che condizionano l'uso. Un ingresso analogico 4-20 mA rappresenta spesso un intervallo ingegneristico e usa il valore inferiore diverso da zero per riconoscere alcune rotture di circuito; un ingresso digitale esprime stati come aperto o chiuso; un encoder produce impulsi o posizione; un bus di campo trasferisce valori e diagnostica. La scalatura va resa esplicita. Se 4 mA corrispondono a 0 bar e 20 mA a 10 bar, una corrente di 12 mA vale (12-4)/(20-4) per 10, cioè 5 bar. Un errore di configurazione che interpreta 0-20 mA produce 6 bar, un bias del 20 per cento. Un modello addestrato su quel tag imparerebbe una relazione coerente ma falsa. La validazione confronta range plausibile, qualità del canale, ridondanza disponibile, bilanci di massa o energia e comportamento durante condizioni note. Gli attuatori completano il ciclo: valvole, motori, riscaldatori e cilindri trasformano un comando in effetto fisico. Possono bloccarsi, saturare, avere deadband o reagire più lentamente del previsto. Il fatto che un controllore invii il 60 per cento non dimostra che una valvola abbia raggiunto quella posizione. Feedback di posizione, interlock e diagnostica distinguono comando, stato richiesto e stato effettivo. In un processo regolamentato questa distinzione sostiene indagine, tracciabilità e corretta attribuzione. Un sistema analitico destinato al supporto decisionale dovrebbe normalmente leggere valori e stati approvati, non confondere il comando con la prova dell'azione. Il data owner operativo definisce significato e uso autorizzato; OT mantiene acquisizione e disponibilità; manutenzione governa taratura; Quality decide quando una misura è rilevante per record e disposizioni regolamentate.`,
      `Industrial signals have properties that constrain their use. A 4-20 mA analogue input commonly represents an engineering range and uses a non-zero lower value to help detect certain circuit faults; a digital input represents states such as open or closed; an encoder produces pulses or position; and a fieldbus transfers values plus diagnostics. Scaling must be explicit. If 4 mA means 0 bar and 20 mA means 10 bar, 12 mA represents (12-4)/(20-4) times 10, or 5 bar. A configuration that incorrectly assumes 0-20 mA reports 6 bar, a 20 percent bias. A model trained on that tag could learn a consistent but false relationship. Validation checks plausible range, channel quality, available redundancy, mass or energy balances, and behavior under known conditions. Actuators complete the loop: valves, motors, heaters, and cylinders turn a command into a physical effect. They can stick, saturate, exhibit deadband, or respond more slowly than expected. A controller output of 60 percent does not prove that a valve reached that position. Position feedback, interlocks, and diagnostics separate the command, requested state, and achieved state. In regulated manufacturing, that distinction supports investigation, traceability, and correct attribution. Decision-support analytics should normally read approved values and states rather than confuse a command with evidence of action. The operational data owner defines meaning and permitted use; OT maintains acquisition and availability; maintenance governs calibration; and Quality determines when a measurement belongs in regulated records and disposition decisions.`
    ),
    t(
      `Il campionamento decide quali dinamiche restano visibili. La frequenza di campionamento deve essere abbastanza alta rispetto al fenomeno, ma il criterio non è accumulare il massimo numero di punti. Se un impulso dura 20 millisecondi e il PLC legge l'ingresso ogni 50 millisecondi, alcune occorrenze possono non essere osservate. Se una vibrazione significativa è a 200 Hz, acquisire a 100 Hz non consente di ricostruirla e può creare aliasing, cioè frequenze apparenti errate. Il principio di Nyquist richiede più del doppio della massima frequenza di interesse per una ricostruzione ideale; nella pratica servono margine, filtro anti-aliasing e una catena sensore-acquisizione progettata per la banda utile. Per una temperatura che cambia in minuti, campionare ogni millisecondo aumenta costo, rumore e traffico senza informazione decisionale. Occorre distinguere scan time del controllo, sampling del modulo, publish interval, historization policy e frequenza con cui un modello calcola una raccomandazione. Un valore può essere letto ogni 10 ms, pubblicato ogni secondo, archiviato soltanto su variazione e aggregato ogni minuto. Queste trasformazioni devono essere documentate perché cambiano la domanda analitica. Per un allarme di pressione rapido si usa il percorso deterministico progettato nel controllo; per una tendenza di degrado si può usare uno storico meno frequente. La scelta parte da costante di tempo del processo, durata minima dell'evento, latenza ammessa, precisione temporale e conseguenza di perdere un evento. Il failure mode più insidioso è un grafico regolare che sembra completo dopo compressione o interpolazione. La risposta professionale non è chiedere più dati in astratto: è specificare quale fenomeno, con quale banda, timestamp, qualità e probabilità di perdita deve sostenere quale decisione. Solo allora edge, historian o cloud possono essere dimensionati in modo responsabile.`,
      `Sampling determines which dynamics remain visible. The rate must be high enough for the phenomenon, but the objective is not to collect the maximum possible number of points. If a pulse lasts 20 milliseconds and a PLC reads the input every 50 milliseconds, some occurrences may be missed. If significant vibration energy is at 200 Hz, acquisition at 100 Hz cannot reconstruct it and may create aliasing, meaning false apparent frequencies. The Nyquist principle requires more than twice the highest frequency of interest for ideal reconstruction; practical systems need margin, anti-alias filtering, and a sensor-to-acquisition chain designed for the useful band. For a temperature changing over minutes, millisecond sampling adds cost, noise, and traffic without decision value. Separate the control scan, module sampling, publish interval, historian policy, and model inference cadence. A value may be read every 10 ms, published every second, stored only on change, and aggregated each minute. Those transformations must be documented because they change the analytical question. A fast pressure alarm belongs on the engineered deterministic control path; a degradation trend may use lower-frequency history. Selection starts from process time constant, minimum event duration, allowed latency, timestamp precision, and consequence of missing an event. A dangerous failure mode is a smooth chart that appears complete after compression or interpolation. The professional response is not to request more data in the abstract. It is to specify which phenomenon, band, timestamp, quality, and loss probability must support which decision. Only then can edge, historian, or cloud capacity be designed responsibly.`
    )
  ],
  terminology: [
    t('Process variable (PV): valore misurato del processo.', 'Process variable (PV): the measured process value.'),
    t('Setpoint (SP): valore obiettivo usato dal controllo.', 'Setpoint (SP): the target value used by control.'),
    t('Aliasing: falsa rappresentazione causata da campionamento insufficiente.', 'Aliasing: false representation caused by insufficient sampling.')
  ],
  microExamples: [microExample(
    'Errore di scala su un trasmettitore',
    'Transmitter scaling error',
    'La stessa corrente di 12 mA vale 5 bar con scala 4-20 mA e 6 bar con una configurazione errata 0-20 mA: il modello non può correggere automaticamente la semantica.',
    'The same 12 mA means 5 bar on a 4-20 mA scale and 6 bar under an incorrect 0-20 mA configuration: a model cannot automatically repair the semantics.'
  )],
  checkpoint: checkpoint(
    `Un contatore perde impulsi di 20 ms perché l'ingresso viene letto ogni 50 ms. Qual è il primo intervento corretto?`,
    'A counter misses 20 ms pulses because the input is read every 50 ms. What is the right first intervention?',
    [
      ['Interpolare i punti mancanti nel cloud.', 'Interpolate missing points in the cloud.', 'L’evento non osservato non può essere ricostruito in modo affidabile a valle.', 'An event that was never observed cannot be reconstructed reliably downstream.'],
      ['Ridisegnare acquisizione o hardware di conteggio per catturare la durata minima e validare la catena.', 'Redesign acquisition or counting hardware for the minimum pulse and validate the chain.', 'La correzione agisce sul punto in cui l’informazione viene persa.', 'This fixes the point where information is lost.'],
      ['Aumentare le cifre decimali del tag.', 'Increase the tag decimal places.', 'La risoluzione di visualizzazione non cambia il campionamento.', 'Display resolution does not change sampling.']
    ],
    1
  ),
  sourceIds: ['ni-4-20ma-current-loop', 'opc-ua-part-1', 'nist-sp-800-82-r3']
}

const unitTwo = {
  id: 'control-supervision-and-alarms',
  eyebrow: t('02 · Controllo e supervisione', '02 · Control and supervision'),
  title: t(
    'PLC, DCS, HMI, SCADA, allarmi e vincoli dei loop di controllo',
    'PLC, DCS, HMI, SCADA, alarms, and control-loop constraints'
  ),
  objective: t(
    'Distinguere controllo, supervisione e supporto decisionale e spiegare perché latenza, determinismo e conseguenza limitano il ruolo dell’AI.',
    'Distinguish control, supervision, and decision support and explain why latency, determinism, and consequence constrain AI roles.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 3, practice: 1 },
  theory: [
    t(
      `PLC, DCS, HMI e SCADA non sono sinonimi. Un programmable logic controller esegue logica ciclica, sequenze, interlock e controllo di macchina vicino al processo, con comportamento progettato e tempi prevedibili. Un distributed control system coordina molti loop continui e unità di processo con configurazione, ridondanza e supervisione integrate. Un human-machine interface presenta stato e comandi agli operatori per una macchina o area. Uno SCADA acquisisce e supervisiona processi distribuiti, gestisce visualizzazioni, eventi, allarmi e comandi autorizzati, spesso su una scala più ampia. I confini reali variano tra prodotti e impianti, quindi in colloquio conviene descrivere responsabilità e requisiti, non trasformare le sigle in livelli rigidi. La domanda fondamentale è dove deve vivere una funzione in base a tempo di risposta, disponibilità, rischio e contesto. Un interlock che arresta un motore quando manca lubrificazione deve funzionare anche se historian, rete enterprise o servizio AI sono indisponibili. Una raccomandazione di manutenzione che confronta settimane di vibrazione può attendere secondi o minuti e beneficiare di dati più ampi. OT e IT condividono principi di engineering e cybersecurity, ma ottimizzano priorità differenti. OT protegge un processo fisico dove indisponibilità o comando errato possono danneggiare persone, ambiente, prodotto e impianto; richiede finestre di modifica, test, compatibilità e recovery disciplinati. IT gestisce informazione, servizi e transazioni enterprise con maggiore elasticità e cicli di aggiornamento spesso più rapidi. La differenza non giustifica silos: impone una collaborazione che rispetti conseguenze fisiche, ownership e lifecycle. NIST SP 800-82 Rev. 3 tratta OT come sistemi programmabili che interagiscono con l'ambiente fisico e sottolinea requisiti peculiari di prestazione, affidabilità e sicurezza.`,
      `PLC, DCS, HMI, and SCADA are not synonyms. A programmable logic controller executes cyclic logic, sequences, interlocks, and machine control near the process with engineered behavior and predictable timing. A distributed control system coordinates many continuous loops and process units through integrated configuration, redundancy, and supervision. A human-machine interface presents state and authorized commands to operators for a machine or area. SCADA acquires and supervises distributed processes, handling displays, events, alarms, and authorized commands, often across a broader footprint. Actual product and plant boundaries vary, so a strong interview answer describes responsibilities and requirements instead of forcing every acronym into a rigid layer. The main question is where a function belongs given response time, availability, risk, and context. An interlock that stops a motor after loss of lubrication must work when the historian, enterprise network, or AI service is unavailable. A maintenance recommendation comparing weeks of vibration may wait seconds or minutes and benefit from broader data. OT and IT share engineering and cybersecurity principles, but optimize different priorities. OT protects a physical process where outage or incorrect command can harm people, environment, product, and equipment; it needs disciplined change windows, testing, compatibility, and recovery. IT manages enterprise information, services, and transactions with greater elasticity and often faster release cycles. The distinction does not justify silos. It requires collaboration that respects physical consequence, ownership, and lifecycle. NIST SP 800-82 Rev. 3 describes OT as programmable systems interacting with the physical environment and emphasizes distinctive performance, reliability, and safety requirements.`
    ),
    t(
      `Un loop di controllo confronta una process variable con un setpoint e calcola una manipulated variable. In un PID, il termine proporzionale reagisce all'errore attuale, l'integrale accumula errore e il derivativo anticipa la variazione; tuning, saturazione, rumore e dead time determinano stabilità. La latenza totale comprende misura, filtro, scan, calcolo, rete e risposta dell'attuatore. Se il processo ha dinamica di centinaia di millisecondi, una chiamata cloud variabile tra 200 ms e 3 s non è una base accettabile per chiudere il loop. Il problema non è soltanto la latenza media: sono jitter, perdita di pacchetti, timeout, restart, versione del modello e comportamento fuori distribuzione. Un modello statistico può essere utile come advisory, per stimare una variabile non misurata, individuare degrado o proporre un setpoint entro limiti. Per influenzare il controllo servono engineered controls commisurati al rischio: hazard analysis, requisiti di sicurezza, limiti deterministici indipendenti, validazione per l'operating envelope, gestione versione e change control, monitoraggio di drift e input, autorizzazione, fallback, rollback e prova periodica. Nei casi safety-critical la funzione di protezione resta in un livello indipendente progettato e validato, come safety PLC o safety instrumented function, e non dipende dal modello general-purpose. L'AI non deve scrivere direttamente su attuatori o bypassare interlock. Un pattern prudente è read-only analytics, raccomandazione spiegabile, controllo di plausibilità, conferma di un ruolo autorizzato e comando applicato dalla logica tradizionale entro limiti. Anche questo pattern richiede valutazione formale: human-in-the-loop non è una formula magica se l'operatore non ha tempo, competenza o informazione per contestare.`,
      `A control loop compares a process variable with a setpoint and calculates a manipulated variable. In PID control, the proportional term reacts to current error, the integral accumulates error, and the derivative anticipates change; tuning, saturation, noise, and dead time determine stability. Total latency includes measurement, filtering, scan, computation, network, and actuator response. If process dynamics occur over hundreds of milliseconds, a cloud request varying from 200 ms to 3 s is not an acceptable loop-closing basis. The issue is not average latency alone. Jitter, packet loss, timeouts, restarts, model version, and out-of-distribution behavior matter. A statistical model may still provide advisory insight, estimate an unmeasured variable, identify degradation, or propose a setpoint within limits. Any influence on control needs engineered controls proportionate to risk: hazard analysis, safety requirements, independent deterministic limits, validation across the operating envelope, version and change control, drift and input monitoring, authorization, fallback, rollback, and periodic proof testing. For safety-critical cases, the protective function remains in an independent engineered and validated layer, such as a safety PLC or safety instrumented function, and does not depend on a general-purpose model. AI must not write directly to actuators or bypass interlocks. A prudent pattern is read-only analytics, an explainable recommendation, plausibility checks, confirmation by an authorized role, and action by conventional logic within hard bounds. Even that pattern requires formal assessment. Human-in-the-loop is not a magic phrase when the operator lacks time, competence, or information to challenge the recommendation.`
    ),
    t(
      `Gli allarmi sono una forma specifica di interazione, non ogni notifica generata da analytics. Un allarme operativo comunica una condizione anomala che richiede risposta tempestiva e definita. Deve avere priorità razionale, messaggio azionabile, owner, shelving controllato, gestione di chattering e prova. Se un modello aggiunge cento segnalazioni per turno, può peggiorare la capacità di riconoscere l'evento critico. Il carico si misura con tasso, picchi, standing alarms, acknowledgement, risposta e percentuale di azioni utili, non solo con recall del modello. Un alert predittivo di manutenzione può entrare in una coda separata, con orizzonte, confidenza, evidenze e scadenza, invece di competere con allarmi di processo. Consideriamo una linea ipotetica regolamentata: la pressione di alimentazione scende sotto un limite. Il PLC esegue l'interlock entro il budget locale, HMI mostra causa e stato, SCADA registra evento e acknowledgement, historian conserva trend, analytics confronta episodi e propone ispezione, CMMS riceve una bozza dopo conferma. MES collega l'evento all'ordine e al materiale, mentre Quality valuta l'impatto sul prodotto. Questo percorso illustra OT rispetto a IT e SCADA rispetto a MES. SCADA risponde a cosa sta accadendo nel processo e supporta supervisione; MES governa esecuzione, contesto produttivo, genealogia e workflow tra operazioni. Nessuno dei due dovrebbe essere definito soltanto da un nome commerciale. Il failure mode architetturale è far dipendere l'arresto protettivo dall'intera catena enterprise. Il fallback corretto mantiene controllo locale sicuro, procedure operative, segnalazione locale e riconciliazione successiva. L'obiettivo di una buona architettura non è eliminare ogni degradazione, ma degradare in modo noto senza perdere le funzioni essenziali.`,
      `Alarms are a specific form of interaction, not every notification produced by analytics. An operational alarm communicates an abnormal condition requiring a timely, defined response. It needs rational priority, actionable wording, ownership, controlled shelving, chattering management, and testing. If a model adds one hundred notifications per shift, it may reduce the ability to identify the critical event. Workload is measured through rate, peaks, standing alarms, acknowledgement, response, and useful-action percentage, not model recall alone. A predictive maintenance alert may belong in a separate queue with horizon, confidence, evidence, and due date rather than compete with process alarms. Consider a hypothetical regulated line where supply pressure drops below a limit. The PLC executes the interlock within the local budget, the HMI displays cause and state, SCADA records the event and acknowledgement, the historian retains the trend, analytics compares episodes and proposes inspection, and CMMS receives a draft after confirmation. MES links the event to the order and material while Quality evaluates product impact. This path illustrates OT versus IT and SCADA versus MES. SCADA answers what is happening in the process and supports supervision. MES governs execution, production context, genealogy, and cross-operational workflows. Neither should be defined merely by a product label. The architectural failure is making the protective trip depend on the entire enterprise chain. The correct fallback preserves safe local control, operating procedures, local indication, and later reconciliation. Good architecture does not eliminate every degraded condition. It degrades in a known way without losing essential functions.`
    )
  ],
  microExamples: [microExample(
    'Allarme di processo e alert predittivo',
    'Process alarm and predictive alert',
    'Il limite di pressione richiede risposta immediata nel controllo; una previsione di degrado a sette giorni appartiene a una coda manutentiva con evidenze e conferma.',
    'A pressure limit requires immediate control response; a seven-day degradation forecast belongs in a maintenance queue with evidence and confirmation.'
  )],
  checkpoint: checkpoint(
    'Perché un modello cloud non deve chiudere direttamente un loop safety-critical?',
    'Why must a cloud model not directly close a safety-critical loop?',
    [
      ['Perché il cloud non può elaborare numeri.', 'Because cloud systems cannot process numbers.', 'Il cloud può elaborare dati, ma non offre automaticamente i requisiti deterministici e di sicurezza del loop.', 'Cloud systems can process data, but do not automatically satisfy deterministic and safety requirements.'],
      ['Per latenza variabile, failure modes, comportamento statistico e assenza di protezioni indipendenti validate.', 'Because of variable latency, failure modes, statistical behavior, and the absence of validated independent protection.', 'La decisione deriva da dinamica, conseguenza e requisiti di assurance.', 'The decision follows from dynamics, consequence, and assurance requirements.'],
      ['Perché ogni AI è sempre vietata in fabbrica.', 'Because all AI is always prohibited in factories.', 'L’AI può supportare decisioni entro un confine progettato e controllato.', 'AI can support decisions within an engineered and governed boundary.']
    ],
    1
  ),
  sourceIds: ['isa-18-alarm-management', 'nist-sp-800-82-r3', 'isa-95']
}

const unitThree = {
  id: 'historian-time-and-context',
  eyebrow: t('03 · Memoria operativa', '03 · Operational memory'),
  title: t(
    'Historian, timestamp, contesto evento e qualità delle serie temporali',
    'Historian, timestamps, event context, and time-series quality'
  ),
  objective: t(
    'Valutare se una serie temporale conserva tempo, qualità e contesto sufficienti per diagnosi, KPI e modelli affidabili.',
    'Assess whether a time series retains sufficient time, quality, and context for reliable diagnosis, KPIs, and models.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 2, practice: 2 },
  theory: [
    t(
      `Un process historian è una memoria specializzata per dati temporali industriali. Raccoglie valori, qualità, timestamp ed eventi da sistemi di controllo e li rende interrogabili per trend, analisi e reporting. Non è una registrazione perfetta di tutto ciò che è accaduto. La configurazione può applicare deadband, exception reporting, compressione, aggregazione e retention diverse per tag. Se una temperatura oscilla di meno della soglia configurata, alcuni campioni non vengono conservati; se la rete si interrompe, un collector può bufferizzare e inoltrare più tardi; se un tag cambia definizione, la stessa serie può avere semantica diversa prima e dopo la modifica. Per usare lo storico come evidenza bisogna conoscere il percorso. Il timestamp può rappresentare source time, server time o ingest time. Source time indica quando il dispositivo o la sorgente ha osservato il valore; server time quando il server lo ha ricevuto o elaborato; ingest time quando la piattaforma a valle lo ha acquisito. Confonderli trasforma ritardo di rete in ritardo di processo. OPC UA prevede timestamp e status associati ai valori e il suo modello supporta subscription e monitored items, ma la configurazione effettiva determina sampling interval, queue, publish interval e comportamento in caso di perdita. Il consumer deve preservare status code e sequenza, non appiattire ogni valore in coppia tempo-numero. In un'indagine su un microfermo, sapere che un valore è Bad o Uncertain è più utile che interpolarlo come se fosse valido. Il principio è semplice: missing, stale, substituted e good sono stati diversi. La qualità non è un fastidio da pulire automaticamente, ma informazione sul processo di misura e trasmissione.`,
      `A process historian is specialized memory for industrial time-series data. It collects values, quality, timestamps, and events from control systems and makes them queryable for trends, analysis, and reporting. It is not a perfect recording of everything that happened. Configuration may apply deadband, exception reporting, compression, aggregation, and different retention by tag. If temperature changes less than a configured threshold, some samples may not be stored. If the network fails, a collector may buffer and forward later. If a tag definition changes, the same series can have different semantics before and after the change. Using history as evidence requires understanding that path. A timestamp may represent source time, server time, or ingest time. Source time describes when the device or source observed the value; server time describes reception or processing; ingest time describes arrival at a downstream platform. Confusing them converts network delay into apparent process delay. OPC UA supports timestamps and status with values, plus subscriptions and monitored items, but the actual configuration determines sampling interval, queue behavior, publishing interval, and loss handling. Consumers should preserve status and sequence instead of flattening every observation into a time-value pair. During a micro-stop investigation, knowing that a value was Bad or Uncertain is more useful than interpolating it as valid. Missing, stale, substituted, and good are different states. Quality is not merely noise to remove automatically; it is evidence about measurement and transmission.`
    ),
    t(
      `Il tempo industriale deve essere governato come un dato condiviso. PLC, gateway, server, historian e cloud possono avere clock diversi, sincronizzazione assente, timezone locale o correzioni manuali. Un offset di due secondi basta per invertire causa ed effetto in un evento rapido. Le best practice architetturali definiscono una sorgente temporale autorevole, distribuzione e monitoraggio della sincronizzazione, uso coerente di UTC per persistenza e conversione della timezone soltanto in presentazione. Si conservano precisione e incertezza realistiche: assegnare nanosecondi a un valore letto ogni secondo crea precisione apparente. Anche daylight saving e riavvii vanno considerati. Un evento non è soltanto un picco. Per ricostruirlo occorrono finestre prima e dopo, stato macchina, mode, ricetta o configurazione, ordine, materiale, turno, causa dichiarata, intervento, acknowledgement e risultato. La contestualizzazione collega serie continue a eventi e master data. Se si addestra un modello su vibrazione senza distinguere cambio formato, pulizia, warm-up e produzione stabile, il modello può classificare la modalità operativa invece del guasto. Una event frame o struttura equivalente rende espliciti inizio, fine, trigger, asset, attributi e collegamenti. Deve essere versionata quando cambiano regole. In un ambiente regolamentato bisogna separare dati operativi per diagnosi, record ufficiali e derivazioni analitiche. Copiare valori in un data lake non trasforma automaticamente la copia in record regolamentato né ne garantisce integrità. Owner e steward definiscono uso consentito, lineage, retention, accesso e riconciliazione. Per una decisione di Quality, il riferimento resta il sistema e il record approvati secondo procedure applicabili; analytics può fornire contesto senza sostituire la disposizione autorizzata. La disciplina evita che una comoda visualizzazione venga scambiata per fonte di verità.`,
      `Industrial time must be governed as shared data. PLCs, gateways, servers, historians, and cloud platforms may have different clocks, absent synchronization, local time zones, or manual corrections. A two-second offset can reverse cause and effect in a fast event. Sound architecture defines an authoritative time source, monitored synchronization distribution, consistent UTC persistence, and time-zone conversion only for presentation. It preserves realistic precision and uncertainty: assigning nanoseconds to a value read every second creates false precision. Daylight-saving transitions and restarts also matter. An event is more than a spike. Reconstruction needs windows before and after, machine state, mode, recipe or configuration, order, material, shift, declared cause, intervention, acknowledgement, and result. Contextualization connects continuous series with events and master data. A model trained on vibration without separating changeover, cleaning, warm-up, and stable production may classify the operating mode instead of the fault. An event frame or equivalent structure makes start, end, trigger, asset, attributes, and links explicit, and its rules need versioning. In regulated manufacturing, distinguish operational diagnostic data, official records, and analytical derivations. Copying values into a data lake does not automatically make the copy a regulated record or guarantee integrity. Owners and stewards define permitted use, lineage, retention, access, and reconciliation. For a Quality decision, the authoritative source remains the approved system and record under applicable procedures; analytics may add context without replacing authorized disposition. This discipline prevents a convenient visualization from being mistaken for the source of truth.`
    ),
    t(
      `La qualità di una serie temporale si misura rispetto all'uso. Completezza è la quota di osservazioni attese disponibili, ma l'atteso dipende da sampling e modalità. Se un tag dovrebbe produrre un valore al secondo per un'ora, gli attesi sono 3.600; con 3.420 valori la completezza grezza è 95 per cento. Se 120 valori hanno status Bad, la completezza valida è (3.420-120)/3.600, cioè 91,7 per cento. Timeliness misura disponibilità entro la latenza richiesta; uniqueness identifica duplicati; plausibility confronta range e dinamica; consistency verifica relazioni come contatore monotono o bilancio; continuity trova gap; lineage registra trasformazioni. Occorre evitare pulizia distruttiva. Rimuovere outlier può cancellare proprio il transiente che anticipa un guasto. Imputare linearmente durante un arresto può inventare produzione. Un workflow robusto conserva raw immutabile quando appropriato, crea una vista curata con regole versionate, marca ogni valore derivato e produce metriche di qualità segmentate per asset e stato. L'analisi parte con una data contract: nome, significato, unità, frequenza, qualità, owner, latency objective, retention, security classification e comportamento su gap. Un failure mode comune nasce quando un contatore cumulativo si resetta a mezzanotte o al riavvio. La differenza semplice produce una quantità negativa e corrompe l'OEE. La regola deve riconoscere reset, rollover e sostituzione dispositivo, conservare il valore precedente valido e riconciliare con l'ordine. Un altro caso è la compressione: due trend visivamente simili possono avere densità diverse e quindi diversa capacità di catturare picchi. Prima di promettere predictive maintenance, il Technical Lead esegue un audit temporale: campionamento utile, sincronizzazione, copertura dei failure mode, label, leakage, cambi di configurazione e disponibilità durante incidenti. Se mancano eventi positivi o contesto, una fase di data readiness è il risultato corretto, non un modello dimostrativo addestrato su dati inadatti.`,
      `Time-series quality is measured against its intended use. Completeness is the proportion of expected observations available, but expected count depends on sampling and operating mode. If a tag should produce one value per second for one hour, 3,600 are expected. With 3,420 values, raw completeness is 95 percent. If 120 values have Bad status, valid completeness is (3,420-120)/3,600, or 91.7 percent. Timeliness measures availability within required latency; uniqueness detects duplicates; plausibility checks range and dynamics; consistency tests relationships such as a monotonic counter or balance; continuity finds gaps; lineage records transformations. Avoid destructive cleaning. Removing outliers may erase the transient that precedes a failure. Linear imputation during a stop can invent production. A robust workflow retains immutable raw data where appropriate, creates a curated view with versioned rules, marks every derived value, and reports quality by asset and state. Analysis begins with a data contract: name, meaning, unit, frequency, quality, owner, latency objective, retention, security classification, and gap behavior. A common failure occurs when a cumulative counter resets at midnight or restart. A simple difference creates negative production and corrupts OEE. The rule must recognize reset, rollover, and device replacement, retain the last valid value, and reconcile against the order. Compression creates another risk: visually similar trends may have different density and ability to retain peaks. Before promising predictive maintenance, the Technical Lead performs a temporal audit covering useful sampling, synchronization, failure-mode coverage, labels, leakage, configuration changes, and incident availability. If positive events or context are missing, a data-readiness phase is the correct outcome, not a demonstration model trained on unsuitable data.`
    )
  ],
  microExamples: [microExample(
    'Completezza grezza e valida',
    'Raw and valid completeness',
    '3.420 campioni su 3.600 danno 95 per cento, ma 120 campioni Bad riducono la copertura valida al 91,7 per cento.',
    '3,420 samples out of 3,600 give 95 percent, but 120 Bad samples reduce valid coverage to 91.7 percent.'
  )],
  checkpoint: checkpoint(
    'Quale timestamp descrive meglio quando il dispositivo ha osservato una variazione?',
    'Which timestamp best describes when the device observed a change?',
    [
      ['Ingest time.', 'Ingest time.', 'Indica l’arrivo nella piattaforma a valle.', 'It describes arrival at the downstream platform.'],
      ['Source time.', 'Source time.', 'Rappresenta il tempo assegnato dalla sorgente che osserva il valore.', 'It represents the time assigned by the source observing the value.'],
      ['Tempo di apertura del dashboard.', 'Dashboard opening time.', 'È un evento di presentazione, non di misura.', 'It is a presentation event, not a measurement event.']
    ],
    1
  ),
  sourceIds: ['opc-ua-part-1', 'nist-sp-800-82-r3']
}

const unitFour = {
  id: 'mes-mom-and-genealogy',
  eyebrow: t('04 · Esecuzione produttiva', '04 · Manufacturing execution'),
  title: t(
    'Responsabilità MES/MOM e genealogia di produzione',
    'MES/MOM responsibilities and production genealogy'
  ),
  objective: t(
    'Collocare MES/MOM tra controllo e business e progettare una genealogia che sostenga esecuzione, qualità e indagine.',
    'Place MES/MOM between control and business and design genealogy supporting execution, quality, and investigation.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 4, cases: 4, practice: 1 },
  theory: [
    t(
      `Manufacturing operations management descrive l'insieme di attività che gestiscono l'esecuzione delle operazioni di produzione; MES è il termine comunemente usato per sistemi che implementano una parte significativa di tali capacità. ISA-95, pubblicato come serie ISA-95 e IEC 62264, fornisce modelli e terminologia per integrare enterprise e control. Il valore del riferimento non è disegnare cinque scatole e assegnare ogni prodotto a una scatola. È definire attività, informazioni e confini in modo che ordini, materiali, personale, equipment, segmenti di processo e performance abbiano significato condiviso. Nella rappresentazione funzionale, le attività di manufacturing operations management includono tipicamente production, maintenance, quality e inventory operations management. Un MES può dispatchare lavoro, verificare readiness, guidare esecuzione, raccogliere dichiarazioni, gestire eccezioni, calcolare performance e costruire genealogia. Non sostituisce il PLC nel controllo deterministico, né l'ERP nella pianificazione finanziaria e di supply chain. SCADA mostra e supervisiona il processo, mentre MES risponde a quale ordine è in esecuzione, con quali risorse e materiali, secondo quale definizione, con quale stato e risultato. Il confine concreto dipende dall'architettura, ma la responsabilità deve essere unica. Se ordine e stato vengono modificati sia in SCADA sia in MES senza una regola autorevole, nasce una doppia verità. Un buon design stabilisce system of record per ogni oggetto, eventi di transizione, idempotenza, gestione errori e riconciliazione. L'integrazione non è un trasferimento di tabelle: è un contratto sul ciclo di vita. Per esempio Released, Dispatched, Started, Held, Completed e Closed hanno precondizioni, owner e conseguenze differenti.`,
      `Manufacturing operations management describes the activities used to manage manufacturing execution; MES is the common term for systems implementing a substantial subset of those capabilities. ISA-95, published as the ISA-95 and IEC 62264 series, provides models and terminology for enterprise-control integration. Its value is not drawing five boxes and assigning every product to one box. It defines activities, information, and boundaries so that orders, materials, personnel, equipment, process segments, and performance share meaning. In the functional representation, manufacturing operations management commonly includes production, maintenance, quality, and inventory operations management. An MES may dispatch work, verify readiness, guide execution, collect declarations, manage exceptions, calculate performance, and build genealogy. It does not replace the PLC for deterministic control or ERP for financial and supply-chain planning. SCADA displays and supervises the process, while MES answers which order is running, with which resources and materials, under which definition, in which state, and with what result. The exact boundary depends on architecture, but responsibility must be singular. If order and state are editable in both SCADA and MES without an authoritative rule, two truths emerge. A sound design defines the system of record for each object, transition events, idempotency, error handling, and reconciliation. Integration is not merely table transfer. It is a lifecycle contract. States such as Released, Dispatched, Started, Held, Completed, and Closed each have different preconditions, owners, and consequences.`
    ),
    t(
      `La genealogia collega ciò che è stato prodotto a ciò che è stato consumato, eseguito e osservato. Per un lotto o unità può includere materiale in ingresso e relativi lotti, semi-finiti, equipment e linea, ordine e operation, parametri rilevanti, versione della ricetta o specifica, timestamp, operatori o ruoli autorizzati, risultati di ispezione, rilavorazioni, hold, scarti e destinazioni. Il livello di granularità nasce dal rischio e dal processo. Tracciare soltanto il giorno di produzione può essere insufficiente per isolare un intervallo di materiale; tracciare ogni millisecondo senza identità stabile aumenta volume senza migliorare recall. Le chiavi devono sopravvivere ai confini: material lot, handling unit, seriale, production order e equipment ID necessitano di mapping governato. Quando un materiale viene diviso, unito, trasformato o rilavorato, la genealogia è un grafo, non una semplice lista. La domanda di indagine è bidirezionale. Tracciabilità backward trova input, condizioni e risorse di un output; forward identifica tutti gli output potenzialmente influenzati da un input o evento. In un caso PMI-style ipotetico, basato soltanto sul contesto pubblico di una grande manifattura regolamentata, un componente in ingresso viene associato a tre ordini, uno dei quali attraversa due linee dopo una rilavorazione. Se il sistema conserva solo il consumo aggregato per turno, Quality può essere costretta a porre un perimetro di hold molto ampio. Una genealogia precisa non decide la disposizione: riduce il dominio dell'indagine e fornisce evidenza a ruoli autorizzati. Il design deve dichiarare assunzioni e non insinuare conoscenza di procedure o sistemi PMI riservati. Il record ufficiale e le regole applicabili sono quelli dell'organizzazione reale.`,
      `Genealogy links what was produced with what was consumed, executed, and observed. For a lot or unit, it may include incoming materials and lots, semi-finished goods, equipment and line, order and operation, relevant parameters, recipe or specification version, timestamps, authorized operators or roles, inspection results, rework, holds, scrap, and destinations. Granularity follows process risk. Recording only the production day may be insufficient to isolate an affected material interval; recording every millisecond without stable identity increases volume without improving recall. Keys must survive boundaries: material lot, handling unit, serial number, production order, and equipment ID need governed mappings. When material is split, joined, transformed, or reworked, genealogy is a graph rather than a list. Investigation is bidirectional. Backward traceability finds the inputs, conditions, and resources behind an output; forward traceability identifies every output potentially influenced by an input or event. In a hypothetical PMI-style case based solely on public context about a large regulated manufacturer, one incoming component feeds three orders, and one order crosses two lines after rework. If the system retains only shift-level consumption, Quality may need to place a broad quantity on hold. Precise genealogy does not make the disposition decision. It narrows the investigation domain and supplies evidence to authorized roles. The design must state assumptions and never imply knowledge of confidential PMI procedures or systems. Official records and applicable rules remain those of the actual organization.`
    ),
    t(
      `La qualità della genealogia si prova con scenari, non con il numero di campi. Primo: dato un lotto finito, il sistema restituisce tutti gli input e le versioni applicabili. Secondo: dato un lotto in ingresso, restituisce tutti gli output, inclusi split, merge e rework. Terzo: un evento tardivo o duplicato non crea consumo doppio. Quarto: se MES è offline, la produzione segue una procedura degradata autorizzata e i record vengono riconciliati con firma, motivo e conflitto visibile. Quinto: una correzione non sovrascrive silenziosamente l'origine, ma conserva audit trail. Un indicatore utile è genealogy completeness: unità con tutti i legami obbligatori diviso unità prodotte. Se 9.850 unità su 10.000 hanno legami completi, il valore è 98,5 per cento. Tuttavia il restante 1,5 per cento può concentrarsi in un unico lotto ad alto rischio, quindi si segmenta e si applicano gate. Si misurano anche tempo di ricostruzione, quantità media coinvolta in un mock recall, eccezioni non riconciliate e latenza degli eventi. Il failure mode più comune è considerare il MES una fonte magica: se scanner, interfacce o master data producono identità incoerenti, il sistema automatizza l'ambiguità. Controlli includono validazione del lotto rispetto all'ordine, status e shelf life, blocco di combinazioni non autorizzate, conferma di eccezioni, code idempotenti e monitoraggio di messaggi in errore. La separazione dei compiti impedisce che chi esegue una correzione approvi anche una disposizione regolamentata quando non consentito. Il Technical Lead formula quindi il confine MES/SCADA in termini di decisioni: SCADA controlla e rende visibile lo stato corrente del processo; MES orchestra il lavoro e collega contesto, esecuzione e risultato. Le integrazioni trasferiscono soltanto ciò che serve, alla latenza coerente con la decisione.`,
      `Genealogy quality is proven through scenarios, not field count. First, given a finished lot, the system returns every input and applicable version. Second, given an incoming lot, it returns every output, including splits, joins, and rework. Third, a late or duplicate event does not create double consumption. Fourth, if MES is unavailable, production follows an authorized degraded procedure and records are reconciled with signature, reason, and visible conflict. Fifth, a correction never silently overwrites origin but retains an audit trail. A useful measure is genealogy completeness: units with all mandatory links divided by units produced. If 9,850 of 10,000 units have complete links, the result is 98.5 percent. The remaining 1.5 percent may be concentrated in one high-risk lot, however, so the metric needs segmentation and gates. Other measures include reconstruction time, average scope in a mock recall, unreconciled exceptions, and event latency. A common failure is treating MES as a magical source. If scanners, interfaces, or master data create inconsistent identities, the system automates ambiguity. Controls include validating lot against order, status, and shelf life; blocking unauthorized combinations; confirming exceptions; using idempotent queues; and monitoring failed messages. Segregation of duties prevents a person who corrects a record from also approving regulated disposition where that is not allowed. The Technical Lead therefore explains the MES/SCADA boundary through decisions: SCADA controls and visualizes current process state; MES orchestrates work and links context, execution, and result. Integrations transfer only what is necessary at latency appropriate to the decision.`
    )
  ],
  microExamples: [microExample(
    'Genealogia incompleta concentrata',
    'Concentrated genealogy gaps',
    'Il 98,5 per cento complessivo può nascondere 150 legami mancanti nello stesso lotto; segmentazione e mock recall rendono il rischio visibile.',
    'An overall 98.5 percent can hide 150 missing links in one lot; segmentation and mock recall reveal the risk.'
  )],
  workedCases: [{
    title: t('Ricostruzione di un lotto con split e rilavorazione', 'Reconstructing a lot with a split and rework'),
    scenario: t(
      'Caso PMI-style realistico ma ipotetico da contesto pubblico: un componente alimenta tre ordini; una parte viene rilavorata su una seconda linea e una verifica segnala una possibile anomalia.',
      'Realistic but hypothetical PMI-style case based on public context: one component feeds three orders; a portion is reworked on a second line and an inspection flags a potential anomaly.'
    ),
    assumptions: t(
      'Identità di lotti, ordini, handling unit ed equipment sono disponibili; le regole reali di Quality e i sistemi PMI non sono conosciuti né presunti.',
      'Lot, order, handling-unit, and equipment identities are available; actual Quality rules and PMI systems are neither known nor assumed.'
    ),
    reasoning: t(
      'Il team percorre il grafo backward e forward, include split e rework, verifica versioni e timestamp e marca due eventi tardivi senza duplicare consumi.',
      'The team traverses the graph backward and forward, includes splits and rework, checks versions and timestamps, and marks two late events without duplicating consumption.'
    ),
    decision: t(
      'Consegnare a Quality un perimetro verificabile di unità potenzialmente coinvolte, con gap dichiarati; Quality conserva la disposizione e ogni eventuale rilascio.',
      'Provide Quality with a verifiable scope of potentially affected units and declared gaps; Quality retains disposition and any release decision.'
    ),
    tradeOff: t(
      'Maggiore granularità riduce il perimetro ma richiede identità, storage, riconciliazione e disciplina operativa più forti.',
      'Greater granularity narrows scope but requires stronger identity, storage, reconciliation, and operating discipline.'
    ),
    outcome: t(
      'La ricostruzione collega 6.000 unità consumate a 5.750 unità finite potenzialmente coinvolte e 250 unità di scarto o perdita, con yield del 95,83 per cento. Rispetto a un hold iniziale di 10.000 unità, il perimetro finito si riduce del 42,5 per cento; Quality conserva la decisione.',
      'The reconstruction links 6,000 consumed units to 5,750 potentially affected finished units and 250 scrap or loss units, for a 95.83 percent yield. Against an initial 10,000-unit hold, the finished scope narrows by 42.5 percent; Quality retains the decision.'
    ),
    caseArtifact: {
      nodes: [
        { id: 'SFG-401', kind: 'intermediate-lot' },
        { id: 'SFG-401-A', kind: 'split-lot' },
        { id: 'SFG-401-B', kind: 'split-lot' },
        { id: 'RW-401-B', kind: 'rework-lot' }
      ],
      inputLots: [{
        id: 'COMP-A17',
        units: 10000,
        evidence: t('Ricevimento approvato GR-017 e material master MM-A.', 'Approved receipt GR-017 and material master MM-A.')
      }],
      outputLots: [
        { id: 'FG-701', units: 3900, evidence: t('Dichiarazione MES PROD-701 e pallet range P701-001/P701-039.', 'MES declaration PROD-701 and pallet range P701-001/P701-039.') },
        { id: 'FG-702', units: 1850, evidence: t('Dichiarazione MES PROD-702 e record rilavorazione RW-55.', 'MES declaration PROD-702 and rework record RW-55.') }
      ],
      edges: [
        { id: 'consume-a17', from: 'COMP-A17', to: 'SFG-401', units: 6000, operation: t('Consumo su ordine O-401', 'Consumption on order O-401'), evidence: t('Evento originale EV-101, scanner SC-04.', 'Original event EV-101, scanner SC-04.') },
        { id: 'split-a', from: 'SFG-401', to: 'SFG-401-A', units: 4000, operation: t('Split verso linea 1', 'Split to line 1'), evidence: t('Evento EV-102 e handling unit HU-401-A.', 'Event EV-102 and handling unit HU-401-A.') },
        { id: 'split-b', from: 'SFG-401', to: 'SFG-401-B', units: 2000, operation: t('Split verso rilavorazione', 'Split toward rework'), evidence: t('Evento EV-103 e handling unit HU-401-B.', 'Event EV-103 and handling unit HU-401-B.') },
        { id: 'pack-701', from: 'SFG-401-A', to: 'FG-701', units: 3900, operation: t('Confezionamento su linea 1', 'Packaging on line 1'), evidence: t('Evento EV-104, 100 unità scarto dichiarate.', 'Event EV-104, with 100 scrap units declared.') },
        { id: 'rework-b', from: 'SFG-401-B', to: 'RW-401-B', units: 1900, operation: t('Rilavorazione su linea 2', 'Rework on line 2'), evidence: t('Evento tardivo EV-105 riconciliato con RW-55; 100 unità scarto.', 'Late event EV-105 reconciled with RW-55; 100 scrap units.') },
        { id: 'pack-702', from: 'RW-401-B', to: 'FG-702', units: 1850, operation: t('Confezionamento dopo rilavorazione', 'Packaging after rework'), evidence: t('Evento EV-106; 50 unità scarto dichiarate.', 'Event EV-106; 50 scrap units declared.') }
      ],
      eventExceptions: [
        {
          id: 'EV-101-RETRY',
          status: 'duplicate-ignored',
          handling: t('La stessa idempotency key di EV-101 impedisce un secondo consumo di 6.000 unità.', 'The same idempotency key as EV-101 prevents a second 6,000-unit consumption.'),
          evidence: t('Correlation ID C-401 e hash payload uguali all’originale.', 'Correlation ID C-401 and payload hash match the original.')
        },
        {
          id: 'EV-105',
          status: 'late-reconciled',
          handling: t('L’evento arriva dopo la chiusura, viene posto in eccezione e collegato solo dopo approvazione del data steward.', 'The event arrives after closure, is quarantined, and is linked only after data-steward approval.'),
          evidence: t('Source timestamp precedente a EV-106, record RW-55 e sequence attesa.', 'Source timestamp before EV-106, record RW-55, and expected sequence.')
        }
      ],
      reconstructionSteps: [
        t('1. Verificare identità COMP-A17 e consumo originale EV-101; ignorare il retry duplicato.', '1. Verify COMP-A17 identity and original consumption EV-101; ignore the duplicate retry.'),
        t('2. Seguire SFG-401 nei due split HU-401-A e HU-401-B e riconciliare 4.000 + 2.000 = 6.000.', '2. Follow SFG-401 into split units HU-401-A and HU-401-B and reconcile 4,000 + 2,000 = 6,000.'),
        t('3. Collegare il ramo A a FG-701 e registrare 100 unità di scarto.', '3. Link branch A to FG-701 and record 100 scrap units.'),
        t('4. Validare l’evento tardivo EV-105 contro RW-55 prima di collegare il ramo B alla rilavorazione.', '4. Validate late event EV-105 against RW-55 before linking branch B to rework.'),
        t('5. Collegare RW-401-B a FG-702 e riconciliare altre 150 unità di perdita e scarto.', '5. Link RW-401-B to FG-702 and reconcile another 150 units of loss and scrap.'),
        t('6. Consegnare a Quality 5.750 unità finite, evidenze, eccezioni e gap; non eseguire disposizione automatica.', '6. Provide Quality with 5,750 finished units, evidence, exceptions, and gaps; make no automated disposition.')
      ],
      scopeCalculation: {
        affectedInputUnits: 6000,
        affectedOutputUnits: 5750,
        scrapAndLossUnits: 250,
        outputYieldPercent: 95.83,
        initialHoldUnits: 10000,
        scopeReductionPercent: 42.5,
        formula: t(
          'Yield = 5.750 / 6.000 = 95,83%; riduzione scope = (10.000 - 5.750) / 10.000 = 42,5%.',
          'Yield = 5,750 / 6,000 = 95.83%; scope reduction = (10,000 - 5,750) / 10,000 = 42.5%.'
        )
      },
      evidence: [
        t('Ricevimento, scanner, source timestamp, handling unit, MES declaration e record rilavorazione.', 'Receipt, scanner, source timestamp, handling unit, MES declaration, and rework record.'),
        t('Assunzione didattica: ogni unità è discreta e le quantità di scarto sono già approvate nel sistema autorevole.', 'Teaching assumption: every unit is discrete and scrap quantities are already approved in the authoritative system.')
      ],
      failureHandling: [
        t('Duplicato: idempotency key e payload hash impediscono doppio consumo.', 'Duplicate: the idempotency key and payload hash prevent double consumption.'),
        t('Evento tardivo: quarantena, verifica sequence/source time e approvazione steward prima del link.', 'Late event: quarantine, sequence/source-time verification, and steward approval before linking.'),
        t('Gap irrisolto: ampliare il perimetro e segnalarlo a Quality; non inferire un collegamento.', 'Unresolved gap: widen scope and disclose it to Quality; do not infer a link.')
      ]
    },
    followUps: [
      t('Come cambierebbe il perimetro se EV-105 non fosse verificabile?', 'How would scope change if EV-105 could not be verified?'),
      t('Quale sistema deve autorizzare una correzione genealogica?', 'Which system should authorize a genealogy correction?')
    ],
    pmiCase: true,
    hypothetical: true,
    publicContext: true
  }],
  checkpoint: checkpoint(
    'Qual è la distinzione più utile tra SCADA e MES?',
    'What is the most useful distinction between SCADA and MES?',
    [
      ['SCADA supervisiona stato e processo; MES orchestra esecuzione, contesto e genealogia.', 'SCADA supervises process state; MES orchestrates execution, context, and genealogy.', 'La distinzione usa responsabilità decisionali, pur ammettendo sovrapposizioni di prodotto.', 'This uses decision responsibility while allowing product overlap.'],
      ['SCADA è sempre livello 2 e MES è sempre un singolo server livello 3.', 'SCADA is always level 2 and MES is always one level 3 server.', 'I modelli funzionali non impongono una topologia o un prodotto unico.', 'Functional models do not mandate one topology or product.'],
      ['MES sostituisce interlock e controllo del PLC.', 'MES replaces PLC interlocks and control.', 'Il controllo deterministico resta vicino al processo.', 'Deterministic control remains close to the process.']
    ],
    0
  ),
  sourceIds: ['isa-95', 'pmi-operations', 'pmi-product-reliability']
}

const unitFive = {
  id: 'erp-planning-logistics-boundary',
  eyebrow: t('05 · Impresa e fabbrica', '05 · Enterprise and plant'),
  title: t(
    'ERP, pianificazione, logistica e confine MES/ERP',
    'ERP, planning, logistics, and the MES/ERP boundary'
  ),
  objective: t(
    'Definire il contratto tra pianificazione enterprise ed esecuzione industriale senza duplicare ownership o perdere eventi.',
    'Define the contract between enterprise planning and industrial execution without duplicating ownership or losing events.'
  ),
  estimatedMinutes: 9,
  timeAllocation: { theory: 5, cases: 3, practice: 1 },
  theory: [
    t(
      `L'ERP integra processi enterprise come domanda, acquisti, inventario contabile, ordini, costi, vendite e finanza. La pianificazione traduce domanda e vincoli in fabbisogni e ordini; schedulazione e operations trasformano quelli autorizzati in lavoro eseguibile. ISA-95 aiuta a descrivere lo scambio tra business planning and logistics e manufacturing operations management. La distinzione non equivale a ERP sopra e MES sotto in ogni dettaglio tecnico. È un confine di responsabilità e orizzonte. ERP governa generalmente che cosa deve essere prodotto, quantità, data, materiale e implicazioni enterprise; MES governa come l'ordine viene dispatchato ed eseguito con risorse, istruzioni, dichiarazioni ed eccezioni di fabbrica. Il contratto tipico invia verso MES production schedule o work request con identificatori, prodotto, quantità, priorità, date, routing o riferimenti applicabili. MES restituisce performance effettiva: inizio, fine, quantità buona, scarto, consumo, stato e motivi. Le definizioni devono essere precise. Se ERP considera completato un ordine quando riceve quantità e MES soltanto dopo verifica finale, una notifica precoce crea disponibilità fittizia. Se entrambe le applicazioni possono cambiare quantità o materiale senza workflow, la riconciliazione diventa manuale. Un'architettura robusta assegna master ownership: ERP può essere autorevole per material master commerciale e ordine rilasciato; MES per stato di esecuzione e genealogia; warehouse management per movimenti logistici dettagliati; Quality system per decisioni di stato applicabili. L'organizzazione reale può scegliere diversamente, ma ogni oggetto necessita una sola autorità e regole per repliche.`,
      `ERP integrates enterprise processes such as demand, procurement, financial inventory, orders, cost, sales, and finance. Planning turns demand and constraints into requirements and orders; scheduling and operations turn authorized orders into executable work. ISA-95 helps describe exchange between business planning and logistics and manufacturing operations management. The distinction is not simply ERP above MES in every technical detail. It is a boundary of responsibility and horizon. ERP generally governs what should be produced, quantity, date, material, and enterprise implications; MES governs how an order is dispatched and executed using plant resources, instructions, declarations, and exceptions. A typical contract sends a production schedule or work request to MES with identifiers, product, quantity, priority, dates, and applicable routing or references. MES returns actual performance: start, finish, good quantity, scrap, consumption, state, and reasons. Definitions must be precise. If ERP treats an order as complete when it receives quantity while MES closes only after final verification, an early message creates false availability. If both applications can change quantity or material without a workflow, reconciliation becomes manual. A robust architecture assigns master ownership. ERP may be authoritative for the commercial material master and released order; MES for execution state and genealogy; warehouse management for detailed logistics movements; and the Quality system for applicable status decisions. An actual organization may allocate responsibilities differently, but each object needs one authority and replication rules.`
    ),
    t(
      `Le integrazioni devono tollerare realtà imperfetta. Reti cadono, messaggi arrivano due volte o fuori ordine, un ordine viene cancellato mentre è in download, un codice non esiste nel sistema ricevente, quantità hanno unità diverse. Un flusso affidabile usa identificatore globale o chiave concordata, versione, timestamp, schema, correlation ID, stato e idempotency key. At-least-once delivery richiede che ripetere lo stesso evento non raddoppi consumo o produzione. Un consumer registra l'evento già elaborato e risponde coerentemente. L'ordine degli eventi viene verificato con sequence o version; un evento tardivo non riapre silenziosamente un ordine chiuso. Le operazioni che attraversano più sistemi non sono una transazione database unica: si progettano stati intermedi, compensazioni e riconciliazione. Una coda di errore non è una soluzione se nessuno la possiede. Servono owner, service level, dashboard per lag e failure, runbook e autorità per correggere master data. Consideriamo 1.000 ordini inviati in un giorno: 985 vengono accettati entro cinque minuti, 10 sono duplicati riconosciuti, 3 falliscono per unità di misura e 2 per material code. La technical success rate grezza è 98,5 per cento, ma la business completeness dopo gestione idempotente è 99,5 per cento; restano cinque eccezioni operative. Il KPI corretto separa accepted, duplicate-safe, rejected e reconciled. Una media nasconde l'età: un singolo ordine bloccato da dodici ore può fermare la linea. Si misura quindi percentile e maximum lag, non soltanto throughput. Il fallback può consentire una lista locale di ordini già autorizzati entro un orizzonte definito, mai inventare ordini non rilasciati. Alla riconnessione, le dichiarazioni vengono confrontate e i conflitti richiedono decisione umana.`,
      `Integrations must tolerate imperfect reality. Networks fail, messages arrive twice or out of order, an order is cancelled during download, a code is absent in the receiver, and quantities use different units. A reliable flow uses a global identifier or agreed key, version, timestamp, schema, correlation ID, state, and idempotency key. At-least-once delivery requires repeated events not to double production or consumption. A consumer records an already processed event and responds consistently. Sequence or version checks protect ordering; a late event must not silently reopen a closed order. Cross-system operations are not one database transaction. They need intermediate states, compensation, and reconciliation. An error queue is not a solution when nobody owns it. It needs an owner, service level, lag and failure dashboard, runbook, and authority to correct master data. Consider 1,000 orders sent in one day: 985 are accepted within five minutes, 10 are recognized duplicates, 3 fail unit conversion, and 2 fail material codes. Raw technical success is 98.5 percent, while business completeness after safe duplicate handling is 99.5 percent; five operational exceptions remain. A correct KPI separates accepted, duplicate-safe, rejected, and reconciled. An average hides age: one order blocked for twelve hours can stop a line. Therefore measure percentile and maximum lag, not throughput alone. A fallback may expose a local list of already authorized orders within a defined horizon, but must never invent unreleased work. On reconnection, declarations are compared and conflicts require a human decision.`
    ),
    t(
      `Il confine MES/ERP influenza AI e analytics. Una previsione di completamento può combinare stato MES, velocità reale, cambio formato e disponibilità materiale ERP, ma la raccomandazione non deve aggiornare automaticamente promessa cliente, ordine o disposizione. Prima si definisce decision owner: planner, production supervisor, logistics o Quality. Si distingue prediction da commitment. Il modello produce una distribuzione o rischio con timestamp e versione; una regola applicativa controlla freschezza e plausibilità; l'utente valuta vincoli non osservati; il sistema autorevole registra l'eventuale modifica con motivo. Edge è utile quando la decisione richiede dati locali ad alta frequenza, risposta durante disconnessione o minimizzazione dell'esposizione. Cloud è utile per aggregare siti, scalare compute, addestrare modelli e coordinare servizi enterprise. La scelta non è ideologica né esclusiva. Un pattern ibrido addestra centralmente su dati governati, distribuisce un modello firmato a un edge compatibile, esegue inferenza locale e invia performance e drift aggregati. Ma se la raccomandazione riguarda un piano multi-plant, il cloud o data center centrale dispone del contesto necessario e la latenza di minuti è accettabile. Il failure mode è replicare tutti i dati ovunque senza scopo, creando superfici di attacco e semantiche divergenti. Ogni flusso risponde a sette domande: quale decisione, quali campi, chi è owner, quanta latenza, quale protocollo, quale security boundary, quale fallback e quale azione umana. In un ambiente regolamentato si aggiungono classificazione, retention, audit e validazione proporzionata all'uso. La qualità dell'architettura si vede quando il piano cambia alle 14:03 mentre MES è offline: il team sa quale versione è valida, che cosa può continuare, chi decide e come riconciliare senza perdere genealogia.`,
      `The MES/ERP boundary also shapes AI and analytics. A completion forecast may combine MES state, actual speed, changeover, and ERP material availability, but the recommendation must not automatically change a customer promise, order, or disposition. First define the decision owner: planner, production supervisor, logistics, or Quality. Separate prediction from commitment. The model produces a distribution or risk with timestamp and version; an application rule checks freshness and plausibility; the user evaluates unobserved constraints; and the authoritative system records any accepted change with reason. Edge is useful when a decision needs local high-frequency data, operation through disconnection, or reduced exposure. Cloud is useful for cross-site aggregation, elastic compute, training, and enterprise coordination. The choice is neither ideological nor exclusive. A hybrid pattern trains centrally on governed data, distributes a signed model to compatible edge infrastructure, performs local inference, and returns aggregated performance and drift. If a recommendation concerns a multi-plant plan, however, a central cloud or data center has the necessary context and minute-level latency is acceptable. A failure mode is replicating all data everywhere without purpose, increasing attack surface and divergent semantics. Every flow answers: which decision, which fields, who owns them, required latency, protocol, security boundary, fallback, and human action. Regulated environments add classification, retention, audit, and validation proportionate to use. Architecture quality becomes visible when a plan changes at 14:03 while MES is offline: the team knows which version is valid, what can continue, who decides, and how to reconcile without losing genealogy.`
    )
  ],
  microExamples: [microExample(
    'Ordini duplicati ma sicuri',
    'Duplicate but safe orders',
    'Dieci duplicati su mille non devono creare dieci ordini aggiuntivi: una idempotency key trasforma la ripetizione in esito coerente e auditabile.',
    'Ten duplicates among one thousand must not create ten extra orders: an idempotency key turns repetition into a consistent, auditable outcome.'
  )],
  checkpoint: checkpoint(
    'Chi dovrebbe essere autorevole per lo stato di esecuzione dettagliato di un ordine nel pattern descritto?',
    'Who should be authoritative for detailed order execution state in the described pattern?',
    [
      ['MES, con replica controllata del risultato verso ERP.', 'MES, with controlled result replication to ERP.', 'Il pattern assegna a MES dispatch, esecuzione e dichiarazioni.', 'The pattern assigns dispatch, execution, and declarations to MES.'],
      ['Ogni sistema che riceve una copia.', 'Every system receiving a copy.', 'Più autorità producono conflitti e riconciliazione ambigua.', 'Multiple authorities create conflict and ambiguous reconciliation.'],
      ['Il modello AI.', 'The AI model.', 'Il modello può prevedere, ma non diventa system of record.', 'The model may forecast, but does not become the system of record.']
    ],
    0
  ),
  sourceIds: ['isa-95', 'nist-sp-800-82-r3']
}

const unitSix = {
  id: 'isa95-purdue-zones-conduits-dmz',
  eyebrow: t('06 · Confini e fiducia', '06 · Boundaries and trust'),
  title: t(
    'ISA-95, Purdue, zone, conduit e DMZ industriale',
    'ISA-95, Purdue, zones, conduits, and the industrial DMZ'
  ),
  objective: t(
    'Usare i modelli come linguaggio di comunicazione e progettare zone, conduit e DMZ in base a rischio e flussi autorizzati.',
    'Use models as a communication language and design zones, conduits, and a DMZ around risk and authorized flows.'
  ),
  estimatedMinutes: 10,
  timeAllocation: { theory: 5, cases: 2, practice: 3 },
  theory: [
    t(
      `ISA-95 e il cosiddetto Purdue model vengono spesso rappresentati con livelli. Questa vista è utile per conversare, ma diventa pericolosa se viene scambiata per una topologia obbligatoria. ISA-95 riguarda l'integrazione enterprise-control attraverso modelli di attività e informazione. Una mappa didattica colloca processo fisico al livello 0, sensing e attuazione al livello 1, controllo e supervisione al livello 2, manufacturing operations management al livello 3 e business planning and logistics al livello 4. Il numero non garantisce sicurezza, ownership o latenza e non determina che ogni funzione sia un server separato. Sistemi moderni distribuiti, edge e servizi cloud attraversano rappresentazioni semplici. Il modello resta utile per chiedere: quale decisione appartiene a quale attività, quali dati attraversano il confine, con quale direzione e conseguenza? NIST SP 800-82 Rev. 3 raccomanda di comprendere architettura, dipendenze e requisiti OT e tratta segmentazione, defense in depth, access control, monitoraggio e risposta con attenzione a performance, safety e disponibilità. Una zona raggruppa asset con requisiti di sicurezza e rischio simili; un conduit è il percorso controllato di comunicazione tra zone. La progettazione non parte dal vendor firewall, ma da inventory, criticality, trust, flussi minimi e failure mode. Una cella di confezionamento, i safety systems, il MES di sito, la DMZ industriale e la rete enterprise possono richiedere zone distinte. Dentro una zona non tutto è automaticamente fidato: least privilege, autenticazione, hardening, backup e monitoraggio restano necessari.`,
      `ISA-95 and the so-called Purdue model are often shown as levels. This view helps communication but becomes dangerous when treated as a mandatory topology. ISA-95 concerns enterprise-control integration through activity and information models. A teaching map places the physical process at level 0, sensing and actuation at level 1, control and supervision at level 2, manufacturing operations management at level 3, and business planning and logistics at level 4. A number does not guarantee security, ownership, or latency, and does not require every function to be one separate server. Modern distributed systems, edge platforms, and cloud services cross simple representations. The model remains useful for asking which decision belongs to which activity, which data crosses a boundary, in which direction, and with what consequence. NIST SP 800-82 Rev. 3 emphasizes understanding OT architecture, dependencies, and requirements, and addresses segmentation, defense in depth, access control, monitoring, and response with attention to performance, safety, and availability. A zone groups assets with similar security requirements and risk; a conduit is a controlled communication path between zones. Design starts with inventory, criticality, trust, minimum flows, and failure modes, not a firewall brand. A packaging cell, safety systems, site MES, industrial DMZ, and enterprise network may need distinct zones. Membership in one zone does not make every asset automatically trustworthy. Least privilege, authentication, hardening, backup, and monitoring still apply.`
    ),
    t(
      `La industrial DMZ crea un'area intermedia tra control network ed enterprise per evitare connessioni dirette e ospitare broker, proxy, replica historian, update staging, jump service o transfer controllati. Non è una scatola universale e non è sicura soltanto perché si chiama DMZ. Ogni servizio ha interfacce, identità, patch, log, backup e owner. I firewall ai due lati applicano allowlist separate; le sessioni sono iniziate nella direzione autorizzata; non si consente any-any; i flussi amministrativi usano accesso remoto controllato, autenticazione forte, approvazione, registrazione e durata limitata. Quando possibile, dati di processo salgono tramite un meccanismo brokered o replica e nessuna risposta cloud può diventare comando diretto al PLC. Un conduit documenta sorgente, destinazione, protocollo, porta, identità, scopo, volume, latency, logging, owner e fallback. OPC UA può fornire sicurezza a messaggi e sessioni tramite certificati, autenticazione e policy configurate, ma la semplice etichetta OPC UA non prova una configurazione sicura. Certificati scaduti, trust list troppo ampie, account condivisi o endpoint senza policy adeguata annullano il beneficio. La sicurezza di protocollo completa, non sostituisce, segmentazione e least privilege. Anche l'ispezione va bilanciata con disponibilità e compatibilità OT. Un controllo nuovo viene testato fuori produzione o in finestra approvata, con rollback e coinvolgimento vendor quando necessario. Il failure mode da evitare è applicare strumenti IT senza capire il traffico deterministico e causare interruzioni. Il contrario, non cambiare mai nulla per timore, conserva vulnerabilità. Risk assessment e compensating controls guidano priorità e sequenza.`,
      `An industrial DMZ creates an intermediate area between control and enterprise networks to avoid direct connections and host controlled brokers, proxies, historian replicas, update staging, jump services, or transfers. It is not a universal appliance and is not secure merely because it is called a DMZ. Every service has interfaces, identities, patching, logging, backup, and an owner. Firewalls on each side enforce separate allowlists; sessions originate only in approved directions; broad any-to-any rules are excluded; and administrative flows use controlled remote access, strong authentication, approval, recording, and time limits. Where feasible, process data moves upward through a broker or replica and no cloud response becomes a direct PLC command. A conduit documents source, destination, protocol, port, identity, purpose, volume, latency, logging, owner, and fallback. OPC UA can protect messages and sessions using certificates, authentication, and configured security policies, but the OPC UA label alone does not prove secure configuration. Expired certificates, overbroad trust lists, shared accounts, or endpoints with weak policies remove the benefit. Protocol security complements rather than replaces segmentation and least privilege. Inspection must also be balanced with OT availability and compatibility. A new control is tested away from production or in an approved window with rollback and vendor involvement where needed. One failure mode is applying IT tooling without understanding deterministic traffic and causing disruption. The opposite, never changing anything from fear, preserves vulnerabilities. Risk assessment and compensating controls guide priority and sequence.`
    ),
    t(
      `Per progettare un conduit si parte da un data-flow diagram e si prova la necessità di ogni freccia. Esempio: un OPC UA aggregator nella DMZ legge da un server approvato nella site operations zone e pubblica eventi a un broker enterprise. Il firewall OT ammette soltanto client, server, porta e certificato specifici; il firewall enterprise ammette soltanto l'uscita del broker; i log raggiungono un servizio monitorato; se l'aggregator fallisce, il controllo locale continua e un buffer conserva dati entro capacità definita. Un calcolo rende visibile il limite: con 5.000 tag, un campione al secondo e payload medio effettivo di 120 byte, il flusso applicativo è circa 600.000 byte al secondo, 4,8 Mbit/s prima di overhead e picchi. Un buffer di 20 GB contiene teoricamente circa 9,3 ore a quel rate, non giorni. Compressione e sampling possono estendere autonomia, ma devono preservare eventi necessari. Se il requisito è 24 ore, occorre almeno 51,8 GB applicativi più margine. Il controllo di capacità appartiene al fallback. L'attività professionale consiste nel compilare per ogni conduit owner, protocollo, trust, latency, volume, monitoraggio e degraded mode. Poi si svolge un tabletop: perdita WAN, certificato scaduto, broker pieno, account compromesso, patch urgente e perdita del time source. Per ogni scenario si specificano detection, containment, funzione che continua, escalation e recovery. L'architettura migliore non è quella con più confini disegnati, ma quella in cui i flussi legittimi sono minimi, comprensibili e verificabili e una compromissione non attraversa liberamente l'impresa. La safety rimane indipendente, le azioni sul prodotto restano autorizzate e il business riceve dati sufficienti senza possedere un percorso di comando non governato.`,
      `A conduit design starts with a data-flow diagram and proves the need for every arrow. For example, an OPC UA aggregator in the DMZ reads from an approved server in the site operations zone and publishes events to an enterprise broker. The OT firewall permits only the specific client, server, port, and certificate; the enterprise firewall permits only the broker flow; logs reach a monitored service; and if the aggregator fails, local control continues while a buffer retains data within defined capacity. A calculation reveals limits. With 5,000 tags, one sample per second, and an average effective payload of 120 bytes, application traffic is about 600,000 bytes per second, or 4.8 Mbit/s before overhead and peaks. A 20 GB buffer theoretically holds about 9.3 hours at that rate, not days. Compression and sampling may extend autonomy but must preserve required events. A 24-hour requirement needs at least 51.8 application GB plus margin. Capacity is part of fallback design. The professional activity is to complete owner, protocol, trust, latency, volume, monitoring, and degraded mode for every conduit. Then conduct a tabletop covering WAN loss, expired certificate, full broker, compromised account, urgent patching, and time-source loss. For each scenario specify detection, containment, continuing function, escalation, and recovery. The strongest architecture is not the one with the most boundaries on a diagram. Its legitimate flows are minimal, understandable, and verifiable, and a compromise cannot traverse the enterprise freely. Safety remains independent, product actions remain authorized, and the business receives sufficient data without owning an ungoverned command path.`
    )
  ],
  microExamples: [microExample(
    'Buffer DMZ dimensionato',
    'Sized DMZ buffer',
    'A 600.000 byte/s, 20 GB coprono circa 9,3 ore; un requisito di 24 ore richiede almeno 51,8 GB più overhead e margine.',
    'At 600,000 bytes/s, 20 GB covers about 9.3 hours; a 24-hour requirement needs at least 51.8 GB plus overhead and margin.'
  )],
  activities: [{
    durationMinutes: 3,
    prompt: t(
      'Progetta le conduit per PLC/SCADA, historian/DMZ ed enterprise broker. Per ciascuna specifica sorgente, destinazione, protocollo, data owner, latency, security boundary, fallback, monitoraggio e ruolo umano. Dimensiona poi un buffer di 24 ore per il flusso calcolato.',
      'Design conduits for PLC/SCADA, historian/DMZ, and the enterprise broker. For each, specify source, destination, protocol, data owner, latency, security boundary, fallback, monitoring, and human role. Then size a 24-hour buffer for the calculated flow.'
    ),
    modelSolution: t(
      'La tabella definisce tre conduit complete. Il flusso applicativo è 5.000 × 120 × 1 = 600.000 byte/s; per 86.400 secondi servono 51.840.000.000 byte, cioè 51,84 GB decimali. Applicando margine 1,3 si ottengono 67,392 GB e si provisionano 68 GB. Ogni riga mantiene controllo locale, monitoraggio, owner e degraded mode specifici; nessuna offre scrittura enterprise verso PLC.',
      'The table defines three complete conduits. Application traffic is 5,000 × 120 × 1 = 600,000 bytes/s; 86,400 seconds require 51,840,000,000 bytes, or 51.84 decimal GB. Applying a 1.3 margin gives 67.392 GB, rounded up to 68 GB provisioned. Every row retains specific local control, monitoring, ownership, and degraded behavior; none provides an enterprise-to-PLC write path.'
    ),
    solutionArtifact: {
      conduits: [
        {
          id: 'plc-to-scada',
          source: t('PLC di confezionamento PLC-201', 'Packaging PLC PLC-201'),
          destination: t('SCADA e server OPC UA OPC-201', 'SCADA and OPC UA server OPC-201'),
          interface: t('PROFINET cyclic I/O verso SCADA gateway con OPC UA SignAndEncrypt', 'PROFINET cyclic I/O to a SCADA gateway with OPC UA SignAndEncrypt'),
          dataOwner: t('Operations possiede stati e allarmi; OT possiede tag, gateway e certificati.', 'Operations owns states and alarms; OT owns tags, the gateway, and certificates.'),
          latencyBudgetMs: 1000,
          securityBoundaryCrossing: t('Machine control zone verso supervisory zone tramite allowlist OT.', 'Machine control zone to supervisory zone through an OT allowlist.'),
          monitoring: t('Watchdog di sessione, bad status, queue overflow, clock offset e alarm rate.', 'Session watchdog, bad status, queue overflow, clock offset, and alarm rate.'),
          degradedBehavior: t('PLC, interlock e HMI locale continuano; SCADA marca i valori stale.', 'PLC, interlocks, and local HMI continue; SCADA marks values stale.'),
          fallback: t('L’operatore usa HMI e procedura locale; nessun comando dipende da sistemi enterprise.', 'The operator uses the local HMI and procedure; no command depends on enterprise systems.'),
          humanAction: t('OT diagnostica la sessione; Operations razionalizza e riconosce gli allarmi.', 'OT diagnoses the session; Operations rationalizes and acknowledges alarms.')
        },
        {
          id: 'historian-to-dmz',
          source: t('Historian di sito HIST-301', 'Site historian HIST-301'),
          destination: t('Replica historian DMZ HIST-DMZ-401', 'DMZ historian replica HIST-DMZ-401'),
          interface: t('Replica HTTPS su TLS 1.3 con mutua autenticazione e tag allowlist', 'HTTPS replication over mutual TLS 1.3 with a tag allowlist'),
          dataOwner: t('Process owner approva i tag; OT opera la replica; OT Security possiede la regola.', 'The process owner approves tags; OT operates replication; OT Security owns the rule.'),
          latencyBudgetMs: 5000,
          securityBoundaryCrossing: t('Site operations zone verso industrial DMZ attraverso il firewall OT.', 'Site operations zone to industrial DMZ through the OT firewall.'),
          monitoring: t('Lag p95, byte/s, buffer occupancy, certificate expiry, retry e gap.', 'p95 lag, bytes/s, buffer occupancy, certificate expiry, retries, and gaps.'),
          degradedBehavior: t('Store-and-forward accumula fino a 24 ore; il controllo locale non cambia.', 'Store-and-forward accumulates up to 24 hours; local control does not change.'),
          fallback: t('A soglia 80 per cento si allerta OT; a saturazione si preservano eventi critici e raw locale.', 'At 80 percent occupancy OT is alerted; at saturation critical events and local raw data are preserved.'),
          humanAction: t('OT autorizza replay e riconcilia timestamp, status e gap dopo il recovery.', 'OT authorizes replay and reconciles timestamps, status, and gaps after recovery.')
        },
        {
          id: 'dmz-to-enterprise-broker',
          source: t('Publisher DMZ PUB-401', 'DMZ publisher PUB-401'),
          destination: t('Broker eventi enterprise EVT-501', 'Enterprise event broker EVT-501'),
          interface: t('MQTT 5 su mTLS con topic allowlist, QoS 1 e schema versionato', 'MQTT 5 over mTLS with a topic allowlist, QoS 1, and versioned schema'),
          dataOwner: t('Domain owner approva payload; IT Platform opera il broker; Security governa identity.', 'The domain owner approves payloads; IT Platform operates the broker; Security governs identity.'),
          latencyBudgetMs: 5000,
          securityBoundaryCrossing: t('Industrial DMZ verso enterprise integration zone attraverso il firewall enterprise.', 'Industrial DMZ to enterprise integration zone through the enterprise firewall.'),
          monitoring: t('Authentication failures, publish latency, consumer lag, duplicate rate e dead-letter queue.', 'Authentication failures, publish latency, consumer lag, duplicate rate, and dead-letter queue.'),
          degradedBehavior: t('Persistent queue e circuit breaker isolano il broker; nessun flusso di ritorno raggiunge OT.', 'A persistent queue and circuit breaker isolate the broker; no return flow reaches OT.'),
          fallback: t('Il publisher sospende i topic non critici e conserva sequenza per replay idempotente.', 'The publisher pauses noncritical topics and retains sequence for idempotent replay.'),
          humanAction: t('SOC triagia identity e intrusion alert; platform engineer ripristina e riconcilia la coda.', 'The SOC triages identity and intrusion alerts; the platform engineer restores and reconciles the queue.')
        }
      ],
      capacityCalculation: {
        tagCount: 5000,
        bytesPerSample: 120,
        samplesPerSecond: 1,
        bufferSeconds: 86400,
        requiredBytes: 51840000000,
        requiredGigabytes: 51.84,
        marginFactor: 1.3,
        provisionedGigabytes: 68,
        formula: t(
          '5.000 tag × 120 byte × 1 campione/s × 86.400 s = 51.840.000.000 byte; × 1,3 = 67,392 GB, arrotondati a 68 GB.',
          '5,000 tags × 120 bytes × 1 sample/s × 86,400 s = 51,840,000,000 bytes; × 1.3 = 67.392 GB, rounded up to 68 GB.'
        )
      }
    },
    rubric: [
      t('2 punti: tutte e tre le conduit hanno sorgente, destinazione, interface, owner, latency e boundary; 1: un campo manca; 0: frecce generiche.', '2 points: all three conduits include source, destination, interface, owner, latency, and boundary; 1: one field missing; 0: generic arrows.'),
      t('2 punti: calcolo 51,84 GB con margine dichiarato; 1: risultato senza formula; 0: buffer non dimensionato.', '2 points: 51.84 GB calculation with declared margin; 1: result without formula; 0: unsized buffer.'),
      t('2 punti: ogni riga definisce monitoring e degraded behavior verificabili; 1: uno dei due è vago; 0: nessuno.', '2 points: every row defines verifiable monitoring and degraded behavior; 1: one is vague; 0: neither is present.'),
      t('2 punti: fallback e human action sono specifici e il controllo locale resta indipendente; 1: responsabilità parziale; 0: dipendenza safety dal cloud.', '2 points: fallback and human action are specific and local control remains independent; 1: partial responsibility; 0: safety depends on cloud.')
    ]
  }],
  checkpoint: checkpoint(
    'Che cosa rende una DMZ industriale efficace?',
    'What makes an industrial DMZ effective?',
    [
      ['Il nome DMZ nel diagramma.', 'The DMZ label on the diagram.', 'Il nome non definisce servizi, regole o trust.', 'The label does not define services, rules, or trust.'],
      ['Servizi intermedi controllati, allowlist, identità, logging, ownership e fallback testato.', 'Controlled intermediary services, allowlists, identity, logging, ownership, and tested fallback.', 'Questi elementi riducono connessioni dirette e rendono i flussi verificabili.', 'These elements reduce direct connections and make flows verifiable.'],
      ['Una regola any-any tra OT e IT.', 'An any-to-any rule between OT and IT.', 'La regola elimina segmentazione e least privilege.', 'This removes segmentation and least privilege.']
    ],
    1
  ),
  sourceIds: ['isa-95', 'isa-iec-62443', 'nist-sp-800-82-r3', 'opc-ua-part-1']
}

const unitSeven = {
  id: 'edge-cloud-data-ai-serving',
  eyebrow: t('07 · Calcolo distribuito', '07 · Distributed compute'),
  title: t(
    'Edge, cloud, data platform, API, event streaming e AI serving',
    'Edge, cloud, data platforms, APIs, event streaming, and AI serving'
  ),
  objective: t(
    'Selezionare edge, cloud o un pattern ibrido e governare il ciclo di vita di eventi, API e modelli senza creare un percorso di controllo insicuro.',
    'Select edge, cloud, or a hybrid pattern and govern event, API, and model lifecycles without creating an unsafe control path.'
  ),
  estimatedMinutes: 10,
  timeAllocation: { theory: 5, cases: 3, practice: 2 },
  theory: [
    t(
      `Edge e cloud descrivono collocazione e modello operativo, non qualità intrinseca. Edge porta calcolo vicino alla sorgente: gateway, industrial PC, server di sito o appliance possono filtrare, contestualizzare, eseguire inferenza e continuare durante perdita WAN. Riduce latenza e volume in uscita, ma distribuisce hardware, patch, certificati, osservabilità e versioni su molti siti. Cloud offre risorse elastiche, servizi gestiti, data platform condivisa, addestramento intensivo e viste cross-plant, ma dipende da connettività, identity federation, cost governance e confini di sovranità o classificazione. La decisione usa criteri misurabili: deadline, jitter, durata offline, volume, sensibilità, necessità di aggregazione, frequenza di aggiornamento, skill locali, recovery e costo totale. Se un alert deve arrivare entro 500 ms e la WAN p99 è 800 ms, il cloud non soddisfa la deadline; inference edge è candidata, mentre training può restare centrale. Se una previsione supply-chain integra venti plant e ha orizzonte di una settimana, il cloud è appropriato. Un pattern ibrido separa control plane e data plane: configurazione e modelli approvati vengono distribuiti centralmente, dati necessari vengono elaborati localmente, metriche e subset governati risalgono. La disconnessione non deve cambiare silenziosamente comportamento. Si definiscono durata di autonomia, modello last-known-good, data freshness, coda, shed policy e riconciliazione. Se un edge resta offline oltre la validità del modello, passa ad advisory degradato o disabilita la raccomandazione; non improvvisa un comando.`,
      `Edge and cloud describe placement and operating model, not inherent quality. Edge brings computation near the source. A gateway, industrial PC, site server, or appliance can filter, contextualize, perform inference, and continue during WAN loss. It reduces latency and outbound volume but distributes hardware, patching, certificates, observability, and versions across sites. Cloud provides elastic resources, managed services, shared data platforms, intensive training, and cross-plant views, but depends on connectivity, federated identity, cost governance, and sovereignty or classification boundaries. Selection uses measurable criteria: deadline, jitter, offline duration, volume, sensitivity, aggregation need, update frequency, local skills, recovery, and total cost. If an alert must arrive within 500 ms while WAN p99 is 800 ms, cloud cannot meet the deadline; edge inference is a candidate while training remains central. If a supply-chain forecast combines twenty plants and has a one-week horizon, cloud is appropriate. A hybrid pattern separates control plane and data plane: centrally approved configuration and models are distributed, necessary data is processed locally, and governed metrics and subsets move upward. Disconnection must not silently change behavior. Define autonomy duration, last-known-good model, freshness, queue, shedding policy, and reconciliation. If an edge remains offline beyond model validity, it enters degraded advisory mode or disables recommendations; it never improvises a command.`
    ),
    t(
      `API ed event streaming servono interazioni diverse. Un'API request-response è adatta quando un consumer chiede stato corrente o avvia un'operazione autorizzata e necessita risposta immediata. Un event stream pubblica fatti immutabili come OrderStarted o AlarmAcknowledged affinché più consumer reagiscano indipendentemente. Un evento non è un comando. OrderCompleted afferma un fatto avvenuto; CompleteOrder richiede un'azione e può essere rifiutato. Confondere i due rende ownership opaca. Gli eventi hanno schema versionato, key, timestamp, producer, correlation, sequence e classificazione. Il producer garantisce significato, non l'uso di ogni consumer. Schema registry e compatibilità impediscono che un nuovo campo rompa analytics. Delivery at least once richiede consumer idempotenti; exactly once end-to-end è spesso una promessa impropria quando sistemi esterni hanno side effect. Lag e dead-letter sono operativi: un evento qualità arrivato due ore tardi può rendere una dashboard corretta ma una decisione intempestiva. La data platform organizza raw, curated e serving layers con lineage e policy. Raw preserva ciò che è arrivato e status; curated applica unità, identità, qualità e contesto; serving prepara feature, KPI o API per un uso. Le feature devono evitare leakage temporale: per prevedere un guasto alle 10:00 non si può usare una causa inserita alle 11:00. Si documentano event time e processing time e si riproduce la vista disponibile al momento della decisione. In regulated manufacturing, accesso e retention seguono classificazione e scopo. Non ogni sviluppatore AI necessita dati di produzione dettagliati; ambienti, dataset e export applicano least privilege e audit.`,
      `APIs and event streaming serve different interactions. A request-response API fits when a consumer asks for current state or starts an authorized operation and needs an immediate response. An event stream publishes immutable facts such as OrderStarted or AlarmAcknowledged so multiple consumers can react independently. An event is not a command. OrderCompleted states a fact that happened; CompleteOrder requests an action and may be rejected. Confusing them obscures ownership. Events need a versioned schema, key, timestamp, producer, correlation, sequence, and classification. The producer guarantees meaning, not every consumer's use. A schema registry and compatibility rules prevent a new field from breaking analytics. At-least-once delivery requires idempotent consumers; end-to-end exactly-once is often an inappropriate promise when external systems create side effects. Lag and dead letters are operational concerns. A quality event arriving two hours late may produce an accurate dashboard but an untimely decision. A data platform organizes raw, curated, and serving layers with lineage and policy. Raw preserves what arrived and its status; curated applies units, identity, quality, and context; serving prepares features, KPIs, or APIs for a specific use. Features must prevent temporal leakage. A failure prediction made at 10:00 cannot use a cause code entered at 11:00. Event time and processing time are documented, and training reproduces the view available at decision time. In regulated manufacturing, access and retention follow classification and purpose. Not every AI developer needs detailed production records. Environments, datasets, and exports apply least privilege and audit.`
    ),
    t(
      `AI serving è un prodotto operativo, non un endpoint isolato. Comprende model registry, versione, firma o integrità artefatto, feature definition, runtime compatibile, release progressiva, observability, drift, performance con feedback ritardato, rollback e ownership. Una richiesta registra model version, input version, timestamp, esito, confidenza e decisione successiva senza acquisire dati personali o sensibili non necessari. I controlli pre-inference verificano schema, range, freshness, status e modalità. I controlli post-inference applicano soglie, business rule, rate limit, uncertainty e autorizzazione. Se un sensore è Bad, il servizio non deve trasformare un output numerico in raccomandazione certa. Se la confidenza è bassa o il pattern fuori operating envelope, il fallback è regola tradizionale o review umana. Il model output resta separato dal comando. Per un caso di manutenzione, un anomaly score apre una proposta, non un work order definitivo: l'applicazione aggiunge asset, evidenze e duplicati; un tecnico conferma; il CMMS autorizza la scrittura; outcome alimenta monitoring. Per una decisione Quality, AI può ordinare dossier o segnalare elementi, ma non rilascia prodotto. L'engineered boundary include deny-by-default verso control network, API con scope, service identity, approval, audit, circuit breaker e kill switch organizzativo testato. Monitorare precisione non basta: si misura alert-to-action, false positives per turno, missed critical events, tempo di review, override motivati e outcome. Un modello può restare statisticamente stabile mentre il workflow fallisce per overload. Il deployment multi-site separa reference architecture e local configuration. Hardware, schema, controlli e metriche sono standardizzati; mapping tag, lingua, ruoli e soglie sono validati localmente. Il gate richiede equivalenza dati, test offline, shadow mode, training utenti, supporto e rollback.`,
      `AI serving is an operating product, not an isolated endpoint. It includes a model registry, version, artifact integrity or signature, feature definition, compatible runtime, progressive release, observability, drift, performance with delayed feedback, rollback, and ownership. A request records model version, input version, timestamp, result, confidence, and subsequent decision without collecting unnecessary personal or sensitive data. Pre-inference controls check schema, range, freshness, status, and operating mode. Post-inference controls apply thresholds, business rules, rate limits, uncertainty, and authorization. If a sensor is Bad, the service must not turn a numeric output into a confident recommendation. If confidence is low or the pattern is outside the operating envelope, fallback is a conventional rule or human review. Model output remains separate from command. In maintenance, an anomaly score opens a proposal rather than a final work order: the application adds asset context, evidence, and duplicate checks; a technician confirms; CMMS authorizes the write; and outcome feeds monitoring. For a Quality decision, AI may organize a dossier or flag evidence but never release product. The engineered boundary includes deny-by-default toward the control network, scoped APIs, service identity, approval, audit, a circuit breaker, and a tested organizational kill switch. Accuracy alone is insufficient. Measure alert-to-action, false positives per shift, missed critical events, review time, reasoned overrides, and outcome. A model can remain statistically stable while workflow fails from overload. Multi-site deployment separates reference architecture from local configuration. Hardware, schema, controls, and metrics are standardized; tag mapping, language, roles, and thresholds are locally validated. Gates require data equivalence, offline testing, shadow mode, user training, support, and rollback.`
    )
  ],
  microExamples: [microExample(
    'Deadline edge, training cloud',
    'Edge deadline, cloud training',
    'Una deadline di 500 ms non è compatibile con WAN p99 di 800 ms: inferenza locale e training centrale separano i due requisiti.',
    'A 500 ms deadline is incompatible with WAN p99 of 800 ms: local inference and central training separate the requirements.'
  )],
  checkpoint: checkpoint(
    'Quale scelta esprime meglio un pattern ibrido controllato?',
    'Which choice best represents a controlled hybrid pattern?',
    [
      ['Il cloud scrive direttamente sui PLC di ogni sito.', 'Cloud writes directly to every site PLC.', 'Crea un percorso di comando ampio e dipendente dalla WAN.', 'This creates a broad command path dependent on WAN connectivity.'],
      ['Training e governance centrali, inferenza edge entro limiti, telemetria aggregata e modello last-known-good.', 'Central training and governance, bounded edge inference, aggregated telemetry, and a last-known-good model.', 'Separa scala, deadline e degraded mode con controlli espliciti.', 'This separates scale, deadline, and degraded mode with explicit controls.'],
      ['Ogni sito modifica liberamente modello e schema.', 'Every site freely changes model and schema.', 'Elimina comparabilità, controllo versione e supporto.', 'This removes comparability, version control, and support.']
    ],
    1
  ),
  sourceIds: ['nist-sp-800-82-r3', 'nist-ai-rmf-1-0', 'opc-ua-part-1']
}

const sensorToDecisionArtifact = {
  title: t('Architettura sensor-to-human-decision', 'Sensor-to-human-decision architecture'),
  description: t(
    'Contratto riutilizzabile che documenta owner del dato, latenza, protocollo, security boundary, fallback e azione umana per ogni hop dalla misura alla decisione e al feedback.',
    'Reusable contract documenting data owner, latency, protocol, security boundary, fallback, and human action for every hop from measurement to decision and feedback.'
  ),
  totalLatencyBudgetMs: 57000,
  edges: [
    {
      id: 'sensor-to-acquisition', order: 1,
      sourceId: 'sensor-vt-201', destinationId: 'acquisition-eam-201',
      source: t('Sensore di vibrazione VT-201', 'Vibration sensor VT-201'),
      destination: t('Modulo di acquisizione EAM-201', 'Acquisition module EAM-201'),
      interface: t('Interfaccia analogica IEPE a 24 bit', '24-bit IEPE analogue interface'),
      latencyBudgetMs: 10,
      cadence: t('Campionamento continuo a 10 kHz', 'Continuous sampling at 10 kHz'),
      securityBoundaryCrossing: t('Nessun crossing: entrambi gli asset sono nella machine control zone.', 'No crossing: both assets are in the machine control zone.'),
      dataOwner: t('Maintenance possiede significato metrologico e taratura; OT possiede acquisizione.', 'Maintenance owns metrological meaning and calibration; OT owns acquisition.'),
      fallback: t('Status Bad sopprime la feature; si usa misura portatile secondo procedura.', 'Bad status suppresses the feature; a portable measurement is used under procedure.'),
      humanAction: t('Il tecnico verifica montaggio, cavo e calibrazione dopo una diagnostica non valida.', 'The technician checks mounting, cable, and calibration after invalid diagnostics.')
    },
    {
      id: 'acquisition-to-edge-feature', order: 2,
      sourceId: 'acquisition-eam-201', destinationId: 'edge-featurecalc-201',
      source: t('Modulo di acquisizione EAM-201', 'Acquisition module EAM-201'),
      destination: t('Servizio edge FeatureCalc-201', 'Edge service FeatureCalc-201'),
      interface: t('Stream gRPC su loopback con protobuf versionato', 'Loopback gRPC stream with versioned protobuf'),
      latencyBudgetMs: 990,
      cadence: t('Una finestra feature ogni secondo', 'One feature window each second'),
      securityBoundaryCrossing: t('Nessun crossing: processo isolato sullo stesso industrial edge host.', 'No crossing: isolated process on the same industrial edge host.'),
      dataOwner: t('OT possiede runtime e mapping; Reliability Engineering possiede la definizione feature.', 'OT owns runtime and mapping; Reliability Engineering owns feature definitions.'),
      fallback: t('Se la finestra è incompleta, nessuna feature viene emessa e il raw resta nel buffer locale.', 'If the window is incomplete, no feature is emitted and raw data remains locally buffered.'),
      humanAction: t('Il reliability engineer approva ogni modifica della feature e ne verifica la riproducibilità.', 'The reliability engineer approves every feature change and verifies reproducibility.')
    },
    {
      id: 'edge-feature-to-opcua', order: 3,
      sourceId: 'edge-featurecalc-201', destinationId: 'supervisory-opc-201',
      source: t('Servizio edge FeatureCalc-201', 'Edge service FeatureCalc-201'),
      destination: t('Server OPC UA di supervisione OPC-201', 'Supervisory OPC UA server OPC-201'),
      interface: t('OPC UA Client/Server con SignAndEncrypt e certificati applicativi', 'OPC UA Client/Server with SignAndEncrypt and application certificates'),
      latencyBudgetMs: 1000,
      cadence: t('DataChange per feature e stato macchina ogni secondo', 'DataChange for feature and machine state each second'),
      securityBoundaryCrossing: t('Machine control zone verso supervisory zone tramite allowlist OT.', 'Machine control zone to supervisory zone through an OT allowlist.'),
      dataOwner: t('Operations possiede lo stato macchina; OT possiede namespace, endpoint e trust list.', 'Operations owns machine state; OT owns namespace, endpoint, and trust list.'),
      fallback: t('Il server mantiene last value con status Uncertain; controllo e interlock locali non cambiano.', 'The server retains the last value with Uncertain status; local control and interlocks do not change.'),
      humanAction: t('L’operatore usa soltanto allarmi locali razionalizzati e non attende l’analytics.', 'The operator relies only on rationalized local alarms and does not wait for analytics.')
    },
    {
      id: 'opcua-to-historian', order: 4,
      sourceId: 'supervisory-opc-201', destinationId: 'site-historian-hist-301',
      source: t('Server OPC UA OPC-201', 'OPC UA server OPC-201'),
      destination: t('Historian di sito HIST-301', 'Site historian HIST-301'),
      interface: t('OPC UA monitored items con queue e source timestamp preservati', 'OPC UA monitored items with queue and preserved source timestamps'),
      latencyBudgetMs: 2000,
      cadence: t('Publish interval di un secondo, coda di dieci campioni', 'One-second publishing interval with a ten-sample queue'),
      securityBoundaryCrossing: t('Supervisory zone verso site operations zone attraverso firewall interno.', 'Supervisory zone to site operations zone through the internal firewall.'),
      dataOwner: t('Process owner possiede semantica; OT opera historian; steward possiede regole qualità.', 'The process owner owns semantics; OT operates the historian; the steward owns quality rules.'),
      fallback: t('Store-and-forward conserva timestamp e status; i gap restano espliciti.', 'Store-and-forward preserves timestamps and status; gaps remain explicit.'),
      humanAction: t('Il data steward esamina gap e clock drift prima che il dataset sia approvato.', 'The data steward reviews gaps and clock drift before dataset approval.')
    },
    {
      id: 'historian-to-dmz', order: 5,
      sourceId: 'site-historian-hist-301', destinationId: 'dmz-historian-hist-401',
      source: t('Historian di sito HIST-301', 'Site historian HIST-301'),
      destination: t('Replica historian DMZ HIST-DMZ-401', 'DMZ historian replica HIST-DMZ-401'),
      interface: t('Replica HTTPS su TLS 1.3 con mutua autenticazione', 'HTTPS replication over mutually authenticated TLS 1.3'),
      latencyBudgetMs: 5000,
      cadence: t('Micro-batch ogni cinque secondi', 'Micro-batch every five seconds'),
      securityBoundaryCrossing: t('Site operations zone verso industrial DMZ attraverso il firewall OT.', 'Site operations zone to industrial DMZ through the OT firewall.'),
      dataOwner: t('OT possiede la replica; OT Security possiede la regola firewall; lo steward approva i tag.', 'OT owns replication; OT Security owns the firewall rule; the steward approves tags.'),
      fallback: t('Buffer locale di 24 ore; superata la soglia, si allerta OT senza fermare la linea.', 'A 24-hour local buffer; after the threshold OT is alerted without stopping the line.'),
      humanAction: t('OT controlla lag e capacità e autorizza il replay dopo il ripristino.', 'OT checks lag and capacity and authorizes replay after recovery.')
    },
    {
      id: 'dmz-to-event-broker', order: 6,
      sourceId: 'dmz-historian-hist-401', destinationId: 'enterprise-event-broker-evt-501',
      source: t('Replica DMZ HIST-DMZ-401', 'DMZ replica HIST-DMZ-401'),
      destination: t('Broker eventi enterprise EVT-501', 'Enterprise event broker EVT-501'),
      interface: t('MQTT 5 su mTLS con topic allowlist e schema versionato', 'MQTT 5 over mTLS with topic allowlist and versioned schema'),
      latencyBudgetMs: 5000,
      cadence: t('Publish event-driven, heartbeat ogni trenta secondi', 'Event-driven publishing with a thirty-second heartbeat'),
      securityBoundaryCrossing: t('Industrial DMZ verso enterprise integration zone attraverso il firewall enterprise.', 'Industrial DMZ to enterprise integration zone through the enterprise firewall.'),
      dataOwner: t('Domain owner approva payload; IT Platform opera il broker; Security governa identity.', 'The domain owner approves payloads; IT Platform operates the broker; Security governs identity.'),
      fallback: t('Persistent queue e circuit breaker; nessun messaggio di ritorno crea un comando OT.', 'Persistent queue and circuit breaker; no return message creates an OT command.'),
      humanAction: t('SOC e platform engineer triagiano autenticazione, lag e dead-letter queue.', 'SOC and the platform engineer triage authentication, lag, and the dead-letter queue.')
    },
    {
      id: 'event-broker-to-ai-serving', order: 7,
      sourceId: 'enterprise-event-broker-evt-501', destinationId: 'ai-service-aims-601',
      source: t('Broker eventi EVT-501', 'Event broker EVT-501'),
      destination: t('Feature view e servizio AI AIMS-601', 'Feature view and AI service AIMS-601'),
      interface: t('Apache Kafka consumer API con TLS, SASL e schema registry', 'Apache Kafka consumer API with TLS, SASL, and a schema registry'),
      latencyBudgetMs: 30000,
      cadence: t('Finestra streaming chiusa ogni trenta secondi', 'Streaming window closed every thirty seconds'),
      securityBoundaryCrossing: t('Enterprise integration zone verso AI serving zone con service account least-privilege.', 'Enterprise integration zone to AI serving zone with a least-privilege service account.'),
      dataOwner: t('Data owner possiede feature e scopo; model owner possiede inferenza e versione.', 'The data owner owns features and purpose; the model owner owns inference and version.'),
      fallback: t('Feature oltre TTL o con status non valido sopprime l’inferenza e apre manual review.', 'A feature beyond its TTL or with invalid status suppresses inference and opens manual review.'),
      humanAction: t('Model owner verifica drift, input rejection e modello last-known-good.', 'The model owner checks drift, input rejection, and the last-known-good model.')
    },
    {
      id: 'ai-serving-to-decision-workflow', order: 8,
      sourceId: 'ai-service-aims-601', destinationId: 'maintenance-workflow-mw-701',
      source: t('Servizio AI AIMS-601', 'AI service AIMS-601'),
      destination: t('Workflow manutentivo MW-701', 'Maintenance workflow MW-701'),
      interface: t('REST/JSON su HTTPS con OAuth 2.0 client credentials', 'REST/JSON over HTTPS with OAuth 2.0 client credentials'),
      latencyBudgetMs: 3000,
      cadence: t('Una proposta per finestra anomala, con rate limit', 'One proposal per anomalous window, with rate limiting'),
      securityBoundaryCrossing: t('AI serving zone verso business application zone, senza route verso PLC.', 'AI serving zone to business application zone, with no route to PLCs.'),
      dataOwner: t('AI product owner possiede advisory; Maintenance owner possiede la decisione.', 'The AI product owner owns the advisory; the Maintenance owner owns the decision.'),
      fallback: t('Timeout, bassa confidenza o circuit breaker lasciano il workflow in procedura manuale.', 'Timeout, low confidence, or circuit breaker leaves the workflow on its manual procedure.'),
      humanAction: t('Il planner manutentivo verifica duplicati e completezza prima della notifica.', 'The maintenance planner checks duplicates and completeness before notification.')
    },
    {
      id: 'decision-workflow-to-reliability-engineer', order: 9,
      sourceId: 'maintenance-workflow-mw-701', destinationId: 'reliability-engineer',
      source: t('Workflow manutentivo MW-701', 'Maintenance workflow MW-701'),
      destination: t('Reliability engineer autenticato', 'Authenticated reliability engineer'),
      interface: t('Web application HTTPS con OIDC, RBAC e audit trail', 'HTTPS web application with OIDC, RBAC, and an audit trail'),
      latencyBudgetMs: 10000,
      cadence: t('Notifica event-driven con escalation dopo quindici minuti', 'Event-driven notification with escalation after fifteen minutes'),
      securityBoundaryCrossing: t('Business application zone verso sessione utente gestita e autenticata.', 'Business application zone to a managed, authenticated user session.'),
      dataOwner: t('Maintenance owner possiede priorità e work order; Quality possiede ogni impatto prodotto.', 'Maintenance owns priority and work orders; Quality owns every product-impact decision.'),
      fallback: t('Ispezione e apertura manuale del work order; la coda viene riconciliata al recovery.', 'Manual inspection and work-order entry; the queue is reconciled after recovery.'),
      humanAction: t('L’ingegnere accetta, respinge o pospone con motivo; Quality decide hold o rilascio.', 'The engineer accepts, rejects, or defers with a reason; Quality decides hold or release.')
    }
  ]
}

const unitEight = {
  id: 'sensor-to-human-decision-case',
  eyebrow: t('08 · Caso end-to-end', '08 · End-to-end case'),
  title: t(
    'Caso svolto: architettura sensor-to-human-decision e failure mode',
    'Worked case: sensor-to-human-decision architecture and failure modes'
  ),
  objective: t(
    'Difendere un’architettura completa dalla misura alla decisione umana, quantificarne prestazioni e degradazione e impedire controllo AI diretto.',
    'Defend a complete measurement-to-human-decision architecture, quantify performance and degradation, and prevent direct AI control.'
  ),
  estimatedMinutes: 10,
  timeAllocation: { theory: 4, cases: 3, practice: 3 },
  theory: [
    t(
      `Il caso integra il modulo in uno scenario PMI-style realistico ma interamente ipotetico, derivato soltanto da informazioni pubbliche su una grande manifattura globale e regolamentata. Non descrive linee, prodotti, sistemi o procedure PMI reali. Una linea di confezionamento ad alta velocità registra dodici arresti non pianificati del gruppo motore in quattro settimane, per 480 minuti persi. La diagnosi mostra che in otto casi la vibrazione era aumentata nelle sei ore precedenti, ma il trend non veniva esaminato prima del fermo. Il costo non autorizza controllo autonomo. L'obiettivo è una decisione manutentiva più tempestiva: rilevare un pattern, presentare evidenze a un reliability engineer e creare un work order soltanto dopo conferma. Il controllo macchina, gli interlock e ogni safety function restano indipendenti nel PLC o sistema progettato. Quality conserva qualsiasi decisione su hold, indagine o rilascio del prodotto. La baseline usa 12 eventi, 480 minuti e tempo mediano di 95 minuti tra prima evidenza riconoscibile e review. Il target dell'MVP è portare la review sotto 15 minuti, raggiungere almeno 80 per cento di precisione sulle proposte confermate e ridurre del 15 per cento i minuti della causa in un periodo comparabile. I guardrail sono massimo due falsi alert per turno, nessun aumento di backlog oltre 5 per cento, nessuna scrittura verso PLC, nessun prodotto rilasciato dall'AI e disponibilità degli interlock invariata. Il value ceiling iniziale è prudente: una riduzione del 15 per cento su 480 minuti vale 72 minuti, non l'intero downtime di linea. Il team dichiara che manutenzioni parallele, mix e ore operative possono confondere attribuzione.`,
      `This case integrates the module through a realistic but entirely hypothetical PMI-style scenario derived only from public information about a large global regulated manufacturer. It does not describe actual PMI lines, products, systems, or procedures. A high-speed packaging line records twelve unplanned drive-group stops over four weeks, totaling 480 lost minutes. Review shows that vibration increased during the previous six hours in eight cases, but nobody examined the trend before the stop. The cost does not justify autonomous control. The objective is a more timely maintenance decision: detect a pattern, show evidence to a reliability engineer, and create a work order only after confirmation. Machine control, interlocks, and every safety function remain independent in the PLC or another engineered system. Quality retains any product hold, investigation, or release decision. The baseline contains 12 events, 480 minutes, and a median 95 minutes from first recognizable evidence to review. The MVP targets review within 15 minutes, at least 80 percent precision for confirmed proposals, and a 15 percent reduction in cause minutes over a comparable period. Guardrails are no more than two false alerts per shift, no backlog increase above 5 percent, no PLC write path, no AI product release, and unchanged interlock availability. The initial value ceiling is cautious: a 15 percent reduction of 480 minutes equals 72 minutes, not all line downtime. Parallel maintenance, product mix, and operating hours may confound attribution.`
    ),
    t(
      `Il percorso è documentato come nove edge reali, ciascuno con sorgente e destinazione. Il sensore alimenta l'acquisizione, il servizio edge calcola feature senza modificare il controllo, OPC UA pubblica source timestamp e status, historian conserva il trend, la DMZ trasferisce soltanto eventi approvati, il broker alimenta AI serving e il workflow presenta evidenze al reliability engineer. A ogni edge sono espliciti data owner, interface, cadence, latency budget, security crossing, fallback e human action. Il budget conservativo è uno solo e si ricava dai campi numerici: 10 ms + 990 ms + 1 s + 2 s + 5 s + 5 s + 30 s + 3 s + 10 s = 57 secondi prima della review umana. Il target entro 15 minuti lascia 843 secondi, cioè 14,05 minuti, alla review e all'escalation. La misura operativa confronta poi il percentile end-to-end con il budget, senza sommare percentile incompatibili. Non si usa questa catena per arrestare il motore: anche 57 secondi sarebbero incompatibili con un evento pericoloso e ogni componente può fallire. Il TTL della feature è coerente con il budget e non introduce un secondo obiettivo contraddittorio. Per capacità, 24 ore di buffer sono calcolate e monitorate. Per security, l'identità AI non ha route o credenziali verso PLC. Per governance, model version e input version accompagnano ogni proposta. L'engineered control più importante è strutturale: il modello produce un advisory object, non un comando. L'applicazione accetta solo azioni definite, richiede RBAC e conferma, applica rate limit e conserva audit.`,
      `The path is documented as nine real edges, each with a source and destination. The sensor feeds acquisition, the edge service calculates features without changing control, OPC UA publishes source timestamps and status, the historian retains the trend, the DMZ transfers approved events only, the broker feeds AI serving, and the workflow presents evidence to the reliability engineer. Every edge explicitly states data owner, interface, cadence, latency budget, security crossing, fallback, and human action. There is one conservative budget derived from numeric fields: 10 ms + 990 ms + 1 s + 2 s + 5 s + 5 s + 30 s + 3 s + 10 s = 57 seconds before human review. A fifteen-minute target leaves 843 seconds, or 14.05 minutes, for review and escalation. Operations then measures the end-to-end percentile against this budget rather than adding incompatible percentiles. This chain is never used to trip the motor: even 57 seconds would be incompatible with a hazardous event, and every component may fail. Feature TTL is aligned with the budget and does not introduce a second contradictory target. Capacity provides 24 hours of monitored buffering. The AI identity has no route or credential to PLCs. Model and input versions accompany every proposal. The most important engineered control is structural: the model produces an advisory object, not a command. The application accepts defined actions only, requires RBAC and confirmation, applies rate limits, and retains an audit trail.`
    ),
    t(
      `Il pre-mortem identifica failure mode prima del pilot. Uno: sensore allentato genera vibrazione alta; detection usa diagnostica e confronto con mode, fallback è ispezione e l'alert viene marcato non valido. Due: clock drift allinea il pattern all'ordine sbagliato; monitor di sincronizzazione blocca la feature e il data steward corregge senza riscrivere raw. Tre: certificato OPC UA scade; allarme di scadenza anticipato e runbook consentono rinnovo, mentre buffer locale preserva dati. Quattro: WAN cade otto ore; controllo continua, DMZ bufferizza e nessun alert remoto viene promesso, l'operatore segue manutenzione standard. Cinque: modello distribuito ha checksum errato; runtime rifiuta l'artefatto e usa last-known-good. Sei: input drift produce troppe proposte; circuit breaker scatta oltre due falsi per turno e riporta il servizio in shadow mode. Sette: technician confirmation diventa rubber stamp; audit su tempo, override e motivi attiva coaching o sospensione. Otto: API CMMS risponde timeout dopo aver creato l'ordine; idempotency key impedisce il duplicato. Nove: una raccomandazione coincide con materiale potenzialmente coinvolto; Quality viene ingaggiata, ma il workflow manutentivo non modifica status prodotto. Dieci: la piattaforma enterprise è compromessa; firewall e assenza di route impediscono movimento verso control zone, credenziali vengono revocate e controllo locale resta disponibile. Il tabletop assegna detection owner, response, recovery time e prova. Non basta scrivere fallback manuale: si verifica che persone, dati e istruzioni esistano durante un turno reale. Dopo sei settimane ipotizziamo 30 proposte, 24 confermate e 6 false: precisione 24/30, cioè 80 per cento. Due dei dodici eventi baseline sono evitati e i minuti comparabili scendono da 480 a 402: riduzione 78/480, cioè 16,25 per cento. Se backlog cresce da 200 a 208 ordini, l'aumento è 4 per cento e resta sotto guardrail. I target sono raggiunti, ma la scala richiede verifica di attribuzione, recall sui missed events, stabilità su altri mix e supporto locale.`,
      `The pre-mortem identifies failure modes before the pilot. First, a loose sensor creates high vibration; diagnostics and operating-mode comparison detect it, inspection is the fallback, and the alert is marked invalid. Second, clock drift associates the pattern with the wrong order; synchronization monitoring blocks the feature and a steward corrects context without rewriting raw data. Third, an OPC UA certificate expires; advance expiry alerts and a runbook support renewal while local buffering protects data. Fourth, WAN connectivity fails for eight hours; control continues, the DMZ buffers, no remote alert is promised, and the operator follows standard maintenance. Fifth, a distributed model has the wrong checksum; runtime rejects it and uses the last-known-good version. Sixth, input drift creates too many proposals; a circuit breaker triggers above two false alerts per shift and returns the service to shadow mode. Seventh, technician confirmation becomes a rubber stamp; audit of time, overrides, and reasons triggers coaching or suspension. Eighth, the CMMS API times out after creating the order; an idempotency key prevents duplication. Ninth, a recommendation coincides with potentially affected material; Quality is engaged, but the maintenance workflow cannot change product status. Tenth, the enterprise platform is compromised; firewalls and absence of routes prevent movement into the control zone, credentials are revoked, and local control remains available. The tabletop assigns detection owner, response, recovery time, and test. Manual fallback must be exercised with real people, data, and instructions. After six weeks, assume 30 proposals, 24 confirmed and 6 false: precision is 24/30, or 80 percent. Two of twelve baseline events are avoided and comparable minutes fall from 480 to 402: 78/480, or 16.25 percent. If backlog rises from 200 to 208 orders, the increase is 4 percent and remains within the guardrail. Targets are met, but scale still requires attribution checks, recall for missed events, stability across product mix, and local support.`
    ),
    t(
      `La decisione finale separa successo tecnico, adozione e outcome. La pipeline ha rispettato il budget e i percentile definiti, nessuna proposta stale è stata mostrata e nessun accesso OT non autorizzato è esistito. Gli utenti hanno esaminato 30 proposte entro mediana 11 minuti, ma tre conferme non contenevano un motivo utile: il workflow va migliorato. L'outcome osservato supera 15 per cento e il backlog resta entro 5 per cento; non si sono osservati effetti su scrap o deviazioni, ma il campione è piccolo. Il gate corretto estende per altre sei settimane sulla stessa famiglia e su una seconda configurazione della linea, mantiene advisory mode e aggiunge una stima di recall verificando ogni fermo, non soltanto gli alert. Un modello che segnala 24 casi corretti ma perde eventi critici può avere precisione accettabile e utilità insufficiente. Si calcolano precision = true positives/(true positives + false positives) e recall = true positives/(true positives + false negatives), con definizione operativa della finestra. La scala cross-plant avviene soltanto dopo data contract, equivalenza sensori, mapping asset, test security, ownership, formazione e rollback. Il reference pattern standardizza assenza di write path, artifact fields, model registry, audit e metriche. La configurazione locale governa bande, soglie, ruoli e integrazioni approvate. Questa scelta preserva semplicità: non introduce un agent capace di chiamare liberamente sistemi, non sostituisce SCADA, MES o CMMS e non replica ogni tag nel cloud. Il valore viene da una decisione più rapida e informata dentro controlli esistenti. In colloquio, la conclusione naturale è: colloco ogni funzione dove i suoi requisiti possono essere garantiti; tengo protezione e controllo deterministico in OT, uso edge per deadline e resilienza, cloud per scala e learning, e mantengo persone autorizzate responsabili di manutenzione e prodotto.`,
      `The final decision separates technical success, adoption, and outcome. The pipeline met its defined budget and percentiles, no stale proposal was displayed, and no unauthorized OT access path existed. Users reviewed 30 proposals with an 11-minute median, but three confirmations lacked a useful reason, so the workflow needs improvement. Observed outcome exceeds 15 percent and backlog stays within 5 percent; no scrap or deviation effect is observed, but the sample is small. The correct gate extends six weeks on the same failure family and a second line configuration, retains advisory mode, and estimates recall by reviewing every stop rather than alerts alone. A model producing 24 correct signals while missing critical events may have acceptable precision and insufficient utility. Calculate precision as true positives divided by true positives plus false positives and recall as true positives divided by true positives plus false negatives, using an operationally defined window. Cross-plant scale occurs only after data contracts, sensor equivalence, asset mapping, security tests, ownership, training, and rollback. The reference pattern standardizes the absence of a write path, artifact fields, model registry, audit, and metrics. Local configuration governs bands, thresholds, roles, and approved integrations. This remains deliberately simple. It does not introduce an agent free to call systems, replace SCADA, MES, or CMMS, or replicate every tag to cloud. Value comes from a faster, better-informed decision within existing controls. A natural interview conclusion is: place each function where its requirements can be guaranteed; keep protection and deterministic control in OT, use edge for deadlines and resilience, cloud for scale and learning, and authorized people accountable for maintenance and product decisions.`
    ),
    t(
      `La revisione architetturale usa tre letture complementari dell'artefatto. La prima segue il dato in avanti e verifica che ogni trasformazione aggiunga significato senza cancellare origine, timestamp o quality status. Parte dalla grandezza fisica, controlla scala e banda, attraversa subscription, historian, DMZ e data platform, poi confronta la feature effettivamente servita con quella usata in training. A ogni passaggio chiede chi può modificare configurazione e come viene provato un cambio. La seconda lettura parte dalla decisione umana e torna indietro: quali evidenze vede l'ingegnere, quanto sono fresche, quale versione di modello le ha prodotte, quali record autorevoli confermano ordine e asset, quale misura le sostiene? Se la catena non consente di rispondere, la raccomandazione non è auditabile. La terza lettura applica una minaccia o un guasto a ogni hop e verifica che il blast radius sia limitato. Un sensore errato deve degradare una feature, non disabilitare un interlock. Un broker pieno deve ritardare analytics, non arrestare la linea. Un account enterprise compromesso non deve autenticarsi nella control zone. Un modello corrotto deve essere rifiutato prima dell'esecuzione. Un tecnico assente deve attivare escalation o procedura manuale, non approvazione automatica. Questa lettura rende concreto il principio NIST di defense in depth e usa zone e conduit come strumenti di ragionamento, non decorazione. Il team registra i requisiti come test: perdita WAN per otto ore, restore da backup, rotazione certificati, feature stale, messaggio duplicato, ordine cancellato, clock offset, due falsi alert nello stesso turno e tentativo di chiamata non autorizzata. Ogni test ha expected result, owner ed evidenza. La readiness review include Operations, manutenzione, OT, IT, cybersecurity, data owner, model owner e Quality quando il contesto può influenzare prodotto o record. Nessun partecipante approva per procura un dominio che non possiede. Le decisioni aperte diventano risk acceptance con scadenza o bloccano il gate. Infine si verifica il carico umano: numero di proposte, tempo disponibile, informazioni mostrate, accessibilità del fallback e autorità di override. Se la persona deve confermare in pochi secondi un output opaco, la supervisione è nominale. Se riceve trend, contesto, incertezza e azioni limitate, può esercitare giudizio significativo. L'artefatto è quindi un contratto operativo: collega tecnologia, responsabilità e prova, permette una conversazione comune tra specialisti e rende visibile perché una raccomandazione utile non è un comando safety-critical. La review si chiude con una matrice requirement-to-evidence che lega ogni affermazione a un test, un log, una configurazione o una prova operativa. Una freccia è accettata soltanto se il team sa dimostrare direzione, identità, cifratura, limite di traffico e comportamento su perdita. Un fallback è accettato soltanto se è stato esercitato entro il recovery objective. Un owner è reale soltanto se dispone di autorità, competenza e reperibilità. Questi criteri trasformano il diagramma da presentazione statica a base verificabile per commissioning, change control, incident response e scale gate.`,
      `The architecture review applies three complementary readings to the artifact. The first follows data forward and checks that each transformation adds meaning without deleting origin, timestamp, or quality status. It starts with the physical quantity, verifies scale and bandwidth, crosses the subscription, historian, DMZ, and data platform, and compares the served feature with the training feature. At every step it asks who can change configuration and how a change is tested. The second reading starts with the human decision and moves backward: what evidence does the engineer see, how fresh is it, which model version produced it, which authoritative records confirm the order and asset, and which measurement supports it? If the chain cannot answer, the recommendation is not auditable. The third reading injects a threat or failure at every hop and checks that blast radius is limited. A bad sensor should degrade one feature, not disable an interlock. A full broker should delay analytics, not stop the line. A compromised enterprise account must not authenticate into the control zone. A corrupt model must be rejected before execution. An absent technician must trigger escalation or a manual procedure, not automatic approval. This makes defense in depth concrete and uses zones and conduits as reasoning tools rather than decoration. The team records requirements as tests: eight-hour WAN loss, backup restoration, certificate rotation, a stale feature, duplicate message, cancelled order, clock offset, two false alerts in one shift, and an unauthorized call. Each test has an expected result, owner, and evidence. The readiness review includes Operations, maintenance, OT, IT, cybersecurity, the data owner, model owner, and Quality where product or records may be affected. Open decisions become time-limited risk acceptance or block the gate. Finally, the team tests human workload, displayed evidence, fallback access, and override authority. If a person must confirm an opaque output in seconds, oversight is nominal. With trends, context, uncertainty, and bounded actions, meaningful judgment becomes possible. The artifact is an operating contract linking technology, responsibility, and proof, and it shows why a useful recommendation is not a safety-critical command.`
    )
  ],
  microExamples: [microExample(
    'MVP sopra target con guardrail',
    'MVP above target with guardrails',
    'Da 480 a 402 minuti è una riduzione del 16,25 per cento; backlog da 200 a 208 cresce del 4 per cento. Entrambi vanno interpretati con attribuzione e campione.',
    'Moving from 480 to 402 minutes is a 16.25 percent reduction; backlog from 200 to 208 rises 4 percent. Both require attribution and sample context.'
  )],
  workedCases: [{
    title: t('Vibrazione fino a decisione manutentiva umana', 'Vibration to a human maintenance decision'),
    scenario: t(
      'Caso PMI-style ipotetico da fonti pubbliche: dodici arresti e 480 minuti persi; otto eventi mostrano un pattern di vibrazione anticipato.',
      'Hypothetical PMI-style case based on public sources: twelve stops and 480 lost minutes; eight events show an earlier vibration pattern.'
    ),
    assumptions: t(
      'Il sensore è adatto, il controllo locale è indipendente, gli owner approvano i dati e nessuna informazione riservata PMI viene presunta.',
      'The sensor is suitable, local control is independent, owners approve data, and no confidential PMI information is assumed.'
    ),
    reasoning: t(
      'Nove hop separano misura, contesto, transfer, feature, inference, workflow, decisione e feedback con owner, latency, boundary e fallback espliciti.',
      'Nine hops separate measurement, context, transfer, features, inference, workflow, decision, and feedback with explicit owners, latency, boundaries, and fallback.'
    ),
    decision: t(
      'Continuare advisory mode perché review, precisione e riduzione raggiungono soglia e guardrail; estendere in modo limitato per stimare recall e attribuzione.',
      'Continue advisory mode because review, precision, and reduction meet thresholds and guardrails; extend narrowly to estimate recall and attribution.'
    ),
    tradeOff: t(
      'La conferma umana aggiunge minuti ma conserva contesto e accountability; la separazione dal controllo limita automazione ma protegge safety e availability.',
      'Human confirmation adds minutes but retains context and accountability; separation from control limits automation while protecting safety and availability.'
    ),
    outcome: t(
      'Nel risultato didattico, precisione dell’80 per cento, riduzione del 16,25 per cento e crescita backlog del 4 per cento sostengono il gate limitato, non rollout globale.',
      'In the teaching result, 80 percent precision, 16.25 percent reduction, and 4 percent backlog growth support a limited gate, not global rollout.'
    ),
    pmiCase: true,
    hypothetical: true,
    publicContext: true
  }],
  activities: [{
    prompt: t(
      'Completa e difendi l’artefatto sensor-to-human-decision. Per ogni hop verifica owner, latency, protocol, security boundary, fallback e human action. Calcola latenza pipeline, precision, riduzione downtime e crescita backlog. Concludi con un gate di scala.',
      'Complete and defend the sensor-to-human-decision artifact. For every hop verify owner, latency, protocol, security boundary, fallback, and human action. Calculate pipeline latency, precision, downtime reduction, and backlog growth. Conclude with a scale gate.'
    ),
    modelSolution: t(
      'L’artefatto usa nove edge e nessuno offre write path verso PLC. La pipeline automatica vale 10+990+1.000+2.000+5.000+5.000+30.000+3.000+10.000 = 57.000 ms, cioè 57 secondi, e lascia 14,05 minuti per una review entro 15. Precision è 24/30 = 80 per cento. Riduzione è (480-402)/480 = 16,25 per cento. Backlog è (208-200)/200 = 4 per cento. Si continua in advisory mode per sei settimane su una seconda configurazione, misurando recall, attribuzione, conferme e guardrail; nessuna scala globale né autonomia safety.',
      'The artifact uses nine edges and none provides a PLC write path. The automated path is 10+990+1,000+2,000+5,000+5,000+30,000+3,000+10,000 = 57,000 ms, or 57 seconds, leaving 14.05 minutes for review within 15. Precision is 24/30 = 80 percent. Reduction is (480-402)/480 = 16.25 percent. Backlog change is (208-200)/200 = 4 percent. Continue in advisory mode for six weeks on a second configuration while measuring recall, attribution, confirmations, and guardrails; there is no global rollout or safety autonomy.'
    ),
    rubric: [
      t('3 punti: tutti i campi sono espliciti a ogni hop; 2: un campo manca in un hop; 1: più gap; 0: solo diagramma generico.', '3 points: every field is explicit at every hop; 2: one field missing in one hop; 1: multiple gaps; 0: generic diagram only.'),
      t('3 punti: quattro calcoli corretti e interpretati; 2: tre corretti; 1: risultati senza formule; 0: nessun calcolo.', '3 points: four calculations are correct and interpreted; 2: three correct; 1: results without formulas; 0: no calculation.'),
      t('3 punti: gate limitato con recall, attribuzione e guardrail; 2: gate con controlli parziali; 1: decisione vaga; 0: rollout automatico.', '3 points: limited gate with recall, attribution, and guardrails; 2: gate with partial controls; 1: vague decision; 0: automatic rollout.')
    ]
  }],
  professionalArtifacts: [sensorToDecisionArtifact],
  checkpoint: checkpoint(
    'Quale conclusione è giustificata dai risultati del caso?',
    'Which conclusion is justified by the case results?',
    [
      ['Distribuire subito controllo AI autonomo a ogni plant.', 'Immediately deploy autonomous AI control to every plant.', 'Il campione e il ruolo advisory non provano autonomia o generalizzazione.', 'The sample and advisory role do not prove autonomy or generalization.'],
      ['Estendere in advisory mode, verificando recall, attribuzione, equivalenza locale e guardrail.', 'Extend in advisory mode while checking recall, attribution, local equivalence, and guardrails.', 'La conclusione usa risultati, limiti e gate controllato.', 'This conclusion uses results, limitations, and a controlled gate.'],
      ['Considerare precisione dell’80 per cento come prova che nessun evento viene perso.', 'Treat 80 percent precision as proof that no event is missed.', 'Precision non misura i false negatives; serve recall.', 'Precision does not measure false negatives; recall is required.']
    ],
    1
  ),
  sourceIds: ['isa-95', 'opc-ua-part-1', 'nist-sp-800-82-r3', 'nist-ai-rmf-1-0', 'pmi-operations', 'pmi-product-reliability']
}

export const architectureLesson = {
  id: 'ot-it-ai-cloud',
  slug: 'ot-it-ai-cloud',
  order: 2,
  title: t('Architettura OT / IT / AI / Cloud', 'OT / IT / AI / Cloud Architecture'),
  description: t(
    'Un percorso dal fenomeno fisico alla decisione umana, con integrazione, qualità temporale, cybersecurity, resilienza e confini AI verificabili.',
    'A journey from physical phenomenon to human decision with verifiable integration, time-series quality, cybersecurity, resilience, and AI boundaries.'
  ),
  durationMinutes: 75,
  timeBudget: { theory: 38, cases: 22, practice: 15 },
  units: [unitOne, unitTwo, unitThree, unitFour, unitFive, unitSix, unitSeven, unitEight],
  sensorToDecisionArtifact,
  professionalArtifacts: [sensorToDecisionArtifact],
  interviewAnswers: [
    {
      prompt: t('In che cosa differiscono OT e IT?', 'How do OT and IT differ?'),
      short: t(
        `L'OT opera processi fisici, quindi tempi, disponibilità, safety, ciclo di vita degli asset e cambi controllati sono centrali. L'IT gestisce informazioni e servizi enterprise, spesso con maggiore elasticità e release più rapide. Non li tratto come mondi contrapposti: creo ownership congiunta, ma colloco ogni funzione secondo conseguenza fisica, latenza, recovery e rischio, mantenendo la protezione deterministica indipendente dagli analytics enterprise.`,
        `OT operates physical processes, so timing, availability, safety, equipment lifecycle, and controlled change are central. IT manages enterprise information and services, often with greater elasticity and faster release cycles. I do not treat them as opposing worlds. I create joint ownership, but I place functions according to physical consequence, latency, recovery, and risk, keeping deterministic protection independent from enterprise analytics.`
      ),
      long: t(
        `OT e IT condividono buoni principi di engineering, ma operano in contesti diversi. L'OT monitora e controlla processi fisici: un comando errato o un fermo mal testato può influire su persone, equipment, ambiente, prodotto e continuità. Ne derivano requisiti rigorosi di timing, availability, compatibilità, change window, recovery e safety. Gli asset possono restare in servizio molto più a lungo di una tipica applicazione enterprise. L'IT gestisce informazioni, transazioni, collaborazione e servizi scalabili, spesso con cicli di release più rapidi e infrastruttura elastica. La differenza non significa che OT ignori confidentiality o IT ignori availability; sono conseguenze e lifecycle a cambiare priorità e implementazione dei controlli. Parto dalla decisione e dal livello di servizio. Un interlock di lubrificazione appartiene al controllo locale validato e deve sopravvivere alla perdita di WAN, historian e cloud. Un benchmark cross-plant può usare una data platform enterprise perché la latenza di minuti è accettabile e l'aggregazione crea valore. Il confine specifica owner, protocollo, identità, latenza, zona, fallback e azione umana. NIST SP 800-82 aiuta a leggere cybersecurity, performance, reliability e safety insieme. Il mio operating model unisce competenza OT su processo e asset con capacità IT su piattaforme, identity, dati e servizi. Ogni cambio viene valutato, testato, approvato, monitorato e reso reversibile. L'obiettivo è rendere esplicite le dipendenze e impedire che un failure enterprise elimini il controllo locale essenziale.`,
        `OT and IT share sound engineering principles, but their operating contexts differ. OT monitors and controls physical processes. A wrong command or poorly tested outage can affect people, equipment, environment, product, and production continuity. That creates strict timing, availability, compatibility, change-window, recovery, and safety requirements. Equipment may remain in service far longer than a typical enterprise application. IT manages information, transactions, collaboration, and scalable services across the enterprise, often using faster release cycles and elastic infrastructure. The difference is not that OT ignores confidentiality or IT ignores availability. It is that consequence and lifecycle change the priority and implementation of controls. I start with the decision and required service level. A lubrication interlock belongs in validated local control and must survive loss of WAN, historian, and cloud. A cross-plant reliability benchmark can use an enterprise data platform because minute-level latency is acceptable and aggregation creates value. The integration boundary then specifies data owner, protocol, identity, latency, security zone, fallback, and human action. NIST SP 800-82 is useful because it treats OT security in the context of performance, reliability, and safety. My operating model pairs OT process and asset knowledge with IT platform, identity, data, and service capabilities. Changes are risk assessed, tested, approved, monitored, and reversible. The goal is not to force one culture onto the other. It is to make dependencies explicit while ensuring a failure in enterprise analytics cannot remove essential local control.`
      ),
      followUps: [
        t('Come governeresti un cambiamento che attraversa entrambi i domini?', 'How would you govern a change that crosses both domains?'),
        t('Quale funzione non sposteresti mai nel cloud?', 'Which function would you never move to cloud?')
      ]
    },
    {
      prompt: t('In che cosa differiscono MES e SCADA?', 'How do MES and SCADA differ?'),
      short: t(
        `SCADA supervisiona lo stato corrente del processo tramite acquisizione, display, allarmi, eventi e comandi autorizzati. MES governa il contesto di esecuzione: quale ordine è attivo, quali risorse e materiali vengono usati, quale workflow si applica e quali risultato e genealogia vengono registrati. I prodotti possono sovrapporsi, quindi definisco il confine tramite decisioni e dati autorevoli, non tramite etichette o livelli rigidi.`,
        `SCADA supervises current process state through data acquisition, displays, alarms, events, and authorized commands. MES manages manufacturing execution context: which order is running, which resources and materials are used, what workflow applies, and what result and genealogy are recorded. Products can overlap, so I define the boundary by authoritative decisions and data, not by labels or a rigid layer diagram.`
      ),
      long: t(
        `Spiego MES e SCADA attraverso le responsabilità. SCADA è centrato su acquisizione e supervisione: mostra cosa fa il processo, gestisce eventi e allarmi operativi e può offrire comandi supervisori autorizzati. Rimane vicino allo stato corrente dell'impianto. MES, o una parte sostanziale del manufacturing operations management, è centrato sull'esecuzione. Dispatcha lavoro autorizzato, verifica readiness, collega ordini a persone, equipment e materiali, guida workflow, raccoglie dichiarazioni ed eccezioni e costruisce performance e genealogia. ISA-95 fornisce un linguaggio comune per planning, operations e control, ma è un modello funzionale, non una topologia server obbligatoria. Una suite reale può contenere capacità di entrambi. Assegno quindi un system of record per oggetto e transizione. SCADA può essere autorevole per allarme e stato macchina, MES per stato dettagliato dell'ordine, consumo e genealogia, ERP per l'ordine enterprise rilasciato. Le interfacce portano identità stabili, source timestamp, quality, versione e idempotency key. Se MES non è disponibile, controllo locale e SCADA continuano in sicurezza, mentre una procedura degradata autorizzata stabilisce quali ordini già rilasciati possano continuare e come riconciliare. MES non sostituisce gli interlock PLC e SCADA non crea silenziosamente una seconda storia dell'ordine. Questa distinzione basata sulle decisioni resta valida anche quando i prodotti si sovrappongono e rende chiari ownership, failure handling e tracciabilità regolamentata.`,
        `I explain MES and SCADA through responsibilities. SCADA is centered on acquisition and supervisory operation. It shows what the process is doing, handles operational events and alarms, and may provide authorized supervisory commands. It remains close to current plant state. MES, or a substantial part of manufacturing operations management, is centered on execution. It dispatches authorized work, verifies readiness, links orders with people, equipment and materials, guides workflow, captures declarations and exceptions, and builds production performance and genealogy. ISA-95 gives a useful common language for business planning, manufacturing operations, and control, but it is a functional model rather than a mandatory server topology. A real vendor suite may contain capabilities from both areas. I therefore assign a system of record for each object and transition. For example, SCADA may be authoritative for an alarm event and machine state, while MES is authoritative for detailed execution state, material consumption, and genealogy. ERP remains authoritative for the released enterprise order under the chosen design. Interfaces carry stable identities, source timestamps, quality, version, and idempotency keys. If MES is unavailable, local control and SCADA continue safely, while an approved degraded execution procedure determines which already released work may continue and how records are reconciled. MES never replaces PLC interlocks, and SCADA should not silently create a second order history. This decision-based explanation survives product overlap and makes ownership, failure handling, and regulated traceability clear.`
      ),
      followUps: [
        t('Quale sistema possiede la genealogia?', 'Which system owns genealogy?'),
        t('Che cosa continua se MES non è disponibile?', 'What continues if MES is unavailable?')
      ]
    },
    {
      prompt: t('Quando sceglieresti edge invece di cloud?', 'When would you choose edge rather than cloud?'),
      short: t(
        `Scelgo edge quando la decisione ha una deadline locale, deve continuare durante la perdita WAN, usa dati ad alto volume da ridurre vicino alla sorgente o ha vincoli rigorosi di esposizione. Scelgo cloud per training elastico, aggregazione cross-site e coordinamento enterprise. Molte soluzioni industriali sono ibride: modelli governati vengono addestrati centralmente, release firmate operano localmente entro limiti e risale soltanto telemetria approvata.`,
        `I choose edge when the decision has a local deadline, must continue through WAN loss, uses high-volume data that should be reduced near the source, or has strict exposure constraints. I choose cloud for elastic training, cross-site aggregation, and enterprise coordination. Most industrial solutions are hybrid: governed models are trained centrally, signed releases run locally within limits, and only approved telemetry returns.`
      ),
      long: t(
        `Rendo edge rispetto a cloud una decisione sui requisiti. Edge è favorito quando latenza e jitter devono essere limitati localmente, il sito deve operare durante la disconnessione, il volume raw è troppo alto da trasferire o i dati operativi devono essere minimizzati prima dell'uscita. Consente anche di usare contesto macchina locale. Il trade-off è una flotta distribuita da patchare, osservare e supportare, con certificati, versioni e spare capacity in ogni sito. Cloud è favorito per compute elastico, data service gestiti, confronto cross-plant, training centrale e informazioni enterprise. I trade-off sono WAN, cost governance, identity, classificazione e giurisdizione. Quantifico la scelta. Se l'advisory deve arrivare entro 500 ms e la WAN p99 richiede già 800 ms, il cloud non soddisfa la deadline. Posso eseguire inferenza firmata all'edge e mantenere training e approvazione centrali. Se una previsione settimanale richiede venti plant, l'aggregazione centrale vale di più e la deadline consente cloud. Il design ibrido definisce last-known-good, periodo di validità, freshness, buffer, store-and-forward e comportamento dopo disconnessione prolungata. Bassa confidenza, input stale o drift riportano il servizio a regola deterministica, review umana o shadow mode. La collocazione edge non rende l'AI un safety controller: protezioni e interlock restano deterministici. Standardizzo il reference pattern, ma valido mapping sensori, ruoli, soglie, sicurezza e rollback in ogni deployment.`,
        `I make edge-versus-cloud a requirements decision. Edge is favored when latency and jitter must be bounded locally, the site needs autonomous operation during disconnection, raw data volume is too high to move economically, or sensitive operational data should be minimized before transfer. It also lets a service use local machine context. The trade-off is a distributed fleet that needs patching, certificate rotation, version control, observability, spare capacity, and a support model at every site. Cloud is favored when the problem benefits from elastic compute, managed data services, cross-plant comparison, centralized training, or enterprise information. Its trade-offs include WAN dependency, cost governance, identity, data classification, and jurisdiction. I quantify the choice. If an advisory must be generated within 500 milliseconds and WAN p99 alone is 800 milliseconds, cloud serving cannot meet the deadline. I may run signed inference at the edge while training and model approval remain central. If a weekly supply forecast needs twenty plants, central aggregation is more valuable and the deadline permits cloud. The hybrid design defines a last-known-good model, model validity period, input freshness, buffer capacity, store-and-forward, and behavior after prolonged disconnection. Low confidence, stale input, or drift returns the service to a deterministic rule, manual review, or shadow mode. Crucially, edge placement does not turn AI into a safety controller. Protection and interlocks stay in engineered deterministic systems. I also standardize the reference pattern while validating local sensor mapping, roles, thresholds, security, and rollback before each deployment.`
      ),
      followUps: [
        t('Come opererebbe il servizio dopo otto ore senza WAN?', 'How would the service operate after eight hours without WAN?'),
        t('Quale telemetria invieresti centralmente?', 'Which telemetry would you send centrally?')
      ]
    },
    {
      prompt: t('Perché un modello AI non deve chiudere direttamente un loop safety-critical?', 'Why must an AI model not directly close a safety-critical control loop?'),
      short: t(
        `Un loop safety-critical richiede timing limitato, comportamento validato nelle condizioni definite, protezione indipendente, cambi controllati e failure handling prevedibile. Un modello statistico, soprattutto attraverso una rete, introduce incertezza, drift, jitter, outage e rischio di versione. Mantengo le safety function in sistemi deterministici progettati. L'AI può offrire advisory read-only entro limiti rigidi, con plausibility check, autorizzazione, accountability umana, audit, fallback e rollback.`,
        `A safety-critical loop needs bounded timing, validated behavior across defined conditions, independent protection, controlled change, and predictable failure handling. A statistical model, especially across a network, introduces uncertainty, drift, jitter, outages, and version risk. I keep safety functions in engineered deterministic systems. AI may provide read-only advice within hard limits, with plausibility checks, authorization, human accountability, audit, fallback, and rollback.`
      ),
      long: t(
        `Non consentirei a un modello general-purpose di chiudere direttamente un loop safety-critical perché il suo assurance case non corrisponde alla funzione. Un loop protettivo richiede hazard analysis, response-time budget, comportamento deterministico, operating envelope validato, livelli indipendenti di protezione, modifica controllata, proof test e stato fail-safe noto. Un modello introduce errore statistico, distribution shift, dipendenza dalla qualità input, cambi di runtime e versione e latenza di rete variabile. La sola etichetta human-in-the-loop non basta se la persona non può capire o contestare la raccomandazione nel tempo disponibile. Chiedo prima se l'AI serva davvero: spesso sensore, interlock o regola deterministica sono più semplici e difendibili. Dove l'AI aggiunge valore, separo osservazione, raccomandazione, autorizzazione e controllo. Il modello legge dati approvati, verifica schema, status, freshness e mode e produce un advisory con evidenza, confidenza, versione e scope. Logica applicativa indipendente applica hard bound, rate limit, RBAC, audit e circuit breaker. Un ingegnere autorizzato può accettare un'azione manutentiva, mentre il controllo convenzionale applica soltanto impostazioni ammesse nel range validato. Safety PLC o safety instrumented function restano indipendenti e possono sempre intervenire. Il modello non ha route o credenziali per scrivere sui PLC, bypassare interlock o rilasciare prodotto. Dati stale, bassa confidenza, drift, perdita servizio o falsi alert eccessivi attivano fallback testato: regola tradizionale, procedura manuale o shadow mode. Così si ottiene insight senza far dipendere la safety da comportamento incerto.`,
        `I would not let a general AI model directly close a safety-critical loop because its assurance case does not match the function. A protective loop needs a defined hazard analysis, response-time budget, deterministic behavior, validated operating envelope, independent layers of protection, controlled modification, proof testing, and a known fail-safe state. A model introduces statistical error, distribution shift, dependency on input quality, runtime and version changes, and potentially variable network latency. A human confirmation label alone is insufficient if the person cannot understand or challenge the recommendation within the available time. I first ask whether AI is needed at all. Often a conventional sensor, interlock, or deterministic rule is simpler and more defensible. Where AI adds value, I separate observation, recommendation, authorization, and control. The model reads approved data, validates schema, status, freshness, and operating mode, and produces an advisory with evidence, confidence, model version, and scope. Independent application logic applies hard bounds, rate limits, role-based authorization, audit, and a circuit breaker. An authorized engineer may accept a maintenance action, while conventional control applies any permitted setting within its validated range. Safety PLCs or safety instrumented functions remain independent and can always override or trip. The model has no network route or credential to write to PLCs, bypass interlocks, or release product. Stale data, low confidence, drift, service loss, or excessive false alerts triggers a tested fallback such as a traditional rule, manual procedure, or shadow mode. That architecture gains analytical insight without making safety depend on uncertain behavior.`
      ),
      followUps: [
        t('Quali engineered control applicheresti a un advisory AI?', 'Which engineered controls would you apply to an AI advisory?'),
        t('Quando sarebbe insufficiente la conferma umana?', 'When would human confirmation be insufficient?')
      ]
    }
  ],
  finalQuiz: [
    checkpoint(
      'Quale sequenza conserva meglio il significato di un dato industriale?',
      'Which sequence best preserves the meaning of industrial data?',
      [
        ['Valore, timestamp, status, unità, asset, owner e lineage.', 'Value, timestamp, status, unit, asset, owner, and lineage.', 'La sequenza conserva misura, contesto e responsabilità.', 'This retains measurement, context, and responsibility.'],
        ['Solo valore e dashboard.', 'Value and dashboard only.', 'Mancano qualità, tempo, identità e provenienza.', 'Quality, time, identity, and provenance are missing.'],
        ['Output del modello senza input version.', 'Model output without input version.', 'L’esito non è riproducibile o auditabile.', 'The result is not reproducible or auditable.']
      ],
      0
    ),
    checkpoint(
      'Che cosa dimostra la precisione 24/30?',
      'What does precision of 24/30 demonstrate?',
      [
        ['Che 80 per cento delle proposte era confermato secondo la definizione.', 'That 80 percent of proposals were confirmed under the definition.', 'È il rapporto true positives sulle proposte positive.', 'This is true positives divided by positive proposals.'],
        ['Che il modello ha trovato ogni evento.', 'That the model found every event.', 'Per i miss serve il denominatore del recall.', 'Misses require the recall denominator.'],
        ['Che il modello può controllare il motore.', 'That the model can control the motor.', 'Una metrica predittiva non crea un assurance case safety.', 'A predictive metric does not create a safety assurance case.']
      ],
      0
    ),
    checkpoint(
      'Quale failure mode richiede idempotenza?',
      'Which failure mode requires idempotency?',
      [
        ['Timeout dopo che CMMS ha già creato il work order.', 'Timeout after CMMS already created the work order.', 'Il retry deve restituire lo stesso esito senza duplicare.', 'The retry must return the same outcome without duplication.'],
        ['Sensore allentato.', 'Loose sensor.', 'Richiede diagnostica fisica e plausibility, non idempotenza.', 'This needs physical diagnostics and plausibility, not idempotency.'],
        ['WAN lenta per un alert safety.', 'Slow WAN for a safety alert.', 'La funzione safety non deve dipendere dalla WAN.', 'The safety function must not depend on WAN connectivity.']
      ],
      0
    )
  ]
}

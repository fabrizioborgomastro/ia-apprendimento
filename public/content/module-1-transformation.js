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
  id: 'from-digitization-to-transformation',
  eyebrow: t('01 · Fondamenti', '01 · Foundations'),
  title: t(
    'Digitizzazione, digitalizzazione e trasformazione',
    'Digitization, digitalization, and transformation'
  ),
  objective: t(
    'Distinguere tre livelli di cambiamento e riconoscere quando una proposta modifica davvero risultati, processo e modello operativo.',
    'Distinguish three levels of change and recognize when a proposal truly changes outcomes, process, and operating model.'
  ),
  estimatedMinutes: 8,
  theory: [
    t(
      `Digitizzazione, digitalizzazione e trasformazione digitale descrivono cambiamenti diversi, anche se nel linguaggio quotidiano vengono spesso confusi. La digitizzazione converte un contenuto analogico in dati digitali senza cambiare necessariamente il lavoro. Scansionare un modulo di manutenzione, trascrivere un registro cartaceo o acquisire il segnale di un manometro sono esempi utili: il dato diventa più facile da conservare, cercare e trasmettere, ma la decisione e la sequenza operativa possono rimanere identiche. La digitalizzazione usa invece dati e tecnologie digitali per migliorare un processo esistente. Un modulo elettronico che valida i campi, propone il codice guasto e invia la richiesta al responsabile riduce errori e tempi di passaggio. La trasformazione digitale va oltre il singolo flusso: ridisegna il modo in cui l'organizzazione crea valore, prende decisioni e distribuisce responsabilità. Collega processo, dati, persone, tecnologia, controlli e incentivi a un risultato misurabile. In una fabbrica, installare sensori è digitizzazione; visualizzare automaticamente le cause di fermo è digitalizzazione; creare un sistema quotidiano in cui manutenzione, produzione e qualità usano quei segnali per prevenire perdite, cambiare priorità e apprendere tra linee è trasformazione. Questa distinzione non è una classifica morale. Un buon progetto può fermarsi alla digitizzazione se quello è il problema reale. La domanda corretta non è quanto sia sofisticata la tecnologia, ma quale decisione o comportamento debba migliorare. Prima di parlare di piattaforme, un Technical Lead formula una catena causale: perdita osservabile, causa o leva plausibile, capacità digitale proposta, cambiamento nel lavoro, risultato atteso e prova che potrebbe smentire l'ipotesi. Se manca il cambiamento nel lavoro, il valore resta potenziale. Se manca la prova, resta una promessa.`,
      `Digitization, digitalization, and digital transformation describe different changes, although everyday language often blends them together. Digitization converts analogue content into digital data without necessarily changing the work. Scanning a maintenance form, transcribing a paper log, or acquiring a pressure-gauge signal are useful examples: the data becomes easier to store, search, and transmit, while the decision and operating sequence may remain unchanged. Digitalization uses digital data and technology to improve an existing process. An electronic form that validates fields, suggests a fault code, and routes the request to an accountable owner can reduce errors and handoff time. Digital transformation goes beyond one workflow. It redesigns how the organization creates value, makes decisions, and distributes responsibility. It connects process, data, people, technology, controls, and incentives to a measurable outcome. In a factory, adding sensors is digitization; automatically visualizing downtime causes is digitalization; establishing a daily system in which maintenance, production, and quality use those signals to prevent losses, change priorities, and learn across lines is transformation. This distinction is not a maturity contest. A sound initiative may stop at digitization when that solves the real problem. The right question is not how sophisticated the technology is, but which decision or behavior must improve. Before discussing platforms, a Technical Lead states a causal chain: observable loss, plausible cause or lever, proposed digital capability, change in work, expected outcome, and evidence that could disprove the hypothesis. Without a change in work, value remains potential. Without evidence, the proposal remains a promise.`
    ),
    t(
      `Per rendere la catena concreta, conviene separare output, outcome e impatto. L'output è ciò che il team consegna, per esempio un cruscotto con eventi di fermo. L'outcome è il comportamento diverso, come la revisione giornaliera delle tre cause principali con un owner e una scadenza. L'impatto è la variazione sostenuta della perdita, per esempio minuti di fermo evitati o maggiore affidabilità del piano. Confondere questi livelli porta a celebrare il go-live anche quando nessuno usa il prodotto o il KPI non cambia. La trasformazione richiede inoltre un operating model: chi possiede il prodotto dopo il pilot, chi mantiene le regole, chi controlla la qualità dei dati, chi può autorizzare una modifica e come gli utenti segnalano un errore. Un software senza queste responsabilità diventa rapidamente un ulteriore sistema da riconciliare. Anche l'adozione va trattata come progettazione, non come comunicazione finale. Gli operatori devono vedere come la soluzione riduce attrito, ricevere spiegazioni sugli alert, poter contestare una classificazione e sapere quale fallback usare. Qualità e sicurezza devono poter bloccare o limitare il cambiamento quando il rischio supera il beneficio. Per valutare una proposta, si può usare un test semplice. Primo: esiste un problema operativo specifico con baseline? Secondo: la capacità digitale cambia una decisione o un'azione? Terzo: ruoli, controlli e competenze cambiano in modo coerente? Quarto: outcome e guardrail sono misurati? Quinto: il miglioramento può continuare dopo che il team di progetto si ritira? Se la risposta è sì solo alle prime due domande, siamo probabilmente davanti a una soluzione tecnologica circoscritta. Può essere utile, ma non va descritta come trasformazione dell'impresa. La precisione del linguaggio protegge credibilità e investimento.`,
      `To make the causal chain concrete, separate output, outcome, and impact. The output is what the team delivers, such as a dashboard of downtime events. The outcome is the changed behavior, such as a daily review of the three leading causes with an owner and due date. The impact is the sustained change in loss, such as avoided downtime minutes or improved schedule reliability. Blending these levels leads teams to celebrate go-live even when nobody uses the product or the KPI does not move. Transformation also requires an operating model: who owns the product after the pilot, who maintains business rules, who controls data quality, who may authorize a change, and how users report an error. Software without these responsibilities soon becomes another system that people must reconcile. Adoption should be designed, not left to final communications. Operators need to see how the solution removes friction, understand alerts, challenge a classification, and know which fallback to use. Quality and safety functions must be able to stop or constrain a change when risk exceeds benefit. A simple test helps evaluate a proposal. First, is there a specific operational problem with a baseline? Second, does the digital capability change a decision or action? Third, do roles, controls, and skills change coherently? Fourth, are outcomes and guardrails measured? Fifth, can improvement continue after the project team leaves? If only the first two answers are yes, the initiative is probably a bounded technology solution. It may still be valuable, but it should not be described as enterprise transformation. Precise language protects credibility and investment.`
    ),
    t(
      `Un altro criterio è il confine del sistema. Una tecnologia può ottimizzare localmente un passaggio e peggiorare il flusso complessivo. Se un'app rende rapidissimo aprire richieste ma non migliora classificazione, priorità e capacità della manutenzione, aumenta la coda invece di ridurre il tempo di ripristino. Se un algoritmo genera più alert di quanti i tecnici possano verificare, l'accuratezza statistica non produce affidabilità. La prospettiva trasformativa osserva quindi l'intero ciclo dalla rilevazione alla decisione, dall'azione al feedback. Identifica dipendenze, incentivi e vincoli regolatori prima di automatizzare. Distingue il sistema ufficiale dai fogli paralleli creati per compensarne i difetti. Definisce un confine iniziale abbastanza piccolo da essere sperimentabile, ma abbastanza completo da mostrare un outcome reale. Una formula utile per comunicare la tesi è: per il gruppo di utenti definito, crediamo che una capacità specifica cambierà una decisione specifica e migliorerà un KPI rispetto alla baseline, senza oltrepassare guardrail dichiarati; lo verificheremo entro un periodo con un confronto trasparente. La frase costringe a nominare utenti, meccanismo, metrica, rischio e tempo. Non sostituisce l'analisi, ma impedisce che il progetto venga definito soltanto da una lista di funzionalità. In colloquio, questa distinzione dimostra leadership: partire dal valore non significa ignorare architettura e dati, bensì assegnare loro una funzione verificabile. Una trasformazione solida può usare tecnologie semplici, mentre una demo tecnicamente brillante può non trasformare nulla. Il criterio finale è il miglioramento affidabile di un sistema socio-tecnico, non la presenza di cloud, AI o automazione nel titolo.`,
      `A further criterion is the system boundary. Technology can optimize one local step while making the overall flow worse. If an application makes request creation extremely fast but does not improve classification, priority, or maintenance capacity, it expands the queue instead of reducing restoration time. If an algorithm generates more alerts than technicians can verify, statistical accuracy does not create reliability. A transformation perspective therefore follows the complete loop from detection to decision, action, and feedback. It identifies dependencies, incentives, and regulatory constraints before automating. It distinguishes the official system from shadow spreadsheets created to compensate for its weaknesses. It chooses an initial boundary small enough to test but complete enough to demonstrate a real outcome. A useful hypothesis statement is: for a defined user group, we believe a specific capability will change a specific decision and improve a KPI from its baseline without breaching stated guardrails; we will verify this within a period using a transparent comparison. The sentence forces the team to name users, mechanism, metric, risk, and time. It does not replace analysis, but prevents a feature list from defining the project. In an interview, this distinction demonstrates leadership. Starting from value does not mean ignoring architecture and data; it means giving them a testable purpose. A robust transformation may use simple technologies, while a technically impressive demo may transform nothing. The final criterion is reliable improvement in a socio-technical system, not the presence of cloud, AI, or automation in the title.`
    )
  ],
  keyPoints: [
    t('Digitizzazione converte, digitalizzazione migliora, trasformazione ridisegna il sistema di valore.', 'Digitization converts, digitalization improves, and transformation redesigns the value system.'),
    t('Misurare output, outcome e impatto separatamente.', 'Measure output, outcome, and impact separately.'),
    t('Il go-live non dimostra adozione né valore.', 'Go-live proves neither adoption nor value.')
  ],
  microExamples: [microExample(
    'Dal modulo al ciclo di miglioramento',
    'From form to improvement loop',
    'Un modulo digitale elimina la carta; un ciclo con classificazione, review quotidiana, owner e misura delle recidive cambia il sistema di lavoro.',
    'A digital form removes paper; a loop with classification, daily review, ownership, and recurrence measurement changes the work system.'
  )],
  checkpoint: checkpoint(
    'Quale evidenza distingue meglio una trasformazione da una semplice installazione tecnologica?',
    'Which evidence best distinguishes transformation from a technology installation?',
    [
      ['La soluzione usa AI nel cloud.', 'The solution uses AI in the cloud.', 'La scelta tecnologica non dimostra un cambiamento operativo.', 'A technology choice does not prove operational change.'],
      ['Utenti, decisioni, responsabilità e KPI cambiano in modo misurabile e sostenibile.', 'Users, decisions, responsibilities, and KPIs change measurably and sustainably.', 'È la prova più completa di un cambiamento socio-tecnico.', 'This is the strongest evidence of socio-technical change.'],
      ['Il progetto ha completato il go-live.', 'The project completed go-live.', 'Il go-live è un output, non una prova di outcome.', 'Go-live is an output, not evidence of an outcome.']
    ],
    1
  ),
  sourceIds: ['oecd-digital-transformation-definitions', 'pmi-operations', 'pmi-annual-report-2025']
}

const unitTwo = {
  id: 'industry-4-and-5-regulated-manufacturing',
  eyebrow: t('02 · Contesto industriale', '02 · Industrial context'),
  title: t(
    'Industry 4.0 e Industry 5.0 in un produttore regolamentato',
    'Industry 4.0 and Industry 5.0 in a regulated manufacturer'
  ),
  objective: t(
    'Collegare connettività, dati e automazione ai principi di centralità umana, sostenibilità e resilienza senza indebolire qualità e controllo.',
    'Connect connectivity, data, and automation to human-centricity, sustainability, and resilience without weakening quality or control.'
  ),
  estimatedMinutes: 8,
  theory: [
    t(
      `Industry 4.0 è un modo di descrivere l'integrazione tra mondo fisico e digitale nella produzione: asset connessi, dati contestualizzati, sistemi interoperabili, analisi e automazione che rendono visibile e governabile il flusso. Non coincide con una singola architettura né con l'acquisto di sensori. Il valore nasce quando segnali di macchina, eventi di processo, ordini, materiali, controlli di qualità e azioni umane possono essere correlati con significato e tempi adeguati alla decisione. In un produttore regolamentato questa integrazione deve rispettare la validità dei dati, la tracciabilità, la segregazione dei ruoli, la gestione delle modifiche e l'affidabilità operativa. Collegare non significa permettere a ogni componente di comandare ogni altro componente. Occorrono confini espliciti tra osservazione, raccomandazione e controllo. Un servizio analitico può suggerire un'ispezione, ma il percorso autorizzativo e la decisione sul prodotto restano soggetti ai controlli di qualità definiti. Un cruscotto può aggregare dati da più linee, ma deve preservare provenienza, timestamp e definizione del KPI. Un modello può evidenziare un'anomalia, ma l'organizzazione deve sapere come verificarla, registrare l'esito e operare in sua assenza. Per questo Industry 4.0 è tanto un problema di semantica e governance quanto di connettività. Se reparti diversi usano codici incompatibili per la stessa causa di fermo, una piattaforma centralizzata produce una vista ordinata di una realtà incoerente. Prima della scala servono definizioni condivise, ownership e qualità alla fonte. ISA-95 è utile come linguaggio per ragionare sui confini tra controllo, gestione delle operazioni e pianificazione aziendale; non va usato come scusa per ignorare i flussi reali o imporre una gerarchia rigida a ogni stabilimento.`,
      `Industry 4.0 describes the integration of the physical and digital worlds in manufacturing: connected assets, contextualized data, interoperable systems, analytics, and automation that make a production flow visible and manageable. It is not one architecture or a sensor-purchasing program. Value appears when machine signals, process events, orders, materials, quality checks, and human actions can be correlated with the meaning and timing required by a decision. In a regulated manufacturer, integration must preserve data validity, traceability, segregation of duties, change control, and operational reliability. Connecting systems does not mean allowing every component to command every other component. Boundaries between observation, recommendation, and control must be explicit. An analytics service may suggest an inspection, while the authorization path and product decision remain subject to defined quality controls. A dashboard may aggregate multiple lines, but it must preserve provenance, timestamps, and KPI definitions. A model may highlight an anomaly, but the organization needs a way to verify it, record the result, and operate when the model is unavailable. Industry 4.0 is therefore as much about semantics and governance as connectivity. If departments use incompatible codes for the same downtime cause, a centralized platform creates an orderly view of inconsistent reality. Shared definitions, ownership, and quality at source must precede scale. ISA-95 provides a useful language for discussing boundaries among control, manufacturing operations management, and business planning. It should not become an excuse to ignore real flows or force a rigid hierarchy on every site.`
    ),
    t(
      `La prospettiva Industry 5.0 proposta dalla Commissione europea amplia l'attenzione: la competitività industriale deve essere human-centric, sostenibile e resiliente. Human-centric non significa rifiutare l'automazione. Significa progettare tecnologia che aumenti capacità, sicurezza e autonomia professionale delle persone, assegnando responsabilità e possibilità reale di contestare il sistema. Un assistente che recupera la versione controllata di una procedura può ridurre il tempo di ricerca, ma deve mostrare fonte e revisione, rispettare i permessi e indirizzare l'utente al documento ufficiale. Un sistema che impone istruzioni opache e rende impossibile l'override non è human-centric solo perché ha un'interfaccia amichevole. Sostenibilità richiede misure lungo il ciclo: energia, materiali, scarti, manutenzione, capacità di riuso e costo digitale. Ridurre microfermate può diminuire scarti di riavvio, ma un modello computazionalmente costoso senza beneficio marginale dimostrato può essere una scelta inefficiente. Resilienza è la capacità di continuare, recuperare e adattarsi quando cambiano domanda, forniture, persone o tecnologia. Include fallback manuali praticabili, competenze distribuite, architetture sostituibili e visibilità delle dipendenze. Un processo automatizzato che fallisce completamente quando manca la connettività può essere efficiente nei giorni normali e fragile nel momento decisivo. Questi tre principi aiutano a bilanciare performance e robustezza. Non sono slogan da aggiungere a posteriori: diventano criteri di progetto e gate. Per ogni use case, il team domanda chi guadagna o perde controllo, quale impatto ambientale si misura e come il processo opera in modalità degradata. Le risposte entrano nel business case insieme a produttività e costo.`,
      `The European Commission's Industry 5.0 perspective broadens the focus: industrial competitiveness should be human-centric, sustainable, and resilient. Human-centricity does not reject automation. It means designing technology that strengthens people's capability, safety, and professional agency, with clear responsibility and a meaningful ability to challenge the system. An assistant that retrieves the controlled version of a procedure may reduce search time, but it must display its source and revision, respect permissions, and direct users to the official document. A system that issues opaque instructions and makes override impossible is not human-centric merely because its interface looks friendly. Sustainability requires lifecycle measures covering energy, materials, scrap, maintenance, reuse, and the cost of digital operation. Reducing micro-stops may lower restart waste, while an expensive model with no proven marginal benefit can be inefficient. Resilience is the ability to continue, recover, and adapt when demand, supply, people, or technology changes. It includes workable manual fallbacks, distributed skills, replaceable architecture, and visibility of dependencies. A process that fails completely when connectivity disappears may be efficient on normal days and fragile at the critical moment. These three principles balance performance and robustness. They are not labels added after design; they become criteria and gates. For each use case, the team asks who gains or loses control, which environmental effect will be measured, and how the process works in degraded mode. The answers belong in the business case beside productivity and cost.`
    ),
    t(
      `Nel contesto PMI usato in questo corso si parla soltanto di scenari realistici ipotetici basati su informazioni pubbliche relative a un'impresa manifatturiera globale e regolamentata. Non si presume di conoscere impianti, sistemi o procedure riservate. Questa disciplina è importante anche in colloquio: un candidato credibile dichiara le assunzioni e chiede quali controlli si applichino realmente. Immaginiamo una linea ad alta velocità in cui un aumento delle microfermate genera perdita di capacità e scarti. Un approccio Industry 4.0 collega segnali, stati macchina, ordine in esecuzione, materiale e codici causa per costruire una vista affidabile. Un approccio Industry 5.0 verifica inoltre che gli operatori partecipino alla definizione delle cause, che il nuovo workflow non trasferisca loro un carico di conferma ingestibile, che la riduzione degli scarti sia misurata e che esista un fallback se il servizio analitico non è disponibile. In un ambiente regolamentato, la velocità di sperimentazione si ottiene riducendo il perimetro e il rischio, non saltando i controlli. Si può iniziare in shadow mode, confrontare raccomandazioni con decisioni reali, limitare il pilot a una linea e impedire azioni automatiche sul prodotto. Qualità, Operations, manutenzione, OT, IT e cybersecurity definiscono insieme dati, autorizzazioni, logging e criteri di arresto. Il risultato desiderato non è la massima autonomia, ma il livello di automazione più semplice che produce valore affidabile. A volte è un alert; a volte una proposta con approvazione; a volte un workflow deterministico. La maturità consiste nel scegliere consapevolmente il confine, non nell'eliminare l'essere umano da ogni decisione.`,
      `The PMI context in this course consists only of realistic hypothetical scenarios derived from public information about a global, regulated manufacturer. It does not presume knowledge of confidential plants, systems, or procedures. This discipline matters in an interview: a credible candidate states assumptions and asks which controls actually apply. Imagine a high-speed line where increasing micro-stops reduce capacity and create restart scrap. An Industry 4.0 approach connects signals, machine states, the active order, material, and cause codes to create a reliable view. An Industry 5.0 approach also checks that operators help define causes, that the new workflow does not impose an unmanageable confirmation burden, that scrap reduction is measured, and that a fallback exists when analytics is unavailable. In a regulated environment, experimentation becomes faster by reducing scope and risk, not by skipping controls. The team can start in shadow mode, compare recommendations with real decisions, limit the pilot to one line, and prevent automatic product actions. Quality, Operations, maintenance, OT, IT, and cybersecurity jointly define data, authorization, logging, and stop criteria. The goal is not maximum autonomy but the simplest automation level that creates reliable value. Sometimes that is an alert, sometimes a proposal with approval, and sometimes a deterministic workflow. Maturity lies in choosing the boundary deliberately, not in removing people from every decision.`
    )
  ],
  keyPoints: [
    t('Industry 4.0 integra il flusso fisico e digitale con semantica e governance.', 'Industry 4.0 integrates physical and digital flows with semantics and governance.'),
    t('Industry 5.0 aggiunge centralità umana, sostenibilità e resilienza come criteri operativi.', 'Industry 5.0 adds human-centricity, sustainability, and resilience as operating criteria.'),
    t('In un processo regolamentato osservazione, raccomandazione e controllo hanno confini distinti.', 'In a regulated process, observation, recommendation, and control have distinct boundaries.')
  ],
  microExamples: [microExample(
    'Assistente per procedure controllate',
    'Controlled-procedure assistant',
    'La ricerca digitale è utile solo se conserva revisione, fonte, permessi e rinvio al documento ufficiale.',
    'Digital search is useful only when it preserves revision, source, permissions, and a link to the official document.'
  )],
  checkpoint: checkpoint(
    'Quale scelta applica meglio insieme Industry 4.0 e Industry 5.0?',
    'Which choice best applies Industry 4.0 and Industry 5.0 together?',
    [
      ['Connettere ogni sistema e automatizzare ogni decisione.', 'Connect every system and automate every decision.', 'Connettività e autonomia senza confini aumentano il rischio.', 'Connectivity and autonomy without boundaries increase risk.'],
      ['Integrare dati contestualizzati e progettare controllo umano, sostenibilità e fallback misurabili.', 'Integrate contextualized data and design measurable human control, sustainability, and fallback.', 'La scelta combina capacità digitale e robustezza socio-tecnica.', 'This combines digital capability with socio-technical robustness.'],
      ['Acquistare sensori senza cambiare processo o ownership.', 'Purchase sensors without changing process or ownership.', 'È digitizzazione potenziale, non integrazione governata.', 'This is potential digitization, not governed integration.']
    ],
    1
  ),
  sourceIds: ['ec-industry-5-0', 'isa-95', 'pmi-operations', 'pmi-product-reliability']
}

const unitThree = {
  id: 'loss-kpi-tree-baseline-target-guardrail',
  eyebrow: t('03 · Misura del valore', '03 · Value measurement'),
  title: t(
    'Dalla perdita operativa ad albero KPI, baseline, target e guardrail',
    'From operational loss to KPI tree, baseline, target, and guardrail'
  ),
  objective: t(
    'Tradurre una perdita in una gerarchia di misure, calcolare una baseline credibile e definire target e guardrail che guidino una decisione.',
    'Translate a loss into a hierarchy of measures, calculate a credible baseline, and define targets and guardrails that guide a decision.'
  ),
  estimatedMinutes: 8,
  theory: [
    t(
      `Una trasformazione diventa governabile quando il problema è espresso come perdita operativa osservabile. Espressioni come modernizzare la fabbrica o usare l'AI non indicano quale condizione debba cambiare. Una perdita può essere tempo pianificato non produttivo, scarto, rilavorazione, attesa, deviazioni ripetute, energia per unità, ritardo o capitale immobilizzato. Va definita con popolazione, periodo, unità e regola di inclusione. Dire che il downtime è alto non basta; dire che una determinata linea ha perso 1.260 minuti di produzione pianificata per fermate non pianificate in quattro settimane, escludendo cambi formato programmati, permette verifica e confronto. Da qui si costruisce un KPI tree. In alto sta l'outcome di business, per esempio capacità affidabile. Sotto compaiono driver come disponibilità, velocità effettiva, qualità al primo passaggio e aderenza al piano. Più in basso si trovano indicatori azionabili: frequenza dei fermi, durata media, tempo di diagnosi, tempo di risposta, ricorrenza per failure mode, percentuale di ordini con codifica completa. L'albero non è una decorazione gerarchica. Esplicita una relazione causale da verificare e impedisce di migliorare una proxy trascurando l'outcome. Ridurre il tempo di apertura di un work order non riduce automaticamente il downtime; produce valore solo se abilita risposta o prevenzione più rapida. Ogni nodo deve avere definizione, formula, sorgente, frequenza, owner e limiti d'interpretazione. Se due stabilimenti calcolano una fermata in modo diverso, il confronto numerico è falso anche quando il dashboard è tecnicamente corretto. Per questo la definizione operativa del KPI precede la visualizzazione.`,
      `Transformation becomes manageable when the problem is expressed as an observable operational loss. Statements such as modernize the factory or use AI do not specify what must change. A loss may be scheduled time that produces nothing, scrap, rework, waiting, recurring deviations, energy per unit, delay, or tied-up capital. Define its population, period, unit, and inclusion rule. Saying downtime is high is insufficient. Saying that a particular line lost 1,260 scheduled production minutes to unplanned stops over four weeks, excluding planned changeovers, enables verification and comparison. A KPI tree starts from that definition. The top level holds the business outcome, such as reliable capacity. Beneath it are drivers such as availability, effective speed, first-pass quality, and schedule adherence. Lower levels contain actionable indicators: stop frequency, average duration, diagnostic time, response time, recurrence by failure mode, and the percentage of orders with complete coding. The tree is not a decorative hierarchy. It states a causal relationship to test and prevents a team from improving a proxy while neglecting the outcome. Shortening work-order creation does not automatically reduce downtime; it creates value only if it enables faster response or prevention. Every node needs a definition, formula, source, frequency, owner, and interpretation limits. If two sites calculate a stop differently, numerical comparison is false even when the dashboard is technically correct. The operational KPI definition therefore comes before visualization.`
    ),
    t(
      `La baseline è una stima documentata della prestazione prima dell'intervento. Deve rappresentare il processo che il pilot vuole cambiare, non il periodo che rende il business case più attraente. Supponiamo quattro settimane con 30.000 minuti pianificati e 1.260 minuti di fermo non pianificato. Il downtime rate è 1.260 diviso 30.000, cioè 4,2 per cento; la disponibilità rispetto a questa perdita è 95,8 per cento. Se gli eventi sono 42, la durata media è 30 minuti. Se dodici eventi della stessa causa producono 480 minuti, quella famiglia pesa il 38,1 per cento del downtime e merita un'analisi mirata. Occorre però controllare mix prodotto, turni, manutenzioni programmate, stagionalità, definizione degli eventi e dati mancanti. La media da sola nasconde variabilità: mediana, percentile elevato e distribuzione per turno aiutano a capire se pochi incidenti estremi dominano il risultato. Il target esprime una variazione desiderata entro un tempo, collegata a una leva plausibile. Un target di ridurre del 20 per cento i 1.260 minuti equivale a evitare 252 minuti nello stesso orizzonte e portare il rate da 4,2 a 3,36 per cento, a parità di minuti pianificati. Non è corretto promettere quell'intero beneficio se il pilot affronta solo la causa da 480 minuti. Se la soluzione può ragionevolmente evitare metà delle recidive di quella causa, il beneficio attribuibile iniziale è 240 minuti, pari al 19 per cento del downtime totale. Il calcolo rende visibili assunzioni e tetto del valore.`,
      `A baseline is a documented estimate of performance before intervention. It must represent the process the pilot intends to change, not the period that makes the business case look most attractive. Assume four weeks with 30,000 scheduled minutes and 1,260 minutes of unplanned downtime. The downtime rate is 1,260 divided by 30,000, or 4.2 percent; availability relative to this loss is 95.8 percent. If there were 42 events, average duration was 30 minutes. If twelve events from one cause produced 480 minutes, that family represents 38.1 percent of downtime and deserves focused analysis. The team must still check product mix, shifts, planned maintenance, seasonality, event definitions, and missing data. An average conceals variability, so median, a high percentile, and shift-level distributions help reveal whether a few extreme incidents dominate. A target states a desired change over time and links it to a plausible lever. Reducing the 1,260 minutes by 20 percent means avoiding 252 minutes over the same horizon and moving the rate from 4.2 to 3.36 percent, if scheduled time is unchanged. The pilot should not claim that whole benefit when it addresses only the 480-minute cause. If the solution could reasonably prevent half the recurrences of that cause, the initial attributable benefit is 240 minutes, or 19 percent of total downtime. This calculation exposes assumptions and the ceiling of value.`
    ),
    t(
      `Un target senza guardrail può incentivare un'ottimizzazione pericolosa. Un guardrail è una misura che non deve deteriorarsi mentre si migliora il KPI principale. Per il downtime possono essere scarto al riavvio, deviazioni di qualità, incidenti di sicurezza, backlog di manutenzione, falsi allarmi per turno e carico di conferma sugli operatori. La coppia target-guardrail definisce la decisione. Per esempio: procedere oltre il pilot se i minuti persi per la causa selezionata diminuiscono almeno del 15 per cento rispetto a una baseline comparabile, senza aumento statisticamente e operativamente rilevante di scarto, eventi di qualità o falsi alert oltre due per turno. La soglia deve essere definita prima di vedere il risultato, insieme al metodo di confronto. Un semplice prima-dopo può essere ingannevole se cambia il volume o viene eseguita una revisione meccanica. Quando possibile si normalizza per ore operative, unità prodotte o opportunità di difetto e si usa una linea o un periodo di confronto. È inoltre utile distinguere leading e lagging indicators. La completezza tempestiva dei codici causa è un leading indicator: segnala se il nuovo processo sta funzionando prima che il downtime accumulato mostri un effetto. I minuti persi sono un lagging indicator: misurano il risultato. Infine, il KPI tree deve supportare azione, non sorveglianza indiscriminata. Dati individuali possono creare incentivi perversi se una misura di processo viene trasformata in classifica personale senza contesto. Il team chiarisce scopo, accesso e uso dei dati. Un artefatto professionale solido contiene quindi value hypothesis, formule, baseline, segmentazioni, target, guardrail, owner, cadenza e regola di decisione. Questa pagina vale più di un elenco generico di benefici perché rende l'iniziativa falsificabile e gestibile.`,
      `A target without guardrails can encourage dangerous optimization. A guardrail is a measure that must not deteriorate while the primary KPI improves. For downtime, guardrails may include restart scrap, quality deviations, safety events, maintenance backlog, false alerts per shift, and operator confirmation load. The target-guardrail pair defines the decision. For example: proceed beyond the pilot if minutes lost to the selected cause fall at least 15 percent against a comparable baseline, without an operationally meaningful increase in scrap, quality events, or false alerts beyond two per shift. Set thresholds and comparison methods before seeing results. A simple before-and-after view can mislead when volume changes or a mechanical overhaul occurs. Where possible, normalize by operating hours, units produced, or defect opportunities and use a comparison line or period. Leading and lagging indicators also serve different purposes. Timely completeness of cause codes is a leading indicator because it shows whether the new process is operating before accumulated downtime reveals an effect. Lost minutes are a lagging indicator because they measure the result. The KPI tree should support action rather than indiscriminate surveillance. Individual data can create perverse incentives if a process measure becomes a personal ranking without context. The team clarifies purpose, access, and use. A strong professional artifact therefore records the value hypothesis, formulas, baseline, segments, target, guardrails, owners, cadence, and decision rule. This single page is more useful than a generic benefit list because it makes the initiative falsifiable and manageable.`
    )
  ],
  keyPoints: [
    t('Definire perdita, popolazione, periodo, unità e regole prima del KPI.', 'Define loss, population, period, unit, and rules before the KPI.'),
    t('Collegare outcome, driver e indicatori azionabili con ipotesi causali.', 'Connect outcomes, drivers, and actionable indicators through causal hypotheses.'),
    t('Un target è valido solo con baseline comparabile e guardrail espliciti.', 'A target is valid only with a comparable baseline and explicit guardrails.')
  ],
  microExamples: [microExample(
    'Il limite del beneficio',
    'The benefit ceiling',
    'Se il pilot agisce su 480 dei 1.260 minuti persi, non può attribuirsi l’intera perdita. Una prevenzione stimata del 50 per cento vale 240 minuti.',
    'If the pilot addresses 480 of 1,260 lost minutes, it cannot claim the entire loss. An estimated 50 percent prevention rate is worth 240 minutes.'
  )],
  workedCases: [{
    title: t('Baseline e target per le microfermate', 'Baseline and target for micro-stops'),
    scenario: t(
      'Caso ipotetico: una linea regolamentata registra 1.260 minuti di fermo non pianificato su 30.000 minuti pianificati in quattro settimane; una famiglia causa vale 480 minuti.',
      'Hypothetical case: a regulated line records 1,260 minutes of unplanned downtime over 30,000 scheduled minutes in four weeks; one cause family represents 480 minutes.'
    ),
    reasoning: t(
      'Il rate baseline è 4,2 per cento. Il team segmenta 42 eventi, verifica mix e missing data e stima che il pilot possa evitare metà dei 480 minuti attribuibili, cioè 240 minuti.',
      'The baseline rate is 4.2 percent. The team segments 42 events, checks mix and missing data, and estimates that the pilot can avoid half of the attributable 480 minutes, or 240 minutes.'
    ),
    decision: t(
      'Pilotare sulla famiglia causa selezionata con target di almeno 15 per cento di riduzione normalizzata e leading indicator sulla completezza dei codici.',
      'Pilot the selected cause family with a target of at least 15 percent normalized reduction and a leading indicator for cause-code completeness.'
    ),
    tradeOff: t(
      'Un perimetro stretto limita il beneficio immediato ma rende attribuzione, diagnosi e rollback più affidabili.',
      'A narrow scope limits immediate benefit but makes attribution, diagnosis, and rollback more reliable.'
    ),
    outcome: t(
      'La decisione di scala dipende da downtime normalizzato, scarto di riavvio, deviazioni e falsi alert, non dal completamento del dashboard.',
      'The scale decision depends on normalized downtime, restart scrap, deviations, and false alerts, not dashboard completion.'
    ),
    pmiCase: true,
    hypothetical: true,
    publicContext: true
  }],
  checkpoint: checkpoint(
    'Con 1.260 minuti persi su 30.000 pianificati, qual è il downtime rate baseline?',
    'With 1,260 lost minutes over 30,000 scheduled minutes, what is the baseline downtime rate?',
    [
      ['2,38 per cento', '2.38 percent', 'Inverte o combina in modo errato i valori.', 'This incorrectly reverses or combines the values.'],
      ['4,2 per cento', '4.2 percent', '1.260 diviso 30.000 moltiplicato 100 è 4,2.', '1,260 divided by 30,000 and multiplied by 100 is 4.2.'],
      ['95,8 per cento', '95.8 percent', 'È il complemento di disponibilità rispetto a questa perdita, non il downtime rate.', 'This is the complementary availability measure, not the downtime rate.']
    ],
    1
  ),
  sourceIds: [
    'nist-manufacturing-kpi-procedure',
    'nist-manufacturing-kpi-hierarchy',
    'nist-manufacturing-performance-baselines',
    'doe-manufacturing-baseline-normalization',
    'pmi-operations',
    'pmi-product-reliability'
  ]
}

const unitFour = {
  id: 'gemba-discovery-and-stakeholders',
  eyebrow: t('04 · Discovery', '04 · Discovery'),
  title: t(
    'Process discovery al gemba e mappatura degli stakeholder',
    'Gemba-based process discovery and stakeholder mapping'
  ),
  objective: t(
    'Osservare il lavoro reale, separare fatti e assunzioni e costruire una mappa di processo e stakeholder utile a un pilot controllato.',
    'Observe real work, separate facts from assumptions, and build a process and stakeholder map for a controlled pilot.'
  ),
  estimatedMinutes: 8,
  theory: [
    t(
      `Gemba indica il luogo in cui il lavoro avviene e il valore viene creato. Fare discovery al gemba significa seguire il processo reale con rispetto, non eseguire un audit improvvisato né cercare colpe. Procedure, diagrammi e interviste sono necessari ma incompleti: spesso descrivono il flusso previsto, mentre gli operatori gestiscono eccezioni, attese, strumenti paralleli e conoscenza tacita che nessun documento rappresenta. La visita parte da una domanda operativa limitata, per esempio come nasce, viene classificata e chiusa una richiesta dopo una microfermata. Il facilitatore osserva un campione di casi, registra timestamp e handoff, chiede alla persona di spiegare cosa vede e perché decide, e distingue osservazione da interpretazione. Una nota efficace può dire: alle 10:14 l'operatore copia il codice macchina dal display in un foglio e telefona al tecnico; non dice l'operatore perde tempo perché il sistema è pessimo. Dopo l'osservazione si verificano frequenza, varianti e motivi. Il team mappa trigger, input, passaggi, decisioni, sistemi, ruoli, output, eccezioni, rework e attese. Evidenzia i punti in cui l'informazione viene ricopiata, reinterpretata o ricercata. Il risultato non deve diventare una mappa enorme che nessuno usa. Per il primo pilot basta il tratto dalla rilevazione dell'evento alla decisione di intervento, includendo feedback e chiusura. Disegnare il percorso end-to-end evita di automatizzare un passaggio che sposta soltanto l'attesa a valle.`,
      `Gemba is the place where work happens and value is created. Gemba discovery means following real work respectfully, not performing a surprise audit or searching for blame. Procedures, diagrams, and interviews are necessary but incomplete. They often describe the intended flow, while operators manage exceptions, waiting, shadow tools, and tacit knowledge that no document captures. A visit starts with a bounded operational question, such as how a request is created, classified, and closed after a micro-stop. The facilitator observes a sample of cases, records timestamps and handoffs, asks the person to explain what they see and why they decide, and separates observation from interpretation. A useful note says: at 10:14 the operator copies the machine code from the display into a spreadsheet and calls the technician. It does not say: the operator wastes time because the system is poor. The team then validates frequency, variants, and reasons. It maps triggers, inputs, steps, decisions, systems, roles, outputs, exceptions, rework, and waiting. It highlights where information is copied, reinterpreted, or searched. The result should not become a vast map that nobody uses. For an initial pilot, the segment from event detection to intervention decision is enough, provided that feedback and closure are included. An end-to-end view prevents automating one step that merely moves the queue downstream.`
    ),
    t(
      `La discovery deve includere il dato e la decisione, non soltanto i click. Per ogni campo si chiede chi lo genera, con quale definizione, quando diventa disponibile, quanto spesso manca, chi può correggerlo e quale conseguenza produce un errore. Per ogni decisione si documentano informazione minima, regola esplicita, giudizio esperto, autorizzazione, urgenza e possibilità di reversibilità. Questa analisi rivela il giusto livello di automazione. Se la creazione del work order segue regole stabili e i campi sono disponibili, un workflow deterministico con validazione può essere appropriato. Se il triage di una deviazione dipende da contesto tecnico e impatto sulla qualità, l'AI può preparare evidenze e suggerire una categoria, ma un ruolo qualificato mantiene il giudizio. Se il prodotto può essere rilasciato o bloccato, il requisito di decisione umana e controllo formale rende inaccettabile un'autonomia non presidiata. Il gemba aiuta anche a scoprire il costo di adozione. Un alert che arriva su un dispositivo non consentito, durante una fase in cui le mani sono occupate o senza una chiara azione disponibile sarà ignorato anche se accurato. Il team osserva quindi canale, timing, carico cognitivo, linguaggio, turnazione e fallback. Condivide poi la mappa con chi svolge il lavoro e chiede correzioni. Questa restituzione riduce il rischio che il facilitatore trasformi una visita breve in una verità assoluta. Gli artefatti sono evidenze vive con data, perimetro e assunzioni, non descrizioni universali della fabbrica.`,
      `Discovery must include data and decisions, not only clicks. For each field, ask who creates it, under which definition, when it becomes available, how often it is missing, who may correct it, and what consequence an error causes. For each decision, record minimum information, explicit rules, expert judgment, authorization, urgency, and reversibility. This analysis reveals the right automation level. If work-order creation follows stable rules and fields are available, a deterministic workflow with validation may fit. If deviation triage depends on technical context and quality impact, AI may assemble evidence and suggest a category while a qualified role retains judgment. If a product can be released or blocked, formal control and human decision requirements make unattended autonomy unacceptable. Gemba work also exposes adoption cost. An alert delivered on an unsuitable device, while hands are occupied, or without a clear available action will be ignored even when accurate. The team observes channel, timing, cognitive load, language, shift patterns, and fallback. It then reviews the map with the people doing the job and requests corrections. This playback reduces the risk that a short visit becomes an absolute truth. Artifacts are dated evidence with scope and assumptions, not universal descriptions of the factory.`
    ),
    t(
      `La stakeholder map traduce il processo in responsabilità e interessi. Un elenco di nomi non basta. Per ciascun ruolo si registrano outcome atteso, decisioni possedute, conoscenza, rischio percepito, impatto del cambiamento, autorità e modalità di coinvolgimento. Operations può cercare capacità e stabilità; manutenzione diagnosi più rapida e un backlog gestibile; Quality tracciabilità e controllo; OT disponibilità e confini sicuri; IT manutenibilità e integrazione; cybersecurity riduzione delle superfici d'attacco; finanza evidenza economica; operatori utilità e carico sostenibile. Questi interessi non sono ostacoli da superare, ma requisiti del sistema. Una matrice influenza-impatto aiuta a decidere la cadenza, ma non sostituisce ownership. Per il pilot si nomina uno sponsor che rimuove impedimenti, un product owner responsabile dell'outcome, un process owner che accetta il nuovo workflow, data owner e system owner, Quality e security approver quando necessari, utenti pilota e supporto operativo. Una RACI può chiarire attività specifiche, ma ogni decisione deve avere una sola accountability riconoscibile. Il Technical Lead usa un registro di assunzioni e domande aperte: percentuale di eventi correttamente codificati, tempo disponibile per confermare un alert, possibilità di integrazione, regola di escalation, durata necessaria per un confronto. Ogni assunzione critica riceve owner, prova e data. In questo modo la discovery non termina con un workshop, ma converge verso una scelta sperimentabile. L'output minimo è una mappa current-state validata, una lista di perdite e vincoli, la decisione target, stakeholder e ownership, dati richiesti, rischi iniziali e prossimo test. Solo allora la discussione sulla soluzione ha un terreno comune.`,
      `A stakeholder map translates process into responsibility and interest. A list of names is not enough. For every role, record the desired outcome, owned decisions, knowledge, perceived risk, change impact, authority, and engagement method. Operations may seek capacity and stability; maintenance wants faster diagnosis and a manageable backlog; Quality needs traceability and control; OT protects availability and safe boundaries; IT needs maintainability and integration; cybersecurity limits attack paths; finance needs economic evidence; operators need utility and sustainable workload. These interests are system requirements, not obstacles to overcome. An influence-impact matrix helps set engagement cadence but does not replace ownership. A pilot names a sponsor who removes impediments, a product owner accountable for the outcome, a process owner who accepts the workflow, data and system owners, Quality and security approvers where needed, pilot users, and operational support. A RACI can clarify specific activities, but each decision needs one recognizable accountability. The Technical Lead keeps an assumption and question register: percentage of correctly coded events, time available to confirm an alert, integration feasibility, escalation rules, and duration required for comparison. Every critical assumption receives an owner, test, and date. Discovery then converges toward a testable choice rather than ending with a workshop. Its minimum output is a validated current-state map, a list of losses and constraints, the target decision, stakeholders and ownership, required data, initial risks, and the next test. Only then does solution design have common ground.`
    ),
    t(
      `Una singola visita non rappresenta tutti i turni. Il piano di osservazione campiona condizioni normali, picchi, cambi formato e almeno un'eccezione, coinvolgendo persone con esperienza diversa. Il team cerca evidenze che contraddicano la prima ipotesi, non soltanto conferme. Registra quanto il comportamento possa cambiare perché qualcuno osserva e confronta note, log e interviste senza raccogliere dati personali non necessari. Se due fonti divergono, la divergenza diventa una domanda da testare. Questo rigore evita di automatizzare una scorciatoia occasionale o di progettare sul turno più disponibile. Prima del solution design, utenti e process owner accettano la mappa come rappresentazione sufficiente del perimetro, non come certificazione perfetta. Le parti ancora incerte restano visibili nel registro e influenzano ampiezza, durata e controlli del pilot.`,
      `A single visit cannot represent every shift. The observation plan samples normal conditions, peaks, changeovers, and at least one exception, involving people with different levels of experience. The team actively looks for evidence that contradicts its first hypothesis rather than collecting confirmation only. It records how behavior may change under observation and compares notes, logs, and interviews without collecting unnecessary personal data. When two sources differ, the divergence becomes a question to test. This rigor prevents automating a temporary workaround or designing around the most available shift. Before solution design, users and the process owner accept the map as a sufficient representation of scope, not a claim of perfection. Remaining uncertainties stay visible in the register and shape the pilot's breadth, duration, and controls.`
    )
  ],
  keyPoints: [
    t('Osservare casi reali e separare fatti, interpretazioni e assunzioni.', 'Observe real cases and separate facts, interpretations, and assumptions.'),
    t('Mappare dati e decisioni oltre ai passaggi visibili.', 'Map data and decisions in addition to visible steps.'),
    t('Trattare gli interessi degli stakeholder come requisiti del sistema.', 'Treat stakeholder interests as system requirements.')
  ],
  microExamples: [microExample(
    'L’alert nel momento sbagliato',
    'The alert at the wrong moment',
    'Un alert accurato arriva mentre l’operatore non può usare il dispositivo e senza un’azione definita: l’errore è di workflow, non di comunicazione.',
    'An accurate alert arrives when the operator cannot use the device and has no defined action: this is a workflow problem, not a communications problem.'
  )],
  activities: [{
    prompt: t(
      'Prepara una mappa current-state dal trigger di microfermata alla chiusura del work order. Includi decisioni, dati, handoff, eccezioni, attese e cinque stakeholder con outcome e autorità.',
      'Prepare a current-state map from a micro-stop trigger to work-order closure. Include decisions, data, handoffs, exceptions, waiting, and five stakeholders with outcomes and authority.'
    ),
    hints: [
      t('Segui un caso reale e marca separatamente osservazioni e assunzioni.', 'Follow one real case and label observations separately from assumptions.'),
      t('Chiudi il ciclo con feedback sulla causa e sull’esito.', 'Close the loop with feedback on cause and outcome.')
    ],
    modelSolution: t(
      'Trigger macchina -> l’operatore verifica stato e contesto -> il supervisore di turno decide se l’evento richiede un work order usando codice, durata, stato linea e osservazione -> il coordinatore manutenzione assegna priorità usando criticità asset, sintomi e impatto sicurezza-qualità -> il tecnico diagnostica -> il responsabile manutenzione autorizza l’intervento usando diagnosi, permesso e stato sicuro -> operatore e tecnico provano la ripartenza -> il supervisore manutenzione accetta causa ed esito per la chiusura. Le attese a ogni handoff sono misurate. Eccezione uno: se esiste un work order aperto, il coordinatore collega l’evento senza creare un duplicato. Eccezione due: se emerge un possibile impatto prodotto, il workflow sospende l’automazione e Quality possiede valutazione ed escalation. Eccezione tre: se l’integrazione non è disponibile, l’operatore usa il fallback manuale e IT riconcilia il record. Operations cerca continuità e rischia alert tardivi; manutenzione cerca diagnosi completa e rischia backlog; Quality cerca tracciabilità e rischia una classificazione impropria; OT cerca disponibilità e rischia accessi non controllati; IT cerca integrazione manutenibile e rischia record divergenti. Le assunzioni su completezza dati e tempo di conferma hanno owner, prova e data.',
      'Machine trigger -> the operator verifies state and context -> the shift supervisor decides whether the event requires a work order using code, duration, line state, and observation -> the maintenance coordinator assigns priority using asset criticality, symptoms, and safety-quality impact -> the technician diagnoses -> the maintenance manager authorizes intervention using diagnosis, permit, and safe state -> operator and technician test restart -> the maintenance supervisor accepts cause and outcome for closure. Waiting at every handoff is measured. Exception one: when an open work order exists, the coordinator links the event without creating a duplicate. Exception two: when potential product impact appears, the workflow suspends automation and Quality owns assessment and escalation. Exception three: when integration is unavailable, the operator uses the manual fallback and IT reconciles the record. Operations seeks continuity and risks late alerts; maintenance seeks complete diagnosis and risks backlog; Quality seeks traceability and risks improper classification; OT seeks availability and risks uncontrolled access; IT seeks maintainable integration and risks divergent records. Assumptions about data completeness and confirmation time have an owner, test, and date.'
    ),
    solutionArtifact: {
      decisions: [
        {
          decision: t('Creare o non creare il work order', 'Create or do not create the work order'),
          inputs: [
            t('Codice evento, durata e stato della linea', 'Event code, duration, and line state'),
            t('Osservazione dell’operatore e ordine in esecuzione', 'Operator observation and active production order')
          ],
          owner: t('Supervisore di turno Operations', 'Operations shift supervisor')
        },
        {
          decision: t('Assegnare priorità e presa in carico', 'Assign priority and acceptance'),
          inputs: [
            t('Criticità dell’asset e sintomi registrati', 'Asset criticality and recorded symptoms'),
            t('Impatto potenziale su sicurezza, qualità e continuità', 'Potential safety, quality, and continuity impact')
          ],
          owner: t('Coordinatore manutenzione', 'Maintenance coordinator')
        },
        {
          decision: t('Autorizzare l’intervento', 'Authorize intervention'),
          inputs: [
            t('Diagnosi tecnica e attività proposta', 'Technical diagnosis and proposed work'),
            t('Permesso applicabile e conferma dello stato sicuro', 'Applicable permit and safe-state confirmation')
          ],
          owner: t('Responsabile manutenzione', 'Maintenance manager')
        },
        {
          decision: t('Accettare causa ed esito e chiudere', 'Accept cause and outcome and close'),
          inputs: [
            t('Esito della prova di ripartenza', 'Restart-test result'),
            t('Causa confermata, parti usate e tempo di intervento', 'Confirmed cause, parts used, and intervention time')
          ],
          owner: t('Supervisore manutenzione', 'Maintenance supervisor')
        }
      ],
      exceptions: [
        {
          condition: t('Esiste già un work order aperto per lo stesso evento e asset.', 'An open work order already exists for the same event and asset.'),
          response: t('Collegare l’evento al record aperto e non creare un duplicato.', 'Link the event to the open record and do not create a duplicate.'),
          owner: t('Coordinatore manutenzione', 'Maintenance coordinator')
        },
        {
          condition: t('L’evento indica un possibile impatto sul prodotto.', 'The event indicates potential product impact.'),
          response: t('Sospendere l’automazione, preservare le evidenze e avviare l’escalation formale.', 'Suspend automation, preserve evidence, and start formal escalation.'),
          owner: t('Quality', 'Quality')
        },
        {
          condition: t('L’integrazione con il sistema work-order non è disponibile.', 'The work-order system integration is unavailable.'),
          response: t('Usare il fallback manuale e riconciliare evento e record al ripristino.', 'Use the manual fallback and reconcile event and record after recovery.'),
          owner: t('IT service owner', 'IT service owner')
        }
      ],
      stakeholders: [
        { role: t('Operations', 'Operations'), outcome: t('Continuità stabile', 'Stable continuity'), risk: t('Alert tardivi o inutilizzabili', 'Late or unusable alerts') },
        { role: t('Manutenzione', 'Maintenance'), outcome: t('Diagnosi completa e rapida', 'Complete and timely diagnosis'), risk: t('Backlog o priorità errata', 'Backlog or incorrect priority') },
        { role: t('Quality', 'Quality'), outcome: t('Tracciabilità e controllo prodotto', 'Traceability and product control'), risk: t('Classificazione impropria', 'Improper classification') },
        { role: t('OT', 'OT'), outcome: t('Disponibilità e confini sicuri', 'Availability and safe boundaries'), risk: t('Accesso non controllato', 'Uncontrolled access') },
        { role: t('IT', 'IT'), outcome: t('Integrazione manutenibile', 'Maintainable integration'), risk: t('Record divergenti', 'Divergent records') }
      ]
    },
    rubric: [
      t('2 punti: confine end-to-end e almeno due eccezioni; 1: flusso parziale; 0: lista di schermate.', '2 points: end-to-end boundary and at least two exceptions; 1: partial flow; 0: list of screens.'),
      t('2 punti: decision owner e dati per ogni decisione; 1: ownership incompleta; 0: nessuna accountability.', '2 points: decision owner and data for every decision; 1: incomplete ownership; 0: no accountability.'),
      t('2 punti: stakeholder collegati a outcome e rischi; 1: solo ruoli; 0: stakeholder assenti.', '2 points: stakeholders linked to outcomes and risks; 1: roles only; 0: stakeholders absent.')
    ]
  }],
  checkpoint: checkpoint(
    'Qual è la nota gemba più utile?',
    'Which gemba note is most useful?',
    [
      ['Il processo è inefficiente.', 'The process is inefficient.', 'È un giudizio senza evidenza osservabile.', 'This is a judgment without observable evidence.'],
      ['Alle 10:14 il codice viene copiato dal display a un foglio e poi comunicato per telefono.', 'At 10:14 the code is copied from the display to a spreadsheet and then communicated by phone.', 'Descrive fatto, sequenza e handoff verificabili.', 'This records a verifiable fact, sequence, and handoff.'],
      ['Serve subito una piattaforma AI.', 'An AI platform is needed immediately.', 'Propone una soluzione prima di capire perdita e decisione.', 'This proposes a solution before understanding loss and decision.']
    ],
    1
  ),
  sourceIds: [
    'toyota-way-genchi-genbutsu',
    'lean-enterprise-gemba',
    'uk-government-stakeholder-mapping',
    'ahrq-raci-chart',
    'pmi-operations'
  ]
}

const automationCriteria = [
  { id: 'businessValue', weight: 15, label: t('Valore di business', 'Business value'), favorableAnchor: t('5 = perdita grande, misurata e influenzabile', '5 = large, measured, addressable loss') },
  { id: 'frequencyEffort', weight: 10, label: t('Frequenza e sforzo manuale', 'Frequency and manual effort'), favorableAnchor: t('5 = attività frequente con elevato lavoro ripetitivo', '5 = frequent activity with high repetitive effort') },
  { id: 'processStability', weight: 10, label: t('Stabilità del processo', 'Process stability'), favorableAnchor: t('5 = regole e varianti note e stabili', '5 = known, stable rules and variants') },
  { id: 'dataReadiness', weight: 10, label: t('Data readiness', 'Data readiness'), favorableAnchor: t('5 = dati accessibili, completi, contestualizzati e posseduti', '5 = accessible, complete, contextualized, owned data') },
  { id: 'integrationFeasibility', weight: 10, label: t('Fattibilità di integrazione', 'Integration feasibility'), favorableAnchor: t('5 = interfacce autorizzate e confini semplici', '5 = authorized interfaces and simple boundaries') },
  { id: 'riskReversibility', weight: 15, label: t('Rischio e reversibilità', 'Risk and reversibility'), favorableAnchor: t('5 = conseguenze contenute e rollback immediato', '5 = contained consequences and immediate rollback') },
  { id: 'regulatoryQuality', weight: 10, label: t('Impatto regolatorio e qualità', 'Regulatory and quality impact'), favorableAnchor: t('5 = nessuna decisione prodotto e controlli chiari', '5 = no product decision and clear controls') },
  { id: 'humanJudgment', weight: 10, label: t('Giudizio umano richiesto', 'Required human judgment'), favorableAnchor: t('5 = regole esplicite, giudizio qualificato minimo', '5 = explicit rules, minimal qualified judgment') },
  { id: 'adoption', weight: 5, label: t('Complessità di adozione', 'Adoption complexity'), favorableAnchor: t('5 = inserimento naturale nel lavoro e basso carico', '5 = natural workflow fit and low burden') },
  { id: 'timeToValue', weight: 5, label: t('Tempo al valore', 'Time to value'), favorableAnchor: t('5 = test end-to-end rapido e circoscritto', '5 = rapid, bounded end-to-end test') }
]

const automationHardGates = [
  {
    id: 'no-autonomous-product-disposition',
    title: t('Nessuna disposizione autonoma del prodotto', 'No autonomous product disposition'),
    rule: t('Il candidato deve lasciare rilascio, blocco e disposizione nei controlli formali autorizzati.', 'The candidate must leave release, hold, and disposition within authorized formal controls.'),
    blocking: true
  },
  {
    id: 'meaningful-qualified-human-judgment',
    title: t('Giudizio umano qualificato significativo', 'Meaningful qualified human judgment'),
    rule: t('Quando la conseguenza richiede competenza qualificata, la persona deve conservare evidenze, tempo, autorità e possibilità di contestare.', 'When consequences require qualified expertise, the person must retain evidence, time, authority, and the ability to challenge.'),
    blocking: true
  }
]

const assessment = (score, confidence, evidenceIt, evidenceEn, rationaleIt, rationaleEn) => ({
  score,
  confidence,
  evidence: t(evidenceIt, evidenceEn),
  rationale: t(rationaleIt, rationaleEn)
})

const gateCheck = (gateId, passed, evidenceIt, evidenceEn, rationaleIt, rationaleEn) => ({
  gateId,
  passed,
  evidence: t(evidenceIt, evidenceEn),
  rationale: t(rationaleIt, rationaleEn)
})

const eligibleGateChecks = (humanEvidenceIt, humanEvidenceEn, humanRationaleIt, humanRationaleEn) => [
  gateCheck(
    'no-autonomous-product-disposition',
    true,
    'Il perimetro non rilascia, blocca né dispone il prodotto.',
    'The scope does not release, hold, or dispose of product.',
    'Le decisioni sul prodotto restano nel processo formale.',
    'Product decisions remain in the formal process.'
  ),
  gateCheck(
    'meaningful-qualified-human-judgment',
    true,
    humanEvidenceIt,
    humanEvidenceEn,
    humanRationaleIt,
    humanRationaleEn
  )
]

const automationCandidateInputs = [
  {
    id: 'maintenance-work-order',
    candidate: t('Creazione work order di manutenzione', 'Maintenance work-order creation'),
    evidenceBasis: t('Baseline ipotetica del caso: 42 eventi, 18 minuti mediani e 64,3 per cento di record completi.', 'Hypothetical case baseline: 42 events, 18 median minutes, and 64.3 percent complete records.'),
    assessments: {
      businessValue: assessment(4, 'high', 'La famiglia causa pesa 480 dei 1.260 minuti e il ritardo informativo è osservato.', 'The cause family accounts for 480 of 1,260 minutes and the information delay is observed.', 'La leva agisce su una perdita rilevante, ma non su tutto il downtime.', 'The lever addresses a material loss, but not all downtime.'),
      frequencyEffort: assessment(5, 'high', 'Quarantadue eventi in quattro settimane richiedono trascrizione e telefonata.', 'Forty-two events in four weeks require transcription and a phone call.', 'Frequenza e ripetizione rendono significativo il lavoro evitabile.', 'Frequency and repetition make avoidable effort material.'),
      processStability: assessment(4, 'medium', 'Trigger, campi obbligatori e duplicati hanno regole definite; le eccezioni sono mappate.', 'Trigger, required fields, and duplicates have defined rules; exceptions are mapped.', 'Il flusso è abbastanza stabile per un MVP, con conferma sulle varianti.', 'The flow is stable enough for an MVP, with confirmation for variants.'),
      dataReadiness: assessment(4, 'high', 'Asset, timestamp, evento e ordine sono disponibili, ma solo 27 record su 42 sono completi.', 'Asset, timestamp, event, and order are available, but only 27 of 42 records are complete.', 'I dati base esistono e la validazione affronta la lacuna di completezza.', 'Core data exists and validation addresses the completeness gap.'),
      integrationFeasibility: assessment(4, 'medium', 'Il disegno usa una lettura evento e una scrittura autorizzata nel sistema work-order.', 'The design uses event read access and one authorized write to the work-order system.', 'Il confine è limitato, ma API, identità e duplicati vanno provati.', 'The boundary is limited, but API, identity, and duplicates require testing.'),
      riskReversibility: assessment(5, 'high', 'La bozza richiede conferma e il fallback manuale rimane disponibile.', 'The draft requires confirmation and the manual fallback remains available.', 'Errori e indisponibilità sono contenibili e reversibili.', 'Errors and unavailability are containable and reversible.'),
      regulatoryQuality: assessment(4, 'high', 'Il workflow non determina lo stato prodotto e conserva audit di input, conferma ed esito.', 'The workflow does not determine product status and audits input, confirmation, and outcome.', 'Il controllo qualità resta separato, pur richiedendo tracciabilità.', 'Quality control remains separate, while traceability is still required.'),
      humanJudgment: assessment(4, 'high', 'Il tecnico conferma priorità e presa in carico; le regole compilano soltanto la bozza.', 'A technician confirms priority and acceptance; rules only populate the draft.', 'Il giudizio resta su diagnosi e azione, non sulla copiatura dei campi.', 'Judgment remains on diagnosis and action, not field copying.'),
      adoption: assessment(4, 'medium', 'La bozza entra nel passaggio esistente tra operatore e manutenzione.', 'The draft enters the existing handoff between operator and maintenance.', 'Riduce attrito, ma richiede training di turno e gestione degli override.', 'It reduces friction but requires shift training and override handling.'),
      timeToValue: assessment(4, 'high', 'Il test è limitato a una linea, una causa e sei settimane.', 'The test is limited to one line, one cause, and six weeks.', 'Il perimetro consente un confronto end-to-end rapido ma credibile.', 'The scope enables a rapid but credible end-to-end comparison.')
    },
    hardGateChecks: eligibleGateChecks(
      'Tecnico e responsabile manutenzione conservano conferma, diagnosi e autorizzazione.',
      'The technician and maintenance manager retain confirmation, diagnosis, and authorization.',
      'Il sistema elimina trascrizione, non il giudizio tecnico qualificato.',
      'The system removes transcription, not qualified technical judgment.'
    ),
    eligibleRecommendation: t('Selezionare per un MVP con validazione, autorizzazione e conferma tecnica.', 'Select for an MVP with validation, authorization, and technician confirmation.')
  },
  {
    id: 'quality-deviation-triage',
    candidate: t('Triage delle deviazioni di qualità', 'Quality deviation triage'),
    evidenceBasis: t('Scenario discovery da validare con volumi, classi e storico delle decisioni Quality.', 'Discovery scenario to validate with volumes, classes, and Quality decision history.'),
    assessments: {
      businessValue: assessment(4, 'medium', 'Il triage può ridurre attese investigative, ma manca una baseline numerica.', 'Triage may reduce investigation waits, but a numeric baseline is missing.', 'Il valore è plausibile e rilevante, non ancora quantificato.', 'Value is plausible and material, but not yet quantified.'),
      frequencyEffort: assessment(4, 'low', 'Il team riferisce casi ricorrenti e raccolta manuale; il volume deve essere misurato.', 'The team reports recurring cases and manual evidence gathering; volume must be measured.', 'Lo sforzo appare frequente, con confidenza bassa finché manca il conteggio.', 'Effort appears frequent, with low confidence until volume is counted.'),
      processStability: assessment(3, 'medium', 'Categorie note convivono con eccezioni e contesto tecnico variabile.', 'Known categories coexist with exceptions and variable technical context.', 'Una parte è strutturabile, ma il percorso non è completamente deterministico.', 'Part of the flow is structured, but the path is not fully deterministic.'),
      dataReadiness: assessment(3, 'low', 'Esistono pratiche storiche, ma qualità delle etichette e completezza non sono profilate.', 'Historical records exist, but label quality and completeness are not profiled.', 'I dati sono potenziali, non ancora pronti per una promessa di performance.', 'Data is potentially useful, not ready for a performance promise.'),
      integrationFeasibility: assessment(3, 'low', 'Il caso richiede QMS, documenti e contesto di produzione con permessi diversi.', 'The case needs QMS, documents, and production context under different permissions.', 'Le integrazioni sono realizzabili ma più numerose e sensibili.', 'Integrations are feasible but more numerous and sensitive.'),
      riskReversibility: assessment(3, 'medium', 'Shadow mode e proposta reversibile limitano il rischio; un triage errato può ritardare escalation.', 'Shadow mode and reversible suggestions limit risk; incorrect triage can delay escalation.', 'Il rischio è controllabile soltanto mantenendo revisione e monitoraggio.', 'Risk is manageable only with review and monitoring.'),
      regulatoryQuality: assessment(2, 'high', 'La classificazione influenza un processo Quality e le sue priorità.', 'Classification influences a Quality process and its priorities.', 'L’impatto richiede controllo formale anche senza rilascio autonomo.', 'The impact requires formal control even without autonomous release.'),
      humanJudgment: assessment(2, 'high', 'Contesto, gravità e impatto richiedono una valutazione Quality qualificata.', 'Context, severity, and impact require qualified Quality assessment.', 'Il sistema può preparare evidenze, non sostituire il giudizio.', 'The system may prepare evidence, not replace judgment.'),
      adoption: assessment(3, 'medium', 'I reviewer possono confrontare proposta e fonti, ma serve un workflow di override.', 'Reviewers can compare the suggestion and sources, but an override workflow is needed.', 'L’assistenza può inserirsi nel lavoro con progettazione partecipata.', 'Assistance can fit the work with participatory design.'),
      timeToValue: assessment(3, 'low', 'Servono campione etichettato, permessi, shadow mode e criteri di escalation.', 'A labeled sample, permissions, shadow mode, and escalation criteria are required.', 'Il pilot è possibile, ma la preparazione supera un quick win.', 'A pilot is possible, but preparation exceeds a quick win.')
    },
    hardGateChecks: eligibleGateChecks(
      'Quality riceve fonti e proposta, poi classifica e approva nel processo formale.',
      'Quality receives sources and a suggestion, then classifies and approves in the formal process.',
      'Il perimetro di assistenza preserva autorità, tempo e contestazione.',
      'The assistance boundary preserves authority, time, and challenge.'
    ),
    eligibleRecommendation: t('Esplorare come supporto decisionale in shadow mode, senza decisione autonoma.', 'Explore as decision support in shadow mode, without autonomous decisions.')
  },
  {
    id: 'production-reporting',
    candidate: t('Produzione del report di produzione', 'Production reporting'),
    evidenceBasis: t('Quick win ipotetico con frequenza per turno; valore operativo oltre il tempo amministrativo ancora da provare.', 'Hypothetical per-shift quick win; operational value beyond administrative time remains unproven.'),
    assessments: {
      businessValue: assessment(2, 'medium', 'È visibile il tempo di compilazione, non una perdita operativa downstream misurata.', 'Reporting time is visible, but no downstream operational loss is measured.', 'Il risparmio amministrativo da solo limita il valore strategico.', 'Administrative savings alone limit strategic value.'),
      frequencyEffort: assessment(5, 'high', 'Il report viene ricostruito a ogni turno da più sorgenti.', 'The report is reconstructed every shift from multiple sources.', 'Frequenza e copia manuale rendono alto lo sforzo ripetitivo.', 'Frequency and manual copying make repetitive effort high.'),
      processStability: assessment(5, 'high', 'Template, formule, cadenza e destinatari sono definiti.', 'Template, formulas, cadence, and recipients are defined.', 'Regole stabili favoriscono automazione deterministica.', 'Stable rules favor deterministic automation.'),
      dataReadiness: assessment(4, 'medium', 'I dati esistono nei sistemi di produzione, con alcune riconciliazioni manuali.', 'Data exists in production systems, with some manual reconciliation.', 'La disponibilità è buona, ma definizioni e missing data vanno allineati.', 'Availability is good, but definitions and missing data need alignment.'),
      integrationFeasibility: assessment(4, 'medium', 'Sono richieste letture e aggregazioni senza comandi agli asset.', 'Read access and aggregation are required without commands to assets.', 'Il flusso read-only riduce complessità, restano connettori e timestamp.', 'The read-only flow lowers complexity, while connectors and timestamps remain.'),
      riskReversibility: assessment(5, 'high', 'Il report può essere confrontato e scartato prima della pubblicazione.', 'The report can be compared and discarded before publication.', 'Errori sono facilmente rilevabili, contenibili e reversibili.', 'Errors are readily detectable, containable, and reversible.'),
      regulatoryQuality: assessment(4, 'medium', 'Il report non dispone prodotto ma deve conservare definizioni e provenienza.', 'The report does not dispose of product but must preserve definitions and provenance.', 'Impatto controllabile con validazione e audit dei calcoli.', 'Impact is manageable through validation and calculation audit.'),
      humanJudgment: assessment(5, 'high', 'Le formule sono esplicite; la persona esamina soltanto eccezioni e commenti.', 'Formulas are explicit; a person reviews only exceptions and commentary.', 'La maggior parte del compito è deterministica e ripetibile.', 'Most of the task is deterministic and repeatable.'),
      adoption: assessment(4, 'medium', 'Sostituisce copia e riconciliazione nel rituale già esistente.', 'It replaces copying and reconciliation in an existing routine.', 'Il fit è alto se i destinatari concordano definizioni e fallback.', 'Fit is high if recipients agree on definitions and fallback.'),
      timeToValue: assessment(5, 'medium', 'Un report parallelo può essere testato senza cambiare decisioni operative.', 'A parallel report can be tested without changing operational decisions.', 'Il confronto rapido rende il caso un possibile quick win.', 'Rapid comparison makes the case a possible quick win.')
    },
    hardGateChecks: eligibleGateChecks(
      'Il responsabile di turno verifica eccezioni e approva la pubblicazione.',
      'The shift owner reviews exceptions and approves publication.',
      'Il giudizio resta sui commenti e sulle anomalie, non sui calcoli ripetitivi.',
      'Judgment remains on commentary and anomalies, not repetitive calculations.'
    ),
    eligibleRecommendation: t('Tenere nel portafoglio come quick win, chiarendo il valore oltre il tempo amministrativo.', 'Keep in the portfolio as a quick win, clarifying value beyond administrative time.')
  },
  {
    id: 'controlled-sop-search',
    candidate: t('Ricerca di SOP controllate', 'Controlled SOP search'),
    evidenceBasis: t('Caso ipotetico da precedere con inventario di versioni, metadata, permessi e query reali.', 'Hypothetical case requiring an inventory of versions, metadata, permissions, and real queries.'),
    assessments: {
      businessValue: assessment(3, 'low', 'Gli utenti riferiscono tempo di ricerca, ma non esiste ancora una baseline.', 'Users report search time, but no baseline exists yet.', 'Il beneficio è plausibile e deve essere misurato con task reali.', 'The benefit is plausible and must be measured with real tasks.'),
      frequencyEffort: assessment(4, 'low', 'La consultazione è descritta come frequente; mancano log o campionamento.', 'Consultation is described as frequent; logs or sampling are missing.', 'La frequenza probabile giustifica discovery, non un beneficio dichiarato.', 'Likely frequency justifies discovery, not a claimed benefit.'),
      processStability: assessment(4, 'medium', 'Ricerca, citazione e apertura della fonte seguono un flusso stabile; le SOP cambiano per revisione.', 'Search, citation, and source opening follow a stable flow; SOPs change by revision.', 'Il workflow è stabile se versione e stato sono espliciti.', 'The workflow is stable when version and status are explicit.'),
      dataReadiness: assessment(3, 'low', 'I documenti controllati esistono, ma metadata e ACL non sono stati profilati.', 'Controlled documents exist, but metadata and ACLs have not been profiled.', 'La presenza dei file non prova readiness per retrieval autorizzato.', 'File existence does not prove readiness for authorized retrieval.'),
      integrationFeasibility: assessment(3, 'low', 'Repository, identità e motore di ricerca richiedono connettori e filtri.', 'Repository, identity, and search require connectors and filters.', 'Il perimetro è leggibile ma dipende da access control end-to-end.', 'The scope is read-oriented but depends on end-to-end access control.'),
      riskReversibility: assessment(4, 'medium', 'La risposta è read-only, citata e può rifiutare; una versione errata può comunque fuorviare.', 'The answer is read-only, cited, and may refuse; a wrong version can still mislead.', 'Citazioni e rinvio alla fonte riducono un rischio non nullo.', 'Citations and source referral reduce but do not eliminate risk.'),
      regulatoryQuality: assessment(3, 'high', 'La risposta può influenzare lavoro regolamentato, mentre la SOP ufficiale resta autorità.', 'The answer may influence regulated work, while the official SOP remains authoritative.', 'Versione, permessi e refusal richiedono controlli espliciti.', 'Version, permissions, and refusal require explicit controls.'),
      humanJudgment: assessment(3, 'high', 'L’utente deve verificare fonte, revisione e applicabilità al contesto.', 'The user must verify source, revision, and applicability to context.', 'La ricerca assiste la localizzazione, non interpreta ogni caso operativo.', 'Search assists location, not interpretation of every operational case.'),
      adoption: assessment(4, 'medium', 'La ricerca riduce passaggi se mostra subito documento, revisione e citazione.', 'Search reduces steps when it immediately shows document, revision, and citation.', 'Il fit è buono, con training su limiti e refusal.', 'Fit is good, with training on limitations and refusal.'),
      timeToValue: assessment(4, 'low', 'Un corpus circoscritto è pilotabile dopo bonifica di metadata e permessi.', 'A bounded corpus can be piloted after metadata and permission cleanup.', 'Il test può essere rapido solo dopo la readiness documentale.', 'The test can be rapid only after document readiness.')
    },
    hardGateChecks: eligibleGateChecks(
      'L’utente vede la fonte ufficiale e decide come applicarla; il sistema può rifiutare.',
      'The user sees the official source and decides how to apply it; the system may refuse.',
      'Il confine preserva verifica e contestazione della risposta.',
      'The boundary preserves verification and challenge of the response.'
    ),
    eligibleRecommendation: t('Preparare data readiness su versioni e permessi prima del pilot.', 'Prepare document-version and permission readiness before a pilot.')
  },
  {
    id: 'autonomous-product-release',
    candidate: t('Decisione autonoma di rilascio prodotto', 'Autonomous product-release decision'),
    evidenceBasis: t('Ipotesi deliberatamente stressata per mostrare che un punteggio non supera i gate di controllo prodotto.', 'Deliberately stressed hypothesis showing that a score cannot override product-control gates.'),
    assessments: {
      businessValue: assessment(5, 'low', 'Una decisione più rapida avrebbe valore potenziale, ma non esiste una baseline validata.', 'A faster decision has potential value, but no validated baseline exists.', 'Il valore teorico è elevato e molto incerto.', 'Theoretical value is high and highly uncertain.'),
      frequencyEffort: assessment(4, 'low', 'La decisione ricorre per lotti o ordini; il volume reale non è noto.', 'The decision recurs by lot or order; actual volume is unknown.', 'La ripetizione è plausibile ma deve essere misurata.', 'Repetition is plausible but must be measured.'),
      processStability: assessment(2, 'high', 'Eccezioni, deviazioni ed evidenze contestuali cambiano il percorso decisionale.', 'Exceptions, deviations, and contextual evidence change the decision path.', 'La variabilità limita regole autonome generalizzabili.', 'Variability limits generalizable autonomous rules.'),
      dataReadiness: assessment(3, 'low', 'Record di qualità possono esistere, ma sufficienza, lineage e completezza non sono provati.', 'Quality records may exist, but sufficiency, lineage, and completeness are unproven.', 'Dati disponibili non equivalgono a evidenza sufficiente per il rilascio.', 'Available data is not equivalent to sufficient release evidence.'),
      integrationFeasibility: assessment(2, 'low', 'Servirebbero più sistemi qualità e produzione con autorizzazioni ad alta conseguenza.', 'Multiple quality and production systems with high-consequence authorization would be required.', 'Superficie e complessità di integrazione sono elevate.', 'Integration surface and complexity are high.'),
      riskReversibility: assessment(1, 'high', 'Un rilascio errato può propagare prodotto oltre il controllo immediato.', 'An incorrect release may move product beyond immediate control.', 'La conseguenza è alta e non pienamente reversibile.', 'The consequence is high and not fully reversible.'),
      regulatoryQuality: assessment(1, 'high', 'Il candidato prenderebbe direttamente una decisione di disposizione prodotto.', 'The candidate would directly make a product-disposition decision.', 'Il perimetro interferisce con un controllo Quality formale.', 'The scope interferes with a formal Quality control.'),
      humanJudgment: assessment(1, 'high', 'La valutazione richiede evidenze, contesto e accountability di personale qualificato.', 'Assessment requires evidence, context, and accountability from qualified personnel.', 'Il giudizio umano è sostanza della decisione, non attrito amministrativo.', 'Human judgment is the substance of the decision, not administrative friction.'),
      adoption: assessment(1, 'high', 'Il disegno rimuoverebbe autorità da un ruolo responsabile della decisione.', 'The design would remove authority from a role accountable for the decision.', 'Il cambiamento di responsabilità è inaccettabile nel perimetro proposto.', 'The proposed responsibility change is unacceptable.'),
      timeToValue: assessment(1, 'high', 'Validazione, change control e dimostrazione di sicurezza sarebbero estesi.', 'Validation, change control, and safety evidence would be extensive.', 'Non è un MVP rapido né reversibile.', 'It is neither a rapid nor reversible MVP.')
    },
    hardGateChecks: [
      gateCheck(
        'no-autonomous-product-disposition',
        false,
        'Il candidato assegna al sistema il rilascio autonomo del prodotto.',
        'The candidate assigns autonomous product release to the system.',
        'La proposta oltrepassa il controllo formale di disposizione prodotto.',
        'The proposal crosses the formal product-disposition control.'
      ),
      gateCheck(
        'meaningful-qualified-human-judgment',
        false,
        'Il ruolo qualificato non conserva la decisione finale né un override significativo.',
        'The qualified role does not retain the final decision or a meaningful override.',
        'Qualified human judgment is required to interpret evidence and own release.',
        'Qualified human judgment is required to interpret evidence and own release.'
      )
    ],
    eligibleRecommendation: t('Non applicabile: il candidato fallisce gate bloccanti.', 'Not applicable: the candidate fails blocking gates.')
  }
]

const weightedScore = (candidate) => automationCriteria.reduce(
  (total, criterion) => total + criterion.weight * candidate.assessments[criterion.id].score,
  0
) / 5

const evaluatedCandidates = automationCandidateInputs.map((candidate) => {
  const failedHardGates = candidate.hardGateChecks.filter(({ passed }) => !passed)
  const { eligibleRecommendation, ...candidateRecord } = candidate
  return {
    ...candidateRecord,
    weightedScore: weightedScore(candidate),
    failedHardGateIds: failedHardGates.map(({ gateId }) => gateId),
    recommendation: failedHardGates.length
      ? t(
          `Rifiutare: ${failedHardGates.map(({ rationale }) => rationale.it).join(' ')}`,
          `Reject: ${failedHardGates.map(({ rationale }) => rationale.en).join(' ')}`
        )
      : eligibleRecommendation
  }
})

const recommendedCandidateId = evaluatedCandidates
  .filter(({ failedHardGateIds }) => failedHardGateIds.length === 0)
  .reduce((best, candidate) => candidate.weightedScore > best.weightedScore ? candidate : best)
  .id

const automationMatrix = evaluatedCandidates.map((candidate) => ({
  ...candidate,
  portfolioDecision: candidate.failedHardGateIds.length
    ? 'rejected'
    : candidate.id === recommendedCandidateId ? 'selected' : 'deferred'
}))

const unitFive = {
  id: 'automation-scoring-and-portfolio',
  eyebrow: t('05 · Prioritizzazione', '05 · Prioritization'),
  title: t(
    'Scoring delle opportunità di automazione e priorità di portafoglio',
    'Automation opportunity scoring and portfolio prioritization'
  ),
  objective: t(
    'Applicare criteri pesati e gate di rischio a cinque opportunità, scegliere un candidato e spiegare perché le alternative sono selezionate, differite o rifiutate.',
    'Apply weighted criteria and risk gates to five opportunities, choose a candidate, and explain why alternatives are selected, deferred, or rejected.'
  ),
  estimatedMinutes: 9,
  theory: [
    t(
      `La prioritizzazione dell'automazione non è una gara tra idee interessanti. È una decisione di portafoglio sotto vincoli di valore, capacità, dati, integrazione e rischio. Il primo filtro chiede se il processo è degno di essere automatizzato. Un'attività frequente e manuale non è automaticamente una buona candidata: se il processo cambia ogni settimana, gli input non sono affidabili o il giudizio umano è la sostanza della decisione, l'automazione può irrigidire errori e aumentare eccezioni. Prima si elimina lavoro non necessario, si chiariscono regole e ownership, poi si valuta la tecnologia. La scorecard di questo modulo usa dieci criteri su scala da 1, sfavorevole, a 5, favorevole: business value; frequenza e sforzo manuale; stabilità del processo; data readiness; fattibilità d'integrazione; rischio e reversibilità; impatto regolatorio e qualità; quantità di giudizio umano richiesto; complessità di adozione; time to value. Per gli ultimi quattro criteri, un punteggio alto indica una condizione favorevole: rischio contenuto, impatto controllabile, basso bisogno di giudizio insostituibile, adozione praticabile e valore rapido. I pesi sono rispettivamente 15, 10, 10, 10, 10, 15, 10, 10, 5 e 5 per cento. Il punteggio normalizzato è la somma di peso per voto divisa per 5. Un 85 indica forte priorità relativa nel set analizzato, non una probabilità dell'85 per cento di successo. Ogni voto deve avere evidenza e livello di confidenza. Dati mancanti non meritano un tre neutrale automatico: diventano un'assunzione da verificare, perché l'incertezza è informazione decisionale.`,
      `Automation prioritization is not a contest among interesting ideas. It is a portfolio decision under value, capacity, data, integration, and risk constraints. The first filter asks whether the process deserves automation. Frequent manual work is not automatically a good candidate. If the process changes weekly, inputs are unreliable, or human judgment is the substance of the decision, automation may harden errors and multiply exceptions. Remove unnecessary work and clarify rules and ownership before selecting technology. This module's scorecard uses ten criteria rated from 1, unfavorable, to 5, favorable: business value; frequency and manual effort; process stability; data readiness; integration feasibility; risk and reversibility; regulatory and quality impact; required human judgment; adoption complexity; and time to value. For the final risk-related criteria, a high score means favorable conditions: contained risk, manageable impact, little need for irreplaceable judgment, feasible adoption, and rapid value. The weights are 15, 10, 10, 10, 10, 15, 10, 10, 5, and 5 percent. The normalized score is the sum of weight times rating divided by 5. A score of 85 means strong relative priority in the analyzed set, not an 85 percent probability of success. Every rating needs evidence and a confidence level. Missing data should not automatically receive a neutral three. It becomes an assumption to test because uncertainty is decision information.`
    ),
    t(
      `Applichiamo la matrice a cinque candidati ipotetici. La creazione del work order di manutenzione ottiene 85 su 100: valore 4, frequenza 5, processo 4, dati 4, integrazione 4, rischio e reversibilità 5, impatto regolatorio 4, basso fabbisogno di giudizio 4, adozione 4 e tempo al valore 4. Il calcolo è: 15 per 4, 10 per 5, 10 per 4, 10 per 4, 10 per 4, 15 per 5, 10 per 4, 10 per 4, 5 per 4 e 5 per 4; la somma 425 divisa 5 produce 85. Il reporting di produzione arriva a 84: è stabile, frequente e reversibile, ma il valore di business è 2 perché il risparmio amministrativo non dimostra da solo un miglioramento operativo. Rimane un quick win utile, non il primo esperimento strategico. La ricerca di SOP ottiene 69: promette accesso più rapido, ma versioni, metadata e permessi richiedono preparazione. Il triage di deviazioni ottiene 61: ha valore, ma contesto, conseguenze sulla qualità e giudizio esperto richiedono shadow mode e approvazione. La decisione autonoma di rilascio prodotto ottiene 46 nonostante un valore potenziale 5. Rischio, scarsa reversibilità, impatto regolatorio e giudizio umano qualificato ricevono 1. Soprattutto, un gate la esclude: il rilascio non viene delegato senza un framework autorizzato, evidenze e controllo umano significativo. Una media non può compensare un rischio inaccettabile. La matrice ordina la discussione; i gate proteggono confini non negoziabili.`,
      `Apply the matrix to five hypothetical candidates. Maintenance work-order creation scores 85 out of 100: value 4, frequency 5, process 4, data 4, integration 4, risk and reversibility 5, regulatory impact 4, low human-judgment requirement 4, adoption 4, and time to value 4. The calculation is 15 times 4, 10 times 5, 10 times 4, 10 times 4, 10 times 4, 15 times 5, 10 times 4, 10 times 4, 5 times 4, and 5 times 4. The total of 425 divided by 5 gives 85. Production reporting reaches 84. It is stable, frequent, and reversible, but business value is 2 because administrative time savings alone do not demonstrate an operational improvement. It remains a useful quick win rather than the first strategic experiment. Controlled SOP search scores 69: faster access is promising, but versions, metadata, and permissions need preparation. Deviation triage scores 61: it has value, while quality context, consequences, and expert judgment call for shadow mode and approval. Autonomous product release scores 46 despite potential value of 5. Risk, poor reversibility, regulatory impact, and qualified human judgment score 1. More importantly, a gate excludes it: release is not delegated without an authorized framework, evidence, and meaningful human control. An average cannot offset unacceptable risk. The matrix structures discussion; gates protect non-negotiable boundaries.`
    ),
    t(
      `La raccomandazione è quindi un MVP di creazione del work order dopo eventi definiti, non un agente libero di ordinare interventi. Il trigger proviene da una condizione verificabile; il sistema recupera asset, timestamp, linea, codice evento e contesto dell'ordine; valida campi obbligatori e duplicati; propone priorità secondo regole approvate; un tecnico conferma o corregge; il runtime autorizza la scrittura e registra input, decisione, versione della regola ed esito. I KPI sono tempo mediano evento-work-order, completezza dei campi, duplicati, tempo di accettazione e minuti persi per le cause target. I guardrail sono richieste errate, backlog, falsi trigger, incidenti cybersecurity e override senza motivazione. Il reporting può procedere in parallelo soltanto se non sottrae le stesse persone critiche. SOP search entra in discovery sui documenti. Il triage deviazioni resta un esperimento di assistenza con Quality owner. Il rilascio autonomo è esplicitamente rifiutato perché il rischio sul prodotto e il bisogno di giudizio umano non sono problemi da ottimizzare via punteggio. Per gestire il portafoglio si aggiungono dipendenze, capacità del team, diversificazione e sequenza. Due use case con alto score possono competere per lo stesso connettore o process owner. Un quick win può finanziare fiducia, mentre un caso strategico costruisce una capacità riusabile. Ogni trimestre i punteggi vengono aggiornati con nuove evidenze; non si manipolano i pesi per far vincere l'idea dello sponsor. La decisione finale contiene candidato, alternative, assunzioni, gate, MVP, metriche, owner e data di revisione. Questa trasparenza permette di cambiare scelta senza fingere che il giudizio iniziale fosse infallibile.`,
      `The recommendation is therefore an MVP for work-order creation after defined events, not a free agent that orders interventions. A verifiable condition provides the trigger; the system retrieves asset, timestamp, line, event code, and order context; validates required fields and duplicates; proposes priority under approved rules; a technician confirms or corrects; and the runtime authorizes the write while logging inputs, decision, rule version, and outcome. KPIs include median event-to-work-order time, field completeness, duplicates, acceptance time, and lost minutes for target causes. Guardrails include erroneous requests, backlog, false triggers, cybersecurity incidents, and unexplained overrides. Reporting may proceed in parallel only if it does not consume the same critical people. SOP search enters document-readiness discovery. Deviation triage remains an assistance experiment with a Quality owner. Autonomous release is explicitly rejected because product risk and required human judgment are not problems to optimize away through scoring. Portfolio management also considers dependencies, team capacity, diversification, and sequence. Two high-scoring use cases may compete for the same connector or process owner. A quick win can build trust, while a strategic case develops reusable capability. Scores are refreshed with evidence each quarter; weights are not manipulated to make the sponsor's idea win. The final decision records candidate, alternatives, assumptions, gates, MVP, measures, owner, and review date. This transparency allows the choice to change without pretending the initial judgment was infallible.`
    )
  ],
  keyPoints: [
    t('Prima semplificare e stabilizzare, poi automatizzare.', 'Simplify and stabilize before automating.'),
    t('Usare punteggi pesati per confronto e gate per rischi non compensabili.', 'Use weighted scores for comparison and gates for non-compensable risks.'),
    t('Documentare evidenza, confidenza e alternative, non soltanto il vincitore.', 'Document evidence, confidence, and alternatives, not only the winner.')
  ],
  decisionMatrix: {
    scale: t('1 = sfavorevole, 5 = favorevole', '1 = unfavorable, 5 = favorable'),
    formula: t('Punteggio = somma(peso × voto) / 5', 'Score = sum(weight × rating) / 5'),
    evidencePolicy: t(
      'Ogni voto separa evidenza, razionale e confidenza. Low indica assunzione da testare, non voto neutrale.',
      'Every rating separates evidence, rationale, and confidence. Low means an assumption to test, not a neutral score.'
    ),
    criteria: automationCriteria,
    hardGates: automationHardGates,
    recommendedCandidateId,
    candidates: automationMatrix
  },
  microExamples: [microExample(
    'Media alta, gate fallito',
    'High average, failed gate',
    'Un candidato con grande valore economico viene comunque rifiutato se la decisione è irreversibile e richiede giudizio qualificato sul rilascio prodotto.',
    'A candidate with high economic value is still rejected when the decision is irreversible and requires qualified product-release judgment.'
  )],
  workedCases: [{
    title: t('Matrice pesata delle opportunità', 'Weighted opportunity matrix'),
    scenario: t(
      'Caso PMI realistico ipotetico, basato soltanto sul contesto pubblico di un produttore globale regolamentato: cinque team propongono automazioni concorrenti.',
      'Realistic hypothetical PMI case based only on the public context of a global regulated manufacturer: five teams propose competing automations.'
    ),
    reasoning: t(
      'Dieci criteri pesati producono 85 per work-order, 84 per reporting, 69 per SOP search, 61 per deviation triage e 46 per autonomous release. Evidenza e confidenza accompagnano ogni voto.',
      'Ten weighted criteria produce 85 for work orders, 84 for reporting, 69 for SOP search, 61 for deviation triage, and 46 for autonomous release. Evidence and confidence accompany each rating.'
    ),
    decision: t(
      'Selezionare la creazione controllata del work order; mantenere reporting come quick win; preparare SOP search; esplorare triage solo in assistenza; rifiutare rilascio autonomo.',
      'Select controlled work-order creation; retain reporting as a quick win; prepare SOP search; explore triage only as assistance; reject autonomous release.'
    ),
    tradeOff: t(
      'Il candidato scelto richiede integrazione ma combina valore, ripetibilità, reversibilità e un chiaro ruolo umano meglio delle alternative.',
      'The selected candidate requires integration but combines value, repeatability, reversibility, and a clear human role better than the alternatives.'
    ),
    outcome: t(
      'Il portafoglio ha una sequenza esplicita, gate di rischio e data di rivalutazione invece di una lista non finanziata.',
      'The portfolio has an explicit sequence, risk gates, and a reassessment date instead of an unfunded wish list.'
    ),
    pmiCase: true,
    hypothetical: true,
    publicContext: true
  }],
  activities: [{
    prompt: t(
      'Ricalcola la matrice aumentando il peso di data readiness da 10 a 20 e riducendo business value da 15 a 5. Spiega se la raccomandazione cambia e applica comunque il gate sul rilascio.',
      'Recalculate the matrix by increasing data-readiness weight from 10 to 20 and reducing business value from 15 to 5. Explain whether the recommendation changes and still apply the release gate.'
    ),
    hints: [t('Mantieni il totale dei pesi a 100 e mostra almeno un calcolo.', 'Keep total weights at 100 and show at least one calculation.')],
    modelSolution: t(
      'Work-order resta 85 perché i voti di valore e data sono entrambi 4. Reporting sale a 88 perché perde 10 punti di peso su un voto 2 e ne guadagna 10 su un voto 4: variazione normalizzata +4. Diventa primo per score, ma si può mantenere work-order come scommessa strategica dichiarando capacità e valore operativo; oppure scegliere reporting come quick win. Il rilascio autonomo resta rifiutato indipendentemente dalla media.',
      'Work orders remain at 85 because both value and data ratings are 4. Reporting rises to 88 because ten weight points move from a rating of 2 to a rating of 4, a normalized change of +4. It becomes first by score, while work orders may remain the declared strategic bet based on capacity and operational value, or reporting may be selected as the quick win. Autonomous release remains rejected regardless of its average.'
    ),
    rubric: [
      t('2 punti: pesi a 100 e calcolo corretto; 1: logica corretta con errore minore; 0: nessun calcolo.', '2 points: weights total 100 and calculation is correct; 1: correct logic with a minor error; 0: no calculation.'),
      t('2 punti: distingue score, scelta di portafoglio e gate; 1: considera due elementi; 0: sceglie solo il numero massimo.', '2 points: distinguishes score, portfolio choice, and gate; 1: considers two elements; 0: selects only the highest number.'),
      t('2 punti: difende o cambia raccomandazione con evidenze; 1: conclusione debole; 0: nessuna decisione.', '2 points: defends or changes the recommendation with evidence; 1: weak conclusion; 0: no decision.')
    ]
  }],
  artifact: {
    title: t('Scorecard riusabile per opportunità di automazione', 'Reusable automation opportunity scorecard'),
    description: t(
      'Foglio decisionale con dieci criteri, pesi, voto, evidenza, confidenza, gate, dipendenze, candidato raccomandato, alternative e data di revisione.',
      'Decision sheet with ten criteria, weights, ratings, evidence, confidence, gates, dependencies, recommended candidate, alternatives, and review date.'
    )
  },
  checkpoint: checkpoint(
    'Perché la decisione autonoma di rilascio va rifiutata anche se promette molto valore?',
    'Why should autonomous product release be rejected even if it promises high value?',
    [
      ['Perché ogni automazione regolamentata è vietata.', 'Because every regulated automation is prohibited.', 'È un’affermazione assoluta e non supportata.', 'This is an unsupported absolute statement.'],
      ['Perché rischio, reversibilità, impatto qualità e giudizio umano costituiscono un gate non compensabile dalla media.', 'Because risk, reversibility, quality impact, and human judgment form a gate that an average cannot offset.', 'Il gate protegge una decisione ad alta conseguenza.', 'The gate protects a high-consequence decision.'],
      ['Perché ha il valore di business più basso.', 'Because it has the lowest business value.', 'Nella matrice il valore potenziale è alto; il problema è il confine di rischio e controllo.', 'Its potential value is high; the issue is the risk and control boundary.']
    ],
    1
  ),
  sourceIds: ['nist-ai-rmf-1-0', 'pmi-product-reliability', 'pmi-operations']
}

const unitSix = {
  id: 'downtime-reduction-pmi-case',
  eyebrow: t('06 · Caso integrato', '06 · Integrated case'),
  title: t(
    'Caso PMI-style: selezionare un’opportunità di riduzione del downtime',
    'Worked PMI-style case: selecting a downtime-reduction opportunity'
  ),
  objective: t(
    'Integrare problema, baseline, selezione, MVP, KPI, guardrail, supervisione e gate di scala in una decisione difendibile.',
    'Integrate problem, baseline, selection, MVP, KPIs, guardrails, oversight, and scale gates into a defensible decision.'
  ),
  estimatedMinutes: 9,
  theory: [
    t(
      `Questo caso è realistico e ipotetico, costruito soltanto sul contesto pubblico di PMI come produttore globale regolamentato. Non descrive processi, dati o risultati interni. Lo scenario riguarda una linea di confezionamento ad alta velocità con 30.000 minuti pianificati in quattro settimane e 1.260 minuti di fermo non pianificato, pari al 4,2 per cento. Quarantadue eventi durano in media 30 minuti; dodici eventi associati a una famiglia causa ricorrente generano 480 minuti. Al gemba il team osserva che l'operatore riconosce l'evento, trascrive asset e codice in un foglio, comunica per telefono e solo dopo viene creato un work order. Quindici eventi su quarantadue hanno campi incompleti o vengono registrati oltre il turno; il tempo mediano tra evento e work order è 18 minuti. I tecnici spiegano che la codifica tardiva rende più difficile correlare condizioni, intervento e recidiva. Quality chiarisce che qualunque impatto sul prodotto continua a seguire il processo formale e non può essere inferito dal nuovo workflow. La perdita è quindi più precisa di generico downtime: ritardo e incompletezza nella trasformazione di eventi definiti in richieste manutentive contestualizzate, con effetto plausibile sul tempo di diagnosi e sull'apprendimento delle cause. Il team non salta alla predictive maintenance. Prima verifica se un ciclo informativo affidabile riduce il ritardo. Questa scelta limita il glamour ma affronta un vincolo osservato, usa regole comprensibili e produce dati migliori per analisi successive. L'assunzione critica è che una richiesta tempestiva e completa abiliti una risposta più rapida almeno per la famiglia causa selezionata. Viene registrata come ipotesi, non trattata come fatto.`,
      `This case is realistic and hypothetical, built only from PMI's public context as a global regulated manufacturer. It does not describe internal processes, data, or results. The scenario concerns a high-speed packaging line with 30,000 scheduled minutes over four weeks and 1,260 minutes of unplanned downtime, or 4.2 percent. Forty-two events average 30 minutes; twelve events linked to one recurring cause family generate 480 minutes. At the gemba, the team observes that the operator recognizes an event, transcribes the asset and code into a spreadsheet, calls maintenance, and only later is a work order created. Fifteen of forty-two events have incomplete fields or are recorded after the shift; median event-to-work-order time is 18 minutes. Technicians explain that delayed coding makes it harder to connect conditions, intervention, and recurrence. Quality clarifies that any product impact remains within the formal process and cannot be inferred by the new workflow. The loss is now more precise than generic downtime: delay and incompleteness when converting defined events into contextualized maintenance requests, with a plausible effect on diagnostic time and cause learning. The team does not jump to predictive maintenance. It first tests whether a reliable information loop reduces delay. This choice is less glamorous, but it addresses an observed constraint, uses understandable rules, and creates better data for later analysis. The critical assumption is that a timely, complete request enables faster response for at least the selected cause family. It is recorded as a hypothesis, not treated as fact.`
    ),
    t(
      `La value hypothesis dichiara: per operatori e tecnici della linea, crediamo che la creazione assistita di work order da eventi definiti, con validazione e conferma, riduca il tempo mediano evento-richiesta da 18 a meno di 5 minuti e porti la completezza dal 64,3 per cento, cioè 27 eventi completi su 42, ad almeno il 95 per cento; ci aspettiamo almeno il 15 per cento di riduzione dei minuti persi per la famiglia causa, senza aumentare scarto, deviazioni, falsi trigger oltre due per turno o backlog manutentivo. L'MVP copre una linea, una famiglia causa e due turni per sei settimane. Il sistema riceve un evento approvato dall'interfaccia OT attraverso un confine di sola osservazione, aggiunge asset, timestamp e ordine, applica regole deterministiche per campi e duplicati, poi presenta una bozza. L'operatore conferma il contesto; il tecnico conferma priorità e presa in carico; l'applicazione autorizzata crea il work order e conserva un audit log. Non scrive su PLC, non modifica parametri e non determina lo stato del prodotto. Se integrazione o servizio falliscono, il processo manuale rimane disponibile e l'evento viene riconciliato. Prima dell'attivazione il team esegue due settimane in shadow mode: genera bozze senza inviarle e confronta completezza, duplicati e regole con casi reali. Training e interfaccia sono progettati con utenti di turno. Ogni override richiede un motivo semplice, utilizzato per migliorare regole e non per valutare individualmente l'operatore. Questo è un MVP end-to-end: include trigger, integrazione, interfaccia, autorizzazione, azione, feedback, monitoraggio e fallback. Una demo che compila un modulo con dati statici non testerebbe l'outcome.`,
      `The value hypothesis states: for line operators and technicians, we believe assisted work-order creation from defined events, with validation and confirmation, will reduce median event-to-request time from 18 to less than 5 minutes and raise completeness from 64.3 percent, meaning 27 complete events out of 42, to at least 95 percent. We expect at least a 15 percent reduction in minutes lost to the cause family without increasing scrap, deviations, false triggers beyond two per shift, or maintenance backlog. The MVP covers one line, one cause family, and two shifts for six weeks. The system receives an approved event through an observation-only OT boundary, adds asset, timestamp, and order context, applies deterministic rules for required fields and duplicates, then presents a draft. The operator confirms context; a technician confirms priority and acceptance; the authorized application creates the work order and retains an audit log. It does not write to PLCs, alter parameters, or determine product status. If integration or service fails, the manual process remains available and the event is reconciled. Before activation, the team operates in shadow mode for two weeks, generating drafts without submission and comparing completeness, duplicates, and rules against real cases. Shift users co-design training and interface. Every override captures a simple reason used to improve rules, not evaluate individuals. This is an end-to-end MVP because it includes trigger, integration, interface, authorization, action, feedback, monitoring, and fallback. A demo that fills a form from static data would not test the outcome.`
    ),
    t(
      `Al termine delle sei settimane, ipotizziamo questi risultati didattici: tempo mediano di 4,5 minuti, 96 per cento di richieste complete, un falso trigger medio per turno, backlog stabile e nessun aumento osservato di scarto o deviazioni. I minuti della famiglia causa passano da 480 in un periodo normalizzato comparabile a 396. La riduzione è 84 minuti, cioè 17,5 per cento, superiore alla soglia del 15. Il downtime totale comparabile passa da 1.260 a 1.176 minuti se le altre cause restano stabili, una riduzione del 6,7 per cento. Il team non attribuisce automaticamente tutta la variazione al software: controlla mix, ore, interventi meccanici e cambi organizzativi, esamina ogni evento evitato e confronta un'altra linea o periodo quando possibile. Gli esiti soddisfano target operativi e guardrail, quindi la decisione non è distribuire subito a ogni plant. Il primo gate estende ad altre famiglie sulla stessa linea per testare generalizzabilità e carico. Il secondo prepara una reference pattern con schema eventi, regole configurabili, autorizzazioni, logging, supporto e metriche standard. Ogni sito esegue una discovery locale perché codici, sistemi, ruoli e vincoli possono differire. Lo sponsor finanzia la capacità, il process owner possiede il risultato e manutenzione accetta il support model. Se falsi trigger o backlog superano soglia, si torna a shadow mode; se non emerge relazione tra rapidità e downtime, il team conserva il beneficio di qualità dati ma non rivendica riduzione dei fermi. La conclusione professionale è proporzionata: il pilot sostiene la prosecuzione controllata, non prova una trasformazione globale. Dimostra però il ciclo completo, dal problema al feedback, e costruisce una base affidabile per opportunità più avanzate.`,
      `At the end of six weeks, assume these teaching results: median time is 4.5 minutes, 96 percent of requests are complete, false triggers average one per shift, backlog remains stable, and no increase in scrap or deviations is observed. Minutes for the target cause family fall from 480 in a normalized comparable period to 396. The reduction is 84 minutes, or 17.5 percent, above the 15 percent threshold. If other causes remain stable, total comparable downtime falls from 1,260 to 1,176 minutes, a 6.7 percent reduction. The team does not automatically attribute the entire change to software. It checks mix, operating hours, mechanical interventions, and organizational changes, reviews each avoided event, and uses another line or period as a comparison where feasible. Results meet outcome and guardrail thresholds, but the decision is not immediate deployment to every plant. The first gate extends to other cause families on the same line to test generalizability and workload. The second creates a reference pattern with event schema, configurable rules, authorization, logging, support, and standard metrics. Every site performs local discovery because codes, systems, roles, and constraints may differ. The sponsor funds the capability, the process owner owns the outcome, and maintenance accepts the support model. If false triggers or backlog cross thresholds, the system returns to shadow mode. If faster requests do not relate to downtime, the team retains the data-quality benefit but does not claim stop reduction. The professional conclusion is proportionate: the pilot supports controlled continuation, not proof of global transformation. It nevertheless demonstrates the complete loop from problem to feedback and builds a reliable foundation for more advanced opportunities.`
    )
  ],
  keyPoints: [
    t('Dichiarare sempre che lo scenario PMI è ipotetico e basato su contesto pubblico.', 'Always state that the PMI scenario is hypothetical and based on public context.'),
    t('Testare il vincolo osservato con il più piccolo flusso end-to-end controllato.', 'Test the observed constraint with the smallest controlled end-to-end flow.'),
    t('Scalare per gate, separando pattern globale e configurazione locale.', 'Scale through gates, separating the global pattern from local configuration.')
  ],
  microExamples: [microExample(
    'Dal 4,2 al 3,92 per cento',
    'From 4.2 to 3.92 percent',
    'Evitare 84 minuti porta il downtime totale da 1.260 a 1.176 su 30.000 minuti: 3,92 per cento, ma l’attribuzione va verificata.',
    'Avoiding 84 minutes moves total downtime from 1,260 to 1,176 over 30,000 minutes: 3.92 percent, but attribution must be verified.'
  )],
  workedCases: [{
    title: t('MVP controllato per ridurre ritardo e downtime', 'Controlled MVP to reduce delay and downtime'),
    scenario: t(
      'Caso PMI-style ipotetico da fonti pubbliche: 1.260 minuti persi, 42 eventi, 18 minuti mediani alla richiesta e una causa ricorrente da 480 minuti.',
      'Hypothetical PMI-style case based on public sources: 1,260 lost minutes, 42 events, 18 median minutes to request, and a recurring cause representing 480 minutes.'
    ),
    assumptions: t(
      'Ore e mix sono comparabili; l’evento è disponibile in sola lettura; una richiesta più tempestiva può ridurre diagnosi e recidiva; Quality conserva ogni decisione sul prodotto.',
      'Hours and mix are comparable; the event is available read-only; a more timely request may reduce diagnosis and recurrence; Quality retains every product decision.'
    ),
    reasoning: t(
      'La matrice seleziona work-order creation. L’MVP usa regole, validazione, conferma, audit e fallback. Shadow mode verifica completezza e falsi trigger prima della scrittura.',
      'The matrix selects work-order creation. The MVP uses rules, validation, confirmation, audit, and fallback. Shadow mode verifies completeness and false triggers before writing.'
    ),
    decision: t(
      'Continuare al gate successivo perché il tempo scende a 4,5 minuti, completezza sale al 96 per cento e la causa perde 84 minuti, senza violare guardrail.',
      'Continue to the next gate because time falls to 4.5 minutes, completeness reaches 96 percent, and the cause loses 84 minutes without breaching guardrails.'
    ),
    tradeOff: t(
      'La conferma umana limita la velocità massima ma protegge contesto, autorizzazione e qualità dei dati; il perimetro stretto limita generalizzazione.',
      'Human confirmation limits maximum speed but protects context, authorization, and data quality; narrow scope limits generalization.'
    ),
    outcome: t(
      'Riduzione normalizzata del 17,5 per cento sulla causa e del 6,7 per cento sul totale, da verificare rispetto a fattori concorrenti prima di attribuzione e scala.',
      'A normalized reduction of 17.5 percent for the cause and 6.7 percent overall, to be checked against competing factors before attribution and scale.'
    ),
    pmiCase: true,
    hypothetical: true,
    publicContext: true
  }],
  activities: [{
    prompt: t(
      'Prepara una decisione di una pagina con i sette passaggi: contesto, baseline, selezione, MVP, KPI e guardrail, rischi e supervisione, gate di scala. Poi difendila oralmente in inglese in due minuti.',
      'Prepare a one-page decision using seven parts: context, baseline, selection, MVP, KPIs and guardrails, risks and oversight, and scale gate. Then defend it orally in English in two minutes.'
    ),
    hints: [
      t('Usa i numeri 1.260, 480, 18, 4,5, 96 e 396 e spiega che cosa rappresentano.', 'Use the numbers 1,260, 480, 18, 4.5, 96, and 396 and explain what they represent.'),
      t('Chiudi con una decisione condizionale, non con una promessa di rollout globale.', 'Close with a conditional decision, not a promise of global rollout.')
    ],
    modelSolution: t(
      'La decisione seleziona una linea e una causa, parte dal 4,2 per cento di downtime e dal ritardo mediano di 18 minuti, usa un workflow con conferma e fallback e fissa target inferiori a 5 minuti, completezza almeno 95 per cento e riduzione causa almeno 15 per cento. I risultati ipotetici raggiungono 4,5 minuti, 96 per cento e 17,5 per cento, con guardrail rispettati. Si procede a un’estensione limitata, si verifica attribuzione e si standardizza soltanto dopo generalizzabilità, ownership e supporto.',
      'The decision selects one line and one cause, starts from 4.2 percent downtime and an 18-minute median delay, uses a confirmed workflow with fallback, and sets targets below 5 minutes, at least 95 percent completeness, and at least 15 percent cause reduction. Hypothetical results reach 4.5 minutes, 96 percent, and 17.5 percent with guardrails met. Proceed to a limited extension, verify attribution, and standardize only after generalizability, ownership, and support are demonstrated.'
    ),
    rubric: [
      t('2 punti: baseline, formule e assunzioni coerenti; 1: numeri senza definizioni; 0: nessuna baseline.', '2 points: coherent baseline, formulas, and assumptions; 1: numbers without definitions; 0: no baseline.'),
      t('2 punti: MVP end-to-end con umano, fallback e audit; 1: controlli incompleti; 0: sola tecnologia.', '2 points: end-to-end MVP with human role, fallback, and audit; 1: incomplete controls; 0: technology only.'),
      t('2 punti: decisione di scala condizionata da outcome e guardrail; 1: gate vago; 0: rollout automatico.', '2 points: scale decision conditional on outcomes and guardrails; 1: vague gate; 0: automatic rollout.')
    ]
  }],
  checkpoint: checkpoint(
    'Il pilot riduce la causa da 480 a 396 minuti. Quale conclusione è più rigorosa?',
    'The pilot reduces the cause from 480 to 396 minutes. Which conclusion is most rigorous?',
    [
      ['La trasformazione globale è completata.', 'Global transformation is complete.', 'Un pilot limitato non prova scala o sostenibilità globale.', 'A bounded pilot does not prove global scale or sustainability.'],
      ['La riduzione è 17,5 per cento e sostiene un’estensione controllata se attribuzione e guardrail reggono.', 'The reduction is 17.5 percent and supports controlled extension if attribution and guardrails hold.', 'La conclusione usa calcolo, limiti e condizione decisionale.', 'This conclusion uses calculation, limitations, and a decision condition.'],
      ['L’automazione ha evitato certamente 84 minuti.', 'Automation certainly avoided 84 minutes.', 'La variazione è osservata, ma l’attribuzione richiede controllo dei fattori concorrenti.', 'The change is observed, but attribution requires checking competing factors.']
    ],
    1
  ),
  sourceIds: ['pmi-operations', 'pmi-product-reliability', 'pmi-annual-report-2025', 'nist-ai-rmf-1-0']
}

export const digitalTransformationLesson = {
  id: 'digital-transformation',
  slug: 'digital-transformation',
  order: 1,
  title: t('Digital Transformation e Industry 4.0', 'Digital Transformation and Industry 4.0'),
  description: t(
    'Un percorso decisionale dal problema operativo a un portafoglio di automazione misurabile, controllato e difendibile.',
    'A decision journey from operational problem to a measurable, controlled, and defensible automation portfolio.'
  ),
  durationMinutes: 50,
  timeBudget: { theory: 25, cases: 15, practice: 10 },
  units: [unitOne, unitTwo, unitThree, unitFour, unitFive, unitSix],
  professionalArtifacts: [{
    title: t('KPI tree e value hypothesis', 'KPI tree and value hypothesis'),
    description: t(
      'Template con perdita, formula, baseline, driver, target, guardrail, owner, cadenza, assunzioni e regola di decisione.',
      'Template with loss, formula, baseline, drivers, target, guardrails, owners, cadence, assumptions, and decision rule.'
    )
  }],
  interviewAnswers: [
    {
      prompt: 'How do you decide which processes to automate?',
      short: 'I start with a measurable operational loss, then observe the real process and the decision at the gemba. I score candidates on value, frequency, stability, data, integration, risk, human judgment, adoption, and time to value. I also apply hard gates, because a high average cannot justify an irreversible or regulated decision. I select the smallest controlled end-to-end MVP with clear KPIs, guardrails, human accountability, and a scale gate.',
      long: 'I decide through evidence and risk, not through a list of technologies. First, I define the operational loss, its baseline, and the decision that needs to improve. At the gemba I map the real workflow, exceptions, data sources, handoffs, and responsible roles. I simplify unstable or unnecessary work before considering automation. I then compare candidates with a weighted scorecard covering business value, frequency and effort, process stability, data readiness, integration feasibility, risk and reversibility, regulatory impact, required human judgment, adoption complexity, and time to value. Each rating needs evidence and a confidence level. The score supports comparison, while hard gates prevent an average from hiding unacceptable risk. For example, I would reject autonomous product release because qualified human judgment and formal quality control are essential. In the worked portfolio, controlled maintenance work-order creation scores strongly because it is frequent, rule-based, reversible, and connected to a downtime loss. The MVP would validate event context, propose a complete draft, require technician confirmation, authorize the write through the application, log the outcome, and retain a manual fallback. I would measure event-to-order time and data completeness, then test whether they improve target downtime without increasing false triggers, backlog, scrap, or quality events. I scale only if value, controls, adoption, ownership, and support are proven.'
    },
    {
      prompt: 'Can you give me an example of applying digital transformation in manufacturing?',
      short: 'In a hypothetical regulated-manufacturing case, a line lost 1,260 minutes in four weeks and work orders were delayed or incomplete. I would pilot assisted work-order creation for one recurring cause, with validation and technician confirmation. The target is to cut request time from 18 to below 5 minutes and reduce cause-related downtime by at least 15 percent without increasing scrap, deviations, false triggers, or backlog.',
      long: 'A practical example is a realistic hypothetical case for a regulated high-speed packaging line. The baseline is 1,260 unplanned downtime minutes over 30,000 scheduled minutes, or 4.2 percent. One recurring cause represents 480 minutes, and gemba observation shows a median delay of 18 minutes between the event and a complete maintenance request. Rather than jump directly to predictive maintenance, I would test the observed information bottleneck. The MVP would cover one line and one cause family. It would receive a read-only approved event, add asset and production context, validate required fields and duplicates, and present a draft work order. The operator would confirm context, the technician would confirm priority, and an authorized application would create the order and log every step. It would not write to control equipment or make product decisions, and the manual fallback would remain available. I would begin in shadow mode. The outcome targets would be less than five minutes from event to request, at least 95 percent field completeness, and at least 15 percent reduction in downtime for the selected cause. Guardrails would cover false triggers, maintenance backlog, restart scrap, and quality deviations. If a comparable period moved from 480 to 396 minutes for that cause while guardrails held, the 17.5 percent reduction would justify a controlled extension, not an immediate global rollout. That is transformation because data, workflow, roles, controls, and continuous learning change together around a measurable result.'
    },
    {
      prompt: 'How do you distinguish a technology project from transformation?',
      short: 'A technology project delivers a capability, such as sensors, software, or a dashboard. Transformation changes how people make and govern decisions, with measurable outcomes and sustainable ownership. I look for a causal link from operational loss to changed workflow, roles, controls, KPIs, adoption, and feedback. Go-live is an output; transformation is the sustained improvement of the socio-technical system.',
      long: 'I distinguish them by the unit of change and the evidence of value. A technology project can successfully deliver an output: a connected sensor, a cloud platform, or an AI model. That may be necessary and worthwhile, but it is not sufficient for transformation. Transformation starts from a defined operational loss and redesigns the complete decision loop. It changes how data is created and interpreted, how people act, who is accountable, which controls apply, how exceptions and fallbacks work, and how the organization learns from outcomes. I separate output, outcome, and impact. A dashboard is an output. A daily cross-functional review with clear ownership is an outcome. A sustained reduction in avoidable downtime without harming quality or safety is impact. I also ask whether the capability can continue after the project team leaves: is there a process owner, product ownership, data stewardship, support, change control, user feedback, and a scale decision? If not, the initiative may remain a useful local tool. The distinction is not about complexity. A simple deterministic workflow can enable transformation when it changes the operating model around a measurable decision. Conversely, an advanced AI demo may transform nothing if it is not adopted or cannot operate under real constraints. In short, technology is an enabler; transformation is a durable, governed change in a socio-technical system.'
    }
  ],
  finalQuiz: [
    checkpoint(
      'Quale sequenza descrive meglio il metodo del modulo?',
      'Which sequence best describes the module method?',
      [
        ['Tecnologia, rollout, KPI, discovery.', 'Technology, rollout, KPI, discovery.', 'Parte dalla soluzione e misura troppo tardi.', 'It starts with the solution and measures too late.'],
        ['Perdita, gemba, baseline, selezione, MVP controllato, evidenza, gate di scala.', 'Loss, gemba, baseline, selection, controlled MVP, evidence, scale gate.', 'La sequenza collega problema, decisione e apprendimento.', 'The sequence connects problem, decision, and learning.'],
        ['Idea, score più alto, automazione autonoma.', 'Idea, highest score, autonomous automation.', 'Ignora evidenze, gate e supervisione.', 'It ignores evidence, gates, and oversight.']
      ],
      1
    ),
    checkpoint(
      'Che cosa impedisce a un KPI di creare ottimizzazione locale pericolosa?',
      'What prevents a KPI from driving dangerous local optimization?',
      [
        ['Un target più ambizioso.', 'A more ambitious target.', 'Ambizione senza vincoli può aumentare il rischio.', 'Ambition without constraints can increase risk.'],
        ['Guardrail su qualità, sicurezza, carico e false segnalazioni.', 'Guardrails for quality, safety, workload, and false alerts.', 'I guardrail proteggono risultati che non devono deteriorarsi.', 'Guardrails protect outcomes that must not deteriorate.'],
        ['Un dashboard più dettagliato.', 'A more detailed dashboard.', 'Più visualizzazione non corregge incentivi o confini.', 'More visualization does not correct incentives or boundaries.']
      ],
      1
    ),
    checkpoint(
      'Qual è il ruolo corretto della matrice pesata?',
      'What is the correct role of the weighted matrix?',
      [
        ['Sostituire il giudizio e scegliere automaticamente.', 'Replace judgment and select automatically.', 'I punteggi rendono il giudizio trasparente, non lo eliminano.', 'Scores make judgment transparent rather than eliminating it.'],
        ['Strutturare il confronto insieme a evidenze, confidenza, gate e capacità di portafoglio.', 'Structure comparison alongside evidence, confidence, gates, and portfolio capacity.', 'È l’uso decisionale completo della scorecard.', 'This is the complete decision use of the scorecard.'],
        ['Far vincere l’idea dello sponsor regolando i pesi.', 'Make the sponsor’s idea win by adjusting weights.', 'Manipolare i pesi distrugge trasparenza e fiducia.', 'Manipulating weights destroys transparency and trust.']
      ],
      1
    )
  ]
}

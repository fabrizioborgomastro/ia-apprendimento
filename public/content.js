const q = (id, prompt, options, correctOption, explanation) => ({ id, type: 'single', prompt, options, correctOption, explanation })
const term = (english, italian, definition) => ({ english, italian, definition })

/** @type {import('./types.js').Lesson[]} */
export const lessons = [
  {
    id: 'digital-transformation', slug: 'digital-transformation', order: 1,
    title: 'Digital Transformation e Industry 4.0', englishTitle: 'Digital Transformation & Industry 4.0',
    durationMinutes: 45, prerequisites: [], masteryThreshold: 80,
    objectives: ['Tradurre un problema operativo in una sfida digitale', 'Distinguere tecnologia, trasformazione e valore', 'Usare KPI industriali essenziali'],
    competencies: ['business-to-digital', 'industrial-kpi', 'transformation-leadership'],
    blocks: [
      { id: 'transformation', eyebrow: '01 · Il punto di partenza', title: 'Non partire dalla tecnologia', minutes: 8,
        body: [
          'La digital transformation non è installare software. È cambiare in modo misurabile come un processo crea valore usando dati, tecnologia e nuove modalità di lavoro.',
          'Un AI Digital Transformation Lead parte da una perdita operativa osservabile: fermate, difetti, ritardi, energia sprecata o decisioni lente. Solo dopo sceglie analytics, automazione o AI.'
        ],
        keyPoints: ['Business problem before technology', 'Baseline prima del pilot', 'Persone, processo, dati e tecnologia devono cambiare insieme'] },
      { id: 'kpi', eyebrow: '02 · Misurare', title: 'Il linguaggio della produzione', minutes: 10,
        body: [
          'OEE combina Availability, Performance e Quality. È utile per orientarsi, ma una soluzione deve collegarsi anche alla causa specifica: minuti di downtime, micro-fermate, velocità ridotta, scarti o rilavorazioni.',
          'Una baseline descrive il prima. Una target metric definisce il miglioramento atteso. Una guardrail metric impedisce di ottimizzare un indicatore danneggiandone un altro, per esempio velocità a scapito della qualità.'
        ],
        formula: 'OEE = Availability × Performance × Quality',
        keyPoints: ['Downtime: tempo non produttivo', 'Scrap rate: quota scartata', 'Lead time: tempo totale dal bisogno al risultato'] },
      { id: 'industry4', eyebrow: '03 · Industry 4.0', title: 'Un sistema socio-tecnico', minutes: 8,
        body: [
          'Industry 4.0 collega asset fisici, sistemi operativi, dati e decisioni. Sensori e macchine rendono visibile il processo; piattaforme e modelli trasformano i segnali in informazioni; le persone chiudono il ciclo con decisioni e miglioramento continuo.',
          'La tecnologia fallisce se non esistono ownership, standard, competenze e fiducia degli operatori. Il lead crea una coalizione tra produzione, manutenzione, qualità, IT, OT, sicurezza e business.'
        ],
        keyPoints: ['Cross-functional by design', 'Adoption is a product requirement', 'Standardizzare prima di scalare'] },
      { id: 'framework', eyebrow: '04 · Metodo', title: 'Dalla sfida al caso d’uso', minutes: 10,
        body: [
          'Formula il problema come: oggi [utente] prende [decisione] usando [dati], con [perdita misurabile]. Vogliamo migliorare [KPI] entro [vincolo], mantenendo [guardrail].',
          'Valuta quindi valore, fattibilità, disponibilità dei dati, rischio, tempo al risultato e riusabilità. Un buon MVP verifica l’ipotesi più rischiosa con il minimo sistema end-to-end.'
        ],
        activity: { prompt: 'Una linea perde 6 ore a settimana per guasti inattesi. Formula problema, KPI e prima ipotesi di MVP.', hint: 'Evita di promettere subito manutenzione predittiva. Verifica prima dati, failure modes e baseline.' },
        keyPoints: ['Value, feasibility, risk', 'MVP come esperimento', 'Outcome, non output'] }
    ],
    glossary: [
      term('Digital transformation', 'Trasformazione digitale', 'Cambiamento misurabile di processi, decisioni e modello operativo abilitato dal digitale.'),
      term('Operational Technology (OT)', 'Tecnologia operativa', 'Sistemi che controllano o osservano processi e asset fisici.'),
      term('Overall Equipment Effectiveness (OEE)', 'Efficienza complessiva impianto', 'Indicatore composto da disponibilità, prestazione e qualità.'),
      term('Downtime', 'Tempo di fermo', 'Periodo in cui un asset richiesto non produce.'),
      term('Minimum Viable Product (MVP)', 'Prodotto minimo validabile', 'Minimo sistema end-to-end capace di verificare un’ipotesi di valore o rischio.')
    ],
    quiz: [
      q('dt-q1', 'Qual è il punto di partenza migliore per un’iniziativa AI in fabbrica?', ['Scegliere il modello più potente', 'Ridurre il downtime misurabile di una linea', 'Creare subito un data lake', 'Acquistare sensori per ogni macchina'], 1, 'Corretto: collega un risultato operativo misurabile a un problema reale prima di scegliere la tecnologia.'),
      q('dt-q2', 'Quale affermazione descrive meglio un MVP?', ['La versione economica del prodotto finale', 'Una demo visiva', 'Un esperimento end-to-end che verifica l’ipotesi più rischiosa', 'Un progetto privo di governance'], 2, 'Un MVP deve produrre apprendimento verificabile sul valore, sulla fattibilità o sul rischio.'),
      q('dt-q3', 'Perché una guardrail metric è importante?', ['Sostituisce la baseline', 'Impedisce di migliorare un KPI danneggiandone un altro', 'Misura solo i costi cloud', 'Elimina il bisogno di stakeholder'], 1, 'Una guardrail metric rende espliciti gli effetti collaterali che il progetto non deve causare.')
    ],
    interview: {
      prompt: 'What does digital transformation mean in a manufacturing context?',
      short: 'Digital transformation means improving how a manufacturing process creates value by combining data, technology and new ways of working. I would start from a measurable operational problem, not from an AI tool.',
      long: 'In manufacturing, digital transformation is a business and operating-model change enabled by technology. I would begin with a measurable loss such as downtime, defects or long decision cycles, establish a baseline, and map the people, process and data involved. Then I would select the smallest end-to-end experiment that can test value and feasibility. Success requires adoption by operations, maintainability by IT and OT, clear cybersecurity controls and evidence that the target KPI improves without harming safety or quality.'
    }
  },
  {
    id: 'ot-it-ai-cloud', slug: 'ot-it-ai-cloud', order: 2,
    title: 'Architettura OT / IT / AI / Cloud', englishTitle: 'OT / IT / AI / Cloud Architecture',
    durationMinutes: 75, prerequisites: ['digital-transformation'], masteryThreshold: 80,
    objectives: ['Descrivere i livelli ISA-95 in modo pratico', 'Seguire un dato dalla macchina alla decisione', 'Spiegare edge vs cloud'],
    competencies: ['industrial-architecture', 'data-flow', 'edge-cloud'],
    blocks: [
      { id: 'physical', eyebrow: '01 · Shop floor', title: 'Dal processo fisico al segnale', minutes: 12,
        body: ['Sensori misurano temperatura, vibrazione, pressione, velocità o presenza. Attuatori modificano il processo. Un PLC esegue logica deterministica in tempo reale e continua a controllare la macchina anche se cloud e rete aziendale non sono disponibili.', 'Il controllo di sicurezza e la latenza critica non devono dipendere da un LLM o da una connessione internet.'],
        keyPoints: ['PLC: deterministic control', 'Safety is never delegated to GenAI', 'Availability e latenza guidano l’architettura'] },
      { id: 'supervision', eyebrow: '02 · Supervisione', title: 'SCADA, HMI e historian', minutes: 12,
        body: ['HMI presenta lo stato locale a un operatore. SCADA supervisiona processi e asset, raccoglie segnali e permette comandi autorizzati. Un historian conserva serie temporali industriali con contesto e frequenza elevata.', 'Questi sistemi appartengono al dominio OT: continuità, safety, determinismo e finestre di manutenzione prevalgono sulla velocità tipica dell’IT.'],
        keyPoints: ['HMI: interfaccia operatore', 'SCADA: supervisione e controllo', 'Historian: time-series industriali'] },
      { id: 'operations', eyebrow: '03 · Operations management', title: 'MES ed ERP non fanno lo stesso lavoro', minutes: 14,
        body: ['Il MES coordina l’esecuzione produttiva: ordini, work-in-progress, genealogia, qualità, risorse e performance. L’ERP pianifica e registra processi aziendali più ampi: ordini, acquisti, inventario, finanza e pianificazione.', 'L’integrazione associa il contesto business dell’ordine ai dati effettivi di produzione. Senza contesto, una vibrazione è solo un numero; con asset, prodotto, turno e stato macchina diventa informazione utilizzabile.'],
        keyPoints: ['MES: what is happening in production', 'ERP: what the enterprise plans and accounts for', 'Context turns data into information'] },
      { id: 'edge-cloud', eyebrow: '04 · AI platform', title: 'Edge e cloud sono complementari', minutes: 16,
        body: ['L’edge elabora vicino alla macchina quando servono bassa latenza, resilienza, riduzione della banda o contenimento dei dati. Il cloud offre elasticità, servizi gestiti, training centralizzato, collaborazione e analisi cross-site.', 'Un pattern robusto mantiene il controllo nel PLC, esegue inferenza sensibile alla latenza all’edge, invia eventi e dati selezionati alla piattaforma centrale e restituisce raccomandazioni tramite un canale governato.'],
        diagram: ['Sensor / PLC', 'SCADA / Historian', 'MES / Edge', 'Data & AI Platform', 'Human Decision'],
        activity: { prompt: 'Dove collocheresti un modello di computer vision che deve fermare una confezione difettosa in 80 ms?', hint: 'Inferenza edge; decisione deterministica e meccanismo di arresto governati vicino alla linea.' },
        keyPoints: ['Keep control local', 'Centralize learning where useful', 'Segment networks and minimize trust'] }
    ],
    glossary: [
      term('Programmable Logic Controller (PLC)', 'Controllore logico programmabile', 'Controller industriale deterministico per logica e controllo macchina.'),
      term('Supervisory Control and Data Acquisition (SCADA)', 'Supervisione, controllo e acquisizione dati', 'Sistema di supervisione di processi distribuiti.'),
      term('Manufacturing Execution System (MES)', 'Sistema di esecuzione produttiva', 'Coordina e traccia l’esecuzione della produzione.'),
      term('Enterprise Resource Planning (ERP)', 'Pianificazione delle risorse aziendali', 'Sistema integrato per processi amministrativi, logistici e di pianificazione.'),
      term('Edge computing', 'Elaborazione periferica', 'Calcolo vicino alla sorgente dei dati per latenza, resilienza o privacy.')
    ],
    quiz: [
      q('arch-q1', 'Quale componente deve continuare a controllare una macchina se il cloud è irraggiungibile?', ['LLM', 'PLC', 'ERP', 'Data lake'], 1, 'Il PLC esegue il controllo deterministico locale; il cloud non deve essere nel percorso critico di sicurezza.'),
      q('arch-q2', 'Qual è la distinzione più utile tra MES ed ERP?', ['MES usa solo AI, ERP no', 'MES coordina l’esecuzione produttiva, ERP pianifica e registra processi aziendali', 'ERP controlla i sensori', 'MES sostituisce il PLC'], 1, 'Il MES governa ciò che accade nell’esecuzione produttiva; l’ERP copre pianificazione e processi enterprise.'),
      q('arch-q3', 'Quando l’edge è preferibile al cloud?', ['Quando servono bassa latenza e resilienza locale', 'Per qualsiasi report mensile', 'Solo quando non esiste un MES', 'Per evitare ogni governance'], 0, 'L’edge è adatto quando latenza, banda, privacy o continuità richiedono elaborazione vicino alla sorgente.')
    ],
    interview: {
      prompt: 'Can you explain a typical OT, IT, AI and cloud architecture?',
      short: 'At shop-floor level, sensors and PLCs control the physical process. SCADA and historians supervise and collect time-series data. MES adds production context, ERP adds enterprise context, and edge or cloud platforms support analytics and AI without replacing safety-critical control.',
      long: 'I would describe the architecture as layered but connected. Sensors and actuators interact with the process, while PLCs provide deterministic control. HMI and SCADA support operators and supervision, and historians store high-frequency time-series data. MES manages production execution and genealogy, while ERP provides planning and business context. Edge services handle low-latency or resilient inference; cloud or central platforms support cross-site analytics, model training and governance. Data should cross segmented boundaries through explicit, monitored interfaces. AI recommendations return through controlled workflows, with humans or deterministic automation retaining authority for safety-critical decisions.'
    }
  },
  {
    id: 'data-ai-use-cases', slug: 'data-ai-use-cases', order: 3,
    title: 'Dati, analytics e casi d’uso AI', englishTitle: 'Data, Analytics & AI Use Cases',
    durationMinutes: 60, prerequisites: ['ot-it-ai-cloud'], masteryThreshold: 80,
    objectives: ['Scegliere tra regole, ML e GenAI', 'Valutare readiness e qualità dei dati', 'Definire casi d’uso manutenzione e qualità'],
    competencies: ['ai-use-case-selection', 'data-readiness', 'industrial-analytics'],
    blocks: [
      { id: 'ladder', eyebrow: '01 · Decision ladder', title: 'Usare il metodo più semplice che funziona', minutes: 10,
        body: ['Una dashboard descrive cosa è successo. Le regole segnalano condizioni note. Il machine learning stima pattern o probabilità. L’ottimizzazione sceglie azioni sotto vincoli. La GenAI lavora bene con linguaggio, documenti e interazioni.', 'Non usare un LLM per prevedere direttamente una serie di vibrazioni se un modello temporale dedicato è più accurato, economico e verificabile. Usa eventualmente l’LLM per spiegare il risultato e recuperare procedure.'],
        keyPoints: ['Descriptive, predictive, prescriptive', 'Fit the method to the signal', 'LLM as interface, not universal engine'] },
      { id: 'data', eyebrow: '02 · Data readiness', title: 'Il dato deve avere contesto e qualità', minutes: 12,
        body: ['Verifica copertura, frequenza, accuratezza, sincronizzazione temporale, missing values, drift, ownership e possibilità di ottenere etichette affidabili. Per predictive maintenance servono anche esempi di guasto, non solo lunghi periodi normali.', 'La data leakage usa in training informazioni non disponibili al momento reale della previsione. Produce metriche ottime in laboratorio e fallimenti in produzione.'],
        keyPoints: ['Garbage in, misleading confidence out', 'Labels have operational meaning', 'Split data by time or asset when appropriate'] },
      { id: 'maintenance', eyebrow: '03 · Reliability', title: 'Dalla soglia alla manutenzione predittiva', minutes: 12,
        body: ['Condition monitoring rende visibile lo stato. Anomaly detection individua comportamenti insoliti. Failure prediction stima un evento entro un orizzonte. Remaining Useful Life stima il tempo residuo. Sono problemi diversi e richiedono dati e azioni diverse.', 'Un alert vale solo se esiste una decisione conseguente: ispezionare, pianificare un fermo, ordinare un ricambio o modificare un setpoint. Misura precision, recall, false alarms e downtime evitato.'],
        keyPoints: ['False alarms destroy trust', 'Prediction horizon must be actionable', 'Measure avoided loss, not only model accuracy'] },
      { id: 'quality', eyebrow: '04 · Quality', title: 'Visione artificiale e closed-loop learning', minutes: 12,
        body: ['La computer vision può rilevare difetti, verificare assemblaggi o leggere marcature. Servono illuminazione controllata, immagini rappresentative, gestione delle varianti e un processo per confermare falsi positivi e falsi negativi.', 'Il pilot deve confrontare modello e processo attuale, catturare feedback degli ispettori e gestire il cambiamento dei prodotti. Il modello è un componente di un quality system, non il sistema intero.'],
        activity: { prompt: 'Una fabbrica vuole ridurre scarti con GenAI. Quali domande fai prima?', hint: 'Tipo di difetto, frequenza, punto di rilevazione, dati disponibili, costo di FP/FN, azione e baseline.' },
        keyPoints: ['Representative data', 'Operational feedback loop', 'Model and process metrics'] }
    ],
    glossary: [
      term('Anomaly detection', 'Rilevamento anomalie', 'Identificazione di pattern che divergono dal comportamento atteso.'),
      term('Predictive maintenance', 'Manutenzione predittiva', 'Uso di dati e modelli per anticipare condizioni di guasto in modo azionabile.'),
      term('False positive', 'Falso positivo', 'Allarme prodotto quando l’evento non è presente.'),
      term('Data drift', 'Deriva dei dati', 'Cambiamento della distribuzione dei dati rispetto a quella usata per sviluppare il modello.'),
      term('Data leakage', 'Fuga informativa nel modello', 'Uso accidentale di informazione futura o altrimenti indisponibile in produzione.')
    ],
    quiz: [
      q('data-q1', 'Qual è il primo rischio di un progetto di predictive maintenance con pochissimi guasti storici?', ['Costo del cloud', 'Mancanza di esempi etichettati rappresentativi', 'Assenza di prompt', 'Troppe dashboard'], 1, 'Senza esempi o proxy affidabili del guasto è difficile valutare e addestrare una previsione supervisionata.'),
      q('data-q2', 'Quale metrica operativa completa precision e recall di un modello di manutenzione?', ['Numero di slide', 'Downtime evitato e costo dei falsi allarmi', 'Numero di parametri', 'Lunghezza del prompt'], 1, 'Il modello deve migliorare una decisione reale, quindi servono impatto evitato e costo operativo degli errori.'),
      q('data-q3', 'Quando è sensato usare un LLM?', ['Per il controllo safety-critical di un PLC', 'Per cercare e spiegare procedure di manutenzione', 'Per sostituire sempre un modello temporale', 'Per eliminare la qualità dei dati'], 1, 'Gli LLM sono adatti a linguaggio e documenti; non sostituiscono automaticamente modelli specializzati o controllo deterministico.')
    ],
    interview: {
      prompt: 'How would you select and validate an industrial AI use case?',
      short: 'I would connect the use case to a measurable operational loss, verify that the required data and labels exist, choose the simplest suitable method, and validate both model performance and business impact in a controlled pilot.',
      long: 'I would first define the user, decision, baseline loss and target KPI. Then I would assess data coverage, quality, labels, ownership and integration constraints. I would compare simple rules, analytics, machine learning and GenAI instead of assuming one technique. The MVP would test the riskiest assumption end to end with a representative line or asset. Evaluation would include technical metrics such as precision and recall, operational metrics such as avoided downtime or scrap, and guardrails for safety, workload and false alarms. Before scaling I would require an owner, monitoring, retraining criteria and a clear fallback process.'
    }
  },
  {
    id: 'llm-agents', slug: 'llm-agents', order: 4,
    title: 'LLM, RAG, agenti e MCP', englishTitle: 'LLMs, RAG, Agents & MCP',
    durationMinutes: 75, prerequisites: ['data-ai-use-cases'], masteryThreshold: 80,
    objectives: ['Spiegare come genera testo un LLM', 'Distinguere RAG, tool calling e memoria', 'Descrivere MCP e orchestrazione multi-modello'],
    competencies: ['llm-fundamentals', 'rag-tool-use', 'agent-architecture'],
    blocks: [
      { id: 'llm', eyebrow: '01 · Foundation model', title: 'Predire token con contesto', minutes: 12,
        body: ['Un LLM trasforma testo in token, rappresenta relazioni attraverso il transformer e produce una distribuzione sul token successivo. Genera un token alla volta usando prompt e contesto disponibile.', 'Training costruisce i pesi; inference usa quei pesi per rispondere. Il modello non consulta automaticamente fonti aggiornate e una risposta plausibile non è garanzia di verità.'],
        keyPoints: ['Tokens, context, next-token prediction', 'Training is not inference', 'Fluency is not evidence'] },
      { id: 'rag', eyebrow: '02 · Grounding', title: 'RAG collega risposte e conoscenza', minutes: 14,
        body: ['Retrieval-Augmented Generation indicizza contenuti, recupera i passaggi più pertinenti e li inserisce nel contesto della richiesta. Gli embedding rappresentano similarità semantica, mentre filtri e metadata limitano la ricerca.', 'Un buon RAG richiede ingestion, chunking, permessi, retrieval, citazioni ed evaluation. Non corregge documenti sbagliati e non elimina tutte le allucinazioni.'],
        keyPoints: ['Retrieve before generate', 'Respect source permissions', 'Evaluate answer and retrieval separately'] },
      { id: 'tools', eyebrow: '03 · Action', title: 'Tool calling e loop agentico', minutes: 14,
        body: ['Con tool calling il modello sceglie una funzione e produce argomenti strutturati; l’applicazione valida, autorizza ed esegue; il risultato torna al modello. Un agente ripete osservazione, decisione, azione e verifica fino a una condizione di arresto.', 'Il modello propone, ma il runtime controlla permessi, timeout, budget, idempotenza e approvazioni. Le azioni irreversibili richiedono conferma umana.'],
        keyPoints: ['Model proposes, system disposes', 'Least privilege', 'Explicit stop conditions'] },
      { id: 'mcp', eyebrow: '04 · Protocol', title: 'MCP standardizza il collegamento agli strumenti', minutes: 12,
        body: ['Model Context Protocol definisce un modo comune con cui un client AI scopre e usa tools, resources e prompts esposti da un server. Riduce integrazioni ad hoc tra applicazioni agentiche e sistemi esterni.', 'MCP non rende automaticamente sicuro un tool. Autenticazione, autorizzazione, validazione, audit e isolamento restano responsabilità dell’architettura.'],
        keyPoints: ['Client, server, capabilities', 'Tools act; resources provide context', 'Protocol is not a security boundary'] },
      { id: 'orchestration', eyebrow: '05 · Multi-agent', title: 'Più agenti solo con confini chiari', minutes: 14,
        body: ['Agenti diversi possono ricoprire ruoli come planner, implementer, reviewer e evaluator, anche usando modelli differenti. Un orchestratore assegna task, passa artefatti, impone budget e raccoglie evidenze.', 'La collaborazione non avviene magicamente tra modelli. Servono contratti: input, output, stato, ownership, criteri di accettazione e gestione dei conflitti. OpenRouter unifica l’accesso ai modelli; OpenCode orchestra attività di coding; OpenClaw collega assistenti persistenti a canali e strumenti.'],
        activity: { prompt: 'Disegna tre agenti per sviluppare una feature senza duplicare lavoro.', hint: 'Planner produce spec, implementer modifica workspace isolato, reviewer valuta diff e test con criteri espliciti.' },
        keyPoints: ['Use agents for separable responsibilities', 'Pass artifacts, not vague chat', 'Cost and error compound across loops'] }
    ],
    glossary: [
      term('Large Language Model (LLM)', 'Modello linguistico di grandi dimensioni', 'Modello neurale addestrato su sequenze di token per generare e trasformare linguaggio.'),
      term('Retrieval-Augmented Generation (RAG)', 'Generazione aumentata da recupero', 'Pattern che recupera fonti pertinenti e le fornisce al modello durante la risposta.'),
      term('Tool calling', 'Chiamata di strumenti', 'Produzione di una richiesta strutturata affinché il runtime esegua una funzione.'),
      term('Model Context Protocol (MCP)', 'Protocollo per il contesto dei modelli', 'Protocollo aperto per connettere applicazioni AI a strumenti e fonti contestuali.'),
      term('Agent orchestration', 'Orchestrazione di agenti', 'Coordinamento di ruoli, stato, strumenti, budget e passaggi tra agenti.')
    ],
    quiz: [
      q('llm-q1', 'Che cosa aggiunge RAG a un LLM?', ['Aggiorna i pesi a ogni domanda', 'Recupera fonti pertinenti nel contesto della richiesta', 'Garantisce sempre la verità', 'Sostituisce i permessi documentali'], 1, 'RAG recupera contenuti al momento della richiesta; non modifica i pesi e richiede comunque evaluation e permessi.'),
      q('llm-q2', 'Chi deve autorizzare ed eseguire concretamente un tool?', ['Il token successivo', 'Il runtime applicativo', 'Il documento recuperato', 'L’embedding'], 1, 'Il modello propone una chiamata; il runtime valida argomenti, permessi, budget e conseguenze prima di eseguirla.'),
      q('llm-q3', 'Che cosa risolve MCP?', ['La precisione di ogni modello', 'Un’interfaccia comune per scoprire strumenti e risorse', 'La sicurezza senza configurazione', 'Il training dei transformer'], 1, 'MCP standardizza il collegamento, ma autenticazione, autorizzazione e sicurezza rimangono necessarie.')
    ],
    interview: {
      prompt: 'What are RAG, agents and MCP, and how do they work together?',
      short: 'RAG grounds an LLM with retrieved sources. An agent adds a controlled loop that can choose tools and act. MCP is a standard interface through which an AI client can discover tools and resources. The runtime still enforces permissions, validation and stopping rules.',
      long: 'An LLM generates tokens from its current context, so it does not automatically know private or current enterprise information. RAG retrieves authorized source passages and adds them to that context, ideally with citations. Tool calling lets the model propose a structured action, while the application validates and executes it. An agent repeats this process under explicit goals, state, budget and stop conditions. MCP provides a common protocol for exposing tools and resources to compatible clients. I would treat all model output as untrusted, apply least privilege, require human approval for high-impact actions and evaluate the complete workflow rather than only the model response.'
    }
  },
  {
    id: 'mvp-governance', slug: 'mvp-governance', order: 5,
    title: 'MVP, sicurezza e scaling', englishTitle: 'MVP, Security & Scaling',
    durationMinutes: 75, prerequisites: ['llm-agents'], masteryThreshold: 80,
    objectives: ['Progettare un pilot misurabile', 'Applicare governance e cybersecurity by design', 'Definire il passaggio da pilot a scala'],
    competencies: ['mvp-delivery', 'ai-governance', 'scaling'],
    blocks: [
      { id: 'discovery', eyebrow: '01 · Discover', title: 'Ridurre l’incertezza prima del codice', minutes: 12,
        body: ['Mappa stakeholder, processo attuale, decisione, dati, vincoli e rischio. Osserva il lavoro reale sul gemba, non soltanto la procedura dichiarata. Definisci sponsor, product owner e utenti operativi.', 'Una hypothesis statement collega cambiamento e misura: crediamo che [capacità] per [utente] migliori [KPI]; lo sapremo quando [soglia] entro [tempo].'],
        keyPoints: ['Go to the gemba', 'Name the decision owner', 'Turn assumptions into tests'] },
      { id: 'pilot', eyebrow: '02 · Deliver', title: 'Pilot controllato, end-to-end', minutes: 14,
        body: ['Scegli una linea o famiglia rappresentativa ma contenuta. Integra dati, modello, interfaccia, decisione e feedback. Usa shadow mode prima di automatizzare: il sistema produce raccomandazioni senza influire sul processo.', 'Confronta baseline e risultato su un periodo sufficiente. Documenta incidenti, override e cause di mancata adozione.'],
        keyPoints: ['Shadow mode before autonomy', 'Technical and operational acceptance', 'Rollback must be real'] },
      { id: 'security', eyebrow: '03 · Protect', title: 'Cybersecurity OT e AI', minutes: 14,
        body: ['Segmenta le reti, limita identità e privilegi, conserva segreti fuori dal codice, registra azioni e applica defense in depth. In OT disponibilità e safety hanno priorità speciale.', 'Per GenAI considera prompt injection, data exfiltration, strumenti eccessivamente potenti, dipendenze compromesse e output non affidabile. Recuperare un documento significa trattarne il contenuto come dati non fidati, non come istruzioni.'],
        keyPoints: ['Zero trust and least privilege', 'Treat model output as untrusted', 'Audit every consequential action'] },
      { id: 'governance', eyebrow: '04 · Govern', title: 'Ownership lungo il ciclo di vita', minutes: 12,
        body: ['Registra scopo, owner, dati, modello, versione, metriche, limitazioni, approvazioni e fallback. Monitora qualità tecnica, drift, impatto operativo, costi e incidenti.', 'Human-in-the-loop non significa aggiungere un pulsante Approva. La persona deve avere tempo, informazione, autorità e competenza per contestare il sistema.'],
        keyPoints: ['Accountability cannot be delegated', 'Monitoring includes business impact', 'Design meaningful human control'] },
      { id: 'scale', eyebrow: '05 · Scale', title: 'Standardizzare ciò che ha funzionato', minutes: 12,
        body: ['Prima di replicare, separa elementi comuni e variabilità locale: connettori, modello dati, deployment, monitoraggio, training e supporto. Una reference architecture accelera senza fingere che ogni stabilimento sia identico.', 'Il gate di scala richiede valore provato, affidabilità, sicurezza, owner operativo, support model, costo totale e piano di adozione.'],
        activity: { prompt: 'Il pilot migliora la precisione, ma gli operatori ignorano metà degli alert. Scali?', hint: 'No: indaga utilità, timing, falsi positivi, workflow e ownership prima di moltiplicare il problema.' },
        keyPoints: ['Prove value before replication', 'Platform plus local configuration', 'Adoption is a scaling gate'] }
    ],
    glossary: [
      term('Shadow mode', 'Modalità ombra', 'Esecuzione del sistema senza influenzare la decisione reale, per valutarne il comportamento.'),
      term('Human-in-the-loop', 'Supervisione umana nel ciclo', 'Progettazione in cui una persona esercita controllo informato su decisioni definite.'),
      term('Prompt injection', 'Iniezione nel prompt', 'Contenuto malevolo che tenta di alterare le istruzioni o indurre azioni non autorizzate.'),
      term('Model drift', 'Deriva del modello', 'Degrado del comportamento dovuto a cambiamenti di dati, processo o relazioni apprese.'),
      term('Reference architecture', 'Architettura di riferimento', 'Modello riusabile di componenti, confini e principi per implementazioni coerenti.')
    ],
    quiz: [
      q('mvp-q1', 'Perché usare shadow mode?', ['Per eliminare ogni test', 'Per valutare raccomandazioni senza influire sul processo reale', 'Per evitare la baseline', 'Per nascondere il progetto agli operatori'], 1, 'Shadow mode permette di misurare il comportamento in condizioni reali prima di affidargli conseguenze operative.'),
      q('mvp-q2', 'Qual è il trattamento corretto dell’output di un LLM?', ['Sempre affidabile se il modello è grande', 'Input non fidato da validare prima dell’uso', 'Equivalente a un comando PLC', 'Privo di rischi se usa RAG'], 1, 'Output e tool call devono essere validati e autorizzati; grandezza del modello e RAG non eliminano il rischio.'),
      q('mvp-q3', 'Quale condizione blocca correttamente lo scaling?', ['Il pilot ha una UI semplice', 'Manca ownership operativa e gli alert non vengono usati', 'Esiste una reference architecture', 'Il team misura i costi'], 1, 'Scalare senza adozione e ownership replica un prototipo, non una capacità operativa sostenibile.')
    ],
    interview: {
      prompt: 'How would you move an AI idea from discovery to scale in manufacturing?',
      short: 'I would define the operational problem and baseline, test the riskiest assumptions in a controlled end-to-end pilot, operate in shadow mode first, and scale only after value, safety, adoption, ownership and support are proven.',
      long: 'I would start at the gemba with the users and map the current decision, measurable loss, data and constraints. I would formulate a testable hypothesis and select a representative but bounded pilot. The MVP would include data integration, model, user workflow, feedback, monitoring and rollback, not only a notebook. I would begin in shadow mode, compare against the baseline and evaluate technical, operational and adoption metrics. Security, privacy, model limitations and meaningful human control would be designed from the beginning. A scaling gate would require proven value, stable performance, operational ownership, a support model and a reference architecture that separates reusable platform capabilities from local configuration.'
    }
  },
  {
    id: 'interview-lab', slug: 'interview-lab', order: 6,
    title: 'Interview Lab tecnico', englishTitle: 'Technical Interview Lab',
    durationMinutes: 90, prerequisites: ['mvp-governance'], masteryThreshold: 80,
    objectives: ['Strutturare risposte tecniche in inglese', 'Ragionare su un caso industriale incompleto', 'Comunicare trade-off e rischi'],
    competencies: ['technical-communication', 'case-structuring', 'stakeholder-reasoning'],
    blocks: [
      { id: 'structure', eyebrow: '01 · Answer structure', title: 'Rispondi in strati, non in un monologo', minutes: 12,
        body: ['Apri con una definizione di una frase. Aggiungi tre elementi strutturali. Collega un esempio industriale. Chiudi con un rischio o criterio decisionale. Questa struttura rende visibile il ragionamento anche quando l’inglese non è perfetto.', 'Se non conosci un dettaglio, chiarisci l’assunzione e descrivi come lo verificheresti. Non inventare esperienza diretta: trasferisci principi tecnici e mostra learning agility.'],
        keyPoints: ['Definition, structure, example, trade-off', 'State assumptions', 'Never bluff operational experience'] },
      { id: 'case', eyebrow: '02 · Case', title: 'La linea ha troppi fermi', minutes: 18,
        body: ['Scenario: una linea di confezionamento perde il 12% del tempo per fermate non pianificate. Il plant manager chiede predictive maintenance.', 'Prima di proporre il modello, chiedi asset critici, failure modes, durata e frequenza, storico di sensori e manutenzione, qualità delle etichette, processo decisionale, costo del falso allarme e finestra utile. Potresti scoprire che condition monitoring e migliore codifica delle cause sono il primo MVP.'],
        activity: { prompt: 'Prepara una risposta inglese di 2 minuti: approach, architecture, MVP, metrics, risks.', hint: 'Use: I would first clarify... The initial architecture would... I would validate... The main risks are...' },
        keyPoints: ['Diagnose before prescribing', 'Start with data readiness', 'Connect prediction to maintenance action'] },
      { id: 'architecture-case', eyebrow: '03 · Whiteboard', title: 'Spiega il flusso end-to-end', minutes: 18,
        body: ['Descrivi: sensor and PLC -> SCADA or historian -> edge ingestion -> contextualization with MES -> data platform -> model -> operator workflow -> feedback and monitoring.', 'Nomina i confini: controllo safety-critical resta locale; dati attraversano zone segmentate; identità e interfacce sono esplicite; il fallback permette di lavorare se AI o cloud non sono disponibili.'],
        diagram: ['Physical process', 'OT control', 'Operations context', 'AI service', 'Human action'],
        keyPoints: ['Show the decision loop', 'Name boundaries and owners', 'Explain degraded mode'] },
      { id: 'objections', eyebrow: '04 · Stakeholders', title: 'Gestisci obiezioni senza difendere la tecnologia', minutes: 15,
        body: ['Produzione teme interruzioni, IT teme sistemi non mantenibili, OT teme disponibilità e safety, cybersecurity teme nuovi percorsi di attacco, finanza teme un pilot infinito. Riconosci il rischio e proponi un meccanismo di riduzione.', 'Esempio: non dire che il modello è accurato al 95%. Spiega classe di errore, impatto, shadow mode, soglia, override e metrica operativa.'],
        keyPoints: ['Translate metrics into consequences', 'Make risk controls concrete', 'Invite operators into design and evaluation'] },
      { id: 'twenty', eyebrow: '05 · Simulation', title: 'Simulazione da 20 minuti', minutes: 20,
        body: ['Timer 0-2: presentazione e definizione della trasformazione digitale. 2-6: architettura OT/IT/AI/Cloud. 6-10: LLM, RAG, agenti e MCP. 10-16: caso di manutenzione. 16-20: rischi, MVP, stakeholder e domande.', 'Registra la voce. Al termine valuta: struttura, termini inglesi, esempi, assunzioni, metriche, sicurezza e concisione. Ripeti soltanto le due risposte più deboli.'],
        keyPoints: ['Practice aloud', 'Use a timer', 'Improve the weakest answer, not every answer'] }
    ],
    glossary: [
      term('Trade-off', 'Compromesso decisionale', 'Scelta che migliora un obiettivo accettando un costo su un altro.'),
      term('Assumption', 'Assunzione', 'Condizione ritenuta vera e resa esplicita per poterla verificare.'),
      term('Fallback', 'Modalità alternativa', 'Comportamento sicuro disponibile quando il sistema principale non funziona.'),
      term('Stakeholder alignment', 'Allineamento degli stakeholder', 'Accordo pratico su obiettivi, responsabilità, rischi e decisioni.'),
      term('Learning agility', 'Agilità di apprendimento', 'Capacità di acquisire rapidamente conoscenza e applicarla in contesti nuovi.')
    ],
    quiz: [
      q('int-q1', 'Qual è la struttura più efficace per una risposta tecnica?', ['Elenco di acronimi', 'Definizione, struttura, esempio e trade-off', 'Una storia senza conclusione', 'Solo dettagli implementativi'], 1, 'Una risposta stratificata comunica subito la tesi e rende verificabile il ragionamento.'),
      q('int-q2', 'Cosa fare se non conosci un dettaglio del processo produttivo?', ['Inventare un’esperienza', 'Ignorare la domanda', 'Dichiarare l’assunzione e spiegare come la verificheresti', 'Cambiare argomento'], 2, 'Trasparenza, domande mirate e metodo di verifica dimostrano rigore e learning agility.'),
      q('int-q3', 'Il plant manager chiede subito predictive maintenance. Qual è la prima risposta?', ['Scegliere un vendor', 'Chiarire failure modes, dati, decisione e baseline', 'Installare un LLM', 'Promettere riduzione del 50%'], 1, 'La tecnologia corretta dipende dal problema, dai dati disponibili e dall’azione che la previsione deve abilitare.')
    ],
    interview: {
      prompt: 'Why are you interested in an AI Digital Transformation Lead role?',
      short: 'I am interested in connecting operational challenges with practical AI and digital solutions. My strength is structured problem solving and rapid learning, and I want to build cross-functional systems that produce measurable improvements rather than isolated technology demos.',
      long: 'I am motivated by the point where business problems, operations and technology meet. AI creates value only when it improves a real decision or process, and this role owns that translation from discovery through adoption. I bring a strong interest in LLMs, automation and application architecture, together with structured problem solving and high learning agility. I am actively deepening my manufacturing architecture knowledge, and I approach gaps transparently: I clarify the process with operators and specialists, make assumptions explicit, and validate them through measurable experiments. My goal would be to help cross-functional teams deliver safe, maintainable solutions that improve quality, productivity or reliability and can scale beyond a single pilot.'
    }
  }
]

export const interviewQuestions = lessons.map((lesson) => ({
  lessonId: lesson.id,
  topic: lesson.englishTitle,
  prompt: lesson.interview.prompt,
  short: lesson.interview.short,
  long: lesson.interview.long
}))

export const allGlossary = lessons.flatMap((lesson) => lesson.glossary.map((entry) => ({ ...entry, lessonId: lesson.id })))

const t = (it, en) => ({ it, en })

/**
 * Module 5 - Governing, scaling and getting the transformation adopted.
 * This module adds the lead-level layer: several initiatives at once, who owns
 * what, real adoption, multi-site rollout, and value over time.
 * @type {import('../types.js').Lesson}
 */
export const governareScalareLesson = {
  id: 'governare-scalare',
  slug: 'governare-scalare',
  moduleNumber: 5,
  durationMinutes: 30,
  title: t('Governare, scalare e far adottare la trasformazione', 'Governing, scaling and getting the transformation adopted'),
  summary: t(
    'Dal singolo progetto al portafoglio, chi decide cosa, come si estende a più siti, cosa vuol dire adozione vera e come si governa il valore nel tempo.',
    'From a single project to a portfolio, who decides what, how to roll out across sites, what real adoption means, and how to govern value over time.'
  ),
  units: [
    {
      id: 'portafoglio-casi-uso',
      stage: 7,
      estimatedMinutes: 6,
      title: t('Dall\'idea singola al portafoglio di casi d\'uso', 'From a single idea to a portfolio of use cases'),
      stageLabel: t('Tappa 7 di 7, allargata: decidi in quale ordine muovere più idee.', 'Step 7 of 7, widened: you decide in which order to move several ideas.'),
      objective: t(
        'Saper ordinare più casi d\'uso con criteri dichiarati, e saper dire ad alta voce a cosa rinunci.',
        'Be able to order several use cases with declared criteria, and to say out loud what you give up.'
      ),
      theory: [
        t(
          'Un lead non gestisce una lista di idee, gestisce un portafoglio. La differenza conta: una lista è un accumulo, un portafoglio è una scelta, e una scelta comporta una rinuncia detta ad alta voce. Quando hai dieci proposte davanti, la domanda non è quale mi piace di più, ma quale crea valore credibile, con rischio gestibile, in un tempo utile, e può essere replicata.',
          'A lead does not manage a list of ideas, a lead manages a portfolio. The difference matters: a list is a pile, a portfolio is a choice, and a choice means giving something up out loud. With ten proposals in front of you, the question is not which one I like most, but which one creates credible value, with manageable risk, in useful time, and can be repeated.'
        ),
        t(
          'Per governarlo conviene dividere i casi in quattro famiglie. Quick win, vittoria rapida: valore abbastanza chiaro, dati sufficienti, rischio basso, risultato in poche settimane. Capability builder, costruttore di capacità: non è il caso più appariscente, ma crea un pezzo di infrastruttura o di competenza che sblocca casi futuri.',
          'To govern it, split the cases into four families. Quick win: value clear enough, data good enough, low risk, a result in a few weeks. Capability builder: not the flashiest case, but it creates a piece of infrastructure or skill that unlocks future cases.'
        ),
        t(
          'Big bet, scommessa grande: valore potenziale alto, molte dipendenze da risolvere prima. E distrazione elegante: idea interessante, demo bella, poca probabilità di impatto reale. Saper nominare la quarta famiglia, con calma, è metà del mestiere.',
          'Big bet: high potential value, many dependencies to solve first. And elegant distraction: an interesting idea, a nice demo, little chance of real impact. Being able to name that fourth family, calmly, is half the job.'
        ),
        t(
          'C\'è poi una regola che vale sempre: il primo caso non deve essere il più sofisticato, deve essere il più credibile. Se il primo progetto abbassa fermate, scarti o tempo perso in un modo che chiunque può leggere, crea fiducia. Senza fiducia il secondo progetto parte già in salita.',
          'Then there is a rule that always holds: the first case should not be the most sophisticated, it should be the most credible. If the first project cuts stops, scrap or wasted time in a way anyone can read, it builds trust. Without trust the second project starts uphill.'
        ),
        t(
          'In pratica il portafoglio si governa con le stesse cinque domande della prioritizzazione: quanto vale, quanto sono buoni i dati, quanto rischio operativo porta, in quanto tempo vedo qualcosa, quanto si può replicare. Se non sai rispondere a una di queste cinque, non hai ancora un caso d\'uso: hai un\'ipotesi.',
          'In practice the portfolio is governed with the same five questions as prioritisation: how much it is worth, how good the data is, how much operational risk it carries, how soon I see something, how far it can be repeated. If you cannot answer one of those five, you do not have a use case yet: you have an idea.'
        )
      ],
      keyPoints: [
        t('Una lista è un accumulo, un portafoglio è una scelta con una rinuncia dichiarata.', 'A list is a pile, a portfolio is a choice with a stated sacrifice.'),
        t('Il primo caso deve essere il più credibile, non il più sofisticato.', 'The first case must be the most credible, not the most sophisticated.'),
        t('Quando tutto è prioritario, in pratica niente lo è.', 'When everything is a priority, in practice nothing is.')
      ],
      terminology: [
        { id: 'portfolio', term: 'Portfolio', italian: 'Portafoglio iniziative', definition: t('Insieme ordinato di casi d\'uso con criteri e priorità, non un elenco di idee.', 'An ordered set of use cases with criteria and priorities, not a list of ideas.') },
        { id: 'quick-win', term: 'Quick win', italian: 'Vittoria rapida', definition: t('Caso che produce un risultato credibile in poco tempo e con basso rischio.', 'A case that produces a credible result quickly and at low risk.') },
        { id: 'capability-builder', term: 'Capability builder', italian: 'Costruttore di capacità', definition: t('Progetto che crea competenze o basi tecniche utili a molti casi futuri.', 'A project that creates skills or technical foundations useful to many future cases.') },
        { id: 'big-bet', term: 'Big bet', italian: 'Scommessa grande', definition: t('Caso con valore potenziale alto ma molte dipendenze da risolvere prima.', 'A case with high potential value but many dependencies to solve first.') },
        { id: 'distrazione-elegante', term: 'Elegant distraction', italian: 'Distrazione elegante', definition: t('Idea interessante con una bella demo e poca probabilità di impatto reale.', 'An interesting idea with a nice demo and little chance of real impact.') }
      ],
      example: {
        title: t('Dodici idee, budget per tre', 'Twelve ideas, budget for three'),
        table: {
          columns: [t('Idea', 'Idea'), t('Famiglia', 'Family'), t('Nota', 'Note')],
          rows: [
            [t('Ridurre i microfermi sulla linea di confezionamento', 'Cut micro-stops on the packaging line'), t('Quick win', 'Quick win'), t('Dati già presenti, valore leggibile', 'Data already there, readable value')],
            [t('Classificare in automatico i reclami', 'Classify complaints automatically'), t('Quick win', 'Quick win'), t('Utile, ma il dolore è minore', 'Useful, but the pain is smaller')],
            [t('Chatbot interno sulle procedure', 'Internal chatbot on procedures'), t('Distrazione elegante', 'Elegant distraction'), t('I documenti non sono ancora puliti', 'The documents are not clean yet')],
            [t('Ottimizzazione del piano di produzione', 'Production plan optimisation'), t('Big bet', 'Big bet'), t('Dipende da dati che oggi non parlano fra loro', 'It depends on data that does not talk to itself today')],
            [t('Collegare i dati di qualità al lotto', 'Link quality data to the batch'), t('Capability builder', 'Capability builder'), t('Sblocca controlli, analisi e tracciabilità', 'It unlocks checks, analysis and traceability')]
          ]
        },
        steps: [
          t('Hai raccolto 12 idee in 4 stabilimenti e il budget dell\'anno basta per farne bene 3.', 'You collected 12 ideas across 4 plants and the yearly budget is enough to do 3 of them properly.'),
          t('Primo: collegare qualità e lotto. Non è il progetto più visibile, ma senza di lui gli altri due restano demo.', 'First: link quality and batch. It is not the most visible project, but without it the other two stay demos.'),
          t('Secondo: ridurre i microfermi. Valore rapido e leggibile, costruisce fiducia.', 'Second: cut micro-stops. Fast, readable value that builds trust.'),
          t('Terzo: un caso più avanzato di qualità o manutenzione, che ora ha i dati per esistere.', 'Third: a more advanced quality or maintenance case, which now has the data to exist.')
        ],
        takeaway: t(
          'Il chatbot non è bocciato, è rimandato, con una condizione di rientro scritta: quando i documenti avranno una versione effettiva e permessi di accesso puliti.',
          'The chatbot is not rejected, it is postponed, with a written re-entry condition: when the documents have an effective version and clean access rights.'
        )
      },
      englishBlock: {
        lines: [
          'We do not manage a list of ideas. We manage a portfolio of use cases.',
          'A list is a pile. A portfolio means we also say no to something.',
          'The first project should be credible before it is impressive.',
          'We prioritise by value, data readiness, operational risk, time to impact, and how easily we can repeat it.',
          'This one is not rejected. It is on hold, and we wrote down what has to change for it to come back.'
        ],
        why: 'A pile, credible before impressive, on hold. Sono immagini che restano in testa a chi ti ascolta, ed evitano portfolio rationalisation o strategic alignment.'
      },
      quiz: [
        {
          id: 'm5u1-q1',
          prompt: 'Hai otto idee concorrenti. Qual è la domanda più professionale da fare per prima?',
          options: [
            'Quale usa la tecnologia più avanzata',
            'Quale piace di più allo sponsor',
            'Quale crea valore credibile con rischio gestibile e può essere replicata',
            'Quale fa più effetto in presentazione'
          ],
          correctOption: 2,
          explanation: 'Il portafoglio si governa per valore, rischio, tempo e replicabilità, non per fascino tecnologico.',
          final: true
        },
        {
          id: 'm5u1-q2',
          prompt: 'Che differenza c\'è tra una lista di idee e un portafoglio di casi d\'uso?',
          options: [
            'Nessuna, cambia solo il nome',
            'Il portafoglio è una scelta ordinata con criteri e priorità',
            'Il portafoglio contiene solo progetti di intelligenza artificiale',
            'La lista è più adatta alle aziende grandi'
          ],
          correctOption: 1,
          explanation: 'Lista vuol dire accumulo. Portafoglio vuol dire ordine, confronto e rinuncia.'
        },
        {
          id: 'm5u1-q3',
          prompt: 'Perché un capability builder può meritare priorità alta senza il ritorno più appariscente?',
          options: [
            'Perché costa di più',
            'Perché crea basi riutilizzabili che sbloccano casi futuri',
            'Perché piace all\'IT',
            'Perché evita di misurare'
          ],
          correctOption: 1,
          explanation: 'Alcuni progetti valgono perché ne rendono possibili altri, e un lead vede anche questo.'
        },
        {
          id: 'm5u1-q4',
          prompt: 'Qual è l\'errore tipico che fa sembrare inesperti in questa fase?',
          options: [
            'Chiedere una baseline',
            'Voler raccogliere più idee',
            'Trattare tutte le idee come se avessero la stessa priorità',
            'Coinvolgere produzione e qualità'
          ],
          correctOption: 2,
          explanation: 'Quando tutto è prioritario, in pratica niente lo è.'
        },
        {
          id: 'm5u1-q5',
          prompt: 'Quale primo progetto costruisce più fiducia nell\'organizzazione?',
          options: [
            'Quello più complesso',
            'Quello con la demo più elegante',
            'Quello che dimostra rapidamente un beneficio leggibile e difendibile',
            'Quello con più materiale di presentazione'
          ],
          correctOption: 2,
          explanation: 'Il primo risultato deve essere credibile: la fiducia viene prima della sofisticazione.'
        },
        {
          id: 'm5u1-q6',
          prompt: 'Nell\'esempio, perché il chatbot viene rimandato e non bocciato?',
          options: [
            'Perché lo sponsor ci tiene',
            'Perché ha una condizione di rientro scritta: documenti con versione effettiva e permessi puliti',
            'Perché costa poco',
            'Perché serve a fare esperienza'
          ],
          correctOption: 1,
          explanation: 'Un no professionale ha sempre una condizione di rientro. Senza, è solo un rifiuto.'
        },
        {
          id: 'm5u1-q7',
          prompt: 'Cosa distingue un caso d\'uso da un\'ipotesi?',
          options: [
            'L\'approvazione dello sponsor',
            'La presenza di un fornitore',
            'Il fatto di saper rispondere a valore, dati, rischio, tempo e replicabilità',
            'L\'esistenza di un budget dedicato'
          ],
          correctOption: 2,
          explanation: 'Se una delle cinque risposte manca, non stai ancora scegliendo: stai ancora esplorando.'
        }
      ],
      sourceIds: ['pmi-state-of-ai', 'nist-ai-rmf-1-0']
    },

    {
      id: 'operating-model',
      stage: 6,
      estimatedMinutes: 6,
      title: t('Chi decide cosa: sponsor, owner e modello operativo', 'Who decides what: sponsor, owners and operating model'),
      stageLabel: t('Fra la scelta e la scala: se non chiarisci chi decide, il progetto si blocca alla prima eccezione.', 'Between choosing and scaling: if you do not clarify who decides, the project stalls at the first exception.'),
      objective: t(
        'Saper assegnare le decisioni a ruoli precisi, così che un problema si chiuda invece di moltiplicarsi.',
        'Be able to assign decisions to precise roles, so a problem closes instead of multiplying.'
      ),
      theory: [
        t(
          'Una trasformazione digitale fallisce spesso per un motivo banale: tutti partecipano, nessuno possiede. La riunione è piena, la responsabilità è vuota. Per evitarlo servono pochi ruoli chiari, e vanno definiti prima del pilota, non dopo.',
          'A digital transformation often fails for a plain reason: everyone takes part, nobody owns. The meeting is full, the accountability is empty. To avoid it you need a few clear roles, defined before the pilot, not after.'
        ),
        t(
          'Lo sponsor mette peso, priorità e protezione, e decide se il costo di una correzione vale la pena adesso o il trimestre prossimo. Il responsabile di processo possiede il processo operativo che vuoi migliorare, e decide se una cosa entra davvero nella routine del turno. Il responsabile del dato risponde di definizione, correttezza e qualità del dato.',
          'The sponsor brings weight, priority and protection, and decides whether the cost of a fix is worth it now or next quarter. The process owner owns the operational process you want to improve, and decides whether something really enters the shift routine. The data owner answers for the definition, correctness and quality of the data.'
        ),
        t(
          'Il responsabile della soluzione, in inglese solution owner o model owner, risponde della logica del sistema, del suo comportamento e della sua manutenzione. IT e piattaforma garantiscono basi, integrazione, registrazione degli eventi e controlli. Qualità e sicurezza definiscono i paletti non negoziabili e i criteri di conformità.',
          'The solution owner, sometimes model owner, answers for the logic of the system, its behaviour and its maintenance. IT and platform provide the foundations, integration, event logging and controls. Quality and security define the non-negotiable limits and the compliance criteria.'
        ),
        t(
          'Il modello operativo, in inglese operating model, non è burocrazia: è il contrario, è il modo più veloce per non rifare le stesse discussioni ogni volta. Quando un avviso è sbagliato, quando un indicatore peggiora, quando un sito chiede una variante, devi sapere subito chi decide, chi si consulta e chi esegue.',
          'The operating model is not bureaucracy: it is the opposite, it is the fastest way not to repeat the same discussions every time. When an alert is wrong, when an indicator gets worse, when a site asks for a variation, you have to know immediately who decides, who is consulted and who executes.'
        ),
        t(
          'In un modello sano il team centrale non fa tutto: costruisce guardrail, cioè paletti comuni. I team locali non inventano ogni regola da zero: portano il contesto operativo. Standard al centro, decisioni di valore vicino al processo. E se devi dirlo in una frase: lo sponsor non gestisce i dettagli, il tecnico non approva il rischio di business, e il responsabile di processo non può scaricare su un fornitore una decisione che cambia il lavoro reale.',
          'In a healthy model the central team does not do everything: it builds guardrails, that is common limits. Local teams do not invent every rule from scratch: they bring the operating context. Standards at the centre, value decisions close to the process. And if you have to say it in one sentence: the sponsor does not manage details, the engineer does not approve business risk, and the process owner cannot push onto a supplier a decision that changes real work.'
        )
      ],
      keyPoints: [
        t('Tutti partecipano, nessuno possiede: è così che si blocca un progetto.', 'Everyone takes part, nobody owns: that is how a project stalls.'),
        t('Standard e paletti al centro, decisioni di valore vicino al processo.', 'Standards and guardrails at the centre, value decisions close to the process.'),
        t('Con i ruoli chiari il problema si chiude, senza si moltiplica.', 'With clear roles the problem closes, without them it multiplies.')
      ],
      terminology: [
        { id: 'solution-owner', term: 'Solution owner', italian: 'Responsabile della soluzione', definition: t('Chi risponde della logica del sistema, del suo comportamento e della sua manutenzione.', 'Whoever answers for the logic of the system, its behaviour and its maintenance.') },
        { id: 'guardrail', term: 'Guardrail', italian: 'Paletti comuni', definition: t('Regole condivise che permettono velocità senza perdere il controllo.', 'Shared rules that allow speed without losing control.') },
        { id: 'operating-model-term', term: 'Operating model', italian: 'Modello operativo', definition: t('Il modo in cui ruoli, decisioni e responsabilità sono distribuiti.', 'The way roles, decisions and accountability are distributed.') },
        { id: 'escalation', term: 'Escalation', italian: 'Passaggio di livello', definition: t('Il percorso dichiarato per portare una decisione a chi ha l\'autorità di prenderla.', 'The declared path to bring a decision to whoever has the authority to take it.') },
        { id: 'raci', plain: true, term: 'Decision map', italian: 'Mappa delle decisioni', definition: t('L\'elenco scritto di chi decide, chi si consulta e chi esegue.', 'The written list of who decides, who is consulted and who executes.') }
      ],
      example: {
        title: t('Un sistema segnala difetti e dopo tre settimane succede tutto insieme', 'A system flags defects and after three weeks everything happens at once'),
        table: {
          columns: [t('Chi', 'Who'), t('Decide cosa', 'Decides what')],
          rows: [
            [t('Qualità', 'Quality'), t('La soglia accettabile di difetto sfuggito', 'The acceptable level of missed defects')],
            [t('Responsabile di processo', 'Process owner'), t('Se l\'avviso entra davvero nella routine del turno', 'Whether the alert really enters the shift routine')],
            [t('Responsabile del dato', 'Data owner'), t('Che immagini ed esiti siano coerenti e allineati nel tempo', 'That images and outcomes are consistent and aligned in time')],
            [t('Responsabile della soluzione', 'Solution owner'), t('Come si modifica il modello e con quali prove', 'How the model is changed and with what evidence')],
            [t('IT', 'IT'), t('Registrazione degli eventi e tracciabilità', 'Event logging and traceability')],
            [t('Sponsor', 'Sponsor'), t('Se il costo della correzione vale adesso o il trimestre prossimo', 'Whether the cost of the fix is worth it now or next quarter')]
          ]
        },
        steps: [
          t('Senza ruoli chiari parte la riunione in cui tutti hanno un\'opinione e nessuno ha il potere di chiudere.', 'Without clear roles you get the meeting where everyone has an opinion and nobody has the power to close.'),
          t('Gli operatori dicono che alcuni avvisi non servono, qualità chiede più prudenza, IT nota registri incompleti, il fornitore chiede più immagini.', 'Operators say some alerts are useless, quality asks for more caution, IT notes incomplete logs, the supplier asks for more images.'),
          t('Con la mappa delle decisioni ogni obiezione ha un destinatario, e il problema si chiude in 1 settimana invece di trascinarsi per 3 mesi.', 'With the decision map every objection has an addressee, and the problem closes in 1 week instead of dragging on for 3 months.')
        ],
        takeaway: t(
          'La differenza non è formale, è pratica: con i ruoli chiari il problema si chiude, senza si moltiplica.',
          'The difference is not formal, it is practical: with clear roles the problem closes, without them it multiplies.'
        )
      },
      englishBlock: {
        lines: [
          'Everyone can contribute, but ownership has to be explicit.',
          'The sponsor protects the initiative. The process owner protects the daily reality of the shift.',
          'The central team gives common guardrails. The local team owns the business value.',
          'If nobody owns the decision, the project stops at the first exception.'
        ],
        why: 'Own, ownership, guardrails, stops at the first exception. Il verbo to own è la parola chiave di questa unità e vale la pena usarla, perché è quella che userebbe un madrelingua.'
      },
      quiz: [
        {
          id: 'm5u2-q1',
          prompt: 'Qual è il segnale più chiaro che il modello operativo è debole?',
          options: [
            'Ci sono molti portatori di interesse',
            'Tutti danno il proprio contributo ma nessuno sa chi approva una modifica',
            'Il progetto usa il cloud',
            'Il fornitore fa molte domande'
          ],
          correctOption: 1,
          explanation: 'Il problema non è avere molte funzioni coinvolte, è non sapere chi decide.',
          final: true
        },
        {
          id: 'm5u2-q2',
          prompt: 'Chi dovrebbe decidere se un avviso entra nella routine operativa del turno?',
          options: [
            'Solo il fornitore',
            'Solo l\'IT',
            'Il responsabile di processo, confrontandosi con qualità e team tecnico',
            'Lo sponsor, da solo'
          ],
          correctOption: 2,
          explanation: 'La routine di lavoro appartiene al processo, e il processo ha un proprietario.'
        },
        {
          id: 'm5u2-q3',
          prompt: 'A cosa serve davvero un guardrail comune?',
          options: [
            'A rallentare i team locali',
            'A uniformare l\'aspetto delle interfacce',
            'A permettere velocità senza perdere il controllo su rischio, sicurezza e standard',
            'A evitare qualunque eccezione'
          ],
          correctOption: 2,
          explanation: 'Il paletto buono non blocca tutto: evita che ogni team reinventi le regole critiche.'
        },
        {
          id: 'm5u2-q4',
          prompt: 'Quale frase descrive meglio il ruolo dello sponsor?',
          options: [
            'Scrive le specifiche tecniche',
            'Gestisce tutte le soglie del modello',
            'Protegge il progetto, assegna priorità e sblocca decisioni',
            'Sostituisce il responsabile di processo'
          ],
          correctOption: 2,
          explanation: 'Lo sponsor dà peso e direzione, e non va confuso con i ruoli operativi o tecnici.'
        },
        {
          id: 'm5u2-q5',
          prompt: 'Qual è l\'errore classico all\'inizio di una trasformazione?',
          options: [
            'Separare i ruoli troppo presto',
            'Pensare che le responsabilità emergeranno da sole strada facendo',
            'Coinvolgere qualità',
            'Definire una baseline'
          ],
          correctOption: 1,
          explanation: 'Se non definisci chi possiede cosa all\'inizio, lo definirà la realtà nel momento peggiore.'
        },
        {
          id: 'm5u2-q6',
          prompt: 'Nell\'esempio, chi decide la soglia accettabile di difetto sfuggito?',
          options: ['Il responsabile della soluzione', 'Qualità', 'L\'IT', 'Il fornitore'],
          correctOption: 1,
          explanation: 'È un criterio di conformità, e la conformità appartiene a qualità: il tecnico propone, non approva il rischio.'
        },
        {
          id: 'm5u2-q7',
          prompt: 'Come si divide il lavoro tra team centrale e team locali in un modello che scala?',
          options: [
            'Il centro fa tutto e i siti eseguono',
            'Ogni sito è autonomo su tutto',
            'Standard e paletti al centro, decisioni di valore vicino al processo',
            'Si decide caso per caso'
          ],
          correctOption: 2,
          explanation: 'È l\'equilibrio che permette di restare confrontabili senza diventare rigidi.'
        }
      ],
      sourceIds: ['microsoft-ai-readiness', 'nist-ai-rmf-1-0']
    },

    {
      id: 'scalare-multi-sito',
      stage: 7,
      estimatedMinutes: 6,
      title: t('Come si scala da una linea a più siti', 'How you scale from one line to several sites'),
      stageLabel: t('Estensione della tappa 7: la soluzione può vivere fuori da dove è nata?', 'Extension of step 7: can the solution live outside where it was born?'),
      objective: t(
        'Saper dire cosa resta standard e cosa si adatta, e quando un sito non entra nell\'ondata.',
        'Be able to say what stays standard and what adapts, and when a site does not join the wave.'
      ),
      theory: [
        t(
          'Scalare non significa copiare e incollare. Se fai solo questo, replichi anche gli errori. Scalare significa decidere che cosa deve restare standard e che cosa va adattato, e dirlo prima di partire.',
          'Scaling does not mean copy and paste. If that is all you do, you copy the mistakes too. Scaling means deciding what has to stay standard and what has to be adapted, and saying so before you start.'
        ),
        t(
          'Standard dovrebbero essere almeno cinque cose: l\'indicatore e la sua definizione, la definizione del problema, la logica di decisione, i criteri di successo e i controlli di sicurezza. Se un sito chiama fermo breve quello che un altro chiama microfermo, il confronto si rompe ancora prima di partire.',
          'At least five things should stay standard: the indicator and its definition, the definition of the problem, the decision logic, the success criteria and the safety controls. If one site calls short stop what another calls micro-stop, the comparison breaks before you even start.'
        ),
        t(
          'Locale è invece tutto ciò che dipende dalla realtà del posto: macchine, formati, turni, disciplina di registrazione, competenze presenti, capacità di revisione, vincoli di qualità. Per questo un\'estensione seria parte sempre da una baseline locale, non per rifare il pilota da zero, ma per capire quanto il sito nuovo è davvero simile al primo.',
          'Local is everything that depends on the reality of the place: machines, formats, shifts, recording discipline, skills present, review capacity, quality constraints. That is why a serious rollout always starts from a local baseline, not to redo the pilot from scratch, but to understand how similar the new site really is to the first one.'
        ),
        t(
          'Serve poi una domanda scomoda: stiamo scalando la soluzione o stiamo distribuendo il problema? Se il sito originale aveva un capoturno molto coinvolto e gli altri no, l\'estensione tecnica riesce mentre quella operativa fallisce, e la tecnologia arriva prima della capacità di usarla.',
          'Then you need an awkward question: are we scaling the solution or distributing the problem? If the original site had a very engaged shift leader and the others do not, the technical rollout succeeds while the operational one fails, and the technology arrives before the ability to use it.'
        ),
        t(
          'La regola semplice è questa: centralizza quello che ti protegge e ti fa imparare più in fretta, localizza quello che dipende dalla realtà fisica e organizzativa del sito. E se a un sito mancano dati confrontabili, uno sponsor locale o un ripiego chiaro, quel sito non entra nell\'ondata successiva. Non è una bocciatura, è disciplina.',
          'The simple rule is this: centralise what protects you and makes you learn faster, localise what depends on the physical and organisational reality of the site. And if a site lacks comparable data, a local sponsor or a clear fallback, that site does not join the next wave. It is not a punishment, it is discipline.'
        )
      ],
      keyPoints: [
        t('Standard il KPI e la logica, locale il contesto operativo.', 'Standard the KPI and the logic, local the operating context.'),
        t('Ogni sito nuovo parte da una baseline locale.', 'Every new site starts from a local baseline.'),
        t('Un sito senza condizioni minime resta fuori dall\'ondata, e non è una bocciatura.', 'A site without the minimum conditions stays out of the wave, and that is not a punishment.')
      ],
      terminology: [
        { id: 'rollout', term: 'Rollout', italian: 'Estensione operativa', definition: t('Il passaggio da un sito pilota a più linee o stabilimenti.', 'The move from a pilot site to several lines or plants.') },
        { id: 'baseline-locale', plain: true, term: 'Local baseline', italian: 'Baseline locale', definition: t('Misura iniziale del sito nuovo, prima di introdurre la soluzione.', 'The initial measurement of the new site, before the solution arrives.') },
        { id: 'standardizzazione', term: 'Standardisation', italian: 'Standardizzazione', definition: t('La parte del sistema che resta uguale ovunque, per garantire confronto e controllo.', 'The part of the system that stays the same everywhere, to keep comparison and control.') },
        { id: 'localizzazione', term: 'Localisation', italian: 'Adattamento locale', definition: t('La parte che cambia per rispettare il contesto del sito.', 'The part that changes to respect the context of the site.') },
        { id: 'scalabilita', term: 'Scalability', italian: 'Scalabilità', definition: t('Capacità di estendere senza perdere controllo, qualità o valore.', 'The ability to extend without losing control, quality or value.') },
        { id: 'ondata', plain: true, term: 'Wave', italian: 'Ondata di estensione', definition: t('Gruppo di siti che entrano insieme, con condizioni minime verificate.', 'A group of sites entering together, with minimum conditions verified.') }
      ],
      example: {
        title: t('Meno 18 percento di microfermi, e tre siti che vogliono la stessa cosa', 'Minus 18 percent micro-stops, and three sites that want the same thing'),
        table: {
          columns: [t('Sito', 'Site'), t('Condizione', 'Condition'), t('Decisione', 'Decision')],
          rows: [
            [t('Sito 1', 'Site 1'), t('Sensori stabili, causali usate bene, capoturno coinvolto, manutenzione che risponde in giornata', 'Stable sensors, cause codes used well, engaged shift leader, maintenance answering same day'), t('Prima ondata', 'First wave')],
            [t('Sito 2', 'Site 2'), t('Codici fermo usati male, baseline non confrontabile', 'Stop codes used badly, baseline not comparable'), t('Fuori, finché la registrazione non è sistemata', 'Out, until recording is fixed')],
            [t('Sito 3', 'Site 3'), t('Cambia formato quattro volte più spesso', 'Changes format four times more often'), t('Prima ondata, con soglie riviste e formazione dedicata', 'First wave, with revised thresholds and dedicated training')],
            [t('Sito 4', 'Site 4'), t('Nessuna baseline affidabile, nessun ripiego dichiarato', 'No reliable baseline, no declared fallback'), t('Fuori dalla prossima ondata', 'Out of the next wave')]
          ]
        },
        steps: [
          t('Teniamo uguali indicatore, logica e soglie di riporto; adattiamo interfaccia, formazione e regole locali.', 'We keep the indicator, the logic and the reporting thresholds the same; we adapt interface, training and local rules.'),
          t('Verifichiamo dati confrontabili, sponsor locale e ripiego prima di far entrare un sito.', 'We check comparable data, a local sponsor and a fallback before letting a site in.'),
          t('Il secondo e il terzo sito costano meno del primo, perché il primo ha già pagato raccolta dati, archivio, procedura e formazione.', 'The second and third sites cost less than the first, because the first already paid for data collection, storage, procedure and training.')
        ],
        takeaway: t(
          'Il sito 3 entra perché il cambio formato è contesto, e il contesto si adatta. Il sito 2 resta fuori perché i dati non confrontabili sono una condizione mancante.',
          'Site 3 joins because format changes are context, and context can be adapted. Site 2 stays out because non-comparable data is a missing condition.'
        )
      },
      englishBlock: {
        lines: [
          'Scaling is not copy and paste. If you only copy, you copy the mistakes too.',
          'We standardise the KPI, the decision logic and the safety controls. We localise training, interface and local rules.',
          'Every new site starts with its own baseline. Otherwise you confuse context with effect.',
          'If a site has no comparable data and no clear fallback, it does not join the next wave. That is discipline, not a punishment.'
        ],
        why: 'Copy and paste, join the next wave, discipline not a punishment. L\'ultima è la frase che ti fa sembrare uno che un\'estensione l\'ha già gestita davvero.'
      },
      quiz: [
        {
          id: 'm5u3-q1',
          prompt: 'Qual è la frase più corretta sull\'estensione multi-sito?',
          options: [
            'Se il pilota funziona, basta copiarlo ovunque',
            'Ogni sito deve reinventare la soluzione',
            'Si standardizzano indicatore e logica, si adattano i dettagli locali',
            'La parte locale non conta se il modello è buono'
          ],
          correctOption: 2,
          explanation: 'Scalare bene richiede insieme confronto e adattamento.',
          final: true
        },
        {
          id: 'm5u3-q2',
          prompt: 'Perché serve una baseline locale anche se il pilota è già riuscito altrove?',
          options: [
            'Per rispettare la procedura',
            'Per capire quanto il contesto nuovo è davvero simile e misurare il risultato reale',
            'Per rifare tutta la progettazione',
            'Per coinvolgere l\'IT'
          ],
          correctOption: 1,
          explanation: 'Senza punto di partenza locale confondi le differenze di contesto con l\'effetto della soluzione.'
        },
        {
          id: 'm5u3-q3',
          prompt: 'Quale elemento dovrebbe restare standard fra siti diversi?',
          options: [
            'La disposizione fisica dei macchinari',
            'La definizione dell\'indicatore e il criterio di successo',
            'Il numero di turni',
            'Il fornitore della formazione'
          ],
          correctOption: 1,
          explanation: 'Se l\'indicatore cambia significato da un sito all\'altro, il confronto si rompe.'
        },
        {
          id: 'm5u3-q4',
          prompt: 'Qual è il rischio tipico di un\'estensione fatta troppo in fretta?',
          options: [
            'Ridurre il numero di riunioni',
            'Distribuire una soluzione senza la capacità locale di usarla bene',
            'Avere troppi sponsor',
            'Abbassare il costo di replica'
          ],
          correctOption: 1,
          explanation: 'La tecnologia può arrivare prima della capacità operativa, ed è lì che l\'estensione si incrina.'
        },
        {
          id: 'm5u3-q5',
          prompt: 'Un sito non ha dati confrontabili né un ripiego chiaro. Cosa fai?',
          options: [
            'Lo inserisci lo stesso per non rallentare',
            'Compri subito nuovi sistemi',
            'Lo tieni fuori dall\'ondata finché le condizioni minime non ci sono',
            'Cambi l\'indicatore per farlo entrare'
          ],
          correctOption: 2,
          explanation: 'Forzare un sito impreparato distrugge la credibilità di tutto il programma.'
        },
        {
          id: 'm5u3-q6',
          prompt: 'Nell\'esempio, perché il sito 3 entra comunque nella prima ondata?',
          options: [
            'Perché è il più grande',
            'Perché cambia formato più spesso, ma questo si gestisce con soglie riviste e formazione',
            'Perché ha lo stesso capoturno del sito 1',
            'Perché non serviva baseline'
          ],
          correctOption: 1,
          explanation: 'Il cambio formato è contesto e il contesto si adatta. I dati non confrontabili invece sono una condizione mancante.'
        },
        {
          id: 'm5u3-q7',
          prompt: 'Perché il secondo e il terzo sito costano meno del primo?',
          options: [
            'Perché si compra in volume',
            'Perché raccolta dati, archivio, procedura e formazione esistono già',
            'Perché il modello è più preciso',
            'Perché si riduce il perimetro'
          ],
          correctOption: 1,
          explanation: 'Il primo caso paga l\'infrastruttura per tutti, e conviene dirlo all\'inizio, non alla fine.'
        }
      ],
      sourceIds: ['aws-mlops-planning', 'azure-landing-zone']
    },

    {
      id: 'adozione-reale',
      stage: 6,
      estimatedMinutes: 6,
      title: t('Adozione reale: cambiare il lavoro, non installare uno strumento', 'Real adoption: changing the work, not installing a tool'),
      stageLabel: t('Torna al cuore del corso: cambiare in modo misurabile come si lavora.', 'Back to the heart of the course: changing in a measurable way how people work.'),
      objective: t(
        'Saper distinguere adozione vera e adozione finta, e misurarla con il numero giusto.',
        'Be able to tell real adoption from fake adoption, and measure it with the right number.'
      ),
      theory: [
        t(
          'Uno strumento può essere installato, accessibile e perfino apprezzato in una demo, e non essere adottato. Adozione vuol dire un\'altra cosa: entra nella routine, influenza una decisione vera, sostituisce un pezzo di lavoro precedente.',
          'A tool can be installed, available and even liked in a demo, and still not be adopted. Adoption means something else: it enters the routine, it changes a real decision, it replaces a piece of previous work.'
        ),
        t(
          'Il primo segnale di adozione finta è semplice: il sistema esiste, ma il lavoro vero continua altrove. Gli operatori tornano a Excel, alla carta, alla chat, al telefono, alla memoria personale. Non perché siano resistenti al cambiamento, ma quasi sempre perché lo strumento aggiunge fatica invece di toglierla.',
          'The first sign of fake adoption is simple: the system exists, but the real work carries on somewhere else. Operators go back to Excel, paper, chat, the phone, their own memory. Not because they resist change, but almost always because the tool adds effort instead of removing it.'
        ),
        t(
          'Per questo la domanda non è "abbiamo fatto la formazione". La domanda è: cosa cambia alle sei del mattino, durante il cambio turno, con rumore, fretta e una macchina ferma? Se il sistema non aiuta lì, non aiuta.',
          'That is why the question is not "did we run the training". The question is: what changes at six in the morning, during the shift handover, with noise, hurry and a machine down? If the system does not help there, it does not help.'
        ),
        t(
          'L\'adozione cresce quando fai quattro cose bene: coinvolgi presto chi userà lo strumento, dici chiaramente cosa cambia e cosa non cambia, riduci il carico invece di aggiungerlo, e misuri l\'uso reale insieme all\'utilità reale. Un corso senza una nuova abitudine è documentazione, non trasformazione.',
          'Adoption grows when you do four things well: involve early the people who will use the tool, say clearly what changes and what does not, reduce the load instead of adding to it, and measure real usage together with real usefulness. Training without a new habit is documentation, not transformation.'
        ),
        t(
          'Un lead maturo non dice "abbiamo formato centoventi persone, quindi siamo a posto". Dice: dopo otto settimane lo strumento viene usato nell\'85 percento dei casi previsti, gli avvisi ignorati sono scesi, i tempi di decisione sono migliorati, e il reparto non è tornato al foglio di calcolo. Quella è adozione.',
          'A mature lead does not say "we trained a hundred and twenty people, so we are fine". They say: after eight weeks the tool is used in 85 percent of the expected cases, ignored alerts are down, decision times improved, and the department has not gone back to the spreadsheet. That is adoption.'
        )
      ],
      keyPoints: [
        t('Adozione è comportamento cambiato, non formazione completata.', 'Adoption is behaviour changed, not training completed.'),
        t('Se il lavoro vero continua su Excel o su carta, la soluzione non è adottata.', 'If the real work carries on in Excel or on paper, the solution is not adopted.'),
        t('La misura giusta è la quota di casi previsti in cui la soluzione viene usata bene.', 'The right measure is the share of expected cases where the solution is used properly.')
      ],
      terminology: [
        { id: 'engagement', term: 'Engagement', italian: 'Coinvolgimento', definition: t('Partecipazione attiva di chi userà o subirà il cambiamento.', 'Active involvement of the people who will use or undergo the change.') },
        { id: 'champion', term: 'Champion', italian: 'Ambasciatore interno', definition: t('Persona credibile sul campo che aiuta gli altri ad adottare il nuovo modo di lavorare.', 'A credible person on the floor who helps others adopt the new way of working.') },
        { id: 'user-journey', term: 'User journey', italian: 'Percorso utente', definition: t('I passi concreti che una persona compie usando la soluzione.', 'The concrete steps a person takes while using the solution.') },
        { id: 'attrito', plain: true, term: 'Friction', italian: 'Attrito', definition: t('Il carico in più che lo strumento chiede nel momento peggiore del turno.', 'The extra load the tool asks for at the worst moment of the shift.') },
        { id: 'abitudine', plain: true, term: 'Habit', italian: 'Abitudine', definition: t('Il comportamento che resta quando nessuno sta più guardando il progetto.', 'The behaviour that remains when nobody is watching the project any more.') }
      ],
      example: {
        title: t('Un assistente per classificare le cause di fermo', 'An assistant to classify downtime causes'),
        steps: [
          t('Nelle demo funziona bene, ma dopo un mese metà dei turni continua a usare i vecchi codici copiati dalla settimana prima.', 'It works well in demos, but after a month half the shifts still copy last week\'s codes.'),
          t('Il flusso nuovo richiede 3 clic in più proprio nel momento peggiore del turno.', 'The new flow asks for 3 extra clicks at the worst moment of the shift.'),
          t('Alcune causali non parlano il linguaggio del reparto, e nessuno ha spiegato come verrà usata l\'informazione.', 'Some cause codes do not speak the language of the floor, and nobody explained how the information will be used.'),
          t('La correzione: ridurre i passaggi, ripulire le causali, coinvolgere 2 capoturno come ambasciatori, misurare l\'uso reale.', 'The fix: cut the steps, clean up the cause codes, involve 2 shift leaders as champions, measure real usage.')
        ],
        takeaway: t(
          'Gli operatori non stanno sabotando: stanno difendendo la continuità del turno. Quando lo strumento toglie fatica invece di aggiungerla, l\'adozione sale quasi da sola.',
          'The operators are not sabotaging anything: they are protecting the continuity of the shift. When the tool removes effort instead of adding it, adoption rises almost by itself.'
        )
      },
      englishBlock: {
        lines: [
          'Adoption is not training completed. Adoption is behaviour changed.',
          'If people go back to Excel or paper, the tool is not really adopted yet.',
          'We measure usage, trust and operational impact, not attendance at training.',
          'The tool has to remove friction in the real shift, at six in the morning, not in the demo.'
        ],
        why: 'Training completed, behaviour changed, go back to Excel, remove friction. La prima coppia è la frase migliore del modulo: dilla esattamente così.'
      },
      quiz: [
        {
          id: 'm5u4-q1',
          prompt: 'Qual è il segnale più chiaro di adozione finta?',
          options: [
            'Molte persone hanno fatto la formazione',
            'La demo è piaciuta',
            'Il lavoro vero continua su strumenti paralleli come Excel o la carta',
            'Lo sponsor parla del progetto in assemblea'
          ],
          correctOption: 2,
          explanation: 'Se la routine non cambia, non c\'è ancora trasformazione reale.',
          final: true
        },
        {
          id: 'm5u4-q2',
          prompt: 'Quale frase è più corretta sull\'adozione?',
          options: [
            'Basta formare tutti una volta',
            'Adozione vuol dire avere accesso tecnico alla soluzione',
            'Adozione vuol dire uso stabile che cambia una decisione o un passaggio di lavoro',
            'Adozione e installazione coincidono'
          ],
          correctOption: 2,
          explanation: 'La soluzione adottata entra nel lavoro quotidiano e sposta davvero il comportamento.'
        },
        {
          id: 'm5u4-q3',
          prompt: 'Gli operatori ignorano gli avvisi. Qual è la prima lettura professionale?',
          options: [
            'Non vogliono cambiare',
            'Il reparto è ostile alla tecnologia',
            'Capire se gli avvisi aggiungono rumore, attrito o mancanza di fiducia',
            'Sostituire le persone meno collaborative'
          ],
          correctOption: 2,
          explanation: 'La resistenza è quasi sempre il sintomo di un cattivo disegno operativo, non di cattiva volontà.'
        },
        {
          id: 'm5u4-q4',
          prompt: 'Quale leva aumenta più probabilmente l\'adozione reale?',
          options: [
            'Aggiungere campi obbligatori',
            'Coinvolgere presto gli utenti e ridurre il carico del flusso',
            'Tenere riservato l\'obiettivo del progetto',
            'Spostare ogni decisione al team centrale'
          ],
          correctOption: 1,
          explanation: 'Le persone adottano ciò che capiscono, che possono influenzare e che trovano utile.'
        },
        {
          id: 'm5u4-q5',
          prompt: 'Quale misura è più vicina all\'adozione vera?',
          options: [
            'Il numero di presentazioni fatte',
            'I partecipanti alla riunione di avvio',
            'La percentuale di casi previsti in cui la soluzione viene usata correttamente',
            'Il numero di licenze acquistate'
          ],
          correctOption: 2,
          explanation: 'Licenze e formazione misurano disponibilità. L\'adozione misura comportamento.'
        },
        {
          id: 'm5u4-q6',
          prompt: 'Nell\'esempio, qual è la correzione più efficace?',
          options: [
            'Ripetere il corso di formazione',
            'Togliere i tre clic in più e ripulire le causali con le parole del reparto',
            'Rendere obbligatorio l\'uso del sistema',
            'Cambiare fornitore'
          ],
          correctOption: 1,
          explanation: 'Se lo strumento toglie fatica invece di aggiungerla, l\'adozione sale quasi da sola.'
        },
        {
          id: 'm5u4-q7',
          prompt: 'Perché conviene dichiarare subito a cosa servono i dati raccolti?',
          options: [
            'Perché lo impone la procedura',
            'Perché se le persone sospettano di essere valutate useranno il sistema in modo difensivo e i dati diventeranno inutili',
            'Perché riduce i costi',
            'Perché velocizza la formazione'
          ],
          correctOption: 1,
          explanation: 'È la paura che nessuno dice ad alta voce, e va affrontata per prima.'
        }
      ],
      sourceIds: ['microsoft-adoption-change', 'microsoft-ai-readiness']
    },

    {
      id: 'valore-nel-tempo',
      stage: 7,
      estimatedMinutes: 6,
      title: t('Governare il valore nel tempo', 'Governing value over time'),
      stageLabel: t('Ultima tappa portata fino in fondo: il valore regge dopo un anno?', 'The last step taken all the way: does the value hold after a year?'),
      objective: t(
        'Saper dimostrare che il valore regge nel tempo, e saper spegnere una soluzione quando non regge più.',
        'Be able to show that value holds over time, and to switch a solution off when it no longer does.'
      ),
      theory: [
        t(
          'Il successo del pilota non è ancora il successo del sistema. Il pilota risponde a una domanda facile: qui e adesso sembra funzionare. Il valore nel tempo risponde a una più difficile: regge dopo sei mesi, dopo un anno, dopo che il contesto è cambiato?',
          'A successful pilot is not yet a successful system. The pilot answers an easy question: here and now it seems to work. Value over time answers a harder one: does it hold after six months, after a year, after the context has changed?'
        ),
        t(
          'Per governarlo servono cinque attenzioni. Continua a guardare gli indicatori operativi, non solo quelli tecnici del modello. Misura uso e fiducia, perché un sistema che nessuno guarda non produce valore anche se è preciso. Controlla il costo di mantenimento, che quasi tutti dimenticano nel conto iniziale.',
          'To govern it you need five habits. Keep watching the operational indicators, not only the technical ones. Measure usage and trust, because a system nobody looks at produces no value even when it is accurate. Watch the maintenance cost, which almost everybody forgets in the first business case.'
        ),
        t(
          'Cerca la deriva, cioè i cambiamenti nei dati, nel processo o nel significato stesso del problema. E tieni chiara la soglia di uscita, cioè le condizioni scritte per cui una soluzione va spenta o ripensata. Scritte prima, sono una decisione presa a mente fredda; scritte dopo, diventano una discussione.',
          'Look for drift, that is changes in the data, in the process, or in the meaning of the problem itself. And keep the exit threshold clear, that is the written conditions under which a solution is switched off or redesigned. Written before, they are a decision taken calmly; written after, they turn into an argument.'
        ),
        t(
          'Una soluzione matura non viene protetta a prescindere. Se il contesto cambia, se il team non la usa più, se il costo di revisione cresce più del beneficio, fermarsi è la decisione più professionale. La trasformazione digitale non premia chi accumula sistemi: premia chi mantiene quelli che valgono e chiude quelli che non valgono più.',
          'A mature solution is not protected no matter what. If the context changes, if the team no longer uses it, if the cost of review grows faster than the benefit, stopping is the most professional decision. Digital transformation does not reward whoever collects systems: it rewards whoever keeps the ones that are worth it and closes the ones that are not.'
        ),
        t(
          'La frase da imparare è questa: il pilota ha dimostrato potenziale, ora stiamo verificando che il valore resti stabile, che l\'adozione tenga e che il costo di mantenimento resti proporzionato. Se parli così, sei dalla parte di chi governa, non solo di chi realizza.',
          'The sentence to learn is this: the pilot showed potential, now we are checking that the value stays stable, that adoption holds and that the maintenance cost stays proportionate. If you talk like that, you are on the side of the people who govern, not only of the people who build.'
        )
      ],
      keyPoints: [
        t('Il pilota è una prova, il valore nel tempo è gestione continua.', 'The pilot is a test, value over time is continuous management.'),
        t('Un numero solo non basta: servono impatto, adozione, rischio e costo insieme.', 'One number is not enough: you need impact, adoption, risk and cost together.'),
        t('I criteri di uscita si scrivono prima di andare in produzione.', 'Exit criteria are written before you go live.')
      ],
      terminology: [
        { id: 'monitoring', term: 'Monitoring', italian: 'Monitoraggio', definition: t('Controllo continuo di prestazioni, uso, rischio e qualità del sistema.', 'Continuous checking of performance, usage, risk and quality of the system.') },
        { id: 'incident-response', term: 'Incident response', italian: 'Risposta agli incidenti', definition: t('Come l\'organizzazione reagisce a errori, anomalie o rischi del sistema.', 'How the organisation reacts to errors, anomalies or risks of the system.') },
        { id: 'sunset-criteria', term: 'Sunset criteria', italian: 'Criteri di uscita', definition: t('Condizioni chiare e scritte per fermare o ridisegnare una soluzione.', 'Clear written conditions to stop or redesign a solution.') },
        { id: 'sustain-value', term: 'Sustain value', italian: 'Sostenere il valore', definition: t('Fare in modo che il beneficio resti reale nel tempo, non solo nel pilota.', 'Making sure the benefit stays real over time, not only during the pilot.') },
        { id: 'inerzia', plain: true, term: 'Inertia', italian: 'Inerzia', definition: t('Continuare un progetto solo perché è partito, senza rivalutarne il valore.', 'Carrying a project on only because it started, without reassessing its value.') }
      ],
      example: {
        title: t('Nove mesi dopo, con il contesto cambiato', 'Nine months later, with the context changed'),
        table: {
          columns: [t('Cosa guardi', 'What you look at'), t('Al pilota', 'At the pilot'), t('Dopo nove mesi', 'After nine months')],
          rows: [
            [t('Avvisi utili sul totale', 'Useful alerts out of total'), t('62%', '62%'), t('34%', '34%')],
            [t('Falsi allarmi a settimana', 'False alarms per week'), t('5', '5'), t('14', '14')],
            [t('Uso reale dell\'avviso dal pianificatore', 'Real use of the alert by the planner'), t('90%', '90%'), t('45%', '45%')],
            [t('Costo annuo di mantenimento', 'Annual maintenance cost'), t('20.000 euro', '20,000 euros'), t('31.000 euro', '31,000 euros')]
          ]
        },
        steps: [
          t('La linea gira con formati diversi, i tecnici esperti sono cambiati, alcuni sensori si sono degradati.', 'The line runs different formats, the experienced technicians changed, some sensors degraded.'),
          t('Il problema non è che il modello sia sbagliato: è che il contesto è cambiato e il sistema non è stato governato.', 'The problem is not that the model is wrong: it is that the context changed and the system was not governed.'),
          t('La mossa professionale è rimettere insieme valore, costo e rischio e scegliere: aggiornare, ridurre il perimetro, o spegnere su una linea e tenerlo sull\'altra.', 'The professional move is to put value, cost and risk back together and choose: update, narrow the scope, or switch it off on one line and keep it on the other.')
        ],
        takeaway: t(
          'Continuare per inerzia è la scelta meno matura di tutte, e a colloquio si nota.',
          'Carrying on out of inertia is the least mature choice of all, and in an interview it shows.'
        )
      },
      englishBlock: {
        lines: [
          'A successful pilot does not guarantee long-term value.',
          'We watch operational impact, adoption, drift and maintenance cost over time.',
          'Stopping a solution can be a professional decision when the value no longer justifies the complexity.',
          'Monitoring is not an extra. It is part of the product.'
        ],
        why: 'Watch, drift, no longer justifies, not an extra. L\'ultima frase è corta e resta impressa: usala per chiudere una risposta.'
      },
      quiz: [
        {
          id: 'm5u5-q1',
          prompt: 'Qual è la differenza fra successo del pilota e valore nel tempo?',
          options: [
            'Nessuna, se il pilota va bene il valore resta',
            'Il pilota mostra potenziale, il valore nel tempo verifica stabilità, uso e costo nel contesto reale',
            'Il valore nel tempo riguarda solo l\'IT',
            'Il pilota è la parte che conta di più'
          ],
          correctOption: 1,
          explanation: 'Il pilota è una prova, il valore nel tempo è gestione continua.',
          final: true
        },
        {
          id: 'm5u5-q2',
          prompt: 'Che cos\'è la deriva, detta in modo semplice?',
          options: [
            'Un errore di configurazione',
            'Un cambiamento nel tempo che fa peggiorare il comportamento del sistema',
            'Un problema esclusivo del cloud',
            'Una variazione sempre positiva'
          ],
          correctOption: 1,
          explanation: 'È il motivo per cui un sistema ieri utile oggi può confondere.'
        },
        {
          id: 'm5u5-q3',
          prompt: 'Quando può essere giusto fermare una soluzione?',
          options: [
            'Mai, se è già partita',
            'Solo se lo chiede il fornitore',
            'Quando valore, adozione o costo di mantenimento non reggono più in modo difendibile',
            'Solo a fine anno fiscale'
          ],
          correctOption: 2,
          explanation: 'Spegnere una soluzione che non tiene più è disciplina, non fallimento.'
        },
        {
          id: 'm5u5-q4',
          prompt: 'Quale misura non basta da sola per governare il valore nel tempo?',
          options: [
            'Un singolo indicatore tecnico del modello',
            'L\'uso reale della soluzione',
            'Il costo di manutenzione',
            'L\'impatto operativo'
          ],
          correctOption: 0,
          explanation: 'Il valore è la combinazione di effetto operativo, adozione, rischio e costo: un numero solo non basta.'
        },
        {
          id: 'm5u5-q5',
          prompt: 'Qual è la frase più matura da usare a colloquio?',
          options: [
            'Se il modello parte, il lavoro è finito',
            'Dopo l\'avvio guardo solo che il server regga',
            'Stiamo verificando che il valore resti stabile, che l\'adozione tenga e che il costo resti proporzionato',
            'Un buon pilota non ha bisogno di monitoraggio'
          ],
          correctOption: 2,
          explanation: 'Ti mette dalla parte di chi governa valore e rischio, non solo di chi rilascia.'
        },
        {
          id: 'm5u5-q6',
          prompt: 'Nell\'esempio, quale dato spiega meglio perché il reparto ha smesso di fidarsi?',
          options: [
            'Il costo salito a 31.000 euro',
            'I falsi allarmi passati da 5 a 14 a settimana',
            'Il cambio dei tecnici',
            'La varietà dei formati'
          ],
          correctOption: 1,
          explanation: 'La fiducia si consuma sugli avvisi inutili molto più in fretta di quanto si costruisca su quelli giusti.'
        },
        {
          id: 'm5u5-q7',
          prompt: 'Cosa sono i criteri di uscita e quando si scrivono?',
          options: [
            'Le penali contrattuali, si scrivono alla fine',
            'Le condizioni per spegnere o ripensare la soluzione, e si scrivono prima di andare in produzione',
            'I criteri di accettazione del fornitore',
            'Le regole di accesso al sistema'
          ],
          correctOption: 1,
          explanation: 'Scritti dopo diventano una discussione. Scritti prima sono una decisione già presa a mente fredda.'
        }
      ],
      sourceIds: ['nist-ai-rmf-1-0', 'aws-mlops-planning']
    }
  ]
}

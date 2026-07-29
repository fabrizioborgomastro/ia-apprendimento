const t = (it, en) => ({ it, en })

/**
 * The ten questions that will actually be asked. Each one carries the Italian
 * answer to fix the idea, the spoken English lines to say it out loud in thirty
 * seconds, three points to remember, and the mistake to avoid. Question one is
 * about twice as long as the others: it is the one the whole course builds to.
 */
export const interviewAnswers = [
  {
    id: 'processo-trasformazione',
    prompt: t(
      'Descrivi brevemente un processo di trasformazione digitale',
      'Briefly describe a digital transformation process'
    ),
    expectation: 'Che parti da una perdita misurata e non da una tecnologia, e che porti la cosa fino alla decisione finale senza saltare passaggi.',
    italian: 'Parto sempre dal problema, non dalla tecnologia. Vado in reparto e guardo come si lavora davvero, poi metto un numero sulla perdita prima di toccare qualsiasi cosa: quel numero è la baseline, e me la faccio firmare da chi risponde della linea. Poi capisco dove nascono i dati e chi decide oggi, perché quasi sempre il dato esiste già e nessuno lo guarda insieme. A quel punto scelgo lo strumento più semplice che risolve, e salgo di un gradino solo quando quello sotto non basta. Provo in piccolo e senza rischio, in modalità ombra: il sistema gira in parallelo e registra, ma nessuno lo vede e in linea non cambia niente. Se i numeri reggono vado in produzione con tre reti di sicurezza, cioè una persona che decide, un modo alternativo di lavorare se il sistema si spegne, e qualcuno con nome e cognome che risponde. Alla fine decido, e le risposte possibili sono tre e non due: estendo, mi fermo, oppure continuo qui senza estendere. Nel caso concreto perdevamo sei ore a settimana su una linea di confezionamento, circa 280.000 euro l\'anno, e il capo reparto ha firmato quel numero prima che iniziassimo. Metà dei fermi veniva da un solo gruppo meccanico, e il primo strumento non è stato un modello ma un grafico settimanale con un responsabile, che ha portato i fermi da 6 a 4,8 ore in due giorni di lavoro. Per i cuscinetti abbiamo poi usato un modello, fatto girare in ombra per sei settimane: ha anticipato 8 cedimenti su 11 con 5 falsi allarmi. In produzione l\'avviso va al pianificatore, non alla macchina. Dopo tre mesi eravamo a 3,9 ore, ma la linea di controllo era scesa del 7 percento da sola, quindi l\'effetto reale è 20 punti e non 27. Abbiamo esteso alle due linee con lo stesso gruppo meccanico, non alle altre.',
    english: [
      'I always start from the problem, not from the technology.',
      'We were losing six hours a week on one packaging line. At nine hundred euros an hour, that is about two hundred and eighty thousand a year. The plant manager signed that number before we started.',
      'The data was already in the MES. Nobody had looked at it together. Half of the stops came from one mechanical group.',
      'So the first thing was a weekly chart with an owner. Two days of work, and we went from six hours to four point eight. No AI at all.',
      'For the bearings we used a model. We ran it in the shadow for six weeks, so nobody had to trust it yet.',
      'The alert goes to the planner, not to the machine. A person decides, and the manual round stays as a backup.',
      'We ended at three point nine hours. But the control line also went down seven percent on its own, so the real effect is twenty points, not twenty-seven.',
      'We scaled to two lines with the same equipment. The other two are a different machine, so that would be a new project.'
    ],
    keyPoints: [
      'Prima il numero, poi la tecnologia: baseline firmata da qualcun altro prima di iniziare.',
      'Il gradino più basso che risolve: metà del risultato è arrivata da un grafico.',
      'Il risultato onesto: sottrai da solo l\'effetto che non è tuo.'
    ],
    mistake: 'Cominciare con "abbiamo introdotto una piattaforma di manutenzione predittiva": non c\'è né il problema, né il numero, né la decisione.',
    relatedUnit: { lessonId: 'scegliere-strumento', unitId: 'storia-manutenzione' }
  },
  {
    id: 'cosa-automatizzare-per-primo',
    prompt: t('Come decidi cosa automatizzare per primo', 'How do you decide what to automate first'),
    expectation: 'Che hai un metodo scritto e ripetibile, e che sai che alcune cose sono escluse a prescindere dal punteggio.',
    italian: 'Uso cinque criteri pesati e un cancello. I criteri sono il valore economico sulla perdita misurata, la fattibilità con i dati che ho già, il controllo del rischio e la reversibilità, il tempo al primo risultato misurabile e la replicabilità su altri siti. I pesi li decido prima di guardare i punteggi, perché se li decidi dopo stai costruendo una giustificazione per una scelta già fatta, e in riunione si vede. Il cancello è una condizione che, se non è soddisfatta, esclude il candidato a prescindere dal punteggio: in una produzione regolamentata nessun sistema decide da solo il rilascio di un prodotto o una questione di sicurezza, può proporre, decide una persona. Per il primo progetto peso di più il tempo al valore, perché un caso che rende 40.000 euro in tre mesi vale più di uno che ne rende 100.000 in due anni: il primo ti compra la credibilità per fare il secondo.',
    english: [
      'I use five things: the value on a measured loss, the data we already have, the risk, how fast we see a result, and whether it can be reused on other sites.',
      'I set the weights before I look at the scores. If you do it after, you are just justifying a choice you already made.',
      'Then I have one rule that cannot be broken: no system decides on its own if a batch can go out. It can suggest. A person decides.',
      'In our case the candidate with the highest value was the one we removed. A hard rule is not something you can buy with a high score.'
    ],
    keyPoints: [
      'Pesi decisi prima dei punteggi.',
      'Un cancello non si compensa con il punteggio: chi lo sfonda non partecipa.',
      'Tempo al valore e replicabilità sono i criteri da lead.'
    ],
    mistake: 'Rispondere "quello che porta più valore": è vero e inutile, descrive il risultato e non il metodo.',
    relatedUnit: { lessonId: 'trasformazione', unitId: 'prioritizzare' }
  },
  {
    id: 'ot-vs-it',
    prompt: t('Che differenza c\'è tra OT e IT', 'What is the difference between OT and IT'),
    expectation: 'Non la definizione, ma le conseguenze pratiche: perché i metodi normali dell\'IT non si applicano tali e quali in reparto.',
    italian: 'IT sta per tecnologie dell\'informazione, cioè i sistemi che gestiscono informazioni come gestionale, posta, database. OT sta per tecnologie operative, cioè i sistemi che fanno muovere cose fisiche come controllori di macchina, robot, valvole. La differenza che conta non è dove stanno, ma cosa proteggono per primo: in IT l\'ordine è riservatezza, integrità, disponibilità, mentre in OT si rovescia, perché se una linea si ferma venti minuti perdi prodotto e in certi casi crei una situazione non sicura. Da questa inversione discende tutto: gli aggiornamenti in ufficio si installano di notte in automatico, in reparto solo in fermata programmata e dopo prova; una scansione aggressiva può mandare in crisi un controllore di quindici anni fa, quindi il rimedio fa più danni della minaccia. E cambia anche chi approva, perché il proprietario del dato spesso è Produzione o Automazione, non IT.',
    english: [
      'IT systems handle information. OT systems move physical things: controllers, robots, valves.',
      'The real difference is what you protect first. In IT it is confidentiality. In OT it is availability, because a line that stops costs product, and sometimes safety.',
      'That is why you cannot just copy IT practice into the plant. Patching happens in a planned shutdown, not automatically at night.',
      'And the data owner is often production, not IT. So a different person approves the access.'
    ],
    keyPoints: [
      'In OT la disponibilità viene prima della riservatezza.',
      'Un controllore dura quindici o venti anni: l\'aggiornamento può non esistere.',
      'Cambia chi approva, non solo cosa si approva.'
    ],
    mistake: 'Dire che l\'OT è "l\'IT della fabbrica": è esattamente l\'inverso, e la sicurezza informatica lo nota subito.',
    relatedUnit: { lessonId: 'fabbrica-digitale', unitId: 'ot-it' }
  },
  {
    id: 'mes-vs-scada',
    prompt: t('Che differenza c\'è tra MES e SCADA', 'What is the difference between MES and SCADA'),
    expectation: 'Che sai a quale ritmo lavora ogni strato, e dove vive la tracciabilità.',
    italian: 'SCADA è il sistema di supervisione e acquisizione dati: mostra l\'impianto all\'operatore e gli permette di intervenire adesso. Sotto c\'è il PLC, il controllore logico programmabile, che legge i sensori e comanda gli attuatori con tempi garantiti, e questo strato ragiona in secondi o millisecondi. Il MES è il sistema di esecuzione della produzione, sta fra il gestionale e le macchine, traduce l\'ordine in esecuzione e soprattutto registra cosa è successo davvero, e ragiona in minuti. Il modo più semplice per tenerli distinti è questo: l\'ERP dice cosa e quando, il MES dice come è andata davvero, SCADA e PLC fanno muovere le cose adesso. La funzione del MES che conta di più è la genealogia del lotto, cioè risalire da un prodotto finito ai materiali, alla macchina, al turno, ai controlli: davanti a un reclamo blocchi quattromila pezzi invece di duecentomila.',
    english: [
      'SCADA shows the plant to the operator and lets him act now. The PLC below it reads sensors and drives motors, in milliseconds.',
      'MES sits between the business system and the machines. It turns an order into execution, and it records what actually happened. It thinks in minutes.',
      'So: ERP says what and when. MES says how it really went. SCADA and PLC make things move right now.',
      'The part I care about most is batch genealogy. When a complaint arrives, you block four thousand units instead of two hundred thousand.'
    ],
    keyPoints: [
      'Ritmi diversi: giorni per l\'ERP, minuti per il MES, secondi per SCADA e PLC.',
      'Il MES è dove vive la registrazione, quindi la tracciabilità.',
      'La genealogia del lotto trasforma un reclamo in un problema circoscritto.'
    ],
    mistake: 'Dire che MES e SCADA fanno più o meno la stessa cosa a livelli diversi: uno controlla, l\'altro registra e traccia.',
    relatedUnit: { lessonId: 'fabbrica-digitale', unitId: 'mes-erp' }
  },
  {
    id: 'misurare-il-risultato',
    prompt: t('Come misuri se un progetto ha funzionato', 'How do you measure whether a project worked'),
    expectation: 'Che distingui quello che hai consegnato da quello che è cambiato, e che sai togliere quello che non è merito tuo.',
    italian: 'Su tre livelli, e vanno tenuti separati. L\'output è quello che ho consegnato, per esempio un cruscotto. L\'outcome è cosa le persone fanno di diverso, per esempio il capo reparto che ogni lunedì assegna un responsabile alla causa principale. L\'impatto è il cambiamento misurato sulla perdita di partenza, cioè i fermi scesi da 6 a 4,2 ore a settimana. Molti progetti si fermano all\'output e lo chiamano successo, ma se nessuno decide niente di diverso non è cambiato nulla. Poi il criterio di successo va scritto prima, non dopo, e serve un termine di paragone, cioè una linea simile dove non si è intervenuti: nel mio caso la linea di controllo era scesa del 7 percento da sola, quindi il risultato reale era 20 punti e non 27. Sottrarre da soli quella parte è la cosa che dà più credibilità in assoluto.',
    english: [
      'I keep three things apart: what we delivered, what people now do differently, and what changed in the number we started from.',
      'Many projects stop at the first one. The dashboard exists, so the project was a success. But if nobody decides anything differently, nothing changed.',
      'I write the success criteria before we start, not after.',
      'And I always keep a control line. Ours went down seven percent on its own, so I reported twenty points, not twenty-seven.'
    ],
    keyPoints: [
      'Output, outcome e impatto: solo il terzo è il risultato.',
      'Criterio di successo scritto prima.',
      'Gruppo di controllo, altrimenti attribuisci a te anche effetto novità e stagionalità.'
    ],
    mistake: 'Presentare una percentuale senza dire su quale periodo, su quale linea e rispetto a cosa.',
    relatedUnit: { lessonId: 'in-produzione', unitId: 'esperimento-credibile' }
  },
  {
    id: 'mvp',
    prompt: t('Che cos\'è un MVP e come lo useresti qui', 'What is an MVP and how would you use it here'),
    expectation: 'Che lo distingui da prototipo e pilota, e che lo usi per abbattere l\'ipotesi più rischiosa.',
    italian: 'Il prototipo è una prova tecnica usa e getta e risponde alla domanda "si può fare". L\'MVP, prodotto minimo utilizzabile, è la versione più piccola che una persona vera può usare per lavorare davvero, e risponde a "serve a qualcuno". Il pilota è la prova in condizioni reali, su una linea, per mesi, e risponde a "regge nella realtà". Si sbaglia quasi sempre nella stessa direzione, cioè chiamando MVP un prototipo bello. Il modo giusto di usare un MVP è puntarlo sull\'ipotesi più rischiosa, quella che se è falsa fa crollare tutto, e quasi mai è tecnica: di solito è se qualcuno guarderà davvero quell\'avviso durante un turno pieno. E gli metto un tempo prefissato, per esempio sei settimane, non per correre ma per impedire che una prova diventi un progetto per inerzia.',
    english: [
      'A prototype answers: can we build it. An MVP answers: does it help someone do the job. A pilot answers: does it hold in the real world for months.',
      'I point the MVP at the riskiest assumption. Usually it is not technical. It is whether anyone will look at the alert during a busy shift.',
      'Our first version was a list of ten bearings, sent by email every Monday. No app at all.',
      'I give it a fixed time. Six weeks, then we decide with what we learned.'
    ],
    keyPoints: [
      'Prototipo, MVP e pilota rispondono a tre domande diverse.',
      'L\'MVP colpisce l\'ipotesi più rischiosa, che quasi mai è tecnica.',
      'Tempo prefissato, deciso prima.'
    ],
    mistake: 'Descrivere l\'MVP come "una versione ridotta del prodotto finale": è la definizione da manuale e non dice niente.',
    relatedUnit: { lessonId: 'in-produzione', unitId: 'mvp-prototipo-pilota' }
  },
  {
    id: 'tre-casi-uso',
    prompt: t(
      'Come prioritizzeresti tre casi d\'uso che competono per lo stesso budget',
      'How would you prioritise three use cases competing for the same budget'
    ),
    expectation: 'Che ragioni da portafoglio e non da lista, e che sai rinunciare a qualcosa dicendolo ad alta voce.',
    italian: 'Un lead non gestisce una lista di idee, gestisce un portafoglio: una lista è un accumulo, un portafoglio è una scelta, e una scelta implica una rinuncia dichiarata. Applico i cinque criteri e il cancello, ma aggiungo una lettura per famiglie: i quick win, con valore chiaro e rischio basso; i capability builder, che non sono appariscenti ma costruiscono infrastruttura o competenza che sblocca casi futuri; le big bet, con valore alto e molte dipendenze; e le distrazioni eleganti, cioè demo belle con impatto improbabile. Con tre candidati e un budget solo, di solito la sequenza giusta è prima il capability builder che sblocca gli altri, poi il quick win che crea fiducia, poi il caso più ambizioso. Il primo progetto non deve essere il più sofisticato, deve essere il più credibile, perché se il primo risultato non è leggibile il secondo progetto parte già in salita.',
    english: [
      'We do not manage a list of ideas. We manage a portfolio. A list is a pile. A portfolio means you also say no to something.',
      'I sort them into quick wins, capability builders, big bets, and elegant distractions.',
      'Usually the right order is: first the one that unlocks the others, then the quick win that builds trust, then the ambitious one.',
      'The first project should be credible before it is impressive.'
    ],
    keyPoints: [
      'Portafoglio, non lista: una scelta comporta una rinuncia detta ad alta voce.',
      'Il capability builder merita priorità perché sblocca gli altri.',
      'Quando tutto è prioritario, niente lo è.'
    ],
    mistake: 'Dire che li faresti tutti e tre in parallelo con meno budget ciascuno: segnala che non hai mai dovuto scegliere davvero.',
    relatedUnit: { lessonId: 'governare-scalare', unitId: 'portafoglio-casi-uso' }
  },
  {
    id: 'da-un-sito-a-piu-siti',
    prompt: t('Come porteresti un pilota da un sito a più siti', 'How would you take a pilot from one site to several'),
    expectation: 'Che sai cosa resta standard e cosa si adatta, e che rimisuri in ogni sito nuovo invece di copiare.',
    italian: 'Scalare non è copiare e incollare: se copi e basta, replichi anche gli errori. Tengo standard cinque cose, cioè l\'indicatore e la sua definizione, la definizione del problema, la logica di decisione, i criteri di successo e i controlli di sicurezza. Adatto invece tutto quello che dipende dalla realtà del sito, cioè macchine, formati, turni, disciplina di registrazione, competenze, capacità di revisione. Ogni sito nuovo parte da una baseline locale, non per rifare il pilota da zero ma per capire quanto è davvero simile al primo. Poi c\'è la domanda scomoda: stiamo scalando la soluzione o stiamo distribuendo il problema? Se al sito manca una baseline confrontabile, uno sponsor locale o un ripiego chiaro, quel sito non entra nell\'ondata successiva. Non è una bocciatura, è disciplina. E vale il conto: il secondo e il terzo sito costano meno perché il primo ha pagato l\'infrastruttura per tutti.',
    english: [
      'Scaling is not copy and paste. If you only copy, you also copy the mistakes.',
      'We standardise the KPI, the decision logic, the success criteria and the safety controls. We localise training, interface, and local rules.',
      'Every new site starts with its own baseline. Otherwise you confuse context with effect.',
      'If a site has no comparable data and no clear fallback, it does not join the next wave. That is discipline, not a punishment.'
    ],
    keyPoints: [
      'Standard il KPI e la logica, locale il contesto.',
      'Baseline nuova in ogni sito, sempre.',
      'Il primo sito paga l\'infrastruttura per tutti, e va detto all\'inizio.'
    ],
    mistake: 'Stimare lo stesso beneficio su ogni sito: se il pilota partiva da sei ore di fermo e gli altri da quattro e mezza, c\'è meno da recuperare.',
    relatedUnit: { lessonId: 'governare-scalare', unitId: 'scalare-multi-sito' }
  },
  {
    id: 'dato-sicurezza-supervisione',
    prompt: t(
      'Come gestisci qualità del dato, sicurezza informatica e supervisione umana in un caso AI industriale',
      'How do you handle data quality, cyber security and human oversight in an industrial AI case'
    ),
    expectation: 'Che le tratti come condizioni di partenza e non come adempimenti da mettere alla fine.',
    italian: 'Sono tre cose separate e le affronto prima del pilota. Sulla qualità del dato guardo se il dato è collegato al lotto o è solo un numero in un foglio, se gli orologi dei sistemi sono sincronizzati, se esiste il contesto che dice cosa stava succedendo, e se qualcuno risponde con nome e cognome della sua correttezza: se manca il contesto, il modello impara il rumore. Sulla sicurezza, nessun collegamento diretto dalla rete d\'ufficio a quella di produzione, si passa da una zona intermedia con accessi aperti solo per una finestra approvata e revocati in automatico, e il modello legge e propone, non scrive sulla macchina. Sulla supervisione umana, una persona deve poter capire, contestare e ribaltare la decisione, serve una procedura scritta e serve tenere traccia di chi ha deciso cosa. E c\'è un limite operativo che quasi nessuno cita: se il sistema segnala più di quanto una persona riesce a rivedere in un turno, la supervisione esiste solo sulla carta.',
    english: [
      'I handle three things before the pilot, not after.',
      'Data: is the quality record linked to the batch, are the clocks in sync, and does someone own that data by name.',
      'Security: no direct link from the office network to the plant network. Access is opened for an approved window and closed automatically. The model reads and suggests. It never writes to the machine.',
      'People: someone can understand the decision and overrule it. And if the system flags more cases than one person can review in a shift, human review only exists on paper.'
    ],
    keyPoints: [
      'Il dato senza contesto insegna il rumore: sincronizzazione oraria e collegamento al lotto sono le due verifiche di apertura.',
      'Legge e propone, non scrive, con accesso a tempo e privilegio minimo.',
      'La capacità di revisione è un numero, e se non regge la supervisione è finta.'
    ],
    mistake: 'Rispondere elencando norme e framework: chi ti ascolta vuole sapere cosa faresti lunedì mattina.',
    relatedUnit: { lessonId: 'fabbrica-digitale', unitId: 'historian-qualita-dato' }
  },
  {
    id: 'allineamento-funzioni',
    prompt: t(
      'Raccontami un allineamento fra produzione, qualità, IT e sicurezza quando non avevano la stessa priorità',
      'Tell me about aligning production, quality, IT and security when they did not share the same priority'
    ),
    expectation: 'Che sai che ogni funzione difende qualcosa di reale, e che rispondi con controlli verificabili.',
    italian: 'Ognuno difende qualcosa di legittimo, e se ti presenti con la soluzione già fatta troveranno tutti un buon motivo per bloccarla. Produzione difende la continuità della linea, qualità difende la tracciabilità, IT difende la sostenibilità nel tempo, la sicurezza informatica difende il confine fra le due reti, manutenzione difende la programmazione dei tecnici. Uso sempre tre passi: riformulo l\'obiezione senza addolcirla, accetto la parte vera perché quasi tutte ne hanno una, e propongo un controllo specifico invece di una rassicurazione. La differenza è che il controllo si può verificare: "sarà semplice da usare" è una rassicurazione, "in modalità ombra non aggiunge nessun passaggio" è un controllo. Sul conflitto vero non provo a convincere, rendo esplicito il criterio di decisione: qual è il cancello non negoziabile e chi decide dentro il resto. Scritto quello, il conflitto smette di essere personale. E se serve una deroga, ha sempre una scadenza.',
    english: [
      'Every function is protecting something real. Production protects the line. Quality protects traceability. IT asks who maintains it in two years. Security protects the boundary between the two networks.',
      'So I do three things. I repeat the objection without softening it. I accept the part that is true. Then I offer a control, not a reassurance.',
      'A reassurance is: it will be easy to use. A control is: in shadow mode it adds no extra step, and later the confirmation is one click.',
      'When two functions really disagree, I do not try to win. I write down who decides what, and the conflict stops being personal.'
    ],
    keyPoints: [
      'Ogni obiezione ha una parte vera, e negarla costa più che accettarla.',
      'Controllo verificabile, non rassicurazione.',
      'I conflitti si chiudono scrivendo chi decide, non convincendo.'
    ],
    mistake: 'Raccontarlo come una vittoria su qualcuno: il colloquio cerca uno che allinea, non uno che vince le riunioni.',
    relatedUnit: { lessonId: 'trasformazione', unitId: 'governance-interfunzionale' }
  }
]

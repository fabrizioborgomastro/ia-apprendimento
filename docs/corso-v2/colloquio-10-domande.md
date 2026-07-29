# Le dieci domande del colloquio

Non sono venticinque risposte da imparare. Sono **dieci domande che ti faranno quasi sicuramente**, ognuna con la stessa struttura:

- **Cosa vogliono sentire**: una riga, il criterio con cui ti valutano.
- **Risposta in italiano**: cinque o sei righe, per fissare il concetto.
- **In inglese, trenta secondi**: la stessa risposta, in parole che puoi dire a voce senza inciampare.
- **Tre punti da non dimenticare**: se il resto scivola, questi tre restano.
- **Errore da evitare**: la frase che ti fa sembrare uno che ha letto, non uno che ha fatto.

La domanda 1 è la più importante e ha una risposta lunga il doppio. Le altre nove sono varianti della stessa idea vista da angoli diversi.

**Regola generale.** Impara la sequenza, non il testo. Se ricordi le sette tappe, le parole vengono da sole. E ogni volta che puoi, metti un numero: un numero cambia il tono di tutta la risposta.

---
---

# Domanda 1 - Descrivi brevemente un processo di trasformazione digitale

**Cosa vogliono sentire.** Che parti da una perdita misurata e non da una tecnologia, e che sai portare la cosa fino alla decisione finale senza saltare passaggi.

## Risposta in italiano

Parto sempre dal problema, non dalla tecnologia. Vado in reparto e guardo come si lavora davvero, poi metto un numero sulla perdita prima di toccare qualsiasi cosa: quel numero è la baseline, e me la faccio firmare da chi risponde della linea, così alla fine nessuno discute il punto di partenza.

Poi capisco dove nascono i dati e chi decide oggi. Quasi sempre il dato esiste già e nessuno lo guarda insieme, oppure due reparti lo chiamano con nomi diversi. È la tappa in cui vengono fuori i problemi veri, che quasi mai sono tecnologici.

A quel punto scelgo lo strumento più semplice che risolve. C'è una scala: una regola, un grafico, un modello statistico, il machine learning, l'AI generativa. Si sale di un gradino solo quando il gradino sotto non basta, perché ogni gradino aggiunge costo, fragilità e persone da formare.

Provo in piccolo e senza rischio, in modalità ombra: il sistema gira in parallelo e registra, ma nessuno lo vede e in linea non cambia niente. Serve a raccogliere prove senza chiedere a nessuno di fidarsi.

Se i numeri reggono, vado in produzione con tre reti di sicurezza: una persona che decide al posto del sistema, un modo di lavorare alternativo se il sistema si spegne, e qualcuno con nome e cognome che risponde del funzionamento.

Alla fine decido con onestà, e le risposte possibili sono tre, non due: estendo, mi fermo, oppure continuo qui senza estendere. La terza è la più frequente nella realtà e la meno raccontata.

**Poi, se ti lasciano spazio, racconta il caso concreto.** È la parte che vale davvero.

Su una linea di confezionamento perdevamo sei ore a settimana di fermi non pianificati. A novecento euro l'ora sono circa duecentottantamila euro l'anno, e il capo reparto ha firmato quel numero prima che iniziassimo. Guardando i dati dei fermi, che erano già nel MES e nessuno leggeva aggregati, metà veniva da un solo gruppo meccanico. Ho anche scoperto che gli orologi di due sistemi erano sfasati di quaranta secondi, e sistemare quello è stata la prima cosa da fare.

Lo strumento non è stato un modello: un grafico settimanale delle tre cause principali, con un responsabile assegnato. Due giorni di lavoro, e i fermi sono passati da sei ore a quattro e otto. Più della metà del risultato finale è arrivata da lì, senza intelligenza artificiale.

Restavano i cedimenti dei cuscinetti, che nessuna regola semplice anticipava. Lì ho usato un modello, fatto girare in ombra per sei settimane: ha anticipato otto cedimenti su undici con cinque falsi allarmi. In produzione l'avviso va al pianificatore, non alla macchina, e la ronda programmata resta come rete di sicurezza.

Dopo tre mesi eravamo a tre ore e nove a settimana. Ma sulla linea di controllo, dove non avevamo fatto niente, i fermi erano calati del sette percento comunque: quindi l'effetto reale è venti punti, non ventisette. Abbiamo esteso alle linee uno e due, che hanno lo stesso gruppo meccanico, e non alle altre, che hanno macchine di un altro costruttore.

## In inglese, trenta secondi

> "I always start from the problem, not from the technology."

> "We were losing six hours a week on one packaging line. At nine hundred euros an hour, that is about two hundred and eighty thousand a year. The plant manager signed that number before we started."

> "The data was already in the MES. Nobody had looked at it together. Half of the stops came from one mechanical group."

> "So the first thing was a weekly chart with an owner. Two days of work, and we went from six hours to four point eight. No AI at all."

> "For the bearings we used a model. We ran it in the shadow for six weeks, so nobody had to trust it yet."

> "The alert goes to the planner, not to the machine. A person decides, and the manual round stays as a backup."

> "We ended at three point nine hours. But the control line also went down seven percent on its own, so the real effect is twenty points, not twenty-seven."

> "We scaled to two lines with the same equipment. Not to the other two. Those are a different machine, so that would be a new project."

**Perché queste parole.** Verbi corti: *start, lose, look, run, decide, scale*. Niente *implement*, *leverage*, *deploy*. E i numeri detti a parole, perché a voce si capiscono meglio.

## Tre punti da non dimenticare

1. **Prima il numero, poi la tecnologia.** Baseline firmata da qualcun altro prima di iniziare.
2. **Il gradino più basso che risolve.** Metà del risultato è arrivata da un grafico.
3. **Il risultato onesto.** Sottrai da solo l'effetto che non è tuo: è il segnale di credibilità più forte che puoi dare.

## Errore da evitare

Cominciare con "abbiamo introdotto una piattaforma di manutenzione predittiva". In quella frase non c'è né il problema, né il numero, né la decisione. Sembra il racconto di un acquisto.

---
---

# Domanda 2 - Come decidi cosa automatizzare per primo

**Cosa vogliono sentire.** Che hai un metodo scritto e ripetibile, e che sai che alcune cose sono escluse a prescindere dal punteggio.

## Risposta in italiano

Uso cinque criteri pesati e un cancello. I criteri sono: il valore economico sulla perdita misurata, la fattibilità con i dati che ho già, il controllo del rischio e la reversibilità, il tempo al primo risultato misurabile, e la replicabilità su altri siti.

I pesi li decido prima di guardare i punteggi. Se li decidi dopo, stai costruendo una giustificazione per una scelta già fatta, e in riunione si vede.

Il cancello è una condizione che, se non è soddisfatta, esclude il candidato a prescindere dal punteggio. In una produzione regolamentata il cancello tipico è: nessun sistema decide da solo il rilascio di un prodotto o una questione di sicurezza. Può proporre, decide una persona.

Per il primo progetto peso di più il tempo al valore: un caso che rende quarantamila euro in tre mesi vale più di uno che ne rende centomila in due anni, perché il primo ti compra la credibilità per fare il secondo.

## In inglese, trenta secondi

> "I use five things: the value on a loss we measured, how easy it is with the data we already have, how risky and reversible it is, how fast we see a result, and whether it can be reused on other sites."

> "I set the weights before I look at the scores. If you do it after, you are just justifying a choice you already made."

> "Then I have one rule that cannot be broken: no system decides on its own if a batch can go out. It can suggest. A person decides."

> "In our case the candidate with the highest value was the one we removed. A hard rule is not something you can buy with a high score."

**Perché queste parole.** *Cannot be broken, suggest, removed, buy with a score*. Immagini concrete invece di *non-negotiable constraint* o *eligibility criteria*.

## Tre punti da non dimenticare

1. **Pesi decisi prima dei punteggi.**
2. **Un cancello non si compensa con il punteggio.** Chi lo sfonda non si posiziona ultimo: non partecipa.
3. **Replicabilità e tempo al valore** sono i due criteri che distinguono una scelta da lead da una scelta da specialista.

## Errore da evitare

Rispondere "quello che porta più valore". È vero e inutile: descrive il risultato, non il metodo. E quasi sempre il caso col valore più alto è quello che qualità blocca in dieci secondi.

---
---

# Domanda 3 - Che differenza c'è tra OT e IT

**Cosa vogliono sentire.** Non la definizione, ma le conseguenze pratiche: perché i metodi normali dell'IT non si applicano tali e quali in reparto.

## Risposta in italiano

IT sta per tecnologie dell'informazione: i sistemi che gestiscono informazioni, cioè gestionale, posta, database, portali. OT sta per tecnologie operative: i sistemi che fanno muovere cose fisiche, cioè controllori di macchina, robot, valvole, nastri.

La differenza che conta non è dove stanno, ma cosa proteggono per primo. In IT l'ordine è riservatezza, integrità, disponibilità: se il gestionale si ferma venti minuti, qualcuno lavora più tardi. In OT l'ordine si rovescia: prima disponibilità e integrità del processo, poi la riservatezza. Se una linea si ferma venti minuti perdi prodotto, e in certi casi crei una situazione non sicura.

Da questa inversione discende tutto il resto. Gli aggiornamenti in ufficio si installano di notte in automatico, in reparto solo in fermata programmata e dopo prova. Una scansione di sicurezza aggressiva può mandare in crisi un controllore di quindici anni fa: il rimedio fa più danni della minaccia. E il proprietario del dato spesso è Produzione o Automazione, non IT, quindi cambia chi deve approvare un accesso.

## In inglese, trenta secondi

> "IT systems handle information. OT systems move physical things: controllers, robots, valves."

> "The real difference is what you protect first. In IT it is confidentiality. In OT it is availability, because a line that stops costs product, and sometimes safety."

> "That is why you cannot just copy IT practice into the plant. Patching happens in a planned shutdown, not automatically at night."

> "And the data owner is often production, not IT. So the person who approves an access is different too."

**Perché queste parole.** *Handle, move, protect first, copy into*. Frasi corte, un verbo per frase, nessun termine che non useresti parlando.

## Tre punti da non dimenticare

1. **L'ordine delle priorità si rovescia**: in OT la disponibilità viene prima della riservatezza.
2. **Durata di vita**: un portatile dura quattro anni, un controllore quindici o venti. Non dare per scontato che esista un aggiornamento.
3. **Cambia chi approva**, non solo cosa si approva.

## Errore da evitare

Dire che l'OT è "l'IT della fabbrica". È esattamente l'inverso: sono due mondi con priorità opposte, e trattarli allo stesso modo è il modo più rapido per far dire di no alla sicurezza informatica.

---
---

# Domanda 4 - Che differenza c'è tra MES e SCADA

**Cosa vogliono sentire.** Che sai a quale ritmo lavora ogni strato, e dove vive la tracciabilità.

## Risposta in italiano

SCADA è il sistema di supervisione e acquisizione dati: mostra l'impianto all'operatore e gli permette di intervenire adesso. Sotto c'è il PLC, il controllore logico programmabile, che legge i sensori e comanda gli attuatori con tempi garantiti. Questo strato ragiona in secondi o millisecondi e fa muovere le cose.

MES è il sistema di esecuzione della produzione. Sta in mezzo tra il gestionale e le macchine: prende l'ordine dall'ERP e lo traduce in esecuzione, cioè quale linea, quale ricetta, quali materiali, quale operatore, quali controlli. E soprattutto registra cosa è successo davvero. Ragiona in minuti.

Il modo più semplice per tenerli distinti: ERP dice cosa e quando, MES dice come è andata davvero, SCADA e PLC fanno muovere le cose adesso.

La funzione del MES che conta di più è la genealogia del lotto: risalire da un prodotto finito ai materiali, alla macchina, al turno, alla versione di ricetta, ai controlli superati. Con la genealogia, davanti a un reclamo blocchi quattromila pezzi invece di duecentomila.

## In inglese, trenta secondi

> "SCADA shows the plant to the operator and lets him act now. The PLC below it reads sensors and drives motors, in milliseconds."

> "MES sits between the business system and the machines. It turns an order into execution, and it records what actually happened. It thinks in minutes."

> "So: ERP says what and when. MES says how it really went. SCADA and PLC make things move right now."

> "The part I care about most is batch genealogy. When a complaint arrives, you block four thousand units instead of two hundred thousand."

**Perché queste parole.** Tre verbi che fanno tutto il lavoro: *shows, records, move*. E un numero alla fine, che rende concreto un concetto astratto.

## Tre punti da non dimenticare

1. **Ritmi diversi**: giorni e settimane per l'ERP, minuti per il MES, secondi per SCADA e PLC.
2. **Il MES è dove vive la registrazione**, quindi la tracciabilità.
3. **Genealogia del lotto**: è la funzione che trasforma un reclamo da catastrofe a problema circoscritto.

## Errore da evitare

Dire "MES e SCADA fanno più o meno la stessa cosa a livelli diversi". Fanno cose diverse: uno controlla, l'altro registra e traccia. Chi lavora in reparto lo sente subito.

---
---

# Domanda 5 - Come misuri se un progetto ha funzionato

**Cosa vogliono sentire.** Che distingui quello che hai consegnato da quello che è cambiato, e che sai togliere dal tuo risultato quello che non è merito tuo.

## Risposta in italiano

Su tre livelli, e vanno tenuti separati. L'output è quello che ho consegnato: un cruscotto, un avviso, un report. L'outcome è cosa le persone fanno di diverso grazie a quello: ogni lunedì il capo reparto assegna un responsabile alla causa principale. L'impatto è il cambiamento misurato sulla perdita di partenza: i fermi scesi da sei a quattro e due ore a settimana.

Molti progetti si fermano all'output e lo chiamano successo. Il cruscotto esiste, quindi il progetto è andato bene. Ma se nessuno decide niente di diverso, non è cambiato nulla.

Poi c'è la parte scomoda. Il criterio di successo va scritto prima, non dopo. E serve un termine di paragone: una linea simile dove non si è intervenuti, per capire quanta parte del miglioramento sarebbe arrivata comunque. Nel mio caso la linea di controllo era scesa del sette percento da sola, quindi il risultato reale era venti punti e non ventisette.

Sottrarre da soli quella parte è la cosa che dà più credibilità in assoluto.

## In inglese, trenta secondi

> "I keep three things apart: what we delivered, what people now do differently, and what changed in the number we started from."

> "Many projects stop at the first one. The dashboard exists, so the project was a success. But if nobody decides anything differently, nothing changed."

> "I write the success criteria before we start, not after."

> "And I always keep a control line. Ours went down seven percent on its own, so I reported twenty points, not twenty-seven."

**Perché queste parole.** *Keep apart, delivered, do differently, on its own*. Spiegano output, outcome e impatto senza usare nessuna delle tre parole.

## Tre punti da non dimenticare

1. **Output, outcome, impatto**: tre cose diverse, e solo la terza è il risultato.
2. **Criterio di successo scritto prima.**
3. **Gruppo di controllo**, altrimenti attribuisci a te anche l'effetto novità e la stagionalità.

## Errore da evitare

Presentare una percentuale di miglioramento senza dire su quale periodo, su quale linea e rispetto a cosa. Chi sa fare questo mestiere te lo chiede al secondo minuto.

---
---

# Domanda 6 - Che cos'è un MVP e come lo useresti qui

**Cosa vogliono sentire.** Che sai distinguerlo dal prototipo e dal pilota, e che lo usi per abbattere l'ipotesi più rischiosa, non per far vedere una demo.

## Risposta in italiano

Il prototipo è una prova tecnica usa e getta: risponde alla domanda "si può fare". L'MVP, prodotto minimo utilizzabile, è la versione più piccola che una persona vera può usare per lavorare davvero: risponde a "serve a qualcuno". Il pilota è la prova in condizioni reali, su una linea o un reparto, per mesi: risponde a "regge nella realtà".

Sono tre cose diverse e si sbaglia quasi sempre nella stessa direzione, cioè chiamare MVP un prototipo bello.

Il modo giusto di usare un MVP è puntarlo sull'ipotesi più rischiosa, quella che se è falsa fa crollare tutto il progetto. Quasi mai è tecnica. Di solito è: qualcuno guarderà davvero questo avviso durante un turno pieno?

E gli metto un tempo prefissato. Sei settimane, poi si decide con i dati raccolti. Un tempo prefissato non serve a correre, serve a impedire che una prova diventi un progetto per inerzia.

## In inglese, trenta secondi

> "A prototype answers: can we build it. An MVP answers: does it help someone do the job. A pilot answers: does it hold in the real world for months."

> "I point the MVP at the riskiest assumption. Usually it is not technical. It is whether anyone will look at the alert during a busy shift."

> "I give it a fixed time. Six weeks, then we decide with what we learned."

> "The fixed time is not about speed. It stops a trial from turning into a project by inertia."

**Perché queste parole.** Tre domande al posto di tre definizioni: *can we build it, does it help, does it hold*. Si ricordano e si dicono.

## Tre punti da non dimenticare

1. **Prototipo, MVP, pilota**: tre domande diverse.
2. **L'MVP colpisce l'ipotesi più rischiosa**, che quasi mai è tecnica.
3. **Tempo prefissato**, deciso prima.

## Errore da evitare

Descrivere l'MVP come "una versione ridotta del prodotto finale". È la definizione da manuale e non dice niente. La differenza è a quale domanda risponde.

---
---

# Domanda 7 - Come prioritizzeresti tre casi d'uso che competono per lo stesso budget

**Cosa vogliono sentire.** Che ragioni da portafoglio e non da lista, e che sai rinunciare a qualcosa dicendolo ad alta voce.

## Risposta in italiano

Un lead non gestisce una lista di idee, gestisce un portafoglio. La differenza è che una lista è un accumulo, un portafoglio è una scelta, e una scelta implica una rinuncia dichiarata.

Applico i cinque criteri e il cancello, ma aggiungo una lettura per famiglie. Ci sono i quick win, cioè valore chiaro, dati sufficienti, rischio basso, risultato rapido. Ci sono i capability builder, che non sono i più appariscenti ma costruiscono un pezzo di infrastruttura o di competenza che sblocca casi futuri. Ci sono le big bet, con valore potenziale alto e molte dipendenze. E ci sono le distrazioni eleganti: demo bella, impatto improbabile.

Con tre candidati e un budget solo, di solito la sequenza giusta è: prima il capability builder che sblocca gli altri, poi il quick win che crea fiducia, poi il caso più ambizioso. Non perché il terzo sia meno moderno, ma perché senza i primi due resta una demo.

E il primo progetto non deve essere il più sofisticato. Deve essere il più credibile: se il primo risultato non è leggibile e difendibile, il secondo progetto parte già in salita.

## In inglese, trenta secondi

> "We do not manage a list of ideas. We manage a portfolio. A list is a pile. A portfolio means you also say no to something."

> "I sort them into quick wins, capability builders, big bets, and elegant distractions."

> "Usually the right order is: first the one that unlocks the others, then the quick win that builds trust, then the ambitious one."

> "The first project should be credible before it is impressive."

**Perché queste parole.** *A pile, unlocks, credible before impressive*. Sono tre immagini che restano in testa a chi ti ascolta.

## Tre punti da non dimenticare

1. **Portafoglio, non lista.** Una scelta comporta una rinuncia detta ad alta voce.
2. **Il capability builder merita priorità** anche senza il ritorno più appariscente, perché sblocca gli altri.
3. **Quando tutto è prioritario, niente lo è.** È l'errore che fa sembrare inesperti.

## Errore da evitare

Dire che li faresti tutti e tre in parallelo con meno budget ciascuno. È la risposta che segnala che non hai mai dovuto scegliere davvero.

---
---

# Domanda 8 - Come porteresti un pilota da un sito a più siti

**Cosa vogliono sentire.** Che sai cosa resta standard e cosa si adatta, e che rimisuri in ogni sito nuovo invece di copiare.

## Risposta in italiano

Scalare non è copiare e incollare. Se copi e basta, replichi anche gli errori.

Tengo standard cinque cose: il KPI e la sua definizione, la definizione del problema, la logica di decisione, i criteri di successo e i controlli di sicurezza. Se un sito chiama "fermo breve" quello che un altro chiama "microfermo", il confronto si rompe prima ancora di partire.

Adatto invece tutto quello che dipende dalla realtà del sito: macchine, formati, turni, disciplina di registrazione, competenze presenti, capacità di revisione, vincoli di qualità. E ogni sito nuovo parte da una baseline locale, non per rifare il pilota da zero, ma per capire quanto è davvero simile al primo.

Poi c'è la domanda scomoda da farsi: stiamo scalando la soluzione o stiamo distribuendo il problema? Se il sito pilota aveva un capoturno molto coinvolto e gli altri no, il rollout tecnico riesce e quello operativo fallisce.

Se a un sito mancano dati comparabili, uno sponsor locale o un fallback chiaro, quel sito non entra nell'ondata successiva. Non è una bocciatura, è disciplina. E vale anche il conto: il secondo e il terzo sito costano meno, perché il primo caso ha pagato l'infrastruttura per tutti.

## In inglese, trenta secondi

> "Scaling is not copy and paste. If you only copy, you also copy the mistakes."

> "We standardize the KPI, the decision logic, the success criteria and the safety controls. We localize training, interface, and local rules."

> "Every new site starts with its own baseline. Otherwise you confuse context with effect."

> "If a site has no comparable data and no clear fallback, it does not join the next wave. That is discipline, not a punishment."

**Perché queste parole.** *Copy and paste, join the next wave, discipline not punishment*. La terza è la frase che ti fa sembrare uno che ha già gestito un rollout.

## Tre punti da non dimenticare

1. **Standard il KPI e la logica, locale il contesto.**
2. **Baseline nuova in ogni sito**, sempre.
3. **Il primo sito paga l'infrastruttura per tutti**, e va detto all'inizio, non alla fine.

## Errore da evitare

Stimare lo stesso beneficio su ogni sito. Se la linea pilota partiva da sei ore di fermo e le altre da quattro e mezza, c'è meno da recuperare. Chi ti ascolta lo nota subito.

---
---

# Domanda 9 - Come gestisci qualità del dato, sicurezza informatica e supervisione umana in un caso AI industriale

**Cosa vogliono sentire.** Che le tratti come condizioni di partenza e non come adempimenti da mettere alla fine.

## Risposta in italiano

Sono tre cose separate e le affronto prima del pilota, non dopo.

Sulla qualità del dato: guardo se il dato è collegato al lotto o è solo un numero in un foglio, se gli orologi dei sistemi sono sincronizzati, se esiste il contesto che dice cosa stava succedendo quando il dato è stato registrato, e se qualcuno risponde con nome e cognome della sua correttezza. Se manca il contesto, il modello impara il rumore.

Sulla sicurezza: nessun collegamento diretto dalla rete d'ufficio alla rete di produzione. Si passa da una zona intermedia, con accessi aperti solo per una finestra approvata e revocati in automatico, e con i permessi minimi che servono a quel compito. E il modello non deve poter scrivere sulla macchina: legge e propone.

Sulla supervisione umana: una persona deve poter capire, contestare e ribaltare la decisione del sistema. Serve una procedura scritta che dica cosa fare quando il sistema si comporta male, e serve tenere traccia di chi ha deciso cosa e su quale base. Attenzione al rischio opposto: se il sistema ha ragione novantacinque volte su cento, alla novantaseiesima nessuno controlla più.

E c'è un limite operativo che quasi nessuno cita: se il sistema segnala più di quanto una persona riesce a rivedere in un turno, la supervisione umana esiste solo sulla carta.

## In inglese, trenta secondi

> "I handle three things before the pilot, not after."

> "Data: is the quality record linked to the batch, are the clocks in sync, and does someone own that data by name."

> "Security: no direct link from the office network to the plant network. Access is opened for an approved window and closed automatically. The model reads and suggests. It never writes to the machine."

> "People: someone can understand the decision and overrule it. And if the system flags more cases than one person can review in a shift, human review only exists on paper."

**Perché queste parole.** *In sync, own that data by name, reads and suggests, only on paper*. Quattro immagini precise al posto di quattro termini di conformità.

## Tre punti da non dimenticare

1. **Il dato senza contesto insegna il rumore.** Sincronizzazione oraria e collegamento al lotto sono le due verifiche di apertura.
2. **Legge e propone, non scrive.** Con accesso a tempo e privilegio minimo.
3. **La capacità di revisione è un numero**, e se non regge, la supervisione è finta.

## Errore da evitare

Rispondere elencando norme e framework. Citali al massimo una volta e poi passa subito ai controlli concreti: quello che chi ti ascolta vuole sapere è cosa faresti lunedì mattina.

---
---

# Domanda 10 - Raccontami un allineamento fra produzione, qualità, IT e sicurezza quando non avevano la stessa priorità

**Cosa vogliono sentire.** Che sai che ogni funzione difende qualcosa di reale, e che rispondi con controlli verificabili invece che con rassicurazioni.

## Risposta in italiano

Ognuno difende qualcosa di legittimo, e se ti presenti con la soluzione già fatta troveranno tutti un buon motivo per bloccarla.

Produzione difende la continuità della linea e ti dirà che non può fermarla per una prova. Qualità difende la tracciabilità e ti chiederà come lo dimostri a un ispettore. IT difende la sostenibilità e ti chiederà chi lo mantiene fra due anni. La sicurezza informatica difende il confine tra le due reti e ti dirà che non apre collegamenti verso la produzione. Manutenzione ti dirà che i tecnici non hanno tempo per una cosa in più.

Uso sempre tre passi: riformulo l'obiezione senza addolcirla, così chi l'ha sollevata si riconosce; accetto la parte vera, perché quasi tutte ne hanno una e negarla costa credibilità; propongo un controllo specifico invece di una rassicurazione.

La differenza è che il controllo si può verificare. "Sarà semplice da usare" è una rassicurazione. "In modalità ombra non aggiunge nessun passaggio, e nella fase dopo la conferma è un clic con la fonte già aperta" è un controllo.

Sul conflitto vero non provo a convincere: rendo esplicito il criterio di decisione. Se produzione vuole velocità e qualità vuole controlli, la domanda non è chi ha ragione, ma qual è il cancello non negoziabile e chi decide dentro il resto. Scritto quello, il conflitto smette di essere personale. E se serve una deroga, ha sempre una scadenza: una deroga senza scadenza è una regola nuova introdotta di nascosto.

## In inglese, trenta secondi

> "Every function is protecting something real. Production protects the line. Quality protects traceability. IT asks who maintains it in two years. Security protects the boundary between the two networks."

> "So I do three things. I repeat the objection without softening it. I accept the part that is true. Then I offer a control, not a reassurance."

> "A reassurance is: it will be easy to use. A control is: in shadow mode it adds no extra step, and later the confirmation is one click."

> "When two functions really disagree, I do not try to win. I write down who decides what, and the conflict stops being personal."

**Perché queste parole.** *Protecting something real, without softening it, a control not a reassurance*. È la coppia di parole che porta a casa tutta la risposta.

## Tre punti da non dimenticare

1. **Ogni obiezione ha una parte vera.** Negarla costa più che accettarla.
2. **Controllo verificabile, non rassicurazione.**
3. **I conflitti si chiudono scrivendo chi decide**, non convincendo.

## Errore da evitare

Raccontarlo come una vittoria su qualcuno. Il colloquio cerca uno che allinea, non uno che vince le riunioni.

---
---

# Come allenarti in venti minuti

1. **Le sette tappe a voce, senza guardare.** Se le dici in ordine, hai già la domanda 1.
2. **Un numero per ogni risposta.** Riprendi le dieci risposte e verifica che ognuna ne contenga almeno uno.
3. **Le frasi inglesi lette ad alta voce.** Se inciampi su una parola, quella parola va sostituita con una più semplice. È il test definitivo.
4. **I tre punti chiave di ogni domanda.** Se ricordi quelli, la risposta si ricostruisce da sola.

Ultima cosa. La risposta più forte del corso non è la più tecnica: è quella in cui riduci da solo il tuo risultato, perché una parte non era merito tuo. Tienila pronta, perché prima o poi arriva il momento giusto per dirla.

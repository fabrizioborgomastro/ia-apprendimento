# Modulo 2 - Com'è fatta una fabbrica digitale: OT / IT / AI / Cloud

30 minuti, 5 unità. Copre il requisito *Understanding of Digital Manufacturing architecture* dell'annuncio.

---
---

# Unità 1 - OT e IT: priorità, tempi e rischi diversi

**6 minuti**

## Dove siamo nel percorso

**Tappa 3 di 7: capisco dove nascono i dati e chi decide oggi.** Prima di tutto devi sapere che in fabbrica convivono due mondi informatici diversi, con regole opposte. Confonderli è l'errore che ti squalifica in dieci secondi.

## Il concetto

In azienda ci sono due famiglie di sistemi.

**IT** sta per *Information Technology*, in italiano tecnologie dell'informazione. Sono i sistemi che gestiscono informazioni: posta, gestionale, database, portali. Vivono in ufficio e nei centri dati.

**OT** sta per *Operational Technology*, in italiano tecnologie operative. Sono i sistemi che fanno muovere cose fisiche: controllori di macchina, robot, valvole, nastri. Vivono in reparto.

La differenza che conta non è dove stanno, ma **cosa proteggono per primo**.

Nel mondo IT l'ordine di priorità è: prima la **riservatezza** (che i dati non escano), poi l'**integrità** (che siano corretti), poi la **disponibilità** (che il sistema sia acceso). Se il gestionale si ferma venti minuti, qualcuno lavora più tardi.

Nel mondo OT l'ordine si rovescia: prima **disponibilità e integrità del processo**, poi la riservatezza. Se una linea si ferma venti minuti, perdi prodotto e in certi casi crei una situazione non sicura.

Da questa inversione discende tutto il resto, ed è la parte che colpisce a un colloquio:

- **Aggiornamenti**: in ufficio si installano automaticamente, di notte. In reparto un aggiornamento automatico può fermare una linea, quindi si fa solo in fermata programmata e dopo prova.
- **Scansioni di sicurezza**: in ufficio si fanno di routine. In reparto una scansione aggressiva può mandare in crisi un controllore vecchio. Il rimedio può fare più danni della minaccia.
- **Durata di vita**: un portatile si cambia ogni quattro anni. Un controllore di macchina resta in servizio quindici o venti anni. Non puoi dare per scontato che esista un aggiornamento.
- **Chi comanda**: in OT il proprietario del dato spesso è Produzione o Automazione, non IT. Cambia chi deve approvare un accesso.

La frase da avere pronta: **"in OT la disponibilità viene prima della riservatezza, ed è per questo che i metodi normali dell'IT non si applicano tali e quali."**

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| IT | Tecnologie dell'informazione | I sistemi che gestiscono informazioni: gestionale, posta, database. |
| OT | Tecnologie operative | I sistemi che fanno muovere cose fisiche: controllori, robot, valvole. |
| Riservatezza | Riservatezza | Che i dati non finiscano a chi non deve vederli. |
| Integrità | Integrità | Che i dati e il processo non vengano alterati. |
| Disponibilità | Disponibilità | Che il sistema sia acceso e funzionante quando serve. |
| Brownfield | Impianto esistente | Un impianto già in funzione, con macchine di età e marche diverse, su cui bisogna innestarsi. |
| Convergenza OT/IT | Convergenza OT/IT | Il fatto che i due mondi oggi si parlino, con i vantaggi e i rischi che ne derivano. |

## Esempio pratico

Arriva una richiesta: *"applichiamo la nostra politica di aggiornamento automatico anche ai sistemi di reparto"*.

Se sei un IT manager senza esperienza di produzione, sembra ragionevole: riduce le vulnerabilità. Ecco cosa succede davvero.

Su una linea ci sono 14 controllori. Tre hanno **17 anni** e il costruttore non esiste più. Un aggiornamento automatico su quei tre significa: nessun aggiornamento disponibile, oppure un aggiornamento non testato su una macchina che nessuno sa più riparare.

La risposta corretta non è "no". È: **"quel rischio lo copriamo in un altro modo"**.

1. Le macchine vecchie non si aggiornano, si **isolano**: stanno in una zona di rete separata che parla solo con quello che deve.
2. Gli aggiornamenti sulle macchine aggiornabili si fanno nella **fermata programmata**, dopo prova su una linea sola.
3. Le scansioni si fanno in modalità passiva, che ascolta il traffico invece di interrogare i dispositivi.

Risultato: hai ridotto il rischio senza mai fermare la produzione, e hai parlato la lingua di entrambi i mondi. Questa è esattamente la conversazione che ti chiederanno di saper condurre.

## Come lo dici in inglese

> "In the office, we protect the data first. On the shop floor, we protect the line first. If the line stops, we lose product, and sometimes it is not safe."

> "So we do not patch automatically down there. We patch during planned stops, after testing on one line."

> "Some machines are seventeen years old. We cannot update them, so we keep them in a separate part of the network instead."

**Perché queste parole.** *Protect first, we lose product, planned stops, keep them separate*. Nessun *availability over confidentiality*, nessun *network segmentation*: si dice la stessa cosa con parole che tutti capiscono.

## Quiz

**1. Qual è la differenza principale tra OT e IT?**
- a) OT è più moderno, IT è più vecchio
- b) L'ordine di priorità: in OT vengono prima disponibilità e integrità del processo ✓
- c) OT riguarda il software, IT l'hardware
- d) OT è gestito da fornitori esterni

*È l'inversione delle priorità a spiegare tutte le differenze pratiche di metodo.*

**2. Perché non si applicano aggiornamenti automatici in reparto?**
- a) Perché costano troppo
- b) Perché un aggiornamento può fermare la linea, e per certe macchine non esiste nemmeno ✓
- c) Perché lo vieta la normativa
- d) Perché i sistemi OT non si aggiornano mai

*Si aggiorna, ma in fermata programmata e dopo prova. Il punto è il quando e il come, non il se.*

**3. Una macchina ha 17 anni e il costruttore non esiste più. Cosa fai?**
- a) La sostituisci subito
- b) La isoli in una zona di rete separata che parla solo con quello che deve ✓
- c) La aggiorni comunque
- d) Accetti il rischio senza fare nulla

*Se non puoi togliere la vulnerabilità, riduci ciò che può raggiungerla. È il ragionamento tipico degli impianti esistenti.*

**4. Quanto dura tipicamente in servizio un controllore di macchina?**
- a) 3-4 anni come un computer da ufficio
- b) 6-8 anni
- c) 15-20 anni ✓
- d) Meno di 2 anni

*La lunghissima vita utile è il motivo per cui in fabbrica convivono tecnologie di epoche diverse.*

**5. Perché una scansione di sicurezza aggressiva è rischiosa in OT?**
- a) Perché rallenta la rete d'ufficio
- b) Perché può mandare in crisi un controllore vecchio, facendo più danni della minaccia ✓
- c) Perché viola la privacy degli operatori
- d) Perché richiede troppo tempo

*Si usa la scansione passiva, che ascolta il traffico invece di interrogare i dispositivi.*

**6. In OT chi è tipicamente il proprietario del dato?**
- a) Sempre l'IT
- b) Spesso Produzione o Automazione, e questo cambia chi approva gli accessi ✓
- c) Il fornitore della macchina
- d) Il responsabile qualità

*Sapere chi approva è metà del lavoro quando devi far partire un progetto.*

**7. Cosa significa "impianto esistente" (brownfield) e perché conta?**
- a) Un impianto nuovo da progettare
- b) Un impianto già in funzione con macchine di età e marche diverse, su cui devi innestarti senza fermarlo ✓
- c) Un impianto dismesso
- d) Un impianto certificato

*Quasi tutti i progetti veri sono su impianti esistenti. Progettare come se fosse tutto nuovo è il modo più rapido per non partire mai.*

## Fonti

- NIST SP 800-82 Rev. 3, guida alla sicurezza delle tecnologie operative
- CISA, sistemi di controllo industriale

---
---

# Unità 2 - Sensori, PLC, SCADA: chi fa cosa

**6 minuti**

## Dove siamo nel percorso

**Tappa 3 di 7.** Qui vedi la parte più vicina alla macchina: chi misura, chi decide in tempo reale, chi mostra all'operatore.

## Il concetto

Immagina una macchina che riempie e chiude pacchetti. Perché funzioni, qualcuno deve continuamente misurare, decidere e agire. In fabbrica questi tre compiti sono divisi fra tre attori diversi.

Il primo è il **sensore**: misura una grandezza fisica e la trasforma in un segnale elettrico. Una termocoppia misura la temperatura, una fotocellula vede se il pacchetto è passato, un accelerometro sente la vibrazione di un motore. Il sensore non decide nulla, dice soltanto quanto vale una cosa, molte volte al secondo.

Il secondo è il **PLC**, *Programmable Logic Controller*, in italiano controllore logico programmabile. È un piccolo computer industriale costruito per una cosa sola: leggere i sensori e comandare motori e valvole seguendo regole fisse, in tempi garantiti. Se la fotocellula non vede il pacchetto entro 200 millisecondi, ferma il nastro. Il PLC non è intelligente e non deve esserlo: **deve essere prevedibile**. Gira lo stesso ciclo migliaia di volte al minuto, sempre uguale, per anni.

Il terzo è lo **SCADA**, *Supervisory Control And Data Acquisition*, in italiano supervisione e acquisizione dati. È lo schermo in sala controllo dove un operatore vede l'impianto disegnato, con i valori che cambiano e gli allarmi che si accendono. Da lì può cambiare un parametro o fermare una linea.

La regola da ricordare: **il sensore misura, il PLC decide in tempo reale, lo SCADA fa vedere e permette all'uomo di intervenire.**

Se lo SCADA si spegne, **la macchina continua a funzionare**, perché il PLC lavora da solo. È il dettaglio che colpisce di più a un colloquio, perché mostra che hai capito dove sta davvero il controllo.

Un'ultima cosa sugli **allarmi**. Un allarme è una segnalazione che chiede un intervento umano, ed è diversa da una semplice informazione. Se un sistema segnala tutto come allarme, l'operatore smette di guardarlo: si chiama sovraccarico di allarmi ed è una causa nota di incidenti. Quando proponi di aggiungere avvisi generati da un modello, questa è la prima obiezione che riceverai, e giustamente.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Sensore | Sensore | Dispositivo che misura una grandezza fisica e la trasforma in segnale elettrico. |
| Attuatore | Attuatore | Dispositivo che agisce sul processo: motore, valvola, pistone. |
| PLC | Controllore logico programmabile | Computer industriale che legge i sensori e comanda gli attuatori con tempi garantiti. |
| SCADA | Supervisione e acquisizione dati | Sistema che mostra l'impianto all'operatore e gli permette di intervenire. |
| Tempo reale | Tempo reale | La garanzia che una risposta arrivi entro un tempo massimo definito, non semplicemente in fretta. |
| Allarme | Allarme | Segnalazione che chiede un intervento umano, diversa da una informazione. |
| Sovraccarico di allarmi | Sovraccarico di allarmi | Troppi allarmi, tanto che l'operatore smette di guardarli. |

## Esempio pratico

Su una linea di confezionamento un motore inizia a vibrare più del normale.

L'accelerometro sul cuscinetto misura la vibrazione **50 volte al secondo**. Il PLC legge quel valore a ogni ciclo, che dura **10 millisecondi**, e lo confronta con una soglia fissa: sopra **7,1 mm/s** ferma la macchina, perché il cuscinetto rischia di grippare.

Lo SCADA intanto mostra il grafico in sala controllo e, sopra **4,5 mm/s**, accende un allarme giallo. L'operatore lo vede e chiama la manutenzione, prima di arrivare alla fermata automatica.

Nota la divisione dei compiti: la fermata a 7,1 la decide il PLC in dieci millisecondi, perché lì non c'è tempo per una persona. L'avviso a 4,5 lo gestisce lo SCADA, perché lì il tempo c'è e serve qualcuno che decida.

Se domani aggiungessi un modello che prevede il guasto tre giorni prima, quel modello **non andrebbe né nel PLC né nello SCADA**: leggerebbe i dati storici da un altro sistema e manderebbe un avviso al pianificatore della manutenzione. Il controllo in tempo reale resta dove è sempre stato.

## Come lo dici in inglese

> "The sensor only measures. It does not decide anything."

> "The PLC is the one that decides, and it has to answer in milliseconds. So it must be simple and always do the same thing."

> "SCADA is the screen the operator looks at. If the screen goes down, the machine keeps running, because the PLC works on its own."

> "We would not put the model inside the machine control. The model reads old data and sends a message to a person."

**Perché queste parole.** Un solo verbo per frase e parole che usi già: *measures, decides, answers, looks at, keeps running, reads, sends*. Niente *supervises*, *raises alarms*, *acquisition*.

## Quiz

**1. Se lo SCADA smette di funzionare, cosa succede alla macchina?**
- a) Si ferma subito
- b) Continua a funzionare, perché il controllo è nel PLC ✓
- c) Rallenta al cinquanta per cento
- d) Passa in controllo manuale obbligatorio

*Il PLC esegue il controllo da solo. Lo SCADA mostra e permette di intervenire, non fa girare la macchina.*

**2. Qual è il compito del sensore?**
- a) Decidere quando fermare la macchina
- b) Misurare una grandezza fisica e trasformarla in segnale ✓
- c) Mostrare i dati all'operatore
- d) Registrare lo storico

*Il sensore misura e basta. La decisione è del PLC.*

**3. Perché il PLC deve essere prevedibile più che intelligente?**
- a) Perché costa meno
- b) Perché deve rispondere entro un tempo massimo garantito, sempre uguale ✓
- c) Perché non può essere programmato
- d) Perché lavora solo di giorno

*In tempo reale conta la garanzia sul tempo di risposta, non la velocità media.*

**4. Nell'esempio, chi decide la fermata a 7,1 mm/s e perché?**
- a) Lo SCADA, perché vede il grafico
- b) L'operatore, perché è responsabile della linea
- c) Il PLC, perché a quella soglia non c'è tempo per un intervento umano ✓
- d) Il sistema di manutenzione

*Dieci millisecondi non lasciano spazio a una decisione umana.*

**5. Dove metteresti un modello che prevede un guasto tre giorni prima?**
- a) Dentro il PLC, così ferma la macchina da solo
- b) Dentro lo SCADA, al posto degli allarmi
- c) Fuori dal controllo, con un avviso a una persona che pianifica ✓
- d) Non si può fare

*Una previsione probabilistica non entra nel controllo in tempo reale. Serve a dare tempo a una persona.*

**6. Che differenza c'è tra un allarme e una informazione?**
- a) Nessuna
- b) L'allarme è rosso, l'informazione gialla
- c) L'allarme chiede un intervento umano, l'informazione no ✓
- d) L'allarme arriva via email

*Se tutto è allarme, l'operatore smette di guardare. È una causa nota di incidenti.*

**7. Proponi di aggiungere avvisi generati da un modello. Qual è la prima obiezione che riceverai?**
- a) Che costa troppo
- b) Che aggiungerà rumore a un operatore già sommerso di allarmi ✓
- c) Che il modello non è accurato
- d) Che serve un nuovo fornitore

*Prima si riducono gli allarmi inutili, poi si valuta se un segnale nuovo aggiunge valore.*

## Fonti

- ISA-18, gestione degli allarmi
- OPC UA Parte 1, protocollo di comunicazione industriale

---
---

# Unità 3 - MES ed ERP: esecuzione, pianificazione, tracciabilità

**6 minuti**

## Dove siamo nel percorso

**Tappa 3 di 7.** Sopra la macchina ci sono i sistemi che dicono cosa produrre e che registrano cosa è stato prodotto. Qui vive la tracciabilità, che in una produzione regolamentata è tutto.

## Il concetto

Sopra PLC e SCADA ci sono due sistemi che sentirai nominare continuamente.

L'**ERP**, *Enterprise Resource Planning*, in italiano pianificazione delle risorse aziendali, è il gestionale. Sa cosa l'azienda deve produrre, quanto materiale c'è, quando arriva, quanto costa, a chi va spedito. Ragiona in **giorni e settimane**.

Il **MES**, *Manufacturing Execution System*, in italiano sistema di esecuzione della produzione, sta in mezzo tra l'ERP e le macchine. Prende l'ordine dall'ERP e lo traduce in esecuzione: quale linea, quale ricetta, quali materiali, quale operatore, quali controlli di qualità. E soprattutto **registra cosa è successo davvero**. Ragiona in **minuti**.

Il modo più semplice per ricordarli:

- **ERP = cosa e quando** (pianificare)
- **MES = come è andata davvero** (eseguire e registrare)
- **SCADA/PLC = far muovere le cose adesso** (controllare)

La funzione del MES che vale più di tutte per il tuo colloquio è la **genealogia del lotto**, in inglese *batch genealogy*. È la capacità di risalire da un prodotto finito a tutto ciò che lo ha generato: quali materie prime, da quali lotti in arrivo, su quale macchina, in che turno, con quale versione della ricetta, con quali controlli superati.

Perché è così importante? Perché quando arriva un reclamo, la domanda non è "abbiamo un problema di qualità?", ma **"quali altri lotti sono coinvolti e vanno bloccati?"**. Senza genealogia la risposta è "non lo sappiamo", e blocchi tutto. Con la genealogia blocchi 4.000 pezzi invece di 200.000.

Questa è anche la ragione per cui, quando qualcuno propone un modello di intelligenza artificiale sulla qualità, la prima domanda seria è: **il dato di qualità è collegato al lotto, o è solo un numero in un foglio?**

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| ERP | Pianificazione delle risorse aziendali | Il gestionale: sa cosa produrre, con quali materiali, per quando, a che costo. |
| MES | Sistema di esecuzione della produzione | Traduce l'ordine in esecuzione e registra cosa è successo davvero in reparto. |
| Ordine di produzione | Ordine di produzione | Il documento che dice cosa produrre, quanto e con quale ricetta. |
| Genealogia del lotto | Genealogia del lotto | La possibilità di risalire da un prodotto finito a materiali, macchine, turni e controlli. |
| Tracciabilità | Tracciabilità | Poter ricostruire la storia di un prodotto in avanti e all'indietro. |
| Ricetta | Ricetta | L'insieme dei parametri con cui si produce un certo articolo. |
| ISA-95 | ISA-95 | Lo standard che descrive come i sistemi gestionali e quelli di produzione si parlano. |

## Esempio pratico

Un cliente segnala un difetto su un lotto venduto tre settimane fa.

**Senza genealogia del lotto.** Sai che il difetto riguarda un prodotto fatto "più o meno in quel periodo". Per stare sicuro blocchi tutta la produzione di quella settimana: **200.000 pezzi**. Costo del blocco, tempo di verifica, e clienti che aspettano.

**Con genealogia del lotto.** In venti minuti ricostruisci: il lotto finito L-4471 è stato prodotto il 12, sulla linea 3, turno 2, con materia prima del lotto in arrivo MP-8802, ricetta versione 7. Cerchi tutti i lotti finiti che hanno usato MP-8802: sono **quattro**, per un totale di **4.000 pezzi**. Blocchi quelli.

La differenza è 196.000 pezzi.

Ecco la frase che vale a colloquio: *"la tracciabilità non è un obbligo burocratico, è quello che ti permette di bloccare quattromila pezzi invece di duecentomila."*

E il collegamento con l'AI: se volessi un modello che prevede i difetti, i dati di qualità devono essere già collegati al lotto, alla macchina e al turno. Se non lo sono, **il primo progetto non è il modello: è collegare i dati.** Questo è esattamente il tipo di risposta che distingue chi ha lavorato in produzione.

## Come lo dici in inglese

> "ERP knows what we have to produce and when. MES knows what actually happened on the line."

> "The important part of MES is that you can go back from a finished box to the raw material, the machine, the shift and the checks."

> "So when a customer complains, we block four thousand pieces instead of two hundred thousand."

> "If the quality data is not linked to the batch, the first project is not a model. The first project is linking the data."

**Perché queste parole.** *Knows, actually happened, go back from, block, linking the data*. Sono immagini concrete: "go back from a finished box" si capisce e si ricorda, "backward traceability" no.

## Quiz

**1. Qual è la differenza tra ERP e MES?**
- a) ERP è più moderno del MES
- b) ERP pianifica cosa e quando, MES esegue e registra cosa è successo davvero ✓
- c) ERP è per la qualità, MES per la logistica
- d) Sono due nomi dello stesso sistema

*ERP ragiona in giorni e settimane, MES in minuti.*

**2. Che cos'è la genealogia del lotto?**
- a) La storia degli aggiornamenti del software
- b) La possibilità di risalire da un prodotto finito a materiali, macchine, turni e controlli ✓
- c) L'elenco dei fornitori qualificati
- d) Il registro delle manutenzioni

*È la funzione del MES che vale di più quando arriva un reclamo.*

**3. Nell'esempio, perché senza genealogia si bloccano 200.000 pezzi?**
- a) Perché è la regola aziendale
- b) Perché non sapendo quali lotti sono coinvolti, devi bloccare tutto il periodo sospetto ✓
- c) Perché il cliente lo richiede
- d) Perché il MES è fuori servizio

*L'incertezza si paga in prodotto bloccato. È il modo più chiaro per spiegare il valore della tracciabilità.*

**4. Un modello dovrebbe prevedere i difetti, ma i dati di qualità non sono collegati al lotto. Cosa proponi?**
- a) Costruire il modello lo stesso, i dati basteranno
- b) Che il primo progetto sia collegare i dati, non il modello ✓
- c) Rinunciare al progetto
- d) Comprare un MES nuovo

*Un modello su dati senza contesto produce numeri che nessuno può usare per decidere.*

**5. In quale ordine di tempo ragiona il MES?**
- a) Millisecondi
- b) Minuti ✓
- c) Giorni
- d) Mesi

*Millisecondi è il PLC, giorni e settimane è l'ERP. Il MES sta in mezzo.*

**6. A cosa serve ISA-95?**
- a) A certificare la qualità del prodotto
- b) A descrivere come i sistemi gestionali e quelli di produzione si parlano ✓
- c) A definire i requisiti di sicurezza informatica
- d) A standardizzare i sensori

*È il riferimento da citare quando parli di integrazione tra ERP, MES e livello macchina.*

**7. Qual è il modo più efficace di spiegare il valore della tracciabilità a un dirigente?**
- a) Dire che è richiesta dalla normativa
- b) Dire che permette di bloccare quattromila pezzi invece di duecentomila ✓
- c) Mostrare lo schema dei livelli ISA-95
- d) Elencare le funzioni del MES

*Un numero concreto e una conseguenza economica valgono più di qualsiasi schema.*

## Fonti

- ISA-95, integrazione tra sistemi di controllo e sistemi aziendali
- SAP, che cos'è un MES

---
---

# Unità 4 - Historian, qualità del dato e contesto operativo

**6 minuti**

## Dove siamo nel percorso

**Tappa 3 di 7.** Hai capito chi produce i dati. Ora la domanda che decide il destino di ogni progetto AI: **quei dati sono utilizzabili?** Nove volte su dieci il problema vero è qui.

## Il concetto

L'**historian**, in italiano archivio storico di processo, è il sistema che registra nel tempo tutti i valori che arrivano dalle macchine. Temperatura ogni secondo, velocità ogni secondo, vibrazione ogni secondo, per anni. È il posto da cui un progetto di AI industriale prende quasi sempre i suoi dati.

Ma un numero da solo non serve a niente. **Un dato è utilizzabile solo se porta con sé il contesto.** Guarda la differenza:

Dato senza contesto: `78,4`

Dato con contesto: `78,4 gradi, sensore TT-204, linea 3, ore 14:32:10 del 12 luglio, mentre era in corso l'ordine OP-9912, ricetta versione 7, turno 2, valore validato`

Il primo è inutile. Il secondo permette di rispondere a una domanda vera.

Le **quattro qualità** che un dato deve avere, e che devi saper elencare a colloquio:

1. **Identità**: cosa misura, da quale strumento.
2. **Tempo**: quando, con un orologio sincronizzato. Se due sistemi hanno orologi diversi di 40 secondi, il tuo modello imparerà relazioni false.
3. **Contesto**: cosa stava succedendo. Quale ordine, quale prodotto, quale turno.
4. **Fiducia**: il valore è validato o è un dato grezzo? Un sensore scollegato può mandare zero per ore, e zero sembra un numero valido.

Poi ci sono tre problemi ricorrenti che devi conoscere:

- **Il dato che non esiste.** I microfermi sotto i due minuti spesso non vengono registrati, perché il sistema li ignora sotto una soglia. Risultato: cerchi la causa di una perdita che nei dati non compare.
- **Il buco nei dati.** Un sensore rotto per tre settimane lascia un vuoto. Se non lo sai, il modello impara dalle settimane sbagliate.
- **Lo stesso nome per cose diverse.** Due reparti chiamano "scarto" cose diverse: uno include le rilavorazioni, l'altro no. I numeri non tornano mai e nessuno capisce perché.

Infine il **proprietario del dato**, in inglese *data owner*: la persona che risponde della correttezza di quel dato. Se non esiste, ogni discussione sui numeri finisce in stallo.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Historian | Archivio storico di processo | Sistema che registra nel tempo i valori provenienti dalle macchine. |
| Contesto | Contesto | Le informazioni che dicono cosa stava succedendo quando il dato è stato registrato. |
| Sincronizzazione oraria | Sincronizzazione oraria | Avere lo stesso orologio su tutti i sistemi, per poter confrontare gli eventi. |
| Dato grezzo | Dato grezzo | Valore così come arriva dallo strumento, non ancora validato. |
| Data owner | Proprietario del dato | La persona che risponde della correttezza di quel dato. |
| Microfermo | Microfermo | Fermata molto breve, spesso sotto i due minuti, spesso non registrata. |
| Prontezza dei dati | Prontezza dei dati | Quanto i dati sono davvero pronti a sostenere il caso d'uso che vuoi fare. |

## Esempio pratico

Ti chiedono un modello che preveda i fermi della linea 3. Prima di dire sì, fai quattro verifiche. Ecco cosa trovi.

| Verifica | Risultato | Conseguenza |
|---|---|---|
| I dati di vibrazione esistono? | Sì, ogni secondo, da 3 anni | Buono |
| Gli orologi sono sincronizzati? | No: il sistema di manutenzione è avanti di **40 secondi** | Il guasto sembra avvenire prima del segnale che lo causa |
| I fermi sono tutti registrati? | No: sotto i **2 minuti** non vengono salvati | Il 40 percento delle fermate non compare |
| Chi risponde del dato? | Nessuno di preciso | Ogni riunione finisce in discussione sui numeri |

Verdetto: **non parti dal modello.** Parti da tre settimane di lavoro sui dati.

1. Sincronizzi gli orologi.
2. Abbassi la soglia di registrazione dei fermi da 2 minuti a 10 secondi.
3. Nomini un proprietario del dato per la linea 3.

Solo dopo puoi valutare se serve un modello, e a quel punto scoprirai probabilmente che **metà del problema si risolve senza**, perché per la prima volta vedi i microfermi.

Questa è la risposta più forte che puoi dare a un colloquio: *"prima di promettere un modello, verifico se il dato regge. Nella mia esperienza il primo progetto è quasi sempre sistemare la misura, non addestrare un algoritmo."*

## Come lo dici in inglese

> "A number on its own is not useful. I need to know what it is, when it happened, and what was running at that moment."

> "The clocks were forty seconds apart. That means the failure looks like it happened before the signal that caused it."

> "Short stops under two minutes were not saved at all. So forty percent of the problem was simply not in the data."

> "So the first project was not a model. It was fixing how we measure."

**Perché queste parole.** *On its own, forty seconds apart, not saved at all, fixing how we measure*. La frase sugli orologi è particolarmente efficace perché il problema si capisce subito senza spiegazioni.

## Quiz

**1. Perché un numero da solo non è utilizzabile?**
- a) Perché serve sempre un modello per interpretarlo
- b) Perché senza identità, tempo, contesto e fiducia non puoi rispondere a nessuna domanda vera ✓
- c) Perché i sensori sbagliano spesso
- d) Perché va sempre convertito

*Le quattro qualità del dato sono l'elenco da avere in testa quando ti chiedono se i dati bastano.*

**2. Gli orologi di due sistemi differiscono di 40 secondi. Qual è la conseguenza?**
- a) Nessuna, è una differenza trascurabile
- b) Il modello può imparare relazioni false, ad esempio che il guasto precede il segnale che lo causa ✓
- c) I dati si perdono
- d) Il sistema rallenta

*È un problema che sembra banale e invece invalida tutte le analisi su sequenze di eventi.*

**3. I fermi sotto i 2 minuti non vengono registrati. Cosa comporta?**
- a) Poco, sono fermate brevi
- b) Che una quota grande della perdita non compare nei dati, e cerchi la causa di qualcosa che non vedi ✓
- c) Che i dati sono più puliti
- d) Che il modello sarà più preciso

*I microfermi sono una delle perdite più grandi e più invisibili in produzione.*

**4. Dopo le quattro verifiche i dati risultano deboli. Cosa proponi?**
- a) Costruire il modello lo stesso e migliorarlo dopo
- b) Tre settimane di lavoro sui dati prima di valutare qualunque modello ✓
- c) Cambiare caso d'uso
- d) Comprare più sensori

*Sistemare la misura è quasi sempre il primo progetto vero, ed è anche il più rapido a dare risultati.*

**5. A cosa serve un proprietario del dato?**
- a) A gestire i permessi di accesso
- b) A rispondere della correttezza di quel dato, così le discussioni sui numeri non finiscono in stallo ✓
- c) A fare i backup
- d) A scegliere il fornitore

*Senza un nome e cognome, ogni riunione ricomincia dal dubbio sui numeri.*

**6. Due reparti chiamano "scarto" cose diverse. Che problema è?**
- a) Un problema di comunicazione
- b) Un problema di definizione condivisa: i numeri non torneranno mai e nessuno capirà perché ✓
- c) Un problema di formazione
- d) Nessun problema, basta fare la media

*La stessa parola per cose diverse è uno dei problemi di dato più frequenti e più sottovalutati.*

**7. Che cos'è l'historian?**
- a) Il registro degli interventi di manutenzione
- b) Il sistema che registra nel tempo i valori provenienti dalle macchine ✓
- c) Il database del gestionale
- d) L'archivio dei documenti di qualità

*È il posto da cui un progetto di AI industriale prende quasi sempre i suoi dati.*

## Fonti

- ISA-95, contesto e integrazione dei dati di produzione
- NIST, incertezza nelle previsioni e qualità dei dati

---
---

# Unità 5 - Edge, cloud, dove vive l'AI, accessi e sicurezza

**6 minuti**

## Dove siamo nel percorso

**Tappa 3 di 7, ultima.** Sai chi produce i dati e se sono utilizzabili. Resta una domanda: **dove far girare l'AI, e come collegarsi senza aprire una porta pericolosa.**

## Il concetto

Ci sono due posti dove può girare un calcolo, e la scelta dipende da una cosa sola: **quanto in fretta serve la risposta**.

**Edge**, in italiano bordo, significa far girare il calcolo vicino alla macchina, su un dispositivo in reparto. Vantaggi: risposta in millisecondi, funziona anche se la rete verso l'esterno cade, i dati non escono. Svantaggi: poca potenza, difficile da aggiornare su cento linee.

**Cloud**, in italiano nuvola, significa far girare il calcolo su server esterni. Vantaggi: potenza quasi illimitata, aggiorni in un posto solo, puoi confrontare dati di più stabilimenti. Svantaggi: latenza, e i dati devono uscire.

La regola pratica: **se la decisione deve avvenire in meno di un secondo, edge. Se può aspettare minuti o ore, cloud.**

Un modello che prevede un guasto tre giorni prima può stare tranquillamente nel cloud. Un controllo visivo che deve scartare un pezzo mentre scorre sul nastro deve stare all'edge.

Ora la parte che a un colloquio conta di più: **come ci si collega**.

Il principio si chiama **zone e condotti**. Le **zone** sono gruppi di sistemi con lo stesso livello di protezione. I **condotti** sono i collegamenti permessi fra zone, ognuno con protocollo, direzione e regole dichiarate. Fra la rete d'ufficio e quella di fabbrica c'è una zona intermedia, chiamata **DMZ industriale**, che serve proprio a evitare collegamenti diretti.

E tre regole sugli accessi che devi saper dire a memoria:

1. **Si legge, non si scrive.** Un progetto di analisi legge dati. Non scrive comandi verso le macchine.
2. **Il flusso parte da dentro.** Se un fornitore vuole dati, glieli mandiamo noi verso l'esterno. Non apriamo un canale in entrata.
3. **Accesso a tempo, non permanente.** Nessuna connessione sempre aperta. Approvazione per singola finestra, sessione registrata, revoca automatica alla chiusura.

L'accesso remoto permanente di un fornitore è la porta più usata negli incidenti industriali. Saperlo dire con calma, e proporre l'alternativa invece di limitarti a rifiutare, è esattamente ciò che ci si aspetta da un ruolo di lead.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Edge | Bordo | Far girare il calcolo vicino alla macchina, in reparto. |
| Cloud | Nuvola | Far girare il calcolo su server esterni, raggiungibili via rete. |
| Latenza | Latenza | Il tempo che passa tra la domanda e la risposta. |
| Zona | Zona | Gruppo di sistemi con lo stesso livello di protezione. |
| Condotto | Condotto | Collegamento permesso fra due zone, con regole dichiarate. |
| DMZ industriale | Zona intermedia | Zona cuscinetto fra rete d'ufficio e rete di fabbrica, per evitare collegamenti diretti. |
| Accesso a tempo | Accesso a tempo | Collegamento aperto solo per una finestra approvata, poi revocato in automatico. |
| Privilegio minimo | Privilegio minimo | Dare solo i permessi che servono a quel compito, per il tempo che serve. |

## Esempio pratico

Devi collegare un modello di manutenzione predittiva ai dati della linea. Ti si presentano tre strade.

| Proposta | Da dove legge | Direzione | Rischio principale |
|---|---|---|---|
| Leggere dal PLC direttamente | Livello di controllo | In uscita continua | Carico e dipendenze dove la priorità è non fermarsi |
| Accesso permanente del fornitore | Dall'esterno | **In entrata continua** | Canale non presidiato verso la fabbrica |
| Leggere dall'historian in zona intermedia | Zona intermedia | In uscita, a orari concordati | Latenza maggiore, contesto da ricostruire |

Scegli la terza. E la motivi così: *"il dato che mi serve è già in zona intermedia. Non ho bisogno di toccare il livello di controllo, e non apro nulla in entrata. Il prezzo è qualche minuto di ritardo, che per un modello che prevede a tre giorni non cambia niente."*

Nota il ragionamento: **hai accettato uno svantaggio reale** (la latenza) **perché irrilevante per quel caso d'uso**. È il tipo di scelta consapevole che a colloquio distingue chi ha fatto davvero questo mestiere.

E se qualcuno insiste per l'accesso permanente del fornitore, la risposta non è no: è *"i dati glieli mandiamo noi, in uscita, con quello che serve e niente di più."*

## Come lo dici in inglese

> "If the decision has to happen in less than a second, we keep it close to the machine. If it can wait minutes, the cloud is fine."

> "The prediction looks three days ahead, so a few minutes of delay changes nothing."

> "We read from a system that already sits in the middle zone. We do not touch the machine level, and we do not open anything coming in."

> "If the supplier needs data, we send it out to them. We do not let them in."

**Perché queste parole.** *Close to the machine, changes nothing, we do not open anything coming in, we send it out, we do not let them in*. L'ultima frase è corta e memorabile, ed è la cosa giusta da dire.

## Quiz

**1. Quando conviene far girare il calcolo all'edge invece che nel cloud?**
- a) Sempre, è più sicuro
- b) Quando la decisione deve avvenire in meno di un secondo ✓
- c) Quando i dati sono pochi
- d) Quando il cloud costa troppo

*La regola pratica è il tempo di risposta richiesto, non la preferenza tecnologica.*

**2. Un modello prevede un guasto tre giorni prima. Dove lo metti?**
- a) All'edge, per sicurezza
- b) Nel cloud: qualche minuto di latenza è irrilevante su una previsione a tre giorni ✓
- c) Dentro il PLC
- d) Dipende dal fornitore

*Accettare uno svantaggio irrilevante per quel caso d'uso è una scelta consapevole, non un compromesso.*

**3. Che cos'è una zona intermedia (DMZ industriale)?**
- a) Un'area del reparto riservata alla manutenzione
- b) Una zona cuscinetto fra rete d'ufficio e rete di fabbrica, per evitare collegamenti diretti ✓
- c) Un server di backup
- d) Una sala controllo secondaria

*È il posto da cui quasi sempre puoi prendere i dati che ti servono senza toccare il livello di controllo.*

**4. Un fornitore chiede un accesso permanente per la manutenzione predittiva. Cosa rispondi?**
- a) Sì, se firma un accordo di riservatezza
- b) No, e proponi di mandare noi i dati verso l'esterno ✓
- c) Sì, ma solo di notte
- d) Chiedi alla direzione di decidere

*L'accesso remoto permanente è la porta più usata negli incidenti industriali. Si inverte la direzione del flusso.*

**5. Cosa significa "si legge, non si scrive"?**
- a) Che i dati vanno solo consultati e mai archiviati
- b) Che un progetto di analisi legge dati e non manda comandi alle macchine ✓
- c) Che si usano solo documenti cartacei
- d) Che i log non vanno modificati

*Leggere è reversibile, scrivere no. È il confine base di ogni primo progetto industriale.*

**6. Cosa sono zone e condotti?**
- a) Le aree fisiche dello stabilimento
- b) Gruppi di sistemi con la stessa protezione, e i collegamenti permessi fra loro con regole dichiarate ✓
- c) I livelli dello standard ISA-95
- d) Le fasce orarie di manutenzione

*È il linguaggio con cui parlerai con la sicurezza informatica, e usarlo correttamente ti fa guadagnare credibilità subito.*

**7. Perché l'accesso deve essere a tempo e non permanente?**
- a) Per risparmiare sulle licenze
- b) Perché una connessione sempre aperta diventa un canale non presidiato verso la fabbrica ✓
- c) Perché lo richiede il fornitore
- d) Perché riduce la latenza

*Approvazione per finestra, sessione registrata, revoca automatica: sono tre cose semplici da dire e molto convincenti.*

## Fonti

- ISA/IEC 62443, sicurezza dei sistemi industriali di automazione e controllo
- NIST SP 800-82 Rev. 3, sicurezza delle tecnologie operative
- Microsoft, Azure Landing Zone, per il tema fondamenta e governance cloud

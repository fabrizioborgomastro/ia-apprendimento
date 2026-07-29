# Modulo 3 - Analytics, automazione e AI: scegliere lo strumento giusto

30 minuti, 5 unità. Copre il requisito *translate business challenges into digital/AI solutions (analytics, automation, optimization)*.

Dentro ci sono due delle tre storie complete: manutenzione predittiva e qualità.

---
---

# Unità 1 - Regole, analytics, machine learning, ottimizzazione, AI generativa

**6 minuti**

## Dove siamo nel percorso

**Tappa 4 di 7: scelgo lo strumento più semplice che risolve.** Questa è la scala. Impararla ti dà una risposta pronta a metà delle domande tecniche che riceverai.

## Il concetto

Esiste una scala di strumenti, dal più semplice al più complesso. **Si sale un gradino solo quando quello sotto non basta.**

**Gradino 1 - Regola fissa.** "Se la vibrazione supera 4,5, avvisa." Una condizione scritta da una persona. Vantaggi: si spiega in una frase, funziona subito, chiunque capisce perché ha deciso così. Limite: non si adatta.

**Gradino 2 - Analytics descrittiva.** Guardare i dati per capire cosa è successo. Un grafico delle prime tre cause di fermo, un confronto fra turni. Non predice niente, spiega il passato. È il gradino più sottovalutato: **risolve una quantità enorme di problemi**, perché quasi sempre nessuno aveva ancora guardato i dati.

**Gradino 3 - Machine learning, in italiano apprendimento automatico.** Il computer trova da solo le relazioni nei dati storici e le usa per prevedere. Serve quando la regola non si riesce a scrivere perché dipende da troppe cose insieme. Costo: servono dati storici di qualità, e nessuno saprà spiegare in una frase perché ha deciso così.

**Gradino 4 - Ottimizzazione.** Trovare la combinazione migliore fra molte possibili, dati dei vincoli. Non prevede: **sceglie**. Esempio: in che ordine produrre otto articoli per ridurre i cambi formato. Serve quando il problema è combinatorio.

**Gradino 5 - AI generativa.** Sistemi che producono testo, come i modelli linguistici. Servono quando il materiale di partenza è **linguaggio**: documenti, procedure, descrizioni scritte a mano. Non servono per prevedere un guasto da una serie di numeri: lì il machine learning è più adatto, più preciso e più economico.

Ecco la tabella che vale come risposta pronta:

| Domanda | Strumento giusto |
|---|---|
| "Cosa è successo?" | Analytics descrittiva |
| "Succederà?" | Machine learning |
| "Qual è la scelta migliore?" | Ottimizzazione |
| "Cosa dice questo documento?" | AI generativa |
| "Quando devo intervenire?" | Regola, se la soglia è nota |

L'errore più comune, e quello che ti fa sembrare inesperto, è **salire due gradini per abitudine**: proporre AI generativa per un problema di soglia, o machine learning per un problema che nessuno ha ancora guardato con un grafico.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Regola | Regola | Condizione scritta da una persona: se succede questo, fai quello. |
| Analytics descrittiva | Analisi descrittiva | Guardare i dati per capire cosa è successo, senza prevedere. |
| Machine learning | Apprendimento automatico | Il computer trova relazioni nei dati storici e le usa per prevedere. |
| Ottimizzazione | Ottimizzazione | Trovare la combinazione migliore dati dei vincoli. |
| AI generativa | AI generativa | Sistemi che producono testo o immagini, utili quando il materiale è linguaggio. |
| Modello | Modello | La formula appresa dai dati che produce una previsione. |
| Spiegabilità | Spiegabilità | Quanto è facile capire perché il sistema ha deciso così. |

## Esempio pratico

Quattro problemi reali, quattro gradini diversi.

**1. "Il motore si surriscalda e non ce ne accorgiamo in tempo."**
La soglia di allarme esiste già nel manuale: 85 gradi. Strumento: **regola**. Costo: mezza giornata. Chi propone machine learning qui sta sprecando soldi.

**2. "Non sappiamo perché la linea 3 si ferma tanto."**
Nessuno ha mai guardato i dati aggregati. Strumento: **analytics descrittiva**, un grafico delle cause. Risultato tipico: metà dei fermi viene da una causa sola. Costo: due giorni.

**3. "Vorremmo sapere in anticipo quando un cuscinetto sta per cedere."**
Non c'è una soglia unica: dipende da vibrazione, temperatura, ore di funzionamento e carico insieme. Strumento: **machine learning**. Costo: settimane, e servono dati storici buoni.

**4. "Produciamo otto articoli e perdiamo troppo tempo nei cambi formato."**
Il problema è l'ordine di produzione. Le combinazioni possibili di otto articoli sono 40.320. Strumento: **ottimizzazione**. Non prevede niente, sceglie la sequenza migliore.

E l'AI generativa? Serve nel caso quattro? No. Servirebbe se il problema fosse *"gli operatori non trovano la procedura di cambio formato giusta fra 300 documenti"*. Lì il materiale è linguaggio, e lì è lo strumento adatto.

**La frase da colloquio:** *"parto sempre dal gradino più basso. Nella mia esperienza la maggior parte del valore si prende con analytics descrittiva, perché quasi sempre il problema è che nessuno aveva ancora guardato i dati."*

## Come lo dici in inglese

> "I always start from the simplest thing that works. Very often that is just a chart nobody had looked at before."

> "If I can write the rule myself, I write the rule. I only use a model when the rule depends on too many things at once."

> "Generative AI is for language. If the input is documents and text, it fits. If the input is numbers from sensors, machine learning is better and cheaper."

> "Optimization does not predict. It picks the best option when there are too many options to try."

**Perché queste parole.** *Simplest thing that works, write the rule myself, is for language, picks the best option*. Nessun *descriptive analytics*, nessun *combinatorial problem*.

## Quiz

**1. Qual è la regola generale per scegliere lo strumento?**
- a) Usare sempre la tecnologia più avanzata disponibile
- b) Salire di un gradino solo quando quello sotto non basta ✓
- c) Scegliere in base al budget
- d) Usare quello che il fornitore propone

*Ogni gradino aggiunge costo, fragilità e persone da formare. Va giustificato.*

**2. "Non sappiamo perché la linea si ferma tanto." Quale strumento?**
- a) Machine learning
- b) Analytics descrittiva, un grafico delle cause ✓
- c) AI generativa
- d) Ottimizzazione

*Il gradino più sottovalutato: quasi sempre nessuno aveva ancora guardato i dati aggregati.*

**3. Quando serve davvero il machine learning?**
- a) Sempre, quando ci sono dati
- b) Quando la regola non si riesce a scrivere perché dipende da troppe cose insieme ✓
- c) Quando serve una risposta veloce
- d) Quando i dati sono pochi

*Se puoi scrivere tu la regola, scrivila. È più economica, più veloce e spiegabile.*

**4. Otto articoli e troppi cambi formato. Quale strumento?**
- a) Machine learning, per prevedere i cambi
- b) Ottimizzazione, per scegliere la sequenza migliore ✓
- c) AI generativa
- d) Una regola fissa

*L'ottimizzazione non prevede, sceglie fra molte combinazioni dati dei vincoli.*

**5. Quando è adatta l'AI generativa?**
- a) Per prevedere guasti dai dati dei sensori
- b) Quando il materiale di partenza è linguaggio: documenti, procedure, testo ✓
- c) Per ottimizzare la produzione
- d) Per calcolare l'OEE

*Sui numeri dei sensori il machine learning è più preciso e più economico.*

**6. Qual è l'errore che fa sembrare inesperti?**
- a) Proporre soluzioni troppo semplici
- b) Salire due gradini per abitudine, ad esempio AI generativa per un problema di soglia ✓
- c) Chiedere troppi dati
- d) Coinvolgere troppe funzioni

*Chi propone la tecnologia più avanzata a prescindere dal problema mostra di non aver mai gestito un budget.*

**7. Che cosa si perde salendo dal gradino della regola a quello del machine learning?**
- a) Niente, si guadagna solo precisione
- b) La spiegabilità: nessuno saprà dire in una frase perché ha deciso così ✓
- c) La velocità di risposta
- d) La possibilità di usare i dati storici

*In un contesto regolamentato la spiegabilità ha un valore concreto, non teorico.*

## Fonti

- NIST, incertezza nelle previsioni
- NIST AI Risk Management Framework

---
---

# Unità 2 - Storia completa 1: la manutenzione predittiva

**6 minuti**

## Dove siamo nel percorso

**Tutte e sette le tappe.** Questa è la prima storia completa. Percorrila con attenzione: è il racconto che userai per rispondere a "descrivi un processo di trasformazione digitale".

## Il concetto

Segui il caso dall'inizio alla fine. Ogni tappa ha il suo nome, gli stessi nomi di sempre.

**1. Osservo.** Passo due turni sulla linea 3. Vedo che quando la linea si ferma, l'operatore chiama il manutentore, il manutentore arriva dopo venti minuti, diagnostica, va a prendere il pezzo. Nel frattempo la linea è ferma.

**2. Misuro.** Prendo la baseline su quattro settimane: **6 ore di fermo a settimana** sulla linea 3. Con un costo di fermata stimato a 900 euro l'ora, il problema vale circa **280.000 euro l'anno**. Il capo reparto firma il numero.

**3. Capisco.** Vado a vedere dove nascono i dati. Trovo tre cose:
- I fermi sono già registrati nel sistema di esecuzione della produzione, ma nessuno li guarda aggregati.
- Guardandoli: **3 ore su 6 vengono da un solo gruppo meccanico**, il trascinamento.
- I dati di vibrazione esistono nell'archivio storico di processo, ogni secondo, da tre anni.

Scopro anche un problema: gli orologi del sistema manutenzione e dell'archivio sono sfasati di 40 secondi. Prima di tutto, sistemo quello.

**4. Scelgo.** Non parto dal machine learning. Parto dal gradino più basso che risolve:
- Prima un **grafico settimanale** delle tre cause principali, con un responsabile assegnato. Costo quasi zero.
- I fermi scendono da 6 a **4,8 ore**. Già così ho recuperato 56.000 euro l'anno con due giorni di lavoro.
- Restano i cedimenti del cuscinetto, che nessuna regola semplice anticipa: dipendono da vibrazione, temperatura e ore insieme. **Qui sì, machine learning.**

**5. Provo.** Sei settimane in modalità ombra. Il modello gira, registra la sua previsione, ma nessuno la vede e niente cambia in linea. Alla fine confronto: su **11 cedimenti** realmente avvenuti, il modello ne aveva anticipati **8** con almeno due giorni di margine. Ha anche dato **5 falsi allarmi**.

Facciamo i conti. 8 su 11 anticipati significa che il modello prende il **73 percento** dei casi. I 5 falsi allarmi costano ciascuno un controllo da mezz'ora: 2,5 ore in sei settimane. Contro 8 fermate evitate da circa 40 minuti l'una: **oltre 5 ore risparmiate**. Conviene.

**6. Metto in produzione.** Con tre reti di sicurezza:
- L'avviso va **al pianificatore della manutenzione**, non alla macchina. Nessun sistema ferma niente da solo.
- Se il modello non risponde, resta la **ronda programmata** come prima. Il processo non dipende dal sistema.
- Un nome e cognome risponde del funzionamento: il responsabile manutenzione della linea 3.

**7. Decido.** Dopo tre mesi i fermi sono a **3,9 ore a settimana**, contro 6 di partenza. Estendo alle linee 1 e 2, che hanno **lo stesso gruppo meccanico**. Non alle linee 4 e 5, che hanno macchine di un altro costruttore: lì il modello dovrebbe essere riaddestrato da zero e il caso va rifatto.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Manutenzione predittiva | Manutenzione predittiva | Intervenire prima del guasto, sulla base di segnali che lo anticipano. |
| Manutenzione preventiva | Manutenzione preventiva | Intervenire a intervalli fissi, indipendentemente dallo stato reale. |
| Falso allarme | Falso allarme | Il sistema segnala un problema che non c'era. |
| Mancata segnalazione | Mancata segnalazione | Il problema c'era e il sistema non lo ha segnalato. |
| Modo di guasto | Modo di guasto | Il modo specifico in cui un componente si rompe. |
| Finestra di anticipo | Finestra di anticipo | Quanto tempo prima arriva l'avviso: se è troppo poco, non serve a niente. |

Una cosa importante: **un avviso che arriva due ore prima è inutile** se per intervenire ti serve ordinare un pezzo che arriva in due giorni. La finestra di anticipo deve essere compatibile con il tempo di reazione reale. È una domanda che a colloquio fa una gran figura.

## Esempio pratico

Il conto economico completo della storia, quello che ti chiederanno.

| Voce | Valore |
|---|---|
| Fermo di partenza | 6 ore/settimana |
| Costo di un'ora di fermo | 900 euro |
| Perdita annua di partenza | circa 280.000 euro |
| Dopo il solo grafico (2 giorni di lavoro) | 4,8 ore/settimana |
| Dopo il modello (3 mesi) | 3,9 ore/settimana |
| Recupero annuo totale | circa **98.000 euro** |
| Di cui dal solo grafico | circa 56.000 euro |

Nota il dato che vale di più: **il 57 percento del risultato è arrivato dal gradino più basso**, con due giorni di lavoro e zero rischio. Il machine learning ha aggiunto il resto, con settimane di lavoro.

Questo è il numero che rende credibile la tua frase "parto sempre dallo strumento più semplice": non è una posizione di principio, è un fatto misurato.

## Come lo dici in inglese

> "We were losing six hours a week on that line. At nine hundred euros an hour, that is about two hundred and eighty thousand a year."

> "Half of it came from one mechanical group. Nobody had looked at the data together before."

> "So the first thing was just a weekly chart with an owner. That alone took it from six hours to four point eight, in two days of work."

> "Then we added a model for the bearings, because no simple rule could see that coming."

> "We ran it in the shadow for six weeks. It caught eight failures out of eleven, with five false alarms. The maths still worked."

> "The alert goes to the maintenance planner, not to the machine. Nothing stops on its own."

**Perché queste parole.** Numeri detti a voce (*six hours a week, nine hundred euros an hour*), verbi semplici (*caught, ran, added*), e la frase finale corta che chiude la questione sicurezza: *nothing stops on its own*.

## Quiz

**1. Nella storia, quale tappa ha prodotto il maggior risultato per euro speso?**
- a) Il modello di machine learning
- b) Il grafico settimanale delle cause, con due giorni di lavoro ✓
- c) La sincronizzazione degli orologi
- d) L'estensione ad altre linee

*Il 57 percento del recupero è venuto dal gradino più basso. È il dato che rende credibile tutto il metodo.*

**2. Il modello ha anticipato 8 cedimenti su 11 con 5 falsi allarmi. Come si giudica?**
- a) Male, 5 falsi allarmi sono troppi
- b) Confrontando il costo dei falsi allarmi con il valore delle fermate evitate ✓
- c) Bene, perché supera il 70 percento
- d) Non si può giudicare senza più dati

*2,5 ore di controlli inutili contro oltre 5 ore di fermate evitate. Il conto si fa, non si intuisce.*

**3. Perché l'avviso va al pianificatore e non alla macchina?**
- a) Perché la macchina non è collegata
- b) Perché una previsione probabilistica non deve fermare nulla da sola ✓
- c) Perché il pianificatore lo ha richiesto
- d) Per ridurre i costi

*È la regola che ti farà sempre fare bella figura: il sistema propone, la persona decide.*

**4. Che cos'è la finestra di anticipo e perché conta?**
- a) Il tempo di elaborazione del modello
- b) Quanto tempo prima arriva l'avviso: se è inferiore al tempo di reazione reale, non serve a niente ✓
- c) La durata del periodo di prova
- d) L'intervallo fra due manutenzioni

*Un avviso a due ore è inutile se il pezzo di ricambio arriva in due giorni.*

**5. Perché il progetto non è stato esteso alle linee 4 e 5?**
- a) Per mancanza di budget
- b) Perché hanno macchine di un altro costruttore e il modello andrebbe rifatto ✓
- c) Perché non avevano fermi
- d) Perché la direzione non ha approvato

*Estendere dove il contesto è diverso significa rifare il progetto, non copiarlo.*

**6. Nella tappa "capisco" è emerso un problema tecnico. Quale?**
- a) I sensori erano rotti
- b) Gli orologi di due sistemi erano sfasati di 40 secondi ✓
- c) Mancavano i dati di vibrazione
- d) Il sistema di manutenzione era obsoleto

*Sfasamento degli orologi: il guasto sembra avvenire prima del segnale che lo causa.*

**7. Che differenza c'è tra manutenzione preventiva e predittiva?**
- a) Nessuna
- b) La preventiva interviene a intervalli fissi, la predittiva sulla base di segnali che anticipano il guasto ✓
- c) La preventiva è più costosa
- d) La predittiva si fa solo sulle macchine nuove

*La preventiva sostituisce pezzi ancora buoni. La predittiva interviene quando serve, se i segnali ci sono.*

## Fonti

- NIST, manutenzione basata sul monitoraggio delle condizioni in produzione
- NIST, incertezza nelle previsioni

---
---

# Unità 3 - Storia completa 2: qualità e difetti

**6 minuti**

## Dove siamo nel percorso

**Tutte e sette le tappe, seconda storia.** Questa finisce diversamente dalla prima: **si ferma prima di estendere**. È la storia che a colloquio ti fa sembrare uno che l'ha fatto davvero.

## Il concetto

**1. Osservo.** Un formato nuovo, lanciato da due mesi, produce più scarto del previsto. Il capo reparto lo sa, ma "sembra che vada meglio da quando abbiamo cambiato il fornitore del film".

**2. Misuro.** Baseline: **scarto al 2,3 percento** contro lo standard aziendale dello **0,8 percento**. Su 3 milioni di pezzi al mese, la differenza è **45.000 pezzi scartati in più**.

**3. Capisco.** Il dato di scarto esiste nel sistema di esecuzione della produzione, collegato al lotto. Buona notizia. Analizzo e trovo due cose:
- Lo scarto è concentrato nel **turno di notte**: 3,4 percento contro 1,7 degli altri turni.
- Riguarda **un solo formato** su sei.

Nessuno lo aveva notato perché il numero riportato in riunione era la media mensile di tutti i turni e tutti i formati.

**4. Scelgo.** Prima ipotesi: è un problema di regolazione, non di controllo. Provo il gradino più basso: **una regola** che avvisa se la temperatura di saldatura esce da una banda stretta durante quel formato.

Risultato: lo scarto scende da 2,3 a **1,6 percento**. Bene, ma non basta: lo standard è 0,8.

Il difetto residuo è visivo, una piega irregolare che si vede solo guardando il pezzo. Nessuna regola sui parametri lo cattura. **Qui serve un controllo visivo automatico**, cioè un modello che guarda le immagini.

**5. Provo.** Modalità ombra, otto settimane, il sistema fotografa e giudica ma non scarta niente. Un controllore qualificato rivede tutte le segnalazioni. Ecco il risultato:

| | Il pezzo era difettoso | Il pezzo era buono |
|---|---:|---:|
| **Il sistema lo segnala** | 96 | 64 |
| **Il sistema non lo segnala** | 24 | 1016 |

Da qui si calcolano due numeri che devi saper spiegare:

- **Precisione**: di tutti i pezzi che il sistema ha segnalato, quanti erano davvero difettosi. 96 su 160 = **60 percento**. Quattro segnalazioni su dieci fanno perdere tempo.
- **Richiamo** (in inglese *recall*): di tutti i pezzi davvero difettosi, quanti il sistema ne ha trovati. 96 su 120 = **80 percento**. Un difetto su cinque gli sfugge.

**6. Metto in produzione.** Modalità consultiva su un solo formato: il sistema segnala, una persona guarda e decide. Nessuno scarto automatico, perché scartare è una decisione di conformità.

**7. Decido: mi fermo.** E qui sta il punto della storia.

Le segnalazioni sono 160 in otto settimane su un turno. Estendendo a sei formati e tre turni diventerebbero circa **3.600 segnalazioni**, cioè **75 al giorno**. Il controllo qualità ha capacità per rivederne **circa 30 al giorno**.

Se estendo, succede una cosa prevedibile: la coda cresce, le persone iniziano a confermare senza guardare, e la supervisione umana diventa finta. A quel punto il rischio è più alto di prima, non più basso.

**Decisione: non estendo.** Prima alzo la precisione dal 60 ad almeno il 75 percento, così le segnalazioni scendono a un livello sostenibile. Con owner e data di riesame.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Scarto | Scarto | Percentuale di prodotto buttato o da rilavorare. |
| Precisione | Precisione | Di tutto ciò che il sistema segnala, quanto era davvero un problema. |
| Richiamo | Richiamo | Di tutti i problemi veri, quanti il sistema ne ha trovati. |
| Falso positivo | Falso allarme | Il sistema segnala un pezzo buono. |
| Falso negativo | Difetto sfuggito | Il sistema non segnala un pezzo difettoso. |
| Controllo visivo automatico | Controllo visivo automatico | Un modello che giudica immagini al posto dell'occhio umano. |
| Capacità di revisione | Capacità di revisione | Quante segnalazioni una persona riesce davvero a controllare in un turno. |

## Esempio pratico

Il ragionamento sul compromesso, che è la parte più preziosa di questa storia.

Potresti alzare la soglia del sistema per ridurre i falsi allarmi. Cosa succede:

| Soglia | Precisione | Richiamo | Conseguenza |
|---|---:|---:|---|
| Attuale | 60% | 80% | 4 segnalazioni su 10 inutili, ma 8 difetti su 10 trovati |
| Più alta | 78% | 61% | Meno tempo perso, ma **4 difetti su 10 arrivano al cliente** |

Alzare la soglia sembra un miglioramento. Non lo è: **sposta il costo su un errore molto più caro**. Un falso allarme costa mezz'ora a un controllore. Un difetto che arriva al cliente costa un reclamo, un blocco lotto, e la fiducia.

La scelta corretta è tenere il richiamo alto e finanziare la capacità di revisione, oppure fermarsi finché la precisione non migliora.

**La frase da colloquio:** *"i due errori non costano uguale. Prima di toccare una soglia, guardo quale dei due mi sto comprando."*

## Come lo dici in inglese

> "The scrap rate was two point three percent, against a standard of zero point eight."

> "The average was hiding it. It was one shift and one format, not the whole line."

> "The system finds eight defects out of ten, but four out of ten alerts are false. So people lose some time."

> "We could raise the threshold and get fewer false alerts. But then four defects out of ten reach the customer. That is a much more expensive mistake."

> "So we did not scale it. First we make it more precise, then we talk again."

**Perché queste parole.** *The average was hiding it, reach the customer, a much more expensive mistake, then we talk again*. L'ultima frase è particolarmente utile: dice no senza chiudere la porta.

## Quiz

**1. Perché nessuno si era accorto del problema?**
- a) Perché i dati non c'erano
- b) Perché il numero riportato era la media di tutti i turni e formati, che nascondeva la concentrazione ✓
- c) Perché il formato era nuovo
- d) Perché il controllo qualità era assente

*Le medie nascondono. È lo stesso principio dell'OEE nel Modulo 1.*

**2. Cosa significa che la precisione è 60 percento?**
- a) Che trova il 60 percento dei difetti
- b) Che di tutti i pezzi segnalati, il 60 percento era davvero difettoso ✓
- c) Che sbaglia il 60 percento delle volte
- d) Che è affidabile al 60 percento

*Precisione guarda le segnalazioni. Richiamo guarda i difetti veri.*

**3. Cosa significa che il richiamo è 80 percento?**
- a) Che l'80 percento delle segnalazioni è corretto
- b) Che di tutti i difetti veri, il sistema ne trova l'80 percento ✓
- c) Che funziona l'80 percento del tempo
- d) Che l'80 percento dei pezzi è buono

*Un difetto su cinque gli sfugge. È il numero che interessa alla qualità.*

**4. Alzare la soglia porta precisione 78 e richiamo 61. È un miglioramento?**
- a) Sì, la precisione è più alta
- b) No: sposta il costo su un errore più caro, i difetti che arrivano al cliente ✓
- c) Sì, se il cliente non se ne accorge
- d) Dipende dal budget

*I due errori non costano uguale. Prima di toccare una soglia, guarda quale dei due ti stai comprando.*

**5. Perché la storia si ferma prima di estendere?**
- a) Per mancanza di fondi
- b) Perché a regime servirebbero 75 revisioni al giorno contro una capacità di 30 ✓
- c) Perché il modello non funziona
- d) Perché il formato è stato ritirato

*Se la coda supera la capacità, le persone confermano senza guardare e la supervisione diventa finta.*

**6. Perché il sistema non scarta automaticamente i pezzi?**
- a) Perché è troppo lento
- b) Perché scartare è una decisione di conformità, e resta di una persona ✓
- c) Perché non è collegato alla linea
- d) Perché costerebbe troppo

*È lo stesso cancello non negoziabile del Modulo 1: il sistema propone, la persona decide.*

**7. Qual è stato il primo intervento, prima del modello?**
- a) Cambiare il fornitore del film
- b) Una regola sulla temperatura di saldatura, che ha portato lo scarto da 2,3 a 1,6 ✓
- c) Fermare la produzione del formato
- d) Aumentare i controlli manuali

*Anche qui il gradino più basso ha preso la maggior parte del risultato prima del modello.*

## Fonti

- NIST, precisione e richiamo
- Regolamento (UE) 2024/1689, supervisione umana

---
---

# Unità 4 - RAG e assistenti AI in azienda: quando aiutano davvero

**6 minuti**

## Dove siamo nel percorso

**Tappa 4 di 7.** Il gradino più alto della scala. Qui capisci cos'è davvero un modello linguistico e quando un assistente aziendale serve, senza il gergo.

## Il concetto

Un **LLM**, *Large Language Model*, in italiano modello linguistico di grandi dimensioni, fa una cosa sola: **prevede la parola successiva più probabile**, una alla volta. Ha visto enormi quantità di testo e ha imparato quali parole seguono quali altre.

Da questa frase discende tutto ciò che devi sapere:

- **Non sa se una cosa è vera.** Sa cosa è probabile. Per questo può scrivere con sicurezza qualcosa di sbagliato: si chiama allucinazione, e non è un difetto da correggere, è come funziona.
- **Non sa cosa succede nella tua azienda**, perché la tua azienda non era nel testo su cui ha imparato.

Il secondo punto è il problema pratico da risolvere. Ed è qui che entra **RAG**, *Retrieval Augmented Generation*, in italiano generazione con recupero di documenti.

RAG in una frase: **prima cerco il documento giusto, poi chiedo al modello di rispondere usando solo quello, citando da dove ha preso la risposta.**

Non è magia, sono quattro passi:
1. **Controllo chi sei** e cosa hai il diritto di vedere.
2. **Cerco** fra i documenti autorizzati quelli che riguardano la domanda.
3. **Verifico che siano la versione valida oggi**, non una vecchia.
4. **Genero** la risposta usando solo quei documenti, e mostro la citazione.

Il punto 3 è quello che nessuno considera e che in una produzione regolamentata è il più importante. **Un assistente che risponde con la procedura sbagliata perché superata è peggio di nessun assistente**, perché è convincente.

E gli **agenti**? Un agente è un sistema che sceglie ripetutamente cosa fare dopo, invece di eseguire passi fissi. Serve quando il percorso di indagine cambia ogni volta. Se i passi sono sempre gli stessi, un flusso fisso è più controllabile e costa meno. La frase da avere pronta: *"se so scrivere i passi in anticipo, non mi serve un agente."*

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| LLM | Modello linguistico | Sistema che prevede la parola successiva più probabile, addestrato su moltissimo testo. |
| Allucinazione | Allucinazione | Quando il modello scrive con sicurezza qualcosa che non è vero. |
| RAG | Generazione con recupero | Cercare prima i documenti giusti e far rispondere il modello solo su quelli, con citazione. |
| Citazione | Citazione | Il riferimento al documento da cui viene la risposta, apribile per verificare. |
| Versione effettiva | Versione effettiva | La revisione del documento valida oggi, distinta da quelle superate. |
| ACL | Permessi di accesso | Le regole che dicono chi può vedere quale documento. |
| Agente | Agente | Sistema che sceglie ripetutamente l'azione successiva invece di seguire passi fissi. |

## Esempio pratico

Un caso secondario ma reale: gli ispettori di qualità perdono in media **12 minuti** per trovare il criterio di accettazione corretto fra centinaia di documenti.

Prima di costruire qualsiasi cosa, faccio una verifica su cinquanta documenti presi a caso:

| Verifica | Risultato |
|---|---|
| Hanno un testo cercabile? | 38 su 50. Dodici sono scansioni senza testo |
| Hanno la revisione dichiarata? | 41 su 50 |
| Hanno l'ambito di applicazione? | 22 su 50 |

Verdetto: **il problema non è la ricerca, è lo stato dei documenti.** Se costruissi un assistente adesso, risponderebbe con sicurezza citando documenti superati o non applicabili a quella linea.

Il primo progetto quindi non è l'AI: è sistemare revisione e ambito sui documenti che contano. Sono tre settimane di lavoro noioso, e valgono più di sei mesi di modello.

Solo dopo aggiungo l'assistente, con tre regole:
- Risponde solo dalla revisione valida oggi.
- Ogni risposta mostra la citazione, apribile con un clic.
- Se non trova evidenza sufficiente, **dice che non lo sa** invece di inventare.

E qui il dato che chiude la storia: dopo due mesi il tempo scende da 12 a 6 minuti, ma il sistema **non viene esteso**. Motivo: il campionamento mostra che solo il 20 percento delle persone apre la citazione prima di confermare. La supervisione è formale, non reale. Prima si sistema quello.

## Come lo dici in inglese

> "A language model predicts the next word. It does not know if something is true, and it does not know anything about our company."

> "So we do it the other way around. First we find the right document, then we ask the model to answer only from that document, and we show where it came from."

> "The hard part is not the model. The hard part is knowing which version of the document is valid today."

> "An assistant that confidently gives you an old procedure is worse than no assistant at all."

**Perché queste parole.** *Predicts the next word, the other way around, which version is valid today, worse than no assistant at all*. L'ultima frase è quella che ricorderanno.

## Quiz

**1. Che cosa fa esattamente un modello linguistico?**
- a) Cerca informazioni su internet
- b) Prevede la parola successiva più probabile ✓
- c) Ragiona come una persona
- d) Consulta un database di fatti

*Da questa frase discende tutto: non sa se una cosa è vera, sa cosa è probabile.*

**2. Che cos'è RAG in una frase?**
- a) Un modello più potente
- b) Cercare prima il documento giusto e far rispondere il modello solo su quello, con citazione ✓
- c) Un sistema di ricerca aziendale
- d) Un modo per addestrare il modello sui dati aziendali

*Non è addestramento: è recupero prima e generazione dopo.*

**3. Qual è il passo che quasi nessuno considera e che in produzione regolamentata è il più importante?**
- a) La velocità di risposta
- b) Verificare che il documento sia la versione valida oggi ✓
- c) La scelta del modello
- d) Il costo per domanda

*Un assistente che cita una procedura superata è peggio di nessun assistente, perché è convincente.*

**4. Nell'esempio, cosa emerge dalla verifica sui 50 documenti?**
- a) Che i documenti sono a posto
- b) Che il problema non è la ricerca ma lo stato dei documenti: solo 22 su 50 hanno l'ambito ✓
- c) Che servono più documenti
- d) Che il modello va addestrato meglio

*Il primo progetto è sistemare revisione e ambito, non costruire l'AI.*

**5. Quando serve un agente invece di un flusso a passi fissi?**
- a) Sempre, è più moderno
- b) Quando il percorso cambia ogni volta e non puoi scrivere i passi in anticipo ✓
- c) Quando ci sono molti utenti
- d) Quando serve più velocità

*Se sai scrivere i passi in anticipo, un flusso fisso è più controllabile e costa meno.*

**6. Cosa deve fare l'assistente se non trova evidenza sufficiente?**
- a) Dare la risposta più probabile
- b) Dire che non lo sa ✓
- c) Chiedere all'utente di riformulare
- d) Cercare su internet

*Il rifiuto è una funzione, non un fallimento. Riduce l'answer rate e aumenta la fiducia.*

**7. Perché il sistema dell'esempio non viene esteso pur avendo dimezzato i tempi?**
- a) Perché costa troppo
- b) Perché solo il 20 percento apre la citazione prima di confermare: la supervisione è formale, non reale ✓
- c) Perché gli utenti si lamentano
- d) Perché i documenti sono cambiati

*Un risultato buono con una supervisione finta è un rischio, non un successo.*

## Fonti

- Lewis et al., generazione con recupero di documenti
- NIST AI 600-1, profilo per l'AI generativa

---
---

# Unità 5 - Quando l'AI non serve, e come dirlo con credibilità

**6 minuti**

## Dove siamo nel percorso

**Tappa 4 di 7, chiusura.** Saper dire di no, con un motivo e un'alternativa, è la competenza che a colloquio pesa di più. Chiunque sa dire di sì.

## Il concetto

Ci sono cinque situazioni in cui l'AI non è la risposta, e devi saperle riconoscere.

**1. Il dato non c'è, o non è affidabile.** Se i microfermi non vengono registrati, nessun modello li può prevedere. Prima si misura, poi si modella.

**2. Una regola semplice basta.** Se la soglia è nota e scritta nel manuale, un modello aggiunge solo costo e opacità.

**3. Il problema è organizzativo, non tecnico.** Se il ritardo nasce dal fatto che due reparti non si parlano, un cruscotto non lo risolve. Lo rende solo più visibile, il che a volte è utile ma non è una soluzione.

**4. La decisione non può essere delegata.** Rilascio di un lotto, sicurezza delle persone, conformità: lì un sistema può proporre, mai decidere.

**5. Nessuno cambierà comportamento.** Se la persona che riceve l'avviso non ha né tempo né autorità per agire, il modello migliore del mondo non produce nulla.

Ora la parte difficile: **come si dice**.

Un no secco ti fa sembrare l'ostacolo. Un sì compiacente ti fa sembrare uno che non conosce il mestiere. La formula che funziona ha tre parti:

1. **Riconosci il problema vero.** "Il problema dei fermi è reale e costa 280.000 euro l'anno."
2. **Spiega perché quello strumento non lo risolve adesso.** "I microfermi non sono nei dati, quindi un modello non li vedrebbe."
3. **Proponi cosa fare invece, con tempi.** "In tre settimane sistemiamo la registrazione. Poi rivalutiamo, e a quel punto sapremo se serve un modello o se bastano i dati."

Non stai dicendo no al progetto. Stai dicendo **non adesso, e questo è il percorso**. È diverso, e nessuno può obiettare.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Prontezza dei dati | Prontezza dei dati | Quanto i dati sono davvero pronti a sostenere il caso d'uso. |
| Debito tecnico | Debito tecnico | Le scorciatoie di oggi che costeranno lavoro domani. |
| Costo opportunità | Costo opportunità | Quello che rinunci a fare scegliendo un progetto invece di un altro. |
| Adozione | Adozione | Quanto la soluzione viene davvero usata dalle persone. |
| Condizione di rientro | Condizione di rientro | Cosa deve succedere perché una proposta rifiutata torni in gioco. |

Un no professionale ha **sempre** una condizione di rientro. Senza, è solo un rifiuto.

## Esempio pratico

La direzione ha visto una demo a una fiera e chiede: *"vogliamo un assistente AI che risponda alle domande degli operatori in linea."*

**Risposta sbagliata numero uno:** "Non è possibile con i nostri sistemi." Ti fa sembrare l'ostacolo, e non è nemmeno vero.

**Risposta sbagliata numero due:** "Certo, in tre mesi lo facciamo." Fra tre mesi consegnerai qualcosa che cita procedure superate, e quel giorno il problema sarà tuo.

**Risposta corretta:**

*"L'idea ha senso, e il problema che risolve è reale: gli operatori perdono circa dodici minuti a cercare il criterio giusto, che su tre turni fa quasi due ore al giorno.*

*Ho fatto una verifica su cinquanta documenti: solo ventidue hanno l'ambito di applicazione dichiarato, e dodici sono scansioni senza testo. Se costruiamo l'assistente adesso, risponderà con sicurezza citando documenti che non valgono per quella linea. In una produzione regolamentata è un rischio che non conviene correre.*

*Propongo tre settimane per sistemare revisione e ambito sui documenti dei tre formati principali. Costa poco e serve comunque, anche senza AI. Alla fine rivalutiamo: se i documenti sono a posto, l'assistente diventa un progetto da sei settimane con un rischio molto più basso.*

*Se preferite partire subito, possiamo farlo su un solo formato con documenti già verificati, come prova limitata."*

Nota cosa hai fatto: hai riconosciuto il valore, hai portato **dati raccolti da te**, hai proposto un percorso con tempi, e hai lasciato aperta un'alternativa se hanno fretta. Non hai detto no una volta sola, eppure hai evitato il progetto sbagliato.

## Come lo dici in inglese

> "The idea makes sense, and the problem is real. People lose about twelve minutes each time."

> "But I checked fifty documents. Only twenty-two say which line they apply to. So the assistant would confidently give people the wrong procedure."

> "Give me three weeks to fix the documents. We need that anyway, with or without AI."

> "Then we look again. If the documents are clean, the assistant becomes a much smaller and safer project."

> "If you want to start now, we can try one format where the documents are already checked."

**Perché queste parole.** *Makes sense, I checked, we need that anyway, we look again, if you want to start now*. Nessuna negazione diretta, e la frase *we need that anyway* è quella che disarma l'obiezione sul tempo perso.

## Quiz

**1. Quali sono i due modi sbagliati di rispondere a una richiesta di AI mal posta?**
- a) Chiedere tempo e fare uno studio
- b) Il no secco, che ti fa sembrare l'ostacolo, e il sì compiacente, che ti farà consegnare qualcosa di sbagliato ✓
- c) Coinvolgere la direzione
- d) Proporre un fornitore esterno

*La formula corretta sta in mezzo: riconosci, spiega, proponi con tempi.*

**2. Cosa deve avere sempre un no professionale?**
- a) L'approvazione della direzione
- b) Una condizione di rientro: cosa deve succedere perché la proposta torni in gioco ✓
- c) Un'analisi dei costi
- d) Il parere del fornitore

*Senza condizione di rientro è solo un rifiuto, e verrà scavalcato.*

**3. Il problema nasce dal fatto che due reparti non si parlano. Serve un cruscotto?**
- a) Sì, renderà evidente il problema
- b) No, il problema è organizzativo: il cruscotto lo rende visibile ma non lo risolve ✓
- c) Sì, se lo chiede la direzione
- d) Dipende dal budget

*Rendere visibile a volte aiuta, ma non va spacciato per una soluzione.*

**4. Nell'esempio, quale elemento rende credibile il no?**
- a) L'esperienza personale
- b) I dati raccolti di persona: 22 documenti su 50 con l'ambito dichiarato ✓
- c) Il parere del reparto qualità
- d) Il riferimento alla normativa

*Un'obiezione con numeri raccolti da te non si può liquidare come resistenza al cambiamento.*

**5. Perché la frase "ci serve comunque, con o senza AI" è efficace?**
- a) Perché è una promessa
- b) Perché toglie l'obiezione che le tre settimane siano tempo perso ✓
- c) Perché coinvolge altri reparti
- d) Perché riduce il costo

*Il lavoro sui documenti ha valore autonomo. Questo disarma chi teme il rinvio.*

**6. In quale caso un sistema può proporre ma mai decidere?**
- a) Quando i dati sono pochi
- b) Rilascio del lotto, sicurezza delle persone, conformità ✓
- c) Quando il modello non è accurato
- d) Quando manca il budget

*È il cancello non negoziabile che attraversa tutto il corso.*

**7. Il modello è ottimo ma chi riceve l'avviso non ha tempo né autorità per agire. Cosa succede?**
- a) Il valore si realizza comunque
- b) Non produce nulla: senza cambiamento di comportamento non c'è risultato ✓
- c) Serve un modello migliore
- d) Bisogna aumentare la precisione

*È l'anello quattro della catena del Modulo 1: se non cambia il lavoro di nessuno, il valore resta teorico.*

## Fonti

- NIST AI Risk Management Framework
- Regolamento (UE) 2024/1689, supervisione umana

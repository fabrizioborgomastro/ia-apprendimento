# Modulo 1 - Capire la trasformazione digitale in fabbrica

30 minuti, 5 unità.

---
---

# Unità 1 - La mappa completa: dalla perdita al risultato

**6 minuti**

## Dove siamo nel percorso

**Questa unità è la mappa di tutte e sette le tappe.** Le altre diciannove unità approfondiscono un pezzo di questa mappa. Se ricordi solo una cosa di tutto il corso, ricorda questa.

## Il concetto

La trasformazione digitale non è "installare un software". È **cambiare in modo misurabile come si prende una decisione in fabbrica**, usando dati e tecnologia.

La differenza è tutta lì. Se dopo il progetto le persone decidono nello stesso modo di prima, hai comprato tecnologia, non hai trasformato niente.

Il processo, dall'inizio alla fine, sono sempre queste sette tappe. Valgono per un progetto da tremila euro e per uno da tre milioni.

### 1. Osservo una perdita concreta

Non parto dalla tecnologia, parto da qualcosa che si perde: tempo, prodotto, energia, qualità. Vado in reparto e guardo come si lavora davvero, non come dice la procedura. In giapponese questo si chiama *genchi genbutsu*, "vai a vedere di persona", ed è il motivo per cui i progetti nati in sala riunioni falliscono più spesso.

### 2. Misuro il punto di partenza

Metto un numero sulla perdita, prima di toccare qualsiasi cosa. Quel numero si chiama **baseline**, cioè il valore di partenza. Senza baseline non potrai mai dimostrare di aver migliorato qualcosa: potrai solo dire che ti sembra vada meglio.

La baseline deve dire: cosa misuro, in quale periodo, su quale linea, chi risponde di quel dato.

### 3. Capisco dove nascono i dati e chi decide oggi

Chi prende la decisione adesso? Con quali informazioni? Da quale sistema arrivano? Questa è la tappa in cui incontri le sigle della fabbrica: sensori, PLC, SCADA, MES, ERP. Le vediamo tutte nel Modulo 2.

Qui si scoprono anche i problemi veri, che quasi mai sono tecnologici: il dato esiste ma nessuno se ne fida, oppure due reparti lo chiamano con nomi diversi.

### 4. Scelgo lo strumento più semplice che risolve

C'è una scala: una regola fissa, un grafico, un modello statistico, il machine learning, l'AI generativa. **Si sceglie sempre il gradino più basso che risolve il problema.** Salire un gradino senza motivo aggiunge costo, fragilità e persone da formare, senza aggiungere risultato.

### 5. Provo in piccolo, senza rischi

Prendo una linea, un turno, un gruppo di persone. Faccio girare la soluzione **in parallelo** a come si lavora oggi, senza che nessuno debba fidarsi. Questo si chiama **shadow mode**, modalità ombra: il sistema propone, ma la sua proposta non viene mostrata e non cambia niente. Serve solo a confrontare, dopo, quello che avrebbe detto con quello che è successo davvero.

### 6. Metto in produzione con una rete di sicurezza

Se i numeri reggono, si passa all'uso vero. Ma con tre cose sempre presenti: una persona che decide (non il sistema), un modo di lavorare alternativo se il sistema si spegne (**fallback**), e qualcuno con nome e cognome che risponde del funzionamento.

### 7. Decido se estendere o fermarmi

Ha funzionato su una linea? Non vuol dire che funzioni su dieci. Il risultato spesso dipendeva dal contesto di quella linea. **Fermarsi è una decisione professionale, non un fallimento.** Dire "non estendiamo finché non abbiamo sistemato X" vale più di un sì entusiasta.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Digital transformation | Trasformazione digitale | Cambiare in modo misurabile come si decide e si lavora, usando dati e tecnologia. |
| Baseline | Valore di partenza | Il numero che misura la situazione prima di intervenire. |
| KPI | Indicatore di prestazione | Un numero scelto per misurare se le cose vanno meglio o peggio. |
| Shadow mode | Modalità ombra | Il sistema gira in parallelo e registra, ma non viene mostrato e non decide. |
| Fallback | Modo alternativo | Come si continua a lavorare se il sistema nuovo non è disponibile. |
| Pilota | Pilota | Prova reale ma limitata a una linea, un turno o un gruppo di persone. |

## Esempio pratico

Una linea di confezionamento si ferma spesso.

1. **Osservo**: passo due turni in linea. Vedo che gli operatori aspettano il manutentore e nel frattempo la macchina è ferma.
2. **Misuro**: 6 ore di fermo a settimana. Baseline presa su 4 settimane, sulla linea 3, firmata dal capo reparto.
3. **Capisco**: i dati dei fermi esistono già nel sistema che registra la produzione, ma nessuno li guarda. Scopro che **3 ore su 6** vengono da un solo gruppo meccanico.
4. **Scelgo**: non serve intelligenza artificiale. Serve un grafico settimanale delle prime tre cause e una persona che se ne occupi. Costo: quasi zero.
5. **Provo**: 4 settimane, solo linea 3.
6. **Metto in produzione**: il grafico arriva ogni lunedì al capo reparto, che assegna un responsabile per la causa principale.
7. **Decido**: i fermi scendono da 6 a 4,2 ore. Estendo alle linee 1 e 2, che hanno lo stesso gruppo meccanico. Non alle altre, che hanno macchine diverse.

Nota una cosa: in questo esempio **non c'è nessuna intelligenza artificiale**. È comunque trasformazione digitale, perché è cambiato chi decide, quando, e con quali dati.

## Come lo dici in inglese

> "I always start from a real loss, not from the technology. First I go and watch how people work."

> "Then I measure the starting point. If you have no number before, you cannot show any improvement after."

> "I pick the simplest tool that solves the problem. Very often it is not AI."

> "We try it on one line first, in parallel, so nobody has to trust it yet."

> "If it works, we keep a person in charge and a way to work without the system."

**Perché queste parole.** Verbi semplici: *start, watch, measure, pick, try, keep*. Niente *implement*, *leverage*, *deploy*: sono parole che ti rallentano e non aggiungono nulla.

## Quiz

**1. Qual è la definizione più corretta di trasformazione digitale?**
- a) Installare software moderno in azienda
- b) Cambiare in modo misurabile come si decide e si lavora, usando dati e tecnologia ✓
- c) Passare tutti i sistemi al cloud
- d) Introdurre l'intelligenza artificiale nei processi

*Se dopo il progetto le persone decidono come prima, hai comprato tecnologia. La trasformazione è nel cambiamento del lavoro.*

**2. Perché la baseline va misurata prima di intervenire?**
- a) Perché lo chiede la procedura aziendale
- b) Perché senza un numero di partenza non puoi dimostrare il miglioramento ✓
- c) Perché serve a scegliere il fornitore
- d) Perché riduce i costi del progetto

*Senza baseline puoi solo dire "mi sembra vada meglio". Non è un argomento difendibile davanti a chi paga.*

**3. Nell'esempio della linea di confezionamento, quale tappa ha dato l'informazione più utile?**
- a) La scelta dello strumento
- b) La messa in produzione
- c) Capire dove nascono i dati, che ha rivelato le 3 ore su 6 da un solo gruppo ✓
- d) La decisione di estendere

*Capire dove nasce il problema ha ristretto il campo da "la linea si ferma" a "un gruppo meccanico causa metà dei fermi".*

**4. Cosa significa far girare una soluzione in shadow mode?**
- a) Farla usare solo di notte
- b) Farla girare in parallelo senza mostrarla e senza che decida ✓
- c) Farla provare solo ai manutentori
- d) Tenerla in prova senza contratto

*Serve a raccogliere prove senza chiedere a nessuno di fidarsi e senza rischiare nulla.*

**5. Un progetto migliora la linea 3. Cosa fai?**
- a) Estendo subito a tutte le linee, il risultato è dimostrato
- b) Verifico quali condizioni della linea 3 hanno reso possibile il risultato, poi estendo dove ci sono ✓
- c) Aspetto un anno prima di decidere
- d) Chiudo il progetto, l'obiettivo è raggiunto

*Il risultato spesso dipende dal contesto. Estendere alla cieca è il modo più comune di bruciare un budget.*

**6. Nell'esempio, perché non è stata usata l'intelligenza artificiale?**
- a) Perché non era disponibile
- b) Perché costava troppo
- c) Perché un grafico settimanale e un responsabile risolvevano già il problema ✓
- d) Perché la direzione l'aveva vietata

*Si sceglie sempre il gradino più basso che risolve. Salire senza motivo aggiunge costo e fragilità, non risultato.*

**7. Che cos'è un fallback?**
- a) Il piano di rientro economico del progetto
- b) Il modo di continuare a lavorare se il sistema nuovo non è disponibile ✓
- c) Il backup dei dati
- d) La procedura di annullamento del contratto

*Se il processo si ferma quando si ferma il sistema, hai reso critico un componente senza che nessuno l'abbia deciso.*

## Fonti

- Toyota, *genchi genbutsu*: andare a vedere di persona
- NIST, procedura per la costruzione di indicatori di produzione

---
---

# Unità 2 - Come si misura una fabbrica

**6 minuti**

## Dove siamo nel percorso

**Tappa 2 di 7: misuro il punto di partenza.** Qui impari quali numeri usa davvero una fabbrica, così quando ti chiedono "come misuri il risultato" hai una risposta pronta.

## Il concetto

Una fabbrica si misura su tre fronti: **quanto produce**, **quanto bene lo produce**, **quanto spesso si ferma**. Produttività, qualità, manutenzione. Sono i tre domini citati anche nell'annuncio per cui ti candidi.

Il numero più usato in produzione è l'**OEE**, *Overall Equipment Effectiveness*, in italiano efficienza complessiva dell'impianto. È un numero unico da 0 a 100 percento che mette insieme tre cose moltiplicandole:

**OEE = Disponibilità × Prestazione × Qualità**

- **Disponibilità**: per quanto tempo la macchina era davvero disponibile rispetto a quando avrebbe dovuto produrre. Se doveva lavorare 8 ore e si è fermata 1 ora, la disponibilità è 7/8 = 87,5 percento.
- **Prestazione**: quanto è andata veloce rispetto alla sua velocità nominale. Se poteva fare 1000 pezzi l'ora e ne ha fatti 900, la prestazione è 90 percento.
- **Qualità**: quanti pezzi erano buoni. Se su 900 pezzi 27 sono da buttare, la qualità è 873/900 = 97 percento.

Moltiplicando: 0,875 × 0,90 × 0,97 = **76,4 percento di OEE**.

La cosa importante da capire, e che colpisce a un colloquio, è che **l'OEE è un numero riassuntivo, e i numeri riassuntivi nascondono dove sta il problema**. Un OEE del 76 percento non ti dice cosa fare. I tre fattori separati sì: qui il problema principale è la disponibilità, cioè i fermi.

Poi ci sono due numeri di manutenzione che sentirai spesso:

- **MTBF**, *Mean Time Between Failures*, tempo medio tra due guasti. Più è alto, meglio è.
- **MTTR**, *Mean Time To Repair*, tempo medio per riparare. Più è basso, meglio è.

E uno di qualità: lo **scarto**, cioè la percentuale di prodotto buttato o rilavorato.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| OEE | Efficienza complessiva dell'impianto | Numero unico da 0 a 100 che moltiplica disponibilità, prestazione e qualità. |
| Disponibilità | Disponibilità | Quanto tempo la macchina ha davvero prodotto rispetto a quando doveva. |
| Prestazione | Prestazione | Quanto è andata veloce rispetto alla velocità nominale. |
| MTBF | Tempo medio tra guasti | Quanto tempo passa in media tra un guasto e il successivo. |
| MTTR | Tempo medio di riparazione | Quanto ci vuole in media per rimettere in marcia dopo un guasto. |
| Scarto | Scarto | Percentuale di prodotto buttato o da rilavorare. |
| Fermo | Fermo macchina | Periodo in cui la macchina doveva produrre e non lo ha fatto. |

## Esempio pratico

Due linee hanno lo stesso OEE: **76 percento**. Sembrano uguali. Non lo sono.

| | Linea A | Linea B |
|---|---|---|
| Disponibilità | 87% | 98% |
| Prestazione | 90% | 82% |
| Qualità | 97% | 95% |
| **OEE** | **76%** | **76%** |

La linea A ha un problema di **fermi**: si ferma spesso. Serve manutenzione, o capire perché si blocca.

La linea B non si ferma quasi mai, ma **va piano e scarta di più**. Probabilmente è un problema di regolazione o di materiale in ingresso.

Stesso numero, due progetti completamente diversi. Ecco perché in un colloquio la frase giusta non è "porterei l'OEE dal 76 all'85 percento", ma **"guarderei quale dei tre fattori pesa di più, perché l'OEE da solo non dice dove intervenire"**.

## Come lo dici in inglese

> "OEE puts three things together: how often the machine runs, how fast it runs, and how many good parts it makes."

> "But one number hides the problem. Two lines can both be at 76 percent for very different reasons."

> "So the first thing I do is open the number and look at the three parts separately."

**Perché queste parole.** *Puts together, hides, open the number, look at*. Sono parole semplici che spiegano un concetto tecnico senza usare gergo.

## Quiz

**1. Come si calcola l'OEE?**
- a) Sommando disponibilità, prestazione e qualità
- b) Moltiplicando disponibilità, prestazione e qualità ✓
- c) Facendo la media dei tre valori
- d) Dividendo i pezzi buoni per le ore lavorate

*Sono moltiplicati, per questo l'OEE scende in fretta: tre fattori all'85 percento danno un OEE del 61.*

**2. Una macchina doveva produrre 8 ore e si è fermata 2 ore. Qual è la disponibilità?**
- a) 80%
- b) 75% ✓
- c) 25%
- d) 20%

*6 ore lavorate su 8 previste = 75 percento.*

**3. Due linee hanno entrambe OEE 76%. Cosa puoi concludere?**
- a) Hanno lo stesso problema
- b) Vanno bene allo stesso modo
- c) Niente, finché non guardi i tre fattori separatamente ✓
- d) Che una delle due misura male

*È il punto centrale dell'unità: un numero riassuntivo nasconde dove sta il problema.*

**4. Cosa indica un MTBF alto?**
- a) Che le riparazioni sono lente
- b) Che la macchina si guasta raramente ✓
- c) Che ci sono molti scarti
- d) Che la linea va veloce

*MTBF è il tempo medio tra due guasti: più è lungo, più la macchina è affidabile.*

**5. Una linea ha disponibilità 98%, prestazione 82%, qualità 95%. Dove intervieni per primo?**
- a) Sui fermi macchina
- b) Sulla velocità e sulla regolazione, perché la prestazione è il fattore più basso ✓
- c) Sulla qualità
- d) Su tutti e tre insieme

*Si parte dal fattore che pesa di più. Qui la macchina non si ferma, ma va piano.*

**6. Perché in un colloquio è meglio non promettere "porto l'OEE dal 76 all'85"?**
- a) Perché è troppo ambizioso
- b) Perché non sai ancora quale dei tre fattori si può muovere e a quale costo ✓
- c) Perché l'OEE non si può migliorare
- d) Perché è un dato riservato

*Promettere un numero riassuntivo senza aver aperto i tre fattori è il tipico errore di chi non ha lavorato in produzione.*

**7. Che differenza c'è tra MTBF e MTTR?**
- a) Nessuna, sono sinonimi
- b) MTBF misura quanto spesso si rompe, MTTR quanto ci metti a ripararla ✓
- c) MTBF riguarda la qualità, MTTR la produttività
- d) MTBF si usa solo per le linee nuove

*Puoi migliorare l'affidabilità (MTBF più alto) o la rapidità di intervento (MTTR più basso). Sono due progetti diversi.*

## Fonti

- NIST, struttura gerarchica degli indicatori di prestazione per la produzione
- ASTM E60.13, standard su prestazioni di produzione e baseline

---
---

# Unità 3 - Dal problema di business alla soluzione digitale

**6 minuti**

## Dove siamo nel percorso

**Tappa 4 di 7: scelgo lo strumento.** Ma prima di scegliere devi saper formulare il problema. Questa unità è il ponte tra "abbiamo un problema" e "ecco cosa proponiamo".

## Il concetto

Il requisito dell'annuncio dice: *translate business challenges into digital/AI solutions*. Tradurre un problema di business in una soluzione digitale. Questo è il cuore del ruolo, ed è una competenza che si può descrivere con una catena di sei anelli.

**Perdita osservata → causa plausibile → capacità digitale → cambiamento nel lavoro → risultato atteso → prova che potrebbe smentirti**

Vediamola.

1. **Perdita osservata.** Cosa si perde, misurato. "Sei ore di fermo a settimana."
2. **Causa plausibile.** Perché succede, secondo l'ipotesi attuale. "Perché il guasto si scopre solo quando la macchina si ferma."
3. **Capacità digitale.** Cosa aggiungiamo. "Un avviso quando la vibrazione supera una soglia."
4. **Cambiamento nel lavoro.** Cosa farà una persona di diverso rispetto a oggi. Questo è l'anello che quasi tutti saltano. "Il pianificatore inserisce l'intervento nella fermata programmata invece di aspettare il guasto."
5. **Risultato atteso.** Quanto ci aspettiamo di guadagnare. "Da 6 a 4 ore di fermo a settimana."
6. **Prova che potrebbe smentirti.** Cosa vedremmo se l'ipotesi fosse sbagliata. "Se i fermi non calano, o calano anche sulle linee dove non abbiamo fatto niente."

L'ultimo anello è quello che distingue un professionista da un venditore. **Se non sai dire cosa ti farebbe cambiare idea, non stai facendo un esperimento: stai facendo una promessa.**

E attenzione all'anello 4. Se non cambia il lavoro di nessuno, il valore resta teorico. Puoi avere il modello più preciso del mondo: se la persona che riceve l'avviso non fa niente di diverso, non è successo niente.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Ipotesi | Ipotesi | Un'affermazione che può essere smentita dai dati, scritta prima di raccoglierli. |
| Output | Prodotto consegnato | Ciò che il progetto consegna: un cruscotto, un avviso, un report. |
| Outcome | Cambiamento nel lavoro | Ciò che le persone fanno di diverso grazie all'output. |
| Impatto | Impatto | Il cambiamento misurato sulla perdita di partenza. |
| Assunzione | Assunzione | Qualcosa che diamo per vero senza averlo verificato. |

La distinzione tra i tre in mezzo è preziosa a colloquio:

- **Output**: abbiamo consegnato un cruscotto con i fermi.
- **Outcome**: ogni lunedì il capo reparto assegna un responsabile alla causa principale.
- **Impatto**: i fermi sono scesi da 6 a 4,2 ore a settimana.

Molti progetti si fermano all'output e lo chiamano successo.

## Esempio pratico

Ti arriva questa richiesta dalla direzione: *"Vogliamo l'intelligenza artificiale per la manutenzione predittiva."*

È una richiesta di tecnologia, non un problema. La riscrivi con la catena:

| Anello | Cosa scrivo |
|---|---|
| Perdita osservata | 6 ore di fermo a settimana sulla linea 3, misurate su 4 settimane |
| Causa plausibile | I guasti al gruppo di trascinamento si scoprono solo quando la linea si ferma |
| Capacità digitale | Un avviso al superamento di una soglia di vibrazione, dati già disponibili |
| Cambiamento nel lavoro | Il pianificatore sposta l'intervento nella fermata programmata del sabato |
| Risultato atteso | Da 6 a 4 ore di fermo, entro 8 settimane |
| Prova contraria | Se i fermi calano anche sulle linee 1 e 2, dove non abbiamo fatto nulla, il merito non è nostro |

Ora hai qualcosa che si può verificare. E hai anche scoperto una cosa: per la prima versione **non serve intelligenza artificiale**, serve una soglia su un dato che hai già. L'AI eventualmente arriva dopo, se la soglia fissa non basta.

Questa è la risposta che a un colloquio vale di più: hai preso una richiesta di tecnologia e l'hai trasformata in una decisione misurabile, senza dire di no e senza dire di sì a scatola chiusa.

## Come lo dici in inglese

> "When someone asks for AI, I first ask what we are losing today, and how much."

> "Then I write down what a person will do differently. If nobody works differently, nothing really changed."

> "I also write what would prove me wrong. If I cannot say that, it is a promise, not a test."

> "Very often the first version does not need AI at all. A simple rule on data we already have is enough."

**Perché queste parole.** *Ask, write down, work differently, prove me wrong, is enough*. Frasi corte con un verbo solo. Nessun termine da manuale.

## Quiz

**1. Qual è l'anello della catena che quasi tutti saltano?**
- a) La perdita osservata
- b) Il cambiamento nel lavoro delle persone ✓
- c) La capacità digitale
- d) Il risultato atteso

*Senza un cambiamento nel lavoro, il valore resta teorico anche con il modello migliore del mondo.*

**2. Che differenza c'è tra output e outcome?**
- a) Nessuna
- b) L'output è ciò che consegni, l'outcome è ciò che le persone fanno di diverso ✓
- c) L'output è tecnico, l'outcome è economico
- d) L'output riguarda la qualità, l'outcome la produttività

*Un cruscotto è un output. Il capo reparto che ogni lunedì assegna un responsabile è un outcome.*

**3. Perché serve scrivere cosa ti smentirebbe?**
- a) Per proteggersi legalmente
- b) Perché senza quello stai facendo una promessa, non un esperimento ✓
- c) Perché lo richiede il metodo agile
- d) Per ridurre i costi

*È la differenza tra un professionista e un venditore. Un test che non può fallire non insegna niente.*

**4. La direzione chiede "vogliamo l'AI per la manutenzione". Qual è la prima mossa?**
- a) Cercare un fornitore di AI
- b) Chiedere cosa si perde oggi e quanto, per trasformare la richiesta in un problema misurabile ✓
- c) Dire che non è possibile
- d) Fare uno studio di fattibilità di sei mesi

*Non dici né sì né no: riformuli la richiesta di tecnologia in una decisione misurabile.*

**5. Nell'esempio, perché la prima versione non usa intelligenza artificiale?**
- a) Perché l'AI è troppo costosa
- b) Perché una soglia su un dato già disponibile basta a testare l'ipotesi ✓
- c) Perché non ci sono dati
- d) Perché la direzione non l'ha approvata

*Si testa l'anello più incerto nel modo più economico. Se la soglia non basta, si sale di un gradino.*

**6. Nell'esempio, cosa significa "se i fermi calano anche sulle linee 1 e 2, il merito non è nostro"?**
- a) Che il progetto va esteso subito
- b) Che il miglioramento potrebbe avere un'altra causa, esterna al progetto ✓
- c) Che i dati sono sbagliati
- d) Che le altre linee vanno peggio

*È il controllo che distingue il tuo effetto da un cambiamento generale, ad esempio stagionale o di mix produttivo.*

**7. Cosa rende una ipotesi utile?**
- a) Che sia ambiziosa
- b) Che possa essere smentita dai dati, ed è scritta prima di raccoglierli ✓
- c) Che sia condivisa dalla direzione
- d) Che riguardi una tecnologia nuova

*Un'ipotesi senza soglia e senza data non può fallire, e quindi non insegna nulla.*

## Fonti

- OECD, definizione di trasformazione digitale
- NIST, procedura per la costruzione di indicatori di produzione

---
---

# Unità 4 - Prioritizzare un caso d'uso: valore, dati, rischio, tempo, replicabilità

**6 minuti**

## Dove siamo nel percorso

**Tappa 4 di 7: scelgo.** Hai più candidati possibili e un budget solo. Questa unità ti dà un metodo difendibile per scegliere, e soprattutto per spiegare la scelta.

## Il concetto

Quando ti chiedono "come decidi cosa automatizzare per primo", la risposta debole è "quello che porta più valore". La risposta forte ha **quattro criteri e un cancello**.

I **cinque criteri**, da pesare:

1. **Valore economico sulla perdita misurata.** Non "è importante", ma quanto vale in ore, scarti o euro all'anno. Se una linea perde 6 ore a settimana e un'ora di fermo costa 900 euro, il problema vale circa 280.000 euro l'anno. Adesso hai un numero con cui discutere.
2. **Fattibilità con i dati che ho già.** Se devo prima installare sensori per un anno, la fattibilità è bassa. La domanda giusta è: il dato che mi serve esiste già, e qualcuno se ne fida?
3. **Controllo del rischio e reversibilità.** Se sbaglia, cosa succede? Posso tornare indietro? Leggere dati è reversibile, creare in automatico un record ufficiale spesso no.
4. **Tempo al valore** (*time-to-value*). Quanto passa prima di vedere il primo risultato misurabile. Un caso che rende 100.000 euro fra due anni vale meno, per il primo progetto, di uno che ne rende 40.000 fra tre mesi: il secondo ti compra credibilità per fare il primo.
5. **Replicabilità su altri siti.** Se funziona qui, quanto è facile portarlo altrove? Un caso che dipende da una macchina presente in un solo stabilimento vale meno di uno che tocca un processo comune a tutti. Questo criterio è quello che distingue una scelta da specialista da una scelta da lead.

Poi c'è il **cancello**, in inglese *hard gate*: una condizione che, se non è soddisfatta, esclude il candidato **a prescindere dal punteggio**.

Il cancello tipico in una produzione regolamentata è questo: **nessun sistema può prendere da solo una decisione che libera un prodotto o che riguarda la sicurezza.** Può proporre, non decidere.

Ecco il punto che colpisce a un colloquio: **un cancello non si compensa con un punteggio alto**. Se un candidato prende 9 su 10 di valore ma sfonda il cancello, esce dalla classifica. Non si posiziona ultimo: proprio non partecipa.

Chi non lo capisce fa la classica proposta che il reparto qualità blocca in dieci secondi.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Criterio pesato | Criterio pesato | Un aspetto della valutazione a cui si assegna un'importanza. |
| Hard gate | Cancello non negoziabile | Condizione che, se non soddisfatta, esclude il candidato a prescindere dal punteggio. |
| Reversibilità | Reversibilità | Quanto è facile tornare indietro se la soluzione sbaglia. |
| Adozione | Adozione | Quanto una soluzione viene davvero usata dalle persone. |
| Rilascio del lotto | Rilascio del lotto | La decisione formale che un lotto di prodotto può essere venduto. |

## Esempio pratico

Quattro candidati, stessi criteri, pesi decisi **prima** di guardare i punteggi (questo è importante: se decidi i pesi dopo, stai giustificando una scelta già fatta).

Pesi: Valore 4, Fattibilità 3, Rischio 2, Tempo al valore 2, Replicabilità 2. Punteggi da 0 a 10.

| Candidato | Valore | Fattib. | Rischio | Tempo | Replic. | Totale | Cancello |
|---|---:|---:|---:|---:|---:|---:|---|
| Ridurre i microfermi sulla linea | 8 | 8 | 8 | 8 | 9 | **106** | Passa |
| Avviso di manutenzione predittiva | 9 | 7 | 8 | 6 | 7 | **99** | Passa |
| Trovare il criterio di qualità giusto | 7 | 8 | 7 | 8 | 6 | **94** | Passa |
| Rilascio automatico del lotto | 10 | 6 | 2 | 5 | 8 | **98** | **NON passa** |

Il calcolo del primo: (4×8) + (3×8) + (2×8) + (2×8) + (2×9) = 32 + 24 + 16 + 16 + 18 = **106**.

Guarda cosa è successo aggiungendo i due criteri da lead. Il secondo candidato ha il valore più alto fra gli ammissibili (9 contro 8), ma **perde** perché arriva più tardi al risultato e si replica peggio sugli altri siti. Con i soli quattro criteri di prima avrebbe vinto lui.

Il quarto candidato ha il **valore più alto in assoluto**, 10 su 10. Ed è anche quello escluso, perché deciderebbe da solo il rilascio di un lotto.

Vinci il primo. E la frase da dire a colloquio è questa: *"Il candidato con il valore più alto è quello che abbiamo escluso, perché avrebbe deciso una conformità senza approvazione umana. Un cancello non si compensa con il punteggio."*

E il quarto candidato, quello del rilascio automatico, ha ancora il valore più alto in assoluto e un punteggio che lo metterebbe secondo. Esce lo stesso, per il cancello.

Un'ultima verifica utile: sposta un peso di un punto e guarda se la classifica cambia. Se non cambia, la tua scelta non dipende da una taratura fine dei pesi, ed è più difendibile.

## Come lo dici in inglese

> "I use four things: the value, how easy it is with the data we already have, how risky it is, and whether people will actually use it."

> "Then I have one rule that cannot be broken: no system decides on its own if a batch can go out. It can suggest, a person decides."

> "The candidate with the highest value was the one we removed. A hard rule is not something you can buy with a high score."

**Perché queste parole.** *Cannot be broken, suggest, removed, buy with a score*. Immagini concrete al posto di termini come *non-negotiable constraint* o *eligibility criteria*.

## Quiz

**1. Quando vanno decisi i pesi dei criteri?**
- a) Dopo aver visto i punteggi, per tararli meglio
- b) Prima di guardare i punteggi dei candidati ✓
- c) Non serve deciderli
- d) Li decide il fornitore

*Se li decidi dopo, stai costruendo una giustificazione per una scelta già fatta, e in riunione si vede.*

**2. Un candidato ha il punteggio più alto ma sfonda un cancello. Cosa succede?**
- a) Viene scelto, il punteggio è quello che conta
- b) Viene escluso dalla classifica ✓
- c) Si posiziona ultimo
- d) Si chiede una deroga

*Un cancello non si compensa con il punteggio. Il candidato proprio non partecipa.*

**3. Qual è il cancello tipico in una produzione regolamentata?**
- a) Il budget massimo per progetto
- b) Nessun sistema decide da solo il rilascio di un prodotto o questioni di sicurezza ✓
- c) L'uso obbligatorio di fornitori certificati
- d) Il limite di tempo di sei mesi

*Il sistema può proporre. La decisione di conformità resta di una persona autorizzata.*

**4. Nell'esempio, quanto fa il punteggio del primo candidato?**
- a) 82
- b) 96
- c) 106 ✓
- d) 120

*(4×8) + (3×8) + (2×8) + (2×8) + (2×9) = 32 + 24 + 16 + 16 + 18 = 106.*

**5. Perché la replicabilità su altri siti è un criterio da lead e non da specialista?**
- a) Perché costa meno
- b) Perché una soluzione che funziona su una macchina presente in un solo stabilimento vale meno di una che tocca un processo comune ✓
- c) Perché lo richiede la governance
- d) Perché riduce i tempi di sviluppo

*Uno specialista ottimizza il caso singolo. Un lead sceglie pensando a dove sarà l'azienda fra due anni e a cosa si potrà standardizzare.*

**6. Cosa significa "tempo al valore" e perché conta nel primo progetto?**
- a) Il tempo di sviluppo del software
- b) Quanto passa prima del primo risultato misurabile: un risultato piccolo e rapido compra la credibilità per fare quello grande ✓
- c) La durata del contratto con il fornitore
- d) Il tempo di formazione degli operatori

*Un caso da 100.000 euro fra due anni vale meno, come primo progetto, di uno da 40.000 fra tre mesi.*

**7. Cosa vuol dire "reversibilità" in questo contesto?**
- a) Poter annullare il contratto
- b) Poter tornare indietro senza danni permanenti se la soluzione sbaglia ✓
- c) Poter usare la soluzione in due reparti
- d) Poter cambiare fornitore

*Leggere dati è reversibile. Creare in automatico un record ufficiale spesso non lo è.*



## Fonti

- NIST, indicatori di prestazione per la produzione
- Regolamento (UE) 2024/1689 sull'intelligenza artificiale, per il principio della supervisione umana

---
---

# Unità 5 - Governance interfunzionale: allineare le funzioni e gestire lo sponsor

**6 minuti**

## Dove siamo nel percorso

**Attraversa tutte le tappe.** Le persone non sono un ostacolo alla fine del progetto: sono la condizione perché il progetto esista. Questa unità copre il requisito *leading cross-functional initiatives* dell'annuncio.

## Il concetto

In una fabbrica ogni funzione difende qualcosa di reale. Se ti presenti con una soluzione già fatta, ognuna troverà il motivo per bloccarla, e avrà ragione. Se invece sai in anticipo cosa difende ciascuno, puoi costruire la proposta insieme a loro.

Ecco cosa difende ognuno, e la frase che ti diranno:

- **Produzione** difende la continuità della linea. Ti dirà: *"non posso fermare la linea per una prova"*.
- **Qualità** difende la conformità e la tracciabilità. Ti dirà: *"come dimostri all'ispettore che è stato fatto correttamente?"*.
- **IT** difende la sostenibilità nel tempo. Ti dirà: *"e fra due anni chi lo mantiene?"*.
- **Sicurezza informatica** difende il confine tra rete d'ufficio e rete di fabbrica. Ti dirà: *"non apriamo un collegamento verso la rete di produzione"*.
- **Finanza** difende il ritorno. Ti dirà: *"quanto costa e quando rientra?"*.
- **Manutenzione** difende la programmazione. Ti dirà: *"i miei tecnici non hanno tempo per una cosa in più"*.

La tecnica che funziona ha tre passi, sempre gli stessi:

1. **Riformula l'obiezione** senza addolcirla, così chi l'ha sollevata si riconosce.
2. **Accetta la parte vera.** Quasi tutte le obiezioni ne hanno una, e negarla ti costa credibilità.
3. **Proponi un controllo specifico**, non una rassicurazione generica.

La differenza tra una rassicurazione e un controllo è che **il controllo si può verificare**. "Sarà semplice da usare" è una rassicurazione. "In modalità ombra non aggiunge nessun passaggio, e nella fase successiva la conferma è un clic con la fonte già aperta" è un controllo.

### Lo sponsor, i conflitti e l'adozione

Tre cose che separano un ruolo di lead da un ruolo tecnico.

**Lo sponsor** è la persona con l'autorità di sbloccare risorse e di dire no alle obiezioni che non reggono. Senza sponsor un progetto interfunzionale si ferma alla prima riunione difficile. Il tuo compito è tenerlo informato con pochi numeri e chiedergli di decidere solo quando serve davvero: uno sponsor a cui porti ogni dettaglio smette di rispondere.

**I conflitti fra funzioni** non si risolvono convincendo, si risolvono rendendo esplicito il criterio di decisione. Se produzione vuole velocità e qualità vuole controlli, la domanda non è "chi ha ragione" ma "qual è il cancello non negoziabile, e chi decide dentro il resto". Una volta scritto, il conflitto smette di essere personale.

**L'adozione si misura**, non si spera. Le tre misure che funzionano: quante persone lo usano davvero sul totale di chi potrebbe, quante volte a settimana, e quante volte la proposta del sistema viene accettata. Se l'uso cala dopo tre settimane, hai un problema di fiducia o di utilità, e va affrontato con le persone, non con la formazione.

C'è poi un'ultima cosa, quella che nessuno dice ad alta voce: **la paura di essere valutati attraverso lo strumento**. Se gli operatori sospettano che i dati servano a misurare la loro velocità, useranno il sistema in modo difensivo e i dati diventeranno inutili. Va affrontato per primi, dichiarando a cosa servono i registri e a cosa non servono.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Stakeholder | Portatore di interesse | Chi subisce, decide o paga le conseguenze del progetto. |
| Cross-functional | Interfunzionale | Che coinvolge più reparti diversi con obiettivi diversi. |
| Process owner | Responsabile del processo | La persona che risponde di come funziona quel processo. |
| Controllo verificabile | Controllo verificabile | Una risposta a un'obiezione che qualcuno può misurare. |
| Deroga | Deroga | Eccezione approvata a una regola, che deve sempre avere una scadenza. |
| Sponsor | Sponsor | La persona con l'autorità di sbloccare risorse e di respingere le obiezioni che non reggono. |
| Adoption | Adozione | Quanto la soluzione viene davvero usata, misurata su utenti attivi, frequenza e proposte accettate. |
| Upskilling | Crescita delle competenze | Portare le persone al livello che serve per usare bene lo strumento nuovo. |

Una regola che vale sempre: **una deroga senza scadenza è una regola nuova introdotta di nascosto.**

## Esempio pratico

Vuoi provare un avviso di manutenzione predittiva sulla linea 3. Ecco le obiezioni reali e le risposte che funzionano.

**Sicurezza informatica**: *"Non apriamo un collegamento verso la rete di produzione."*

Riformuli: "Mi state chiedendo di non aprire un canale permanente verso la rete di fabbrica, ed è corretto." Parte vera: lo è davvero, è la porta più usata negli incidenti industriali. Controllo: "Leggiamo dal sistema che archivia i dati di processo, che sta già in una zona intermedia, in uscita e a orari concordati. Nessun collegamento in entrata, nessuna credenziale permanente."

**Produzione**: *"Non posso fermare la linea per una prova."*

Riformuli e accetti: giusto, la linea non si ferma. Controllo: "Non serve fermarla. Per sei settimane il sistema gira in ombra: registra e basta, nessuno lo vede, niente cambia in linea."

**Qualità**: *"Come dimostri all'ispettore che è stato fatto correttamente?"*

Controllo: "Ogni avviso resta registrato con data, valore misurato e chi lo ha ricevuto. L'intervento resta sul sistema di manutenzione come sempre. Non cambiamo il modo di registrare, aggiungiamo solo un avviso in anticipo."

**Manutenzione**: *"I miei tecnici non hanno tempo."*

Controllo: "Non aggiungiamo interventi. L'avviso serve a spostare un intervento che già facevi, dalla fermata di emergenza a quella programmata del sabato. A regime dovrebbe farti risparmiare uscite urgenti."

Nota il modo: nessuna promessa, ogni risposta è una cosa che si può verificare fra sei settimane.

## Come lo dici in inglese

> "Every team is protecting something real. Production protects the line, quality protects the record, IT protects what they will have to maintain."

> "So I say the objection back to them first, in their own words. Then I say which part of it is right."

> "And then I give them something they can check, not just a promise. 'It will be easy' is not an answer."

> "For six weeks the system only watches and writes. Nobody has to trust it yet."

**Perché queste parole.** *Protecting, say it back, which part is right, something they can check, only watches*. Nessun *stakeholder alignment*, nessun *change management*: parole vere di una conversazione vera.

## Quiz

**1. Qual è il primo passo quando ricevi un'obiezione?**
- a) Spiegare perché non è un problema
- b) Riformularla senza addolcirla, così chi l'ha sollevata si riconosce ✓
- c) Chiedere di parlarne dopo
- d) Portarla alla direzione

*Se la persona non si riconosce nella tua riformulazione, tutto quello che dici dopo non viene ascoltato.*

**2. Che differenza c'è tra una rassicurazione e un controllo?**
- a) Il controllo è più tecnico
- b) Il controllo si può verificare, la rassicurazione no ✓
- c) La rassicurazione va data per prima
- d) Nessuna differenza pratica

*"Sarà semplice da usare" non si può misurare. "In ombra non aggiunge passaggi" sì.*

**3. Cosa difende tipicamente il reparto qualità?**
- a) La velocità della linea
- b) La conformità e la possibilità di dimostrarla ✓
- c) Il budget del progetto
- d) La sicurezza della rete

*La domanda che ti farà è sempre una versione di "come lo dimostri a un ispettore".*

**4. La sicurezza informatica non vuole collegamenti verso la rete di produzione. Qual è la risposta migliore?**
- a) Chiedere una deroga alla direzione
- b) Leggere da un sistema in zona intermedia, in uscita, senza canali in entrata ✓
- c) Spiegare che il rischio è basso
- d) Rimandare il progetto

*Si toglie il motivo dell'obiezione invece di negarla. Quasi sempre il dato che serve è già in una zona intermedia.*

**5. Perché una deroga deve avere una scadenza?**
- a) Per motivi contabili
- b) Perché una deroga senza scadenza diventa una regola nuova introdotta di nascosto ✓
- c) Perché lo richiede la normativa
- d) Per poter cambiare fornitore

*Le eccezioni permanenti erodono le regole senza che nessuno lo abbia deciso.*

**6. Qual è l'obiezione che quasi nessuno dice ad alta voce?**
- a) Il costo del progetto
- b) La paura di essere valutati attraverso lo strumento ✓
- c) La difficoltà tecnica
- d) La mancanza di formazione

*Se gli operatori sospettano che i dati misurino la loro velocità, l'uso diventa difensivo e i dati diventano inutili.*

**7. A cosa serve uno sponsor e come lo si gestisce male?**
- a) Serve ad approvare il budget, e va coinvolto solo alla fine
- b) Serve a sbloccare risorse e respingere obiezioni deboli, e lo si gestisce male portandogli ogni dettaglio finché smette di rispondere ✓
- c) Serve a rappresentare il progetto in azienda
- d) Serve a firmare i documenti

*Uno sponsor si usa con parsimonia: pochi numeri, e una richiesta di decisione solo quando serve davvero.*

**8. Come si misura l'adozione di una soluzione?**
- a) Chiedendo agli operatori se sono soddisfatti
- b) Con utenti attivi sul totale, frequenza d'uso e proposte accettate ✓
- c) Contando le licenze acquistate
- d) Con le ore di formazione erogate

*L'adozione si misura. Se cala dopo tre settimane hai un problema di fiducia o di utilità, e la formazione non lo risolve.*

**9. Un operatore esperto rifiuta la soluzione con argomenti precisi. Come lo interpreti?**
- a) Come resistenza al cambiamento da gestire
- b) Come un segnale tecnico: probabilmente ha visto un problema vero ✓
- c) Come un problema di comunicazione
- d) Come un caso da portare al suo responsabile

*Il rifiuto motivato di chi conosce il processo è la fonte di miglioramento più preziosa che hai.*

## Fonti

- UK Government Analysis Function, metodo di mappatura degli stakeholder
- AHRQ, matrice delle responsabilità RACI

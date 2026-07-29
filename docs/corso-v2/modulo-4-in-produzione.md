# Modulo 4 - Portare un'idea in produzione

30 minuti, 5 unità. Copre i requisiti *agile delivery, MVP development, experimentation approaches* e *lead change and drive innovation*.

Qui c'è la terza storia completa e, in chiusura, il racconto di due minuti da imparare.

---
---

# Unità 1 - MVP, prototipo, pilota: tre cose diverse

**6 minuti**

## Dove siamo nel percorso

**Tappa 5 di 7: provo in piccolo, senza rischio.** Le tre parole di questa unità vengono usate come sinonimi da quasi tutti. Non lo sono, e saperle distinguere è un segnale immediato di esperienza.

## Il concetto

**Prototipo.** Serve a rispondere a una domanda tecnica: *si può fare?* Non va in mano a nessun utente reale, non deve essere affidabile, si butta. Dura giorni.

**MVP**, *Minimum Viable Product*, in italiano prodotto minimo utilizzabile. Serve a rispondere a una domanda di valore: *se lo do a qualcuno, cambia qualcosa?* È la versione più piccola che una persona vera può usare per fare davvero il suo lavoro. Dura settimane.

Attenzione alla parola *minimum*: non significa fatto male. Significa **poche funzioni, ma vere**. Un MVP che non si può usare in produzione non è un MVP, è un prototipo con un nome più ambizioso.

**Pilota.** Serve a rispondere a una domanda di scala: *funziona in condizioni reali, per un tempo lungo, con persone che non sono nel progetto?* Un pilota gira su una linea o un reparto, con turni veri, con i guasti veri, e viene misurato. Dura mesi.

La sequenza logica è: prototipo se il dubbio è tecnico, MVP se il dubbio è sul valore, pilota se il dubbio è sulla tenuta.

E qui la regola che vale più di tutte: **parti dall'ipotesi più rischiosa**. L'ipotesi più rischiosa è quella che, se falsa, fa crollare tutto il resto. Nella manutenzione predittiva non è "il modello sarà accurato": è "i dati di vibrazione degli ultimi tre anni sono utilizzabili". Se quella è falsa, l'accuratezza non si misura nemmeno.

Molti progetti falliscono perché costruiscono per otto settimane e solo alla nona scoprono che l'ipotesi rischiosa era falsa. **La prima cosa da fare è quella che può uccidere il progetto prima possibile**, quando costa poco.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Prototipo | Prototipo | Prova tecnica usa e getta: risponde a "si può fare". |
| MVP | Prodotto minimo utilizzabile | La versione più piccola che una persona vera può usare per lavorare. |
| Pilota | Pilota | Prova in condizioni reali, su una linea o un reparto, per mesi. |
| Ipotesi più rischiosa | Ipotesi più rischiosa | La cosa che, se falsa, fa crollare tutto il progetto. |
| Time-boxing | Tempo prefissato | Fissare in anticipo quanto tempo si dedica prima di decidere. |
| Iterazione | Iterazione | Un ciclo breve: costruisci un pezzo, lo provi, impari, correggi. |
| Agile | Agile | Modo di lavorare a cicli brevi con verifica frequente, invece che con un piano unico lungo. |

## Esempio pratico

Il caso della manutenzione predittiva, ordinato per rischio.

| Ipotesi | Se è falsa | Costo per verificarla | Ordine |
|---|---|---|---|
| I dati storici di vibrazione sono utilizzabili | Il progetto non esiste | 3 giorni | **1** |
| I guasti passati sono registrati con data e ora corrette | Non si può addestrare né valutare | 2 giorni | **2** |
| Esiste abbastanza anticipo per intervenire | L'avviso è inutile anche se corretto | 1 giorno, guardando i tempi di approvvigionamento | **3** |
| Il modello raggiunge un'accuratezza utile | Si riprova o si cambia approccio | 4 settimane | 4 |
| Il pianificatore userà l'avviso | Nessun valore realizzato | 1 giorno di intervista | **3 bis** |

Nota due cose. La prima: le quattro verifiche più importanti costano **sei giorni in tutto**, contro le quattro settimane della costruzione del modello. La seconda: l'ipotesi "il pianificatore userà l'avviso" costa un giorno e viene quasi sempre dimenticata, eppure è quella che ha fatto morire più progetti di qualunque problema tecnico.

Una versione concreta dell'MVP: **un foglio con la lista dei dieci cuscinetti più a rischio, mandato ogni lunedì al pianificatore**. Nessuna applicazione, nessuna interfaccia. Se il pianificatore lo usa e cambia la sua settimana, l'ipotesi di valore è verificata e allora vale la pena costruire. Se non lo apre, hai risparmiato sei mesi.

## Come lo dici in inglese

> "A prototype answers 'can we do it'. An MVP answers 'does it change anything for someone'. A pilot answers 'does it hold up in the real world'."

> "Minimum does not mean bad. It means few things, but real ones."

> "I always start with the assumption that would kill the project. Here it was not the model. It was whether the old vibration data was usable at all."

> "Our first version was a list of ten bearings, sent by email every Monday. No app. If the planner does not use a list, he will not use an app either."

**Perché queste parole.** *Can we do it, does it change anything, does it hold up, would kill the project, no app*. L'ultima frase è la più efficace di tutto il modulo: è concreta, un po' autoironica, e dimostra che sai risparmiare soldi.

## Quiz

**1. Che domanda risponde un MVP?**
- a) Si può fare tecnicamente?
- b) Se lo do a qualcuno, cambia qualcosa nel suo lavoro? ✓
- c) Regge per mesi in condizioni reali?
- d) Quanto costa?

*Il prototipo risponde alla prima, il pilota alla terza.*

**2. Cosa significa "minimum" in MVP?**
- a) Fatto in fretta e male
- b) Poche funzioni, ma vere e usabili davvero ✓
- c) Con il budget più basso possibile
- d) Con meno persone possibile

*Un MVP non usabile in produzione non è un MVP, è un prototipo.*

**3. Cos'è l'ipotesi più rischiosa?**
- a) Quella più difficile da realizzare
- b) Quella che, se falsa, fa crollare tutto il resto ✓
- c) Quella con il costo più alto
- d) Quella che la direzione teme di più

*Va verificata per prima, quando costa poco.*

**4. Nell'esempio, qual era l'ipotesi più rischiosa?**
- a) Che il modello fosse accurato
- b) Che i dati storici di vibrazione fossero utilizzabili ✓
- c) Che il budget fosse sufficiente
- d) Che i sensori funzionassero

*Se i dati non servono, l'accuratezza non si misura nemmeno. Tre giorni per saperlo.*

**5. Qual è l'ipotesi che viene quasi sempre dimenticata?**
- a) La qualità dei dati
- b) Che la persona che riceve il risultato lo userà davvero ✓
- c) La disponibilità dei sensori
- d) La compatibilità dei sistemi

*Costa un giorno di intervista e ha fatto morire più progetti di qualunque problema tecnico.*

**6. Perché mandare un foglio via email è un MVP valido?**
- a) Perché costa poco
- b) Perché verifica l'ipotesi di valore prima di costruire: se non usano la lista, non useranno l'applicazione ✓
- c) Perché è veloce da fare
- d) Non lo è, serve un'applicazione

*Verifica la cosa giusta con il mezzo più economico.*

**7. Quando serve un pilota invece di un MVP?**
- a) Quando serve più budget
- b) Quando il dubbio è sulla tenuta in condizioni reali, per un tempo lungo e con persone esterne al progetto ✓
- c) Quando l'MVP è fallito
- d) Quando la direzione lo chiede

*Turni veri, guasti veri, mesi. È un'altra domanda.*

## Fonti

- Ries, il metodo della startup snella
- Manifesto Agile

---
---

# Unità 2 - Come si prova qualcosa in modo credibile

**6 minuti**

## Dove siamo nel percorso

**Tappa 5 di 7, seconda parte.** Un esperimento senza confronto non dimostra niente. Qui impari a costruirne uno che regge alle domande.

## Il concetto

Il problema di ogni prova aziendale è questo: **il mondo cambia mentre tu provi.** Se dopo il tuo progetto i fermi calano, come fai a sapere che è merito tuo e non del nuovo capo turno, della manutenzione straordinaria di marzo o del fatto che a luglio si produce meno?

Servono quattro cose.

**1. Una baseline, cioè il punto di partenza misurato prima.** Va presa su un periodo abbastanza lungo da contenere la variabilità normale: almeno quattro settimane. E va firmata da chi possiede il processo, prima di iniziare. Una baseline decisa dopo è una baseline scelta.

**2. Un confronto.** Non basta guardare il prima e il dopo. Servono due gruppi:
- **Gruppo di controllo**: una linea simile dove non fai nulla.
- **Gruppo di trattamento**: la linea dove intervieni.

Se i fermi calano su entrambe, il merito non è tuo. Se calano solo dove sei intervenuto, hai un argomento.

**3. Un criterio di successo scritto prima.** Non "vediamo come va", ma: *"consideriamo l'esperimento riuscito se i fermi non pianificati scendono di almeno il 20 percento rispetto alla baseline, mantenendo lo scarto invariato."* Scritto prima, altrimenti a fine progetto ognuno trova nei dati la conferma di quello che sperava.

**4. Una durata prefissata.** Otto settimane, poi si decide. Senza una data, i progetti che non funzionano non muoiono mai: vengono prorogati.

E poi il concetto che vale da solo l'intera unità: la **modalità ombra** (*shadow mode*). Il sistema gira su dati veri, fa la sua previsione, la registra, ma **nessuno la vede e niente cambia**. Alla fine confronti le previsioni con quello che è successo davvero.

La modalità ombra è la cosa più intelligente che puoi proporre a un colloquio, perché ha rischio zero: se il modello sbaglia, non è successo niente a nessuno. Ed è l'unica prova che convince un capo reparto che non si fida.

**Un avvertimento onesto:** una linea di controllo non è mai identica. Prodotti diversi, operatori diversi, macchine di età diversa. Il confronto riduce il dubbio, non lo elimina. Dirlo apertamente ti rende più credibile, non meno.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Baseline | Punto di partenza | Il livello misurato prima di intervenire, su un periodo lungo. |
| Gruppo di controllo | Gruppo di controllo | Una linea simile dove non si interviene, per confronto. |
| Modalità ombra | Modalità ombra | Il sistema gira e registra ma nessuno vede e niente cambia. |
| Criterio di successo | Criterio di successo | La soglia scritta prima che definisce se l'esperimento è riuscito. |
| Effetto novità | Effetto novità | Il miglioramento temporaneo dovuto al fatto che le persone sono osservate. |
| Stagionalità | Stagionalità | Variazioni regolari legate al periodo dell'anno. |
| A/B test | Test A/B | Confronto fra due varianti applicate a gruppi simili nello stesso periodo. |

## Esempio pratico

Ecco la scheda di esperimento che ti conviene saper descrivere a voce. È un formato, e presentarlo così fa una grande impressione.

| Voce | Contenuto |
|---|---|
| **Ipotesi** | Un avviso predittivo al pianificatore riduce i fermi non pianificati sulla linea 3 |
| **Ipotesi più rischiosa** | I dati storici di vibrazione sono utilizzabili |
| **Baseline** | 6,0 ore/settimana, misurate su 4 settimane, firmate dal capo reparto |
| **Trattamento** | Linea 3 |
| **Controllo** | Linea 1, stesso prodotto, stessa età macchine |
| **Durata** | 8 settimane |
| **Criterio di successo** | Fermi in calo di almeno il 20 percento sulla linea 3, con differenza di almeno 10 punti rispetto alla linea 1, scarto invariato |
| **Criterio di stop** | Un solo evento di sicurezza, o scarto in aumento di oltre 0,3 punti |
| **Chi decide** | Il capo reparto, il 15 del mese, con i dati sul tavolo |

Ora il risultato reale e la lettura onesta:

- Linea 3: da 6,0 a **4,4** ore. Meno 27 percento.
- Linea 1, dove non si è fatto nulla: da 5,8 a **5,4** ore. Meno 7 percento.

La differenza netta è **20 punti**, quindi il criterio è soddisfatto. Ma nota il 7 percento di miglioramento sulla linea di controllo: qualcosa è migliorato anche lì, probabilmente perché l'attenzione al tema è cresciuta in tutto il reparto. Se avessi guardato solo la linea 3, avresti attribuito al tuo progetto **27 punti invece di 20**. Un terzo del risultato non era tuo.

Dire questo a un colloquio è forse la cosa più forte che puoi fare: dimostra che sai leggere un dato senza gonfiarlo.

## Come lo dici in inglese

> "We measured four weeks before starting, and the plant manager signed the number. Otherwise, at the end, everyone remembers a different starting point."

> "We wrote down what success would look like before we started."

> "We ran it in the shadow first. The system made its call, we wrote it down, but nobody saw it and nothing changed on the line."

> "Line 3 went down twenty-seven percent. But line 1, where we did nothing, went down seven. So the real effect is twenty, not twenty-seven."

> "The two lines are never exactly the same, so this reduces the doubt, it does not remove it."

**Perché queste parole.** *Signed the number, wrote down, made its call, nobody saw it, the real effect is twenty, not twenty-seven*. Quest'ultima frase, detta spontaneamente, vale più di dieci minuti di teoria.

## Quiz

**1. Perché serve un gruppo di controllo?**
- a) Per avere più dati
- b) Per distinguere il tuo effetto da quello che sarebbe successo comunque ✓
- c) Per convincere la direzione
- d) Per rispettare la normativa

*Se i fermi calano anche dove non hai fatto nulla, il merito non è tuo.*

**2. Quando va scritto il criterio di successo?**
- a) Alla fine, quando si vedono i dati
- b) Prima di iniziare ✓
- c) A metà esperimento
- d) Quando lo chiede lo sponsor

*Scritto dopo, ognuno trova nei dati la conferma di quello che sperava.*

**3. Cos'è la modalità ombra?**
- a) Un test fatto di notte
- b) Il sistema gira e registra le sue previsioni, ma nessuno le vede e niente cambia ✓
- c) Un modello di riserva
- d) Un test su dati finti

*Rischio zero. È la proposta più intelligente che puoi fare a chi non si fida.*

**4. Linea 3 meno 27 percento, linea di controllo meno 7. Qual è l'effetto reale?**
- a) 27 punti
- b) 20 punti ✓
- c) 34 punti
- d) 7 punti

*La differenza netta. Senza controllo avresti attribuito al progetto un terzo di risultato non tuo.*

**5. Perché la baseline va firmata da chi possiede il processo?**
- a) Per motivi contrattuali
- b) Perché altrimenti a fine progetto ognuno ricorda un punto di partenza diverso ✓
- c) Per la conformità
- d) Per assegnare le responsabilità

*Una baseline decisa dopo è una baseline scelta.*

**6. Perché serve una durata prefissata?**
- a) Per contenere i costi
- b) Perché senza una data i progetti che non funzionano non muoiono, vengono prorogati ✓
- c) Per rispettare il piano
- d) Per liberare le risorse

*La data di decisione è ciò che rende l'esperimento un esperimento.*

**7. Il gruppo di controllo non è mai identico. Come si gestisce?**
- a) Si ignora il problema
- b) Si dichiara apertamente: il confronto riduce il dubbio, non lo elimina ✓
- c) Si sceglie una linea più simile
- d) Si rinuncia al confronto

*Dichiarare il limite ti rende più credibile, non meno.*

## Fonti

- NIST, progettazione degli esperimenti
- Ries, il metodo della startup snella

---
---

# Unità 3 - Sicurezza, controllo umano e regole

**6 minuti**

## Dove siamo nel percorso

**Tappa 6 di 7: metto in produzione con le reti di sicurezza.** Il momento in cui un progetto smette di essere una prova. È qui che si sbaglia più spesso.

## Il concetto

Passare dalla prova alla produzione significa che **qualcuno prenderà decisioni vere** sulla base di quel sistema. Servono quattro reti di sicurezza, sempre le stesse.

**1. Supervisione umana reale.** Non basta scrivere "l'operatore conferma". Serve che l'operatore abbia il **tempo**, l'**informazione** e l'**autorità** per dissentire.

Una domanda che dovresti farti sempre: *quante volte, nell'ultimo mese, qualcuno ha detto no al sistema?* Se la risposta è mai, la supervisione non esiste, esiste solo un bottone. È esattamente quello che è successo nella storia dell'assistente documentale: solo il 20 percento apriva la citazione.

**2. Ripiego, o *fallback*.** Cosa succede se il sistema non risponde? Deve esistere la modalità di prima, ancora funzionante e ancora conosciuta. Se dopo sei mesi nessuno sa più lavorare senza il sistema, hai creato una dipendenza, non un miglioramento.

**3. Procedura scritta.** In inglese **SOP**, *Standard Operating Procedure*, in italiano procedura operativa standard. Il documento che dice cosa fa l'operatore quando arriva l'avviso: chi chiama, entro quanto, cosa registra. Senza, ognuno fa a modo suo e il risultato non è ripetibile.

**4. Formazione e registrazione.** Chi è stato formato, quando, su cosa. In una produzione regolamentata questo non è burocrazia: è ciò che ti permette di dimostrare che il processo era sotto controllo.

E poi il **cancello non negoziabile**, quello che attraversa tutto il corso: un sistema probabilistico **non decide da solo** su rilascio del prodotto, sicurezza delle persone e conformità. Propone. La decisione resta a una persona identificabile.

Sul quadro normativo ti bastano tre fatti, non di più:
- Il **Regolamento (UE) 2024/1689** sull'AI classifica i sistemi per rischio e chiede supervisione umana per quelli ad alto rischio.
- Nel settore alimentare e farmaceutico i sistemi che incidono sulla qualità del prodotto vanno **convalidati**: si dimostra per iscritto che fanno quello che devono fare, e si conserva la prova.
- Nel campo **OT** la norma di riferimento è la serie **IEC 62443**, quella delle zone e dei condotti che hai visto nel Modulo 2.

Non serve saperne di più. Serve dire la frase giusta: *"un sistema che incide sul rilascio del prodotto va convalidato, e la decisione resta di una persona."*

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Supervisione umana | Supervisione umana | Una persona può capire, contestare e ribaltare la decisione del sistema. |
| Fallback | Ripiego | La modalità di lavoro alternativa quando il sistema non è disponibile. |
| SOP | Procedura operativa standard | Il documento che descrive cosa fare, passo per passo. |
| Convalida | Convalida | Dimostrare per iscritto che il sistema fa ciò che deve, e conservarne la prova. |
| Tracciabilità | Tracciabilità | Poter ricostruire chi ha deciso cosa, quando e su quale base. |
| Alto rischio | Alto rischio | Categoria del Regolamento UE che impone obblighi rafforzati. |
| Automazione compiacente | Automazione compiacente | Quando le persone smettono di controllare perché si fidano troppo. |

## Esempio pratico

Il passaggio in produzione della manutenzione predittiva, scritto come lo consegneresti davvero.

| Rete di sicurezza | Come è stata realizzata |
|---|---|
| Supervisione umana | L'avviso va al pianificatore, che vede i tre valori che lo hanno generato e può archiviarlo con un motivo |
| Ripiego | La ronda programmata resta attiva. Se il sistema tace per 24 ore, si torna al calendario precedente |
| Procedura | Una pagina: chi riceve, entro quando decide, cosa registra, chi si escala se non decide |
| Formazione | 4 pianificatori e 2 responsabili, mezza giornata, firma di partecipazione |
| Cancello | Il sistema non ferma nessuna macchina, in nessun caso |

Ora il controllo che quasi nessuno fa, dopo tre mesi:

Su **34 avvisi**, il pianificatore ne ha archiviati **6 con un motivo scritto**. Il 18 percento.

Perché è un buon segno? Perché dimostra che le persone **guardano davvero** e a volte dissentono. Se fossero stati zero, il sospetto sarebbe automazione compiacente: confermano tutto senza pensarci. Se fossero stati trenta su trentaquattro, il sistema non servirebbe a niente.

**La frase da colloquio:** *"misuro quante volte le persone hanno detto no al sistema. Se non dicono mai no, la supervisione è finta."* Poche persone la dicono, e chi ti ascolta se ne accorge.

## Come lo dici in inglese

> "Human oversight only means something if the person has the time, the information and the permission to say no."

> "So we look at how often people actually said no. In three months, six alerts out of thirty-four were closed with a reason. That tells me they are really looking."

> "There is always a fallback. If the system is quiet for a day, we go back to the old schedule. People still know how to do that."

> "The system never stops a machine. If it affects product release, a person decides and we keep the record."

**Perché queste parole.** *Time, information and permission to say no*, e *That tells me they are really looking*. Frasi corte, nessun termine normativo.

## Quiz

**1. Cosa serve perché la supervisione umana sia reale?**
- a) Un bottone di conferma
- b) Tempo, informazione e autorità per dissentire ✓
- c) Una firma sul documento
- d) Un corso di formazione

*Senza queste tre cose c'è solo un bottone, non una supervisione.*

**2. Su 34 avvisi, 6 archiviati con motivo. Come si legge?**
- a) Male, il sistema sbaglia troppo
- b) Bene: dimostra che le persone guardano davvero e a volte dissentono ✓
- c) Male, le persone non si fidano
- d) Non dice nulla

*Zero rifiuti sarebbe il segnale peggiore: significherebbe conferme automatiche.*

**3. Che cos'è il ripiego e perché conta?**
- a) Un secondo modello di riserva
- b) La modalità di lavoro precedente, ancora funzionante e conosciuta ✓
- c) Il piano di emergenza informatico
- d) Un fornitore alternativo

*Se dopo sei mesi nessuno sa più lavorare senza il sistema, hai creato una dipendenza.*

**4. Cos'è una SOP?**
- a) Un indicatore di produzione
- b) La procedura scritta che dice cosa fa l'operatore, passo per passo ✓
- c) Un sistema di sicurezza
- d) Un tipo di sensore

*Senza, ognuno fa a modo suo e il risultato non è ripetibile.*

**5. Cos'è l'automazione compiacente?**
- a) Un sistema troppo permissivo
- b) Quando le persone smettono di controllare perché si fidano troppo ✓
- c) Un'automazione facile da usare
- d) Un modello poco accurato

*È il rischio principale della supervisione umana formale.*

**6. Cosa significa convalidare un sistema?**
- a) Testarlo prima del rilascio
- b) Dimostrare per iscritto che fa ciò che deve fare, e conservarne la prova ✓
- c) Ottenere l'approvazione della direzione
- d) Certificarlo con un ente esterno

*Nel farmaceutico e nell'alimentare vale per i sistemi che incidono sulla qualità del prodotto.*

**7. Su quali decisioni un sistema probabilistico non decide mai da solo?**
- a) Su nessuna, decide sempre una persona
- b) Rilascio del prodotto, sicurezza delle persone, conformità ✓
- c) Solo sulla sicurezza
- d) Dipende dall'accuratezza raggiunta

*È il cancello non negoziabile: propone sempre, decide mai.*

## Fonti

- Regolamento (UE) 2024/1689
- NIST AI Risk Management Framework
- IEC 62443

---
---

# Unità 4 - Industrializzare: monitoraggio, deriva, proprietà

**6 minuti**

## Dove siamo nel percorso

**Tappa 6 di 7, seconda parte.** Un modello messo in produzione e mai più guardato peggiora da solo, in silenzio. Questa unità spiega perché e cosa fare.

## Il concetto

**Un modello non è un impianto: non si installa e basta. Si mantiene.**

Il motivo si chiama **deriva** (*drift*): il mondo cambia e il modello resta fermo a com'era il mondo quando ha imparato. Ci sono due tipi, e distinguerli fa una gran figura.

**Deriva dei dati.** Cambiano gli ingressi. Un sensore viene sostituito con un modello diverso, si introduce una nuova materia prima, cambia la velocità di linea. I numeri che il modello riceve non assomigliano più a quelli su cui ha imparato.

**Deriva del concetto.** Cambia la relazione. Dopo una revisione della macchina, la vibrazione a 5 mm/s non significa più quello che significava prima. Gli ingressi sembrano gli stessi, ma la regola sottostante è cambiata. È la più insidiosa, perché non si vede guardando i dati in entrata.

Quindi servono tre cose che si misurano ogni settimana:

**1. Salute tecnica.** Il sistema gira? Quanti errori? Quante volte non ha risposto? Da quanto tempo è ferma l'ultima elaborazione?

**2. Qualità delle previsioni.** Confrontate con quello che è successo davvero. Nella manutenzione predittiva la verità arriva con settimane di ritardo, e va tenuto conto: si misura sempre su una finestra scorrevole.

**3. Adozione e valore.** Quante persone lo usano? Quante volte l'avviso ha prodotto un'azione? E soprattutto: **l'indicatore di business è ancora migliore della baseline?**

Il terzo è quello che conta di più e quello che nessuno guarda. Un modello può essere tecnicamente perfetto mentre il valore è svanito, perché le persone hanno smesso di usarlo.

E poi la cosa più importante di tutta l'unità: **la proprietà**.

Un sistema in produzione ha bisogno di un nome e cognome che risponde di: funziona, è ancora accurato, produce ancora valore. Non un team, non una funzione: **una persona**. Con un budget di manutenzione dichiarato, tipicamente il **15-20 percento** del costo iniziale ogni anno.

Un progetto consegnato senza owner e senza budget di mantenimento **è un progetto che morirà**, e sarà colpa di nessuno. È la ragione numero uno per cui i progetti pilota di successo non lasciano traccia dopo un anno.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Deriva dei dati | Deriva dei dati | Gli ingressi cambiano rispetto a quelli su cui il modello ha imparato. |
| Deriva del concetto | Deriva del concetto | Cambia la relazione fra ingressi e risultato, anche a ingressi uguali. |
| Riaddestramento | Riaddestramento | Rifare l'apprendimento del modello con dati aggiornati. |
| Owner | Responsabile | La persona che risponde del sistema in produzione. |
| Runbook | Manuale operativo | Il documento che dice cosa fare quando il sistema si comporta male. |
| Debito di modello | Debito di modello | Il costo di manutenzione che si accumula se non si interviene. |
| Adozione | Adozione | Quanto il sistema viene davvero usato da chi dovrebbe usarlo. |

## Esempio pratico

Il cruscotto di manutenzione della linea 3, sei mesi dopo la messa in produzione.

| Indicatore | Alla partenza | A 6 mesi | Lettura |
|---|---:|---:|---|
| Disponibilità del sistema | 99,4% | 99,1% | Tecnicamente sano |
| Difetti anticipati | 73% | 61% | **In calo** |
| Falsi allarmi/settimana | 0,8 | 1,9 | **In peggioramento** |
| Avvisi che hanno prodotto un'azione | 82% | 44% | **In crollo** |
| Fermi non pianificati | 3,9 h | 4,6 h | **Il valore sta svanendo** |

Cosa è successo? Indagando: a marzo è stata sostituita la centralina di acquisizione su due dei tre motori, con un sensore di marca diversa. **Deriva dei dati.** Il modello riceve valori con una scala leggermente diversa e sbaglia di più. I falsi allarmi aumentano, il pianificatore si fida meno, e in tre mesi le azioni crollano dall'82 al 44 percento.

Nota la catena: **problema tecnico → più falsi allarmi → perdita di fiducia → calo di adozione → il valore svanisce**. Il crollo del valore è arrivato tre mesi dopo la causa tecnica. Se avessi guardato solo la disponibilità del sistema, che è rimasta al 99 percento, non avresti visto nulla.

L'azione: riaddestrare con i dati dei nuovi sensori, e aggiungere una regola al processo di gestione dei cambiamenti. **Ogni sostituzione di sensore sulle linee dove gira un modello deve generare una notifica al responsabile del modello.** Questa è la vera lezione: il problema non è tecnico, è di processo.

**La frase da colloquio:** *"il modello non si era rotto. Era cambiato un sensore, e nessuno lo aveva detto a chi teneva il modello."*

## Come lo dici in inglese

> "A model is not a machine you install and forget. The world moves and the model stays where it was."

> "We watch three things every week: is it running, is it still right, and are people still using it."

> "The third one is the one everybody forgets. The system was fine, but only forty-four percent of the alerts led to an action. The value was going away."

> "What happened was simple. Someone changed a sensor in March and nobody told the person who owns the model."

> "So now, if you change a sensor on a line with a model on it, the owner gets a message. That is the real fix."

**Perché queste parole.** *Install and forget, the world moves, everybody forgets, nobody told the person who owns the model, that is the real fix*. Racconta un problema tecnico con parole di tutti i giorni e chiude con una soluzione organizzativa.

## Quiz

**1. Che differenza c'è fra deriva dei dati e deriva del concetto?**
- a) Nessuna
- b) La prima cambia gli ingressi, la seconda cambia la relazione fra ingressi e risultato ✓
- c) La prima è tecnica, la seconda è organizzativa
- d) La prima è lenta, la seconda è veloce

*La deriva del concetto è più insidiosa: non si vede guardando i dati in entrata.*

**2. Quali tre cose si monitorano ogni settimana?**
- a) Costo, tempo, qualità
- b) Salute tecnica, qualità delle previsioni, adozione e valore ✓
- c) Accuratezza, velocità, disponibilità
- d) Utenti, errori, richieste

*La terza è quella che nessuno guarda ed è quella che conta di più.*

**3. Nell'esempio, la disponibilità è al 99,1 percento ma il valore svanisce. Perché?**
- a) Il sistema è rotto
- b) Un sensore sostituito ha aumentato i falsi allarmi, il pianificatore si fida meno e le azioni sono crollate ✓
- c) I fermi sono aumentati per altre cause
- d) Il modello non è mai stato accurato

*Catena: problema tecnico, più falsi allarmi, perdita di fiducia, calo di adozione, valore perso.*

**4. Qual è la vera correzione nell'esempio?**
- a) Riaddestrare il modello
- b) Riaddestrare e legare la sostituzione dei sensori a una notifica al responsabile del modello ✓
- c) Sostituire i sensori originali
- d) Aumentare la soglia di allarme

*Il riaddestramento cura il sintomo. La regola di processo cura la causa.*

**5. Chi deve rispondere di un sistema in produzione?**
- a) Il team di progetto
- b) Una persona con nome e cognome, con budget di manutenzione ✓
- c) Il fornitore
- d) La funzione IT

*Un progetto senza owner e senza budget morirà, e sarà colpa di nessuno.*

**6. Quanto costa tipicamente mantenere un sistema all'anno?**
- a) Nulla, una volta consegnato
- b) Circa il 15-20 percento del costo iniziale ✓
- c) Il doppio del costo iniziale
- d) Solo il costo delle licenze

*Va dichiarato prima dell'approvazione, altrimenti sparisce dal budget.*

**7. Perché nella manutenzione predittiva la qualità si misura su una finestra scorrevole?**
- a) Per ridurre il rumore
- b) Perché la verità arriva con settimane di ritardo: si sa se aveva ragione solo dopo ✓
- c) Per confrontare i turni
- d) Per rispettare la normativa

*Non puoi valutare oggi una previsione che riguarda i prossimi tre giorni.*

## Fonti

- NIST AI Risk Management Framework
- Sculley et al., il debito tecnico nascosto dei sistemi di apprendimento automatico

---
---

# Unità 5 - Estendere o fermarsi, e il racconto di due minuti

**6 minuti**

## Dove siamo nel percorso

**Tappa 7 di 7: decido con onestà.** Ultima unità del corso. Nella prima metà chiudi il cerchio, nella seconda impari a raccontarlo tutto in due minuti.

## Il concetto

Alla fine di un pilota ci sono **tre** risposte possibili, non due.

**Estendo.** I numeri reggono, l'adozione è reale, il contesto delle altre linee è abbastanza simile. Estendere significa rifare le tappe 2 e 3 su ogni nuovo sito, in versione ridotta: baseline nuova e verifica dei dati nuova. Copiare un modello su un contesto diverso senza rimisurare è l'errore che brucia la credibilità di un intero programma.

**Mi fermo.** I numeri non reggono, oppure reggono ma le condizioni per usarli non esistono, come nella storia della qualità. Fermarsi è una decisione professionale se ha tre elementi: **cosa hai imparato, quanto è costato, cosa deve cambiare perché si riprenda.**

**Continuo qui, ma non estendo.** La risposta più frequente nella realtà e la meno raccontata. Il caso funziona su una linea e crea valore lì, ma la condizione che lo rende possibile non esiste altrove.

Poi c'è il **caso economico** per estendere. Tre numeri, mai di più:

1. **Beneficio annuo per linea**, con il metodo di calcolo e chi ha firmato la baseline.
2. **Costo di estensione per linea**, che scende dalla seconda in poi perché l'impianto è già fatto.
3. **Costo annuo di mantenimento**, il 15-20 percento, che quasi tutti dimenticano ed è ciò che rende un business case credibile.

Il quarto elemento non è un numero: **cosa serve alle persone.** Formazione, tempo, e il fatto che qualcuno cambi il proprio modo di lavorare. La maggior parte delle estensioni fallisce lì, non sulla tecnologia.

## Termini di questa unità

| Termine | In italiano | Che cos'è, in una frase |
|---|---|---|
| Scalare | Estendere | Portare una soluzione da una linea o sito a molti. |
| Caso economico | Caso economico | Il confronto scritto fra benefici e costi che giustifica la decisione. |
| Costo di replica | Costo di replica | Quanto costa il secondo, il terzo, il decimo sito. |
| Gestione del cambiamento | Gestione del cambiamento | Il lavoro sulle persone perché la soluzione venga davvero usata. |
| Lezione appresa | Lezione appresa | Ciò che resta all'organizzazione anche da un progetto fermato. |

## Esempio pratico, parte 1: la decisione

Il caso economico per estendere la manutenzione predittiva dalla linea 3 alle linee 1 e 2.

| Voce | Linea 3 (fatta) | Linee 1 e 2 |
|---|---:|---:|
| Beneficio annuo per linea | 98.000 euro | ~85.000 euro stimati |
| Costo di realizzazione | 120.000 euro | 45.000 euro ciascuna |
| Mantenimento annuo | 20.000 euro | 12.000 euro ciascuna |
| Rientro dell'investimento | 15 mesi | ~8 mesi |

Perché le linee 1 e 2 costano meno? Perché la raccolta dati, l'archivio, la procedura e la formazione esistono già. **Il primo caso paga l'infrastruttura per tutti.** È l'argomento che rende accettabile un primo progetto apparentemente caro, ed è bene dirlo fin dall'inizio, non alla fine.

Perché il beneficio stimato è più basso? Perché le linee 1 e 2 partono da 4,5 e 4,8 ore di fermo, non da 6. Meno da recuperare. **Stimare lo stesso beneficio ovunque è l'errore classico dei piani di estensione**, e chi ti ascolta lo nota.

E le linee 4 e 5? Non si estende: costruttore diverso, il modello va rifatto. Si rivaluteranno come caso a sé.

## Esempio pratico, parte 2: il racconto di due minuti

Questa è la risposta a *"descrivi brevemente un processo di trasformazione digitale"*. Imparala nella struttura, non a memoria.

> *"Parto sempre dal problema, non dalla tecnologia.*
>
> *Su una linea di confezionamento perdevamo sei ore a settimana di fermi non pianificati. A novecento euro l'ora, sono circa duecentottantamila euro l'anno. Il capo reparto ha firmato quel numero prima che iniziassimo, così alla fine nessuno avrebbe discusso il punto di partenza.*
>
> *Poi sono andato a vedere dove nascevano i dati. I fermi erano già registrati nel MES, ma nessuno li guardava aggregati. Guardandoli, metà veniva da un solo gruppo meccanico. Ho anche scoperto che gli orologi di due sistemi erano sfasati di quaranta secondi, e quella è stata la prima cosa da sistemare.*
>
> *A quel punto ho scelto lo strumento più semplice che potesse funzionare. Non un modello: un grafico settimanale delle tre cause principali, con un responsabile assegnato. Due giorni di lavoro, e i fermi sono passati da sei a quattro ore e otto. Più della metà del risultato finale è arrivata da lì.*
>
> *Restavano i cedimenti dei cuscinetti, che nessuna regola semplice anticipava. Lì sì, un modello. L'ho fatto girare in ombra per sei settimane: faceva la previsione, la registravamo, ma nessuno la vedeva e in linea non cambiava niente. Ha anticipato otto cedimenti su undici, con cinque falsi allarmi. Il conto tornava.*
>
> *In produzione l'avviso va al pianificatore, non alla macchina. La ronda programmata resta come rete di sicurezza, e c'è una persona che risponde del sistema. Il sistema non ferma niente da solo.*
>
> *Dopo tre mesi eravamo a tre ore e nove a settimana. Ma sulla linea di controllo, dove non avevamo fatto nulla, i fermi erano calati del sette percento comunque. Quindi l'effetto reale è venti punti, non ventisette.*
>
> *Abbiamo esteso alle linee uno e due, che hanno lo stesso gruppo meccanico. Non alle quattro e cinque, che hanno macchine di un altro costruttore: lì il caso va rifatto."*

Guarda la struttura, perché è sempre la stessa: **problema con un numero → dove nascono i dati → strumento più semplice → prova senza rischio → produzione con reti di sicurezza → risultato onesto → decisione motivata.**

Sette passaggi, gli stessi sette del corso.

## Come lo dici in inglese

> "I always start from the problem, not from the technology."

> "We were losing six hours a week. At nine hundred euros an hour, that is about two hundred and eighty thousand a year. The plant manager signed that number before we started."

> "The data was already there, nobody had looked at it together. Half of it came from one mechanical group."

> "So the first thing was a weekly chart with an owner. Two days of work, and it took us from six hours to four point eight."

> "For the bearings we used a model. We ran it in the shadow for six weeks before anyone saw it."

> "The alert goes to the planner, not to the machine. Nothing stops on its own."

> "We ended at three point nine. But the control line went down seven percent on its own, so the real effect is twenty points, not twenty-seven."

> "We scaled to two lines with the same equipment. Not to the other two, because those are a different machine. That would be a new project."

**Perché queste parole.** Otto frasi, ognuna con un verbo semplice, tutte dicibili a voce senza pensare. **Imparane la sequenza, non il testo.** Se ricordi i sette passaggi, le parole vengono da sole.

## Quiz

**1. Quante risposte possibili ci sono alla fine di un pilota?**
- a) Due: estendere o fermarsi
- b) Tre: estendere, fermarsi, continuare qui senza estendere ✓
- c) Una: estendere se funziona
- d) Dipende dal budget

*La terza è la più frequente nella realtà e la meno raccontata.*

**2. Cosa serve perché il fermarsi sia una decisione professionale?**
- a) L'approvazione della direzione
- b) Cosa hai imparato, quanto è costato, cosa deve cambiare perché si riprenda ✓
- c) Un rapporto formale
- d) Un'alternativa già pronta

*Senza condizione di rientro è un abbandono, non una decisione.*

**3. Perché estendere alle linee 1 e 2 costa meno?**
- a) Perché sono linee più piccole
- b) Perché raccolta dati, archivio, procedura e formazione esistono già ✓
- c) Perché il fornitore fa uno sconto
- d) Perché si usa lo stesso modello senza modifiche

*Il primo caso paga l'infrastruttura per tutti. Va detto all'inizio, non alla fine.*

**4. Perché il beneficio stimato sulle linee 1 e 2 è più basso?**
- a) Perché il modello sarà meno accurato
- b) Perché partono da 4,5 e 4,8 ore di fermo, quindi c'è meno da recuperare ✓
- c) Perché producono meno
- d) Perché l'adozione sarà minore

*Stimare lo stesso beneficio ovunque è l'errore classico dei piani di estensione.*

**5. Quali tre numeri servono in un caso economico?**
- a) Costo, tempo, rischio
- b) Beneficio annuo, costo di estensione, costo annuo di mantenimento ✓
- c) Investimento, rientro, margine
- d) Ore risparmiate, pezzi prodotti, scarto

*Il terzo è quello che quasi tutti dimenticano ed è ciò che rende credibile il conto.*

**6. Qual è la struttura del racconto di due minuti?**
- a) Tecnologia, budget, risultato
- b) Problema con un numero, dove nascono i dati, strumento più semplice, prova senza rischio, produzione con reti di sicurezza, risultato onesto, decisione motivata ✓
- c) Contesto, soluzione, benefici
- d) Obiettivo, piano, esecuzione

*Sono le sette tappe del corso. Ricorda la sequenza, non il testo.*

**7. Nel racconto, quale dettaglio dimostra meglio l'onestà intellettuale?**
- a) Il costo orario del fermo
- b) Aver dichiarato che l'effetto reale è 20 punti e non 27, per via della linea di controllo ✓
- c) Il numero di falsi allarmi
- d) La durata della modalità ombra

*Ridurre da soli il proprio risultato è il segnale più forte che si possa dare.*

## Fonti

- NIST AI Risk Management Framework
- Ries, il metodo della startup snella

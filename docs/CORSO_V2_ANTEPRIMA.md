# Anteprima di stile, versione 2

Questa e' una unita' scritta interamente nel nuovo stile. Serve a farti dire si' o no prima che io ne scriva venti.

Ho scelto apposta l'unita' piu' piena di sigle di tutto il corso.

---

## Modulo 2, unita' 2

# Dal sensore al PLC allo SCADA: chi fa cosa

**6 minuti**

## Dove siamo nel percorso

**Tappa 3 di 7: capire dove nascono i dati e chi decide oggi.** Prima di scegliere qualunque strumento, devi sapere da dove arrivano i numeri e chi prende le decisioni oggi. Questa unita' risponde a quella domanda per la parte piu' vicina alla macchina.

## Il concetto

Immagina una macchina che riempie e chiude pacchetti. Perche' funzioni, qualcuno deve continuamente misurare, decidere e agire. In una fabbrica questi tre compiti sono divisi fra tre attori diversi, e capire chi fa cosa e' meta' del lavoro quando parli di architettura industriale.

Il primo attore e' il **sensore**: misura una grandezza fisica e la trasforma in un segnale elettrico. Una termocoppia misura la temperatura, una fotocellula vede se il pacchetto e' passato, un accelerometro sente la vibrazione di un motore. Il sensore non decide nulla, dice soltanto quanto vale una cosa, molte volte al secondo.

Il secondo attore e' il **PLC**, che sta per *Programmable Logic Controller*, in italiano controllore logico programmabile. E' un piccolo computer industriale costruito per una cosa sola: leggere i sensori e comandare i motori e le valvole seguendo regole fisse, in tempi garantiti. Se la fotocellula non vede il pacchetto entro 200 millisecondi, ferma il nastro. Il PLC non e' intelligente e non deve esserlo: deve essere prevedibile. Gira lo stesso ciclo migliaia di volte al minuto, sempre uguale, per anni.

Il terzo attore e' lo **SCADA**, cioe' *Supervisory Control And Data Acquisition*, in italiano supervisione e acquisizione dati. E' lo schermo in sala controllo dove un operatore vede l'impianto disegnato, con i valori che cambiano in tempo reale e gli allarmi che si accendono. Da li' puo' cambiare un parametro o fermare una linea. Lo SCADA supervisiona e mostra, ma il controllo vero, quello che deve avvenire in millisecondi, resta nel PLC.

La regola da ricordare e' semplice: **il sensore misura, il PLC decide in tempo reale, lo SCADA fa vedere e permette all'uomo di intervenire**. Se lo SCADA si spegne, la macchina continua a funzionare, perche' il PLC lavora da solo. E' un dettaglio che colpisce a un colloquio, perche' mostra che hai capito dove sta davvero il controllo.

## Termini di questa unita'

| Termine | In italiano | Che cos'e', in una frase |
|---|---|---|
| Sensore | Sensore | Dispositivo che misura una grandezza fisica e la trasforma in segnale elettrico. |
| Attuatore | Attuatore | Dispositivo che agisce sul processo: un motore, una valvola, un pistone. |
| PLC | Controllore logico programmabile | Computer industriale che legge i sensori e comanda gli attuatori con tempi garantiti. |
| SCADA | Supervisione e acquisizione dati | Sistema che mostra l'impianto all'operatore e gli permette di intervenire. |
| Tempo reale | Tempo reale | La garanzia che una risposta arrivi entro un tempo massimo definito, non semplicemente in fretta. |
| Allarme | Allarme | Segnalazione che chiede un intervento umano, diversa da una semplice informazione. |

## Esempio pratico

Su una linea di confezionamento, un motore inizia a vibrare piu' del normale.

L'accelerometro montato sul cuscinetto misura la vibrazione **50 volte al secondo**. Il PLC legge quel valore a ogni ciclo, che dura **10 millisecondi**, e lo confronta con una soglia fissa: se supera **7,1 mm/s** ferma la macchina, perche' oltre quel valore il cuscinetto rischia di grippare.

Lo SCADA nel frattempo mostra il grafico della vibrazione sullo schermo della sala controllo e, quando il valore supera **4,5 mm/s**, accende un allarme giallo. L'operatore lo vede e chiama la manutenzione, prima che si arrivi alla fermata automatica.

Nota la divisione dei compiti: la fermata di emergenza a 7,1 la decide il PLC in dieci millisecondi, perche' li' non c'e' tempo per un essere umano. L'avviso a 4,5 lo gestisce lo SCADA, perche' li' il tempo c'e' e serve una persona che decida cosa fare.

Se domani volessi aggiungere un modello di intelligenza artificiale che prevede il guasto tre giorni prima, quel modello non andrebbe ne' nel PLC ne' nello SCADA: leggerebbe i dati storici da un altro sistema e manderebbe un avviso al pianificatore della manutenzione. Il controllo in tempo reale resta dove e' sempre stato.

## Come lo dici in inglese

Frasi corte, parole comuni, verbi semplici. Devi poterle dire a voce senza fermarti a pensare.

> "The sensor only measures. It does not decide anything."

> "The PLC is the one that decides, and it has to answer in milliseconds. So it must be simple and always do the same thing."

> "SCADA is the screen the operator looks at. If the screen goes down, the machine keeps running, because the PLC works on its own."

> "We would not put the model inside the machine control. The model reads old data and sends a message to a person. The fast control stays where it is."

**Perche' queste frasi e non altre.** Ogni frase ha un solo verbo principale e usa parole che conosci gia': *measures, decides, answers, looks at, keeps running, reads, sends*. Niente *supervises*, *raises alarms*, *predictable rather than smart*, *acquisition*: sono parole giuste ma che ti farebbero inciampare parlando.

**Prima e dopo, sulla stessa idea:**

| Troppo alto | Come lo diresti davvero |
|---|---|
| "SCADA supervises the process and raises alarms." | "SCADA is the screen where the operator sees what is going on." |
| "The PLC must be predictable rather than intelligent." | "The PLC has to be simple and always do the same thing." |
| "We avoid embedding probabilistic models in the control loop." | "We do not let the model stop the machine. It only warns a person." |

## Quiz

**1. Se lo SCADA smette di funzionare, cosa succede alla macchina?**
- a) Si ferma subito, perche' lo SCADA la controlla
- b) Continua a funzionare, perche' il controllo e' nel PLC ✓
- c) Rallenta al cinquanta per cento
- d) Passa in controllo manuale obbligatorio

*Il PLC esegue il controllo da solo. Lo SCADA serve a mostrare e a permettere all'operatore di intervenire, non a far girare la macchina.*

**2. Qual e' il compito del sensore?**
- a) Decidere quando fermare la macchina
- b) Misurare una grandezza fisica e trasformarla in segnale ✓
- c) Mostrare i dati all'operatore
- d) Registrare lo storico della produzione

*Il sensore non decide nulla: misura e basta. La decisione e' del PLC.*

**3. Perche' si dice che il PLC deve essere prevedibile piu' che intelligente?**
- a) Perche' costa meno
- b) Perche' deve rispondere entro un tempo massimo garantito, sempre uguale ✓
- c) Perche' non puo' essere programmato
- d) Perche' lavora solo di giorno

*In tempo reale conta la garanzia sul tempo di risposta. Un comportamento variabile, anche se in media piu' veloce, sarebbe pericoloso.*

**4. Nell'esempio, chi decide la fermata a 7,1 mm/s e perche'?**
- a) Lo SCADA, perche' vede il grafico
- b) L'operatore, perche' e' responsabile della linea
- c) Il PLC, perche' a quella soglia non c'e' tempo per un intervento umano ✓
- d) Il sistema di manutenzione

*Dieci millisecondi non lasciano spazio a una decisione umana. Le soglie che richiedono una persona si gestiscono piu' in basso, come l'avviso a 4,5.*

**5. Dove metteresti un modello che prevede un guasto con tre giorni di anticipo?**
- a) Dentro il PLC, cosi' ferma la macchina da solo
- b) Dentro lo SCADA, al posto degli allarmi
- c) Fuori dal controllo, con un avviso a una persona che pianifica ✓
- d) Non si puo' fare

*Una previsione probabilistica non entra nel controllo in tempo reale. Serve a dare tempo a una persona, non a fermare una macchina da sola.*

**6. Un collega dice: "lo SCADA controlla l'impianto". Come lo correggi?**
- a) Ha ragione, e' esattamente cosi'
- b) Lo SCADA supervisiona e permette di intervenire, il controllo in tempo reale e' del PLC ✓
- c) Lo SCADA controlla solo la qualita'
- d) Dipende dal fornitore

*E' la confusione piu' comune, e saperla correggere con calma e' esattamente cio' che ti chiederanno.*

**7. Che differenza c'e' tra un allarme e una semplice informazione?**
- a) Nessuna, sono sinonimi
- b) L'allarme e' rosso, l'informazione e' gialla
- c) L'allarme chiede un intervento umano, l'informazione no ✓
- d) L'allarme arriva via email

*Un sistema che segnala tutto come allarme diventa rumore, e l'operatore smette di guardarlo. E' un problema serio e riconosciuto.*

---

## Fonti di questa unita'

- ISA-95, standard sull'integrazione tra sistemi di produzione e gestionali
- ISA-18, standard sulla gestione degli allarmi
- OPC UA Parte 1, specifica del protocollo di comunicazione industriale

---

## Confronto con la versione attuale

Stessa materia, unita' 2 del Modulo 2 di oggi:

> "Il process variable rappresenta la grandezza misurata, il setpoint il valore desiderato e il manipulated variable l'uscita del controllore verso l'attuatore. Un anello chiuso confronta PV e SP e calcola l'errore; la struttura proporzionale integrale derivativa corregge in funzione di errore, accumulo e tendenza. Il tempo di scansione del PLC determina il limite superiore della banda passante ottenibile..."

La versione 2 dice la stessa cosa partendo da cosa fa una macchina che riempie pacchetti, spiega ogni sigla alla prima comparsa, mette numeri veri e chiude con sette domande.

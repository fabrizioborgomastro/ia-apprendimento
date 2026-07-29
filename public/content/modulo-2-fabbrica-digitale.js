const t = (it, en) => ({ it, en })

/**
 * Module 2 - How a digital plant is built: OT, IT, AI and cloud.
 * All five units sit on step 3 of the seven: understanding where the data is
 * born and who decides today. Every scenario is hypothetical.
 * @type {import('../types.js').Lesson}
 */
export const fabbricaDigitaleLesson = {
  id: 'fabbrica-digitale',
  slug: 'fabbrica-digitale',
  moduleNumber: 2,
  durationMinutes: 30,
  title: t('Com\'è fatta una fabbrica digitale', 'How a digital plant is built'),
  summary: t(
    'OT e IT con priorità opposte, chi misura e chi decide vicino alla macchina, MES ed ERP con la tracciabilità, la qualità del dato, e dove far girare l\'AI senza aprire porte pericolose.',
    'OT and IT with opposite priorities, who measures and who decides near the machine, MES and ERP with traceability, data quality, and where to run AI without opening dangerous doors.'
  ),
  units: [
    {
      id: 'ot-it',
      stage: 3,
      estimatedMinutes: 6,
      title: t('OT e IT: priorità, tempi e rischi diversi', 'OT and IT: different priorities, times and risks'),
      stageLabel: t('Tappa 3 di 7: capisco dove nascono i dati e chi decide oggi.', 'Step 3 of 7: I understand where the data is born and who decides today.'),
      objective: t(
        'Saper spiegare perché i metodi normali dell\'IT non si applicano tali e quali in reparto.',
        'Be able to explain why standard IT practice does not transfer to the shop floor unchanged.'
      ),
      theory: [
        t(
          'In azienda ci sono due famiglie di sistemi. IT sta per Information Technology, in italiano tecnologie dell\'informazione: sono i sistemi che gestiscono informazioni, cioè posta, gestionale, database, portali. Vivono in ufficio e nei centri dati. OT sta per Operational Technology, tecnologie operative: sono i sistemi che fanno muovere cose fisiche, cioè controllori di macchina, robot, valvole, nastri. Vivono in reparto.',
          'There are two families of systems in a company. IT stands for Information Technology: the systems that handle information, that is mail, the business system, databases, portals. They live in the office and in data centres. OT stands for Operational Technology: the systems that move physical things, that is machine controllers, robots, valves, conveyors. They live on the shop floor.'
        ),
        t(
          'La differenza che conta non è dove stanno, ma cosa proteggono per primo. Nel mondo IT l\'ordine è riservatezza, poi integrità, poi disponibilità: se il gestionale si ferma venti minuti, qualcuno lavora più tardi. Nel mondo OT l\'ordine si rovescia: prima disponibilità e integrità del processo, poi la riservatezza. Se una linea si ferma venti minuti, perdi prodotto e in certi casi crei una situazione non sicura.',
          'The difference that matters is not where they live, but what they protect first. In IT the order is confidentiality, then integrity, then availability: if the business system is down for twenty minutes, somebody works later. In OT the order flips: first availability and process integrity, then confidentiality. If a line stops for twenty minutes you lose product, and in some cases you create an unsafe situation.'
        ),
        t(
          'Da questa inversione discende tutto il resto, e sono quattro differenze pratiche che vale la pena avere pronte.',
          'Everything else follows from that flip, and there are four practical differences worth having ready.'
        ),
        {
          steps: [
            {
              name: t('Aggiornamenti, patching', 'Updates, patching'),
              text: t(
                'In ufficio si installano automaticamente di notte. In reparto un aggiornamento automatico può fermare una linea, quindi si fa solo in fermata programmata e dopo prova su una linea sola.',
                'In the office they install automatically at night. On the floor an automatic update can stop a line, so it happens only in a planned shutdown and after testing on one line.'
              )
            },
            {
              name: t('Scansioni di sicurezza', 'Security scans'),
              text: t(
                'In ufficio sono di routine. In reparto una scansione aggressiva può mandare in crisi un controllore vecchio: il rimedio fa più danni della minaccia, quindi si usa la scansione passiva.',
                'In the office they are routine. On the floor an aggressive scan can knock over an old controller: the cure does more damage than the threat, so you use passive scanning.'
              )
            },
            {
              name: t('Durata di vita', 'Lifetime'),
              text: t(
                'Un portatile si cambia ogni quattro anni, un controllore di macchina resta in servizio quindici o venti anni. Non puoi dare per scontato che esista un aggiornamento.',
                'A laptop is replaced every four years, a machine controller stays in service fifteen or twenty years. You cannot assume an update even exists.'
              )
            },
            {
              name: t('Chi comanda sul dato', 'Who owns the data'),
              text: t(
                'In OT il proprietario del dato spesso è Produzione o Automazione, non IT. Cambia chi deve approvare un accesso, e saperlo è metà del lavoro.',
                'In OT the data owner is often Production or Automation, not IT. That changes who has to approve an access, and knowing it is half the job.'
              )
            }
          ]
        },
        t(
          'La frase da avere pronta è questa: in OT la disponibilità viene prima della riservatezza, ed è per questo che i metodi normali dell\'IT non si applicano tali e quali. Aggiungi il termine brownfield, impianto esistente, cioè un impianto già in funzione con macchine di età e marche diverse su cui bisogna innestarsi senza fermarlo. Quasi tutti i progetti veri sono così.',
          'The sentence to have ready is this: in OT availability comes before confidentiality, and that is why standard IT practice does not transfer as it is. Add the word brownfield, a plant already running with machines of different ages and brands that you have to plug into without stopping it. Almost every real project is like that.'
        )
      ],
      keyPoints: [
        t('In OT la disponibilità viene prima della riservatezza.', 'In OT availability comes before confidentiality.'),
        t('Un controllore resta in servizio quindici o venti anni: l\'aggiornamento può non esistere.', 'A controller stays in service fifteen or twenty years: an update may not even exist.'),
        t('Se non puoi togliere la vulnerabilità, riduci ciò che può raggiungerla.', 'If you cannot remove the weakness, reduce what can reach it.')
      ],
      terminology: [
        { id: 'it', term: 'IT', italian: 'Tecnologie dell\'informazione', definition: t('I sistemi che gestiscono informazioni: gestionale, posta, database.', 'The systems that handle information: business system, mail, databases.') },
        { id: 'ot', term: 'OT', italian: 'Tecnologie operative', definition: t('I sistemi che fanno muovere cose fisiche: controllori, robot, valvole.', 'The systems that move physical things: controllers, robots, valves.') },
        { id: 'riservatezza', term: 'Confidentiality', italian: 'Riservatezza', definition: t('Che i dati non finiscano a chi non deve vederli.', 'Keeping data away from those who should not see it.') },
        { id: 'integrita', term: 'Integrity', italian: 'Integrità', definition: t('Che i dati e il processo non vengano alterati.', 'Keeping data and the process from being altered.') },
        { id: 'brownfield', term: 'Brownfield', italian: 'Impianto esistente', definition: t('Un impianto già in funzione, con macchine di età e marche diverse, su cui bisogna innestarsi.', 'A plant already running, with machines of different ages and brands, that you have to plug into.') },
        { id: 'convergenza-ot-it', term: 'OT/IT convergence', italian: 'Convergenza OT/IT', definition: t('Il fatto che i due mondi oggi si parlino, con i vantaggi e i rischi che ne derivano.', 'The fact that the two worlds now talk to each other, with the benefits and risks that follow.') }
      ],
      example: {
        title: t('"Applichiamo l\'aggiornamento automatico anche in reparto"', '"Let us apply automatic patching on the shop floor too"'),
        steps: [
          t('Su una linea ci sono 14 controllori. Tre hanno 17 anni e il costruttore non esiste più.', 'One line has 14 controllers. Three are 17 years old and the manufacturer no longer exists.'),
          t('Aggiornare in automatico quei tre significa o nessun aggiornamento disponibile, oppure un aggiornamento non testato su una macchina che nessuno sa più riparare.', 'Patching those three automatically means either no patch exists, or an untested patch on a machine nobody knows how to repair any more.'),
          t('Le macchine vecchie non si aggiornano, si isolano: stanno in una zona di rete separata che parla solo con quello che deve.', 'Old machines are not patched, they are isolated: they sit in a separate network zone that only talks to what it must.'),
          t('Gli aggiornamenti sulle macchine aggiornabili si fanno nella fermata programmata, dopo prova su una linea sola.', 'Machines that can be patched are patched during the planned stop, after testing on one line only.'),
          t('Le scansioni si fanno in modalità passiva, che ascolta il traffico invece di interrogare i dispositivi.', 'Scans run in passive mode, listening to traffic instead of probing the devices.')
        ],
        takeaway: t(
          'Hai ridotto il rischio senza mai fermare la produzione, e hai parlato la lingua di entrambi i mondi. La risposta corretta non era "no", era "quel rischio lo copriamo in un altro modo".',
          'You reduced the risk without ever stopping production, and you spoke the language of both worlds. The right answer was not "no", it was "we cover that risk another way".'
        )
      },
      englishBlock: {
        lines: [
          'In the office, we protect the data first. On the shop floor, we protect the line first. If the line stops, we lose product, and sometimes it is not safe.',
          'So we do not patch automatically down there. We patch during planned stops, after testing on one line.',
          'Some machines are seventeen years old. We cannot update them, so we keep them in a separate part of the network instead.',
          'The data owner down there is production, not IT. So a different person approves the access.'
        ],
        why: 'Protect first, we lose product, planned stops, keep them separate. Nessun availability over confidentiality, nessun network segmentation: si dice la stessa cosa con parole che tutti capiscono.'
      },
      quiz: [
        {
          id: 'm2u1-q1',
          prompt: 'Qual è la differenza principale tra OT e IT?',
          options: [
            'OT è più moderno, IT è più vecchio',
            'L\'ordine di priorità: in OT vengono prima disponibilità e integrità del processo',
            'OT riguarda il software, IT l\'hardware',
            'OT è gestito da fornitori esterni'
          ],
          correctOption: 1,
          explanation: 'È l\'inversione delle priorità a spiegare tutte le differenze pratiche di metodo.',
          final: true
        },
        {
          id: 'm2u1-q2',
          prompt: 'Perché non si applicano aggiornamenti automatici in reparto?',
          options: [
            'Perché costano troppo',
            'Perché un aggiornamento può fermare la linea, e per certe macchine non esiste nemmeno',
            'Perché lo vieta la normativa',
            'Perché i sistemi OT non si aggiornano mai'
          ],
          correctOption: 1,
          explanation: 'Si aggiorna, ma in fermata programmata e dopo prova. Il punto è il quando e il come, non il se.'
        },
        {
          id: 'm2u1-q3',
          prompt: 'Una macchina ha 17 anni e il costruttore non esiste più. Cosa fai?',
          options: [
            'La sostituisci subito',
            'La isoli in una zona di rete separata che parla solo con quello che deve',
            'La aggiorni comunque',
            'Accetti il rischio senza fare nulla'
          ],
          correctOption: 1,
          explanation: 'Se non puoi togliere la vulnerabilità, riduci ciò che può raggiungerla. È il ragionamento tipico degli impianti esistenti.'
        },
        {
          id: 'm2u1-q4',
          prompt: 'Quanto dura tipicamente in servizio un controllore di macchina?',
          options: ['3 o 4 anni come un computer da ufficio', '6 o 8 anni', '15 o 20 anni', 'Meno di 2 anni'],
          correctOption: 2,
          explanation: 'La lunghissima vita utile è il motivo per cui in fabbrica convivono tecnologie di epoche diverse.'
        },
        {
          id: 'm2u1-q5',
          prompt: 'Perché una scansione di sicurezza aggressiva è rischiosa in OT?',
          options: [
            'Perché rallenta la rete d\'ufficio',
            'Perché può mandare in crisi un controllore vecchio, facendo più danni della minaccia',
            'Perché viola la privacy degli operatori',
            'Perché richiede troppo tempo'
          ],
          correctOption: 1,
          explanation: 'Si usa la scansione passiva, che ascolta il traffico invece di interrogare i dispositivi.'
        },
        {
          id: 'm2u1-q6',
          prompt: 'In OT chi è tipicamente il proprietario del dato?',
          options: [
            'Sempre l\'IT',
            'Spesso Produzione o Automazione, e questo cambia chi approva gli accessi',
            'Il fornitore della macchina',
            'Il responsabile qualità'
          ],
          correctOption: 1,
          explanation: 'Sapere chi approva è metà del lavoro quando devi far partire un progetto.'
        },
        {
          id: 'm2u1-q7',
          prompt: 'Cosa significa impianto esistente, brownfield, e perché conta?',
          options: [
            'Un impianto nuovo da progettare',
            'Un impianto già in funzione con macchine di età e marche diverse, su cui devi innestarti senza fermarlo',
            'Un impianto dismesso',
            'Un impianto certificato'
          ],
          correctOption: 1,
          explanation: 'Quasi tutti i progetti veri sono su impianti esistenti. Progettare come se fosse tutto nuovo è il modo più rapido per non partire mai.'
        }
      ],
      sourceIds: ['nist-sp-800-82-r3', 'cisa-industrial-control-systems']
    },

    {
      id: 'sensori-plc-scada',
      stage: 3,
      estimatedMinutes: 6,
      title: t('Sensori, PLC, SCADA: chi fa cosa', 'Sensors, PLC, SCADA: who does what'),
      stageLabel: t('Tappa 3 di 7: la parte più vicina alla macchina.', 'Step 3 of 7: the part closest to the machine.'),
      objective: t(
        'Sapere dove sta davvero il controllo, e quindi dove un modello può stare e dove non deve stare.',
        'Know where control really sits, and therefore where a model can live and where it must not.'
      ),
      theory: [
        t(
          'Immagina una macchina che riempie e chiude pacchetti. Perché funzioni, qualcuno deve continuamente misurare, decidere e agire. In fabbrica questi tre compiti sono divisi fra tre attori diversi, ed è la divisione più importante da avere in testa.',
          'Picture a machine that fills and closes packets. For it to work, somebody has to keep measuring, deciding and acting. In a plant those three jobs are split between three different actors, and it is the most important split to keep in mind.'
        ),
        {
          steps: [
            {
              name: t('Sensore, sensor', 'Sensor'),
              text: t(
                'Misura una grandezza fisica e la trasforma in segnale elettrico: una termocoppia la temperatura, una fotocellula il passaggio del pacchetto, un accelerometro la vibrazione. Non decide nulla, dice solo quanto vale una cosa, molte volte al secondo.',
                'It measures a physical quantity and turns it into an electrical signal: a thermocouple temperature, a photocell the packet going past, an accelerometer vibration. It decides nothing, it only says how much something is, many times a second.'
              )
            },
            {
              name: t('PLC, controllore logico programmabile', 'PLC, programmable logic controller'),
              text: t(
                'Piccolo computer industriale costruito per una cosa sola: leggere i sensori e comandare motori e valvole con regole fisse, in tempi garantiti. Se la fotocellula non vede il pacchetto entro 200 millisecondi, ferma il nastro. Non è intelligente e non deve esserlo: deve essere prevedibile.',
                'A small industrial computer built for one job: read the sensors and drive motors and valves with fixed rules, within guaranteed times. If the photocell does not see the packet within 200 milliseconds, it stops the belt. It is not clever and does not need to be: it needs to be predictable.'
              )
            },
            {
              name: t('SCADA, supervisione e acquisizione dati', 'SCADA, supervision and data acquisition'),
              text: t(
                'Lo schermo in sala controllo dove l\'operatore vede l\'impianto disegnato, i valori che cambiano e gli allarmi che si accendono, e da cui può cambiare un parametro o fermare una linea.',
                'The screen in the control room where the operator sees the plant drawn out, the values changing and the alarms lighting up, and from where a parameter can be changed or a line stopped.'
              )
            }
          ]
        },
        t(
          'La regola da ricordare è una riga: il sensore misura, il PLC decide in tempo reale, lo SCADA fa vedere e permette all\'uomo di intervenire. E il dettaglio che colpisce di più a un colloquio: se lo SCADA si spegne, la macchina continua a funzionare, perché il controllo sta nel PLC.',
          'The rule to remember is one line: the sensor measures, the PLC decides in real time, SCADA shows and lets a human step in. And the detail that lands best in an interview: if SCADA goes down, the machine keeps running, because control lives in the PLC.'
        ),
        t(
          'Un\'ultima cosa sugli allarmi. Un allarme è una segnalazione che chiede un intervento umano, ed è diversa da una semplice informazione. Se un sistema segnala tutto come allarme, l\'operatore smette di guardarlo: si chiama sovraccarico di allarmi ed è una causa nota di incidenti. Quando proponi di aggiungere avvisi generati da un modello, questa è la prima obiezione che riceverai, e giustamente.',
          'One last thing about alarms. An alarm is a signal that asks for human action, and it is different from plain information. If a system flags everything as an alarm, the operator stops looking: this is called alarm flooding and it is a known cause of accidents. When you propose adding alerts generated by a model, this is the first objection you will get, and rightly so.'
        )
      ],
      keyPoints: [
        t('Il sensore misura, il PLC decide in tempo reale, lo SCADA mostra.', 'The sensor measures, the PLC decides in real time, SCADA shows.'),
        t('Se lo SCADA si spegne la macchina continua: il controllo è nel PLC.', 'If SCADA goes down the machine keeps running: control lives in the PLC.'),
        t('Un modello previsionale non entra nel controllo in tempo reale.', 'A predictive model does not go inside real-time control.')
      ],
      terminology: [
        { id: 'sensore', term: 'Sensor', italian: 'Sensore', definition: t('Dispositivo che misura una grandezza fisica e la trasforma in segnale elettrico.', 'A device that measures a physical quantity and turns it into an electrical signal.') },
        { id: 'attuatore', term: 'Actuator', italian: 'Attuatore', definition: t('Dispositivo che agisce sul processo: motore, valvola, pistone.', 'A device that acts on the process: motor, valve, piston.') },
        { id: 'plc', term: 'PLC', italian: 'Controllore logico programmabile', definition: t('Computer industriale che legge i sensori e comanda gli attuatori con tempi garantiti.', 'An industrial computer that reads sensors and drives actuators within guaranteed times.') },
        { id: 'scada', term: 'SCADA', italian: 'Supervisione e acquisizione dati', definition: t('Sistema che mostra l\'impianto all\'operatore e gli permette di intervenire.', 'The system that shows the plant to the operator and lets them step in.') },
        { id: 'tempo-reale', term: 'Real time', italian: 'Tempo reale', definition: t('La garanzia che una risposta arrivi entro un tempo massimo definito, non semplicemente in fretta.', 'The guarantee that an answer arrives within a defined maximum time, not simply fast.') },
        { id: 'allarme', plain: true, term: 'Alarm', italian: 'Allarme', definition: t('Segnalazione che chiede un intervento umano, diversa da una informazione.', 'A signal that asks for human action, different from plain information.') },
        { id: 'sovraccarico-allarmi', term: 'Alarm flooding', italian: 'Sovraccarico di allarmi', definition: t('Troppi allarmi, tanto che l\'operatore smette di guardarli.', 'So many alarms that the operator stops looking at them.') }
      ],
      example: {
        title: t('Un motore che inizia a vibrare', 'A motor that starts to vibrate'),
        steps: [
          t('L\'accelerometro sul cuscinetto misura la vibrazione 50 volte al secondo.', 'The accelerometer on the bearing measures vibration 50 times a second.'),
          t('Il PLC legge quel valore a ogni ciclo, che dura 10 millisecondi, e sopra 7,1 mm/s ferma la macchina, perché il cuscinetto rischia di grippare.', 'The PLC reads that value every cycle, and a cycle is 10 milliseconds. Above 7.1 mm/s it stops the machine, because the bearing may seize.'),
          t('Lo SCADA mostra il grafico in sala controllo e sopra 4,5 mm/s accende un allarme giallo: l\'operatore lo vede e chiama la manutenzione.', 'SCADA shows the chart in the control room and above 4.5 mm/s raises a yellow alarm: the operator sees it and calls maintenance.'),
          t('Un modello che prevedesse il guasto tre giorni prima non andrebbe né nel PLC né nello SCADA: leggerebbe i dati storici e manderebbe un avviso al pianificatore.', 'A model predicting the failure three days ahead would go neither in the PLC nor in SCADA: it would read historical data and send a message to the planner.')
        ],
        takeaway: t(
          'La fermata a 7,1 la decide il PLC in dieci millisecondi, perché lì non c\'è tempo per una persona. L\'avviso a 4,5 lo gestisce lo SCADA, perché lì il tempo c\'è e serve qualcuno che decida.',
          'The stop at 7.1 is decided by the PLC in ten milliseconds, because there is no time for a person. The warning at 4.5 is handled by SCADA, because there is time and somebody has to decide.'
        )
      },
      englishBlock: {
        lines: [
          'The sensor only measures. It does not decide anything.',
          'The PLC is the one that decides, and it has to answer in milliseconds. So it must be simple and always do the same thing.',
          'SCADA is the screen the operator looks at. If the screen goes down, the machine keeps running, because the PLC works on its own.',
          'We would not put the model inside the machine control. The model reads old data and sends a message to a person.'
        ],
        why: 'Un solo verbo per frase e parole che usi già: measures, decides, answers, looks at, keeps running, reads, sends. Niente supervises, raises alarms, acquisition.'
      },
      quiz: [
        {
          id: 'm2u2-q1',
          prompt: 'Se lo SCADA smette di funzionare, cosa succede alla macchina?',
          options: [
            'Si ferma subito',
            'Continua a funzionare, perché il controllo è nel PLC',
            'Rallenta al cinquanta per cento',
            'Passa in controllo manuale obbligatorio'
          ],
          correctOption: 1,
          explanation: 'Il PLC esegue il controllo da solo. Lo SCADA mostra e permette di intervenire, non fa girare la macchina.',
          final: true
        },
        {
          id: 'm2u2-q2',
          prompt: 'Qual è il compito del sensore?',
          options: [
            'Decidere quando fermare la macchina',
            'Misurare una grandezza fisica e trasformarla in segnale',
            'Mostrare i dati all\'operatore',
            'Registrare lo storico'
          ],
          correctOption: 1,
          explanation: 'Il sensore misura e basta. La decisione è del PLC.'
        },
        {
          id: 'm2u2-q3',
          prompt: 'Perché il PLC deve essere prevedibile più che intelligente?',
          options: [
            'Perché costa meno',
            'Perché deve rispondere entro un tempo massimo garantito, sempre uguale',
            'Perché non può essere programmato',
            'Perché lavora solo di giorno'
          ],
          correctOption: 1,
          explanation: 'In tempo reale conta la garanzia sul tempo di risposta, non la velocità media.'
        },
        {
          id: 'm2u2-q4',
          prompt: 'Nell\'esempio, chi decide la fermata a 7,1 mm/s e perché?',
          options: [
            'Lo SCADA, perché vede il grafico',
            'L\'operatore, perché è responsabile della linea',
            'Il PLC, perché a quella soglia non c\'è tempo per un intervento umano',
            'Il sistema di manutenzione'
          ],
          correctOption: 2,
          explanation: 'Dieci millisecondi non lasciano spazio a una decisione umana.'
        },
        {
          id: 'm2u2-q5',
          prompt: 'Dove metteresti un modello che prevede un guasto tre giorni prima?',
          options: [
            'Dentro il PLC, così ferma la macchina da solo',
            'Dentro lo SCADA, al posto degli allarmi',
            'Fuori dal controllo, con un avviso a una persona che pianifica',
            'Non si può fare'
          ],
          correctOption: 2,
          explanation: 'Una previsione probabilistica non entra nel controllo in tempo reale: serve a dare tempo a una persona.'
        },
        {
          id: 'm2u2-q6',
          prompt: 'Che differenza c\'è tra un allarme e una informazione?',
          options: [
            'Nessuna',
            'L\'allarme è rosso, l\'informazione gialla',
            'L\'allarme chiede un intervento umano, l\'informazione no',
            'L\'allarme arriva via posta elettronica'
          ],
          correctOption: 2,
          explanation: 'Se tutto è allarme, l\'operatore smette di guardare. È una causa nota di incidenti.'
        },
        {
          id: 'm2u2-q7',
          prompt: 'Proponi di aggiungere avvisi generati da un modello. Qual è la prima obiezione che riceverai?',
          options: [
            'Che costa troppo',
            'Che aggiungerà rumore a un operatore già sommerso di allarmi',
            'Che il modello non è accurato',
            'Che serve un nuovo fornitore'
          ],
          correctOption: 1,
          explanation: 'Prima si riducono gli allarmi inutili, poi si valuta se un segnale nuovo aggiunge valore.'
        }
      ],
      sourceIds: ['isa-18-alarm-management', 'nist-sp-800-82-r3']
    },

    {
      id: 'mes-erp',
      stage: 3,
      estimatedMinutes: 6,
      title: t('MES ed ERP: esecuzione, pianificazione, tracciabilità', 'MES and ERP: execution, planning, traceability'),
      stageLabel: t('Tappa 3 di 7: qui vive la tracciabilità.', 'Step 3 of 7: this is where traceability lives.'),
      objective: t(
        'Saper spiegare la genealogia del lotto con un numero, perché è l\'argomento che convince un dirigente.',
        'Be able to explain batch genealogy with a number, because that is the argument that convinces a manager.'
      ),
      theory: [
        t(
          'Sopra PLC e SCADA ci sono due sistemi che sentirai nominare continuamente. L\'ERP, Enterprise Resource Planning, pianificazione delle risorse aziendali, è il gestionale: sa cosa l\'azienda deve produrre, quanto materiale c\'è, quando arriva, quanto costa, a chi va spedito. Ragiona in giorni e settimane.',
          'Above PLC and SCADA there are two systems you will hear named constantly. ERP, Enterprise Resource Planning, is the business system: it knows what the company has to produce, how much material there is, when it arrives, what it costs, where it ships. It thinks in days and weeks.'
        ),
        t(
          'Il MES, Manufacturing Execution System, sistema di esecuzione della produzione, sta in mezzo tra l\'ERP e le macchine. Prende l\'ordine dall\'ERP e lo traduce in esecuzione: quale linea, quale ricetta, quali materiali, quale operatore, quali controlli di qualità. E soprattutto registra cosa è successo davvero. Ragiona in minuti.',
          'MES, Manufacturing Execution System, sits between ERP and the machines. It takes the order from ERP and turns it into execution: which line, which recipe, which materials, which operator, which quality checks. And above all it records what actually happened. It thinks in minutes.'
        ),
        t(
          'Il modo più semplice per ricordarli: ERP dice cosa e quando, cioè pianifica. MES dice come è andata davvero, cioè esegue e registra. SCADA e PLC fanno muovere le cose adesso, cioè controllano. Tre orizzonti di tempo, tre mestieri diversi.',
          'The simplest way to remember them: ERP says what and when, that is planning. MES says how it really went, that is execution and recording. SCADA and PLC make things move right now, that is control. Three time horizons, three different jobs.'
        ),
        t(
          'La funzione del MES che vale più di tutte per il tuo colloquio è la genealogia del lotto, in inglese batch genealogy. È la capacità di risalire da un prodotto finito a tutto ciò che lo ha generato: quali materie prime, da quali lotti in arrivo, su quale macchina, in che turno, con quale versione della ricetta, con quali controlli superati.',
          'The MES function worth most in your interview is batch genealogy. It is the ability to go back from a finished product to everything that made it: which raw materials, from which incoming lots, on which machine, in which shift, with which recipe version, with which checks passed.'
        ),
        t(
          'Perché è così importante? Perché quando arriva un reclamo la domanda non è "abbiamo un problema di qualità", ma "quali altri lotti sono coinvolti e vanno bloccati". Senza genealogia la risposta è "non lo sappiamo", e blocchi tutto. Ed è anche la ragione per cui, quando qualcuno propone un modello di AI sulla qualità, la prima domanda seria è: il dato di qualità è collegato al lotto, o è solo un numero in un foglio?',
          'Why does it matter so much? Because when a complaint arrives the question is not "do we have a quality problem", it is "which other lots are involved and have to be blocked". Without genealogy the answer is "we do not know", and you block everything. It is also why, when somebody proposes an AI model on quality, the first serious question is: is the quality data linked to the batch, or is it just a number in a spreadsheet?'
        )
      ],
      keyPoints: [
        t('ERP pianifica, MES registra cosa è successo davvero, SCADA e PLC controllano adesso.', 'ERP plans, MES records what really happened, SCADA and PLC control right now.'),
        t('La genealogia del lotto trasforma un reclamo da catastrofe a problema circoscritto.', 'Batch genealogy turns a complaint from a disaster into a contained problem.'),
        t('Se il dato di qualità non è collegato al lotto, il primo progetto è collegare i dati.', 'If quality data is not linked to the batch, the first project is linking the data.')
      ],
      terminology: [
        { id: 'erp', term: 'ERP', italian: 'Pianificazione delle risorse aziendali', definition: t('Il gestionale: sa cosa produrre, con quali materiali, per quando, a che costo.', 'The business system: it knows what to produce, with which materials, by when, at what cost.') },
        { id: 'mes', term: 'MES', italian: 'Sistema di esecuzione della produzione', definition: t('Traduce l\'ordine in esecuzione e registra cosa è successo davvero in reparto.', 'It turns the order into execution and records what actually happened on the floor.') },
        { id: 'ordine-produzione', term: 'Production order', italian: 'Ordine di produzione', definition: t('Il documento che dice cosa produrre, quanto e con quale ricetta.', 'The document that says what to produce, how much, and with which recipe.') },
        { id: 'genealogia-lotto', term: 'Batch genealogy', italian: 'Genealogia del lotto', definition: t('La possibilità di risalire da un prodotto finito a materiali, macchine, turni e controlli.', 'The ability to go back from a finished product to materials, machines, shifts and checks.') },
        { id: 'tracciabilita', term: 'Traceability', italian: 'Tracciabilità', definition: t('Poter ricostruire la storia di un prodotto in avanti e all\'indietro.', 'Being able to reconstruct a product history forwards and backwards.') },
        { id: 'ricetta', term: 'Recipe', italian: 'Ricetta', definition: t('L\'insieme dei parametri con cui si produce un certo articolo.', 'The set of parameters used to produce a given item.') },
        { id: 'isa-95', term: 'ISA-95', italian: 'ISA-95', definition: t('Lo standard che descrive come i sistemi gestionali e quelli di produzione si parlano.', 'The standard that describes how business systems and production systems talk to each other.') }
      ],
      example: {
        title: t('Un reclamo su un lotto venduto tre settimane fa', 'A complaint on a lot sold three weeks ago'),
        table: {
          columns: [t('Situazione', 'Situation'), t('Cosa blocchi', 'What you block'), t('Perché', 'Why')],
          rows: [
            [
              t('Senza genealogia del lotto', 'Without batch genealogy'),
              t('200.000 pezzi', '200,000 units'),
              t('Sai solo che il difetto riguarda un prodotto fatto più o meno in quel periodo', 'You only know the defect concerns product made roughly in that period')
            ],
            [
              t('Con genealogia del lotto', 'With batch genealogy'),
              t('4.000 pezzi', '4,000 units'),
              t('In venti minuti trovi i quattro lotti finiti che hanno usato la materia prima MP-8802', 'In twenty minutes you find the four finished lots that used raw material MP-8802')
            ]
          ]
        },
        steps: [
          t('Il lotto finito L-4471 è stato prodotto il 12, sulla linea 3, turno 2, con materia prima del lotto MP-8802, ricetta versione 7.', 'Finished lot L-4471 was produced on the 12th, on line 3, shift 2, with raw material lot MP-8802, recipe version 7.'),
          t('Cerchi tutti i lotti finiti che hanno usato MP-8802: sono quattro, per un totale di 4.000 pezzi.', 'You look for every finished lot that used MP-8802: there are four, 4,000 units in total.'),
          t('La differenza fra le due situazioni è 196.000 pezzi bloccati inutilmente.', 'The difference between the two situations is 196,000 units blocked for nothing.')
        ],
        takeaway: t(
          'La frase che vale a colloquio è questa: la tracciabilità non è un obbligo burocratico, è quello che ti permette di bloccare quattromila pezzi invece di duecentomila.',
          'The sentence that pays off in an interview is this: traceability is not paperwork, it is what lets you block four thousand units instead of two hundred thousand.'
        )
      },
      englishBlock: {
        lines: [
          'ERP knows what we have to produce and when. MES knows what actually happened on the line.',
          'The important part of MES is that you can go back from a finished box to the raw material, the machine, the shift and the checks.',
          'So when a customer complains, we block four thousand pieces instead of two hundred thousand.',
          'If the quality data is not linked to the batch, the first project is not a model. The first project is linking the data.'
        ],
        why: 'Knows, actually happened, go back from, block, linking the data. Sono immagini concrete: go back from a finished box si capisce e si ricorda, backward traceability no.'
      },
      quiz: [
        {
          id: 'm2u3-q1',
          prompt: 'Qual è la differenza tra ERP e MES?',
          options: [
            'ERP è più moderno del MES',
            'ERP pianifica cosa e quando, MES esegue e registra cosa è successo davvero',
            'ERP è per la qualità, MES per la logistica',
            'Sono due nomi dello stesso sistema'
          ],
          correctOption: 1,
          explanation: 'ERP ragiona in giorni e settimane, MES in minuti.',
          final: true
        },
        {
          id: 'm2u3-q2',
          prompt: 'Che cos\'è la genealogia del lotto?',
          options: [
            'La storia degli aggiornamenti del software',
            'La possibilità di risalire da un prodotto finito a materiali, macchine, turni e controlli',
            'L\'elenco dei fornitori qualificati',
            'Il registro delle manutenzioni'
          ],
          correctOption: 1,
          explanation: 'È la funzione del MES che vale di più quando arriva un reclamo.'
        },
        {
          id: 'm2u3-q3',
          prompt: 'Nell\'esempio, perché senza genealogia si bloccano 200.000 pezzi?',
          options: [
            'Perché è la regola aziendale',
            'Perché non sapendo quali lotti sono coinvolti devi bloccare tutto il periodo sospetto',
            'Perché il cliente lo richiede',
            'Perché il MES è fuori servizio'
          ],
          correctOption: 1,
          explanation: 'L\'incertezza si paga in prodotto bloccato. È il modo più chiaro per spiegare il valore della tracciabilità.'
        },
        {
          id: 'm2u3-q4',
          prompt: 'Un modello dovrebbe prevedere i difetti, ma i dati di qualità non sono collegati al lotto. Cosa proponi?',
          options: [
            'Costruire il modello lo stesso, i dati basteranno',
            'Che il primo progetto sia collegare i dati, non il modello',
            'Rinunciare al progetto',
            'Comprare un MES nuovo'
          ],
          correctOption: 1,
          explanation: 'Un modello su dati senza contesto produce numeri che nessuno può usare per decidere.'
        },
        {
          id: 'm2u3-q5',
          prompt: 'In quale ordine di tempo ragiona il MES?',
          options: ['Millisecondi', 'Minuti', 'Giorni', 'Mesi'],
          correctOption: 1,
          explanation: 'Millisecondi è il PLC, giorni e settimane è l\'ERP. Il MES sta in mezzo.'
        },
        {
          id: 'm2u3-q6',
          prompt: 'A cosa serve ISA-95?',
          options: [
            'A certificare la qualità del prodotto',
            'A descrivere come i sistemi gestionali e quelli di produzione si parlano',
            'A definire i requisiti di sicurezza informatica',
            'A standardizzare i sensori'
          ],
          correctOption: 1,
          explanation: 'È il riferimento da citare quando parli di integrazione tra ERP, MES e livello macchina.'
        },
        {
          id: 'm2u3-q7',
          prompt: 'Qual è il modo più efficace di spiegare il valore della tracciabilità a un dirigente?',
          options: [
            'Dire che è richiesta dalla normativa',
            'Dire che permette di bloccare quattromila pezzi invece di duecentomila',
            'Mostrare lo schema dei livelli ISA-95',
            'Elencare le funzioni del MES'
          ],
          correctOption: 1,
          explanation: 'Un numero concreto e una conseguenza economica valgono più di qualsiasi schema.'
        }
      ],
      sourceIds: ['isa-95', 'sap-what-is-mes']
    },

    {
      id: 'historian-qualita-dato',
      stage: 3,
      estimatedMinutes: 6,
      title: t('Historian, qualità del dato e contesto operativo', 'Historian, data quality and operating context'),
      stageLabel: t('Tappa 3 di 7: i dati esistono, ma sono utilizzabili?', 'Step 3 of 7: the data exists, but can it be used?'),
      objective: t(
        'Saper fare le quattro verifiche sul dato prima di promettere qualunque modello.',
        'Be able to run the four data checks before promising any model at all.'
      ),
      theory: [
        t(
          'L\'historian, in italiano archivio storico di processo, è il sistema che registra nel tempo tutti i valori che arrivano dalle macchine: temperatura ogni secondo, velocità ogni secondo, vibrazione ogni secondo, per anni. È il posto da cui un progetto di AI industriale prende quasi sempre i suoi dati.',
          'The historian is the system that records over time every value coming from the machines: temperature every second, speed every second, vibration every second, for years. It is the place an industrial AI project almost always takes its data from.'
        ),
        t(
          'Ma un numero da solo non serve a niente. Un dato è utilizzabile solo se porta con sé il contesto. Il valore 78,4 non dice nulla. Il valore 78,4 gradi, sensore TT-204, linea 3, ore 14:32:10 del 12 luglio, mentre era in corso l\'ordine OP-9912, ricetta versione 7, turno 2, valore validato, permette di rispondere a una domanda vera.',
          'But a number on its own is worth nothing. Data is usable only if it carries its context. The value 78.4 says nothing. The value 78.4 degrees, sensor TT-204, line 3, at 14:32:10 on 12 July, while order OP-9912 was running, recipe version 7, shift 2, value validated, lets you answer a real question.'
        ),
        {
          steps: [
            { name: t('Identità', 'Identity'), text: t('Cosa misura e da quale strumento, con un codice che non cambia nel tempo.', 'What it measures and from which instrument, with a code that does not change over time.') },
            { name: t('Tempo', 'Time'), text: t('Quando, con un orologio sincronizzato. Se due sistemi hanno orologi diversi di 40 secondi, il modello imparerà relazioni false.', 'When, on a synchronised clock. If two systems are 40 seconds apart, the model will learn false relations.') },
            { name: t('Contesto', 'Context'), text: t('Cosa stava succedendo: quale ordine, quale prodotto, quale turno, quale versione di ricetta.', 'What was happening: which order, which product, which shift, which recipe version.') },
            { name: t('Fiducia', 'Trust'), text: t('Il valore è validato o è grezzo. Un sensore scollegato può mandare zero per ore, e zero sembra un numero valido.', 'Is the value validated or raw. A disconnected sensor can send zero for hours, and zero looks like a valid number.') }
          ]
        },
        t(
          'Poi ci sono tre problemi che trovi quasi sempre, e conviene cercarli per nome.',
          'Then there are three problems you find almost every time, and it is worth looking for them by name.'
        ),
        {
          numbered: false,
          steps: [
            { name: t('Il dato che non esiste', 'The data that does not exist'), text: t('I microfermi sotto i due minuti spesso non vengono registrati, quindi cerchi la causa di una perdita che nei dati non compare.', 'Micro-stops under two minutes are often not recorded, so you look for the cause of a loss that is not in the data.') },
            { name: t('Il buco nei dati', 'The gap in the data'), text: t('Un sensore rotto per tre settimane lascia un vuoto, e se non lo sai il modello impara dalle settimane sbagliate.', 'A sensor broken for three weeks leaves a hole, and if you do not know it the model learns from the wrong weeks.') },
            { name: t('Lo stesso nome per cose diverse', 'The same word for different things'), text: t('Due reparti chiamano scarto cose diverse, uno include le rilavorazioni e l\'altro no, e i numeri non tornano mai.', 'Two departments call scrap different things, one includes rework and the other does not, and the numbers never match.') }
          ]
        },
        t(
          'Infine il proprietario del dato, in inglese data owner: la persona che risponde della correttezza di quel dato. Se non esiste, ogni discussione sui numeri finisce in stallo, e nessuna riunione riesce a chiudere.',
          'Finally the data owner: the person who answers for the correctness of that data. If there is none, every discussion about numbers ends in a stalemate, and no meeting ever closes.'
        )
      ],
      keyPoints: [
        t('Identità, tempo, contesto e fiducia: le quattro qualità di un dato utilizzabile.', 'Identity, time, context and trust: the four qualities of usable data.'),
        t('Orologi non sincronizzati fanno imparare al modello relazioni false.', 'Clocks out of sync make the model learn false relations.'),
        t('Se manca il proprietario del dato, ogni discussione sui numeri finisce in stallo.', 'With no data owner, every discussion about numbers ends in a stalemate.')
      ],
      terminology: [
        { id: 'historian', term: 'Historian', italian: 'Archivio storico di processo', definition: t('Sistema che registra nel tempo i valori provenienti dalle macchine.', 'The system that records values coming from the machines over time.') },
        { id: 'contesto', plain: true, term: 'Context', italian: 'Contesto', definition: t('Le informazioni che dicono cosa stava succedendo quando il dato è stato registrato.', 'The information that says what was happening when the value was recorded.') },
        { id: 'sincronizzazione-oraria', plain: true, term: 'Time sync', italian: 'Sincronizzazione oraria', definition: t('Avere lo stesso orologio su tutti i sistemi, per poter confrontare gli eventi.', 'Having the same clock on every system, so events can be compared.') },
        { id: 'dato-grezzo', term: 'Raw data', italian: 'Dato grezzo', definition: t('Valore così come arriva dallo strumento, non ancora validato.', 'A value as it comes from the instrument, not yet validated.') },
        { id: 'data-owner', term: 'Data owner', italian: 'Proprietario del dato', definition: t('La persona che risponde della correttezza di quel dato.', 'The person who answers for the correctness of that data.') },
        { id: 'microfermo', term: 'Micro-stop', italian: 'Microfermo', definition: t('Fermata molto breve, spesso sotto i due minuti, spesso non registrata.', 'A very short stop, often under two minutes, and often not recorded.') },
        { id: 'data-readiness', term: 'Data readiness', italian: 'Prontezza dei dati', definition: t('Quanto i dati sono davvero pronti a sostenere il caso d\'uso che vuoi fare.', 'How ready the data really is to support the use case you want to build.') }
      ],
      example: {
        title: t('Quattro verifiche prima di dire sì a un modello', 'Four checks before saying yes to a model'),
        table: {
          columns: [t('Verifica', 'Check'), t('Risultato', 'Result'), t('Conseguenza', 'Consequence')],
          rows: [
            [t('I dati di vibrazione esistono?', 'Does vibration data exist?'), t('Sì, ogni secondo, da 3 anni', 'Yes, every second, for 3 years'), t('Buono', 'Good')],
            [t('Gli orologi sono sincronizzati?', 'Are the clocks in sync?'), t('No: il sistema di manutenzione è avanti di 40 secondi', 'No: the maintenance system is 40 seconds ahead'), t('Il guasto sembra avvenire prima del segnale che lo causa', 'The failure looks like it happens before the signal that causes it')],
            [t('I fermi sono tutti registrati?', 'Is every stop recorded?'), t('No: sotto i 2 minuti non vengono salvati', 'No: anything under 2 minutes is not saved'), t('Il 40 percento delle fermate non compare', '40 percent of the stops are missing')],
            [t('Chi risponde del dato?', 'Who answers for the data?'), t('Nessuno di preciso', 'Nobody in particular'), t('Ogni riunione finisce in discussione sui numeri', 'Every meeting ends arguing about the numbers')]
          ]
        },
        steps: [
          t('Verdetto: non parti dal modello, parti da tre settimane di lavoro sui dati.', 'Verdict: you do not start from the model, you start from three weeks of work on the data.'),
          t('Sincronizzi gli orologi e abbassi la soglia di registrazione dei fermi da 2 minuti a 10 secondi.', 'You sync the clocks and lower the stop recording threshold from 2 minutes to 10 seconds.'),
          t('Nomini un proprietario del dato per la linea 3, con nome e cognome.', 'You name a data owner for line 3, with a first and last name.')
        ],
        takeaway: t(
          'Solo dopo puoi valutare se serve un modello, e a quel punto scoprirai probabilmente che metà del problema si risolve senza, perché per la prima volta vedi i microfermi.',
          'Only then can you judge whether a model is needed, and at that point you will probably find that half the problem is solved without one, because for the first time you can see the micro-stops.'
        )
      },
      englishBlock: {
        lines: [
          'A number on its own is not useful. I need to know what it is, when it happened, and what was running at that moment.',
          'The clocks were forty seconds apart. That means the failure looks like it happened before the signal that caused it.',
          'Short stops under two minutes were not saved at all. So forty percent of the problem was simply not in the data.',
          'So the first project was not a model. It was fixing how we measure.'
        ],
        why: 'On its own, forty seconds apart, not saved at all, fixing how we measure. La frase sugli orologi è particolarmente efficace perché il problema si capisce subito senza spiegazioni.'
      },
      quiz: [
        {
          id: 'm2u4-q1',
          prompt: 'Perché un numero da solo non è utilizzabile?',
          options: [
            'Perché serve sempre un modello per interpretarlo',
            'Perché senza identità, tempo, contesto e fiducia non puoi rispondere a nessuna domanda vera',
            'Perché i sensori sbagliano spesso',
            'Perché va sempre convertito'
          ],
          correctOption: 1,
          explanation: 'Le quattro qualità del dato sono l\'elenco da avere in testa quando ti chiedono se i dati bastano.',
          final: true
        },
        {
          id: 'm2u4-q2',
          prompt: 'Gli orologi di due sistemi differiscono di 40 secondi. Qual è la conseguenza?',
          options: [
            'Nessuna, è una differenza trascurabile',
            'Il modello può imparare relazioni false, per esempio che il guasto precede il segnale che lo causa',
            'I dati si perdono',
            'Il sistema rallenta'
          ],
          correctOption: 1,
          explanation: 'È un problema che sembra banale e invece invalida tutte le analisi su sequenze di eventi.'
        },
        {
          id: 'm2u4-q3',
          prompt: 'I fermi sotto i 2 minuti non vengono registrati. Cosa comporta?',
          options: [
            'Poco, sono fermate brevi',
            'Che una quota grande della perdita non compare nei dati, e cerchi la causa di qualcosa che non vedi',
            'Che i dati sono più puliti',
            'Che il modello sarà più preciso'
          ],
          correctOption: 1,
          explanation: 'I microfermi sono una delle perdite più grandi e più invisibili in produzione.'
        },
        {
          id: 'm2u4-q4',
          prompt: 'Dopo le quattro verifiche i dati risultano deboli. Cosa proponi?',
          options: [
            'Costruire il modello lo stesso e migliorarlo dopo',
            'Tre settimane di lavoro sui dati prima di valutare qualunque modello',
            'Cambiare caso d\'uso',
            'Comprare più sensori'
          ],
          correctOption: 1,
          explanation: 'Sistemare la misura è quasi sempre il primo progetto vero, ed è anche il più rapido a dare risultati.'
        },
        {
          id: 'm2u4-q5',
          prompt: 'A cosa serve un proprietario del dato?',
          options: [
            'A gestire i permessi di accesso',
            'A rispondere della correttezza di quel dato, così le discussioni sui numeri non finiscono in stallo',
            'A fare i salvataggi di sicurezza',
            'A scegliere il fornitore'
          ],
          correctOption: 1,
          explanation: 'Senza un nome e cognome, ogni riunione ricomincia dal dubbio sui numeri.'
        },
        {
          id: 'm2u4-q6',
          prompt: 'Due reparti chiamano scarto cose diverse. Che problema è?',
          options: [
            'Un problema di comunicazione',
            'Un problema di definizione condivisa: i numeri non torneranno mai e nessuno capirà perché',
            'Un problema di formazione',
            'Nessun problema, basta fare la media'
          ],
          correctOption: 1,
          explanation: 'La stessa parola per cose diverse è uno dei problemi di dato più frequenti e più sottovalutati.'
        },
        {
          id: 'm2u4-q7',
          prompt: 'Che cos\'è l\'historian?',
          options: [
            'Il registro degli interventi di manutenzione',
            'Il sistema che registra nel tempo i valori provenienti dalle macchine',
            'Il database del gestionale',
            'L\'archivio dei documenti di qualità'
          ],
          correctOption: 1,
          explanation: 'È il posto da cui un progetto di AI industriale prende quasi sempre i suoi dati.'
        }
      ],
      sourceIds: ['nist-engineering-statistics', 'isa-95']
    },

    {
      id: 'edge-cloud-accessi',
      stage: 3,
      estimatedMinutes: 6,
      title: t('Edge, cloud, dove vive l\'AI, accessi e sicurezza', 'Edge, cloud, where AI lives, access and security'),
      stageLabel: t('Tappa 3 di 7, ultima: dove far girare l\'AI e come collegarsi.', 'Step 3 of 7, the last one: where to run AI and how to connect.'),
      objective: t(
        'Saper scegliere edge o cloud con un criterio, e proporre un\'alternativa invece di limitarsi a rifiutare un accesso.',
        'Be able to choose edge or cloud with a criterion, and to offer an alternative instead of just refusing an access.'
      ),
      theory: [
        t(
          'Ci sono due posti dove può girare un calcolo, e la scelta dipende da una cosa sola: quanto in fretta serve la risposta. Edge, in italiano bordo, significa far girare il calcolo vicino alla macchina, su un dispositivo in reparto. Risponde in millisecondi, funziona anche se la rete verso l\'esterno cade e i dati non escono, ma ha poca potenza ed è difficile da aggiornare su cento linee.',
          'There are two places a computation can run, and the choice depends on one thing only: how fast the answer is needed. Edge means running the computation close to the machine, on a device on the floor. It answers in milliseconds, it works even if the outside network drops and the data never leaves, but it has little power and it is hard to update across a hundred lines.'
        ),
        t(
          'Cloud, in italiano nuvola, significa far girare il calcolo su server esterni. Ha potenza quasi illimitata, si aggiorna in un posto solo e permette di confrontare i dati di più stabilimenti, ma introduce latenza e i dati devono uscire. La regola pratica: se la decisione deve avvenire in meno di un secondo, edge. Se può aspettare minuti o ore, cloud.',
          'Cloud means running the computation on external servers. It has almost unlimited power, you update it in one place and you can compare data across sites, but it adds latency and the data has to leave. The practical rule: if the decision has to happen in less than a second, edge. If it can wait minutes or hours, cloud.'
        ),
        t(
          'Un modello che prevede un guasto tre giorni prima può stare tranquillamente nel cloud. Un controllo visivo che deve scartare un pezzo mentre scorre sul nastro deve stare all\'edge. Non è una preferenza tecnologica, è una conseguenza del tempo di risposta richiesto.',
          'A model that predicts a failure three days ahead can sit comfortably in the cloud. A vision check that has to reject a part while it moves on the belt has to sit at the edge. It is not a technology preference, it follows from the response time required.'
        ),
        t(
          'Ora la parte che a un colloquio conta di più: come ci si collega. Il principio si chiama zone e condotti. Le zone sono gruppi di sistemi con lo stesso livello di protezione. I condotti sono i collegamenti permessi fra zone, ognuno con protocollo, direzione e regole dichiarate. Fra la rete d\'ufficio e quella di fabbrica c\'è una zona intermedia, la DMZ industriale, che serve proprio a evitare collegamenti diretti.',
          'Now the part that counts most in an interview: how you connect. The principle is called zones and conduits. Zones are groups of systems with the same level of protection. Conduits are the allowed links between zones, each with a declared protocol, direction and rule set. Between the office network and the plant network there is a middle zone, the industrial DMZ, which exists precisely to avoid direct links.'
        ),
        {
          steps: [
            {
              name: t('Si legge, non si scrive', 'We read, we do not write'),
              text: t('Un progetto di analisi legge dati e non manda comandi verso le macchine. Leggere è reversibile, scrivere no.', 'An analysis project reads data and never sends commands to the machines. Reading is reversible, writing is not.')
            },
            {
              name: t('Il flusso parte da dentro', 'The flow starts from inside'),
              text: t('Se un fornitore vuole dati, glieli mandiamo noi verso l\'esterno. Non apriamo un canale in entrata.', 'If a supplier wants data, we send it out to them. We do not open an inbound channel.')
            },
            {
              name: t('Accesso a tempo, non permanente', 'Time-bound access, not permanent'),
              text: t(
                'Approvazione per singola finestra, sessione registrata, revoca automatica alla chiusura. L\'accesso remoto permanente di un fornitore è la porta più usata negli incidenti industriali.',
                'Approval per window, recorded session, automatic revocation at the end. Permanent remote access for a supplier is the most used door in industrial incidents.'
              )
            }
          ]
        }
      ],
      keyPoints: [
        t('Meno di un secondo, edge. Minuti o ore, cloud.', 'Less than a second, edge. Minutes or hours, cloud.'),
        t('Zone e condotti: gruppi con la stessa protezione e collegamenti dichiarati.', 'Zones and conduits: groups with the same protection and declared links.'),
        t('Si legge e non si scrive, il flusso parte da dentro, l\'accesso è a tempo.', 'We read and do not write, the flow starts inside, access is time-bound.')
      ],
      terminology: [
        { id: 'edge', term: 'Edge', italian: 'Bordo', definition: t('Far girare il calcolo vicino alla macchina, in reparto.', 'Running the computation close to the machine, on the floor.') },
        { id: 'cloud', term: 'Cloud', italian: 'Nuvola', definition: t('Far girare il calcolo su server esterni, raggiungibili via rete.', 'Running the computation on external servers, reached over the network.') },
        { id: 'latenza', term: 'Latency', italian: 'Latenza', definition: t('Il tempo che passa tra la domanda e la risposta.', 'The time between the question and the answer.') },
        { id: 'zona', term: 'Zone', italian: 'Zona', definition: t('Gruppo di sistemi con lo stesso livello di protezione.', 'A group of systems with the same level of protection.') },
        { id: 'condotto', term: 'Conduit', italian: 'Condotto', definition: t('Collegamento permesso fra due zone, con regole dichiarate.', 'An allowed link between two zones, with declared rules.') },
        { id: 'dmz-industriale', term: 'Industrial DMZ', italian: 'Zona intermedia', definition: t('Zona cuscinetto fra rete d\'ufficio e rete di fabbrica, per evitare collegamenti diretti.', 'A buffer zone between office and plant networks, to avoid direct links.') },
        { id: 'accesso-a-tempo', term: 'Time-bound access', italian: 'Accesso a tempo', definition: t('Collegamento aperto solo per una finestra approvata, poi revocato in automatico.', 'A link open only for an approved window, then revoked automatically.') },
        { id: 'privilegio-minimo', term: 'Least privilege', italian: 'Privilegio minimo', definition: t('Dare solo i permessi che servono a quel compito, per il tempo che serve.', 'Granting only the rights that task needs, for as long as it needs them.') }
      ],
      example: {
        title: t('Tre modi di collegare un modello ai dati della linea', 'Three ways to connect a model to line data'),
        table: {
          columns: [t('Proposta', 'Option'), t('Da dove legge', 'Reads from'), t('Direzione', 'Direction'), t('Rischio principale', 'Main risk')],
          rows: [
            [t('Leggere dal PLC direttamente', 'Read from the PLC directly'), t('Livello di controllo', 'Control level'), t('In uscita continua', 'Continuous outbound'), t('Carico e dipendenze dove la priorità è non fermarsi', 'Load and dependencies where the priority is not stopping')],
            [t('Accesso permanente del fornitore', 'Permanent supplier access'), t('Dall\'esterno', 'From outside'), t('In entrata continua', 'Continuous inbound'), t('Canale non presidiato verso la fabbrica', 'An unattended channel into the plant')],
            [t('Leggere dall\'historian in zona intermedia', 'Read from the historian in the middle zone'), t('Zona intermedia', 'Middle zone'), t('In uscita, a orari concordati', 'Outbound, at agreed times'), t('Latenza maggiore, contesto da ricostruire', 'More latency, context to rebuild')]
          ]
        },
        steps: [
          t('Scegli la terza: il dato che ti serve è già in zona intermedia, non tocchi il livello di controllo e non apri nulla in entrata.', 'You pick the third: the data you need is already in the middle zone, you do not touch the control level and you open nothing inbound.'),
          t('Il prezzo è qualche minuto di ritardo, che per un modello che prevede a 3 giorni non cambia niente.', 'The price is a few minutes of delay, which changes nothing for a model that predicts 3 days ahead.'),
          t('Se qualcuno insiste per l\'accesso permanente del fornitore, la risposta non è no: i dati glieli mandiamo noi, in uscita, con quello che serve e niente di più.', 'If somebody pushes for permanent supplier access, the answer is not no: we send them the data ourselves, outbound, with what is needed and nothing more.')
        ],
        takeaway: t(
          'Hai accettato uno svantaggio reale, la latenza, perché irrilevante per quel caso d\'uso. È il tipo di scelta consapevole che distingue chi ha fatto davvero questo mestiere.',
          'You accepted a real drawback, latency, because it is irrelevant for that use case. That is the kind of deliberate choice that shows you have really done this job.'
        )
      },
      englishBlock: {
        lines: [
          'If the decision has to happen in less than a second, we keep it close to the machine. If it can wait minutes, the cloud is fine.',
          'The prediction looks three days ahead, so a few minutes of delay changes nothing.',
          'We read from a system that already sits in the middle zone. We do not touch the machine level, and we do not open anything coming in.',
          'If the supplier needs data, we send it out to them. We do not let them in.'
        ],
        why: 'Close to the machine, changes nothing, we do not open anything coming in, we send it out. L\'ultima frase è corta e memorabile, ed è la cosa giusta da dire.'
      },
      quiz: [
        {
          id: 'm2u5-q1',
          prompt: 'Quando conviene far girare il calcolo all\'edge invece che nel cloud?',
          options: [
            'Sempre, è più sicuro',
            'Quando la decisione deve avvenire in meno di un secondo',
            'Quando i dati sono pochi',
            'Quando il cloud costa troppo'
          ],
          correctOption: 1,
          explanation: 'La regola pratica è il tempo di risposta richiesto, non la preferenza tecnologica.',
          final: true
        },
        {
          id: 'm2u5-q2',
          prompt: 'Un modello prevede un guasto tre giorni prima. Dove lo metti?',
          options: [
            'All\'edge, per sicurezza',
            'Nel cloud: qualche minuto di latenza è irrilevante su una previsione a tre giorni',
            'Dentro il PLC',
            'Dipende dal fornitore'
          ],
          correctOption: 1,
          explanation: 'Accettare uno svantaggio irrilevante per quel caso d\'uso è una scelta consapevole, non un compromesso.'
        },
        {
          id: 'm2u5-q3',
          prompt: 'Che cos\'è una zona intermedia, la DMZ industriale?',
          options: [
            'Un\'area del reparto riservata alla manutenzione',
            'Una zona cuscinetto fra rete d\'ufficio e rete di fabbrica, per evitare collegamenti diretti',
            'Un server di riserva',
            'Una sala controllo secondaria'
          ],
          correctOption: 1,
          explanation: 'È il posto da cui quasi sempre puoi prendere i dati che ti servono senza toccare il livello di controllo.'
        },
        {
          id: 'm2u5-q4',
          prompt: 'Un fornitore chiede un accesso permanente per la manutenzione predittiva. Cosa rispondi?',
          options: [
            'Sì, se firma un accordo di riservatezza',
            'No, e proponi di mandare noi i dati verso l\'esterno',
            'Sì, ma solo di notte',
            'Chiedi alla direzione di decidere'
          ],
          correctOption: 1,
          explanation: 'L\'accesso remoto permanente è la porta più usata negli incidenti industriali: si inverte la direzione del flusso.'
        },
        {
          id: 'm2u5-q5',
          prompt: 'Cosa significa "si legge, non si scrive"?',
          options: [
            'Che i dati vanno solo consultati e mai archiviati',
            'Che un progetto di analisi legge dati e non manda comandi alle macchine',
            'Che si usano solo documenti cartacei',
            'Che i registri non vanno modificati'
          ],
          correctOption: 1,
          explanation: 'Leggere è reversibile, scrivere no. È il confine base di ogni primo progetto industriale.'
        },
        {
          id: 'm2u5-q6',
          prompt: 'Cosa sono zone e condotti?',
          options: [
            'Le aree fisiche dello stabilimento',
            'Gruppi di sistemi con la stessa protezione, e i collegamenti permessi fra loro con regole dichiarate',
            'I livelli dello standard ISA-95',
            'Le fasce orarie di manutenzione'
          ],
          correctOption: 1,
          explanation: 'È il linguaggio con cui parlerai con la sicurezza informatica, e usarlo correttamente ti fa guadagnare credibilità subito.'
        },
        {
          id: 'm2u5-q7',
          prompt: 'Perché l\'accesso deve essere a tempo e non permanente?',
          options: [
            'Per risparmiare sulle licenze',
            'Perché una connessione sempre aperta diventa un canale non presidiato verso la fabbrica',
            'Perché lo richiede il fornitore',
            'Perché riduce la latenza'
          ],
          correctOption: 1,
          explanation: 'Approvazione per finestra, sessione registrata, revoca automatica: tre cose semplici da dire e molto convincenti.'
        }
      ],
      sourceIds: ['isa-iec-62443', 'azure-landing-zone']
    }
  ]
}

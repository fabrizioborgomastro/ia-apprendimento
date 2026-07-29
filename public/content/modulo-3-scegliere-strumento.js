const t = (it, en) => ({ it, en })

/**
 * Module 3 - Choosing the tool: rules, analytics, machine learning, optimisation
 * and generative AI. Units 2 and 3 are the two complete stories: the first one
 * ends by scaling, the second one ends by stopping. Every scenario is
 * hypothetical and built on public context.
 * @type {import('../types.js').Lesson}
 */
export const scegliereStrumentoLesson = {
  id: 'scegliere-strumento',
  slug: 'scegliere-strumento',
  moduleNumber: 3,
  durationMinutes: 32,
  title: t('Analytics, automazione e AI: scegliere lo strumento', 'Analytics, automation and AI: choosing the tool'),
  summary: t(
    'La scala degli strumenti dal più semplice al più complesso, due storie complete dall\'inizio alla fine, gli assistenti documentali, e come si dice di no con credibilità.',
    'The ladder of tools from simplest to most complex, two complete stories from start to finish, document assistants, and how to say no with credibility.'
  ),
  units: [
    {
      id: 'scala-strumenti',
      stage: 4,
      estimatedMinutes: 6,
      title: t('Regole, analytics, machine learning, ottimizzazione, AI generativa', 'Rules, analytics, machine learning, optimisation, generative AI'),
      stageLabel: t('Tappa 4 di 7: scelgo lo strumento più semplice che risolve.', 'Step 4 of 7: I pick the simplest tool that solves it.'),
      objective: t(
        'Avere pronta la scala degli strumenti, che risponde da sola a metà delle domande tecniche di un colloquio.',
        'Have the ladder of tools ready, because it answers half the technical questions in an interview on its own.'
      ),
      theory: [
        t(
          'Esiste una scala di strumenti, dal più semplice al più complesso, e si sale un gradino solo quando quello sotto non basta. Sono cinque gradini, e vanno imparati in ordine.',
          'There is a ladder of tools, from simplest to most complex, and you climb a step only when the one below is not enough. There are five steps, and they are worth learning in order.'
        ),
        {
          steps: [
            {
              name: t('Regola fissa, rule', 'Fixed rule'),
              text: t(
                'Se la vibrazione supera 4,5, avvisa. Una condizione scritta da una persona: si spiega in una frase, funziona subito, chiunque capisce perché ha deciso così. Il limite è che non si adatta.',
                'If vibration goes above 4.5, raise a warning. A condition written by a person: explained in one sentence, works straight away, anyone understands why it decided that way. Its limit is that it does not adapt.'
              )
            },
            {
              name: t('Analytics descrittiva', 'Descriptive analytics'),
              text: t(
                'Guardare i dati per capire cosa è successo: un grafico delle tre cause principali di fermo, un confronto fra turni. Non predice, spiega il passato. È il gradino più sottovalutato e quello che risolve più problemi.',
                'Looking at the data to understand what happened: a chart of the top three causes of downtime, a comparison between shifts. It does not predict, it explains the past. It is the most underrated step and the one that solves most problems.'
              )
            },
            {
              name: t('Machine learning', 'Machine learning'),
              text: t(
                'Il computer trova da solo le relazioni nei dati storici e le usa per prevedere. Serve quando la regola non si riesce a scrivere perché dipende da troppe cose insieme. Costo: dati storici di qualità, e nessuno saprà spiegare in una frase perché ha deciso così.',
                'The computer finds relations in historical data by itself and uses them to predict. You need it when the rule cannot be written because it depends on too many things at once. Cost: good historical data, and nobody will explain in one sentence why it decided that way.'
              )
            },
            {
              name: t('Ottimizzazione', 'Optimisation'),
              text: t(
                'Trovare la combinazione migliore fra molte possibili, dati dei vincoli. Non prevede, sceglie: per esempio in che ordine produrre otto articoli per ridurre i cambi formato.',
                'Finding the best combination among many, given the constraints. It does not predict, it picks: for example in which order to run eight products to cut changeovers.'
              )
            },
            {
              name: t('AI generativa', 'Generative AI'),
              text: t(
                'Sistemi che producono testo. Servono quando il materiale di partenza è linguaggio, cioè documenti, procedure, descrizioni scritte a mano. Non servono per prevedere un guasto da una serie di numeri.',
                'Systems that produce text. You need them when the input material is language, that is documents, procedures, hand-written descriptions. You do not need them to predict a failure from a series of numbers.'
              )
            }
          ]
        },
        t(
          'La differenza fra un gradino e il successivo non è solo tecnica, è di costo e di spiegabilità. Ogni gradino aggiunge soldi, fragilità e persone da formare, e toglie la possibilità di spiegare in una frase perché il sistema ha deciso così. In una produzione regolamentata quella frase ha un valore concreto.',
          'The difference between one step and the next is not only technical, it is cost and explainability. Every step adds money, fragility and people to train, and takes away the ability to explain in one sentence why the system decided that way. In regulated manufacturing that sentence has a concrete value.'
        ),
        t(
          'Tieni a mente la tabella delle domande. "Cosa è successo" chiede analytics descrittiva. "Succederà" chiede machine learning. "Qual è la scelta migliore" chiede ottimizzazione. "Cosa dice questo documento" chiede AI generativa. "Quando devo intervenire" chiede una regola, se la soglia è nota. L\'errore più comune, quello che ti fa sembrare inesperto, è salire due gradini per abitudine.',
          'Keep the table of questions in mind. "What happened" asks for descriptive analytics. "Will it happen" asks for machine learning. "What is the best choice" asks for optimisation. "What does this document say" asks for generative AI. "When should I act" asks for a rule, if the threshold is known. The most common mistake, the one that makes you look inexperienced, is climbing two steps out of habit.'
        )
      ],
      keyPoints: [
        t('Si sale di un gradino solo quando quello sotto non basta.', 'You climb a step only when the one below is not enough.'),
        t('Analytics descrittiva è il gradino più sottovalutato e spesso il più redditizio.', 'Descriptive analytics is the most underrated step and often the most profitable.'),
        t('L\'AI generativa serve quando il materiale di partenza è linguaggio.', 'Generative AI is for when the input material is language.')
      ],
      terminology: [
        { id: 'regola', plain: true, term: 'Rule', italian: 'Regola', definition: t('Condizione scritta da una persona: se succede questo, fai quello.', 'A condition written by a person: if this happens, do that.') },
        { id: 'analytics-descrittiva', term: 'Descriptive analytics', italian: 'Analisi descrittiva', definition: t('Guardare i dati per capire cosa è successo, senza prevedere.', 'Looking at data to understand what happened, without predicting.') },
        { id: 'machine-learning', term: 'Machine learning', italian: 'Apprendimento automatico', definition: t('Il computer trova relazioni nei dati storici e le usa per prevedere.', 'The computer finds relations in historical data and uses them to predict.') },
        { id: 'ottimizzazione', term: 'Optimisation', italian: 'Ottimizzazione', definition: t('Trovare la combinazione migliore dati dei vincoli.', 'Finding the best combination given the constraints.') },
        { id: 'ai-generativa', term: 'Generative AI', italian: 'AI generativa', definition: t('Sistemi che producono testo o immagini, utili quando il materiale è linguaggio.', 'Systems that produce text or images, useful when the material is language.') },
        { id: 'modello', plain: true, term: 'Model', italian: 'Modello', definition: t('La formula appresa dai dati che produce una previsione.', 'The formula learned from data that produces a prediction.') },
        { id: 'spiegabilita', term: 'Explainability', italian: 'Spiegabilità', definition: t('Quanto è facile capire perché il sistema ha deciso così.', 'How easy it is to understand why the system decided that way.') }
      ],
      example: {
        title: t('Quattro problemi reali, quattro gradini diversi', 'Four real problems, four different steps'),
        table: {
          columns: [t('Problema', 'Problem'), t('Strumento', 'Tool'), t('Costo', 'Cost')],
          rows: [
            [t('Il motore si surriscalda e non ce ne accorgiamo in tempo', 'The motor overheats and we notice too late'), t('Regola: la soglia di 85 gradi è già nel manuale', 'Rule: the 85 degree threshold is already in the manual'), t('Mezza giornata', 'Half a day')],
            [t('Non sappiamo perché la linea 3 si ferma tanto', 'We do not know why line 3 stops so often'), t('Analytics descrittiva: un grafico delle cause', 'Descriptive analytics: a chart of the causes'), t('Due giorni', 'Two days')],
            [t('Vorremmo sapere in anticipo quando un cuscinetto cede', 'We want to know in advance when a bearing will fail'), t('Machine learning: dipende da vibrazione, temperatura, ore e carico insieme', 'Machine learning: it depends on vibration, temperature, hours and load together'), t('Settimane', 'Weeks')],
            [t('Otto articoli e troppo tempo perso nei cambi formato', 'Eight products and too much time lost in changeovers'), t('Ottimizzazione: le combinazioni possibili sono 40.320', 'Optimisation: there are 40,320 possible combinations'), t('Settimane', 'Weeks')]
          ]
        },
        steps: [
          t('Nel caso 1 chi propone machine learning sta sprecando soldi: la soglia esiste già.', 'In case 1 whoever proposes machine learning is wasting money: the threshold already exists.'),
          t('Nel caso 2 il risultato tipico è che metà dei fermi viene da una causa sola, e si vede in due giorni.', 'In case 2 the typical result is that half the stops come from one cause, and you see it in two days.'),
          t('L\'AI generativa non serve in nessuno dei quattro: servirebbe se il problema fosse trovare la procedura giusta fra 300 documenti.', 'Generative AI fits none of the four: it would fit if the problem were finding the right procedure among 300 documents.')
        ],
        takeaway: t(
          'La frase da colloquio: parto sempre dal gradino più basso, perché nella maggior parte dei casi il valore si prende con analytics descrittiva, dato che quasi sempre il problema è che nessuno aveva ancora guardato i dati.',
          'The interview line: I always start from the lowest step, because most of the value comes from descriptive analytics, since almost always the problem is that nobody had looked at the data yet.'
        )
      },
      englishBlock: {
        lines: [
          'I always start from the simplest thing that works. Very often that is just a chart nobody had looked at before.',
          'If I can write the rule myself, I write the rule. I only use a model when the rule depends on too many things at once.',
          'Generative AI is for language. If the input is documents and text, it fits. If the input is numbers from sensors, machine learning is better and cheaper.',
          'Optimisation does not predict. It picks the best option when there are too many options to try.'
        ],
        why: 'Simplest thing that works, write the rule myself, is for language, picks the best option. Nessun descriptive analytics, nessun combinatorial problem.'
      },
      quiz: [
        {
          id: 'm3u1-q1',
          prompt: 'Qual è la regola generale per scegliere lo strumento?',
          options: [
            'Usare sempre la tecnologia più avanzata disponibile',
            'Salire di un gradino solo quando quello sotto non basta',
            'Scegliere in base al budget',
            'Usare quello che il fornitore propone'
          ],
          correctOption: 1,
          explanation: 'Ogni gradino aggiunge costo, fragilità e persone da formare, quindi va giustificato.',
          final: true
        },
        {
          id: 'm3u1-q2',
          prompt: '"Non sappiamo perché la linea si ferma tanto." Quale strumento?',
          options: ['Machine learning', 'Analytics descrittiva, un grafico delle cause', 'AI generativa', 'Ottimizzazione'],
          correctOption: 1,
          explanation: 'Il gradino più sottovalutato: quasi sempre nessuno aveva ancora guardato i dati aggregati.'
        },
        {
          id: 'm3u1-q3',
          prompt: 'Quando serve davvero il machine learning?',
          options: [
            'Sempre, quando ci sono dati',
            'Quando la regola non si riesce a scrivere perché dipende da troppe cose insieme',
            'Quando serve una risposta veloce',
            'Quando i dati sono pochi'
          ],
          correctOption: 1,
          explanation: 'Se puoi scrivere tu la regola, scrivila: è più economica, più veloce e spiegabile.'
        },
        {
          id: 'm3u1-q4',
          prompt: 'Otto articoli e troppi cambi formato. Quale strumento?',
          options: [
            'Machine learning, per prevedere i cambi',
            'Ottimizzazione, per scegliere la sequenza migliore',
            'AI generativa',
            'Una regola fissa'
          ],
          correctOption: 1,
          explanation: 'L\'ottimizzazione non prevede, sceglie fra molte combinazioni dati dei vincoli.'
        },
        {
          id: 'm3u1-q5',
          prompt: 'Quando è adatta l\'AI generativa?',
          options: [
            'Per prevedere guasti dai dati dei sensori',
            'Quando il materiale di partenza è linguaggio: documenti, procedure, testo',
            'Per ottimizzare la produzione',
            'Per calcolare l\'OEE'
          ],
          correctOption: 1,
          explanation: 'Sui numeri dei sensori il machine learning è più preciso e più economico.'
        },
        {
          id: 'm3u1-q6',
          prompt: 'Qual è l\'errore che fa sembrare inesperti?',
          options: [
            'Proporre soluzioni troppo semplici',
            'Salire due gradini per abitudine, per esempio AI generativa per un problema di soglia',
            'Chiedere troppi dati',
            'Coinvolgere troppe funzioni'
          ],
          correctOption: 1,
          explanation: 'Chi propone la tecnologia più avanzata a prescindere dal problema mostra di non aver mai gestito un budget.'
        },
        {
          id: 'm3u1-q7',
          prompt: 'Cosa si perde salendo dalla regola al machine learning?',
          options: [
            'Niente, si guadagna solo precisione',
            'La spiegabilità: nessuno saprà dire in una frase perché ha deciso così',
            'La velocità di risposta',
            'La possibilità di usare i dati storici'
          ],
          correctOption: 1,
          explanation: 'In un contesto regolamentato la spiegabilità ha un valore concreto, non teorico.'
        }
      ],
      sourceIds: ['nist-ai-rmf-1-0', 'nist-engineering-statistics']
    },

    {
      id: 'storia-manutenzione',
      stage: 5,
      estimatedMinutes: 7,
      title: t('Storia completa 1: la manutenzione predittiva', 'Complete story 1: predictive maintenance'),
      stageLabel: t('Tutte e sette le tappe: è il racconto da usare a colloquio.', 'All seven steps: this is the story to use in an interview.'),
      objective: t(
        'Avere in testa una storia completa con numeri veri, dall\'osservazione alla decisione di estendere.',
        'Have one complete story with real numbers in your head, from the first observation to the decision to scale.'
      ),
      theory: [
        t(
          'Segui il caso dall\'inizio alla fine. Ogni tappa ha il suo nome, gli stessi nomi di sempre: è la storia che userai per rispondere alla domanda "descrivi un processo di trasformazione digitale".',
          'Follow the case from start to finish. Every step has its own name, always the same names: this is the story you will use to answer "describe a digital transformation process".'
        ),
        {
          steps: [
            {
              name: t('Osservo', 'I watch'),
              text: t(
                'Passo due turni sulla linea 3. Quando la linea si ferma l\'operatore chiama il manutentore, il manutentore arriva dopo venti minuti, diagnostica e va a prendere il pezzo. Nel frattempo la linea è ferma.',
                'I spend two shifts on line 3. When the line stops the operator calls the technician, the technician arrives twenty minutes later, diagnoses and goes to fetch the part. Meanwhile the line is down.'
              )
            },
            {
              name: t('Misuro', 'I measure'),
              text: t(
                'Baseline su quattro settimane: 6 ore di fermo a settimana. A 900 euro l\'ora il problema vale circa 280.000 euro l\'anno, e il capo reparto firma quel numero prima che si inizi.',
                'Baseline over four weeks: 6 hours of downtime a week. At 900 euros an hour the problem is worth about 280,000 euros a year, and the area manager signs that number before we start.'
              )
            },
            {
              name: t('Capisco', 'I understand'),
              text: t(
                'I fermi sono già registrati nel MES ma nessuno li guarda aggregati: 3 ore su 6 vengono da un solo gruppo meccanico. I dati di vibrazione esistono da tre anni. Scopro anche che due orologi sono sfasati di 40 secondi, e sistemo prima quello.',
                'The stops are already recorded in the MES but nobody looks at them together: 3 hours out of 6 come from one mechanical group. Vibration data exists for three years. I also find two clocks 40 seconds apart, and I fix that first.'
              )
            },
            {
              name: t('Scelgo', 'I choose'),
              text: t(
                'Non parto dal machine learning: parto da un grafico settimanale delle tre cause principali con un responsabile assegnato. I fermi scendono da 6 a 4,8 ore, cioè 56.000 euro l\'anno con due giorni di lavoro. Restano i cedimenti del cuscinetto: lì sì, un modello.',
                'I do not start from machine learning: I start from a weekly chart of the top three causes with an owner assigned. Downtime drops from 6 to 4.8 hours, that is 56,000 euros a year with two days of work. Bearing failures remain: there, a model fits.'
              )
            },
            {
              name: t('Provo in ombra', 'I try it in the shadow'),
              text: t(
                'Sei settimane in modalità ombra: il modello registra la previsione, nessuno la vede, in linea non cambia niente. Su 11 cedimenti reali ne anticipa 8 con due giorni di margine, con 5 falsi allarmi. Il conto torna: 2,5 ore di controlli inutili contro oltre 5 ore di fermate evitate.',
                'Six weeks in shadow mode: the model records its prediction, nobody sees it, nothing changes on the line. Out of 11 real failures it flags 8 with two days of margin, with 5 false alarms. The maths works: 2.5 hours of useless checks against over 5 hours of stops avoided.'
              )
            },
            {
              name: t('Metto in produzione', 'I go live'),
              text: t(
                'Tre reti di sicurezza: l\'avviso va al pianificatore e non alla macchina, la ronda programmata resta come prima se il modello non risponde, e il responsabile manutenzione della linea 3 risponde del funzionamento.',
                'Three safety nets: the alert goes to the planner and not to the machine, the planned round stays as before if the model does not answer, and the maintenance supervisor of line 3 answers for it.'
              )
            },
            {
              name: t('Decido', 'I decide'),
              text: t(
                'Dopo tre mesi i fermi sono a 3,9 ore contro le 6 di partenza. Estendo alle linee 1 e 2, che hanno lo stesso gruppo meccanico. Non alle linee 4 e 5, di un altro costruttore: lì il caso va rifatto.',
                'After three months downtime is at 3.9 hours against the 6 we started from. I scale to lines 1 and 2, which have the same mechanical group. Not to lines 4 and 5, from another manufacturer: there the case has to be rebuilt.'
              )
            }
          ]
        },
        t(
          'Guarda la proporzione, perché è il dato che rende credibile tutto il metodo: il 57 percento del recupero è arrivato dal gradino più basso, con due giorni di lavoro e zero rischio. Il machine learning ha aggiunto il resto, con settimane di lavoro.',
          'Look at the proportion, because it is the number that makes the whole method credible: 57 percent of the recovery came from the lowest step, with two days of work and zero risk. Machine learning added the rest, with weeks of work.'
        ),
        t(
          'E nota cosa non è mai stato fatto: nessun sistema ferma una macchina, nessuna previsione entra nel controllo in tempo reale, e il primo intervento non ha richiesto nessun modello. Sono le tre cose che a colloquio ti fanno sembrare uno che ha lavorato in produzione.',
          'And note what was never done: no system stops a machine, no prediction enters real-time control, and the first fix required no model at all. Those are the three things that make you sound like someone who has worked in production.'
        )
      ],
      keyPoints: [
        t('Il 57 percento del risultato è arrivato dal gradino più basso, in due giorni.', '57 percent of the result came from the lowest step, in two days.'),
        t('Un modello si giudica confrontando il costo dei falsi allarmi con il valore delle fermate evitate.', 'A model is judged by comparing the cost of false alarms with the value of the stops avoided.'),
        t('L\'avviso va a una persona che pianifica, mai alla macchina.', 'The alert goes to a person who plans, never to the machine.')
      ],
      terminology: [
        { id: 'manutenzione-predittiva', term: 'Predictive maintenance', italian: 'Manutenzione predittiva', definition: t('Intervenire prima del guasto, sulla base di segnali che lo anticipano.', 'Acting before the failure, based on signals that anticipate it.') },
        { id: 'manutenzione-preventiva', term: 'Preventive maintenance', italian: 'Manutenzione preventiva', definition: t('Intervenire a intervalli fissi, indipendentemente dallo stato reale.', 'Acting at fixed intervals, regardless of the real condition.') },
        { id: 'falso-allarme', term: 'False alarm', italian: 'Falso allarme', definition: t('Il sistema segnala un problema che non c\'era.', 'The system flags a problem that was not there.') },
        { id: 'mancata-segnalazione', term: 'Missed detection', italian: 'Mancata segnalazione', definition: t('Il problema c\'era e il sistema non lo ha segnalato.', 'The problem was there and the system did not flag it.') },
        { id: 'modo-di-guasto', term: 'Failure mode', italian: 'Modo di guasto', definition: t('Il modo specifico in cui un componente si rompe.', 'The specific way a component breaks.') },
        { id: 'finestra-anticipo', term: 'Lead time', italian: 'Finestra di anticipo', definition: t('Quanto tempo prima arriva l\'avviso: se è troppo poco, non serve a niente.', 'How long before the event the warning arrives: too short and it is useless.') }
      ],
      example: {
        title: t('Il conto economico completo della storia', 'The full economics of the story'),
        table: {
          columns: [t('Voce', 'Item'), t('Valore', 'Value')],
          rows: [
            [t('Fermo di partenza', 'Starting downtime'), t('6 ore a settimana', '6 hours a week')],
            [t('Costo di un\'ora di fermo', 'Cost of one hour of downtime'), t('900 euro', '900 euros')],
            [t('Perdita annua di partenza', 'Starting annual loss'), t('circa 280.000 euro', 'about 280,000 euros')],
            [t('Dopo il solo grafico, 2 giorni di lavoro', 'After the chart alone, 2 days of work'), t('4,8 ore a settimana', '4.8 hours a week')],
            [t('Dopo il modello, 3 mesi', 'After the model, 3 months'), t('3,9 ore a settimana', '3.9 hours a week')],
            [t('Recupero annuo totale', 'Total annual recovery'), t('circa 98.000 euro', 'about 98,000 euros')]
          ]
        },
        steps: [
          t('Del recupero totale, circa 56.000 euro vengono dal solo grafico settimanale.', 'Of the total recovery, about 56,000 euros come from the weekly chart alone.'),
          t('Il 57 percento del risultato è arrivato dal gradino più basso, con due giorni di lavoro e zero rischio.', '57 percent of the result came from the lowest step, with two days of work and zero risk.'),
          t('Il machine learning ha aggiunto il resto, con settimane di lavoro e dati storici di qualità.', 'Machine learning added the rest, with weeks of work and good historical data.')
        ],
        takeaway: t(
          'È il numero che rende credibile la frase "parto sempre dallo strumento più semplice": non è una posizione di principio, è un fatto misurato.',
          'This is the number that makes "I always start from the simplest tool" credible: it is not a matter of principle, it is a measured fact.'
        )
      },
      englishBlock: {
        lines: [
          'We were losing six hours a week on that line. At nine hundred euros an hour, that is about two hundred and eighty thousand a year.',
          'Half of it came from one mechanical group. Nobody had looked at the data together before.',
          'So the first thing was just a weekly chart with an owner. That alone took it from six hours to four point eight, in two days of work.',
          'We ran the model in the shadow for six weeks. It caught eight failures out of eleven, with five false alarms. The maths still worked.',
          'The alert goes to the maintenance planner, not to the machine. Nothing stops on its own.'
        ],
        why: 'Numeri detti a voce, verbi semplici come caught, ran, added, e la frase finale corta che chiude la questione sicurezza: nothing stops on its own.'
      },
      quiz: [
        {
          id: 'm3u2-q1',
          prompt: 'Quale tappa ha prodotto il maggior risultato per euro speso?',
          options: [
            'Il modello di machine learning',
            'Il grafico settimanale delle cause, con due giorni di lavoro',
            'La sincronizzazione degli orologi',
            'L\'estensione ad altre linee'
          ],
          correctOption: 1,
          explanation: 'Il 57 percento del recupero è venuto dal gradino più basso, ed è il dato che rende credibile tutto il metodo.',
          final: true
        },
        {
          id: 'm3u2-q2',
          prompt: 'Il modello ha anticipato 8 cedimenti su 11 con 5 falsi allarmi. Come si giudica?',
          options: [
            'Male, 5 falsi allarmi sono troppi',
            'Confrontando il costo dei falsi allarmi con il valore delle fermate evitate',
            'Bene, perché supera il 70 percento',
            'Non si può giudicare senza più dati'
          ],
          correctOption: 1,
          explanation: '2,5 ore di controlli inutili contro oltre 5 ore di fermate evitate. Il conto si fa, non si intuisce.'
        },
        {
          id: 'm3u2-q3',
          prompt: 'Perché l\'avviso va al pianificatore e non alla macchina?',
          options: [
            'Perché la macchina non è collegata',
            'Perché una previsione probabilistica non deve fermare nulla da sola',
            'Perché il pianificatore lo ha richiesto',
            'Per ridurre i costi'
          ],
          correctOption: 1,
          explanation: 'È la regola che ti farà sempre fare bella figura: il sistema propone, la persona decide.'
        },
        {
          id: 'm3u2-q4',
          prompt: 'Che cos\'è la finestra di anticipo e perché conta?',
          options: [
            'Il tempo di elaborazione del modello',
            'Quanto tempo prima arriva l\'avviso: se è inferiore al tempo di reazione reale non serve a niente',
            'La durata del periodo di prova',
            'L\'intervallo fra due manutenzioni'
          ],
          correctOption: 1,
          explanation: 'Un avviso a due ore è inutile se il pezzo di ricambio arriva in due giorni.'
        },
        {
          id: 'm3u2-q5',
          prompt: 'Perché il progetto non è stato esteso alle linee 4 e 5?',
          options: [
            'Per mancanza di budget',
            'Perché hanno macchine di un altro costruttore e il modello andrebbe rifatto',
            'Perché non avevano fermi',
            'Perché la direzione non ha approvato'
          ],
          correctOption: 1,
          explanation: 'Estendere dove il contesto è diverso significa rifare il progetto, non copiarlo.'
        },
        {
          id: 'm3u2-q6',
          prompt: 'Nella tappa "capisco" è emerso un problema tecnico. Quale?',
          options: [
            'I sensori erano rotti',
            'Gli orologi di due sistemi erano sfasati di 40 secondi',
            'Mancavano i dati di vibrazione',
            'Il sistema di manutenzione era obsoleto'
          ],
          correctOption: 1,
          explanation: 'Con gli orologi sfasati il guasto sembra avvenire prima del segnale che lo causa.'
        },
        {
          id: 'm3u2-q7',
          prompt: 'Che differenza c\'è tra manutenzione preventiva e predittiva?',
          options: [
            'Nessuna',
            'La preventiva interviene a intervalli fissi, la predittiva sulla base di segnali che anticipano il guasto',
            'La preventiva è più costosa',
            'La predittiva si fa solo sulle macchine nuove'
          ],
          correctOption: 1,
          explanation: 'La preventiva sostituisce pezzi ancora buoni. La predittiva interviene quando serve, se i segnali ci sono.'
        }
      ],
      sourceIds: ['nist-engineering-statistics', 'aws-mlops-planning']
    },

    {
      id: 'storia-qualita',
      stage: 7,
      estimatedMinutes: 7,
      title: t('Storia completa 2: qualità e difetti, e perché ci si ferma', 'Complete story 2: quality and defects, and why you stop'),
      stageLabel: t('Tutte e sette le tappe: questa storia finisce con uno stop.', 'All seven steps: this story ends with a stop.'),
      objective: t(
        'Saper spiegare precisione e richiamo, e saper motivare una decisione di non estendere.',
        'Be able to explain precision and recall, and to justify a decision not to scale.'
      ),
      theory: [
        t(
          'Seconda storia, stesse sette tappe, finale diverso: questa volta si decide di non estendere. È la storia che a colloquio ti fa sembrare uno che questo mestiere lo ha fatto davvero.',
          'Second story, the same seven steps, a different ending: this time the decision is not to scale. This is the story that makes you sound like someone who has really done this job.'
        ),
        {
          steps: [
            {
              name: t('Osservo', 'I watch'),
              text: t(
                'Un formato nuovo, lanciato da due mesi, produce più scarto del previsto. In reparto si dice che sembra andare meglio da quando è cambiato il fornitore del film.',
                'A new format, launched two months ago, scraps more than expected. On the floor people say it seems better since the film supplier changed.'
              )
            },
            {
              name: t('Misuro', 'I measure'),
              text: t(
                'Scarto al 2,3 percento contro uno standard aziendale dello 0,8. Su 3 milioni di pezzi al mese la differenza è 45.000 pezzi scartati in più.',
                'Scrap at 2.3 percent against a company standard of 0.8. On 3 million units a month the difference is 45,000 extra units scrapped.'
              )
            },
            {
              name: t('Capisco', 'I understand'),
              text: t(
                'Il dato di scarto è collegato al lotto, buona notizia. Analizzandolo: lo scarto è concentrato nel turno di notte, 3,4 percento contro 1,7, e su un solo formato su sei. Nessuno lo aveva notato perché in riunione si guardava la media mensile.',
                'The scrap data is linked to the batch, good news. Analysing it: scrap is concentrated on the night shift, 3.4 percent against 1.7, and on one format out of six. Nobody had noticed because meetings looked at the monthly average.'
              )
            },
            {
              name: t('Scelgo', 'I choose'),
              text: t(
                'Prima il gradino più basso: una regola che avvisa se la temperatura di saldatura esce da una banda stretta su quel formato. Lo scarto scende da 2,3 a 1,6. Non basta, perché lo standard è 0,8, e il difetto residuo è visivo: serve un controllo visivo automatico.',
                'First the lowest step: a rule that warns if the sealing temperature leaves a narrow band on that format. Scrap drops from 2.3 to 1.6. Not enough, because the standard is 0.8, and the remaining defect is visual: automated visual inspection is needed.'
              )
            },
            {
              name: t('Provo in ombra', 'I try it in the shadow'),
              text: t(
                'Otto settimane: il sistema fotografa e giudica ma non scarta niente, un controllore qualificato rivede tutte le segnalazioni. Precisione 60 percento, 96 su 160 segnalazioni erano difetti veri. Richiamo 80 percento, 96 su 120 difetti trovati.',
                'Eight weeks: the system photographs and judges but rejects nothing, a qualified inspector reviews every flag. Precision 60 percent, 96 out of 160 flags were real defects. Recall 80 percent, 96 out of 120 defects found.'
              )
            },
            {
              name: t('Metto in produzione', 'I go live'),
              text: t(
                'Modalità consultiva su un solo formato: il sistema segnala, una persona guarda e decide. Nessuno scarto automatico, perché scartare è una decisione di conformità.',
                'Advisory mode on one format only: the system flags, a person looks and decides. No automatic rejection, because rejecting is a compliance decision.'
              )
            },
            {
              name: t('Decido: mi fermo', 'I decide: I stop'),
              text: t(
                'Le segnalazioni sono 160 in otto settimane su un turno. A sei formati e tre turni diventerebbero 3.600, cioè 75 al giorno, contro una capacità di revisione di circa 30. Non estendo: prima alzo la precisione dal 60 ad almeno il 75 percento.',
                'The flags are 160 in eight weeks on one shift. At six formats and three shifts they would become 3,600, that is 75 a day, against a review capacity of about 30. I do not scale: first I raise precision from 60 to at least 75 percent.'
              )
            }
          ]
        },
        t(
          'Il punto della storia è tutto nell\'ultima tappa. Se estendo, succede una cosa prevedibile: la coda cresce, le persone iniziano a confermare senza guardare, e la supervisione umana diventa finta. A quel punto il rischio è più alto di prima, non più basso.',
          'The point of the story is all in the last step. If I scale, something predictable happens: the queue grows, people start confirming without looking, and human oversight becomes fake. At that point the risk is higher than before, not lower.'
        ),
        t(
          'E c\'è una tentazione da riconoscere: alzare la soglia per ridurre i falsi allarmi. Sembra un miglioramento, ma sposta il costo su un errore molto più caro, il difetto che arriva al cliente. I due errori non costano uguale, quindi prima di toccare una soglia guardo quale dei due mi sto comprando.',
          'And there is a temptation to recognise: raising the threshold to cut false alarms. It looks like an improvement, but it moves the cost onto a far more expensive error, the defect that reaches the customer. The two errors do not cost the same, so before touching a threshold I look at which one I am buying.'
        )
      ],
      keyPoints: [
        t('Le medie nascondono: il problema era un turno e un formato, non la linea.', 'Averages hide things: the problem was one shift and one format, not the line.'),
        t('Precisione guarda le segnalazioni, richiamo guarda i difetti veri.', 'Precision looks at the flags, recall looks at the real defects.'),
        t('Se la coda supera la capacità di revisione, la supervisione umana è finta.', 'If the queue exceeds review capacity, human oversight is fake.')
      ],
      terminology: [
        { id: 'precisione', term: 'Precision', italian: 'Precisione', definition: t('Di tutto ciò che il sistema segnala, quanto era davvero un problema.', 'Of everything the system flags, how much really was a problem.') },
        { id: 'richiamo', term: 'Recall', italian: 'Richiamo', definition: t('Di tutti i problemi veri, quanti il sistema ne ha trovati.', 'Of all the real problems, how many the system found.') },
        { id: 'falso-positivo', term: 'False positive', italian: 'Falso positivo', definition: t('Il sistema segnala un pezzo buono.', 'The system flags a good part.') },
        { id: 'falso-negativo', term: 'False negative', italian: 'Falso negativo', definition: t('Il sistema non segnala un pezzo difettoso.', 'The system fails to flag a defective part.') },
        { id: 'controllo-visivo-automatico', term: 'Machine vision', italian: 'Controllo visivo automatico', definition: t('Un modello che giudica immagini al posto dell\'occhio umano.', 'A model that judges images in place of the human eye.') },
        { id: 'capacita-revisione', term: 'Review capacity', italian: 'Capacità di revisione', definition: t('Quante segnalazioni una persona riesce davvero a controllare in un turno.', 'How many flags a person can really check in one shift.') }
      ],
      example: {
        title: t('Il compromesso fra precisione e richiamo', 'The trade-off between precision and recall'),
        table: {
          columns: [t('Soglia', 'Threshold'), t('Precisione', 'Precision'), t('Richiamo', 'Recall'), t('Conseguenza', 'Consequence')],
          rows: [
            [t('Attuale', 'Current'), t('60%', '60%'), t('80%', '80%'), t('4 segnalazioni su 10 inutili, ma 8 difetti su 10 trovati', '4 flags out of 10 useless, but 8 defects out of 10 found')],
            [t('Più alta', 'Higher'), t('78%', '78%'), t('61%', '61%'), t('Meno tempo perso, ma 4 difetti su 10 arrivano al cliente', 'Less time wasted, but 4 defects out of 10 reach the customer')]
          ]
        },
        steps: [
          t('Alzare la soglia sembra un miglioramento perché la precisione sale dal 60 al 78 percento.', 'Raising the threshold looks like an improvement because precision rises from 60 to 78 percent.'),
          t('Non lo è: sposta il costo su un errore molto più caro, cioè il difetto che arriva al cliente.', 'It is not: it moves the cost onto a much more expensive error, the defect that reaches the customer.'),
          t('Un falso allarme costa mezz\'ora a un controllore, un difetto sfuggito costa un reclamo, un blocco lotto e la fiducia.', 'A false alarm costs an inspector half an hour, a missed defect costs a complaint, a lot on hold and trust.')
        ],
        takeaway: t(
          'La frase da colloquio: i due errori non costano uguale, quindi prima di toccare una soglia guardo quale dei due mi sto comprando.',
          'The interview line: the two errors do not cost the same, so before I touch a threshold I look at which one I am buying.'
        )
      },
      englishBlock: {
        lines: [
          'The scrap rate was two point three percent, against a standard of zero point eight.',
          'The average was hiding it. It was one shift and one format, not the whole line.',
          'The system finds eight defects out of ten, but four out of ten alerts are false. So people lose some time.',
          'We could raise the threshold and get fewer false alerts. But then four defects out of ten reach the customer. That is a much more expensive mistake.',
          'So we did not scale it. First we make it more precise, then we talk again.'
        ],
        why: 'The average was hiding it, reach the customer, a much more expensive mistake, then we talk again. L\'ultima frase dice no senza chiudere la porta.'
      },
      quiz: [
        {
          id: 'm3u3-q1',
          prompt: 'Perché nessuno si era accorto del problema?',
          options: [
            'Perché i dati non c\'erano',
            'Perché il numero riportato era la media di tutti i turni e formati, che nascondeva la concentrazione',
            'Perché il formato era nuovo',
            'Perché il controllo qualità era assente'
          ],
          correctOption: 1,
          explanation: 'Le medie nascondono: è lo stesso principio dell\'OEE nel Modulo 1.',
          final: true
        },
        {
          id: 'm3u3-q2',
          prompt: 'Cosa significa che la precisione è 60 percento?',
          options: [
            'Che trova il 60 percento dei difetti',
            'Che di tutti i pezzi segnalati, il 60 percento era davvero difettoso',
            'Che sbaglia il 60 percento delle volte',
            'Che è affidabile al 60 percento'
          ],
          correctOption: 1,
          explanation: 'Precisione guarda le segnalazioni. Richiamo guarda i difetti veri.'
        },
        {
          id: 'm3u3-q3',
          prompt: 'Cosa significa che il richiamo è 80 percento?',
          options: [
            'Che l\'80 percento delle segnalazioni è corretto',
            'Che di tutti i difetti veri, il sistema ne trova l\'80 percento',
            'Che funziona l\'80 percento del tempo',
            'Che l\'80 percento dei pezzi è buono'
          ],
          correctOption: 1,
          explanation: 'Un difetto su cinque gli sfugge, ed è il numero che interessa alla qualità.'
        },
        {
          id: 'm3u3-q4',
          prompt: 'Alzare la soglia porta precisione 78 e richiamo 61. È un miglioramento?',
          options: [
            'Sì, la precisione è più alta',
            'No: sposta il costo su un errore più caro, i difetti che arrivano al cliente',
            'Sì, se il cliente non se ne accorge',
            'Dipende dal budget'
          ],
          correctOption: 1,
          explanation: 'I due errori non costano uguale: prima di toccare una soglia guarda quale dei due ti stai comprando.'
        },
        {
          id: 'm3u3-q5',
          prompt: 'Perché la storia si ferma prima di estendere?',
          options: [
            'Per mancanza di fondi',
            'Perché a regime servirebbero 75 revisioni al giorno contro una capacità di 30',
            'Perché il modello non funziona',
            'Perché il formato è stato ritirato'
          ],
          correctOption: 1,
          explanation: 'Se la coda supera la capacità, le persone confermano senza guardare e la supervisione diventa finta.'
        },
        {
          id: 'm3u3-q6',
          prompt: 'Perché il sistema non scarta automaticamente i pezzi?',
          options: [
            'Perché è troppo lento',
            'Perché scartare è una decisione di conformità, e resta di una persona',
            'Perché non è collegato alla linea',
            'Perché costerebbe troppo'
          ],
          correctOption: 1,
          explanation: 'È lo stesso cancello non negoziabile del Modulo 1: il sistema propone, la persona decide.'
        },
        {
          id: 'm3u3-q7',
          prompt: 'Qual è stato il primo intervento, prima del modello?',
          options: [
            'Cambiare il fornitore del film',
            'Una regola sulla temperatura di saldatura, che ha portato lo scarto da 2,3 a 1,6',
            'Fermare la produzione del formato',
            'Aumentare i controlli manuali'
          ],
          correctOption: 1,
          explanation: 'Anche qui il gradino più basso ha preso la maggior parte del risultato prima del modello.'
        }
      ],
      sourceIds: ['nist-engineering-statistics', 'eu-ai-act']
    },

    {
      id: 'rag-assistenti',
      stage: 4,
      estimatedMinutes: 6,
      title: t('RAG e assistenti AI in azienda: quando aiutano davvero', 'RAG and AI assistants at work: when they really help'),
      stageLabel: t('Tappa 4 di 7: il gradino più alto della scala.', 'Step 4 of 7: the highest step on the ladder.'),
      objective: t(
        'Saper spiegare cos\'è un modello linguistico e perché la versione valida del documento è il vero problema.',
        'Be able to explain what a language model is and why the valid document version is the real problem.'
      ),
      theory: [
        t(
          'Un LLM, Large Language Model, modello linguistico di grandi dimensioni, fa una cosa sola: prevede la parola successiva più probabile, una alla volta. Ha visto enormi quantità di testo e ha imparato quali parole seguono quali altre. Da questa frase discende tutto ciò che devi sapere.',
          'An LLM, Large Language Model, does one thing: it predicts the most likely next word, one at a time. It has seen huge amounts of text and learned which words follow which. Everything you need to know follows from that sentence.'
        ),
        t(
          'Primo: non sa se una cosa è vera, sa cosa è probabile. Per questo può scrivere con sicurezza qualcosa di sbagliato, e si chiama allucinazione: non è un difetto da correggere, è come funziona. Secondo: non sa cosa succede nella tua azienda, perché la tua azienda non era nel testo su cui ha imparato. Il secondo punto è il problema pratico da risolvere.',
          'First: it does not know whether something is true, it knows what is likely. That is why it can confidently write something wrong, and this is called hallucination: it is not a bug to fix, it is how it works. Second: it knows nothing about your company, because your company was not in the text it learned from. The second point is the practical problem to solve.'
        ),
        t(
          'Qui entra RAG, Retrieval Augmented Generation, generazione con recupero di documenti. In una frase: prima cerco il documento giusto, poi chiedo al modello di rispondere usando solo quello, citando da dove ha preso la risposta. Non è magia, sono quattro passi.',
          'This is where RAG comes in, Retrieval Augmented Generation. In one sentence: first I find the right document, then I ask the model to answer using only that, quoting where the answer came from. It is not magic, it is four steps.'
        ),
        {
          steps: [
            { name: t('Controllo chi sei', 'Check who you are'), text: t('Quali documenti hai il diritto di vedere, secondo i permessi di accesso già esistenti.', 'Which documents you are allowed to see, according to the access rights that already exist.') },
            { name: t('Cerco fra i documenti autorizzati', 'Search the allowed documents'), text: t('Solo quelli che riguardano la domanda, e solo quelli che puoi vedere tu.', 'Only those that concern the question, and only those you are allowed to see.') },
            { name: t('Verifico la versione valida oggi', 'Check the version valid today'), text: t('È il passo che nessuno considera, ed è il più importante in una produzione regolamentata.', 'It is the step nobody considers, and the most important one in regulated manufacturing.') },
            { name: t('Genero la risposta con la citazione', 'Generate the answer with the citation'), text: t('Il modello risponde solo su quei documenti, e mostra il riferimento apribile con un clic.', 'The model answers only from those documents, and shows the reference, openable with one click.') }
          ]
        },
        t(
          'Il terzo passo è quello che nessuno considera e che in una produzione regolamentata è il più importante. Un assistente che risponde con la procedura sbagliata perché superata è peggio di nessun assistente, perché è convincente. E la versione valida oggi non è un dettaglio tecnico: è una questione di conformità.',
          'The third step is the one nobody considers and the most important one in regulated manufacturing. An assistant that answers with the wrong procedure because it is out of date is worse than no assistant at all, because it is convincing. And the version valid today is not a technical detail: it is a compliance matter.'
        ),
        t(
          'E gli agenti? Un agente è un sistema che sceglie ripetutamente cosa fare dopo, invece di eseguire passi fissi. Serve quando il percorso di indagine cambia ogni volta. Se i passi sono sempre gli stessi, un flusso fisso è più controllabile e costa meno. La frase da avere pronta: se so scrivere i passi in anticipo, non mi serve un agente.',
          'And agents? An agent is a system that repeatedly chooses what to do next, instead of running fixed steps. You need one when the path of the investigation changes every time. If the steps are always the same, a fixed flow is easier to control and cheaper. The line to have ready: if I can write the steps in advance, I do not need an agent.'
        )
      ],
      keyPoints: [
        t('Un modello linguistico prevede la parola successiva, non verifica la verità.', 'A language model predicts the next word, it does not check truth.'),
        t('RAG significa prima cercare il documento giusto, poi rispondere solo su quello con la citazione.', 'RAG means finding the right document first, then answering only from it with a citation.'),
        t('Se sai scrivere i passi in anticipo, non ti serve un agente.', 'If you can write the steps in advance, you do not need an agent.')
      ],
      terminology: [
        { id: 'llm', term: 'LLM', italian: 'Modello linguistico', definition: t('Sistema che prevede la parola successiva più probabile, addestrato su moltissimo testo.', 'A system that predicts the most likely next word, trained on very large amounts of text.') },
        { id: 'allucinazione', term: 'Hallucination', italian: 'Allucinazione', definition: t('Quando il modello scrive con sicurezza qualcosa che non è vero.', 'When the model confidently writes something that is not true.') },
        { id: 'rag', term: 'RAG', italian: 'Generazione con recupero', definition: t('Cercare prima i documenti giusti e far rispondere il modello solo su quelli, con citazione.', 'Finding the right documents first and letting the model answer only from them, with a citation.') },
        { id: 'citazione', plain: true, term: 'Citation', italian: 'Citazione', definition: t('Il riferimento al documento da cui viene la risposta, apribile per verificare.', 'The reference to the document the answer came from, openable to check.') },
        { id: 'versione-effettiva', term: 'Effective version', italian: 'Versione effettiva', definition: t('La revisione del documento valida oggi, distinta da quelle superate.', 'The revision of the document that is valid today, as opposed to superseded ones.') },
        { id: 'acl', term: 'ACL', italian: 'Permessi di accesso', definition: t('Le regole che dicono chi può vedere quale documento.', 'The rules that say who can see which document.') },
        { id: 'agente', term: 'Agent', italian: 'Agente', definition: t('Sistema che sceglie ripetutamente l\'azione successiva invece di seguire passi fissi.', 'A system that repeatedly chooses the next action instead of following fixed steps.') }
      ],
      example: {
        title: t('Prima di costruire l\'assistente, verifica i documenti', 'Before building the assistant, check the documents'),
        table: {
          columns: [t('Verifica su 50 documenti', 'Check on 50 documents'), t('Risultato', 'Result')],
          rows: [
            [t('Hanno un testo cercabile?', 'Do they have searchable text?'), t('38 su 50: dodici sono scansioni senza testo', '38 out of 50: twelve are scans with no text')],
            [t('Hanno la revisione dichiarata?', 'Do they state their revision?'), t('41 su 50', '41 out of 50')],
            [t('Hanno l\'ambito di applicazione?', 'Do they state where they apply?'), t('22 su 50', '22 out of 50')]
          ]
        },
        steps: [
          t('Gli ispettori perdono in media 12 minuti per trovare il criterio di accettazione corretto fra centinaia di documenti.', 'Inspectors lose on average 12 minutes finding the right acceptance criterion among hundreds of documents.'),
          t('Verdetto: il problema non è la ricerca, è lo stato dei documenti. Il primo progetto è sistemare revisione e ambito.', 'Verdict: the problem is not the search, it is the state of the documents. The first project is fixing revision and scope.'),
          t('Dopo due mesi il tempo scende da 12 a 6 minuti, ma solo il 20 percento delle persone apre la citazione prima di confermare.', 'After two months the time drops from 12 to 6 minutes, but only 20 percent of people open the citation before confirming.')
        ],
        takeaway: t(
          'Il sistema non viene esteso: la supervisione è formale, non reale, e un risultato buono con una supervisione finta è un rischio, non un successo.',
          'The system is not scaled: oversight is formal, not real, and a good result with fake oversight is a risk, not a success.'
        )
      },
      englishBlock: {
        lines: [
          'A language model predicts the next word. It does not know if something is true, and it does not know anything about our company.',
          'So we do it the other way around. First we find the right document, then we ask the model to answer only from that document, and we show where it came from.',
          'The hard part is not the model. The hard part is knowing which version of the document is valid today.',
          'An assistant that confidently gives you an old procedure is worse than no assistant at all.'
        ],
        why: 'Predicts the next word, the other way around, which version is valid today, worse than no assistant at all. L\'ultima frase è quella che ricorderanno.'
      },
      quiz: [
        {
          id: 'm3u4-q1',
          prompt: 'Che cosa fa esattamente un modello linguistico?',
          options: [
            'Cerca informazioni su internet',
            'Prevede la parola successiva più probabile',
            'Ragiona come una persona',
            'Consulta un archivio di fatti verificati'
          ],
          correctOption: 1,
          explanation: 'Da questa frase discende tutto: non sa se una cosa è vera, sa cosa è probabile.',
          final: true
        },
        {
          id: 'm3u4-q2',
          prompt: 'Che cos\'è RAG in una frase?',
          options: [
            'Un modello più potente',
            'Cercare prima il documento giusto e far rispondere il modello solo su quello, con citazione',
            'Un sistema di ricerca aziendale',
            'Un modo per addestrare il modello sui dati aziendali'
          ],
          correctOption: 1,
          explanation: 'Non è addestramento: è recupero prima e generazione dopo.'
        },
        {
          id: 'm3u4-q3',
          prompt: 'Qual è il passo che quasi nessuno considera?',
          options: [
            'La velocità di risposta',
            'Verificare che il documento sia la versione valida oggi',
            'La scelta del modello',
            'Il costo per domanda'
          ],
          correctOption: 1,
          explanation: 'Un assistente che cita una procedura superata è peggio di nessun assistente, perché è convincente.'
        },
        {
          id: 'm3u4-q4',
          prompt: 'Nell\'esempio, cosa emerge dalla verifica sui 50 documenti?',
          options: [
            'Che i documenti sono a posto',
            'Che il problema non è la ricerca ma lo stato dei documenti: solo 22 su 50 hanno l\'ambito',
            'Che servono più documenti',
            'Che il modello va addestrato meglio'
          ],
          correctOption: 1,
          explanation: 'Il primo progetto è sistemare revisione e ambito, non costruire l\'AI.'
        },
        {
          id: 'm3u4-q5',
          prompt: 'Quando serve un agente invece di un flusso a passi fissi?',
          options: [
            'Sempre, è più moderno',
            'Quando il percorso cambia ogni volta e non puoi scrivere i passi in anticipo',
            'Quando ci sono molti utenti',
            'Quando serve più velocità'
          ],
          correctOption: 1,
          explanation: 'Se sai scrivere i passi in anticipo, un flusso fisso è più controllabile e costa meno.'
        },
        {
          id: 'm3u4-q6',
          prompt: 'Cosa deve fare l\'assistente se non trova evidenza sufficiente?',
          options: [
            'Dare la risposta più probabile',
            'Dire che non lo sa',
            'Chiedere all\'utente di riformulare',
            'Cercare su internet'
          ],
          correctOption: 1,
          explanation: 'Il rifiuto è una funzione, non un fallimento: riduce le risposte sbagliate e aumenta la fiducia.'
        },
        {
          id: 'm3u4-q7',
          prompt: 'Perché il sistema dell\'esempio non viene esteso pur avendo dimezzato i tempi?',
          options: [
            'Perché costa troppo',
            'Perché solo il 20 percento apre la citazione prima di confermare: la supervisione è formale, non reale',
            'Perché gli utenti si lamentano',
            'Perché i documenti sono cambiati'
          ],
          correctOption: 1,
          explanation: 'Un risultato buono con una supervisione finta è un rischio, non un successo.'
        }
      ],
      sourceIds: ['nist-ai-600-1', 'nist-ai-rmf-1-0']
    },

    {
      id: 'quando-ai-non-serve',
      stage: 4,
      estimatedMinutes: 6,
      title: t('Quando l\'AI non serve, e come dirlo con credibilità', 'When AI is not the answer, and how to say so credibly'),
      stageLabel: t('Tappa 4 di 7, chiusura: saper dire di no con un motivo e un\'alternativa.', 'Step 4 of 7, closing: saying no with a reason and an alternative.'),
      objective: t(
        'Saper rifiutare un progetto sbagliato senza sembrare l\'ostacolo, con dati raccolti di persona e un percorso alternativo.',
        'Be able to refuse the wrong project without looking like the obstacle, with data you collected yourself and an alternative path.'
      ),
      theory: [
        t(
          'Ci sono cinque situazioni in cui l\'AI non è la risposta, e conviene saperle riconoscere per nome.',
          'There are five situations where AI is not the answer, and it is worth recognising them by name.'
        ),
        {
          numbered: false,
          steps: [
            { name: t('Il dato non è affidabile', 'The data is unreliable'), text: t('Se i microfermi non vengono registrati, nessun modello li può prevedere. Prima si misura, poi si modella.', 'If micro-stops are not recorded, no model can predict them. First you measure, then you model.') },
            { name: t('Una regola semplice basta', 'A simple rule is enough'), text: t('Se la soglia è nota e scritta nel manuale, un modello aggiunge solo costo e opacità.', 'If the threshold is known and written in the manual, a model only adds cost and opacity.') },
            { name: t('Il problema è organizzativo', 'The problem is organisational'), text: t('Se il ritardo nasce dal fatto che due reparti non si parlano, un cruscotto lo rende visibile ma non lo risolve.', 'If the delay comes from two departments not talking, a dashboard makes it visible but does not solve it.') },
            { name: t('La decisione non è delegabile', 'The decision cannot be delegated'), text: t('Rilascio di un lotto, sicurezza delle persone, conformità: lì un sistema può proporre, mai decidere.', 'Batch release, people safety, compliance: there a system can suggest, never decide.') },
            { name: t('Nessuno cambierà comportamento', 'Nobody will change behaviour'), text: t('Se chi riceve l\'avviso non ha tempo né autorità per agire, il modello migliore del mondo non produce nulla.', 'If the person receiving the alert has neither time nor authority to act, the best model in the world produces nothing.') }
          ]
        },
        t(
          'Riconoscere la situazione però non basta: quello che conta è come lo dici, e qui la maggior parte delle persone sbaglia.',
          'Recognising the situation is not enough though: what counts is how you say it, and this is where most people get it wrong.'
        ),
        t(
          'Tre: il problema è organizzativo, non tecnico, e se il ritardo nasce dal fatto che due reparti non si parlano un cruscotto non lo risolve, lo rende solo più visibile. Quattro: la decisione non può essere delegata, come il rilascio di un lotto, la sicurezza delle persone o la conformità: lì un sistema può proporre, mai decidere. Cinque: nessuno cambierà comportamento, e se chi riceve l\'avviso non ha né tempo né autorità per agire, il modello migliore del mondo non produce nulla.',
          'Three: the problem is organisational, not technical, and if the delay comes from two departments not talking, a dashboard does not solve it, it only makes it visible. Four: the decision cannot be delegated, like batch release, people safety or compliance: there a system can suggest, never decide. Five: nobody will change behaviour, and if the person receiving the alert has neither the time nor the authority to act, the best model in the world produces nothing.'
        ),
        t(
          'Ora la parte difficile: come si dice. Un no secco ti fa sembrare l\'ostacolo. Un sì compiacente ti fa sembrare uno che non conosce il mestiere, e fra tre mesi il problema sarà tuo. La formula che funziona ha tre parti.',
          'Now the hard part: how you say it. A flat no makes you look like the obstacle. An agreeable yes makes you look like someone who does not know the trade, and in three months the problem will be yours. The formula that works has three parts.'
        ),
        {
          steps: [
            { name: t('Riconosci il problema vero', 'Acknowledge the real problem'), text: t('Il problema dei fermi è reale e costa 280.000 euro l\'anno.', 'The downtime problem is real and it costs 280,000 euros a year.') },
            { name: t('Spiega perché non adesso', 'Explain why not now'), text: t('I microfermi non sono nei dati, quindi un modello non li vedrebbe.', 'Micro-stops are not in the data, so a model would not see them.') },
            { name: t('Proponi il percorso, con tempi', 'Propose the path, with dates'), text: t('In tre settimane sistemiamo la registrazione, poi rivalutiamo e sapremo se serve un modello.', 'In three weeks we fix the recording, then we look again and we will know whether a model is needed.') }
          ]
        },
        t(
          'Non stai dicendo no al progetto, stai dicendo non adesso, e questo è il percorso. È diverso, e nessuno può obiettare. Aggiungi sempre la condizione di rientro, cioè cosa deve succedere perché la proposta rifiutata torni in gioco: un no professionale ne ha sempre una, altrimenti è solo un rifiuto e verrà scavalcato.',
          'You are not saying no to the project, you are saying not now, and this is the path. That is different, and nobody can argue with it. Always add the re-entry condition, that is what has to happen for the rejected proposal to come back: a professional no always has one, otherwise it is just a refusal and it will be bypassed.'
        )
      ],
      keyPoints: [
        t('Riconosci il problema, spiega perché non ora, proponi il percorso con tempi.', 'Acknowledge the problem, explain why not now, propose the path with dates.'),
        t('Un no professionale ha sempre una condizione di rientro.', 'A professional no always has a re-entry condition.'),
        t('I dati raccolti di persona rendono l\'obiezione impossibile da liquidare.', 'Data you collected yourself makes the objection impossible to dismiss.')
      ],
      terminology: [
        { id: 'condizione-rientro', plain: true, term: 'Re-entry condition', italian: 'Condizione di rientro', definition: t('Cosa deve succedere perché una proposta rifiutata torni in gioco.', 'What has to happen for a rejected proposal to come back into play.') },
        { id: 'debito-tecnico', term: 'Technical debt', italian: 'Debito tecnico', definition: t('Le scorciatoie di oggi che costeranno lavoro domani.', 'Today\'s shortcuts that will cost work tomorrow.') },
        { id: 'costo-opportunita', term: 'Opportunity cost', italian: 'Costo opportunità', definition: t('Quello a cui rinunci scegliendo un progetto invece di un altro.', 'What you give up by choosing one project instead of another.') },
        { id: 'prova-limitata', plain: true, term: 'Limited trial', italian: 'Prova limitata', definition: t('Una prova su un solo formato o una sola linea, con dati già verificati.', 'A trial on a single format or line, with data that has already been checked.') },
        { id: 'demo', plain: true, term: 'Demo', italian: 'Dimostrazione', definition: t('Una prova costruita per convincere, non per reggere il lavoro reale.', 'A show built to convince, not to survive real work.') }
      ],
      example: {
        title: t('"Vogliamo un assistente AI per gli operatori in linea"', '"We want an AI assistant for the operators on the line"'),
        steps: [
          t('Risposta sbagliata numero uno: "non è possibile con i nostri sistemi". Ti fa sembrare l\'ostacolo e non è nemmeno vero.', 'Wrong answer number one: "it is not possible with our systems". It makes you the obstacle and it is not even true.'),
          t('Risposta sbagliata numero due: "certo, in 3 mesi lo facciamo". Fra 3 mesi consegnerai qualcosa che cita procedure superate.', 'Wrong answer number two: "sure, we will do it in 3 months". In 3 months you will deliver something that quotes out-of-date procedures.'),
          t('Risposta corretta, primo pezzo: il problema è reale, gli operatori perdono circa 12 minuti a cercare il criterio giusto, che su 3 turni fa quasi 2 ore al giorno.', 'Right answer, first part: the problem is real, operators lose about 12 minutes finding the right criterion, which over 3 shifts is nearly 2 hours a day.'),
          t('Secondo pezzo: ho verificato 50 documenti, solo 22 hanno l\'ambito dichiarato e 12 sono scansioni senza testo.', 'Second part: I checked 50 documents, only 22 state where they apply and 12 are scans with no text.'),
          t('Terzo pezzo: 3 settimane per sistemare revisione e ambito sui documenti dei 3 formati principali, poi rivalutiamo. E se avete fretta, partiamo su un solo formato già verificato.', 'Third part: 3 weeks to fix revision and scope on the documents of the 3 main formats, then we look again. And if you are in a hurry, we start on one format that is already checked.')
        ],
        takeaway: t(
          'Hai riconosciuto il valore, hai portato dati raccolti da te, hai proposto un percorso con tempi e hai lasciato aperta un\'alternativa. Non hai detto no una volta sola, eppure hai evitato il progetto sbagliato.',
          'You acknowledged the value, brought data you collected yourself, proposed a path with dates, and left an alternative open. You never said no once, and yet you avoided the wrong project.'
        )
      },
      englishBlock: {
        lines: [
          'The idea makes sense, and the problem is real. People lose about twelve minutes each time.',
          'But I checked fifty documents. Only twenty-two say which line they apply to. So the assistant would confidently give people the wrong procedure.',
          'Give me three weeks to fix the documents. We need that anyway, with or without AI.',
          'Then we look again. If the documents are clean, the assistant becomes a much smaller and safer project.',
          'If you want to start now, we can try one format where the documents are already checked.'
        ],
        why: 'Makes sense, I checked, we need that anyway, we look again. Nessuna negazione diretta, e we need that anyway disarma l\'obiezione sul tempo perso.'
      },
      quiz: [
        {
          id: 'm3u5-q1',
          prompt: 'Quali sono i due modi sbagliati di rispondere a una richiesta di AI mal posta?',
          options: [
            'Chiedere tempo e fare uno studio',
            'Il no secco, che ti fa sembrare l\'ostacolo, e il sì compiacente, che ti farà consegnare qualcosa di sbagliato',
            'Coinvolgere la direzione',
            'Proporre un fornitore esterno'
          ],
          correctOption: 1,
          explanation: 'La formula corretta sta in mezzo: riconosci, spiega, proponi con tempi.',
          final: true
        },
        {
          id: 'm3u5-q2',
          prompt: 'Cosa deve avere sempre un no professionale?',
          options: [
            'L\'approvazione della direzione',
            'Una condizione di rientro: cosa deve succedere perché la proposta torni in gioco',
            'Un\'analisi dei costi',
            'Il parere del fornitore'
          ],
          correctOption: 1,
          explanation: 'Senza condizione di rientro è solo un rifiuto, e verrà scavalcato.'
        },
        {
          id: 'm3u5-q3',
          prompt: 'Il problema nasce dal fatto che due reparti non si parlano. Serve un cruscotto?',
          options: [
            'Sì, renderà evidente il problema',
            'No, il problema è organizzativo: il cruscotto lo rende visibile ma non lo risolve',
            'Sì, se lo chiede la direzione',
            'Dipende dal budget'
          ],
          correctOption: 1,
          explanation: 'Rendere visibile a volte aiuta, ma non va spacciato per una soluzione.'
        },
        {
          id: 'm3u5-q4',
          prompt: 'Nell\'esempio, quale elemento rende credibile il no?',
          options: [
            'L\'esperienza personale',
            'I dati raccolti di persona: 22 documenti su 50 con l\'ambito dichiarato',
            'Il parere del reparto qualità',
            'Il riferimento alla normativa'
          ],
          correctOption: 1,
          explanation: 'Un\'obiezione con numeri raccolti da te non si può liquidare come resistenza al cambiamento.'
        },
        {
          id: 'm3u5-q5',
          prompt: 'Perché la frase "ci serve comunque, con o senza AI" è efficace?',
          options: [
            'Perché è una promessa',
            'Perché toglie l\'obiezione che le tre settimane siano tempo perso',
            'Perché coinvolge altri reparti',
            'Perché riduce il costo'
          ],
          correctOption: 1,
          explanation: 'Il lavoro sui documenti ha valore autonomo, e questo disarma chi teme il rinvio.'
        },
        {
          id: 'm3u5-q6',
          prompt: 'In quale caso un sistema può proporre ma mai decidere?',
          options: [
            'Quando i dati sono pochi',
            'Rilascio del lotto, sicurezza delle persone, conformità',
            'Quando il modello non è accurato',
            'Quando manca il budget'
          ],
          correctOption: 1,
          explanation: 'È il cancello non negoziabile che attraversa tutto il corso.'
        },
        {
          id: 'm3u5-q7',
          prompt: 'Il modello è ottimo ma chi riceve l\'avviso non ha tempo né autorità per agire. Cosa succede?',
          options: [
            'Il valore si realizza comunque',
            'Non produce nulla: senza cambiamento di comportamento non c\'è risultato',
            'Serve un modello migliore',
            'Bisogna aumentare la precisione'
          ],
          correctOption: 1,
          explanation: 'È l\'anello quattro della catena del Modulo 1: se non cambia il lavoro di nessuno, il valore resta teorico.'
        }
      ],
      sourceIds: ['nist-ai-rmf-1-0', 'pmi-state-of-ai']
    }
  ]
}

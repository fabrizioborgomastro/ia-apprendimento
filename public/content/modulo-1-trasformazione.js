const t = (it, en) => ({ it, en })

/**
 * Module 1 - Understanding digital transformation on the shop floor.
 * The first unit carries the whole map of the seven steps; the other four open
 * one step each. Every scenario is hypothetical and built on public context.
 * @type {import('../types.js').Lesson}
 */
export const trasformazioneLesson = {
  id: 'trasformazione',
  slug: 'trasformazione',
  moduleNumber: 1,
  durationMinutes: 30,
  title: t('Capire la trasformazione digitale in fabbrica', 'Understanding digital transformation in a plant'),
  summary: t(
    'La mappa completa delle sette tappe, i numeri con cui si misura una fabbrica, come si traduce un problema di business in una soluzione, come si sceglie il primo caso e come si allineano le funzioni.',
    'The full map of the seven steps, the numbers a plant is measured by, how to turn a business problem into a solution, how to pick the first use case, and how to align the functions.'
  ),
  units: [
    {
      id: 'mappa-completa',
      stage: 1,
      estimatedMinutes: 6,
      title: t('La mappa completa: dalla perdita al risultato', 'The full map: from the loss to the result'),
      stageLabel: t(
        'Questa unità è la mappa di tutte e sette le tappe.',
        'This unit is the map of all seven steps.'
      ),
      objective: t(
        'Saper raccontare le sette tappe in ordine, perché è la struttura di ogni risposta da colloquio.',
        'Be able to tell the seven steps in order, because they are the structure of every interview answer.'
      ),
      theory: [
        t(
          'La trasformazione digitale non è "installare un software". È cambiare in modo misurabile come si prende una decisione in fabbrica, usando dati e tecnologia. La differenza è tutta lì: se dopo il progetto le persone decidono nello stesso modo di prima, hai comprato tecnologia e non hai trasformato niente.',
          'Digital transformation is not "installing software". It is changing, in a measurable way, how a decision is made in the plant, using data and technology. That is the whole difference. If people decide the same way after the project, you bought technology and you transformed nothing.'
        ),
        t(
          'Il processo, dall\'inizio alla fine, sono sempre sette tappe, e valgono per un progetto da tremila euro come per uno da tre milioni. Ognuna ha un nome, e conviene impararle con quel nome: sono la struttura di ogni risposta che darai a colloquio.',
          'The process, from start to finish, is always seven steps, and they hold for a three thousand euro project and for a three million one. Each one has a name, and it is worth learning them by that name: they are the structure of every answer you will give in an interview.'
        ),
        {
          steps: [
            {
              name: t('Osservo la perdita, genchi genbutsu', 'I watch the loss, genchi genbutsu'),
              text: t(
                'Non parto dalla tecnologia, parto da qualcosa che si perde: tempo, prodotto, energia, qualità. Vado in reparto e guardo come si lavora davvero, non come dice la procedura.',
                'I do not start from the technology, I start from something we lose: time, product, energy, quality. I go to the floor and watch how people really work, not how the procedure says they work.'
              )
            },
            {
              name: t('Misuro il punto di partenza, baseline', 'I measure the starting point, baseline'),
              text: t(
                'Metto un numero sulla perdita prima di toccare qualsiasi cosa. Senza baseline non potrai mai dimostrare di aver migliorato: potrai solo dire che ti sembra vada meglio.',
                'I put a number on the loss before touching anything. Without a baseline you can never prove an improvement: you can only say it feels better.'
              )
            },
            {
              name: t('Capisco dati e decisioni di oggi', 'I map today\'s data and decisions'),
              text: t(
                'Chi decide adesso, con quali informazioni, da quale sistema arrivano. È la tappa in cui incontri sensori, PLC, SCADA, MES ed ERP, e in cui scopri i problemi veri, che quasi mai sono tecnologici.',
                'Who decides now, with what information, from which system it comes. This is where you meet sensors, PLC, SCADA, MES and ERP, and where you find the real problems, which are almost never technical.'
              )
            },
            {
              name: t('Scelgo lo strumento più semplice', 'I pick the simplest tool'),
              text: t(
                'C\'è una scala: una regola fissa, un grafico, un modello statistico, il machine learning, l\'AI generativa. Si sceglie sempre il gradino più basso che risolve il problema.',
                'There is a ladder: a fixed rule, a chart, a statistical model, machine learning, generative AI. You always pick the lowest step that solves the problem.'
              )
            },
            {
              name: t('Provo in ombra, shadow mode', 'I try it in the shadow, shadow mode'),
              text: t(
                'Faccio girare la soluzione in parallelo a come si lavora oggi: il sistema propone e registra, ma nessuno lo vede e in linea non cambia niente. Nessuno deve fidarsi per poter provare.',
                'I run the solution in parallel with today\'s way of working: the system suggests and records, but nobody sees it and nothing changes on the line. Nobody has to trust it for the trial to run.'
              )
            },
            {
              name: t('Metto in produzione, go live', 'I go live, with a safety net'),
              text: t(
                'Tre cose sempre presenti: una persona che decide al posto del sistema, un modo alternativo di lavorare se il sistema si spegne, e qualcuno con nome e cognome che risponde del funzionamento.',
                'Three things always present: a person who decides instead of the system, another way to work if the system goes down, and someone with a name who answers for it.'
              )
            },
            {
              name: t('Decido: estendo o mi fermo', 'I decide: scale or stop'),
              text: t(
                'Ha funzionato su una linea non vuol dire che funzioni su dieci, perché il risultato dipende spesso dal contesto. Fermarsi è una decisione professionale, non un fallimento.',
                'It worked on one line does not mean it works on ten, because the result often depends on the context. Stopping is a professional decision, not a failure.'
              )
            }
          ]
        },
        t(
          'Nota una cosa sulla quarta tappa: salire un gradino senza motivo aggiunge costo, fragilità e persone da formare, senza aggiungere risultato. E sulla settima: dire "non estendiamo finché non abbiamo sistemato X" vale più di un sì entusiasta.',
          'Note one thing about the fourth step: climbing a step with no reason adds cost, fragility and people to train, without adding any result. And about the seventh: saying "we do not scale until X is fixed" is worth more than an enthusiastic yes.'
        )
      ],
      keyPoints: [
        t('Trasformazione digitale vuol dire cambiare come si decide, non installare un sistema.', 'Digital transformation means changing how decisions are made, not installing a system.'),
        t('Senza baseline non puoi dimostrare nessun miglioramento.', 'Without a baseline you cannot prove any improvement.'),
        t('Si sceglie sempre il gradino più basso della scala che risolve il problema.', 'You always pick the lowest step on the ladder that solves the problem.')
      ],
      terminology: [
        { id: 'digital-transformation', term: 'Digital transformation', italian: 'Trasformazione digitale', definition: t('Cambiare in modo misurabile come si decide e si lavora, usando dati e tecnologia.', 'Changing in a measurable way how people decide and work, using data and technology.') },
        { id: 'baseline', term: 'Baseline', italian: 'Valore di partenza', definition: t('Il numero che misura la situazione prima di intervenire.', 'The number that measures the situation before you act.') },
        { id: 'kpi', term: 'KPI', italian: 'Indicatore di prestazione', definition: t('Un numero scelto per misurare se le cose vanno meglio o peggio.', 'A number chosen to measure whether things get better or worse.') },
        { id: 'shadow-mode', term: 'Shadow mode', italian: 'Modalità ombra', definition: t('Il sistema gira in parallelo e registra, ma non viene mostrato e non decide.', 'The system runs in parallel and records, but it is not shown and it does not decide.') },
        { id: 'fallback', term: 'Fallback', italian: 'Modo alternativo', definition: t('Come si continua a lavorare se il sistema nuovo non è disponibile.', 'How people keep working if the new system is not available.') },
        { id: 'pilota', term: 'Pilot', italian: 'Pilota', definition: t('Prova reale ma limitata a una linea, un turno o un gruppo di persone.', 'A real trial limited to one line, one shift or one group of people.') },
        { id: 'genchi-genbutsu', term: 'Genchi genbutsu', italian: 'Vai a vedere di persona', definition: t('Andare in reparto a guardare come si lavora davvero, non come dice la procedura.', 'Going to the floor to see how people really work, not how the procedure says.') }
      ],
      example: {
        title: t('Una linea di confezionamento che si ferma spesso', 'A packaging line that stops too often'),
        steps: [
          t('Osservo: passo due turni in linea e vedo che gli operatori aspettano il manutentore mentre la macchina è ferma.', 'I watch: I spend two shifts on the line and I see operators waiting for the technician while the machine is down.'),
          t('Misuro: 6 ore di fermo a settimana, baseline presa su 4 settimane, sulla linea 3, firmata dal capo reparto.', 'I measure: 6 hours of downtime a week, baseline taken over 4 weeks, on line 3, signed off by the area manager.'),
          t('Capisco: i dati dei fermi esistono già nel sistema che registra la produzione, ma nessuno li guarda. 3 ore su 6 vengono da un solo gruppo meccanico.', 'I understand: the downtime data is already in the system that records production, but nobody looks at it. 3 hours out of 6 come from one mechanical group.'),
          t('Scelgo: non serve intelligenza artificiale. Serve un grafico settimanale delle prime tre cause e una persona che se ne occupi. Costo quasi zero.', 'I choose: no AI needed. What is needed is a weekly chart of the top three causes and a person who owns it. Cost close to zero.'),
          t('Provo: 4 settimane, solo linea 3. Poi metto in produzione: il grafico arriva ogni lunedì al capo reparto, che assegna un responsabile alla causa principale.', 'I try it: 4 weeks, line 3 only. Then I go live: the chart reaches the area manager every Monday, and he assigns an owner to the top cause.'),
          t('Decido: i fermi scendono da 6 a 4,2 ore. Estendo alle linee 1 e 2, che hanno lo stesso gruppo meccanico. Non alle altre, che hanno macchine diverse.', 'I decide: downtime drops from 6 to 4.2 hours. I scale to lines 1 and 2, which have the same mechanical group. Not to the others, which have different machines.')
        ],
        takeaway: t(
          'In questo esempio non c\'è nessuna intelligenza artificiale. È comunque trasformazione digitale, perché è cambiato chi decide, quando, e con quali dati.',
          'There is no AI in this example. It is still digital transformation, because who decides, when, and with what data all changed.'
        )
      },
      englishBlock: {
        lines: [
          'I always start from a real loss, not from the technology. First I go and watch how people work.',
          'Then I measure the starting point. If you have no number before, you cannot show any improvement after.',
          'I pick the simplest tool that solves the problem. Very often it is not AI.',
          'We try it on one line first, in parallel, so nobody has to trust it yet.',
          'If it works, we keep a person in charge and a way to work without the system.'
        ],
        why: 'Verbi semplici: start, watch, measure, pick, try, keep. Niente implement, leverage, deploy: sono parole che ti rallentano e non aggiungono nulla.'
      },
      quiz: [
        {
          id: 'm1u1-q1',
          prompt: 'Qual è la definizione più corretta di trasformazione digitale?',
          options: [
            'Installare software moderno in azienda',
            'Cambiare in modo misurabile come si decide e si lavora, usando dati e tecnologia',
            'Passare tutti i sistemi al cloud',
            'Introdurre l\'intelligenza artificiale nei processi'
          ],
          correctOption: 1,
          explanation: 'Se dopo il progetto le persone decidono come prima, hai comprato tecnologia. La trasformazione sta nel cambiamento del lavoro.',
          final: true
        },
        {
          id: 'm1u1-q2',
          prompt: 'Perché la baseline va misurata prima di intervenire?',
          options: [
            'Perché lo chiede la procedura aziendale',
            'Perché senza un numero di partenza non puoi dimostrare il miglioramento',
            'Perché serve a scegliere il fornitore',
            'Perché riduce i costi del progetto'
          ],
          correctOption: 1,
          explanation: 'Senza baseline puoi solo dire "mi sembra vada meglio", e non è un argomento difendibile davanti a chi paga.'
        },
        {
          id: 'm1u1-q3',
          prompt: 'Nell\'esempio della linea di confezionamento, quale tappa ha dato l\'informazione più utile?',
          options: [
            'La scelta dello strumento',
            'La messa in produzione',
            'Capire dove nascono i dati, che ha rivelato le 3 ore su 6 da un solo gruppo',
            'La decisione di estendere'
          ],
          correctOption: 2,
          explanation: 'Capire dove nasce il problema ha ristretto il campo da "la linea si ferma" a "un gruppo meccanico causa metà dei fermi".'
        },
        {
          id: 'm1u1-q4',
          prompt: 'Cosa significa far girare una soluzione in modalità ombra?',
          options: [
            'Farla usare solo di notte',
            'Farla girare in parallelo senza mostrarla e senza che decida',
            'Farla provare solo ai manutentori',
            'Tenerla in prova senza contratto'
          ],
          correctOption: 1,
          explanation: 'Serve a raccogliere prove senza chiedere a nessuno di fidarsi e senza rischiare nulla in linea.'
        },
        {
          id: 'm1u1-q5',
          prompt: 'Un progetto migliora la linea 3. Cosa fai?',
          options: [
            'Estendo subito a tutte le linee, il risultato è dimostrato',
            'Verifico quali condizioni della linea 3 hanno reso possibile il risultato, poi estendo dove ci sono',
            'Aspetto un anno prima di decidere',
            'Chiudo il progetto, l\'obiettivo è raggiunto'
          ],
          correctOption: 1,
          explanation: 'Il risultato spesso dipende dal contesto. Estendere alla cieca è il modo più comune di bruciare un budget.'
        },
        {
          id: 'm1u1-q6',
          prompt: 'Nell\'esempio, perché non è stata usata l\'intelligenza artificiale?',
          options: [
            'Perché non era disponibile',
            'Perché costava troppo',
            'Perché un grafico settimanale e un responsabile risolvevano già il problema',
            'Perché la direzione l\'aveva vietata'
          ],
          correctOption: 2,
          explanation: 'Si sceglie sempre il gradino più basso che risolve. Salire senza motivo aggiunge costo e fragilità, non risultato.'
        },
        {
          id: 'm1u1-q7',
          prompt: 'Che cos\'è un fallback?',
          options: [
            'Il piano di rientro economico del progetto',
            'Il modo di continuare a lavorare se il sistema nuovo non è disponibile',
            'Il backup dei dati',
            'La procedura di annullamento del contratto'
          ],
          correctOption: 1,
          explanation: 'Se il processo si ferma quando si ferma il sistema, hai reso critico un componente senza che nessuno lo abbia deciso.'
        }
      ],
      sourceIds: ['nist-engineering-statistics', 'pmi-state-of-ai']
    },

    {
      id: 'misurare-fabbrica',
      stage: 2,
      estimatedMinutes: 6,
      title: t('Come si misura una fabbrica', 'How a plant is measured'),
      stageLabel: t('Tappa 2 di 7: misuro il punto di partenza.', 'Step 2 of 7: I measure the starting point.'),
      objective: t(
        'Avere pronta una risposta solida a "come misuri il risultato", senza promettere numeri che non puoi difendere.',
        'Have a solid answer ready for "how do you measure the result", without promising numbers you cannot defend.'
      ),
      theory: [
        t(
          'Una fabbrica si misura su tre fronti: quanto produce, quanto bene lo produce, quanto spesso si ferma. Produttività, qualità, manutenzione. Sono i tre domini citati anche nell\'annuncio per cui ti candidi, e conviene usare le stesse parole.',
          'A plant is measured on three fronts: how much it produces, how well it produces it, how often it stops. Productivity, quality, maintenance. These are the three areas named in the job advert too, and it is worth using the same words.'
        ),
        t(
          'Il numero più usato in produzione è l\'OEE, Overall Equipment Effectiveness, in italiano efficienza complessiva dell\'impianto. È un numero unico da 0 a 100 percento, e nasce dalla moltiplicazione di tre fattori.',
          'The most used number in production is OEE, Overall Equipment Effectiveness. It is a single number from 0 to 100 percent, and it comes from multiplying three factors.'
        ),
        {
          steps: [
            { name: t('Disponibilità, availability', 'Availability'), text: t('Per quanto tempo la macchina era davvero disponibile rispetto a quando avrebbe dovuto produrre. Se doveva lavorare 8 ore e si è fermata 1 ora: 7 su 8, cioè 87,5 percento.', 'How long the machine was really available compared to when it should have been running. If it should have run 8 hours and stopped for 1: 7 out of 8, that is 87.5 percent.') },
            { name: t('Prestazione, performance', 'Performance'), text: t('Quanto è andata veloce rispetto alla velocità nominale. Se poteva fare 1000 pezzi l\'ora e ne ha fatti 900: 90 percento.', 'How fast it ran compared to its nominal speed. If it could make 1000 parts an hour and made 900: 90 percent.') },
            { name: t('Qualità, quality', 'Quality'), text: t('Quanti pezzi erano buoni. Se su 900 pezzi 27 sono da buttare: 873 su 900, cioè 97 percento.', 'How many parts were good. If out of 900 parts 27 are scrap: 873 out of 900, that is 97 percent.') }
          ]
        },
        t(
          'Un esempio di calcolo. La macchina doveva lavorare 8 ore e si è fermata 1 ora, quindi la disponibilità è 7 su 8, cioè 87,5 percento. Poteva fare 1000 pezzi l\'ora e ne ha fatti 900, quindi la prestazione è 90 percento. Su 900 pezzi 27 sono da buttare, quindi la qualità è 97 percento. Moltiplicando, 0,875 per 0,90 per 0,97 fa 76,4 percento di OEE.',
          'A worked calculation. The machine should have run 8 hours and stopped for 1, so availability is 7 out of 8, that is 87.5 percent. It could make 1000 parts an hour and made 900, so performance is 90 percent. Out of 900 parts, 27 are scrap, so quality is 97 percent. Multiply them: 0.875 times 0.90 times 0.97 gives 76.4 percent OEE.'
        ),
        t(
          'La cosa importante da capire, e che colpisce a un colloquio, è che l\'OEE è un numero riassuntivo, e i numeri riassuntivi nascondono dove sta il problema. Un OEE del 76 percento non ti dice cosa fare. I tre fattori separati sì.',
          'The important thing, and the one that lands in an interview, is that OEE is a summary number, and summary numbers hide where the problem is. An OEE of 76 percent does not tell you what to do. The three factors on their own do.'
        ),
        t(
          'Poi ci sono due numeri di manutenzione che sentirai spesso. MTBF, Mean Time Between Failures, è il tempo medio tra due guasti, e più è alto meglio è. MTTR, Mean Time To Repair, è il tempo medio per riparare, e più è basso meglio è. E uno di qualità: lo scarto, cioè la percentuale di prodotto buttato o rilavorato.',
          'Then there are two maintenance numbers you will hear often. MTBF, Mean Time Between Failures, is the average time between two breakdowns, and higher is better. MTTR, Mean Time To Repair, is the average time to fix it, and lower is better. And one quality number: scrap, the share of product thrown away or reworked.'
        )
      ],
      keyPoints: [
        t('OEE moltiplica disponibilità, prestazione e qualità: per questo scende in fretta.', 'OEE multiplies availability, performance and quality, which is why it drops fast.'),
        t('Un numero riassuntivo nasconde dove sta il problema: apri sempre i tre fattori.', 'A summary number hides where the problem is: always open the three factors.'),
        t('MTBF e MTTR sono due progetti diversi: affidabilità o rapidità di intervento.', 'MTBF and MTTR are two different projects: reliability or speed of repair.')
      ],
      terminology: [
        { id: 'oee', term: 'OEE', italian: 'Efficienza complessiva dell\'impianto', definition: t('Numero unico da 0 a 100 che moltiplica disponibilità, prestazione e qualità.', 'A single number from 0 to 100 that multiplies availability, performance and quality.') },
        { id: 'disponibilita', term: 'Availability', italian: 'Disponibilità', definition: t('Quanto tempo la macchina ha davvero prodotto rispetto a quando doveva.', 'How long the machine actually produced compared to when it should have.') },
        { id: 'prestazione', term: 'Performance', italian: 'Prestazione', definition: t('Quanto la macchina è andata veloce rispetto alla velocità nominale.', 'How fast the machine ran compared to its nominal speed.') },
        { id: 'mtbf', term: 'MTBF', italian: 'Tempo medio tra guasti', definition: t('Quanto tempo passa in media tra un guasto e il successivo.', 'How much time passes on average between one breakdown and the next.') },
        { id: 'mttr', term: 'MTTR', italian: 'Tempo medio di riparazione', definition: t('Quanto ci vuole in media per rimettere in marcia dopo un guasto.', 'How long it takes on average to restart after a breakdown.') },
        { id: 'scarto', term: 'Scrap', italian: 'Scarto', definition: t('Percentuale di prodotto buttato o da rilavorare.', 'The share of product thrown away or reworked.') },
        { id: 'fermo', term: 'Downtime', italian: 'Fermo macchina', definition: t('Periodo in cui la macchina doveva produrre e non lo ha fatto.', 'A period when the machine should have produced and did not.') }
      ],
      example: {
        title: t('Due linee con lo stesso OEE, due progetti diversi', 'Two lines with the same OEE, two different projects'),
        table: {
          columns: [t('Fattore', 'Factor'), t('Linea A', 'Line A'), t('Linea B', 'Line B')],
          rows: [
            [t('Disponibilità', 'Availability'), t('87%', '87%'), t('98%', '98%')],
            [t('Prestazione', 'Performance'), t('90%', '90%'), t('82%', '82%')],
            [t('Qualità', 'Quality'), t('97%', '97%'), t('95%', '95%')],
            [t('OEE', 'OEE'), t('76%', '76%'), t('76%', '76%')]
          ]
        },
        steps: [
          t('Le due linee hanno lo stesso OEE, 76 percento. Sembrano uguali e non lo sono.', 'The two lines have the same OEE, 76 percent. They look the same and they are not.'),
          t('La linea A ha un problema di fermi: si ferma spesso. Serve manutenzione, o capire perché si blocca.', 'Line A has a downtime problem: it stops often. It needs maintenance, or an answer to why it jams.'),
          t('La linea B non si ferma quasi mai, ma va piano e scarta di più. Probabilmente è un problema di regolazione o di materiale in ingresso.', 'Line B almost never stops, but it runs slow and scraps more. It is probably a setting or an incoming material problem.')
        ],
        takeaway: t(
          'Stesso numero, due progetti completamente diversi. A colloquio la frase giusta non è "porterei l\'OEE dal 76 all\'85 percento", ma "guarderei quale dei tre fattori pesa di più, perché l\'OEE da solo non dice dove intervenire".',
          'Same number, two completely different projects. In an interview the right sentence is not "I would take OEE from 76 to 85 percent", but "I would look at which of the three factors weighs most, because OEE alone does not say where to act".'
        )
      },
      englishBlock: {
        lines: [
          'OEE puts three things together: how often the machine runs, how fast it runs, and how many good parts it makes.',
          'But one number hides the problem. Two lines can both be at 76 percent for very different reasons.',
          'So the first thing I do is open the number and look at the three parts separately.',
          'MTBF tells me how often it breaks. MTTR tells me how long it takes to fix. Those are two different projects.'
        ],
        why: 'Puts together, hides, open the number, look at. Sono parole semplici che spiegano un concetto tecnico senza usare gergo.'
      },
      quiz: [
        {
          id: 'm1u2-q1',
          prompt: 'Come si calcola l\'OEE?',
          options: [
            'Sommando disponibilità, prestazione e qualità',
            'Moltiplicando disponibilità, prestazione e qualità',
            'Facendo la media dei tre valori',
            'Dividendo i pezzi buoni per le ore lavorate'
          ],
          correctOption: 1,
          explanation: 'Sono moltiplicati, per questo l\'OEE scende in fretta: tre fattori all\'85 percento danno un OEE del 61.',
          final: true
        },
        {
          id: 'm1u2-q2',
          prompt: 'Una macchina doveva produrre 8 ore e si è fermata 2 ore. Qual è la disponibilità?',
          options: ['80%', '75%', '25%', '20%'],
          correctOption: 1,
          explanation: '6 ore lavorate su 8 previste fa 75 percento. La disponibilità confronta il tempo prodotto con il tempo pianificato.'
        },
        {
          id: 'm1u2-q3',
          prompt: 'Due linee hanno entrambe OEE 76 percento. Cosa puoi concludere?',
          options: [
            'Hanno lo stesso problema',
            'Vanno bene allo stesso modo',
            'Niente, finché non guardi i tre fattori separatamente',
            'Che una delle due misura male'
          ],
          correctOption: 2,
          explanation: 'È il punto centrale dell\'unità: un numero riassuntivo nasconde dove sta il problema.'
        },
        {
          id: 'm1u2-q4',
          prompt: 'Cosa indica un MTBF alto?',
          options: [
            'Che le riparazioni sono lente',
            'Che la macchina si guasta raramente',
            'Che ci sono molti scarti',
            'Che la linea va veloce'
          ],
          correctOption: 1,
          explanation: 'MTBF è il tempo medio tra due guasti: più è lungo, più la macchina è affidabile.'
        },
        {
          id: 'm1u2-q5',
          prompt: 'Una linea ha disponibilità 98 percento, prestazione 82, qualità 95. Dove intervieni per primo?',
          options: [
            'Sui fermi macchina',
            'Sulla velocità e sulla regolazione, perché la prestazione è il fattore più basso',
            'Sulla qualità',
            'Su tutti e tre insieme'
          ],
          correctOption: 1,
          explanation: 'Si parte dal fattore che pesa di più. Qui la macchina non si ferma, ma va piano.'
        },
        {
          id: 'm1u2-q6',
          prompt: 'Perché è meglio non promettere "porto l\'OEE dal 76 all\'85"?',
          options: [
            'Perché è troppo ambizioso',
            'Perché non sai ancora quale dei tre fattori si può muovere e a quale costo',
            'Perché l\'OEE non si può migliorare',
            'Perché è un dato riservato'
          ],
          correctOption: 1,
          explanation: 'Promettere un numero riassuntivo senza aver aperto i tre fattori è il tipico errore di chi non ha lavorato in produzione.'
        },
        {
          id: 'm1u2-q7',
          prompt: 'Che differenza c\'è tra MTBF e MTTR?',
          options: [
            'Nessuna, sono sinonimi',
            'MTBF misura quanto spesso si rompe, MTTR quanto ci metti a ripararla',
            'MTBF riguarda la qualità, MTTR la produttività',
            'MTBF si usa solo per le linee nuove'
          ],
          correctOption: 1,
          explanation: 'Puoi migliorare l\'affidabilità, cioè un MTBF più alto, oppure la rapidità di intervento, cioè un MTTR più basso. Sono due progetti diversi.'
        }
      ],
      sourceIds: ['nist-engineering-statistics', 'isa-95']
    },

    {
      id: 'problema-soluzione',
      stage: 4,
      estimatedMinutes: 6,
      title: t('Dal problema di business alla soluzione digitale', 'From a business problem to a digital solution'),
      stageLabel: t('Tappa 4 di 7: prima di scegliere, devi saper formulare il problema.', 'Step 4 of 7: before choosing, you must be able to frame the problem.'),
      objective: t(
        'Saper trasformare una richiesta di tecnologia in una decisione misurabile, senza dire né sì né no a scatola chiusa.',
        'Be able to turn a request for technology into a measurable decision, without a blind yes or a blind no.'
      ),
      theory: [
        t(
          'Il requisito dell\'annuncio dice: tradurre problemi di business in soluzioni digitali. Questo è il cuore del ruolo, ed è una competenza che si può descrivere con una catena di sei anelli: perdita osservata, causa plausibile, capacità digitale, cambiamento nel lavoro, risultato atteso, prova che potrebbe smentirti.',
          'The advert says: translate business challenges into digital solutions. This is the heart of the role, and it is a skill you can describe as a chain of six links: observed loss, likely cause, digital capability, change in the work, expected result, and the evidence that could prove you wrong.'
        ),
        {
          steps: [
            {
              name: t('Perdita osservata', 'Observed loss'),
              text: t('Cosa si perde, misurato. Sei ore di fermo a settimana.', 'What we lose, measured. Six hours of downtime a week.')
            },
            {
              name: t('Causa plausibile', 'Likely cause'),
              text: t('Perché succede, secondo l\'ipotesi di oggi. Il guasto si scopre solo quando la macchina si ferma.', 'Why it happens, according to today\'s idea. The failure is found only when the machine stops.')
            },
            {
              name: t('Capacità digitale', 'Digital capability'),
              text: t('Cosa aggiungiamo. Un avviso quando la vibrazione supera una soglia.', 'What we add. An alert when vibration goes over a threshold.')
            },
            {
              name: t('Cambiamento nel lavoro', 'Change in the work'),
              text: t(
                'Cosa farà una persona di diverso rispetto a oggi. Il pianificatore inserisce l\'intervento nella fermata programmata invece di aspettare il guasto. Questo è l\'anello che quasi tutti saltano.',
                'What a person will do differently from today. The planner moves the job into the planned stop instead of waiting for the breakdown. This is the link almost everybody skips.'
              )
            },
            {
              name: t('Risultato atteso', 'Expected result'),
              text: t('Quanto ci aspettiamo di guadagnare. Da 6 a 4 ore di fermo a settimana, entro 8 settimane.', 'How much we expect to gain. From 6 to 4 hours of downtime a week, within 8 weeks.')
            },
            {
              name: t('Prova che potrebbe smentirti', 'Evidence that could prove you wrong'),
              text: t(
                'Cosa vedremmo se l\'ipotesi fosse sbagliata. Se i fermi non calano, oppure se calano anche sulle linee dove non abbiamo fatto niente.',
                'What we would see if the idea were wrong. If downtime does not drop, or if it drops on the lines where we did nothing too.'
              )
            }
          ]
        },
        t(
          'Sul quarto anello vale la pena fermarsi: se non cambia il lavoro di nessuno il valore resta teorico. Puoi avere il modello più preciso del mondo, ma se chi riceve l\'avviso non fa niente di diverso non è successo niente. E il sesto anello è quello che distingue un professionista da un venditore.',
          'The fourth link is worth a pause: if nobody works differently, the value stays theoretical. You can have the most accurate model in the world, but if the person who gets the alert does nothing new, nothing happened. And the sixth link is what separates a professional from a salesperson.'
        ),
        t(
          'Tienile separate anche a parole. Output è ciò che consegni, per esempio un cruscotto con i fermi. Outcome è ciò che le persone fanno di diverso, per esempio il capo reparto che ogni lunedì assegna un responsabile. Impatto è il numero che si muove, cioè i fermi da 6 a 4,2 ore. Molti progetti si fermano all\'output e lo chiamano successo.',
          'Keep them apart in words too. Output is what you deliver, for example a dashboard with the stops. Outcome is what people do differently, for example the area manager assigning an owner every Monday. Impact is the number that moves, that is downtime from 6 to 4.2 hours. Many projects stop at the output and call it a success.'
        )
      ],
      keyPoints: [
        t('La catena ha sei anelli e il quarto, il cambiamento nel lavoro, è quello che tutti saltano.', 'The chain has six links, and the fourth one, the change in the work, is the one everybody skips.'),
        t('Se non sai dire cosa ti farebbe cambiare idea, stai facendo una promessa, non un esperimento.', 'If you cannot say what would change your mind, you are making a promise, not running an experiment.'),
        t('Output, outcome e impatto sono tre cose diverse, e solo la terza è il risultato.', 'Output, outcome and impact are three different things, and only the third one is the result.')
      ],
      terminology: [
        { id: 'ipotesi', plain: true, term: 'Hypothesis', italian: 'Ipotesi', definition: t('Un\'affermazione che può essere smentita dai dati, scritta prima di raccoglierli.', 'A statement that data can prove wrong, written before the data is collected.') },
        { id: 'output', term: 'Output', italian: 'Prodotto consegnato', definition: t('Ciò che il progetto consegna: un cruscotto, un avviso, un report.', 'What the project delivers: a dashboard, an alert, a report.') },
        { id: 'outcome', term: 'Outcome', italian: 'Cambiamento nel lavoro', definition: t('Ciò che le persone fanno di diverso grazie all\'output.', 'What people do differently because of the output.') },
        { id: 'impatto', term: 'Impact', italian: 'Impatto', definition: t('Il cambiamento misurato sulla perdita di partenza.', 'The measured change in the loss you started from.') },
        { id: 'assunzione', plain: true, term: 'Assumption', italian: 'Assunzione', definition: t('Qualcosa che diamo per vero senza averlo verificato.', 'Something we take as true without having checked it.') }
      ],
      example: {
        title: t('"Vogliamo l\'AI per la manutenzione predittiva"', '"We want AI for predictive maintenance"'),
        table: {
          columns: [t('Anello', 'Link'), t('Cosa scrivo', 'What I write')],
          rows: [
            [t('Perdita osservata', 'Observed loss'), t('6 ore di fermo a settimana sulla linea 3, misurate su 4 settimane', '6 hours of downtime a week on line 3, measured over 4 weeks')],
            [t('Causa plausibile', 'Likely cause'), t('I guasti al gruppo di trascinamento si scoprono solo quando la linea si ferma', 'Drive group failures are found only when the line stops')],
            [t('Capacità digitale', 'Digital capability'), t('Un avviso al superamento di una soglia di vibrazione, su dati già disponibili', 'An alert when vibration crosses a threshold, on data we already have')],
            [t('Cambiamento nel lavoro', 'Change in the work'), t('Il pianificatore sposta l\'intervento nella fermata programmata del sabato', 'The planner moves the job into the planned Saturday stop')],
            [t('Risultato atteso', 'Expected result'), t('Da 6 a 4 ore di fermo, entro 8 settimane', 'From 6 to 4 hours of downtime, within 8 weeks')],
            [t('Prova contraria', 'Counter-evidence'), t('Se i fermi calano anche sulle linee 1 e 2, il merito non è nostro', 'If downtime drops on lines 1 and 2 too, the credit is not ours')]
          ]
        },
        steps: [
          t('La richiesta di partenza è una richiesta di tecnologia, non un problema: la riscrivi con la catena dei sei anelli.', 'The request as it arrives is a request for technology, not a problem: you rewrite it with the six-link chain.'),
          t('Scrivendola scopri che per la prima versione non serve intelligenza artificiale, serve una soglia su un dato che hai già.', 'Writing it down, you find that the first version needs no AI, it needs a threshold on data you already have.'),
          t('L\'AI arriva dopo, e solo se la soglia fissa non basta a dare un anticipo utile.', 'AI comes later, and only if the fixed threshold does not give a useful warning time.')
        ],
        takeaway: t(
          'Hai preso una richiesta di tecnologia e l\'hai trasformata in una decisione misurabile, senza dire di no e senza dire di sì a scatola chiusa. È la risposta che a colloquio vale di più.',
          'You took a request for technology and turned it into a measurable decision, without saying no and without saying a blind yes. That is the answer that pays off most in an interview.'
        )
      },
      englishBlock: {
        lines: [
          'When someone asks for AI, I first ask what we are losing today, and how much.',
          'Then I write down what a person will do differently. If nobody works differently, nothing really changed.',
          'I also write what would prove me wrong. Without that, it is a promise, not a test.',
          'In this case the first version needs no AI. It needs one threshold on data we already have.'
        ],
        why: 'Losing, do differently, prove me wrong, needs no AI. Sono frasi corte con un verbo solo, e l\'ultima è la più forte perché rinuncia a qualcosa.'
      },
      quiz: [
        {
          id: 'm1u3-q1',
          prompt: 'Qual è l\'anello della catena che quasi tutti saltano?',
          options: [
            'La perdita osservata',
            'Il cambiamento nel lavoro delle persone',
            'La capacità digitale',
            'Il risultato atteso'
          ],
          correctOption: 1,
          explanation: 'Senza un cambiamento nel lavoro il valore resta teorico, anche con il modello migliore del mondo.',
          final: true
        },
        {
          id: 'm1u3-q2',
          prompt: 'Che differenza c\'è tra output e outcome?',
          options: [
            'Nessuna',
            'L\'output è ciò che consegni, l\'outcome è ciò che le persone fanno di diverso',
            'L\'output è tecnico, l\'outcome è economico',
            'L\'output riguarda la qualità, l\'outcome la produttività'
          ],
          correctOption: 1,
          explanation: 'Un cruscotto è un output. Il capo reparto che ogni lunedì assegna un responsabile è un outcome.'
        },
        {
          id: 'm1u3-q3',
          prompt: 'Perché serve scrivere cosa ti smentirebbe?',
          options: [
            'Per proteggersi legalmente',
            'Perché senza quello stai facendo una promessa, non un esperimento',
            'Perché lo richiede il metodo agile',
            'Per ridurre i costi'
          ],
          correctOption: 1,
          explanation: 'È la differenza tra un professionista e un venditore. Un test che non può fallire non insegna niente.'
        },
        {
          id: 'm1u3-q4',
          prompt: 'La direzione chiede "vogliamo l\'AI per la manutenzione". Qual è la prima mossa?',
          options: [
            'Cercare un fornitore di AI',
            'Chiedere cosa si perde oggi e quanto, per trasformare la richiesta in un problema misurabile',
            'Dire che non è possibile',
            'Fare uno studio di fattibilità di sei mesi'
          ],
          correctOption: 1,
          explanation: 'Non dici né sì né no: riformuli la richiesta di tecnologia in una decisione misurabile.'
        },
        {
          id: 'm1u3-q5',
          prompt: 'Nell\'esempio, perché la prima versione non usa intelligenza artificiale?',
          options: [
            'Perché l\'AI è troppo costosa',
            'Perché una soglia su un dato già disponibile basta a testare l\'ipotesi',
            'Perché non ci sono dati',
            'Perché la direzione non l\'ha approvata'
          ],
          correctOption: 1,
          explanation: 'Si testa l\'anello più incerto nel modo più economico. Se la soglia non basta, si sale di un gradino.'
        },
        {
          id: 'm1u3-q6',
          prompt: 'Cosa significa "se i fermi calano anche sulle linee 1 e 2, il merito non è nostro"?',
          options: [
            'Che il progetto va esteso subito',
            'Che il miglioramento potrebbe avere un\'altra causa, esterna al progetto',
            'Che i dati sono sbagliati',
            'Che le altre linee vanno peggio'
          ],
          correctOption: 1,
          explanation: 'È il controllo che distingue il tuo effetto da un cambiamento generale, per esempio stagionale o di mix produttivo.'
        },
        {
          id: 'm1u3-q7',
          prompt: 'Cosa rende utile un\'ipotesi?',
          options: [
            'Che sia ambiziosa',
            'Che possa essere smentita dai dati, ed è scritta prima di raccoglierli',
            'Che sia condivisa dalla direzione',
            'Che riguardi una tecnologia nuova'
          ],
          correctOption: 1,
          explanation: 'Un\'ipotesi senza soglia e senza data non può fallire, e quindi non insegna nulla.'
        }
      ],
      sourceIds: ['nist-ai-rmf-1-0', 'pmi-state-of-ai']
    },

    {
      id: 'prioritizzare',
      stage: 4,
      estimatedMinutes: 6,
      title: t('Prioritizzare un caso d\'uso: valore, dati, rischio, tempo, replicabilità', 'Prioritising a use case: value, data, risk, time, replicability'),
      stageLabel: t('Tappa 4 di 7: scelgo, e soprattutto so spiegare la scelta.', 'Step 4 of 7: I choose, and above all I can explain the choice.'),
      objective: t(
        'Avere un metodo difendibile per scegliere il primo caso d\'uso e per spiegare perché il candidato più ricco è stato escluso.',
        'Have a defensible method to pick the first use case, and to explain why the richest candidate was ruled out.'
      ),
      theory: [
        t(
          'Quando ti chiedono come decidi cosa automatizzare per primo, la risposta debole è "quello che porta più valore". La risposta forte ha cinque criteri e un cancello.',
          'When they ask how you decide what to automate first, the weak answer is "whatever brings the most value". The strong answer has five criteria and one gate.'
        ),
        {
          steps: [
            {
              name: t('Valore economico', 'Economic value'),
              text: t(
                'Non "è importante", ma quanto vale in ore, scarti o euro all\'anno. Se una linea perde 6 ore a settimana e un\'ora di fermo costa 900 euro, il problema vale circa 280.000 euro l\'anno.',
                'Not "it is important", but how much it is worth in hours, scrap or euros a year. If a line loses 6 hours a week and an hour of downtime costs 900 euros, the problem is worth about 280,000 euros a year.'
              )
            },
            {
              name: t('Fattibilità con i dati di oggi', 'Feasibility with today\'s data'),
              text: t(
                'Se devo prima installare sensori per un anno la fattibilità è bassa. La domanda giusta è: il dato che mi serve esiste già, e qualcuno se ne fida?',
                'If I first need a year of sensor installation, feasibility is low. The right question is: does the data I need already exist, and does anybody trust it?'
              )
            },
            {
              name: t('Rischio e reversibilità', 'Risk and reversibility'),
              text: t(
                'Se sbaglia, cosa succede, e posso tornare indietro? Leggere dati è reversibile, creare in automatico un record ufficiale spesso no.',
                'If it gets it wrong, what happens, and can I go back? Reading data is reversible, creating an official record automatically often is not.'
              )
            },
            {
              name: t('Tempo al valore, time to value', 'Time to value'),
              text: t(
                'Quanto passa prima del primo risultato misurabile. Un caso da 100.000 euro fra due anni vale meno, come primo progetto, di uno da 40.000 fra tre mesi: il secondo ti compra la credibilità per fare il primo.',
                'How long before the first measurable result. A case worth 100,000 euros in two years is worth less, as a first project, than one worth 40,000 in three months: the second buys you the credibility to do the first.'
              )
            },
            {
              name: t('Replicabilità su altri siti', 'Replicability across sites'),
              text: t(
                'Se funziona qui, quanto è facile portarlo altrove? È il criterio che distingue una scelta da lead da una scelta da specialista.',
                'If it works here, how easy is it to take it elsewhere? This is the criterion that separates a lead\'s choice from a specialist\'s choice.'
              )
            }
          ]
        },
        t(
          'Poi c\'è il cancello, in inglese hard gate: una condizione che, se non è soddisfatta, esclude il candidato a prescindere dal punteggio. In una produzione regolamentata il cancello tipico è che nessun sistema può prendere da solo una decisione che libera un prodotto o che riguarda la sicurezza. Può proporre, non decidere.',
          'Then there is the gate, the hard gate: a condition that, if it is not met, rules the candidate out no matter the score. In regulated manufacturing the typical gate is that no system decides on its own to release a product or to settle a safety question. It can suggest, not decide.'
        ),
        t(
          'Ecco il punto che colpisce a colloquio: un cancello non si compensa con un punteggio alto. Se un candidato prende 9 su 10 di valore ma sfonda il cancello, esce dalla classifica. Non si posiziona ultimo, proprio non partecipa. E i pesi dei criteri si decidono prima di guardare i punteggi, altrimenti stai solo giustificando una scelta già fatta.',
          'Here is the point that lands in an interview: a gate cannot be bought with a high score. If a candidate scores 9 out of 10 on value but breaks the gate, it leaves the ranking. It does not come last, it simply does not compete. And the weights are set before you look at the scores, otherwise you are only justifying a choice you already made.'
        )
      ],
      keyPoints: [
        t('Cinque criteri pesati e un cancello non negoziabile.', 'Five weighted criteria and one non-negotiable gate.'),
        t('I pesi si decidono prima dei punteggi, altrimenti la scelta è già fatta.', 'Weights are set before the scores, otherwise the choice is already made.'),
        t('Tempo al valore e replicabilità sono i criteri da lead.', 'Time to value and replicability are the lead-level criteria.')
      ],
      terminology: [
        { id: 'criterio-pesato', plain: true, term: 'Weighted criterion', italian: 'Criterio pesato', definition: t('Un aspetto della valutazione a cui si assegna un\'importanza.', 'An aspect of the evaluation that is given a weight.') },
        { id: 'hard-gate', term: 'Hard gate', italian: 'Cancello non negoziabile', definition: t('Condizione che, se non soddisfatta, esclude il candidato a prescindere dal punteggio.', 'A condition that rules a candidate out regardless of its score.') },
        { id: 'reversibilita', plain: true, term: 'Reversibility', italian: 'Reversibilità', definition: t('Quanto è facile tornare indietro se la soluzione sbaglia.', 'How easy it is to go back if the solution gets it wrong.') },
        { id: 'time-to-value', term: 'Time to value', italian: 'Tempo al valore', definition: t('Quanto passa prima del primo risultato misurabile.', 'How long it takes to reach the first measurable result.') },
        { id: 'replicabilita', term: 'Replicability', italian: 'Replicabilità', definition: t('Possibilità di usare la stessa logica su altre linee o altri siti.', 'The chance to use the same logic on other lines or other sites.') },
        { id: 'rilascio-lotto', term: 'Batch release', italian: 'Rilascio del lotto', definition: t('La decisione formale che un lotto di prodotto può essere venduto.', 'The formal decision that a batch of product can be sold.') }
      ],
      example: {
        title: t('Quattro candidati, pesi decisi prima', 'Four candidates, weights set in advance'),
        table: {
          columns: [
            t('Candidato', 'Candidate'),
            t('Valore', 'Value'),
            t('Fattibilità', 'Feasibility'),
            t('Rischio', 'Risk'),
            t('Tempo', 'Time'),
            t('Replic.', 'Repl.'),
            t('Totale', 'Total'),
            t('Cancello', 'Gate')
          ],
          rows: [
            [t('Ridurre i microfermi', 'Cut micro-stops'), t('8', '8'), t('8', '8'), t('8', '8'), t('8', '8'), t('9', '9'), t('106', '106'), t('Passa', 'Passes')],
            [t('Avviso di manutenzione predittiva', 'Predictive maintenance alert'), t('9', '9'), t('7', '7'), t('8', '8'), t('6', '6'), t('7', '7'), t('99', '99'), t('Passa', 'Passes')],
            [t('Criterio di qualità', 'Quality criterion'), t('7', '7'), t('8', '8'), t('7', '7'), t('8', '8'), t('6', '6'), t('94', '94'), t('Passa', 'Passes')],
            [t('Rilascio automatico del lotto', 'Automatic batch release'), t('10', '10'), t('6', '6'), t('2', '2'), t('5', '5'), t('8', '8'), t('98', '98'), t('Non passa', 'Fails')]
          ]
        },
        steps: [
          t('I pesi sono Valore 4, Fattibilità 3, Rischio 2, Tempo 2, Replicabilità 2, decisi prima di vedere i punteggi.', 'The weights are Value 4, Feasibility 3, Risk 2, Time 2, Replicability 2, set before seeing any score.'),
          t('Il primo candidato fa (4x8) + (3x8) + (2x8) + (2x8) + (2x9) = 32 + 24 + 16 + 16 + 18 = 106.', 'The first candidate scores (4x8) + (3x8) + (2x8) + (2x8) + (2x9) = 32 + 24 + 16 + 16 + 18 = 106.'),
          t('Il secondo ha il valore più alto fra gli ammessi, 9 contro 8, ma perde perché arriva più tardi e si replica peggio.', 'The second has the highest value among those admitted, 9 against 8, but loses because it arrives later and replicates worse.'),
          t('Il quarto ha il valore più alto in assoluto, 10, ed è escluso: deciderebbe da solo il rilascio di un lotto.', 'The fourth has the highest value of all, 10, and is ruled out: it would release a batch on its own.')
        ],
        takeaway: t(
          'La frase da dire a colloquio è questa: il candidato con il valore più alto è quello che abbiamo escluso, perché avrebbe deciso una conformità senza approvazione umana. Un cancello non si compensa con il punteggio.',
          'The sentence to say in an interview is this: the candidate with the highest value is the one we removed, because it would have decided a compliance question with no human approval. A gate cannot be bought with a score.'
        )
      },
      englishBlock: {
        lines: [
          'I use five things: the value, the data we already have, the risk, how fast we see a result, and whether we can repeat it elsewhere.',
          'I set the weights before I look at the scores.',
          'Then I have one rule that cannot be broken: no system decides on its own if a batch can go out. It can suggest, a person decides.',
          'The candidate with the highest value was the one we removed. A hard rule is not something you can buy with a high score.'
        ],
        why: 'Cannot be broken, suggest, removed, buy with a score. Immagini concrete al posto di termini come non-negotiable constraint o eligibility criteria.'
      },
      quiz: [
        {
          id: 'm1u4-q1',
          prompt: 'Quando vanno decisi i pesi dei criteri?',
          options: [
            'Dopo aver visto i punteggi, per tararli meglio',
            'Prima di guardare i punteggi dei candidati',
            'Non serve deciderli',
            'Li decide il fornitore'
          ],
          correctOption: 1,
          explanation: 'Se li decidi dopo, stai costruendo una giustificazione per una scelta già fatta, e in riunione si vede.',
          final: true
        },
        {
          id: 'm1u4-q2',
          prompt: 'Un candidato ha il punteggio più alto ma sfonda un cancello. Cosa succede?',
          options: [
            'Viene scelto, il punteggio è quello che conta',
            'Viene escluso dalla classifica',
            'Si posiziona ultimo',
            'Si chiede una deroga'
          ],
          correctOption: 1,
          explanation: 'Un cancello non si compensa con il punteggio: il candidato proprio non partecipa.'
        },
        {
          id: 'm1u4-q3',
          prompt: 'Qual è il cancello tipico in una produzione regolamentata?',
          options: [
            'Il budget massimo per progetto',
            'Nessun sistema decide da solo il rilascio di un prodotto o questioni di sicurezza',
            'L\'uso obbligatorio di fornitori certificati',
            'Il limite di tempo di sei mesi'
          ],
          correctOption: 1,
          explanation: 'Il sistema può proporre. La decisione di conformità resta di una persona autorizzata.'
        },
        {
          id: 'm1u4-q4',
          prompt: 'Nell\'esempio, quanto fa il punteggio del primo candidato?',
          options: ['82', '96', '106', '120'],
          correctOption: 2,
          explanation: '(4x8) + (3x8) + (2x8) + (2x8) + (2x9) fa 32 + 24 + 16 + 16 + 18, cioè 106.'
        },
        {
          id: 'm1u4-q5',
          prompt: 'Perché la replicabilità è un criterio da lead e non da specialista?',
          options: [
            'Perché costa meno',
            'Perché una soluzione legata a una macchina presente in un solo sito vale meno di una che tocca un processo comune',
            'Perché lo richiede la governance',
            'Perché riduce i tempi di sviluppo'
          ],
          correctOption: 1,
          explanation: 'Uno specialista ottimizza il caso singolo. Un lead sceglie pensando a cosa si potrà standardizzare fra due anni.'
        },
        {
          id: 'm1u4-q6',
          prompt: 'Cosa vuol dire reversibilità in questo contesto?',
          options: [
            'Poter annullare il contratto',
            'Poter tornare indietro senza danni permanenti se la soluzione sbaglia',
            'Poter usare la soluzione in due reparti',
            'Poter cambiare fornitore'
          ],
          correctOption: 1,
          explanation: 'Leggere dati è reversibile. Creare in automatico un record ufficiale spesso non lo è.'
        },
        {
          id: 'm1u4-q7',
          prompt: 'A cosa serve spostare un peso di un punto e rifare il calcolo?',
          options: [
            'A far vincere il candidato preferito',
            'A verificare che la scelta non dipenda da una taratura fine dei pesi',
            'A soddisfare la procedura aziendale',
            'A ridurre il numero di candidati'
          ],
          correctOption: 1,
          explanation: 'Se la classifica non cambia, la decisione è robusta e molto più difficile da contestare.'
        }
      ],
      sourceIds: ['nist-ai-rmf-1-0', 'pmi-information-technology']
    },

    {
      id: 'governance-interfunzionale',
      stage: 6,
      estimatedMinutes: 6,
      title: t('Governance interfunzionale: allineare le funzioni e gestire lo sponsor', 'Cross-functional governance: aligning functions and handling the sponsor'),
      stageLabel: t('Attraversa tutte le tappe: le persone sono la condizione perché il progetto esista.', 'It runs across every step: people are the condition for the project to exist at all.'),
      objective: t(
        'Saper rispondere a un\'obiezione con un controllo verificabile invece che con una rassicurazione.',
        'Be able to answer an objection with a check anyone can verify, instead of a reassurance.'
      ),
      theory: [
        t(
          'In una fabbrica ogni funzione difende qualcosa di reale. Se ti presenti con una soluzione già fatta, ognuna troverà il motivo per bloccarla, e avrà ragione. Se invece sai in anticipo cosa difende ciascuno, puoi costruire la proposta insieme a loro.',
          'In a plant every function is protecting something real. If you show up with a finished solution, each of them will find a reason to block it, and they will be right. If instead you know in advance what each one protects, you can build the proposal with them.'
        ),
        {
          numbered: false,
          steps: [
            { name: t('Produzione', 'Production'), text: t('Difende la continuità della linea. Ti dirà: non posso fermare la linea per una prova.', 'It protects the continuity of the line. It will tell you: I cannot stop the line for a trial.') },
            { name: t('Qualità', 'Quality'), text: t('Difende la conformità e la tracciabilità. Ti chiederà: come lo dimostri a un ispettore?', 'It protects compliance and traceability. It will ask: how do you prove it to an inspector?') },
            { name: t('IT', 'IT'), text: t('Difende la sostenibilità nel tempo. Ti chiederà: fra due anni chi lo mantiene?', 'It protects what it will have to maintain. It will ask: who keeps it alive in two years?') },
            { name: t('Sicurezza informatica', 'Security'), text: t('Difende il confine fra rete d\'ufficio e rete di fabbrica. Ti dirà: non apriamo collegamenti verso la produzione.', 'It protects the boundary between office and plant networks. It will tell you: we do not open links into production.') },
            { name: t('Finanza', 'Finance'), text: t('Difende il ritorno. Ti chiederà: quanto costa e quando rientra?', 'It protects the return. It will ask: what does it cost and when does it pay back?') },
            { name: t('Manutenzione', 'Maintenance'), text: t('Difende la programmazione dei tecnici. Ti dirà: i miei tecnici non hanno tempo per una cosa in più.', 'It protects its technicians\' schedule. It will tell you: my technicians have no time for one more thing.') }
          ]
        },
        {
          steps: [
            { name: t('Riformula', 'Say it back'), text: t('Ripeti l\'obiezione senza addolcirla, così chi l\'ha sollevata si riconosce.', 'Repeat the objection without softening it, so the person recognises themselves in it.') },
            { name: t('Accetta la parte vera', 'Accept the true part'), text: t('Quasi tutte le obiezioni ne hanno una, e negarla ti costa credibilità.', 'Almost every objection has one, and denying it costs you credibility.') },
            { name: t('Proponi un controllo', 'Offer a check'), text: t('Una cosa specifica e verificabile, non una rassicurazione generica.', 'Something specific and verifiable, not a general reassurance.') }
          ]
        },
        t(
          'La differenza fra una rassicurazione e un controllo è che il controllo si può verificare. "Sarà semplice da usare" è una rassicurazione. "In modalità ombra non aggiunge nessun passaggio, e nella fase successiva la conferma è un clic con la fonte già aperta" è un controllo.',
          'The difference between a reassurance and a check is that a check can be verified. "It will be easy to use" is a reassurance. "In shadow mode it adds no extra step, and later the confirmation is one click with the source already open" is a check.'
        ),
        t(
          'Tre cose separano un ruolo di lead da un ruolo tecnico. Lo sponsor ha l\'autorità di sbloccare risorse e di respingere le obiezioni che non reggono, e va tenuto informato con pochi numeri: uno sponsor a cui porti ogni dettaglio smette di rispondere. I conflitti fra funzioni non si risolvono convincendo, ma rendendo esplicito chi decide cosa. E l\'adozione si misura, con utenti attivi, frequenza d\'uso e proposte accettate. C\'è poi la paura che nessuno dice ad alta voce: essere valutati attraverso lo strumento. Va affrontata per prima, dichiarando a cosa servono i registri e a cosa non servono.',
          'Three things separate a lead from a technical role. The sponsor has the authority to unlock resources and to push back on weak objections, and should be kept informed with few numbers: a sponsor who gets every detail stops answering. Conflicts between functions are not solved by convincing people, but by writing down who decides what. And adoption is measured, with active users, frequency of use and accepted suggestions. Then there is the fear nobody says out loud: being judged through the tool. Deal with it first, by saying what the records are for and what they are not for.'
        )
      ],
      keyPoints: [
        t('Riformula, accetta la parte vera, proponi un controllo verificabile.', 'Say it back, accept the true part, offer a check that can be verified.'),
        t('Una deroga senza scadenza è una regola nuova introdotta di nascosto.', 'A waiver with no expiry date is a new rule introduced in silence.'),
        t('L\'adozione si misura, non si spera.', 'Adoption is measured, not hoped for.')
      ],
      terminology: [
        { id: 'stakeholder', term: 'Stakeholder', italian: 'Portatore di interesse', definition: t('Chi subisce, decide o paga le conseguenze del progetto.', 'Anyone who bears, decides or pays for the consequences of the project.') },
        { id: 'cross-functional', term: 'Cross-functional', italian: 'Interfunzionale', definition: t('Che coinvolge più reparti diversi con obiettivi diversi.', 'Involving several departments with different goals.') },
        { id: 'controllo-verificabile', plain: true, term: 'Verifiable control', italian: 'Controllo verificabile', definition: t('Una risposta a un\'obiezione che qualcuno può misurare.', 'An answer to an objection that somebody can measure.') },
        { id: 'deroga', plain: true, term: 'Waiver', italian: 'Deroga', definition: t('Eccezione approvata a una regola, che deve sempre avere una scadenza.', 'An approved exception to a rule, which must always have an expiry date.') },
        { id: 'sponsor', term: 'Sponsor', italian: 'Sponsor', definition: t('Chi ha l\'autorità di sbloccare risorse e di respingere le obiezioni che non reggono.', 'The person with the authority to unlock resources and reject objections that do not hold.') },
        { id: 'adozione', term: 'Adoption', italian: 'Adozione', definition: t('Quanto la soluzione viene davvero usata, misurata su utenti attivi, frequenza e proposte accettate.', 'How much the solution is really used, measured by active users, frequency and accepted suggestions.') },
        { id: 'upskilling', term: 'Upskilling', italian: 'Crescita delle competenze', definition: t('Portare le persone al livello che serve per usare bene lo strumento nuovo.', 'Bringing people to the level they need to use the new tool well.') }
      ],
      example: {
        title: t('Quattro obiezioni reali e le risposte che funzionano', 'Four real objections and the answers that work'),
        table: {
          columns: [t('Chi', 'Who'), t('Obiezione', 'Objection'), t('Controllo proposto', 'Check offered')],
          rows: [
            [
              t('Sicurezza informatica', 'Security'),
              t('Non apriamo un collegamento verso la rete di produzione', 'We do not open a link into the plant network'),
              t('Leggiamo dall\'archivio di processo, già in zona intermedia, in uscita e a orari concordati. Nessun canale in entrata, nessuna credenziale permanente.', 'We read from the process historian, already in the buffer zone, outbound and at agreed times. No inbound channel, no permanent credentials.')
            ],
            [
              t('Produzione', 'Production'),
              t('Non posso fermare la linea per una prova', 'I cannot stop the line for a trial'),
              t('Non serve fermarla: per 6 settimane il sistema gira in ombra, registra e basta, nessuno lo vede.', 'No need to stop it: for 6 weeks the system runs in shadow, it only records, nobody sees it.')
            ],
            [
              t('Qualità', 'Quality'),
              t('Come lo dimostri a un ispettore?', 'How do you prove it to an inspector?'),
              t('Ogni avviso resta registrato con data, valore misurato e destinatario. Il modo di registrare non cambia, si aggiunge solo un avviso in anticipo.', 'Every alert is recorded with date, measured value and recipient. The way we record does not change, we only add an earlier warning.')
            ],
            [
              t('Manutenzione', 'Maintenance'),
              t('I miei tecnici non hanno tempo', 'My technicians have no time'),
              t('Non aggiungiamo interventi: spostiamo un intervento che già facevi dalla fermata di emergenza a quella programmata del sabato.', 'We add no jobs: we move a job you already do from the emergency stop to the planned Saturday stop.')
            ]
          ]
        },
        steps: [
          t('Ogni risposta parte dalla riformulazione dell\'obiezione con le parole di chi l\'ha sollevata.', 'Every answer starts by saying the objection back in the words of the person who raised it.'),
          t('Nessuna promessa: ogni risposta è una cosa che si può verificare fra 6 settimane.', 'No promises: every answer is something that can be checked in 6 weeks.'),
          t('Se serve una deroga, ha sempre una scadenza scritta, altrimenti diventa una regola nuova.', 'If a waiver is needed, it always has a written expiry date, otherwise it becomes a new rule.')
        ],
        takeaway: t(
          'Il conflitto fra funzioni si chiude scrivendo qual è il cancello non negoziabile e chi decide dentro il resto. Una volta scritto, smette di essere personale.',
          'A conflict between functions closes when you write down what the non-negotiable gate is and who decides within everything else. Once written, it stops being personal.'
        )
      },
      englishBlock: {
        lines: [
          'Every team is protecting something real. Production protects the line, quality protects the record, IT protects what they will have to maintain.',
          'So I say the objection back to them first, in their own words. Then I say which part of it is right.',
          'And then I give them something they can check, not just a promise. "It will be easy" is not an answer.',
          'For six weeks the system only watches and writes. Nobody has to trust it yet.'
        ],
        why: 'Protecting, say it back, which part is right, something they can check, only watches. Nessun stakeholder alignment, nessun change management: parole vere di una conversazione vera.'
      },
      quiz: [
        {
          id: 'm1u5-q1',
          prompt: 'Qual è il primo passo quando ricevi un\'obiezione?',
          options: [
            'Spiegare perché non è un problema',
            'Riformularla senza addolcirla, così chi l\'ha sollevata si riconosce',
            'Chiedere di parlarne dopo',
            'Portarla alla direzione'
          ],
          correctOption: 1,
          explanation: 'Se la persona non si riconosce nella tua riformulazione, tutto quello che dici dopo non viene ascoltato.',
          final: true
        },
        {
          id: 'm1u5-q2',
          prompt: 'Che differenza c\'è tra una rassicurazione e un controllo?',
          options: [
            'Il controllo è più tecnico',
            'Il controllo si può verificare, la rassicurazione no',
            'La rassicurazione va data per prima',
            'Nessuna differenza pratica'
          ],
          correctOption: 1,
          explanation: '"Sarà semplice da usare" non si può misurare. "In ombra non aggiunge passaggi" invece sì.'
        },
        {
          id: 'm1u5-q3',
          prompt: 'Cosa difende tipicamente il reparto qualità?',
          options: [
            'La velocità della linea',
            'La conformità e la possibilità di dimostrarla',
            'Il budget del progetto',
            'La sicurezza della rete'
          ],
          correctOption: 1,
          explanation: 'La domanda che ti farà è sempre una versione di "come lo dimostri a un ispettore".'
        },
        {
          id: 'm1u5-q4',
          prompt: 'La sicurezza informatica non vuole collegamenti verso la rete di produzione. Qual è la risposta migliore?',
          options: [
            'Chiedere una deroga alla direzione',
            'Leggere da un sistema in zona intermedia, in uscita, senza canali in entrata',
            'Spiegare che il rischio è basso',
            'Rimandare il progetto'
          ],
          correctOption: 1,
          explanation: 'Si toglie il motivo dell\'obiezione invece di negarla: quasi sempre il dato che serve è già in una zona intermedia.'
        },
        {
          id: 'm1u5-q5',
          prompt: 'Perché una deroga deve avere una scadenza?',
          options: [
            'Per motivi contabili',
            'Perché una deroga senza scadenza diventa una regola nuova introdotta di nascosto',
            'Perché lo richiede la normativa',
            'Per poter cambiare fornitore'
          ],
          correctOption: 1,
          explanation: 'Le eccezioni permanenti erodono le regole senza che nessuno lo abbia deciso.'
        },
        {
          id: 'm1u5-q6',
          prompt: 'Qual è l\'obiezione che quasi nessuno dice ad alta voce?',
          options: [
            'Il costo del progetto',
            'La paura di essere valutati attraverso lo strumento',
            'La difficoltà tecnica',
            'La mancanza di formazione'
          ],
          correctOption: 1,
          explanation: 'Se gli operatori sospettano che i dati misurino la loro velocità, l\'uso diventa difensivo e i dati diventano inutili.'
        },
        {
          id: 'm1u5-q7',
          prompt: 'Come si misura l\'adozione di una soluzione?',
          options: [
            'Chiedendo agli operatori se sono soddisfatti',
            'Con utenti attivi sul totale, frequenza d\'uso e proposte accettate',
            'Contando le licenze acquistate',
            'Con le ore di formazione erogate'
          ],
          correctOption: 1,
          explanation: 'Se l\'uso cala dopo tre settimane hai un problema di fiducia o di utilità, e la formazione non lo risolve.'
        }
      ],
      sourceIds: ['pmi-state-of-ai', 'microsoft-adoption-change']
    }
  ]
}

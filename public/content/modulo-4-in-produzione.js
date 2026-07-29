const t = (it, en) => ({ it, en })

/**
 * Module 4 - Taking an idea into production: MVP, credible experiments, safety
 * nets, industrialisation and the decision to scale or stop. The last unit
 * rebuilds the whole course as a two minute spoken answer.
 * @type {import('../types.js').Lesson}
 */
export const inProduzioneLesson = {
  id: 'in-produzione',
  slug: 'in-produzione',
  moduleNumber: 4,
  durationMinutes: 32,
  title: t('Portare un\'idea in produzione', 'Taking an idea into production'),
  summary: t(
    'Prototipo, MVP e pilota, come si prova qualcosa in modo credibile, le reti di sicurezza, il monitoraggio nel tempo e la decisione finale, con il racconto di due minuti.',
    'Prototype, MVP and pilot, how to run a credible trial, the safety nets, monitoring over time, and the final decision, with the two minute story.'
  ),
  units: [
    {
      id: 'mvp-prototipo-pilota',
      stage: 5,
      estimatedMinutes: 6,
      title: t('MVP, prototipo, pilota: tre cose diverse', 'MVP, prototype, pilot: three different things'),
      stageLabel: t('Tappa 5 di 7: provo in piccolo, partendo dall\'ipotesi più rischiosa.', 'Step 5 of 7: I try it small, starting from the riskiest assumption.'),
      objective: t(
        'Saper scegliere fra prototipo, MVP e pilota in base alla domanda a cui devi rispondere.',
        'Be able to choose between prototype, MVP and pilot based on the question you need to answer.'
      ),
      theory: [
        t(
          'Il prototipo serve a rispondere a una domanda tecnica: si può fare? Non va in mano a nessun utente reale, non deve essere affidabile, si butta, e dura giorni. L\'MVP, Minimum Viable Product, prodotto minimo utilizzabile, serve a rispondere a una domanda di valore: se lo do a qualcuno, cambia qualcosa nel suo lavoro? È la versione più piccola che una persona vera può usare per lavorare davvero, e dura settimane.',
          'A prototype answers a technical question: can we do it? It never reaches a real user, it does not have to be reliable, it gets thrown away, and it takes days. An MVP, Minimum Viable Product, answers a value question: if I give it to someone, does anything change in their work? It is the smallest version a real person can use to actually do their job, and it takes weeks.'
        ),
        t(
          'Attenzione alla parola minimum: non significa fatto male, significa poche funzioni ma vere. Un MVP che non si può usare in produzione non è un MVP, è un prototipo con un nome più ambizioso. Il pilota invece risponde a una domanda di scala: funziona in condizioni reali, per un tempo lungo, con persone che non sono nel progetto? Gira su una linea o un reparto, con turni veri e guasti veri, e dura mesi.',
          'Careful with the word minimum: it does not mean badly made, it means few functions but real ones. An MVP you cannot use in production is not an MVP, it is a prototype with a more ambitious name. A pilot answers a question of scale: does it work in real conditions, for a long time, with people who are not in the project? It runs on a line or an area, with real shifts and real breakdowns, and it takes months.'
        ),
        t(
          'La sequenza logica è semplice: prototipo se il dubbio è tecnico, MVP se il dubbio è sul valore, pilota se il dubbio è sulla tenuta. Confondere i tre è l\'errore più frequente, e quasi sempre nella stessa direzione: chiamare MVP un prototipo ben fatto.',
          'The logic is simple: prototype if the doubt is technical, MVP if the doubt is about value, pilot if the doubt is about durability. Mixing the three is the most frequent mistake, and almost always in the same direction: calling a well made prototype an MVP.'
        ),
        t(
          'E qui la regola che vale più di tutte: parti dall\'ipotesi più rischiosa, cioè quella che, se falsa, fa crollare tutto il resto. Nella manutenzione predittiva non è "il modello sarà accurato", è "i dati di vibrazione degli ultimi tre anni sono utilizzabili". Se quella è falsa, l\'accuratezza non si misura nemmeno.',
          'And here is the rule that matters most: start from the riskiest assumption, that is the one which, if false, brings everything else down. In predictive maintenance it is not "the model will be accurate", it is "the vibration data of the last three years is usable". If that one is false, accuracy is never even measured.'
        ),
        t(
          'Molti progetti falliscono perché costruiscono per otto settimane e solo alla nona scoprono che l\'ipotesi rischiosa era falsa. La prima cosa da fare è quella che può uccidere il progetto prima possibile, quando costa poco. E vale anche per l\'ipotesi meno tecnica di tutte: che la persona che riceve il risultato lo userà davvero.',
          'Many projects fail because they build for eight weeks and only in the ninth discover the risky assumption was false. The first thing to do is the one that can kill the project as early as possible, when it is cheap. And that includes the least technical assumption of all: that the person receiving the result will actually use it.'
        )
      ],
      keyPoints: [
        t('Prototipo, MVP e pilota rispondono a tre domande diverse.', 'Prototype, MVP and pilot answer three different questions.'),
        t('Minimum non vuol dire fatto male, vuol dire poche funzioni ma vere.', 'Minimum does not mean badly made, it means few functions but real ones.'),
        t('Si verifica per prima l\'ipotesi che può uccidere il progetto.', 'You test the assumption that can kill the project first.')
      ],
      terminology: [
        { id: 'prototipo', term: 'Prototype', italian: 'Prototipo', definition: t('Prova tecnica usa e getta: risponde a "si può fare".', 'A throwaway technical trial: it answers "can we do it".') },
        { id: 'mvp', term: 'MVP', italian: 'Prodotto minimo utilizzabile', definition: t('La versione più piccola che una persona vera può usare per lavorare.', 'The smallest version a real person can use to do their job.') },
        { id: 'ipotesi-rischiosa', term: 'Riskiest assumption', italian: 'Ipotesi più rischiosa', definition: t('La cosa che, se falsa, fa crollare tutto il progetto.', 'The thing that, if false, brings the whole project down.') },
        { id: 'time-boxing', term: 'Time-boxing', italian: 'Tempo prefissato', definition: t('Fissare in anticipo quanto tempo si dedica prima di decidere.', 'Fixing in advance how much time you spend before deciding.') },
        { id: 'iterazione', term: 'Iteration', italian: 'Iterazione', definition: t('Un ciclo breve: costruisci un pezzo, lo provi, impari, correggi.', 'A short cycle: build a piece, try it, learn, fix it.') },
        { id: 'agile', term: 'Agile', italian: 'Agile', definition: t('Modo di lavorare a cicli brevi con verifica frequente, invece che con un piano unico lungo.', 'Working in short cycles with frequent checks, instead of one long plan.') }
      ],
      example: {
        title: t('Le ipotesi ordinate per rischio, non per comodità', 'Assumptions ordered by risk, not by convenience'),
        table: {
          columns: [t('Ipotesi', 'Assumption'), t('Se è falsa', 'If it is false'), t('Costo per verificarla', 'Cost to check it'), t('Ordine', 'Order')],
          rows: [
            [t('I dati storici di vibrazione sono utilizzabili', 'The historical vibration data is usable'), t('Il progetto non esiste', 'The project does not exist'), t('3 giorni', '3 days'), t('1', '1')],
            [t('I guasti passati hanno data e ora corrette', 'Past failures have the right date and time'), t('Non si può addestrare né valutare', 'You can neither train nor evaluate'), t('2 giorni', '2 days'), t('2', '2')],
            [t('Esiste abbastanza anticipo per intervenire', 'There is enough warning time to act'), t('L\'avviso è inutile anche se corretto', 'The alert is useless even when right'), t('1 giorno', '1 day'), t('3', '3')],
            [t('Il pianificatore userà l\'avviso', 'The planner will use the alert'), t('Nessun valore realizzato', 'No value is realised'), t('1 giorno di intervista', '1 day of interviews'), t('3 bis', '3b')],
            [t('Il modello raggiunge un\'accuratezza utile', 'The model reaches useful accuracy'), t('Si riprova o si cambia approccio', 'You retry or change approach'), t('4 settimane', '4 weeks'), t('4', '4')]
          ]
        },
        steps: [
          t('Le quattro verifiche più importanti costano 6 giorni in tutto, contro le 4 settimane della costruzione del modello.', 'The four most important checks cost 6 days in total, against the 4 weeks of building the model.'),
          t('L\'ipotesi "il pianificatore userà l\'avviso" costa un giorno e viene quasi sempre dimenticata.', 'The assumption "the planner will use the alert" costs one day and is almost always forgotten.'),
          t('Una versione concreta dell\'MVP: un foglio con i 10 cuscinetti più a rischio, mandato ogni lunedì al pianificatore. Nessuna applicazione.', 'A concrete MVP: a sheet with the 10 riskiest bearings, sent to the planner every Monday. No app at all.')
        ],
        takeaway: t(
          'Se il pianificatore usa la lista e cambia la sua settimana, l\'ipotesi di valore è verificata e vale la pena costruire. Se non la apre, hai risparmiato sei mesi.',
          'If the planner uses the list and changes his week, the value assumption is confirmed and it is worth building. If he never opens it, you saved six months.'
        )
      },
      englishBlock: {
        lines: [
          'A prototype answers "can we do it". An MVP answers "does it change anything for someone". A pilot answers "does it hold up in the real world".',
          'Minimum does not mean bad. It means few things, but real ones.',
          'I always start with the assumption that would kill the project. Here it was not the model. It was whether the old vibration data was usable at all.',
          'Our first version was a list of ten bearings, sent by email every Monday. No app. If the planner does not use a list, he will not use an app either.'
        ],
        why: 'Can we do it, does it change anything, would kill the project, no app. L\'ultima frase è la più efficace: concreta, un po\' autoironica, e dimostra che sai risparmiare soldi.'
      },
      quiz: [
        {
          id: 'm4u1-q1',
          prompt: 'A che domanda risponde un MVP?',
          options: [
            'Si può fare tecnicamente?',
            'Se lo do a qualcuno, cambia qualcosa nel suo lavoro?',
            'Regge per mesi in condizioni reali?',
            'Quanto costa?'
          ],
          correctOption: 1,
          explanation: 'Il prototipo risponde alla prima domanda, il pilota alla terza.',
          final: true
        },
        {
          id: 'm4u1-q2',
          prompt: 'Cosa significa "minimum" in MVP?',
          options: [
            'Fatto in fretta e male',
            'Poche funzioni, ma vere e usabili davvero',
            'Con il budget più basso possibile',
            'Con meno persone possibile'
          ],
          correctOption: 1,
          explanation: 'Un MVP non usabile in produzione non è un MVP, è un prototipo.'
        },
        {
          id: 'm4u1-q3',
          prompt: 'Cos\'è l\'ipotesi più rischiosa?',
          options: [
            'Quella più difficile da realizzare',
            'Quella che, se falsa, fa crollare tutto il resto',
            'Quella con il costo più alto',
            'Quella che la direzione teme di più'
          ],
          correctOption: 1,
          explanation: 'Va verificata per prima, quando costa poco.'
        },
        {
          id: 'm4u1-q4',
          prompt: 'Nell\'esempio, qual era l\'ipotesi più rischiosa?',
          options: [
            'Che il modello fosse accurato',
            'Che i dati storici di vibrazione fossero utilizzabili',
            'Che il budget fosse sufficiente',
            'Che i sensori funzionassero'
          ],
          correctOption: 1,
          explanation: 'Se i dati non servono, l\'accuratezza non si misura nemmeno. Tre giorni per saperlo.'
        },
        {
          id: 'm4u1-q5',
          prompt: 'Qual è l\'ipotesi che viene quasi sempre dimenticata?',
          options: [
            'La qualità dei dati',
            'Che la persona che riceve il risultato lo userà davvero',
            'La disponibilità dei sensori',
            'La compatibilità dei sistemi'
          ],
          correctOption: 1,
          explanation: 'Costa un giorno di intervista e ha fatto morire più progetti di qualunque problema tecnico.'
        },
        {
          id: 'm4u1-q6',
          prompt: 'Perché mandare un foglio via posta elettronica è un MVP valido?',
          options: [
            'Perché costa poco',
            'Perché verifica l\'ipotesi di valore prima di costruire: se non usano la lista, non useranno l\'applicazione',
            'Perché è veloce da fare',
            'Non lo è, serve un\'applicazione'
          ],
          correctOption: 1,
          explanation: 'Verifica la cosa giusta con il mezzo più economico.'
        },
        {
          id: 'm4u1-q7',
          prompt: 'Quando serve un pilota invece di un MVP?',
          options: [
            'Quando serve più budget',
            'Quando il dubbio è sulla tenuta in condizioni reali, per un tempo lungo e con persone esterne al progetto',
            'Quando l\'MVP è fallito',
            'Quando la direzione lo chiede'
          ],
          correctOption: 1,
          explanation: 'Turni veri, guasti veri, mesi: è un\'altra domanda.'
        }
      ],
      sourceIds: ['scrum-guide', 'aws-mlops-planning']
    },

    {
      id: 'esperimento-credibile',
      stage: 5,
      estimatedMinutes: 6,
      title: t('Come si prova qualcosa in modo credibile', 'How to run a trial people believe'),
      stageLabel: t('Tappa 5 di 7: la prova che regge a una domanda scomoda.', 'Step 5 of 7: the trial that survives an awkward question.'),
      objective: t(
        'Saper descrivere a voce una scheda di esperimento, e saper togliere dal proprio risultato la parte che non è merito tuo.',
        'Be able to describe an experiment sheet out loud, and to subtract from your result the part that is not yours.'
      ),
      theory: [
        t(
          'Il problema di ogni prova aziendale è che il mondo cambia mentre tu provi. Se dopo il tuo progetto i fermi calano, come fai a sapere che è merito tuo e non del nuovo capo turno, della manutenzione straordinaria di marzo o del fatto che a luglio si produce meno? Servono quattro cose.',
          'The problem with every trial inside a company is that the world moves while you are testing. If downtime drops after your project, how do you know it is your doing and not the new shift leader, the extra maintenance in March, or the fact that July output is lower? You need four things.'
        ),
        t(
          'Prima, una baseline, cioè il punto di partenza misurato prima. Va presa su un periodo abbastanza lungo da contenere la variabilità normale, almeno quattro settimane, e va firmata da chi possiede il processo prima di iniziare, perché una baseline decisa dopo è una baseline scelta. Seconda, un confronto: non basta guardare il prima e il dopo, serve un gruppo di controllo, cioè una linea simile dove non fai nulla.',
          'First, a baseline, that is the starting point measured beforehand. Take it over a period long enough to contain normal variation, at least four weeks, and have it signed by the process owner before you start, because a baseline decided afterwards is a baseline chosen. Second, a comparison: before and after is not enough, you need a control group, that is a similar line where you do nothing.'
        ),
        t(
          'Terza, un criterio di successo scritto prima. Non "vediamo come va", ma per esempio: consideriamo l\'esperimento riuscito se i fermi non pianificati scendono di almeno il 20 percento rispetto alla baseline, mantenendo lo scarto invariato. Scritto prima, altrimenti a fine progetto ognuno trova nei dati la conferma di quello che sperava. Quarta, una durata prefissata: otto settimane, poi si decide. Senza una data, i progetti che non funzionano non muoiono mai, vengono prorogati.',
          'Third, a success criterion written before. Not "let us see how it goes", but for example: we call the experiment a success if unplanned downtime drops by at least 20 percent against the baseline, with scrap unchanged. Written before, otherwise at the end everyone finds in the data the confirmation of what they hoped for. Fourth, a fixed duration: eight weeks, then we decide. Without a date, projects that do not work never die, they get extended.'
        ),
        t(
          'E poi il concetto che vale da solo l\'intera unità: la modalità ombra. Il sistema gira su dati veri, fa la sua previsione, la registra, ma nessuno la vede e niente cambia. Alla fine confronti le previsioni con quello che è successo davvero. È la cosa più intelligente che puoi proporre a un colloquio, perché ha rischio zero: se il modello sbaglia, non è successo niente a nessuno.',
          'And then the idea that is worth the whole unit on its own: shadow mode. The system runs on real data, makes its call, records it, but nobody sees it and nothing changes. At the end you compare the predictions with what really happened. It is the smartest thing you can propose in an interview, because it carries zero risk: if the model is wrong, nothing happened to anybody.'
        ),
        t(
          'Un avvertimento onesto: una linea di controllo non è mai identica. Prodotti diversi, operatori diversi, macchine di età diversa. Il confronto riduce il dubbio, non lo elimina, e dirlo apertamente ti rende più credibile, non meno.',
          'An honest warning: a control line is never identical. Different products, different operators, machines of different ages. The comparison reduces the doubt, it does not remove it, and saying so openly makes you more credible, not less.'
        )
      ],
      keyPoints: [
        t('Baseline firmata prima, gruppo di controllo, criterio scritto, durata prefissata.', 'Baseline signed beforehand, control group, written criterion, fixed duration.'),
        t('La modalità ombra ha rischio zero ed è la proposta che convince chi non si fida.', 'Shadow mode carries zero risk and it is the proposal that convinces the sceptics.'),
        t('L\'effetto reale è la differenza con il controllo, non il tuo miglioramento lordo.', 'The real effect is the difference against the control, not your gross improvement.')
      ],
      terminology: [
        { id: 'gruppo-controllo', term: 'Control group', italian: 'Gruppo di controllo', definition: t('Una linea simile dove non si interviene, tenuta per confronto.', 'A similar line where nothing is done, kept for comparison.') },
        { id: 'criterio-successo', plain: true, term: 'Success criterion', italian: 'Criterio di successo', definition: t('La soglia scritta prima che definisce se l\'esperimento è riuscito.', 'The threshold written beforehand that defines whether the experiment succeeded.') },
        { id: 'effetto-novita', term: 'Novelty effect', italian: 'Effetto novità', definition: t('Il miglioramento temporaneo dovuto al fatto che le persone si sanno osservate.', 'The temporary improvement caused by people knowing they are watched.') },
        { id: 'stagionalita', term: 'Seasonality', italian: 'Stagionalità', definition: t('Variazioni regolari legate al periodo dell\'anno.', 'Regular variation linked to the time of year.') },
        { id: 'ab-test', term: 'A/B test', italian: 'Test A/B', definition: t('Confronto fra due varianti applicate a gruppi simili nello stesso periodo.', 'A comparison of two variants applied to similar groups in the same period.') }
      ],
      example: {
        title: t('La scheda di esperimento e la lettura onesta del risultato', 'The experiment sheet and an honest reading of the result'),
        table: {
          columns: [t('Voce', 'Item'), t('Contenuto', 'Content')],
          rows: [
            [t('Ipotesi', 'Hypothesis'), t('Un avviso predittivo al pianificatore riduce i fermi non pianificati sulla linea 3', 'A predictive alert to the planner reduces unplanned downtime on line 3')],
            [t('Baseline', 'Baseline'), t('6,0 ore a settimana, su 4 settimane, firmate dal capo reparto', '6.0 hours a week, over 4 weeks, signed by the area manager')],
            [t('Trattamento e controllo', 'Treatment and control'), t('Linea 3 contro linea 1, stesso prodotto, stessa età macchine', 'Line 3 against line 1, same product, same machine age')],
            [t('Criterio di successo', 'Success criterion'), t('Meno 20 percento sulla linea 3, con almeno 10 punti di differenza dalla linea 1', 'Minus 20 percent on line 3, with at least 10 points of difference from line 1')],
            [t('Criterio di stop', 'Stop criterion'), t('Un solo evento di sicurezza, o scarto in aumento di oltre 0,3 punti', 'A single safety event, or scrap up by more than 0.3 points')],
            [t('Chi decide e quando', 'Who decides and when'), t('Il capo reparto, il 15 del mese, con i dati sul tavolo', 'The area manager, on the 15th, with the data on the table')]
          ]
        },
        steps: [
          t('Risultato: linea 3 da 6,0 a 4,4 ore, cioè meno 27 percento.', 'Result: line 3 from 6.0 to 4.4 hours, that is minus 27 percent.'),
          t('Linea 1, dove non si è fatto nulla: da 5,8 a 5,4 ore, cioè meno 7 percento.', 'Line 1, where nothing was done: from 5.8 to 5.4 hours, that is minus 7 percent.'),
          t('La differenza netta è 20 punti, quindi il criterio è soddisfatto, ma un terzo del miglioramento lordo non era merito del progetto.', 'The net difference is 20 points, so the criterion is met, but a third of the gross improvement was not the project.')
        ],
        takeaway: t(
          'Dire questo a un colloquio è forse la cosa più forte che puoi fare: dimostra che sai leggere un dato senza gonfiarlo.',
          'Saying this in an interview may be the strongest move you have: it shows you can read a number without inflating it.'
        )
      },
      englishBlock: {
        lines: [
          'We measured four weeks before starting, and the plant manager signed the number. Otherwise, at the end, everyone remembers a different starting point.',
          'We wrote down what success would look like before we started.',
          'We ran it in the shadow first. The system made its call, we wrote it down, but nobody saw it and nothing changed on the line.',
          'Line 3 went down twenty-seven percent. But line 1, where we did nothing, went down seven. So the real effect is twenty, not twenty-seven.',
          'The two lines are never exactly the same, so this reduces the doubt, it does not remove it.'
        ],
        why: 'Signed the number, wrote down, made its call, nobody saw it. La frase finale, detta spontaneamente, vale più di dieci minuti di teoria.'
      },
      quiz: [
        {
          id: 'm4u2-q1',
          prompt: 'Perché serve un gruppo di controllo?',
          options: [
            'Per avere più dati',
            'Per distinguere il tuo effetto da quello che sarebbe successo comunque',
            'Per convincere la direzione',
            'Per rispettare la normativa'
          ],
          correctOption: 1,
          explanation: 'Se i fermi calano anche dove non hai fatto nulla, il merito non è tuo.',
          final: true
        },
        {
          id: 'm4u2-q2',
          prompt: 'Quando va scritto il criterio di successo?',
          options: ['Alla fine, quando si vedono i dati', 'Prima di iniziare', 'A metà esperimento', 'Quando lo chiede lo sponsor'],
          correctOption: 1,
          explanation: 'Scritto dopo, ognuno trova nei dati la conferma di quello che sperava.'
        },
        {
          id: 'm4u2-q3',
          prompt: 'Cos\'è la modalità ombra?',
          options: [
            'Un test fatto di notte',
            'Il sistema gira e registra le sue previsioni, ma nessuno le vede e niente cambia',
            'Un modello di riserva',
            'Un test su dati finti'
          ],
          correctOption: 1,
          explanation: 'Rischio zero: è la proposta più intelligente che puoi fare a chi non si fida.'
        },
        {
          id: 'm4u2-q4',
          prompt: 'Linea 3 meno 27 percento, linea di controllo meno 7. Qual è l\'effetto reale?',
          options: ['27 punti', '20 punti', '34 punti', '7 punti'],
          correctOption: 1,
          explanation: 'Conta la differenza netta. Senza controllo avresti attribuito al progetto un terzo di risultato non tuo.'
        },
        {
          id: 'm4u2-q5',
          prompt: 'Perché la baseline va firmata da chi possiede il processo?',
          options: [
            'Per motivi contrattuali',
            'Perché altrimenti a fine progetto ognuno ricorda un punto di partenza diverso',
            'Per la conformità',
            'Per assegnare le responsabilità'
          ],
          correctOption: 1,
          explanation: 'Una baseline decisa dopo è una baseline scelta.'
        },
        {
          id: 'm4u2-q6',
          prompt: 'Perché serve una durata prefissata?',
          options: [
            'Per contenere i costi',
            'Perché senza una data i progetti che non funzionano non muoiono, vengono prorogati',
            'Per rispettare il piano',
            'Per liberare le risorse'
          ],
          correctOption: 1,
          explanation: 'La data di decisione è ciò che rende l\'esperimento un esperimento.'
        },
        {
          id: 'm4u2-q7',
          prompt: 'Il gruppo di controllo non è mai identico. Come si gestisce?',
          options: [
            'Si ignora il problema',
            'Si dichiara apertamente: il confronto riduce il dubbio, non lo elimina',
            'Si sceglie una linea più simile',
            'Si rinuncia al confronto'
          ],
          correctOption: 1,
          explanation: 'Dichiarare il limite ti rende più credibile, non meno.'
        }
      ],
      sourceIds: ['nist-engineering-statistics', 'scrum-guide']
    },

    {
      id: 'sicurezza-controllo-umano',
      stage: 6,
      estimatedMinutes: 6,
      title: t('Sicurezza, controllo umano e regole', 'Safety, human control and rules'),
      stageLabel: t('Tappa 6 di 7: metto in produzione con le reti di sicurezza.', 'Step 6 of 7: I go live with the safety nets.'),
      objective: t(
        'Saper dire cosa rende reale una supervisione umana, e come si misura.',
        'Be able to say what makes human oversight real, and how it is measured.'
      ),
      theory: [
        t(
          'Passare dalla prova alla produzione significa che qualcuno prenderà decisioni vere sulla base di quel sistema. Servono quattro reti di sicurezza, sempre le stesse. La prima è la supervisione umana reale: non basta scrivere che l\'operatore conferma, serve che l\'operatore abbia il tempo, l\'informazione e l\'autorità per dissentire.',
          'Going from trial to production means somebody will make real decisions based on that system. You need four safety nets, always the same ones. The first is real human oversight: it is not enough to write that the operator confirms, the operator needs the time, the information and the authority to disagree.'
        ),
        t(
          'Una domanda da farsi sempre: quante volte, nell\'ultimo mese, qualcuno ha detto no al sistema? Se la risposta è mai, la supervisione non esiste, esiste solo un bottone. La seconda rete è il ripiego: cosa succede se il sistema non risponde? Deve esistere la modalità di prima, ancora funzionante e ancora conosciuta. Se dopo sei mesi nessuno sa più lavorare senza il sistema, hai creato una dipendenza, non un miglioramento.',
          'A question to always ask: how many times in the last month did somebody say no to the system? If the answer is never, oversight does not exist, only a button does. The second net is the fallback: what happens if the system does not answer? The previous way of working has to exist, still working and still known. If after six months nobody knows how to work without the system, you created a dependency, not an improvement.'
        ),
        t(
          'La terza è la procedura scritta, in inglese SOP, Standard Operating Procedure: il documento che dice cosa fa l\'operatore quando arriva l\'avviso, chi chiama, entro quanto, cosa registra. Senza, ognuno fa a modo suo e il risultato non è ripetibile. La quarta è formazione e registrazione: chi è stato formato, quando, su cosa. In una produzione regolamentata non è burocrazia, è ciò che permette di dimostrare che il processo era sotto controllo.',
          'The third is the written procedure, the SOP, Standard Operating Procedure: the document that says what the operator does when the alert arrives, who they call, within how long, what they record. Without it everyone does it their own way and the result is not repeatable. The fourth is training and records: who was trained, when, on what. In regulated manufacturing this is not paperwork, it is what lets you show the process was under control.'
        ),
        t(
          'E poi il cancello non negoziabile, quello che attraversa tutto il corso: un sistema probabilistico non decide da solo su rilascio del prodotto, sicurezza delle persone e conformità. Propone, e la decisione resta a una persona identificabile.',
          'And then the non-negotiable gate, the one that runs through the whole course: a probabilistic system does not decide on its own about product release, people safety or compliance. It suggests, and the decision stays with an identifiable person.'
        ),
        t(
          'Sul quadro normativo ti bastano tre fatti. Il Regolamento europeo sull\'intelligenza artificiale classifica i sistemi per rischio e chiede supervisione umana per quelli ad alto rischio. Nel settore alimentare e farmaceutico i sistemi che incidono sulla qualità del prodotto vanno convalidati, cioè si dimostra per iscritto che fanno quello che devono e se ne conserva la prova. Nel campo OT la norma di riferimento è la serie IEC 62443, quella delle zone e dei condotti.',
          'On the regulatory side three facts are enough. The European AI regulation classifies systems by risk and requires human oversight for high risk ones. In food and pharma, systems that affect product quality must be validated, that is you show in writing that they do what they should and you keep the evidence. In OT the reference is the IEC 62443 series, the one with zones and conduits.'
        )
      ],
      keyPoints: [
        t('Supervisione reale vuol dire tempo, informazione e autorità per dire no.', 'Real oversight means time, information and the authority to say no.'),
        t('Se nessuno dice mai no al sistema, la supervisione è finta.', 'If nobody ever says no to the system, oversight is fake.'),
        t('Un sistema probabilistico propone, non decide su rilascio, sicurezza e conformità.', 'A probabilistic system suggests, it does not decide on release, safety and compliance.')
      ],
      terminology: [
        { id: 'supervisione-umana', term: 'Human oversight', italian: 'Supervisione umana', definition: t('Una persona può capire, contestare e ribaltare la decisione del sistema.', 'A person can understand, challenge and overturn the system decision.') },
        { id: 'sop', term: 'SOP', italian: 'Procedura operativa standard', definition: t('Il documento che descrive cosa fare, passo per passo.', 'The document that describes what to do, step by step.') },
        { id: 'convalida', term: 'Validation', italian: 'Convalida', definition: t('Dimostrare per iscritto che il sistema fa ciò che deve, e conservarne la prova.', 'Showing in writing that the system does what it must, and keeping the evidence.') },
        { id: 'alto-rischio', term: 'High risk', italian: 'Alto rischio', definition: t('Categoria del Regolamento UE che impone obblighi rafforzati.', 'A category of the EU regulation that imposes stronger obligations.') },
        { id: 'automazione-compiacente', term: 'Automation complacency', italian: 'Automazione compiacente', definition: t('Quando le persone smettono di controllare perché si fidano troppo.', 'When people stop checking because they trust the system too much.') }
      ],
      example: {
        title: t('Le reti di sicurezza come le consegneresti davvero', 'The safety nets as you would really deliver them'),
        table: {
          columns: [t('Rete di sicurezza', 'Safety net'), t('Come è stata realizzata', 'How it was built')],
          rows: [
            [t('Supervisione umana', 'Human oversight'), t('L\'avviso va al pianificatore, che vede i tre valori che lo hanno generato e può archiviarlo con un motivo', 'The alert goes to the planner, who sees the three values behind it and can close it with a reason')],
            [t('Ripiego', 'Fallback'), t('La ronda programmata resta attiva. Se il sistema tace per 24 ore si torna al calendario precedente', 'The planned round stays active. If the system is silent for 24 hours we go back to the old schedule')],
            [t('Procedura', 'Procedure'), t('Una pagina: chi riceve, entro quando decide, cosa registra, chi si escala', 'One page: who receives it, by when they decide, what they record, who it escalates to')],
            [t('Formazione', 'Training'), t('4 pianificatori e 2 responsabili, mezza giornata, firma di partecipazione', '4 planners and 2 supervisors, half a day, signed attendance')],
            [t('Cancello', 'Gate'), t('Il sistema non ferma nessuna macchina, in nessun caso', 'The system never stops a machine, in any case')]
          ]
        },
        steps: [
          t('Dopo tre mesi, su 34 avvisi il pianificatore ne ha archiviati 6 con un motivo scritto, cioè il 18 percento.', 'After three months, out of 34 alerts the planner closed 6 with a written reason, that is 18 percent.'),
          t('Zero rifiuti sarebbe stato il segnale peggiore: significherebbe conferme automatiche senza pensarci.', 'Zero rejections would have been the worst signal: it would mean automatic confirmations with no thought.'),
          t('Trenta rifiuti su trentaquattro avrebbero significato che il sistema non serve a niente.', 'Thirty rejections out of thirty-four would have meant the system is useless.')
        ],
        takeaway: t(
          'La frase da colloquio: misuro quante volte le persone hanno detto no al sistema, perché se non dicono mai no la supervisione è finta.',
          'The interview line: I measure how often people said no to the system, because if they never say no, oversight is fake.'
        )
      },
      englishBlock: {
        lines: [
          'Human oversight only means something if the person has the time, the information and the permission to say no.',
          'So we look at how often people actually said no. In three months, six alerts out of thirty-four were closed with a reason. That tells me they are really looking.',
          'There is always a fallback. If the system is quiet for a day, we go back to the old schedule. People still know how to do that.',
          'The system never stops a machine. If it affects product release, a person decides and we keep the record.'
        ],
        why: 'Time, information and permission to say no, e that tells me they are really looking. Frasi corte, nessun termine normativo.'
      },
      quiz: [
        {
          id: 'm4u3-q1',
          prompt: 'Cosa serve perché la supervisione umana sia reale?',
          options: [
            'Un bottone di conferma',
            'Tempo, informazione e autorità per dissentire',
            'Una firma sul documento',
            'Un corso di formazione'
          ],
          correctOption: 1,
          explanation: 'Senza queste tre cose c\'è solo un bottone, non una supervisione.',
          final: true
        },
        {
          id: 'm4u3-q2',
          prompt: 'Su 34 avvisi, 6 archiviati con motivo. Come si legge?',
          options: [
            'Male, il sistema sbaglia troppo',
            'Bene: dimostra che le persone guardano davvero e a volte dissentono',
            'Male, le persone non si fidano',
            'Non dice nulla'
          ],
          correctOption: 1,
          explanation: 'Zero rifiuti sarebbe il segnale peggiore: significherebbe conferme automatiche.'
        },
        {
          id: 'm4u3-q3',
          prompt: 'Che cos\'è il ripiego e perché conta?',
          options: [
            'Un secondo modello di riserva',
            'La modalità di lavoro precedente, ancora funzionante e conosciuta',
            'Il piano di emergenza informatico',
            'Un fornitore alternativo'
          ],
          correctOption: 1,
          explanation: 'Se dopo sei mesi nessuno sa più lavorare senza il sistema, hai creato una dipendenza.'
        },
        {
          id: 'm4u3-q4',
          prompt: 'Cos\'è una SOP?',
          options: [
            'Un indicatore di produzione',
            'La procedura scritta che dice cosa fa l\'operatore, passo per passo',
            'Un sistema di sicurezza',
            'Un tipo di sensore'
          ],
          correctOption: 1,
          explanation: 'Senza, ognuno fa a modo suo e il risultato non è ripetibile.'
        },
        {
          id: 'm4u3-q5',
          prompt: 'Cos\'è l\'automazione compiacente?',
          options: [
            'Un sistema troppo permissivo',
            'Quando le persone smettono di controllare perché si fidano troppo',
            'Un\'automazione facile da usare',
            'Un modello poco accurato'
          ],
          correctOption: 1,
          explanation: 'È il rischio principale di una supervisione umana solo formale.'
        },
        {
          id: 'm4u3-q6',
          prompt: 'Cosa significa convalidare un sistema?',
          options: [
            'Testarlo prima del rilascio',
            'Dimostrare per iscritto che fa ciò che deve fare, e conservarne la prova',
            'Ottenere l\'approvazione della direzione',
            'Certificarlo con un ente esterno'
          ],
          correctOption: 1,
          explanation: 'Nel farmaceutico e nell\'alimentare vale per i sistemi che incidono sulla qualità del prodotto.'
        },
        {
          id: 'm4u3-q7',
          prompt: 'Su quali decisioni un sistema probabilistico non decide mai da solo?',
          options: [
            'Su nessuna, decide sempre una persona',
            'Rilascio del prodotto, sicurezza delle persone, conformità',
            'Solo sulla sicurezza',
            'Dipende dall\'accuratezza raggiunta'
          ],
          correctOption: 1,
          explanation: 'È il cancello non negoziabile: propone sempre, decide mai.'
        }
      ],
      sourceIds: ['eu-ai-act', 'isa-iec-62443']
    },

    {
      id: 'industrializzare',
      stage: 6,
      estimatedMinutes: 7,
      title: t('Industrializzare: monitoraggio, deriva, proprietà', 'Industrialising: monitoring, drift, ownership'),
      stageLabel: t('Tappa 6 di 7: un modello non si installa, si mantiene.', 'Step 6 of 7: a model is not installed, it is maintained.'),
      objective: t(
        'Saper riconoscere la catena che porta dalla deriva tecnica alla perdita di valore, e proporre la correzione di processo.',
        'Be able to spot the chain from technical drift to lost value, and to propose the process fix.'
      ),
      theory: [
        t(
          'Un modello non è un impianto: non si installa e basta, si mantiene. Il motivo si chiama deriva, in inglese drift: il mondo cambia e il modello resta fermo a com\'era il mondo quando ha imparato. Ci sono due tipi, e distinguerli fa una gran figura.',
          'A model is not a machine: you do not install it and forget it, you maintain it. The reason is called drift: the world moves and the model stays where the world was when it learned. There are two kinds, and telling them apart makes a very good impression.'
        ),
        t(
          'La deriva dei dati riguarda gli ingressi: un sensore viene sostituito con un modello diverso, si introduce una nuova materia prima, cambia la velocità di linea, e i numeri che il modello riceve non assomigliano più a quelli su cui ha imparato. La deriva del concetto riguarda la relazione: dopo una revisione della macchina, la vibrazione a 5 mm/s non significa più quello che significava prima. È la più insidiosa, perché non si vede guardando i dati in entrata.',
          'Data drift is about the inputs: a sensor is replaced with a different model, a new raw material comes in, line speed changes, and the numbers the model receives no longer look like the ones it learned from. Concept drift is about the relation: after a machine overhaul, vibration at 5 mm/s no longer means what it meant before. It is the nastier one, because you cannot see it by looking at the incoming data.'
        ),
        t(
          'Quindi servono tre cose da misurare ogni settimana. Salute tecnica: il sistema gira, quanti errori, quante volte non ha risposto. Qualità delle previsioni, confrontate con quello che è successo davvero, tenendo conto che nella manutenzione predittiva la verità arriva con settimane di ritardo e quindi si misura su una finestra scorrevole. Adozione e valore: quante persone lo usano, quante volte l\'avviso ha prodotto un\'azione, e soprattutto se l\'indicatore di business è ancora migliore della baseline.',
          'So there are three things to measure every week. Technical health: is it running, how many errors, how often did it fail to answer. Prediction quality, compared with what actually happened, keeping in mind that in predictive maintenance the truth arrives weeks later, so you measure on a rolling window. Adoption and value: how many people use it, how often the alert produced an action, and above all whether the business number is still better than the baseline.'
        ),
        t(
          'Il terzo è quello che conta di più e quello che nessuno guarda. Un modello può essere tecnicamente perfetto mentre il valore è svanito, perché le persone hanno smesso di usarlo.',
          'The third one matters most and is the one nobody looks at. A model can be technically perfect while the value has gone, because people stopped using it.'
        ),
        t(
          'E poi la cosa più importante dell\'unità: la proprietà. Un sistema in produzione ha bisogno di un nome e cognome che risponda di tre cose, cioè che funzioni, che sia ancora accurato e che produca ancora valore. Non un team, non una funzione, una persona, con un budget di manutenzione dichiarato, tipicamente il 15-20 percento del costo iniziale ogni anno. Un progetto consegnato senza responsabile e senza budget di mantenimento morirà, e sarà colpa di nessuno.',
          'And then the most important thing in the unit: ownership. A system in production needs a first and last name answering for three things, that it runs, that it is still accurate, and that it still produces value. Not a team, not a function, a person, with a declared maintenance budget, typically 15 to 20 percent of the initial cost every year. A project handed over with no owner and no maintenance budget will die, and it will be nobody\'s fault.'
        )
      ],
      keyPoints: [
        t('Deriva dei dati cambia gli ingressi, deriva del concetto cambia la relazione.', 'Data drift changes the inputs, concept drift changes the relation.'),
        t('Salute tecnica, qualità delle previsioni, adozione e valore: tre misure, non una.', 'Technical health, prediction quality, adoption and value: three measures, not one.'),
        t('Un sistema senza un responsabile con nome e cognome morirà.', 'A system with no owner by name will die.')
      ],
      terminology: [
        { id: 'deriva-dati', term: 'Data drift', italian: 'Deriva dei dati', definition: t('Gli ingressi cambiano rispetto a quelli su cui il modello ha imparato.', 'The inputs change compared with the ones the model learned from.') },
        { id: 'deriva-concetto', term: 'Concept drift', italian: 'Deriva del concetto', definition: t('Cambia la relazione fra ingressi e risultato, anche a ingressi uguali.', 'The relation between inputs and result changes, even with the same inputs.') },
        { id: 'riaddestramento', term: 'Retraining', italian: 'Riaddestramento', definition: t('Rifare l\'apprendimento del modello con dati aggiornati.', 'Training the model again with up to date data.') },
        { id: 'owner', term: 'Owner', italian: 'Responsabile', definition: t('La persona che risponde del sistema quando è in produzione.', 'The person who answers for the system once it is in production.') },
        { id: 'runbook', term: 'Runbook', italian: 'Manuale operativo', definition: t('Il documento che dice cosa fare quando il sistema si comporta male.', 'The document that says what to do when the system misbehaves.') },
        { id: 'costo-mantenimento', plain: true, term: 'Maintenance cost', italian: 'Costo di mantenimento', definition: t('La spesa annua per tenere in vita la soluzione, di solito il 15-20 percento.', 'The yearly cost of keeping the solution alive, usually 15 to 20 percent.') }
      ],
      example: {
        title: t('Sei mesi dopo la messa in produzione', 'Six months after go-live'),
        table: {
          columns: [t('Indicatore', 'Indicator'), t('Alla partenza', 'At go-live'), t('A 6 mesi', 'At 6 months'), t('Lettura', 'Reading')],
          rows: [
            [t('Disponibilità del sistema', 'System availability'), t('99,4%', '99.4%'), t('99,1%', '99.1%'), t('Tecnicamente sano', 'Technically healthy')],
            [t('Guasti anticipati', 'Failures anticipated'), t('73%', '73%'), t('61%', '61%'), t('In calo', 'Falling')],
            [t('Falsi allarmi a settimana', 'False alarms per week'), t('0,8', '0.8'), t('1,9', '1.9'), t('In peggioramento', 'Worsening')],
            [t('Avvisi che hanno prodotto un\'azione', 'Alerts that led to an action'), t('82%', '82%'), t('44%', '44%'), t('In crollo', 'Collapsing')],
            [t('Fermi non pianificati', 'Unplanned downtime'), t('3,9 h', '3.9 h'), t('4,6 h', '4.6 h'), t('Il valore sta svanendo', 'The value is going away')]
          ]
        },
        steps: [
          t('A marzo è stata sostituita la centralina di acquisizione su due dei tre motori, con un sensore di marca diversa: deriva dei dati.', 'In March the acquisition unit was replaced on two of the three motors, with a different brand of sensor: data drift.'),
          t('La catena è: problema tecnico, più falsi allarmi, perdita di fiducia, calo di adozione, valore svanito.', 'The chain is: technical problem, more false alarms, loss of trust, drop in adoption, value gone.'),
          t('Guardando solo la disponibilità del sistema, rimasta al 99 percento, non avresti visto nulla.', 'Looking only at system availability, still at 99 percent, you would have seen nothing.')
        ],
        takeaway: t(
          'La correzione vera non è riaddestrare: è la regola per cui ogni sostituzione di sensore su una linea dove gira un modello genera una notifica al responsabile del modello.',
          'The real fix is not retraining: it is the rule that every sensor replacement on a line with a model on it sends a notice to the model owner.'
        )
      },
      englishBlock: {
        lines: [
          'A model is not a machine you install and forget. The world moves and the model stays where it was.',
          'We watch three things every week: is it running, is it still right, and are people still using it.',
          'The third one is the one everybody forgets. The system was fine, but only forty-four percent of the alerts led to an action. The value was going away.',
          'What happened was simple. Someone changed a sensor in March and nobody told the person who owns the model.',
          'So now, if you change a sensor on a line with a model on it, the owner gets a message. That is the real fix.'
        ],
        why: 'Install and forget, the world moves, everybody forgets, that is the real fix. Racconta un problema tecnico con parole di tutti i giorni e chiude con una soluzione organizzativa.'
      },
      quiz: [
        {
          id: 'm4u4-q1',
          prompt: 'Che differenza c\'è fra deriva dei dati e deriva del concetto?',
          options: [
            'Nessuna',
            'La prima cambia gli ingressi, la seconda cambia la relazione fra ingressi e risultato',
            'La prima è tecnica, la seconda è organizzativa',
            'La prima è lenta, la seconda è veloce'
          ],
          correctOption: 1,
          explanation: 'La deriva del concetto è più insidiosa: non si vede guardando i dati in entrata.',
          final: true
        },
        {
          id: 'm4u4-q2',
          prompt: 'Quali tre cose si monitorano ogni settimana?',
          options: [
            'Costo, tempo, qualità',
            'Salute tecnica, qualità delle previsioni, adozione e valore',
            'Accuratezza, velocità, disponibilità',
            'Utenti, errori, richieste'
          ],
          correctOption: 1,
          explanation: 'La terza è quella che nessuno guarda ed è quella che conta di più.'
        },
        {
          id: 'm4u4-q3',
          prompt: 'La disponibilità è al 99,1 percento ma il valore svanisce. Perché?',
          options: [
            'Il sistema è rotto',
            'Un sensore sostituito ha aumentato i falsi allarmi, il pianificatore si fida meno e le azioni sono crollate',
            'I fermi sono aumentati per altre cause',
            'Il modello non è mai stato accurato'
          ],
          correctOption: 1,
          explanation: 'Catena: problema tecnico, più falsi allarmi, perdita di fiducia, calo di adozione, valore perso.'
        },
        {
          id: 'm4u4-q4',
          prompt: 'Qual è la vera correzione nell\'esempio?',
          options: [
            'Riaddestrare il modello',
            'Riaddestrare e legare la sostituzione dei sensori a una notifica al responsabile del modello',
            'Sostituire i sensori originali',
            'Aumentare la soglia di allarme'
          ],
          correctOption: 1,
          explanation: 'Il riaddestramento cura il sintomo, la regola di processo cura la causa.'
        },
        {
          id: 'm4u4-q5',
          prompt: 'Chi deve rispondere di un sistema in produzione?',
          options: [
            'Il team di progetto',
            'Una persona con nome e cognome, con budget di manutenzione',
            'Il fornitore',
            'La funzione IT'
          ],
          correctOption: 1,
          explanation: 'Un progetto senza responsabile e senza budget morirà, e sarà colpa di nessuno.'
        },
        {
          id: 'm4u4-q6',
          prompt: 'Quanto costa tipicamente mantenere un sistema all\'anno?',
          options: [
            'Nulla, una volta consegnato',
            'Circa il 15-20 percento del costo iniziale',
            'Il doppio del costo iniziale',
            'Solo il costo delle licenze'
          ],
          correctOption: 1,
          explanation: 'Va dichiarato prima dell\'approvazione, altrimenti sparisce dal budget.'
        },
        {
          id: 'm4u4-q7',
          prompt: 'Perché la qualità delle previsioni si misura su una finestra scorrevole?',
          options: [
            'Per ridurre il rumore',
            'Perché la verità arriva con settimane di ritardo: si sa se aveva ragione solo dopo',
            'Per confrontare i turni',
            'Per rispettare la normativa'
          ],
          correctOption: 1,
          explanation: 'Non puoi valutare oggi una previsione che riguarda i prossimi tre giorni.'
        }
      ],
      sourceIds: ['aws-mlops-planning', 'nist-ai-rmf-1-0']
    },

    {
      id: 'estendere-o-fermarsi',
      stage: 7,
      estimatedMinutes: 7,
      title: t('Estendere o fermarsi, e il racconto di due minuti', 'Scale or stop, and the two minute story'),
      stageLabel: t('Tappa 7 di 7: decido con onestà, poi lo racconto in due minuti.', 'Step 7 of 7: I decide honestly, then I tell it in two minutes.'),
      objective: t(
        'Saper costruire il caso economico con tre numeri e raccontare tutto il percorso in due minuti.',
        'Be able to build the business case with three numbers and tell the whole path in two minutes.'
      ),
      theory: [
        t(
          'Alla fine di un pilota ci sono tre risposte possibili, non due. Estendo: i numeri reggono, l\'adozione è reale, il contesto delle altre linee è abbastanza simile. Estendere significa comunque rifare le tappe 2 e 3 su ogni nuovo sito in versione ridotta, cioè baseline nuova e verifica dei dati nuova, perché copiare un modello su un contesto diverso senza rimisurare è l\'errore che brucia la credibilità di un intero programma.',
          'At the end of a pilot there are three possible answers, not two. I scale: the numbers hold, adoption is real, the context of the other lines is similar enough. Scaling still means redoing steps 2 and 3 on every new site in a reduced form, that is a new baseline and a new data check, because copying a model into a different context without measuring again is the mistake that burns the credibility of a whole programme.'
        ),
        t(
          'Mi fermo: i numeri non reggono, oppure reggono ma le condizioni per usarli non esistono, come nella storia della qualità. Fermarsi è una decisione professionale se ha tre elementi: cosa hai imparato, quanto è costato, cosa deve cambiare perché si riprenda. Terza risposta: continuo qui, ma non estendo. È la più frequente nella realtà e la meno raccontata, perché il caso funziona su una linea e crea valore lì, ma la condizione che lo rende possibile non esiste altrove.',
          'I stop: the numbers do not hold, or they hold but the conditions to use them do not exist, as in the quality story. Stopping is a professional decision if it has three elements: what you learned, what it cost, what has to change for it to restart. Third answer: I keep it here, but I do not scale. It is the most frequent in reality and the least told, because the case works on one line and creates value there, but the condition that makes it possible does not exist elsewhere.'
        ),
        t(
          'Poi c\'è il caso economico per estendere, e servono tre numeri, mai di più. Beneficio annuo per linea, con il metodo di calcolo e chi ha firmato la baseline. Costo di estensione per linea, che scende dalla seconda in poi perché l\'impianto è già fatto. Costo annuo di mantenimento, il 15-20 percento, che quasi tutti dimenticano ed è ciò che rende un caso economico credibile.',
          'Then there is the business case for scaling, and it needs three numbers, never more. Annual benefit per line, with the method of calculation and who signed the baseline. Cost of extension per line, which falls from the second one onwards because the groundwork is done. Annual maintenance cost, 15 to 20 percent, which almost everybody forgets and which is what makes a business case credible.'
        ),
        t(
          'Il quarto elemento non è un numero: cosa serve alle persone. Formazione, tempo, e il fatto che qualcuno cambi il proprio modo di lavorare. La maggior parte delle estensioni fallisce lì, non sulla tecnologia.',
          'The fourth element is not a number: what people need. Training, time, and the fact that somebody changes the way they work. Most extensions fail there, not on the technology.'
        ),
        t(
          'Infine il racconto di due minuti, che è la risposta alla domanda "descrivi brevemente un processo di trasformazione digitale". La struttura è sempre la stessa: problema con un numero, dove nascono i dati, strumento più semplice, prova senza rischio, produzione con reti di sicurezza, risultato onesto, decisione motivata. Sette passaggi, gli stessi sette del corso. Impara la sequenza, non il testo.',
          'Finally the two minute story, which is the answer to "briefly describe a digital transformation process". The structure is always the same: problem with a number, where the data is born, the simplest tool, a risk free trial, production with safety nets, an honest result, a reasoned decision. Seven moves, the same seven of the course. Learn the sequence, not the text.'
        )
      ],
      keyPoints: [
        t('Le risposte possibili sono tre: estendo, mi fermo, continuo qui senza estendere.', 'There are three possible answers: I scale, I stop, I keep it here without scaling.'),
        t('Il caso economico ha tre numeri, e il terzo è il mantenimento che tutti dimenticano.', 'The business case has three numbers, and the third is the maintenance everyone forgets.'),
        t('Il racconto di due minuti sono le sette tappe, in ordine.', 'The two minute story is the seven steps, in order.')
      ],
      terminology: [
        { id: 'scalare', term: 'Scale up', italian: 'Estendere', definition: t('Portare una soluzione da una linea o sito a molti.', 'Taking a solution from one line or site to many.') },
        { id: 'caso-economico', term: 'Business case', italian: 'Caso economico', definition: t('Il confronto scritto fra benefici e costi che giustifica la decisione.', 'The written comparison of benefits and costs that justifies the decision.') },
        { id: 'costo-replica', plain: true, term: 'Replication cost', italian: 'Costo di replica', definition: t('Quanto costa il secondo, il terzo, il decimo sito.', 'What the second, the third, the tenth site costs.') },
        { id: 'gestione-cambiamento', term: 'Change management', italian: 'Gestione del cambiamento', definition: t('Il lavoro sulle persone perché la soluzione venga davvero usata.', 'The work with people so the solution is actually used.') },
        { id: 'lezione-appresa', plain: true, term: 'Lesson learned', italian: 'Lezione appresa', definition: t('Ciò che resta all\'organizzazione anche da un progetto fermato.', 'What the organisation keeps even from a project that was stopped.') }
      ],
      example: {
        title: t('Il caso economico per estendere alle linee 1 e 2', 'The business case for scaling to lines 1 and 2'),
        table: {
          columns: [t('Voce', 'Item'), t('Linea 3, già fatta', 'Line 3, already done'), t('Linee 1 e 2', 'Lines 1 and 2')],
          rows: [
            [t('Beneficio annuo per linea', 'Annual benefit per line'), t('98.000 euro', '98,000 euros'), t('circa 85.000 euro stimati', 'about 85,000 euros estimated')],
            [t('Costo di realizzazione', 'Build cost'), t('120.000 euro', '120,000 euros'), t('45.000 euro ciascuna', '45,000 euros each')],
            [t('Mantenimento annuo', 'Annual maintenance'), t('20.000 euro', '20,000 euros'), t('12.000 euro ciascuna', '12,000 euros each')],
            [t('Rientro dell\'investimento', 'Payback'), t('15 mesi', '15 months'), t('circa 8 mesi', 'about 8 months')]
          ]
        },
        steps: [
          t('Le linee 1 e 2 costano meno perché raccolta dati, archivio, procedura e formazione esistono già: il primo caso paga l\'infrastruttura per tutti.', 'Lines 1 and 2 cost less because data collection, storage, procedure and training already exist: the first case pays the infrastructure for everyone.'),
          t('Il beneficio stimato è più basso perché partono da 4,5 e 4,8 ore di fermo, non da 6: c\'è meno da recuperare.', 'The estimated benefit is lower because they start from 4.5 and 4.8 hours of downtime, not 6: there is less to recover.'),
          t('Le linee 4 e 5 non si estendono: costruttore diverso, il modello va rifatto e si rivaluta come caso a sé.', 'Lines 4 and 5 are not included: different manufacturer, the model has to be rebuilt and it is reassessed as its own case.')
        ],
        takeaway: t(
          'Stimare lo stesso beneficio ovunque è l\'errore classico dei piani di estensione, e chi ti ascolta lo nota subito.',
          'Estimating the same benefit everywhere is the classic mistake of scaling plans, and the person listening notices immediately.'
        )
      },
      englishBlock: {
        lines: [
          'I always start from the problem, not from the technology.',
          'We were losing six hours a week. At nine hundred euros an hour, that is about two hundred and eighty thousand a year. The plant manager signed that number before we started.',
          'The data was already there, nobody had looked at it together. Half of it came from one mechanical group.',
          'For the bearings we used a model. We ran it in the shadow for six weeks before anyone saw it.',
          'We ended at three point nine hours. But the control line went down seven percent on its own, so the real effect is twenty, not twenty-seven.',
          'We scaled to two lines with the same equipment. Not to the other two, because those are a different machine. That would be a new project.'
        ],
        why: 'Sei frasi, ognuna con un verbo semplice, tutte dicibili a voce senza pensare. Impara la sequenza, non il testo: se ricordi i sette passaggi, le parole vengono da sole.'
      },
      quiz: [
        {
          id: 'm4u5-q1',
          prompt: 'Quante risposte possibili ci sono alla fine di un pilota?',
          options: [
            'Due: estendere o fermarsi',
            'Tre: estendere, fermarsi, continuare qui senza estendere',
            'Una: estendere se funziona',
            'Dipende dal budget'
          ],
          correctOption: 1,
          explanation: 'La terza è la più frequente nella realtà e la meno raccontata.',
          final: true
        },
        {
          id: 'm4u5-q2',
          prompt: 'Cosa serve perché il fermarsi sia una decisione professionale?',
          options: [
            'L\'approvazione della direzione',
            'Cosa hai imparato, quanto è costato, cosa deve cambiare perché si riprenda',
            'Un rapporto formale',
            'Un\'alternativa già pronta'
          ],
          correctOption: 1,
          explanation: 'Senza condizione di rientro è un abbandono, non una decisione.'
        },
        {
          id: 'm4u5-q3',
          prompt: 'Perché estendere alle linee 1 e 2 costa meno?',
          options: [
            'Perché sono linee più piccole',
            'Perché raccolta dati, archivio, procedura e formazione esistono già',
            'Perché il fornitore fa uno sconto',
            'Perché si usa lo stesso modello senza modifiche'
          ],
          correctOption: 1,
          explanation: 'Il primo caso paga l\'infrastruttura per tutti, e va detto all\'inizio, non alla fine.'
        },
        {
          id: 'm4u5-q4',
          prompt: 'Perché il beneficio stimato sulle linee 1 e 2 è più basso?',
          options: [
            'Perché il modello sarà meno accurato',
            'Perché partono da 4,5 e 4,8 ore di fermo, quindi c\'è meno da recuperare',
            'Perché producono meno',
            'Perché l\'adozione sarà minore'
          ],
          correctOption: 1,
          explanation: 'Stimare lo stesso beneficio ovunque è l\'errore classico dei piani di estensione.'
        },
        {
          id: 'm4u5-q5',
          prompt: 'Quali tre numeri servono in un caso economico?',
          options: [
            'Costo, tempo, rischio',
            'Beneficio annuo, costo di estensione, costo annuo di mantenimento',
            'Investimento, rientro, margine',
            'Ore risparmiate, pezzi prodotti, scarto'
          ],
          correctOption: 1,
          explanation: 'Il terzo è quello che quasi tutti dimenticano ed è ciò che rende credibile il conto.'
        },
        {
          id: 'm4u5-q6',
          prompt: 'Qual è la struttura del racconto di due minuti?',
          options: [
            'Tecnologia, budget, risultato',
            'Problema con un numero, dove nascono i dati, strumento più semplice, prova senza rischio, produzione con reti di sicurezza, risultato onesto, decisione motivata',
            'Contesto, soluzione, benefici',
            'Obiettivo, piano, esecuzione'
          ],
          correctOption: 1,
          explanation: 'Sono le sette tappe del corso: ricorda la sequenza, non il testo.'
        },
        {
          id: 'm4u5-q7',
          prompt: 'Nel racconto, quale dettaglio dimostra meglio l\'onestà intellettuale?',
          options: [
            'Il costo orario del fermo',
            'Aver dichiarato che l\'effetto reale è 20 punti e non 27, per via della linea di controllo',
            'Il numero di falsi allarmi',
            'La durata della modalità ombra'
          ],
          correctOption: 1,
          explanation: 'Ridurre da soli il proprio risultato è il segnale più forte che si possa dare.'
        }
      ],
      sourceIds: ['nist-ai-rmf-1-0', 'pmi-state-of-ai']
    }
  ]
}

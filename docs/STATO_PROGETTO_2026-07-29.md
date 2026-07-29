# Stato del progetto - 29 luglio 2026

Documento di passaggio di consegne. Serve a riprendere il lavoro in una chat nuova senza rileggere tutto.

---

## 1. Cos'è il progetto

Un corso di autoapprendimento, bilingue italiano/inglese, per preparare Fabrizio a un colloquio per una posizione di **AI / Digital Transformation Lead in ambito manifatturiero** (contesto tipo Philip Morris).

Il corso è anche un'applicazione web: JavaScript ES modules senza dipendenze, HTML, CSS, test con il runner di Node, Playwright per gli end-to-end, Supabase per autenticazione e sincronizzazione, pubblicata su GitHub Pages come PWA.

Repository: `E:\Lavoro\Apprendimento IA`
Branch di lavoro attuale: `main`

Il requisito di partenza è l'annuncio di lavoro:

- Experience leading cross-functional initiatives in production environments, lead change and drive innovation
- Proven ability to translate business challenges into digital/AI solutions (analytics, automation, optimization)
- Understanding of Digital Manufacturing architecture (OT / IT / AI / Cloud)
- Knowledge of agile delivery, MVP development, and experimentation approaches
- Familiarity with Operational Excellence, quality, productivity, or maintenance domains

---

## 2. Le tre fasi del lavoro

### Fase A - L'applicazione versione 1 (chiusa e superata)

Sviluppo in TDD di 6 moduli da 46 unità, 420 minuti, 165 test verdi, deploy su GitHub Pages, sette difetti trovati e corretti dopo il primo deploy.

Dopo averlo letto, l'utente lo ha **respinto nel merito**: troppo tecnico, sigle date per scontate, inglese accademico, pochi quiz, glossario incompleto.

### Fase B - Il corso versione 2 in markdown (COMPLETATA)

In `docs\corso-v2\`:

| File | Contenuto |
|---|---|
| `00-INDICE.md` | Indice, 7 tappe, 3 storie, mappa dei file |
| `modulo-1-trasformazione.md` | Mappa completa, OEE, dal problema alla soluzione, prioritizzare, governance |
| `modulo-2-fabbrica-digitale.md` | OT e IT, sensori/PLC/SCADA, MES ed ERP, historian, edge/cloud/accessi |
| `modulo-3-scegliere-strumento.md` | Scala degli strumenti, storia manutenzione, storia qualità, RAG, quando l'AI non serve |
| `modulo-4-in-produzione.md` | MVP, esperimento credibile, sicurezza, industrializzare, estendere o fermarsi |
| `modulo-5-governare-scalare.md` | Portafoglio, operating model, multi-sito, adozione, valore nel tempo |
| `colloquio-10-domande.md` | Le dieci domande, con risposta IT, inglese da 30 secondi, tre punti chiave |
| `glossario.md` | Glossario completo IT/EN, 20 sigle a memoria, 12 coppie confuse |

Il Modulo 5 è nato come PDF preparato dall'utente ed è stato convertito nello stile degli altri quattro.

### Fase C - La versione 2 dentro l'applicazione (COMPLETATA)

Il contenuto v1 è stato **rimosso** e sostituito. Stato attuale dell'app:

- **5 moduli, 25 unità, 154 minuti.** ID e slug stabili: `trasformazione`, `fabbrica-digitale`, `scegliere-strumento`, `in-produzione`, `governare-scalare`.
- **175 domande**, 7 per unità, ognuna con spiegazione che insegna. Una domanda per unità è marcata `final` e alimenta il checkpoint del modulo.
- **Teoria bilingue** in ogni unità: italiano e inglese, con un minimo del 75 percento di parole inglesi rispetto all'italiano, verificato dai test.
- **Struttura fissa di ogni unità**: dove siamo nel percorso, il concetto, i termini, un esempio con numeri, il blocco "come lo dici in inglese" con la nota sul perché di quelle parole, il quiz da 7 domande, le fonti.
- **Glossario derivato dal corso** (132 voci): `buildGlossary` legge i termini dalle unità, quindi un termine non può esistere in una unità e mancare dal glossario. Entra però solo ciò che vale la pena cercare, cioè sigle, parole inglesi da riunione e parole italiane con significato industriale; le parole comuni sono marcate `plain: true` e restano nella loro unità. Pagina dedicata `/glossario` con ricerca.
- **Pagina colloquio** `/interview` con le 10 domande: attesa dell'esaminatore, risposta italiana, righe inglesi da dire a voce, tre punti chiave, errore da evitare.
- **Ripasso** `/review` con le domande sbagliate e le coppie che vengono confuse.
- `CONTENT_VERSION = 3`, cache del service worker `ai-sprint-v10`, tutti i `?v=` allineati a 10.

Progressi: l'unità è completata quando tutte e sette le domande hanno risposta; il modulo quando ogni domanda ha risposta e il punteggio raggiunge l'80 percento. Le risposte sono salvate in `ai-sprint-answers-v2`, quindi una ricarica non azzera un quiz a metà.

---

## 3. Il metodo della versione 2

Il corso è costruito attorno a un unico filo, **le 7 tappe**, che ricorre in ogni unità:

1. Parto dal problema, non dalla tecnologia
2. Misuro il punto di partenza
3. Capisco dove nascono i dati e chi decide oggi
4. Scelgo lo strumento più semplice che risolve
5. Provo in piccolo, senza rischio
6. Metto in produzione con le reti di sicurezza
7. Decido con onestà: estendo, mi fermo, o continuo senza estendere

**Tre storie complete** attraversano tutte le tappe: manutenzione predittiva (M3.2, finisce con estensione parziale), qualità e difetti (M3.3, **finisce con uno stop**), e il racconto di due minuti (M4.5).

**Regole di scrittura:** niente em dash, ogni sigla sciolta alla prima comparsa, numeri veri e ricalcolabili, ogni scenario dichiarato ipotetico, inglese con un verbo semplice per frase. Un test verifica em dash ed elisioni mancanti su tutto il testo italiano.

---

## 4. Verifica

`npm test` esegue 88 test verdi:

- `content-schema.test.mjs`: contratto del contenuto su fixture, più il corso reale
- `curriculum-depth.test.mjs`: forma del corso, copertura delle 7 tappe, esempi con numeri, glossario senza parole comuni, inglese dicibile, italiano senza em dash
- `learning.test.mjs`: punteggio del modulo, coda di ripasso, checkpoint, unione dei progressi
- `progress-migration.test.mjs`: progresso di una versione precedente limitato e non buttato
- `ui.test.mjs`: rotte, stato dell'unità, rendering di unità, glossario, colloquio, navigazione localizzata
- `pwa.test.mjs`: cache, versioni allineate, grafo dei moduli, fallback GitHub Pages
- `server.test.mjs`, `sync.test.mjs`

`npm run build` stampa: 5 moduli, 25 unità, 175 domande, 132 termini, 154 minuti.

---

## 5. Cosa manca, e richiede la macchina dell'utente

1. **`git push`**: nella sandbox fallisce, non c'è credential helper. **Il push va fatto da te.**
2. **`npm run test:e2e`**: Playwright non è installabile nella sandbox. Il file `tests/e2e.mjs` è stato riscritto per la versione 2 e copre sezioni dell'unità, quiz da 7 domande, coda di ripasso, glossario, colloquio, tre viewport e la pagina di login.
3. **Verifica in browser**: `npm run dev` e apri `http://127.0.0.1:4173`, oppure attendi il deploy Pages dopo il push.
4. **Supabase**: nessuna migrazione nuova. `content_version` accetta già il valore 3.
5. **Prova incrociata PC/telefono** con account Gmail e prova RLS con due account.

---

## 6. Vincoli permanenti

- Non usare il carattere em dash
- Non modificare i file di changelog autogenerati
- Non aggiungere nomi di agenti come co-autori dei commit
- Usare TDD per feature e correzioni
- Non indebolire soglie o test per ottenere il verde
- Ogni scenario va dichiarato ipotetico e basato solo su contesto pubblico
- Non esporre segreti Supabase nel repository. La publishable key può stare nel client perché RLS protegge i dati. **La service role key non entra mai nel repository.**
- Niente modifiche distruttive a Git, Supabase o GitHub Pages: niente `git reset --hard`, niente force push

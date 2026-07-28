# Handoff per Claude: PWA AI Digital Transformation Lead

Data handoff: 2026-07-28  
Repository: `E:\Lavoro\Apprendimento IA`  
Worktree attivo: `E:\Lavoro\Apprendimento IA\.worktrees\seven-hour-bilingual-sprint`  
Branch: `feature/seven-hour-bilingual-sprint`  
HEAD al momento dell'handoff: `fff5c99`

## 1. Obiettivo del progetto

Trasformare la PWA già pubblicata in un corso bilingue italiano/inglese di 420 minuti reali per preparare un colloquio da AI Digital Transformation Lead in un contesto PMI manufacturing regolamentato.

Il corso deve essere pratico e difendibile in colloquio. Non deve limitarsi a definizioni. Deve insegnare a:

- scegliere quali processi automatizzare e motivare la scelta con evidenze, KPI, rischio e supervisione umana;
- spiegare OT vs IT, MES vs SCADA e il flusso sensore -> edge -> piattaforma dati -> AI -> decisione;
- scegliere tra regole, analytics, ML, GenAI, RAG, tool calling, workflow deterministici e agenti;
- progettare un MVP industriale con integrazione, sicurezza, governance, fallback, ownership e scaling gates;
- rispondere professionalmente in inglese con versioni da circa 30 secondi e 2 minuti;
- completare una simulazione tecnica di 20 minuti senza note.

La versione urgente esclude chatbot, feedback LLM, laboratori di coding e gamification avanzata.

## 2. Documenti da leggere prima di modificare codice

Leggere in questo ordine:

1. `AGENTS.md`, se presente nella root o ereditato dall'ambiente.
2. `docs/superpowers/specs/2026-07-28-seven-hour-bilingual-interview-sprint-design.md`
3. `docs/superpowers/plans/2026-07-28-seven-hour-bilingual-interview-sprint.md`
4. `.superpowers/sdd/2026-07-28-seven-hour-bilingual-interview-sprint/progress.md`
5. Questo documento.
6. I report dei singoli task in `.superpowers/sdd/2026-07-28-seven-hour-bilingual-interview-sprint/task-*-report.md`.

Vincoli globali già applicati:

- non usare il carattere em dash;
- non modificare file di changelog autogenerati;
- non aggiungere nomi di agenti come co-autori dei commit;
- usare TDD per feature e correzioni;
- non indebolire soglie o test per ottenere GREEN;
- ogni scenario PMI deve essere dichiarato ipotetico e basato solo su contesto pubblico;
- preservare gli ID e gli slug delle sei lezioni;
- non esporre segreti Supabase nel repository o nei report.

## 3. Stato Git e topologia del lavoro

Il lavoro nuovo non è su `main`. È nel worktree e branch:

```text
E:\Lavoro\Apprendimento IA\.worktrees\seven-hour-bilingual-sprint
feature/seven-hour-bilingual-sprint
```

La baseline del feature branch era `827f635`. Il branch locale `main` punta ancora a `827f635`; `origin/main` era a `8ac8eea` quando è stato creato il worktree. Nessun commit del corso esteso è stato ancora integrato o pubblicato su `main`.

Commit principali, in ordine:

```text
05675c0 feat:add-bilingual-curriculum-schema
6a38684 fix:strictly-validate-bilingual-curriculum
a3aab58 test:cover-English-theory-boundary
02d3b52 feat:migrate-versioned-learning-progress
0db119d test:cover-progress-migration-boundaries
4e048a9 feat:add-vetted-learning-source-catalog
0b6eb0a feat:expand-transformation-module
e264876 fix:make-transformation-module-auditable
9ded868 fix:verify-normalization-source-and-gemba-rubric
1e8912a feat:expand-industrial-architecture-module
01618e5 fix:strengthen-industrial-architecture-contracts
f329fd6 fix:validate-architecture-learning-artifacts
69a74b0 fix:enforce-architecture-graph-integrity
567634b feat:expand-data-and-ai-use-cases-module
61a4936 fix:make-module-three-audit-ready
10fea96 fix:enforce-module-three-engaged-time
94af0c8 feat:expand-llm-rag-and-agent-module
fff5c99 fix:strengthen-module-four-engaged-time
```

Prima di continuare:

```powershell
Set-Location 'E:\Lavoro\Apprendimento IA\.worktrees\seven-hour-bilingual-sprint'
git status --short
git branch --show-current
git log -5 --oneline
```

Non lavorare nella root sul branch `main` finché il feature branch non è completo e verificato.

## 4. Stato dei task

### Task 1: schema bilingue e validazione

Completato e revisionato.

Implementa:

- `CONTENT_VERSION`;
- tipi condivisi localizzati;
- validazione stretta per durata totale, quota pratica, parole italiane/inglesi, fonti e artefatti;
- compatibilità legacy solo attraverso `validateLessons`, non come bypass di `validateCurriculum`;
- soglia inglese esatta dell'85 percento;
- budget con sole chiavi `theory`, `cases`, `practice`;
- fonti educational obbligatoriamente collegate a fonti primary.

File principali:

- `public/content/schema.js`
- `public/types.js`
- `tests/content-schema.test.mjs`

### Task 2: migrazione del progresso

Completato e revisionato nel codice. La migrazione SQL remota non è ancora stata applicata.

Implementa:

- `LEGACY_BLOCK_COUNTS`;
- migrazione proporzionale zero-based dei cursori;
- conservazione di completamento e best score;
- `contentVersion` in app e `content_version` via REST;
- migrazione SQL idempotente `supabase/migrations/002_content_version.sql`.

Decisione importante: per cursori zero-based la formula usa `legacyBlockCount - 1` come denominatore, preservando primo e ultimo elemento.

### Task 3: catalogo fonti

Completato e revisionato.

Fonte di verità:

- `public/content/sources.js`

Ogni fonte ha ID stabile, organizzazione, tipo, URL HTTPS e `accessedAt`. Le fonti didattiche hanno `verifiedAgainst` verso una fonte primaria.

### Task 4: Modulo 1, Digital Transformation e Industry 4.0

Completato e revisionato.

File: `public/content/module-1-transformation.js`

Stato verificato:

- 50 minuti;
- sei unità;
- budget 25/15/10;
- almeno 4.500 parole italiane e soglia inglese superata;
- matrice con cinque candidati, dieci criteri, 50 valutazioni con evidenza/confidenza, gate e rifiuto del rilascio prodotto autonomo;
- soluzione gemba completa di decisioni, owner, input, eccezioni e stakeholder;
- risposte professionali localizzate.

### Task 5: Modulo 2, OT / IT / AI / Cloud

Completato e revisionato.

File: `public/content/module-2-architecture.js`

Stato verificato:

- 75 minuti;
- otto unità;
- budget 38/22/15;
- almeno 6.840 parole italiane e soglia inglese superata;
- architettura a nove archi continui con endpoint, protocollo, latenza, cadence, owner, security crossing, fallback e azione umana;
- latenza end-to-end coerente;
- caso genealogy completo e grafo referenzialmente valido;
- soluzione conduit con capacità e degraded behavior;
- fonti ISA-18, ISA/IEC 62443 e 4-20 mA;
- validatori opt-in con test di mutazione.

### Task 6: Modulo 3, Data, Analytics e AI use cases

Completato e revisionato.

File: `public/content/module-3-data-ai.js`

Stato verificato:

- 65 minuti;
- sette unità;
- budget 31/20/14;
- 5.640 parole italiane e 5.275 inglesi nell'ultima misurazione;
- 14 case item espliciti per 20 minuti;
- sette quick activity da un output per 14 minuti;
- PdM, computer vision, supply uncertainty e decision ladder;
- calcoli ricostruibili di downtime, precision, recall, costi FP/FN e coda umana;
- scorecard audit-ready con anchor, evidenze, scadenze, audit metadata, gate e decision record;
- range score corretto 20-100;
- validazione opt-in e mutation test per engaged time e scorecard.

### Task 7: Modulo 4, LLM, RAG, agenti e MCP

Implementazione e primo fix completati. Test, lint, build e mobile E2E erano verdi a `fff5c99`.

File: `public/content/module-4-llm-agents.js`

Ultimo stato dichiarato dall'implementazione:

- 80 minuti;
- nove unità;
- budget 40/22/18;
- 7.486 parole italiane e 7.041 inglesi;
- sette segmenti caso sostanziali per 14 minuti, totale casi 22;
- nove attività da due minuti, totale pratica 18;
- due casi completi: RAG su SOP controllate e maintenance work order;
- artefatti strutturati per RAG, tool calling sicuro, MCP e scelta multi-modello;
- fonti RouteLLM, AutoGen e AgentBench aggiunte;
- 90 test, lint, build e mobile E2E verdi.

Stato revisione: NON ancora formalmente chiuso. La prima review aveva trovato:

1. micro-casi troppo brevi rispetto ai minuti dichiarati;
2. validatore fail-open perché attivato dalla proprietà `ragControlArtifact` che avrebbe dovuto proteggere;
3. fonti insufficienti per routing e orchestrazione multi-agente;
4. frase troppo assoluta sui tool scope separati.

Il commit `fff5c99` dichiara di avere corretto tutti e quattro i punti. Due tentativi di re-review separata sono falliti esclusivamente per limite di utilizzo Codex. Nessun reviewer ha quindi emesso il verdetto finale.

Prima azione per Claude: fare una re-review read-only del diff:

```text
Base: 94af0c8
Head: fff5c99
Pacchetto diff:
.superpowers/sdd/2026-07-28-seven-hour-bilingual-interview-sprint/review-94af0c8..fff5c99.diff
```

Verificare esattamente:

- i sette segmenti giustificano davvero 14 minuti con scenario, azione, decision aid, output atteso, ragionamento e formato, in entrambe le lingue;
- timing casi complessivo 22 e pratica 18 sono ricostruibili;
- il validatore è attivato da ID stabile o contratto non eliminabile;
- cancellare singolarmente RAG artifact, work-order artifact, MCP artifact e multi-model artifact produce errori;
- RouteLLM, AutoGen e AgentBench sono citati localmente per claim coerenti;
- la frase sui tool scope è stata resa non assoluta;
- nessuna nuova regressione Critical o Important.

Se la review è pulita, aggiungere al ledger:

```text
Task 7: fix round 1/5 (4 addressed, 0 open; commits 94af0c8..fff5c99).
Task 7: complete (commits 10fea96..fff5c99, review clean).
```

Se rimangono problemi, correggerli con TDD e nuova review prima di Task 8.

### Task 8: non iniziato

Modulo 5, MVP, Security, Governance and Scaling.

Requisiti principali:

- file `public/content/module-5-mvp-governance.js`;
- ID `mvp-governance`;
- otto unità;
- 75 minuti;
- budget 36/22/17;
- almeno 6.480 parole italiane e 5.508 inglesi;
- casi shadow-mode quality assistant e plant-to-multi-plant rollout;
- artifact MVP experiment canvas, risk register, RACI, scaling gate checklist;
- fonti NIST SP 800-82, NIST AI RMF, NIST AI 600-1, EU AI Act;
- risposte su MVP controllato, sicurezza OT/AI, human oversight e quando non scalare.

Seguire lo schema di qualità dei moduli precedenti:

- ogni unità 5-10 minuti;
- timing di teoria/casi/pratica esplicito e ricostruibile;
- attività rapide realistiche rispetto ai minuti;
- casi completi con assunzioni, evidenze, decisione, trade-off e outcome;
- artifact strutturati e validator opt-in con mutation test;
- contenuti localizzati e risposte professionali IT/EN;
- fonti citate localmente nel punto in cui sostengono il claim.

### Task 9: non iniziato

Modulo 6, Technical Interview Lab.

Requisiti principali:

- file `public/content/module-6-interview-lab.js`;
- ID `interview-lab`;
- sei unità;
- 75 minuti;
- budget 19/25/31;
- almeno 3.420 parole italiane e 2.907 inglesi;
- simulazione completa da 20 minuti;
- risposte per OT vs IT, MES vs SCADA, RAG, agent, MCP, selezione automazioni, MVP, KPI, rischio, human oversight e scaling;
- rubric 0-2 per struttura, accuratezza tecnica, rilevanza business, esempio, trade-off, chiarezza inglese;
- readiness almeno 10/12 per core answer e mock senza note;
- rapid review sheet finale.

Alla fine del Task 9, il depth test deve dimostrare esattamente 420 minuti e almeno 34.020 parole teoriche italiane.

### Task 10: non iniziato

Assemblare il curriculum.

Creare `public/content/index.js` e sostituire `public/content.js` con un re-export. Preservare ordine e ID:

```text
digital-transformation
ot-it-ai-cloud
data-ai-use-cases
llm-agents
mvp-governance
interview-lab
```

Esportare `lessons`, `allGlossary`, `interviewQuestions`, `sources`, `CONTENT_VERSION` e un adapter temporaneo `withLegacyProjection(lesson)` fino al completamento del nuovo renderer.

Aggiornare:

- `tools/validate.mjs` per chiamare `validateCurriculum(lessons, sources)` e stampare minuti, parole, quota pratica, fonti e localizzazione;
- `package.json` per lint esplicito di tutti i moduli, compatibile con Windows e CI;
- test di learning e assembly.

### Task 11: non iniziato

Nuovo unit navigator e selettore lingua.

Requisiti chiave:

- una sola unità visibile alla volta;
- URL `/lesson/:slug?unit=:unitId`;
- vecchio URL senza query apre la prima unità incompleta;
- switch Italiano/English persistente con chiave `ai-sprint-locale-v1`;
- preservare unità, cursor, reveal state e checkpoint durante il cambio lingua;
- reveal separati per hint, model solution e rubric;
- una unità è completa dopo checkpoint e self-mark dell'attività;
- niente elapsed-time gate;
- renderer completo per theory, examples, cases, matrix/artifact, activities, rubric, checkpoint, sources e tutte le interview answer;
- 360 px senza overflow, tap target minimo 44 px, body almeno 16 px;
- desktop con indice laterale e testo circa 72 caratteri;
- accessibilità con `aria-pressed`, focus visibile e navigazione senza vicoli ciechi.

Solo dopo che Task 11 è verde si può rimuovere `withLegacyProjection`.

### Task 12: non iniziato

PWA, E2E, Supabase e deploy.

Requisiti:

- aggiornare cache version, almeno `ai-sprint-v5` o versione successiva libera;
- versionare coerentemente gli entry URL in `index.html`;
- inserire in `sw.js` index, schema, sources e tutti i sei moduli;
- preservare network-first e pulizia vecchie cache;
- E2E mobile 390x844: una unità, reveal solution, checkpoint, avanti, cambio lingua, deep link, no overflow, score non regressivo, login Supabase ready;
- aggiornare README con corso 420 minuti, bilinguismo, fonti, comandi, ordine migrazioni e regola cache;
- applicare `supabase/migrations/002_content_version.sql` al progetto remoto;
- verificare `content_version` in `information_schema`;
- test cross-device PC/telefono;
- test RLS: un secondo utente non legge righe del primo;
- integrazione del feature branch in `main`, push e verifica GitHub Pages;
- smoke test produzione e refresh di un deep link.

URL produzione:

```text
https://fabrizioborgomastro.github.io/ia-apprendimento/
```

## 5. Migrazione Supabase ancora da applicare

File:

```text
supabase/migrations/002_content_version.sql
```

SQL atteso:

```sql
alter table public.lesson_progress
add column if not exists content_version integer not null default 1
check (content_version >= 1);
```

Verifica nel SQL editor Supabase:

```sql
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'lesson_progress'
  and column_name = 'content_version';
```

Non copiare chiavi o token nel repository. Usare la sessione browser già autenticata oppure le variabili locali già configurate.

## 6. Fonti già verificate

Il catalogo completo e autorevole è `public/content/sources.js`. Non duplicare metadata in altri file. Citare gli ID nelle unità.

Fonti centrali:

- ISA-95: https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
- NIST SP 800-82 Rev. 3: https://csrc.nist.gov/pubs/sp/800/82/r3/final
- OPC UA Part 1: https://reference.opcfoundation.org/specs/OPC-10000-1/full
- NIST AI RMF 1.0: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf
- NIST AI 600-1 GenAI Profile: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- EU AI Act: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689
- European Commission Industry 5.0: https://research-and-innovation.ec.europa.eu/research-area/industrial-research-and-innovation/industry-50_en
- Transformer paper: https://arxiv.org/abs/1706.03762
- RAG paper: https://arxiv.org/abs/2005.11401
- MCP specification 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28
- RouteLLM: https://arxiv.org/abs/2406.18665
- AutoGen: https://arxiv.org/abs/2308.08155
- AgentBench: https://arxiv.org/abs/2308.03688
- PMI Operations: https://www.pmi.com/careers/areas-of-work/operations
- PMI Annual Report 2025: https://www.pmi.com/content/dam/pmicom/global/docs/investor_relation/pmi-2025-annual-report.pdf
- PMI Value Report 2025: https://www.pmi.com/content/dam/pmicom/global/docs/pmi-sustainability/pmi-value-report-2025.pdf

Fonti industriali e didattiche aggiuntive già nel catalogo:

- OECD digital transformation definitions;
- NIST manufacturing KPI procedure, hierarchy e baselines;
- DOE energy-intensity normalization;
- Toyota Genchi Genbutsu;
- Lean Enterprise Institute Gemba, educational e verificata contro Toyota;
- UK Government stakeholder mapping;
- AHRQ RACI;
- ISA-18 alarm management;
- ISA/IEC 62443;
- National Instruments 4-20 mA;
- NIST precision/recall source;
- NIST condition monitoring maintenance;
- NIST prediction uncertainty.

Politica fonti:

- per claim tecnici usare paper originali, standard o documentazione ufficiale;
- fonti educational sono ammesse solo se migliorano davvero la spiegazione e hanno `verifiedAgainst` verso una primaria;
- controllare che l'URL sia live e che il contenuto sostenga il claim specifico;
- non usare una fonte ampia per giustificare un metodo che non descrive;
- non copiare lunghi passaggi: scrivere spiegazioni originali e citare l'ID.

## 7. Contratti dati e lezioni già introdotti

File centrali:

- `public/types.js`
- `public/content/schema.js`
- `public/learning.js`
- `public/sync.js`

Pattern da preservare:

- `LocalizedText` per ogni testo learner-visible;
- `ProfessionalAnswer` con prompt, short, long e follow-up localizzati;
- unità con ID stabile, titolo, eyebrow, theory, key points, esempi, casi, attività, checkpoint e source IDs;
- ogni unità tra 5 e 10 minuti;
- timing esplicito e riconciliato a livello unità e lezione;
- artifact specializzati con validator opt-in;
- validator opt-in attivati da ID stabile o contract marker non cancellabile, mai dalla proprietà che devono proteggere;
- score, gate e totali sempre derivabili o ricomputabili;
- selected/pilot non può superare un hard gate fallito;
- graph/path con ID stabili, riferimenti validi e continuità;
- attività brevi con un output realistico rispetto al tempo;
- soluzioni che possano ottenere il punteggio massimo della propria rubric.

## 8. Comandi di verifica

Dalla root del worktree:

```powershell
npm run lint
npm test
npm run build
npm run test:e2e
git diff --check
git status --short
```

Comandi mirati:

```powershell
node --test --test-name-pattern="Module 4" tests/curriculum-depth.test.mjs
node --test tests/content-schema.test.mjs tests/curriculum-depth.test.mjs
node --test tests/progress-migration.test.mjs tests/sync.test.mjs tests/learning.test.mjs
```

Ultima evidenza prima dell'handoff a `fff5c99`:

- 90 test passati;
- lint passato;
- build passata;
- mobile E2E passato;
- nessun concern dichiarato dall'implementazione;
- re-review finale Task 7 non completata per limite d'uso, quindi ripeterla.

## 9. Processo raccomandato per completare senza regressioni

Per ogni task restante:

1. Registrare il commit base.
2. Scrivere test RED che falliscono per la funzionalità mancante.
3. Implementare senza indebolire schema o soglie.
4. Eseguire test mirati.
5. Eseguire suite completa, lint, build ed E2E mobile.
6. Fare una review separata del diff base..head.
7. Correggere ogni Critical o Important con mutation test quando il difetto riguarda enforcement.
8. Ripetere la review fino a verdetto pulito.
9. Aggiornare `.superpowers/sdd/.../progress.md`.
10. Solo allora passare al task successivo.

Non iniziare implementer di più moduli in parallelo: schema, tipi, catalogo e depth test sono file condivisi e i conflitti rischiano di invalidare le review.

## 10. Integrazione e pubblicazione finale

Quando Task 7-12 sono completi e tutte le verifiche sono verdi:

1. assicurarsi che il feature worktree sia pulito;
2. aggiornare il branch rispetto a `main` solo con una strategia non distruttiva;
3. integrare `feature/seven-hour-bilingual-sprint` in `main` tramite merge o fast-forward verificabile;
4. rieseguire tutta la suite su `main`;
5. applicare la migrazione Supabase remota;
6. push su `origin/main` senza force push;
7. attendere GitHub Actions;
8. verificare produzione, PWA cache, deep link, login Gmail, sync cross-device e RLS;
9. non dichiarare completo finché la pagina GitHub Pages non mostra la nuova asset version e il corso assemblato da 420 minuti.

## 11. Cosa non fare

- Non lavorare direttamente sul vecchio curriculum legacy ignorando i nuovi moduli.
- Non ridurre le soglie di parole o tempi per far passare i test.
- Non assegnare minuti a paragrafi troppo brevi senza learner action.
- Non usare la presenza dell'artefatto come unico trigger del validator che dovrebbe richiederlo.
- Non presentare MCP come orchestratore o garanzia di sicurezza.
- Non permettere a un LLM di eseguire direttamente azioni industriali senza validazione, autorizzazione, idempotenza, audit e fallback.
- Non presentare scenari ipotetici come informazioni interne PMI.
- Non applicare modifiche distruttive a Git, Supabase o GitHub Pages.
- Non esporre credenziali.

## 12. Definizione finale di completezza

Il lavoro è completo solo quando:

- i sei moduli sommano esattamente 420 minuti;
- il totale teoria italiana è almeno 34.020 parole e ogni modulo supera la propria soglia inglese;
- quota pratica totale almeno 55 percento;
- ogni modulo ha casi, attività risolte, rubric, artifact, checkpoint, fonti e risposte professionali bilingui;
- il learner vede una unità alla volta e può cambiare lingua senza perdere posizione;
- tutti i test, lint, build ed E2E passano;
- la migrazione Supabase è applicata e RLS/cross-device sono verificati;
- la PWA pubblicata su GitHub Pages usa la nuova cache version;
- la simulazione da 20 minuti e la rapid review sheet sono disponibili;
- il feature branch è integrato in `main` e la produzione è stata controllata in browser.

## 13. Metodo di lavoro usato finora, da replicare

Questa sezione descrive il processo operativo seguito fino a `fff5c99`. Claude dovrebbe usarlo come protocollo di esecuzione, non soltanto come suggerimento.

### 13.1 Principio generale

Ogni task è stato trattato come una piccola consegna indipendente con quattro ruoli logici:

1. controller: decide il perimetro, registra base e stato, non corregge il codice durante la review;
2. implementer: lavora in TDD, implementa un solo task, esegue test e commit;
3. reviewer: legge task, report e diff in sola lettura, cerca Critical e Important;
4. re-reviewer: controlla soltanto i finding corretti e nuove regressioni introdotte dal fix.

Quando Claude lavora da solo, deve simulare questi ruoli in fasi separate. Non deve fare una sola passata in cui scrive codice e si auto-approva immediatamente.

La regola pratica è:

```text
brief -> RED -> implementazione -> verifica -> commit -> review separata -> fix TDD -> re-review -> ledger -> task successivo
```

### 13.2 Preparazione di ogni task

Prima di toccare file:

1. leggere il task completo nel piano;
2. leggere lo schema, i tipi e i test esistenti collegati;
3. registrare il commit base con `git rev-parse HEAD`;
4. elencare esattamente file da creare e modificare;
5. identificare gli invarianti pubblici prodotti dal task;
6. identificare quali file condivisi potrebbero creare regressioni;
7. scrivere un brief locale con requisiti quantitativi, qualitativi, comandi e commit atteso.

I brief già generati sono in:

```text
.superpowers/sdd/2026-07-28-seven-hour-bilingual-interview-sprint/task-N-brief.md
```

Per Task 8-12 il piano è la fonte primaria. Se il generatore `task-brief` dell'ambiente non è disponibile, copiare il singolo task in un nuovo file brief senza alterarne il significato.

Non iniziare due implementazioni in parallelo. I moduli condividono almeno:

- `public/content/schema.js`;
- `public/types.js`;
- `public/content/sources.js`;
- `tests/content-schema.test.mjs`;
- `tests/curriculum-depth.test.mjs`.

Lavorare in parallelo su questi file renderebbe le review ambigue e rischierebbe merge conflittuali.

### 13.3 TDD obbligatorio

Per ogni feature o fix:

1. scrivere prima un test che descrive il comportamento desiderato;
2. eseguire il test mirato;
3. osservare un fallimento per la ragione prevista;
4. implementare il minimo necessario senza abbassare soglie;
5. rieseguire il test mirato fino a GREEN;
6. aggiungere test semantici e mutation test quando il difetto riguarda un validator;
7. eseguire la suite completa.

Non è sufficiente aggiungere un test già verde. Nei report sono state registrate le evidenze RED/GREEN.

Per un nuovo modulo, i primi test devono coprire almeno:

- ID e slug stabili;
- numero e titolo esatto delle unità;
- ogni unità tra 5 e 10 minuti;
- somma unità uguale alla durata lezione;
- time budget esatto;
- soglia parole IT/EN;
- minimo di esempi, casi, attività, artifact e checkpoint;
- fonti richieste presenti e risolvibili;
- risposte professionali localizzate;
- lesson reale valida con `validateCurriculum`, non soltanto fixture sintetiche.

### 13.4 Come sono stati scritti i contenuti lunghi

Il contenuto non è stato prodotto come un unico testo. Per ogni modulo è stata usata questa sequenza:

1. fissare le unit boundary esatte del piano;
2. assegnare 5-10 minuti a ogni unità;
3. distribuire teoria, casi e pratica in modo che le somme coincidano con il budget;
4. definire prima artifact, decisioni, casi numerici e interview transfer;
5. scrivere teoria italiana originale e poi una versione inglese naturale, non letterale;
6. collegare ogni concetto a un esempio manufacturing;
7. inserire almeno un checkpoint per unità;
8. misurare le parole teoriche reali con gli helper dei test;
9. espandere solo dove mancava sostanza, non ripetendo concetti per raggiungere la soglia;
10. leggere il modulo per verificare progressione logica e assenza di filler.

Struttura didattica preferita di una unità:

```text
concetto -> perché conta -> esempio manufacturing -> decisione -> trade-off -> attività -> feedback/rubric -> risposta da colloquio
```

Regola anti-padding:

- se un paragrafo non aggiunge una distinzione, un criterio, un esempio, un calcolo, un rischio o una decisione, va rimosso o riscritto;
- non ripetere una definizione con sinonimi per aumentare il word count;
- la versione inglese deve suonare come business/technical English parlato;
- l'italiano deve introdurre il concetto prima del gergo, mantenendo visibile la terminologia inglese utile al colloquio.

### 13.5 Come rendere i tempi realmente auditabili

Una durata non è accettabile solo perché un campo contiene `durationMinutes`.

Per ogni unità:

- teoria: stimare lettura e comprensione sulla base della quantità e densità del testo;
- caso: associare minuti a uno scenario learner-visible con azione o ragionamento;
- pratica: assegnare un deliverable compatibile con il tempo;
- checkpoint: non usarlo come giustificazione implicita di molti minuti non descritti.

Per attività da due minuti, chiedere un solo output:

- una scelta motivata in una frase;
- un singolo calcolo con dati già forniti;
- un gate pass/fail;
- una priorità e una ragione;
- una correzione di un artefatto.

Non chiedere in due minuti:

- una matrice completa multi-criterio;
- molti calcoli e una policy;
- una risposta inglese lunga più un'analisi;
- un diagramma architetturale completo;
- la revisione di numerosi gate senza dati precompilati.

I test devono sommare i segmenti learner-visible e confrontarli con:

- allocation della unità;
- `timeBudget` della lezione;
- durata totale.

### 13.6 Come costruire artifact professionali

Un artifact non è un titolo con descrizione. Deve poter essere usato da un professionista e ricostruito da un secondo valutatore.

Per matrici e scorecard includere:

- criteri e pesi;
- anchor comportamentali;
- evidenze o riferimenti;
- data e scadenza dell'evidenza;
- confidenza;
- assunzioni;
- score e totale ricomputabile;
- hard gate;
- decision record;
- owner, approvazione e dissent;
- guardrail, stop criteria e review date.

Per architetture includere:

- ID e ordine stabili;
- source e destination;
- protocollo/interfaccia concreta;
- latenza e cadence separate;
- data owner;
- security boundary crossing;
- fallback;
- human action;
- somma end-to-end coerente.

Per workflow agentici o tool calling includere:

- input schema;
- output schema;
- validation deterministica;
- authorization esterna al modello;
- idempotency key;
- audit log;
- retry e timeout;
- side-effect confirmation;
- fallback e stop condition;
- human escalation.

### 13.7 Validator opt-in e mutation testing

I validator specializzati devono essere opt-in per non rompere moduli che non usano quell'artifact. Tuttavia il trigger non deve essere la stessa proprietà che il validator dovrebbe rendere obbligatoria.

Pattern corretto:

```text
lesson.id stabile o contentContract stabile -> richiede artifact A, B, C -> valida ogni struttura
```

Pattern errato:

```text
se artifact A esiste -> valida A
```

Nel pattern errato, cancellare A disattiva il controllo.

Per ogni nuovo validator aggiungere mutation test che provino almeno:

- cancellazione completa artifact;
- cancellazione campo obbligatorio;
- array vuoto;
- ID duplicato o instabile;
- riferimento dangling;
- path o grafo disconnesso;
- totale alterato;
- gate mancante;
- scelta `selected` o `pilot` con gate fallito;
- timing rimosso o non riconciliato;
- modulo generico senza marker ancora valido.

### 13.8 Metodo per le fonti

Per ogni nuovo concetto difficile:

1. identificare il claim preciso;
2. cercare prima standard, regolamento, documentazione ufficiale o paper originale;
3. aprire la pagina e verificare che il contenuto sostenga davvero il claim;
4. verificare URL live, titolo, ente e data;
5. aggiungere un ID stabile in `public/content/sources.js`;
6. citare l'ID solo nelle unità che usano quel claim;
7. aggiungere test di integrità e locality;
8. non dedurre che una fonte ampia sostenga dettagli non presenti.

Esempio di errore già corretto: citare ISA-95 per alarm rationalization o zones/conduits. Sono stati aggiunti ISA-18 e ISA/IEC 62443 perché sono le fonti allineate.

Esempio di fonte didattica ammessa: Lean Enterprise Institute per Gemba, con `type: educational` e `verifiedAgainst` verso Toyota Genchi Genbutsu.

Per fonti tecniche usare solo fonti primarie. Per contenuti didattici secondari, usarli soltanto se migliorano materialmente la spiegazione e sono verificati contro una primaria.

### 13.9 Verifica dei calcoli

Il reviewer deve rifare i calcoli indipendentemente dal testo e dai valori attesi.

Controllare almeno:

- somme pesate della matrice;
- precision e recall dalla confusion matrix;
- costo atteso FP/FN;
- throughput e capacità della coda umana;
- downtime cost;
- latenza end-to-end;
- buffer e capacità;
- percentuali genealogy;
- score range realmente raggiungibile;
- eleggibilità rispetto ai gate.

I test devono ricomputare dai dati di input. Non devono limitarsi a confrontare un totale hard-coded con un altro totale hard-coded nello stesso oggetto.

### 13.10 Review separata

Dopo il commit dell'implementer:

1. registrare `BASE` e `HEAD`;
2. leggere il task brief;
3. leggere il report dell'implementer;
4. esaminare `git diff BASE..HEAD` o il review package;
5. non modificare file durante questa fase;
6. classificare findings come Critical, Important o Minor;
7. citare file e linee precise;
8. distinguere problemi del task da osservazioni future/UI/deploy;
9. verificare spec compliance, qualità didattica, fonti, matematica, schema e test.

Formato usato:

```text
Spec Compliance
Strengths
Issues
  Critical
  Important
  Minor
Assessment: Approved oppure Needs fixes
```

Un task non viene marcato completo con un Critical o Important aperto.

### 13.11 Fix round

Quando la review trova problemi:

1. tornare alla fase implementer;
2. trasformare ogni finding in un test RED o una mutazione riproducibile;
3. correggere soltanto il perimetro richiesto;
4. eseguire test mirati e suite completa;
5. creare un nuovo commit di fix;
6. aggiornare il report del task;
7. fare una nuova re-review focalizzata sui finding originali e su nuove regressioni Critical/Important;
8. ripetere fino a review pulita.

Il limite operativo usato era massimo cinque fix round per task, ma finora nessun task lo ha raggiunto.

La re-review non deve rifare una review vaga dell'intero progetto. Deve rispondere finding per finding:

```text
Finding A: ADDRESSED oppure NOT ADDRESSED, con evidenza
Finding B: ADDRESSED oppure NOT ADDRESSED, con evidenza
New Breakage
Verdict
```

### 13.12 Ledger e report

Il ledger è:

```text
.superpowers/sdd/2026-07-28-seven-hour-bilingual-interview-sprint/progress.md
```

Formato:

```text
Task N: fix round X/5 (A addressed, B open; commits BASE..HEAD).
Task N: complete (commits TASK_BASE..HEAD, review clean).
```

Ogni implementazione deve avere un report:

```text
.superpowers/sdd/2026-07-28-seven-hour-bilingual-interview-sprint/task-N-report.md
```

Il report deve includere:

- stato;
- commit;
- test RED osservato;
- test GREEN e suite completa;
- lint, build ed E2E;
- conteggi parole e minuti;
- casi, attività e artifact;
- fonti aggiunte e URL verificati;
- concern o lavoro remoto/deploy differito;
- fix round append-only.

### 13.13 Git e worktree

Preservare il worktree isolato fino alla fine.

Prima di ogni task:

```powershell
git status --short
git rev-parse HEAD
```

Dopo ogni task:

```powershell
git diff --check
git status --short
git log -3 --oneline
```

Regole:

- un commit logico per implementazione e uno per ciascun fix round;
- messaggi concisi senza co-author automatici;
- niente `git reset --hard`;
- niente force push;
- non cancellare o sovrascrivere modifiche non riconosciute;
- non integrare in `main` prima della verifica finale;
- dopo il merge, ripetere test su `main` prima del push.

### 13.14 Browser, mobile ed E2E

L'app era già funzionante con Gmail/Supabase su PC e telefono prima di questo feature branch.

Durante ogni modulo sono stati mantenuti verdi build ed E2E legacy per evitare di rompere la base mentre il nuovo renderer non era ancora implementato.

Per Task 11 e 12, il controllo browser deve essere visuale e severo:

- viewport 360x800, 390x844, 768x1024, 1440x900;
- nessun overflow orizzontale;
- una sola unità visibile;
- sticky controls non coprono il contenuto;
- tap target almeno 44 px;
- focus visibile;
- font body almeno 16 px;
- reveal solution/rubric accessibili;
- deep link ricaricabile;
- cambio lingua non cambia il progresso;
- console senza errori applicativi;
- refresh dopo deploy usa asset version coerente.

Per test cross-device:

1. completare una unità su PC;
2. attendere stato `Sincronizzato`;
3. aggiornare la stessa lezione sul telefono;
4. verificare cursor e completion;
5. cambiare lingua su un device;
6. verificare che il progresso sull'altro non cambi;
7. testare un secondo account per RLS.

### 13.15 Autonomia richiesta dall'utente

L'utente ha chiesto esplicitamente di completare senza richiedere consensi intermedi.

Claude deve quindi:

- prendere decisioni ragionevoli e robuste entro il perimetro già approvato;
- non chiedere conferme per scelte editoriali o tecniche già definite nel piano;
- procedere da Task 7 review fino a Task 12;
- fermarsi soltanto davanti a permessi mancanti, credenziali non configurate, azioni distruttive non autorizzate o scelte esterne irreversibili;
- per Supabase, GitHub push e deploy usare le sessioni/credenziali già configurate, senza estrarle o ripubblicarle;
- documentare eventuali blocker con evidenza precisa;
- non dichiarare completezza parziale come completezza finale.

### 13.16 Checkpoint di qualità prima di passare al task successivo

Claude deve rispondere sì a tutte queste domande:

- I test mirati hanno avuto RED per la ragione prevista?
- I test mirati sono GREEN senza soglie indebolite?
- La suite completa passa?
- Lint e build passano?
- E2E mobile passa o è esplicitamente non applicabile al task?
- I minuti sono conseguenza di lavoro learner-visible?
- Le parole superano la soglia senza filler?
- I calcoli sono ricomputabili?
- Le fonti sono live e allineate?
- Le risposte IT/EN sono complete e naturali?
- Artifact, rubric e solution sono coerenti?
- Il validator non è fail-open?
- I mutation test coprono i bypass principali?
- La review separata non ha Critical/Important aperti?
- Il ledger e il report sono aggiornati?
- Il worktree è pulito?

Se una risposta è no, il task non è completo.

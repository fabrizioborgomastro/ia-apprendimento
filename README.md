# AI Transformation Interview Sprint

PWA mobile-first in italiano e inglese per preparare un colloquio tecnico da AI Digital Transformation Lead nel manufacturing.

URL pubblico: <https://fabrizioborgomastro.github.io/ia-apprendimento/>

## Il corso in numeri

| Misura | Valore |
|---|---:|
| Durata pianificata | 420 minuti esatti |
| Moduli | 6 |
| Unità di apprendimento | 46, ciascuna da 5 a 10 minuti |
| Teoria | 189 minuti |
| Casi e pratica | 231 minuti, cioè il 55 percento |
| Parole di teoria in italiano | oltre 34.000 |
| Parole di teoria in inglese | almeno l'85 percento dell'italiano, per ogni modulo |
| Risposte professionali da colloquio | 27, con forma da 30 secondi e da 2 minuti |

I numeri sono verificati a ogni build da `npm run build`, che fallisce se la durata non è esattamente 420 minuti o se una soglia di profondità non è raggiunta.

## Contenuti

1. Digital Transformation e Industry 4.0
2. Architettura OT / IT / AI / Cloud
3. Dati, analytics e casi d'uso AI industriali
4. LLM, RAG, agenti, MCP e orchestrazione multi-modello
5. MVP, sicurezza, governance e scaling
6. Interview Lab tecnico, con simulazione da 20 minuti e scheda di ripasso rapido

## Come si studia

Il corso mostra **una unità alla volta**. Ogni unità contiene teoria, esempi e casi cronometrati, una attività con soluzione e rubric, un checkpoint e le fonti usate.

- Deep link stabile: `/lesson/:slug?unit=:unitId`. Un link senza `unit` apre la prima unità non completata.
- Una unità risulta completata dopo aver risposto al checkpoint e, quando l'unità ha una attività, dopo averla segnata come svolta. Non esistono attese a tempo.
- I pulsanti indizio, soluzione e rubric si aprono in modo indipendente.
- Il checkpoint finale del modulo compare sull'ultima unità.

## Bilinguismo

Il selettore `Italiano / English` nell'intestazione cambia lingua a ogni schermata. La scelta è persistente nella chiave locale `ai-sprint-locale-v1`.

Cambiare lingua **non** cambia la posizione: restano invariati unità corrente, deep link, cursore di progresso, pannelli già rivelati e risposta data al checkpoint.

## Politica delle fonti

- Per standard, norme, protocolli e sicurezza si usano fonti primarie: ISA-95, ISA-18, ISA/IEC 62443, OPC UA, NIST SP 800-82 Rev. 3, NIST SP 800-61 Rev. 3, NIST AI RMF 1.0, NIST AI 600-1, Regolamento (UE) 2024/1689.
- Per i concetti di AI si usano i paper originali: Transformer, RAG, RouteLLM, AutoGen, AgentBench, e la specifica ufficiale MCP.
- Una fonte didattica è ammessa solo se migliora davvero la spiegazione e dichiara `verifiedAgainst` verso una fonte primaria.
- Ogni unità cita soltanto gli ID che usa davvero. Il catalogo unico è `public/content/sources.js`.
- Tutti gli scenari aziendali sono dichiarati ipotetici e costruiti solo su contesto pubblico.

## Avvio locale

Non sono necessarie dipendenze esterne per eseguire l'app.

```powershell
npm run dev
```

Apri `http://127.0.0.1:4173`. Da smartphone, pubblica prima la cartella `public` oppure avvia il server su una rete raggiungibile dal telefono.

## Verifica

```powershell
npm run lint
npm test
npm run build
npm run test:e2e
```

- `npm run lint` esegue `node --check` su ogni modulo applicativo e su tutti i file del curriculum.
- `npm test` esegue la suite Node: schema e validazione, profondità del curriculum, migrazione del progresso, helper di navigazione, rendering delle unità, contratto PWA.
- `npm run build` valida il curriculum contro il catalogo fonti reale e stampa minuti, quota pratica, parole per lingua e fonti risolte.
- `npm run test:e2e` richiede Playwright e Microsoft Edge installati. Copre: una sola unità visibile, reveal indipendenti, checkpoint, avanzamento, cambio lingua senza perdita di posizione, ricarica di un deep link, checkpoint finale, assenza di overflow a 360, 390 e 1440 px, e stato Supabase nella pagina di login.

## Sincronizzazione Gmail con Supabase

1. Crea un progetto Supabase.
2. Apri SQL Editor ed esegui le migrazioni **in questo ordine**:
   1. [`supabase/migrations/001_learning_progress.sql`](supabase/migrations/001_learning_progress.sql)
   2. [`supabase/migrations/002_content_version.sql`](supabase/migrations/002_content_version.sql)
3. Verifica la colonna aggiunta dalla seconda migrazione:

```sql
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'lesson_progress'
  and column_name = 'content_version';
```

Atteso: una colonna `integer` con default `1`.

4. In Authentication > URL Configuration inserisci l'URL pubblico dell'app come Site URL e Redirect URL.
5. Verifica che il provider Email sia attivo.
6. Inserisci Project URL e publishable key in `public/config.js`.

La publishable key può stare nel client perché l'accesso ai dati è protetto dalle policy RLS. Non inserire mai la service role key nel repository.

### Perché serve `content_version`

Il curriculum esteso ha un numero di unità diverso dal contenuto precedente. Il progresso salvato prima di questa versione viene migrato in modo proporzionale al primo caricamento: il cursore viene rimappato sul nuovo numero di unità, mentre completamento e punteggio migliore non regrediscono mai. `content_version` distingue il progresso già migrato da quello ancora da migrare, sul dispositivo e nel database.

## Regola della cache di rilascio

Il service worker usa una cache con versione esplicita, oggi `ai-sprint-v8`.

A ogni rilascio che tocca un file in `public`:

1. incrementa `CACHE` in `public/sw.js`;
2. allinea la stessa versione in ogni query `?v=` sotto `public/`, oggi `index.html`, `app.js`, `render.js` e `sync.js`; il test fallisce se un file mescola versioni;
3. aggiungi in `ASSETS` ogni nuovo file del grafo dei moduli, inclusi i file in `public/content/`;
4. aggiorna `RELEASE_VERSION` in `tests/pwa.test.mjs`.

Il test `tests/pwa.test.mjs` fallisce se le versioni non coincidono o se un modulo del curriculum non è in cache, quindi una dimenticanza non arriva in produzione.

## Pubblicazione GitHub Pages

1. In Settings > Pages seleziona GitHub Actions come source.
2. Esegui il workflow `Deploy PWA to GitHub Pages`.
3. Aggiungi l'URL Pages ai Redirect URL di Supabase.

Il link non viene pubblicizzato, ma i contenuti statici non sono segreti. Il progresso personale resta protetto da autenticazione e RLS.

## Installazione sul telefono

- Android: apri il link in Chrome, menu, `Installa app`.
- iPhone: apri il link in Safari, Condividi, `Aggiungi alla schermata Home`.

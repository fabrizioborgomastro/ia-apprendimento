# AI Transformation Interview Sprint

PWA mobile-first in italiano e inglese per preparare un colloquio tecnico da AI Digital Transformation Lead nel manufacturing.

URL pubblico: <https://fabrizioborgomastro.github.io/ia-apprendimento/>

## Il corso in numeri

| Misura | Valore |
|---|---:|
| Durata pianificata | 154 minuti |
| Moduli | 5 |
| Unità di apprendimento | 25, da 6 o 7 minuti l'una |
| Domande di quiz | 175, cioè 7 per unità |
| Termini nel glossario | 132, ognuno con l'unità che lo spiega |
| Parole di teoria in italiano | oltre 7.000 |
| Parole di teoria in inglese | almeno il 75 percento dell'italiano, unità per unità |
| Domande di colloquio | 10, con risposta italiana, inglese parlato e tre punti chiave |

I numeri sono verificati a ogni build da `npm run build`, che fallisce se manca un quiz, se un esempio non contiene numeri, se un termine non è nel glossario o se una soglia di profondità non è raggiunta.

## Contenuti

1. Capire la trasformazione digitale in fabbrica
2. Com'è fatta una fabbrica digitale: OT, IT, AI, cloud
3. Analytics, automazione e AI: scegliere lo strumento
4. Portare un'idea in produzione
5. Governare, scalare e far adottare la trasformazione

Il corso è un unico processo raccontato dall'inizio alla fine, le **sette tappe**, che ricorrono in ogni unità: osservo una perdita, misuro il punto di partenza, capisco dove nascono i dati, scelgo lo strumento più semplice, provo in piccolo, metto in produzione con rete di sicurezza, decido se estendere o fermarmi.

Oltre ai moduli: il **glossario** con ogni termine tecnico usato nelle 25 unità, e le **dieci domande** del colloquio.

## Come si studia

Il corso mostra **una unità alla volta**, e ogni unità ha sempre la stessa struttura: dove siamo nel percorso, il concetto, i termini di questa unità, un esempio pratico con numeri, come lo dici in inglese, sette domande di quiz, le fonti.

- Deep link stabile: `/lesson/:slug?unit=:unitId`. Un link senza `unit` apre la prima unità non completata.
- Una unità è completata quando **tutte e sette le domande** hanno una risposta. Sbagliare non blocca: la spiegazione insegna e la domanda entra nella coda di ripasso.
- Il modulo è completato quando ogni domanda delle sue cinque unità ha una risposta e il punteggio raggiunge l'80 percento.
- Le risposte restano salvate sul dispositivo in `ai-sprint-answers-v2`, quindi una ricarica non azzera un quiz a metà.

## Bilinguismo

Il selettore `Italiano / English` nell'intestazione cambia lingua a ogni schermata. La scelta è persistente nella chiave locale `ai-sprint-locale-v1`.

Cambiare lingua **non** cambia la posizione: restano invariati unità corrente, deep link, cursore di progresso, pannelli già rivelati e risposta data al checkpoint.

## Politica delle fonti

- Per standard, norme, protocolli e sicurezza si usano fonti primarie: ISA-95, ISA-18, ISA/IEC 62443, NIST SP 800-82 Rev. 3, NIST AI RMF 1.0, NIST AI 600-1, NIST Cybersecurity Framework, CISA ICS, Regolamento (UE) 2024/1689.
- Per il contesto del ruolo si usano le pagine pubbliche PMI; per delivery e industrializzazione, Scrum Guide, AWS MLOps e Microsoft Cloud Adoption Framework.
- Le fonti stanno **in fondo all'unità**, non citate riga per riga: il testo resta leggibile.
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
- `npm test` esegue la suite Node: schema e validazione del contenuto, profondità del curriculum, copertura del glossario, migrazione del progresso, helper di navigazione, rendering delle unità, contratto PWA.
- `npm run build` valida il curriculum contro il catalogo fonti reale e stampa moduli, unità, domande, termini e minuti.
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

La versione 2 del corso è un corso diverso, con moduli e unità nuovi. Il progresso salvato prima non viene buttato: al primo caricamento il cursore viene limitato al numero di unità che esistono adesso, mentre completamento e punteggio migliore non regrediscono mai. `content_version`, oggi 3, distingue il progresso già migrato da quello ancora da migrare, sul dispositivo e nel database.

## Regola della cache di rilascio

Il service worker usa una cache con versione esplicita, oggi `ai-sprint-v10`.

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

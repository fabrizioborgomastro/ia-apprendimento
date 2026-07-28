# AI Transformation Interview Sprint

PWA mobile-first in italiano e inglese per preparare un colloquio tecnico da AI Digital Transformation Lead nel manufacturing.

## Avvio immediato

Non sono necessarie dipendenze esterne.

```powershell
npm run dev
```

Apri `http://127.0.0.1:4173`. Da smartphone, pubblica prima la cartella `public` oppure avvia il server su una rete raggiungibile dal telefono.

## Contenuti

- Digital Transformation e Industry 4.0
- Architettura OT / IT / AI / Cloud
- Dati, analytics e casi d'uso AI industriali
- LLM, RAG, agenti, MCP e orchestrazione multi-modello
- MVP, sicurezza, governance e scaling
- Interview Lab tecnico in inglese

I progressi vengono salvati immediatamente nel browser. La sincronizzazione tra dispositivi si attiva configurando Supabase.

## Sincronizzazione Gmail con Supabase

1. Crea un progetto Supabase.
2. Apri SQL Editor ed esegui [`supabase/migrations/001_learning_progress.sql`](supabase/migrations/001_learning_progress.sql).
3. In Authentication > URL Configuration inserisci l'URL pubblico dell'app come Site URL e Redirect URL.
4. Verifica che il provider Email sia attivo.
5. Inserisci Project URL e anon public key in `public/config.js`:

```js
window.AI_SPRINT_CONFIG = {
  supabaseUrl: 'https://PROJECT.supabase.co',
  supabaseAnonKey: 'ANON_PUBLIC_KEY'
}
```

La anon key può essere presente nel client perché l'accesso ai dati è protetto dalle policy RLS. Non inserire mai la service role key.

## Pubblicazione GitHub Pages

1. Inizializza il repository e pubblicalo su GitHub.
2. In Settings > Pages seleziona GitHub Actions come source.
3. Esegui il workflow `Deploy PWA to GitHub Pages`.
4. Aggiungi l'URL Pages ai Redirect URL di Supabase.

Il link non viene pubblicizzato, ma i contenuti statici non sono segreti. Il progresso personale rimane protetto da autenticazione e RLS.

## Installazione sul telefono

- Android: apri il link in Chrome, menu, `Installa app`.
- iPhone: apri il link in Safari, Condividi, `Aggiungi alla schermata Home`.

## Verifica

```powershell
npm test
npm run lint
npm run build
npm run test:e2e
```

Il test E2E usa Microsoft Edge già installato e controlla Dashboard, roadmap, apertura della lezione, feedback del quiz e overflow mobile.

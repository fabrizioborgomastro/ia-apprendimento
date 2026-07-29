const t = (it, en) => ({ it, en })

/**
 * The glossary is built from the curriculum itself, so a term can never be
 * introduced in a unit and then be missing here. The promise to the reader was
 * that no acronym is ever taken for granted; deriving the list is how that
 * promise stays true when the content changes.
 */
export function buildGlossary(curriculum, extras = extraGlossaryEntries) {
  const entries = []
  const seen = new Set()

  for (const lesson of curriculum) {
    for (const [unitIndex, unit] of (lesson.units || []).entries()) {
      for (const term of unit.terminology || []) {
        if (seen.has(term.id)) continue
        seen.add(term.id)
        entries.push({
          id: term.id,
          term: term.term,
          italian: term.italian,
          definition: term.definition,
          where: `M${lesson.moduleNumber}.${unitIndex + 1}`,
          moduleId: lesson.id,
          unitId: unit.id
        })
      }
    }
  }

  for (const extra of extras) {
    if (seen.has(extra.id)) continue
    seen.add(extra.id)
    entries.push({ ...extra })
  }

  return entries.sort((a, b) => a.term.localeCompare(b.term, 'it', { sensitivity: 'base' }))
}

/**
 * Terms that never get a unit of their own but come up in conversation often
 * enough that it is worth having them ready.
 */
export const extraGlossaryEntries = [
  {
    id: 'roi',
    term: 'ROI',
    italian: 'Ritorno sull\'investimento',
    definition: t('In quanto tempo il beneficio ripaga la spesa.', 'How long the benefit takes to pay back the spend.'),
    where: 'Fuori unità'
  },
  {
    id: 'sla',
    term: 'SLA',
    italian: 'Livello di servizio concordato',
    definition: t('Il livello di servizio promesso per iscritto, con i tempi di risposta.', 'The service level promised in writing, with response times.'),
    where: 'Fuori unità'
  },
  {
    id: 'poc',
    term: 'Proof of concept',
    italian: 'Prova di fattibilità',
    definition: t('Una verifica tecnica che una cosa è possibile, senza utenti reali.', 'A technical check that something is possible, with no real users.'),
    where: 'Fuori unità'
  },
  {
    id: 'takt-time',
    term: 'Takt time',
    italian: 'Ritmo della domanda',
    definition: t('Il tempo disponibile diviso i pezzi richiesti: il ritmo a cui la linea deve produrre.', 'Available time divided by required units: the rate the line has to run at.'),
    where: 'Fuori unità'
  },
  {
    id: 'cambio-formato',
    term: 'Changeover',
    italian: 'Cambio formato',
    definition: t('Il passaggio da un articolo a un altro, con le regolazioni che comporta.', 'The switch from one product to another, with the settings it requires.'),
    where: 'Fuori unità'
  },
  {
    id: 'lotto',
    term: 'Batch',
    italian: 'Lotto',
    definition: t('La quantità di prodotto fabbricata nelle stesse condizioni e identificata da un codice.', 'The quantity of product made under the same conditions and identified by a code.'),
    where: 'Fuori unità'
  }
]

/** Coppie che vengono confuse: la parte del glossario che si ripassa il giorno prima. */
export const confusedPairs = [
  {
    id: 'output-outcome-impatto',
    pair: t('Output / Outcome / Impatto', 'Output / Outcome / Impact'),
    difference: t(
      'Cosa hai consegnato, cosa si fa di diverso, quanto è cambiato il numero di partenza.',
      'What you delivered, what people now do differently, how much the starting number moved.'
    )
  },
  {
    id: 'prototipo-mvp-pilota',
    pair: t('Prototipo / MVP / Pilota', 'Prototype / MVP / Pilot'),
    difference: t(
      'Si può fare, serve a qualcuno, regge nella realtà per mesi.',
      'Can we do it, does it help someone, does it hold in reality for months.'
    )
  },
  {
    id: 'ot-it-pair',
    pair: t('OT / IT', 'OT / IT'),
    difference: t(
      'In OT viene prima la disponibilità, in IT la riservatezza.',
      'In OT availability comes first, in IT confidentiality does.'
    )
  },
  {
    id: 'mes-scada-pair',
    pair: t('MES / SCADA', 'MES / SCADA'),
    difference: t(
      'Il MES registra e traccia, lo SCADA supervisiona e permette di agire adesso.',
      'MES records and traces, SCADA supervises and lets you act right now.'
    )
  },
  {
    id: 'erp-mes-pair',
    pair: t('ERP / MES', 'ERP / MES'),
    difference: t(
      'Cosa e quando, contro come è andata davvero.',
      'What and when, against how it really went.'
    )
  },
  {
    id: 'preventiva-predittiva',
    pair: t('Manutenzione preventiva / predittiva', 'Preventive / predictive maintenance'),
    difference: t(
      'A intervalli fissi, contro sulla base di segnali reali.',
      'At fixed intervals, against based on real signals.'
    )
  },
  {
    id: 'falso-positivo-negativo',
    pair: t('Falso positivo / Falso negativo', 'False positive / False negative'),
    difference: t(
      'Segnala un pezzo buono, contro non segnala un pezzo difettoso.',
      'It flags a good part, against it misses a defective one.'
    )
  },
  {
    id: 'precisione-richiamo',
    pair: t('Precisione / Richiamo', 'Precision / Recall'),
    difference: t(
      'Quanto di ciò che segnala è vero, contro quanto del vero riesce a trovare.',
      'How much of what it flags is real, against how much of the real it finds.'
    )
  },
  {
    id: 'deriva-dati-concetto',
    pair: t('Deriva dei dati / del concetto', 'Data drift / concept drift'),
    difference: t(
      'Cambiano gli ingressi, contro cambia la relazione fra ingressi e risultato.',
      'The inputs change, against the relation between inputs and result changes.'
    )
  },
  {
    id: 'adozione-installazione',
    pair: t('Adozione / Installazione', 'Adoption / Installation'),
    difference: t(
      'Il lavoro è cambiato, contro il sistema è disponibile.',
      'The work changed, against the system is available.'
    )
  },
  {
    id: 'standard-locale',
    pair: t('Standardizzazione / Adattamento locale', 'Standardisation / Localisation'),
    difference: t(
      'Cosa resta uguale ovunque, contro cosa cambia per il contesto del sito.',
      'What stays the same everywhere, against what changes for the site context.'
    )
  },
  {
    id: 'rassicurazione-controllo',
    pair: t('Rassicurazione / Controllo verificabile', 'Reassurance / Verifiable control'),
    difference: t(
      '"Sarà semplice", contro qualcosa che qualcuno può misurare.',
      '"It will be easy", against something somebody can measure.'
    )
  }
]

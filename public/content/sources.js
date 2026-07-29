const accessedAt = '2026-07-29'

/**
 * Sources cited by course version 2. The course keeps them at the foot of each
 * unit instead of quoting them line by line, so this list stays short: only what
 * a unit actually leans on.
 * @type {Record<string, import('../types.js').CurriculumSource>}
 */
export const sources = {
  'pmi-state-of-ai': {
    title: 'The State of AI at PMI',
    organization: 'Philip Morris International',
    type: 'primary',
    url: 'https://www.pmi.com/sustainability/case-studies-and-market-stories/the-state-of-ai-at-pmi',
    accessedAt
  },
  'pmi-information-technology': {
    title: 'Areas of Work: Information Technology',
    organization: 'Philip Morris International',
    type: 'primary',
    url: 'https://www.pmi.com/careers/areas-of-work/information-technology',
    accessedAt
  },
  'isa-95': {
    title: 'ISA-95 Series of Standards: Enterprise-Control System Integration',
    organization: 'International Society of Automation',
    type: 'primary',
    url: 'https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard',
    accessedAt
  },
  'isa-iec-62443': {
    title: 'ISA/IEC 62443: Industrial Automation and Control Systems Security',
    organization: 'International Society of Automation',
    type: 'primary',
    url: 'https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards',
    accessedAt
  },
  'isa-18-alarm-management': {
    title: 'ISA-18 Series of Standards: Alarm Management',
    organization: 'International Society of Automation',
    type: 'primary',
    url: 'https://www.isa.org/standards-and-publications/isa-standards/isa-18-series-of-standards',
    accessedAt
  },
  'nist-sp-800-82-r3': {
    title: 'NIST SP 800-82 Rev. 3: Guide to Operational Technology (OT) Security',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://csrc.nist.gov/pubs/sp/800/82/r3/final',
    accessedAt
  },
  'nist-ai-rmf-1-0': {
    title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    accessedAt
  },
  'nist-ai-600-1': {
    title: 'AI RMF Generative Artificial Intelligence Profile',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
    accessedAt
  },
  'nist-cybersecurity-framework': {
    title: 'NIST Cybersecurity Framework',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://www.nist.gov/cyberframework',
    accessedAt
  },
  'nist-engineering-statistics': {
    title: 'NIST/SEMATECH e-Handbook of Statistical Methods',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://www.itl.nist.gov/div898/handbook/',
    accessedAt
  },
  'cisa-industrial-control-systems': {
    title: 'Industrial Control Systems',
    organization: 'Cybersecurity and Infrastructure Security Agency',
    type: 'primary',
    url: 'https://www.cisa.gov/topics/industrial-control-systems',
    accessedAt
  },
  'aws-mlops-planning': {
    title: 'Planning for Successful MLOps',
    organization: 'Amazon Web Services',
    type: 'primary',
    url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/ml-operations-planning/introduction.html',
    accessedAt
  },
  'azure-landing-zone': {
    title: 'Azure Landing Zones',
    organization: 'Microsoft',
    type: 'primary',
    url: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/',
    accessedAt
  },
  'microsoft-ai-readiness': {
    title: 'Organizational Readiness for AI Agents',
    organization: 'Microsoft',
    type: 'primary',
    url: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organization-people-readiness-plan',
    accessedAt
  },
  'microsoft-adoption-change': {
    title: 'Define a Strategy for Adoption and Change Management',
    organization: 'Microsoft',
    type: 'primary',
    url: 'https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/implementation-strategy-define-strategy-adoption-change-management',
    accessedAt
  },
  'sap-what-is-mes': {
    title: 'What is a Manufacturing Execution System (MES)?',
    organization: 'SAP',
    type: 'primary',
    url: 'https://www.sap.com/resources/what-is-mes',
    accessedAt
  },
  'scrum-guide': {
    title: 'The Scrum Guide',
    organization: 'Scrum.org',
    type: 'primary',
    url: 'https://www.scrum.org/resources/scrum-guide',
    accessedAt
  },
  'eu-ai-act': {
    title: 'Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence',
    organization: 'European Union',
    type: 'primary',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    accessedAt
  }
}

export function sourceById(id) {
  return sources[id]
}

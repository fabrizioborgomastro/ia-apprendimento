const accessedAt = '2026-07-28'

/** @type {Record<string, import('../types.js').CurriculumSource>} */
export const sources = {
  'isa-95': {
    title: 'ISA-95 Series of Standards: Enterprise-Control System Integration',
    organization: 'International Society of Automation',
    type: 'primary',
    url: 'https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard',
    accessedAt
  },
  'nist-sp-800-82-r3': {
    title: 'NIST SP 800-82 Rev. 3: Guide to Operational Technology (OT) Security',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://csrc.nist.gov/pubs/sp/800/82/r3/final',
    accessedAt
  },
  'opc-ua-part-1': {
    title: 'OPC Unified Architecture - Part 1: Overview and Concepts',
    organization: 'OPC Foundation',
    type: 'primary',
    url: 'https://reference.opcfoundation.org/specs/OPC-10000-1/full',
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
    title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile',
    organization: 'National Institute of Standards and Technology',
    type: 'primary',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
    accessedAt
  },
  'eu-ai-act': {
    title: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act)',
    organization: 'European Union',
    type: 'primary',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    accessedAt
  },
  'ec-industry-5-0': {
    title: 'Industry 5.0',
    organization: 'European Commission',
    type: 'primary',
    url: 'https://research-and-innovation.ec.europa.eu/research-area/industrial-research-and-innovation/industry-50_en',
    accessedAt
  },
  'attention-is-all-you-need': {
    title: 'Attention Is All You Need',
    organization: 'arXiv',
    type: 'primary',
    url: 'https://arxiv.org/abs/1706.03762',
    accessedAt
  },
  'retrieval-augmented-generation': {
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    organization: 'arXiv',
    type: 'primary',
    url: 'https://arxiv.org/abs/2005.11401',
    accessedAt
  },
  'mcp-specification': {
    title: 'Model Context Protocol Specification: Architecture',
    organization: 'Model Context Protocol',
    type: 'primary',
    url: 'https://modelcontextprotocol.io/specification/2025-06-18/architecture',
    accessedAt
  },
  'pmi-operations': {
    title: 'Operations',
    organization: 'Philip Morris International',
    type: 'primary',
    url: 'https://www.pmi.com/careers/areas-of-work/operations',
    accessedAt
  },
  'pmi-product-reliability': {
    title: 'Product reliability',
    organization: 'Philip Morris International',
    type: 'primary',
    url: 'https://www.pmi.com/sustainability/integrated-report-2020/innovating-for-better-products/product-reliability',
    accessedAt
  },
  'pmi-annual-report-2025': {
    title: 'Philip Morris International 2025 Annual Report',
    organization: 'Philip Morris International',
    type: 'primary',
    url: 'https://www.pmi.com/content/dam/pmicom/global/docs/investor_relation/pmi-2025-annual-report.pdf',
    accessedAt
  },
  'pmi-value-report-2025': {
    title: 'Philip Morris International Value Report 2025',
    organization: 'Philip Morris International',
    type: 'primary',
    url: 'https://www.pmi.com/content/dam/pmicom/global/docs/pmi-sustainability/pmi-value-report-2025.pdf',
    accessedAt
  }
}

export function sourceById(id) {
  return sources[id]
}

# Seven-Hour Bilingual Interview Sprint Design

**Date:** 2026-07-28

## Objective

Transform the existing six-module interview sprint from a short overview into a substantive, source-backed, bilingual learning experience requiring approximately seven hours of engaged study. The course prepares a candidate for an AI Digital Transformation Lead interview at Philip Morris International (PMI), with emphasis on applying theory to realistic manufacturing decisions and explaining those decisions professionally in English.

## Current Problem

The current content contains approximately 5,100 words across six lessons. Although lesson metadata declares 45 to 90 minutes per module, the complete course can be read in approximately 30 to 40 minutes. The duration labels are therefore not supported by the amount of theory, case work, oral practice, or assessment.

The redesign must make duration an auditable consequence of content and activities. It must not use forced timers, delayed navigation, or decorative text to simulate depth.

## Scope

The release includes:

- six expanded modules with the existing lesson identifiers and order;
- full Italian and English versions of every learning unit;
- source-backed theory at Technical Lead depth;
- practical manufacturing examples and worked cases;
- exercises with model solutions and evaluation rubrics;
- distributed checkpoints and expanded final quizzes;
- professional English responses for application-oriented interview questions;
- unit-by-unit navigation optimized for phone and desktop;
- preservation and migration of existing learning progress;
- offline access through the existing PWA architecture.

The release does not include:

- live LLM feedback;
- a chatbot;
- coding laboratories;
- automatic speech evaluation;
- forced minimum time on a page;
- claims about confidential PMI systems or internal procedures.

## Audience and Technical Level

The learner is preparing for an AI Digital Transformation Lead role. Content must provide enough technical depth to discuss architecture, integration, data, AI, security, governance, and operating-model decisions with specialists. It must prioritize business outcomes, trade-offs, risk, adoption, and communication rather than implementation-level programming.

All PMI-specific scenarios are explicitly labeled as realistic hypothetical cases derived from public information. The course must not imply knowledge of PMI's confidential workflows, technology estate, controls, or performance.

## Time Budget

The complete sprint contains exactly 420 planned minutes of engaged study.

| Module | Theory | Cases | Practice | Total |
|---|---:|---:|---:|---:|
| Digital Transformation and Industry 4.0 | 25 | 15 | 10 | 50 |
| OT / IT / AI / Cloud Architecture | 38 | 22 | 15 | 75 |
| Data, Analytics and AI Use Cases | 31 | 20 | 14 | 65 |
| LLMs, RAG, Agents and MCP | 40 | 22 | 18 | 80 |
| MVP, Security and Scaling | 36 | 22 | 17 | 75 |
| Technical Interview Lab | 19 | 25 | 31 | 75 |
| **Total** | **189** | **126** | **105** | **420** |

Theory represents 45 percent of the course. Cases and active practice represent 55 percent.

The Italian theory contains at least 34,000 words, based on approximately 180 words per minute for careful technical reading. The English version provides equivalent meaning and depth rather than a literal word-for-word translation. Case reading, diagram interpretation, written decisions, quizzes, and oral rehearsal are budgeted separately through explicit activity durations.

## Instructional Structure

Each lesson contains six to nine learning units. Each unit is designed for five to ten minutes of engaged work and follows this sequence:

1. A concrete learning objective.
2. Source-backed explanation in the selected language.
3. Professional English terminology.
4. A diagram, flow, decision table, or calculation when appropriate.
5. A manufacturing micro-example.
6. A common mistake, constraint, or trade-off.
7. A checkpoint with immediate explanatory feedback.
8. A learner activity with a specific deliverable.
9. A model solution and evaluation rubric hidden until requested.
10. Source references used by the unit.

Each module contains at least:

- four manufacturing micro-examples;
- two complete worked cases;
- two learner exercises with model solutions;
- one reusable professional artifact;
- one 30-second English interview response;
- one two-to-three-minute English interview response;
- distributed checkpoints;
- a final quiz explaining every answer, including incorrect alternatives.

## Practical Application Framework

The central interview capability is answering questions such as:

- "Can you give me a concrete example of how you applied this approach?"
- "How do you decide which processes to automate?"
- "What logic do you use to prioritize automation opportunities?"
- "How would you move from an idea to a controlled industrial MVP?"

Application answers use a consistent seven-part structure:

1. Context and operational problem.
2. Current process and baseline.
3. Automation selection logic.
4. Proposed MVP.
5. KPIs and guardrails.
6. Risks and human oversight.
7. Scaling decision.

Automation candidates are evaluated using a weighted decision matrix covering:

- business value;
- frequency and manual effort;
- process stability;
- data readiness;
- integration feasibility;
- risk and reversibility;
- regulatory and quality impact;
- required human judgment;
- adoption complexity;
- expected time to value.

The learner applies the matrix to at least five candidate processes, selects one, rejects or defers the others, and defends the decision in English.

## PMI-Relevant Case Portfolio

The case portfolio reflects the public characteristics of a large, regulated, globally integrated manufacturer undergoing business and operational transformation.

Required cases include:

- reducing unplanned downtime on a high-speed production or packaging line;
- computer vision for quality inspection with defined false-positive and false-negative consequences;
- traceability across incoming materials, semi-finished components, finished goods, and quality incidents;
- a RAG assistant for controlled SOPs, manuals, and maintenance documentation;
- AI-assisted deviation triage with meaningful human approval and no autonomous product release;
- supply-chain disruption detection and decision support;
- tool calling to create a maintenance work order with validation and authorization boundaries;
- scaling a proven pilot across plants through a global reference architecture and local configuration.

Required reusable artifacts include:

- KPI tree and value hypothesis;
- automation opportunity scorecard;
- sensor-to-decision architecture diagram;
- data-readiness assessment;
- RAG and agent boundary diagram;
- MVP experiment canvas;
- AI and OT risk register;
- rollout and scaling gate checklist.

## Bilingual Experience

Every learning unit, case, activity, solution, checkpoint, glossary definition, source annotation, and interview response is available in Italian and English.

Italian is the default instructional language. A persistent language selector switches the active unit without changing route, cursor, quiz state, or completion. The selected language is stored locally and applies across devices when practical without adding personal profile fields to the urgent release.

English copy must use professional, natural business and technical language. It must not read like a literal translation. Key terms remain visible in English in both modes so the learner can build interview vocabulary while studying in Italian.

## Source Policy

Content uses the following source hierarchy:

1. Standards bodies and official specifications.
2. Regulators and government institutions.
3. Original peer-reviewed or foundational research papers.
4. Official PMI reports, operations pages, and public disclosures for company context.
5. Reputable educational material from universities, recognized professional bodies, established technical educators, and well-regarded technical books or courses.
6. Official vendor documentation for product-specific behavior and implementation guidance.

Clarity and learning effectiveness are explicit selection criteria. A high-quality educational source may be used to introduce an analogy, visual model, worked example, or accessible explanation when a standard or research paper is too compressed for teaching. Its factual claims are checked against primary material before inclusion. Educational sources do not replace primary sources for legal obligations, safety requirements, protocol behavior, standard definitions, or claims about PMI.

Generic blogs, anonymous summaries, SEO articles, copied content, and unsupported vendor marketing claims are not used as foundations for lessons. A secondary source is included only when its authorship, institutional context, teaching quality, and technical consistency can be evaluated.

Each difficult concept is taught through a progression designed for comprehension rather than citation density:

1. Plain-language intuition and analogy.
2. Precise technical definition.
3. Visual or step-by-step mechanism.
4. Worked manufacturing example.
5. Boundary conditions and common misconceptions.
6. Application exercise and interview transfer.

The final learning objective takes precedence over maximizing the number of references. Sources support the explanation; they do not substitute for a complete explanation written inside the course.

The initial authoritative catalog includes:

- ISA-95 / IEC 62264 material from the International Society of Automation;
- NIST SP 800-82 Rev. 3 for OT security;
- OPC UA specifications from the OPC Foundation;
- NIST AI Risk Management Framework and Generative AI Profile;
- Regulation (EU) 2024/1689 from EUR-Lex;
- European Commission Industry 5.0 publications;
- the original Transformer paper, "Attention Is All You Need";
- the original Retrieval-Augmented Generation paper;
- the official Model Context Protocol specification;
- official PMI annual, value, sustainability, operations, quality, and public company materials.

Each source record contains a stable identifier, title, publishing organization, canonical URL, source type, publication date when available, and access date. Each unit references the identifiers it actually uses. The course paraphrases sources and does not reproduce protected material at length.

## Content Model

The current monolithic content file is split into focused modules:

- one file per lesson;
- a shared source catalog;
- shared content constructors and validation helpers;
- a small index exporting the assembled curriculum.

The content model introduces these conceptual interfaces:

- `LocalizedText`: Italian and English strings or structured paragraphs.
- `SourceReference`: source metadata and canonical URL.
- `LearningUnit`: objectives, explanation, terminology, examples, activities, checkpoints, sources, and time budget.
- `WorkedCase`: context, assumptions, analysis steps, decision, outcome, trade-offs, and follow-up questions.
- `LearningActivity`: prompt, expected artifact, duration, hints, model solution, and rubric.
- `Checkpoint`: question, options, correct answer, and explanation for every option.
- `ProfessionalAnswer`: interview prompt, short answer, extended answer, and likely follow-up questions.

Lesson identifiers and slugs remain stable. Unit identifiers are stable within each lesson and become the unit-level progress cursor.

## User Experience

Only one learning unit is displayed at a time. This prevents a 34,000-word curriculum from becoming six unmanageable pages.

The lesson screen includes:

- module title and total progress;
- persistent Italian / English selector;
- unit title, objective, and honest time estimate;
- structured theory and visual explanation;
- worked example and learner activity;
- revealable hints, model solution, and rubric;
- checkpoint feedback;
- source list;
- Previous and Continue controls;
- a compact unit index accessible on mobile and desktop.

Continue is never delayed by a timer. Completion reflects learner actions and checkpoint results, not passive page duration.

## Progress Migration and Synchronization

Existing lesson IDs, completion states, best scores, and review queues are preserved.

Progress gains a content-version marker. Legacy progress without this marker is treated as version 1. For incomplete lessons, the old block cursor is mapped proportionally to the new unit count using the legacy block count for that lesson. Completed lessons remain completed. Best scores never regress.

Supabase receives a migration adding the content-version field with a safe default. Existing Row Level Security policies remain unchanged in meaning. Synchronization continues to merge completion monotonically, preserve the highest score, and use the most recent cursor update.

## Validation and Testing

Build validation fails when any of these conditions is true:

- total planned duration is not 420 minutes;
- Italian theory contains fewer than 34,000 words;
- a localized field is missing either Italian or English;
- a lesson has fewer than six or more than nine units;
- a lesson has fewer than four micro-examples;
- a lesson has fewer than two worked cases;
- a lesson has fewer than two learner activities with solutions and rubrics;
- a lesson lacks a reusable professional artifact;
- a lesson lacks short and extended English interview responses;
- a unit has no checkpoint or no source reference;
- a checkpoint does not explain every option;
- a referenced source lacks title, organization, canonical URL, or source type.

Automated verification includes:

- unit tests for duration and density rules;
- unit tests for bilingual completeness;
- unit tests for progress migration and non-regression;
- unit tests for source integrity and reference resolution;
- end-to-end tests for unit navigation, solution reveal, checkpoints, and lesson completion;
- end-to-end tests for language switching without cursor loss;
- end-to-end tests for deep links and mobile overflow;
- existing authentication and synchronization tests;
- PWA build and service-worker cache validation.

External URL availability is checked editorially and may be monitored separately. It does not make every deploy dependent on third-party uptime.

## Failure Handling

Missing translations, invalid references, malformed activities, inconsistent duration totals, and progress migration errors are build failures, not runtime fallbacks.

If a source URL later becomes unavailable, the lesson remains usable offline and displays the stored citation metadata. If synchronization is temporarily unavailable, progress remains local and is merged when connectivity returns, following the existing non-regression rules.

## Acceptance Criteria

The release is accepted when:

- the six modules total 420 planned minutes;
- Italian theory reaches at least 34,000 words and English provides equivalent depth;
- practical work represents 55 percent of the planned duration;
- every module satisfies the minimum examples, cases, activities, artifacts, checkpoints, and sources;
- the learner can answer the priority application questions in English using concrete manufacturing examples;
- the automation prioritization exercise produces and defends a scored decision;
- all existing progress, authentication, RLS, and cross-device synchronization behavior remains intact;
- all automated tests, editorial validation, mobile browser checks, and GitHub Pages deployment succeed.

## Initial Source Links

- ISA-95: https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard
- NIST SP 800-82 Rev. 3: https://csrc.nist.gov/pubs/sp/800/82/r3/final
- OPC UA Overview: https://reference.opcfoundation.org/specs/OPC-10000-1/4
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- EU AI Act: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689
- European Commission Industry 5.0: https://research-and-innovation.ec.europa.eu/research-area/industrial-research-and-innovation/industry-50_en
- Transformer paper: https://arxiv.org/abs/1706.03762
- Retrieval-Augmented Generation paper: https://arxiv.org/abs/2005.11401
- NIST Generative AI Profile: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- MCP architecture: https://modelcontextprotocol.io/specification/2025-06-18/architecture
- PMI Operations: https://www.pmi.com/careers/areas-of-work/operations
- PMI Product Reliability: https://www.pmi.com/sustainability/integrated-report-2020/innovating-for-better-products/product-reliability
- PMI 2025 Annual Report: https://www.pmi.com/content/dam/pmicom/global/docs/investor_relation/pmi-2025-annual-report.pdf
- PMI 2025 Value Report: https://www.pmi.com/content/dam/pmicom/global/docs/pmi-sustainability/pmi-value-report-2025.pdf

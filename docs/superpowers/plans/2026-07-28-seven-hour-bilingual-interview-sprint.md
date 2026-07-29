# Seven-Hour Bilingual Interview Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the short six-module overview with a source-backed, PMI-relevant, fully bilingual interview sprint containing 420 minutes of substantive theory, cases, exercises, and English practice.

**Architecture:** Split curriculum data into a source catalog, shared constructors and six focused lesson modules while preserving the existing `content.js` import boundary. Render one stable learning unit at a time, store language and content-version state separately from lesson completion, and migrate legacy cursors proportionally without regressing scores or completion. Enforce editorial depth through deterministic build validation and exercise all critical flows in mobile end-to-end tests.

**Tech Stack:** Dependency-free JavaScript ES modules, HTML, CSS, Node.js test runner, Playwright, Supabase REST/Auth, PostgreSQL RLS, service worker, GitHub Pages.

## Global Constraints

- Total planned duration must equal exactly 420 minutes.
- Italian theory must contain at least 34,000 words; English must contain every localized field and at least 85 percent of the corresponding Italian word count per lesson.
- Practical cases and activities must account for 231 of 420 minutes.
- Each lesson must contain six to nine stable learning units, at least four micro-examples, two worked cases, two solved activities with rubrics, one professional artifact, distributed checkpoints, and short and extended English interview answers.
- Lesson IDs and slugs remain unchanged.
- Existing completion and best scores never regress.
- PMI cases are labeled hypothetical and use only public company context.
- Primary sources establish standards, legal, security, protocol, and PMI claims; vetted educational sources may improve explanations after factual cross-checking.
- UI remains usable from 360 px, supports offline reading, and never forces waiting through timers.
- Do not add a chatbot, live LLM feedback, coding labs, speech scoring, or confidential PMI claims.
- Never include a Supabase secret key in client code or repository history.

---

## File Structure

### New files

- `public/content/schema.js`: localized constructors, word counting, duration helpers, content version.
- `public/content/sources.js`: normalized source catalog and lookup.
- `public/content/module-1-transformation.js`: Module 1 curriculum.
- `public/content/module-2-architecture.js`: Module 2 curriculum.
- `public/content/module-3-data-ai.js`: Module 3 curriculum.
- `public/content/module-4-llm-agents.js`: Module 4 curriculum.
- `public/content/module-5-mvp-governance.js`: Module 5 curriculum.
- `public/content/module-6-interview-lab.js`: Module 6 curriculum.
- `public/content/index.js`: assembled lessons, glossary, interview questions, and source exports.
- `tests/content-schema.test.mjs`: schema and validation behavior.
- `tests/progress-migration.test.mjs`: versioned cursor migration and merge behavior.
- `tests/curriculum-depth.test.mjs`: duration, word, case, activity, localization, and source gates.
- `supabase/migrations/002_content_version.sql`: persisted progress content version.

### Modified files

- `public/content.js`: compatibility re-export from `public/content/index.js`.
- `public/types.js`: documented bilingual unit, case, activity, source, and progress interfaces.
- `public/learning.js`: curriculum validation, migration, content-version-aware merge.
- `public/sync.js`: read and write `content_version`.
- `public/app.js`: unit navigator, language switcher, activities, checkpoints, sources, completion.
- `public/styles.css`: mobile unit layout and accessible controls.
- `public/index.html`: language metadata and versioned application assets.
- `public/sw.js`: cache all curriculum modules with a new cache version.
- `tools/validate.mjs`: run strict curriculum validation.
- `tests/learning.test.mjs`: preserve legacy behavior and add version-aware assertions.
- `tests/ui.test.mjs`: unit routing and language-state helpers.
- `tests/e2e.mjs`: new guided-learning and language flows.
- `package.json`: lint every new JavaScript module.
- `README.md`: document curriculum depth, source policy, and local checks.

---

### Task 1: Bilingual Content Schema and Strict Validator

**Files:**
- Create: `public/content/schema.js`
- Create: `tests/content-schema.test.mjs`
- Modify: `public/types.js`
- Modify: `public/learning.js`

**Interfaces:**
- Produces: `CONTENT_VERSION`, `localized(it, en)`, `countWords(value)`, `lessonPlannedMinutes(lesson)`, `validateCurriculum(lessons, sources)`.
- Consumes: no curriculum-specific implementation.

- [ ] **Step 1: Write failing schema tests**

```js
test('localized content requires both languages', () => {
  assert.throws(() => localized('Spiegazione', ''), /English/)
})

test('planned minutes add theory, cases and practice', () => {
  assert.equal(lessonPlannedMinutes({ timeBudget: { theory: 25, cases: 15, practice: 10 } }), 50)
})

test('validator reports missing cases, sources and option explanations', () => {
  const errors = validateCurriculum([invalidLessonFixture], {})
  assert.ok(errors.some((error) => error.includes('worked cases')))
  assert.ok(errors.some((error) => error.includes('source')))
  assert.ok(errors.some((error) => error.includes('option explanation')))
})
```

- [ ] **Step 2: Run the schema tests and verify RED**

Run: `node --test tests/content-schema.test.mjs`

Expected: failure because `public/content/schema.js` and its exports do not exist.

- [ ] **Step 3: Implement schema helpers and documented interfaces**

```js
export const CONTENT_VERSION = 2

export function localized(it, en) {
  if (!it?.trim()) throw new Error('Italian localization is required')
  if (!en?.trim()) throw new Error('English localization is required')
  return { it, en }
}

export function countWords(value) {
  const text = Array.isArray(value) ? value.join(' ') : String(value || '')
  return text.trim() ? text.trim().split(/\s+/u).length : 0
}

export function lessonPlannedMinutes(lesson) {
  return Object.values(lesson.timeBudget).reduce((sum, minutes) => sum + minutes, 0)
}
```

Define `validateCurriculum` with deterministic errors for every global constraint. Keep the existing `validateLessons` export as a compatibility wrapper until Task 10.

- [ ] **Step 4: Run schema and existing unit tests**

Run: `node --test tests/content-schema.test.mjs tests/learning.test.mjs`

Expected: all tests pass with no warnings.

- [ ] **Step 5: Commit Task 1**

```bash
git add public/content/schema.js public/types.js public/learning.js tests/content-schema.test.mjs
git commit -m "feat:add-bilingual-curriculum-schema"
```

---

### Task 2: Versioned Progress Migration and Supabase Schema

**Files:**
- Create: `tests/progress-migration.test.mjs`
- Create: `supabase/migrations/002_content_version.sql`
- Modify: `public/learning.js`
- Modify: `public/sync.js`
- Modify: `public/types.js`

**Interfaces:**
- Consumes: `CONTENT_VERSION` from Task 1.
- Produces: `LEGACY_BLOCK_COUNTS`, `migrateLessonProgress(progress, lesson, legacyBlockCount)`, progress field `contentVersion`, REST field `content_version`.

- [ ] **Step 1: Write failing migration tests**

```js
test('legacy incomplete cursor maps proportionally to new units', () => {
  const legacy = { lessonId: 'llm-agents', status: 'in_progress', cursor: 2, bestScore: 40, reviewQuestionIds: [], updatedAt: '2026-07-28T10:00:00.000Z' }
  const migrated = migrateLessonProgress(legacy, { units: Array(9).fill({}) }, 5)
  assert.equal(migrated.cursor, 4)
  assert.equal(migrated.contentVersion, CONTENT_VERSION)
})

test('completed legacy progress stays completed with its best score', () => {
  const migrated = migrateLessonProgress({ ...legacy, status: 'completed', bestScore: 90 }, { units: Array(9).fill({}) }, 5)
  assert.equal(migrated.status, 'completed')
  assert.equal(migrated.bestScore, 90)
})
```

- [ ] **Step 2: Run the migration test and verify RED**

Run: `node --test tests/progress-migration.test.mjs`

Expected: failure because `migrateLessonProgress` is missing.

- [ ] **Step 3: Implement proportional migration and version-aware merge**

Treat cursors as zero-based indexes. Map endpoint-to-endpoint with `Math.round((legacyCursor / (legacyBlockCount - 1)) * (newUnitCount - 1))`, clamp to valid bounds, and preserve completion and score. A completed legacy sentinel cursor equal to `legacyBlockCount` clamps to the final new unit. When progress versions differ, migrate before timestamp-based cursor selection.

Use the exact legacy map from the shipped curriculum:

```js
export const LEGACY_BLOCK_COUNTS = {
  'digital-transformation': 4,
  'ot-it-ai-cloud': 4,
  'data-ai-use-cases': 4,
  'llm-agents': 5,
  'mvp-governance': 5,
  'interview-lab': 5
}
```

- [ ] **Step 4: Add the idempotent database migration**

```sql
alter table public.lesson_progress
add column if not exists content_version integer not null default 1
check (content_version >= 1);
```

Update REST serialization and deserialization to map `content_version` and `contentVersion`.

- [ ] **Step 5: Run migration, sync, and learning tests**

Run: `node --test tests/progress-migration.test.mjs tests/sync.test.mjs tests/learning.test.mjs`

Expected: all tests pass.

- [ ] **Step 6: Apply SQL through Supabase and verify the column**

Run the migration in the Supabase SQL editor, then execute:

```sql
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'lesson_progress'
  and column_name = 'content_version';
```

Expected: one integer column with default `1`.

- [ ] **Step 7: Commit Task 2**

```bash
git add public/learning.js public/sync.js public/types.js tests/progress-migration.test.mjs supabase/migrations/002_content_version.sql
git commit -m "feat:migrate-versioned-learning-progress"
```

---

### Task 3: Authoritative and Educational Source Catalog

**Files:**
- Create: `public/content/sources.js`
- Modify: `tests/content-schema.test.mjs`

**Interfaces:**
- Consumes: source shape documented in Task 1.
- Produces: `sources`, `sourceById(id)`, stable IDs referenced by every module.

- [ ] **Step 1: Write failing source integrity tests**

```js
test('source catalog contains unique complete HTTPS records', () => {
  const ids = Object.keys(sources)
  assert.equal(new Set(ids).size, ids.length)
  for (const source of Object.values(sources)) {
    assert.ok(source.title && source.organization && source.type)
    assert.match(source.url, /^https:\/\//)
    assert.match(source.accessedAt, /^2026-07-28$/)
  }
})
```

- [ ] **Step 2: Run the source test and verify RED**

Run: `node --test tests/content-schema.test.mjs`

Expected: failure because the source catalog is missing.

- [ ] **Step 3: Implement the initial catalog**

Include stable records for ISA-95, NIST SP 800-82 Rev. 3, OPC UA Part 1, NIST AI RMF 1.0, NIST AI 600-1, EU AI Act, European Commission Industry 5.0, Transformer paper, RAG paper, official MCP specification, PMI Operations, PMI Product Reliability, PMI Annual Report 2025, and PMI Value Report 2025.

Add vetted teaching sources only when they materially improve a specific explanation. Record `type: 'educational'` and a `verifiedAgainst` array of primary source IDs.

- [ ] **Step 4: Run source tests**

Run: `node --test tests/content-schema.test.mjs`

Expected: pass.

- [ ] **Step 5: Commit Task 3**

```bash
git add public/content/sources.js tests/content-schema.test.mjs
git commit -m "feat:add-vetted-learning-source-catalog"
```

---

### Task 4: Module 1, Digital Transformation and Industry 4.0

**Files:**
- Create: `public/content/module-1-transformation.js`
- Create: `tests/curriculum-depth.test.mjs`

**Interfaces:**
- Consumes: schema constructors and source IDs.
- Produces: `digitalTransformationLesson` with ID `digital-transformation`, six units, 50 minutes, and at least 4,500 Italian theory words.

- [ ] **Step 1: Write the failing Module 1 depth test**

```js
test('Module 1 has the approved time, depth and practical portfolio', () => {
  assert.equal(digitalTransformationLesson.durationMinutes, 50)
  assert.deepEqual(digitalTransformationLesson.timeBudget, { theory: 25, cases: 15, practice: 10 })
  assert.equal(digitalTransformationLesson.units.length, 6)
  assert.ok(theoryWords(digitalTransformationLesson, 'it') >= 4500)
  assert.ok(theoryWords(digitalTransformationLesson, 'en') >= 3825)
  assert.ok(countWorkedCases(digitalTransformationLesson) >= 2)
})
```

- [ ] **Step 2: Run the Module 1 test and verify RED**

Run: `node --test tests/curriculum-depth.test.mjs`

Expected: failure because Module 1 does not exist in the new format.

- [ ] **Step 3: Author six bilingual units**

Use these exact unit boundaries:

1. Digitization, digitalization, and transformation.
2. Industry 4.0 and Industry 5.0 in a regulated manufacturer.
3. From operational loss to KPI tree, baseline, target, and guardrail.
4. Gemba-based process discovery and stakeholder mapping.
5. Automation opportunity scoring and portfolio prioritization.
6. Worked PMI-style case: selecting a downtime-reduction opportunity.

Include a fully worked automation matrix comparing maintenance work-order creation, quality deviation triage, production reporting, SOP search, and autonomous product-release decisions. The recommended candidate must be defended and the autonomous release candidate explicitly rejected because of risk and human-judgment requirements.

- [ ] **Step 4: Add interview transfer**

Provide natural English answers to:

- "How do you decide which processes to automate?"
- "Can you give me an example of applying digital transformation in manufacturing?"
- "How do you distinguish a technology project from transformation?"

- [ ] **Step 5: Run Module 1 and schema tests**

Run: `node --test tests/curriculum-depth.test.mjs tests/content-schema.test.mjs`

Expected: pass for Module 1 without weakening any threshold.

- [ ] **Step 6: Commit Task 4**

```bash
git add public/content/module-1-transformation.js tests/curriculum-depth.test.mjs
git commit -m "feat:expand-transformation-module"
```

---

### Task 5: Module 2, OT / IT / AI / Cloud Architecture

**Files:**
- Create: `public/content/module-2-architecture.js`
- Modify: `tests/curriculum-depth.test.mjs`

**Interfaces:**
- Produces: `architectureLesson` with ID `ot-it-ai-cloud`, eight units, 75 minutes, and at least 6,840 Italian theory words.

- [ ] **Step 1: Add a failing Module 2 test**

Assert `{ theory: 38, cases: 22, practice: 15 }`, eight units, at least 6,840 Italian words, at least 5,814 English words, two cases, two solved activities, and references to ISA-95, OPC UA, and NIST SP 800-82.

- [ ] **Step 2: Run the targeted test and verify RED**

Run: `node --test --test-name-pattern="Module 2" tests/curriculum-depth.test.mjs`

- [ ] **Step 3: Author eight bilingual units**

1. Physical process, sensors, actuators, signals, and sampling.
2. PLC, DCS, HMI, SCADA, alarms, and control-loop constraints.
3. Historian, timestamps, event context, and time-series quality.
4. MES/MOM responsibilities and production genealogy.
5. ERP, planning, logistics, and the MES/ERP boundary.
6. ISA-95, Purdue as a communication model, zones, conduits, and DMZ.
7. Edge, cloud, data platform, APIs, event streaming, and AI serving.
8. Worked case: sensor-to-human-decision architecture with failure modes.

The professional artifact is a labeled architecture from sensor to decision, including data owner, latency, protocol, security boundary, fallback, and human action at each hop.

- [ ] **Step 4: Add practical questions and English responses**

Train OT vs IT, MES vs SCADA, edge vs cloud, and why an AI model must not directly close a safety-critical control loop without engineered controls.

- [ ] **Step 5: Run targeted and full curriculum tests**

Run: `node --test tests/curriculum-depth.test.mjs`

- [ ] **Step 6: Commit Task 5**

```bash
git add public/content/module-2-architecture.js tests/curriculum-depth.test.mjs
git commit -m "feat:expand-industrial-architecture-module"
```

---

### Task 6: Module 3, Data, Analytics and AI Use Cases

**Files:**
- Create: `public/content/module-3-data-ai.js`
- Modify: `tests/curriculum-depth.test.mjs`

**Interfaces:**
- Produces: `dataAiLesson` with ID `data-ai-use-cases`, seven units, 65 minutes, and at least 5,580 Italian theory words.

- [ ] **Step 1: Add a failing Module 3 test**

Assert `{ theory: 31, cases: 20, practice: 14 }`, seven units, at least 5,580 Italian words, at least 4,743 English words, and complete predictive-maintenance and quality cases.

- [ ] **Step 2: Run the targeted test and verify RED**

Run: `node --test --test-name-pattern="Module 3" tests/curriculum-depth.test.mjs`

- [ ] **Step 3: Author seven bilingual units**

1. Decision ladder: rules, descriptive analytics, predictive ML, optimization, and GenAI.
2. Data meaning: quality dimensions, context, lineage, ownership, and labels.
3. Metrics: precision, recall, false alarms, missed defects, drift, and operational KPIs.
4. Predictive-maintenance case from failure mode to maintenance decision.
5. Computer-vision quality case with asymmetric error costs and human review.
6. Supply-chain risk and forecasting case with uncertainty and scenario planning.
7. Data-readiness scorecard and use-case portfolio decision.

The artifact is a scored data-readiness and use-case-selection sheet. Include numeric worked examples for downtime cost, precision/recall confusion matrix, and expected value under false-positive and false-negative costs.

- [ ] **Step 4: Add English application answers**

Cover choosing the simplest adequate method, rejecting GenAI when rules or classical analytics are more suitable, and defining readiness before promising predictive maintenance.

- [ ] **Step 5: Run targeted and full curriculum tests**

Run: `node --test tests/curriculum-depth.test.mjs`

- [ ] **Step 6: Commit Task 6**

```bash
git add public/content/module-3-data-ai.js tests/curriculum-depth.test.mjs
git commit -m "feat:expand-data-and-ai-use-cases-module"
```

---

### Task 7: Module 4, LLMs, RAG, Agents and MCP

**Files:**
- Create: `public/content/module-4-llm-agents.js`
- Modify: `tests/curriculum-depth.test.mjs`

**Interfaces:**
- Produces: `llmAgentsLesson` with ID `llm-agents`, nine units, 80 minutes, and at least 7,200 Italian theory words.

- [ ] **Step 1: Add a failing Module 4 test**

Assert `{ theory: 40, cases: 22, practice: 18 }`, nine units, at least 7,200 Italian words, at least 6,120 English words, and references to the Transformer paper, RAG paper, NIST AI 600-1, and MCP specification.

- [ ] **Step 2: Run the targeted test and verify RED**

Run: `node --test --test-name-pattern="Module 4" tests/curriculum-depth.test.mjs`

- [ ] **Step 3: Author nine bilingual units**

1. Tokens, context, probability, and next-token generation.
2. Transformer intuition: embeddings, attention, layers, and context representation.
3. Training, instruction tuning, inference, temperature, and cost/latency trade-offs.
4. Limitations and evaluation: hallucination, grounding, robustness, and task-specific tests.
5. Embeddings, retrieval, chunking, metadata, reranking, and access control.
6. End-to-end RAG for controlled SOPs with citations and document versions.
7. Tool calling, validation, authorization, idempotency, and audit logs.
8. Agent loop versus deterministic workflow; MCP host, client, server, resources, tools, and prompts.
9. Multi-model orchestration with role boundaries, handoffs, evaluation, and stop conditions.

Cases must include a controlled-document RAG assistant and a maintenance-work-order tool call. Explain why retrieval quality, permissions, source version, and refusal behavior matter in a regulated workflow.

- [ ] **Step 4: Add multi-model decision exercise**

The learner chooses between one model, model routing, deterministic orchestration, and multiple agents for four scenarios. The model solution must reject multi-agent complexity where boundaries and measurable benefit are absent.

- [ ] **Step 5: Run targeted and full curriculum tests**

Run: `node --test tests/curriculum-depth.test.mjs`

- [ ] **Step 6: Commit Task 7**

```bash
git add public/content/module-4-llm-agents.js tests/curriculum-depth.test.mjs
git commit -m "feat:expand-llm-rag-and-agent-module"
```

---

### Task 8: Module 5, MVP, Security, Governance and Scaling

**Files:**
- Create: `public/content/module-5-mvp-governance.js`
- Modify: `tests/curriculum-depth.test.mjs`

**Interfaces:**
- Produces: `mvpGovernanceLesson` with ID `mvp-governance`, eight units, 75 minutes, and at least 6,480 Italian theory words.

- [ ] **Step 1: Add a failing Module 5 test**

Assert `{ theory: 36, cases: 22, practice: 17 }`, eight units, at least 6,480 Italian words, at least 5,508 English words, and references to NIST SP 800-82, NIST AI RMF, NIST AI 600-1, and the EU AI Act.

- [ ] **Step 2: Run the targeted test and verify RED**

Run: `node --test --test-name-pattern="Module 5" tests/curriculum-depth.test.mjs`

- [ ] **Step 3: Author eight bilingual units**

1. Discovery, process observation, baseline, hypothesis, and riskiest assumption.
2. MVP versus prototype versus pilot and the smallest end-to-end test.
3. Integration, shadow mode, fallback, rollback, and operational ownership.
4. OT cybersecurity, segmentation, remote access, availability, and safety constraints.
5. GenAI threats: prompt injection, data leakage, tool misuse, and excessive agency.
6. Governance using NIST Govern, Map, Measure, Manage and relevant EU AI obligations.
7. Monitoring, drift, incident response, change control, and human oversight.
8. Scaling gates, global platform versus local configuration, support model, and adoption.

Cases must include a shadow-mode quality assistant and a plant-to-multi-plant rollout decision. Artifacts are an MVP experiment canvas, risk register, RACI, and scaling gate checklist.

- [ ] **Step 4: Add English application answers**

Cover designing a controlled MVP, securing OT/AI integration, defining meaningful human oversight, and deciding when not to scale.

- [ ] **Step 5: Run targeted and full curriculum tests**

Run: `node --test tests/curriculum-depth.test.mjs`

- [ ] **Step 6: Commit Task 8**

```bash
git add public/content/module-5-mvp-governance.js tests/curriculum-depth.test.mjs
git commit -m "feat:expand-mvp-governance-and-scaling-module"
```

---

### Task 9: Module 6, Technical Interview Lab

**Files:**
- Create: `public/content/module-6-interview-lab.js`
- Modify: `tests/curriculum-depth.test.mjs`

**Interfaces:**
- Produces: `interviewLabLesson` with ID `interview-lab`, six units, 75 minutes, and at least 3,420 Italian theory words.

- [ ] **Step 1: Add a failing Module 6 test**

Assert `{ theory: 19, cases: 25, practice: 31 }`, six units, at least 3,420 Italian words, at least 2,907 English words, a 20-minute simulation, and answers for every priority interview topic.

- [ ] **Step 2: Run the targeted test and verify RED**

Run: `node --test --test-name-pattern="Module 6" tests/curriculum-depth.test.mjs`

- [ ] **Step 3: Author six bilingual units**

1. Layered answer structures: headline, reasoning, example, trade-off, result.
2. Automation prioritization case and weighted decision defense.
3. Whiteboard case: sensor to edge to platform to AI to human decision.
4. Stakeholder objections from Operations, Quality, IT, OT Security, and Finance.
5. English answer bank with follow-up questions and recovery phrases.
6. Complete 20-minute mock interview with scoring rubric and rapid review sheet.

Include model responses for OT vs IT, MES vs SCADA, RAG, agent, MCP, process automation selection, MVP design, KPI definition, risk, human oversight, and scaling.

- [ ] **Step 4: Add rubric-driven self-evaluation**

Score each answer from 0 to 2 for structure, technical accuracy, business relevance, concrete example, trade-offs, and English clarity. Passing readiness is at least 10 of 12 per core answer and completion of the 20-minute simulation without notes.

- [ ] **Step 5: Run the complete depth gate**

Run: `node --test tests/curriculum-depth.test.mjs`

Expected: all six modules total exactly 420 minutes, at least 34,020 Italian theory words, bilingual thresholds pass, and every practical minimum passes.

- [ ] **Step 6: Commit Task 9**

```bash
git add public/content/module-6-interview-lab.js tests/curriculum-depth.test.mjs
git commit -m "feat:expand-technical-interview-lab"
```

---

### Task 10: Assemble Curriculum and Preserve Compatibility

**Files:**
- Create: `public/content/index.js`
- Modify: `public/content.js`
- Modify: `tools/validate.mjs`
- Modify: `package.json`
- Modify: `tests/learning.test.mjs`

**Interfaces:**
- Consumes: all six lesson exports and source catalog.
- Produces: existing exports `lessons`, `allGlossary`, `interviewQuestions`, plus `sources`, `CONTENT_VERSION`, and the temporary `withLegacyProjection(lesson)` adapter used until Task 11.

- [ ] **Step 1: Write a failing assembled-curriculum test**

```js
test('assembled curriculum preserves stable lesson IDs and exact order', () => {
  assert.deepEqual(lessons.map(({ id }) => id), [
    'digital-transformation', 'ot-it-ai-cloud', 'data-ai-use-cases',
    'llm-agents', 'mvp-governance', 'interview-lab'
  ])
  assert.equal(lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0), 420)
})
```

- [ ] **Step 2: Run tests and verify RED against the legacy export**

Run: `node --test tests/learning.test.mjs tests/curriculum-depth.test.mjs`

- [ ] **Step 3: Implement the index and compatibility re-export**

```js
// public/content.js
export * from './content/index.js'
```

Update `tools/validate.mjs` to call `validateCurriculum(lessons, sources)` and print theory words, practical minutes, source count, and localization status. Update `package.json` lint to enumerate `public/content/*.js` using explicit `node --check` commands compatible with Windows and CI.

Keep the application functional before the unit navigator lands by projecting each unit into the old Italian block shape:

```js
export function withLegacyProjection(lesson) {
  return {
    ...lesson,
    blocks: lesson.units.map((unit) => ({
      id: unit.id,
      eyebrow: unit.eyebrow.it,
      title: unit.title.it,
      minutes: unit.estimatedMinutes,
      body: unit.theory.map((paragraph) => paragraph.it),
      keyPoints: unit.keyPoints.map((point) => point.it),
      diagram: unit.diagram?.nodes.map((node) => node.label.it),
      activity: unit.activities[0] ? {
        prompt: unit.activities[0].prompt.it,
        hint: unit.activities[0].hints[0].it
      } : undefined
    }))
  }
}
```

Export projected lessons in Task 10. Remove the projection only after Task 11 renders `units` directly and its E2E checks pass.

- [ ] **Step 4: Run build, lint, and all unit tests**

Run: `npm run lint && npm test && npm run build`

Expected: clean output and the build summary reports 420 minutes and at least 34,000 Italian theory words.

- [ ] **Step 5: Commit Task 10**

```bash
git add public/content.js public/content/index.js tools/validate.mjs package.json tests/learning.test.mjs
git commit -m "feat:assemble-expanded-bilingual-curriculum"
```

---

### Task 11: Unit Navigator, Language Switcher and Practical Interactions

**Files:**
- Modify: `public/app.js`
- Modify: `public/ui.js`
- Modify: `public/styles.css`
- Modify: `public/index.html`
- Modify: `tests/ui.test.mjs`

**Interfaces:**
- Consumes: lesson `units`, localized content, activities, checkpoints, sources, and versioned progress.
- Produces: `selectLocale(localizedValue, locale)`, `unitPath(slug, unitId)`, `getUnitState(lesson, unitId, progress)`, UI state key `ai-sprint-locale-v1`.

- [ ] **Step 1: Write failing UI helper tests**

```js
test('language selection returns the requested localized value', () => {
  assert.equal(selectLocale({ it: 'Esempio', en: 'Example' }, 'en'), 'Example')
})

test('unit state resolves a stable deep link and progress position', () => {
  const state = getUnitState(lessonFixture, 'unit-2', { cursor: 1 })
  assert.equal(state.index, 1)
  assert.equal(state.previous.id, 'unit-1')
  assert.equal(state.next.id, 'unit-3')
})
```

- [ ] **Step 2: Run UI tests and verify RED**

Run: `node --test tests/ui.test.mjs`

- [ ] **Step 3: Implement pure localization and unit-state helpers**

Keep helpers DOM-free. Support `/lesson/:slug?unit=:unitId` while retaining old `/lesson/:slug` links as the first incomplete unit.

- [ ] **Step 4: Replace the long lesson renderer**

Render one unit with these stable sections and data hooks:

```html
<header data-unit-header></header>
<nav data-unit-index aria-label="Unità della lezione"></nav>
<article data-unit-content></article>
<section data-worked-example></section>
<section data-learning-activity></section>
<section data-unit-checkpoint></section>
<footer data-unit-sources></footer>
<nav data-unit-controls></nav>
```

Add reveal buttons for hint, model solution, and rubric. A unit becomes complete after its checkpoint is answered and its activity is self-marked complete. Do not introduce elapsed-time gates.

- [ ] **Step 5: Add persistent bilingual switching**

Switching language re-renders the current unit and preserves query string, cursor, revealed-state flags, and checkpoint selection. Use buttons with `aria-pressed`, visible focus styles, and labels `Italiano` and `English`.

- [ ] **Step 6: Implement responsive styling**

At 360 px, use one content column, sticky compact controls, 44 px minimum tap targets, no horizontal overflow, and readable 16 px minimum body text. At desktop widths, show the unit index beside the content without widening text beyond approximately 72 characters.

- [ ] **Step 7: Run UI tests and local browser checks**

Run: `node --test tests/ui.test.mjs && npm run lint`

Start: `npm run dev`

Check at 360x800, 390x844, 768x1024, and 1440x900.

- [ ] **Step 8: Commit Task 11**

```bash
git add public/app.js public/ui.js public/styles.css public/index.html tests/ui.test.mjs
git commit -m "feat:add-guided-bilingual-unit-experience"
```

---

### Task 12: PWA Cache, End-to-End Regression and Production Deploy

**Files:**
- Modify: `public/sw.js`
- Modify: `public/index.html`
- Modify: `tests/e2e.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: all new curriculum assets and UI hooks.
- Produces: cache version `ai-sprint-v5` or next unused version and production-verified PWA.

- [ ] **Step 1: Extend E2E tests before changing cache behavior**

Add scenarios that:

1. open Module 1 at 390x844;
2. verify only one unit is visible;
3. reveal a worked solution;
4. answer a checkpoint and continue;
5. switch to English and retain the same unit;
6. reload a unit deep link;
7. confirm no horizontal overflow;
8. complete a quiz without regressing an existing score;
9. verify the login page still reports Supabase as ready.

- [ ] **Step 2: Run E2E and verify the new assertions fail before cache updates**

Run: `npm run test:e2e`

Expected: failure on missing versioned curriculum assets or new guided-learning expectations.

- [ ] **Step 3: Version every changed entry and cache all curriculum modules**

Update `index.html` entry URLs and `sw.js` asset list with one consistent release version. Include `content/index.js`, `content/schema.js`, `content/sources.js`, and all six lesson modules. Preserve network-first behavior and old-cache cleanup.

- [ ] **Step 4: Document the course and verification commands**

Update README with:

- public URL;
- 420-minute content model;
- bilingual controls;
- source policy;
- local run and test commands;
- Supabase migration order;
- release cache-version rule.

- [ ] **Step 5: Run the complete verification suite**

Run:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
git diff --check
git status --short
```

Expected: all checks pass, no warnings caused by project code, and only intended files are modified.

- [ ] **Step 6: Perform authenticated cross-device regression**

On PC, complete one unit and wait for `Sincronizzato`. On phone, refresh the same lesson and verify the new unit cursor. Switch language on one device and confirm learning progress remains unchanged on the other. Verify that another Supabase user cannot read the first user's rows through the REST API.

- [ ] **Step 7: Commit and push the release**

```bash
git add public tests tools package.json README.md supabase/migrations/002_content_version.sql
git commit -m "feat:release-seven-hour-bilingual-interview-sprint"
git push origin main
```

- [ ] **Step 8: Verify GitHub Pages production**

Confirm the Actions workflow succeeds, open `https://fabrizioborgomastro.github.io/ia-apprendimento/` in a fresh tab, verify the deployed asset version, complete the mobile guided-learning smoke test, inspect console output, and refresh a direct unit URL.

---

## Final Editorial Review Checklist

- [ ] Every theoretical claim is supported by a cited source or clearly framed as reasoning.
- [ ] Every PMI scenario is marked hypothetical.
- [ ] Italian explanations are clear before introducing jargon.
- [ ] English copy sounds natural when spoken aloud.
- [ ] Every worked example includes assumptions, calculation or reasoning, decision, trade-off, and outcome.
- [ ] Every activity has a concrete deliverable, solution, and rubric.
- [ ] Automation prioritization is applied, not merely described.
- [ ] The final 20-minute interview can be completed without notes.
- [ ] The rapid-review sheet covers OT vs IT, MES vs SCADA, sensor-to-decision, RAG, agents, MCP, MVP, risk, human oversight, and scaling.

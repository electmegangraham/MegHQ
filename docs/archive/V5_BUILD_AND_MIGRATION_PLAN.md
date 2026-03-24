# MeganCampaignHQ V5 Build And Migration Plan

## Status
Locked reconciliation-upgraded canonical build, migration, runtime, and implementation transition specification.

## Core Truth
We do not build until design is locked.
We do not migrate chaos.
We do not carry forward mixed-system contamination.
We do not turn recovery evidence into production architecture without canonical normalization.

MegHQ must be built clean from MegHQ truth.

---

## Purpose

This file defines:
- build preparation rules
- migration rules
- runtime assumptions
- local/dev execution assumptions
- environment constraints
- implementation transition rules
- validation checkpoints before implementation and launch

This is the canonical bridge between repo truth and real implementation.

---

## Build Principles

- V5 is the only canonical MegHQ truth
- no SkylerOS architecture import by assumption
- no partial systems presented as complete systems
- no hidden runtime assumptions
- no auth bypass
- no approval bypass
- no direct frontend shortcut around governed system contracts
- no implementation before canonical dependency order is satisfied
- no migration that preserves contradiction

---

## Build Preconditions

Before major implementation work begins, all of the following must be true:

- `docs/00_master` is the canonical truth layer
- truth-lock docs exist at repo root
- system boundary is explicit
- reconciliation has materially upgraded the core files
- object, execution, approval, desk, staff, and authority files are no longer scaffold-grade
- remaining unresolved canonical files are known and explicitly tracked
- recovery truth has been normalized where appropriate
- no important behavior remains only in chat

If these are not true, the system is not ready for build acceleration.

---

## Migration Scope Rules

### What May Be Carried Forward
Only the following may be migrated forward:
- valid structure
- valid object definitions
- valid control logic
- valid runtime facts
- valid UX behavior consistent with canonical doctrine
- valid implementation evidence already normalized into MegHQ terms

### What Must Be Rejected
The following must be rejected:
- foreign architecture imported because it seems similar
- split-truth copies
- vague recovery notes treated as final system design
- dashboard-first replacements for governed surfaces
- legacy contradictory logic
- incomplete approval logic
- hidden authority assumptions
- stale implementation artifacts that contradict canonical files

### Rule
Migration is selective normalization, not blind copying.

---

## Canonical-First Migration Rule

When evidence from recovery material or older artifacts contains useful truth:

1. inspect the evidence
2. identify the real missing truth
3. update the canonical file
4. preserve evidence in recon/recovery layer
5. do not leave critical truth only in evidence files

Canonical files must absorb truth.
Evidence files must justify truth.
Evidence files must not become the running system definition.

---

## Runtime Stack Truth

Recovered MegHQ implementation truth confirms the following runtime assumptions:

### Backend Runtime
- Fastify on Node + TypeScript
- API truth source was `apps/api/src/app.ts`

### Data/Auth Runtime
- Supabase Postgres project `megan-hq-prod`
- Supabase Auth JWT middleware

### Core Data Areas Previously Verified
- intake items
- signals
- actions
- entities
- relationships
- operators
- campaign memberships

### Runtime Constraints
- no SQLite
- no auth bypass
- no direct frontend DB access
- no route-shape drift without schema alignment
- no frontend behavior that assumes backend shortcuts outside governed contracts

---

## Local Development Model

### Known Local Runtime Assumptions
Recovered implementation truth established:

- API local address: `http://localhost:3000`
- frontend local address: `http://localhost:3001`
- expected API command: `pnpm --filter api dev`
- root-level generic startup commands were not the intended path
- workspace-filtered commands were the expected local execution pattern

### Development Rule
Local execution instructions are part of system truth.
They must not be reinvented casually by future AI or operators.

### Implication
Any future implementation guidance must respect:
- workspace structure
- filtered command usage
- Supabase-backed auth/data assumptions
- explicit local/frontend/backend separation

---

## Environment Rules

### Environment Principles
- environment variables are configuration, not undocumented system logic
- local/dev configuration must remain explicit
- frontend must call governed API boundary, not backend storage directly
- auth/session behavior must be tested in realistic browser conditions

### Required Environment Categories
- API base URL
- auth provider settings
- database connection/provider references
- environment mode
- CORS/origin allowlist where required

### Rule
Environment assumptions must be documented in canonical runtime-related files and must not live only in local memory or shell history.

---

## Build Order Dependency Rule

Implementation must follow the governed sequencing already defined in `V5_BUILD_SEQUENCE.md`.

### Correct Build Dependency
1. canonical object contracts
2. execution contracts
3. approval / artifact / desk contracts
4. authority / doctrine constraints
5. validation / query enforcement
6. Staff Mode surface
7. Megan's Desk surface
8. intelligence / learning layers
9. runtime/integration hardening
10. launch hardening

### Invalid Dependency Patterns
- building Desk behavior before approval/execution logic is solid
- building executive surfaces before object contracts are locked
- building automation that crosses authority boundaries
- building publication/release behavior before approval/versioning is explicit
- building on recovered assumptions that were never normalized canonically

---

## Migration Of Recovered Implementation Truth

Recovered implementation truth from `docs/recovery/IMPLEMENTATION_TRUTH_FROM_SKYLER17.md` may inform canonical build reality, but only in normalized form.

### Already Normalized Targets
Recovered truth has already been merged into:
- `V5_BUILD_AND_MIGRATION_PLAN.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`
- `V5_MEGANS_DESK_UX.md`
- `V5_TASK_INITIATIVE_EXECUTION.md`

### Rule
The recovery file remains evidence/staging.
It is not the primary truth layer.

---

## Data Migration Rules

### Canonical Mapping Rule
Any migrated data or object must map to canonical object contracts.

### Required Migration Checks
- object type is recognized
- owner is explicit
- state is valid
- authority class is appropriate
- linked objects are valid
- approval dependencies are preserved
- source trace exists
- no orphan relationship is created

### Invalid Data Handling
Invalid or mismatched migrated data must:
- be blocked
- be quarantined
- be archived
- or be explicitly transformed before admission

It must not be silently injected into V5.

---

## Implementation Phase Rules

### Phase A - Contracted Foundation
Build only the governed source layers:
- object model
- execution layer
- approval/artifact/desk governance
- authority/doctrine enforcement
- validation/query constraints

### Phase B - Operational Surfaces
Build:
- Staff Mode
- Megan's Desk
- supporting panels and filtered views

### Phase C - Intelligence Layers
Build:
- world awareness routing
- risk/opportunity logic
- recommendation shaping
- preference/cadence learning

### Phase D - Integration Hardening
Confirm:
- auth/session behavior
- CORS/origin behavior
- route protection
- browser/API surface behavior
- local/dev run model consistency

### Phase E - Launch Hardening
Confirm:
- no hidden state mutation
- no approval bypass
- no authority ambiguity
- no silent validation failure
- no canonical/evidence conflict left unresolved

---

## Validation Gates Before Build Expansion

### Gate 1 - Canonical Integrity
Must confirm:
- no missing required core file
- no split truth
- no foreign-system contamination
- no unresolved contradiction between canonical control files

### Gate 2 - Reconciliation Integrity
Must confirm:
- target canonical files were materially upgraded
- matching recon files were materially updated
- remaining unresolved files are explicitly known

### Gate 3 - Runtime Integrity
Must confirm:
- auth is enforced
- anonymous writes are blocked where required
- protected routes are actually protected
- local origins are configured correctly
- frontend/backend communication works through governed boundaries

### Gate 4 - Surface Integrity
Must confirm:
- Staff Mode does not collapse into Desk
- Desk does not mutate canonical truth silently
- review and approval are not conflated
- recommendation and decision are not conflated

---

## Failure Prevention Rules

Prevent:
- partial builds misrepresented as final architecture
- mixed MegHQ/SkylerOS contamination
- undocumented runtime drift
- implementation-first redesign
- UI-first false progress
- approval/version drift
- authority shortcuts
- canonical/evidence mismatch
- recovery-note dependency after normalization

---

## Handoff Rule For Future AI

A future AI working in this repo must:

1. read truth-lock files first
2. respect source-of-truth hierarchy
3. treat `docs/00_master` as canonical
4. treat recovery/recon as supporting evidence only
5. preserve runtime assumptions already normalized
6. finish unresolved reconciliation before claiming full hardening
7. avoid redesign unless new canonical evidence requires it

---

## Current Repo-State Interpretation

At the current repo stage:
- structural normalization is complete
- truth lock is installed
- major core files have been materially upgraded
- final reconciliation remains on a small set of umbrella/build/validation files
- implementation should remain disciplined and contract-driven
- repo is late pre-hardening, not post-hardening

---

## Lock Statement

This file governs how MegHQ moves from recovered truth into build reality.

No shortcuts.
No blind migration.
No foreign contamination.
No runtime assumptions left implicit.
No implementation drift beyond canonical contracts.

MegHQ is built from canonical truth or it is not built correctly.

File:
docs/00_master/V5_BUILD_AND_MIGRATION_PLAN.md

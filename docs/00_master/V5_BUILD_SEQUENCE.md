# MeganCampaignHQ V5 Build Sequence

## Status
Locked reconciliation-upgraded canonical build sequencing specification.

## Core Truth
V5 must be built in the correct order.

Wrong order creates:
- false progress
- hidden contradictions
- authority drift
- broken approval behavior
- UX surfaces without governed source objects
- implementation ahead of truth

V5 is built clean or not at all.

---

## Purpose

This file defines:
- build order
- dependency order
- readiness gates
- sequencing rules
- what must exist before implementation
- what must be hardened before launch
- what must not be built out of order

This is the canonical sequencing control file for making MegHQ real.

---

## Sequencing Principles

- canonical truth before implementation
- control before convenience
- source objects before projections
- authority before automation
- approval before publication
- validation before trust
- executive surface after governed source systems exist
- hardening before launch
- no mixed V4/V5 logic
- no SkylerOS contamination

---

## Phase 0 - Boundary And Truth Lock

### Goal
Prevent system drift before build acceleration.

### Must Be True
- MegHQ is explicitly separated from SkylerOS
- repo truth-lock files exist
- source-of-truth hierarchy is explicit
- canonical layer is identified as `docs/00_master`
- no important truth remains only in recovery notes or chat

### Outputs
- truth lock docs
- source hierarchy docs
- system boundary docs
- handoff guidance docs

### Gate
Do not proceed if repo truth is still ambiguous.

---

## Phase 1 - Canonical Recovery And Normalization

### Goal
Create one clean MegHQ repo truth structure.

### Must Be Completed
- `docs/00_master` exists
- canonical master files exist
- duplicate top-level structure removed
- recovery files staged
- operations/reconciliation structure exists
- repo no longer depends on bundle artifacts for understanding

### Outputs
- clean repo layout
- complete canonical file set
- supporting docs structure
- recovery staging layer

### Gate
Do not proceed if canonical files are missing or split truth remains.

---

## Phase 2 - Canonical Reconciliation

### Goal
Compare canonical files against Megan source materials and materially upgrade the canonical truth.

### Priority Reconciliation Targets
1. `V5_OBJECT_MODEL.md`
2. `V5_TASK_INITIATIVE_EXECUTION.md`
3. `V5_APPROVAL_ARTIFACT_DESKITEM.md`
4. `V5_MEGANS_DESK_UX.md`
5. `V5_STAFF_MODE_UX.md`
6. `V5_AUTHORITY_AND_DOCTRINE.md`
7. `V5_UNIFIED_MASTER_SPEC.md`
8. `V5_BUILD_SEQUENCE.md`
9. `V5_BUILD_AND_MIGRATION_PLAN.md`
10. `V5_VALIDATION_AND_QUERY_LAYER.md`

### Rule
A file is not reconciled because it was opened.
A file is reconciled only when:
- canonical file was materially strengthened
- matching `__RECON` worksheet was materially updated
- missing truth was moved into canonical file

### Outputs
- materially upgraded canonical files
- materially updated reconciliation evidence
- reduced ambiguity across the system

### Gate
Do not call the repo reconciled until all target files meet that standard.

---

## Phase 3 - Canonical Contract Lock

### Goal
Lock the core contracts before implementation drift begins.

### Core Contracts That Must Be Locked
- object schemas
- execution lifecycles
- approval/versioning rules
- desk/staff separation
- authority classes
- escalation paths
- validation rules
- build/runtime constraints

### Required Canonical Files
- `V5_UNIFIED_MASTER_SPEC.md`
- `V5_OBJECT_MODEL.md`
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `V5_MEGANS_DESK_UX.md`
- `V5_STAFF_MODE_UX.md`
- `V5_AUTHORITY_AND_DOCTRINE.md`
- `V5_BUILD_SEQUENCE.md`
- `V5_BUILD_AND_MIGRATION_PLAN.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

### Gate
Do not begin implementation expansion while any of these remain scaffold-grade or materially ambiguous.

---

## Phase 4 - Hardening Prep

### Goal
Convert reconciled truth into enforceable build-ready contracts.

### Hardening Prep Focus
- enumerate invalid states
- enumerate invalid transitions
- make authority boundaries unambiguous
- make approval bypass impossible
- make projection-vs-canonical distinction explicit
- make audit expectations explicit
- define failure handling
- define restoration and archive expectations where needed

### Outputs
- implementation-grade contracts
- anti-drift rules
- anti-bypass rules
- enforceable system assumptions

### Gate
Do not begin implementation work that depends on behavior not yet hardened in spec.

---

## Phase 5 - Build Foundation

### Goal
Build the governed system foundation in dependency-safe order.

### Correct Foundation Order
1. canonical object layer
2. execution layer
3. approval / artifact / desk governance layer
4. authority / doctrine enforcement layer
5. validation / query / audit enforcement layer

### Reason
- UX surfaces depend on source objects
- source objects depend on governed state and ownership
- approvals depend on artifact/version truth
- validation depends on canonical schemas and allowed transitions
- authority must constrain all execution layers

### Gate
Do not build Desk-first UI behavior on top of weak object contracts.

---

## Phase 6 - Operating Surfaces

### Goal
Build surfaces only after governed execution and control layers exist.

### Correct Surface Order
1. Staff Mode
2. Megan's Desk
3. supporting panels/views
4. comparison and executive-prep refinements

### Reason
- Staff Mode depends on execution truth
- Megan's Desk depends on desk projection rules, approval logic, authority rules, and high-signal surfacing logic
- executive surface must not become a substitute for missing backend/system logic

### Gate
Do not ship UI that implies capabilities not yet backed by governed system logic.

---

## Phase 7 - Intelligence And Learning Layers

### Goal
Add campaign intelligence after core control and execution layers are trustworthy.

### Includes
- world awareness routing
- risk and opportunity behavior
- preference/cadence learning
- relationship power/conversion intelligence
- recommendation shaping

### Rule
Intelligence layers must advise and surface.
They must not silently rewrite authority, approval, or canonical state rules.

### Gate
Do not let intelligence outrun control.

---

## Phase 8 - Integration Hardening

### Goal
Lock runtime, auth, validation, and integration reality against the canonical system.

### Includes
- runtime assumptions
- local/dev run rules
- API boundary checks
- auth/session verification
- CORS/runtime integration rules
- protected route behavior
- environment assumptions

### Canonical Anchors
- `V5_BUILD_AND_MIGRATION_PLAN.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`
- recovered Megan implementation truth already normalized into canonical files

### Gate
Do not launch based on unverified integration assumptions.

---

## Phase 9 - Launch Hardening

### Goal
Ensure the system is safe to trust before real deployment.

### Must Be True
- all required canonical files are materially reconciled
- all major control files are hardened
- no critical truth remains only in evidence files
- no orphan object behavior
- no approval bypass
- no hidden state mutation
- no authority ambiguity
- no Desk/Staff collapse
- no unvalidated protected route or approval flow
- no mixed-system contamination

### Required Checks
- auditability check
- authority integrity check
- approval/versioning check
- execution state machine check
- desk projection separation check
- validation/failure handling check
- runtime/auth integration verification check

### Gate
No deployment until all pass.

---

## Invalid Build Orders

The following are invalid:

- building Megan's Desk before execution and approval logic are locked
- building automation before authority boundaries are locked
- building intelligence before validation is trustworthy
- building publication behavior before approval/version rules are explicit
- building dashboards in place of governed operating surfaces
- importing foreign architecture because it "looks similar"
- treating recovery notes as stronger than canonical files

---

## Current Repo-State Interpretation

At the current repo stage:
- normalization is complete
- truth-lock is in place
- major reconciliation is advanced
- some final canonical reconciliation remains
- hardening is near, but not complete
- implementation should stay downstream of unresolved canonical targets

### Remaining Late-Stage Targets
- `V5_BUILD_SEQUENCE.md`
- `V5_BUILD_AND_MIGRATION_PLAN.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

---

## Handoff Rule

Any future AI or operator must use this sequence rule:

1. read repo truth-lock files
2. verify source-of-truth hierarchy
3. finish unresolved canonical reconciliation
4. finish hardening prep
5. build foundation layers
6. build operating surfaces
7. harden integrations
8. launch only after full enforcement checks

No skipping.
No reordering from convenience.

---

## Lock Statement

This file defines the only acceptable sequencing logic for bringing MeganCampaignHQ V5 into build reality.

Build order is part of system truth.

If sequencing drifts:
- authority drifts
- approvals drift
- UX drifts
- implementation drifts

MegHQ must be built in governed order or not at all.

File:
docs/00_master/V5_BUILD_SEQUENCE.md

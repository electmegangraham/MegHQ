# V5 Schema Foundation PR Spec

## Purpose
This file defines the exact first implementation PR after the repo lock, commercial execution layer, expanded implementation matrix, and final countdown map.

This PR is the beginning of controlled implementation.
It must implement canonical schema foundation only.

It must not introduce workflow shortcuts, UI behavior, inferred semantics, or foreign patterns.

---

# PR Name
**Schema foundation**

# PR Objective
Implement the canonical object contract layer in executable form.

This includes:
- object definitions
- fields
- enums
- relationships
- provenance/source-trace fields
- canonical IDs and references

This does not include:
- UI
- lifecycle workflow behavior beyond structural readiness
- approval decision logic
- validation/quarantine logic beyond structural type safety
- authority enforcement logic
- Campaign Manager behavior
- surfacing/projection behavior

---

# Required Source Files
Implement directly from:
- `V5_OBJECT_MODEL.md`
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `V5_AUTHORITY_AND_DOCTRINE.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`
- `V5_IMPLEMENTATION_MATRIX.md`
- `V5_FULL_IMPLEMENTATION_MATRIX.md`
- `MEGHQ_V5_FINAL_COUNTDOWN_MAP.md`

---

# Required Object Set

## Core execution objects
- Task
- Initiative
- Blocker
- Handoff

## Governance objects
- Approval
- Artifact
- DeskItem

## Organizing objects
- Department

## Supporting contract structures
- source_trace / provenance support
- linked object references
- audit-safe canonical IDs
- enum declarations
- timestamp fields

---

# Object-by-Object Minimum Structural Requirements

## Task
Must structurally support:
- ownership
- initiative linkage
- department routing
- supporting departments
- status
- priority
- urgency
- queue class
- due/start/complete timestamps
- blockers
- dependencies
- linked objects
- approvals
- SLA policy
- provenance

## Initiative
Must structurally support:
- ownership
- department leadership
- supporting departments
- status
- phase
- task membership
- blockers
- approvals
- artifacts
- linked objects
- due/start/complete timestamps
- completion evidence
- provenance

## Blocker
Must structurally support:
- linked task or initiative
- owner
- severity
- resolution plan
- open/mitigating/resolved/archive states
- provenance

## Handoff
Must structurally support:
- from/to owner
- from/to department
- linked task or initiative
- status
- collaboration state
- reason
- due date
- provenance

## Approval
Must structurally support:
- approval type
- status
- requester
- approver
- exact artifact version linkage
- linked objects
- rationale
- deadline
- decision record
- comments history
- priority band
- provenance

## Artifact
Must structurally support:
- artifact type
- status
- maturity
- version
- owner
- linked objects
- approval required
- approval state
- supersedes/superseded links
- publish timestamp
- provenance

## DeskItem
Must structurally support:
- desk item type
- status
- linked objects
- linked artifacts
- linked approvals
- priority band
- executive state hint
- dismiss/file/snooze timestamps
- provenance

## Department
Must structurally support:
- explicit department identity
- queue/use in ownership and collaboration
- relation to work routing

---

# Enum Lock

The schema foundation PR must define enum support for at least the following groups exactly as locked in the implementation matrix:

- Task status
- Task priority
- Task urgency
- Task SLA breach state
- Initiative status
- Blocker status
- Blocker severity
- Handoff status
- Handoff collaboration state
- Approval type
- Approval status
- Artifact type
- Artifact status
- Artifact maturity
- DeskItem type
- DeskItem status

No extra enum values may be invented in this PR.

---

# Relationship Lock

The schema foundation PR must support at minimum:

- Task -> Initiative
- Task -> Owner
- Task -> Department lead/support
- Task -> Approval(s)
- Task -> Blocker(s)
- Task -> Dependency task(s)

- Initiative -> Owner
- Initiative -> Department lead/support
- Initiative -> Task(s)
- Initiative -> Approval(s)
- Initiative -> Artifact(s)
- Initiative -> Blocker(s)

- Blocker -> Task and/or Initiative
- Handoff -> Task and/or Initiative
- Handoff -> From/To owner
- Handoff -> From/To department

- Approval -> Artifact version
- Approval -> linked objects
- Artifact -> linked objects
- Artifact -> supersession chain

- DeskItem -> linked source object(s)
- DeskItem -> linked artifact(s)
- DeskItem -> linked approval(s)

The PR may choose normalized or join-table representation as long as canonical meaning is preserved and future validation/authority layers remain implementable without schema rewrite.

---

# Runtime Lock

Implementation must respect repo runtime truth:
- Node + TypeScript + Fastify
- Supabase Postgres + Supabase Auth
- no direct frontend DB access
- canonical-first migration discipline

If the repo does not yet contain runtime code, this PR may still add:
- schema source files
- migration files
- type definitions
- model declarations
- data contract scaffolding

But it must not invent alternate platform architecture.

---

# Required Deliverables

## Database / persistence layer
- canonical tables or equivalent persistence structures
- enum support
- foreign keys or equivalent relationship integrity
- timestamps
- source trace / provenance support

## Type layer
- typed object contracts matching schema
- enum types
- relation-safe identifiers

## Migration layer
- initial migration(s) for schema foundation
- migration naming that clearly indicates canonical schema foundation

## Documentation layer
Add one implementation note file:
- `V5_SCHEMA_FOUNDATION_IMPLEMENTED.md`

This file must record:
- what was added
- which canonical sources were implemented
- what was intentionally deferred to later PRs
- any exact follow-on dependencies for validation/authority PRs

---

# Explicitly Deferred to Later PRs

These are NOT part of schema foundation and must not be partially implemented here:

## Deferred to PR 2
- validation engine
- quarantine behavior
- explainable rejection contracts

## Deferred to PR 3
- authority engine
- decision-class enforcement
- protected action guards
- approval invalidation logic beyond structural support

## Deferred to PR 4
- transition engine
- lifecycle enforcement
- completion gate enforcement

## Deferred to later PRs
- Staff Mode UI
- Megan’s Desk UI
- Campaign Manager prioritization logic
- Decision engine scoring
- SLA alert routing
- world awareness logic
- learning/adaptation logic
- relationship intelligence
- taste/website governance logic

---

# Acceptance Gates for This PR

The PR is complete only if:

## Structural completeness
- every required canonical object exists
- required fields exist
- required enum groups exist
- required relationship paths exist
- provenance/source trace support exists where required

## Canon fidelity
- no object semantics contradict canon
- no enum additions beyond canon
- no collapsed distinct states
- no projection/source conflation

## Forward compatibility
- validation PR can attach without schema rewrite
- authority PR can attach without schema rewrite
- execution state machines can attach without schema rewrite
- desk/staff surfaces can attach without schema rewrite

## Documentation
- `V5_SCHEMA_FOUNDATION_IMPLEMENTED.md` exists
- deferred scope is explicitly stated

---

# PR Commit Message
`Implement V5 schema foundation from governing canon`

# PR Body
Implements the canonical schema foundation for MegHQ V5 from the locked governing canon and expanded implementation matrix. Adds core objects, fields, enums, relationships, provenance support, and migration/type scaffolding without introducing workflow, authority, validation, or UI shortcuts.

---

# Next PR After Merge
Immediately after this PR:
1. Validation + quarantine
2. Authority + approval enforcement
3. Execution state machines

No UI work should begin before those three are in place.

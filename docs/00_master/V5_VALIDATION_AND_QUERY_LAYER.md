# MeganCampaignHQ V5 Validation And Query Layer

## Status
Locked reconciliation-upgraded canonical validation, integrity, retrieval, filtering, and explainability specification.

## Core Truth
Bad data breaks systems.
Bad state breaks execution.
Bad query behavior breaks trust.

Validation protects truth.
Query protects access to truth.
Neither may be loose, silent, or guess-based.

---

## Purpose

This file defines:
- object validation rules
- state validation rules
- dependency validation rules
- approval validation rules
- authority-aware query rules
- filtering and retrieval rules
- quarantine behavior
- explainability behavior
- failure handling and audit expectations

This is the enforcement layer that prevents the system from accepting, surfacing, or acting on invalid truth.

---

## Validation Principles

- every meaningful write must validate
- every protected transition must validate
- every surfaced executive item must validate
- every query must respect visibility, authority, and object integrity
- no silent coercion from invalid to valid
- no hidden fallback that masks broken state
- no query result may imply authority the user does not actually have
- invalid objects must be blocked, quarantined, or explicitly repaired

---

## Validation Phases

### Phase 1 - Schema Validation
Confirm:
- object type is recognized
- required fields exist
- field types are valid
- enums are valid
- timestamps are parseable
- linked id fields are correctly shaped

### Phase 2 - Relationship Validation
Confirm:
- linked objects exist where required
- referenced initiative/task/artifact/approval relationships are valid
- no forbidden orphan object exists
- no invalid cross-link replaces canonical ownership or source trace

### Phase 3 - State Validation
Confirm:
- current status is valid for object type
- requested transition is allowed
- transition conditions are satisfied
- terminal states are respected

### Phase 4 - Authority / Permission Validation
Confirm:
- actor is allowed to perform the action
- action does not exceed authority class
- review is not being mistaken for approval
- recommendation is not being mistaken for decision
- projected Desk action is not mutating canonical truth improperly

### Phase 5 - Execution Safety Validation
Confirm:
- no unresolved blockers prevent completion
- no missing approvals allow protected execution
- no invalid dependency chain is being ignored
- no deadline / SLA mutation creates hidden risk state

---

## Global Required Field Validation

Every canonical object must include at minimum:
- `id`
- `object_type`
- `status`
- `owner_id`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`
- `linked_object_ids`
- `visibility_scope`
- `audit_enabled`

`visibility_scope` must use:
- `executive`
- `staff`
- `department`
- `system`

Missing required fields = invalid object.

No important object may enter active use without satisfying this baseline.

---

## Object Validation Rules

### Task Validation
Task must validate:
- explicit owner
- explicit initiative link
- valid state enum
- valid priority/urgency
- blocker ids properly shaped
- approval ids properly shaped
- dependency ids properly shaped
- due/started/completed timestamps consistent enough for the current state

Task invalid examples:
- active task with no owner
- complete task with open blocker
- complete task with required approval missing
- archived task attempting further mutation without restore path

### Initiative Validation
Initiative must validate:
- owner exists
- lead department exists
- current phase exists
- task ids valid
- required approval/artifact references valid
- completion evidence exists before complete state

Initiative invalid examples:
- active initiative with no lead department
- complete initiative without completion evidence
- archived initiative receiving new active work

### Artifact Validation
Artifact must validate:
- artifact type exists
- version exists
- source trace exists
- owner exists
- maturity enum valid
- `approval_required` declaration is explicit
- approval state consistent with status
- supersession linkage valid where applicable

Artifact invalid examples:
- protected artifact published without valid approval
- artifact with no provenance
- material revision that still claims stale approval validity

### Approval Validation
Approval must validate:
- approval type exists
- approval owner exists
- requester exists
- artifact id exists
- artifact version exists
- decision record exists before approved state
- deadline/state relationship is coherent
- invalidated approval is not still treated as valid authority

Approval invalid examples:
- approval without artifact version
- approved object with no decision record
- expired approval used to authorize execution
- self-approval where doctrine forbids it

### DeskItem Validation
DeskItem must validate:
- source trace exists
- at least one canonical underlying object exists
- desk item type exists
- linked artifact/approval ids are valid where present
- desk projection action does not imply invalid mutation of source object

DeskItem invalid examples:
- desk item with no source linkage
- desk item used as approval record
- dismissed desk item changing underlying artifact state silently

---

## State Transition Validation

### Rules
State changes must validate:
- source state is legal
- target state is legal
- transition path is allowed
- transition conditions are met
- actor has authority to perform the change
- audit event can be created

### Invalid Transition Examples
- `complete -> in_progress` without explicit restore logic
- `archived -> active` without restoration pathway
- `awaiting_approval -> complete` while approval still incomplete
- `approved -> requested` without new approval record
- `published -> draft` without controlled reversion logic

### Rule
Invalid transitions must be rejected explicitly, not silently repaired.

---

## Dependency Validation

Dependencies must validate:
- referenced dependency exists
- dependency object is of expected type
- dependency is not orphaned
- dependency state is compatible with downstream action
- broken dependency creates blocked or invalid condition

### Dependency Examples
- task depends on another task
- task depends on artifact completion
- task depends on approval completion
- initiative depends on decision or milestone packet

### Invalid Dependency Examples
- downstream task starts while required upstream task is unresolved
- task completes while required approval remains incomplete
- dependency link points to non-existent object
- hidden dependency exists outside canonical links

---

## Approval Validation

### Approval Gate Rules
If approval is required:
- approval must exist
- approval must reference the correct artifact version
- approval must be in valid approved state
- approval must not be expired
- approval must not be invalidated
- actor must not infer approval from visibility or silence

### Review vs Approval Rule
- review validates quality/completeness
- approval validates protected permission
- one must not substitute for the other

### Anti-Bypass Rule
No protected action may advance by:
- implied approval
- stale approval
- approval from wrong authority class
- prior version approval after material revision
- Desk action standing in for approval

---

## Authority-Aware Validation

Validation must enforce:
- final authority boundaries
- delegated authority boundaries
- recommendation vs decision distinction
- route vs finalize distinction
- edit vs approve distinction
- Staff Mode vs Desk projection distinction

### Invalid Authority Examples
- Campaign Manager silently finalizing executive-only decision
- department actor publishing protected artifact without required approval
- automation crossing final-authority boundary
- operator UI affordance implying permission not actually held

---

## Query Layer Purpose

The query layer enables:
- retrieval
- filtering
- grouping
- contextual surfacing
- visibility-scoped exploration
- explainable ranking/order

Query exists to expose correct truth, not merely available data.

---

## Query Rules

Queries must:
- respect permissions
- respect doctrine
- respect authority
- respect visibility scope
- respect object integrity
- return consistent results
- avoid mixing projection object with source object as if equivalent

### Query Must Not
- surface objects outside visibility scope
- imply decision authority from visibility
- rank low-signal noise as equal to urgent executive truth
- collapse archived and active truth without clear labeling
- hide blocked/incomplete status in a misleading summary

---

## Filtering Logic

Filters may include:
- owner
- department
- initiative
- status
- priority
- urgency
- risk level
- approval state
- blocker state
- time window
- visibility scope
- queue class

### Filter Rule
Filters must be explainable and stable.
No hidden filter may silently suppress critical blocked or approval-sensitive work from the correct surface.

---

## Search Behavior

Search must:
- support direct object lookup
- support structured filtering
- support partial text matches where appropriate
- support initiative/department/object-context views
- distinguish active vs archived
- distinguish canonical objects vs projections

### Search Must Not
- return stale superseded artifact as current truth without clear labeling
- return desk projection as if it were the canonical object
- hide invalid state behind fuzzy matching convenience

---

## Context Views

System must support:
- object view
- initiative view
- department view
- queue view
- review/approval view
- blocker/escalation view
- audit view
- executive surface view
- timeline/deadline view

### Rule
Each view must preserve canonical state meaning and must not blur object class boundaries.

---

## Quarantine System

Invalid objects must be:
- rejected immediately
- or quarantined for repair/review when policy allows

### Quarantine Behavior
Quarantined objects:
- cannot execute
- cannot authorize
- cannot publish
- cannot silently surface as normal active truth
- must preserve reason for quarantine
- must preserve source trace
- must preserve audit event

### Quarantine Triggers
- missing required fields
- forbidden orphan object
- invalid transition attempt
- approval inconsistency
- authority inconsistency
- impossible lifecycle combination
- corrupted or contradictory state

---

## Explainability Requirements

Every validation failure must show:
- what failed
- why it failed
- which rule was violated
- what object(s) were involved
- how to fix it or what next step is required
- whether the object was rejected or quarantined

Every non-trivial query result ordering should be explainable in terms of:
- visibility
- priority/urgency
- relevance
- blocked/approval-sensitive status
- executive importance where applicable

No black-box validation.
No black-box critical surfacing.

---

## Audit Requirements

Validation and query-critical events must be auditable.

### Required Validation Events
- `validation_passed`
- `validation_failed`
- `transition_blocked`
- `approval_gate_blocked`
- `authority_gate_blocked`
- `object_quarantined`
- `object_restored_from_quarantine`

### Required Query Events
- `executive_surface_generated`
- `query_executed`
- `visibility_filter_applied`
- `ranking_rule_applied`
- `critical_item_suppression_prevented`
- `projection_to_source_resolution_performed`

Audit records must preserve:
- actor or system source
- timestamp
- affected object(s)
- rule invoked
- prior state where relevant
- resulting state/outcome

---

## Recovered Implementation Verification Truth From Skyler17

### Verified Auth Behavior
Recovered verification truth:
- authenticated writes worked
- anonymous writes were blocked
- Supabase JWT validation worked
- frontend auth session persistence was fixed
- UI changed from `Guest` to signed-in operator identity after fix
- Home auth card reflected active operator session with sign-out

### Verified Integration Behavior
Recovered integration checks:
- frontend scaffold was integrated with the live API
- Actions screen rendered existing action row and selected detail
- Signals screen rendered rows successfully
- Recommendations screen rendered recommendation cards
- CORS correction in `apps/api/src/app.ts` was required
- allowed frontend origins included:
  - `http://localhost:3001`
  - `http://127.0.0.1:3001`

### Validation Implications
System validation must include:
- JWT/session validation checks
- protected route enforcement checks
- anonymous-write rejection checks
- CORS/origin validation for local surfaces
- browser/API surface verification for core screens

### Imported From
`docs/recovery/IMPLEMENTATION_TRUTH_FROM_SKYLER17.md`

---

## Failure Modes

Prevent:
- invalid object entering active system
- invalid completion being accepted
- stale approval authorizing protected work
- broken query hiding critical truth
- projection object being mistaken for canonical source
- orphan object continuing execution
- silent corruption
- authority leak through UI or query behavior
- archived/superseded truth treated as current without labeling

---

## Lock Statement

Validation and Query protect MegHQ system truth.

Without them:
- execution becomes unreliable
- approvals become porous
- authority becomes blurry
- Desk and Staff surfaces become misleading
- trust is lost

This file defines the enforcement layer that keeps MegHQ truthful, queryable, and safe to operate.

File:
docs/00_master/V5_VALIDATION_AND_QUERY_LAYER.md

## Canonical Alignment Enforcement

### Universal Link Enforcement
- `linked_object_ids` is the canonical relationship field
- object-specific semantic relationships may exist for enforcement, but must not create a competing graph model

### Visibility Scope Enforcement
- `visibility_scope` must not use `mixed`
- if an object has multiple projections, those projections must be represented explicitly rather than by collapsing visibility classes

### Audit Default Enforcement
- `audit_enabled` defaults to `true` for canonical governed objects
- disabling audit requires explicit justification and must never apply to protected approvals, governed execution, or executive surfacing

### Approval Declaration vs Enforcement
- `approval_required` declares requirement
- Approval object state enforces requirement
- validation must not confuse declaration with satisfied approval


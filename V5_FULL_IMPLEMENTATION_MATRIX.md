
# V5 Implementation Matrix — Canon Expanded

## Status
This file is the canon-expanded implementation matrix for MegHQ V5.
It is derived from the governing canonical files named in `CANONICAL_TRUTH_MAP.md` and `CANONICAL_FILE_MANIFEST.md`.

## Rule
This matrix does not create new system truth.
It translates existing governing canonical truth into deterministic implementation obligations.

---

# 1. Governing Source Set

## Core contract sources
- `docs/00_master/V5_UNIFIED_MASTER_SPEC.md`
- `docs/00_master/V5_OBJECT_MODEL.md`
- `docs/00_master/V5_TASK_INITIATIVE_EXECUTION.md`
- `docs/00_master/V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `docs/00_master/V5_AUTHORITY_AND_DOCTRINE.md`
- `docs/00_master/V5_VALIDATION_AND_QUERY_LAYER.md`

## Surface sources
- `docs/00_master/V5_MEGANS_DESK_UX.md`
- `docs/00_master/V5_STAFF_MODE_UX.md`

## Operating/intelligence sources
- `docs/00_master/V5_CAMPAIGN_MANAGER_ENGINE.md`
- `docs/00_master/V5_DEPARTMENTS_AND_COLLABORATION.md`
- `docs/00_master/V5_RULES_AND_ACCOUNTABILITY.md`
- `docs/00_master/V5_WORLD_AWARENESS_AND_FIELD.md`
- `docs/00_master/V5_PREFERENCES_LEARNING_CADENCE_RISK_OPPORTUNITY.md`
- `docs/00_master/V5_DECISION_ENGINE.md`
- `docs/00_master/V5_TIME_SLA_ALERTS.md`
- `docs/00_master/V5_RELATIONSHIP_POWER_AND_CONVERSION.md`
- `docs/00_master/V5_TASTE_WEBSITE_GOVERNANCE.md`
- `docs/00_master/V5_BUILD_SEQUENCE.md`
- `docs/00_master/V5_BUILD_AND_MIGRATION_PLAN.md`

---

# 2. Implementation Order Lock

## Build order
1. Object contracts and relationships
2. Validation and quarantine
3. Authority and approval enforcement
4. Execution state machines
5. Staff operational surfaces
6. Megan’s Desk executive projection
7. Campaign Manager and intelligence layers
8. Runtime/integration hardening
9. Launch hardening

## Hard rule
Do not begin UX-led implementation before contract, validation, and authority enforcement are in place.

---

# 3. Canonical Object Contract Matrix

## 3.1 Task
**Canonical sources**
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`
- `V5_STAFF_MODE_UX.md`

**Required fields**
- `id`
- `title`
- `description`
- `initiative_id`
- `owner_id`
- `lead_department_id`
- `supporting_department_ids[]`
- `status`
- `priority`
- `urgency`
- `queue_class`
- `due_at`
- `started_at`
- `completed_at`
- `blocker_ids[]`
- `dependency_task_ids[]`
- `linked_object_ids[]`
- `approval_ids[]`
- `sla_policy`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

**Enums**
- `status`: `captured`, `normalized`, `routed`, `accepted`, `in_progress`, `blocked`, `awaiting_review`, `awaiting_approval`, `complete`, `cancelled`, `archived`
- `priority`: `P0`, `P1`, `P2`, `P3`
- `urgency`: `immediate`, `today`, `this_week`, `scheduled`, `no_fixed_clock`
- `sla_breach_state`: `within_sla`, `warning`, `breached`

**Relationship obligations**
- must link to a valid initiative
- must have explicit owner
- must preserve blocker, dependency, linked object, and approval references
- universal link field rules must be respected

**Validation obligations**
- explicit owner required
- initiative link required
- valid enum values only
- blocker / approval / dependency arrays must be shape-valid
- timestamps must cohere with current state
- complete task cannot retain open blocker
- complete task cannot bypass required approval
- archived task cannot mutate without restore path

**Implementation targets**
- backend schema
- backend transition service
- API validation layer
- staff queue/read models

**Required tests**
- create valid task
- reject task without owner
- reject task without initiative
- reject invalid status
- reject complete task with open blocker
- reject complete task with missing required approval
- reject archived mutation without restore

**Status**
- not started

---

## 3.2 Initiative
**Canonical sources**
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

**Required fields**
- `id`
- `title`
- `description`
- `owner_id`
- `lead_department_id`
- `supporting_department_ids[]`
- `status`
- `priority`
- `urgency`
- `current_phase`
- `task_ids[]`
- `blocker_ids[]`
- `approval_ids[]`
- `artifact_ids[]`
- `linked_object_ids[]`
- `due_at`
- `started_at`
- `completed_at`
- `completion_evidence`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

**Enums**
- `status`: `proposed`, `active`, `blocked`, `awaiting_review`, `awaiting_approval`, `complete`, `cancelled`, `archived`

**Validation obligations**
- owner must exist
- lead department must exist
- current phase must exist
- task ids must be valid
- approval/artifact refs must be valid
- completion evidence required before complete
- archived initiative cannot receive new active work

**Implementation targets**
- backend schema
- workflow service
- initiative query/read model

**Required tests**
- create valid initiative
- reject active initiative without lead department
- reject complete initiative without completion evidence
- reject archived initiative receiving active work

**Status**
- not started

---

## 3.3 Blocker
**Canonical sources**
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_STAFF_MODE_UX.md`

**Required fields**
- `id`
- `title`
- `description`
- `status`
- `severity`
- `linked_task_id`
- `linked_initiative_id`
- `owner_id`
- `resolution_plan`
- `created_at`
- `updated_at`
- `resolved_at`
- `source_trace`

**Enums**
- `status`: `open`, `mitigating`, `resolved`, `archived`
- `severity`: `low`, `moderate`, `high`, `critical`

**Rules**
- blocker state must remain distinct from work state
- complete work cannot retain unresolved blocker
- blocker severity must drive escalation and surfacing

**Implementation targets**
- blocker schema
- escalation rules
- staff risk panel

**Required tests**
- reject invalid blocker status
- reject completion when open blocker remains
- route severe blockers to escalation surface

**Status**
- not started

---

## 3.4 Handoff
**Canonical sources**
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_STAFF_MODE_UX.md`
- `V5_DEPARTMENTS_AND_COLLABORATION.md`

**Required fields**
- `id`
- `from_owner_id`
- `to_owner_id`
- `from_department_id`
- `to_department_id`
- `linked_task_id`
- `linked_initiative_id`
- `status`
- `collaboration_state`
- `request_reason`
- `due_at`
- `created_at`
- `updated_at`
- `source_trace`

**Enums**
- `status`: `proposed`, `accepted`, `rejected`, `cancelled`, `completed`
- `collaboration_state`: `not_needed`, `proposed`, `requested`, `accepted`, `in_progress`, `waiting_on_support`, `blocked`, `needs_manager_resolution`, `needs_Megan_resolution`, `completed`, `cancelled`

**Rules**
- handoff status and collaboration state must not be collapsed into one enum
- collaboration path must preserve department visibility and deadlock handling
- unresolved deadlocks must surface in collaboration views

**Implementation targets**
- handoff schema
- collaboration workflow service
- staff handoff views

**Required tests**
- reject invalid conflation of status/state
- enforce acceptance/rejection path
- surface deadlock state for resolution

**Status**
- not started

---

## 3.5 Approval
**Canonical sources**
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `V5_AUTHORITY_AND_DOCTRINE.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

**Required fields**
- `id`
- `object_type = approval`
- `approval_type`
- `status`
- `requested_by_id`
- `requested_from_id`
- `artifact_id`
- `artifact_version`
- `linked_object_ids[]`
- `rationale`
- `deadline`
- `decision_record`
- `comments_history[]`
- `priority_band`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

**Enums**
- `approval_type`: `publish`, `message_release`, `budget_release`, `strategy_decision`, `event_go_decision`, `compliance_signoff`, `external_distribution`, `executive_review`, `other_protected_action`
- `status`: `draft`, `requested`, `under_review`, `approved`, `rejected`, `expired`, `cancelled`, `invalidated`, `archived`

**Rules**
- approval must reference exact artifact version
- approved state requires decision record
- expired or invalidated approval cannot authorize execution
- self-approval forbidden where doctrine forbids it
- actor may not infer approval from visibility or silence

**Implementation targets**
- approval schema
- authority guardrail service
- approval workflow API
- audit event emitter

**Required tests**
- reject approval without artifact version
- reject approved state without decision record
- reject execution on expired approval
- reject execution on invalidated approval
- reject forbidden self-approval

**Status**
- not started

---

## 3.6 Artifact
**Canonical sources**
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

**Required fields**
- `id`
- `object_type = artifact`
- `artifact_type`
- `status`
- `maturity`
- `version`
- `owner_id`
- `linked_object_ids[]`
- `approval_required`
- `approval_state`
- `supersedes_artifact_id`
- `superseded_by_artifact_id`
- `source_trace`
- `created_at`
- `updated_at`
- `published_at`

**Enums**
- `artifact_type`: `memo`, `brief`, `message`, `statement`, `press_guidance`, `fundraising_asset`, `event_packet`, `research_packet`, `decision_packet`, `other_work_product`
- `status`: `draft`, `in_review`, `approval_pending`, `approved`, `published`, `superseded`, `archived`
- `maturity`: `rough`, `working`, `review_ready`, `approval_ready`, `final`

**Rules**
- protected artifact cannot publish without valid approval
- provenance/source trace required
- material revision invalidates stale approval
- versioning and supersession linkage required where applicable

**Implementation targets**
- artifact schema
- artifact versioning service
- publish gate enforcement

**Required tests**
- reject artifact with no provenance
- reject protected publish without valid approval
- invalidate stale approval after material revision
- preserve supersession linkage

**Status**
- not started

---

## 3.7 DeskItem
**Canonical sources**
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `V5_MEGANS_DESK_UX.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

**Required fields**
- `id`
- `desk_item_type`
- `status`
- `linked_object_ids[]`
- `linked_artifact_ids[]`
- `linked_approval_ids[]`
- `source_trace`
- `priority_band`
- `executive_state_hint`
- `created_at`
- `updated_at`
- `dismissed_at`
- `filed_at`
- `snoozed_until`

**Enums**
- `desk_item_type`: `approval_request`, `decision_prompt`, `risk_alert`, `opportunity_alert`, `briefing`, `prep_packet`, `blocked_work_escalation`, `strategic_comparison`, `executive_summary_card`
- `status`: `active`, `pinned`, `dismissed`, `filed`, `snoozed`, `resolved`, `archived`

**Rules**
- DeskItem is projection, not source-of-truth record
- must link to at least one canonical underlying object
- dismissal/file/snooze cannot silently mutate artifact or approval state
- must preserve executive surfacing rules and source linkage

**Implementation targets**
- executive projection model
- desk orchestration/read service
- desk action handlers

**Required tests**
- reject desk item with no source linkage
- reject use of desk item as approval record
- reject desk action that silently changes underlying artifact state
- enforce snooze/file/dismiss semantics

**Status**
- not started

---

## 3.8 Department
**Canonical sources**
- `V5_DEPARTMENTS_AND_COLLABORATION.md`

**Required behavior**
- explicit department object exists
- department-scoped work and ownership preserved
- collaboration must be cross-functional when required
- anti-silo rule enforced
- department queue must not become executive desk truth

**Implementation targets**
- department schema
- staffing/ownership joins
- department queue views

**Required tests**
- department-scoped work appears in department queue
- anti-silo collaboration required when rule triggers
- executive desk does not replace department operational state

**Status**
- not started

---

## 3.9 Campaign Manager
**Canonical sources**
- `V5_CAMPAIGN_MANAGER_ENGINE.md`
- `V5_AUTHORITY_AND_DOCTRINE.md`

**Required responsibilities**
- determine what matters now
- route and sequence work
- compose executive briefings
- protect Megan from clutter
- maintain approval awareness
- coordinate departments
- provide explainability

**Hard limits**
- may not silently approve protected work
- may not override Megan on final authority matters
- may not rewrite doctrine
- may not bypass approval chain
- may not mutate decision class without doctrine support

**Implementation targets**
- prioritization service
- routing service
- briefing composition service
- explainability output

**Required tests**
- routing works within doctrine
- protected action still requires approval
- explainability payload generated for prioritization/surfacing
- clutter suppression rules enforced

**Status**
- not started

---

# 4. State Machine Matrix

## 4.1 Task transitions
**Allowed transitions**
- `captured -> normalized`
- `normalized -> routed`
- `routed -> accepted`
- `accepted -> in_progress`
- `in_progress -> blocked`
- `blocked -> in_progress`
- `in_progress -> awaiting_review`
- `awaiting_review -> awaiting_approval`
- `awaiting_review -> in_progress`
- `awaiting_approval -> in_progress`
- `awaiting_approval -> complete`
- `in_progress -> complete`
- `complete -> archived`
- `cancelled -> archived`

**Validation**
- transition conditions must be explicit
- invalid transitions must reject, not coerce
- approvals, blockers, timestamps, and dependencies must be checked before advancement

**Tests**
- accept each allowed transition
- reject invalid direct skips
- reject complete when gate conditions fail

**Status**
- not started

---

## 4.2 Initiative transitions
**Allowed transitions**
- `proposed -> active`
- `active -> blocked`
- `blocked -> active`
- `active -> awaiting_review`
- `awaiting_review -> awaiting_approval`
- `awaiting_review -> active`
- `awaiting_approval -> active`
- `awaiting_approval -> complete`
- `active -> complete`
- `complete -> archived`
- `cancelled -> archived`

**Tests**
- accept allowed transitions
- reject invalid shortcuts
- enforce completion evidence before complete

**Status**
- not started

---

## 4.3 Approval transitions
**Allowed transitions**
- `draft -> requested`
- `requested -> under_review`
- `under_review -> approved`
- `under_review -> rejected`
- `requested -> cancelled`
- `under_review -> expired`
- `approved -> invalidated`
- `rejected -> archived`
- `cancelled -> archived`
- `expired -> archived`
- `invalidated -> archived`

**Conditions**
- review cannot finalize without required actors
- approved state requires decision record
- invalidation must break authorization chain

**Tests**
- reject approve without decision record
- expire approvals correctly
- invalidate downstream use after invalidation

**Status**
- not started

---

## 4.4 Artifact transitions
**Allowed transitions**
- `draft -> in_review`
- `in_review -> approval_pending`
- `approval_pending -> approved`
- `approved -> published`
- `published -> superseded`
- `superseded -> archived`
- `draft -> archived`

**Conditions**
- approval-required artifacts must pass approval gate before publish
- supersession and material revision rules enforced

**Status**
- not started

---

## 4.5 DeskItem transitions
**Allowed transitions**
- `active -> pinned`
- `active -> dismissed`
- `active -> filed`
- `active -> snoozed`
- `pinned -> filed`
- `snoozed -> active`
- `resolved -> filed`
- `filed -> archived`

**Conditions**
- desk actions must preserve projection/source separation
- interrupt/decision states must follow executive rules

**Status**
- not started

---

# 5. Validation and Quarantine Matrix

## Global validation phases
1. schema validation
2. relationship validation
3. state validation
4. authority/permission validation
5. execution safety validation

## Quarantine triggers
- missing required fields
- orphan object
- invalid transition attempt
- approval inconsistency
- authority inconsistency
- impossible lifecycle combination
- corrupted or contradictory state

## Quarantine behavior
- object cannot execute
- object cannot authorize
- object cannot publish
- object cannot silently surface as normal truth
- quarantine reason must persist
- source trace must persist
- audit event must persist

## Required explainability
Every validation failure must report:
- what failed
- why it failed
- rule violated
- object involved
- fix or next required step
- whether rejected or quarantined

**Implementation targets**
- validation engine
- API response/error contract
- audit event model

**Required tests**
- quarantine each trigger case
- preserve source trace and reason
- prevent quarantined object from normal execution/publish/authorization

**Status**
- not started

---

# 6. Authority and Doctrine Matrix

## Final authority
Megan is final authority for:
- campaign-defining decisions
- protected approvals assigned to executive authority
- strategic direction changes
- major public message direction changes
- major event go/no-go calls
- major political, reputational, or compliance risk decisions
- major relationship/power/conversion decisions requiring executive judgment

## Decision classes
- `Class A - Executive Final`
- `Class B - Executive Review / Approval`
- `Class C - Manager Governed`
- `Class D - Department Governed`
- `Class E - Automated / System Action`

## Enforcement obligations
- Campaign Manager may route, prioritize, sequence, escalate, recommend, coordinate, request approvals, and enforce process discipline
- Campaign Manager may not approve protected work, override Megan, rewrite doctrine, collapse audit history, bypass approval chain, or mutate authority class
- Department leads may execute within scope, refine artifacts, coordinate, propose, request review, raise blockers, escalate
- Department leads may not self-approve protected executive work, bypass required coordination, silently finalize recommendations, or hide blockers/timing risks/approval needs
- specialized authority paths may exist but do not replace Megan where executive signoff is required
- automation must never impersonate authority

## Escalation obligations
- escalation triggers and path must be explicit
- anti-escalation abuse rule enforced
- escalation events audited

**Implementation targets**
- authorization policy layer
- decision-class classifier
- escalation service
- audit stream

**Required tests**
- block protected action without proper authority class
- block system automation from final authority action
- block silent authority mutation
- enforce escalation routing

**Status**
- not started

---

# 7. Staff Mode Matrix

## Surface areas
- My Work
- Department Queue
- Collaboration / Handoffs
- Review / Approval Panel
- Escalation / Risk Panel

## Allowed view types
- personal work view
- department queue view
- initiative view
- blocker view
- approval/review view
- handoff/collaboration view
- timeline/deadline view

## Semantic states that must remain distinct
- work state
- ownership state
- timing state
- approval state
- blocker state

## Queue obligations
Must show:
- routing state
- ownership state
- queue class
- priority and urgency
- SLA condition
- blocked items

## Interaction obligations
- update rules
- review rules
- approval rules
- escalation rules
- completion rules
- handoff rules
- support request rules
- blocker rules

**Implementation targets**
- staff UI
- queue query layer
- interaction handlers

**Required tests**
- queue orders by canonical signals
- approval panel shows correct artifact version and owner
- blocked/escalation items surface correctly
- semantic states are not conflated

**Status**
- not started

---

# 8. Megan’s Desk Matrix

## Allowed default objects
- decision prompt
- approval request
- executive briefing
- strategic comparison
- risk alert
- opportunity alert
- blocked work escalation
- prep packet
- major campaign movement

## Never default surface
- low-priority task lists
- duplicate updates
- raw team traffic
- internal chatter
- low-confidence speculative output
- unresolved noise without executive consequence

## Executive states
- Idle
- Engaged
- Decision Required
- Interrupt
- Prep Mode
- Review / File

## Desk actions
- pin
- dismiss
- file
- snooze

## Hard rules
- executive desk is projection only
- desk state transitions must follow canonical desk rules
- interrupt must decay back into calm state after handling
- comparison output must be explainable
- desk cannot mutate source-of-truth silently

**Implementation targets**
- executive view model
- surfacing engine
- desk action handlers
- comparison renderer

**Required tests**
- only allowed object types surface by default
- low-priority/raw chatter blocked from default surface
- interrupt logic only triggers on true urgency
- dismiss/file/snooze preserve underlying source state

**Status**
- not started

---

# 9. Intelligence and Operating Layer Matrix

## Campaign Manager Engine
Required:
- determine what matters now
- route and sequence work
- compose executive briefings
- protect from clutter
- approval awareness
- department coordination
- explainability

## Decision Engine
Required:
- decision inputs
- scoring model
- weighted score
- override rules
- tie-break rules
- confidence model
- decision outputs
- explainability
- suppression rules
- recalculation
- failure handling

## Time / SLA / Alerts
Required:
- time classes
- SLA classes
- breach rules
- alert levels
- alert triggers
- alert routing
- suppression rules
- escalation timing
- grace windows
- reminder rules
- explainability

## World Awareness / Field
Required:
- input sources
- field capture
- signal types
- routing rules
- timing awareness
- opportunity detection
- risk detection
- field feedback loop
- noise control
- desk vs staff separation

## Preferences / Learning / Cadence / Risk / Opportunity
Required:
- preference system
- learning system
- cadence tracking
- risk tracking
- opportunity tracking
- surfacing rules
- adaptation rules
- explainability
- failure handling

## Relationship / Power / Conversion
Required:
- relationship objects
- relationship strength
- influence score
- priority tier
- access path
- conversion pipeline
- conversion outcomes
- follow-up cadence
- power mapping
- desk vs staff separation
- explainability

## Taste / Website Governance
Required:
- final taste rule
- preserve list
- reject list
- website core rule
- homepage hierarchy
- hero/CTA/header/section/copy governance
- page existence rule
- feature sprawl rule
- visual governance
- failure handling

**Implementation target**
- wave after foundation + surfaces

**Status**
- not started

---

# 10. Runtime / Integration Matrix

## Runtime truth
- backend runtime: Node + TypeScript + Fastify
- data/auth runtime: Supabase Postgres + Supabase Auth
- no direct frontend DB access
- local dev assumptions must stay explicit
- environment categories must be defined
- canonical-first migration rule enforced

## Required implementation
- backend service boundaries
- auth middleware
- route validation
- migration mapping checks
- protected environment handling
- local dev instructions that match canon

**Required tests**
- protected route rejection without auth
- no frontend direct DB access path
- migration checks preserve canonical mapping
- environment rule failures are explicit

**Status**
- not started

---

# 11. Commercial Delivery Matrix

## Milestones already locked in repo
- M0 Repo + process lock
- M1 Object + validation + authority
- M2 First vertical slice
- M3 Staff Mode + Desk
- M4 Intelligence layers
- M5 Integration hardening
- M6 Release readiness

## Acceptance gates
Each milestone must pass:
- contract enforcement
- validation correctness
- authority enforcement
- no hidden state mutation
- canon alignment maintained

## Release criteria
System is ready when:
- all contracts enforced
- all workflows functional
- all authority rules enforced
- tests passing
- no unresolved contradictions

---

# 12. Immediate Next PR Sequence

## PR 1
Replace `V5_FULL_IMPLEMENTATION_MATRIX.md` and `V5_IMPLEMENTATION_MATRIX.md` with this canon-expanded matrix.

## PR 2
Canonical schema foundation
- object tables/types
- enums
- relationships
- no UI

## PR 3
Validation + quarantine layer

## PR 4
Authority + approval enforcement

## PR 5
Execution state machines

## PR 6
First governed vertical slice

## PR 7
Staff Mode core

## PR 8
Megan’s Desk core

## PR 9
Campaign Manager + intelligence

## PR 10
Runtime/integration hardening + release gates

---

# 13. Lock Statement

This matrix is the implementation translation layer.
No team or AI may treat high-level workflow documents as permission to reinterpret canonical system behavior where this matrix makes the requirement explicit.

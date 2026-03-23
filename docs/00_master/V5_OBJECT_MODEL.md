# MeganCampaignHQ V5 Object Model

## Status
Locked reconciliation-upgraded canonical object specification.

## Purpose
Canonical home for all MeganCampaignHQ V5 objects, schemas, relationships, lifecycle rules, ownership rules, audit trace requirements, invalid-state handling, and projection rules.

## Core Truth
Objects are not narrative concepts.
Objects are enforceable system contracts.

No important object may exist without:
- identity
- type
- ownership
- state
- timestamps
- source trace
- relationship rules
- auditability

## Global Rules
- no orphaned critical object
- no ambiguous ownership for active work
- no approval object without state history
- no artifact without provenance
- no desk item without source trace
- no initiative without lead owner and phase
- no object may bypass doctrine, authority, or audit
- no projection object may replace its canonical underlying object

## Canonical Object Families

### Governance
- DoctrineObject
- Approval
- RuleRecord
- AuditRecord

### Execution
- Task
- Initiative
- DepartmentWorkItem
- HandoffRecord
- QueueItem

### Executive Surface
- DeskItem
- Briefing
- Recommendation
- Alert
- Opportunity
- Risk

### Relationship / Campaign
- Person
- Organization
- Relationship
- Interaction
- Event
- ScheduleBlock

### Intelligence / Learning
- WorldSignal
- PreferenceSignal
- CampaignMetric
- CampaignHealthSnapshot

---

## Global Schema Contract

Every canonical object must define:

### Required Fields
- `id` : immutable string
- `object_type` : canonical enum string
- `status` : canonical enum string
- `owner_id` : primary responsible actor/seat/object
- `created_at` : timestamp
- `updated_at` : timestamp
- `source_type` : enum(`user`,`system`,`import`,`derived`)
- `source_trace` : source reference or provenance note
- `visibility_scope` : enum(`executive`,`staff`,`department`,`system`)
- `linked_object_ids` : array of canonical object ids
- `audit_enabled` : boolean, default `true` for canonical governed objects

### Required Object Questions
- what is it
- who owns it
- what state is it in
- what does it link to
- what created it
- who can change it
- what audit events must exist
- what invalidates it

---

## Core Object Schemas

### Task
#### Purpose
Unit of executable work.

#### Required Fields
- `id`
- `object_type = task`
- `initiative_id`
- `title`
- `description`
- `status`
- `owner_id`
- `lead_department_id`
- `supporting_department_ids[]`
- `priority`
- `urgency`
- `due_at`
- `blocker_ids[]`
- `linked_object_ids[]`
- `approval_ids[]`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

#### Status Enum
- `captured`
- `normalized`
- `routed`
- `accepted`
- `in_progress`
- `blocked`
- `awaiting_review`
- `awaiting_approval`
- `complete`
- `cancelled`
- `archived`

#### Ownership Rules
- exactly one owner at all times
- owner may be reassigned only through audited reassignment
- active task cannot exist without owner
- Campaign Manager may reroute or escalate, but must not silently erase ownership

---

### Initiative
#### Purpose
Coordinating object for related tasks, decisions, artifacts, and outcomes.

#### Required Fields
- `id`
- `object_type = initiative`
- `title`
- `purpose`
- `status`
- `owner_id`
- `lead_department_id`
- `supporting_department_ids[]`
- `decision_points[]`
- `linked_object_ids[]`
- `required_approval_ids[]`
- `risk_owner_id`
- `current_phase`
- `completion_evidence`
- `task_ids[]`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

#### Status Enum
- `proposed`
- `active`
- `blocked`
- `needs_manager_resolution`
- `needs_Megan_resolution`
- `complete`
- `cancelled`
- `archived`

#### Ownership Rules
- exactly one initiative owner at all times
- exactly one lead department at all times
- an archived initiative may not accept new active tasks

---

### Artifact
#### Purpose
Canonical work product or output object.

#### Required Fields
- `id`
- `object_type = artifact`
- `artifact_type`
- `title`
- `status`
- `maturity`
- `owner_id`
- `department_owner_id`
- `version`
- `source_trace`
- `confidence`
- `linked_object_ids[]`
- `approval_required`
- `approval_state`
- `created_at`
- `updated_at`

#### Status Enum
- `draft`
- `in_review`
- `approval_required`
- `approved`
- `rejected`
- `superseded`
- `archived`

#### Rules
- every artifact must have provenance
- version changes must be auditable
- `approval_required` declares whether formal approval is required for governed advancement
- if `approval_required = true`, a valid Approval object is required before protected advancement
- if `approval_required = false`, a valid Approval object is not required unless doctrine explicitly elevates the object
- material revision after approval invalidates dependent approval state unless explicitly re-approved
- artifact lifecycle state is not the same thing as approval decision state

---

### Approval
#### Purpose
Governed approval object tied to protected output or decision.

#### Required Fields
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
- `created_at`
- `updated_at`

#### Status Enum
- `draft`
- `requested`
- `under_review`
- `approved`
- `rejected`
- `expired`
- `cancelled`
- `invalidated`

#### Rules
- approval must reference exactly one artifact version
- creator must not self-approve protected work unless doctrine explicitly allows it
- invalidated approval must not continue to authorize execution

---

### DeskItem
#### Purpose
Executive projection object for Megan’s Desk.

#### Required Fields
- `id`
- `object_type = desk_item`
- `item_type`
- `title`
- `executive_summary`
- `linked_object_ids[]`
- `why_it_matters`
- `what_needs_decision`
- `next_action`
- `status`
- `priority_band`
- `surfaced_by`
- `created_at`
- `updated_at`
- `source_trace`

#### Status Enum
- `queued`
- `active`
- `pinned`
- `dismissed`
- `filed`
- `snoozed`
- `superseded`
- `archived`

#### Rules
- DeskItem is a projection, not the underlying object
- dismissing or filing a DeskItem does not modify the canonical source object
- every DeskItem must preserve source trace to underlying objects

---

## Relationship Constraints

### Task Relationships
- task MUST belong to exactly one initiative
- task MAY link to many artifacts
- task MAY link to many approvals
- task MUST NOT exist without initiative

### Initiative Relationships
- initiative MAY contain many tasks
- initiative MAY require many artifacts
- initiative MAY require many approvals
- archived initiative MUST NOT contain newly activated tasks

### Artifact Relationships
- artifact MUST belong to at least one task or initiative
- artifact MUST NOT exist as a free-floating protected object without provenance
- artifact MAY drive DeskItem projection

### Approval Relationships
- approval MUST reference exactly one artifact version
- approval MAY link to many contextual objects
- approval MUST NOT float unattached to protected work

### DeskItem Relationships
- DeskItem MUST reference at least one canonical underlying object
- DeskItem MUST NOT replace task, initiative, artifact, or approval as the source of truth

---

## Lifecycle and Transition Rules

### Task Allowed Transitions
- `captured -> normalized`
- `normalized -> routed`
- `routed -> accepted`
- `accepted -> in_progress`
- `in_progress -> blocked`
- `in_progress -> awaiting_review`
- `in_progress -> awaiting_approval`
- `in_progress -> complete`
- `blocked -> in_progress`
- `blocked -> needs_manager_resolution` is represented at initiative level, not task status
- `awaiting_review -> in_progress`
- `awaiting_review -> awaiting_approval`
- `awaiting_review -> complete`
- `awaiting_approval -> in_progress`
- `awaiting_approval -> complete`
- `complete -> archived`
- `cancelled -> archived`

### Task Invalid Transitions
- `complete -> in_progress`
- `archived -> any`
- `cancelled -> in_progress`

### Initiative Allowed Transitions
- `proposed -> active`
- `active -> blocked`
- `active -> complete`
- `active -> needs_manager_resolution`
- `active -> needs_Megan_resolution`
- `blocked -> active`
- `needs_manager_resolution -> active`
- `needs_Megan_resolution -> active`
- `complete -> archived`
- `cancelled -> archived`

### Artifact Allowed Transitions
- `draft -> in_review`
- `in_review -> approval_required`
- `in_review -> rejected`
- `approval_required -> approved`
- `approval_required -> rejected`
- `approved -> superseded`
- `rejected -> draft`
- `superseded -> archived`

### Approval Allowed Transitions
- `draft -> requested`
- `requested -> under_review`
- `under_review -> approved`
- `under_review -> rejected`
- `requested -> expired`
- `approved -> invalidated`
- `rejected -> cancelled`

---

## Ownership and Authority Rules

- every active execution object must have one explicit owner
- approval authority must be distinct from creation authority unless doctrine explicitly says otherwise
- only authorized actors may change protected state
- desk projection actions must not silently change underlying canonical object state
- Campaign Manager may route, escalate, surface, and sequence work, but must not bypass approval, doctrine, or Megan’s final authority

---

## Audit and Event Model

### Task Events
- `task_created`
- `task_updated`
- `task_state_changed`
- `task_reassigned`
- `task_blocked`
- `task_unblocked`
- `task_cancelled`
- `task_archived`

### Initiative Events
- `initiative_created`
- `initiative_updated`
- `initiative_state_changed`
- `initiative_reassigned`
- `initiative_completed`
- `initiative_archived`

### Artifact Events
- `artifact_created`
- `artifact_updated`
- `artifact_version_created`
- `artifact_submitted_for_review`
- `artifact_submitted_for_approval`
- `artifact_approved`
- `artifact_rejected`
- `artifact_superseded`
- `artifact_archived`

### Approval Events
- `approval_created`
- `approval_requested`
- `approval_review_started`
- `approval_approved`
- `approval_rejected`
- `approval_expired`
- `approval_invalidated`

### DeskItem Events
- `desk_item_created`
- `desk_item_surfaced`
- `desk_item_pinned`
- `desk_item_dismissed`
- `desk_item_filed`
- `desk_item_superseded`

---

## Failure and Invalid State Handling

- task MUST NOT move to `complete` if required approvals are incomplete
- artifact material change after approval MUST invalidate affected approval unless explicitly re-approved
- missing dependency MUST place task into blocked condition or validation failure
- orphan critical object MUST be quarantined or rejected
- archived source object MUST NOT continue to drive active unsupervised execution
- invalid object mutation MUST be rejected with explicit reason
- approval-linked execution MUST halt on invalidation

---

## Projection vs Canonical Separation

### DeskItem Rule
DeskItem is never the source of truth.
DeskItem is an executive projection of canonical underlying objects.

### Briefing Rule
Briefing is a presentation object, not the underlying execution object.

### Recommendation Rule
Recommendation is an advisory object, not an approval or task by itself.

---

## Implementation Guidance

This file defines:
- canonical object contracts
- relationship constraints
- lifecycle rules
- authority boundaries
- audit expectations
- failure handling expectations

Other files may specialize behavior, but they must not contradict this object model.

## Canonical Alignment Rules

### Universal Linking Rule
- `linked_object_ids[]` is the universal relationship field across canonical objects
- any narrower relationship reference is a semantic subset, not a competing graph model
- no file should introduce a second relationship model that competes with `linked_object_ids[]`

### Artifact Link Rule
- references to artifact linkage are represented through `linked_object_ids[]` filtered by object type = `artifact`
- canonical files may describe artifact linkage semantically, but the base relationship field remains `linked_object_ids[]`

### Approval Declaration vs Approval Enforcement
- `approval_required` declares whether an artifact requires formal approval for protected advancement
- Approval object state enforces whether that declared requirement has actually been satisfied
- declaration is not enforcement
- enforcement is not optional when declaration says approval is required

### Lifecycle vs Decision State Rule
- artifact status describes the lifecycle of the work product
- approval status describes the decision state for one exact artifact version
- these must never be treated as interchangeable

### Desk Priority Mapping Rule
- `priority` is execution importance at canonical work level
- `priority_band` is executive surfacing tier at Desk projection level
- `priority_band` must be derived from underlying importance, urgency, risk, and executive relevance

## Enum Collision Prevention Rules

### Handoff vs Collaboration
- Handoff status and collaboration state are related but not identical concepts
- Handoff status is the narrower transfer-state enum:
  - `proposed`
  - `accepted`
  - `rejected`
  - `cancelled`
  - `completed`
- Collaboration state is the broader cross-functional coordination enum and may include:
  - `not_needed`
  - `requested`
  - `in_progress`
  - `waiting_on_support`
  - `blocked`
  - `needs_manager_resolution`
  - `needs_Megan_resolution`

### Priority vs Priority Band
- `priority` belongs to execution-layer objects
- `priority_band` belongs to Desk projection objects
- no file should use `priority_band` as the canonical execution importance field

### Approval Required vs Approval State
- `approval_required` is a requirement declaration
- `approval_state` is the current condition of approval satisfaction
- Approval object status remains the formal decision record


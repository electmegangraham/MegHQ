# MeganCampaignHQ V5 Task Initiative Execution

## Status
Locked reconciliation-upgraded canonical execution specification.

## Purpose
Canonical home for task, initiative, workflow, dependency, escalation, routing, collaboration, SLA, and execution enforcement mechanics.

## Core Truth
Execution is not a loose workflow.
Execution is a governed operating spine.

No important work may remain:
- ownerless
- untracked
- unaudited
- unprioritized
- blocked without visibility
- waiting without SLA logic
- routed without explicit responsibility

## Execution Rules
- every active task has one explicit owner
- every initiative has one explicit accountable lead
- every cross-functional initiative has a lead department
- blocked work requires explicit blocker state and visibility
- approval-gated work must not bypass approval state
- overdue work must become visible
- escalation must be explicit, not social or implied
- execution state must be auditable

---

## Canonical Execution Objects

### Task
#### Purpose
Smallest governed executable work unit.

#### Required Fields
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

### Initiative
#### Purpose
Multi-step operating object that binds tasks, decisions, artifacts, approvals, and outcomes into one governed effort.

#### Required Fields
- `id`
- `title`
- `purpose`
- `owner_id`
- `lead_department_id`
- `supporting_department_ids[]`
- `status`
- `current_phase`
- `priority`
- `urgency`
- `decision_points[]`
- `linked_object_ids[]`
- `required_approval_ids[]`
- `task_ids[]`
- `risk_owner_id`
- `completion_evidence`
- `sla_policy`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

### Blocker
#### Purpose
Explicit execution obstruction object.

#### Required Fields
- `id`
- `title`
- `description`
- `status`
- `severity`
- `owner_id`
- `linked_task_ids[]`
- `linked_initiative_ids[]`
- `resolution_path`
- `created_at`
- `updated_at`

### Handoff
#### Purpose
Audited transfer of work responsibility or required collaboration between seats/departments.

#### Required Fields
- `id`
- `from_owner_id`
- `to_owner_id`
- `linked_task_id`
- `status`
- `reason`
- `acceptance_required`
- `created_at`
- `updated_at`

---

## Task Status Model

### Status Enum
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

### Allowed Transitions
- `captured -> normalized`
- `normalized -> routed`
- `routed -> accepted`
- `accepted -> in_progress`
- `in_progress -> blocked`
- `in_progress -> awaiting_review`
- `in_progress -> awaiting_approval`
- `in_progress -> complete`
- `blocked -> in_progress`
- `awaiting_review -> in_progress`
- `awaiting_review -> awaiting_approval`
- `awaiting_review -> complete`
- `awaiting_approval -> in_progress`
- `awaiting_approval -> complete`
- `complete -> archived`
- `cancelled -> archived`

### Invalid Transitions
- `captured -> complete`
- `normalized -> complete`
- `routed -> complete`
- `complete -> in_progress`
- `archived -> any`
- `cancelled -> in_progress`

### Transition Conditions
- task cannot move to `accepted` without explicit owner
- task cannot move to `in_progress` if required dependency tasks are unresolved
- task cannot move to `complete` while open blockers exist
- task cannot move to `complete` if required approvals remain incomplete
- task cannot move to `archived` unless terminal state already exists

---

## Initiative Status Model

### Status Enum
- `proposed`
- `active`
- `blocked`
- `needs_manager_resolution`
- `needs_Megan_resolution`
- `complete`
- `cancelled`
- `archived`

### Allowed Transitions
- `proposed -> active`
- `active -> blocked`
- `active -> needs_manager_resolution`
- `active -> needs_Megan_resolution`
- `active -> complete`
- `blocked -> active`
- `needs_manager_resolution -> active`
- `needs_Megan_resolution -> active`
- `complete -> archived`
- `cancelled -> archived`

### Invalid Transitions
- `proposed -> complete`
- `complete -> active`
- `archived -> any`

### Transition Conditions
- initiative cannot move to `active` without explicit owner and lead department
- initiative cannot move to `complete` without completion evidence
- initiative must move to `needs_manager_resolution` when cross-functional conflict cannot be resolved at working level
- initiative must move to `needs_Megan_resolution` when final authority, major risk, or top-level strategic decision is required

---

## Priority and Urgency Model

### Priority Enum
- `P0`
- `P1`
- `P2`
- `P3`

### Urgency Enum
- `immediate`
- `today`
- `this_week`
- `scheduled`
- `no_fixed_clock`

### Rules
- priority expresses importance
- urgency expresses time pressure
- high urgency must not silently override doctrine or approval requirements
- P0 or immediate items must be surfaced visibly if blocked

---

## Queue Class Model

### Queue Classes
- `executive_prep`
- `decision_support`
- `campaign_ops`
- `communications`
- `field`
- `fundraising`
- `digital`
- `compliance`
- `world_signal_response`
- `maintenance`

### Rule
Queue class controls routing expectations and SLA profile, not authority.

---

## Dependency Rules

- every dependency must reference a real upstream object
- dependency may be task-to-task, task-to-approval, task-to-artifact, or initiative-to-decision
- if dependency breaks, downstream task must become blocked or invalid for progress
- unresolved dependency must remain visible in execution views
- hidden dependency logic is forbidden

---

## Blocker Rules

### Blocker Status Enum
- `open`
- `mitigating`
- `resolved`
- `archived`

### Severity Enum
- `low`
- `moderate`
- `high`
- `critical`

### Rules
- every blocked task must reference at least one blocker or explicit dependency reason
- blocker owner must be explicit
- critical blocker must be surfaced to Campaign Manager
- blockers tied to deadline-sensitive or approval-sensitive work must trigger escalation review

---

## Handoff and Collaboration Rules

### Handoff Status Enum
- `proposed`
- `accepted`
- `rejected`
- `cancelled`
- `completed`

### Collaboration State Enum
- `not_needed`
- `proposed`
- `requested`
- `accepted`
- `in_progress`
- `waiting_on_support`
- `blocked`
- `needs_manager_resolution`
- `needs_Megan_resolution`
- `completed`
- `cancelled`

### Rules
- handoff must be explicit and auditable
- reassignment must not erase historical ownership trace
- cross-functional work must show lead/support structure
- rejected handoff must remain visible and auditable
- invisible responsibility transfer is forbidden

---

## SLA and Time Rules

### Required Time Concepts
- `due_at`
- `started_at`
- `completed_at`
- `last_state_change_at`
- `sla_policy`
- `sla_breach_state`

### SLA Breach States
- `within_sla`
- `warning`
- `breached`

### Rules
- every active task must inherit or define an SLA policy
- warning state must appear before breach where time allows
- breach must create visible execution risk
- repeated breach patterns must become management signal, not silent drift
- time-sensitive prep work must be scheduled backwards from the event or decision clock

---

## Routing Rules

- routing must assign owner and lead department
- routing may include support departments but cannot omit primary accountability
- no task may remain indefinitely in routed state
- Campaign Manager may route and reprioritize, but routing must remain auditable
- routing must respect doctrine, permissions, and approval requirements

---

## Review and Approval Rules

- review is not approval
- awaiting review means work quality or completeness check is pending
- awaiting approval means protected work requires formal approval object completion
- tasks must not be marked complete while protected outputs remain unapproved
- approval invalidation must return dependent execution to non-complete state if required by doctrine

---

## Escalation Rules

### Escalation Triggers
- unresolved blocker beyond SLA threshold
- ownership conflict
- cross-department deadlock
- major risk exposure
- approval stall on protected work
- strategic decision required
- executive timing sensitivity

### Escalation Paths
- working level -> lead owner
- lead owner -> Campaign Manager
- Campaign Manager -> Megan
- compliance-sensitive matters may require specialized authority path before executive escalation

### Rules
- escalation must be explicit and auditable
- escalation must state reason, owner, and next action
- executive escalation must not be used for routine noise

---

## Audit Event Model

### Task Events
- `task_created`
- `task_normalized`
- `task_routed`
- `task_accepted`
- `task_started`
- `task_blocked`
- `task_review_requested`
- `task_approval_wait_started`
- `task_completed`
- `task_cancelled`
- `task_archived`
- `task_reassigned`
- `task_sla_warning`
- `task_sla_breached`

### Initiative Events
- `initiative_created`
- `initiative_activated`
- `initiative_blocked`
- `initiative_escalated_manager`
- `initiative_escalated_Megan`
- `initiative_completed`
- `initiative_archived`

### Blocker Events
- `blocker_created`
- `blocker_severity_changed`
- `blocker_mitigation_started`
- `blocker_resolved`
- `blocker_archived`

### Handoff Events
- `handoff_proposed`
- `handoff_accepted`
- `handoff_rejected`
- `handoff_completed`

---

## Failure and Invalid State Handling

- task without owner must be rejected from active execution states
- initiative without lead department must not activate
- blocked task without blocker/dependency reason is invalid
- completed task with open blocker is invalid
- completed task with incomplete required approval is invalid
- archived task or initiative cannot reopen without explicit restoration logic elsewhere
- orphan handoff, blocker, or execution object must be quarantined or rejected

---

## Recovered Implementation Gating From Skyler17

Recovered implementation-phase truth:
- backend core + auth was treated as complete before frontend expansion
- next required phase at that time was explicitly "UI spec before any UI build"
- local development assumed workspace-filtered run commands, not generic repo-root startup
- integration work was validated through working browser surfaces, not only abstract route assumptions

Execution implication:
- implementation should remain phase-gated
- UI build work must remain downstream of explicit UI specification
- local run instructions are part of execution truth
- integration verification is an execution milestone, not optional polish

Imported from:
`docs/recovery/IMPLEMENTATION_TRUTH_FROM_SKYLER17.md`

---

## Lock Statement

This file defines the governed execution spine for MeganCampaignHQ V5.

Execution must be:
- explicit
- owned
- routed
- time-aware
- escalatable
- auditable
- impossible to complete silently or incorrectly

## Canonical Alignment Notes

### Universal Relationship Field
- execution-layer object linkage must use `linked_object_ids[]` as the canonical relationship field
- specific dependency and approval fields may exist for enforcement semantics, but they do not replace canonical graph linkage

### Handoff Status Rule
- handoff status uses one canonical enum only:
  - `proposed`
  - `accepted`
  - `rejected`
  - `cancelled`
  - `completed`

### Collaboration State Rule
- collaboration state uses the broader coordination enum:
  - `not_needed`
  - `proposed`
  - `requested`
  - `accepted`
  - `in_progress`
  - `waiting_on_support`
  - `blocked`
  - `needs_manager_resolution`
  - `needs_Megan_resolution`
  - `completed`
  - `cancelled`

### Priority vs Priority Band
- execution objects use `priority`
- Desk projections use `priority_band`
- execution files must not substitute one for the other




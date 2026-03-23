# MeganCampaignHQ V5 Approval Artifact DeskItem

## Status
Locked reconciliation-upgraded canonical approval, artifact, and desk projection specification.

## Purpose
Canonical home for approval objects, artifact objects, desk item objects, versioning rules, projection rules, invalidation rules, and audit requirements that govern protected work and executive surfacing.

## Core Truth
Approval, Artifact, and DeskItem are separate canonical object classes.

- Approval governs permission and decision state
- Artifact governs work-product truth and version history
- DeskItem governs executive projection and attention management

They must never collapse into one object.

## Governing Rules
- no protected artifact may advance without approval state where doctrine requires it
- no approval may float without a canonical artifact version
- no DeskItem may exist without source trace
- no DeskItem may replace the underlying canonical object
- material artifact revision after approval must invalidate approval unless explicitly re-approved
- dismissal or filing of a DeskItem must not silently modify the underlying artifact or approval
- all state changes must be auditable

---

## Canonical Object Schemas

### Approval
#### Purpose
Formal decision-governance object for protected work.

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
- `priority_band`
- `created_at`
- `updated_at`
- `source_type`
- `source_trace`

#### Approval Types
- `publish`
- `message_release`
- `budget_release`
- `strategy_decision`
- `event_go_decision`
- `compliance_signoff`
- `external_distribution`
- `executive_review`
- `other_protected_action`

#### Status Enum
- `draft`
- `requested`
- `under_review`
- `approved`
- `rejected`
- `expired`
- `cancelled`
- `invalidated`
- `archived`

---

### Artifact
#### Purpose
Canonical protected work-product object.

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
- `current_revision_hash`
- `source_trace`
- `confidence`
- `approval_required`
- `approval_state`
- `linked_object_ids[]`
- `created_at`
- `updated_at`
- `superseded_by_artifact_id`

#### Artifact Types
- `memo`
- `brief`
- `message`
- `statement`
- `press_guidance`
- `fundraising_asset`
- `event_packet`
- `research_packet`
- `decision_packet`
- `other_work_product`

#### Status Enum
- `draft`
- `in_review`
- `approval_required`
- `approved`
- `rejected`
- `published`
- `superseded`
- `archived`

#### Maturity Enum
- `rough`
- `working`
- `review_ready`
- `approval_ready`
- `final`

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
- `source_trace`
- `created_at`
- `updated_at`
- `superseded_by_desk_item_id`

#### Desk Item Types
- `approval_request`
- `decision_prompt`
- `risk_alert`
- `opportunity_alert`
- `briefing`
- `prep_packet`
- `blocked_work_escalation`
- `strategic_comparison`
- `executive_summary_card`

#### Status Enum
- `queued`
- `active`
- `pinned`
- `dismissed`
- `filed`
- `snoozed`
- `superseded`
- `archived`

---

## Separation Rules

### Approval vs Artifact
- approval is not the artifact
- artifact may exist before approval
- approval always references one artifact version
- changing artifact version must not silently preserve stale approval

### Artifact vs DeskItem
- DeskItem is not the artifact
- DeskItem is an executive rendering of artifact/approval context
- DeskItem may be dismissed without deleting or changing underlying artifact

### Approval vs DeskItem
- DeskItem may surface an approval request
- acting on DeskItem may trigger approval workflow
- DeskItem is not itself the approval record

---

## Artifact Versioning Rules

### Version Rules
- every protected artifact has a version number
- artifact version must change on material revision
- approval references the exact approved version
- superseded artifact must preserve historical trace
- only one current active version may be canonical at a time for a given artifact lineage

### Material Revision Rule
A revision is material if it changes:
- message meaning
- strategic recommendation
- factual claim set
- budget/compliance implications
- distribution target
- executive recommendation
- event go/no-go meaning

### Invalidation Rule
If an approved artifact is materially revised:
- linked approval status must move to `invalidated`
- dependent execution that required that approval must no longer rely on prior approved state
- a new approval must be requested if doctrine requires it

---

## Approval Workflow Rules

### Allowed Transitions
- `draft -> requested`
- `requested -> under_review`
- `under_review -> approved`
- `under_review -> rejected`
- `requested -> expired`
- `requested -> cancelled`
- `approved -> invalidated`
- `rejected -> archived`
- `expired -> archived`
- `cancelled -> archived`
- `invalidated -> archived`

### Invalid Transitions
- `approved -> requested`
- `approved -> draft`
- `archived -> any`
- `invalidated -> approved` without new approval object

### Approval Conditions
- approval cannot enter `requested` without artifact and artifact version
- approval cannot enter `approved` without explicit decision record
- approval creator must not self-approve protected work unless doctrine explicitly permits
- expired approval must not authorize execution
- invalidated approval must not authorize execution

---

## Artifact Lifecycle Rules

### Allowed Transitions
- `draft -> in_review`
- `in_review -> approval_required`
- `in_review -> rejected`
- `approval_required -> approved`
- `approval_required -> rejected`
- `approved -> published`
- `approved -> superseded`
- `published -> superseded`
- `rejected -> draft`
- `superseded -> archived`

### Invalid Transitions
- `published -> draft`
- `archived -> any`
- `rejected -> published`

### Conditions
- artifact cannot move to `approved` without approval if doctrine requires approval
- artifact cannot move to `published` if required approval is absent, expired, rejected, or invalidated
- superseded artifact must retain historical source trace and approval linkage

---

## DeskItem Lifecycle Rules

### Allowed Transitions
- `queued -> active`
- `active -> pinned`
- `active -> dismissed`
- `active -> filed`
- `active -> snoozed`
- `active -> superseded`
- `pinned -> active`
- `snoozed -> active`
- `dismissed -> archived`
- `filed -> archived`
- `superseded -> archived`

### Conditions
- DeskItem must not become active without source trace
- DeskItem may be pinned or snoozed without changing underlying object state
- superseded DeskItem must link to replacement if one exists

### Dismiss / File / Snooze Meanings
- `dismissed` = removed from active attention surface, source object unchanged
- `filed` = acknowledged and stored from desk surface, source object unchanged
- `snoozed` = delayed resurfacing, source object unchanged

---

## Executive Surfacing Rules

DeskItems may be generated from:
- approval requests
- risks
- opportunities
- briefing packets
- prep packets
- blocked work requiring executive visibility
- major strategic comparisons
- major multi-department decision bundles

DeskItems must not be generated for:
- low-signal routine noise
- unaudited speculative output
- duplicate surface items without clear value
- raw internal chatter

---

## Authority Rules

- Megan remains final approval authority where doctrine says so
- Campaign Manager may compose, route, surface, and recommend
- Campaign Manager must not silently approve protected work
- department owners may create and refine artifacts but must not bypass required approval chain
- compliance-sensitive artifacts may require specialized signoff path before executive signoff

---

## Audit Event Model

### Approval Events
- `approval_created`
- `approval_requested`
- `approval_review_started`
- `approval_approved`
- `approval_rejected`
- `approval_expired`
- `approval_cancelled`
- `approval_invalidated`
- `approval_archived`

### Artifact Events
- `artifact_created`
- `artifact_updated`
- `artifact_revision_created`
- `artifact_submitted_for_review`
- `artifact_submitted_for_approval`
- `artifact_approved`
- `artifact_rejected`
- `artifact_published`
- `artifact_superseded`
- `artifact_archived`

### DeskItem Events
- `desk_item_created`
- `desk_item_surfaced`
- `desk_item_pinned`
- `desk_item_dismissed`
- `desk_item_filed`
- `desk_item_snoozed`
- `desk_item_superseded`
- `desk_item_archived`

### Linkage Events
- `approval_linked_to_artifact`
- `approval_unlinked_from_artifact`
- `desk_item_linked_to_source`
- `desk_item_linkage_changed`

---

## Failure and Invalid State Handling

- approval without artifact version is invalid
- approval of protected work without decision record is invalid
- published protected artifact without valid approval is invalid
- material artifact revision after approval must invalidate approval
- DeskItem without source trace is invalid
- DeskItem modifying underlying artifact or approval silently is invalid
- orphaned approval or artifact must be quarantined or rejected
- archived approval/artifact/desk item must not silently reactivate without explicit restore logic elsewhere

---

## Desk Projection Guarantees

- DeskItem is a projection layer, not canonical work-product truth
- dismissing, filing, or snoozing a DeskItem must not delete, publish, approve, reject, or alter the underlying object
- executive rendering must always preserve origin trace and linkage to canonical source objects
- multiple DeskItems may reference the same underlying object, but duplication must be justified by different executive contexts

---

## Lock Statement

This file defines the protected work governance layer for MeganCampaignHQ V5.

Approval must be:
- explicit
- version-bound
- auditable
- invalidatable

Artifacts must be:
- canonical
- versioned
- traceable
- governed

DeskItems must be:
- high-signal
- projected
- source-linked
- incapable of replacing underlying truth

## Canonical State Clarification

### Artifact State vs Approval State
- artifact status describes work-product lifecycle
- approval status describes the decision state for a single exact artifact version
- artifact `approved` does not replace Approval object state
- Approval object state remains the authoritative decision record

### Approval Declaration Rule
- `approval_required` declares whether the artifact requires formal approval before protected advancement
- `approval_state` reflects the current approval condition for the relevant version
- a protected artifact must not publish or otherwise advance if `approval_required = true` and valid approval is absent

### Canonical Link Rule
- `linked_object_ids[]` is the canonical relationship field for approvals, artifacts, and DeskItems
- specialized semantic references must remain subordinate to this universal link model


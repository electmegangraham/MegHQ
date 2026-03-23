# MeganCampaignHQ V5 Unified Master Spec

## Status
Locked reconciliation-upgraded canonical unified system specification.

## Core Truth
MeganCampaignHQ V5 is a campaign operating system.

It is not:
- a generic chat assistant
- a dashboard bundle
- a loose workflow layer
- a generic CRM
- a random collection of campaign tools

It is a governed operating system built around:
- Megan's Desk
- Staff Mode
- Campaign Manager orchestration
- doctrine and authority
- task and initiative execution
- approval and artifact control
- validation, query, and audit enforcement
- world awareness and campaign learning

---

## System Purpose

MeganCampaignHQ V5 exists to:
- help Megan run the campaign through one primary executive operating surface
- convert campaign work into governed objects and flows
- ensure every meaningful action has ownership, state, and traceability
- protect decision quality, timing, approvals, and executive attention
- coordinate departments without collapsing into chaos
- make high-signal work visible without dashboard clutter
- make campaign execution auditable, enforceable, and anti-drift

---

## Primary System Thesis

The system is built around one core operating split:

### 1. Megan's Desk
Executive command surface for:
- decisions
- approvals
- risks
- opportunities
- executive prep
- high-value comparisons
- critical initiative movement

### 2. Staff Mode
Operational execution surface for:
- tasks
- queues
- handoffs
- reviews
- approvals
- blockers
- escalations
- throughput

### 3. Campaign Manager
The orchestration layer that:
- routes
- sequences
- prioritizes
- surfaces
- escalates
- structures comparisons
- protects Megan's attention
- preserves doctrine and authority

---

## Non-Negotiable Design Rules

- MegHQ and SkylerOS are separate systems
- Megan's Desk is the primary executive interface
- Staff Mode is not Megan's Desk
- recommendation is not decision
- review is not approval
- desk projection is not source object truth
- authority may not be implied
- ownership may not be ambiguous
- approval may not be bypassed
- hidden state mutation is forbidden
- important truth must not remain only in chat
- canonical truth lives in `docs/00_master`

---

## Canonical Subsystems

### 1. Unified Object System
Governed object layer for:
- tasks
- initiatives
- approvals
- artifacts
- desk items
- handoffs
- blockers
- recommendations
- alerts
- relationships
- world signals
- campaign metrics

Source anchor:
- `V5_OBJECT_MODEL.md`

### 2. Execution Spine
Execution control layer for:
- task lifecycle
- initiative lifecycle
- dependencies
- blockers
- handoffs
- routing
- SLA behavior
- escalation rules

Source anchor:
- `V5_TASK_INITIATIVE_EXECUTION.md`

### 3. Approval / Artifact / Desk Governance Layer
Governed layer for:
- approval classes
- artifact versioning
- approval invalidation
- desk projection
- executive surfacing rules

Source anchor:
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`

### 4. Executive Surface
Megan's Desk executive interaction and attention control model.

Source anchor:
- `V5_MEGANS_DESK_UX.md`

### 5. Staff Operating Surface
Staff Mode operational interaction and execution control model.

Source anchor:
- `V5_STAFF_MODE_UX.md`

### 6. Authority And Doctrine Layer
Control layer for:
- final authority
- delegated authority
- doctrine rules
- escalation boundaries
- decision classes
- anti-bypass behavior

Source anchor:
- `V5_AUTHORITY_AND_DOCTRINE.md`

### 7. Build / Migration / Validation Layer
System implementation and enforcement layer for:
- build sequence
- migration constraints
- validation rules
- query behavior
- runtime guardrails

Source anchors:
- `V5_BUILD_SEQUENCE.md`
- `V5_BUILD_AND_MIGRATION_PLAN.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

### 8. Campaign Intelligence Layer
Higher-order campaign support layer for:
- world awareness
- risk
- opportunity
- relationship power
- learning
- cadence
- timing signals

Source anchors:
- `V5_WORLD_AWARENESS_AND_FIELD.md`
- `V5_PREFERENCES_LEARNING_CADENCE_RISK_OPPORTUNITY.md`
- `V5_RELATIONSHIP_POWER_AND_CONVERSION.md`

---

## Operating Model

### Executive Flow
1. system detects or receives governed input
2. Campaign Manager structures the situation
3. high-signal item may surface to Megan's Desk
4. Megan decides, approves, redirects, or requests depth
5. execution routes back into governed canonical objects
6. audit trail persists throughout

### Staff Flow
1. work is captured or routed
2. ownership is assigned
3. task/initiative progresses through governed states
4. blockers, reviews, and approvals become explicit
5. escalation occurs only by rule
6. completion evidence closes the loop

---

## Control Principles

### Control Principle 1 - Canonical Before Convenience
No convenience layer may override canonical truth.

### Control Principle 2 - Governed Before Fast
Execution speed must not bypass doctrine, approval, or authority.

### Control Principle 3 - Surface Before Surprise
Important blockers, decisions, risks, and breaches must become visible.

### Control Principle 4 - Explain Before Trust
Every important surface item must explain:
- why this
- why now
- why Megan or why this staff user
- what action is needed

### Control Principle 5 - Audit Before Drift
Meaningful state mutation must be auditable.

---

## Required System Guarantees

The system must guarantee:
- every critical object has explicit owner
- every critical object has explicit state
- every protected action has approval behavior where required
- every executive item is high-signal and source-linked
- every escalation has explicit trigger and path
- every surfaced recommendation is distinct from final decision
- every artifact is versioned and traceable
- every invalid object mutation is blocked or quarantined
- no important work disappears into chat or invisible state

---

## Anti-Patterns

Reject:
- dashboard-first architecture
- hidden prioritization
- invisible ownership
- approval by silence
- recommendation masquerading as decision
- desk clutter
- raw execution chaos on executive surface
- free-floating artifacts
- orphan objects
- mixed system boundaries with SkylerOS
- redesign from inference instead of canonical docs

---

## Relationship Between Canonical Files

This file is the umbrella specification.

It defines how the system fits together.

It does not replace specialized canonical files.
It coordinates them.

If detail is needed, defer to:
- object model for object truth
- execution file for lifecycle/routing/escalation truth
- approval/artifact/desk file for protected-output governance
- desk UX file for executive surface truth
- staff mode UX file for operational surface truth
- authority/doctrine file for decision/control truth
- build/migration/validation files for implementation and enforcement truth

No subordinate canonical file may contradict this unified master spec.

---

## Current Phase Meaning

At this repo stage:
- normalization is complete
- canonical truth recovery is complete
- major reconciliation is advanced
- remaining reconciliation must finish before final hardening claim
- implementation should not drift ahead of unresolved canonical gaps

---

## Handoff Rule

Any future AI or operator must:
- start from the repo truth-lock files
- respect the source-of-truth hierarchy
- update canonical files directly when real missing truth is found
- avoid redesign unless explicit new evidence requires it
- preserve separation between evidence and canonical truth

---

## Lock Statement

MeganCampaignHQ V5 is a governed campaign operating system centered on Megan's Desk, Staff Mode, Campaign Manager orchestration, and strict doctrine/authority/execution control.

This file locks:
- what the system is
- what it is not
- how its subsystems fit together
- what rules future work must obey

File:
docs/00_master/V5_UNIFIED_MASTER_SPEC.md

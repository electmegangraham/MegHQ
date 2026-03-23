# MeganCampaignHQ V5 Staff Mode UX

## Status
Locked reconciliation-upgraded canonical staff operating surface specification.

## Core Truth
Staff Mode is not Megan's Desk.

Staff Mode exists for:
- execution
- queues
- collaboration
- routing
- throughput
- visibility into operational work
- disciplined follow-through

It must never collapse into:
- executive clutter
- raw chaos
- uncontrolled dashboards
- noisy cross-team sprawl

---

## Purpose

Staff Mode is the governed operating surface for staff and campaign management work.

It exists to:
- show work clearly
- preserve accountability
- expose blockers
- coordinate departments
- manage queues
- surface handoffs
- support execution without breaking doctrine
- feed high-signal items upward to Megan's Desk when justified

It is not:
- the executive surface
- a brainstorming junk drawer
- a freeform task swamp
- a replacement for canonical object truth

---

## Staff Mode Design Principles

- operations-first
- accountability-first
- queue clarity
- collaboration without chaos
- explicit ownership
- visible blockers
- visible deadlines
- visible approvals
- controlled density
- no mystery state

---

## Primary User Actions

Staff users must be able to:
- view assigned work
- view department queues
- claim or accept routed work when allowed
- update task state
- raise blockers
- request support
- create handoffs
- request review
- request approval
- file completion evidence
- escalate when doctrine requires
- inspect linked artifacts, approvals, and dependencies

System must:
- preserve audit trail
- prevent invalid transitions
- show ownership and timing clearly
- distinguish review from approval
- distinguish recommendation from decision
- distinguish work object from Desk projection

---

## Staff Mode Surface Areas

### 1. My Work
Shows:
- tasks I own
- tasks awaiting my action
- blockers on my work
- pending reviews/approvals tied to my work
- due-soon and overdue items

### 2. Department Queue
Shows:
- all department-scoped active work
- routing state
- ownership state
- queue class
- priority and urgency
- SLA condition
- blocked items

### 3. Collaboration / Handoffs
Shows:
- support requests
- pending handoffs
- accepted handoffs
- rejected handoffs
- cross-functional dependencies
- unresolved deadlocks

### 4. Review / Approval Panel
Shows:
- items awaiting review
- items awaiting approval
- approval owner
- approval deadline
- artifact version under review

### 5. Escalation / Risk Panel
Shows:
- stalled work
- blocker severity
- repeated SLA breach
- authority ambiguity
- escalation-required work

---

## View Model

### Default View Rules
Staff Mode should default to:
- owned work first
- urgent and blocked work clearly visible
- queue summaries before deep detail
- actionable state over decorative layout

### Allowed View Types
- personal work view
- department queue view
- initiative view
- blocker view
- approval/review view
- handoff/collaboration view
- timeline/deadline view

### Never Default To
- wall-of-widgets clutter
- executive-style decision surface
- raw logs/noise
- unfiltered system chatter
- duplicate status spam

---

## Staff State Semantics

Staff Mode must make these distinctions explicit:

### Work State
- what state the task/initiative is in

### Ownership State
- who currently owns it
- whether ownership is pending acceptance

### Timing State
- within SLA
- warning
- breached

### Approval State
- not needed
- needed
- requested
- under review
- approved
- rejected
- invalidated

### Blocker State
- none
- open
- mitigating
- resolved

These must not be visually or logically conflated.

---

## Interaction Rules

### Update Rules
Users may update only what they have authority to update.
A UI affordance must not imply authority the user does not actually hold.

### Review Rules
Review is a quality/completeness check.
Review does not equal approval.

### Approval Rules
Approval is governed and authority-bound.
Staff Mode may request or show approval, but must not silently complete it.

### Escalation Rules
Escalation must require:
- clear reason
- linked object
- visible timing/impact
- explicit destination path

### Completion Rules
Completion must require:
- valid terminal state conditions
- no unresolved blockers
- no missing required approvals
- completion evidence where doctrine requires it

---

## Queue Behavior

### Queue Ordering Signals
Queues may sort by:
- priority
- urgency
- deadline proximity
- blocker severity
- approval waiting state
- escalation requirement
- initiative importance

### Queue Rules
- queue ordering must be explainable
- hidden prioritization is forbidden
- stale routed items must surface visibly
- ownerless active work is invalid
- blocked urgent work must not sink invisibly

---

## Handoff Behavior

### Handoff Rules
- handoff must show sender
- handoff must show recipient
- handoff must show reason
- handoff must show acceptance state
- rejected handoff must remain auditable
- handoff must not erase prior ownership trace

### Support Request Rules
- support request must identify primary owner
- support request must identify needed support lane
- support work must not erase lead accountability

---

## Blocker Behavior

### Blocker Rules
- blocker must have explicit owner
- blocker must have severity
- blocker must link to affected work
- blocker must show next mitigation path
- critical blocker must become highly visible
- blocker resolution must be auditable

### Anti-Pattern
No vague "stuck" state without structured blocker object or reason.

---

## Staff Mode vs Megan's Desk

### Staff Mode
- execution management
- queue discipline
- collaboration mechanics
- blocker handling
- throughput control
- review and approval workflow visibility

### Megan's Desk
- executive decisions
- strategic comparisons
- high-signal surfacing
- major approvals
- executive prep
- top-level interrupt logic

### Separation Rule
Staff Mode may feed Megan's Desk.
Megan's Desk must not be replaced by Staff Mode.
Staff Mode must not mimic executive surfacing logic as its default behavior.

---

## Anti-Patterns

Reject:
- pretty-but-opaque dashboards
- hidden ownership
- fake completion
- approval buried in queue clutter
- blocker invisibility
- mixing recommendation and decision states
- using Staff Mode as a raw data dump
- overloading the surface with non-actionable metrics

---

## Audit and Trust Expectations

Staff Mode must always make visible:
- who owns the work
- what state it is in
- what it is waiting on
- whether approval is needed
- whether blocker exists
- whether SLA risk exists
- whether escalation is active

Any meaningful state mutation from Staff Mode must be auditable.

---

## Hardening Expectations

Staff Mode must be hardened for:
- invalid state prevention
- anti-bypass approval behavior
- anti-orphan ownership behavior
- deadline and SLA visibility
- blocker visibility
- escalation correctness
- permission-bound actions only

---

## Lock Statement

Staff Mode is the disciplined operating surface for campaign execution.

It must remain:
- clear
- owned
- time-aware
- collaboration-capable
- queue-disciplined
- impossible to confuse with the executive Desk

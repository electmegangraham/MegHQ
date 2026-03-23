# MeganCampaignHQ V5 Authority And Doctrine

## Status
Locked reconciliation-upgraded canonical authority, doctrine, escalation, and permission specification.

## Core Truth
Authority is not implied.
Doctrine is not optional.
Execution may be fast, but it may not bypass authority.

MeganCampaignHQ V5 requires:
- explicit decision authority
- explicit escalation paths
- explicit permission boundaries
- explicit doctrine constraints
- no silent approval substitution
- no blurred line between recommendation and decision
- no confused ownership between campaign manager, departments, and Megan

---

## Purpose

This file defines:
- final authority structure
- delegated authority structure
- doctrine rules that govern behavior
- decision classes
- escalation triggers and paths
- role boundaries
- permission principles
- anti-bypass rules

This file is the control layer that determines:
- who may decide
- who may recommend
- who may execute
- who may escalate
- who must approve
- what may never happen without explicit authority

---

## Authority Model

### Final Authority
Megan is final authority for:
- campaign-defining decisions
- protected approvals assigned to executive authority
- strategic direction changes
- major public message direction changes
- major event go/no-go calls
- major political, reputational, or compliance risk decisions
- major relationship/power/conversion decisions where doctrine requires executive judgment

### Campaign Manager Authority
Campaign Manager may:
- route work
- prioritize work
- sequence work
- surface decisions
- escalate issues
- recommend actions
- coordinate cross-functional execution
- request approvals
- enforce process discipline

Campaign Manager may not:
- silently approve protected work
- override Megan on final-authority matters
- rewrite doctrine
- collapse audit history
- bypass required approval chain
- mutate authority class of a decision without explicit doctrine support

### Department Authority
Department leads and owners may:
- execute work inside assigned scope
- refine artifacts
- coordinate staff execution
- propose decisions
- request review
- raise blockers
- escalate when needed

Department leads may not:
- self-approve protected executive work unless doctrine explicitly allows
- bypass cross-functional coordination when required
- convert recommendation into final decision silently
- hide blockers, timing risks, or approval needs

### Specialized Authority
Some work may require specialized authority path before executive decision, including:
- compliance-sensitive work
- finance-sensitive work
- legal-risk work
- public release work
- partner/external-distribution work

Specialized authority does not replace Megan’s final authority when doctrine requires executive signoff.

---

## Doctrine Rules

Doctrine is the non-negotiable behavior layer.

### Doctrine Principles
- no hidden decision making
- no approval bypass
- no silent state mutation
- no ambiguous ownership
- no executive-noise dumping
- no recommendation framed as decision without authority
- no artifact treated as final after material revision without review
- no execution that outruns approval where approval is required
- no system convenience above authority integrity

### Operating Doctrine
- every important decision must have an identifiable authority holder
- every protected action must have explicit approval path
- every escalation must have reason and next action
- every executive surface item must explain why Megan is seeing it
- every delegated authority boundary must remain visible
- every exception path must be explicit and auditable

---

## Decision Classes

### Class A - Executive Final
Requires Megan final decision.
Examples:
- campaign-defining strategic change
- final public message shift
- major endorsement or external posture
- major event go/no-go
- high-risk public response
- major resource redeployment

### Class B - Executive Review / Approval
May be prepared and recommended below Megan, but cannot finalize without executive review.
Examples:
- protected message release
- major briefing approval
- high-sensitivity artifact release
- significant relationship move
- major escalation packet

### Class C - Manager Governed
Campaign Manager may decide within doctrine and explicit delegated scope.
Examples:
- routing and sequencing
- execution reprioritization
- escalation routing
- support assignment
- queue shaping
- surface prioritization

### Class D - Department Governed
Department leads may decide and execute within delegated scope and doctrine.
Examples:
- internal refinement
- draft development
- staff allocation within department lane
- routine execution choices
- scoped follow-through work

### Class E - Automated / System Action
May be triggered automatically only when:
- authority boundary is already defined
- action is reversible or non-final where required
- audit trail is preserved
- action does not cross executive approval boundary

Examples:
- queue movement
- SLA warning generation
- reminder generation
- auto-surfacing
- non-final routing suggestions

System automation must never impersonate authority.

---

## Permission Principles

Permissions must follow authority, not convenience.

### Permission Rules
- view permission does not imply edit permission
- edit permission does not imply approve permission
- recommend permission does not imply decide permission
- route permission does not imply finalize permission
- surfacing permission does not imply executive decision authority

### Minimum Permission Expectations
- Megan: full executive view and final authority where doctrine requires
- Campaign Manager: coordination, routing, escalation, and recommendation authority
- Department leads: scoped execution and refinement authority
- Staff/operators: assigned execution authority only
- System/automation: bounded non-final actions only

---

## Approval Authority Rules

- every approval must have explicit approval owner
- approval owner must be appropriate to approval class
- creator of protected work must not self-approve unless doctrine explicitly allows
- expired approval is not valid authority
- invalidated approval is not valid authority
- approval tied to superseded artifact version is not valid authority
- executive approval may not be inferred from visibility or silence

---

## Escalation Rules

Escalation exists to protect authority integrity, not to create noise.

### Escalation Triggers
- blocker beyond SLA
- cross-functional deadlock
- authority ambiguity
- approval stall
- strategic conflict
- major risk exposure
- time-sensitive decision need
- doctrine conflict
- missing owner on critical work

### Escalation Path
- staff/operator -> department lead
- department lead -> campaign manager
- campaign manager -> Megan
- specialized authority path may interpose when required by doctrine

### Escalation Requirements
Every escalation must state:
- what happened
- why it matters
- who currently owns it
- why current authority is insufficient
- what decision/action is needed next
- timing consequence if ignored

### Anti-Escalation Abuse Rule
Escalation must not be used for:
- routine churn
- laziness
- unclear prep
- avoidable noise
- pushing low-confidence clutter upward

---

## Delegation Rules

Delegation is allowed only when:
- delegated boundary is explicit
- delegated authority class is clear
- audit trail remains intact
- delegated actor is visible
- delegation does not cross protected final-authority boundary improperly

Delegation must not:
- hide who is truly accountable
- erase original owner trace
- convert review authority into final authority
- convert recommendation authority into approval authority

---

## Campaign Manager Relationship To Megan

Campaign Manager is the orchestrator, not the sovereign.

Campaign Manager exists to:
- reduce noise
- improve timing
- structure decisions
- protect executive attention
- organize execution
- surface what matters
- keep authority and doctrine intact

Campaign Manager must never:
- impersonate Megan
- decide protected executive matters unilaterally
- allow convenience to override doctrine
- hide uncertainty, risk, or unresolved blockers

---

## Doctrine Enforcement Rules

Doctrine must be enforceable across:
- routing
- task progression
- approval flow
- desk surfacing
- escalation logic
- publication logic
- artifact versioning
- validation failures

If doctrine is violated:
- action must be blocked, invalidated, or escalated
- violation must be auditable
- reason must be explicit

---

## Invalid Authority Conditions

The following are invalid:
- ownerless critical decision
- approval without approval owner
- self-approval where doctrine forbids it
- system action crossing executive boundary without authority
- manager action masquerading as executive final decision
- department publishing protected artifact without required approval
- recommendation presented as final decision
- artifact revision treated as still approved after material change
- desk item used as substitute for approval record

---

## Audit Requirements

Authority-critical events must be audited.

### Required Authority Events
- `decision_class_assigned`
- `decision_class_changed`
- `approval_owner_assigned`
- `approval_owner_changed`
- `escalation_triggered`
- `escalation_routed`
- `authority_override_attempted`
- `delegation_created`
- `delegation_revoked`
- `doctrine_violation_blocked`
- `doctrine_violation_escalated`

Every such event must preserve:
- actor
- time
- affected object
- reason
- prior state
- resulting state

---

## Interaction With Other Canonical Files

This file governs:
- who may act in `V5_TASK_INITIATIVE_EXECUTION.md`
- who may approve in `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- what may surface and why in `V5_MEGANS_DESK_UX.md`
- what validation must enforce in `V5_VALIDATION_AND_QUERY_LAYER.md`

No canonical file may contradict this authority model.

---

## Lock Statement

Authority must remain:
- explicit
- bounded
- delegated only by rule
- impossible to fake through workflow shortcuts

Doctrine must remain:
- enforceable
- auditable
- above convenience
- above speed
- above system cleverness

MeganCampaignHQ V5 only works if authority and doctrine stay intact.

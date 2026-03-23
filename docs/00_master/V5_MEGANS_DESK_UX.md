# MeganCampaignHQ V5 Megan's Desk UX

## Status
Locked reconciliation-upgraded canonical executive surface specification.

## Core Truth
Megan's Desk is the primary executive interface.

Everything else supports it.
Nothing may compete with it.
Nothing low-signal may pollute it.

The Desk must remain:
- calm
- decisive
- conversational
- high-signal
- executive-first
- anti-dashboard
- anti-noise

---

## Purpose

Megan's Desk is the executive command surface for:
- decisions
- approvals
- risks
- opportunities
- executive prep
- critical initiative movement
- high-value comparisons
- urgent strategic visibility

It is not:
- a generic dashboard
- a raw work queue
- a department workspace
- a noisy operations panel
- a developer console

---

## Desk Design Principles

- one-screen first
- conversation first
- tell and show
- calm by default
- high-signal only
- no raw internal chatter
- no duplicate executive noise
- no widget clutter
- no burying decisions behind navigation

---

## Primary Interaction Model

Megan must be able to:
- ask naturally
- receive direct answer first
- request deeper detail
- compare options
- approve or reject
- redirect work
- pin an item
- file an item
- dismiss an item
- snooze an item
- reopen recent context
- move from summary to evidence without losing thread

System must:
- answer directly first
- preserve thread context
- show reasoning when useful
- reveal structured support on demand
- never require dashboard hunting to get the answer

---

## Desk Surface Composition

### Default Surface
At any given moment the Desk should favor:
- 1 primary item
- up to 2 supporting items
- optional pinned items
- optional quiet status ribbon only when useful

### Allowed Surface Object Types
- decision prompt
- approval request
- executive briefing
- strategic comparison
- risk alert
- opportunity alert
- blocked work escalation
- prep packet
- major campaign movement

### Never Surface By Default
- low-priority task lists
- duplicate updates
- raw team traffic
- internal chatter
- low-confidence speculative output
- unresolved noise without executive consequence

---

## Executive States

### State 1 - Idle
No critical interrupts.
Desk shows current best item or calm overview.

### State 2 - Engaged
Megan is actively working an item, comparison, or thread.

### State 3 - Decision Required
A protected approval, strategic choice, or timing-critical call requires action.

### State 4 - Interrupt
Urgent high-severity item must break through current calm state.

### State 5 - Prep Mode
Desk is oriented around upcoming event, meeting, media, or decision prep.

### State 6 - Review / File
Resolved or handled executive items are being filed, dismissed, or snoozed.

---

## State Transition Rules

- idle -> engaged when Megan opens or asks into an item
- engaged -> decision required when an active thread reaches protected decision state
- engaged -> interrupt only for true urgency
- idle -> interrupt only for critical risk, deadline breach, or urgent decision
- engaged -> prep mode when upcoming event or scheduled prep packet becomes active focus
- any state -> review/file after decision or acknowledgment
- interrupt must decay back into calm state after handling

### Invalid UX Transitions
- no interrupt for low-signal status churn
- no prep mode for routine noise
- no decision-required state without explicit decision object or approval object
- no state jump that hides what changed and why

---

## Interrupt Rules

Interrupt ONLY for:
- critical risk
- urgent decision deadline
- compliance-sensitive emergency
- major campaign timing breach
- major blocker on executive-critical work
- major opportunity that expires quickly

Interrupt must always answer:
- why now
- why this matters
- what decision or action is needed
- what can wait

Everything else:
- queues
- files
- surfaces later
- stays out of the way

---

## Tell And Show Rule

Every executive answer should follow:
1. tell Megan the answer clearly
2. show supporting context only as needed

### Examples
- first: plain recommendation
- second: short why
- third: evidence, comparison, or linked source objects

Never invert this order by forcing raw detail first.

---

## Comparison Behavior

Desk must support structured comparison when relevant.

### Comparison Use Cases
- option A vs option B
- approve vs delay
- message direction 1 vs 2
- event go vs no-go
- risk tradeoff comparison
- candidate strategy comparison

### Comparison Output Must Include
- key difference
- consequence of each option
- recommendation
- confidence level
- what information is still missing

---

## Pin / Dismiss / File / Snooze Behavior

### Pin
Keep item visible until explicitly removed.

### Dismiss
Remove from active Desk surface without changing source object state.

### File
Mark as acknowledged and store for later retrieval without mutating underlying truth.

### Snooze
Delay resurfacing until a meaningful later point or trigger.

### Rules
- these actions affect Desk projection, not underlying canonical object state
- if source object changes materially, previously dismissed/filed/snoozed DeskItem may resurface as new object

---

## Recent Context And Reopen Rules

Desk must support returning to:
- recently handled decision threads
- recently pinned items
- recently filed items
- recently snoozed items
- recently compared options

Reopen must restore:
- summary
- recommendation
- linked evidence
- prior decision context
- why it was surfaced

---

## Executive Trust Rules

Every surfaced item must answer:
- why this
- why now
- why Megan
- what needs action
- what happens if nothing is done

No black-box surfacing.
No unexplained priority.
No hidden queue logic.

---

## Recovered Local UI Verification From Skyler17

Recovered UI reality:
- upgraded UI bundle was applied and verified locally across core screens
- frontend auth state visibly changed after session persistence fix
- top-right operator state was expected to reflect signed-in identity, not `Guest`
- Home auth card was expected to reflect active operator session
- core read surfaces were functioning locally when both API and frontend were running

UX implication:
- auth/session state must be explicit in the executive surface
- local UI verification should be part of pre-hardening validation
- core-screen render success is a required sanity check before deeper build work

Imported from:
`docs/recovery/IMPLEMENTATION_TRUTH_FROM_SKYLER17.md`

---

## Anti-Patterns

Reject:
- dashboard-first UX
- cluttered control panels
- notification spam
- hidden system decisions
- executive overload
- making Megan drill through low-level ops to find the real issue
- treating the Desk like Staff Mode
- surfacing unfiltered internal noise

---

## Separation From Staff Mode

Desk:
- executive decisions
- strategic visibility
- approval handling
- executive prep
- high-leverage attention routing

Staff Mode:
- queues
- operations
- throughput
- collaboration mechanics
- detailed execution management

The two must remain connected but distinct.
Staff Mode may feed the Desk.
Desk must not collapse into Staff Mode.

---

## Lock Statement

Megan's Desk is the command surface.

It must remain:
- calm
- clear
- decisive
- conversational
- high-signal
- impossible to degrade into dashboard clutter or low-value noise

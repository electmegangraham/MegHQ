# V5_STAFF_MODE_UX Reconciliation Worksheet

## Canonical File
docs/00_master/V5_STAFF_MODE_UX.md

## Purpose
Use this worksheet to compare the canonical file against the Megan source materials and record real gaps that had to be merged into the canonical file.

## Gap Entries

### Gap 1
- section: surface model
- issue: staff mode existed conceptually but lacked explicit operational surface areas and view model
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: staff surface / execution operations / queue behavior
- exact missing truth: Staff Mode needs defined panels for work, queues, handoffs, approvals, and escalations
- target canonical update: added staff mode surface areas and view model

### Gap 2
- section: state semantics
- issue: work, ownership, timing, approval, and blocker states were not clearly separated in the UX model
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: integrity / control / missing mechanics
- exact missing truth: Staff UX must distinguish these states clearly to prevent confusion and silent failure
- target canonical update: added staff state semantics and interaction rules

### Gap 3
- section: queue and handoff behavior
- issue: routing, queue ordering, and handoff expectations were too light for implementation-grade execution UX
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: operating engine / campaign manager / staff coordination
- exact missing truth: queues, handoffs, and support requests require explicit UX rules and visibility logic
- target canonical update: added queue behavior and handoff behavior sections

### Gap 4
- section: blocker and escalation handling
- issue: blocker visibility and escalation mechanics were implied more than specified in staff surface behavior
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: execution integrity / escalation / missing enforcement
- exact missing truth: blocked work, SLA risk, and escalation state must be visible and structured in Staff Mode
- target canonical update: added blocker behavior, escalation visibility, and hardening expectations

### Gap 5
- section: separation from Megan's Desk
- issue: staff mode and executive desk separation needed stronger implementation-grade boundary
- source pdf: megan_hq_v_5_unified_master_spec - Copy (1) - Copy.md
- page/section: executive vs operational surface principles
- exact missing truth: Staff Mode must remain an execution surface and must never collapse into Megan's Desk
- target canonical update: added explicit separation and anti-pattern rules

## Hardening Questions
- are states fully enumerable? yes, at staff UX/state level
- are invalid transitions blocked? partially here; full enforcement also depends on execution and validation files
- are ownership rules explicit? yes
- are approvals unbypassable? yes, at UX semantics level
- are failure modes explicit? yes
- are audit requirements explicit? yes

## Decision
- ready

# V5_UNIFIED_MASTER_SPEC Reconciliation Worksheet

## Canonical File
docs/00_master/V5_UNIFIED_MASTER_SPEC.md

## Purpose
Use this worksheet to compare the canonical file against the Megan source materials and record real gaps that had to be merged into the canonical file.

## Gap Entries

### Gap 1
- section: umbrella system definition
- issue: file existed but was too thin to serve as the actual top-level system definition
- source pdf: megan_hq_v_5_unified_master_spec - Copy (1) - Copy.md
- page/section: unified master spec structure and whole-system framing
- exact missing truth: the repo needed a true umbrella definition of what MegHQ is, what it is not, and how its major subsystems fit together
- target canonical update: added full unified system definition and subsystem map

### Gap 2
- section: desk / staff / campaign manager split
- issue: the top-level operating split was implied across files but not locked clearly in the master spec
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: campaign manager role and operating surface logic
- exact missing truth: MegHQ revolves around Megan's Desk, Staff Mode, and Campaign Manager orchestration
- target canonical update: added primary system thesis and operating split

### Gap 3
- section: control principles and guarantees
- issue: repo had strong subsystem docs but the master spec did not clearly state the system-wide guarantees
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: integrity / missing control / anti-drift themes
- exact missing truth: the master spec must define non-negotiable guarantees around ownership, state, approval, escalation, audit, and anti-drift
- target canonical update: added control principles and required system guarantees

### Gap 4
- section: anti-patterns and boundary rules
- issue: repo-level anti-patterns and system boundary protections were not stated strongly enough in the unified master file
- source pdf: megan_hq_v_5_unified_master_spec - Copy (1) - Copy.md
- page/section: anti-dashboard / anti-chaos / executive-first framing
- exact missing truth: the system must explicitly reject dashboard-first drift, executive clutter, invisible ownership, and SkylerOS contamination
- target canonical update: added anti-pattern section and non-negotiable design rules

### Gap 5
- section: canonical file coordination
- issue: the master spec did not clearly define how it relates to the specialized canonical files
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: missing whole-system coordination and truth hierarchy concerns
- exact missing truth: the unified master spec should coordinate the canonical file set without replacing specialized files
- target canonical update: added relationship-between-canonical-files section and handoff rule

## Hardening Questions
- are states fully enumerable? partially here; full enumerations live in subsystem files
- are invalid transitions blocked? indirectly here; direct enforcement lives in execution/approval/validation files
- are ownership rules explicit? yes, at whole-system level
- are approvals unbypassable? yes, at whole-system rule level
- are failure modes explicit? yes, at umbrella system level
- are audit requirements explicit? yes, at whole-system guarantee level

## Decision
- ready

# V5_MEGANS_DESK_UX Reconciliation Worksheet

## Canonical File
docs/00_master/V5_MEGANS_DESK_UX.md

## Purpose
Use this worksheet to compare the canonical file against the Megan source materials and record real gaps that had to be merged into the canonical file.

## Gap Entries

### Gap 1
- section: interaction model
- issue: desk philosophy existed, but interaction mechanics were too light for implementation-grade executive UX
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: Desk / executive surface / campaign manager behavior
- exact missing truth: Desk needs explicit interaction verbs and tell-and-show behavior
- target canonical update: added primary interaction model and tell-and-show rule

### Gap 2
- section: executive states
- issue: desk state model and interrupt rules were implied rather than explicit
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: attention / executive surface / integrity themes
- exact missing truth: calm state, interrupt logic, prep mode, and decision-required behavior must be explicit
- target canonical update: added executive states, state transition rules, and interrupt rules

### Gap 3
- section: surface composition
- issue: what belongs on the Desk vs what must never surface by default was not fully locked
- source pdf: megan_hq_v_5_unified_master_spec - Copy (1) - Copy.md
- page/section: desk-first / executive workflow / anti-dashboard principles
- exact missing truth: default surface composition and allowed object classes must be tightly constrained
- target canonical update: added desk surface composition rules and never-surface list

### Gap 4
- section: action semantics
- issue: pin/dismiss/file/snooze/reopen behaviors were not explicit enough
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: executive handling and surfacing patterns
- exact missing truth: projection-level actions must not mutate canonical underlying objects
- target canonical update: added pin/dismiss/file/snooze semantics and reopen rules

### Gap 5
- section: executive trust and separation
- issue: trust logic and staff mode separation needed stronger implementation-grade wording
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: anti-noise / missing control / executive integrity themes
- exact missing truth: Desk must explain why items surface and must remain separate from Staff Mode
- target canonical update: added executive trust rules, anti-patterns, and explicit separation from Staff Mode

## Hardening Questions
- are states fully enumerable? yes
- are invalid transitions blocked? yes, at UX-state level
- are ownership rules explicit? yes, in terms of Desk vs source object handling
- are approvals unbypassable? yes, Desk cannot silently replace approval flow
- are failure modes explicit? yes, via interrupt/anti-pattern/separation rules
- are audit requirements explicit? partially here; full event closure lives across DeskItem and validation files

## Decision
- ready

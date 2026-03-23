# V5_APPROVAL_ARTIFACT_DESKITEM Reconciliation Worksheet

## Canonical File
docs/00_master/V5_APPROVAL_ARTIFACT_DESKITEM.md

## Purpose
Use this worksheet to compare the canonical file against the Megan source materials and record real gaps that had to be merged into the canonical file.

## Gap Entries

### Gap 1
- section: canonical object schemas
- issue: approval, artifact, and desk item existed conceptually but were not fully locked as separate enforceable object contracts
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: campaign manager / desk / approval governance mechanics
- exact missing truth: approval, artifact, and desk item must remain distinct canonical classes with strict fields and responsibilities
- target canonical update: added full schema sections, types, statuses, and separation rules

### Gap 2
- section: versioning and invalidation
- issue: approval-version binding and invalidation after material artifact revision were not explicit enough
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: audit / integrity / missing control mechanics
- exact missing truth: approvals must reference exact artifact version and material revision must invalidate stale approval
- target canonical update: added artifact versioning rules, material revision rule, and invalidation rule

### Gap 3
- section: lifecycle rules
- issue: approval/artifact/desk item state transitions were incomplete and not fully governed
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: desk behavior / protected output / executive surfacing
- exact missing truth: all three object classes require explicit allowed and invalid transitions
- target canonical update: added approval, artifact, and desk item lifecycle models

### Gap 4
- section: desk projection guarantees
- issue: desk item separation from underlying source object was not explicit enough for safe implementation
- source pdf: megan_hq_v_5_unified_master_spec - Copy (1) - Copy.md
- page/section: Desk-first / executive surface principles
- exact missing truth: DeskItem is projection only and must not mutate underlying truth silently
- target canonical update: added desk projection guarantees and dismiss/file/snooze semantics

### Gap 5
- section: audit and failure handling
- issue: event model and invalid states were implied rather than fully enumerated
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: validation / integrity / audit expectations
- exact missing truth: approval, artifact, and desk item state changes must be auditable and invalid states must be blocked
- target canonical update: added audit event model and failure handling rules

## Hardening Questions
- are states fully enumerable? yes
- are invalid transitions blocked? yes
- are ownership rules explicit? yes
- are approvals unbypassable? yes, at this file level and reinforced by validation/authority files
- are failure modes explicit? yes
- are audit requirements explicit? yes

## Decision
- ready

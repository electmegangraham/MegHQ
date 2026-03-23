# V5_VALIDATION_AND_QUERY_LAYER Reconciliation Worksheet

## Canonical File
docs/00_master/V5_VALIDATION_AND_QUERY_LAYER.md

## Purpose
Use this worksheet to compare the canonical file against the Megan source materials and record real gaps that had to be merged into the canonical file.

## Gap Entries

### Gap 1
- section: validation phases and object-specific rules
- issue: file described validation conceptually but did not fully lock phased validation or per-object invalid examples
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: validation / integrity / missing enforcement themes
- exact missing truth: validation must explicitly block invalid objects, states, dependencies, and protected actions
- target canonical update: added validation phases and object-specific validation rules

### Gap 2
- section: state, dependency, and approval gate enforcement
- issue: transition and approval enforcement were present at high level but not fully operationalized
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: workflow / approval / execution integrity logic
- exact missing truth: protected execution and lifecycle movement require explicit gate enforcement
- target canonical update: added state transition validation, dependency validation, and approval validation sections

### Gap 3
- section: authority-aware query behavior
- issue: query rules existed but did not strongly protect against visibility/authority confusion and projection/source confusion
- source pdf: megan_hq_v_5_unified_master_spec - Copy (1) - Copy.md
- page/section: whole-system control and executive/staff surface separation
- exact missing truth: queries must respect authority boundaries and preserve projection-vs-source distinctions
- target canonical update: added authority-aware validation and stronger query/search/filtering rules

### Gap 4
- section: quarantine and explainability
- issue: quarantine existed conceptually but was not fully turned into governed handling behavior
- source pdf: MeganCampaign - Audit of Campaign Materials.pdf
- page/section: integrity / failure handling / explainability themes
- exact missing truth: invalid objects must be rejected or quarantined with explicit reasons and repair visibility
- target canonical update: added quarantine system and explainability requirements

### Gap 5
- section: audit and failure modes
- issue: validation/query audit expectations and failure modes were too light for final control-layer use
- source pdf: MeganCampaign - V5 Campaign Manager Engine.pdf
- page/section: control / safety / operational discipline implications
- exact missing truth: validation and query actions must emit auditable control events and explicitly prevent misleading system behavior
- target canonical update: added audit requirements and expanded failure modes

## Hardening Questions
- are states fully enumerable? yes, at validation/query enforcement level
- are invalid transitions blocked? yes
- are ownership rules explicit? yes
- are approvals unbypassable? yes
- are failure modes explicit? yes
- are audit requirements explicit? yes

## Decision
- ready

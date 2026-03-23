# Final Hardening Pass

## Status
Primary reconciliation set is complete.
This pass is for contradiction detection, terminology alignment, and handoff integrity.

## Objectives
1. Check for contradictions across `docs/00_master`
2. Align enums, statuses, and terminology
3. Check supporting/recovery files for contradiction against canonical truth
4. Confirm AI handoff docs match current repo reality

## Canonical Files In Scope
- `V5_UNIFIED_MASTER_SPEC.md`
- `V5_OBJECT_MODEL.md`
- `V5_TASK_INITIATIVE_EXECUTION.md`
- `V5_APPROVAL_ARTIFACT_DESKITEM.md`
- `V5_MEGANS_DESK_UX.md`
- `V5_STAFF_MODE_UX.md`
- `V5_AUTHORITY_AND_DOCTRINE.md`
- `V5_BUILD_SEQUENCE.md`
- `V5_BUILD_AND_MIGRATION_PLAN.md`
- `V5_VALIDATION_AND_QUERY_LAYER.md`

## Hardening Checks
### 1. Contradiction Check
Look for:
- same concept defined differently in different files
- approval logic inconsistent across files
- ownership rules inconsistent across files
- Staff Mode / Desk boundary inconsistencies
- build order inconsistencies
- validation rules inconsistent with execution rules

### 2. Terminology Alignment
Look for consistency in:
- `owner_id`
- `linked_object_ids`
- `artifact_id`
- `artifact_version`
- `approval_state`
- `visibility_scope`
- `priority`
- `urgency`
- `queue_class`
- `source_trace`
- `audit_enabled`

Also align enum vocab:
- task statuses
- initiative statuses
- artifact statuses
- approval statuses
- desk item statuses
- blocker statuses
- SLA statuses

### 3. Supporting File Check
Verify no contradiction from:
- `docs/operations/*`
- `docs/recovery/*`
- root truth-lock docs

### 4. Handoff Check
Verify these still reflect current truth:
- `AI_HANDOFF_START_HERE.md`
- `CANONICAL_TRUTH_MAP.md`
- `SOURCE_OF_TRUTH_HIERARCHY.md`
- `SYSTEM_BOUNDARY.md`
- `NON_NEGOTIABLE_RULES.md`
- `REPO_PHASE_STATE.md`
- `RECONCILIATION_COMPLETION_REPORT.md`
- `MEGHQ_NEXT_PHASE_STATUS.md`

## Completion Rule
This pass is complete only when:
- no unresolved contradictions remain
- terms/enums are aligned
- no support/recovery doc contradicts canonical files
- handoff docs match repo reality exactly

# PR Gating Rules

A pull request should not be merged unless all of the following are true.

## 1. Canon alignment
- The PR directly advances at least one item in `docs/00_master/FULLY_DONE_DEFINITION.md`.
- The PR description states which fully-done criterion it advances.
- If the PR does not advance a fully-done criterion, it should not merge.

## 2. Canonical truth protection
- No change contradicts:
  - `FINAL_COUNTDOWN.md`
  - `CANONICAL_EXECUTION_ORDER.md`
  - `REPO_STATUS.md`
  - `MIGRATIONS.md`
  - `docs/00_master/FULLY_DONE_DEFINITION.md`
- If a contradiction exists, canonical docs must be updated first or in the same PR.

## 3. Enforcement integrity
- No bypass path introduced.
- Validation still occurs before execution.
- Authority still occurs before execution.
- Approval blocking behavior remains intact.
- State machine remains authoritative for transitions.
- DB remains source of truth.
- Memory remains non-authoritative.

## 4. Data and migration discipline
- All schema changes are delivered via migrations only.
- No dashboard/manual DB path is used except explicit emergency procedure.
- Migration names follow repo conventions.
- The PR states whether a migration exists and why.

## 5. Runtime safety
- Build passes.
- TypeScript passes.
- Relevant smoke tests pass.
- New code paths are wired and import-clean.
- No mock/sample path is introduced where production behavior is required.

## 6. Auditability
- Relevant mutations are auditable.
- New decision points are logged or intentionally documented as non-audited.
- Source trace is preserved where applicable.

## 7. Integrated expansion rule
After Phase 5, PRs for a capability should include the full-stack minimum viable slice where practical:
- lifecycle/backend
- UI surface if user-facing
- minimal policy/intelligence hooks if required
- audit/enforcement wiring

Avoid isolated backend-only or UI-only work that creates rework unless deliberately scoped as infrastructure.

## 8. Definition of done for the PR
The PR description must include:
- scope
- fully-done criteria advanced
- constraints preserved
- migrations included or not included
- tests run
- follow-on gaps intentionally deferred

# PR Checklist

Copy this into each PR body.

## Summary
- What does this PR change?
- Why is it needed now?

## Fully-Done Alignment
- Which item(s) in `docs/00_master/FULLY_DONE_DEFINITION.md` does this advance?
- Why is this the smallest clean increment?

## Canonical Docs Check
- [ ] Checked against `FINAL_COUNTDOWN.md`
- [ ] Checked against `CANONICAL_EXECUTION_ORDER.md`
- [ ] Checked against `REPO_STATUS.md`
- [ ] Checked against `MIGRATIONS.md`
- [ ] Checked against `docs/00_master/FULLY_DONE_DEFINITION.md`

## Enforcement Integrity
- [ ] No bypass path introduced
- [ ] Validation still enforced
- [ ] Authority still enforced
- [ ] Approval blocking preserved
- [ ] State machine remains authoritative
- [ ] DB remains source of truth
- [ ] Memory remains non-authoritative

## Data / Migration
- [ ] No schema change
- [ ] Or schema change included via migration
- [ ] Migration path follows repo rules
- [ ] No manual dashboard SQL used

## Build / Test
- [ ] TypeScript passes
- [ ] Build passes
- [ ] Relevant smoke tests pass
- [ ] New imports/routes wired correctly

## Audit / Traceability
- [ ] Relevant changes are auditable
- [ ] Source trace preserved where needed
- [ ] New derived state clearly marked as derived, not canonical

## Integrated Expansion
- [ ] This PR avoids isolated silo work that creates predictable rework
- [ ] User-facing capability includes the minimum necessary surface/wiring
- [ ] Deferred follow-ups are explicitly listed

## Deferred Work
- What remains after this PR?
- Why is it intentionally deferred?

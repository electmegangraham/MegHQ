# Non Negotiable Rules

## Rule Set

1. MegHQ and SkylerOS are separate.
2. `docs/00_master` is the canonical MegHQ truth layer.
3. Recovery files are not canonical replacements.
4. Reconciliation files are evidence, not primary truth.
5. No future AI may redesign the repo because of ambiguity alone.
6. No subsystem may be rewritten from vibes or inference.
7. Recommendation is not decision.
8. Review is not approval.
9. Desk projection is not source-of-truth object state.
10. Approval may not be bypassed.
11. Authority may not be implied.
12. Ownership may not be ambiguous.
13. Hidden state mutation is forbidden.
14. Canonical updates must happen in canonical files.
15. No important truth should remain only in chat.

## If Uncertain
When uncertain:
- prefer existing canonical file
- prefer explicit rule over inference
- prefer controlled update over redesign

Definition of Done Enforcement

No feature, PR, or system component is considered complete unless it directly contributes to the criteria defined in:
docs/00_master/FULLY_DONE_DEFINITION.md

If a change does not move the system toward this definition, it should not be built.


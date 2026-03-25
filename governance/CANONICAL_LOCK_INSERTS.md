# Canonical Lock Inserts

Use these exact insertions to lock the fully-done definition into repo canon.

## 1. CANONICAL_FILE_MANIFEST.md

Add:

docs/00_master/FULLY_DONE_DEFINITION.md — canonical definition of “fully done” and master completion work plan (highest-level completion standard)

## 2. CANONICAL_TRUTH_MAP.md

Add:

FULLY_DONE_DEFINITION.md
- Defines the complete system end-state required for launch
- Governs what “complete” means across backend, product, intelligence, UI, and operations
- All roadmap, PRs, and features must trace toward this definition

## 3. NON_NEGOTIABLE_RULES.md (or equivalent rules file)

Add:

Definition of Done Enforcement

No feature, PR, or system component is considered complete unless it directly contributes to the criteria defined in:
docs/00_master/FULLY_DONE_DEFINITION.md

If a change does not move the system toward this definition, it should not be built.

# Hardening Runbook

## Step 1
Open the Megan chat PDFs.

## Step 2
For each worksheet in `docs/operations/hardening_reconciliation`:
- compare against the canonical file
- record only real missing truth
- ignore wording-only changes

## Step 3
Update the canonical file directly in `docs/00_master`.

## Step 4
Mark worksheet decision:
- ready
- needs update

## Step 5
When all worksheets are ready:
- re-read `OPEN_ITEMS_AND_GAPS.md`
- start hardening pass

## Hardening Rule
No new systems.
No architecture redesign.
Only:
- explicitness
- enforcement
- edge cases
- auditability
- failure handling

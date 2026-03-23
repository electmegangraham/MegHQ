# Implementation Truth From Skyler17

## Status
Recovered Megan implementation truth imported from Skyler17 staging evidence.

## Purpose
Capture the Megan-specific implementation facts that were accidentally written into SkylerOS so they can now be normalized into MegHQ.

## Normalization Rule
Information here is temporary recovery truth.
After review, each item should be moved into its canonical MegHQ home:
- build/runtime lessons -> `V5_BUILD_AND_MIGRATION_PLAN.md`
- execution/flow lessons -> `V5_TASK_INITIATIVE_EXECUTION.md`
- desk/frontend behavior -> `V5_MEGANS_DESK_UX.md`
- validation/failure lessons -> `V5_VALIDATION_AND_QUERY_LAYER.md`

## Slot 1 - Backend State
Recovered truth:
- backend core and auth layer were considered complete and stable for Megan Campaign HQ
- stack: Fastify (Node + TS)
- production database: Supabase Postgres project `megan-hq-prod`
- auth layer: Supabase Auth JWT middleware
- canonical DB tables:
  - intake_items
  - signals
  - actions
  - entities
  - relationships
  - operators
  - campaign_memberships
- API source of truth: `apps/api/src/app.ts`
- public routes:
  - GET /health
  - GET /api/home
  - GET /api/intake
  - GET /api/signals
  - GET /api/actions
  - GET /api/entities
  - GET /api/relationships
  - GET /api/recommendations
- protected routes:
  - POST /api/intake
  - PATCH /api/signals/:id
  - POST /api/actions
  - PATCH /api/actions/:id
  - POST /api/entities
  - POST /api/relationships
- verified:
  - authenticated writes work
  - anonymous writes are blocked
  - Supabase JWT validation works
- explicit constraints:
  - no SQLite
  - no auth bypass
  - no direct frontend DB access
  - no API shape changes without schema updates
  - no frontend build before UI spec
- phase note at time of record:
  - backend core + auth complete
  - next required phase was "Phase 12A UI spec before any UI build"

## Slot 2 - Local Frontend/API State
Recovered truth:
- local Windows environment was running
- frontend scaffold had been applied to `apps/web`
- backup existed at:
  - `apps/web.backup.20260318-203257`
- `apps/web/.env.local` had been populated with:
  - `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000`
  - Supabase URL
  - Supabase anon key
- Next.js frontend was running successfully on:
  - `http://localhost:3001`
- API was running successfully via:
  - `pnpm --filter api dev`
- API listener:
  - `http://localhost:3000`
- root-level `pnpm dev`, `npm run dev`, and `start` scripts were not available from repo root without workspace filtering
- workspace-specific commands were the expected run path

## Slot 3 - Auth / Session Verification
Recovered truth:
- frontend auth session persistence was fixed on 2026-03-19
- verified in an incognito browser session
- top-right UI changed from showing `Guest` to showing the signed-in operator email
- Home auth card changed to `Operator Session` and showed a sign-out button
- this resolved the prior bug where sign-in succeeded briefly and then reverted immediately to `Guest`

## Slot 4 - Integration Working Notes
Recovered truth:
- frontend scaffold in `apps/web` was integrated with the live API
- verified working browser screens:
  - Actions page rendered existing action row and selected action detail
  - Signals page rendered 2 signal rows
  - Recommendations page rendered recommendation cards
- CORS was corrected in `apps/api/src/app.ts`
- allowed frontend origins included:
  - `http://localhost:3001`
  - `http://127.0.0.1:3001`
- browser fetches succeeded after that correction

## Slot 5 - Upgraded UI Shell Verification
Recovered truth:
- upgraded UI bundle was applied and verified locally across core screens
- current recorded state at time of recovery:
  - both API and frontend were running locally
  - core read surfaces were functioning

## Slot 6 - Canonical Next Moves To Normalize Into MegHQ
Move these truths into:
- `V5_BUILD_AND_MIGRATION_PLAN.md`
  - runtime stack
  - local run model
  - environment/run commands
  - migration constraints
- `V5_VALIDATION_AND_QUERY_LAYER.md`
  - auth verification
  - protected/public route truth
  - browser/API verification checks
- `V5_MEGANS_DESK_UX.md`
  - auth/session UI state change
  - core screen verification
- `V5_TASK_INITIATIVE_EXECUTION.md`
  - implementation-phase gating
  - UI-before-build sequencing note

## Do Not Treat As Canonical Structure
This file preserves recovered implementation reality.
It does not replace the canonical MegHQ system definition in `docs/00_master`.

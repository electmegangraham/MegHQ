
# MEGHQ REPO AUDIT STATE (LOCKED)

## Current System Status
- Backend: Fastify + Supabase (connected, healthy)
- DB: live, inserts working (vertical slice + audit verified)
- Campaign Manager: DB-backed signals working
- Execution: lifecycle persistence working
- Audit: minimal schema-compliant logging working

## Confirmed Working Endpoints
- GET /health
- GET /health/db
- GET /campaign-manager/run
- POST /vertical-slice/run
- POST /execution/transition
- POST /audit/log

## Enforcement Layer (Phase 2)
- validation: REQUIRED fields enforced
- authority: currently blocks (must be upgraded later)
- execution: prevents illegal transitions

## Known Constraints (Intentional)
- audit_events schema is minimal and strict
- authority currently hard-blocks (stub)
- enforcement is synchronous, not policy-driven yet

## Critical Truths for Next AI
1. DB is the source of truth (no mocks allowed)
2. All writes must succeed against Supabase or fail
3. Enforcement layer must evolve into policy engine (NOT removed)
4. No sample/mock/fake logic should be reintroduced
5. Schema must be discovered, not assumed

## Immediate Next Steps (Phase 3)
- Replace authority stub with approval system
- Expand audit schema (add payload safely)
- Introduce state-aware execution guards
- Integrate memory/context layer

## Hard Rules
- No manual edits outside patches
- No bypassing enforcement
- No schema guessing
- All changes must pass:
  - npm run check
  - npm run build
  - npm run smoke

## System Mental Model
Input → Validation → Authority → Execution → DB → Audit

This is the enforced pipeline. Do not break it.

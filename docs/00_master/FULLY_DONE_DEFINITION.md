# MegHQ — Definition of Done + Master Work Plan

## PART 1 — LOCKED DEFINITION OF "FULLY DONE"

This document is the canonical definition of “fully done” for MegHQ.

A system is considered FULLY DONE only when ALL of the following are true:

### Backend
- Deterministic execution system fully operational
- Compression implemented and active
- Policy engine implemented and enforcing decisions
- Validation, authority, execution, and audit fully enforced
- All operations persistent, auditable, and reversible

### Product
- End-to-end campaign workflows function without gaps
- Staff Mode fully operational
- Megan’s Desk fully operational
- Campaign Manager functioning as orchestrator
- All core objects have complete lifecycle + UI

### Intelligence
- Decision engine with scoring + explainability
- SLA / time / alert system operational
- World / field awareness operational
- Preferences / learning / cadence / risk / opportunity operational
- Relationship / power / conversion system operational
- Taste / website governance operational

### UI
- Command Center (HQ) exists and is usable
- Staff UI exists and supports real workflows
- Megan’s Desk UI exists and is executive-ready
- Object detail views complete
- Real-time or near-real-time refresh behavior

### Operations
- Authentication and multi-user system live
- Background jobs / automation live
- External integrations connected
- Observability and logging in place
- Admin and internal tooling available
- Security hardened
- Full regression testing coverage

### Launch
- Alpha complete
- Beta complete
- Executive pilot complete
- Production launch completed with monitoring

---

## PART 2 — STRATEGIC BUILD PRINCIPLES

1. Build in vertical slices, not layers
2. Always maintain enforcement integrity (no bypass paths)
3. Ship working surfaces early, refine later
4. Defer automation until flows are correct
5. Keep DB as single source of truth at all times
6. Prefer additive systems over destructive ones

---

## PART 3 — FASTEST CLEAN PATH TO FULLY DONE

### Phase 4 — Core completion
Goal: finish deterministic backend so system is long-running safe and policy-aware.

Work:
1. PR-09 — Compression
   - compressed_artifacts table
   - summarization logic
   - thresholds + retention
   - /compression/run
2. PR-10 — Policy Engine
   - rule evaluation
   - approval triggers
   - execution guardrails
   - integration with authority + execution

Exit criteria:
- System can run indefinitely without degradation
- Decisions can be policy-driven, not just structural

### Phase 5 — First vertical slice
Goal: make one full workflow real end-to-end.

Work:
- Complete one vertical slice:
  Signal → Initiative → Task → Approval → Execution → Desk
- Implement:
  - full lifecycle for those objects
  - real persistence + transitions
  - audit coverage
  - minimal UI

Exit criteria:
- One complete campaign loop works without manual intervention

### Phase 6 — Integrated expansion
Goal: expand by capability, full-stack at once.

For each new capability, build:
- workflow/lifecycle
- UI surface
- minimal intelligence hooks
- validation/authority/audit

Repeat:
pick capability → implement full stack → move to next

Exit criteria:
- Core campaign capabilities exist as real full-stack slices, not disconnected layers

### Phase 7 — System hardening
Goal: make system durable and safe.

Work:
- auth
- multi-user
- jobs
- integrations
- observability
- admin tools
- security
- DB constraints/indexes/runtime hardening
- remove remaining mocks

Exit criteria:
- System is safe for real users and supportable in production

### Phase 8 — Intelligence deepening
Goal: make system smart, not just structured.

Work:
- decision engine
- SLA / alerts
- world / field awareness
- preferences / learning
- relationship / power / conversion
- taste / website governance

Exit criteria:
- System proactively guides decisions and prioritization

### Phase 9 — Launch
Goal: real-world rollout.

Work:
1. Internal alpha
2. Operator beta
3. Executive pilot
4. Production launch

Exit criteria:
- System is actively used and monitored in production

---

## ENFORCEMENT RULE

No feature, PR, or system component is considered complete unless it directly contributes to the criteria defined in this document.

After Phase 5, all development should follow integrated expansion. Do not split backend, UI, and intelligence into disconnected phase silos if they belong to the same capability.

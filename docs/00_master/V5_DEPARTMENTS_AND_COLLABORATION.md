# MeganCampaignHQ V5 Departments And Collaboration

## Status
Locked V5 implementation-grade specification.

## Purpose
Defines how departments operate and collaborate.

---

# 1. Governing Truths

- Megan is final authority
- Doctrine controls behavior
- Campaign Manager orchestrates
- Departments do execution
- No siloed truth
- No bypassing approval

---

# 2. Core Rule

Every piece of work must have:
- one lead department
- clear ownership
- defined outputs
- escalation path

---

# 3. Department Object

\\\	s
export interface Department {
  departmentName: string;
  leadSeatId: string;
  intakeTypes: string[];
  outputTypes: string[];
  approvalClasses: string[];
}
\\\

---

# 4. Collaboration Rule

All collaboration must define:
- lead department
- supporting departments
- owner
- deadline
- blockers

---

# 5. Anti-Silo Rule

- No hidden notes
- No duplicate truth
- No parallel systems
- No "we talked about it" without structure

---

# 6. Desk Rule

Departments do NOT push directly to Megan’s Desk.

Only Campaign Manager surfaces:
- decisions
- approvals
- risks
- opportunities

---

# 7. Lock Statement

Departments are execution lanes.

Campaign Manager orchestrates.

Megan sees only curated executive outputs.

File:
docs/00_master/V5_DEPARTMENTS_AND_COLLABORATION.md

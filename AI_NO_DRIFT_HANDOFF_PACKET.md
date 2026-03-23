# MegHQ No-Drift AI Handoff Packet

## Purpose
This packet is the required entry point for any new AI taking over work in this repository.

Its purpose is to prevent:
- repo drift
- canonical drift
- architecture reinvention
- accidental recovery restarts
- MegHQ / SkylerOS cross-contamination
- implementation from intuition instead of canon

---

## 1. System Identity

This repo is **MegHQ only**.

MegHQ is:
- MeganCampaignHQ
- a governed campaign operating system
- an executive + staff operating structure
- a system defined by doctrine, authority, execution, approval, validation, auditability, and controlled surfaces

MegHQ is **not**:
- SkylerOS
- a generic orchestration backend
- a mixed-system architecture repo
- a place to merge related-looking systems
- a place to infer shared structure by analogy

### Boundary Rule
Do not:
- merge MegHQ with SkylerOS
- import SkylerOS architecture
- unify the systems
- treat similarity as permission to reuse patterns
- use prior contamination as permission to contaminate again

---

## 2. Current Repo State

Assume the following is true unless the repo explicitly disproves it:

- recovery has been completed
- reconciliation has been completed
- truth lock has been installed
- primary alignment cleanup has been completed
- the repo is safe for AI handoff
- the repo is in **controlled implementation from truth-locked canonical contracts**

### Therefore, do not:
- restart recovery
- restart normalization
- restart architecture discovery
- rebuild truth from old evidence
- reopen already-solved reconciliation work without a concrete canonical conflict

---

## 3. Canonical Truth Layer

The active governing canonical truth is the file set explicitly identified in:

- CANONICAL_TRUTH_MAP.md
- CANONICAL_FILE_MANIFEST.md

These files define the active governing system truth.

### Important clarification
docs/00_master/* contains both:
- governing canonical specifications
- audit / diagnostic / historical analysis files

Not every file in docs/00_master/* has equal governing force.

### Governing force belongs to:
- files explicitly named in CANONICAL_TRUTH_MAP.md
- files explicitly named in CANONICAL_FILE_MANIFEST.md

### Audit and analysis files may:
- identify gaps
- identify refinement opportunities
- justify implementation tasks
- justify deliberate canonical updates

### Audit and analysis files may not:
- override governing canonical files
- change repo phase
- restart recovery or normalization
- act as active contracts by implication

If an audit file conflicts with a governing canonical file, the governing canonical file wins.

---

## 4. Required Reading Order

Before proposing, editing, implementing, or interpreting anything, read in this exact order:

1. AI_HANDOFF_START_HERE.md
2. TRUTH_LOCK_INDEX.txt
3. CANONICAL_TRUTH_MAP.md
4. SOURCE_OF_TRUTH_HIERARCHY.md
5. SYSTEM_BOUNDARY.md
6. NON_NEGOTIABLE_RULES.md
7. REPO_PHASE_STATE.md
8. RECONCILIATION_COMPLETION_REPORT.md
9. FINAL_TRUTH_LOCK_REPORT.md
10. FINAL_IMPLEMENTATION_READY_STATUS.md
11. FINAL_ALIGNMENT_FIXES_APPLIED.md
12. CANONICAL_FILE_MANIFEST.md
13. then the governing canonical files in docs/00_master/*

Do not start from:
- memory
- recovery notes
- scaffolds
- extracted evidence
- old chats
- intuition

---

## 5. Canonical Precedence

When two governing canonical files appear to conflict, resolve in this order:

1. **Object + Contract Layer**
   - docs/00_master/V5_OBJECT_MODEL.md

2. **Authority + Validation Layer**
   - docs/00_master/V5_AUTHORITY_AND_DOCTRINE.md
   - docs/00_master/V5_VALIDATION_AND_QUERY_LAYER.md

3. **Execution Logic Layer**
   - docs/00_master/V5_TASK_INITIATIVE_EXECUTION.md

4. **Projection / UX Layer**
   - docs/00_master/V5_MEGANS_DESK_UX.md
   - docs/00_master/V5_STAFF_MODE_UX.md

5. **All Other Governing Canonical Files**
   - all other explicitly listed governing files

### Rule
Lower layers must not override higher layers.

- UX may not redefine execution
- execution may not violate validation
- validation may not violate object contracts
- supporting governing files may not contradict higher-precedence governing layers

---

## 6. Non-Negotiable Alignment Rules

These are already fixed and must remain fixed.

### Universal relationship field
- linked_object_ids

### Approval distinction
These are distinct:
- pproval_required
- pproval_state
- approval object decision record

### Visibility scope
Canonical values:
- xecutive
- staff
- department
- system

Do not reintroduce mixed.

### Audit default
- udit_enabled defaults to 	rue for governed canonical objects

### Desk item status
Canonical desk statuses:
- queued
- ctive
- pinned
- dismissed
- iled
- snoozed
- superseded
- rchived

### Handoff vs collaboration
These remain separate.

#### Handoff status
- proposed
- ccepted
- ejected
- cancelled
- completed

#### Collaboration state
- 
ot_needed
- proposed
- equested
- ccepted
- in_progress
- waiting_on_support
- locked
- 
eeds_manager_resolution
- 
eeds_Megan_resolution
- completed
- cancelled

### Priority vs priority band
- priority belongs to execution-layer objects
- priority_band belongs to Desk projection objects

---

## 7. Governance Rules

- Megan is final authority where doctrine says so
- recommendation is not decision
- review is not approval
- authority may not be implied
- approval may not be bypassed
- workflow convenience must not overrule doctrine

---

## 8. Surface Separation

- Megan’s Desk is the executive surface
- Staff Mode is the operational surface
- Desk must not collapse into Staff Mode
- Staff Mode must not default to executive surfacing
- Desk projection is not source-of-truth object state

---

## 9. Deliberate Canonical Update Definition

A deliberate canonical update is a controlled modification to governing system truth.

A valid canonical update must:
- modify a file within docs/00_master
- preserve cross-file alignment with all governing canonical files
- not leave partial, conflicting, or ambiguous definitions
- be treated as a system-level change, not a local patch

### Disallowed
- adding fields without updating dependent canonical files
- changing enums without propagation
- introducing alternate patterns that compete with canonical structures
- silent local edits that create system-wide inconsistency
- changing projection behavior in a way that silently mutates source-of-truth contracts

### Rule
If a change cannot be applied cleanly across all affected canonical files, it must not be applied.

---

## 10. Implementation Starting Point

Implementation must proceed in this order:

1. **Object Model Enforcement**
   - implement canonical schema from V5_OBJECT_MODEL.md
   - enforce fields, enums, and relationships

2. **Validation Layer**
   - implement rules from V5_VALIDATION_AND_QUERY_LAYER.md
   - enforce validity and transitions

3. **Authority + Approval Enforcement**
   - implement rules from V5_AUTHORITY_AND_DOCTRINE.md

4. **Execution Logic**
   - implement workflows from V5_TASK_INITIATIVE_EXECUTION.md

5. **Projection Layers**
   - implement Desk and Staff UX surfaces
   - these must not alter underlying system logic

### Rule
Do not begin implementation in projection layers before contracts, validation, and authority are enforced.

---

## 11. Forbidden Moves

Do not:
- merge MegHQ with SkylerOS
- restart normalization
- restart truth recovery
- treat audit/history files as governing canon
- invent new architecture because something feels cleaner
- rewrite semantics from product intuition
- create shadow truth in notes or chat
- leave important truth only in conversation
- implement against non-canonical assumptions
- introduce new fields or enums without canonical alignment review

---

## 12. Allowed Change Types

MegHQ may change in only two ways:

1. **controlled implementation that obeys canonical contracts**
2. **deliberate canonical updates in governing canonical files**

Any other mode of change is drift.

---

## 13. Required First Response From A New AI

After reading the required files, the new AI must first respond with all of the following:

1. the current repo phase in one sentence
2. the MegHQ vs SkylerOS boundary
3. the canonical truth layer
4. the key alignment rules it will preserve
5. the next concrete task without proposing redesign

If it cannot do that, it has not read the repo correctly.

---

## 14. Practical Git Working Rule

This repository is branch-protected.

Changes must be made through branches and pull requests.

### Safe local workflow
- Set-Location "C:\MegHQ"
- git checkout main
- git fetch origin
- git reset --hard origin/main
- git checkout -b chore/real-change-name

Then make actual file changes, then:
- git status
- git add .
- git commit -m "Describe the actual change"
- git push -u origin chore/real-change-name
- gh pr create --base main --head chore/real-change-name --title "Describe the actual change" --body "Why this change is needed."
- gh pr merge --squash --delete-branch
- git checkout main
- git fetch origin
- git reset --hard origin/main

### Rule
Do not create PRs for branches with no actual file changes.

---

## 15. Bottom Line

MegHQ is already truth-locked.

The correct posture is:
- preserve canon
- preserve boundaries
- preserve authority
- preserve auditability
- preserve projection-vs-source separation
- implement carefully
- update canon deliberately when truly necessary

Any other mode of work is drift.

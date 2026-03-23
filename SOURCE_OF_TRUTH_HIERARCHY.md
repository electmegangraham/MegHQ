# Source Of Truth Hierarchy

## Conflict Resolution Order

### Tier 1 — Governing Canonical Repo Truth
The governing canonical system truth for MegHQ is the file set explicitly identified in:
- `CANONICAL_TRUTH_MAP.md`
- `CANONICAL_FILE_MANIFEST.md`

These governing canonical files define active system behavior, contracts, validation expectations, authority rules, implementation boundaries, and projection rules.

### Canonical Scope Clarification
The folder `docs/00_master/*` contains both:
- governing canonical specifications
- audit, diagnostic, and historical analysis files

Files in `docs/00_master/*` are not all equal in governing force merely because they share the same folder.

#### Governing Canonical Files
The files explicitly identified as governing canonical sources in:
- `CANONICAL_TRUTH_MAP.md`
- `CANONICAL_FILE_MANIFEST.md`

are the authoritative specifications for system behavior, contracts, and implementation.

These define the active system truth.

#### Audit, Diagnostic, and Historical Files
Audit or analysis files in `docs/00_master/*` may include:
- gap audits
- pre-hardening audits
- second-pass audits
- missing-truth analyses
- reconciliation-oriented review artifacts

These files are informative and historical unless explicitly designated as governing canonical files.

They may:
- identify gaps
- identify refinement opportunities
- justify implementation tasks
- justify deliberate canonical updates

They may not:
- override governing canonical files
- redefine active system contracts
- change repo phase
- justify restarting recovery or normalization

#### Conflict Rule
If an audit or analysis file appears to conflict with a governing canonical file, the governing canonical file wins.

Audit files may only result in:
- controlled implementation work
- deliberate canonical updates

### Canonical Precedence Within Governing Files
When two governing canonical files appear to conflict, resolve using:

1. Object + Contract Layer (`V5_OBJECT_MODEL.md`)
2. Authority + Validation Layer (`V5_AUTHORITY_AND_DOCTRINE.md`, `V5_VALIDATION_AND_QUERY_LAYER.md`)
3. Execution Logic (`V5_TASK_INITIATIVE_EXECUTION.md`)
4. Projection / UX (`V5_MEGANS_DESK_UX.md`, `V5_STAFF_MODE_UX.md`)

Lower layers must not override higher layers.

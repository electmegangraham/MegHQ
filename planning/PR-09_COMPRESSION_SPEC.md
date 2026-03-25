# PR-09 — Compression Spec

## Goal
Implement additive compression so MegHQ remains long-running safe without mutating canonical source rows.

## Required table
`compressed_artifacts`

Suggested fields:
- compressed_id
- project_id
- artifact_type (`memory_block` | `audit_block` | `checkpoint_block`)
- summary
- covers (jsonb array of covered source IDs)
- source_trace (jsonb)
- created_at

## Rules
- additive only
- raw rows remain canonical
- no destructive deletion
- recent rows stay uncompressed

## Thresholds
- memory entries: compress when count > 50 per project; keep latest 20 raw
- audit events: compress when count > 200 per project; keep latest 100 raw
- checkpoints: compress when count > 20 per project; keep latest 10 raw

## Required service
Create a compression service with:
- compressMemory(projectId)
- compressAudit(projectId)
- compressCheckpoints(projectId)

Each function must:
1. fetch rows above threshold
2. preserve the keep-window
3. summarize older rows
4. insert one or more rows into `compressed_artifacts`
5. leave source rows untouched

## Required route
`POST /compression/run`

The route should:
1. validate input
2. run compression for memory, audit, and checkpoints
3. return summary counts of what was compressed

## Validation criteria
- build passes
- typecheck passes
- route executes cleanly
- compressed rows are created
- raw rows remain untouched
- no bypass path introduced

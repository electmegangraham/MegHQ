# V5 Full Implementation Matrix (Deterministic)

## Object Model (from V5_OBJECT_MODEL.md)
- Define all core entities: Task, Initiative, Approval, Artifact, DeskItem, Person, Organization
- Fields: id, status, owner, timestamps, relationships
- Enums: status sets per object (must match canon exactly)
- Relationships: Task→Initiative, Approval→Artifact, DeskItem→SourceObject

## Validation (from V5_VALIDATION_AND_QUERY_LAYER.md)
- Required fields enforced
- Invalid state transitions rejected
- Query constraints enforced
- Audit logging required on mutation

## Authority (from V5_AUTHORITY_AND_DOCTRINE.md)
- Role-based permissions enforced
- No action without explicit authority
- Approval required for decision-class actions

## Execution (from V5_TASK_INITIATIVE_EXECUTION.md)
- Task lifecycle enforced
- Initiative lifecycle enforced
- Dependencies enforced
- No skipping states

## Projection (UX files)
- Desk = projection only
- Staff Mode = operational surface
- No projection mutates source-of-truth

## Rule
All implementation must map directly to these without adding or changing semantics.

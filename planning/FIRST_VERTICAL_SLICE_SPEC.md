# First Vertical Slice Spec

## Goal
Build one fully real end-to-end workflow:

Signal -> Initiative -> Task -> Approval -> Execution -> Desk

## Minimum real objects
- signal intake record
- initiative
- task
- approval
- desk item

## Minimum behavior
### Signal
- accepted through a real route
- persisted
- traceable

### Initiative
- created from the signal
- linked and persisted

### Task
- created under initiative
- governed by state machine

### Approval
- created when required
- blocks execution until approved

### Execution
- only allowed after validation + authority + approval + valid transition
- persists state changes

### Audit
- every step logged

### Checkpoint
- optional snapshot at execution

### Desk
- projection/surface that shows approval or resulting action

## Minimum UI
Keep it minimal:
- HQ panel shows signal / initiative / task
- Desk shows approval request or execution result

## Done when
- one real flow can run end-to-end
- approval actually blocks
- execution actually transitions state
- audit shows full trace
- desk reflects the flow
- no mocks

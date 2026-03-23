# MeganCampaignHQ V5 Decision Engine

## Status
Locked implementation-grade specification.

## Core Truth
The system does not guess what matters.

It scores, ranks, and explains.

---

# 1. Purpose

This subsystem determines:
- what surfaces
- what is prioritized
- what waits
- what escalates

---

# 2. Decision Inputs

Every candidate item is evaluated on:

- urgency
- strategic value
- risk level
- opportunity value
- deadline proximity
- authority relevance
- field proximity
- dependency blockage

---

# 3. Scoring Model

Each dimension is scored:

- urgency: 0–5
- strategic_value: 0–5
- risk: 0–5
- opportunity: 0–5
- deadline: 0–5
- authority: 0–5
- field: 0–5
- blockage: 0–5

---

# 4. Weighted Score

Default weights:

- urgency: 2.0
- strategic_value: 2.0
- risk: 2.5
- opportunity: 2.0
- deadline: 2.0
- authority: 3.0
- field: 1.5
- blockage: 2.5

FinalScore =
Σ(score × weight)

---

# 5. Override Rules

Override priority if:

- approval required → force surface
- critical risk → force interrupt
- Megan-specific decision → force surface
- deadline breach → force escalate

Overrides beat score.

---

# 6. Tie-Break Rules

If equal score:

1. authority relevance wins
2. deadline sooner wins
3. risk over opportunity
4. manager discretion last

---

# 7. Confidence Model

Each item must include:

- confidence: high / medium / low
- reason for confidence

Low confidence:
- stays in staff unless critical

---

# 8. Decision Outputs

Engine produces:

- priority rank
- surface decision (desk / staff / hold)
- escalation flag
- explanation

---

# 9. Explainability

Every decision must answer:

- why this ranked here
- what factors drove it
- what was overridden
- what is next

No black-box ranking.

---

# 10. Suppression Rules

Do NOT surface if:

- duplicate signal
- low score + no override
- already resolved
- no owner assigned

---

# 11. Recalculation

Scores must update when:

- new signal arrives
- deadline changes
- approval state changes
- risk/opportunity shifts

---

# 12. Failure Modes

- wrong priority
- stale scoring
- hidden high-risk item
- over-surfacing noise

Must be detected and corrected.

---

# 13. Lock Statement

Decision Engine governs attention.

It ensures:
- clarity
- prioritization
- explainability

No future system may:
- bypass scoring logic
- surface items without reasoning
- hide prioritization decisions

File:
docs/00_master/V5_DECISION_ENGINE.md

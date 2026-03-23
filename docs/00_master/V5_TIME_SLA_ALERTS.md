# MeganCampaignHQ V5 Time SLA Alerts

## Status
Locked implementation-grade specification.

## Core Truth
Time changes priority.
SLA enforces discipline.
Alerts protect execution.

---

# 1. Purpose

This subsystem defines:
- time classes
- SLA classes
- alert triggers
- escalation timing
- suppression rules

---

# 2. Time Classes

Every time-bound object must use one of:

- immediate
- same_day
- next_day
- this_week
- scheduled_window
- long_horizon

---

# 3. SLA Classes

SLA classes:

- critical
- high
- normal
- low

Default mapping:

- critical = immediate
- high = same_day
- normal = next_day
- low = this_week

---

# 4. Breach Rules

An SLA breach occurs when:
- due time passes
- no completion
- no approved extension
- no escalation recorded

Breach must generate:
- breach flag
- owner notice
- escalation candidate

---

# 5. Alert Levels

Alert levels:

- info
- warning
- urgent
- critical

---

# 6. Alert Triggers

Trigger alerts for:
- SLA breach
- deadline inside danger window
- approval stuck
- blocker on top-priority item
- risk severity increase
- required owner missing
- doctrine conflict
- system validation failure

---

# 7. Alert Routing

Route to:

- Desk if executive relevant
- Staff Mode if operational only
- both if shared consequence

---

# 8. Suppression Rules

Suppress alerts if:
- duplicate
- already acknowledged
- already resolved
- below threshold
- replaced by higher-priority alert

No alert spam.

---

# 9. Escalation Timing

Escalate on schedule:

- critical: immediate
- high: on breach
- normal: after grace window
- low: batch review

---

# 10. Grace Windows

Grace windows may exist only when:
- doctrine allows
- no critical risk
- owner exists
- extension is logged

No silent grace.

---

# 11. Reminder Rules

Reminders may exist before alerts:

- early reminder
- due-soon reminder
- breach alert

Reminders do not replace SLA enforcement.

---

# 12. Explainability

Every alert must answer:
- what triggered it
- why now
- who owns it
- what happens next

---

# 13. Failure Modes

- missed breach
- duplicate alert storm
- late escalation
- unresolved critical alert hidden in queue

Must be prevented.

---

# 14. Lock Statement

Time, SLA, and Alerts enforce execution rhythm.

Without them:
- deadlines slip
- blockers hide
- discipline weakens

File:
docs/00_master/V5_TIME_SLA_ALERTS.md

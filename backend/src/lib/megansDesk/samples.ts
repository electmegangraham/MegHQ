import type { DeskCard } from "./types.js";

export function getSampleDeskCards(): DeskCard[] {
  return [
    {
      id: "desk_decision_budget_1",
      type: "decision_prompt",
      title: "Budget release decision needed",
      status: "active",
      priorityBand: "A",
      executiveStateHint: "Decision Required",
      linkedObjectIds: ["initiative_budget_q2"],
      linkedApprovalIds: ["approval_budget_release_1"],
      canPin: true,
      canDismiss: true,
      canFile: true,
      canSnooze: true
    },
    {
      id: "desk_risk_field_1",
      type: "risk_alert",
      title: "Field escalation risk detected",
      status: "active",
      priorityBand: "A",
      executiveStateHint: "Interrupt",
      linkedObjectIds: ["blocker_field_event_1"],
      canPin: true,
      canDismiss: true,
      canFile: true,
      canSnooze: true
    },
    {
      id: "desk_brief_weekly_1",
      type: "executive_briefing",
      title: "Weekly executive briefing",
      status: "active",
      priorityBand: "B",
      executiveStateHint: "Review / File",
      linkedObjectIds: ["brief_weekly_exec_1"],
      linkedArtifactIds: ["artifact_exec_brief_1"],
      canPin: true,
      canDismiss: true,
      canFile: true,
      canSnooze: true
    }
  ];
}

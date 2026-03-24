import type { DecisionInput } from "./types.js";

export function getSampleDecisionInputs(): DecisionInput[] {
  return [
    { id: "budget_release", priority: "P0", urgency: "immediate", blocked: false, requiresApproval: true, confidence: 0.8 },
    { id: "field_risk", priority: "P0", urgency: "immediate", blocked: true, requiresApproval: false, confidence: 0.7 },
    { id: "weekly_brief", priority: "P2", urgency: "this_week", blocked: false, requiresApproval: false, confidence: 0.9 }
  ];
}

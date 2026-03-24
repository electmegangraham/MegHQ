import type { CampaignSignal } from "./types.js";

export function getSampleSignals(): CampaignSignal[] {
  return [
    { id: "signal_field_escalation", title: "Field escalation", priority: "P0", urgency: "immediate", isBlocked: true },
    { id: "signal_budget_release", title: "Budget release request", priority: "P1", urgency: "today", requiresApproval: true },
    { id: "signal_press_packet", title: "Press packet review", priority: "P1", urgency: "today", requiresApproval: true },
    { id: "signal_weekly_brief", title: "Weekly executive brief", priority: "P2", urgency: "this_week" },
    { id: "signal_low_noise", title: "Low-signal chatter", priority: "P3", urgency: "scheduled" },
    { id: "signal_optional_outreach", title: "Optional outreach idea", priority: "P3", urgency: "no_fixed_clock" }
  ];
}

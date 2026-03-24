import type { CampaignManagerDecision, CampaignSignal } from "./types.js";

function rank(signal: CampaignSignal): number {
  let score = 0;
  if (signal.isBlocked) score += 100;
  if (signal.requiresApproval) score += 50;
  if (signal.priority === "P0") score += 40;
  if (signal.priority === "P1") score += 30;
  if (signal.urgency === "immediate") score += 20;
  if (signal.urgency === "today") score += 10;
  return score;
}

export function runCampaignManager(signals: CampaignSignal[]): CampaignManagerDecision {
  const sorted = [...signals].sort((a, b) => rank(b) - rank(a));
  const surfaced = sorted.slice(0, 5);
  const suppressed = sorted.slice(5);

  return {
    orderedSignalIds: surfaced.map((s) => s.id),
    briefingIds: surfaced.map((s) => `brief_${s.id}`),
    suppressedSignalIds: suppressed.map((s) => s.id),
    explainability: surfaced.map(
      (s) => `${s.id}: blocked=${Boolean(s.isBlocked)}, approval=${Boolean(s.requiresApproval)}, priority=${s.priority ?? "none"}, urgency=${s.urgency ?? "none"}`
    ),
    reason: "Campaign Manager core prioritized signals using blocked/approval/priority/urgency ordering."
  };
}

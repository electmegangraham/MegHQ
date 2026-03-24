import type { LearningEvent, PreferenceSignal, RiskOpportunityItem } from "./types.js";

export function getSamplePreferenceSignals(): PreferenceSignal[] {
  return [
    { id: "pref_1", category: "format", value: "brief-first", confidence: 0.9 },
    { id: "pref_2", category: "timing", value: "morning-priority", confidence: 0.8 }
  ];
}

export function getSampleLearningEvents(): LearningEvent[] {
  return [
    { id: "learn_1", source: "weekly-brief", outcome: "positive", note: "Brief summary format performed well." },
    { id: "learn_2", source: "event-packet", outcome: "neutral", note: "Needs tighter routing." }
  ];
}

export function getSampleRiskOpportunityItems(): RiskOpportunityItem[] {
  return [
    { id: "risk_1", type: "risk", title: "Reputational exposure from field issue", severity: "critical", cadence: "immediate" },
    { id: "opp_1", type: "opportunity", title: "Regional endorsement opening", severity: "high", cadence: "today" },
    { id: "risk_2", type: "risk", title: "Late approval chain", severity: "moderate", cadence: "this_week" }
  ];
}

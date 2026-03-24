export interface PreferenceSignal {
  id: string;
  category: "message" | "timing" | "format" | "routing" | "tone";
  value: string;
  confidence: number;
}

export interface LearningEvent {
  id: string;
  source: string;
  outcome: "positive" | "negative" | "neutral";
  note?: string;
}

export interface RiskOpportunityItem {
  id: string;
  type: "risk" | "opportunity";
  title: string;
  severity: "low" | "moderate" | "high" | "critical";
  cadence: "immediate" | "today" | "this_week" | "scheduled";
}

export interface PreferenceLearningResult {
  preferenceSignals: PreferenceSignal[];
  learningEvents: LearningEvent[];
  surfacedItems: RiskOpportunityItem[];
  reason: string;
}

import type { LearningEvent, PreferenceLearningResult, PreferenceSignal, RiskOpportunityItem } from "./types.js";

export function buildPreferenceLearningResult(
  preferenceSignals: PreferenceSignal[],
  learningEvents: LearningEvent[],
  items: RiskOpportunityItem[]
): PreferenceLearningResult {
  const surfacedItems = [...items].sort((a, b) => {
    const sevOrder = { critical: 4, high: 3, moderate: 2, low: 1 };
    const cadenceOrder = { immediate: 4, today: 3, this_week: 2, scheduled: 1 };
    const sevDiff = sevOrder[b.severity] - sevOrder[a.severity];
    if (sevDiff !== 0) return sevDiff;
    return cadenceOrder[b.cadence] - cadenceOrder[a.cadence];
  });

  return {
    preferenceSignals,
    learningEvents,
    surfacedItems,
    reason: "Preference/learning starter built from confidence, outcome, severity, and cadence placeholders."
  };
}

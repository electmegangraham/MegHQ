export interface CampaignSignal {
  id: string;
  title: string;
  priority?: string;
  urgency?: string;
  requiresApproval?: boolean;
  isBlocked?: boolean;
  sourceTrace?: Record<string, unknown> | null;
}

export interface CampaignManagerDecision {
  orderedSignalIds: string[];
  briefingIds: string[];
  suppressedSignalIds: string[];
  explainability: string[];
  reason: string;
}

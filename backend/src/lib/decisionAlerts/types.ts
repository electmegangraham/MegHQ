export interface DecisionInput {
  id: string;
  priority?: string;
  urgency?: string;
  blocked?: boolean;
  requiresApproval?: boolean;
  confidence?: number;
}

export interface DecisionResult {
  id: string;
  score: number;
  classification: "decide_now" | "review_soon" | "monitor";
  reason: string;
}

export interface AlertResult {
  id: string;
  level: "info" | "warning" | "critical";
  slaState: "within_sla" | "warning" | "breached";
  reason: string;
}

export type DeskViewType =
  | "decision_prompt"
  | "approval_request"
  | "executive_briefing"
  | "risk_alert"
  | "opportunity_alert"
  | "blocked_work_escalation"
  | "prep_packet"
  | "strategic_comparison";

export interface DeskCard {
  id: string;
  type: DeskViewType;
  title: string;
  status: string;
  priorityBand?: string;
  executiveStateHint?: string;
  linkedObjectIds: string[];
  linkedArtifactIds?: string[];
  linkedApprovalIds?: string[];
  canPin?: boolean;
  canDismiss?: boolean;
  canFile?: boolean;
  canSnooze?: boolean;
}

export interface DeskViewResponse {
  cards: DeskCard[];
  clutterProtectionRule: string;
  reason: string;
}

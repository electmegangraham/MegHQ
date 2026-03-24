export type TaskStatus =
  | "captured" | "normalized" | "routed" | "accepted" | "in_progress" | "blocked"
  | "awaiting_review" | "awaiting_approval" | "complete" | "cancelled" | "archived";
export type TaskPriority = "P0" | "P1" | "P2" | "P3";
export type TaskUrgency = "immediate" | "today" | "this_week" | "scheduled" | "no_fixed_clock";
export type SlaBreachState = "within_sla" | "warning" | "breached";
export type InitiativeStatus = "proposed" | "active" | "blocked" | "awaiting_review" | "awaiting_approval" | "complete" | "cancelled" | "archived";
export type BlockerStatus = "open" | "mitigating" | "resolved" | "archived";
export type BlockerSeverity = "low" | "moderate" | "high" | "critical";
export type HandoffStatus = "proposed" | "accepted" | "rejected" | "cancelled" | "completed";
export type CollaborationState =
  | "not_needed" | "proposed" | "requested" | "accepted" | "in_progress"
  | "waiting_on_support" | "blocked" | "needs_manager_resolution"
  | "needs_Megan_resolution" | "completed" | "cancelled";
export type ApprovalType =
  | "publish" | "message_release" | "budget_release" | "strategy_decision"
  | "event_go_decision" | "compliance_signoff" | "external_distribution"
  | "executive_review" | "other_protected_action";
export type ApprovalStatus =
  | "pending" | "approved" | "rejected"
  | "draft" | "requested" | "under_review"
  | "expired" | "cancelled" | "invalidated" | "archived";
export type ArtifactType =
  | "memo" | "brief" | "message" | "statement" | "press_guidance"
  | "fundraising_asset" | "event_packet" | "research_packet" | "decision_packet"
  | "other_work_product";
export type ArtifactStatus = "draft" | "in_review" | "approval_pending" | "approved" | "published" | "superseded" | "archived";
export type ArtifactMaturity = "rough" | "working" | "review_ready" | "approval_ready" | "final";
export type DeskItemType =
  | "approval_request" | "decision_prompt" | "risk_alert" | "opportunity_alert"
  | "briefing" | "prep_packet" | "blocked_work_escalation"
  | "strategic_comparison" | "executive_summary_card";
export type DeskItemStatus = "active" | "pinned" | "dismissed" | "filed" | "snoozed" | "resolved" | "archived";

export interface BaseRecord {
  id: string;
  source_type?: string | null;
  source_trace?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

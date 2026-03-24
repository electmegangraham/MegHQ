export type WorkflowObjectType = "task" | "initiative" | "approval" | "artifact" | "desk_item";

export interface TransitionRequest {
  objectType: WorkflowObjectType;
  currentStatus: string;
  nextStatus: string;
  hasOpenBlocker?: boolean | undefined;
  hasRequiredApproval?: boolean | undefined;
  hasCompletionEvidence?: boolean | undefined;
  sourceTrace?: Record<string, unknown> | null | undefined;
}

export interface TransitionResult {
  allowed: boolean;
  objectType: WorkflowObjectType;
  currentStatus: string;
  nextStatus: string;
  reason: string;
  sourceTrace?: Record<string, unknown> | null | undefined;
}

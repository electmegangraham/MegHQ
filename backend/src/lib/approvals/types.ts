export type ApprovalDecisionStatus = "pending" | "approved" | "rejected";

export interface ApprovalRecord {
  approvalId: string;
  actionType: string;
  resourceType: string;
  resourceId?: string;
  status: ApprovalDecisionStatus;
  requestedBy: string;
  decidedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApprovalInput {
  actionType: string;
  resourceType: string;
  resourceId?: string;
  requestedBy: string;
}

export interface DecideApprovalInput {
  approvalId: string;
  status: Exclude<ApprovalDecisionStatus, "pending">;
  decidedBy: string;
}

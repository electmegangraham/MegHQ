import type { ApprovalRecord } from "./types.js";

export function toApprovalRequestedAuditEvent(record: ApprovalRecord) {
  return {
    event_type: "approval_requested",
    actor_type: "system",
    payload: {
      approvalId: record.approvalId,
      actionType: record.actionType,
      resourceType: record.resourceType,
      resourceId: record.resourceId,
      status: record.status,
      requestedBy: record.requestedBy
    }
  };
}

export function toApprovalDecisionAuditEvent(record: ApprovalRecord) {
  return {
    event_type: "approval_decided",
    actor_type: "user",
    payload: {
      approvalId: record.approvalId,
      actionType: record.actionType,
      resourceType: record.resourceType,
      resourceId: record.resourceId,
      status: record.status,
      requestedBy: record.requestedBy,
      decidedBy: record.decidedBy
    }
  };
}

import { createApproval, decideApproval, getApprovalById } from "./repository.js";
import type { ApprovalRecord } from "./types.js";
import type { AuthorityInput } from "../authority/types.js";

export async function ensureApprovalForAuthority(input: AuthorityInput): Promise<ApprovalRecord> {
  const requestedBy = input.actor.id;
  const actionType = input.action;
  const resourceType = input.resource.type;
  const resourceId = input.resource.id;

  const existingApprovalId = input.context?.["approvalId"];
  if (typeof existingApprovalId === "string") {
    const existing = await getApprovalById(existingApprovalId);
    if (existing) {
      return existing;
    }
  }

  return createApproval({
    actionType,
    resourceType,
    ...(resourceId ? { resourceId } : {}),
    requestedBy
  });
}

export async function resolveApprovalStatus(input: AuthorityInput): Promise<ApprovalRecord | null> {
  const approvalId = input.context?.["approvalId"];
  if (typeof approvalId !== "string" || approvalId.trim().length === 0) {
    return null;
  }

  return getApprovalById(approvalId);
}

export async function recordApprovalDecision(approvalId: string, status: "approved" | "rejected", decidedBy: string) {
  return decideApproval({ approvalId, status, decidedBy });
}

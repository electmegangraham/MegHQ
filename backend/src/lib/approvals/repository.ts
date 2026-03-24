import { getDbClient } from "../db/client.js";
import type { ApprovalRecord, CreateApprovalInput, DecideApprovalInput } from "./types.js";

function mapStatus(value: string | null | undefined): ApprovalRecord["status"] {
  if (value === "approved" || value === "rejected") {
    return value;
  }
  return "pending";
}

function mapRow(row: Record<string, unknown>): ApprovalRecord {
  return {
    approvalId: String(row["approval_id"] ?? row["id"]),
    actionType: String(row["action_type"] ?? row["approval_type"] ?? "other_protected_action"),
    resourceType: String(row["resource_type"] ?? "unknown"),
    ...(row["resource_id"] ? { resourceId: String(row["resource_id"]) } : {}),
    status: mapStatus(row["status"] as string | null | undefined),
    requestedBy: String(row["requested_by"] ?? row["requested_by_id"] ?? "unknown"),
    ...(row["decided_by"] ? { decidedBy: String(row["decided_by"]) } : {}),
    createdAt: String(row["created_at"] ?? new Date().toISOString()),
    updatedAt: String(row["updated_at"] ?? new Date().toISOString())
  };
}

export async function createApproval(input: CreateApprovalInput): Promise<ApprovalRecord> {
  const db = getDbClient();
  const now = new Date().toISOString();

  const insertRow = {
    approval_type: "other_protected_action",
    action_type: input.actionType,
    resource_type: input.resourceType,
    resource_id: input.resourceId ?? null,
    status: "pending",
    requested_by: input.requestedBy,
    decided_by: null,
    requested_by_id: null,
    requested_from_id: null,
    linked_object_ids: input.resourceId ? [input.resourceId] : [],
    rationale: "Auto-created by authority enforcement.",
    source_type: "authority",
    source_trace: {
      actionType: input.actionType,
      resourceType: input.resourceType,
      resourceId: input.resourceId ?? null,
      requestedBy: input.requestedBy
    },
    created_at: now,
    updated_at: now
  };

  const { data, error } = await db
    .from("approvals")
    .insert(insertRow)
    .select("id, approval_id, action_type, approval_type, resource_type, resource_id, status, requested_by, requested_by_id, decided_by, created_at, updated_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create approval: ${error?.message ?? "Unknown insert error"}`);
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

export async function getApprovalById(approvalId: string): Promise<ApprovalRecord | null> {
  const db = getDbClient();

  const { data, error } = await db
    .from("approvals")
    .select("id, approval_id, action_type, approval_type, resource_type, resource_id, status, requested_by, requested_by_id, decided_by, created_at, updated_at")
    .or(`approval_id.eq.${approvalId},id.eq.${approvalId}`)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load approval: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

export async function decideApproval(input: DecideApprovalInput): Promise<ApprovalRecord> {
  const db = getDbClient();
  const status = input.status;
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("approvals")
    .update({
      status,
      decided_by: input.decidedBy,
      updated_at: now,
      decision_record: {
        status,
        decidedBy: input.decidedBy,
        decidedAt: now
      }
    })
    .or(`approval_id.eq.${input.approvalId},id.eq.${input.approvalId}`)
    .select("id, approval_id, action_type, approval_type, resource_type, resource_id, status, requested_by, requested_by_id, decided_by, created_at, updated_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to update approval: ${error?.message ?? "Unknown update error"}`);
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

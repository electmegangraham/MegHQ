import { getDbClient } from "../db/client.js";
import { enforceExecutionTransition } from "./enforce.js";
import type { TransitionRequest, WorkflowObjectType } from "./types.js";

type TableName =
  | "tasks"
  | "initiatives"
  | "approvals"
  | "artifacts"
  | "desk_items";

const TABLE_BY_OBJECT_TYPE: Record<WorkflowObjectType, TableName> = {
  task: "tasks",
  initiative: "initiatives",
  approval: "approvals",
  artifact: "artifacts",
  desk_item: "desk_items"
};

type PersistInput = {
  objectId: string;
  objectType: WorkflowObjectType;
  nextStatus: string;
  hasOpenBlocker?: boolean;
  hasRequiredApproval?: boolean;
  hasCompletionEvidence?: boolean;
};

export async function persistTransition(input: PersistInput) {
  const db = getDbClient();
  const tableName = TABLE_BY_OBJECT_TYPE[input.objectType];

  const { data: current, error } = await db
    .from(tableName)
    .select("status, source_trace")
    .eq("id", input.objectId)
    .single();

  if (error || !current) {
    throw new Error(`Failed to load current ${input.objectType}: ${error?.message ?? "Unknown error"}`);
  }

  const transitionInput: TransitionRequest = {
    objectType: input.objectType,
    currentStatus: String((current as any).status),
    nextStatus: input.nextStatus,
    hasOpenBlocker: input.hasOpenBlocker,
    hasRequiredApproval: input.hasRequiredApproval,
    hasCompletionEvidence: input.hasCompletionEvidence,
    sourceTrace: ((current as any).source_trace ?? null) as Record<string, unknown> | null
  };

  const result = enforceExecutionTransition(transitionInput);

  const { error: updateError } = await db
    .from(tableName)
    .update({
      status: input.nextStatus,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.objectId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return {
    persisted: true,
    result
  };
}

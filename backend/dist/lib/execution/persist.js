import { getDbClient } from "../db/client.js";
import { evaluateTransition } from "./rules.js";
const TABLE_BY_OBJECT_TYPE = {
    task: "tasks",
    initiative: "initiatives",
    approval: "approvals",
    artifact: "artifacts",
    desk_item: "desk_items"
};
function buildNextSourceTrace(existingSourceTrace, input, persistedAt) {
    return {
        ...(existingSourceTrace ?? {}),
        lastExecutionTransition: {
            objectType: input.objectType,
            from: input.currentStatus,
            to: input.nextStatus,
            persistedAt
        }
    };
}
function buildUpdatePatch(objectType, nextStatus, nextSourceTrace, persistedAt) {
    const patch = {
        status: nextStatus,
        source_trace: nextSourceTrace,
        updated_at: persistedAt
    };
    if ((objectType === "task" || objectType === "initiative") && nextStatus === "complete") {
        patch.completed_at = persistedAt;
    }
    if (objectType === "task" && nextStatus === "in_progress") {
        patch.started_at = persistedAt;
    }
    if (objectType === "initiative" && nextStatus === "active") {
        patch.started_at = persistedAt;
    }
    if (objectType === "artifact" && nextStatus === "published") {
        patch.published_at = persistedAt;
    }
    if (objectType === "desk_item" && nextStatus === "dismissed") {
        patch.dismissed_at = persistedAt;
    }
    if (objectType === "desk_item" && nextStatus === "filed") {
        patch.filed_at = persistedAt;
    }
    return patch;
}
export async function persistTransition(input) {
    const db = getDbClient();
    const tableName = TABLE_BY_OBJECT_TYPE[input.objectType];
    const { data: currentRow, error: currentError } = await db
        .from(tableName)
        .select("status,source_trace")
        .eq("id", input.objectId)
        .single();
    if (currentError || !currentRow) {
        throw new Error(`Failed to load current ${input.objectType}: ${currentError?.message ?? "Unknown error"}`);
    }
    const row = currentRow;
    const transitionInput = {
        objectType: input.objectType,
        currentStatus: row.status,
        nextStatus: input.nextStatus,
        hasOpenBlocker: input.hasOpenBlocker,
        hasRequiredApproval: input.hasRequiredApproval,
        hasCompletionEvidence: input.hasCompletionEvidence,
        sourceTrace: row.source_trace
    };
    const transition = evaluateTransition(transitionInput);
    if (!transition.allowed) {
        return {
            persisted: false,
            objectId: input.objectId,
            tableName,
            transition
        };
    }
    const persistedAt = new Date().toISOString();
    const nextSourceTrace = buildNextSourceTrace(row.source_trace, transitionInput, persistedAt);
    const patch = buildUpdatePatch(input.objectType, input.nextStatus, nextSourceTrace, persistedAt);
    const { error: updateError } = await db
        .from(tableName)
        .update(patch)
        .eq("id", input.objectId);
    if (updateError) {
        throw new Error(`Failed to persist ${input.objectType} transition: ${updateError.message}`);
    }
    return {
        persisted: true,
        objectId: input.objectId,
        tableName,
        transition: {
            ...transition,
            sourceTrace: nextSourceTrace
        }
    };
}

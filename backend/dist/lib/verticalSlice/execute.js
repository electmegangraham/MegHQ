import { getDbClient } from "../db/client.js";
function isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function buildSourceTrace(request) {
    return {
        sourceType: "vertical_slice",
        signalId: request.signalId,
        signalTitle: request.signalTitle,
        inheritedSourceTrace: request.sourceTrace ?? null
    };
}
export async function executeVerticalSlice(request) {
    const db = getDbClient();
    const sourceTrace = buildSourceTrace(request);
    const { data: initiative, error: initiativeError } = await db
        .from("initiatives")
        .insert({
        title: request.initiativeTitle,
        owner_id: request.ownerId,
        lead_department_id: request.leadDepartmentId,
        status: "active",
        source_type: "vertical_slice",
        source_trace: sourceTrace
    })
        .select("id,status")
        .single();
    if (initiativeError || !initiative) {
        throw new Error(`Failed to create initiative: ${initiativeError?.message ?? "Unknown error"}`);
    }
    const { data: task, error: taskError } = await db
        .from("tasks")
        .insert({
        title: request.taskTitle,
        initiative_id: initiative.id,
        owner_id: request.ownerId,
        lead_department_id: request.leadDepartmentId,
        status: "accepted",
        approval_ids: request.approvalId && isUuid(request.approvalId) ? [request.approvalId] : [],
        source_type: "vertical_slice",
        source_trace: sourceTrace
    })
        .select("id,status")
        .single();
    if (taskError || !task) {
        throw new Error(`Failed to create task: ${taskError?.message ?? "Unknown error"}`);
    }
    const linkedArtifactIds = request.artifactId && isUuid(request.artifactId) ? [request.artifactId] : [];
    const linkedApprovalIds = request.approvalId && isUuid(request.approvalId) ? [request.approvalId] : [];
    const { data: deskItem, error: deskItemError } = await db
        .from("desk_items")
        .insert({
        desk_item_type: "briefing",
        status: "active",
        linked_object_ids: [initiative.id, task.id],
        linked_artifact_ids: linkedArtifactIds,
        linked_approval_ids: linkedApprovalIds,
        source_trace: sourceTrace,
        executive_state_hint: "active_work"
    })
        .select("id,status")
        .single();
    if (deskItemError || !deskItem) {
        throw new Error(`Failed to create desk item: ${deskItemError?.message ?? "Unknown error"}`);
    }
    const created = {
        signalId: request.signalId,
        initiativeId: initiative.id,
        taskId: task.id,
        deskItemId: deskItem.id
    };
    if (request.artifactId) {
        created.artifactId = request.artifactId;
    }
    if (request.approvalId) {
        created.approvalId = request.approvalId;
    }
    return {
        ok: true,
        created,
        states: {
            initiativeStatus: initiative.status,
            taskStatus: task.status,
            deskItemStatus: deskItem.status
        },
        reason: "Vertical slice now persists initiative, task, and desk item records in Supabase.",
        sourceTrace
    };
}

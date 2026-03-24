import { getDbClient } from "../db/client.js";
const ACTIVE_TASK_STATUSES = [
    "captured",
    "normalized",
    "routed",
    "accepted",
    "in_progress",
    "blocked",
    "awaiting_review",
    "awaiting_approval"
];
export async function loadCampaignSignals() {
    const db = getDbClient();
    const { data, error } = await db
        .from("tasks")
        .select("id,title,priority,urgency,status,blocker_ids,approval_ids,source_trace,updated_at")
        .in("status", [...ACTIVE_TASK_STATUSES])
        .order("updated_at", { ascending: false })
        .limit(50);
    if (error) {
        throw new Error(`Failed to load campaign signals: ${error.message}`);
    }
    const rows = (data ?? []);
    return rows.map((row) => {
        const signal = {
            id: row.id,
            title: row.title,
            requiresApproval: row.status === "awaiting_approval" || (row.approval_ids?.length ?? 0) > 0,
            isBlocked: row.status === "blocked" || (row.blocker_ids?.length ?? 0) > 0,
            sourceTrace: row.source_trace ?? null
        };
        if (row.priority) {
            signal.priority = row.priority;
        }
        if (row.urgency) {
            signal.urgency = row.urgency;
        }
        return signal;
    });
}

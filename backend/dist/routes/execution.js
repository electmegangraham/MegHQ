import { persistTransition } from "../lib/execution/persist.js";
import { toLifecycleAuditEvent } from "../lib/execution/audit.js";
export function registerExecutionRoutes(app) {
    app.post("/execution/transition", async (request, reply) => {
        try {
            const payload = request.body;
            const persisted = await persistTransition(payload);
            const auditEvent = toLifecycleAuditEvent({
                objectType: persisted.transition.objectType,
                currentStatus: persisted.transition.currentStatus,
                nextStatus: persisted.transition.nextStatus,
                hasOpenBlocker: payload.hasOpenBlocker,
                hasRequiredApproval: payload.hasRequiredApproval,
                hasCompletionEvidence: payload.hasCompletionEvidence,
                sourceTrace: persisted.transition.sourceTrace
            }, persisted.transition);
            return reply
                .code(persisted.transition.allowed ? 200 : 422)
                .send({
                result: persisted.transition,
                persisted: persisted.persisted,
                objectId: persisted.objectId,
                tableName: persisted.tableName,
                auditEvent
            });
        }
        catch (error) {
            return reply.code(500).send({
                ok: false,
                error: error instanceof Error ? error.message : "Unknown execution transition error"
            });
        }
    });
}

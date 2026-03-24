import { validateRequiredFields, validateEnum } from "../lib/validation/rules.js";
import { toValidationAuditEvent } from "../lib/validation/audit.js";
const TASK_STATUS = [
    "captured", "normalized", "routed", "accepted", "in_progress", "blocked",
    "awaiting_review", "awaiting_approval", "complete", "cancelled", "archived"
];
export function registerValidationRoutes(app) {
    app.post("/validation/task", async (request, reply) => {
        const payload = request.body;
        const required = validateRequiredFields("task", payload, ["title", "initiative_id", "owner_id", "status"]);
        if (!required.ok) {
            return reply.code(422).send({ result: required, auditEvent: toValidationAuditEvent(required) });
        }
        const status = validateEnum("task", payload, "status", TASK_STATUS);
        if (!status.ok) {
            return reply.code(422).send({ result: status, auditEvent: toValidationAuditEvent(status) });
        }
        return reply.send({ result: status, auditEvent: null });
    });
}

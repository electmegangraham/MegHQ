import { checkAuthority } from "../lib/authority/rules.js";
import { toAuthorityAuditEvent } from "../lib/authority/audit.js";
export function registerAuthorityRoutes(app) {
    app.post("/authority/check", async (request, reply) => {
        const payload = request.body;
        const result = checkAuthority(payload);
        const auditEvent = toAuthorityAuditEvent(payload, result);
        return reply.code(result.allowed ? 200 : 403).send({ result, auditEvent });
    });
}

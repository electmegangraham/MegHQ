import type { FastifyInstance } from "fastify";
import { checkAuthority } from "../lib/authority/rules.js";
import { toAuthorityAuditEvent } from "../lib/authority/audit.js";

export function registerAuthorityRoutes(app: FastifyInstance) {
  app.post("/authority/check", async (request, reply) => {
    const payload = request.body as {
      actorRole: "Megan" | "ExecutiveDelegate" | "CampaignManager" | "DepartmentLead" | "Staff" | "System";
      decisionClass:
        | "Class A - Executive Final"
        | "Class B - Executive Review / Approval"
        | "Class C - Manager Governed"
        | "Class D - Department Governed"
        | "Class E - Automated / System Action";
      action: string;
      approvalStatus?: string | null;
      approvalRequired?: boolean;
    };

    const result = checkAuthority(payload);
    const auditEvent = toAuthorityAuditEvent(payload, result);
    return reply.code(result.allowed ? 200 : 403).send({ result, auditEvent });
  });
}

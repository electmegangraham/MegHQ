
import type { FastifyInstance } from "fastify";
import { persistAuditEvent } from "../lib/audit/persist.js";
import { toApprovalDecisionAuditEvent, toApprovalRequestedAuditEvent } from "../lib/approvals/audit.js";
import { ensureApprovalForAuthority, recordApprovalDecision, resolveApprovalStatus } from "../lib/approvals/service.js";
import { checkAuthority } from "../lib/authority/rules.js";
import type { AuthorityInput } from "../lib/authority/types.js";

export function registerAuthorityRoutes(app: FastifyInstance) {
  app.post("/authority/check", async (request, reply) => {
    const payload = request.body as AuthorityInput;

    const resolvedApproval = await resolveApprovalStatus(payload);
    const effectivePayload: AuthorityInput = resolvedApproval
      ? {
          ...payload,
          context: {
            ...(payload.context ?? {}),
            approvalId: resolvedApproval.approvalId,
            approvalStatus: resolvedApproval.status
          }
        }
      : payload;

    const result = checkAuthority(effectivePayload);

    if (result.requiresApproval) {
      const approval = await ensureApprovalForAuthority(effectivePayload);
      await persistAuditEvent(toApprovalRequestedAuditEvent(approval));

      return reply.code(200).send({
        result: {
          ...result,
          approvalId: approval.approvalId
        }
      });
    }

    return reply.code(result.allowed ? 200 : 403).send({ result });
  });

  app.post("/authority/approvals/:approvalId/decision", async (request, reply) => {
    const params = request.params as { approvalId: string };
    const body = request.body as { status: "approved" | "rejected"; decidedBy: string };

    if (!body || (body.status !== "approved" && body.status !== "rejected") || !body.decidedBy) {
      return reply.code(400).send({
        error: {
          code: "INVALID_APPROVAL_DECISION",
          message: "status must be approved or rejected, and decidedBy is required.",
          details: {}
        }
      });
    }

    const approval = await recordApprovalDecision(params.approvalId, body.status, body.decidedBy);
    await persistAuditEvent(toApprovalDecisionAuditEvent(approval));

    return reply.code(200).send({ result: approval });
  });
}

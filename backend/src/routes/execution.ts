import type { FastifyInstance } from "fastify";
import { evaluateTransition } from "../lib/execution/rules.js";
import { toLifecycleAuditEvent } from "../lib/execution/audit.js";

export function registerExecutionRoutes(app: FastifyInstance) {
  app.post("/execution/transition", async (request, reply) => {
    const payload = request.body as {
      objectType: "task" | "initiative" | "approval" | "artifact" | "desk_item";
      currentStatus: string;
      nextStatus: string;
      hasOpenBlocker?: boolean;
      hasRequiredApproval?: boolean;
      hasCompletionEvidence?: boolean;
      sourceTrace?: Record<string, unknown> | null;
    };

    const result = evaluateTransition(payload);
    const auditEvent = toLifecycleAuditEvent(payload, result);

    return reply.code(result.allowed ? 200 : 422).send({ result, auditEvent });
  });
}

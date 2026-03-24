import type { FastifyInstance } from "fastify";
import { runVerticalSlice } from "../lib/verticalSlice/orchestrate.js";
import { toVerticalSliceAuditEvent } from "../lib/verticalSlice/audit.js";

export function registerVerticalSliceRoutes(app: FastifyInstance) {
  app.post("/vertical-slice/run", async (request, reply) => {
    const payload = request.body as {
      signalId: string;
      signalTitle: string;
      initiativeTitle: string;
      taskTitle: string;
      ownerId: string;
      leadDepartmentId: string;
      artifactId?: string;
      approvalId?: string;
      sourceTrace?: Record<string, unknown> | null;
    };

    const result = runVerticalSlice(payload);
    const auditEvent = toVerticalSliceAuditEvent(payload, result);

    return reply.code(result.ok ? 200 : 422).send({ result, auditEvent });
  });
}

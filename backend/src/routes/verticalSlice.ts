import type { FastifyInstance } from "fastify";
import { executeVerticalSlice } from "../lib/verticalSlice/execute.js";
import { toVerticalSliceAuditEvent } from "../lib/verticalSlice/audit.js";

export function registerVerticalSliceRoutes(app: FastifyInstance) {
  app.post("/vertical-slice/run", async (request, reply) => {
    try {
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

      const result = await executeVerticalSlice(payload);
      const auditEvent = toVerticalSliceAuditEvent(payload, result);

      return reply.send({ result, auditEvent });
    } catch (error) {
      return reply.code(500).send({
        ok: false,
        error: error instanceof Error ? error.message : "Unknown vertical slice error"
      });
    }
  });
}

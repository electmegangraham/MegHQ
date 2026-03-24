
import type { FastifyInstance } from "fastify";
import { persistAuditEvent } from "../lib/audit/persist.js";

export function registerAuditRoutes(app: FastifyInstance) {
  app.post("/audit/log", async (request, reply) => {
    try {
      const payload = request.body as Record<string, unknown>;
      const result = await persistAuditEvent(payload);
      return reply.send({ result });
    } catch (error) {
      return reply.code(500).send({
        ok: false,
        error: error instanceof Error ? error.message : "Unknown audit error"
      });
    }
  });
}

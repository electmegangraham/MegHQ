import type { FastifyInstance } from "fastify";
import { persistAuditEvent } from "../lib/audit/persist.js";

export function registerAuditRoutes(app: FastifyInstance) {
  app.post("/audit/log", async (request, reply) => {
    try {
      const payload = request.body as {
        event_type: string;
        actor_type: string;
        payload?: Record<string, unknown>;
        created_at?: string;
      };

      const result = await persistAuditEvent({
        event_type: payload.event_type,
        actor_type: payload.actor_type,
        ...(payload.payload !== undefined ? { payload: payload.payload } : {}),
        ...(payload.created_at !== undefined ? { created_at: payload.created_at } : {})
      });

      return reply.code(200).send(result);
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "AUDIT_LOG_FAILED",
          message: error instanceof Error ? error.message : "Unknown audit log error",
          details: {}
        }
      });
    }
  });
}

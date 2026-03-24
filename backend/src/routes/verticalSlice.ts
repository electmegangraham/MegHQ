
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { enforceValidation } from "../lib/validation/enforce.js";
import { enforceAuthority } from "../lib/authority/enforce.js";
import { enforceExecution } from "../lib/execution/enforce.js";

export async function registerVerticalSliceRoutes(app: FastifyInstance) {
  app.post("/vertical-slice/run", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as Record<string, unknown>;

      enforceValidation(body);
      enforceAuthority();
      enforceExecution("new", "in_progress");

      return reply.send({ ok: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return reply.code(400).send({ ok: false, error: message });
    }
  });
}

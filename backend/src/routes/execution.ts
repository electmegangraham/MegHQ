
import type { FastifyInstance, FastifyReply } from "fastify";
import { persistTransition } from "../lib/execution/persist.js";
import { enforceAuthority } from "../lib/authority/enforce.js";
import type { AuthorityInput } from "../lib/authority/types.js";

export function registerExecutionRoutes(app: FastifyInstance) {
  app.post("/execution/transition", async (request, reply) => {
    try {
      const payload = request.body as {
        authority?: AuthorityInput;
        objectId: string;
        objectType: string;
        nextStatus: string;
      };

      if (!payload.authority) {
        return reply.code(400).send({
          error: {
            code: "AUTHORITY_INPUT_REQUIRED",
            message: "Authority input is required.",
            details: {}
          }
        });
      }

      enforceAuthority(payload.authority);

      const result = await persistTransition(payload);

      return reply.code(200).send(result);
    } catch (error: any) {
      return reply.code(error.statusCode || 500).send({
        error: {
          code: error.code || "EXECUTION_FAILED",
          message: error.message,
          details: error.details || {}
        }
      });
    }
  });
}

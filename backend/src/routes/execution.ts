
import type { FastifyInstance } from "fastify";
import { persistTransition } from "../lib/execution/persist.js";
import { enforceAuthority } from "../lib/authority/enforce.js";
import type { AuthorityInput } from "../lib/authority/types.js";
import type { WorkflowObjectType } from "../lib/execution/types.js";
import { getStoredIdempotentResponse, storeIdempotentResponse } from "../lib/idempotency/service.js";

export function registerExecutionRoutes(app: FastifyInstance) {
  app.post("/execution/transition", async (request, reply) => {
    try {
      const payload = request.body as {
        authority?: AuthorityInput;
        objectId: string;
        objectType: WorkflowObjectType;
        nextStatus: string;
        hasOpenBlocker?: boolean;
        hasRequiredApproval?: boolean;
        hasCompletionEvidence?: boolean;
      };

      const idempotencyKey = request.headers["x-idempotency-key"];
      const routeKey = "POST:/execution/transition";

      if (typeof idempotencyKey === "string" && idempotencyKey.trim().length > 0) {
        const existing = await getStoredIdempotentResponse(idempotencyKey, routeKey);
        if (existing) {
          return reply.code(existing.responseCode).send(existing.responseBody);
        }
      }

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

      const responseBody = await persistTransition({
        objectId: payload.objectId,
        objectType: payload.objectType,
        nextStatus: payload.nextStatus,
        ...(payload.hasOpenBlocker !== undefined ? { hasOpenBlocker: payload.hasOpenBlocker } : {}),
        ...(payload.hasRequiredApproval !== undefined ? { hasRequiredApproval: payload.hasRequiredApproval } : {}),
        ...(payload.hasCompletionEvidence !== undefined ? { hasCompletionEvidence: payload.hasCompletionEvidence } : {})
      });

      if (typeof idempotencyKey === "string" && idempotencyKey.trim().length > 0) {
        await storeIdempotentResponse(idempotencyKey, routeKey, 200, responseBody as unknown as Record<string, unknown>);
      }

      return reply.code(200).send(responseBody);
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

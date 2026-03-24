import type { FastifyInstance, FastifyReply } from "fastify";
import { persistTransition } from "../lib/execution/persist.js";
import { toLifecycleAuditEvent } from "../lib/execution/audit.js";
import { enforceAuthority } from "../lib/authority/enforce.js";
import type {
  AuthorityApprovalRequiredError,
  AuthorityDeniedError,
  AuthorityInput
} from "../lib/authority/types.js";

function sendAuthorityError(
  error: AuthorityDeniedError | AuthorityApprovalRequiredError,
  reply: FastifyReply
) {
  return reply.code(error.statusCode).send({
    error: {
      code: error.code,
      message: error.message,
      details: error.details
    }
  });
}

export function registerExecutionRoutes(app: FastifyInstance) {
  app.post("/execution/transition", async (request, reply) => {
    try {
      const payload = request.body as {
        authority?: AuthorityInput;
        objectId: string;
        objectType: "task" | "initiative" | "approval" | "artifact" | "desk_item";
        nextStatus: string;
        hasOpenBlocker?: boolean;
        hasRequiredApproval?: boolean;
        hasCompletionEvidence?: boolean;
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

      const persisted = await persistTransition(payload);
      const auditEvent = toLifecycleAuditEvent(
        {
          objectType: persisted.transition.objectType,
          currentStatus: persisted.transition.currentStatus,
          nextStatus: persisted.transition.nextStatus,
          hasOpenBlocker: payload.hasOpenBlocker,
          hasRequiredApproval: payload.hasRequiredApproval,
          hasCompletionEvidence: payload.hasCompletionEvidence,
          sourceTrace: persisted.transition.sourceTrace
        },
        persisted.transition
      );

      return reply
        .code(persisted.transition.allowed ? 200 : 422)
        .send({
          result: persisted.transition,
          persisted: persisted.persisted,
          objectId: persisted.objectId,
          tableName: persisted.tableName,
          auditEvent
        });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "statusCode" in error &&
        "details" in error
      ) {
        return sendAuthorityError(
          error as AuthorityDeniedError | AuthorityApprovalRequiredError,
          reply
        );
      }

      return reply.code(500).send({
        error: {
          code: "EXECUTION_TRANSITION_FAILED",
          message: error instanceof Error ? error.message : "Unknown execution transition error",
          details: {}
        }
      });
    }
  });
}

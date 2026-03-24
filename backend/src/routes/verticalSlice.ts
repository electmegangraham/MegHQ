import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { enforceValidation } from "../lib/validation/enforce.js";
import { enforceAuthority } from "../lib/authority/enforce.js";
import type {
  AuthorityApprovalRequiredError,
  AuthorityDeniedError,
  AuthorityInput
} from "../lib/authority/types.js";
import { enforceExecution } from "../lib/execution/enforce.js";

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

export async function registerVerticalSliceRoutes(app: FastifyInstance) {
  app.post("/vertical-slice/run", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as Record<string, unknown>;
      const authority = body["authority"] as AuthorityInput | undefined;

      enforceValidation(body);

      if (!authority) {
        return reply.code(400).send({
          error: {
            code: "AUTHORITY_INPUT_REQUIRED",
            message: "Authority input is required.",
            details: {}
          }
        });
      }

      enforceAuthority(authority);
      enforceExecution("new", "in_progress");

      return reply.send({ ok: true });
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

      const message = error instanceof Error ? error.message : "Unknown error";

      return reply.code(400).send({
        error: {
          code: "VERTICAL_SLICE_FAILED",
          message,
          details: {}
        }
      });
    }
  });
}

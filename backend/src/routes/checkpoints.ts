import type { FastifyInstance } from "fastify";
import { captureCheckpoint, fetchCheckpointHistory, fetchLatestCheckpoint } from "../lib/checkpoints/service.js";

export function registerCheckpointRoutes(app: FastifyInstance) {
  app.post("/checkpoints/create", async (request, reply) => {
    try {
      const body = request.body as {
        projectId: string;
        snapshot: Record<string, unknown>;
      };

      const result = await captureCheckpoint({
        projectId: body.projectId,
        snapshot: body.snapshot
      });

      return reply.code(200).send({ result });
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "CHECKPOINT_CREATE_FAILED",
          message: error instanceof Error ? error.message : "Unknown checkpoint create error",
          details: {}
        }
      });
    }
  });

  app.get("/checkpoints/latest", async (request, reply) => {
    try {
      const query = request.query as { projectId?: string };
      const result = await fetchLatestCheckpoint(query.projectId ?? "default");
      return reply.code(200).send({ result });
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "CHECKPOINT_FETCH_FAILED",
          message: error instanceof Error ? error.message : "Unknown checkpoint fetch error",
          details: {}
        }
      });
    }
  });

  app.get("/checkpoints/history", async (request, reply) => {
    try {
      const query = request.query as { projectId?: string; limit?: string | number };
      const limit =
        typeof query.limit === "number"
          ? query.limit
          : typeof query.limit === "string" && query.limit.trim().length > 0
            ? Number(query.limit)
            : undefined;

      const result = await fetchCheckpointHistory(
        query.projectId ?? "default",
        Number.isFinite(limit) ? Number(limit) : undefined
      );

      return reply.code(200).send({ result });
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "CHECKPOINT_HISTORY_FAILED",
          message: error instanceof Error ? error.message : "Unknown checkpoint history error",
          details: {}
        }
      });
    }
  });
}

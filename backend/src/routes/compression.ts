import type { FastifyInstance } from "fastify";
import { runCompression } from "../lib/compression/service.js";

export function registerCompressionRoutes(app: FastifyInstance) {
  app.post("/compression/run", async (request, reply) => {
    try {
      const body = (request.body ?? {}) as { projectId?: string };
      const result = await runCompression(body.projectId);

      return reply.code(200).send({ result });
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "COMPRESSION_RUN_FAILED",
          message: error instanceof Error ? error.message : "Unknown compression run error",
          details: {}
        }
      });
    }
  });
}

import type { FastifyInstance } from "fastify";
import { searchMemory, upsertMemory } from "../lib/memory/service.js";

export function registerMemoryRoutes(app: FastifyInstance) {
  app.post("/memory/upsert", async (request, reply) => {
    try {
      const body = request.body as {
        content: string;
        summary?: string;
        tags?: string[];
        sourceType?: string;
        sourceTrace?: Record<string, unknown>;
      };

      const result = await upsertMemory(body);
      return reply.code(200).send({ result });
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "MEMORY_UPSERT_FAILED",
          message: error instanceof Error ? error.message : "Unknown memory upsert error",
          details: {}
        }
      });
    }
  });

  app.post("/memory/search", async (request, reply) => {
    try {
      const body = request.body as {
        query: string;
        limit?: number;
      };

      const result = await searchMemory({
        query: body?.query ?? "",
        limit: body?.limit
      });

      return reply.code(200).send({ result });
    } catch (error) {
      return reply.code(400).send({
        error: {
          code: "MEMORY_SEARCH_FAILED",
          message: error instanceof Error ? error.message : "Unknown memory search error",
          details: {}
        }
      });
    }
  });
}

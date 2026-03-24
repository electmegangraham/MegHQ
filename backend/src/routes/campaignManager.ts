import type { FastifyInstance } from "fastify";
import { runCampaignManager } from "../lib/campaignManager/prioritize.js";
import { loadCampaignSignals } from "../lib/campaignManager/loadSignals.js";
import { getRelevantMemoryContext } from "../lib/memory/service.js";

export function registerCampaignManagerRoutes(app: FastifyInstance) {
  app.get("/campaign-manager/run", async (request, reply) => {
    try {
      const query = request.query as { memoryQuery?: string; memoryLimit?: string | number };
      const signals = await loadCampaignSignals();
      const result = runCampaignManager(signals);
      const memoryLimit =
        typeof query?.memoryLimit === "number"
          ? query.memoryLimit
          : typeof query?.memoryLimit === "string" && query.memoryLimit.trim().length > 0
            ? Number(query.memoryLimit)
            : 3;

      const memory = await getRelevantMemoryContext(query?.memoryQuery ?? "campaign", Number.isFinite(memoryLimit) ? Number(memoryLimit) : 3);

      return reply.send({
        result,
        memory,
        meta: {
          signalCount: signals.length,
          source: "supabase.tasks",
          memorySource: "memory_entries"
        }
      });
    } catch (error) {
      return reply.code(500).send({
        ok: false,
        error: error instanceof Error ? error.message : "Unknown campaign manager error"
      });
    }
  });
}

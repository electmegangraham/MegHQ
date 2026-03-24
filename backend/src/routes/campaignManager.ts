import type { FastifyInstance } from "fastify";
import { runCampaignManager } from "../lib/campaignManager/prioritize.js";
import { loadCampaignSignals } from "../lib/campaignManager/loadSignals.js";

export function registerCampaignManagerRoutes(app: FastifyInstance) {
  app.get("/campaign-manager/run", async (_request, reply) => {
    try {
      const signals = await loadCampaignSignals();
      const result = runCampaignManager(signals);

      return reply.send({
        result,
        meta: {
          signalCount: signals.length,
          source: "supabase.tasks"
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

import type { FastifyInstance } from "fastify";
import { runCampaignManager } from "../lib/campaignManager/prioritize.js";
import { getSampleSignals } from "../lib/campaignManager/samples.js";

export function registerCampaignManagerRoutes(app: FastifyInstance) {
  app.get("/campaign-manager/run", async (_request, reply) => {
    const result = runCampaignManager(getSampleSignals());
    return reply.send({ result });
  });
}

import type { FastifyInstance } from "fastify";
import { buildPreferenceLearningResult } from "../lib/preferencesLearning/engine.js";
import {
  getSampleLearningEvents,
  getSamplePreferenceSignals,
  getSampleRiskOpportunityItems
} from "../lib/preferencesLearning/samples.js";

export function registerPreferencesLearningRoutes(app: FastifyInstance) {
  app.get("/preferences-learning/run", async (_request, reply) => {
    const result = buildPreferenceLearningResult(
      getSamplePreferenceSignals(),
      getSampleLearningEvents(),
      getSampleRiskOpportunityItems()
    );
    return reply.send({ result });
  });
}

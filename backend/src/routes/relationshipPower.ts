import type { FastifyInstance } from "fastify";
import { buildRelationshipPowerResult } from "../lib/relationshipPower/engine.js";
import { getSampleOpportunities, getSampleRelationships } from "../lib/relationshipPower/samples.js";

export function registerRelationshipPowerRoutes(app: FastifyInstance) {
  app.get("/relationship-power/run", async (_request, reply) => {
    const result = buildRelationshipPowerResult(
      getSampleRelationships(),
      getSampleOpportunities()
    );
    return reply.send({ result });
  });
}

import type { FastifyInstance } from "fastify";
import { buildStaffView } from "../lib/staffMode/queries.js";
import { getSampleItems } from "../lib/staffMode/samples.js";

export function registerStaffModeRoutes(app: FastifyInstance) {
  app.get("/staff-mode/:view", async (request, reply) => {
    const params = request.params as {
      view:
        | "my_work"
        | "department_queue"
        | "collaboration"
        | "review_approval"
        | "escalation_risk"
        | "timeline";
    };

    const items = getSampleItems(params.view);
    const result = buildStaffView(params.view, items);

    return reply.send({ result });
  });
}

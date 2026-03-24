import { buildStaffView } from "../lib/staffMode/queries.js";
import { getSampleItems } from "../lib/staffMode/samples.js";
export function registerStaffModeRoutes(app) {
    app.get("/staff-mode/:view", async (request, reply) => {
        const params = request.params;
        const items = getSampleItems(params.view);
        const result = buildStaffView(params.view, items);
        return reply.send({ result });
    });
}

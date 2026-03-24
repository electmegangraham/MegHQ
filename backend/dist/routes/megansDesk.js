import { buildDeskView } from "../lib/megansDesk/queries.js";
import { getSampleDeskCards } from "../lib/megansDesk/samples.js";
export function registerMegansDeskRoutes(app) {
    app.get("/megans-desk", async (_request, reply) => {
        const result = buildDeskView(getSampleDeskCards());
        return reply.send({ result });
    });
}

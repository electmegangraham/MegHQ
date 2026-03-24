import { evaluateWebsiteGovernance } from "../lib/tasteWebsite/engine.js";
import { getSampleWebsiteCandidates, getSampleWebsiteRules } from "../lib/tasteWebsite/samples.js";
export function registerTasteWebsiteRoutes(app) {
    app.get("/taste-website/run", async (_request, reply) => {
        const result = evaluateWebsiteGovernance(getSampleWebsiteRules(), getSampleWebsiteCandidates());
        return reply.send({ result });
    });
}

import { computeAlert, scoreDecision } from "../lib/decisionAlerts/engine.js";
import { getSampleDecisionInputs } from "../lib/decisionAlerts/samples.js";
export function registerDecisionAlertRoutes(app) {
    app.get("/decision-alerts/run", async (_request, reply) => {
        const inputs = getSampleDecisionInputs();
        const decisions = inputs.map(scoreDecision);
        const alerts = inputs.map(computeAlert);
        return reply.send({ result: { decisions, alerts } });
    });
}

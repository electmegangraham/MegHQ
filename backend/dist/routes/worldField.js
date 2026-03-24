import { routeFieldSignal } from "../lib/worldField/engine.js";
import { getSampleFieldSignals } from "../lib/worldField/samples.js";
export function registerWorldFieldRoutes(app) {
    app.get("/world-field/run", async (_request, reply) => {
        const signals = getSampleFieldSignals();
        const result = signals.map(routeFieldSignal);
        return reply.send({ result });
    });
}

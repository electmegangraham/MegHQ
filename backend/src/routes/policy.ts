import { FastifyInstance } from "fastify";
import { evaluatePolicy } from "../lib/policy/service.js";

export async function registerPolicyRoutes(app: FastifyInstance) {
  app.post("/policy/evaluate", async (req, _res) => {
    const result = evaluatePolicy((req.body ?? {}) as Parameters<typeof evaluatePolicy>[0]);
    return result;
  });
}

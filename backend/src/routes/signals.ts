import { FastifyInstance } from "fastify";
import { createVerticalSlice } from "../lib/vertical-slice/service.js";

export async function registerSignalRoutes(app: FastifyInstance) {
  app.post("/signals", async (req, _res) => {
    const result = createVerticalSlice((req.body ?? {}) as Parameters<typeof createVerticalSlice>[0]);
    return result;
  });
}

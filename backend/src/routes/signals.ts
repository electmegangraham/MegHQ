import { FastifyInstance } from "fastify";
import { runExecutionPipeline } from "../lib/execution/pipeline.js";

export async function registerSignalRoutes(app: FastifyInstance) {
  app.post("/signals", async (req: any) => {
    return runExecutionPipeline(app.pg, {
      action: "create_signal",
      payload: req.body,
    });
  });
}

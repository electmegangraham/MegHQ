import { FastifyInstance } from "fastify";
import { runExecutionPipeline } from "../lib/execution/pipeline.js";

export async function registerSliceRoutes(app: FastifyInstance) {
  app.post("/slice/execute", async (req: any) => {
    return runExecutionPipeline(app.pg, req.body);
  });
}

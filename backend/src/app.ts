import Fastify from "fastify";

import { registerSignalRoutes } from "./routes/signals.js";
import { registerInitiativeRoutes } from "./routes/initiatives.js";
import { registerTaskRoutes } from "./routes/tasks.js";
import { registerExecutionPipelineRoutes } from "./routes/execution_pipeline.js";
import { registerApprovalRoutes } from "./routes/approvals.js";

export function buildApp() {
  const app = Fastify();

  registerSignalRoutes(app);
  registerInitiativeRoutes(app);
  registerTaskRoutes(app);
  registerExecutionPipelineRoutes(app);
  registerApprovalRoutes(app);

  return app;
}

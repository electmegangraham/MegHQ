import { registerExecutionPipelineRoutes } from "./routes/execution_pipeline.js";`r`nimport { registerExecutionEnhancements } from "./routes/execution_enhance.js";`r`nimport { registerApprovalRoutes } from "./routes/approvals.js";`r`nimport { registerSliceExecutionRoutes } from "./routes/slice_execute.js";`r`nimport { registerSliceRoutes } from "./routes/slice.js";`r`nimport Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";

import { registerHealthRoute } from "./routes/health.js";
import { registerDbHealthRoute } from "./routes/dbHealth.js";
import { registerValidationRoutes } from "./routes/validation.js";
import { registerAuthorityRoutes } from "./routes/authority.js";
import { registerExecutionRoutes } from "./routes/execution.js";
import { registerCampaignManagerRoutes } from "./routes/campaignManager.js";
import { registerVerticalSliceRoutes } from "./routes/verticalSlice.js";
import { registerAuditRoutes } from "./routes/audit.js";
import { registerMemoryRoutes } from "./routes/memory.js";
import { registerCheckpointRoutes } from "./routes/checkpoints.js";
import { registerCompressionRoutes } from "./routes/compression.js";
import { registerPolicyRoutes } from "./routes/policy.js";
import { registerSignalRoutes } from "./routes/signals.js";
import { registerDeskRoutes } from "./routes/desk.js";

import { registerAuthGuardHook } from "./lib/authGuard.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors);
  app.register(sensible);

  registerAuthGuardHook(app);

  registerHealthRoute(app);
  registerDbHealthRoute(app);
  registerValidationRoutes(app);
  registerAuthorityRoutes(app);
  registerExecutionRoutes(app);
  registerCampaignManagerRoutes(app);
  registerVerticalSliceRoutes(app);
  registerAuditRoutes(app);
  registerMemoryRoutes(app);
  registerCheckpointRoutes(app);
  registerCompressionRoutes(app);
  registerPolicyRoutes(app);
  registerSignalRoutes(app);
  registerDeskRoutes(app);
  registerSliceRoutes(app);
  registerSliceExecutionRoutes(app);
  registerApprovalRoutes(app);
  registerExecutionEnhancements(app);
  registerExecutionPipelineRoutes(app);

  return app;
}














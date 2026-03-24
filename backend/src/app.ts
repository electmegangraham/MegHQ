import Fastify from "fastify";
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

  return app;
}

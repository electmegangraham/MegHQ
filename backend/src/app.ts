import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { registerHealthRoute } from "./routes/health.js";`r`nimport { registerAuditRoutes } from "./routes/audit.js";`n
import { registerDbHealthRoute } from "./routes/dbHealth.js";
import { registerValidationRoutes } from "./routes/validation.js";
import { registerAuthorityRoutes } from "./routes/authority.js";
import { registerExecutionRoutes } from "./routes/execution.js";
import { registerVerticalSliceRoutes } from "./routes/verticalSlice.js";
import { registerStaffModeRoutes } from "./routes/staffMode.js";
import { registerMegansDeskRoutes } from "./routes/megansDesk.js";
import { registerCampaignManagerRoutes } from "./routes/campaignManager.js";
import { registerDecisionAlertRoutes } from "./routes/decisionAlerts.js";
import { registerWorldFieldRoutes } from "./routes/worldField.js";
import { registerPreferencesLearningRoutes } from "./routes/preferencesLearning.js";
import { registerRelationshipPowerRoutes } from "./routes/relationshipPower.js";
import { registerTasteWebsiteRoutes } from "./routes/tasteWebsite.js";
import { registerAuthGuardHook } from "./lib/authGuard.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });
  app.register(sensible);

  registerAuthGuardHook(app);

  registerHealthRoute(app);
  registerDbHealthRoute(app);
  registerValidationRoutes(app);
  registerAuthorityRoutes(app);
  registerExecutionRoutes(app);
  registerVerticalSliceRoutes(app);
  registerStaffModeRoutes(app);
  registerMegansDeskRoutes(app);
  registerCampaignManagerRoutes(app);
  registerDecisionAlertRoutes(app);
  registerWorldFieldRoutes(app);
  registerPreferencesLearningRoutes(app);
  registerRelationshipPowerRoutes(app);
  registerTasteWebsiteRoutes(app);

  registerAuditRoutes(app);
}

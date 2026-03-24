import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { registerHealthRoute } from "./routes/health.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });
  app.register(sensible);

  registerHealthRoute(app);

  return app;
}

import type { FastifyInstance } from "fastify";

export function registerHealthRoute(app: FastifyInstance) {
  app.get("/health", async () => ({
    ok: true,
    service: "meghq-backend",
    phase: "schema-foundation-starter"
  }));
}

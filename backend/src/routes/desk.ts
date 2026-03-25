import { FastifyInstance } from "fastify";
import { getDeskProjection } from "../lib/vertical-slice/service.js";

export async function registerDeskRoutes(app: FastifyInstance) {
  app.get("/desk", async () => {
    return getDeskProjection();
  });
}

import type { FastifyInstance, FastifyRequest } from "fastify";

const OPEN_PATHS = new Set([
  "/health"
]);

function isOpenPath(request: FastifyRequest): boolean {
  const rawPath = request.routeOptions.url;
  return OPEN_PATHS.has(rawPath);
}

export function registerAuthGuardHook(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    if (isOpenPath(request)) return;

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.code(401).send({
        error: "missing_authorization",
        reason: "Protected route requires Authorization header."
      });
    }
  });
}

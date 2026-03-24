import type { FastifyInstance } from "fastify";
import { checkAuthority } from "../lib/authority/rules.js";
import type { AuthorityInput } from "../lib/authority/types.js";

export function registerAuthorityRoutes(app: FastifyInstance) {
  app.post("/authority/check", async (request, reply) => {
    const payload = request.body as AuthorityInput;
    const result = checkAuthority(payload);

    return reply.code(result.allowed ? 200 : 403).send({ result });
  });
}

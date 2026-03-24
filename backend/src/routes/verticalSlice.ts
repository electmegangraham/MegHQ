
import { enforceValidation } from "../lib/validation/enforce.js";
import { enforceAuthority } from "../lib/authority/enforce.js";
import { enforceExecution } from "../lib/execution/enforce.js";

export async function registerVerticalSliceRoutes(app) {
  app.post("/vertical-slice/run", async (req, reply) => {
    try {
      const body = req.body;
      enforceValidation(body);
      enforceAuthority();
      enforceExecution("new", "in_progress");

      return reply.send({ ok: true });
    } catch (err) {
      return reply.code(400).send({ ok: false, error: err.message });
    }
  });
}

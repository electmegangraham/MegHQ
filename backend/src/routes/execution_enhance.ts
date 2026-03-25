import { FastifyInstance } from "fastify";

export async function registerExecutionEnhancements(app: FastifyInstance) {
  app.addHook("onRoute", (routeOptions: any) => {
    if (routeOptions.url === "/slice/execute") {
      const originalHandler = routeOptions.handler;

      routeOptions.handler = async function (req: any, res: any) {
        const result = await originalHandler(req, res);

        if (result?.success && req.body?.taskId) {
          const db = (this as any).pg;
          const taskId = req.body.taskId;

          await db.query(
            "insert into checkpoints (entity_id, entity_type) values ($1,'task')",
            [taskId]
          );

          await db.query(
            "insert into memory_entries (entity_id, content) values ($1,'task executed')",
            [taskId]
          );
        }

        return result;
      };
    }
  });
}

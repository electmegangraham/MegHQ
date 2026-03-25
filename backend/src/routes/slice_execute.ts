import { FastifyInstance } from "fastify";

export async function registerSliceExecutionRoutes(app: FastifyInstance) {
  app.post("/slice/execute", async (req: any) => {
    const db = app.pg;
    const { taskId } = req.body;

    const approval = await db.query(
      "select * from approvals where task_id = $1",
      [taskId]
    );

    if (!approval.rows.length || approval.rows[0].status !== "approved") {
      return { error: "approval required" };
    }

    await db.query(
      "update tasks set status = 'executed' where id = $1",
      [taskId]
    );

    await db.query(
      "insert into audit_events (event_type, entity_id) values ('task_executed',$1)",
      [taskId]
    );

    return { success: true };
  });
}

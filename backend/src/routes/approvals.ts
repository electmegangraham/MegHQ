import { FastifyInstance } from "fastify";

export async function registerApprovalRoutes(app: FastifyInstance) {
  app.post("/approvals/approve", async (req: any) => {
    const db = app.pg;
    const { approvalId } = req.body;

    await db.query(
      "update approvals set status = 'approved' where id = $1",
      [approvalId]
    );

    await db.query(
      "insert into audit_events (event_type, entity_id) values ('approval_approved',$1)",
      [approvalId]
    );

    return { success: true };
  });
}

export async function runExecutionPipeline(db: any, input: any) {
  const { taskId } = input;

  // validation
  if (!taskId) return { error: "missing taskId" };

  // approval check
  const approval = await db.query(
    "select * from approvals where task_id=$1",
    [taskId]
  );

  if (!approval.rows.length || approval.rows[0].status !== "approved") {
    return { error: "approval required" };
  }

  // state transition
  await db.query(
    "update tasks set status='executed' where id=$1",
    [taskId]
  );

  // audit
  await db.query(
    "insert into audit_events (event_type, entity_id) values ('task_executed',$1)",
    [taskId]
  );

  // checkpoint
  await db.query(
    "insert into checkpoints (entity_id, entity_type) values ($1,'task')",
    [taskId]
  );

  // memory
  await db.query(
    "insert into memory_entries (entity_id, content) values ($1,'task executed')",
    [taskId]
  );

  return { success: true };
}

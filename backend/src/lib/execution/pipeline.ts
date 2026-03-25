// tracking_all_actions
async function track(db, entityId, type) {
  await db.query(
    "insert into audit_events (event_type, entity_id) values (,)",
    [type, entityId]
  );

  await db.query(
    "insert into checkpoints (entity_id, entity_type) values (,)",
    [entityId, type]
  );

  await db.query(
    "insert into memory_entries (entity_id, content) values (,)",
    [entityId, type + " created"]
  );
}
import { evaluatePolicy } from "../policy/service.js";

export async function runExecutionPipeline(db: any, input: any) {
  if (input.idempotencyKey) {
    const existing = await db.query(
      "select response from idempotency_keys where key = $1",
      [input.idempotencyKey]
    );

    if (existing.rows.length) {
      return existing.rows[0].response;
    }
  }

  if (input.action === "create_signal") {
    const result = await db.query(
      "insert into signals (id, title) values (gen_random_uuid(), $1) returning id",
      [input.payload?.title ?? "signal"]
    );

    await track(db, result.rows[0].id, "signal");
return { signalId: result.rows[0].id };
  }

  if (input.action === "create_initiative") {
    const result = await db.query(
      "insert into initiatives (id, signal_id) values (gen_random_uuid(), $1) returning id",
      [input.signalId]
    );

    await track(db, result.rows[0].id, "initiative");
return { initiativeId: result.rows[0].id };
  }

  if (input.action === "create_task") {
    const result = await db.query(
      "insert into tasks (id, initiative_id, status) values (gen_random_uuid(), $1, 'pending_approval') returning id",
      [input.initiativeId]
    );

    await track(db, result.rows[0].id, "task");
return { taskId: result.rows[0].id };
  }

  const { taskId } = input;

  if (!taskId) {
    return { error: "missing taskId" };
  }

  const authority = { allowed: true };

  if (!authority.allowed) {
    return { error: "not allowed" };
  }

  const policy = evaluatePolicy({ action: "execute", context: {} });

  if (!policy.allowed && !policy.requiresApproval) {
    return { error: policy.reason || "policy denied" };
  }

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
    "insert into audit_events (event_type, entity_id) values ('task_executed', $1)",
    [taskId]
  );

  await db.query(
    "insert into checkpoints (entity_id, entity_type) values ($1, 'task')",
    [taskId]
  );

  await db.query(
    "insert into memory_entries (entity_id, content) values ($1, 'task executed')",
    [taskId]
  );

  const result = { success: true };

  if (input.idempotencyKey) {
    await db.query(
      "insert into idempotency_keys (key, response) values ($1, $2)",
      [input.idempotencyKey, result]
    );
  }

  return result;
}


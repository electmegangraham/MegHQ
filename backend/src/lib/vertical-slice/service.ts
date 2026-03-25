import { randomUUID } from "crypto";

export async function createSignal(db: any, input: any) {
  const id = randomUUID();
  await db.query(
    "insert into signals (id, title) values ($1,$2)",
    [id, input.title ?? "signal"]
  );
  return { id };
}

export async function createInitiative(db: any, signalId: string) {
  const id = randomUUID();
  await db.query(
    "insert into initiatives (id, signal_id) values ($1,$2)",
    [id, signalId]
  );
  return { id };
}

export async function createTask(db: any, initiativeId: string) {
  const id = randomUUID();
  await db.query(
    "insert into tasks (id, initiative_id) values ($1,$2)",
    [id, initiativeId]
  );
  return { id };
}

export async function createApproval(db: any, taskId: string) {
  const id = randomUUID();
  await db.query(
    "insert into approvals (id, task_id, status) values ($1,$2,'pending')",
    [id, taskId]
  );
  return { id };
}

export async function createDeskItem(db: any, entityId: string) {
  const id = randomUUID();
  await db.query(
    "insert into desk_items (id, entity_id) values ($1,$2)",
    [id, entityId]
  );
  return { id };
}

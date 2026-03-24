import { getDbClient } from "../db/client.js";

function generateAuditId() {
  return crypto.randomUUID();
}

export async function persistAuditEvent(_: unknown) {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    audit_id: generateAuditId(),
    actor_type: "system",
    actor_id: "system",
    event_type: "execution_transition",
    object_type: "system",
    object_id: null,
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

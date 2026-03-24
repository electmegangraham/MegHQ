import { getDbClient } from "../db/client.js";

function generateAuditId() {
  return crypto.randomUUID();
}

export async function persistAuditEvent(_: unknown) {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    audit_id: generateAuditId(),
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

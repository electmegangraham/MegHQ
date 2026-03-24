import { getDbClient } from "../db/client.js";

export async function persistAuditEvent() {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

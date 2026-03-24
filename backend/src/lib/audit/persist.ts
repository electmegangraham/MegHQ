
import { getDbClient } from "../db/client.js";

export async function persistAuditEvent(event: Record<string, unknown>) {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    event_type: event.eventType ?? "unknown",
    payload: event,
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

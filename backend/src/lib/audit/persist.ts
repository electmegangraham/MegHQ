import { getDbClient } from "../db/client.js";

type AuditEventInput = {
  eventType?: string;
  objectId?: string | null;
};

export async function persistAuditEvent(event: AuditEventInput) {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    event_type: event.eventType ?? "unknown",
    object_id: event.objectId ?? null,
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

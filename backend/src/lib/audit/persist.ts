
import { getDbClient } from "../db/client.js";

type AuditEventInput = {
  event_type: string;
  actor_type: string;
  payload?: Record<string, unknown>;
  created_at?: string;
};

function generateAuditId() {
  return crypto.randomUUID();
}

export async function persistAuditEvent(input: AuditEventInput) {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    audit_id: generateAuditId(),
    actor_type: input.actor_type,
    event_type: input.event_type,
    payload: input.payload ?? {},
    created_at: input.created_at ?? new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

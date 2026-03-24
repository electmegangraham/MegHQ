import { getDbClient } from "../db/client.js";

interface PersistAuditInput {
  event_type?: string;
  actor_type?: string;
  created_at?: string;
}

function generateAuditId() {
  return crypto.randomUUID();
}

export async function persistAuditEvent(input: PersistAuditInput) {
  const db = getDbClient();

  const { error } = await db.from("audit_events").insert({
    audit_id: generateAuditId(),
    actor_type: input.actor_type ?? "system",
    event_type: input.event_type ?? "execution_transition",
    created_at: input.created_at ?? new Date().toISOString()
  });

  if (error) {
    throw new Error(`Failed to persist audit event: ${error.message}`);
  }

  return { ok: true };
}

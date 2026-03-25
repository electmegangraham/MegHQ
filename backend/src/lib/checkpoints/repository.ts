import { getDbClient } from "../db/client.js";
import type { CheckpointRecord, CreateCheckpointInput, ListCheckpointInput } from "./types.js";

function mapRow(row: Record<string, unknown>): CheckpointRecord {
  return {
    checkpointId: String(row["checkpoint_id"] ?? row["id"]),
    projectId: String(row["project_id"] ?? "default"),
    snapshot: (row["snapshot"] as Record<string, unknown> | null | undefined) ?? {},
    createdAt: String(row["created_at"] ?? new Date().toISOString())
  };
}

export async function createCheckpoint(input: CreateCheckpointInput): Promise<CheckpointRecord> {
  const db = getDbClient();
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("checkpoints")
    .insert({
      project_id: input.projectId,
      snapshot: input.snapshot,
      created_at: now
    })
    .select("id, checkpoint_id, project_id, snapshot, created_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create checkpoint: ${error?.message ?? "Unknown insert error"}`);
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

export async function listCheckpoints(input: ListCheckpointInput): Promise<CheckpointRecord[]> {
  const db = getDbClient();
  const limit = input.limit && input.limit > 0 ? input.limit : 5;

  const { data, error } = await db
    .from("checkpoints")
    .select("id, checkpoint_id, project_id, snapshot, created_at")
    .eq("project_id", input.projectId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to list checkpoints: ${error.message}`);
  }

  return (data ?? []).map((row) => mapRow(row as unknown as Record<string, unknown>));
}

export async function getLatestCheckpoint(projectId: string): Promise<CheckpointRecord | null> {
  const rows = await listCheckpoints({ projectId, limit: 1 });
  return rows[0] ?? null;
}

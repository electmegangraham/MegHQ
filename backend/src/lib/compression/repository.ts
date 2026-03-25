import { getDbClient } from "../db/client.js";
import type {
  CompressedArtifactRecord,
  CompressionArtifactType,
  CompressionSourceRow
} from "./types.js";

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function readProjectId(row: Record<string, unknown>): string | null {
  const directProjectId = row["project_id"];
  if (typeof directProjectId === "string" && directProjectId.trim().length > 0) {
    return directProjectId;
  }

  const sourceTrace = asObject(row["source_trace"]);
  const traceProjectId = sourceTrace["projectId"];
  if (typeof traceProjectId === "string" && traceProjectId.trim().length > 0) {
    return traceProjectId;
  }

  const payload = asObject(row["payload"]);
  const payloadProjectId = payload["projectId"];
  if (typeof payloadProjectId === "string" && payloadProjectId.trim().length > 0) {
    return payloadProjectId;
  }

  return null;
}

function mapCompressedArtifact(row: Record<string, unknown>): CompressedArtifactRecord {
  const coversValue = row["covers"];
  const covers = Array.isArray(coversValue) ? coversValue.map((value) => String(value)) : [];

  return {
    compressedId: String(row["compressed_id"] ?? row["id"]),
    projectId: String(row["project_id"] ?? "default"),
    artifactType: String(row["artifact_type"] ?? "memory_block") as CompressionArtifactType,
    summary: String(row["summary"] ?? ""),
    covers,
    sourceTrace: asObject(row["source_trace"]),
    createdAt: String(row["created_at"] ?? new Date().toISOString())
  };
}

function sortByCreatedAtDesc(rows: CompressionSourceRow[]): CompressionSourceRow[] {
  return [...rows].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function listMemoryRowsForProject(projectId: string): Promise<CompressionSourceRow[]> {
  const db = getDbClient();

  const { data, error } = await db
    .from("memory_entries")
    .select("id, memory_id, content, summary, tags, source_type, source_trace, created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    throw new Error(`Failed to list memory entries for compression: ${error.message}`);
  }

  const rows = (data ?? [])
    .map((row) => row as unknown as Record<string, unknown>)
    .filter((row) => {
      const rowProjectId = readProjectId(row);
      return projectId === "default" ? rowProjectId === null || rowProjectId === "default" : rowProjectId === projectId;
    })
    .map((row) => ({
      sourceId: String(row["memory_id"] ?? row["id"]),
      createdAt: String(row["created_at"] ?? new Date().toISOString()),
      payload: {
        content: String(row["content"] ?? ""),
        ...(row["summary"] ? { summary: String(row["summary"]) } : {}),
        tags: Array.isArray(row["tags"]) ? row["tags"] : [],
        ...(row["source_type"] ? { sourceType: String(row["source_type"]) } : {}),
        sourceTrace: asObject(row["source_trace"])
      }
    }));

  return sortByCreatedAtDesc(rows);
}

export async function listAuditRowsForProject(projectId: string): Promise<CompressionSourceRow[]> {
  const db = getDbClient();

  const { data, error } = await db
    .from("audit_events")
    .select("audit_id, event_type, actor_type, payload, created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    throw new Error(`Failed to list audit events for compression: ${error.message}`);
  }

  const rows = (data ?? [])
    .map((row) => row as unknown as Record<string, unknown>)
    .filter((row) => {
      const rowProjectId = readProjectId(row);
      return projectId === "default" ? rowProjectId === null || rowProjectId === "default" : rowProjectId === projectId;
    })
    .map((row) => ({
      sourceId: String(row["audit_id"] ?? row["id"]),
      createdAt: String(row["created_at"] ?? new Date().toISOString()),
      payload: {
        eventType: String(row["event_type"] ?? ""),
        actorType: String(row["actor_type"] ?? ""),
        payload: asObject(row["payload"])
      }
    }));

  return sortByCreatedAtDesc(rows);
}

export async function listCheckpointRowsForProject(projectId: string): Promise<CompressionSourceRow[]> {
  const db = getDbClient();

  const { data, error } = await db
    .from("checkpoints")
    .select("id, checkpoint_id, project_id, snapshot, created_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    throw new Error(`Failed to list checkpoints for compression: ${error.message}`);
  }

  const rows = (data ?? []).map((row) => row as unknown as Record<string, unknown>).map((row) => ({
    sourceId: String(row["checkpoint_id"] ?? row["id"]),
    createdAt: String(row["created_at"] ?? new Date().toISOString()),
    payload: {
      snapshot: asObject(row["snapshot"]),
      projectId: String(row["project_id"] ?? projectId)
    }
  }));

  return sortByCreatedAtDesc(rows);
}

export async function createCompressedArtifact(input: {
  projectId: string;
  artifactType: CompressionArtifactType;
  summary: string;
  covers: string[];
  sourceTrace: Record<string, unknown>;
}): Promise<CompressedArtifactRecord> {
  const db = getDbClient();

  const { data, error } = await db
    .from("compressed_artifacts")
    .insert({
      project_id: input.projectId,
      artifact_type: input.artifactType,
      summary: input.summary,
      covers: input.covers,
      source_trace: input.sourceTrace,
      created_at: new Date().toISOString()
    })
    .select("id, compressed_id, project_id, artifact_type, summary, covers, source_trace, created_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create compressed artifact: ${error?.message ?? "Unknown insert error"}`);
  }

  return mapCompressedArtifact(data as unknown as Record<string, unknown>);
}

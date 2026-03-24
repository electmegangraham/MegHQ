import { getDbClient } from "../db/client.js";
import type { MemoryEntry, MemorySearchInput, MemoryUpsertInput } from "./types.js";

function mapRow(row: Record<string, unknown>): MemoryEntry {
  const tagsValue = row["tags"];
  const tags = Array.isArray(tagsValue)
    ? tagsValue.map((value) => String(value))
    : [];

  return {
    memoryId: String(row["memory_id"] ?? row["id"]),
    content: String(row["content"] ?? ""),
    ...(row["summary"] ? { summary: String(row["summary"]) } : {}),
    tags,
    ...(row["source_type"] ? { sourceType: String(row["source_type"]) } : {}),
    sourceTrace: (row["source_trace"] as Record<string, unknown> | null | undefined) ?? null,
    createdAt: String(row["created_at"] ?? new Date().toISOString()),
    updatedAt: String(row["updated_at"] ?? new Date().toISOString())
  };
}

export async function createMemoryEntry(input: MemoryUpsertInput): Promise<MemoryEntry> {
  const db = getDbClient();
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("memory_entries")
    .insert({
      content: input.content,
      summary: input.summary ?? null,
      tags: input.tags ?? [],
      source_type: input.sourceType ?? "manual",
      source_trace: input.sourceTrace ?? {},
      created_at: now,
      updated_at: now
    })
    .select("id, memory_id, content, summary, tags, source_type, source_trace, created_at, updated_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create memory entry: ${error?.message ?? "Unknown insert error"}`);
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

export async function searchMemoryEntries(input: MemorySearchInput): Promise<MemoryEntry[]> {
  const db = getDbClient();
  const limit = input.limit && input.limit > 0 ? input.limit : 5;

  let query = db
    .from("memory_entries")
    .select("id, memory_id, content, summary, tags, source_type, source_trace, created_at, updated_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (input.query.trim().length > 0) {
    query = query.or(`content.ilike.%${input.query}%,summary.ilike.%${input.query}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to search memory entries: ${error.message}`);
  }

  return (data ?? []).map((row) => mapRow(row as unknown as Record<string, unknown>));
}

export async function listRecentMemoryEntries(limit = 5): Promise<MemoryEntry[]> {
  return searchMemoryEntries({ query: "", limit });
}

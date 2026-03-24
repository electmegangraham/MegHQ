import { createMemoryEntry, listRecentMemoryEntries, searchMemoryEntries } from "./repository.js";
import type { MemorySearchInput, MemoryUpsertInput } from "./types.js";

export async function upsertMemory(input: MemoryUpsertInput) {
  if (!input.content || input.content.trim().length === 0) {
    throw new Error("Memory content is required.");
  }

  return createMemoryEntry({
    ...input,
    content: input.content.trim(),
    ...(input.summary ? { summary: input.summary.trim() } : {}),
    tags: input.tags ?? []
  });
}

export async function searchMemory(input: MemorySearchInput) {
  if (!input.query || input.query.trim().length === 0) {
    return listRecentMemoryEntries(input.limit ?? 5);
  }

  return searchMemoryEntries({
    query: input.query.trim(),
    ...(input.limit !== undefined ? { limit: input.limit } : {})
  });
}

export async function getRelevantMemoryContext(query?: string, limit = 5) {
  const results = await searchMemory({
    query: query ?? "",
    limit
  });

  return {
    source: "memory_entries",
    count: results.length,
    entries: results
  };
}

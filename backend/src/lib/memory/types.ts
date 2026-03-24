export interface MemoryEntry {
  memoryId: string;
  content: string;
  summary?: string;
  tags: string[];
  sourceType?: string;
  sourceTrace?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryUpsertInput {
  content: string;
  summary?: string;
  tags?: string[];
  sourceType?: string;
  sourceTrace?: Record<string, unknown>;
}

export interface MemorySearchInput {
  query: string;
  limit?: number;
}

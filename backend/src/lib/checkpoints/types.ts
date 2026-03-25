export interface CheckpointRecord {
  checkpointId: string;
  projectId: string;
  snapshot: Record<string, unknown>;
  createdAt: string;
}

export interface CreateCheckpointInput {
  projectId: string;
  snapshot: Record<string, unknown>;
}

export interface ListCheckpointInput {
  projectId: string;
  limit?: number;
}

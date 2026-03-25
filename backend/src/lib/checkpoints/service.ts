import { createCheckpoint, getLatestCheckpoint, listCheckpoints } from "./repository.js";
import type { CreateCheckpointInput } from "./types.js";

export async function captureCheckpoint(input: CreateCheckpointInput) {
  if (!input.projectId || input.projectId.trim().length === 0) {
    throw new Error("Checkpoint projectId is required.");
  }

  if (!input.snapshot || typeof input.snapshot !== "object" || Array.isArray(input.snapshot)) {
    throw new Error("Checkpoint snapshot must be an object.");
  }

  return createCheckpoint({
    projectId: input.projectId.trim(),
    snapshot: input.snapshot
  });
}

export async function fetchLatestCheckpoint(projectId: string) {
  if (!projectId || projectId.trim().length === 0) {
    throw new Error("Checkpoint projectId is required.");
  }

  return getLatestCheckpoint(projectId.trim());
}

export async function fetchCheckpointHistory(projectId: string, limit?: number) {
  if (!projectId || projectId.trim().length === 0) {
    throw new Error("Checkpoint projectId is required.");
  }

  return listCheckpoints({
    projectId: projectId.trim(),
    ...(limit !== undefined ? { limit } : {})
  });
}

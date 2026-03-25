import {
  createCompressedArtifact,
  listAuditRowsForProject,
  listCheckpointRowsForProject,
  listMemoryRowsForProject
} from "./repository.js";
import type {
  CompressionArtifactType,
  CompressionBucketResult,
  CompressionRunResult,
  CompressionSourceRow
} from "./types.js";

const MEMORY_THRESHOLD = 50;
const MEMORY_KEEP_COUNT = 20;
const AUDIT_THRESHOLD = 200;
const AUDIT_KEEP_COUNT = 100;
const CHECKPOINT_THRESHOLD = 20;
const CHECKPOINT_KEEP_COUNT = 10;

function sanitizeProjectId(projectId?: string): string {
  if (!projectId || projectId.trim().length === 0) {
    return "default";
  }

  return projectId.trim();
}

function toSummary(artifactType: CompressionArtifactType, projectId: string, rows: CompressionSourceRow[]): string {
  const first = rows[0];
  const last = rows[rows.length - 1];
  const firstCreatedAt = first?.createdAt ?? "unknown";
  const lastCreatedAt = last?.createdAt ?? "unknown";

  if (artifactType === "memory_block") {
    const tags = rows
      .flatMap((row) => {
        const payloadTags = row.payload["tags"];
        return Array.isArray(payloadTags) ? payloadTags.map((value) => String(value)) : [];
      })
      .slice(0, 10);

    return [
      `Compressed ${rows.length} memory entries for project ${projectId}.`,
      `Coverage window: ${lastCreatedAt} -> ${firstCreatedAt}.`,
      tags.length > 0 ? `Representative tags: ${tags.join(", ")}.` : "Representative tags: none."
    ].join(" ");
  }

  if (artifactType === "audit_block") {
    const eventTypes = rows
      .map((row) => {
        const eventType = row.payload["eventType"];
        return typeof eventType === "string" ? eventType : "";
      })
      .filter((value) => value.length > 0)
      .slice(0, 10);

    return [
      `Compressed ${rows.length} audit events for project ${projectId}.`,
      `Coverage window: ${lastCreatedAt} -> ${firstCreatedAt}.`,
      eventTypes.length > 0 ? `Representative event types: ${eventTypes.join(", ")}.` : "Representative event types: none."
    ].join(" ");
  }

  return [
    `Compressed ${rows.length} checkpoints for project ${projectId}.`,
    `Coverage window: ${lastCreatedAt} -> ${firstCreatedAt}.`,
    "Raw checkpoints remain canonical and queryable."
  ].join(" ");
}

async function compressBucket(input: {
  artifactType: CompressionArtifactType;
  projectId: string;
  threshold: number;
  keepCount: number;
  rows: CompressionSourceRow[];
}): Promise<CompressionBucketResult> {
  const totalCount = input.rows.length;

  if (totalCount <= input.threshold) {
    return {
      artifactType: input.artifactType,
      projectId: input.projectId,
      threshold: input.threshold,
      keepCount: input.keepCount,
      totalCount,
      compressedSourceCount: 0,
      createdArtifactCount: 0,
      createdArtifacts: []
    };
  }

  const rowsToCompress = input.rows.slice(input.keepCount);

  if (rowsToCompress.length === 0) {
    return {
      artifactType: input.artifactType,
      projectId: input.projectId,
      threshold: input.threshold,
      keepCount: input.keepCount,
      totalCount,
      compressedSourceCount: 0,
      createdArtifactCount: 0,
      createdArtifacts: []
    };
  }

  const createdArtifact = await createCompressedArtifact({
    projectId: input.projectId,
    artifactType: input.artifactType,
    summary: toSummary(input.artifactType, input.projectId, rowsToCompress),
    covers: rowsToCompress.map((row) => row.sourceId),
    sourceTrace: {
      source: "compression_service",
      threshold: input.threshold,
      keepCount: input.keepCount,
      compressedSourceCount: rowsToCompress.length,
      latestCoveredAt: rowsToCompress[0]?.createdAt ?? null,
      oldestCoveredAt: rowsToCompress[rowsToCompress.length - 1]?.createdAt ?? null
    }
  });

  return {
    artifactType: input.artifactType,
    projectId: input.projectId,
    threshold: input.threshold,
    keepCount: input.keepCount,
    totalCount,
    compressedSourceCount: rowsToCompress.length,
    createdArtifactCount: 1,
    createdArtifacts: [createdArtifact]
  };
}

export async function compressMemory(projectId?: string): Promise<CompressionBucketResult> {
  const normalizedProjectId = sanitizeProjectId(projectId);
  const rows = await listMemoryRowsForProject(normalizedProjectId);

  return compressBucket({
    artifactType: "memory_block",
    projectId: normalizedProjectId,
    threshold: MEMORY_THRESHOLD,
    keepCount: MEMORY_KEEP_COUNT,
    rows
  });
}

export async function compressAudit(projectId?: string): Promise<CompressionBucketResult> {
  const normalizedProjectId = sanitizeProjectId(projectId);
  const rows = await listAuditRowsForProject(normalizedProjectId);

  return compressBucket({
    artifactType: "audit_block",
    projectId: normalizedProjectId,
    threshold: AUDIT_THRESHOLD,
    keepCount: AUDIT_KEEP_COUNT,
    rows
  });
}

export async function compressCheckpoints(projectId?: string): Promise<CompressionBucketResult> {
  const normalizedProjectId = sanitizeProjectId(projectId);
  const rows = await listCheckpointRowsForProject(normalizedProjectId);

  return compressBucket({
    artifactType: "checkpoint_block",
    projectId: normalizedProjectId,
    threshold: CHECKPOINT_THRESHOLD,
    keepCount: CHECKPOINT_KEEP_COUNT,
    rows
  });
}

export async function runCompression(projectId?: string): Promise<CompressionRunResult> {
  const normalizedProjectId = sanitizeProjectId(projectId);

  const [memory, audit, checkpoints] = await Promise.all([
    compressMemory(normalizedProjectId),
    compressAudit(normalizedProjectId),
    compressCheckpoints(normalizedProjectId)
  ]);

  return {
    projectId: normalizedProjectId,
    memory,
    audit,
    checkpoints
  };
}

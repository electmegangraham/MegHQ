export type CompressionArtifactType = "memory_block" | "audit_block" | "checkpoint_block";

export interface CompressionSourceRow {
  sourceId: string;
  createdAt: string;
  payload: Record<string, unknown>;
}

export interface CompressedArtifactRecord {
  compressedId: string;
  projectId: string;
  artifactType: CompressionArtifactType;
  summary: string;
  covers: string[];
  sourceTrace: Record<string, unknown>;
  createdAt: string;
}

export interface CompressionBucketResult {
  artifactType: CompressionArtifactType;
  projectId: string;
  threshold: number;
  keepCount: number;
  totalCount: number;
  compressedSourceCount: number;
  createdArtifactCount: number;
  createdArtifacts: CompressedArtifactRecord[];
}

export interface CompressionRunResult {
  projectId: string;
  memory: CompressionBucketResult;
  audit: CompressionBucketResult;
  checkpoints: CompressionBucketResult;
}

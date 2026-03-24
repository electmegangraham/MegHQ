
export interface IdempotencyRecord {
  idempotencyKey: string;
  routeKey: string;
  responseCode: number;
  responseBody: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdempotencyRecordInput {
  idempotencyKey: string;
  routeKey: string;
  responseCode: number;
  responseBody: Record<string, unknown>;
}

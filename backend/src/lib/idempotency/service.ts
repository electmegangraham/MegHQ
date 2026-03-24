
import { createIdempotencyRecord, getIdempotencyRecord } from "./repository.js";

export async function getStoredIdempotentResponse(idempotencyKey: string, routeKey: string) {
  return getIdempotencyRecord(idempotencyKey, routeKey);
}

export async function storeIdempotentResponse(
  idempotencyKey: string,
  routeKey: string,
  responseCode: number,
  responseBody: Record<string, unknown>
) {
  return createIdempotencyRecord({
    idempotencyKey,
    routeKey,
    responseCode,
    responseBody
  });
}

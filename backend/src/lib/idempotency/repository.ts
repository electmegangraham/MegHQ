
import { getDbClient } from "../db/client.js";
import type { CreateIdempotencyRecordInput, IdempotencyRecord } from "./types.js";

function mapRow(row: Record<string, unknown>): IdempotencyRecord {
  return {
    idempotencyKey: String(row["idempotency_key"]),
    routeKey: String(row["route_key"]),
    responseCode: Number(row["response_code"]),
    responseBody: (row["response_body"] as Record<string, unknown>) ?? {},
    createdAt: String(row["created_at"]),
    updatedAt: String(row["updated_at"])
  };
}

export async function getIdempotencyRecord(idempotencyKey: string, routeKey: string): Promise<IdempotencyRecord | null> {
  const db = getDbClient();

  const { data, error } = await db
    .from("idempotency_keys")
    .select("idempotency_key, route_key, response_code, response_body, created_at, updated_at")
    .eq("idempotency_key", idempotencyKey)
    .eq("route_key", routeKey)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load idempotency record: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

export async function createIdempotencyRecord(input: CreateIdempotencyRecordInput): Promise<IdempotencyRecord> {
  const db = getDbClient();
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("idempotency_keys")
    .insert({
      idempotency_key: input.idempotencyKey,
      route_key: input.routeKey,
      response_code: input.responseCode,
      response_body: input.responseBody,
      created_at: now,
      updated_at: now
    })
    .select("idempotency_key, route_key, response_code, response_body, created_at, updated_at")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create idempotency record: ${error?.message ?? "Unknown insert error"}`);
  }

  return mapRow(data as unknown as Record<string, unknown>);
}

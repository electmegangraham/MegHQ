
import { getDbClient } from "../db/client.js";
import { enforceExecutionTransition } from "./enforce.js";
import type { TransitionRequest } from "./types.js";

export async function persistTransition(input: TransitionRequest & { objectId: string }) {
  const db = getDbClient();

  const { data: current, error } = await db
    .from(input.objectType + "s")
    .select("status")
    .eq("id", input.objectId)
    .single();

  if (error || !current) {
    throw new Error("Failed to load current state");
  }

  const result = enforceExecutionTransition({
    ...input,
    currentStatus: current.status
  });

  const { error: updateError } = await db
    .from(input.objectType + "s")
    .update({
      status: input.nextStatus,
      updated_at: new Date().toISOString()
    })
    .eq("id", input.objectId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return {
    persisted: true,
    result
  };
}

import { evaluateTransition } from "./rules.js";
import type { TransitionRequest, TransitionResult } from "./types.js";

export function enforceExecutionTransition(input: TransitionRequest): TransitionResult {
  const result = evaluateTransition(input);

  if (!result.allowed) {
    const error: any = new Error(result.reason);
    error.code = "INVALID_TRANSITION";
    error.statusCode = 400;
    error.details = result;
    throw error;
  }

  return result;
}

export function enforceExecution(currentStatus: string, nextStatus: string) {
  return enforceExecutionTransition({
    objectType: "task",
    currentStatus,
    nextStatus
  });
}

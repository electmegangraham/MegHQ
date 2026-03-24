
import { evaluateTransition } from "./rules.js";
import type { TransitionRequest } from "./types.js";

export function enforceExecutionTransition(input: TransitionRequest) {
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

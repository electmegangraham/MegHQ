import { getAllowedTransitions, normalizeStatus } from "./stateMachine.js";
import type { TransitionRequest, TransitionResult } from "./types.js";

export function evaluateTransition(input: TransitionRequest): TransitionResult {
  const {
    objectType,
    currentStatus,
    nextStatus,
    hasOpenBlocker,
    hasRequiredApproval,
    hasCompletionEvidence,
    sourceTrace
  } = input;

  const normalizedCurrent = normalizeStatus(objectType, currentStatus);
  const normalizedNext = normalizeStatus(objectType, nextStatus);
  const allowedNext = getAllowedTransitions(objectType, currentStatus);

  if (!allowedNext.includes(normalizedNext)) {
    return fail(input, `Invalid status transition: ${normalizedCurrent} -> ${normalizedNext}.`);
  }

  if ((objectType === "task" || objectType === "initiative") && normalizedNext === "done") {
    if (hasOpenBlocker) {
      return fail(input, "Cannot complete while open blocker exists.");
    }
  }

  if (objectType === "task" && normalizedNext === "done" && hasRequiredApproval === false) {
    return fail(input, "Cannot complete task without required approval.");
  }

  if (objectType === "initiative" && normalizedNext === "completed" && hasCompletionEvidence === false) {
    return fail(input, "Cannot complete initiative without completion evidence.");
  }

  if (objectType === "artifact" && normalizedNext === "published" && hasRequiredApproval === false) {
    return fail(input, "Cannot publish protected artifact without valid approval.");
  }

  return {
    allowed: true,
    objectType,
    currentStatus,
    nextStatus,
    reason: `Transition allowed: ${normalizedCurrent} -> ${normalizedNext}.`,
    sourceTrace
  };
}

function fail(input: TransitionRequest, reason: string): TransitionResult {
  return {
    allowed: false,
    objectType: input.objectType,
    currentStatus: input.currentStatus,
    nextStatus: input.nextStatus,
    reason,
    sourceTrace: input.sourceTrace
  };
}

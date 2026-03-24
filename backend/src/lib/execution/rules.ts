import type { TransitionRequest, TransitionResult, WorkflowObjectType } from "./types.js";

const ALLOWED: Record<WorkflowObjectType, Record<string, string[]>> = {
  task: {
    captured: ["normalized"],
    normalized: ["routed"],
    routed: ["accepted"],
    accepted: ["in_progress"],
    in_progress: ["blocked", "awaiting_review", "complete"],
    blocked: ["in_progress"],
    awaiting_review: ["awaiting_approval", "in_progress"],
    awaiting_approval: ["in_progress", "complete"],
    complete: ["archived"],
    cancelled: ["archived"],
    archived: []
  },
  initiative: {
    proposed: ["active"],
    active: ["blocked", "awaiting_review", "complete"],
    blocked: ["active"],
    awaiting_review: ["awaiting_approval", "active"],
    awaiting_approval: ["active", "complete"],
    complete: ["archived"],
    cancelled: ["archived"],
    archived: []
  },
  approval: {
    draft: ["requested"],
    requested: ["under_review", "cancelled"],
    under_review: ["approved", "rejected", "expired"],
    approved: ["invalidated"],
    rejected: ["archived"],
    cancelled: ["archived"],
    expired: ["archived"],
    invalidated: ["archived"],
    archived: []
  },
  artifact: {
    draft: ["in_review", "archived"],
    in_review: ["approval_pending"],
    approval_pending: ["approved"],
    approved: ["published"],
    published: ["superseded"],
    superseded: ["archived"],
    archived: []
  },
  desk_item: {
    active: ["pinned", "dismissed", "filed", "snoozed"],
    pinned: ["filed"],
    snoozed: ["active"],
    resolved: ["filed"],
    filed: ["archived"],
    dismissed: [],
    archived: []
  }
};

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

  const allowedNext = ALLOWED[objectType][currentStatus] ?? [];
  if (!allowedNext.includes(nextStatus)) {
    return fail(input, "Invalid status transition.");
  }

  if ((objectType === "task" || objectType === "initiative") && nextStatus === "complete") {
    if (hasOpenBlocker) {
      return fail(input, "Cannot complete while open blocker exists.");
    }
  }

  if (objectType === "task" && nextStatus === "complete" && hasRequiredApproval === false) {
    return fail(input, "Cannot complete task without required approval.");
  }

  if (objectType === "initiative" && nextStatus === "complete" && hasCompletionEvidence === false) {
    return fail(input, "Cannot complete initiative without completion evidence.");
  }

  if (objectType === "artifact" && nextStatus === "published" && hasRequiredApproval === false) {
    return fail(input, "Cannot publish protected artifact without valid approval.");
  }

  return {
    allowed: true,
    objectType,
    currentStatus,
    nextStatus,
    reason: "Transition allowed.",
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

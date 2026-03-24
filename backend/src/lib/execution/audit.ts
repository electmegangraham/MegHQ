import type { TransitionRequest, TransitionResult } from "./types.js";

export interface LifecycleAuditEvent {
  eventType: "lifecycle_transition";
  objectType: string;
  currentStatus: string;
  nextStatus: string;
  allowed: boolean;
  reason: string;
  sourceTrace?: Record<string, unknown> | null;
  createdAt: string;
}

export function toLifecycleAuditEvent(
  input: TransitionRequest,
  result: TransitionResult
): LifecycleAuditEvent {
  return {
    eventType: "lifecycle_transition",
    objectType: input.objectType,
    currentStatus: input.currentStatus,
    nextStatus: input.nextStatus,
    allowed: result.allowed,
    reason: result.reason,
    sourceTrace: result.sourceTrace,
    createdAt: new Date().toISOString()
  };
}

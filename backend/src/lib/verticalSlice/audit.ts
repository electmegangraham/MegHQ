import type { VerticalSliceRequest, VerticalSliceResult } from "./types.js";

export interface VerticalSliceAuditEvent {
  eventType: "vertical_slice_execution";
  signalId: string;
  initiativeId: string;
  taskId: string;
  deskItemId: string;
  ok: boolean;
  reason: string;
  sourceTrace?: Record<string, unknown> | null;
  createdAt: string;
}

export function toVerticalSliceAuditEvent(
  request: VerticalSliceRequest,
  result: VerticalSliceResult
): VerticalSliceAuditEvent {
  return {
    eventType: "vertical_slice_execution",
    signalId: request.signalId,
    initiativeId: result.created.initiativeId,
    taskId: result.created.taskId,
    deskItemId: result.created.deskItemId,
    ok: result.ok,
    reason: result.reason,
    sourceTrace: result.sourceTrace,
    createdAt: new Date().toISOString()
  };
}

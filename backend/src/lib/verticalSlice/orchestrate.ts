import type { VerticalSliceRequest, VerticalSliceResult } from "./types.js";

function pseudoId(prefix: string, seed: string): string {
  const clean = seed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24);
  return `${prefix}_${clean || "generated"}`;
}

export function runVerticalSlice(request: VerticalSliceRequest): VerticalSliceResult {
  const initiativeId = pseudoId("init", request.initiativeTitle);
  const taskId = pseudoId("task", request.taskTitle);
  const deskItemId = pseudoId("desk", request.signalTitle);

  return {
    ok: true,
    created: {
      signalId: request.signalId,
      initiativeId,
      taskId,
      artifactId: request.artifactId,
      approvalId: request.approvalId,
      deskItemId
    },
    states: {
      initiativeStatus: "active",
      taskStatus: "accepted",
      deskItemStatus: "active"
    },
    reason: "Governed vertical slice starter executed from signal to initiative/task/desk surfacing.",
    sourceTrace: request.sourceTrace ?? null
  };
}

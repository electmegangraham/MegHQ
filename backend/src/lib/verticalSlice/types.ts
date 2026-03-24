export interface VerticalSliceRequest {
  signalId: string;
  signalTitle: string;
  initiativeTitle: string;
  taskTitle: string;
  ownerId: string;
  leadDepartmentId: string;
  artifactId?: string;
  approvalId?: string;
  sourceTrace?: Record<string, unknown> | null;
}

export interface VerticalSliceResult {
  ok: boolean;
  created: {
    signalId: string;
    initiativeId: string;
    taskId: string;
    artifactId?: string;
    approvalId?: string;
    deskItemId: string;
  };
  states: {
    initiativeStatus: string;
    taskStatus: string;
    deskItemStatus: string;
  };
  reason: string;
  sourceTrace?: Record<string, unknown> | null;
}

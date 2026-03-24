export interface VerticalSliceRequest {
  signalId: string;
  signalTitle: string;
  initiativeTitle: string;
  taskTitle: string;
  ownerId: string;
  leadDepartmentId: string;
  artifactId?: string | undefined;
  approvalId?: string | undefined;
  sourceTrace?: Record<string, unknown> | null | undefined;
}

export interface VerticalSliceResult {
  ok: boolean;
  created: {
    signalId: string;
    initiativeId: string;
    taskId: string;
    artifactId?: string | undefined;
    approvalId?: string | undefined;
    deskItemId: string;
  };
  states: {
    initiativeStatus: string;
    taskStatus: string;
    deskItemStatus: string;
  };
  reason: string;
  sourceTrace?: Record<string, unknown> | null | undefined;
}

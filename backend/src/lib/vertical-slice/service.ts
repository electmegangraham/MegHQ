export type SignalInput = {
  projectId?: string;
  signalType?: string;
  title?: string;
  description?: string;
  requiresApproval?: boolean;
};

export type VerticalSliceResult = {
  signal: {
    id: string;
    projectId: string;
    signalType: string;
    title: string;
    description: string;
    status: "received";
  };
  initiative: {
    id: string;
    signalId: string;
    title: string;
    status: "proposed";
  };
  task: {
    id: string;
    initiativeId: string;
    title: string;
    status: "pending_approval" | "ready";
  };
  approval: null | {
    id: string;
    taskId: string;
    status: "pending";
  };
  deskItem: {
    id: string;
    entityType: "approval" | "execution";
    entityId: string;
    status: "active";
  };
};

function makeId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createVerticalSlice(input: SignalInput): VerticalSliceResult {
  const projectId = input.projectId ?? "default";
  const signalId = makeId("sig");
  const initiativeId = makeId("init");
  const taskId = makeId("task");
  const requiresApproval = input.requiresApproval ?? true;

  const signal = {
    id: signalId,
    projectId,
    signalType: input.signalType ?? "general",
    title: input.title ?? "New signal",
    description: input.description ?? "",
    status: "received" as const,
  };

  const initiative = {
    id: initiativeId,
    signalId,
    title: signal.title,
    status: "proposed" as const,
  };

  const task = {
    id: taskId,
    initiativeId,
    title: signal.title,
    status: (requiresApproval ? "pending_approval" : "ready") as const,
  };

  const approval = requiresApproval
    ? {
        id: makeId("approval"),
        taskId,
        status: "pending" as const,
      }
    : null;

  const deskItem = {
    id: makeId("desk"),
    entityType: (approval ? "approval" : "execution") as const,
    entityId: approval ? approval.id : task.id,
    status: "active" as const,
  };

  return {
    signal,
    initiative,
    task,
    approval,
    deskItem,
  };
}

export function getDeskProjection() {
  return {
    items: [
      {
        id: "desk_sample",
        entityType: "approval",
        entityId: "approval_sample",
        status: "active",
        title: "Pending approval for vertical slice execution",
      },
    ],
  };
}

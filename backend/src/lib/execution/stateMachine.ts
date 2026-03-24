import type { WorkflowObjectType } from "./types.js";

export type CanonicalTaskStatus = "pending" | "in_progress" | "blocked" | "done";
export type CanonicalInitiativeStatus = "draft" | "active" | "completed" | "archived";
export type CanonicalDeskItemStatus = "open" | "acknowledged" | "resolved";

type StateMap = Record<string, string[]>;

const TASK_TRANSITIONS: StateMap = {
  pending: ["in_progress", "blocked"],
  in_progress: ["blocked", "done"],
  blocked: ["in_progress"],
  done: []
};

const INITIATIVE_TRANSITIONS: StateMap = {
  draft: ["active"],
  active: ["completed", "archived"],
  completed: ["archived"],
  archived: []
};

const DESK_ITEM_TRANSITIONS: StateMap = {
  open: ["acknowledged", "resolved"],
  acknowledged: ["resolved"],
  resolved: []
};

const APPROVAL_TRANSITIONS: StateMap = {
  draft: ["requested"],
  requested: ["under_review", "cancelled"],
  under_review: ["approved", "rejected", "expired"],
  approved: ["invalidated"],
  rejected: ["archived"],
  cancelled: ["archived"],
  expired: ["archived"],
  invalidated: ["archived"],
  archived: []
};

const ARTIFACT_TRANSITIONS: StateMap = {
  draft: ["in_review", "archived"],
  in_review: ["approval_pending"],
  approval_pending: ["approved"],
  approved: ["published"],
  published: ["superseded"],
  superseded: ["archived"],
  archived: []
};

export const transitions: Record<WorkflowObjectType, StateMap> = {
  task: TASK_TRANSITIONS,
  initiative: INITIATIVE_TRANSITIONS,
  desk_item: DESK_ITEM_TRANSITIONS,
  approval: APPROVAL_TRANSITIONS,
  artifact: ARTIFACT_TRANSITIONS
};

const LEGACY_TO_CANONICAL: Record<WorkflowObjectType, Record<string, string>> = {
  task: {
    captured: "pending",
    normalized: "pending",
    routed: "pending",
    accepted: "pending",
    pending: "pending",
    in_progress: "in_progress",
    blocked: "blocked",
    awaiting_review: "in_progress",
    awaiting_approval: "in_progress",
    complete: "done",
    done: "done",
    cancelled: "done",
    archived: "done"
  },
  initiative: {
    proposed: "draft",
    draft: "draft",
    active: "active",
    blocked: "active",
    awaiting_review: "active",
    awaiting_approval: "active",
    complete: "completed",
    completed: "completed",
    cancelled: "archived",
    archived: "archived"
  },
  desk_item: {
    active: "open",
    open: "open",
    pinned: "acknowledged",
    acknowledged: "acknowledged",
    snoozed: "acknowledged",
    resolved: "resolved",
    filed: "resolved",
    dismissed: "resolved",
    archived: "resolved"
  },
  approval: {},
  artifact: {}
};

export function normalizeStatus(objectType: WorkflowObjectType, status: string): string {
  return LEGACY_TO_CANONICAL[objectType][status] ?? status;
}

export function getAllowedTransitions(objectType: WorkflowObjectType, status: string): string[] {
  const normalized = normalizeStatus(objectType, status);
  return transitions[objectType][normalized] ?? [];
}

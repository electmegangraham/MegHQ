export type StaffViewType =
  | "my_work"
  | "department_queue"
  | "collaboration"
  | "review_approval"
  | "escalation_risk"
  | "timeline";

export interface StaffQueueItem {
  id: string;
  title: string;
  status: string;
  ownerId?: string;
  leadDepartmentId?: string;
  priority?: string;
  urgency?: string;
  slaBreachState?: string;
  isBlocked?: boolean;
  requiresApproval?: boolean;
  dueAt?: string | null;
}

export interface StaffViewResponse {
  view: StaffViewType;
  items: StaffQueueItem[];
  orderingRule: string;
  reason: string;
}

import type { StaffQueueItem, StaffViewType } from "./types.js";

const SAMPLE_ITEMS: Record<StaffViewType, StaffQueueItem[]> = {
  my_work: [
    {
      id: "task_follow-up-donor-1",
      title: "Follow up donor outreach packet",
      status: "accepted",
      ownerId: "owner_1",
      leadDepartmentId: "finance",
      priority: "P1",
      urgency: "today",
      slaBreachState: "warning",
      isBlocked: false,
      requiresApproval: true
    }
  ],
  department_queue: [
    {
      id: "task_press-guidance-1",
      title: "Draft press guidance for event response",
      status: "in_progress",
      ownerId: "owner_2",
      leadDepartmentId: "comms",
      priority: "P0",
      urgency: "immediate",
      slaBreachState: "within_sla",
      isBlocked: false,
      requiresApproval: true
    }
  ],
  collaboration: [
    {
      id: "handoff_field-to-comms-1",
      title: "Field to comms escalation handoff",
      status: "accepted",
      ownerId: "owner_3",
      leadDepartmentId: "field",
      priority: "P1",
      urgency: "today",
      isBlocked: true,
      requiresApproval: false
    }
  ],
  review_approval: [
    {
      id: "approval_message-release-1",
      title: "Message release review packet",
      status: "under_review",
      ownerId: "owner_4",
      leadDepartmentId: "comms",
      priority: "P0",
      urgency: "immediate",
      requiresApproval: true
    }
  ],
  escalation_risk: [
    {
      id: "blocker_event-logistics-1",
      title: "Critical logistics blocker",
      status: "open",
      ownerId: "owner_5",
      leadDepartmentId: "operations",
      priority: "P0",
      urgency: "immediate",
      isBlocked: true
    }
  ],
  timeline: [
    {
      id: "task_weekly-brief-1",
      title: "Prepare weekly executive brief",
      status: "accepted",
      ownerId: "owner_6",
      leadDepartmentId: "strategy",
      priority: "P1",
      urgency: "this_week",
      dueAt: "2026-03-27T17:00:00Z"
    }
  ]
};

export function getSampleItems(view: StaffViewType): StaffQueueItem[] {
  return SAMPLE_ITEMS[view] ?? [];
}

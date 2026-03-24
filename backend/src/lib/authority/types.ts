export type DecisionClass =
  | "Class A - Executive Final"
  | "Class B - Executive Review / Approval"
  | "Class C - Manager Governed"
  | "Class D - Department Governed"
  | "Class E - Automated / System Action";

export type ActorRole =
  | "Megan"
  | "ExecutiveDelegate"
  | "CampaignManager"
  | "DepartmentLead"
  | "Staff"
  | "System";

export interface AuthorityCheckInput {
  actorRole: ActorRole;
  decisionClass: DecisionClass;
  action: string;
  approvalStatus?: string | null;
  approvalRequired?: boolean;
}

export interface AuthorityCheckResult {
  allowed: boolean;
  reason: string;
  escalationTarget?: "Megan" | "Manager" | "DepartmentLead";
}

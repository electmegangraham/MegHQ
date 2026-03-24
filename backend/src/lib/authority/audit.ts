import type { AuthorityCheckInput, AuthorityCheckResult } from "./types.js";

export interface AuthorityAuditEvent {
  eventType: "authority_check";
  actorRole: string;
  decisionClass: string;
  action: string;
  allowed: boolean;
  reason: string;
  createdAt: string;
}

export function toAuthorityAuditEvent(
  input: AuthorityCheckInput,
  result: AuthorityCheckResult
): AuthorityAuditEvent {
  return {
    eventType: "authority_check",
    actorRole: input.actorRole,
    decisionClass: input.decisionClass,
    action: input.action,
    allowed: result.allowed,
    reason: result.reason,
    createdAt: new Date().toISOString()
  };
}

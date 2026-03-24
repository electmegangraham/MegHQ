import type { AuthorityInput, AuthorityResult } from "./types.js";

export function toAuthorityAuditEvent(
  input: AuthorityInput,
  result: AuthorityResult
) {
  return {
    event_type: "authority_check",
    actor_type: input.actor.type,
    payload: {
      actorId: input.actor.id,
      action: input.action,
      resourceType: input.resource.type,
      resourceId: input.resource.id,
      allowed: result.allowed,
      reason: result.reason,
      requiresApproval: result.requiresApproval === true,
      approvalId: result.approvalId
    }
  };
}

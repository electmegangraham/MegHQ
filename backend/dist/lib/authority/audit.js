export function toAuthorityAuditEvent(input, result) {
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

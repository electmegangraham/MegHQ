export function toLifecycleAuditEvent(input, result) {
    return {
        eventType: "lifecycle_transition",
        objectType: input.objectType,
        currentStatus: input.currentStatus,
        nextStatus: input.nextStatus,
        allowed: result.allowed,
        reason: result.reason,
        sourceTrace: result.sourceTrace,
        createdAt: new Date().toISOString()
    };
}

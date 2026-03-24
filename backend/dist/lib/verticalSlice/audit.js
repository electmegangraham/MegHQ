export function toVerticalSliceAuditEvent(request, result) {
    return {
        eventType: "vertical_slice_execution",
        signalId: request.signalId,
        initiativeId: result.created.initiativeId,
        taskId: result.created.taskId,
        deskItemId: result.created.deskItemId,
        ok: result.ok,
        reason: result.reason,
        sourceTrace: result.sourceTrace,
        createdAt: new Date().toISOString()
    };
}

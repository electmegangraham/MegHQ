export function toValidationAuditEvent(result) {
    if (result.ok)
        return null;
    return {
        eventType: "validation_failure",
        objectType: result.objectType,
        objectId: result.objectId,
        disposition: result.disposition,
        quarantineReason: result.quarantineReason,
        issueCodes: result.issues.map((issue) => issue.code),
        sourceTrace: result.sourceTrace,
        createdAt: new Date().toISOString()
    };
}

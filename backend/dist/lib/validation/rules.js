function issue(code, message, path) {
    return { code, message, path, severity: "error" };
}
export function validateRequiredFields(objectType, payload, requiredFields) {
    const issues = requiredFields
        .filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === "")
        .map((field) => issue("required_field_missing", `Missing required field: ${field}`, field));
    return buildResult(objectType, payload, issues);
}
export function validateEnum(objectType, payload, field, allowed) {
    const value = payload[field];
    const issues = value !== undefined && value !== null && !allowed.includes(String(value))
        ? [issue("invalid_enum", `Invalid value for ${field}: ${String(value)}`, field)]
        : [];
    return buildResult(objectType, payload, issues);
}
export function buildResult(objectType, payload, issues) {
    const sourceTrace = payload.source_trace ?? null;
    if (issues.length === 0) {
        return {
            ok: true,
            objectType,
            objectId: payload.id ? String(payload.id) : undefined,
            issues: [],
            sourceTrace
        };
    }
    return {
        ok: false,
        disposition: "quarantined",
        objectType,
        objectId: payload.id ? String(payload.id) : undefined,
        issues,
        sourceTrace,
        quarantineReason: issues[0]?.message ?? "Validation failure",
        nextStep: "Fix invalid fields and re-run validation."
    };
}

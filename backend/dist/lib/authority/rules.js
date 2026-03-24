const VALID_APPROVALS = new Set(["approved"]);
export function checkAuthority(input) {
    const { actorRole, decisionClass, approvalRequired, approvalStatus } = input;
    if (actorRole === "System" && decisionClass !== "Class E - Automated / System Action") {
        return {
            allowed: false,
            reason: "System automation may not impersonate non-automated authority classes.",
            escalationTarget: "Megan"
        };
    }
    if (decisionClass === "Class A - Executive Final" && actorRole !== "Megan") {
        return {
            allowed: false,
            reason: "Executive final decisions require Megan.",
            escalationTarget: "Megan"
        };
    }
    if (decisionClass === "Class B - Executive Review / Approval" && !["Megan", "ExecutiveDelegate"].includes(actorRole)) {
        return {
            allowed: false,
            reason: "Executive review class requires executive authority.",
            escalationTarget: "Megan"
        };
    }
    if (approvalRequired && !VALID_APPROVALS.has(String(approvalStatus ?? ""))) {
        return {
            allowed: false,
            reason: "Protected action requires valid approved status.",
            escalationTarget: "Megan"
        };
    }
    return {
        allowed: true,
        reason: "Authority check passed."
    };
}

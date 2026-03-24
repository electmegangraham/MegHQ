export function scoreDecision(input) {
    let score = 0;
    if (input.blocked)
        score += 50;
    if (input.requiresApproval)
        score += 25;
    if (input.priority === "P0")
        score += 20;
    if (input.priority === "P1")
        score += 10;
    if (input.urgency === "immediate")
        score += 15;
    if (input.urgency === "today")
        score += 8;
    score += Math.round((input.confidence ?? 0) * 10);
    const classification = score >= 60 ? "decide_now" :
        score >= 25 ? "review_soon" :
            "monitor";
    return {
        id: input.id,
        score,
        classification,
        reason: `blocked=${Boolean(input.blocked)}, approval=${Boolean(input.requiresApproval)}, priority=${input.priority ?? "none"}, urgency=${input.urgency ?? "none"}, confidence=${input.confidence ?? 0}`
    };
}
export function computeAlert(input) {
    const breached = input.blocked && input.urgency === "immediate";
    const warning = input.urgency === "today" || input.requiresApproval === true;
    const slaState = breached ? "breached" :
        warning ? "warning" :
            "within_sla";
    const level = breached ? "critical" :
        warning ? "warning" :
            "info";
    return {
        id: input.id,
        level,
        slaState,
        reason: `Computed from urgency=${input.urgency ?? "none"}, blocked=${Boolean(input.blocked)}, approval=${Boolean(input.requiresApproval)}`
    };
}

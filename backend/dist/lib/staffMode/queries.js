function sortItems(items) {
    return [...items].sort((a, b) => {
        const aBlocked = a.isBlocked ? 1 : 0;
        const bBlocked = b.isBlocked ? 1 : 0;
        if (aBlocked !== bBlocked)
            return bBlocked - aBlocked;
        const aApproval = a.requiresApproval ? 1 : 0;
        const bApproval = b.requiresApproval ? 1 : 0;
        if (aApproval !== bApproval)
            return bApproval - aApproval;
        const aPriority = a.priority ?? "P9";
        const bPriority = b.priority ?? "P9";
        if (aPriority !== bPriority)
            return aPriority.localeCompare(bPriority);
        const aUrgency = a.urgency ?? "zzzz";
        const bUrgency = b.urgency ?? "zzzz";
        return aUrgency.localeCompare(bUrgency);
    });
}
export function buildStaffView(view, items) {
    return {
        view,
        items: sortItems(items),
        orderingRule: "blocked > approval-needed > priority > urgency",
        reason: "Staff Mode core view built from canonical operational signals."
    };
}

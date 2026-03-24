export function routeFieldSignal(signal) {
    if (signal.signalType === "noise" && !signal.executiveRelevant) {
        return {
            routedTo: "suppressed",
            signalId: signal.id,
            reason: "Low-signal noise suppressed."
        };
    }
    if (signal.executiveRelevant ||
        signal.signalType === "risk" ||
        (signal.signalType === "event" && signal.urgency === "immediate")) {
        return {
            routedTo: "megans_desk",
            signalId: signal.id,
            reason: "Executive-relevant field signal routed to Megan's Desk."
        };
    }
    return {
        routedTo: "staff_mode",
        signalId: signal.id,
        reason: "Operational field signal routed to Staff Mode."
    };
}

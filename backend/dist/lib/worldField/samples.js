export function getSampleFieldSignals() {
    return [
        {
            id: "field_risk_event_1",
            title: "Venue issue escalated from field",
            signalType: "risk",
            source: "field_team",
            urgency: "immediate",
            confidence: 0.9,
            executiveRelevant: true
        },
        {
            id: "field_opportunity_1",
            title: "Local endorsement opportunity",
            signalType: "opportunity",
            source: "regional_staff",
            urgency: "today",
            confidence: 0.7,
            executiveRelevant: false
        },
        {
            id: "field_noise_1",
            title: "Low-signal chatter",
            signalType: "noise",
            source: "social_monitor",
            urgency: "scheduled",
            confidence: 0.2,
            executiveRelevant: false
        }
    ];
}

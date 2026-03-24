export function getSampleRelationships() {
    return [
        {
            id: "rel_major_donor_1",
            name: "Major Donor A",
            relationshipStrength: 85,
            influenceScore: 90,
            priorityTier: "tier_1",
            accessPath: "finance_team",
            followUpCadence: "today"
        },
        {
            id: "rel_endorser_1",
            name: "Regional Endorser",
            relationshipStrength: 70,
            influenceScore: 80,
            priorityTier: "tier_1",
            accessPath: "field_team",
            followUpCadence: "immediate"
        },
        {
            id: "rel_local_contact_1",
            name: "Local Contact",
            relationshipStrength: 40,
            influenceScore: 35,
            priorityTier: "tier_3",
            accessPath: "organizing_team",
            followUpCadence: "this_week"
        }
    ];
}
export function getSampleOpportunities() {
    return [
        {
            id: "opp_endorsement_1",
            relationshipId: "rel_endorser_1",
            title: "Secure regional endorsement",
            stage: "engaged",
            nextStep: "Schedule call"
        },
        {
            id: "opp_donor_followup_1",
            relationshipId: "rel_major_donor_1",
            title: "Close donor meeting",
            stage: "identified",
            nextStep: "Send packet"
        }
    ];
}

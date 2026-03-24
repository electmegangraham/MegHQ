function relationshipRank(r) {
    const tierWeight = r.priorityTier === "tier_1" ? 100 : r.priorityTier === "tier_2" ? 50 : 10;
    return tierWeight + r.relationshipStrength + r.influenceScore;
}
function opportunityRank(o) {
    return o.stage === "identified" ? 40 : o.stage === "engaged" ? 30 : o.stage === "stalled" ? 20 : 10;
}
export function buildRelationshipPowerResult(relationships, opportunities) {
    const orderedRelationships = [...relationships].sort((a, b) => relationshipRank(b) - relationshipRank(a));
    const orderedOpportunities = [...opportunities].sort((a, b) => opportunityRank(b) - opportunityRank(a));
    return {
        orderedRelationshipIds: orderedRelationships.map((r) => r.id),
        orderedOpportunityIds: orderedOpportunities.map((o) => o.id),
        reason: "Relationship/power starter ranked by priority tier, strength, influence, and opportunity stage."
    };
}

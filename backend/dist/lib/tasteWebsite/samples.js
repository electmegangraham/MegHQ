export function getSampleWebsiteRules() {
    return [
        {
            id: "rule_homepage_focus",
            category: "homepage",
            rule: "Homepage must stay focused and non-sprawling.",
            severity: "high"
        },
        {
            id: "rule_cta_clarity",
            category: "cta",
            rule: "CTA must be direct and campaign-relevant.",
            severity: "high"
        },
        {
            id: "rule_visual_discipline",
            category: "visual",
            rule: "Visual layer must stay clean and intentional.",
            severity: "moderate"
        }
    ];
}
export function getSampleWebsiteCandidates() {
    return [
        { id: "candidate_homepage_hero", category: "homepage", label: "Focused homepage hero" },
        { id: "candidate_cta_primary", category: "cta", label: "Volunteer now CTA" },
        { id: "candidate_extra_widget", category: "feature_scope", label: "Extra sprawl widget" }
    ];
}

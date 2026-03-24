export interface WebsiteRule {
  id: string;
  category: "homepage" | "navigation" | "cta" | "copy" | "visual" | "feature_scope";
  rule: string;
  severity: "low" | "moderate" | "high" | "critical";
}

export interface WebsiteElementCandidate {
  id: string;
  category: "homepage" | "navigation" | "cta" | "copy" | "visual" | "feature_scope";
  label: string;
}

export interface WebsiteGovernanceResult {
  approvedIds: string[];
  rejectedIds: string[];
  reason: string[];
}

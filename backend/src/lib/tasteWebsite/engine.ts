import type { WebsiteElementCandidate, WebsiteGovernanceResult, WebsiteRule } from "./types.js";

export function evaluateWebsiteGovernance(
  rules: WebsiteRule[],
  candidates: WebsiteElementCandidate[]
): WebsiteGovernanceResult {
  const approvedIds: string[] = [];
  const rejectedIds: string[] = [];
  const reason: string[] = [];

  for (const candidate of candidates) {
    const matchingRules = rules.filter((rule) => rule.category === candidate.category);

    const rejected = matchingRules.some((rule) =>
      candidate.label.toLowerCase().includes("extra") ||
      candidate.label.toLowerCase().includes("sprawl")
    );

    if (rejected) {
      rejectedIds.push(candidate.id);
      reason.push(`${candidate.id}: rejected by anti-sprawl/taste guardrails`);
    } else {
      approvedIds.push(candidate.id);
      reason.push(`${candidate.id}: approved within current taste/website guardrails`);
    }
  }

  return {
    approvedIds,
    rejectedIds,
    reason
  };
}

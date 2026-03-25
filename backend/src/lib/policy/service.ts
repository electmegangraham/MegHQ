export type PolicyEvaluationInput = {
  action?: string;
  context?: Record<string, unknown> & {
    checklistComplete?: boolean;
    amount?: number;
  };
};

export type PolicyEvaluationResult = {
  allowed: boolean;
  requiresApproval: boolean;
  reason?: string;
};

export function evaluatePolicy(input: PolicyEvaluationInput): PolicyEvaluationResult {
  const { action, context } = input;

  if (action === "publish" && !context?.checklistComplete) {
    return {
      allowed: false,
      requiresApproval: true,
      reason: "Checklist incomplete",
    };
  }

  if (action === "spend" && typeof context?.amount === "number" && context.amount > 10000) {
    return {
      allowed: false,
      requiresApproval: true,
      reason: "Budget threshold exceeded",
    };
  }

  return {
    allowed: true,
    requiresApproval: false,
  };
}

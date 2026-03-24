export type AuthorityActorType = "system" | "user";

export interface AuthorityInput {
  actor: {
    type: AuthorityActorType;
    id: string;
  };
  action: string;
  resource: {
    type: string;
    id?: string;
  };
  context?: Record<string, unknown>;
}

export interface AuthorityResult {
  allowed: boolean;
  reason?: string;
  requiresApproval?: boolean;
  approvalId?: string;
}

export class AuthorityDeniedError extends Error {
  readonly statusCode = 403;
  readonly code = "AUTHORITY_DENIED";
  readonly details: AuthorityResult;

  constructor(result: AuthorityResult) {
    super(result.reason ?? "Authority denied.");
    this.details = result;
    this.name = "AuthorityDeniedError";
  }
}

export class AuthorityApprovalRequiredError extends Error {
  readonly statusCode = 400;
  readonly code = "APPROVAL_REQUIRED";
  readonly details: AuthorityResult;

  constructor(result: AuthorityResult) {
    super(result.reason ?? "Approval required.");
    this.details = result;
    this.name = "AuthorityApprovalRequiredError";
  }
}

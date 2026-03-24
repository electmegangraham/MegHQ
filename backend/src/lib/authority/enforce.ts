import { checkAuthority } from "./rules.js";
import {
  AuthorityApprovalRequiredError,
  AuthorityDeniedError,
  type AuthorityInput,
  type AuthorityResult
} from "./types.js";

export function enforceAuthority(input: AuthorityInput): AuthorityResult {
  const result = checkAuthority(input);

  if (!result.allowed) {
    throw new AuthorityDeniedError(result);
  }

  if (result.requiresApproval) {
    throw new AuthorityApprovalRequiredError(result);
  }

  return result;
}

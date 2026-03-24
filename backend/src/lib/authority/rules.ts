import type { AuthorityInput, AuthorityResult } from "./types.js";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function checkAuthority(input: AuthorityInput): AuthorityResult {
  if (!input || typeof input !== "object") {
    return {
      allowed: false,
      reason: "Authority input is required."
    };
  }

  if (!input.actor || typeof input.actor !== "object") {
    return {
      allowed: false,
      reason: "Authority actor is required."
    };
  }

  if (input.actor.type !== "system" && input.actor.type !== "user") {
    return {
      allowed: false,
      reason: "Authority actor.type must be 'system' or 'user'."
    };
  }

  if (!isNonEmptyString(input.actor.id)) {
    return {
      allowed: false,
      reason: "Authority actor.id is required."
    };
  }

  if (!isNonEmptyString(input.action)) {
    return {
      allowed: false,
      reason: "Authority action is required."
    };
  }

  if (!input.resource || typeof input.resource !== "object") {
    return {
      allowed: false,
      reason: "Authority resource is required."
    };
  }

  if (!isNonEmptyString(input.resource.type)) {
    return {
      allowed: false,
      reason: "Authority resource.type is required."
    };
  }

  if (input.actor.type === "system" && input.context?.["userOnly"] === true) {
    return {
      allowed: false,
      reason: "This action requires a user actor."
    };
  }

  const approvalRequired = input.context?.["approvalRequired"] === true;
  const approvalId = input.context?.["approvalId"];
  const approvalStatus = input.context?.["approvalStatus"];

  if (approvalRequired) {
    if (approvalStatus === "approved" && typeof approvalId === "string") {
      return {
        allowed: true,
        reason: "Protected action has approved authorization.",
        approvalId
      };
    }

    return {
      allowed: true,
      requiresApproval: true,
      reason: "Protected action requires approval before execution.",
      ...(typeof approvalId === "string" ? { approvalId } : {})
    };
  }

  return {
    allowed: true,
    reason: "Authority check passed."
  };
}

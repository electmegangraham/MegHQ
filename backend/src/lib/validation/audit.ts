import type { ValidationResult } from "./types.js";

export interface ValidationAuditEvent {
  eventType: "validation_failure";
  objectType: string;
  objectId?: string;
  disposition?: "rejected" | "quarantined";
  quarantineReason?: string;
  issueCodes: string[];
  sourceTrace?: Record<string, unknown> | null;
  createdAt: string;
}

export function toValidationAuditEvent(result: ValidationResult): ValidationAuditEvent | null {
  if (result.ok) return null;

  return {
    eventType: "validation_failure",
    objectType: result.objectType,
    objectId: result.objectId,
    disposition: result.disposition,
    quarantineReason: result.quarantineReason,
    issueCodes: result.issues.map((issue) => issue.code),
    sourceTrace: result.sourceTrace,
    createdAt: new Date().toISOString()
  };
}

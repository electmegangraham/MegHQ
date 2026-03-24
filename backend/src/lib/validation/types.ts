export type ValidationSeverity = "error" | "warning";
export type ValidationDisposition = "rejected" | "quarantined";

export interface ValidationIssue {
  code: string;
  message: string;
  path?: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  ok: boolean;
  disposition?: ValidationDisposition;
  objectType: string;
  objectId?: string;
  issues: ValidationIssue[];
  sourceTrace?: Record<string, unknown> | null;
  quarantineReason?: string;
  nextStep?: string;
}

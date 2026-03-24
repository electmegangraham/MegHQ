export type ValidationSeverity = "error" | "warning";
export type ValidationDisposition = "rejected" | "quarantined";

export interface ValidationIssue {
  code: string;
  message: string;
  path?: string | undefined;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  ok: boolean;
  disposition?: ValidationDisposition | undefined;
  objectType: string;
  objectId?: string | undefined;
  issues: ValidationIssue[];
  sourceTrace?: Record<string, unknown> | null | undefined;
  quarantineReason?: string | undefined;
  nextStep?: string | undefined;
}

export type FieldSignalType = "risk" | "opportunity" | "intel" | "event" | "noise";

export interface FieldSignal {
  id: string;
  title: string;
  signalType: FieldSignalType;
  source: string;
  urgency?: string;
  confidence?: number;
  executiveRelevant?: boolean;
  sourceTrace?: Record<string, unknown> | null;
}

export interface FieldRoutingResult {
  routedTo: "megans_desk" | "staff_mode" | "suppressed";
  signalId: string;
  reason: string;
}

export interface RelationshipRecord {
  id: string;
  name: string;
  relationshipStrength: number;
  influenceScore: number;
  priorityTier: "tier_1" | "tier_2" | "tier_3";
  accessPath?: string;
  followUpCadence?: "immediate" | "today" | "this_week" | "scheduled";
}

export interface ConversionOpportunity {
  id: string;
  relationshipId: string;
  title: string;
  stage: "identified" | "engaged" | "converted" | "stalled";
  nextStep?: string;
}

export interface RelationshipPowerResult {
  orderedRelationshipIds: string[];
  orderedOpportunityIds: string[];
  reason: string;
}

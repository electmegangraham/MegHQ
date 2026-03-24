import type { DeskCard, DeskViewResponse } from "./types.js";

function sortCards(cards: DeskCard[]): DeskCard[] {
  return [...cards].sort((a, b) => {
    const aPriority = a.priorityBand ?? "Z";
    const bPriority = b.priorityBand ?? "Z";
    return aPriority.localeCompare(bPriority);
  });
}

export function buildDeskView(cards: DeskCard[]): DeskViewResponse {
  return {
    cards: sortCards(cards),
    clutterProtectionRule: "Only executive-relevant cards surface by default; low-signal noise is suppressed.",
    reason: "Megan's Desk core view built as projection-only executive surfacing."
  };
}

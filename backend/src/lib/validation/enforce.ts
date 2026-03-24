
export function enforceValidation(input: Record<string, unknown>) {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid payload");
  }
  if (!input["signalId"] || !input["initiativeTitle"] || !input["taskTitle"]) {
    throw new Error("Missing required fields");
  }
}

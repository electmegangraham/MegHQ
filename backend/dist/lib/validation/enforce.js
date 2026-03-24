export function enforceValidation(input) {
    if (!input || typeof input !== "object") {
        throw new Error("Invalid payload");
    }
    if (!input["signalId"] || !input["initiativeTitle"] || !input["taskTitle"]) {
        throw new Error("Missing required fields");
    }
}

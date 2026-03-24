export function enforceExecution(currentStatus, nextStatus) {
    if (currentStatus === "complete") {
        throw new Error("Cannot transition from complete");
    }
}

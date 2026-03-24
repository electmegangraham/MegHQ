
export function enforceExecution(currentStatus: string, nextStatus: string) {
  if (currentStatus === "complete") {
    throw new Error("Cannot transition from complete");
  }
}

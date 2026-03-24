export function enforceAuthority() {
    const approved = false;
    if (!approved) {
        throw new Error("Action requires approval");
    }
}

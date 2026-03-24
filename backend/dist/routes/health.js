export function registerHealthRoute(app) {
    app.get("/health", async () => ({
        ok: true,
        service: "meghq-backend",
        phase: "schema-foundation-starter"
    }));
}

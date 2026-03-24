import { getDbClient } from "../lib/db/client.js";
export function registerDbHealthRoute(app) {
    app.get("/health/db", async (_request, reply) => {
        try {
            const db = getDbClient();
            const { error } = await db.from("departments").select("id").limit(1);
            if (error) {
                return reply.code(500).send({
                    ok: false,
                    service: "meghq-backend",
                    database: "unhealthy",
                    error: error.message
                });
            }
            return reply.send({
                ok: true,
                service: "meghq-backend",
                database: "healthy"
            });
        }
        catch (error) {
            return reply.code(500).send({
                ok: false,
                service: "meghq-backend",
                database: "unhealthy",
                error: error instanceof Error ? error.message : "Unknown database error"
            });
        }
    });
}

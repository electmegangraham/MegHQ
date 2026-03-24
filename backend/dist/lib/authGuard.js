const OPEN_PATHS = new Set([
    "/health"
]);
function isOpenPath(request) {
    const rawPath = request.routeOptions.url;
    return rawPath ? OPEN_PATHS.has(rawPath) : false;
}
export function registerAuthGuardHook(app) {
    app.addHook("preHandler", async (request, reply) => {
        if (isOpenPath(request))
            return;
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.code(401).send({
                error: "missing_authorization",
                reason: "Protected route requires Authorization header."
            });
        }
    });
}

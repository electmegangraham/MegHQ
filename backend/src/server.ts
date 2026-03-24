import { buildApp } from "./app.js";
import { getEnv } from "./lib/env.js";

const env = getEnv();
const app = buildApp();

app.listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => {
    app.log.info(`MegHQ backend listening on port ${env.PORT}`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });

import assert from "node:assert/strict";
import { buildApp } from "../src/app.js";

async function main() {
  const app = buildApp();

  const health = await app.inject({
    method: "GET",
    url: "/health"
  });
  assert.equal(health.statusCode, 200);

  const protectedRoute = await app.inject({
    method: "GET",
    url: "/campaign-manager/run"
  });
  assert.equal(protectedRoute.statusCode, 401);

  await app.close();
  console.log("Smoke tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

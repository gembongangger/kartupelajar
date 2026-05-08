import { n as private_env } from "./shared-server.js";
import { createClient } from "@libsql/client";
//#region src/lib/server/db.ts
var url = private_env.TURSO_CONNECTION_URL || "file:kartu-pelajar.db";
var authToken = private_env.TURSO_AUTH_TOKEN;
var client = createClient({
	url,
	authToken
});
//#endregion
export { client as t };

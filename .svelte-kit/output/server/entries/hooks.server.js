import { t as client } from "../chunks/db.js";
//#region src/hooks.server.ts
var handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get("session");
	if (!sessionId) event.locals.user = null;
	else try {
		const [id, role] = sessionId.split(":");
		const user = (await client.execute({
			sql: "SELECT id, username, role FROM users WHERE id = ? AND role = ?",
			args: [id, role]
		})).rows[0];
		if (user) event.locals.user = {
			id: Number(user.id),
			username: String(user.username),
			role: String(user.role)
		};
		else event.locals.user = null;
	} catch (e) {
		console.error("Hooks Error:", e);
		event.locals.user = null;
	}
	return await resolve(event);
};
//#endregion
export { handle };

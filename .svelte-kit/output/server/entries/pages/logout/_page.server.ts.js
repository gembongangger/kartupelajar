import { redirect } from "@sveltejs/kit";
//#region src/routes/logout/+page.server.ts
var actions = { default: async ({ cookies }) => {
	cookies.delete("session", { path: "/" });
	throw redirect(302, "/");
} };
//#endregion
export { actions };

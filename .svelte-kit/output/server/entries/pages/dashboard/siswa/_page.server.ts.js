import { t as client } from "../../../../chunks/db.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/dashboard/siswa/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== "admin") throw redirect(302, "/");
	return { students: (await client.execute("SELECT * FROM siswa ORDER BY kelas, nama")).rows };
};
var actions = { delete: async ({ request, locals }) => {
	if (!locals.user || locals.user.role !== "admin") return fail(401);
	const nisn = (await request.formData()).get("nisn");
	if (!nisn) return fail(400);
	await client.execute({
		sql: "DELETE FROM siswa WHERE nisn = ?",
		args: [nisn.toString()]
	});
	return { success: true };
} };
//#endregion
export { actions, load };

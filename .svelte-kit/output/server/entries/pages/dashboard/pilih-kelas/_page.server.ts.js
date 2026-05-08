import { t as client } from "../../../../chunks/db.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/dashboard/pilih-kelas/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== "admin") throw redirect(302, "/");
	return { classes: (await client.execute("SELECT DISTINCT kelas FROM siswa ORDER BY kelas ASC")).rows };
};
//#endregion
export { load };

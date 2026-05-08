import { t as client } from "../../../../chunks/db.js";
import { t as fileToBlobValue } from "../../../../chunks/photo.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/dashboard/upload-foto/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== "admin") throw redirect(302, "/");
	return {};
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user || locals.user.role !== "admin") return fail(401);
	const files = (await request.formData()).getAll("fotos");
	let berhasil = 0;
	let gagal = 0;
	for (const file of files) {
		if (file.size === 0) continue;
		const name = file.name;
		if (/^\d{5,}\.jpg$/.test(name)) try {
			const nisn = name.replace(/\.jpg$/i, "");
			const buffer = Buffer.from(await file.arrayBuffer());
			if ((await client.execute({
				sql: "UPDATE siswa SET foto = ? WHERE nisn = ?",
				args: [fileToBlobValue(buffer), nisn]
			})).rowsAffected > 0) berhasil++;
			else gagal++;
		} catch (e) {
			gagal++;
		}
		else gagal++;
	}
	return {
		berhasil,
		gagal
	};
} };
//#endregion
export { actions, load };

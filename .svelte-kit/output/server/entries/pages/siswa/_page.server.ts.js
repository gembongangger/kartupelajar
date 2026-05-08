import { t as client } from "../../../chunks/db.js";
import { t as fileToBlobValue } from "../../../chunks/photo.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/siswa/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== "siswa") throw redirect(302, "/");
	const siswa = (await client.execute({
		sql: "SELECT * FROM siswa WHERE user_id = ?",
		args: [locals.user.id]
	})).rows[0];
	if (!siswa) throw redirect(302, "/");
	return { siswa };
};
var actions = {
	update: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const data = await request.formData();
		const nama = data.get("nama")?.toString() || "";
		const jk = data.get("jk")?.toString() || "";
		const tempat = data.get("tempat")?.toString() || "";
		const tgl = data.get("tgl")?.toString() || "";
		const kelas = data.get("kelas")?.toString() || "";
		await client.execute({
			sql: `UPDATE siswa SET 
                nama = ?,
                jenis_kelamin = ?,
                tempat_lahir = ?,
                tanggal_lahir = ?,
                kelas = ?
                WHERE user_id = ?`,
			args: [
				nama,
				jk,
				tempat,
				tgl,
				kelas,
				locals.user.id
			]
		});
		return { success: true };
	},
	upload_foto: async ({ request, locals }) => {
		if (!locals.user) return fail(401);
		const file = (await request.formData()).get("foto");
		if (!file || file.size === 0) return fail(400, { message: "File tidak ditemukan" });
		const siswa = (await client.execute({
			sql: "SELECT nisn FROM siswa WHERE user_id = ?",
			args: [locals.user.id]
		})).rows[0];
		if (!siswa) return fail(404, { message: "Data siswa tidak ditemukan" });
		const buffer = Buffer.from(await file.arrayBuffer());
		await client.execute({
			sql: "UPDATE siswa SET foto = ? WHERE nisn = ?",
			args: [fileToBlobValue(buffer), siswa.nisn]
		});
		return { success: true };
	}
};
//#endregion
export { actions, load };

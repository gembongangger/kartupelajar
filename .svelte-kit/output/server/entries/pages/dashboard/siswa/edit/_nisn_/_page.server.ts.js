import { t as client } from "../../../../../../chunks/db.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/dashboard/siswa/edit/[nisn]/+page.server.ts
var load = async ({ params, locals }) => {
	if (!locals.user || locals.user.role !== "admin") throw redirect(302, "/");
	const student = (await client.execute({
		sql: "SELECT * FROM siswa WHERE nisn = ?",
		args: [params.nisn]
	})).rows[0];
	if (!student) throw redirect(302, "/dashboard/siswa");
	return { student };
};
var actions = { default: async ({ request, params, locals }) => {
	if (!locals.user || locals.user.role !== "admin") return fail(401);
	const data = await request.formData();
	const nama = data.get("nama");
	const nis = data.get("nis");
	const kelas = data.get("kelas");
	const jk = data.get("jk");
	const tempat = data.get("tempat");
	const tgl = data.get("tgl");
	await client.execute({
		sql: `UPDATE siswa SET 
                nama = ?,
                nis = ?,
                kelas = ?,
                jenis_kelamin = ?,
                tempat_lahir = ?,
                tanggal_lahir = ?
                WHERE nisn = ?`,
		args: [
			nama?.toString(),
			nis?.toString(),
			kelas?.toString(),
			jk?.toString(),
			tempat?.toString(),
			tgl?.toString(),
			params.nisn
		]
	});
	throw redirect(302, "/dashboard/siswa");
} };
//#endregion
export { actions, load };

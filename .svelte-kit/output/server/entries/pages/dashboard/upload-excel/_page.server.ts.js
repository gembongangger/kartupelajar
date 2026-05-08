import { t as client } from "../../../../chunks/db.js";
import { fail, redirect } from "@sveltejs/kit";
import crypto from "crypto";
import * as XLSX from "xlsx";
//#region src/routes/dashboard/upload-excel/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== "admin") throw redirect(302, "/");
	return {};
};
function formatDate(date) {
	if (isNaN(date.getTime())) return "";
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}
var actions = { default: async ({ request, locals }) => {
	if (!locals.user || locals.user.role !== "admin") return fail(401);
	const file = (await request.formData()).get("file");
	if (!file || file.size === 0) return fail(400, { message: "No file uploaded" });
	try {
		const buffer = await file.arrayBuffer();
		const workbook = XLSX.read(buffer, { cellDates: true });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const rows = XLSX.utils.sheet_to_json(sheet, { header: "A" });
		let success = 0;
		let failed = 0;
		let errorDetails = [];
		for (let i = 1; i < rows.length; i++) {
			const row = rows[i];
			const nama = row.A || "";
			const nis = row.B || "";
			const nisn = row.C?.toString() || "";
			const kelas = row.D || "";
			const jk = row.E || "";
			const tempat = row.F || "";
			let tgl = row.G;
			if (!nisn) {
				failed++;
				errorDetails.push(`Baris ${i + 1}: NISN kosong.`);
				continue;
			}
			if (tgl instanceof Date) tgl = formatDate(tgl);
			else if (typeof tgl === "number") tgl = formatDate(new Date(Math.round((tgl - 25569) * 86400 * 1e3)));
			else tgl = tgl?.toString() || "";
			try {
				if ((await client.execute({
					sql: "SELECT id FROM users WHERE username = ?",
					args: [nisn]
				})).rows.length > 0) {
					failed++;
					errorDetails.push(`Baris ${i + 1}: NISN (${nisn}) sudah terdaftar.`);
					continue;
				}
				const password = crypto.createHash("md5").update(nisn).digest("hex");
				await client.batch([{
					sql: "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
					args: [
						nisn,
						password,
						"siswa"
					]
				}, {
					sql: "INSERT INTO siswa (nama, nis, nisn, kelas, jenis_kelamin, tempat_lahir, tanggal_lahir, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, last_insert_rowid())",
					args: [
						nama,
						nis,
						nisn,
						kelas,
						jk,
						tempat,
						tgl
					]
				}], "write");
				success++;
			} catch (e) {
				failed++;
				errorDetails.push(`Baris ${i + 1}: ${e.message}`);
			}
		}
		return {
			success,
			failed,
			errorDetails
		};
	} catch (error) {
		return fail(500, { message: "Gagal memproses file: " + error.message });
	}
} };
//#endregion
export { actions, load };

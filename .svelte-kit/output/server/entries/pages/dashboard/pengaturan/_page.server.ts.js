import { t as client } from "../../../../chunks/db.js";
import { i as imageMimeFromFile, t as fileToBlobValue } from "../../../../chunks/photo.js";
import { fail, redirect } from "@sveltejs/kit";
import crypto from "crypto";
//#region src/routes/dashboard/pengaturan/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user || locals.user.role !== "admin") throw redirect(302, "/");
	return { pengaturan: (await client.execute(`
        SELECT
            id,
            nama_sekolah,
            alamat,
            kepala_sekolah,
            nip_kepala_sekolah,
            tanggal_ttd,
            logo IS NOT NULL AS has_logo,
            tanda_tangan IS NOT NULL AS has_tanda_tangan,
            background IS NOT NULL AS has_background,
            background_belakang IS NOT NULL AS has_background_belakang
        FROM pengaturan
        WHERE id = 1
    `)).rows[0] };
};
var actions = { simpan: async ({ request, locals }) => {
	if (!locals.user || locals.user.role !== "admin") return fail(401);
	const data = await request.formData();
	const nama = data.get("nama_sekolah");
	const alamat = data.get("alamat");
	const kepala = data.get("kepala_sekolah");
	const nip_kepala = data.get("nip_kepala_sekolah");
	const tanggal = data.get("tanggal_ttd");
	const password_lama = data.get("password_lama");
	const password_baru = data.get("password_baru");
	const konfirmasi_password = data.get("konfirmasi_password");
	if (password_lama || password_baru || konfirmasi_password) {
		const admin = (await client.execute("SELECT password FROM users WHERE id = 1")).rows[0];
		if (crypto.createHash("md5").update(password_lama?.toString() || "").digest("hex") !== admin.password) return fail(400, { message: "Password lama salah" });
		if (password_baru !== konfirmasi_password) return fail(400, { message: "Konfirmasi password tidak cocok" });
		const hashedBaru = crypto.createHash("md5").update(password_baru?.toString() || "").digest("hex");
		await client.execute({
			sql: "UPDATE users SET password = ? WHERE id = 1",
			args: [hashedBaru]
		});
	}
	const uploadFile = async (fileEntry) => {
		if (!fileEntry || typeof fileEntry === "string" || !(fileEntry instanceof File) || fileEntry.size === 0) {
			console.log("uploadFile: Invalid file entry", {
				hasEntry: !!fileEntry,
				isString: typeof fileEntry === "string",
				isFile: fileEntry instanceof File,
				size: fileEntry instanceof File ? fileEntry.size : null
			});
			return null;
		}
		const file = fileEntry;
		console.log("uploadFile: Processing", {
			name: file.name,
			size: file.size,
			type: file.type
		});
		const result = {
			blob: fileToBlobValue(Buffer.from(await file.arrayBuffer())),
			mime: imageMimeFromFile(file)
		};
		console.log("uploadFile: Result", {
			blobLength: result.blob.length,
			mime: result.mime
		});
		return result;
	};
	const logoEntry = data.get("logo");
	console.log("Logo entry:", {
		isFile: logoEntry instanceof File,
		size: logoEntry instanceof File ? logoEntry.size : null,
		type: typeof logoEntry
	});
	const newLogo = await uploadFile(logoEntry);
	const newTtd = await uploadFile(data.get("tanda_tangan"));
	const newBg = await uploadFile(data.get("background"));
	const newBg2 = await uploadFile(data.get("background_belakang"));
	const args = [
		nama?.toString(),
		alamat?.toString(),
		kepala?.toString(),
		nip_kepala?.toString(),
		tanggal?.toString(),
		newLogo?.blob ?? null,
		newLogo?.mime ?? null,
		newTtd?.blob ?? null,
		newTtd?.mime ?? null,
		newBg?.blob ?? null,
		newBg?.mime ?? null,
		newBg2?.blob ?? null,
		newBg2?.mime ?? null
	];
	console.log("SQL UPDATE args:", {
		nama: args[0],
		alamat: args[1],
		kepala: args[2],
		nip: args[3],
		tanggal: args[4],
		logoBlobSize: newLogo?.blob?.length ?? null,
		logoMime: newLogo?.mime ?? null,
		ttdBlobSize: newTtd?.blob?.length ?? null,
		bgBlobSize: newBg?.blob?.length ?? null,
		bg2BlobSize: newBg2?.blob?.length ?? null
	});
	await client.execute({
		sql: `UPDATE pengaturan SET
                nama_sekolah = ?,
                alamat = ?,
                kepala_sekolah = ?,
                nip_kepala_sekolah = ?,
                tanggal_ttd = ?,
                logo = COALESCE(?, logo),
                logo_mime = COALESCE(?, logo_mime),
                tanda_tangan = COALESCE(?, tanda_tangan),
                tanda_tangan_mime = COALESCE(?, tanda_tangan_mime),
                background = COALESCE(?, background),
                background_mime = COALESCE(?, background_mime),
                background_belakang = COALESCE(?, background_belakang),
                background_belakang_mime = COALESCE(?, background_belakang_mime)
                WHERE id = 1`,
		args
	});
	console.log("UPDATE pengaturan executed successfully");
	return { success: true };
} };
//#endregion
export { actions, load };

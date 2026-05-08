import { t as client } from "../../../../chunks/db.js";
import { a as photoValueToBuffer, n as getDefaultPhotoBuffer } from "../../../../chunks/photo.js";
import { error } from "@sveltejs/kit";
//#region src/routes/foto/[nisn].jpg/+server.ts
var GET = async ({ params }) => {
	const row = (await client.execute({
		sql: "SELECT foto FROM siswa WHERE nisn = ?",
		args: [params.nisn]
	})).rows[0];
	if (!row) throw error(404, "Foto tidak ditemukan");
	const buffer = photoValueToBuffer(row?.foto) || getDefaultPhotoBuffer();
	if (!buffer) throw error(404, "Foto tidak ditemukan");
	return new Response(buffer, { headers: {
		"Content-Type": "image/jpeg",
		"Cache-Control": "private, max-age=0, must-revalidate"
	} });
};
//#endregion
export { GET };

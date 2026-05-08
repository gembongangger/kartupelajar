import { t as client } from "../../../../../chunks/db.js";
import { a as photoValueToBuffer } from "../../../../../chunks/photo.js";
import { error } from "@sveltejs/kit";
//#region src/routes/pengaturan/gambar/[jenis]/+server.ts
var imageColumns = {
	logo: ["logo", "logo_mime"],
	tanda_tangan: ["tanda_tangan", "tanda_tangan_mime"],
	background: ["background", "background_mime"],
	background_belakang: ["background_belakang", "background_belakang_mime"]
};
var GET = async ({ params }) => {
	const columns = imageColumns[params.jenis];
	if (!columns) throw error(404, "Gambar tidak ditemukan");
	const [imageColumn, mimeColumn] = columns;
	const row = (await client.execute(`SELECT ${imageColumn} AS gambar, ${mimeColumn} AS mime FROM pengaturan WHERE id = 1`)).rows[0];
	const buffer = photoValueToBuffer(row?.gambar);
	if (!buffer) throw error(404, "Gambar tidak ditemukan");
	return new Response(buffer, { headers: {
		"Content-Type": row?.mime?.toString() || "application/octet-stream",
		"Cache-Control": "private, max-age=0, must-revalidate"
	} });
};
//#endregion
export { GET };

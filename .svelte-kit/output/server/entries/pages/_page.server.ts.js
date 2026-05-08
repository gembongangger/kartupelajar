import { t as client } from "../../chunks/db.js";
import { fail, redirect } from "@sveltejs/kit";
import crypto from "crypto";
//#region src/routes/+page.server.ts
var load = async ({ locals }) => {
	if (locals.user) if (locals.user.role === "admin") throw redirect(302, "/dashboard");
	else throw redirect(302, "/siswa");
	try {
		return { pengaturan: (await client.execute(`
            SELECT
                id,
                nama_sekolah,
                alamat,
                kepala_sekolah,
                nip_kepala_sekolah,
                tanggal_ttd,
                logo IS NOT NULL AS has_logo
            FROM pengaturan
            LIMIT 1
        `)).rows[0] };
	} catch (e) {
		return { pengaturan: null };
	}
};
var actions = { login: async ({ request, cookies }) => {
	const data = await request.formData();
	const username = data.get("username")?.toString().trim() || "";
	const password = data.get("password")?.toString().trim() || "";
	if (!username || !password) return fail(400, { message: "Username dan Password wajib diisi." });
	const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
	let user;
	try {
		user = (await client.execute({
			sql: "SELECT * FROM users WHERE username = ? AND password = ?",
			args: [username, hashedPassword]
		})).rows[0];
	} catch (e) {
		console.error("Database Login Error:", e);
		return fail(500, { message: "Kesalahan Database: " + e.message });
	}
	if (!user) return fail(400, { message: "Login gagal! Username atau Password salah." });
	cookies.set("session", `${user.id}:${user.role}`, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		maxAge: 3600 * 24
	});
	if (user.role === "admin") throw redirect(302, "/dashboard");
	else throw redirect(302, "/siswa");
} };
//#endregion
export { actions, load };

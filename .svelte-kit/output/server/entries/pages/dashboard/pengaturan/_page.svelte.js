import { I as attr, L as escape_html, n as derived } from "../../../../chunks/dev.js";
import "../../../../chunks/forms.js";
//#region src/routes/dashboard/pengaturan/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let pengaturan = derived(() => data.pengaturan);
		let logoPreview = derived(() => pengaturan().has_logo ? "/pengaturan/gambar/logo" : "");
		let ttdPreview = derived(() => pengaturan().has_tanda_tangan ? "/pengaturan/gambar/tanda_tangan" : "");
		let bgPreview = derived(() => pengaturan().has_background ? "/pengaturan/gambar/background" : "");
		let bg2Preview = derived(() => pengaturan().has_background_belakang ? "/pengaturan/gambar/background_belakang" : "");
		$$renderer.push(`<div class="settings-body svelte-u700tp"><h2 class="svelte-u700tp">Pengaturan Sekolah</h2> `);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="error svelte-u700tp">${escape_html(form.message)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p style="color: green; text-align: center;" class="svelte-u700tp">Profil sekolah berhasil disimpan</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST" action="?/simpan" enctype="multipart/form-data" class="svelte-u700tp"><p class="svelte-u700tp"><label for="nama_sekolah" class="svelte-u700tp">Nama Sekolah:</label> <input type="text" name="nama_sekolah" id="nama_sekolah"${attr("value", pengaturan().nama_sekolah)} required="" class="svelte-u700tp"/></p> <p class="svelte-u700tp"><label for="alamat" class="svelte-u700tp">Alamat:</label> <textarea name="alamat" id="alamat" rows="3" required="" class="svelte-u700tp">`);
		const $$body = escape_html(pengaturan().alamat);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></p> <p class="svelte-u700tp"><label for="kepala_sekolah" class="svelte-u700tp">Kepala Sekolah:</label> <input type="text" name="kepala_sekolah" id="kepala_sekolah"${attr("value", pengaturan().kepala_sekolah)} required="" class="svelte-u700tp"/></p> <p class="svelte-u700tp"><label for="nip_kepala_sekolah" class="svelte-u700tp">NIP Kepala Sekolah:</label> <input type="text" name="nip_kepala_sekolah" id="nip_kepala_sekolah"${attr("value", pengaturan().nip_kepala_sekolah)} required="" class="svelte-u700tp"/></p> <p class="svelte-u700tp"><label for="tanggal_ttd" class="svelte-u700tp">Tanggal TTD:</label> <input type="date" name="tanggal_ttd" id="tanggal_ttd"${attr("value", pengaturan().tanggal_ttd)} required="" class="svelte-u700tp"/></p> <p class="svelte-u700tp"><label for="logo" class="svelte-u700tp">Logo (.png):</label> <input type="file" name="logo" id="logo" accept=".png" class="svelte-u700tp"/> `);
		if (logoPreview()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", logoPreview())} alt="Logo" class="preview svelte-u700tp"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></p> <p class="svelte-u700tp"><label for="tanda_tangan" class="svelte-u700tp">Tanda Tangan Kepala Sekolah:</label> <input type="file" name="tanda_tangan" id="tanda_tangan" class="svelte-u700tp"/> `);
		if (ttdPreview()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", ttdPreview())} alt="Tanda Tangan" class="preview svelte-u700tp"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></p> <p class="svelte-u700tp"><label for="background" class="svelte-u700tp">Background Kartu:</label> <input type="file" name="background" id="background" class="svelte-u700tp"/> `);
		if (bgPreview()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", bgPreview())} alt="Background" class="preview svelte-u700tp"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></p> <p class="svelte-u700tp"><label for="background_belakang" class="svelte-u700tp">Background Kartu Belakang:</label> <input type="file" name="background_belakang" id="background_belakang" class="svelte-u700tp"/> `);
		if (bg2Preview()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", bg2Preview())} alt="Background Belakang" class="preview svelte-u700tp"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></p> <hr/> <h3>Ubah Password Admin</h3> <p class="svelte-u700tp"><label for="password_lama" class="svelte-u700tp">Password Lama:</label> <input type="password" name="password_lama" id="password_lama" class="svelte-u700tp"/></p> <p class="svelte-u700tp"><label for="password_baru" class="svelte-u700tp">Password Baru:</label> <input type="password" name="password_baru" id="password_baru" class="svelte-u700tp"/></p> <p class="svelte-u700tp"><label for="konfirmasi_password" class="svelte-u700tp">Konfirmasi Password Baru:</label> <input type="password" name="konfirmasi_password" id="konfirmasi_password" class="svelte-u700tp"/></p> <button type="submit" class="svelte-u700tp">Simpan Pengaturan</button></form> <a href="/dashboard" class="back-link svelte-u700tp">← Kembali ke Dashboard</a></div>`);
	});
}
//#endregion
export { _page as default };

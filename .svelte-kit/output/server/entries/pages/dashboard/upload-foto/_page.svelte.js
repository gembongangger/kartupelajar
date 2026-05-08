import { L as escape_html } from "../../../../chunks/dev.js";
import "../../../../chunks/forms.js";
//#region src/routes/dashboard/upload-foto/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		$$renderer.push(`<div class="upload-foto-body svelte-kminbu"><h2>Upload Foto Siswa Massal</h2> <p><strong>Catatan:</strong> Pastikan nama file = <code>NISN.jpg</code> (contoh: <code>3219876540.jpg</code>)</p> <form method="POST" enctype="multipart/form-data"><input type="file" name="fotos" accept=".jpg" multiple="" required="" class="svelte-kminbu"/><br/> <button type="submit">Upload</button></form> `);
		if (form) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p>✅ Berhasil upload: <strong>${escape_html(form.berhasil)}</strong><br/>❌ Gagal: <strong>${escape_html(form.gagal)}</strong></p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <a href="/dashboard" class="back-link svelte-kminbu">← Kembali ke Dashboard</a></div>`);
	});
}
//#endregion
export { _page as default };

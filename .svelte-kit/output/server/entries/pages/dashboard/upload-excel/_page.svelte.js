import { L as escape_html, r as ensure_array_like } from "../../../../chunks/dev.js";
import "../../../../chunks/forms.js";
//#region src/routes/dashboard/upload-excel/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		$$renderer.push(`<div class="upload-body svelte-3kubwv"><div class="container svelte-3kubwv"><h2 class="svelte-3kubwv">Upload Excel Siswa</h2> `);
		if (form) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="info svelte-3kubwv"><strong>Hasil Upload:</strong><br/> ✅ Berhasil: ${escape_html(form.success)} | ❌ Gagal: ${escape_html(form.failed)}</div> `);
			if (form.errorDetails && form.errorDetails.length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="error-log svelte-3kubwv"><h4 class="svelte-3kubwv">Detail Kesalahan:</h4> <ul><!--[-->`);
				const each_array = ensure_array_like(form.errorDetails);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let err = each_array[$$index];
					$$renderer.push(`<li>${escape_html(err)}</li>`);
				}
				$$renderer.push(`<!--]--></ul></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST" enctype="multipart/form-data" class="svelte-3kubwv"><a href="/format_data_siswa.xls" class="template-link svelte-3kubwv" download="">⬇️ Download Template Excel (.xls)</a> <input type="file" name="file" accept=".xls, .xlsx" required="" class="svelte-3kubwv"/> <button type="submit" class="svelte-3kubwv">Proses Upload</button></form> <div class="link svelte-3kubwv"><p><a href="/dashboard" class="svelte-3kubwv">← Kembali ke Dashboard</a></p></div></div></div>`);
	});
}
//#endregion
export { _page as default };

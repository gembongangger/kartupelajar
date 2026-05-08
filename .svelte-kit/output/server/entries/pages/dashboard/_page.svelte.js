import { L as escape_html } from "../../../chunks/dev.js";
import "../../../chunks/forms.js";
//#region src/routes/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		$$renderer.push(`<div class="dashboard-body svelte-x1i5gj"><h2 class="svelte-x1i5gj">Selamat datang, ${escape_html(data.user.username)}!</h2> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="status svelte-x1i5gj" style="color: green;">${escape_html(form.message)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.message && !form.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="status svelte-x1i5gj" style="color: red;">${escape_html(form.message)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <ul class="svelte-x1i5gj"><li class="svelte-x1i5gj"><a href="/dashboard/upload-excel" class="excel svelte-x1i5gj">Upload Data Siswa EXCEL (xls)</a></li> <li class="svelte-x1i5gj"><a href="/dashboard/upload-foto" class="powerpoint svelte-x1i5gj">Upload Foto Siswa (Pilih)</a></li> <li class="svelte-x1i5gj"><a href="/dashboard/pengaturan" class="word svelte-x1i5gj">Pengaturan Profil Sekolah</a></li> <li class="svelte-x1i5gj"><a href="/dashboard/pilih-kelas" class="canva svelte-x1i5gj">Cetak Kartu Per Kelas</a></li> <li class="svelte-x1i5gj"><a href="/dashboard/cetak" class="default svelte-x1i5gj" target="_blank">Cetak Semua Kartu</a></li> <li class="svelte-x1i5gj"><a href="/dashboard/siswa" class="default svelte-x1i5gj">Daftar Nama Siswa</a></li> <li class="svelte-x1i5gj"><form method="POST" action="?/reset"><button type="submit" class="danger svelte-x1i5gj">RESET DATABASE</button></form></li> <li class="svelte-x1i5gj"><form method="POST" action="/logout"><button type="submit" class="default svelte-x1i5gj">Logout</button></form></li></ul></div>`);
	});
}
//#endregion
export { _page as default };

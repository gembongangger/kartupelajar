import { I as attr, L as escape_html, o as stringify, r as ensure_array_like } from "../../../../chunks/dev.js";
import "../../../../chunks/forms.js";
//#region src/routes/dashboard/siswa/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<div class="list-body svelte-apd6j9"><h2>Daftar Siswa</h2> <table class="svelte-apd6j9"><thead><tr><th class="svelte-apd6j9">No</th><th class="svelte-apd6j9">NIS</th><th class="svelte-apd6j9">NISN</th><th class="svelte-apd6j9">Nama</th><th class="svelte-apd6j9">Kelas</th><th class="svelte-apd6j9">Jenis Kelamin</th><th class="svelte-apd6j9">Tgl Lahir</th><th class="svelte-apd6j9">Aksi</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(data.students);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let row = each_array[i];
			$$renderer.push(`<tr><td class="svelte-apd6j9">${escape_html(i + 1)}</td><td class="svelte-apd6j9">${escape_html(row.nis)}</td><td class="svelte-apd6j9">${escape_html(row.nisn)}</td><td class="svelte-apd6j9">${escape_html(row.nama)}</td><td class="svelte-apd6j9">${escape_html(row.kelas)}</td><td class="svelte-apd6j9">${escape_html(row.jenis_kelamin)}</td><td class="svelte-apd6j9">${escape_html(row.tanggal_lahir)}</td><td class="svelte-apd6j9"><a class="button button-edit svelte-apd6j9"${attr("href", `/dashboard/siswa/edit/${stringify(row.nisn)}`)}>Edit</a> <a class="button svelte-apd6j9"${attr("href", `/dashboard/cetak?nisn=${stringify(row.nisn)}`)} target="_blank">Cetak Kartu</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="nisn"${attr("value", row.nisn)}/> <button type="submit" class="button button-delete svelte-apd6j9">Hapus</button></form></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table> <a href="/dashboard" class="back-link svelte-apd6j9">← Kembali ke Dashboard</a></div>`);
	});
}
//#endregion
export { _page as default };

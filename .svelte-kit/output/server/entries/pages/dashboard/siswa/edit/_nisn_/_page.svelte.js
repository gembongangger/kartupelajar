import { I as attr, n as derived } from "../../../../../../chunks/dev.js";
import "../../../../../../chunks/forms.js";
//#region src/routes/dashboard/siswa/edit/[nisn]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let student = derived(() => data.student);
		$$renderer.push(`<div class="edit-body svelte-1270qub"><h2>Edit Data Siswa</h2> <form method="POST"><label for="nama" class="svelte-1270qub">Nama Lengkap</label> <input type="text" name="nama" id="nama"${attr("value", student().nama)} required="" class="svelte-1270qub"/> <label for="nis" class="svelte-1270qub">NIS</label> <input type="text" name="nis" id="nis"${attr("value", student().nis)} required="" class="svelte-1270qub"/> <label for="kelas" class="svelte-1270qub">Kelas</label> <input type="text" name="kelas" id="kelas"${attr("value", student().kelas)} required="" class="svelte-1270qub"/> <label for="jk" class="svelte-1270qub">Jenis Kelamin</label> `);
		$$renderer.select({
			name: "jk",
			id: "jk",
			value: student().jenis_kelamin,
			required: true,
			class: ""
		}, ($$renderer) => {
			$$renderer.option({ value: "L" }, ($$renderer) => {
				$$renderer.push(`Laki-laki`);
			});
			$$renderer.option({ value: "P" }, ($$renderer) => {
				$$renderer.push(`Perempuan`);
			});
		}, "svelte-1270qub");
		$$renderer.push(` <label for="tempat" class="svelte-1270qub">Tempat Lahir</label> <input type="text" name="tempat" id="tempat"${attr("value", student().tempat_lahir)} class="svelte-1270qub"/> <label for="tgl" class="svelte-1270qub">Tanggal Lahir</label> <input type="date" name="tgl" id="tgl"${attr("value", student().tanggal_lahir)} class="svelte-1270qub"/> <button type="submit" class="svelte-1270qub">Simpan Perubahan</button></form> <a href="/dashboard/siswa" class="back-link svelte-1270qub">← Kembali ke Daftar Siswa</a></div>`);
	});
}
//#endregion
export { _page as default };

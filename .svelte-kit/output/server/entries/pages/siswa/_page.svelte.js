import { I as attr, n as derived, o as stringify } from "../../../chunks/dev.js";
import "../../../chunks/forms.js";
//#region src/routes/siswa/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let siswa = derived(() => data.siswa);
		$$renderer.push(`<div class="siswa-body svelte-1sjgise"><h2 class="svelte-1sjgise">Profil Siswa</h2> <form method="POST" action="?/update" class="svelte-1sjgise"><label for="nama" class="svelte-1sjgise">Nama Lengkap</label> <input type="text" name="nama" id="nama"${attr("value", siswa().nama)} required="" class="svelte-1sjgise"/> <label for="jk" class="svelte-1sjgise">Jenis Kelamin</label> `);
		$$renderer.select({
			name: "jk",
			id: "jk",
			value: siswa().jenis_kelamin,
			required: true,
			class: ""
		}, ($$renderer) => {
			$$renderer.option({ value: "L" }, ($$renderer) => {
				$$renderer.push(`Laki-laki`);
			});
			$$renderer.option({ value: "P" }, ($$renderer) => {
				$$renderer.push(`Perempuan`);
			});
		}, "svelte-1sjgise");
		$$renderer.push(` <label for="tempat" class="svelte-1sjgise">Tempat Lahir</label> <input type="text" name="tempat" id="tempat"${attr("value", siswa().tempat_lahir)} class="svelte-1sjgise"/> <label for="tgl" class="svelte-1sjgise">Tanggal Lahir</label> <input type="date" name="tgl" id="tgl"${attr("value", siswa().tanggal_lahir)} class="svelte-1sjgise"/> <label for="kelas" class="svelte-1sjgise">Kelas</label> <input type="text" name="kelas" id="kelas"${attr("value", siswa().kelas)} required="" class="svelte-1sjgise"/> <button type="submit" class="svelte-1sjgise">Simpan Perubahan</button></form> <h3 class="svelte-1sjgise">Foto Siswa</h3> `);
		if (siswa().nisn) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", `/foto/${stringify(siswa().nisn)}.jpg?t=${stringify(Date.now())}`)} alt="Foto Siswa" class="svelte-1sjgise"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST" action="?/upload_foto" enctype="multipart/form-data" class="svelte-1sjgise"><label for="foto" class="svelte-1sjgise">Ganti Foto (JPG)</label> <input type="file" name="foto" id="foto" accept=".jpg" required="" class="svelte-1sjgise"/> <button type="submit" class="svelte-1sjgise">Upload Foto</button></form> <form method="POST" action="/logout" class="svelte-1sjgise"><button type="submit" class="logout-link svelte-1sjgise" style="background: none; color: #1877f2; padding: 0; font-size: inherit; cursor: pointer;">Logout</button></form></div>`);
	});
}
//#endregion
export { _page as default };

import { L as escape_html, r as ensure_array_like } from "../../../../chunks/dev.js";
//#region src/routes/dashboard/pilih-kelas/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<div class="pilih-body svelte-1e67lj5"><div class="container svelte-1e67lj5"><h2 class="svelte-1e67lj5">Cetak Kartu Pelajar</h2> <form method="GET" action="/dashboard/cetak" target="_blank"><label for="kelas" class="svelte-1e67lj5">Pilih Kelas:</label> <select name="kelas" id="kelas" required="" class="svelte-1e67lj5">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`-- Pilih Kelas --`);
		});
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like(data.classes);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let k = each_array[$$index];
			$$renderer.option({ value: k.kelas }, ($$renderer) => {
				$$renderer.push(`${escape_html(k.kelas)}`);
			});
		}
		$$renderer.push(`<!--]--></select> <button type="submit" class="svelte-1e67lj5">Cetak Kartu</button></form> <a href="/dashboard" class="back-link svelte-1e67lj5">← Kembali ke Dashboard</a></div></div>`);
	});
}
//#endregion
export { _page as default };

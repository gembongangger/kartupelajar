import { I as attr, L as escape_html, n as derived } from "../../chunks/dev.js";
import "../../chunks/forms.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let pengaturan = derived(() => data.pengaturan);
		let logo_path = derived(() => pengaturan()?.has_logo ? "/pengaturan/gambar/logo" : null);
		$$renderer.push(`<div class="container-body svelte-1uha8ag"><header class="svelte-1uha8ag"><h1 class="svelte-1uha8ag">Aplikasi Kartu Pelajar</h1></header> <main class="svelte-1uha8ag"><div class="login-container svelte-1uha8ag">`);
		if (logo_path()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", logo_path())} alt="Logo Sekolah" class="logo svelte-1uha8ag"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <h2 class="svelte-1uha8ag">Login</h2> `);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="error svelte-1uha8ag">${escape_html(form.message)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST" action="?/login" class="svelte-1uha8ag"><input type="text" name="username" placeholder="Username" required="" class="svelte-1uha8ag"/> <input type="password" name="password" placeholder="Password" required="" class="svelte-1uha8ag"/> <button type="submit" class="svelte-1uha8ag">Login</button></form> <p class="note svelte-1uha8ag"><em class="svelte-1uha8ag">Aplikasi SvelteKit Version</em></p> <p class="note svelte-1uha8ag"><em class="svelte-1uha8ag">Siswa dapat melakukan perbaikan data dan upload foto login username: NISN, pasword: NISN</em></p></div></main> <footer class="svelte-1uha8ag">© 2025 - Gembong <a href="https://www.youtube.com/@nirsinggih" target="_blank" class="svelte-1uha8ag">gembong</a><br class="svelte-1uha8ag"/> Converted to SvelteKit.</footer></div>`);
	});
}
//#endregion
export { _page as default };

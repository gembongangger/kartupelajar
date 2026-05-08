import * as server from '../entries/pages/dashboard/pilih-kelas/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/pilih-kelas/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/pilih-kelas/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.DduekdvD.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = ["_app/immutable/assets/5.D2V1ybP0.css"];
export const fonts = [];

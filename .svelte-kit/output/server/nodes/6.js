import * as server from '../entries/pages/dashboard/siswa/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/siswa/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/siswa/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.C7UjSHt5.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/WWXe-z2_.js","_app/immutable/chunks/CgRNbrNR.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = ["_app/immutable/assets/6.CAyXSVcs.css"];
export const fonts = [];

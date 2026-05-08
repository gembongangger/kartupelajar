import * as server from '../entries/pages/siswa/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/siswa/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/siswa/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.DONW_9IO.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/WWXe-z2_.js","_app/immutable/chunks/CgRNbrNR.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = ["_app/immutable/assets/11.D6WfYZ1A.css"];
export const fonts = [];

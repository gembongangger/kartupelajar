import * as server from '../entries/pages/dashboard/upload-foto/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/upload-foto/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/upload-foto/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.DvvvBVM-.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/WWXe-z2_.js","_app/immutable/chunks/CgRNbrNR.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = ["_app/immutable/assets/9.DA71-PEh.css"];
export const fonts = [];

import * as server from '../entries/pages/dashboard/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.DublTFK3.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/WWXe-z2_.js","_app/immutable/chunks/CgRNbrNR.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = ["_app/immutable/assets/3.CTArPks2.css"];
export const fonts = [];

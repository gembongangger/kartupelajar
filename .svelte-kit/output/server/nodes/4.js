import * as server from '../entries/pages/dashboard/pengaturan/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/pengaturan/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/pengaturan/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.CtRrGnWF.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/WWXe-z2_.js","_app/immutable/chunks/CgRNbrNR.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = ["_app/immutable/assets/4.DBbeEK-f.css"];
export const fonts = [];

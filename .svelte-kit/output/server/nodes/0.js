

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BiOIHrOx.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/D9FQP20W.js"];
export const stylesheets = [];
export const fonts = [];

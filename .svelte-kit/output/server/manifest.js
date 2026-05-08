export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/background/bg_1753067414.jpg","assets/background_belakang/bg2_1753067767.jpg","assets/logo/logo_1753066228.png","assets/tanda_tangan/ttd_1753066228.png","format_data_siswa.xls","foto/123123.jpg","foto/16340.jpg","foto/20142.jpg","foto/4900001.jpg","foto/9920005.jpg","foto/default.jpg","robots.txt","temp_qr/4900001.png","temp_qr/4900002.png","temp_qr/4900003.png","temp_qr/4900004.png","temp_qr/4900005.png","temp_qr/4900006.png","temp_qr/4900007.png","temp_qr/4900008.png","temp_qr/4900009.png","temp_qr/4900010.png","temp_qr/4900011.png","temp_qr/4900012.png","temp_qr/7900001.png","temp_qr/7900002.png","temp_qr/7900003.png","temp_qr/7900004.png","temp_qr/7900005.png","temp_qr/9290006.png","temp_qr/9290012.png","temp_qr/9290017.png","temp_qr/9290018.png","temp_qr/9900214.png","temp_qr/9900220.png","temp_qr/9902002.png","temp_qr/9902004.png","temp_qr/9902007.png","temp_qr/9902010.png","temp_qr/9902016.png","temp_qr/99022008.png","temp_qr/9920005.png","temp_qr/9920009.png","temp_qr/9920013.png","temp_qr/9920015.png","temp_qr/9920019.png","temp_qr/99220003.png"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DL7hHv_p.js",app:"_app/immutable/entry/app.XIrHEFGH.js",imports:["_app/immutable/entry/start.DL7hHv_p.js","_app/immutable/chunks/CgRNbrNR.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/entry/app.XIrHEFGH.js","_app/immutable/chunks/BPwNH_GF.js","_app/immutable/chunks/CbUDssf9.js","_app/immutable/chunks/D9FQP20W.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dashboard/cetak",
				pattern: /^\/dashboard\/cetak\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/dashboard/cetak/_server.ts.js'))
			},
			{
				id: "/dashboard/pengaturan",
				pattern: /^\/dashboard\/pengaturan\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/dashboard/pilih-kelas",
				pattern: /^\/dashboard\/pilih-kelas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard/siswa",
				pattern: /^\/dashboard\/siswa\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard/siswa/edit/[nisn]",
				pattern: /^\/dashboard\/siswa\/edit\/([^/]+?)\/?$/,
				params: [{"name":"nisn","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/test-print",
				pattern: /^\/dashboard\/test-print\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/dashboard/test-print/_server.ts.js'))
			},
			{
				id: "/dashboard/upload-excel",
				pattern: /^\/dashboard\/upload-excel\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/upload-foto",
				pattern: /^\/dashboard\/upload-foto\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/foto/[nisn].jpg",
				pattern: /^\/foto\/([^/]+?)\.jpg\/?$/,
				params: [{"name":"nisn","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/foto/_nisn_.jpg/_server.ts.js'))
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/pengaturan/gambar/[jenis]",
				pattern: /^\/pengaturan\/gambar\/([^/]+?)\/?$/,
				params: [{"name":"jenis","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/pengaturan/gambar/_jenis_/_server.ts.js'))
			},
			{
				id: "/siswa",
				pattern: /^\/siswa\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

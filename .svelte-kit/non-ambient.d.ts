
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/dashboard" | "/dashboard/cetak" | "/dashboard/pengaturan" | "/dashboard/pilih-kelas" | "/dashboard/siswa" | "/dashboard/siswa/edit" | "/dashboard/siswa/edit/[nisn]" | "/dashboard/upload-excel" | "/dashboard/upload-foto" | "/logout" | "/siswa";
		RouteParams(): {
			"/dashboard/siswa/edit/[nisn]": { nisn: string }
		};
		LayoutParams(): {
			"/": { nisn?: string };
			"/dashboard": { nisn?: string };
			"/dashboard/cetak": Record<string, never>;
			"/dashboard/pengaturan": Record<string, never>;
			"/dashboard/pilih-kelas": Record<string, never>;
			"/dashboard/siswa": { nisn?: string };
			"/dashboard/siswa/edit": { nisn?: string };
			"/dashboard/siswa/edit/[nisn]": { nisn: string };
			"/dashboard/upload-excel": Record<string, never>;
			"/dashboard/upload-foto": Record<string, never>;
			"/logout": Record<string, never>;
			"/siswa": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/cetak" | "/dashboard/pengaturan" | "/dashboard/pilih-kelas" | "/dashboard/siswa" | `/dashboard/siswa/edit/${string}` & {} | "/dashboard/upload-excel" | "/dashboard/upload-foto" | "/logout" | "/siswa";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/assets/background/bg_1753067414.jpg" | "/assets/background_belakang/bg2_1753067767.jpg" | "/assets/logo/logo_1753066228.png" | "/assets/tanda_tangan/ttd_1753066228.png" | "/format_data_siswa.xls" | "/foto/123123.jpg" | "/foto/16340.jpg" | "/foto/20142.jpg" | "/foto/4900001.jpg" | "/foto/9920005.jpg" | "/foto/default.jpg" | "/robots.txt" | "/temp_qr/4900001.png" | "/temp_qr/4900002.png" | "/temp_qr/4900003.png" | "/temp_qr/4900004.png" | "/temp_qr/4900005.png" | "/temp_qr/4900006.png" | "/temp_qr/4900007.png" | "/temp_qr/4900008.png" | "/temp_qr/4900009.png" | "/temp_qr/4900010.png" | "/temp_qr/4900011.png" | "/temp_qr/4900012.png" | "/temp_qr/7900001.png" | "/temp_qr/7900002.png" | "/temp_qr/7900003.png" | "/temp_qr/7900004.png" | "/temp_qr/7900005.png" | "/temp_qr/9290006.png" | "/temp_qr/9290012.png" | "/temp_qr/9290017.png" | "/temp_qr/9290018.png" | "/temp_qr/9900214.png" | "/temp_qr/9900220.png" | "/temp_qr/9902002.png" | "/temp_qr/9902004.png" | "/temp_qr/9902007.png" | "/temp_qr/9902010.png" | "/temp_qr/9902016.png" | "/temp_qr/99022008.png" | "/temp_qr/9920005.png" | "/temp_qr/9920009.png" | "/temp_qr/9920013.png" | "/temp_qr/9920015.png" | "/temp_qr/9920019.png" | "/temp_qr/99220003.png" | string & {};
	}
}
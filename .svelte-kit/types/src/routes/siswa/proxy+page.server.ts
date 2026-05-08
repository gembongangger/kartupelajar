// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import { fileToBlobValue } from '$lib/server/photo';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user || locals.user.role !== 'siswa') {
        throw redirect(302, '/');
    }

    const result = await db.execute({
        sql: 'SELECT * FROM siswa WHERE user_id = ?',
        args: [locals.user.id]
    });
    const siswa = result.rows[0];
    
    if (!siswa) {
        throw redirect(302, '/');
    }

    return { siswa };
};

export const actions = {
    update: async ({ request, locals }: import('./$types').RequestEvent) => {
        if (!locals.user) return fail(401);

        const data = await request.formData();
        const nama = data.get('nama')?.toString() || '';
        const jk = data.get('jk')?.toString() || '';
        const tempat = data.get('tempat')?.toString() || '';
        const tgl = data.get('tgl')?.toString() || '';
        const kelas = data.get('kelas')?.toString() || '';

        await db.execute({
            sql: `UPDATE siswa SET 
                nama = ?,
                jenis_kelamin = ?,
                tempat_lahir = ?,
                tanggal_lahir = ?,
                kelas = ?
                WHERE user_id = ?`,
            args: [
                nama, 
                jk, 
                tempat, 
                tgl, 
                kelas, 
                locals.user.id
            ]
        });

        return { success: true };
    },
    upload_foto: async ({ request, locals }: import('./$types').RequestEvent) => {
        if (!locals.user) return fail(401);

        const data = await request.formData();
        const file = data.get('foto') as File;

        if (!file || file.size === 0) {
            return fail(400, { message: 'File tidak ditemukan' });
        }

        const result = await db.execute({
            sql: 'SELECT nisn FROM siswa WHERE user_id = ?',
            args: [locals.user.id]
        });
        const siswa = result.rows[0];
        
        if (!siswa) return fail(404, { message: 'Data siswa tidak ditemukan' });

        const buffer = Buffer.from(await file.arrayBuffer());
        await db.execute({
            sql: 'UPDATE siswa SET foto = ? WHERE nisn = ?',
            args: [fileToBlobValue(buffer), siswa.nisn]
        });

        return { success: true };
    }
};
;null as any as Actions;
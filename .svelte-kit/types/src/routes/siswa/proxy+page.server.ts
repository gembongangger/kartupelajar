// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import fs from 'fs';
import path from 'path';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user || locals.user.role !== 'siswa') {
        throw redirect(302, '/');
    }

    const result = await db.execute({
        sql: 'SELECT * FROM siswa WHERE user_id = ?',
        args: [locals.user.id]
    });
    const siswa = result.rows[0];
    return { siswa };
};

export const actions = {
    update: async ({ request, locals }: import('./$types').RequestEvent) => {
        if (!locals.user) return fail(401);

        const data = await request.formData();
        const nama = data.get('nama');
        const jk = data.get('jk');
        const tempat = data.get('tempat');
        const tgl = data.get('tgl');
        const kelas = data.get('kelas');

        await db.execute({
            sql: `UPDATE siswa SET 
                nama = ?,
                jenis_kelamin = ?,
                tempat_lahir = ?,
                tanggal_lahir = ?,
                kelas = ?
                WHERE user_id = ?`,
            args: [
                nama?.toString(), 
                jk?.toString(), 
                tempat?.toString(), 
                tgl?.toString(), 
                kelas?.toString(), 
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
            return fail(400, { message: 'No file uploaded' });
        }

        const result = await db.execute({
            sql: 'SELECT nisn FROM siswa WHERE user_id = ?',
            args: [locals.user.id]
        });
        const siswa = result.rows[0];
        
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join('static', 'foto', `${siswa.nisn}.jpg`);
        
        fs.writeFileSync(filePath, buffer);

        return { success: true };
    }
};
;null as any as Actions;
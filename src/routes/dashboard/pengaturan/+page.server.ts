import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/');
    }

    const result = await db.execute('SELECT * FROM pengaturan WHERE id = 1');
    const pengaturan = result.rows[0];
    return { pengaturan };
};

export const actions: Actions = {
    simpan: async ({ request, locals }) => {
        if (!locals.user || locals.user.role !== 'admin') return fail(401);

        const data = await request.formData();
        const nama = data.get('nama_sekolah');
        const alamat = data.get('alamat');
        const kepala = data.get('kepala_sekolah');
        const nip_kepala = data.get('nip_kepala_sekolah');
        const tanggal = data.get('tanggal_ttd');

        const password_lama = data.get('password_lama');
        const password_baru = data.get('password_baru');
        const konfirmasi_password = data.get('konfirmasi_password');

        if (password_lama || password_baru || konfirmasi_password) {
            const adminResult = await db.execute('SELECT password FROM users WHERE id = 1');
            const admin = adminResult.rows[0];
            const hashedLama = crypto.createHash('md5').update(password_lama?.toString() || '').digest('hex');

            if (hashedLama !== admin.password) {
                return fail(400, { message: 'Password lama salah' });
            }

            if (password_baru !== konfirmasi_password) {
                return fail(400, { message: 'Konfirmasi password tidak cocok' });
            }

            const hashedBaru = crypto.createHash('md5').update(password_baru?.toString() || '').digest('hex');
            await db.execute({
                sql: 'UPDATE users SET password = ? WHERE id = 1',
                args: [hashedBaru]
            });
        }

        const currentSettingsResult = await db.execute('SELECT * FROM pengaturan WHERE id = 1');
        const pengaturan = currentSettingsResult.rows[0];
        let logo = pengaturan.logo as string;
        let ttd = pengaturan.tanda_tangan as string;
        let bg = pengaturan.background as string;
        let bg2 = pengaturan.background_belakang as string;

        const uploadFile = async (file: File, folder: string, prefix: string) => {
            if (file && file.size > 0) {
                const ext = path.extname(file.name);
                const filename = `${prefix}_${Date.now()}${ext}`;
                const buffer = Buffer.from(await file.arrayBuffer());
                const filePath = path.join('static', 'assets', folder, filename);
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, buffer);
                return filename;
            }
            return null;
        };

        const newLogo = await uploadFile(data.get('logo') as File, 'logo', 'logo');
        if (newLogo) logo = newLogo;

        const newTtd = await uploadFile(data.get('tanda_tangan') as File, 'tanda_tangan', 'ttd');
        if (newTtd) ttd = newTtd;

        const newBg = await uploadFile(data.get('background') as File, 'background', 'bg');
        if (newBg) bg = newBg;

        const newBg2 = await uploadFile(data.get('background_belakang') as File, 'background_belakang', 'bg2');
        if (newBg2) bg2 = newBg2;

        await db.execute({
            sql: `UPDATE pengaturan SET
                nama_sekolah = ?,
                alamat = ?,
                kepala_sekolah = ?,
                nip_kepala_sekolah = ?,
                tanggal_ttd = ?,
                logo = ?,
                tanda_tangan = ?,
                background = ?,
                background_belakang = ?
                WHERE id = 1`,
            args: [nama?.toString(), alamat?.toString(), kepala?.toString(), nip_kepala?.toString(), tanggal?.toString(), logo, ttd, bg, bg2]
        });

        return { success: true };
    }
};

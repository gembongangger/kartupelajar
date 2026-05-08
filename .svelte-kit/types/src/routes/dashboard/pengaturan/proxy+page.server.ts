// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import crypto from 'crypto';
import { fileToBlobValue, imageMimeFromFile } from '$lib/server/photo';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/');
    }

    const result = await db.execute(`
        SELECT
            id,
            nama_sekolah,
            alamat,
            kepala_sekolah,
            nip_kepala_sekolah,
            tanggal_ttd,
            logo IS NOT NULL AS has_logo,
            tanda_tangan IS NOT NULL AS has_tanda_tangan,
            background IS NOT NULL AS has_background,
            background_belakang IS NOT NULL AS has_background_belakang
        FROM pengaturan
        WHERE id = 1
    `);
    const pengaturan = result.rows[0];
    return { pengaturan };
};

export const actions = {
    simpan: async ({ request, locals }: import('./$types').RequestEvent) => {
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

        const uploadFile = async (file: File) => {
            if (!file || file.size === 0) {
                return null;
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            return {
                blob: fileToBlobValue(buffer),
                mime: imageMimeFromFile(file)
            };
        };

        const newLogo = await uploadFile(data.get('logo') as File);
        const newTtd = await uploadFile(data.get('tanda_tangan') as File);
        const newBg = await uploadFile(data.get('background') as File);
        const newBg2 = await uploadFile(data.get('background_belakang') as File);

        await db.execute({
            sql: `UPDATE pengaturan SET
                nama_sekolah = ?,
                alamat = ?,
                kepala_sekolah = ?,
                nip_kepala_sekolah = ?,
                tanggal_ttd = ?,
                logo = COALESCE(?, logo),
                logo_mime = COALESCE(?, logo_mime),
                tanda_tangan = COALESCE(?, tanda_tangan),
                tanda_tangan_mime = COALESCE(?, tanda_tangan_mime),
                background = COALESCE(?, background),
                background_mime = COALESCE(?, background_mime),
                background_belakang = COALESCE(?, background_belakang),
                background_belakang_mime = COALESCE(?, background_belakang_mime)
                WHERE id = 1`,
            args: [
                nama?.toString(),
                alamat?.toString(),
                kepala?.toString(),
                nip_kepala?.toString(),
                tanggal?.toString(),
                newLogo?.blob ?? null,
                newLogo?.mime ?? null,
                newTtd?.blob ?? null,
                newTtd?.mime ?? null,
                newBg?.blob ?? null,
                newBg?.mime ?? null,
                newBg2?.blob ?? null,
                newBg2?.mime ?? null
            ]
        });

        return { success: true };
    }
};
;null as any as Actions;
// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import * as XLSX from 'xlsx';
import crypto from 'crypto';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/');
    }
    return {};
};

export const actions = {
    default: async ({ request, locals }: import('./$types').RequestEvent) => {
        if (!locals.user || locals.user.role !== 'admin') return fail(401);

        const data = await request.formData();
        const file = data.get('file') as File;

        if (!file || file.size === 0) return fail(400, { message: 'No file uploaded' });

        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 'A' }) as any[];

        let success = 0;
        let failed = 0;
        let errorDetails: string[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const nama = row.A || '';
            const nis = row.B || '';
            const nisn = row.C?.toString() || '';
            const kelas = row.D || '';
            const jk = row.E || '';
            const tempat = row.F || '';
            const tgl = row.G || '';

            if (!nisn) {
                failed++;
                errorDetails.push(`Baris ${i + 1}: NISN kosong.`);
                continue;
            }

            try {
                const checkResult = await db.execute({
                    sql: 'SELECT id FROM users WHERE username = ?',
                    args: [nisn]
                });

                if (checkResult.rows.length > 0) {
                    failed++;
                    errorDetails.push(`Baris ${i + 1}: NISN (${nisn}) sudah terdaftar.`);
                    continue;
                }

                const password = crypto.createHash('md5').update(nisn).digest('hex');
                
                // Use db.batch for atomic insert of User and Siswa
                // We use last_insert_rowid() to link them within the same batch
                await db.batch([
                    {
                        sql: 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                        args: [nisn, password, 'siswa']
                    },
                    {
                        sql: 'INSERT INTO siswa (nama, nis, nisn, kelas, jenis_kelamin, tempat_lahir, tanggal_lahir, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, last_insert_rowid())',
                        args: [nama, nis, nisn, kelas, jk, tempat, tgl]
                    }
                ], 'write');
                
                success++;
            } catch (e: any) {
                failed++;
                errorDetails.push(`Baris ${i + 1}: ${e.message}`);
            }
        }

        return { success, failed, errorDetails };
    }
};
;null as any as Actions;
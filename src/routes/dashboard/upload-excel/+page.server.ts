import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import * as XLSX from 'xlsx';
import crypto from 'crypto';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/');
    }
    return {};
};

function formatDate(date: Date) {
    if (isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        if (!locals.user || locals.user.role !== 'admin') return fail(401);

        const data = await request.formData();
        const file = data.get('file') as File;

        if (!file || file.size === 0) return fail(400, { message: 'No file uploaded' });

        try {
            const buffer = await file.arrayBuffer();
            // cellDates: true transforms Excel serial dates into JS Date objects automatically
            const workbook = XLSX.read(buffer, { cellDates: true });
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
                let tgl = row.G;

                if (!nisn) {
                    failed++;
                    errorDetails.push(`Baris ${i + 1}: NISN kosong.`);
                    continue;
                }

                // Robust Date Handling
                if (tgl instanceof Date) {
                    tgl = formatDate(tgl);
                } else if (typeof tgl === 'number') {
                    // Manual conversion if it's still a number (offset for Excel dates)
                    const date = new Date(Math.round((tgl - 25569) * 86400 * 1000));
                    tgl = formatDate(date);
                } else {
                    tgl = tgl?.toString() || '';
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
        } catch (error: any) {
            return fail(500, { message: 'Gagal memproses file: ' + error.message });
        }
    }
};

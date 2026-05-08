import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/db';
import { photoValueToBuffer } from '$lib/server/photo';

const imageColumns = {
    logo: ['logo', 'logo_mime'],
    tanda_tangan: ['tanda_tangan', 'tanda_tangan_mime'],
    background: ['background', 'background_mime'],
    background_belakang: ['background_belakang', 'background_belakang_mime']
} as const;

export const GET: RequestHandler = async ({ params }) => {
    const columns = imageColumns[params.jenis as keyof typeof imageColumns];

    if (!columns) {
        throw error(404, 'Gambar tidak ditemukan');
    }

    const [imageColumn, mimeColumn] = columns;
    const result = await db.execute(`SELECT ${imageColumn} AS gambar, ${mimeColumn} AS mime FROM pengaturan WHERE id = 1`);
    const row = result.rows[0];
    const buffer = photoValueToBuffer(row?.gambar);

    if (!buffer) {
        throw error(404, 'Gambar tidak ditemukan');
    }

    return new Response(buffer, {
        headers: {
            'Content-Type': row?.mime?.toString() || 'application/octet-stream',
            'Cache-Control': 'private, max-age=0, must-revalidate'
        }
    });
};

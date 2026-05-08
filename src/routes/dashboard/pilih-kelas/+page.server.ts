import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/');
    }

    const result = await db.execute('SELECT DISTINCT kelas FROM siswa ORDER BY kelas ASC');
    const classes = result.rows;
    return { classes };
};

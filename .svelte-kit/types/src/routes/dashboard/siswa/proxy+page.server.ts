// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/');
    }

    const result = await db.execute('SELECT * FROM siswa ORDER BY kelas, nama');
    const students = result.rows;
    return { students };
};

export const actions = {
    delete: async ({ request, locals }: import('./$types').RequestEvent) => {
        if (!locals.user || locals.user.role !== 'admin') return fail(401);

        const data = await request.formData();
        const nisn = data.get('nisn');

        if (!nisn) return fail(400);

        await db.execute({
            sql: 'DELETE FROM siswa WHERE nisn = ?',
            args: [nisn.toString()]
        });

        return { success: true };
    }
};
;null as any as Actions;
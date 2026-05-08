import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import crypto from 'crypto';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        if (locals.user.role === 'admin') {
            throw redirect(302, '/dashboard');
        } else {
            throw redirect(302, '/siswa');
        }
    }

    const result = await db.execute('SELECT * FROM pengaturan LIMIT 1');
    const pengaturan = result.rows[0];
    return { pengaturan };
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString() || '';
        const password = data.get('password')?.toString() || '';

        if (!username || !password) {
            return fail(400, { message: 'Username and password are required' });
        }

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        try {
            const result = await db.execute({
                sql: 'SELECT * FROM users WHERE username = ? AND password = ?',
                args: [username, hashedPassword]
            });
            const user = result.rows[0];

            if (!user) {
                return fail(400, { message: 'Login gagal! Periksa kembali Username dan Password.' });
            }

            cookies.set('session', `${user.id}:${user.role}`, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });

            if (user.role === 'admin') {
                throw redirect(302, '/dashboard');
            } else {
                throw redirect(302, '/siswa');
            }
        } catch (e: any) {
            if (e.status === 302) throw e;
            return fail(500, { message: 'Terjadi kesalahan sistem: ' + e.message });
        }
    }
};

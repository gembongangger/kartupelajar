import type { Handle } from '@sveltejs/kit';
import db from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('session');

    if (!sessionId) {
        event.locals.user = null;
    } else {
        try {
            const [id, role] = sessionId.split(':');
            const result = await db.execute({
                sql: 'SELECT id, username, role FROM users WHERE id = ? AND role = ?',
                args: [id, role]
            });
            const user = result.rows[0];
            if (user) {
                event.locals.user = {
                    id: user.id as number,
                    username: user.username as string,
                    role: user.role as string
                };
            } else {
                event.locals.user = null;
            }
        } catch (e) {
            event.locals.user = null;
        }
    }

    const response = await resolve(event);
    return response;
};

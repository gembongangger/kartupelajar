// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    default: async ({ cookies }: import('./$types').RequestEvent) => {
        cookies.delete('session', { path: '/' });
        throw redirect(302, '/');
    }
};
;null as any as Actions;
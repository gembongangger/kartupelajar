// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';

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
        const files = data.getAll('fotos') as File[];

        let berhasil = 0;
        let gagal = 0;

        for (const file of files) {
            if (file.size === 0) continue;

            const name = file.name;
            // Validate filename NISN.jpg
            if (/^\d{5,}\.jpg$/.test(name)) {
                try {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const filePath = path.join('static', 'foto', name);
                    fs.writeFileSync(filePath, buffer);
                    berhasil++;
                } catch (e) {
                    gagal++;
                }
            } else {
                gagal++;
            }
        }

        return { berhasil, gagal };
    }
};
;null as any as Actions;
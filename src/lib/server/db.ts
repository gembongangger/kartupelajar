import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

// Jika ada TURSO_CONNECTION_URL di .env, gunakan itu, jika tidak gunakan local file
const url = env.TURSO_CONNECTION_URL || 'file:kartu-pelajar.db';
const authToken = env.TURSO_AUTH_TOKEN;

const client = createClient({
    url,
    authToken
});

export default client;

import 'dotenv/config'
import path from 'node:path'

import { defineConfig } from 'drizzle-kit'

import { env } from '@/config/env'

export default defineConfig({
    dialect: 'postgresql',
    schema: path.join('source', 'infrastructure', 'database', 'schemas', '*'),
    out: path.join('source', 'infrastructure', 'database', 'migrations'),

    dbCredentials: { url: env.DATABASE_URL }
})

import { defineConfig } from 'drizzle-kit'
import { env } from './env.mjs'

export default defineConfig({
    dialect: 'postgresql', // "mysql" | "sqlite" | "postgresql"
    schema: './src/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        url: env.DB_URL,
    },
})

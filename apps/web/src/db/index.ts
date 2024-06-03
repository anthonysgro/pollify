import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../../env.mjs'

export const connection = postgres(env.DB_URL)
export const db = drizzle(connection)

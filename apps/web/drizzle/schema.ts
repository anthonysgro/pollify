import {
    pgTable,
    foreignKey,
    uuid,
    timestamp,
    varchar,
    integer,
    boolean,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const votes = pgTable('votes', {
    vote_id: uuid('vote_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    answer_id: uuid('answer_id').references(() => answers.answer_id, {
        onDelete: 'cascade',
    }),
    voter_id: uuid('voter_id').references(() => voters.voter_id, {
        onDelete: 'set null',
    }),
    vote_timestamp: timestamp('vote_timestamp', {
        mode: 'string',
    }).defaultNow(),
})

export const polls = pgTable('polls', {
    poll_id: uuid('poll_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    title: varchar('title', { length: 1024 }).notNull(),
    description: varchar('description', { length: 1024 }),
    image: varchar('image', { length: 1024 }),
    poll_type: integer('poll_type'),
})

export const answers = pgTable('answers', {
    answer_id: uuid('answer_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    poll_id: uuid('poll_id').references(() => polls.poll_id, {
        onDelete: 'cascade',
    }),
    answer_text: varchar('answer_text', { length: 1024 }).notNull(),
})

export const voters = pgTable('voters', {
    voter_id: uuid('voter_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    ip_address: varchar('ip_address', { length: 45 }),
    browser_session: varchar('browser_session', { length: 128 }),
    unique_code: varchar('unique_code', { length: 50 }),
    user_id: uuid('user_id'),
    is_anonymous: boolean('is_anonymous').default(true).notNull(),
})

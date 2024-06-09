import {
    pgTable,
    foreignKey,
    uuid,
    timestamp,
    varchar,
    bigint,
    boolean,
} from 'drizzle-orm/pg-core'
import { min, sql } from 'drizzle-orm'

export const VOTES_TABLE = pgTable('votes', {
    voteId: uuid('vote_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    answerId: uuid('answer_id').references(() => ANSWERS_TABLE.answerId, {
        onDelete: 'cascade',
    }),
    voterId: uuid('voter_id').references(() => VOTERS_TABLE.voterId, {
        onDelete: 'set null',
    }),
    voteTimestamp: timestamp('vote_timestamp', {
        mode: 'string',
    }).defaultNow(),
    createdAt: timestamp('created_at', {
        precision: 6,
        withTimezone: true,
    }).default(sql`current_timestamp(6)`),
    updatedAt: timestamp('updated_at', {
        precision: 6,
        withTimezone: true,
    }).$onUpdateFn(() => new Date()),
})

export const POLLS_TABLE = pgTable('polls', {
    pollId: uuid('poll_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    title: varchar('title', { length: 1024 }).notNull(),
    description: varchar('description', { length: 1024 }),
    image: varchar('image', { length: 1024 }),
    pollType: bigint('poll_type', { mode: 'number' }),
    createdAt: timestamp('created_at', {
        precision: 6,
        withTimezone: true,
    }).default(sql`current_timestamp(6)`),
    updatedAt: timestamp('updated_at', {
        precision: 6,
        withTimezone: true,
    }).$onUpdateFn(() => new Date()),
})

export const ANSWERS_TABLE = pgTable('answers', {
    answerId: uuid('answer_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    pollId: uuid('poll_id').references(() => POLLS_TABLE.pollId, {
        onDelete: 'cascade',
    }),
    text: varchar('text', { length: 1024 }).notNull(),
    index: bigint('index', { mode: 'number' }).notNull(),
    createdAt: timestamp('created_at', {
        precision: 6,
        withTimezone: true,
    }).default(sql`current_timestamp(6)`),
    updatedAt: timestamp('updated_at', {
        precision: 6,
        withTimezone: true,
    }).$onUpdateFn(() => new Date()),
})

export const VOTERS_TABLE = pgTable('voters', {
    voterId: uuid('voter_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    ipAddress: varchar('ip_address', { length: 45 }),
    browserSession: varchar('browser_session', { length: 128 }),
    uniqueCode: varchar('unique_code', { length: 50 }),
    userId: uuid('user_id'),
    isAnonymous: boolean('is_anonymous').default(true).notNull(),
    createdAt: timestamp('created_at', {
        precision: 6,
        withTimezone: true,
    }).default(sql`current_timestamp(6)`),
    updatedAt: timestamp('updated_at', {
        precision: 6,
        withTimezone: true,
    }).$onUpdateFn(() => new Date()),
})

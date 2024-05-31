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
    voteId: uuid('vote_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    answerId: uuid('answer_id').references(() => answers.answerId, {
        onDelete: 'cascade',
    }),
    voterId: uuid('voter_id').references(() => voters.voterId, {
        onDelete: 'set null',
    }),
    voteTimestamp: timestamp('vote_timestamp', {
        mode: 'string',
    }).defaultNow(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true}).default(
        sql`current_timestamp(6)`,
      ),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true}).$onUpdateFn(() => new Date()),
})

export const polls = pgTable('polls', {
    pollId: uuid('poll_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    title: varchar('title', { length: 1024 }).notNull(),
    description: varchar('description', { length: 1024 }),
    image: varchar('image', { length: 1024 }),
    pollType: integer('poll_type'),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true}).default(
        sql`current_timestamp(6)`,
      ),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true}).$onUpdateFn(() => new Date()),
})

export const answers = pgTable('answers', {
    answerId: uuid('answer_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    pollId: uuid('poll_id').references(() => polls.pollId, {
        onDelete: 'cascade',
    }),
    answer_text: varchar('answer_text', { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true}).default(
        sql`current_timestamp(6)`,
      ),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true}).$onUpdateFn(() => new Date()),
})

export const voters = pgTable('voters', {
    voterId: uuid('voter_id')
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    ipAddress: varchar('ip_address', { length: 45 }),
    browserSession: varchar('browser_session', { length: 128 }),
    uniqueCode: varchar('unique_code', { length: 50 }),
    userId: uuid('user_id'),
    isAnonymous: boolean('is_anonymous').default(true).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true}).default(
        sql`current_timestamp(6)`,
      ),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true}).$onUpdateFn(() => new Date()),
})

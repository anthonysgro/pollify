import { relations } from 'drizzle-orm/relations'
import { answers, votes, voters, polls } from './schema'

export const votesRelations = relations(votes, ({ one }) => ({
    answer: one(answers, {
        fields: [votes.answer_id],
        references: [answers.answer_id],
    }),
    voter: one(voters, {
        fields: [votes.voter_id],
        references: [voters.voter_id],
    }),
}))

export const answersRelations = relations(answers, ({ one, many }) => ({
    votes: many(votes),
    poll: one(polls, {
        fields: [answers.poll_id],
        references: [polls.poll_id],
    }),
}))

export const votersRelations = relations(voters, ({ many }) => ({
    votes: many(votes),
}))

export const pollsRelations = relations(polls, ({ many }) => ({
    answers: many(answers),
}))

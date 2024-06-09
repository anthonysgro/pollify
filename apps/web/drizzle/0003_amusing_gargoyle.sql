ALTER TABLE "answers" RENAME COLUMN "answer_text" TO "text";--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "poll_type" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "index" bigint NOT NULL;
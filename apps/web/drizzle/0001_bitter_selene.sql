ALTER TABLE "votes" DROP CONSTRAINT "votes_answer_id_fkey";
--> statement-breakpoint
ALTER TABLE "votes" DROP CONSTRAINT "votes_voter_id_fkey";
--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT "answers_poll_id_fkey";
--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "vote_timestamp" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "created_at" timestamp (3) DEFAULT current_timestamp(3);--> statement-breakpoint
ALTER TABLE "votes" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "polls" ADD COLUMN "created_at" timestamp (3) DEFAULT current_timestamp(3);--> statement-breakpoint
ALTER TABLE "polls" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "created_at" timestamp (3) DEFAULT current_timestamp(3);--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "voters" ADD COLUMN "created_at" timestamp (3) DEFAULT current_timestamp(3);--> statement-breakpoint
ALTER TABLE "voters" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_answer_id_answers_answer_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("answer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_voter_id_voters_voter_id_fk" FOREIGN KEY ("voter_id") REFERENCES "public"."voters"("voter_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_poll_id_polls_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("poll_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

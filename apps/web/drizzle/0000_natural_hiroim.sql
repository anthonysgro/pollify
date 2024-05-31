-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "votes" (
	"vote_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"answer_id" uuid,
	"voter_id" uuid,
	"vote_timestamp" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "polls" (
	"poll_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" varchar(1024) NOT NULL,
	"description" varchar(1024),
	"image" varchar(1024),
	"poll_type" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answers" (
	"answer_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"poll_id" uuid,
	"answer_text" varchar(1024) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "voters" (
	"voter_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"ip_address" varchar(45),
	"browser_session" varchar(128),
	"unique_code" varchar(50),
	"user_id" uuid,
	"is_anonymous" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("answer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votes" ADD CONSTRAINT "votes_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "public"."voters"("voter_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("poll_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/
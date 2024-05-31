ALTER TABLE "answers" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "created_at" SET DEFAULT current_timestamp(6);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "created_at" SET DEFAULT current_timestamp(6);--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "voters" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "voters" ALTER COLUMN "created_at" SET DEFAULT current_timestamp(6);--> statement-breakpoint
ALTER TABLE "voters" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "created_at" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "created_at" SET DEFAULT current_timestamp(6);--> statement-breakpoint
ALTER TABLE "votes" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (6) with time zone;
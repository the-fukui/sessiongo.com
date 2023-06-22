CREATE TABLE `eventRRules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`event_id` text NOT NULL,
	`rrule` text NOT NULL,
	`rrule_start_at` text NOT NULL,
	`rrule_end_at` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `rrule`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `rrule_start_at`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `rrule_end_at`;
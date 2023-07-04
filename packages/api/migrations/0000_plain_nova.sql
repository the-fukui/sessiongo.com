CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`host` text NOT NULL,
	`status` integer NOT NULL,
	`type` integer NOT NULL,
	`start_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`end_at` text,
	`place_id` text NOT NULL,
	`features` text,
	`images` text
);
--> statement-breakpoint
CREATE TABLE `eventRRules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`event_id` text,
	`rrule` text NOT NULL,
	`rrule_start_at` text NOT NULL,
	`rrule_end_at` text NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`)
);

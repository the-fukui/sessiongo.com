CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`title` text NOT NULL,
	`description` text NOT NULL,
	`host` text NOT NULL,
	`status` integer NOT NULL,
	`type` integer NOT NULL,
	`start_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`duration` integer,
	`rrule` text,
	`rrule_start_at` text,
	`rrule_end_at` text,
	`place_id` text,
	`features` blob,
	`images` blob
);

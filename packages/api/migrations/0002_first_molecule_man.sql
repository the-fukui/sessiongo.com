ALTER TABLE events ADD `type` text NOT NULL;--> statement-breakpoint
ALTER TABLE events ADD `start_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL;--> statement-breakpoint
ALTER TABLE events ADD `duration` integer;--> statement-breakpoint
ALTER TABLE events ADD `rrule` text;--> statement-breakpoint
ALTER TABLE events ADD `rrule_start_at` text;--> statement-breakpoint
ALTER TABLE events ADD `rrule_end_at` text;--> statement-breakpoint
ALTER TABLE events ADD `place_id` text;
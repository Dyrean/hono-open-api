CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`created_at` integer,
	`updated_at` integer
);

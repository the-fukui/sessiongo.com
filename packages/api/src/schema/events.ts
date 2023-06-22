import type {
	EventFeature,
	EventStatus,
	EventType,
} from '@api/src/domain/entities/event'
import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type EventDBModel = InferModel<typeof events>

export const events = sqliteTable('events', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	title: text('title').notNull(),
	description: text('description').notNull(),
	host: text('host').notNull(),
	status: integer('status').$type<EventStatus>().notNull(),
	type: integer('type').$type<EventType>().notNull(),
	startAt: text('start_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	endAt: text('start_at').default(sql`CURRENT_TIMESTAMP`),
	placeID: text('place_id').notNull(), // google map API placeID
	/**
	 * バグでblobのjsonインサートができない
	 * @see https://github.com/drizzle-team/drizzle-orm/issues/749
	 */
	features: blob('features', { mode: 'json' }).$type<EventFeature[]>(),
	images: blob('images', { mode: 'json' }).$type<string[]>(), // 画像url set
})

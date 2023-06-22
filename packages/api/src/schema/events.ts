import type {
	EventFeature,
	EventStatus,
	EventType,
} from '@api/src/domain/entities/event'
import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type DBModel = InferModel<typeof events>

export const events = sqliteTable('events', {
	id: text('id').primaryKey().notNull(),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	host: text('host').notNull(),
	status: integer('status').$type<EventStatus>().notNull(),
	type: integer('type').$type<EventType>().notNull(),
	startAt: text('start_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	endAt: text('start_at').default(sql`CURRENT_TIMESTAMP`),
	rrule: text('rrule'),
	rruleStartAt: text('rrule_start_at'), // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
	rruleEndAt: text('rrule_end_at'), // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
	placeID: text('place_id'), // google map API placeID
	/**
	 * バグでblobのjsonインサートができない
	 * @see https://github.com/drizzle-team/drizzle-orm/issues/749
	 */
	features: blob('features', { mode: 'json' })
		.$type<EventFeature[]>()
		.default([]),
	images: blob('images', { mode: 'json' }).$type<string[]>().default([]), // 画像url set
})

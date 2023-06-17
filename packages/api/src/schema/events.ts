import { sql } from 'drizzle-orm'
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import type { Feature, SessionType, Status } from './unions'

export const events = sqliteTable('events', {
	id: text('id').primaryKey().notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	title: text('title').notNull(),
	description: text('description').notNull(),
	host: text('host').notNull(),
	status: text('status').$type<Status>().notNull(),
	type: text('type').$type<SessionType>().notNull(),
	startAt: text('start_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	duration: integer('duration'), // seconds
	rrule: text('rrule'),
	rruleStartAt: text('rrule_start_at'), // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
	rruleEndAt: text('rrule_end_at'), // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
	placeID: text('place_id'), // google map API placeID
	/**
	 * バグでblobのjsonインサートができない
	 * @see https://github.com/drizzle-team/drizzle-orm/issues/749
	 */
	features: blob('features', { mode: 'json' }).$type<Feature[]>(),
	images: blob('images'), // 画像url set
})

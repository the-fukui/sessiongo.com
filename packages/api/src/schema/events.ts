import type {
	EventFeature,
	EventStatus,
	EventType,
} from '@api/src/domain/entities/event'
import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import {
	blob,
	customType,
	integer,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core'

/**
 * json用カスタムスキーマタイプ
 * Clouflare workersでnodeのbufferが扱えないため、通常のblobだとエラーになってしまう
 * 回避策
 */
const dbJson = customType({
	dataType: () => 'text',
	toDriver: (value: any) => JSON.stringify(value),
	fromDriver: (value: any) => JSON.parse(value),
})

export type EventDBSelectModel = InferModel<typeof events, 'select'>
export type EventDBInsertModel = InferModel<typeof events, 'insert'>

export const events = sqliteTable('events', {
	id: text('id').primaryKey(),
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
	endAt: text('end_at'),
	placeID: text('place_id').notNull(), // google map API placeID
	/**
	 * バグでblobのjsonインサートができないのでカスタムタイプで代替
	 * @see https://github.com/drizzle-team/drizzle-orm/issues/749
	 */
	// features: blob('features', { mode: 'json' }).$type<EventFeature[]>(),
	// images: blob('images', { mode: 'json' }).$type<string[]>(), // 画像url set
	features: dbJson('features').$type<EventFeature[]>(),
	images: dbJson('images').$type<string[]>(), // 画像url set
})

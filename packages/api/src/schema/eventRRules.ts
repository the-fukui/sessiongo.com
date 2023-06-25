import { events } from '@api/src/schema'
import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type EventRRulesDBSelectModel = InferModel<typeof eventRRules, 'select'>
export type EventRRulesDBInsertModel = InferModel<typeof eventRRules, 'insert'>

export const eventRRules = sqliteTable('eventRRules', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	eventId: text('event_id').references(() => events.id),
	rrule: text('rrule').notNull(),
	rruleStartAt: text('rrule_start_at').notNull(), // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
	rruleEndAt: text('rrule_end_at').notNull(), // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
})

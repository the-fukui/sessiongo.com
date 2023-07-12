import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type UserDBSelectModel = InferModel<typeof users, 'select'>
export type UserDBInsertModel = InferModel<typeof users, 'insert'>
export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	name: text('name'),
})

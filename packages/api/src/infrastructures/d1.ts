import type { events } from '@api/src/schema'
import type { InferModel } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'

export type Event = InferModel<typeof events>

export const createDBClient = (database: D1Database) => {
	const db = drizzle(database)
	return db
}

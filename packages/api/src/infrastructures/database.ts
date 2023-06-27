import type { IDBClient } from '@api/src/domain/interfaces/database'
import * as schema from '@api/src/schema'
import { drizzle } from 'drizzle-orm/d1'

export const createDBClient = (database: D1Database): IDBClient => {
	const db = drizzle(database, { schema })
	return db
}

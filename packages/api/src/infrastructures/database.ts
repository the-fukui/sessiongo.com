import type { IDBConnection } from '@api/src/domain/interfaces/database/connection'
import * as schema from '@api/src/schema'
import { drizzle } from 'drizzle-orm/d1'

export const createDBClient = (database: D1Database): IDBConnection => {
	const db = drizzle(database, { schema })
	return db
}

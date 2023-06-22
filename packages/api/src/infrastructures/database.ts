import type { IDBConnection } from '@api/src/domain/interfaces/database/connection'
import { drizzle } from 'drizzle-orm/d1'

export const createDBClient = (database: D1Database): IDBConnection => {
	const db = drizzle(database)
	return db
}

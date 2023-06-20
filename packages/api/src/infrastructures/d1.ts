import { drizzle } from 'drizzle-orm/d1'

export type DBClient = ReturnType<typeof createDBClient>
export const createDBClient = (database: D1Database) => {
	const db = drizzle(database)
	return db
}

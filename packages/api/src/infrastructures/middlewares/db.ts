import type { IDBConnection } from '@api/src/domain/interfaces/database/connection'
import { createDBClient } from '@api/src/infrastructures/database'
import type { MiddlewareHandler } from 'hono'

declare module 'hono' {
	interface ContextVariableMap {
		db: IDBConnection
	}
}

/**
 * Honoのcontextにdrizzle clientをinjectする
 */
export const injectDBClient = (): MiddlewareHandler => async (c, next) => {
	c.set('db', createDBClient(c.env.DB))
	await next()
}

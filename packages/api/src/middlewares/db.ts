import type { DBClient } from '@api/src/infrastructures/d1'
import { createDBClient } from '@api/src/infrastructures/d1'
import type { MiddlewareHandler } from 'hono'

declare module 'hono' {
	interface ContextVariableMap {
		db: DBClient
	}
}

/**
 * Honoのcontextにdrizzle clientをinjectする
 */
export const injectDBClient = (): MiddlewareHandler => async (c, next) => {
	c.set('db', createDBClient(c.env.DB))
	await next()
}

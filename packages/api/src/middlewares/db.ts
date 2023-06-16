import { createDBClient } from '@api/src/infrastructures/d1'
import type { Context, MiddlewareHandler } from 'hono'

declare module 'hono' {
	interface ContextVariableMap {
		db: ReturnType<typeof createDBClient>
	}
}

/**
 * Honoのcontextにdrizzle clientをinjectする
 */
export const injectDBClient = (): MiddlewareHandler => async (c, next) => {
	c.set('db', createDBClient(c.env.DB))
	await next()
}

import type { IDBClient } from '@api/src/domain/interfaces/database'
import { createDBClient } from '@api/src/infrastructures/database'
import type { MiddlewareHandler } from 'hono'

declare module 'hono' {
	interface ContextVariableMap {
		db: IDBClient
	}
}

/**
 * Honoのcontextにdrizzle clientをinjectする
 */
export const injectDBClient =
	(): MiddlewareHandler<{ Bindings: WorkersEnv }> => async (c, next) => {
		c.set('db', createDBClient(c.env.DB))
		await next()
	}

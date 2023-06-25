import type * as schema from '@api/src/schema'
import type { DrizzleD1Database } from 'drizzle-orm/d1'

export type IDBConnection = DrizzleD1Database<typeof schema>

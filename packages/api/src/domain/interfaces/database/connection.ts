import type { DrizzleD1Database } from 'drizzle-orm/d1'

export type IDBConnection = DrizzleD1Database<Record<string, never>>

import { createEventDTOSchema } from '@api/src/appplication/dtos/createEventDto'
import { getMonthlyEventsSchema } from '@api/src/appplication/dtos/getMonthlyEventDTO'
import { zValidator } from '@hono/zod-validator'

// import type { MiddlewareHandler } from 'hono'

// interface Env = {
// 	DB: D1Database
// 	STORAGE: R2Bucket
// }
export const createEventBodyValidator = zValidator('json', createEventDTOSchema)

export const getMonthlyEventsValidator = zValidator(
	'param',
	getMonthlyEventsSchema,
)

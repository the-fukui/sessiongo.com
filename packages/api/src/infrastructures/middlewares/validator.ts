import type { CreateEventDTO } from '@api/src/application/dtos/createEventDto'
import type { UpdateEventDTO } from '@api/src/application/dtos/updateEventDTO'
import {
	EVENT_FEATURE,
	EVENT_STATUS,
	EVENT_TYPE,
} from '@api/src/domain/entities/event'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

// import type { MiddlewareHandler } from 'hono'

// interface Env = {
// 	DB: D1Database
// 	STORAGE: R2Bucket
// }

const createEventDTOSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	host: z.string().min(1).max(100),
	status: z.nativeEnum(EVENT_STATUS),
	// rrule: z.string().min(1).max(100),
	type: z.nativeEnum(EVENT_TYPE),
	placeID: z.string().min(1).max(100),
	startAt: z.date().min(new Date()),
	endAt: z.date().min(new Date()).optional(),
	features: z.array(z.nativeEnum(EVENT_FEATURE)),
	images: z.array(z.string()),
}) satisfies z.ZodType<CreateEventDTO>

// param(string)で受け取るので、numberに変換してからz.number()でバリデーションする
const getMonthlyEventsSchema = z.object({
	year: z
		.string()
		.transform((v) => parseInt(v))
		.pipe(z.number().gte(1000).lte(9999)),
	month: z
		.string()
		.transform((v) => parseInt(v))
		.pipe(z.number().gte(1).lte(12)),
})

const updateEventDTOSchema = z.object({
	id: z.string().min(1).max(100),
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	host: z.string().min(1).max(100),
	status: z.nativeEnum(EVENT_STATUS),
	// rrule: z.string().min(1).max(100),
	type: z.nativeEnum(EVENT_TYPE),
	placeID: z.string().min(1).max(100),
	startAt: z.date().min(new Date()),
	endAt: z.date().min(new Date()).optional(),
	features: z.array(z.nativeEnum(EVENT_FEATURE)),
	images: z.array(z.string()),
}) satisfies z.ZodType<UpdateEventDTO>

const deleteEventSchema = z.object({
	id: z.string().min(1).max(100),
})

const createUserSchema = z.object({
	name: z.string().min(1).max(100).optional(),
})

const getUserSchema = z.object({
	id: z.string().min(1).max(100),
})

const updateUserSchema = z.object({
	name: z.string().min(1).max(100),
})

export const createEventValidator = zValidator('json', createEventDTOSchema)

export const getMonthlyEventsValidator = zValidator(
	'param',
	getMonthlyEventsSchema,
)

export const updateEventValidator = zValidator('json', updateEventDTOSchema)

export const deleteEventValidator = zValidator('param', deleteEventSchema)

export const createUserValidator = zValidator('json', createUserSchema)

export const getUserValidator = zValidator('param', getUserSchema)

export const updateUserValidator = zValidator('json', updateUserSchema)

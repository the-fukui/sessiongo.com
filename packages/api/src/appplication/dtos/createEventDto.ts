import type { Event } from '@api/src/domain/entities/event'
import {
	EVENT_FEATURE,
	EVENT_STATUS,
	EVENT_TYPE,
} from '@api/src/domain/entities/event'
import { createUUID } from '@api/src/utils/uuid'
import { z } from 'zod'

export type CreateEventDTO = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>

export const convertCreateEventToEvent = (event: CreateEventDTO): Event => {
	return {
		...event,
		id: createUUID(),
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : undefined,
		features: event.features || [],
		images: event.images || [],
	}
}

export const createEventDTOSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(1000),
	host: z.string().min(1).max(100),
	status: z.nativeEnum(EVENT_STATUS),
	rrule: z.string().min(1).max(100),
	type: z.nativeEnum(EVENT_TYPE),
	placeID: z.string().min(1).max(100),
	startAt: z.date().min(new Date()),
	endAt: z.date().min(new Date()).optional(),
	features: z.array(z.nativeEnum(EVENT_FEATURE)),
	images: z.array(z.string()),
}) satisfies z.ZodType<CreateEventDTO>

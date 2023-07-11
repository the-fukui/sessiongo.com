import type { Event } from '@api/src/domain/entities/event'
import { createUUID } from '@api/src/utils/uuid'

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

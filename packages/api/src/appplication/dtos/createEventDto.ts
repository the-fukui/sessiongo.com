import type { Event } from '@api/src/domain/entities/event'

export type CreateEventDTO = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>

export const convertCreateEventToEvent = (event: CreateEventDTO): Event => {
	return {
		...event,
		id: null,
		createdAt: null,
		updatedAt: null,
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : null,
		features: event.features || [],
		images: event.images || [],
	}
}

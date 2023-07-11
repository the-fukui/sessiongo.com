import type { Event } from '@api/src/domain/entities/event'

export type UpdateEventDTO = Omit<Event, 'createdAt' | 'updatedAt'>

export const convertUpdateEventToEvent = (event: UpdateEventDTO): Event => {
	return {
		...event,
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : undefined,
		features: event.features || [],
		images: event.images || [],
	}
}

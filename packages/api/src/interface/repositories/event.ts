import type { EventDetail, EventListItem } from '@api/src/entities/event/DTO'

export interface IEventRepository {
	findAll(): Promise<EventListItem[]>
	findById(id: string): Promise<EventDetail | null>
}

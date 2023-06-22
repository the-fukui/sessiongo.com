import type { Event } from '@api/src/domain/entities/event'

export interface IEventRepository {
	create(event: Event): Promise<Event>
	findAll(): Promise<Event[]>
	findById(id: string): Promise<Event | null>
}

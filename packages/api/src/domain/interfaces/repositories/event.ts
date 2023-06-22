import type { Event } from '@api/src/domain/entities/event'

export interface IEventRepository {
	findAll(): Promise<Event[]>
	findById(id: string): Promise<Event | null>
}

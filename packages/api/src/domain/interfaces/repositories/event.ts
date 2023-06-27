import type { Event, EventFeature } from '@api/src/domain/entities/event'

export type FindAllQuery = {
	limit?: number
	offset?: number
	filter?: {
		features?: EventFeature[]
	}
	search?: string
}

export interface IEventRepository {
	create(event: Event): Promise<string>
	findAll(query?: FindAllQuery): Promise<EntitiesWithCount<Event[]>>
	findById(id: string): Promise<Event | null>
}
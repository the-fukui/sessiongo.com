/**
 * DBデータモデルのCRUDとDTOの変換を行う
 */
import type { Event } from '@api/src/domain/entities/event'
import type { IDBConnection } from '@api/src/domain/interfaces/database/connection'
import type { IEventRepository } from '@api/src/domain/interfaces/repositories/event'
import type { DBModel } from '@api/src/schema'
import { events } from '@api/src/schema'
import { eq } from 'drizzle-orm'

const convertDBToEvent = (event: DBModel): Event => {
	return {
		...event,
		createdAt: new Date(event.createdAt),
		updatedAt: new Date(event.updatedAt),
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : null,
		features: event.features || [],
		images: event.images || [],
	}
}
export const eventRepository = (db: IDBConnection): IEventRepository => {
	const findAll = () => {
		return db
			.select()
			.from(events)
			.all()
			.then((result) => result.map(convertDBToEvent))
	}

	const findById = async (id: string) => {
		return db
			.select()
			.from(events)
			.where(eq(events.id, id))
			.get()
			.then(convertDBToEvent)
	}

	return {
		findAll,
		findById,
	}
}

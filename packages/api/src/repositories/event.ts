/**
 * DBデータモデルのCRUDとDTOの変換を行う
 */
import type { EventDetail, EventListItem } from '@api/src/entities/event/DTO'
import type { DBClient } from '@api/src/infrastructures/d1'
import type { IEventRepository } from '@api/src/interface/repositories/event'
import type { EventModel } from '@api/src/schema'
import { events } from '@api/src/schema'
import { eq } from 'drizzle-orm'

const convertToEventListItemDTO = (event: EventModel): EventListItem => {
	return {
		id: event.id,
		title: event.title,
		type: event.type,
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : undefined,
		place: {
			/**
			 * @todo ここでplaceの情報を取得する
			 */
			name: '',
			region: '',
			locality: '',
		},
		features: event.features || [],
		images: event.images || [],
	}
}

const convertToEventDetailDTO = (event: EventModel): EventDetail => {
	return {
		...convertToEventListItemDTO(event),
		description: event.description,
		host: event.host,
		place: {
			/**
			 * @todo ここでplaceの情報を取得する
			 */
			name: '',
			region: '',
			locality: '',
			address: '',
			placeID: '',
		},
	}
}

export const eventRepository = (db: DBClient): IEventRepository => {
	const findAll = async () => {
		const result = await db.select().from(events).all()
		return result.map(convertToEventListItemDTO)
	}

	const findById = async (id: string) => {
		const result = await db.select().from(events).where(eq(events.id, id)).get()
		return result ? convertToEventDetailDTO(result) : null
	}

	return {
		findAll,
		findById,
	}
}

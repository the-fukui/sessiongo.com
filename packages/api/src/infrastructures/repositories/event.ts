/**
 * DBデータモデルのCRUDとDTOの変換を行う
 */
import type { Event } from '@api/src/domain/entities/event'
import type { IDBConnection } from '@api/src/domain/interfaces/database/connection'
import type { IEventRepository } from '@api/src/domain/interfaces/repositories/event'
import type {
	EventDBInsertModel,
	EventDBSelectModel,
	EventRRulesDBSelectModel,
} from '@api/src/schema'
import { events } from '@api/src/schema'
import { eventRRules } from '@api/src/schema'
import { eq } from 'drizzle-orm'

type Nullable<T> = {
	[P in keyof T]: T[P] | null
}

type EventWithRRuleDBSelectModel = EventDBSelectModel &
	Nullable<Pick<EventRRulesDBSelectModel, 'rrule'>>

const convertDBToEvent = (event: EventWithRRuleDBSelectModel): Event => {
	return {
		...event,
		createdAt: event.createdAt ? new Date(event.createdAt) : null,
		updatedAt: event.updatedAt ? new Date(event.updatedAt) : null,
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : null,
		features: event.features || [],
		images: event.images || [],
	}
}

const convertEventToDB = (event: Event): EventDBInsertModel => {
	return {
		...event,
		id: event.id,
		createdAt: event.createdAt ? event.createdAt.toISOString() : null,
		updatedAt: event.updatedAt ? event.updatedAt.toISOString() : null,
		startAt: event.startAt.toISOString(),
		endAt: event.endAt ? event.endAt.toISOString() : null,
		features: event.features,
		images: event.images,
	}
}
export const eventRepository = (db: IDBConnection): IEventRepository => {
	const create = (event: Event) => {
		console.log(convertEventToDB(event))
		return db
			.insert(events)
			.values(convertEventToDB(event))
			.run()
			.then(() => event.id)
	}

	const findAll = () => {
		const { _, ..._events } = events
		return db
			.select({
				..._events,
				rrule: eventRRules.rrule,
			})
			.from(events)
			.leftJoin(eventRRules, eq(events.id, eventRRules.eventId))
			.all()
			.then((result) => result.map(convertDBToEvent))
	}

	const findById = async (id: string) => {
		const { _, ..._events } = events
		return db
			.select({
				..._events,
				rrule: eventRRules.rrule,
			})
			.from(events)
			.leftJoin(eventRRules, eq(events.id, eventRRules.eventId))
			.where(eq(events.id, id))
			.get()
			.then((result) => (result ? convertDBToEvent(result) : null))
	}

	return {
		create,
		findAll,
		findById,
	}
}

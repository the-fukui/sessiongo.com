/**
 * DBデータモデルのCRUDとDTOの変換を行う
 */
import type { Event } from '@api/src/domain/entities/event'
import type { IDBClient } from '@api/src/domain/interfaces/database'
import type {
	FindAllQuery,
	IEventRepository,
} from '@api/src/domain/interfaces/repositories/event'
import type {
	EventDBInsertModel,
	EventDBSelectModel,
	EventRRulesDBSelectModel,
} from '@api/src/schema'
import { events } from '@api/src/schema'
import { eq, like, or, sql } from 'drizzle-orm'

type EventWithRRuleDBSelectModel = EventDBSelectModel & {
	rrule: EventRRulesDBSelectModel
}

const convertDBToEvent = (event: EventWithRRuleDBSelectModel): Event => {
	return {
		...event,
		createdAt: new Date(event.createdAt),
		updatedAt: new Date(event.updatedAt),
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : undefined,
		rrule: event.rrule.rrule,
		features: event.features || [],
		images: event.images || [],
	}
}

const convertEventToDB = (event: Event): EventDBInsertModel => {
	return {
		...event,
		id: event.id,
		createdAt: event.createdAt ? event.createdAt.toISOString() : undefined,
		updatedAt: event.updatedAt ? event.updatedAt.toISOString() : undefined,
		startAt: event.startAt.toISOString(),
		endAt: event.endAt ? event.endAt.toISOString() : null,
		features: event.features,
		images: event.images,
	}
}
export const eventRepository = (db: IDBClient): IEventRepository => {
	const create = (event: Event) => {
		console.log(convertEventToDB(event))
		return db
			.insert(events)
			.values(convertEventToDB(event))
			.run()
			.then(() => event.id)
	}

	const findAll = (query?: FindAllQuery) => {
		/**
		 * クエリ内容はcountにも反映すること
		 */
		const count = _count()
		const entities = db.query.events
			.findMany({
				with: {
					rrule: true,
				},
				limit: query?.limit || 10,
				offset: query?.offset || 0,
				/**
				 * @todo featuresの絞り込み
				 */
				where: query?.search
					? or(
							like(events.title, `%${query.search}%`),
							like(events.description, `%${query.search}%`),
							like(events.host, `%${query.search}%`),
					  )
					: undefined,
			})
			.then((results) => results.map(convertDBToEvent))

		return Promise.all([count, entities]).then(([count, entities]) => ({
			count,
			entities,
		}))
	}

	const findById = async (id: string) => {
		return db.query.events
			.findFirst({
				where: eq(events.id, id),
				with: {
					rrule: true,
				},
			})
			.then((result) => (result ? convertDBToEvent(result) : null))
	}

	const _count = async (query?: FindAllQuery) => {
		return db
			.select({
				count: sql<number>`count(*)`,
			})
			.from(events)
			.limit(query?.limit || 10)
			.offset(query?.offset || 0)
			.where(
				query?.search
					? or(
							like(events.title, `%${query.search}%`),
							like(events.description, `%${query.search}%`),
							like(events.host, `%${query.search}%`),
					  )
					: undefined,
			)
			.get()
			.then((result) => result.count)
	}

	return {
		create,
		findAll,
		findById,
	}
}

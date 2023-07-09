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
	EventDBSelectModel, // EventRRulesDBInsertModel,
	// EventRRulesDBSelectModel,
} from '@api/src/schema'
import {
	// eventRRules,
	events,
} from '@api/src/schema'
// import { getRRuleEndAt, getRRuleStartAt } from '@api/src/utils/rrule'
import { and, eq, gte, like, lte, or, sql } from 'drizzle-orm'

// import type { SetRequired } from 'type-fest'

// type EventWithRRuleDBSelectModel = EventDBSelectModel & {
// 	rrule?: EventRRulesDBSelectModel
// }

const convertDBToEvent = (
	// event: EventWithRRuleDBSelectModel
	event: EventDBSelectModel,
): Event => {
	return {
		...event,
		createdAt: new Date(event.createdAt),
		updatedAt: new Date(event.updatedAt),
		startAt: new Date(event.startAt),
		endAt: event.endAt ? new Date(event.endAt) : undefined,
		// rrule: event.rrule ? event.rrule.rrule : undefined,
		features: event.features || [],
		images: event.images || [],
	}
}

const convertEventToDB = (
	// _event: Event
	event: Event,
): EventDBInsertModel => {
	// // rruleを除去
	// // クローンしないとdeleteで元のeventオブジェクトが変更されてしまい、後続の処理に影響が出る
	// const event = structuredClone(_event)
	// delete event.rrule

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

// const convertEventRRuleToDB = (
// 	event: SetRequired<Event, 'rrule'>,
// ): EventRRulesDBInsertModel => {
// 	return {
// 		eventId: event.id,
// 		rrule: event.rrule,
// 		rruleStartAt: getRRuleStartAt(event.rrule).toISOString(),
// 		rruleEndAt: getRRuleEndAt(event.rrule).toISOString(),
// 	}
// }
export const eventRepository = (db: IDBClient): IEventRepository => {
	const create = async (event: Event) => {
		// // rruleを持っているかのtype guard
		// const hasRRule = (x: Event): x is SetRequired<Event, 'rrule'> =>
		// 	'rrule' in x

		// return db.transaction(async (tx) => {
		// 	await tx.insert(events).values(convertEventToDB(event)).run()
		// 	if (hasRRule(event)) {
		// 		await tx.insert(eventRRules).values(convertEventRRuleToDB(event)).run()
		// 	}

		// 	return event.id
		// })

		return db
			.insert(events)
			.values(convertEventToDB(event))
			.run()
			.then(() => {
				return event.id
			})
	}

	const findAll = (query?: FindAllQuery) => {
		/**
		 * クエリ内容はcountにも反映すること
		 * @todo featuresの絞り込み
		 */

		const searchQuery = query?.search
			? or(
					like(events.title, `%${query.search}%`),
					like(events.description, `%${query.search}%`),
					like(events.host, `%${query.search}%`),
			  )
			: undefined
		const startAfterQuery = query?.startAfter
			? gte(events.startAt, query.startAfter.toISOString())
			: undefined
		const startBeforeQuery = query?.startBefore
			? lte(events.startAt, query.startBefore.toISOString())
			: undefined

		const count = _count()
		const entities = db.query.events
			.findMany({
				with: {
					// rrule: true,
				},
				limit: query?.limit || 10,
				offset: query?.offset || 0,
				where: and(searchQuery, startAfterQuery, startBeforeQuery),
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
					// rrule: true,
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

	const update = async (event: Event) => {
		// createdAt, updatedAtは更新しない
		delete event.createdAt
		delete event.updatedAt

		return db
			.update(events)
			.set(convertEventToDB(event))
			.where(eq(events.id, event.id))
			.run()
			.then(() => {
				return
			})
	}

	/**
	 * @TODO 削除対象が存在しない場合の挙動
	 */
	const remove = async (id: string) => {
		return db
			.delete(events)
			.where(eq(events.id, id))
			.run()
			.then(() => {
				return
			})
	}

	return {
		create,
		findAll,
		findById,
		update,
		remove,
	}
}

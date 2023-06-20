/**
 * router(infrastructure)とuseCase(application)の橋渡しをする
 * 必要があればselializer(json整形など)を呼び出す
 */
import type { IDBConnection } from '@api/src/interface/database/connection'
import { eventRepository } from '@api/src/repositories/event'
import { findEventUseCase } from '@api/src/useCases/event'

export const eventController = (db: IDBConnection) => {
	const repository = eventRepository(db)
	const useCase = findEventUseCase(repository)

	const getEvents = async () => {
		const result = await useCase.getEvents()
		return result
	}

	const getEvent = async (id: string) => {
		const result = await useCase.getEvent(id)
		return result
	}

	return {
		getEvents,
		getEvent,
	}
}

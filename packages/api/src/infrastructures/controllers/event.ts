/**
 * router(infrastructure)とuseCase(application)の橋渡しをする
 * 必要があればselializer(json整形など)を呼び出す
 */
import type { CreateEventDTO } from '@api/src/appplication/dtos/createEventDto'
import { eventUseCase } from '@api/src/appplication/useCases/event'
import type { IDBConnection } from '@api/src/domain/interfaces/database/connection'
import { eventRepository } from '@api/src/infrastructures/repositories/event'

export const eventController = (db: IDBConnection) => {
	const repository = eventRepository(db)
	const useCase = eventUseCase(repository)

	const createEvent = async (event: CreateEventDTO) => {
		return useCase.createEvent(event)
	}

	const getEvents = async () => {
		return useCase.getEvents()
	}

	const getEvent = async (id: string) => {
		return useCase.getEvent(id)
	}

	return {
		createEvent,
		getEvents,
		getEvent,
	}
}

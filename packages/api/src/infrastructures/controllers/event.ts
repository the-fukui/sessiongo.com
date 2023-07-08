/**
 * router(infrastructure)とuseCase(application)の橋渡しをする
 * 必要があればselializer(json整形など)を呼び出す
 */
import type { CreateEventDTO } from '@api/src/appplication/dtos/createEventDto'
import {
	type UpdateEventDTO,
	convertUpdateEventToEvent,
} from '@api/src/appplication/dtos/updateEventDTO'
import { eventUseCase } from '@api/src/appplication/useCases/event'
import type { IDBClient } from '@api/src/domain/interfaces/database'
import type { IStorageClient } from '@api/src/domain/interfaces/storage'
import { eventRepository } from '@api/src/infrastructures/repositories/event'
import {
	convertEventToEventDetail,
	convertEventToEventListItem,
} from '@api/src/infrastructures/serializers/event'

export const eventController = (db: IDBClient, storage: IStorageClient) => {
	const repository = eventRepository(db)
	const useCase = eventUseCase(repository, storage)

	const createEvent = async (event: CreateEventDTO) => {
		return useCase.createEvent(event)
	}

	const getEvents = async () => {
		return useCase.getEvents().then((events) => ({
			...events,
			entities: events.entities.map(convertEventToEventListItem),
		}))
	}

	const getMonthlyEvents = async (year: number, month: number) => {
		return useCase.getMonthlyEvents(year, month).then((events) => ({
			...events,
			entities: events.entities.map(convertEventToEventListItem),
		}))
	}

	const getEvent = async (id: string) => {
		return useCase
			.getEvent(id)
			.then((event) => event && convertEventToEventDetail(event))
	}

	const uploadImage = async (image: ReadableStream) => {
		return useCase.uploadImage(image)
	}

	const updateEvent = async (event: UpdateEventDTO) => {
		return useCase.updateEvent(convertUpdateEventToEvent(event))
	}

	const removeEvent = async (id: string) => {
		return useCase.removeEvent(id)
	}

	return {
		createEvent,
		getEvents,
		getMonthlyEvents,
		getEvent,
		uploadImage,
		updateEvent,
		removeEvent,
	}
}

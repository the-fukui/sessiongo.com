import {
	type CreateEventDTO,
	convertCreateEventToEvent,
} from '@api/src/application/dtos/createEventDto'
import {
	type UpdateEventDTO,
	convertUpdateEventToEvent,
} from '@api/src/application/dtos/updateEventDTO'
import type { IEventRepository } from '@api/src/domain/interfaces/repositories/event'
import type { IStorageClient } from '@api/src/domain/interfaces/storage'
import { imageStorage } from '@api/src/infrastructures/storage'

export const eventUseCase = (
	eventRepository: IEventRepository,
	storageClient: IStorageClient,
) => {
	/**
	 * @todo ユースケースを細分化する（カレンダー一覧表示用・検索用...）
	 * 繰り返しイベントのパースもここで？
	 */

	const createEvent = async (event: CreateEventDTO) => {
		return eventRepository.create(convertCreateEventToEvent(event))
	}

	const getEvents = async () => {
		return eventRepository.findAll()
	}

	const getMonthlyEvents = async (year: number, month: number) => {
		return eventRepository.findAll({
			startAfter: new Date(year, month - 1),
			startBefore: new Date(year, month),
		})
	}

	const getEvent = async (id: string) => {
		return eventRepository.findById(id)
	}

	const uploadImage = async (image: ReadableStream) => {
		const storage = imageStorage(storageClient)
		return storage.upload(image)
	}

	const updateEvent = async (event: UpdateEventDTO) => {
		return eventRepository.update(convertUpdateEventToEvent(event))
	}

	const removeEvent = async (id: string) => {
		return eventRepository.remove(id)
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

import {
	type CreateEventDTO,
	convertCreateEventToEvent,
} from '@api/src/appplication/dtos/createEventDto'
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

	const getEvent = async (id: string) => {
		return eventRepository.findById(id)
	}

	const uploadImage = async (image: ReadableStream) => {
		const storage = imageStorage(storageClient)
		return storage.upload(image)
	}

	return {
		createEvent,
		getEvents,
		getEvent,
		uploadImage,
	}
}

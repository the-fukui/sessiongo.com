import type { IEventRepository } from '@api/src/interface/repositories/event'

export const findEventUseCase = (eventRepository: IEventRepository) => {
	/**
	 * @todo ユースケースを細分化する（カレンダー一覧表示用・検索用...）
	 * 繰り返しイベントのパースもここで？
	 */
	const getEvents = async () => {
		const result = await eventRepository.findAll()
		return result
	}

	const getEvent = async (id: string) => {
		const result = await eventRepository.findById(id)
		return result
	}

	return {
		getEvents,
		getEvent,
	}
}

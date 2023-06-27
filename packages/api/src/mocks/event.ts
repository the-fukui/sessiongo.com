import type { CreateEventDTO } from '@api/src/appplication/dtos/createEventDto'
import type { EventFeature } from '@api/src/domain/entities/event'
import { EVENT_FEATURE } from '@api/src/domain/entities/event'
import { generate } from 'random-words'

const generateRandomFeatures = () =>
	Array.from(
		new Set(
			Array.from(
				{
					length: Math.floor(Math.random() * Object.keys(EVENT_FEATURE).length),
				},
				() => Math.floor(Math.random() * Object.keys(EVENT_FEATURE).length),
			) as EventFeature[],
		),
	)

export const createRandomEventDTO = (): CreateEventDTO => {
	return {
		title: generate({ join: ' ', exactly: 5 }),
		description: generate({ join: ' ', exactly: 100 }),
		host: generate({ join: ',', exactly: 3 }),
		status: 0,
		type: 0,
		startAt: new Date(),
		endAt: new Date(),
		rrule: null,
		placeID: generate({ join: '', exactly: 3 }),
		features: generateRandomFeatures(),
		images: [],
	}
}
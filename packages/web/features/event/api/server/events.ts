import type { Event } from '@web/infrastructures/firestore/types/schema'

import events from '../../mocks/data/events'
import type { ListEventDTO } from '../../types/DTO'

interface GetEventsParams {
  page?: number
}

const transformEventToListEventDTO = (event: Event): ListEventDTO => {
  return {
    ID: event.ID,
    title: event.title,
    host: event.host,
    type: event.type,
    startAt: event.startAt.seconds,
    duration: event.duration,
    placeID: event.placeID,
    images: event.images,
  }
}

export const listEvents = async ({ page }: GetEventsParams = {}): Promise<
  ListEventDTO[]
> => {
  // @TODO: fetch events from firestore
  const response = events.map(transformEventToListEventDTO)

  return response
}

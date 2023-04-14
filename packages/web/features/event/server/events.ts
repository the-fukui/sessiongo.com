import type { Event } from '@web/infrastructures/firestore/types/schema'
import dayjs from '@web/utils/dayjs'

import events from '../mocks/data/events'
import type { GetEventDTO, ListEventDTO } from '../types/DTO'
import { getRecurrenceOfMonth } from '../utils/calendar'
import { getPlace, getPlaceAddress, getPlaceName } from '../utils/googleMap'

interface GetEventsParams {
  year?: number
  month?: number
}

const transformEventToListEventDTO = (event: Event): ListEventDTO => {
  return {
    ID: event.ID,
    title: event.title,
    host: event.host,
    type: event.type,
    startAt: event.startAt,
    duration: event.duration,
    features: event.features,
    placeID: event.placeID,
    images: event.images,
  }
}

const transformEventToGetEventDTO = async (
  event: Event,
): Promise<GetEventDTO> => {
  const place = await getPlace(event.placeID)
  const placeName = getPlaceName(place)
  const placeAddress = getPlaceAddress(place)
  const placeMapURL = place.url || ''

  return {
    ID: event.ID,
    title: event.title,
    description: event.description,
    host: event.host,
    status: event.status,
    type: event.type,
    startAt: event.startAt,
    duration: event.duration,
    placeName,
    placeAddress,
    placeMapURL,
    feature: event.features,
    images: event.images,
  }
}

/**
 * 指定IDのイベントを取得する
 */
export const getEvent = async (ID: string): Promise<GetEventDTO | null> => {
  // @TODO: fetch events from firestore
  const event = events.find((event) => event.ID === ID)
  if (!event) {
    console.log("Can't find event:", ID)
    return null
  }
  const response = event

  const getEventDTO = await transformEventToGetEventDTO(response)

  return getEventDTO
}

/**
 * 指定の月のイベント一覧を取得する
 * 取得範囲はタイムゾーンを考慮して、UTC基準で指定の月±1日分取得する
 * 現地時間で溢れた分はフロントで切り捨てる
 */
export const listEventsOfMonth = async ({
  year = dayjs().utc().get('year'),
  month = dayjs().utc().get('month') + 1,
}: GetEventsParams = {}): Promise<ListEventDTO[]> => {
  // @TODO: fetch events from firestore
  const response = events

  const recurranceResolved = response
    .map((event) => {
      return getRecurrenceOfMonth<typeof event>({
        item: event,
        rangeStartAt: dayjs()
          .utc()
          .startOf('month')
          .month(month - 1)
          .year(year)
          .subtract(1, 'day')
          .unix(),
        rangeEndAt: dayjs()
          .utc()
          .startOf('month')
          .month(month - 1)
          .year(year)
          .add(1, 'month')
          .add(1, 'day')
          .unix(),
      })
    })
    .flat()
    .sort((a, b) => a.startAt - b.startAt)

  const listEventDTOs = recurranceResolved.map(transformEventToListEventDTO)

  return listEventDTOs
}

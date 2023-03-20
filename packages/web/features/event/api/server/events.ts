import type { Event } from '@web/infrastructures/firestore/types/schema'
import dayjs from '@web/utils/dayjs'

import events from '../../mocks/data/events'
import type { ListEventDTO } from '../../types/DTO'
import { getRecurrenceOfMonth } from '../../utils/calendar'

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
    placeID: event.placeID,
    images: event.images,
  }
}

/**
 * 指定の月のイベント一覧を取得する
 * 取得範囲はタイムゾーンを考慮して、UTC基準で指定の月±12時間分取得する
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
          .subtract(12, 'hour')
          .unix(),
        rangeEndAt: dayjs()
          .utc()
          .startOf('month')
          .month(month)
          .year(year)
          .add(12, 'hour')
          .unix(),
      })
    })
    .flat()
    .sort((a, b) => a.startAt - b.startAt)

  const listEventDTOs = recurranceResolved.map(transformEventToListEventDTO)

  return listEventDTOs
}
import dayjs from '@web/utils/dayjs'

import { useMemo, useState } from 'react'

import CalendarEvent from '../components/CalendarEvent'
import GridEvent from '../components/GridEvent'
import type { ListEventDTO } from '../types/DTO'

/**
 * 与えられたイベント一覧を表示するカレンダーとグリッドのコンポーネントを返す
 */
export const useEventCalendar = (events: ListEventDTO[]) => {
  const eventDates = events.map((event) => event.startAt)
  const [selectedDate, setSelectedDate] = useState(() => dayjs().unix())

  const selectedDateEvents = useMemo(
    () =>
      events.filter((event) =>
        dayjs.unix(event.startAt).isSame(dayjs.unix(selectedDate), 'day'),
      ),
    [events, selectedDate],
  )

  return {
    Calendar: () => (
      <CalendarEvent eventDates={eventDates} onDateChange={setSelectedDate} />
    ),
    Grid: () => <GridEvent events={selectedDateEvents} />,
  }
}

import dayjs from '@web/utils/dayjs'

import { useMemo, useState } from 'react'

import CalendarEvent from '../components/CalendarEvent'
import GridEvent from '../components/GridEvent'
import SelectEventFeature from '../components/SelectEventFeature'
import type { EVENT_FEATURE } from '../constants'
import type { ListEventDTO } from '../types/DTO'

/**
 * 与えられたイベント一覧を表示するカレンダーとグリッドと特徴一覧のコンポーネントを返す
 */
export const useEventCalendar = (events: ListEventDTO[]) => {
  const [selectedDate, setSelectedDate] = useState(() => dayjs().unix())
  const [selectedFeatures, setSelectedFeatures] = useState<
    (keyof typeof EVENT_FEATURE)[]
  >([])

  // 日付以外の検索条件で絞り込まれたイベント一覧
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 選択されたタグがすべて含まれている（AND）
      const isFeatureMatched =
        selectedFeatures.length > 0
          ? selectedFeatures.every((feature) =>
              event.features.includes(feature),
            )
          : true
      return isFeatureMatched
    })
  }, [events, selectedFeatures])

  // カレンダー表示用の日付一覧（カレンダー表示用）
  const filteredEventDates = filteredEvents.map((event) => event.startAt)

  // 選択された日付に対応するイベント一覧（グリッド表示用）
  const selectedEvents = useMemo(() => {
    return filteredEvents.filter((event) =>
      dayjs.unix(selectedDate).isSame(dayjs.unix(event.startAt), 'day'),
    )
  }, [filteredEvents, selectedDate])

  return {
    Calendar: () => (
      <CalendarEvent
        eventDates={filteredEventDates}
        onDateChange={setSelectedDate}
      />
    ),
    Grid: () => <GridEvent events={selectedEvents} />,
    SelectFeature: () => (
      <SelectEventFeature
        selected={selectedFeatures}
        onSelect={setSelectedFeatures}
      />
    ),
  }
}

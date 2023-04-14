// import style from './index.module.scss'
import dayjs from '@web/utils/dayjs'

import type { DayProps } from '@mantine/dates'
import { Calendar, DatesProvider } from '@mantine/dates'
import { useState } from 'react'

type Props = {
  className?: string
  eventDates: number[] // unixtime(seconds)
  onDateSelect: (date: number) => void // unixtime(seconds)
  onMonthSelect: (date: number) => void // unixtime(seconds)
  defaultDate?: number // unixtime(seconds)
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  onMonthSelect,
  date,
  setDate,
  getDayProps,
}) => (
  <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0 }}>
    <Calendar
      date={date} // カレンダー表示に使う日付（≠ 選択された日付）
      onDateChange={(date) => setDate(date)}
      onMonthSelect={(date) => onMonthSelect(dayjs(date).unix())}
      onPreviousMonth={(date) => onMonthSelect(dayjs(date).unix())}
      onNextMonth={(date) => onMonthSelect(dayjs(date).unix())}
      getDayProps={getDayProps}
      hideOutsideDates
      size="xl"
      styles={{
        monthCell: { padding: '0.5em !important' },
        calendarHeader: { maxWidth: '100%' },
      }}
    />
  </DatesProvider>
)

const Container = (props: Props) => {
  /** Logic here */

  const { eventDates, onDateSelect, defaultDate } = props

  // カレンダー表示に使う日付（≠ 選択された日付）
  // 日付選択時のハンドラはgetDayPropsで定義する
  const [date, setDate] = useState<Date>(() => {
    // 表示用の日付は月初にする（閏日など他の月に存在しない日付考慮）
    if (defaultDate) return dayjs.unix(defaultDate).startOf('month').toDate()

    return dayjs().startOf('month').toDate()
  })

  const eventDays = eventDates.map((date) => dayjs.unix(date).format('MMDD'))

  // カレンダースタイルと日付選択時の挙動
  const getDayProps = (date: Date): Partial<DayProps> => {
    const hasEvent = eventDays.includes(dayjs(date).format('MMDD'))
    return {
      sx: (theme) => ({
        // イベントがある日の背景色を変更する
        backgroundColor: hasEvent
          ? theme.colors['shikkuri-white'][1]
          : 'transparent',
        ...theme.fn.hover({
          backgroundColor: theme.colors['shikkuri-white'][2],
        }),
      }),
      onClick: () => onDateSelect(dayjs(date).unix()),
    }
  }

  const containerProps = {
    getDayProps,
    date,
    setDate,
  }
  return { ...props, ...containerProps }
}

export default function CalendarEvent(props: Props) {
  return <Presenter {...Container(props)} />
}

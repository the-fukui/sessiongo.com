// import style from './index.module.scss'
import dayjs from '@web/utils/dayjs'

import type { DayProps } from '@mantine/dates'
import { DatePicker, DatesProvider } from '@mantine/dates'

type Props = {
  className?: string
  eventDates: number[] // unixtime(seconds)
  onDateChange: (date: number) => void // unixtime(seconds)
  date?: Date
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  onDateChange,
  date = dayjs().toDate(),
  getDayProps,
}) => (
  <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0 }}>
    <DatePicker
      value={date}
      onChange={(date) => onDateChange(dayjs(date).unix())}
      getDayProps={getDayProps}
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

  const { eventDates } = props
  const eventDays = eventDates.map((date) => dayjs.unix(date).format('MMDD'))

  // カレンダースタイル
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
    }
  }

  const containerProps = {
    getDayProps,
  }
  return { ...props, ...containerProps }
}

export default function CalendarEvent(props: Props) {
  return <Presenter {...Container(props)} />
}

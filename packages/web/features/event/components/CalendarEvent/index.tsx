// import style from './index.module.scss'
import dayjs from '@web/utils/dayjs'

import type { DayProps } from '@mantine/dates'
import { DatePicker, DatesProvider } from '@mantine/dates'

type Props = {
  className?: string
  eventDates: Date[]
  onDateChange: (date: Date) => void
  date?: Date
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  onDateChange,
  date = dayjs().toDate(),
  getDayProps,
}) => (
  <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0 }}>
    <DatePicker
      value={date}
      onChange={onDateChange}
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

  const eventDays = [
    dayjs().set('date', 3),
    dayjs().set('date', 9),
    dayjs().set('date', 15),
  ].map((date) => date.format('MMDD'))

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

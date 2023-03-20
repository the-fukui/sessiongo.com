import dayjs from '@web/utils/dayjs'

import { rrulestr } from 'rrule'

interface RecurrenceItem {
  startAt: number
  rrule: string | null
}

interface getRecurrenceOfMonthProps<T extends RecurrenceItem> {
  item: T
  rangeStartAt: number
  rangeEndAt: number
}

/** rruleを解析し、指定した範囲にイベントを複製して一覧を返す
 * 複製するイベントはstartAtを上書きする
 * rangeはUnixtime(seconds)
 */
export const getRecurrenceOfMonth = <T extends RecurrenceItem>({
  item,
  rangeStartAt,
  rangeEndAt,
}: getRecurrenceOfMonthProps<T>) => {
  const { rrule } = item

  if (!rrule) {
    // rruleがない場合はそのまま返す
    return [item]
  }

  console.log(
    dayjs.unix(rangeStartAt).toDate(),
    dayjs.unix(rangeEndAt).toDate(),
  )

  const rule = rrulestr(rrule)
  const recurrence = rule.between(
    dayjs.unix(rangeStartAt).toDate(),
    dayjs.unix(rangeEndAt).toDate(),
  )

  return recurrence.map((date) => {
    return {
      ...item,
      startAt: dayjs(date).unix(),
    }
  })
}

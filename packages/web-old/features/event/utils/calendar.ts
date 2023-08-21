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
 * 範囲は日付単位
 * 複製するイベントはstartAtの日付を上書きする
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
  const recurringDates = rule.between(
    dayjs.unix(rangeStartAt).toDate(),
    dayjs.unix(rangeEndAt).toDate(),
  )

  return recurringDates.map((date) => {
    const recurringDate = dayjs(date)
    return {
      ...item,
      // 日時を上書き
      /**
       * @TODO UTCの日付で上書きしてるのでバグりそう
       * どうせなら時刻系はUTC ISOで統一しても良いかも
       */
      startAt: dayjs(item.startAt)
        .set('year', recurringDate.year())
        .set('month', recurringDate.month())
        .set('date', recurringDate.date())
        .unix(),
    }
  })
}

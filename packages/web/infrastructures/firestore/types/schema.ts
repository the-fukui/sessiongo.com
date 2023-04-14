import type { EventFeature, EventStatus, EventType } from '@web/features/event'

// 日時系は全てunixtime(seconds)で管理する
// firestoreに保存する際には、firestoreのTimestampに変換する
// firestoreから取得する際には、infra層でfirestoreのTimestampをunixtime(seconds)に変換して返す

interface BaseDocument {
  createdAt: number // unixtime(seconds)
  updatedAt: number // unixtime(seconds)
}
export interface Event extends BaseDocument {
  ID: string
  title: string
  description: string
  host: string
  status: EventStatus
  type: EventType
  startAt: number // unixtime(seconds)
  duration: number // seconds
  rrule: string | null

  // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
  rruleStartAt: number | null // unixtime(seconds)
  rruleEndAt: number | null // unixtime(seconds)

  placeID: string //google map API placeID
  features: EventFeature[]
  images: string[] // url set
}

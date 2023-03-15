import type { EventFeature, EventStatus, EventType } from '@web/features/event'

import type { Timestamp } from '@firebase/firestore-types'

interface BaseDocument {
  createdAt: Timestamp
  updatedAt: Timestamp
}
export interface Event extends BaseDocument {
  title: string
  description: string
  status: EventStatus
  type: EventType
  startAt: Timestamp
  duration: number // seconds
  rrule: string | null

  // ある月で有効な繰り返しイベントのみをクエリ取得する際に使用する
  rruleStartAt: Timestamp | null
  rruleEndAt: Timestamp | null

  placeID: string //google map API placeID
  feature: EventFeature[]
}

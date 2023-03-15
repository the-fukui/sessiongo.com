import type {
  EventFeature,
  EventStatus,
  EventType,
} from '@web/features/event/types/constants'

// 時刻はUnixtime(seconds)で指定する

export interface CreateEventDTO {
  title: string
  description: string
  status: EventStatus
  type: EventType
  startAt: number
  duration: number
  rrule: string | null
  placeID: string //google map API placeID
  feature: EventFeature[]
}

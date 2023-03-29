import type {
  EventFeature,
  EventStatus,
  EventType,
} from '@web/features/event/types/constants'

// 時刻はUnixtime(seconds)で指定する

export interface CreateEventDTO {
  title: string
  description: string
  host: string
  status: EventStatus
  type: EventType
  startAt: number
  duration: number
  rrule: string | null
  placeID: string //google map API placeID
  feature: EventFeature[]
  images: string[] // url set
}

export interface GetEventDTO {
  ID: string
  title: string
  description: string
  host: string
  status: EventStatus
  type: EventType
  startAt: number
  duration: number
  placeName: string
  placeAddress: string
  placeMapURL: string
  feature: EventFeature[]
  images: string[] // url set
}

export interface ListEventDTO {
  ID: string
  title: string
  host: string
  type: EventType
  startAt: number
  duration: number
  placeID: string //google map API placeID
  images: string[]
}

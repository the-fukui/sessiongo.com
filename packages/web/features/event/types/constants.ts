import type {
  EVENT_FEATURE,
  EVENT_STATUS,
  EVENT_TYPE,
} from '@web/features/event/constants'

export type EventStatus = keyof typeof EVENT_STATUS
export type EventType = keyof typeof EVENT_TYPE
export type EventFeature = keyof typeof EVENT_FEATURE

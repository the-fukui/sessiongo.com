// Enums
export const EVENT_STATUS = {
	PUBLIC: 0,
	DRAFT: 1,
	PRIVATE: 2,
} as const

export const EVENT_TYPE = {
	SESSION: 0,
	LIVE: 1,
	OTHER: 2,
} as const

export const EVENT_FEATURE = {
	BEGINNERS_ARE_WELCOME: 0,
	ADVANCED_NOTIFICATION_REQUIRED: 1,
	SPECIAL_OFFERS_AVAILABLE: 2,
	NO_SMOKING: 3,
	CLOSED: 4,
	SESSION_LIVE: 5,
	DONATION: 6,
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]
export type EventType = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE]
export type EventFeature = (typeof EVENT_FEATURE)[keyof typeof EVENT_FEATURE]

export interface Event {
	id: string
	createdAt?: Date
	updatedAt?: Date
	title: string
	description: string
	host: string
	status: EventStatus
	type: EventType
	startAt: Date
	endAt?: Date
	// rrule?: string
	placeID: string
	features: EventFeature[]
	images: string[]
}

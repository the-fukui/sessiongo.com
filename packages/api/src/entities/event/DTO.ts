import type { EventFeature, EventType } from '@api/src/entities/event/model'

/**
 * 一覧表示用のイベント情報
 */
export interface EventListItem {
	id: string
	title: string
	type: EventType
	startAt: Date
	endAt?: Date
	place: {
		name: string
		region: string // 広域名（道府県名）
		locality: string // 地域名（市区町村名）
	}
	features: EventFeature[]
	images: string[]
}

/**
 * 詳細表示用のイベント情報
 */
export interface EventDetail extends EventListItem {
	description: string
	host: string
	place: {
		name: string
		region: string // 広域名（道府県名）
		locality: string // 地域名（市区町村名）
		address: string // 完全な住所
		placeID: string // google map API placeID
	}
}

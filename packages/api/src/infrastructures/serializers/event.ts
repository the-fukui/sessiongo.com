import type {
	Event,
	EventFeature,
	EventType,
} from '@api/src/domain/entities/event'

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

/**
 * ドメインモデルとレスポンスモデルの変換
 */
export const convertEventToEventListItem = (event: Event): EventListItem => {
	return {
		id: event.id,
		title: event.title,
		type: event.type,
		startAt: event.startAt,
		endAt: event.endAt,
		place: {
			/**
			 * @todo 住所情報を取得する
			 */
			name: '',
			region: '',
			locality: '',
		},
		features: event.features,
		images: event.images,
	}
}

export const convertEventToEventDetail = (event: Event): EventDetail => {
	return {
		id: event.id,
		title: event.title,
		description: event.description,
		host: event.host,
		type: event.type,
		startAt: event.startAt,
		endAt: event.endAt,
		place: {
			/**
			 * @todo 住所情報を取得する
			 */
			name: '',
			region: '',
			locality: '',
			address: '',
			placeID: event.placeID,
		},
		features: event.features,
		images: event.images,
	}
}
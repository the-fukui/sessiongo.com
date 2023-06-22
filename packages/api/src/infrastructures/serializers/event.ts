import type {
	Event,
	EventFeature,
	EventType,
} from '@api/src/domain/entities/event'

/**
 * 一覧表示用のイベント情報
 */
export interface EventListItem {
	id: string | null
	title: string
	type: EventType
	startAt: Date
	endAt: Date | null
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
		...event,
		place: {
			/**
			 * @todo 住所情報を取得する
			 */
			name: '',
			region: '',
			locality: '',
		},
	}
}

export const convertEventToEventDetail = (event: Event): EventDetail => {
	return {
		...event,
		description: '',
		host: '',
		place: {
			/**
			 * @todo 住所情報を取得する
			 */
			name: '',
			region: '',
			locality: '',
			address: '',
			placeID: '',
		},
	}
}

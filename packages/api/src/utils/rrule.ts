import type { RRule } from 'rrule'
import { rrulestr } from 'rrule'

/**
 * RRule文字列から繰り返しの開始日を取得する
 */
export const getRRuleStartAt = (rruleString: string): Date => {
	// 文字列にdtstartがない場合
	if (!rruleString.includes('DTSTART')) {
		throw new Error('RRule string must include DTSTART')
	}

	const rrule = rrulestr(rruleString)

	return rrule.options.dtstart
}

/**
 * RRule文字列から繰り返しの終了日を取得する
 */
export const getRRuleEndAt = (rruleString: string): Date => {
	const rrule = rrulestr(rruleString)

	const hasCount = (x: RRule): x is RRule & { options: { count: number } } =>
		'count' in x.options && typeof x.options.count === 'number'
	const hasUntil = (x: RRule): x is RRule & { options: { until: Date } } =>
		'until' in x.options && x.options.until instanceof Date

	// 終了日指定の場合
	if (hasUntil(rrule)) {
		return rrule.options.until
	}

	// 回数指定の場合
	if (hasCount(rrule)) {
		const rruleEndAt = rrule.all()[rrule.options.count - 1]
		if (!rruleEndAt) throw new Error('RRule is endless')
		return rruleEndAt
	}

	throw new Error('RRule is endless')
}

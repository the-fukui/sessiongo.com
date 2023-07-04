import type { RRule } from 'rrule'
import { rrulestr } from 'rrule'

/**
 * RRule文字列から繰り返しの開始日を取得する
 */
export const getRRuleStartAt = (rruleString: string): Date => {
	const rrule = rrulestr(rruleString)
	return rrule.options.dtstart
}

/**
 * RRule文字列から繰り返しの終了日を取得する
 */
export const getRRuleEndAt = (rruleString: string): Date => {
	const rrule = rrulestr(rruleString)

	const hasCount = (x: RRule): x is RRule & { options: { count: number } } =>
		'count' in x.options
	const hasUntil = (x: RRule): x is RRule & { options: { until: Date } } =>
		'until' in x.options

	// 回数指定の場合
	if (hasCount(rrule)) {
		const rruleEndAt = rrule.all()[rrule.options.count - 1]
		if (!rruleEndAt) throw new Error('RRule is endless')
		return rruleEndAt
	}

	// 終了日指定の場合
	if (hasUntil(rrule)) {
		return rrule.options.until
	}

	throw new Error('RRule is endless')
}

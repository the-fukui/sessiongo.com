import { getRRuleEndAt, getRRuleStartAt } from '@api/src/utils/rrule'
import { describe, expect, it } from 'vitest'

// テスト用の実際のRRule文字列
const rruleWithDTStart = 'DTSTART:20230101T010000Z\nRRULE:FREQ=DAILY;COUNT=5'
const rruleWithUntil =
	'DTSTART:20230101T010000Z\nRRULE:FREQ=DAILY;UNTIL=20230110T010000Z'
const rruleWithCount = 'DTSTART:20230101T010000Z\nRRULE:FREQ=DAILY;COUNT=5'
const rruleWithoutDTStart = 'RRULE:FREQ=DAILY;COUNT=5'
const invalidRRule = 'RRULE:FREQ=INVALID'

describe('getRRuleStartAt', () => {
	it('DTSTARTがある有効なRRule文字列の開始日が正しく取得できること', () => {
		const startDate = getRRuleStartAt(rruleWithDTStart)
		expect(startDate).toEqual(new Date(Date.UTC(2023, 0, 1, 1))) // 2023年1月1日の1時
	})

	it('DTSTARTがないRRule文字列を渡した時にエラーがスローされること', () => {
		expect(() => getRRuleStartAt(rruleWithoutDTStart)).toThrow(Error)
	})

	it('無効なRRule文字列を渡した時にエラーがスローされること', () => {
		expect(() => getRRuleStartAt(invalidRRule)).toThrow(Error)
	})
})

describe('getRRuleEndAt', () => {
	it('UNTILがある有効なRRule文字列の終了日が正しく取得できること', () => {
		const endDate = getRRuleEndAt(rruleWithUntil)
		expect(endDate).toEqual(new Date(Date.UTC(2023, 0, 10, 1, 0))) // 2023年1月10日の0時
	})

	it('COUNTがある有効なRRule文字列の終了日が正しく取得できること', () => {
		const endDate = getRRuleEndAt(rruleWithCount)
		expect(endDate).toEqual(new Date(Date.UTC(2023, 0, 5, 1, 0))) // 2023年1月5日の1時
	})

	it('無効なRRule文字列を渡した時にエラーがスローされること', () => {
		expect(() => getRRuleEndAt(invalidRRule)).toThrow(Error)
	})
})

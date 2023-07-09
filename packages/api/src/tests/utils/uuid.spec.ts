import { createUUID } from '@api/src/utils/uuid'
import { describe, expect, it } from 'vitest'

describe('createUUID', () => {
	it('UUIDが正しく生成されることを確認', () => {
		const uuid = createUUID()
		expect(uuid).toMatch(
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
		)
	})

	it('生成されるUUIDが一意であることを確認', () => {
		// 10回確認
		const uuids = Array.from({ length: 10 }, () => createUUID())
		const uniqueUuids = new Set(uuids)
		expect(uuids.length).toBe(uniqueUuids.size)
	})
})

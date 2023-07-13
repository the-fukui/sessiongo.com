import { getTestUser } from '@api/src/utils/firebaseAuthentication'
import { describe, expect, it } from 'vitest'

describe('getTestUserToken', () => {
	it('テストユーザーのトークンとクレデンシャルを取得できる', async () => {
		const { token, credential } = await getTestUser()
		expect(token).toBeDefined()
		expect(credential).toBeDefined()
		expect(typeof token).toBe('string')
		expect(token?.length).toBeGreaterThan(0)
		expect(credential).toHaveProperty('user')
		expect(credential.user).toHaveProperty('uid')
		expect(typeof credential.user.uid).toBe('string')
		expect(credential.user.uid?.length).toBeGreaterThan(0)
	})
})

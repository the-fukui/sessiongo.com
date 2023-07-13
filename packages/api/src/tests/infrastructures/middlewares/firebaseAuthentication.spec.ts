import { verifyFirebaseAuthenticationToken } from '@api/src/infrastructures/middlewares/firebaseAuthentication'
import { getTestUser } from '@api/src/utils/firebaseAuthentication'
import { Hono } from 'hono'
import { beforeAll, describe, expect, it } from 'vitest'

// appとルーターのセットアップ
const app = new Hono<{ Bindings: WorkersEnv }>()

describe('verifyFirebaseAuthenticationToken', () => {
	beforeAll(() => {
		// トークンを検証してuidを返す
		app.post('/test', verifyFirebaseAuthenticationToken(), async (c) => {
			const uid = c.get('uid')
			return c.json(uid)
		})
	})

	it('ヘッダーにtokenがない場合は401エラー', async () => {
		const res = await app.request('/test', { method: 'POST' })

		expect(res.status).toBe(401)
	})

	it('ヘッダーにtokenがある場合はuidを取得する', async () => {
		const { token, credential } = await getTestUser()

		const res = await app.request('/test', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		expect(res.status).toBe(200)
		expect(await res.json()).toBe(credential.user.uid) // 投げたtokenのuidと一致する
	})
})

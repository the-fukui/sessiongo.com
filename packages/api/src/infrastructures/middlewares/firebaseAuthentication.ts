import {
	FIREBASE_AUTH_EMULATOR_HOST,
	FIREBASE_PROJECT_ID,
	FIREBASE_PUBLIC_JWK_CACHE_KEY,
} from '@api/src/constants'
import { Auth, WorkersKVStoreSingle } from 'firebase-auth-cloudflare-workers'
import type { MiddlewareHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'

declare module 'hono' {
	interface ContextVariableMap {
		uid: string
	}
}

/**
 * ユーザーがFirebase Authenticationで発行したトークン（JWT）が有効かどうかを検証
 */
export const verifyFirebaseAuthenticationToken =
	(): MiddlewareHandler<{ Bindings: WorkersEnv }> => async (c, next) => {
		const authorization = c.req.headers.get('Authorization')
		if (!authorization)
			throw new HTTPException(401, {
				message: 'Authorization header is required',
			})

		const FIREBASE_JWK_CACHE_KV = c.env.FIREBASE_JWK_CACHE_KV

		const jwt = authorization.replace(/Bearer\s+/i, '')
		const auth = Auth.getOrInitialize(
			FIREBASE_PROJECT_ID,
			WorkersKVStoreSingle.getOrInitialize(
				FIREBASE_PUBLIC_JWK_CACHE_KEY,
				FIREBASE_JWK_CACHE_KV,
			),
		)

		const firebaseToken = await auth
			.verifyIdToken(jwt, {
				FIREBASE_AUTH_EMULATOR_HOST,
			})
			.catch((e) => {
				throw new HTTPException(401, { message: e.message })
			})
		const { uid } = firebaseToken

		c.set('uid', uid)
		next()
	}

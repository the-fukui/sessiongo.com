import { initializeApp } from 'firebase/app'
import {
	connectAuthEmulator,
	createUserWithEmailAndPassword,
	getAuth,
	getIdToken,
	signInWithEmailAndPassword,
} from 'firebase/auth'

const app = initializeApp({
	projectId: 'default',
	apiKey: 'test',
})
const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099')

export const getTestUser = async () => {
	// テストユーザー作成
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		'test@example.com',
		'test1234',
	).catch(async (error) => {
		if (error.code === 'auth/email-already-in-use') {
			// すでにユーザーが存在する場合はログイン
			return await signInWithEmailAndPassword(
				auth,
				'test@example.com',
				'test1234',
			)
		}
	})

	if (!userCredential) throw new Error('user not found')

	// IDトークンを取得
	const idToken = await getIdToken(userCredential.user)
	return {
		token: idToken,
		credential: userCredential,
	}
}

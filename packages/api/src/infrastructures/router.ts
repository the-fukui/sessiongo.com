import { eventController } from '@api/src/infrastructures/controllers/event'
import {
	createEventValidator,
	deleteEventValidator,
	getMonthlyEventsValidator,
	updateEventValidator,
} from '@api/src/infrastructures/middlewares/validator'
import { createRandomEventDTO } from '@api/src/mocks/event'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

type Env = {
	DB: D1Database
	STORAGE: R2Bucket
}

const router = new Hono<{ Bindings: Env }>()

/**
 * イベント作成
 */
router.post(
	'/events',
	// @ts-expect-error
	createEventValidator,
	async (c) => {
		const db = c.get('db')
		const storage = c.env.STORAGE

		// const event = c.req.valid('json')
		const event = createRandomEventDTO()
		const result = await eventController(db, storage).createEvent(event)

		return c.json(result)
	},
)

/**
 * イベント画像アップロード
 */
router.post('/events/image', async (c) => {
	const db = c.get('db')
	const storage = c.env.STORAGE

	const image = c.req.body

	if (!image) throw new HTTPException(400, { message: 'image is required' })

	const result = await eventController(db, storage).uploadImage(image)

	return c.json(result)
})

/**
 * イベント一覧取得
 */
router.get('/events', async (c) => {
	const db = c.get('db')
	const storage = c.env.STORAGE
	const results = await eventController(db, storage).getEvents()

	/**
	 * @todo  繰り返しイベント実装時のカウントどうするか
	 */
	c.header('X-Total-Count', results.count.toString())
	return c.json(results.entities)
})

/**
 * 指定月のイベント一覧取得
 */
router.get(
	'/events/year/:year{[0-9]{4}}/month/:month{[0-9]{1,2}}',
	// @ts-expect-error
	getMonthlyEventsValidator,
	async (c) => {
		const db = c.get('db')
		const storage = c.env.STORAGE

		const { year, month } = c.req.valid('param')

		const results = await eventController(db, storage).getMonthlyEvents(
			year,
			month,
		)

		/**
		 * @todo  繰り返しイベント実装時のカウントどうするか
		 */
		c.header('X-Total-Count', results.count.toString())
		return c.json(results.entities)
	},
)

/**
 * イベント詳細取得
 */
router.get('/events/:id', async (c) => {
	const db = c.get('db')
	const storage = c.env.STORAGE

	const id = c.req.param('id')
	const result = await eventController(db, storage).getEvent(id)

	if (!result) throw new HTTPException(404, { message: 'event not found' })

	return c.json(result)
})

/**
 * イベント更新
 */
router.put(
	'/events/:id',
	// @ts-expect-error
	updateEventValidator,
	async (c) => {
		const db = c.get('db')
		const storage = c.env.STORAGE

		const event = c.req.valid('json')
		const result = await eventController(db, storage).updateEvent(event)

		return c.json(result)
	},
)

/**
 * イベント削除
 */
router.delete(
	'/events/:id',
	// @ts-expect-error
	deleteEventValidator,
	async (c) => {
		const db = c.get('db')
		const storage = c.env.STORAGE

		const { id } = c.req.valid('param')
		const result = await eventController(db, storage).removeEvent(id)

		return c.json(result)
	},
)

export default router

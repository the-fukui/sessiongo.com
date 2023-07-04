import { createEventDTOSchema } from '@api/src/appplication/dtos/createEventDto'
import { eventController } from '@api/src/infrastructures/controllers/event'
import { createRandomEventDTO } from '@api/src/mocks/event'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

type Env = {
	DB: D1Database
	STORAGE: R2Bucket
}

const router = new Hono<{ Bindings: Env }>()

router.post(
	'/events',
	// zValidator('json', createEventDTOSchema),
	async (c) => {
		const db = c.get('db')
		const storage = c.env.STORAGE

		// const event = c.req.valid('json')
		const event = createRandomEventDTO()
		const result = await eventController(db, storage).createEvent(event)

		return c.json(result)
	},
)

router.post('/events/image', async (c) => {
	const db = c.get('db')
	const storage = c.env.STORAGE

	const image = c.req.body

	if (!image) throw new HTTPException(400, { message: 'image is required' })

	const result = await eventController(db, storage).uploadImage(image)

	return c.json(result)
})

router.get('/events', async (c) => {
	const db = c.get('db')
	const storage = c.env.STORAGE
	const results = await eventController(db, storage).getEvents()

	c.header('X-Total-Count', results.count.toString())
	return c.json(results.entities)
})

router.get('/events/:id', async (c) => {
	const db = c.get('db')
	const storage = c.env.STORAGE

	const id = c.req.param('id')
	const result = await eventController(db, storage).getEvent(id)

	if (!result) throw new HTTPException(404, { message: 'event not found' })

	return c.json(result)
})

export default router

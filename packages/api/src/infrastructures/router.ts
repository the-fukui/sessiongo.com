import { eventController } from '@api/src/infrastructures/controllers/event'
import { Hono } from 'hono'

type Env = {
	DB: D1Database
}

const router = new Hono<{ Bindings: Env }>()

router.get('/events', async (c) => {
	const db = c.get('db')
	const results = await eventController(db).getEvents()

	return c.json(results)
})

router.get('/events/:id', async (c) => {
	const db = c.get('db')
	const id = c.req.param('id')
	const result = await eventController(db).getEvent(id)

	return c.json(result)
})

export default router

import type { CreateEventDTO } from '@api/src/appplication/dtos/createEventDto'
import { eventController } from '@api/src/infrastructures/controllers/event'
import { createRandomEventDTO } from '@api/src/mocks/event'
import { Hono } from 'hono'

type Env = {
	DB: D1Database
}

const router = new Hono<{ Bindings: Env }>()

router.post('/events', async (c) => {
	const db = c.get('db')
	// const event = await c.req.json<CreateEventDTO>()
	const event = createRandomEventDTO()
	const result = await eventController(db).createEvent(event)

	return c.json(result)
})

router.get('/events', async (c) => {
	const db = c.get('db')
	const results = await eventController(db).getEvents()

	c.header('X-Total-Count', results.count.toString())
	return c.json(results.entities)
})

router.get('/events/:id', async (c) => {
	const db = c.get('db')
	const id = c.req.param('id')
	const result = await eventController(db).getEvent(id)

	return c.json(result)
})

export default router

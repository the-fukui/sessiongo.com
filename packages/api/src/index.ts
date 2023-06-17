import { injectDBClient } from '@api/src/middlewares/db'
// import { events } from '@api/src/schema'
import { Hono } from 'hono'

type Env = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', injectDBClient())
app.get('/', async (c) => {
	// const db = c.get('db')
	// const result = await db
	// 	.insert(events)
	// 	.values({
	// 		id: 'test3',
	// 		title: 'Hello World',
	// 		description: 'This is a test event',
	// 		host: 'test',
	// 		status: 'PUBLIC',
	// 		type: 'SESSION',
	// 		startAt: new Date().toISOString(),
	// 		duration: 60 * 60,
	// 	})

	return c.text('Hello World!!!')
})

export default app

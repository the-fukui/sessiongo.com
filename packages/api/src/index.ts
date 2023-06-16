import { injectDBClient } from '@api/src/middlewares/db'
import { events } from '@api/src/schema'
import { Hono } from 'hono'

type Env = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', injectDBClient())
app.get('/', async (c) => {
	// const db = c.get('db')
	return c.text('Hello World!!!')
})

export default app

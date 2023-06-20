import router from '@api/src/infrastructures/router'
import { injectDBClient } from '@api/src/middlewares/db'
import { Hono } from 'hono'

const app = new Hono()

app.use('*', injectDBClient())
app.route('/', router)

export default app

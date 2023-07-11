import { injectDBClient } from '@api/src/infrastructures/middlewares/db'
import router from '@api/src/infrastructures/router'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: WorkersEnv }>()

app.use('*', injectDBClient())
app.route('/', router)

export default app

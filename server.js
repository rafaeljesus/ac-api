import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import usersAPI from './resources/users'

const app = new Koa()

app.use(logger())
app.use(cors())
app.use(bodyParser())
app.use(usersAPI.routes())

export default app

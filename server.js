import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import usersAPI from './resources/users/routes'
import sitesAPI from './resources/sites/routes'
import authAPI from './resources/auth/routes'

const app = new Koa()

app.use(logger())
app.use(cors())
app.use(bodyParser())
app.use(usersAPI.routes())
app.use(sitesAPI.routes())
app.use(authAPI.routes())

export default app

import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import http from 'http'

const app = new Koa()
const port = process.env.PORT || 3000

app.use(logger())
app.use(cors())
app.use(bodyParser())

http.globalAgent.maxSockets = Infinity
http.createServer(app.callback())

app.listen(port)

console.log(`Ready on ${port}!`)

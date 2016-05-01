import Router from 'koa-router'
import jwt from 'jwt-simple'

import User from '../users/collection'
import cfg from '../../config'

const router = Router()

export default router

router.post('/v1/token', async (ctx) => {
  const body = ctx.request.body
  const valid = body.email && body.password

  if (!valid) return ctx.throw(401)

  try {
    const user = await User.findByEmail(body.email)
    if (!user) return ctx.throw(401)

    ctx.body = {
      token: jwt.encode({ id: user.id }, cfg.jwt.secret)
    }
  } catch (err) {
    ctx.throw(401)
  }
})

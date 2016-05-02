import jwt from 'jwt-simple'

import User from '../resources/users/collection'
import cfg from '../config'

export const signToken = (id) =>
  jwt.encode({ id }, cfg.jwt.secret)

export const authenticate = async (ctx, next) => {
  try {
    const token = ctx.request.body && ctx.request.body.access_token ||
      ctx.request.query && ctx.request.query.access_token ||
      ctx.request.get('x-access-token')

    const payload = jwt.decode(token, cfg.jwt.secret)
    ctx.user = await User.findByIdAsync(payload.id)
    if (!ctx.user) return ctx.throw(401)
    await next()
  } catch (err) {
    ctx.throw(401)
  }
}

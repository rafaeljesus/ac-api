import Router from 'koa-router'

import User from './collection'
import { reply as wrap } from '../../lib/wrap'

const router = Router()

export default router

router.post('/v1/users', wrap(async ({ request: { body } }) => {
  return await User.createAsync(body)
})

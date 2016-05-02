import Router from 'koa-router'

import Site from './collection'
import { authenticate } from '../../lib/auth'
import { reply as wrap } from '../../lib/wrap'

const router = Router()

export default router

router.all('/v1/sites', authenticate)

.post('/v1/sites', wrap(async ({ request: { body } }) =>
  await Site.createAsync(body)
))

.get('/v1/sites', wrap(async ({ user: { id } }) =>
  await Site.findAsync({ userId: id })
))

.del('/v1/sites/:id', wrap(async ({ params: { id } }) =>
  await Site.removeAsync({ _id: id })
))

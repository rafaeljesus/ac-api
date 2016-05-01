import Router from 'koa-router'

import Site from './collection'
import { reply as wrap } from '../../lib/wrap'

const router = Router()

export default router

router.post('/v1/sites', wrap(async ({ request: { body } }) =>
  await Site.createAsync(body)
))

.get('/v1/sites/:userId', wrap(async ({ params: { userId } }) =>
  await Site.findAsync({ userId })
))

.delete('/v1/sites/:id', wrap(async ({ params: { id } }) =>
  await Site.removeAsync({ _id: id })
))

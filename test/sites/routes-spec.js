import test from 'ava'
import supertest from 'supertest-as-promised'
import mongoose from 'mongoose'

import Site from '../../resources/sites/collection'
import app from '../../server'

const request = supertest(app.listen())
const ip = '187.106.174.27'

test('should create favorite site', async (t) => {
  const userId = generateId()
  const { body } = await request
  .post('/v1/sites')
  .send({ ip, userId })
  .expect(201)

  t.truthy(body._id)

  await Site.removeAsync({ userId })
})

test('should find user favorite sites', async (t) => {
  const userId = generateId()
  await Site.createAsync({ ip, userId })

  const { body } = await request
  .get(`/v1/sites/${userId}`)
  .expect(200)

  t.truthy(body.length === 1)
  t.truthy(body[0]._id)

  await Site.removeAsync({ userId })
})

test('should delete user favorite site', async (t) => {
  const userId = generateId()
  const site = await Site.createAsync({ ip, userId })

  await request
  .delete(`/v1/sites/${site._id}`)
  .expect(200)

  await Site.removeAsync({ userId })
})

function generateId () {
  return new mongoose.Types.ObjectId()
}

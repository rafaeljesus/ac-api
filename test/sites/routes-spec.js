import test from 'ava'
import supertest from 'supertest-as-promised'
import mongoose from 'mongoose'
import jwt from 'jwt-simple'

import Site from '../../resources/sites/collection'
import User from '../../resources/users/collection'
import app from '../../server'
import cfg from '../../config'

const request = supertest(app.listen())
const ip = '187.106.174.27'
let token
let userId

test.before(async () => {
  const user = await User.createAsync({
    name: 'Rafael Jesus',
    email: 'foo-bar@gmail.com',
    password: '12345678'
  })

  userId = user._id
  token = jwt.encode({ id: user._id }, cfg.jwt.secret)
})

test.after(async () =>
  await User.removeAsync()
)

test('should create favorite site', async (t) => {
  const { body } = await request
  .post('/v1/sites')
  .set('x-access-token', token)
  .send({ ip, userId })
  .expect(201)

  t.truthy(body._id)

  await Site.removeAsync({ userId })
})

test('should find user favorite sites', async (t) => {
  const site = await Site.createAsync({ ip, userId })

  const { body } = await request
  .get('/v1/sites')
  .set('x-access-token', token)
  .expect(200)

  t.truthy(body[0]._id)

  await Site.removeAsync({ _id: site._id })
})

test('should delete user favorite site', async (t) => {
  const site = await Site.createAsync({ ip, userId })
  await request
  .delete(`/v1/sites/${site._id}`)
  .set('x-access-token', token)
  .expect(200)

  await Site.removeAsync({ _id: site._id })
})

import test from 'ava'
import supertest from 'supertest-as-promised'

import User from '../../resources/users/collection'
import app from '../../server'

const request = supertest(app.listen())
const password = '12345678'
let email = 'foobar@gmail.com'

test.afterEach(async () => {
  await User.removeAsync({ email })
})

test('should generate api token', async (t) => {
  let email = 'foo@gmail.com'
  await User.createAsync({
    name: 'Rafael Jesus',
    email,
    password
  })

  const { body } = await request
  .post('/v1/token')
  .send({ email, password })
  .expect(200)

  t.truthy(body.token)

  await User.removeAsync({ email })
})

test('should not generate api token without password', async (t) => {
  await request
  .post('/v1/token')
  .send({ email })
  .expect(401)
})

test('should not generate api token without email', async (t) => {
  await request
  .post('/v1/token')
  .send({ password })
  .expect(401)
})

test('should not generate api token without user created', async (t) => {
  await request
  .post('/v1/token')
  .send({ email, password })
  .expect(401)
})

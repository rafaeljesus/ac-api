import test from 'ava'
import supertest from 'supertest-as-promised'

import User from '../../resources/users/collection'
import app from '../../server'

const request = supertest(app.listen())
const name = 'Rafael Jesus'
const email = 'rafaelljesus86@gmail.com'
const password = '12345678'

test.afterEach(async () =>
  await User.removeAsync({ email })
)

test('should create user', async (t) => {
  const { body } = await request
  .post('/v1/users')
  .send({ name, email, password })
  .expect(201)

  t.truthy(body._id)
})

test('should not create user with empty name', async (t) => {
  const { error } = await request
  .post('/v1/users')
  .send({ email, password })
  .expect(422)

  t.truthy(error.text, 'users validation failed')
})

test('should not create user with empty password', async (t) => {
  const { error } = await request
  .post('/v1/users')
  .send({ name, email })
  .expect(422)

  t.truthy(error.text, 'users validation failed')
})

test('should not create user with empty email', async (t) => {
  const { error } = await request
  .post('/v1/users')
  .send({ name, password })
  .expect(422)

  t.truthy(error.text, 'users validation failed')
})

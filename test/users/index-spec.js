import test from 'ava'
import 'babel-register'
import supertest from 'supertest-as-promised'

import User from '../../resources/users/collection'
import app from '../../server'

const request = supertest(app.listen())

test.afterEach(async () => {
  await User.removeAsync()
})

test('POST /v1/users', async (t) => {
  const { body } = await request
  .post('/v1/users')
  .send({
    name: 'Rafael Jesus',
    email: 'rafaelljesus86@gmail.com',
    password: '12345678'
  })
  .expect(201)

  t.truthy(body._id)
})

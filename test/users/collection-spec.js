import test from 'ava'

import User from '../../resources/users/collection'

const password = '12345678'
const email = 'foobar@hotmail.com'

test.afterEach(async () =>
  await User.removeAsync({ email })
)

test('should check password changed', (t) => {
  const user = new User({ password })
  t.truthy(user.passwordChanged())
})

test('should find user by email', async (t) => {
  await User.createAsync({
    name: 'Rafael Jesus',
    email,
    password
  })

  const user = await User.findByEmail(email)
  t.truthy(user._id)
})

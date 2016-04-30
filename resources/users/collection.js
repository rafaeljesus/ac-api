import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Promise } from 'bluebird'

Promise.promisifyAll(bcrypt)
Promise.promisifyAll(mongoose)

const Schema = mongoose.Schema

const User = Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    index: { unique: true }
  },
  password: {type: String, require: true},
  createdAt: Date,
  updatedAt: Date
})

User.methods = {
  passwordChanged () {
    return this.password &&
      this.password.length > 0 &&
      this.isModified('password')
  }
}

User.pre('save', async function (next) {
  this.updatedAt = new Date()

  if (this.isNew) this.createdAt = new Date()

  if (!this.passwordChanged()) return next()

  try {
    this.password = await bcrypt.hashAsync(this.password, 8)
    next()
  } catch (e) {
    return next(e)
  }
})

export default mongoose.model('users', User)

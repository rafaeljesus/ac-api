import mongoose from 'mongoose'
import { Promise } from 'bluebird'

Promise.promisifyAll(mongoose)

const Schema = mongoose.Schema

const Site = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ip: { type: String, required: true },
  lat: Number,
  lon: Number,
  as: String,
  city: String,
  country: String,
  countryCode: String,
  isp: String,
  org: String,
  region: String,
  regionName: String,
  status: String,
  timezone: String,
  zip: String,
  updatedAt: Date,
  createdAt: Date
})

Site.pre('save', function (next) {
  this.updatedAt = new Date()
  if (this.isNew) this.createdAt = new Date()
  next()
})

export default mongoose.model('sites', Site)

import mongoose from 'mongoose'

const host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost'
const port = process.env.MONGO_PORT_27017_TCP_PORT || 27017

const config = {
  test: `mongodb://${host}:${port}/ac_test`,
  development: `mongodb://${host}:${port}/ac`,
  production: process.env.MONGODB_URL
}

const dbUri = config[process.env.NODE_ENV]

export default mongoose

mongoose.connect(dbUri)

mongoose.connection.on('error', (err) => {
  console.error(`ac-api: mongodb connection error: ${err}`)
})

process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0)))

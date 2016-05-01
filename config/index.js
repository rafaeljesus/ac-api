const host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost'
const port = process.env.MONGO_PORT_27017_TCP_PORT || 27017

export default {
  jwt: {
    secret: new Buffer('AC-API', 'base64'),
    session: { session: false }
  },
  db: {
    test: `mongodb://${host}:${port}/ac_test`,
    development: `mongodb://${host}:${port}/ac`,
    production: process.env.MONGODB_URL
  }
}

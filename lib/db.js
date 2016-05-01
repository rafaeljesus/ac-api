import mongoose from 'mongoose'

import cfg from '../config'

const dbUri = cfg.db[process.env.NODE_ENV]

export default mongoose

mongoose.connect(dbUri)

mongoose.connection.on('error', (err) => {
  console.error(`ac-api: mongodb connection error: ${err}`)
})

process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0)))

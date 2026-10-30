import express from 'express'
import apiRoutes from './routes/index.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

// Builds the Express app without starting a server, so tests can use it directly.
export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json({ limit: '1mb' }))

  app.use('/api', apiRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}

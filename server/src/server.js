import { createApp } from './app.js'
import { env } from './config/env.js'

const app = createApp()

app.listen(env.port, (error) => {
  if (error) {
    console.error(`Failed to start SmartStock API: ${error.message}`)
    process.exit(1)
  }
  console.log(`SmartStock API running on http://localhost:${env.port} (${env.nodeEnv})`)
})

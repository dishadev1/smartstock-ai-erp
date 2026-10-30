// Central place for configuration. Other files import `env` from here
// instead of reading process.env directly.

// Load server/.env if it exists (built into Node, no dotenv package needed).
try {
  process.loadEnvFile()
} catch (error) {
  // A missing .env is fine - we fall back to real environment variables.
  if (error.code !== 'ENOENT') throw error
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
}

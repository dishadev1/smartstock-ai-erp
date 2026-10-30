import { env } from '../../config/env.js'

// Services hold the business logic. A database connectivity check will be
// added here once PostgreSQL is connected.
export function getHealthStatus() {
  return {
    status: 'ok',
    service: 'smartstock-api',
    environment: env.nodeEnv,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  }
}

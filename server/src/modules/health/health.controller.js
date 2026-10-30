import { getHealthStatus } from './health.service.js'

// Controllers translate HTTP requests into service calls and send the response.
export function getHealth(req, res) {
  res.json(getHealthStatus())
}

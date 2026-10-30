import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

const app = createApp()

describe('GET /api/health', () => {
  it('reports that the API is up', async () => {
    const response = await request(app).get('/api/health')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toMatchObject({ status: 'ok', service: 'smartstock-api' })
    expect(typeof response.body.uptimeSeconds).toBe('number')
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false)
  })

  it('does not advertise the server framework', async () => {
    const response = await request(app).get('/api/health')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})

describe('error handling', () => {
  it('returns a JSON 404 for unknown routes', async () => {
    const response = await request(app).get('/api/does-not-exist')

    expect(response.status).toBe(404)
    expect(response.body.error.message).toBe('Route not found: GET /api/does-not-exist')
  })

  it('returns a JSON 400 for malformed JSON bodies', async () => {
    const response = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{"broken":')

    expect(response.status).toBe(400)
    expect(response.body.error.message).toBeTypeOf('string')
  })
})

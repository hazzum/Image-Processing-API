import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('Test view endpoint #1', async () => {
    const response = await request.get('/api/view?filename=fjord')
    expect(response.status).toBe(200)
  })
  it('Test view endpoint#2', async () => {
    const response = await request.get('/api/view?filename=fjord&width=300&height=500')
    expect(response.status).toBe(200)
  })
  it('Test view endpoint#2', async () => {
    const response = await request.get('/api/view?filename=fjord&width=300&height=500')
    expect(response.status).toBe(200)
  })
})

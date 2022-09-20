import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=fjord')
    expect(response.status).toBe(200)
  })
})

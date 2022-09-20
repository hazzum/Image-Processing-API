import supertest from 'supertest'
import checkIfExists from '../routes/api/view/utilities/checkIfExists'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test if image exists', () => {
  it('Check if checkIfExists function is defined', () => {
    expect(checkIfExists).toBeDefined()
  })
  it('Check if checkIfExists function returns false upon sending a non-existent image', async () => {
    const response = await checkIfExists('./src/assets/images', 'image.jpg')
    expect(response).toBe(false)
  })
  it('Check if checkIfExists function returns true upon sending a pre-existing image', async () => {
    const response = await checkIfExists('./src/assets/images', 'fjord.jpg')
    expect(response).toBe(true)
  })
})

describe('Test endpoint response', () => {
  it('#1 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=fjord')
    expect(response.status).toBe(200)
  })
  it('#2 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=encenadaport&width=300&height=500')
    expect(response.status).toBe(200)
  })
  it('#3 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=fjord&width=200&height=200')
    expect(response.status).toBe(200)
  })

  it('#4 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=encenadaport&width=300&height=500')
    expect(response.status).toBe(200)
  })

  it('#5 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=encenadaport&width=700&height=800')
    expect(response.status).toBe(200)
  })

  it('#6 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=encenadaport&width=70d0&height=800')
    expect(response.status).toBe(400)
  })

  it('#7 Test view endpoint#2', async () => {
    const response = await request.get('/api/view?filename=johncena&width=300&height=400')
    expect(response.status).toBe(404)
  })
})


describe('Test error handling', () => {
  it('sending bad parameters', async () => {
    const response = await request.get('/api/view?filename=encenadaport&width=70d0&height=800')
    expect(response.status).toBe(400)
  })

  it('requesting a non-existing image', async () => {
    const response = await request.get('/api/view?filename=johncena&width=300&height=400')
    expect(response.status).toBe(404)
  })

  it('not sending a file name', async () => {
    const response = await request.get('/api/view?width=300&height=400')
    expect(response.status).toBe(404)
  })
})

describe('Test image processing', () => {
  it('sending bad parameters', async () => {
    const response = await request.get('/api/view?filename=encenadaport&width=70d0&height=800')
    expect(response.status).toBe(400)
  })

  it('requesting a non-existing image', async () => {
    const response = await request.get('/api/view?filename=johncena&width=300&height=400')
    expect(response.status).toBe(404)
  })

  it('not sending file name', async () => {
    const response = await request.get('/api/view?width=300&height=400')
    expect(response.status).toBe(404)
  })
})
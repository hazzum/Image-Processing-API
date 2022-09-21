import supertest from 'supertest'
import checkIfExists from '../routes/api/commonUtils/checkIfExists'
import resize from '../routes/api/view/utilities/resize'
import greyscale from '../routes/api/greyscale/utilities/greyscale'
import app from '../index'
import path from 'path'

// create a request object
const request = supertest(app)

describe('Test if image exists', () => {
  it('Check if checkIfExists function is defined', () => {
    expect(checkIfExists).toBeDefined()
  })
  it('Check if checkIfExists function returns false upon sending a non-existent image', async () => {
    const response = await checkIfExists(path.join('./public/assets/images/'), 'image.jpg')
    expect(response).toBe(false)
  })
  it('Check if checkIfExists function returns true upon sending a pre-existing image', async () => {
    const response = await checkIfExists(path.join('./public/assets/images/'), 'fjord.jpg')
    expect(response).toBe(true)
  })
})

describe('Test image processing function resize()', () => {
  it('Check if resize() function is defined', () => {
    expect(resize).toBeDefined()
  })
  it('Check if resize function returns a resized image upon sending a pre-existent image', async () => {
    const response = await resize('fjord.jpg', 300, 300, path.join('./public/assets/images/'))
    expect(response).toBeInstanceOf(Buffer)
  })
  it('Check if resize function throws an error upon sending a non-existent image', async () => {
    await resize('johncena.jpg', 300, 300, path.join('./public/assets/images/')).catch((error) => {
      expect(error.code).toBe('ENOENT')
    })
  })
})

describe('Test image processing function greyscale()', () => {
  it('Check if greyscale() function is defined', () => {
    expect(greyscale).toBeDefined()
  })
  it('Check if resize function returns a resized image upon sending a pre-existent image', async () => {
    const response = await greyscale('fjord.jpg', 300, 300, path.join('./public/assets/images/'))
    expect(response).toBeInstanceOf(Buffer)
  })
  it('Check if resize function throws an error upon sending a non-existent image', async () => {
    await greyscale('johncena.jpg', 300, 300, path.join('./public/assets/images/')).catch(
      (error) => {
        expect(error.code).toBe('ENOENT')
      }
    )
  })
})

describe('Test /api/view endpoint response', () => {
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

  it('#7 Test view endpoint', async () => {
    const response = await request.get('/api/view?filename=johncena&width=300&height=400')
    expect(response.status).toBe(404)
  })
})

describe('Test /api/greyscale endpoint response', () => {
  it('#1 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=fjord')
    expect(response.status).toBe(200)
  })
  it('#2 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=encenadaport&width=300&height=500')
    expect(response.status).toBe(200)
  })
  it('#3 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=fjord&width=200&height=200')
    expect(response.status).toBe(200)
  })

  it('#4 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=encenadaport&width=300&height=500')
    expect(response.status).toBe(200)
  })

  it('#5 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=encenadaport&width=700&height=800')
    expect(response.status).toBe(200)
  })

  it('#6 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=encenadaport&width=70d0&height=800')
    expect(response.status).toBe(400)
  })

  it('#7 Test greyscale endpoint', async () => {
    const response = await request.get('/api/greyscale?filename=johncena&width=300&height=400')
    expect(response.status).toBe(404)
  })
})

describe('Test error handling', () => {
  describe('Test error handling for view endpoint', () => {
    it('sending bad parameters returns 400 error', async () => {
      const response = await request.get('/api/view?filename=encenadaport&width=70d0&height=800')
      expect(response.status).toBe(400)
    })

    it('requesting a non-existing image returns a 404 error', async () => {
      const response = await request.get('/api/view?filename=johncena&width=300&height=400')
      expect(response.status).toBe(404)
    })

    it('not sending a file name returns 400 error', async () => {
      const response = await request.get('/api/view?width=300&height=400')
      expect(response.status).toBe(400)
    })
  })

  describe('Test error handling for greyscale endpoint', () => {
    it('sending bad parameters returns 400 error', async () => {
      const response = await request.get(
        '/api/greyscale?filename=encenadaport&width=70d0&height=800'
      )
      expect(response.status).toBe(400)
    })

    it('requesting a non-existing image returns a 404 error', async () => {
      const response = await request.get('/api/greyscale?filename=johncena&width=300&height=400')
      expect(response.status).toBe(404)
    })

    it('not sending a file name returns 400 error', async () => {
      const response = await request.get('/api/greyscale?width=300&height=400')
      expect(response.status).toBe(400)
    })
  })
})

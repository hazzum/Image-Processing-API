import express from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import path from 'path'
const PORT = 5000

// create an instance server
const app: express.Application = express()

// HTTP request logger middleware
app.use('/api', morgan('short'), routes)
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app

//http://localhost:5000/api/view?filename=fjord&width=300&height=500
//http://localhost:5000/api/view?filename=encenadaport&width=800&height=500
//http://localhost:5000/api/view?filename=palmtunnel&width=200&height=500
//http://localhost:5000/api/view?filename=santamonica
//http://localhost:5000/api/view?filename=santamonica&width=300&height=300
//http://localhost:5000/api/view?filename=encenadaport&width=500&height=500

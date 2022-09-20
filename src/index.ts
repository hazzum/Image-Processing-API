/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import express, { application, Application, Request, Response } from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
//http://localhost:5000/api/view?filename=fjord&width=300&height=500
//http://localhost:5000/api/view?filename=encenadaport&width=800&height=500
//http://localhost:5000/api/view?filename=palmtunnel&width=200&height=500
//http://localhost:5000/api/view?filename=santamonica
//http://localhost:5000/api/view?filename=santamonica&width=300&height=300
//http://localhost:5000/api/view?filename=encenadaport&width=500&height=500
app.use('/api', morgan('short'), routes)
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// add routing for / path
// app.get('/', (_req: Request, res: Response) => {
//   res.json({
//     message: 'Hello World 🌍'
//   })
// })

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app

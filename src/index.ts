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
app.listen(PORT)

export default app

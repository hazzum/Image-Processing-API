import express from 'express'
import view from './api/view'
const routes = express.Router()
routes.use('/view', view)
routes.get('/', (req, res) => {
  res.send('visiting the main api route')
})
export default routes

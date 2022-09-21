import express from 'express'
import view from './api/view/view'
import greyscale from './api/greyscale/greyscale'

const routes = express.Router()
routes.use('/view', view)
routes.use('/greyscale', greyscale)
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('visiting the main api route')
})
export default routes

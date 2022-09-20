import express from 'express'
import resize from './utilities/resize'
import makeDir from './utilities/makeDir'
import writethumbImage from './utilities/writeThumbImage'
import checkIfExists from './utilities/checkIfExists'
import path from 'path'
import Joi from 'joi'
import { promises as fs } from 'fs'

const dimensionSchema = Joi.object({
  width: Joi.string().regex(/^[0-9]+$/),
  height: Joi.string().regex(/^[0-9]+$/)
})
const thumbnailDir = './src/assets/images/thumbnails'
const imageDir = './src/assets/images'
const options = {
  root: path.join(thumbnailDir)
}

const view = express.Router()

view.get('/', async (req: express.Request, res: express.Response) => {
  //validate inputs
  if (!req.query.filename) {
    res.status(400).send('Error 400: no filename was sent')
    return
  }
  const width = req.query.width ? (req.query.width as unknown as string) : '200'
  const height = req.query.height ? (req.query.height as unknown as string) : '200'
  const { error } = dimensionSchema.validate({ width: width, height: height })
  if (error) {
    res.status(400).send('Error 400: ' + error.message)
    return
  }
  //define parameters
  const imageName = req.query.filename + '.jpg'
  const thumbnailName =
    ((((req.query.filename + '_' + width) as string) + '_' + height) as string) + '.jpg'
  //check if file exists
  const exists = await checkIfExists(imageDir, imageName)
  if (!exists) {
    res.status(404).send('Error 404: image does not exist on the server')
    return
  }
  //make thumbnail directory if it doesn't already exist
  await makeDir(thumbnailDir)
  //load list of existing file names in the directory and check if the required file already exists
  const thumbnailNames = await fs.readdir(path.join(thumbnailDir))
  if (thumbnailNames.includes(thumbnailName)) {
    res.sendFile(thumbnailName, options)
    return
  } else {
    //resize image and save it to a buffer
    const output = await resize(imageName, parseInt(height), parseInt(width), imageDir)
    //save the thumbnail
    await writethumbImage(thumbnailDir, thumbnailName, output)
    res.sendFile(thumbnailName, options)
    return
  }
})

export default view

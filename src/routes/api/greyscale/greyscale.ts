import express from 'express'
import resize from './utilities/greyscale'
import makeDir from '../commonUtils/makeDir'
import saveEditedImage from '../commonUtils/saveEditedImage'
import checkIfExists from '../commonUtils/checkIfExists'
import path from 'path'
import Joi from 'joi'
import { promises as fs } from 'fs'

const dimensionSchema: Joi.ObjectSchema = Joi.object({
  width: Joi.string().regex(/^[0-9]+$/),
  height: Joi.string().regex(/^[0-9]+$/)
})
const outputDirectory: string = path.join('./public/assets/images/greyscale/')
const imageDir: string = path.join('./public/assets/images/')
const options = {
  root: outputDirectory
}

const greyscale = express.Router()

greyscale.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
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
  const imageName: string = req.query.filename + '.jpg'
  const outputFileName: string = req.query.filename + '_' + width + '_' + height + '.jpg'
  //check if file exists
  const exists = await checkIfExists(imageDir, imageName)
  if (!exists) {
    res.status(404).send('Error 404: image does not exist on the server')
    return
  }
  //make output directory for edited images if it doesn't already exist
  await makeDir(outputDirectory).catch(() => {
    res.status(500).send('Error 500: internal server error')
    return
  })
  //load list of existing file names in the directory and check if the required file already exists
  const outputNames = await fs.readdir(outputDirectory)
  if (outputNames.includes(outputFileName)) {
    res.sendFile(outputFileName, options)
    return
  } else {
    //resize image and save it to a buffer
    const output = await resize(imageName, parseInt(height), parseInt(width), imageDir).catch(
      () => {
        res.status(500).send('Error 500: could not process image')
        return Buffer.alloc(0)
      }
    )
    //save the greyscale image
    await saveEditedImage(outputDirectory, outputFileName, output).catch(() => {
      res.status(500).send('Error 500: could not save the greyscale image')
      return
    })
    res.sendFile(outputFileName, options)
    return
  }
})

export default greyscale

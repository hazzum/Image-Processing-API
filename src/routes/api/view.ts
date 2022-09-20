import express from 'express'
import resize from '../../utilities/resize'
import makeDir from '../../utilities/makeDir'
import path from 'path'
import { promises as fs } from 'fs'
const view = express.Router()

view.get('/', (req, res) => {
  const FName = req.query.filename + '.jpg'
  const width = req.query.width ? req.query.width as unknown as number : 200
  const height = req.query.height ? req.query.height as unknown as number : 200
  const TName = req.query.filename + '_' + width as string + '_' + height as string + '.jpg'
  const TDir = './src/assets/images/thumbnails'
  const options = {
    root: path.join(TDir)
  }
  makeDir(TDir, TName).then(() => {
    fs.readdir(path.join(TDir)).then((filenames) => {
      if (filenames.includes(TName)) {
        res.sendFile(TName, options)
      }
      else {
        resize(TName, FName, parseInt(height as unknown as string), parseInt(width as unknown as string), TDir).then(() =>
          res.sendFile(TName, options)
        )
      }
    })
  })
})

export default view

import {promises as fs} from 'fs'
import path from 'path'
import sharp from 'sharp'

const resize = async (ThumbnailName:string, FileName:string, height: number, width: number, TDir: string) => {
    const file: Buffer = await fs.readFile(path.join('./src/assets/images/', FileName))
    const image: Buffer = await sharp(file).resize(width, height).toBuffer()
    const thumbImage = async () => {
      await fs.writeFile(path.join(TDir+'/', ThumbnailName), image)
    }
    thumbImage()
  }

  export default resize
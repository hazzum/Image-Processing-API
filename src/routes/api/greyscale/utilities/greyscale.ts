import { promises as fs } from 'fs'
import sharp from 'sharp'

const resize = async (
  FileName: string,
  height: number,
  width: number,
  imageDir: string
): Promise<Buffer> => {
  const file: Buffer = await fs.readFile(imageDir + FileName)
  const image: Buffer = await sharp(file).resize(width, height).greyscale().toBuffer()
  return image
}

export default resize

import { promises as fs } from 'fs'
import path from 'path'

const writeThumbImage = async (
  TDir: string,
  ThumbnailName: string,
  image: Buffer
): Promise<void> => {
  await fs.writeFile(path.join(TDir + '/', ThumbnailName), image)
}

export default writeThumbImage

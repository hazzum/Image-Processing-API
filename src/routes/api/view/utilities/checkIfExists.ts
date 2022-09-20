import { promises as fs } from 'fs'
import path from 'path'

const checkIfExists = async (imageDir: string, imageName: string): Promise<boolean> => {
  const fileNames = await fs.readdir(path.join(imageDir))
  if (!fileNames.includes(imageName)) {
    return false
  } else {
    return true
  }
}

export default checkIfExists

import { promises as fs } from 'fs'

const checkIfExists = async (imageDir: string, imageName: string): Promise<boolean> => {
  const fileNames = await fs.readdir(imageDir)
  if (!fileNames.includes(imageName)) {
    return false
  } else {
    return true
  }
}

export default checkIfExists

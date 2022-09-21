import { promises as fs } from 'fs'

const saveEditedImage = async (
  OutputDirectory: string,
  ThumbnailName: string,
  image: Buffer
): Promise<void> => {
  await fs.writeFile(OutputDirectory + ThumbnailName, image)
}

export default saveEditedImage

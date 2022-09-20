import path from 'path'
import filesystem, { promises as fs } from 'fs'

const makeDir = async (TDir: string): Promise<void> => {
  if (!filesystem.existsSync(path.join(TDir))) {
    await fs.mkdir(path.join(TDir))
  }
}

export default makeDir

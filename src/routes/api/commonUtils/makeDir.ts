import filesystem, { promises as fs } from 'fs'

const makeDir = async (TDir: string): Promise<void> => {
  if (!filesystem.existsSync(TDir)) {
    await fs.mkdir(TDir)
  }
}

export default makeDir

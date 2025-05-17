import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

/*
  rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md (if there's no file
  wrongFilename.txt or properFilename.md already exists Error with message FS operation failed must be thrown)
*/
const rename = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const sourceFilePath = path.join(__dirname, 'files', 'wrongFilename.txt')
  const destFilePath = path.join(__dirname, 'files', 'properFilename.md')

  const errorMessage = 'FS operation failed'

  try {
    await fs.access(sourceFilePath)
  } catch (err) {
    throw new Error(errorMessage)
  }

  try {
    await fs.access(destFilePath)
    throw new Error(errorMessage)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error(errorMessage)
    }
  }

  await fs.rename(sourceFilePath, destFilePath)
}

await rename()

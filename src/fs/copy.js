import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

/* 
  copy.js - implement function that copies folder files files with all its content into folder files_copy at the same level (if files folder
  doesn't exist or files_copy has already been created Error with message FS operation failed must be thrown)
*/
const copy = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const sourceDir = path.join(__dirname, 'files')
  const destDir = path.join(__dirname, 'files_copy')

  const errorMessage = 'FS operation failed'

  try {
    await fs.access(sourceDir)
  } catch (err) {
    throw new Error(errorMessage)
  }

  try {
    await fs.access(destDir)
    throw new Error(errorMessage)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error(errorMessage)
    }
  }

  await fs.mkdir(destDir)

  const files = await fs.readdir(sourceDir)

  for (const file of files) {
    const sourceFilePath = path.join(sourceDir, file)
    const destFilePath = path.join(destDir, file)

    await pipeline(createReadStream(sourceFilePath), createWriteStream(destFilePath))
  }
}

await copy()

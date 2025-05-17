import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

/*
  delete.js - implement function that deletes file fileToRemove.txt (if there's no file fileToRemove.txt Error with message FS
  operation failed must be thrown)
*/
const remove = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const filePath = path.join(__dirname, 'files', 'fileToRemove.txt')

  const errorMessage = 'FS operation failed'

  try {
    await fs.access(filePath)
  } catch (err) {
    throw new Error(errorMessage)
  }

  try {
    await fs.unlink(filePath)
  } catch (err) {
    throw new Error(errorMessage)
  }
}

await remove()

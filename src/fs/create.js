import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

/*
  create.js - implement function that creates new file fresh.txt with content I am fresh and young inside of the files folder (if file
  already exists Error with message FS operation failed must be thrown)
*/
const create = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const filePath = path.join(__dirname, 'files', 'fresh.txt')

  const content = 'I am fresh and young'
  const errorMessage = 'FS operation failed'

  try {
    await fs.access(filePath)
    throw new Error(errorMessage)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error(errorMessage)
    }
  }

  try {
    await fs.writeFile(filePath, content)
  } catch (err) {
    throw new Error(errorMessage)
  }
}

await create()

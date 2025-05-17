import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

/*
  list.js - implement function that prints array of all filenames from files folder into console (if files folder doesn't exists Error with
  message FS operation failed must be thrown)
*/
const list = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const dirPath = path.join(__dirname, 'files')

  const errorMessage = 'FS operation failed'

  try {
    await fs.access(dirPath)
  } catch (err) {
    throw new Error(errorMessage)
  }

  try {
    const files = await fs.readdir(dirPath)
    console.log(files)
  } catch (err) {
    throw new Error(errorMessage)
  }
}

await list()

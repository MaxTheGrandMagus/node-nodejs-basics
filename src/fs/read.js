import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

/*
  read.js - implement function that prints content of the fileToRead.txt into console (if there's no file fileToRead.txt Error with
  message FS operation failed must be thrown)
*/
const read = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt')

  const errorMessage = 'FS operation failed'

  try {
    await fs.access(filePath)
  } catch (err) {
    throw new Error(errorMessage)
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    console.log(content)
  } catch (err) {
    throw new Error(errorMessage)
  }
}

await read()

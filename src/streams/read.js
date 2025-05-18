/*
  read.js - implement function that reads file fileToRead.txt content using Readable Stream and prints it's content into process.stdout
*/

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const read = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fileToRead = path.join(__dirname, 'files/fileToRead.txt')

  const sourceStream = fs.createReadStream(fileToRead, { encoding: 'utf-8' })
  sourceStream.on('data', (chunk) => process.stdout.write(chunk))
  sourceStream.on('end', () => process.stdout.write(os.EOL))
}

await read()

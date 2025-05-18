/*
  write.js - implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream
*/

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const write = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fileToWrite = path.join(__dirname, 'files/fileToWrite.txt')

  const destinationStream = fs.createWriteStream(fileToWrite)
  destinationStream.on('finish', () => process.stdout.write(os.EOL))

  process.stdin.pipe(destinationStream)
}

await write()

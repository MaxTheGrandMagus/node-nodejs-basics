/*
  transform.js - implement function that reads data from process.stdin, reverses text using Transform Stream and then writes it into
  process.stdout
*/

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

const transform = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fileToWrite = path.join(__dirname, 'files/fileToWrite.txt')

  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('')
      callback(null, reversedChunk)
    }
  })

  const destinationStream = fs.createWriteStream(fileToWrite)
  destinationStream.on('finish', () => process.stdout.write(os.EOL))

  await pipeline(process.stdin, reverseTransform, destinationStream)
};

await transform();

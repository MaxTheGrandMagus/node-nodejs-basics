/*
  You should implement several functions in dedicated files
  calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex using
  Streams API
*/

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const fileToCalculateHashFor = `${__dirname}/files/fileToCalculateHashFor.txt`

  const hash = createHash('sha256')
  const inputStream = createReadStream(fileToCalculateHashFor)

  await pipeline(inputStream, hash)

  console.log(hash.digest('hex'))
}

await calculateHash()

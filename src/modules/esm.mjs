/*
  You should refactor file (you can add additional imports if needed)
  cjsToEsm.cjs - rewrite it to it's equivalent in ECMAScript notation (and rename it to esm.mjs)
*/
import path from 'node:path'
import { release, version } from 'node:os'
import { createServer as createServerHttp } from 'node:http'
import fileC from './files/c.cjs'
import fileA from './files/a.json' with { type: 'json' }
import fileB from './files/b.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const random = Math.random()

const unknownObject = random > 0.5 ? fileA : fileB

console.log(`Release ${release()}`)
console.log(`Version ${version()}`)
console.log(`Path segment separator is "${path.sep}"`)

console.log(`Path to current file is ${__filename}`)
console.log(`Path to current directory is ${__dirname}`)

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted')
})

const PORT = 3000

console.log(unknownObject)

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log('To terminate it, use Ctrl+C combination')
})

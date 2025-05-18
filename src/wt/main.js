/*
  main.js - implement function that creates number of worker threads (equal to the number of host machine logical CPU cores) from file
    worker.js and able to send data to those threads and to receive result of the computation from them. You should send incremental
    number starting from 10 to each worker. For example: on host machine with 4 cores you should create 4 workers and send 10 to first
    worker, 11 to second worker, 12 to third worker, 13 to fourth worker. After all workers will finish, function should log array of results into
    console. The results are array of objects with 2 properties:
    - status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
    - data - value from worker in case of success or null in case of error in worker
*/

import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'
import { Worker } from 'worker_threads'

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const workerFile = path.join(__dirname, 'worker.js')

  const numCPUs = os.cpus().length
  const workers = []
  const results = []

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(workerFile)
    workers.push(worker)

    worker.postMessage(10 + i)

    worker.on('message', (result) => {
      results[i] = { status: 'resolved', data: result }
    })

    worker.on('error', (error) => {
      results[i] = { status: 'error', data: null }
    })

    worker.on('exit', () => {
      if (results[i] === undefined) {
        results[i] = { status: 'error', data: null }
      }
    })
  }

  await Promise.all(workers.map((worker) => new Promise((resolve) => worker.on('exit', resolve))))

  console.log(results)
}

await performCalculations()

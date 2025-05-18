/*
  cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file script.js,
  passing these args to it. This function should create IPC-channel between stdin and stdout of master process and child process:
    child process stdin should receive input from master process stdin
    child process stdout should send data to master process stdout
*/

import path from 'path'
import { fileURLToPath } from 'url'
import { fork } from 'child_process'

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const scriptFile = path.join(__dirname, 'files/script.js')

  fork(scriptFile, args)
}

// Put your arguments in function call to test this functionality
spawnChildProcess(['pen', 'pineapple', 'apple', 'pen'])

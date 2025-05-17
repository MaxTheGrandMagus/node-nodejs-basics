/*
  args.js - implement function that parses command line arguments (given in format --propName value --prop2Name value2, you don't
  need to validate it) and prints them to the console in the format propName is value, prop2Name is value2
*/
const parseArgs = () => {
  const args = process.argv.slice(2) // Get command line arguments excluding the first two elements (node and script path)
  const parsedArgs = {}
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '')
    const value = args[i + 1]
    parsedArgs[key] = value
  }

  Object.entries(parsedArgs).forEach(([key, value]) => {
    console.log(`${key} is ${value}`)
  })
}

parseArgs()

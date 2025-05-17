/*
  env.js - implement function that parses environment variables with prefix RSS_ and prints them to the console in the format
  RSS_name1=value1; RSS_name2=value2
*/
const parseEnv = () => {
  const env = process.env
  const prefix = 'RSS_'
  const filteredEnv = Object.entries(env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')

  console.log(filteredEnv)
};

parseEnv();

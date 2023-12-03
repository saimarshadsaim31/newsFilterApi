const fs = require('fs')

const FILE_PATH = 'lastFetchTime.txt'

const getLastFetchTime = () => {
  try {
    const lastFetchTime = fs.readFileSync(FILE_PATH, 'utf-8')
    return lastFetchTime.trim() || null
  } catch (error) {
    return null
  }
}

const setLastFetchTime = (time) => {
  const humanReadableTime = time.toLocaleString()
  fs.writeFileSync(FILE_PATH, humanReadableTime)
}

module.exports = {
  getLastFetchTime,
  setLastFetchTime,
}

// const fs = require('fs')

// const FILE_PATH = 'lastFetchTime.txt'

// const getLastFetchTime = () => {
//   try {
//     const lastFetchTime = fs.readFileSync(FILE_PATH, 'utf-8')
//     return lastFetchTime.trim() || null
//   } catch (error) {
//     return null
//   }
// }

// const setLastFetchTime = (time) => {
//   fs.writeFileSync(FILE_PATH, time.toISOString())
// }
// module.exports = {
//   getLastFetchTime,
//   setLastFetchTime,
// }

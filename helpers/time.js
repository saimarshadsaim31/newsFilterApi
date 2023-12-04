const fs = require('fs')
const { updateLastFetchTime, getLastFetchTimeFromStrapi } = require('./strapi')

const FILE_PATH = 'lastFetchTime.txt'

const getLastFetchTime = async () => {
  try {
    const lastFetchTime = fs.readFileSync(FILE_PATH, 'utf-8')
    const time = await getLastFetchTimeFromStrapi()
    return time.trim() || null
  } catch (error) {
    return null
  }
}

const setLastFetchTime = async (time) => {
  const humanReadableTime = time.toLocaleString()
  fs.writeFileSync(FILE_PATH, humanReadableTime)
  const res = await updateLastFetchTime(humanReadableTime)
  if (res === 200) {
    console.log('Last fetch time updated:', time.toLocaleString())
  } else {
    console.log('error updating last fetched time')
  }
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

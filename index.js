require('dotenv').config()
const cron = require('node-cron')
const { getLastFetchTime, setLastFetchTime } = require('./helpers/time')
const { fetchAndProcessNews } = require('./helpers/news')

const cronSchedule = '* * * * *'

const fetchNewsJob = async () => {
  const currentTime = new Date()
  const lastFetchTime = await getLastFetchTime()
  const lastFetchTimeReadable = lastFetchTime
    ? new Date(lastFetchTime).toLocaleString()
    : 'N/A'

  console.log(`Last fetch time: ${lastFetchTimeReadable}`)
  if (!lastFetchTime) {
    console.log(
      'No last fetch time found. You are probably running this for the first time.'
    )
  }

  const queryString =
    '(source.id:prNewswire) AND publishedAt:[2020-02-01 TO 2020-05-20]'
  await fetchAndProcessNews(queryString, 0)

  console.log('Updating last fetch time...')
  setLastFetchTime(currentTime)
}

// Run the function once at the beginning
fetchNewsJob()

// Schedule the function to run every 15 minutes
cron.schedule(cronSchedule, fetchNewsJob)

// require('dotenv').config()
// const cron = require('node-cron')
// const { getLastFetchTime, setLastFetchTime } = require('./helpers/time')
// const { fetchAndProcessNews } = require('./helpers/news')

// cron.schedule('* * * * *', async () => {
//   const currentTime = new Date()
//   const lastFetchTime = getLastFetchTime()
//   const lastFetchTimeReadable = lastFetchTime
//     ? new Date(lastFetchTime).toLocaleString()
//     : 'N/A'

//   console.log(`Last fetch time: ${lastFetchTimeReadable}`)

//   if (!lastFetchTime) {
//     console.log(
//       'No last fetch time found. You are probable running this for the first time.'
//     )
//   }

//   // const queryString = `(source.id:prNewswire) AND publishedAt:[${
//   //   lastFetchTime || 0
//   // } TO ${currentTime.toISOString()}]`
//   const queryString =
//     '(source.id:prNewswire) AND publishedAt:[2020-02-01 TO 2020-05-20]'
//   await fetchAndProcessNews(queryString, 0)

//   console.log('Updating last fetch time...')
//   setLastFetchTime(currentTime)
//   console.log('Last fetch time updated:', currentTime.toLocaleString())
// })

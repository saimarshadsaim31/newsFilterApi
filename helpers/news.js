const { SearchApi } = require('financial-news-api')
const { scraper } = require('./scrapper')
const { createPost } = require('./strapi')

const searchApi = SearchApi(process.env.NEWS_API_KEY)

const fetchAndProcessNews = async (queryString, from) => {
  const query = {
    queryString,
    from,
    size: 1,
  }
  try {
    console.log('Fetching news...')
    const { articles } = await searchApi.getNews(query)
    console.log('Fetched news:', articles)
    if (articles && articles.length > 0) {
      console.log('Processing news...')
      for (const article of articles) {
        console.log('Processing article with name: ', article.title)
        const { title, sourceUrl } = article
        const scrappedContent = await scraper(sourceUrl)
        console.log('pushing article to strapi')
        // await createPost(title, JSON.stringify(scrappedContent))
        console.log('article processsing completed...')
      }
    } else {
      console.log('No articles found')
    }
  } catch (error) {
    console.error('Error fetching news:', error.message)
  }
}

module.exports = {
  fetchAndProcessNews,
}

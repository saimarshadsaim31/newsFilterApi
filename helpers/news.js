const { SearchApi } = require('financial-news-api')
const { scraper } = require('./scrapper')
const { createPost } = require('./strapi')
const { generateImgUrl } = require('./image')
const { generateCategoryFromGpt } = require('./openAi')

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
        const { title, sourceUrl, imageUrl, id, description, publishedAt } =
          article
        const markup = await scraper(sourceUrl)
        const categories = await generateCategoryFromGpt(markup)
        const s3ImageUrl = await generateImgUrl(imageUrl, title, id)
        console.log('pushing article to strapi')
        await createPost(title, markup, s3ImageUrl, publishedAt, categories)
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

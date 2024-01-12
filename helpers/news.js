const { SearchApi } = require('financial-news-api')
const { scraper } = require('./scrapper')
const { createPost } = require('./strapi')
const { generateImgUrl } = require('./image')
const { askGpt, generateImg } = require('./openAi')

const searchApi = SearchApi(process.env.NEWS_API_KEY)

const fetchAndProcessNews = async (queryString, from) => {
  const query = {
    queryString,
    from,
    size: 5,
  }
  try {
    console.log('Fetching news...')
    const { articles } = await searchApi.getNews(query)
    console.log('total articles fetched:', articles.length)
    // console.log('Fetched news:', articles)
    if (articles && articles.length > 0) {
      console.log('Processing news...')
      for (const article of articles) {
        console.log('Processing article with name: ', article.title)
        const { title, sourceUrl, id, publishedAt } = article
        const markup = await scraper(sourceUrl)
        const data = await askGpt(markup)
        // console.log({title: data.title, description:data.content})
        const generatedImageUrl = await generateImg(data?.imageDescription)
        const s3ImageUrl = await generateImgUrl(generatedImageUrl, title, id)

        const newTitle = data?.title
        const newMarkup = data?.content
        const description = data?.abstract
        const categories = data?.categories

        console.log('pushing article to strapi')
        await createPost(
          newTitle,
          description,
          newMarkup,
          s3ImageUrl,
          publishedAt,
          categories
        )
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

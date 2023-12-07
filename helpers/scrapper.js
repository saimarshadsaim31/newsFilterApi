const axios = require('axios')
const cheerio = require('cheerio')

const scraper = async (link) => {
  console.log('scrapping news article ...')
  try {
    const response = await axios.get(link)
    const $ = cheerio.load(response.data)

    try {
      $(
        'div#financial-modal, div.social-share-circle.pull-right.hidden-xs'
      ).remove()
    } catch (err) {
      console.log(`Error removing elements: ${err.message}`)
    }

    const sectionHtml = $(
      'article.news-release.inline-gallery-template section.release-body.container'
    ).html()

    // Replace newline characters with spaces
    const cleanHtml = sectionHtml.replace(/\n/g, ' ')

    return cleanHtml
  } catch (error) {
    console.error(`Error fetching or processing page: ${error.message}`)
  }
}

module.exports = {
  scraper,
}

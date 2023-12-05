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

    const title = $(
      'article.news-release.inline-gallery-template header div.custom-container h1'
    )
      .contents()
      .filter(function () {
        return this.type === 'text'
      })
      .text()
      .trim()

    const date = $(
      'article.news-release.inline-gallery-template header div.custom-container div p.mb-no'
    )
      .text()
      .trim()

    const data = {
      url: link,
      title: title,
      date: date,
      markup: sectionHtml,
    }
    return JSON.stringify(data.markup)
  } catch (error) {
    console.error(`Error fetching or processing page: ${error.message}`)
  }
}

module.exports = {
  scraper,
}

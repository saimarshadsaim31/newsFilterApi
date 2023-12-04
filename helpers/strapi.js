const headerOptions = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
}

const slugify = function (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

const categories = ['business', 'life', 'music', 'tech']

function getRandomCategory() {
  const randomIndex = Math.floor(Math.random() * categories.length)
  const randomCategory = categories[randomIndex]
  return `["${randomCategory}"]`
}
async function createPost(title, markup) {
  const categories = getRandomCategory()
  console.log('categories', categories)
  try {
    const response = await fetch(`${process.env.STRAPI_API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: headerOptions,
      body: JSON.stringify({
        data: {
          title: title,
          categories: categories,
          content: markup,
          slug: slugify(title),
        },
      }),
    })
    console.log(response.status)
  } catch (error) {
    console.log('error creating post on strapi', error)
  }
}

async function getLastFetchTimeFromStrapi(time) {
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_ENDPOINT}/last-news-fetch-time`,
      {
        method: 'GET',
        headers: headerOptions,
      }
    )
    const result = await response.json()
    return result.data.attributes.time
  } catch (error) {
    console.log('error updating last fetch time', error)
  }
}

async function updateLastFetchTime(time) {
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_ENDPOINT}/last-news-fetch-time`,
      {
        method: 'PUT',
        headers: headerOptions,
        body: JSON.stringify({
          data: {
            time,
          },
        }),
      }
    )
    return response.status
  } catch (error) {
    console.log('error updating last fetch time', error)
  }
}

module.exports = {
  createPost,
  updateLastFetchTime,
  getLastFetchTimeFromStrapi,
}

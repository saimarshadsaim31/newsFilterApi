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

const layoutCategories = [
  'Featured',
  'Latest',
  'Popular',
  `Editor's Picks`,
  'Top Stories',
]

function getRandomCategory() {
  const randomIndex = Math.floor(Math.random() * layoutCategories.length)
  const randomCategory = layoutCategories[randomIndex]
  return randomCategory
}
async function createPost(
  title,
  description,
  markup,
  s3ImageUrl,
  publishedAt,
  categories
) {
  const layoutCategory = getRandomCategory()
  try {
    const response = await fetch(`${process.env.STRAPI_API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: headerOptions,
      body: JSON.stringify({
        data: {
          title: title,
          description: description,
          slug: slugify(title),
          content: markup,
          imgUrl: s3ImageUrl,
          newsDate: publishedAt,
          categories: categories,
          layoutCategory: layoutCategory,
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

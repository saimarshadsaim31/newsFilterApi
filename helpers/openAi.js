const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
})

const newsCategories = [
  'Current',
  'Business',
  'Finance',
  'News',
  'Latest',
  'Market',
  'Trade',
  'Up Trends',
  'Investing',
  'Trending',
  'Latest Trends',
  'Trade News',
  'Stocks',
  'Small Businesses',
  'Wealth',
  'Stock Market',
  'Trading Insights',
  'Stock Trends',
  'Stock News',
  'Reports',
  'Market Trends',
  'Wall Street',
  'Stock',
  'Market News',
  'Technology',
  'Health and Wellness',
  'Science',
  'Environment',
  'Politics',
  'Entertainment',
  'Sports',
  'Education',
  'Lifestyle',
  'Science and Technology',
  'Global Affairs',
  'Innovation',
  'Opinion/Editorial',
  'Human Interest',
  'Food and Cooking',
]

async function generateCategoryFromGpt(newsContent) {
  const prompt = `Categorize this news content that i am about to provide you in the form of markup into one of the following predefined categories: ${newsCategories}. Ensure that the output always provide a category and the output only contains the name of the category nothing else, no description just the category name. here is the news content: ${newsContent}`
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
    max_tokens: 1000,
    temperature: 1,
  })
  if (typeof response.choices[0].message.content === 'string') {
    let generateCategory = []
    generateCategory.push(response.choices[0].message.content)
    return generateCategory
  }
}

module.exports = {
  generateCategoryFromGpt,
}

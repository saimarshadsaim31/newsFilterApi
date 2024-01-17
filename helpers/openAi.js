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

const askGpt = async (originalNews) => {
  console.log('asking GPT...')
//   const prompt = `Generate a nuanced variation of the following news content: '${originalNews}'. The variation should be authentic, reflecting the journalistic integrity of the original piece. However, ensure that the wording is distinct enough to prevent a one-to-one correlation with the original text, maintaining a balance between novelty and fidelity. Emphasize the importance of accuracy to prevent the dissemination of misinformation. Aim for a credible and trustworthy tone, aligning with the standards of responsible journalism. Keep in mind the significance of maintaining the original context while introducing subtle differences to create a fresh perspective. Optimize for clarity and coherence, prioritizing accuracy to uphold the reliability of the generated content. Thank you for your attention to detail in producing a variation that respects the authenticity of the news. This is the output format that i want  Output Format:
//   {
//     "title": "Generated Title",
//     "abstract": "Generated Description",
//     "content": "Generated Content should always and i repeat always be in a well structured HTML MARKUP FORMAT devided into tags like article, h1, h2, p etc. and should explain the news content in great detail so that the reader can get the full context of the news and exceeding the length of a standard page.",
//     "categories": ["Generated Category"] // Generated Category should  only be one and should be one of the following predefined categories: ${newsCategories} and it should definitely have a value and should not be null,
//     "image": "Well defined and self explanatory Generated Image prompt for DALLE to generate an image to go along with the article"
//   }`

// const prompt = `Generate a comprehensive and meticulously detailed news article, surpassing the brevity of the original while maintaining the highest journalistic standards. The content should be extended well beyond the length of a standard page, ensuring an unparalleled depth of information. Prioritize accuracy to counteract misinformation, presenting a trustworthy tone aligned with responsible journalism.

// Retain the essence of the original news, introducing nuanced variations to offer a distinct and original perspective. Incorporate HTML markup extensively, using tags such as <article>, <h1>, <h2>, <p>, etc., to achieve a sophisticated and well-structured presentation.

// Craft a title enriched with powerful SEO-friendly words for enhanced search engine visibility. The content should not only be informative but strategically employ power words throughout for reader engagement.

// Create a compelling and SEO-friendly title enriched with power words for enhanced search engine visibility. The content should not only be informative but strategically employ power words throughout for reader engagement.

// Craft a masterpiece of information, uniquely rich with insights, context, and analysis. The length should significantly exceed that of a standard page, allowing readers to delve deep into a comprehensive understanding of the news.

// Ensure the generated content is a masterpiece of information, uniquely rich with insights, context, and analysis. The length should significantly exceed that of a standard page, enabling readers to delve deep into a comprehensive understanding of the news.

// Please don't includes any contact information such as phone numbers, emails, or locations etc in the content. Utilize commonly used HTML tags and avoid style tags like <blockquote> etc. Refrain from using parentheses () in the content.

// Additionally, include both must have internal and external post relevant links within the content. Internal links should connect relevant sections of the article, enhancing the reader's navigation. External links should lead to reputable sources or related articles, providing additional context and don't attach any contact information like phone,email and location etc in content.

// Output Format:
// {
//   "title": "SEO-Optimized Generated Title with Power Words",
//   "abstract": "Generated Description with SEO elements",
//   "content": "Generated Content in a well-structured HTML MARKUP FORMAT, divided into tags like article, h1, h2, p, etc. Highly detailed and distinctive, extending significantly beyond the length of a standard page. Strategically incorporate SEO-friendly power words throughout the content to boost online visibility and engagement.",
//   "categories": ["Generated Category"], // Generated Category should  only be one and should be one of the following predefined categories: ${newsCategories} and it should definitely have a value and should not be null.,
//   "image": "Generated Image prompt for DALLE to complement this exceptionally extensive article"
// }`



const prompt = `Generate an incredibly comprehensive and meticulously detailed news article, surpassing the brevity of the original while upholding the highest journalistic standards. Extend the content well beyond the length of two standard pages, ensuring an unparalleled depth of information. Prioritize accuracy to counteract misinformation, presenting a trustworthy tone aligned with responsible journalism.

Retain the essence of the original news, introducing nuanced variations to offer a distinct and original perspective. Incorporate HTML markup extensively, using tags such as <article>, <h1>, <h2>, <p>, <a> etc., to achieve a sophisticated and well-structured presentation.

Create a compelling and SEO-friendly title enriched with power words to ensure enhanced search engine visibility. The content should not only be informative but should strategically employ power words throughout for optimal reader engagement.

Generate a content masterpiece, uniquely rich with insights, context, and analysis. The length of the generated content must substantially exceed that of two standard pages, enabling readers to delve deep into a comprehensive understanding of the news.

Ensure the generated content is a masterpiece of information, uniquely rich with insights, context, and analysis. The length should significantly exceed that of two standard pages, enabling readers to thoroughly explore and understand the news. Avoid including any contact-type information like phone numbers, email, and location in the generated content.

Additionally, the content must have both internal and external relevant, correct, and accessible links within. Internal links should seamlessly connect relevant sections of the article, enhancing the reader's navigation. External links should lead to reputable sources or related articles, providing additional context.

Output Format:
{
  "title": "SEO-Optimized Generated Title with Power Words",
  "abstract": "Generated Description with SEO elements",
  "content": "Generated Content in a well-structured HTML MARKUP FORMAT, divided into tags like article, h1, h2, p, a, etc. Highly detailed and distinctive, extending significantly beyond the length of two standard pages. Strategically incorporate SEO-friendly power words throughout the content to boost online visibility and engagement.",
  "categories": ["Generated Category"], // Choose from only these predefined categories: ${newsCategories}. The category should have a value and should not be null.
  "image": "Generated Image prompt for DALLE to complement this exceptionally extensive article",
  "seo_tags": "Generated relevant SEO tags from the generated content prompt for DALLE to complement this exceptional article and should not be null"
}`;



  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    functions: [
      {
        name: 'print',
        description: `Prints a news article in json format`,
        parameters: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the article',
            },
            abstract: {
              type: 'string',
              description: 'Brief description of the article',
            },
            content: {
              type: 'string',
              description: 'Text content of the article',
            },
            categories: {
              type: 'object',
              description: `Categorize this news content that i provided you in prompt in the form of markup into one of the following predefined categories: ${newsCategories}. Ensure that the output always provide a category and the output only contains the name of the category nothing else, no description just the category name like this ["generated category"].`,
            },
            imageDescription: {
              type: 'string',
              description:
                'A text prompt to provide DALLE so it can generate a main image to go along with the article',
            },
          },
        },
      },
    ],
    model: 'gpt-4',
    temperature: 1,
  })
  console.log('========= FULL RESPONSE =========')
  console.log(response)
  // console.log('========= CHOICES IN RESPONSE =========')
  // console.log(response.choices)
  try {
    const argumentsString =
      response.choices[0].message?.function_call?.arguments
    if (argumentsString) {
      const dataString = argumentsString
        .replace(/\\n/g, '')
        .replace(/\\r/g, '')
        .replace(/\n/g, '')
        .replace(/\r/g, '')
      console.log('parsing data...')
      const data = JSON.parse(dataString)
      console.log('data parsed!', data)
      console.log('token used:', response.usage.total_tokens)
      return data
    } else {
      console.error('Failed to parse JSON', { response }, response.choices[0])
      return new Error('Failed to parse JSON')
    }
  } catch (error) {
    console.error('Failed to parse JSON', error)
    return error
  }
}

async function generateImg(imageDescription) {
  try {
    console.log('generating image...')
    const prompt = `Generate a visually compelling and authentic image reflecting the essence of the following news article description:"${imageDescription}. The image should be professional, contextually relevant, and adhere to high standards of realism to ensure accurate representation Consider elements that convey credibility and reliability, as the goal is to prevent misinformation. Please make sure the image aligns with the journalistic nature of the news provided and fosters a sense of trustworthiness. Ensure that the image is suitable for a news-related context, maintaining a balance between creativity and accuracy. Optimize for clarity and visual impact to enhance the audience's understanding of the news.Feel free to leverage the capabilities of the 'dall-e-3' model to produce a single image. Thank you for your attention to detail in creating a visually compelling representation of the provided news content. The generated image should not look animated or cartoonish it should look as realistic as possible.`
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      style: 'natural',
    })
    console.log('========= FULL RESPONSE =========')
    console.log(response)
    console.log('========= CHOICES IN RESPONSE =========')
    console.log(response.data[0].url)
    return response.data[0].url
  } catch (error) {
    console.error('Error generating image:', error.message)
  }
}

module.exports = {
  askGpt,
  generateImg,
}

// async function generateCategoryFromGpt(newsContent) {
//   const prompt = `Categorize this news content that i am about to provide you in the form of markup into one of the following predefined categories: ${newsCategories}. Ensure that the output always provide a category and the output only contains the name of the category nothing else, no description just the category name. here is the news content: ${newsContent}`
//   const response = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: prompt }],
//     model: 'gpt-4',
//     max_tokens: 1000,
//     temperature: 1,
//   })
//   if (typeof response.choices[0].message.content === 'string') {
//     let generateCategory = []
//     generateCategory.push(response.choices[0].message.content)
//     return generateCategory
//   }
// }
// async function generateImg(imageDescription) {
//   console.log('generating image...')
//   const prompt = `Generate a visually compelling and authentic image reflecting the essence of the following news article description:"${imageDescription}. The image should be professional, contextually relevant, and adhere to high standards of realism to ensure accurate representation Consider elements that convey credibility and reliability, as the goal is to prevent misinformation. Please make sure the image aligns with the journalistic nature of the news provided and fosters a sense of trustworthiness. Ensure that the image is suitable for a news-related context, maintaining a balance between creativity and accuracy. Optimize for clarity and visual impact to enhance the audience's understanding of the news.Feel free to leverage the capabilities of the 'dall-e-3' model to produce a single image. Thank you for your attention to detail in creating a visually compelling representation of the provided news content. The generated image should not look animated or cartoonish it should look as realistic as possible.`
//   const response = await openai.images.generate({
//     model: 'dall-e-3',
//     prompt: prompt,
//     n: 1,
//     size: '1024x1024',
//     style: 'natural',
//   })
//   console.log('========= FULL RESPONSE =========')
//   console.log(response)
//   console.log('========= CHOICES IN RESPONSE =========')
//   console.log(response.data[0].url)
//   return response.data[0].url
// }

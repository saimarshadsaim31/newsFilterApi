const path = require('path')
const axios = require('axios')
const sharp = require('sharp')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

// AWS S3 configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
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

function generateUniqueFileName(imageUrl, title, id) {
  const fileExtension = path.extname(imageUrl).toLowerCase()
  const slugifyTitle = slugify(title)
  const fileName = `${slugifyTitle}_${id}${fileExtension}`
  return fileName
}
async function downloadImage(url) {
  console.log('Downloading image from URL...')
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer',
  })
  return response.data
}

async function processAndUploadImage(imageBuffer, fileName) {
  console.log('uploading image to S3...')
  const processedImageBuffer = await sharp(imageBuffer).resize(500).toBuffer()

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `images/${fileName}`,
    Body: processedImageBuffer,
    ContentType: 'image/*',
  })

  try {
    const data = await s3Client.send(command)
    console.log('Image uploaded to S3:', data)
    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/images/${fileName}`
    return imageUrl
  } catch (error) {
    throw new Error(`Error uploading file to S3: ${error.message}`)
  }
}

async function generateImgUrl(imageUrl, title, id) {
  if (!imageUrl || imageUrl === '') {
    return 'https://liqueous-news-cms-image-storage.s3.eu-central-1.amazonaws.com/images/placeholderImg.webp'
  }

  const fileName = generateUniqueFileName(imageUrl, title, id)
  try {
    const imageBuffer = await downloadImage(imageUrl)
    const uploadedImageUrl = await processAndUploadImage(imageBuffer, fileName)
    console.log('Image uploaded to S3:', uploadedImageUrl)
    return uploadedImageUrl
  } catch (error) {
    console.error('Error:', error.message)
  }
}

module.exports = {
  generateImgUrl,
}

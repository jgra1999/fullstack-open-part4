const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

const mongoUrl = config.MONGODB_URI

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

mongoose.set('strictQuery', false)

mongoose
	.connect(mongoUrl)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

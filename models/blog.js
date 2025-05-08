const mongoose = require('mongoose')
const logger = require('../utils/logger')

const mongoUrl =
	'mongodb+srv://helsinski_fullstack:VB2clWRmQoMhEbKK@cluster0.puvyb.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0'

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

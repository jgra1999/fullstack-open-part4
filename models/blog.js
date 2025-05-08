const mongoose = require('mongoose')

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
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

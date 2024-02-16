const async_handler = require('express-async-handler')
const Blog = require('../models/blogModels')

const getBlogs = async_handler(async (req, res) => {
    const blogs = await Blog.find()
    res.json(blogs)
})

const createBlog = async_handler(async (req, res) => {
    if(!req.body.title || !req.body.description || !req.file) {
        res.status(400)
        throw new Error('Please fill all required fields')
    }
    const {title, description} = req.body
    const newBlog = new Blog({title, description, image : req.file})
    await newBlog.save()
    res.status(200).json(newBlog)
})

module.exports = {
    getBlogs,
    createBlog,
}
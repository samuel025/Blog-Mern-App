const async_handler = require('express-async-handler')
const Blog = require('../models/blogModels')
const cloudinary = require('../middleware/config');

const getBlogs = async_handler(async (req, res) => {
    const blogs = await Blog.find()
    res.json(blogs)
})

const createBlog = async_handler(async (req, res) => {
    if(!req.body.title || !req.body.description) {
        res.status(400)
        throw new Error('Please fill all required fields')
    }
    const {title, description} = req.body
    const result = await cloudinary.uploader.upload(req.file.path)
    const newBlog = await Blog.create({
        title: title, 
        description: description, 
        image_url:result.secure_url
    })
    console.log(newBlog)
    res.status(200).json(newBlog)
})

const getBlogDetail = async_handler(async (req, res) => {
    blog_id = req.params.id
    const blog = await Blog.findById(blog_id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }
    res.statusCode(200).json(blog)
})

const deleteBlog = async_handler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }
    await blog.deleteOne({_id : req.params.id})
    res.status(400).json("Deleted sucessfully")
})

const updateBlog = async_handler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            throw new Error('Blog not found');
        }
        if(!req.body.title || !req.body.description) {
            res.status(400)
            throw new Error('Please fill all required fields')
        }
        // Parse key-value pairs from form-data
        const { title, description } = req.body;

        // Check if there's a new image file uploaded
        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'blog_images',
            });

            // Set the new image URL
            const newImageUrl = result.secure_url;

            // Delete the previous image from Cloudinary using its public ID
            const publicId = blog.image_public_id;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }

            // Update the blog fields with the new image URL
            blog.image_url = newImageUrl;
            blog.image_public_id = result.public_id;
        }

        // Update the remaining fields of the blog
        if (title) blog.title = title;
        if (description) blog.description = description;

        // Save the updated blog
        const updatedBlog = await blog.save();

        // Return the updated blog in the response
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    getBlogs,
    createBlog,
    getBlogDetail,
    deleteBlog,
    updateBlog
}
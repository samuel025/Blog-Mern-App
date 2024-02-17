const express = require('express')
const router = express.Router()
const {getBlogs, createBlog, getBlogDetail, deleteBlog, updateBlog} = require('../controllers/blogController')
const upload = require('../middleware/cloudinary_config');


const multer = require('multer');

// Configure multer for single file upload
const uploads = multer({ dest: 'uploads/' }); // Destination folder where uploaded files will be stored




router.route('/').get(getBlogs).post(uploads.single('image'), upload, createBlog)
router.route('/:id').get(getBlogDetail).delete(deleteBlog).put(uploads.single('image'), updateBlog)


module.exports = router
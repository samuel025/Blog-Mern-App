const express = require('express')
const router = express.Router()
const upload_image_cloudinary = require('./cloudinary/cloudinary_config')
const {getBlogs, createBlog} = require('../controllers/blogController')
const multer = require('multer'); // Import Multer
const upload = multer({ dest: 'uploads/' });




router.route('/').get(getBlogs).post(upload.single('image'), upload_image_cloudinary, createBlog)


module.exports = router
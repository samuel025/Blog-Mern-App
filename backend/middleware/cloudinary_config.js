const { v2: cloudinary } = require('cloudinary');

const upload = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'blog_images',
        });

        // Set the uploaded image URL in the request object
        req.image_url = result.secure_url;
        
        // Call next middleware
        next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = upload;
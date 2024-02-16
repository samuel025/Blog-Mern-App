const cloudinary = require('cloudinary').v2;

const uploadImageToCloudinary = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        req.image = result.secure_url; // store the secure URL of the uploaded image
        next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = uploadImageToCloudinary
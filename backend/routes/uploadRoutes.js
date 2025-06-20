const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const router = express.Router();

require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // function to handle the streaming upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };
        //call the streamUpload function with the uploaded file buffer
        const result = streamUpload(req.file.buffer);
        res.json({imageUrl: result.secure_url, message: "File uploaded successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

// Export the router
module.exports = router;

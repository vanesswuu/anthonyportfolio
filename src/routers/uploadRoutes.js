const express = require('express');
const router = express.Router();
const multer = require('multer'); //this is important download this

const { uploadImage, uploadProgressPhoto } = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');

// Multer settings: keep the file in memory (buffer) instead of saving it on your hard drive
const storage = multer.memoryStorage();
const upload = multer({ storage });

// This route receives the actual file under the field name 'image'
router.post('/', upload.single('image'), uploadImage);

//the progress uploader
router.post('/progress', protect, upload.single('image'), uploadProgressPhoto);


module.exports = router;





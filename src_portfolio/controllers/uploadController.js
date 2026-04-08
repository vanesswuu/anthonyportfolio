//this talks to cloudinary
const cloudinary = require('../config/cloudinary');
const User = require('../models/User');


const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'no file uploaded'
            })
        }

        //convert the buffer (from multer) into a format Cloudinary
        //understands

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        //send it to cloud
        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: 'gym_plans',
        });

        res.status(200).json({
            success: true,
            url: result.secure_url
        });




    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: 'upload to cloudinary failed'
        });

    }
}


const uploadProgressPhoto = async (req, res) => {

    try {

        if (!req.file) return res.status(400).json({
            success: false,
            message: 'no image provided'
        });

        //convert to filebase64 (a language cloudinary understands)
        //converts raw binary to a buffer(temporary storage created by multer)
        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        //the uploader
        const result = await cloudinary.uploader.upload(fileBase64, {
            folder: 'individual_progress'
        })

        //the saver
        const user = await User.findById(req.user.id);
        user.progressPhotos.push(result.secure_url);
        await user.save();

        res.status(200).json({
            success: true,
            url: result.secure_url,
            message: 'transformation photo saved'
        })

    } catch (err) {
        console.error('upload error' + err);
        res.status(500).json({
            success: false,
            message: 'upload failed'
        });
    }

}

module.exports = { uploadImage, uploadProgressPhoto };

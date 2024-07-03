const { uploader } = require('./CloudinarySetup.js')

const uploadImage = async (req) => {
    if (req.file) {
        try {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const result = await uploader.upload(dataURI, { folder: 'MEDICARE_IMAGES' });
            console.log('Image has been uploaded successfully to Cloudinary', result.secure_url);
            return {
                status: 200,
                message: 'Image has been uploaded successfully to Cloudinary',
                data: result
            };
        } catch (error) {
            console.log('Something went wrong while uploading image:', error);
            throw {
                status: 400,
                message: 'Something went wrong while uploading image',
                error: error
            };
        }
    }
};

module.exports = { uploadImage };
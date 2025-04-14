import { v2 as cloudinary } from 'cloudinary'
// import path from 'path'

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
    console.log("✅ Cloudinary Connected Successfully");
}

export default connectCloudinary
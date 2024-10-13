import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            throw new Error("File not found");
        }

        // Upload the file
        const response = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        });

        return response;

    } catch (error) {
        // Check if the file exists before trying to delete it
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        // Throwing an error with additional context
        throw new Error(`Cloudinary upload error: ${error.message}`);
    }
}

export { uploadOnCloudinary };

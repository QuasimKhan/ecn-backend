import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file, resourceType = "auto") => {
    try {
        // Check if file exists
        if (!file) {
            throw new Error("File not found");
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(file, {
            resource_type: resourceType, // Automatically detect the resource type
        });

        return response;        

    } catch (error) {
        // Check if the file exists before trying to delete it
        if (fs.existsSync(file)) {
            fs.unlinkSync(file); // Delete the file if it exists
        }

        // Throw an error with additional context
        throw new Error(`Cloudinary upload error: ${error.message}`);
    }
};

export { uploadOnCloudinary };

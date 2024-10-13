import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = "./public/uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir); // Use the upload directory
    },
    filename: function(req, file, cb) {
        // Generate a unique filename
        crypto.randomBytes(16, (err, bytes) => {
            if (err) {
                return cb(err); // Handle the error gracefully
            }
            const fn = bytes.toString('hex') + path.extname(file.originalname);
            cb(null, fn);
        });
    }
});

const upload = multer({ storage: storage });

export default upload;

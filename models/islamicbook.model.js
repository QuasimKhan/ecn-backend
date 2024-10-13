import mongoose from "mongoose";

const islamicBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },

    image: {
        type: String,
        required: [true, "Image is required"]
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    link: {
        type: String,
        required: [true, "Link is required"]
    }
}, {
    timestamps: true
});

const IslamicBookModel = mongoose.model("IslamicBook", islamicBookSchema);
export default IslamicBookModel
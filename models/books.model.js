import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        enum: ['Islamic', 'General', 'Quran', 'Hadith'],  // predefined categories
        required: true,
      },
      coverImage: {
        type: String,  // URL for the book cover image
      },
      pdfLink: {
        type: String,  // URL for the book PDF (optional if you're hosting PDFs)
      },
      pdfFile: {
        type: String,
      }



},{timestamps: true});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;

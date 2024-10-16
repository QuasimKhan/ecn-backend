import BookModel from "../models/books.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const addBookController = async (req, res) => {
    try {
        const { title, author, category, pdfLink } = req.body;
        
        // Initialize a new book object
        const newBook = new BookModel({
            title,
            author,
            category,
            coverImage: '', // We'll update this after Cloudinary upload
            pdfLink,
            pdfFile: '' // We'll update this after Cloudinary upload
        });

        // Check if there is a file (cover image and PDF file)
        if (req.files && req.files.coverImage && req.files.pdfFile) {
            // Upload the cover image to Cloudinary
            const coverImagePath = req.files.coverImage[0].path;  // Multer stores file path
            const coverImageUploadResponse = await uploadOnCloudinary(coverImagePath);
            newBook.coverImage = coverImageUploadResponse.secure_url;

            // After successful upload, remove the file from the local file system
            fs.unlinkSync(coverImagePath);
            console.log('Cover image uploaded and deleted from local:', coverImageUploadResponse.secure_url);

            // Upload the PDF file to Cloudinary
            const pdfFilePath = req.files.pdfFile[0].path;
            const pdfFileUploadResponse = await uploadOnCloudinary(pdfFilePath);
            newBook.pdfFile = pdfFileUploadResponse.secure_url;

            // After successful upload, remove the file from the local file system
            fs.unlinkSync(pdfFilePath);
            console.log('PDF file uploaded and deleted from local:', pdfFileUploadResponse.secure_url);
        }

        // Save the new book document to the database
        await newBook.save();

        // Send success response
        return res.send({
            success: true,
            message: "Book added successfully",
            data: newBook
        });
    } catch (error) {
        console.error('Error in adding book:', error);
        return res.status(500).send({
            success: false,
            message: "Error in adding book",
            error: error.message
        });
    }
};




//get book by category

const getBooksController = async (req, res) => {
    try {
        const books = await BookModel.find({ category: req.params.category });

        // Check if the books array is empty
        if (books.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Category not found or no books in this category"
            });
        }

        return res.send({
            success: true,
            message: "Books fetched successfully",
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching books",
            error: error.message
        });
    }
};


//get all books

const getAllBooksController = async (req, res) => {
    try {
        const books = await BookModel.find({});
        return res.send({
            success: true,
            message: "Books fetched successfully",
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching books",
            error: error.message
        });
    }
}




const getBookByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const books = await BookModel.findById(id);
        if (!books) {
            return res.status(404).send({
                success: false,
                message: "Book not found"
            });
        }
        return res.send({
            success: true,
            message: "Book fetched successfully",
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching book",
            error: error.message
        });
    }
}

const deleteBookController = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookModel.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).send({
                success: false,
                message: "Book not found"
            });
        }
        return res.send({
            success: true,
            message: "Book deleted successfully",
            data: book
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting book",
            error: error.message
        });
    }
}

export { addBookController, getBooksController,getAllBooksController, getBookByIdController, deleteBookController }
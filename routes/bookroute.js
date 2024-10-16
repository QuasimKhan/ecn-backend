import express from "express";
import { addBookController, getBooksController,getAllBooksController, getBookByIdController, deleteBookController } from "../controllers/bookcontroller.js";
import upload from "../middlewares/multer.middleware.js";

const bookrouter = express.Router();

bookrouter.post("/addbook", upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "pdfFile", maxCount: 1 }]), addBookController);

//get books by category 
bookrouter.get("/category/:category", getBooksController);

//get all books
bookrouter.get("/all", getAllBooksController);

//get book by id
bookrouter.get("/get/:id", getBookByIdController);

//delete book by id
bookrouter.delete("/delete/:id", deleteBookController);

export default bookrouter
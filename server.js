//express import
import express from "express";
const app = express();

//env import
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

//db import
import connectDB from "./config/dbconfig.js";
connectDB();


//import other files
import cors from "cors";
import router from "./routes/authroute.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";


// Middleware
app.use(cors(
    {
        origin: ["https://ecnaseerpur.in"],
        credentials: true
    }

));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));


app.use("/api/v1/auth", router);





app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api", (req, res) => {
    res.send("API is running!");
});

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;


const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api", (req, res) => {
    res.send("API is running!");
});

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

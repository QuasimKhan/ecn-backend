import express from "express";
import { registerController , loginController, getUserController, logoutController} from "../controllers/authcontroller.js";

const authrouter = express.Router();

authrouter.post("/register", registerController);

authrouter.post("/login", loginController);

authrouter.post("/logout", logoutController);

authrouter.get("/user", getUserController);



export default authrouter
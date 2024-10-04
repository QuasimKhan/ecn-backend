import express from "express";
import { registerController , loginController, getUserController, logoutController} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.get("/user", getUserController);



export default router
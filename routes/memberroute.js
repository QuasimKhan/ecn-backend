import express from "express";
import {addMemberController, getAllMembersController, editMemberController, getMemberByIdController, deleteMemberController } from "../controllers/membercontroller.js";

import upload from "../middlewares/multer.middleware.js";

const memberrouter = express.Router();

memberrouter.post("/addmember", upload.single("profileImage") ,addMemberController);
memberrouter.get("/", getAllMembersController);
memberrouter.get("/:id", getMemberByIdController)
memberrouter.put("/edit/:id", editMemberController);
memberrouter.delete("/delete/:id", deleteMemberController);


export default memberrouter
import express from "express";
import { addmemberController, deleteMemberController, editMemberController, getAllMembersController, getMemberByIdController } from "../controllers/membercontroller.js";

const memberrouter = express.Router();

memberrouter.post("/addmember", addmemberController);
memberrouter.get("/", getAllMembersController);
memberrouter.get("/:id", getMemberByIdController)
memberrouter.put("/edit/:id", editMemberController);
memberrouter.delete("/delete/:id", deleteMemberController);


export default memberrouter
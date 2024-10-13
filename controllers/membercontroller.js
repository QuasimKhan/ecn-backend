import MemberModel from "../models/member.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

// Add member controller
const addMemberController = async (req, res) => {
    try {
        const { name, fatherName, dob, address, phone, email, joiningDate, status, role } = req.body;

        // Check if all required fields are provided
        if (!name || !fatherName || !dob || !address || !phone || !joiningDate || !status || !role) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if a file was uploaded
        let image = null; // Initialize image as null

        if (req.file) {
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            image = uploadResponse.secure_url;

            // Delete the uploaded file from local storage
            fs.unlinkSync(req.file.path);
        } else {
            return res.status(400).send({
                success: false,
                message: "No file uploaded"
            });
        }

        console.log("Uploaded image path:", image);
        
        const newMember = new MemberModel({
            name,
            fatherName,
            profileImage: image, // Save the image path to the database
            dob,
            address,
            phone,
            email,
            joiningDate,
            status,
            role
        });

        await newMember.save();

        return res.status(201).send({
            success: true,
            message: "Member added successfully",
            data: newMember
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in adding member",
            error: error.message,
        });
    }
};
// Get all members
const getAllMembersController = async (req, res) => {
    try {
        const members = await MemberModel.find({}).sort({ name: 1 });
        return res.send({
            success: true,
            message: "Members fetched successfully",
            count: members.length,
            data: members
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching members",
            error: error.message,
        });
    }
};

// Get member by ID
const getMemberByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await MemberModel.findById(id);
        
        if (!member) {
            return res.status(404).send({
                success: false,
                message: "Member not found"
            });
        }

        return res.send({
            success: true,
            message: "Member fetched successfully",
            data: member
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching member",
            error: error.message,
        });
    }
};

// Edit member
const editMemberController = async (req, res) => {
    try {
        const { id } = req.params;

        // Optional: If an image file is uploaded, handle the upload
        if (req.file) {
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            req.body.profileImage = uploadResponse.secure_url; // Update image URL in request body

            // Delete the uploaded file from local storage
            fs.unlinkSync(req.file.path);
        }

        // Update the member in the database with the new data
        const member = await MemberModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!member) {
            return res.status(404).send({
                success: false,
                message: "Member not found"
            });
        }

        return res.send({
            success: true,
            message: "Member updated successfully",
            data: member
        });
    } catch (error) {
        console.error("Error in updating member:", error); // More descriptive error logging
        return res.status(500).send({
            success: false,
            message: "Error in updating member",
            error: error.message,
        });
    }
};


// Delete member
const deleteMemberController = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await MemberModel.findByIdAndDelete(id);
        
        if (!member) {
            return res.status(404).send({
                success: false,
                message: "Member not found"
            });
        }

        return res.send({
            success: true,
            message: "Member deleted successfully",
            data: member
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting member",
            error: error.message,
        });
    }
};

export { addMemberController, getAllMembersController, editMemberController, getMemberByIdController, deleteMemberController };

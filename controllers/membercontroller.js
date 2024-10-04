import MemberModel from "../models/member.model.js";

const addmemberController = async (req, res) => {

    try {
         
        const {name , fatherName, dob, employmentType, address, phone, email, joiningDate, status, role} = req.body;

        if(!name || !fatherName || !dob || !employmentType || !address || !phone || !joiningDate || !status || !role){
            return res.send({
                success: false,
                message: "All fields are required"
            });
        }

        const newMember = new MemberModel({
            name,
            fatherName, 
            dob, 
            employmentType, 
            address, 
            phone, 
            email, 
            joiningDate, 
            status, 
            role
        });

        await newMember.save();

        return res.send({
            success: true,
            message: "Member added successfully",
            data: newMember
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in adding member",
            error: error.message,
        });

        
    }
   

}

// Get all members
const getAllMembersController = async (req, res) => {
    try {
        const members = await MemberModel.find({}).sort({ createdAt: -1 });
        return res.send({
            success: true,
            message: "Members fetched successfully",
            count: members.length,
            data: members
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching members",
            error: error.message,
        });
    }
}

//get member by id

const getMemberByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await MemberModel.findById(id);
        return res.send({
            success: true,
            message: "Member fetched successfully",
            data: member
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching member",
            error: error.message,
        });
    }
}




//edit member

const editMemberController = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await MemberModel.findByIdAndUpdate(id, req.body, {
            new: true
        });
        return res.send({
            success: true,
            message: "Member updated successfully",
            data: member
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in updating member",
            error: error.message,
        });
    }
}


//delete member

const deleteMemberController = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await MemberModel.findByIdAndDelete(id);
        return res.send({
            success: true,
            message: "Member deleted successfully",
            data: member
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting member",
            error: error.message,
        });
    }
}


export {addmemberController, getAllMembersController, editMemberController, getMemberByIdController, deleteMemberController}
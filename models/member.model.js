import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    fatherName: {
        type: String,
        required: [true, "Father's name is required"]
    },
    dob: { // Changing to Date type instead of Number
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    employmentType: {
        type: String,
        required: [true, "Employment Type is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    phone: { // Changed to String for flexible phone formats
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Example validation for a 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: { // Adding an optional email validation
        type: String,
        validate: {
            validator: function(v) {
                return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    joiningDate: {
        type: Date,
        required: [true, "Joining Date is required"]
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"], // Defining the possible values
        default: "Active"
    },
    role: {
        type: String,
        enum: ["member", "admin", "supervisor"], // Defining role options
        default: "member"
    }
}, {
    timestamps: true
});

const MemberModel = mongoose.model("Member", memberSchema);
export default MemberModel;

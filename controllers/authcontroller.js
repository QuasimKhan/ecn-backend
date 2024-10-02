import { hashPassword , comparePassword} from "../utils/authutil.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


// Register Controller
const registerController = async(req, res) => {
    try {

        const {name , email, password} = req.body;

        // Validations
        if(!name){
            return res.send({
                success: false,
                message: 'Name is required'
            })
        }
        if(!email){
            return res.send({
                success: false,
                message: 'Email is required'
            })
        }
        if(!password || password.length < 6){
            return res.send({
                success: false,
                message: 'Password is required and should be 6 characters long'
            })
        }

        // check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.send({
                success: false,
                message: 'User already exists'
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.send({
            success: true,
            message: 'User created successfully',
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
        
    }
}


export {registerController}
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


// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validations
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required'
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password is required and should be at least 6 characters long'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            });
        }

        // Check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Wrong password'
            });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Options for cookie
        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            httpOnly: true
        };

        // Set cookie and send response
        res.status(200)
            .cookie('token', token, options)
            .send({
                success: true,
                message: 'Login successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: 'Error in login',
            error: error.message
        });
    }
};


//Logout Controller
const logoutController = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.send({
            success: true,
            message: 'Logout successfully'
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: 'Error in logout',
            error: error.message
        });
        
    }
}


//get user details

const getUserController = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).send({
                success: false,
                message: 'User not authenticated'
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        return res.send({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting user',
            error: error.message
        });
    }
}


export {registerController, loginController,logoutController, getUserController}
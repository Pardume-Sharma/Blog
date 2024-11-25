import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        
        if (!user)
            return res.json({ success: false, message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch)
            return res.json({ success: false, message: "Incorrect password" });

        const token = createToken(user._id);
        res.json({ success: true, message: "Logged in successfully", token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const exists = await UserModel.findOne({ email });
        if (exists)
            return res.json({ success: false, message: "User already exists" });

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ 
            name:name,
            email: email,
            password: hashedPassword 
        });
        const user = await newUser.save();

        // Creating JWT token
        const token = createToken(user._id);
        return res.json({ success: true, message: "User registered successfully", token });
    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };

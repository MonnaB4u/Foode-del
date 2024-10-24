// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import userModel from "../models/userModel.js";

// // JWT token creation function
// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // User login (placeholder for now)
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         // Find the user by email
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: "User doesn't exist" });
//         }

//         // Compare the entered password with the hashed password from the database
//         const isMatch = await bcrypt.compare(password, user.password); // Corrected comparison
//         if (!isMatch) {
//             return res.json({ success: false, message: "Invalid credentials" });
//         }

//         // Generate JWT token if credentials are valid
//         const token = createToken(user._id);
//         res.json({ success: true, token });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error occurred" });
//     }
// };


// // Create and register a new user
// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;
    
//     try {
//         // Check if user already exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Validate email format & password strength
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         // Hash user password using bcrypt
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         const newUser = new userModel({
//             name: name,
//             email: email,
//             password: hashedPassword,
//         });

//         // Save new user to the database
//         const user = await newUser.save();

//         // Generate token for the user
//         const token = createToken(user._id);
//         res.json({ success: true, token });
        
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error registering user" });
//     }
// };

// export { loginUser, registerUser };






import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import userModel from "../models/userModel.js";

// JWT token creation function
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Optional expiration
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error occurred during login" });
    }
};

// Create and register a new user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = createToken(newUser._id);
        res.json({ success: true, token });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

export { loginUser, registerUser };

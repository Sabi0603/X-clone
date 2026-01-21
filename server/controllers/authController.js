const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
    try {

        const { username, fullName, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail || existingUsername) {
            return res.status(400).json({ error: "Already Existing User or email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must have atleast 6 char length" });
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                bio: newUser.bio,
                link: newUser.link
            });
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }

    } catch (error) {
        console.log(`Error in Signup Controller: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid Username or Password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Username or Password" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            bio: user.bio,
            link: user.link
        });

    } catch (error) {
        console.error("Error in login Controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {

        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout SuccessFully" });

    } catch (error) {
        console.error("Error in logout Controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getMe Controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    signup,
    login,
    logout,
    getMe
}
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findOne({ _id: decoded.userId }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error}`);
        res.json(500).json({ error: "Internal Server Error" });
    }
}

module.exports = protectRoute;
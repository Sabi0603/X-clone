const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

const PORT = process.env.PORT;

app.use(cors({
    origin:
        process.env.NODE_ENV === "production"
            ? true
            : "http://localhost:5173",
    credentials: true
}));


app.use(express.json({
    limit: "5mb"
}));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

connectDB();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "dist")));

    app.use((req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "dist", "index.html")
        );
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
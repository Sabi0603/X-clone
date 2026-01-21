const express = require("express");
const { getUserProfile, followUnFollowUser, getSuggestedUsers, updateUser } = require("../controllers/userController");
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();


router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/update", protectRoute, updateUser);

module.exports = router;
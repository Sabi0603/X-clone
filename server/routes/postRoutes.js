const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { createPost, deletePost, createComment, likeUnlikePost, getAllPost, getLikedPosts, getFollowingPosts, getUserPosts } = require("../controllers/postController");

const router = express.Router();

router.get("/all", protectRoute, getAllPost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, createComment);
router.delete("/:id", protectRoute, deletePost);

module.exports = router;
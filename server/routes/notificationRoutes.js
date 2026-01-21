const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { getNotications, deleteNotications } = require("../controllers/notificationController");

const router = express.Router();

router.get("/", protectRoute, getNotications);
router.delete("/", protectRoute, deleteNotications);

module.exports = router;
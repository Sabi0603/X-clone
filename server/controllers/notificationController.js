const Notification = require("../models/notificationModel");

const getNotications = async (req, res) => {
    try {

        const userId = req.user._id;

        const notification = await Notification.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg"
        });

        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notification);

    } catch (error) {
        console.log(`Error in get notification Controller: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteNotications = async (req, res) => {
    try {

        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });

    } catch (error) {
        console.log(`Error in delete notification Controller: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getNotications,
    deleteNotications
}
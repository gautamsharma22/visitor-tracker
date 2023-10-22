const User = require("../models/users");
const adminRequest = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(req.body);
    console.log(userId);
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      res.status(500).json({
        message: "No user found with the specified ID.",
      });
    } else {
      console.log("User Deeleted");
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong at Admin Request",
    });
  }
};
module.exports = adminRequest;

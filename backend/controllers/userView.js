const User = require("../models/users");
const adminRequest = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong at Admin Request",
      });
    }
  };
module.exports = adminRequest;

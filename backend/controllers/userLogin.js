const Visitor = require("../models/visitor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await Visitor.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: "User Not found with this Email, ",
    });
  }
  const { firstName, lastName } = existingUser;
  const hashedPassword = existingUser.password;
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (result) {
      const name = firstName + " " + lastName;
      const token = jwt.sign({ name, email }, process.env.SECRET_KEY);
      res.status(200).json({
        message: "Logged in succesfully",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Credentials don't match, ",
      });
    }
  });
};
module.exports = userLogin;

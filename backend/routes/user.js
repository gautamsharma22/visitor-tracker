const express = require("express");
const Visitor = require("../models/visitor");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Visitor.findOne({ email });
  if (!existingUser) {
    return res.send({
      type: "warning",
      title: "Oops!",
      text: "User Not found with this Email, ",
      secondrytext: "Try creating a New One",
    });
  } else {
  }
  const { firstName, lastName } = existingUser;
  const hashedPassword = existingUser.password;
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (result) {
      res.send({
        type: "success",
        title: "Welcome",
        text: "Logged in succesfully",
        secondrytext: "",
        firstName: firstName,
        lastName: lastName,
      });
    } else {
      res.send({
        type: "error",
        title: "Oops!",
        text: "Credentials don't match, ",
        secondrytext: "Please Recheck your Credentials",
      });
    }
  });
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, reason, password, visitortype } =
    req.body;
  console.log(req.body)
  const visitor = new Visitor({
    firstName,
    lastName,
    email,
    reason,
    password,
    visitortype,
  });

  const existingUser = await Visitor.findOne({ email });
  if (existingUser) {
    return res.send({
      type: "info",
      title: "Oops!",
      text: "Email Already Exists, ",
      secondrytext: "Redirecting You to Login",
    });
  }

  try {
    const result = await visitor.save();
    res.send({
      type: "success",
      title: "Welcome",
      text: "Registered Succesfully",
      secondrytext: "Redirecting You to Login",
    });
  } catch (error) {
    console.error("Error saving visitor:", error);
    res.send({
      type: "error",
      title: "Error Occured",
      text: "Something Went Wrong :(",
      secondrytext: "",
    });
  }
});

module.exports = router;

const express = require("express");
const Visitor = require("../models/visitor");
const router = express.Router();

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
  }

  try {
    const user = await Visitor.findOne({ email: email, password: password });
    if (user) {
      res.send({
        type: "success",
        title: "Welcome",
        text: "Logged in succesfully",
        secondrytext: "",
      });
    } else {
      res.send({
        type: "error",
        title: "Oops!",
        text: "Credentials don't match, ",
        secondrytext: "Please Recheck your Credentials",
      });
    }
  } catch (error) {
    res.send({ type: "error", title: "Oh No!", text: { error } });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, reason, password, visitortype } =
    req.body;
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
    return res
      .status(400)
      .send({ error: "User with this email already exists" });
  }

  try {
    const result = await visitor.save();
    console.log("Visitor saved:", result);
    res.send(result);
  } catch (error) {
    console.error("Error saving visitor:", error);
    res.status(500).send(error);
  }
});

module.exports = router;

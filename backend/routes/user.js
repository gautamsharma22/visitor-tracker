const express = require("express");
const Visitor = require("../models/visitor");
const router = express.Router();

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Visitor.findOne({ email });
  if (!existingUser) {
    return res
      .status(400)
      .send({ error: "An account with this email not found. Try Signing Up." });
  }

  try {
    const user = await Visitor.findOne({ email: email, password: password });
    if (user) {
      res.send({ success: "Logged in succesfully" });
    } else {
      res.send({ success: "Credentials don't match, Please try again" });
    }
  } catch (error) {
    console.error("Error Logging in :( ", error);
    res.status(500).send(error);
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

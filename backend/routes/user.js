const express = require("express");
const Visitor = require("../models/visitor");
const router = express.Router();

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

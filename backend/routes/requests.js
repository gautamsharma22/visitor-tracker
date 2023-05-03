const express = require("express");
const router = express.Router();
const VisitorRequest = require("../models/visitor-request");
//Create new Data
router.post("/", async (req, res) => {
  const { id, name, email, reason, visitortype, visitingDate } = req.body;
  console.log(req.body);
  const request = new VisitorRequest({
    id,
    name,
    email,
    reason,
    visitortype,
    visitingDate,
  });
  try {
    const result = await request.save();
    if (result) {
      res.send({
        type: "success",
        title: "Request Sent",
        text: "Request Sent Successfully",
        secondrytext: "Please wait while we approve your request.",
      });
    }
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
// Update Data
router.put("/requests", async (req, res) => {
  const { email, password } = req.body;
});
//View requests
router.get("/requests", async (req, res) => {});

module.exports = router;

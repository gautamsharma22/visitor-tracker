const VisitorRequest = require("../models/visitor-request");
const createRequest = async (req, res) => {
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
      res.status(201).json({
        message: "Request Sent Successfully",
      });
    }
  } catch (error) {
    console.error("Error saving visitor:", error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
const updateRequest = async (req, res) => {
    console.log(req.visitorID);
};
const viewRequest = async (req, res) => {};
const deleteRequest = async (req, res) => {};

module.exports = { createRequest, updateRequest, viewRequest, deleteRequest };

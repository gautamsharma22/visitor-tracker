const VisitorRequest = require("../models/visitor-request");
const createRequest = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    reason,
    visitortype,
    phoneNumber,
    aadharNumber,
    checkInTime,
  } = req.body;
  const request = new VisitorRequest({
    firstName,
    lastName,
    email,
    reason,
    visitortype,
    phoneNumber,
    aadharNumber,
    checkInTime,
  });
  try {
    const result = await request.save();
    if (result) {
      console.log(result);
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
const viewRequest = async (req, res) => {
  const { email } = req.visitorID;
  try {
    const requests = await VisitorRequest.find({ email });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

const adminRequest = async (req, res) => {
  try {
    const requests = await VisitorRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

module.exports = {
  createRequest,
  viewRequest,
  adminRequest,
};

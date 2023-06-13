const VisitorRequest = require("../models/visitor-request");
const createRequest = async (req, res) => {
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
  if (req.visitorID) {
    const { email } = req.visitorID;
    try {
      const requests = await VisitorRequest.find({ email });
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  } else {
    return;
  }
  
};

const checkOutRequest = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log("Request Recieved:");
  try {
    const checkOutDate = new Date().toLocaleString();
    const resp= await VisitorRequest.findOneAndUpdate({ _id :id }, { $set: { checkOutTime: checkOutDate } })

      if (!resp) {
        return res.status(500).json({
          message: "Database Error at FindOneAndUpdate",
        });
      }
      res.status(200).json({
        message: "Checkout Success",
      });
  
  } catch (error) {
    console.log(error)
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
  checkOutRequest,
  adminRequest,
};

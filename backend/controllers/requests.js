const VisitorRequest = require("../models/visitor-request");
const createRequest = async (req, res) => {
  console.log(req.body);
  const { reason, visitortype, visitingDate } = req.body;
  const { email, name } = req.visitorID;
  const request = new VisitorRequest({
    email,
    name,
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
const acceptRequest = async (req, res) => {
  const id = req.params.visitorID;
  console.log(id);
  try {
    const result = await VisitorRequest.findByIdAndUpdate(
      id,
      { reqStatus: "Accepted" },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Visitor request not found");
    }

    res.status(200).json({ message: "Updated Successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
const rejectRequest = async (req, res) => {
  const id = req.params.visitorID;
  console.log(id);
  try {
    const result = await VisitorRequest.findByIdAndUpdate(
      id,
      { reqStatus: "Rejected" },
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Visitor request not found");
    }

    res.status(200).json({ message: "Request Rejected", data: result });
  } catch (error) {
    console.log(error);
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

module.exports = { createRequest, acceptRequest, viewRequest, rejectRequest,adminRequest };
